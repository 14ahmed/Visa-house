import { geoDistance, geoInterpolate } from 'd3';
import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';
import type { RegionId, VisaChannel } from '../data/types';
import { buildVisaChecklistDocument } from './checklistLibrary';
import { getCostCalculatorSchedule } from './visaCostCalculator';

export interface GlobeOriginHub {
  numericId: string;
  isoCode: string;
  label: string;
  lon: number;
  lat: number;
}

export interface GlobeDestinationNode {
  slug: string;
  checklistId: string;
  country: string;
  isoCode: string;
  /** Zero-padded ISO 3166-1 numeric code used by world-atlas/countries-110m.json, or null for multi-state hubs. */
  numericId: string | null;
  lon: number;
  lat: number;
  region: RegionId;
  channel: VisaChannel;
  accentHex: string;
  visaType: string;
  entryType: string;
  stayLimit: string;
  processingTime: string;
  /** Indicative consular processing window sourced from the Visahouse schedule for quick-look hover tooltips. */
  processingEstimate: string;
  heroPromise: string;
  detailPath: string;
  /** True for small island/city states or multi-state hubs that should always display a clickable precision pin. */
  showPrecisionPin: boolean;
  totalChecklistItems: number;
  coreChecklistItems: number;
}

export type GlobeTurnaroundSpeed = 'fast' | 'standard' | 'extended';

export interface GlobeHoverSummary {
  slug: string;
  country: string;
  isoCode: string;
  region: RegionId;
  accentHex: string;
  primaryVisaType: string;
  entryType: string;
  processingEstimate: string;
  turnaroundSpeed: GlobeTurnaroundSpeed;
  channel: VisaChannel;
  coreChecklistItems: number;
}

export interface GlobeTooltipPosition {
  left: number;
  top: number;
  placementX: 'right' | 'left';
  placementY: 'below' | 'above';
}

export interface RegionCameraPreset {
  id: RegionId | 'All';
  rotation: [number, number, number];
  scaleMultiplier: number;
}

export const PAKISTAN_ORIGIN: GlobeOriginHub = {
  numericId: '586',
  isoCode: 'PAK',
  label: 'Pakistan (ISB · LHE · KHI)',
  lon: 69.3451,
  lat: 30.3753,
};

interface DestinationGeoMeta {
  numericId: string | null;
  lon: number;
  lat: number;
  showPrecisionPin?: boolean;
}

/**
 * Exact ISO 3166-1 numeric IDs (matching world-atlas/countries-110m.json) and
 * geographic centroids for all 38 destinations in our Pakistan visa index.
 */
export const DESTINATION_GEO_META: Record<string, DestinationGeoMeta> = {
  thailand: { numericId: '764', lon: 100.5, lat: 15.0 },
  malaysia: { numericId: '458', lon: 101.9, lat: 4.2 },
  indonesia: { numericId: '360', lon: 113.9, lat: -2.5 },
  singapore: { numericId: '702', lon: 103.82, lat: 1.35, showPrecisionPin: true },
  cambodia: { numericId: '116', lon: 104.99, lat: 12.57 },
  'sri-lanka': { numericId: '144', lon: 80.77, lat: 7.87, showPrecisionPin: true },
  nepal: { numericId: '524', lon: 84.12, lat: 28.39 },
  uzbekistan: { numericId: '860', lon: 64.59, lat: 41.38 },
  bahrain: { numericId: '048', lon: 50.55, lat: 26.07, showPrecisionPin: true },
  turkey: { numericId: '792', lon: 35.24, lat: 38.96 },
  azerbaijan: { numericId: '031', lon: 47.58, lat: 40.14 },
  japan: { numericId: '392', lon: 138.25, lat: 36.2 },
  'south-korea': { numericId: '410', lon: 127.77, lat: 35.91 },
  philippines: { numericId: '608', lon: 121.77, lat: 12.88 },
  usa: { numericId: '840', lon: -98.58, lat: 39.83 },
  canada: { numericId: '124', lon: -106.35, lat: 56.13 },
  uk: { numericId: '826', lon: -2.5, lat: 54.5 },
  australia: { numericId: '036', lon: 133.78, lat: -25.27 },
  'new-zealand': { numericId: '554', lon: 172.8, lat: -41.5 },
  'schengen-states': { numericId: null, lon: 10.2, lat: 48.2, showPrecisionPin: true },
  germany: { numericId: '276', lon: 10.45, lat: 51.17 },
  france: { numericId: '250', lon: 2.21, lat: 46.23 },
  greece: { numericId: '300', lon: 21.82, lat: 39.07 },
  portugal: { numericId: '620', lon: -8.22, lat: 39.4 },
  hungary: { numericId: '348', lon: 19.5, lat: 47.16 },
  poland: { numericId: '616', lon: 19.15, lat: 51.92 },
  netherlands: { numericId: '528', lon: 5.29, lat: 52.13, showPrecisionPin: true },
  norway: { numericId: '578', lon: 8.47, lat: 60.47 },
  denmark: { numericId: '208', lon: 9.5, lat: 56.26 },
  belgium: { numericId: '056', lon: 4.47, lat: 50.5, showPrecisionPin: true },
  luxembourg: { numericId: '442', lon: 6.13, lat: 49.82, showPrecisionPin: true },
  finland: { numericId: '246', lon: 25.75, lat: 61.92 },
  sweden: { numericId: '752', lon: 18.64, lat: 60.13 },
  switzerland: { numericId: '756', lon: 8.23, lat: 46.82, showPrecisionPin: true },
  austria: { numericId: '040', lon: 14.55, lat: 47.52 },
  italy: { numericId: '380', lon: 12.57, lat: 41.87 },
  spain: { numericId: '724', lon: -3.75, lat: 40.46 },
  egypt: { numericId: '818', lon: 30.8, lat: 26.82 },
  morocco: { numericId: '504', lon: -7.09, lat: 31.79 },
  kenya: { numericId: '404', lon: 37.91, lat: 0.02 },
  'south-africa': { numericId: '710', lon: 24.5, lat: -29.0 },
  zimbabwe: { numericId: '716', lon: 29.15, lat: -19.02 },
};

/**
 * Additional Schengen member countries in world-atlas that route cleanly to our
 * unified Schengen States guide & Type-C checklist when clicked on the 3D globe.
 */
export const SECONDARY_SCHENGEN_NUMERIC_IDS = new Set<string>([
  '203', // Czechia
  '191', // Croatia
  '703', // Slovakia
  '705', // Slovenia
  '233', // Estonia
  '428', // Latvia
  '440', // Lithuania
  '352', // Iceland
  '100', // Bulgaria
  '642', // Romania
]);

export function destinationSlugToChecklistId(slug: string): string {
  return slug === 'schengen-states' ? 'schengen' : slug;
}

export function checklistIdToDestinationSlug(checklistId: string): string {
  return checklistId === 'schengen' ? 'schengen-states' : checklistId;
}

export const GLOBE_DESTINATIONS: readonly GlobeDestinationNode[] = DESTINATIONS.map((dest) => {
  const geo = DESTINATION_GEO_META[dest.slug] ?? { numericId: null, lon: 0, lat: 20 };
  const checklistId = destinationSlugToChecklistId(dest.slug);
  const sampleDoc = buildVisaChecklistDocument({
    destinationId: checklistId,
    visaTypeId: 'tourist',
    nationalityId: 'pakistan',
  });

  const schedule = getCostCalculatorSchedule(dest.slug);
  const processingEstimate =
    dest.facts.processingTime.trim() || schedule.processingWindowEstimate;

  return {
    slug: dest.slug,
    checklistId,
    country: dest.country,
    isoCode: dest.isoCode,
    numericId: geo.numericId,
    lon: geo.lon,
    lat: geo.lat,
    region: dest.region,
    channel: dest.channel,
    accentHex: dest.accentHex,
    visaType: dest.facts.visaType,
    entryType: dest.facts.entryType,
    stayLimit: dest.facts.stayDuration,
    processingTime: dest.facts.processingTime,
    processingEstimate,
    heroPromise: dest.heroPromise,
    detailPath: `/visas/${dest.slug}`,
    showPrecisionPin: Boolean(geo.showPrecisionPin),
    totalChecklistItems: sampleDoc.totalItems,
    coreChecklistItems: sampleDoc.coreItems,
  };
});

const DESTINATION_BY_SLUG = new Map<string, GlobeDestinationNode>(
  GLOBE_DESTINATIONS.map((node) => [node.slug, node]),
);

const DESTINATION_BY_NUMERIC_ID = new Map<string, GlobeDestinationNode>();
for (const node of GLOBE_DESTINATIONS) {
  if (node.numericId) {
    DESTINATION_BY_NUMERIC_ID.set(node.numericId, node);
  }
}

export function normalizeNumericCountryId(id: string | number | undefined | null): string {
  if (id === undefined || id === null) return '';
  const digits = String(id).trim();
  if (!digits) return '';
  return digits.padStart(3, '0');
}

export function resolveGlobeDestinationByNumericId(
  id: string | number | undefined | null,
): GlobeDestinationNode | null {
  const normalized = normalizeNumericCountryId(id);
  if (!normalized) return null;
  const direct = DESTINATION_BY_NUMERIC_ID.get(normalized);
  if (direct) return direct;
  if (SECONDARY_SCHENGEN_NUMERIC_IDS.has(normalized)) {
    return DESTINATION_BY_SLUG.get('schengen-states') ?? null;
  }
  return null;
}

export function getGlobeDestinationBySlug(slug: string): GlobeDestinationNode | undefined {
  return DESTINATION_BY_SLUG.get(slug);
}

export function getGlobeDestinationByChecklistId(
  checklistId: string,
): GlobeDestinationNode | undefined {
  return DESTINATION_BY_SLUG.get(checklistIdToDestinationSlug(checklistId));
}

export function isCountryHighlightedOnGlobe(id: string | number | undefined | null): boolean {
  return resolveGlobeDestinationByNumericId(id) !== null;
}

/**
 * Computes D3 geoOrthographic rotation [lambda, phi, gamma] that smoothly
 * centers the target (lon, lat) on the front hemisphere with comfortable tilt.
 */
export function computeRotationForCoordinates(
  lon: number,
  lat: number,
): [number, number, number] {
  const clampedLat = Math.max(-55, Math.min(55, lat));
  return [Number((-lon).toFixed(2)), Number((-clampedLat).toFixed(2)), 0];
}

/**
 * Returns true if the given (lon, lat) point lies on the visible front hemisphere
 * for the current D3 orthographic rotation [lambda, phi, gamma].
 */
export function isPointOnFrontHemisphere(
  lon: number,
  lat: number,
  rotation: [number, number, number],
): boolean {
  const center: [number, number] = [-rotation[0], -rotation[1]];
  return geoDistance([lon, lat], center) < Math.PI / 2 - 0.04;
}

/**
 * Builds a smooth GeoJSON spherical great-circle LineString between two lon/lat points.
 */
export function buildGreatCircleArc(
  from: [number, number],
  to: [number, number],
  steps = 40,
): { type: 'LineString'; coordinates: [number, number][] } {
  const safeSteps = Math.max(4, steps);
  const interpolator = geoInterpolate(from, to);
  const coordinates: [number, number][] = [];
  for (let i = 0; i <= safeSteps; i += 1) {
    const pt = interpolator(i / safeSteps);
    coordinates.push([Number(pt[0].toFixed(3)), Number(pt[1].toFixed(3))]);
  }
  return {
    type: 'LineString',
    coordinates,
  };
}

export const REGION_CAMERA_PRESETS: readonly RegionCameraPreset[] = [
  { id: 'All', rotation: [-55, -24, 0], scaleMultiplier: 1 },
  { id: 'Europe & UK', rotation: [-14, -49, 0], scaleMultiplier: 1.38 },
  { id: 'North America', rotation: [98, -42, 0], scaleMultiplier: 1.1 },
  { id: 'Southeast Asia', rotation: [-107, -8, 0], scaleMultiplier: 1.26 },
  { id: 'East Asia', rotation: [-128, -34, 0], scaleMultiplier: 1.28 },
  { id: 'South Asia', rotation: [-80, -20, 0], scaleMultiplier: 1.28 },
  { id: 'Central Asia & Gulf', rotation: [-58, -32, 0], scaleMultiplier: 1.32 },
  { id: 'Oceania', rotation: [-148, 28, 0], scaleMultiplier: 1.16 },
  { id: 'Africa', rotation: [-18, 4, 0], scaleMultiplier: 1.08 },
];

export function filterGlobeDestinations(
  region: RegionId | 'All',
  channel: VisaChannel | 'All',
): GlobeDestinationNode[] {
  return GLOBE_DESTINATIONS.filter((node) => {
    if (region !== 'All' && node.region !== region) return false;
    if (channel !== 'All' && node.channel !== channel) return false;
    return true;
  });
}

/**
 * Classifies an indicative consular processing window string into a quick-decision
 * turnaround speed tier ('fast' <= 9d, 'standard' 10-25d, 'extended' > 25d or interview wait).
 */
export function classifyGlobeProcessingSpeed(estimate: string): GlobeTurnaroundSpeed {
  const normalized = estimate.trim().toLowerCase();
  if (/appointment\s+wait|interview/i.test(normalized)) {
    return 'extended';
  }
  const rangeMatch = normalized.match(/(\d+)\s*[–-]\s*(\d+)\s*(working\s+days?|calendar\s+days?|days?|weeks?)/i);
  const singleMatch = normalized.match(/(\d+)\s*(working\s+days?|calendar\s+days?|days?|weeks?)/i);
  const match = rangeMatch ?? singleMatch;
  if (!match) return 'standard';

  const low = Number(match[1]);
  const high = rangeMatch ? Number(match[2]) : low;
  const unit = (rangeMatch ? match[3] : match[2]).toLowerCase();
  const multiplier = unit.startsWith('week') ? 7 : unit.startsWith('working') ? 1.4 : 1;
  const medianCalendarDays = Math.round(((low + high) / 2) * multiplier);

  if (medianCalendarDays <= 9) return 'fast';
  if (medianCalendarDays <= 25) return 'standard';
  return 'extended';
}

/**
 * Builds the concise quick-look summary displayed inside the 3D globe's
 * hover-triggered tooltip for any highlighted destination country.
 */
export function buildGlobeHoverSummary(node: GlobeDestinationNode): GlobeHoverSummary {
  const processingEstimate = node.processingEstimate.trim();
  return {
    slug: node.slug,
    country: node.country,
    isoCode: node.isoCode,
    region: node.region,
    accentHex: node.accentHex,
    primaryVisaType: node.visaType.trim(),
    entryType: node.entryType.trim(),
    processingEstimate,
    turnaroundSpeed: classifyGlobeProcessingSpeed(processingEstimate),
    channel: node.channel,
    coreChecklistItems: node.coreChecklistItems,
  };
}

/**
 * Maps an SVG viewBox point (svgX, svgY) to stage-relative pixel coordinates
 * so keyboard-focused countries position the floating tooltip identically to pointer hover.
 */
export function projectSvgPointToStage(
  svgX: number,
  svgY: number,
  svgRect: { left: number; top: number; width: number; height: number },
  stageRect: { left: number; top: number; width: number; height: number },
  viewBoxSize = 560,
): { x: number; y: number; width: number; height: number } {
  const scaleX = svgRect.width / viewBoxSize;
  const scaleY = svgRect.height / viewBoxSize;
  return {
    x: svgRect.left - stageRect.left + svgX * scaleX,
    y: svgRect.top - stageRect.top + svgY * scaleY,
    width: stageRect.width,
    height: stageRect.height,
  };
}

/**
 * Computes edge-clamped (left, top) coordinates for a floating hover tooltip
 * inside the 3D globe canvas so it never clips beyond any container boundary.
 */
export function computeGlobeTooltipPosition(
  pointerX: number,
  pointerY: number,
  containerWidth: number,
  containerHeight: number,
  tooltipWidth = 296,
  tooltipHeight = 204,
): GlobeTooltipPosition {
  const margin = 12;
  const offset = 16;

  const safeW = Math.max(tooltipWidth + margin * 2, containerWidth);
  const safeH = Math.max(tooltipHeight + margin * 2, containerHeight);

  let placementX: 'right' | 'left' = 'right';
  let left = pointerX + offset;
  if (left + tooltipWidth + margin > safeW) {
    placementX = 'left';
    left = pointerX - tooltipWidth - offset;
  }
  left = Math.max(margin, Math.min(safeW - tooltipWidth - margin, left));

  let placementY: 'below' | 'above' = 'above';
  let top = pointerY - tooltipHeight - 12;
  if (top < margin) {
    placementY = 'below';
    top = pointerY + offset;
  }
  top = Math.max(margin, Math.min(safeH - tooltipHeight - margin, top));

  return {
    left: Math.round(left),
    top: Math.round(top),
    placementX,
    placementY,
  };
}
