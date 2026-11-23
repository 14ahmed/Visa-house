import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Globe2, MapPin } from 'lucide-react';
import {
  buildFlightArcPath,
  getAtlasPins,
  getLandmassPaths,
  MAP_VIEWBOX_HEIGHT,
  MAP_VIEWBOX_WIDTH,
  PAKISTAN_HUB,
  projectLonLat,
  type AtlasScope,
  type ProjectedPin,
} from '../utils/atlasMapData';

interface DestinationAtlasMapProps {
  id?: string;
  sectionNumber?: string;
  heading?: string;
  subcopy?: string;
}

/**
 * Editorial cartographic SVG map highlighting popular Schengen and global visa
 * destinations from Pakistan, with hover/focus tooltips and mobile tap-inspect ledger.
 */
export function DestinationAtlasMap({
  id = 'route-map',
  sectionNumber = 'No. 01 — Consular Route Atlas',
  heading = 'Explore Schengen & global destinations on the visa map',
  subcopy = 'Hover or focus any destination pin for a quick visa-type summary, switch to Schengen Focus to inspect European hotspots, or click through to the full country checklist.',
}: DestinationAtlasMapProps) {
  const titleId = useId();
  const [scope, setScope] = useState<AtlasScope>('global');
  const [channelFilter, setChannelFilter] = useState<'all' | 'schengen' | 'evisa'>('all');
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string>('schengen-states');

  const landmassPaths = useMemo(() => getLandmassPaths(scope), [scope]);
  const globalPins = useMemo(() => getAtlasPins('global'), []);
  const schengenPins = useMemo(() => getAtlasPins('schengen'), []);
  const allPins = scope === 'global' ? globalPins : schengenPins;

  const visiblePins = useMemo(() => {
    if (scope === 'schengen') return allPins;
    if (channelFilter === 'schengen') return allPins.filter((p) => p.isSchengen);
    if (channelFilter === 'evisa') {
      return allPins.filter((p) => p.channelGroup === 'e-Visa');
    }
    return allPins;
  }, [allPins, channelFilter, scope]);

  const hubPos = useMemo(
    () => projectLonLat(PAKISTAN_HUB.lon, PAKISTAN_HUB.lat, scope),
    [scope],
  );

  const inspectedPin: ProjectedPin | undefined = useMemo(() => {
    const targetId = activePinId ?? selectedPinId;
    return (
      visiblePins.find((p) => p.id === targetId) ??
      visiblePins[0] ??
      allPins[0]
    );
  }, [activePinId, allPins, selectedPinId, visiblePins]);

  const hoveredTooltipPin: ProjectedPin | undefined = useMemo(() => {
    if (!activePinId) return undefined;
    return visiblePins.find((p) => p.id === activePinId);
  }, [activePinId, visiblePins]);

  const handleScopeChange = (nextScope: AtlasScope) => {
    setScope(nextScope);
    setActivePinId(null);
    setChannelFilter(nextScope === 'schengen' ? 'schengen' : 'all');
    setSelectedPinId(nextScope === 'schengen' ? 'sch-fra' : 'schengen-states');
  };

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="bg-slip border border-ink/80 rounded-[3px] p-5 sm:p-8 lg:p-10 scroll-mt-24"
    >
      {/* Editorial Header + Scope Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-ink/75">
        <div className="max-w-3xl">
          <p className="mono-label text-visa-green">{sectionNumber}</p>
          <h2
            id={titleId}
            className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5"
          >
            {heading}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-body leading-relaxed">{subcopy}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleScopeChange('global')}
            aria-pressed={scope === 'global'}
            className={`inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-mono uppercase tracking-[0.1em] rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
              scope === 'global'
                ? 'bg-ink text-slip border-ink'
                : 'bg-paper text-ink-body border-rule hover:border-ink/60'
            }`}
          >
            <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Global Atlas ({globalPins.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleScopeChange('schengen')}
            aria-pressed={scope === 'schengen'}
            className={`inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-mono uppercase tracking-[0.1em] rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
              scope === 'schengen'
                ? 'bg-visa-green text-slip border-visa-green'
                : 'bg-paper text-ink-body border-rule hover:border-ink/60'
            }`}
          >
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Schengen Focus ({schengenPins.length})</span>
          </button>
        </div>
      </div>

      {/* Filter & Legend Strip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mono-label text-ink-muted mr-1">Highlight:</span>
          {scope === 'global' ? (
            <>
              <button
                type="button"
                onClick={() => setChannelFilter('all')}
                aria-pressed={channelFilter === 'all'}
                className={`min-h-[36px] px-3 py-1 text-xs font-mono rounded-[2px] border cursor-pointer transition-colors ${
                  channelFilter === 'all'
                    ? 'bg-paper-deep border-ink text-ink font-medium'
                    : 'bg-paper border-rule text-ink-muted hover:text-ink'
                }`}
              >
                All ({allPins.length})
              </button>
              <button
                type="button"
                onClick={() => setChannelFilter('schengen')}
                aria-pressed={channelFilter === 'schengen'}
                className={`min-h-[36px] px-3 py-1 text-xs font-mono rounded-[2px] border cursor-pointer transition-colors ${
                  channelFilter === 'schengen'
                    ? 'bg-visa-green-soft border-visa-green text-visa-green font-medium'
                    : 'bg-paper border-rule text-ink-muted hover:text-ink'
                }`}
              >
                Schengen Corridor
              </button>
              <button
                type="button"
                onClick={() => setChannelFilter('evisa')}
                aria-pressed={channelFilter === 'evisa'}
                className={`min-h-[36px] px-3 py-1 text-xs font-mono rounded-[2px] border cursor-pointer transition-colors ${
                  channelFilter === 'evisa'
                    ? 'bg-marigold/30 border-ink/60 text-ink font-medium'
                    : 'bg-paper border-rule text-ink-muted hover:text-ink'
                }`}
              >
                e-Visa Channels Only
              </button>
            </>
          ) : (
            <span className="font-mono text-xs text-visa-green">
              Zoomed onto Popular Schengen States · Official VFS / BLS Channels
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-visa-green inline-block" />
            Schengen / Priority Route
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-stamp-red inline-block" />
            Global Guide
          </span>
          {scope === 'global' && (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 border border-ink bg-ink inline-block" />
              PAK Origin
            </span>
          )}
        </div>
      </div>

      {/* Archival SVG Map Viewport + Accessible Pin Overlay */}
      <div className="mt-5 relative w-full aspect-[1000/460] min-h-[260px] bg-paper border border-ink/70 rounded-[3px] overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${MAP_VIEWBOX_WIDTH} ${MAP_VIEWBOX_HEIGHT}`}
          className="w-full h-full block"
          aria-hidden="true"
        >
          {/* Cartographic Graticule Grid */}
          <g stroke="#D8CEBE" strokeWidth="0.75" opacity="0.75">
            {[92, 184, 276, 368].map((y) => (
              <line key={`lat-${y}`} x1="0" y1={y} x2={MAP_VIEWBOX_WIDTH} y2={y} />
            ))}
            {[166, 333, 500, 666, 833].map((x) => (
              <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2={MAP_VIEWBOX_HEIGHT} />
            ))}
          </g>

          {/* Continental Landmasses */}
          <g fill="#EBE2D0" stroke="#A69C8B" strokeWidth="1" strokeLinejoin="round">
            {landmassPaths.map((d, index) => (
              <path key={`land-${scope}-${index}`} d={d} />
            ))}
          </g>

          {/* Schengen Highlight Aura in Global View */}
          {scope === 'global' && (
            <circle
              cx={projectLonLat(10, 48, 'global').x}
              cy={projectLonLat(10, 48, 'global').y}
              r="34"
              fill="#0F5C4B"
              fillOpacity="0.1"
              stroke="#0F5C4B"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          )}

          {/* Subtle Flight Arcs from Pakistan in Global View */}
          {scope === 'global' && (
            <g fill="none">
              {visiblePins.map((pin) => {
                const isInspected = inspectedPin?.id === pin.id;
                const d = buildFlightArcPath(hubPos, pin);
                return (
                  <path
                    key={`arc-${pin.id}`}
                    d={d}
                    stroke={isInspected ? pin.accentHex : '#57534C'}
                    strokeWidth={isInspected ? 1.8 : 0.75}
                    strokeOpacity={isInspected ? 0.9 : 0.25}
                    strokeDasharray={isInspected ? 'none' : '3 3'}
                  />
                );
              })}

              {/* Pakistan Origin Beacon */}
              <g transform={`translate(${hubPos.x}, ${hubPos.y})`}>
                <rect x="-4" y="-4" width="8" height="8" fill="#1C1B19" />
                <text
                  x="0"
                  y="17"
                  textAnchor="middle"
                  fontFamily="IBM Plex Mono, monospace"
                  fontSize="9"
                  fontWeight="600"
                  letterSpacing="1"
                  fill="#1C1B19"
                >
                  PAK HUB
                </text>
              </g>
            </g>
          )}
        </svg>

        {/* Accessible Interactive Destination Pins Overlaid by Exact Projected % */}
        {visiblePins.map((pin) => {
          const isInspected = inspectedPin?.id === pin.id;
          const isHovered = hoveredTooltipPin?.id === pin.id;
          return (
            <Link
              key={pin.id}
              to={pin.to}
              aria-label={`${pin.country} (${pin.isoCode}) — ${pin.visaSummary}`}
              onMouseEnter={() => {
                setActivePinId(pin.id);
                setSelectedPinId(pin.id);
              }}
              onMouseLeave={() => setActivePinId(null)}
              onFocus={() => {
                setActivePinId(pin.id);
                setSelectedPinId(pin.id);
              }}
              onBlur={() => setActivePinId(null)}
              style={{
                left: `${pin.pctX}%`,
                top: `${pin.pctY}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center w-8 h-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-visa-green ${
                isHovered || isInspected ? 'z-30' : 'z-20'
              }`}
            >
              <span
                className={`relative flex items-center justify-center rounded-full border-2 border-slip transition-transform duration-150 motion-reduce:transition-none ${
                  isHovered || isInspected ? 'h-4 w-4 scale-125' : 'h-3 w-3 group-hover:scale-125'
                } ${pin.isSchengen ? 'bg-visa-green' : 'bg-stamp-red'}`}
              />
              {/* Compact ISO Callout Badge for Spaced Anchor Hubs or Active Pin */}
              {(isInspected ||
                (scope === 'schengen' &&
                  ['FRA', 'DEU', 'ESP', 'ITA', 'GRC', 'NOR', 'FIN', 'PRT', 'POL'].includes(
                    pin.isoCode,
                  )) ||
                (scope === 'global' &&
                  ['usa', 'canada', 'schengen-states', 'australia', 'south-africa', 'japan', 'thailand'].includes(
                    pin.id,
                  ))) && (
                <span
                  className={`pointer-events-none hidden sm:inline-block absolute left-1/2 -translate-x-1/2 -top-5 px-1.5 py-0.5 rounded-[2px] font-mono text-[9px] font-semibold tracking-[0.08em] whitespace-nowrap border ${
                    isInspected
                      ? 'bg-ink text-slip border-ink'
                      : 'bg-slip/95 text-ink border-ink/40'
                  }`}
                >
                  {isInspected && scope === 'schengen'
                    ? `${pin.isoCode} · ${pin.country}`
                    : pin.isoCode}
                </span>
              )}
            </Link>
          );
        })}

        {/* Hover / Keyboard Focus Floating Visa Summary Tooltip */}
        {hoveredTooltipPin && (
          <div
            role="tooltip"
            style={{
              left: `${Math.min(82, Math.max(18, hoveredTooltipPin.pctX))}%`,
              top:
                hoveredTooltipPin.pctY > 25
                  ? `${hoveredTooltipPin.pctY - 4}%`
                  : `${hoveredTooltipPin.pctY + 4}%`,
            }}
            className={`pointer-events-none hidden sm:block absolute -translate-x-1/2 z-40 w-56 bg-slip border border-ink rounded-[3px] p-2.5 text-left ${
              hoveredTooltipPin.pctY > 25 ? '-translate-y-full' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-1 border-b border-rule">
              <span className="font-display text-sm font-semibold text-ink">
                {hoveredTooltipPin.country}
              </span>
              <span
                className="font-mono text-[10px] font-bold tracking-[0.1em]"
                style={{ color: hoveredTooltipPin.accentHex }}
              >
                {hoveredTooltipPin.isoCode}
              </span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-visa-green font-medium leading-snug">
              {hoveredTooltipPin.visaSummary}
            </p>
            <p className="mt-1 text-[11px] text-ink-body leading-snug">
              Channel: <strong className="font-medium text-ink">{hoveredTooltipPin.channelLabel}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Quick Destination Selector Chips + Active Visa-Type Summary Readout */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 bg-paper border border-rule rounded-[3px] p-4">
          <p className="mono-label text-ink-muted mb-2.5">
            {scope === 'schengen'
              ? 'Popular Schengen Countries (Tap or Hover Pin)'
              : 'Pinned Destinations (Tap or Hover to Inspect)'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visiblePins.map((pin) => {
              const selected = inspectedPin?.id === pin.id;
              return (
                <button
                  key={`chip-${pin.id}`}
                  type="button"
                  onMouseEnter={() => {
                    setActivePinId(pin.id);
                    setSelectedPinId(pin.id);
                  }}
                  onMouseLeave={() => setActivePinId(null)}
                  onClick={() => setSelectedPinId(pin.id)}
                  aria-pressed={selected}
                  className={`min-h-[36px] px-2.5 py-1 text-xs font-mono rounded-[2px] border cursor-pointer transition-colors whitespace-nowrap ${
                    selected
                      ? 'bg-ink text-slip border-ink'
                      : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                  }`}
                >
                  {pin.isoCode} · {pin.country}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pin Readout Card (always visible for touch/keyboard users) */}
        {inspectedPin && (
          <div
            aria-live="polite"
            className="lg:col-span-5 bg-paper border border-ink/70 rounded-[3px] p-4 sm:p-5 flex flex-col justify-between gap-3"
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-rule">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="h-4 w-4 shrink-0"
                    style={{ color: inspectedPin.accentHex }}
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-lg font-medium text-ink">
                    {inspectedPin.country}
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold text-visa-green">
                  {inspectedPin.isoCode}
                </span>
              </div>

              <p className="mt-2.5 font-mono text-xs uppercase tracking-[0.08em] text-visa-green">
                {inspectedPin.visaSummary}
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                Primary Channel: <strong className="text-ink">{inspectedPin.channelLabel}</strong>
              </p>
              <p className="mt-2 text-sm text-ink-body leading-relaxed">
                {inspectedPin.quickNote}
              </p>
            </div>

            <div className="pt-2 border-t border-rule flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-ink-muted">
                FROM {PAKISTAN_HUB.isoCode} DESK
              </span>
              <Link
                to={inspectedPin.to}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 bg-visa-green text-slip hover:bg-visa-green-dark text-xs font-medium rounded-[2px] transition-colors whitespace-nowrap"
              >
                <span>Open Visa Guide</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
