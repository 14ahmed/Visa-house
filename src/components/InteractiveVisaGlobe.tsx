import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  drag as d3Drag,
  geoGraticule10,
  geoOrthographic,
  geoPath,
  interpolate as d3Interpolate,
  select as d3Select,
} from 'd3';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import countriesAtlasRaw from 'world-atlas/countries-110m.json';
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Globe2,
  Minus,
  Pause,
  Play,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { REGIONS } from '../data/destinations';
import type { RegionId } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { buildVisaChecklistDocument } from '../utils/checklistLibrary';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  buildGlobeHoverSummary,
  buildGreatCircleArc,
  computeGlobeTooltipPosition,
  computeRotationForCoordinates,
  filterGlobeDestinations,
  getGlobeDestinationByChecklistId,
  getGlobeDestinationBySlug,
  GLOBE_DESTINATIONS,
  isPointOnFrontHemisphere,
  normalizeNumericCountryId,
  PAKISTAN_ORIGIN,
  projectSvgPointToStage,
  REGION_CAMERA_PRESETS,
  resolveGlobeDestinationByNumericId,
  type GlobeDestinationNode,
} from '../utils/visaGlobeData';

interface CountryProperties {
  name?: string;
}

type CountryFeature = Feature<Geometry, CountryProperties> & {
  id?: string | number;
};

interface InteractiveVisaGlobeProps {
  id?: string;
  /** Currently selected checklist destination ID (e.g. 'canada', 'japan', 'schengen'). */
  selectedChecklistId: string;
  /** Callback fired when the user clicks a highlighted country on the 3D globe. */
  onSelectDestination: (checklistId: string, node: GlobeDestinationNode) => void;
  /** Anchor ID of the integrated DocumentChecklistLibrary section for smooth jump. */
  checklistAnchorId?: string;
  eyebrow?: string;
  heading?: string;
  subcopy?: string;
}

const SVG_SIZE = 560;
const CENTER = SVG_SIZE / 2;
const BASE_RADIUS = 204;
const APERTURE_RADIUS = 238;
const MIN_ZOOM = 0.88;
const MAX_ZOOM = 1.85;

const countriesAtlas = countriesAtlasRaw as unknown as Topology<{
  countries: GeometryCollection<CountryProperties>;
}>;

const WORLD_FEATURES: CountryFeature[] = (
  feature(
    countriesAtlas,
    countriesAtlas.objects.countries,
  ) as unknown as FeatureCollection<Geometry, CountryProperties>
).features as CountryFeature[];

const GRATICULE_DATA = geoGraticule10();

/**
 * Interactive 3D Orthographic Globe built with D3.js and TopoJSON world-atlas.
 * Users can drag to rotate in 3D, zoom, jump by region, and click any highlighted
 * destination country to immediately view visa requirements and sync the Document Checklist.
 */
export function InteractiveVisaGlobe({
  id = 'visa-globe',
  selectedChecklistId,
  onSelectDestination,
  checklistAnchorId = 'document-checklist',
  eyebrow,
  heading,
  subcopy,
}: InteractiveVisaGlobeProps) {
  const { t, isUrdu, localizeCountry, localizeRegion, localizeChannel } = useLanguage();
  const headingId = useId();
  const oceanGradId = useId();
  const rimShadowId = useId();
  const sphereClipId = useId();

  const activeNode: GlobeDestinationNode = useMemo(
    () =>
      getGlobeDestinationByChecklistId(selectedChecklistId) ??
      getGlobeDestinationBySlug('canada') ??
      GLOBE_DESTINATIONS[0],
    [selectedChecklistId],
  );

  const [regionFilter, setRegionFilter] = useState<RegionId | 'All'>('All');
  const [rotation, setRotation] = useState<[number, number, number]>(() =>
    computeRotationForCoordinates(activeNode.lon, activeNode.lat),
  );
  const [zoom, setZoom] = useState<number>(1.04);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<GlobeDestinationNode | null>(null);
  const [hoverPos, setHoverPos] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef<[number, number, number]>(rotation);
  const zoomRef = useRef<number>(zoom);
  const animFrameRef = useRef<number | null>(null);
  const spinFrameRef = useRef<number | null>(null);
  const dragMovedRef = useRef<boolean>(false);
  const lastSyncedSlugRef = useRef<string>(activeNode.slug);
  const isHoveringRef = useRef<boolean>(false);

  rotationRef.current = rotation;
  zoomRef.current = zoom;
  isHoveringRef.current = hoveredNode !== null;

  const stopFlyAnimation = useCallback(() => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const flyTo = useCallback(
    (targetRot: [number, number, number], targetZoom?: number) => {
      stopFlyAnimation();
      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      const finalZoom = targetZoom !== undefined
        ? Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, targetZoom))
        : zoomRef.current;

      if (prefersReduced) {
        setRotation(targetRot);
        setZoom(finalZoom);
        return;
      }

      const startRot = rotationRef.current;
      const startZoom = zoomRef.current;

      // Choose shortest longitude delta across the ±180° meridian
      let dLon = targetRot[0] - startRot[0];
      while (dLon > 180) dLon -= 360;
      while (dLon < -180) dLon += 360;
      const adjustedTarget: [number, number, number] = [
        startRot[0] + dLon,
        targetRot[1],
        0,
      ];

      const rotInterp = d3Interpolate(startRot, adjustedTarget);
      const zoomInterp = d3Interpolate(startZoom, finalZoom);
      const durationMs = 620;
      const startTs = performance.now();

      const step = (now: number) => {
        const elapsed = Math.min(1, (now - startTs) / durationMs);
        // Smooth cubic-out easing
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const nextRot = rotInterp(eased) as [number, number, number];
        setRotation([nextRot[0], nextRot[1], 0]);
        setZoom(zoomInterp(eased));

        if (elapsed < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [stopFlyAnimation],
  );

  // Spin smoothly whenever the externally synced checklist destination changes
  useEffect(() => {
    if (lastSyncedSlugRef.current === activeNode.slug) return;
    lastSyncedSlugRef.current = activeNode.slug;
    setIsAutoRotating(false);
    flyTo(computeRotationForCoordinates(activeNode.lon, activeNode.lat));
  }, [activeNode.slug, activeNode.lon, activeNode.lat, flyTo]);

  // Attach D3 drag-to-rotate interaction onto the SVG sphere
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const dragBehavior = d3Drag<SVGSVGElement, unknown>()
      .on('start', () => {
        dragMovedRef.current = false;
        stopFlyAnimation();
        setIsAutoRotating(false);
        setHoveredNode(null);
        setHoverPos(null);
      })
      .on('drag', (event) => {
        const dx = event.dx as number;
        const dy = event.dy as number;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          dragMovedRef.current = true;
          setIsDragging(true);
        }
        const sensitivity = 0.34 / Math.max(0.85, zoomRef.current);
        const [lon, lat] = rotationRef.current;
        const nextLon = lon + dx * sensitivity;
        const nextLat = Math.max(-62, Math.min(62, lat - dy * sensitivity));
        setRotation([nextLon, nextLat, 0]);
      })
      .on('end', () => {
        setIsDragging(false);
        window.setTimeout(() => {
          dragMovedRef.current = false;
        }, 40);
      });

    const selection = d3Select(svgEl);
    selection.call(dragBehavior);

    return () => {
      selection.on('.drag', null);
    };
  }, [stopFlyAnimation]);

  // Gentle auto-rotation loop when toggled on
  useEffect(() => {
    if (!isAutoRotating) {
      if (spinFrameRef.current !== null) {
        cancelAnimationFrame(spinFrameRef.current);
        spinFrameRef.current = null;
      }
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsAutoRotating(false);
      return;
    }

    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;
      if (!isHoveringRef.current) {
        setRotation(([lon, lat]) => [(lon + dt * 0.012) % 360, lat, 0]);
      }
      spinFrameRef.current = requestAnimationFrame(tick);
    };

    spinFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (spinFrameRef.current !== null) {
        cancelAnimationFrame(spinFrameRef.current);
        spinFrameRef.current = null;
      }
    };
  }, [isAutoRotating]);

  // Clean up animation frames on unmount
  useEffect(() => {
    return () => {
      stopFlyAnimation();
      if (spinFrameRef.current !== null) {
        cancelAnimationFrame(spinFrameRef.current);
      }
    };
  }, [stopFlyAnimation]);

  const handleSelectNode = useCallback(
    (node: GlobeDestinationNode) => {
      if (dragMovedRef.current) return;
      lastSyncedSlugRef.current = node.slug;
      setIsAutoRotating(false);
      onSelectDestination(node.checklistId, node);
      const targetZoom =
        node.region === 'Europe & UK' && zoomRef.current < 1.22
          ? 1.32
          : zoomRef.current;
      flyTo(computeRotationForCoordinates(node.lon, node.lat), targetZoom);
    },
    [flyTo, onSelectDestination],
  );

  const handleRegionPreset = (region: RegionId | 'All') => {
    setRegionFilter(region);
    setIsAutoRotating(false);
    const preset = REGION_CAMERA_PRESETS.find((p) => p.id === region);
    if (preset) {
      flyTo(preset.rotation, preset.scaleMultiplier);
    }
  };

  const handleResetToPakistan = () => {
    setRegionFilter('All');
    setIsAutoRotating(false);
    flyTo([-PAKISTAN_ORIGIN.lon, -PAKISTAN_ORIGIN.lat + 4, 0], 1.02);
  };

  const handleJumpToChecklist = () => {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(checklistAnchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtered destination list for region highlighting & quick-jump strip
  const regionDestinations = useMemo(
    () => filterGlobeDestinations(regionFilter, 'All'),
    [regionFilter],
  );
  const regionSlugSet = useMemo(
    () => new Set(regionDestinations.map((d) => d.slug)),
    [regionDestinations],
  );

  // D3 Orthographic projection & path generator for current frame
  const { projection, pathGen, visibleRadius } = useMemo(() => {
    const r = BASE_RADIUS * zoom;
    const proj = geoOrthographic()
      .scale(r)
      .translate([CENTER, CENTER])
      .clipAngle(90)
      .rotate(rotation);
    return {
      projection: proj,
      pathGen: geoPath(proj),
      visibleRadius: Math.min(APERTURE_RADIUS, r),
    };
  }, [rotation, zoom]);

  // Great-circle flight trajectory from Pakistan to active destination
  const routeArcPath = useMemo(() => {
    const line = buildGreatCircleArc(
      [PAKISTAN_ORIGIN.lon, PAKISTAN_ORIGIN.lat],
      [activeNode.lon, activeNode.lat],
      48,
    );
    return pathGen(line) ?? '';
  }, [activeNode.lon, activeNode.lat, pathGen]);

  const graticulePath = useMemo(() => pathGen(GRATICULE_DATA) ?? '', [pathGen]);

  // Pakistan origin pin projection
  const pakistanPoint = useMemo(() => {
    if (!isPointOnFrontHemisphere(PAKISTAN_ORIGIN.lon, PAKISTAN_ORIGIN.lat, rotation)) {
      return null;
    }
    return projection([PAKISTAN_ORIGIN.lon, PAKISTAN_ORIGIN.lat]);
  }, [projection, rotation]);

  // Active destination pin + small-territory precision pins on the front hemisphere
  const visiblePins = useMemo(() => {
    return GLOBE_DESTINATIONS.filter((node) => {
      const isSelected = node.slug === activeNode.slug;
      if (!isSelected && !node.showPrecisionPin) return false;
      if (regionFilter !== 'All' && !regionSlugSet.has(node.slug) && !isSelected) return false;
      return isPointOnFrontHemisphere(node.lon, node.lat, rotation);
    })
      .map((node) => {
        const pt = projection([node.lon, node.lat]);
        return pt ? { node, x: pt[0], y: pt[1] } : null;
      })
      .filter((item): item is { node: GlobeDestinationNode; x: number; y: number } => item !== null);
  }, [activeNode.slug, projection, regionFilter, regionSlugSet, rotation]);

  // Pull live checklist preview directly from the shared checklist library engine
  const activeChecklistDoc = useMemo(
    () =>
      buildVisaChecklistDocument({
        destinationId: activeNode.checklistId,
        visaTypeId: 'tourist',
        nationalityId: 'pakistan',
      }),
    [activeNode.checklistId],
  );

  const previewMandatoryItems = useMemo(() => {
    const allItems = activeChecklistDoc.groups.flatMap((g) => g.items);
    const core = allItems.filter((item) => item.mandatory);
    return (core.length > 0 ? core : allItems).slice(0, 5);
  }, [activeChecklistDoc]);

  const resolvedEyebrow = eyebrow ?? t.globe.eyebrow;
  const resolvedHeading = heading ?? t.globe.heading;
  const resolvedSubcopy = subcopy ?? t.globe.subcopy;

  const chipFontClass = isUrdu
    ? 'text-xs font-medium'
    : 'text-xs font-mono uppercase tracking-[0.08em]';

  const processingDisplay = activeNode.processingEstimate || t.common.confirmWithTeam;

  const clearHoverTooltip = useCallback(() => {
    setHoveredNode(null);
    setHoverPos(null);
  }, []);

  const updateHoverPointer = useCallback(
    (node: GlobeDestinationNode, clientX: number, clientY: number) => {
      setHoveredNode(node);
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      setHoverPos({
        x: clientX - rect.left,
        y: clientY - rect.top,
        width: rect.width,
        height: rect.height,
      });
    },
    [],
  );

  const updateFocusTooltip = useCallback(
    (node: GlobeDestinationNode) => {
      setHoveredNode(node);
      if (!stageRef.current || !svgRef.current) return;
      const projected = projection([node.lon, node.lat]);
      if (!projected) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const stageRect = stageRef.current.getBoundingClientRect();
      setHoverPos(
        projectSvgPointToStage(projected[0], projected[1], svgRect, stageRect, SVG_SIZE),
      );
    },
    [projection],
  );

  const hoveredSummary = useMemo(
    () => (hoveredNode ? buildGlobeHoverSummary(hoveredNode) : null),
    [hoveredNode],
  );

  const tooltipPlacement = useMemo(() => {
    if (!hoverPos) return null;
    return computeGlobeTooltipPosition(
      hoverPos.x,
      hoverPos.y,
      hoverPos.width,
      hoverPos.height,
      298,
      206,
    );
  }, [hoverPos]);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-testid="interactive-visa-globe"
      className="no-print paper-card-texture border border-ink/80 rounded-[3px] p-5 sm:p-8 lg:p-10 scroll-mt-24"
    >
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-ink/75">
        <div className="max-w-3xl">
          <p className="mono-label text-visa-green">{resolvedEyebrow}</p>
          <h2
            id={headingId}
            className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5"
          >
            {resolvedHeading}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2.5 self-start lg:self-end border border-rule bg-paper px-3.5 py-2 rounded-[2px]">
          <Globe2 className="h-4 w-4 text-visa-green shrink-0" aria-hidden="true" />
          <span
            className={`text-xs text-ink ${
              isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.1em]'
            }`}
          >
            {t.globe.dragHint}
          </span>
        </div>
      </div>

      {/* Regional Camera Preset Bar */}
      <div
        role="group"
        aria-label={t.home.filterByRegionBtn}
        className="mt-5 flex flex-wrap items-center gap-1.5"
      >
        <button
          type="button"
          onClick={() => handleRegionPreset('All')}
          aria-pressed={regionFilter === 'All'}
          className={`min-h-[38px] px-3 py-1.5 rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${chipFontClass} ${
            regionFilter === 'All'
              ? 'bg-visa-green text-slip border-visa-green'
              : 'bg-paper text-ink-body border-rule hover:border-ink/60'
          }`}
        >
          {t.common.all} (<span className="font-latin-mono">{GLOBE_DESTINATIONS.length}</span>)
        </button>
        {REGIONS.map((reg) => {
          const count = GLOBE_DESTINATIONS.filter((d) => d.region === reg).length;
          const active = regionFilter === reg;
          return (
            <button
              key={reg}
              type="button"
              onClick={() => handleRegionPreset(reg)}
              aria-pressed={active}
              className={`min-h-[38px] px-3 py-1.5 rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${chipFontClass} ${
                active
                  ? 'bg-ink text-slip border-ink'
                  : 'bg-paper text-ink-body border-rule hover:border-ink/60'
              }`}
            >
              {localizeRegion(reg)} (<span className="font-latin-mono">{count}</span>)
            </button>
          );
        })}
      </div>

      {/* Main Split Stage: 7-col D3 3D Orthographic Globe + 5-col Live Visa Requirements Dossier */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left/Start: Interactive D3.js 3D Globe Canvas */}
        <div className="lg:col-span-7 relative bg-paper border border-ink/50 rounded-[3px] p-3 sm:p-5 flex flex-col justify-between overflow-hidden">
          {/* Top-inside Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-rule/80">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-[1px] bg-visa-green border border-ink/30"
                  aria-hidden="true"
                />
                <span>{t.globe.legendHighlighted}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-[1px] bg-marigold border border-ink/60"
                  aria-hidden="true"
                />
                <span>{t.globe.legendSelected}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full bg-stamp-red border border-slip"
                  aria-hidden="true"
                />
                <span>{t.globe.legendOrigin}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsAutoRotating((prev) => !prev)}
                aria-pressed={isAutoRotating}
                title={isAutoRotating ? t.globe.autoSpinOn : t.globe.autoSpinOff}
                className={`inline-flex items-center gap-1.5 min-h-[34px] px-2.5 border rounded-[2px] text-xs transition-colors cursor-pointer whitespace-nowrap ${
                  isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.06em]'
                } ${
                  isAutoRotating
                    ? 'bg-visa-green text-slip border-visa-green'
                    : 'bg-slip text-ink border-ink/35 hover:border-ink'
                }`}
              >
                {isAutoRotating ? (
                  <Pause className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                ) : (
                  <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">
                  {isAutoRotating ? t.globe.autoSpinOn : t.globe.autoSpinOff}
                </span>
              </button>

              <button
                type="button"
                onClick={() => flyTo(rotationRef.current, zoomRef.current + 0.22)}
                aria-label={t.globe.zoomIn}
                title={t.globe.zoomIn}
                className="inline-flex items-center justify-center h-[34px] w-[34px] bg-slip border border-ink/35 hover:border-ink text-ink rounded-[2px] cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => flyTo(rotationRef.current, zoomRef.current - 0.22)}
                aria-label={t.globe.zoomOut}
                title={t.globe.zoomOut}
                className="inline-flex items-center justify-center h-[34px] w-[34px] bg-slip border border-ink/35 hover:border-ink text-ink rounded-[2px] cursor-pointer"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleResetToPakistan}
                aria-label={t.globe.resetView}
                title={t.globe.resetView}
                className="inline-flex items-center justify-center h-[34px] w-[34px] bg-slip border border-ink/35 hover:border-ink text-ink rounded-[2px] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* 3D D3.js Orthographic SVG Stage */}
          <div
            ref={stageRef}
            dir="ltr"
            className="relative my-2 flex items-center justify-center"
            onMouseLeave={() => {
              setHoveredNode(null);
              setHoverPos(null);
            }}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              role="img"
              aria-label={t.globe.heading}
              className={`w-full max-w-[520px] h-auto select-none touch-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <defs>
                {/* Archival Illuminated 3D Sphere Shading */}
                <radialGradient id={oceanGradId} cx="36%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#FDFBF4" />
                  <stop offset="58%" stopColor="#F2E9D7" />
                  <stop offset="88%" stopColor="#E4D7BE" />
                  <stop offset="100%" stopColor="#D4C5A8" />
                </radialGradient>
                <radialGradient id={rimShadowId} cx="50%" cy="50%" r="50%">
                  <stop offset="80%" stopColor="rgba(28, 27, 25, 0)" />
                  <stop offset="100%" stopColor="rgba(28, 27, 25, 0.16)" />
                </radialGradient>
                <clipPath id={sphereClipId}>
                  <circle cx={CENTER} cy={CENTER} r={visibleRadius} />
                </clipPath>
              </defs>

              {/* Outer Cartographic Compass Meridian Ring */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={visibleRadius + 14}
                fill="none"
                stroke="#CFC5B2"
                strokeWidth="0.95"
                strokeDasharray="3 4"
              />
              <g
                className="font-latin-mono"
                fill="#59554C"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                aria-hidden="true"
              >
                <text x={CENTER} y={CENTER - visibleRadius - 21}>
                  N
                </text>
                <text x={CENTER} y={CENTER + visibleRadius + 29}>
                  S
                </text>
                <text x={CENTER - visibleRadius - 24} y={CENTER + 3.5}>
                  W
                </text>
                <text x={CENTER + visibleRadius + 24} y={CENTER + 3.5}>
                  E
                </text>
              </g>

              {/* Clipped 3D Sphere Optical Aperture (prevents flat edge slicing on zoom) */}
              <g clipPath={`url(#${sphereClipId})`}>
                {/* 3D Ocean Sphere Base */}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={visibleRadius}
                  fill={`url(#${oceanGradId})`}
                  onMouseEnter={clearHoverTooltip}
                />

                {/* 15° Spherical Graticule Meridians & Parallels */}
                <path
                  d={graticulePath}
                  fill="none"
                  stroke="#9C907A"
                  strokeWidth="0.55"
                  strokeOpacity="0.42"
                />

              {/* World Country Polygons */}
              <g>
                {WORLD_FEATURES.map((feat, idx) => {
                  const d = pathGen(feat);
                  if (!d) return null;

                  const numericId = normalizeNumericCountryId(feat.id);
                  const isPakistan = numericId === PAKISTAN_ORIGIN.numericId;
                  const destNode = resolveGlobeDestinationByNumericId(numericId);
                  const isSelected = destNode?.slug === activeNode.slug;
                  const isHovered = destNode && hoveredNode?.slug === destNode.slug;
                  const isDimmedByRegion =
                    destNode && regionFilter !== 'All' && !regionSlugSet.has(destNode.slug) && !isSelected;

                  let fill = '#E2D7C1';
                  let stroke = '#B5A88F';
                  let strokeWidth = 0.55;

                  if (isPakistan) {
                    fill = '#B93222';
                    stroke = '#FAF6EC';
                    strokeWidth = 0.9;
                  } else if (destNode) {
                    if (isSelected) {
                      fill = '#E8A93B';
                      stroke = '#1C1B19';
                      strokeWidth = 1.25;
                    } else if (isHovered) {
                      fill = '#187A64';
                      stroke = '#1C1B19';
                      strokeWidth = 1.0;
                    } else if (isDimmedByRegion) {
                      fill = '#9AB5A8';
                      stroke = '#EFE7D6';
                      strokeWidth = 0.6;
                    } else {
                      fill = '#0F5C4B';
                      stroke = '#FAF6EC';
                      strokeWidth = 0.7;
                    }
                  }

                  return (
                    <path
                      key={numericId || `feat-${idx}`}
                      d={d}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      tabIndex={destNode ? 0 : undefined}
                      role={destNode ? 'button' : undefined}
                      aria-label={
                        destNode
                          ? `${localizeCountry(destNode.country)} (${destNode.isoCode}) — ${destNode.visaType}, ${destNode.processingEstimate}`
                          : undefined
                      }
                      data-globe-country={destNode?.slug}
                      data-globe-highlighted={destNode ? 'true' : undefined}
                      className={
                        destNode
                          ? 'cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:stroke-[#1C1B19]'
                          : ''
                      }
                      onMouseEnter={(e) => {
                        if (!destNode) {
                          clearHoverTooltip();
                          return;
                        }
                        updateHoverPointer(destNode, e.clientX, e.clientY);
                      }}
                      onMouseMove={(e) => {
                        if (!destNode) return;
                        updateHoverPointer(destNode, e.clientX, e.clientY);
                      }}
                      onMouseLeave={() => {
                        if (destNode) clearHoverTooltip();
                      }}
                      onFocus={() => {
                        if (destNode) updateFocusTooltip(destNode);
                      }}
                      onBlur={() => {
                        if (destNode) clearHoverTooltip();
                      }}
                      onKeyDown={(e) => {
                        if (destNode && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          handleSelectNode(destNode);
                        }
                      }}
                      onClick={() => {
                        if (destNode) handleSelectNode(destNode);
                      }}
                    />
                  );
                })}
              </g>

              {/* Soft Spherical Limb Shading for Authentic 3D Depth */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={visibleRadius}
                fill={`url(#${rimShadowId})`}
                pointerEvents="none"
              />

              {/* Spherical Great-Circle Flight Arc from Pakistan to Selected Country */}
              {routeArcPath && (
                <path
                  d={routeArcPath}
                  fill="none"
                  stroke="#B93222"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                  pointerEvents="none"
                />
              )}

              {/* Pakistan Origin Beacon */}
              {pakistanPoint && (() => {
                const nearRightLimb = pakistanPoint[0] > CENTER + visibleRadius - 36;
                return (
                  <g pointerEvents="none">
                    <circle
                      cx={pakistanPoint[0]}
                      cy={pakistanPoint[1]}
                      r="8"
                      fill="rgba(185, 50, 34, 0.18)"
                      stroke="#B93222"
                      strokeWidth="1"
                    />
                    <circle
                      cx={pakistanPoint[0]}
                      cy={pakistanPoint[1]}
                      r="3.5"
                      fill="#B93222"
                      stroke="#FAF6EC"
                      strokeWidth="1.2"
                    />
                    <text
                      x={nearRightLimb ? pakistanPoint[0] - 11 : pakistanPoint[0] + 10}
                      y={pakistanPoint[1] + 3}
                      textAnchor={nearRightLimb ? 'end' : 'start'}
                      className="font-latin-mono"
                      fontSize="9.5"
                      fontWeight="600"
                      fill="#1C1B19"
                    >
                      PAK
                    </text>
                  </g>
                );
              })()}

              {/* Clickable Precision Pins for Active Destination + Compact Territories */}
              <g>
                {visiblePins.map(({ node, x, y }) => {
                  const isSelected = node.slug === activeNode.slug;
                  const flipBadgeLeft = x > CENTER + visibleRadius - 50;
                  const badgeX = flipBadgeLeft ? x - 43 : x + 9;
                  return (
                    <g
                      key={node.slug}
                      tabIndex={0}
                      role="button"
                      aria-label={`${localizeCountry(node.country)} (${node.isoCode}) — ${node.visaType}, ${node.processingEstimate}`}
                      data-globe-pin={node.slug}
                      className="cursor-pointer focus:outline-none"
                      onClick={() => handleSelectNode(node)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectNode(node);
                        }
                      }}
                      onMouseEnter={(e) => updateHoverPointer(node, e.clientX, e.clientY)}
                      onMouseMove={(e) => updateHoverPointer(node, e.clientX, e.clientY)}
                      onMouseLeave={clearHoverTooltip}
                      onFocus={() => updateFocusTooltip(node)}
                      onBlur={clearHoverTooltip}
                    >
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r="11"
                          fill="rgba(232, 169, 59, 0.28)"
                          stroke="#1C1B19"
                          strokeWidth="1"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 5 : 4.2}
                        fill={
                          isSelected
                            ? '#E8A93B'
                            : hoveredNode?.slug === node.slug
                              ? '#187A64'
                              : '#0F5C4B'
                        }
                        stroke={isSelected || hoveredNode?.slug === node.slug ? '#1C1B19' : '#FAF6EC'}
                        strokeWidth={isSelected ? 1.5 : 1.2}
                      />
                      {isSelected && (
                        <g>
                          <rect
                            x={badgeX}
                            y={y - 10}
                            width={34}
                            height={18}
                            rx={2}
                            fill="#1C1B19"
                          />
                          <text
                            x={badgeX + 17}
                            y={y + 2.5}
                            textAnchor="middle"
                            className="font-latin-mono"
                            fontSize="9.5"
                            fontWeight="600"
                            fill="#FAF6EC"
                          >
                            {node.isoCode}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
              </g>

              {/* Crisp Outer Circular Globe Rim Border */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={visibleRadius}
                fill="none"
                stroke="#1C1B19"
                strokeWidth="1.4"
                pointerEvents="none"
              />
            </svg>

            {/* Floating Archival Quick-Look Hover Tooltip */}
            {hoveredSummary && tooltipPlacement && !isDragging && (() => {
              const speedLabel =
                hoveredSummary.turnaroundSpeed === 'fast'
                  ? t.globe.tooltipSpeedFast
                  : hoveredSummary.turnaroundSpeed === 'standard'
                    ? t.globe.tooltipSpeedStandard
                    : t.globe.tooltipSpeedExtended;
              const speedColor =
                hoveredSummary.turnaroundSpeed === 'fast'
                  ? '#49C29B'
                  : hoveredSummary.turnaroundSpeed === 'standard'
                    ? '#E8A93B'
                    : '#E07A5F';
              const filledTicks =
                hoveredSummary.turnaroundSpeed === 'fast'
                  ? 3
                  : hoveredSummary.turnaroundSpeed === 'standard'
                    ? 2
                    : 1;

              return (
                <div
                  role="tooltip"
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  data-testid="globe-hover-tooltip"
                  data-speed-tier={hoveredSummary.turnaroundSpeed}
                  style={{
                    left: tooltipPlacement.left,
                    top: tooltipPlacement.top,
                  }}
                  className="pointer-events-none absolute z-20 w-[298px] bg-ink/95 backdrop-blur-[2px] text-slip border border-marigold/80 rounded-[2px] overflow-hidden shadow-xl"
                >
                  {/* Country archival ink header accent rule */}
                  <div
                    className="h-[3px] w-full"
                    style={{ backgroundColor: hoveredSummary.accentHex }}
                    aria-hidden="true"
                  />

                  <div className="px-3.5 py-3">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slip/15">
                      <div className="min-w-0">
                        <span
                          className={`block font-display text-[15px] font-medium text-slip truncate ${
                            isUrdu ? 'leading-loose py-0.5' : 'leading-snug'
                          }`}
                        >
                          {localizeCountry(hoveredSummary.country)}
                        </span>
                        <span className="block text-[10px] text-slip/60 font-mono tracking-[0.06em]">
                          {localizeRegion(hoveredSummary.region)} · {localizeChannel(hoveredSummary.channel)}
                        </span>
                      </div>
                      <span className="font-latin-mono text-[10px] text-marigold font-semibold tracking-[0.12em] px-1.5 py-0.5 border border-marigold/45 rounded-[2px] shrink-0">
                        {hoveredSummary.isoCode}
                      </span>
                    </div>

                    <dl className="mt-2.5 space-y-2 text-xs">
                      <div>
                        <dt
                          className={`text-[10px] text-slip/65 ${
                            isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                          }`}
                        >
                          {t.globe.tooltipVisaType}
                        </dt>
                        <dd
                          data-testid="globe-tooltip-visa-type"
                          dir="auto"
                          className="text-[12.5px] text-slip font-medium leading-snug mt-0.5"
                        >
                          {hoveredSummary.primaryVisaType}
                        </dd>
                      </div>

                      <div className="pt-2 border-t border-slip/12">
                        <div className="flex items-center justify-between gap-2">
                          <dt
                            className={`text-[10px] text-slip/65 ${
                              isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                            }`}
                          >
                            {t.globe.tooltipProcessing}
                          </dt>
                          <span
                            data-testid="globe-tooltip-speed"
                            className="inline-flex items-center gap-1.5 shrink-0"
                          >
                            <span className="inline-flex items-center gap-0.5" aria-hidden="true">
                              {[1, 2, 3].map((idx) => (
                                <span
                                  key={idx}
                                  className="inline-block h-1.5 w-2.5 rounded-[1px]"
                                  style={{
                                    backgroundColor:
                                      idx <= filledTicks ? speedColor : 'rgba(250, 246, 236, 0.2)',
                                  }}
                                />
                              ))}
                            </span>
                            <span
                              className={`text-[10px] font-medium ${
                                isUrdu ? '' : 'font-mono uppercase tracking-[0.06em]'
                              }`}
                              style={{ color: speedColor }}
                            >
                              {speedLabel}
                            </span>
                          </span>
                        </div>
                        <dd
                          data-testid="globe-tooltip-processing"
                          dir="auto"
                          className="inline-flex items-start gap-1.5 text-[12.5px] text-marigold font-medium leading-snug mt-1"
                        >
                          <Clock className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{hoveredSummary.processingEstimate}</span>
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-2.5 pt-2 border-t border-slip/15 flex items-center justify-between gap-2 text-[10px] text-slip/75">
                      <span className="font-mono tabular-nums">
                        {formatLocalizedCopy(t.globe.tooltipCoreDocs, {
                          count: hoveredSummary.coreChecklistItems,
                        })}
                      </span>
                      <span className="text-marigold/95 font-medium">{t.globe.hoverPrompt} →</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Bottom Coordinate & Telemetry Caption */}
          <div className="pt-3 border-t border-rule/80 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Compass className="h-3.5 w-3.5 text-visa-green shrink-0" aria-hidden="true" />
              <span>{t.globe.clickCountryHint}</span>
            </span>
            <span className="font-latin-mono text-[11px] tabular-nums">
              {PAKISTAN_ORIGIN.isoCode} → {activeNode.isoCode} ·{' '}
              {Math.abs(activeNode.lat).toFixed(1)}°{activeNode.lat >= 0 ? 'N' : 'S'},{' '}
              {Math.abs(activeNode.lon).toFixed(1)}°{activeNode.lon >= 0 ? 'E' : 'W'}
            </span>
          </div>
        </div>

        {/* Right/End: Instant Visa Requirements & Synced Checklist Dossier Panel */}
        <aside
          aria-live="polite"
          data-testid="globe-requirements-panel"
          className="lg:col-span-5 bg-slip border border-ink/70 rounded-[3px] p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            {/* Country Identity Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-ink/25">
              <div className="min-w-0">
                <p className="mono-label text-visa-green">{localizeRegion(activeNode.region)}</p>
                <h3
                  data-testid="globe-selected-country"
                  className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1 leading-tight"
                >
                  {localizeCountry(activeNode.country)}
                </h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-visa-green font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{t.globe.syncedBadge}</span>
                </p>
              </div>
              <span
                className="font-latin-mono inline-flex items-center justify-center px-3 py-2 text-lg font-bold tracking-[0.14em] border rounded-[2px] bg-paper shrink-0"
                style={{
                  color: activeNode.accentHex,
                  borderColor: activeNode.accentHex,
                }}
              >
                {activeNode.isoCode}
              </span>
            </div>

            {/* Concise Visa Requirements Grid */}
            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-paper border border-rule rounded-[2px] p-3">
                <dt className="mono-label text-ink-muted text-[10px]">{t.globe.channelLabel}</dt>
                <dd className="mt-1 font-medium text-ink">{localizeChannel(activeNode.channel)}</dd>
              </div>
              <div className="bg-paper border border-rule rounded-[2px] p-3">
                <dt className="mono-label text-ink-muted text-[10px]">{t.globe.processingLabel}</dt>
                <dd className="mt-1 font-medium text-visa-green">{processingDisplay}</dd>
              </div>
              <div className="bg-paper border border-rule rounded-[2px] p-3">
                <dt className="mono-label text-ink-muted text-[10px]">{t.globe.visaTypeLabel}</dt>
                <dd className="mt-1 text-ink-body text-xs leading-snug" dir="auto">
                  {activeNode.visaType}
                </dd>
              </div>
              <div className="bg-paper border border-rule rounded-[2px] p-3">
                <dt className="mono-label text-ink-muted text-[10px]">{t.globe.entryTypeLabel}</dt>
                <dd className="mt-1 text-ink-body text-xs leading-snug" dir="auto">
                  {activeNode.entryType}
                </dd>
              </div>
            </dl>

            {/* Pakistan Desk Guidance Summary */}
            <p
              dir="auto"
              className="mt-4 text-sm text-ink-body leading-relaxed border-b border-rule pb-4"
            >
              {activeNode.heroPromise}
            </p>

            {/* Live Core Documentation Preview pulled directly from DocumentChecklistLibrary engine */}
            <div className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-2.5">
                <p className="mono-label text-ink">{t.globe.coreDocsHeading}</p>
                <span
                  className={`text-[11px] text-ink-muted tabular-nums whitespace-nowrap shrink-0 ${
                    isUrdu ? '' : 'font-mono'
                  }`}
                >
                  {formatLocalizedCopy(t.globe.docsSummary, {
                    core: activeChecklistDoc.coreItems,
                    total: activeChecklistDoc.totalItems,
                  })}
                </span>
              </div>

              <ul className="space-y-2 text-xs text-ink-body" dir="auto">
                {previewMandatoryItems.map((item, idx) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-2.5 bg-paper/75 border border-rule/80 rounded-[2px] px-3 py-2"
                  >
                    <span className="font-latin-mono text-[11px] font-semibold text-visa-green tabular-nums shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-snug text-ink font-medium">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Seamless Integration Action Buttons */}
          <div className="mt-5 pt-4 border-t border-rule flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleJumpToChecklist}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-visa-green text-slip hover:bg-visa-green-dark text-sm font-medium rounded-[2px] transition-colors cursor-pointer"
            >
              <span>{t.globe.openChecklistBtn}</span>
              <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>

            <Link
              to={activeNode.detailPath}
              className="w-full inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2 border border-ink/70 bg-paper text-ink hover:bg-paper-deep text-sm font-medium rounded-[2px] transition-colors"
            >
              <span>{t.globe.fullGuideBtn}</span>
              <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Accessible Quick-Select Strip for All Highlighted Destinations */}
      <div className="mt-5 pt-4 border-t border-rule">
        <p className="mono-label text-ink-muted mb-2.5">{t.globe.quickJumpLabel}</p>
        <div className="flex flex-wrap gap-1.5">
          {regionDestinations.map((dest) => {
            const active = dest.slug === activeNode.slug;
            return (
              <button
                key={dest.slug}
                type="button"
                data-globe-quick={dest.slug}
                onClick={() => handleSelectNode(dest)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 min-h-[34px] px-2.5 py-1 rounded-[2px] border text-xs transition-colors cursor-pointer ${
                  active
                    ? 'bg-marigold/35 border-ink text-ink font-semibold'
                    : 'bg-slip border-rule text-ink-body hover:border-visa-green hover:text-visa-green'
                }`}
              >
                <span>{localizeCountry(dest.country)}</span>
                <span className="font-latin-mono text-[10px] text-ink-muted">{dest.isoCode}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
