import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckSquare, Clock, Compass, Globe2 } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import type { RegionId } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  buildGlobalWaitOverview,
  filterWorldVisaEntries,
  findFasterAlternatives,
  POPULAR_BENCHMARK_SLUGS,
  REGIONAL_WAIT_SUMMARIES,
  type TurnaroundFilterId,
  type TurnaroundTier,
  WORLD_VISA_ENTRIES,
} from '../utils/worldVisaHub';

export interface WorldVisaHubProps {
  id?: string;
  eyebrow?: string;
  headingAs?: 'h2' | 'h3';
  onSelectDestination?: (checklistId: string) => void;
  checklistAnchorId?: string;
}

export function WorldVisaHub({
  id = 'world-visa-hub',
  eyebrow,
  headingAs = 'h2',
  onSelectDestination,
  checklistAnchorId = 'document-checklist',
}: WorldVisaHubProps) {
  const { t, isUrdu, localizeCountry, localizeRegion, localizeChannel } = useLanguage();
  const h = t.worldVisaHub;

  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'All'>('All');
  const [turnaroundFilter, setTurnaroundFilter] = useState<TurnaroundFilterId>('under_10');
  const [eVisaOnly, setEVisaOnly] = useState(false);
  const [benchmarkSlug, setBenchmarkSlug] = useState<string>('canada');
  const [lastSyncedSlug, setLastSyncedSlug] = useState<string | null>(null);

  const overview = useMemo(() => buildGlobalWaitOverview(), []);
  const maxRegionAvg = useMemo(
    () => Math.max(...REGIONAL_WAIT_SUMMARIES.map((r) => r.avgMedianDays), 1),
    [],
  );

  const { target: benchmarkTarget, alternatives } = useMemo(
    () => findFasterAlternatives(benchmarkSlug, 4),
    [benchmarkSlug],
  );

  const filteredEntries = useMemo(
    () =>
      filterWorldVisaEntries({
        region: selectedRegion,
        turnaround: turnaroundFilter,
        eVisaOnly,
      }),
    [selectedRegion, turnaroundFilter, eVisaOnly],
  );

  const handleRegionSelect = (region: RegionId) => {
    if (selectedRegion === region) {
      setSelectedRegion('All');
      return;
    }
    setSelectedRegion(region);
    // Ensure selecting a moderate/extended region immediately shows its destinations
    const summary = REGIONAL_WAIT_SUMMARIES.find((r) => r.region === region);
    if (summary && turnaroundFilter === 'under_10' && summary.minDays > 11) {
      setTurnaroundFilter('all');
    } else if (summary && turnaroundFilter === 'under_21' && summary.minDays > 21) {
      setTurnaroundFilter('all');
    }
    if (summary && eVisaOnly && summary.eVisaCount === 0) {
      setEVisaOnly(false);
    }
  };

  const handleLoadChecklist = (checklistId: string, slug: string) => {
    setLastSyncedSlug(slug);
    onSelectDestination?.(checklistId);
    if (typeof document !== 'undefined' && checklistAnchorId) {
      const targetEl = document.getElementById(checklistAnchorId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const resetLedgerFilters = () => {
    setSelectedRegion('All');
    setTurnaroundFilter('all');
    setEVisaOnly(false);
  };

  const getTierLabel = (tier: TurnaroundTier): string => {
    if (tier === 'express') return h.tierExpress;
    if (tier === 'moderate') return h.tierModerate;
    return h.tierExtended;
  };

  const getTierTextClass = (tier: TurnaroundTier): string => {
    if (tier === 'express') return 'text-visa-green font-semibold';
    if (tier === 'moderate') return 'text-ink-body font-medium';
    return 'text-stamp-red font-medium';
  };

  const getBarFillColor = (isShortest: boolean, tier: TurnaroundTier): string => {
    if (isShortest) return '#0F5C4B';
    if (tier === 'moderate') return '#7A6847';
    return '#B93222';
  };

  const HeadingTag = headingAs;
  const controlFontClass = isUrdu
    ? 'text-xs font-medium'
    : 'text-xs font-mono uppercase tracking-[0.08em]';

  return (
    <section
      id={id}
      data-testid="world-visa-hub"
      aria-labelledby={`${id}-heading`}
      className="paper-card-texture border border-ink/80 rounded-[3px] p-5 sm:p-8 scroll-mt-24"
    >
      {/* Archival Header Band */}
      <div className="flex flex-wrap items-end justify-between gap-6 pb-6 border-b border-ink/70">
        <div className="max-w-3xl">
          <p className="mono-label text-visa-green">{eyebrow ?? h.eyebrow}</p>
          <HeadingTag
            id={`${id}-heading`}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-ink mt-2"
          >
            {h.heading}
          </HeadingTag>
          <p className="mt-3 text-[15px] text-ink-body leading-relaxed max-w-2xl">{h.subcopy}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-ink-muted shrink-0">
          <Globe2 className="h-4 w-4 text-visa-green shrink-0" aria-hidden="true" />
          <span className={`tabular-nums ${isUrdu ? 'font-sans font-medium' : 'font-latin-mono'}`}>
            {overview.totalRegions} {isUrdu ? 'خطے' : 'REGIONS'} · {overview.totalDestinations}{' '}
            {isUrdu ? 'ممالک' : 'DESTINATIONS'}
          </span>
        </div>
      </div>

      {/* 4-Column Global Turnaround KPI Strip */}
      <dl
        data-testid="world-hub-kpis"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-rule divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-rule"
      >
        <div className="py-4 sm:px-5 first:sm:ps-0 last:sm:pe-0">
          <dt className="mono-label text-ink-muted">{h.kpiShortestRegion}</dt>
          <dd
            className={`mt-1.5 font-display text-xl sm:text-2xl font-medium text-visa-green ${
              isUrdu ? 'leading-loose py-0.5' : ''
            }`}
          >
            {localizeRegion(overview.shortestRegion.region)}
          </dd>
          <p className={`${isUrdu ? 'mt-2' : 'mt-1'} text-xs text-ink-muted tabular-nums`}>
            {formatLocalizedCopy(h.avgDaysFormat, {
              days: overview.shortestRegion.avgMedianDays,
            })}{' '}
            <span aria-hidden="true">·</span>{' '}
            {formatLocalizedCopy(h.guidesCountFormat, {
              count: overview.shortestRegion.destinationCount,
            })}
          </p>
        </div>

        <div className="py-4 sm:px-5">
          <dt className="mono-label text-ink-muted">{h.kpiFastTrack}</dt>
          <dd className="mt-1.5 font-latin-mono text-2xl font-semibold text-ink tabular-nums">
            {overview.fastTrackCount} / {overview.totalDestinations}
          </dd>
          <p className={`${isUrdu ? 'mt-2' : 'mt-1'} text-xs text-ink-muted tabular-nums`}>
            {h.filterFastTrack} <span aria-hidden="true">·</span>{' '}
            {formatLocalizedCopy(h.eVisaCountFormat, { count: overview.eVisaCount })}
          </p>
        </div>

        <div className="py-4 sm:px-5">
          <dt className="mono-label text-ink-muted">{h.kpiGlobalAvg}</dt>
          <dd className="mt-1.5 font-latin-mono text-2xl font-semibold text-ink tabular-nums">
            ~{overview.globalAvgDays}{' '}
            <span className="text-sm font-sans font-normal text-ink-body">{h.daysUnit}</span>
          </dd>
          <p className={`${isUrdu ? 'mt-2' : 'mt-1'} text-xs text-ink-muted tabular-nums`}>
            <span className="font-latin-mono">
              {overview.fastestDestination.minCalendarDays}–{overview.longestRegion.maxDays}d
            </span>{' '}
            {isUrdu ? 'عالمی حد' : 'observed range'}
          </p>
        </div>

        <div className="py-4 sm:px-5 last:sm:pe-0">
          <dt className="mono-label text-ink-muted">{h.kpiFastestVisa}</dt>
          <dd
            className={`mt-1.5 font-display text-xl sm:text-2xl font-medium text-ink ${
              isUrdu ? 'leading-loose py-0.5' : ''
            }`}
          >
            {localizeCountry(overview.fastestDestination.country)}{' '}
            <span className="font-latin-mono text-xs font-semibold text-visa-green">
              {overview.fastestDestination.isoCode}
            </span>
          </dd>
          <p className={`${isUrdu ? 'mt-2' : 'mt-1'} text-xs text-visa-green font-medium font-latin-mono tabular-nums`}>
            {overview.fastestDestination.processingEstimate}
          </p>
        </div>
      </dl>

      {/* Main 2-Column Editorial Split: Regional Leaderboard (7) + Travel Alternatives Finder (5) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 7 Cols: Regional Turnaround Leaderboard */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="pb-4 border-b border-rule">
            <p className="mono-label text-ink-muted">{h.leaderboardEyebrow}</p>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mt-1">
              {h.leaderboardHeading}
            </h3>
            <p className="mt-1 text-xs text-ink-muted">{h.leaderboardHint}</p>
          </div>

          <div
            role="group"
            aria-label={h.leaderboardHeading}
            data-testid="world-hub-regions"
            className="divide-y divide-rule flex-1"
          >
            {REGIONAL_WAIT_SUMMARIES.map((summary) => {
              const isSelected = selectedRegion === summary.region;
              const barPct = Math.max(
                10,
                Math.min(100, Math.round((summary.avgMedianDays / maxRegionAvg) * 100)),
              );
              const rankText = String(summary.rank).padStart(2, '0');

              return (
                <button
                  key={summary.region}
                  type="button"
                  data-hub-region={summary.region}
                  aria-pressed={isSelected}
                  onClick={() => handleRegionSelect(summary.region)}
                  className={`w-full text-start py-3.5 px-3 -mx-3 sm:mx-0 sm:px-3.5 transition-colors cursor-pointer rounded-[2px] ${
                    isSelected
                      ? 'bg-visa-green/10 ring-1 ring-inset ring-visa-green/50'
                      : 'hover:bg-paper-deep/50'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 min-w-0">
                      <span
                        className={`font-latin-mono text-xs font-semibold tabular-nums ${
                          summary.isShortestTurnaround ? 'text-visa-green' : 'text-ink-muted'
                        }`}
                      >
                        {rankText}
                      </span>
                      <span className="font-display text-base sm:text-lg font-medium text-ink">
                        {localizeRegion(summary.region)}
                      </span>
                      {summary.rank === 1 ? (
                        <span className="text-xs font-semibold text-visa-green">
                          <span aria-hidden="true">· </span>
                          {h.rankFastestLabel}
                        </span>
                      ) : summary.isShortestTurnaround ? (
                        <span className="text-xs font-medium text-visa-green">
                          <span aria-hidden="true">· </span>
                          {h.rankShortLabel}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-baseline gap-2 shrink-0 tabular-nums">
                      <span
                        className={`text-sm font-semibold tabular-nums ${
                          isUrdu ? 'font-sans' : 'font-latin-mono'
                        } ${
                          summary.isShortestTurnaround
                            ? 'text-visa-green'
                            : summary.tier === 'extended'
                              ? 'text-stamp-red'
                              : 'text-ink'
                        }`}
                      >
                        {formatLocalizedCopy(h.avgDaysFormat, { days: summary.avgMedianDays })}
                      </span>
                    </div>
                  </div>

                  {/* Proportional Wait-Time Bar */}
                  <div
                    className="mt-2 h-2 w-full bg-paper-deep rounded-[1px] overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${barPct}%`,
                        backgroundColor: getBarFillColor(
                          summary.isShortestTurnaround,
                          summary.tier,
                        ),
                      }}
                    />
                  </div>

                  {/* Quiet Unboxed Regional Metadata */}
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-ink-muted">
                    <span className="tabular-nums">
                      {formatLocalizedCopy(h.guidesCountFormat, {
                        count: summary.destinationCount,
                      })}
                      {summary.eVisaCount > 0 ? (
                        <>
                          {' '}
                          <span aria-hidden="true">·</span>{' '}
                          <span className="text-visa-green font-medium">
                            {formatLocalizedCopy(h.eVisaCountFormat, {
                              count: summary.eVisaCount,
                            })}
                          </span>
                        </>
                      ) : null}
                    </span>

                    <span className="truncate">
                      {h.fastestInRegionPrefix}{' '}
                      <strong className="font-medium text-ink">
                        {localizeCountry(summary.fastestDestination.country)}
                      </strong>{' '}
                      <span className="font-latin-mono text-[11px] tabular-nums">
                        ({summary.fastestDestination.processingEstimate})
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: Data-Backed Travel Alternatives Finder */}
        <aside
          data-testid="world-hub-alternatives"
          aria-label={h.alternativesHeading}
          className="lg:col-span-5 bg-paper/75 border border-rule rounded-[2px] p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="pb-4 border-b border-rule">
              <p className="mono-label text-visa-green">{h.alternativesEyebrow}</p>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mt-1">
                {h.alternativesHeading}
              </h3>
            </div>

            {/* Target Destination Selector */}
            <div className="mt-4">
              <label
                htmlFor={`${id}-compare-select`}
                className="block mono-label text-ink-muted mb-2"
              >
                {h.compareTargetLabel}
              </label>
              <select
                id={`${id}-compare-select`}
                data-testid="world-hub-compare-select"
                value={benchmarkSlug}
                onChange={(e) => setBenchmarkSlug(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2 bg-slip border border-ink/50 rounded-[2px] text-sm text-ink focus:border-visa-green"
              >
                {[...WORLD_VISA_ENTRIES]
                  .sort((a, b) => b.medianCalendarDays - a.medianCalendarDays)
                  .map((dest) => (
                    <option key={dest.slug} value={dest.slug}>
                      {localizeCountry(dest.country)} ({dest.isoCode}) — ~{dest.medianCalendarDays}{' '}
                      {h.daysUnit}
                    </option>
                  ))}
              </select>

              {/* Quick Slower-Route Benchmark Buttons */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {POPULAR_BENCHMARK_SLUGS.map((slug) => {
                  const dest = WORLD_VISA_ENTRIES.find((item) => item.slug === slug);
                  if (!dest) return null;
                  const active = benchmarkSlug === slug;
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => setBenchmarkSlug(slug)}
                      aria-pressed={active}
                      className={`min-h-[34px] px-2.5 py-1 text-xs rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-ink text-slip border-ink'
                          : 'bg-slip text-ink-body border-rule hover:border-ink/60'
                      }`}
                    >
                      {localizeCountry(dest.country)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Target Benchmark Readout */}
            <div className="mt-4 py-3 px-3.5 bg-paper-deep/65 border border-rule rounded-[2px] space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-display text-base font-medium text-ink">
                  {localizeCountry(benchmarkTarget.country)}{' '}
                  <span className="font-latin-mono text-xs text-ink-muted">
                    {benchmarkTarget.isoCode}
                  </span>
                </p>
                <p
                  className={`text-xs font-semibold text-stamp-red tabular-nums shrink-0 ${
                    isUrdu ? 'font-sans' : 'font-latin-mono'
                  }`}
                >
                  {formatLocalizedCopy(h.avgDaysFormat, {
                    days: benchmarkTarget.medianCalendarDays,
                  })}
                </p>
              </div>
              <p className="text-xs text-ink-muted leading-snug">
                <span>{h.currentWaitLabel}: </span>
                <span className="font-latin-mono text-[11px] text-ink-body tabular-nums">
                  {benchmarkTarget.processingEstimate}
                </span>
              </p>
            </div>

            {/* Faster Alternative Matches */}
            {alternatives.length === 0 ? (
              <div className="mt-5 py-6 text-center border-t border-rule">
                <p className="font-display text-lg text-ink">{h.noFasterTitle}</p>
                <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">{h.noFasterBody}</p>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-rule" data-testid="world-hub-alternatives-list">
                {alternatives.map((alt) => {
                  const isSynced = lastSyncedSlug === alt.destination.slug;
                  return (
                    <li key={alt.destination.slug} className="py-3.5 first:pt-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="font-display text-base font-medium text-ink">
                              {localizeCountry(alt.destination.country)}
                            </span>
                            <span className="font-latin-mono text-xs font-semibold text-visa-green">
                              {alt.destination.isoCode}
                            </span>
                            <span className="text-xs text-ink-muted">
                              <span aria-hidden="true">· </span>
                              {localizeRegion(alt.destination.region)}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-ink-body">
                            <span className="inline-flex items-center gap-1 font-latin-mono tabular-nums">
                              <Clock className="h-3 w-3 text-visa-green shrink-0" aria-hidden="true" />
                              {alt.destination.processingEstimate}
                            </span>
                            {alt.isEVisaAdvantage ? (
                              <span className="text-ink-muted">
                                <span aria-hidden="true">· </span>
                                {h.eVisaShortcutLabel}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <span
                          className={`shrink-0 text-xs font-semibold text-visa-green tabular-nums ${
                            isUrdu ? 'font-sans' : 'font-latin-mono'
                          }`}
                        >
                          {formatLocalizedCopy(h.daysSavedFormat, { days: alt.daysSaved })}
                        </span>
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center gap-3">
                        {onSelectDestination ? (
                          <button
                            type="button"
                            data-hub-load-checklist={alt.destination.slug}
                            onClick={() =>
                              handleLoadChecklist(alt.destination.checklistId, alt.destination.slug)
                            }
                            className={`inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 text-xs font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                              isSynced
                                ? 'bg-visa-green text-slip border-visa-green'
                                : 'bg-slip text-ink border-ink/60 hover:border-visa-green hover:text-visa-green'
                            }`}
                          >
                            <CheckSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                            <span>{h.loadChecklistBtn}</span>
                          </button>
                        ) : null}

                        <Link
                          to={alt.destination.detailPath}
                          className="inline-flex items-center gap-1 min-h-[36px] text-xs font-medium text-visa-green hover:underline underline-offset-4 whitespace-nowrap"
                        >
                          <span>{h.viewGuideBtn}</span>
                          <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <p className="mt-4 pt-3 border-t border-rule text-[11px] text-ink-muted leading-relaxed">
            <Compass className="h-3.5 w-3.5 inline-block me-1 text-visa-green align-text-bottom" aria-hidden="true" />
            {h.disclaimerSuffix}
          </p>
        </aside>
      </div>

      {/* Bottom Filterable Global Processing Wait-Time Ledger */}
      <div className="mt-8 pt-6 border-t border-ink/70">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-ink">
              {h.ledgerHeading}
              {selectedRegion !== 'All' ? (
                <span className="text-visa-green"> · {localizeRegion(selectedRegion)}</span>
              ) : null}
            </h3>
          </div>

          <span
            className="mono-label text-ink-muted tabular-nums"
            aria-live="polite"
            data-testid="world-hub-ledger-count"
          >
            {formatLocalizedCopy(h.showingCount, {
              shown: filteredEntries.length,
              total: WORLD_VISA_ENTRIES.length,
            })}
          </span>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {(
            [
              { id: 'under_10', label: h.filterFastTrack },
              { id: 'under_21', label: h.filterUnderThreeWeeks },
              { id: 'all', label: h.filterAllCountries },
            ] as const
          ).map((tab) => {
            const active = turnaroundFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-hub-turnaround={tab.id}
                aria-pressed={active}
                onClick={() => setTurnaroundFilter(tab.id)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${controlFontClass} ${
                  active
                    ? 'bg-visa-green text-slip border-visa-green'
                    : 'bg-slip text-ink-body border-rule hover:border-ink/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          <button
            type="button"
            data-hub-evisa-toggle="true"
            aria-pressed={eVisaOnly}
            onClick={() => setEVisaOnly((prev) => !prev)}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${controlFontClass} ${
              eVisaOnly
                ? 'bg-ink text-slip border-ink'
                : 'bg-slip text-ink-body border-rule hover:border-ink/60'
            }`}
          >
            {h.filterEVisaOnly}
          </button>

          {selectedRegion !== 'All' ? (
            <button
              type="button"
              onClick={() => setSelectedRegion('All')}
              className={`ms-auto min-h-[40px] px-2 text-stamp-red hover:underline underline-offset-4 cursor-pointer whitespace-nowrap ${controlFontClass}`}
            >
              {h.clearRegionBtn}
            </button>
          ) : null}
        </div>

        {/* Wait-Time Comparison Table */}
        {filteredEntries.length === 0 ? (
          <div className="py-8 px-5 bg-paper/70 border border-rule rounded-[2px] text-center">
            <p className="font-display text-lg text-ink">{h.emptyTitle}</p>
            <p className="mt-1 text-sm text-ink-muted">{h.emptyBody}</p>
            <button
              type="button"
              onClick={resetLedgerFilters}
              className="mt-4 inline-flex items-center justify-center min-h-[40px] px-4 py-2 bg-visa-green text-slip text-xs font-medium rounded-[2px] cursor-pointer"
            >
              {t.common.resetFilters}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto border border-rule rounded-[2px] bg-slip">
            <table className="w-full text-start border-collapse text-sm" data-testid="world-hub-table">
              <thead>
                <tr className="border-b border-ink/60 bg-paper-deep/55">
                  <th className="py-3 px-4 mono-label text-ink text-start">{h.colCountry}</th>
                  <th className="py-3 px-4 mono-label text-ink text-start">{h.colRegion}</th>
                  <th className="py-3 px-4 mono-label text-ink text-start">{h.colChannel}</th>
                  <th className="py-3 px-4 mono-label text-ink text-start">{h.colProcessing}</th>
                  <th className="py-3 px-4 mono-label text-ink text-start">{h.colTurnaround}</th>
                  <th className="py-3 px-4 mono-label text-ink text-end">{h.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {filteredEntries.map((entry) => (
                  <tr key={entry.slug} className="hover:bg-paper/60 transition-colors">
                    <td className="py-3 px-4 font-medium whitespace-nowrap">
                      <Link
                        to={entry.detailPath}
                        className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                      >
                        {localizeCountry(entry.country)}
                      </Link>{' '}
                      <span className="font-latin-mono text-[11px] font-semibold text-ink-muted">
                        {entry.isoCode}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-ink-body whitespace-nowrap">
                      {localizeRegion(entry.region)}
                    </td>
                    <td className="py-3 px-4 text-ink-body whitespace-nowrap">
                      {localizeChannel(entry.channel)}
                    </td>
                    <td className="py-3 px-4 text-ink font-latin-mono text-xs tabular-nums">
                      {entry.processingEstimate}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`text-xs ${getTierTextClass(entry.tier)}`}>
                        {getTierLabel(entry.tier)}
                      </span>
                      <span className="ms-1.5 font-latin-mono text-[11px] text-ink-muted tabular-nums">
                        (~{entry.medianCalendarDays}d)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-3">
                        {onSelectDestination ? (
                          <button
                            type="button"
                            onClick={() => handleLoadChecklist(entry.checklistId, entry.slug)}
                            className="text-xs font-medium text-ink hover:text-visa-green hover:underline underline-offset-4 cursor-pointer"
                          >
                            {h.loadChecklistBtn}
                          </button>
                        ) : null}
                        <Link
                          to={entry.detailPath}
                          className="inline-flex items-center gap-1 text-xs font-medium text-visa-green hover:underline underline-offset-4"
                        >
                          <span>{h.viewGuideBtn}</span>
                          <ArrowRight className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-xs text-ink-muted">
          {SITE_CONFIG.disclaimer}
        </p>
      </div>
    </section>
  );
}
