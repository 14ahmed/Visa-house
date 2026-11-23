import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp, Copy, Printer, Search } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { REGIONS } from '../data/destinationIndex';
import type { RegionId } from '../data/types';
import { formatLocalizedCopy } from '../utils/i18n';
import { buildPrintDocumentHeading, triggerScopedPrint } from '../utils/printDocument';
import {
  TRAVEL_READINESS_ENTRIES,
  filterTravelReadinessEntries,
  formatTravelReadinessBrief,
  getTravelReadinessBySlug,
  type TravelReadinessEntry,
} from '../utils/travelReadinessGuide';

interface TravelReadinessGuideProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingAs?: 'h2' | 'h3';
  subcopy?: string;
  /** When supplied, renders a focused single-destination archival readiness ledger (used on Country pages). */
  destinationSlug?: string;
  /** Initial visible count in full-directory archival list mode when unfiltered. */
  initialVisibleCount?: number;
  className?: string;
}

export function TravelReadinessGuide({
  id = 'travel-readiness',
  eyebrow,
  heading,
  headingAs = 'h2',
  subcopy,
  destinationSlug,
  initialVisibleCount = 8,
  className = '',
}: TravelReadinessGuideProps) {
  const { t, isUrdu, localizeCountry, localizeRegion } = useLanguage();
  const [region, setRegion] = useState<RegionId | 'All'>('All');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [expandedSlugs, setExpandedSlugs] = useState<Record<string, boolean>>({});
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [printFocusedSlug, setPrintFocusedSlug] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyBrief = (entry: TravelReadinessEntry) => {
    const text = formatTravelReadinessBrief(entry);
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text).catch(() => {
        // Clipboard permissions may be restricted in sandboxed previews.
      });
    }
    setCopiedSlug(entry.slug);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedSlug(null);
      copyTimerRef.current = null;
    }, 2600);
  };

  const handlePrintFocusedRow = (slug: string) => {
    setPrintFocusedSlug(slug);
    window.setTimeout(() => {
      triggerScopedPrint('readiness', slug, () => setPrintFocusedSlug(null));
    }, 20);
  };

  const toggleExpanded = (slug: string) => {
    setExpandedSlugs((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const filteredEntries = useMemo(
    () => filterTravelReadinessEntries(TRAVEL_READINESS_ENTRIES, { region, query }),
    [region, query],
  );

  const HeadingTag = headingAs;

  // MODE 1: Focused Single-Destination Archival Readiness Ledger (Country Guide Pages)
  if (destinationSlug) {
    const entry = getTravelReadinessBySlug(destinationSlug);
    const localizedCountry = localizeCountry(entry.country);
    const localizedRegion = localizeRegion(entry.region);
    const isCopied = copiedSlug === entry.slug;
    const rows = [
      {
        index: '01',
        label: t.readiness.rowEtiquette,
        headline: t.readiness.rowEtiquetteHead,
        body: entry.localEtiquette,
      },
      {
        index: '02',
        label: t.readiness.rowPower,
        headline: `${entry.plugTypes} · ${entry.voltage}`,
        body: entry.adapterNote,
        monoHeadline: true,
      },
      {
        index: '03',
        label: t.readiness.rowSim,
        headline: t.readiness.rowSimHead,
        body: entry.simRecommendation,
      },
      {
        index: '04',
        label: t.readiness.rowCurrency,
        headline: t.readiness.rowCurrencyHead,
        body: entry.currencyAndTransit,
      },
      {
        index: '05',
        label: t.readiness.rowEmergency,
        headline: t.readiness.rowEmergencyHead,
        body: entry.emergencyAndArrival,
      },
    ];

    return (
      <section
        id={id}
        data-testid="travel-readiness-guide"
        data-mode="single"
        data-destination={entry.slug}
        data-print-document="true"
        data-print-kind="readiness"
        className={`paper-card-texture border border-ink/75 rounded-[3px] p-5 sm:p-7 lg:p-8 scroll-mt-24 ${className}`}
      >
        {/* Print-only letterhead when printing readiness card standalone */}
        <div className="print-only print-letterhead print-readiness-solo-header" aria-hidden="true">
          <div>
            <p className="print-letterhead-brand">{SITE_CONFIG.brandName}</p>
            <p className="mono-label mt-1">
              {buildPrintDocumentHeading('readiness', entry.country)}
            </p>
          </div>
          <div className="print-letterhead-meta">
            <p>
              {entry.isoCode} · {entry.region}
            </p>
            <p>
              {SITE_CONFIG.domain} · {SITE_CONFIG.email}
            </p>
          </div>
        </div>

        <div className="print-readiness-header flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-ink/75">
          <div className="max-w-2xl">
            <p className="mono-label text-ink-muted">
              {eyebrow ??
                formatLocalizedCopy(t.readiness.eyebrowSingle, {
                  iso: entry.isoCode,
                  region: localizedRegion,
                })}
            </p>
            <HeadingTag className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2 leading-tight">
              {heading ?? `${localizedCountry} — ${t.readiness.headingDirectory}`}
            </HeadingTag>
            <p className="no-print mt-2 text-sm sm:text-[15px] text-ink-body leading-relaxed">
              {subcopy ??
                formatLocalizedCopy(t.readiness.subcopySingle, {
                  country: localizedCountry,
                })}
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2 self-start sm:self-end shrink-0">
            <button
              type="button"
              onClick={() => triggerScopedPrint('readiness')}
              className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 bg-slip border border-ink/50 text-ink hover:border-visa-green hover:text-visa-green text-xs sm:text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Printer className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t.common.printSheet}</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopyBrief(entry)}
              className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 bg-visa-green text-slip text-xs sm:text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors cursor-pointer whitespace-nowrap"
            >
              <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{isCopied ? t.readiness.fieldCardCopied : t.readiness.copyFieldCard}</span>
            </button>
          </div>
        </div>

        <ol className="divide-y divide-rule" data-testid="travel-readiness-list">
          {rows.map((row) => (
            <li
              key={row.index}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-latin-mono text-xs font-semibold text-visa-green tabular-nums shrink-0">
                  {row.index}
                </span>
                <span className="mono-label text-ink">{row.label}</span>
              </div>
              <div className="md:col-span-8">
                <p
                  className={
                    row.monoHeadline
                      ? 'font-latin-mono text-sm font-semibold text-ink tabular-nums'
                      : 'font-display text-lg font-medium text-ink leading-snug'
                  }
                >
                  {row.headline}
                </p>
                <p className="mt-1.5 text-sm text-ink-body leading-relaxed">{row.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Print-only archival footer */}
        <div className="print-only print-doc-footer" aria-hidden="true">
          <span>{t.common.disclaimer}</span>
          <span className="font-latin-mono whitespace-nowrap">
            {SITE_CONFIG.brandName} · {SITE_CONFIG.domain}
          </span>
        </div>
      </section>
    );
  }

  // MODE 2: All-Destinations Archival Readiness Directory (Home & Visas Directory Pages)
  const isFiltering = region !== 'All' || query.trim() !== '';
  const visibleEntries =
    isFiltering || showAll ? filteredEntries : filteredEntries.slice(0, initialVisibleCount);
  const remainingCount = Math.max(0, filteredEntries.length - visibleEntries.length);

  const resetFilters = () => {
    setRegion('All');
    setQuery('');
  };

  return (
    <section
      id={id}
      data-testid="travel-readiness-guide"
      data-mode="directory"
      data-print-document="true"
      data-print-kind="readiness"
      className={`paper-card-texture border border-ink/75 rounded-[3px] p-5 sm:p-7 lg:p-8 scroll-mt-24 ${className}`}
    >
      {/* Print-Only Archival Letterhead */}
      <div className="print-only print-letterhead" aria-hidden="true">
        <div>
          <p className="print-letterhead-brand">{SITE_CONFIG.brandName}</p>
          <p className="mono-label mt-1">
            {buildPrintDocumentHeading(
              'readiness',
              printFocusedSlug ? getTravelReadinessBySlug(printFocusedSlug).country : undefined,
            )}
          </p>
        </div>
        <div className="print-letterhead-meta">
          <p>PRE-DEPARTURE FIELD REFERENCE · PAKISTAN DESK</p>
          <p>
            {SITE_CONFIG.domain} · {SITE_CONFIG.email}
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="no-print flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-rule">
        <div className="max-w-2xl">
          <p className="mono-label text-ink-muted">
            {eyebrow ??
              formatLocalizedCopy(t.readiness.eyebrowDirectory, {
                count: TRAVEL_READINESS_ENTRIES.length,
              })}
          </p>
          <HeadingTag className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2 leading-tight">
            {heading ?? t.readiness.headingDirectory}
          </HeadingTag>
          <p className="mt-2.5 text-sm sm:text-[15px] text-ink-body leading-relaxed">
            {subcopy ?? t.readiness.subcopyDirectory}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:justify-end shrink-0">
          <span
            data-testid="readiness-result-count"
            aria-live="polite"
            className="mono-label text-ink tabular-nums"
          >
            {formatLocalizedCopy(t.readiness.destinationsShown, {
              shown: filteredEntries.length,
              total: TRAVEL_READINESS_ENTRIES.length,
            })}
          </span>
          <button
            type="button"
            onClick={() => triggerScopedPrint('readiness')}
            className={`inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 py-1.5 bg-slip border border-ink/50 text-ink hover:border-visa-green hover:text-visa-green text-xs rounded-[2px] transition-colors cursor-pointer whitespace-nowrap ${
              isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
            }`}
          >
            <Printer className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{t.common.printSheet}</span>
          </button>
        </div>
      </div>

      {/* Search + Region Filter Controls (hidden in print) */}
      <div className="no-print py-5 border-b border-ink/75 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-xl">
            <label htmlFor={`${id}-search`} className="sr-only">
              {t.readiness.searchPlaceholder}
            </label>
            <Search
              className="h-4 w-4 text-ink-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={`${id}-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.readiness.searchPlaceholder}
              className="w-full min-h-[42px] ps-10 pe-3.5 py-2 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:border-visa-green"
            />
          </div>

          {isFiltering && (
            <button
              type="button"
              onClick={resetFilters}
              className={`inline-flex items-center justify-center min-h-[42px] px-4 py-2 border border-rule bg-slip text-xs text-stamp-red hover:border-stamp-red rounded-[2px] cursor-pointer whitespace-nowrap ${
                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
              }`}
            >
              {t.common.resetFilters}
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label={t.readiness.regionLabel}
          className="flex flex-wrap items-center gap-1.5"
        >
          <span className="mono-label text-ink-muted me-1">{t.readiness.regionLabel}</span>
          <button
            type="button"
            onClick={() => setRegion('All')}
            aria-pressed={region === 'All'}
            className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
              region === 'All'
                ? 'bg-visa-green text-slip border-visa-green'
                : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
            }`}
          >
            {t.common.all} ({TRAVEL_READINESS_ENTRIES.length})
          </button>
          {REGIONS.map((reg) => {
            const count = TRAVEL_READINESS_ENTRIES.filter((entry) => entry.region === reg).length;
            const active = region === reg;
            return (
              <button
                key={reg}
                type="button"
                onClick={() => setRegion(reg)}
                aria-pressed={active}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-ink text-slip border-ink'
                    : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                }`}
              >
                {localizeRegion(reg)} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Structured Archival List */}
      {visibleEntries.length === 0 ? (
        <div className="no-print py-10 text-center">
          <p className="font-display text-xl text-ink">{t.readiness.noMatchesTitle}</p>
          <p className="mt-1.5 text-sm text-ink-muted">{t.readiness.noMatchesBody}</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex items-center justify-center min-h-[42px] px-5 py-2 bg-visa-green text-slip text-xs sm:text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors cursor-pointer"
          >
            {t.common.resetFilters}
          </button>
        </div>
      ) : (
        <ol className="divide-y divide-rule" data-testid="travel-readiness-list">
          {visibleEntries.map((entry, idx) => {
            const itemNumber = String(idx + 1).padStart(2, '0');
            const isExpanded = Boolean(expandedSlugs[entry.slug]);
            const isCopied = copiedSlug === entry.slug;
            const isPrintFocused = printFocusedSlug === entry.slug;
            const localizedCountry = localizeCountry(entry.country);

            return (
              <li
                key={entry.slug}
                data-testid={`readiness-row-${entry.slug}`}
                data-readiness-slug={entry.slug}
                data-readiness-focused={isPrintFocused ? 'true' : undefined}
                className="py-6 first:pt-5"
              >
                {/* Archival Row Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3.5 border-b border-rule/75">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-latin-mono text-xs font-semibold text-ink-muted tabular-nums">
                      {itemNumber}
                    </span>
                    <span
                      className="font-latin-mono text-xs font-semibold tracking-[0.1em] tabular-nums"
                      style={{ color: entry.accentHex }}
                    >
                      {entry.isoCode}
                    </span>
                    <h3 className="font-display text-xl font-medium text-ink leading-snug">
                      {localizedCountry}
                    </h3>
                    <span aria-hidden="true" className="text-ink-muted text-xs">
                      ·
                    </span>
                    <span className="text-xs text-ink-muted">{localizeRegion(entry.region)}</span>
                  </div>

                  <div className="no-print flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(entry.slug)}
                      aria-expanded={isExpanded}
                      aria-controls={`readiness-extra-${entry.slug}`}
                      className="inline-flex items-center gap-1 min-h-[36px] px-2.5 py-1 bg-slip border border-rule hover:border-ink/60 text-xs font-medium text-ink-body hover:text-ink rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>{isExpanded ? t.readiness.hideDetails : t.readiness.moreTips}</span>
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePrintFocusedRow(entry.slug)}
                      aria-label={`${t.common.print} ${localizedCountry}`}
                      className="inline-flex items-center gap-1 min-h-[36px] px-2.5 py-1 bg-slip border border-rule hover:border-visa-green text-xs font-medium text-ink hover:text-visa-green rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Printer className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>{t.common.print}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyBrief(entry)}
                      className="inline-flex items-center gap-1.5 min-h-[36px] px-2.5 py-1 bg-slip border border-rule hover:border-visa-green text-xs font-medium text-ink hover:text-visa-green rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Copy className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span>
                        {isCopied ? t.readiness.fieldCardCopied : t.readiness.copyFieldCard}
                      </span>
                    </button>

                    <Link
                      to={`/visas/${entry.slug}`}
                      className={`inline-flex items-center gap-1 min-h-[36px] px-2 py-1 text-xs text-visa-green hover:underline underline-offset-4 whitespace-nowrap ${
                        isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                      }`}
                    >
                      <span>{t.readiness.visaGuideLink}</span>
                      <ArrowRight className="h-3 w-3 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                {/* 3-Column Archival Core Readiness Ledger */}
                <dl className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <dt className="mono-label text-ink-muted">{t.readiness.rowEtiquette}</dt>
                    <dd className="mt-1.5 text-sm text-ink-body leading-relaxed">
                      {entry.localEtiquette}
                    </dd>
                  </div>

                  <div>
                    <dt className="mono-label text-ink-muted">{t.readiness.rowPower}</dt>
                    <dd className="mt-1.5 font-latin-mono text-xs sm:text-[13px] font-semibold text-ink tabular-nums">
                      {entry.plugTypes} · {entry.voltage}
                    </dd>
                    <dd className="mt-1 text-xs sm:text-[13px] text-ink-body leading-relaxed">
                      {entry.adapterNote}
                    </dd>
                  </div>

                  <div>
                    <dt className="mono-label text-ink-muted">{t.readiness.rowSim}</dt>
                    <dd className="mt-1.5 text-sm text-ink-body leading-relaxed">
                      {entry.simRecommendation}
                    </dd>
                  </div>
                </dl>

                {/* Expandable Field Appendix: Currency/Transit & Emergency/Arrival */}
                {(isExpanded || isPrintFocused) && (
                  <dl
                    id={`readiness-extra-${entry.slug}`}
                    data-testid={`readiness-extra-${entry.slug}`}
                    className="print-expand-details mt-4 pt-4 border-t border-dashed border-rule grid grid-cols-1 md:grid-cols-2 gap-5 bg-slip/70 px-4 py-3.5 rounded-[2px]"
                  >
                    <div>
                      <dt className="mono-label text-visa-green">{t.readiness.rowCurrency}</dt>
                      <dd className="mt-1 text-sm text-ink-body leading-relaxed">
                        {entry.currencyAndTransit}
                      </dd>
                    </div>
                    <div>
                      <dt className="mono-label text-stamp-red">{t.readiness.rowEmergency}</dt>
                      <dd className="mt-1 text-sm text-ink-body leading-relaxed">
                        {entry.emergencyAndArrival}
                      </dd>
                    </div>
                  </dl>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {/* Expand / Collapse All Footer Control (hidden in print) */}
      {!isFiltering && filteredEntries.length > initialVisibleCount && (
        <div className="no-print pt-5 mt-2 border-t border-rule flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-ink-muted tabular-nums">
            {formatLocalizedCopy(t.readiness.showingSummary, {
              shown: visibleEntries.length,
              total: filteredEntries.length,
            })}
          </p>
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center justify-center min-h-[42px] px-5 py-2 bg-ink text-slip text-xs sm:text-sm font-medium rounded-[2px] hover:bg-visa-green transition-colors cursor-pointer whitespace-nowrap"
          >
            {showAll
              ? formatLocalizedCopy(t.readiness.showCompactBtn, { count: initialVisibleCount })
              : formatLocalizedCopy(t.readiness.showAllBtn, {
                  total: filteredEntries.length,
                  more: remainingCount,
                })}
          </button>
        </div>
      )}

      {/* Print-Only Archival Footer */}
      <div className="print-only print-doc-footer" aria-hidden="true">
        <span>{t.common.disclaimer}</span>
        <span className="font-latin-mono whitespace-nowrap">
          {SITE_CONFIG.brandName} · {SITE_CONFIG.domain}
        </span>
      </div>
    </section>
  );
}
