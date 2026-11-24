import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Info,
  MapPin,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import {
  SCHENGEN_CITY_OPTIONS,
  SCHENGEN_FEED_DISCLAIMER,
  SLOT_STATUS_FILTER_OPTIONS,
  SLOT_STATUS_META,
  advanceSchengenSlotFeed,
  createInitialSchengenSlotFeed,
  filterSchengenSlots,
  formatCitiesList,
  formatFeedClock,
  summarizeSlotAvailability,
  type SchengenCityId,
  type SlotStatus,
} from '../utils/schengenSlotFeed';
import { buildWhatsAppUrl } from '../utils/formatters';

interface SchengenSlotAvailabilityProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingAs?: 'h2' | 'h3';
  subcopy?: string;
  pollIntervalMs?: number;
  inquiryHref?: string;
  className?: string;
}

const INITIAL_FEED_ISO = '2026-11-23T09:00:00Z';

const STATUS_STYLE: Record<
  SlotStatus,
  {
    textClass: string;
    hoverBorderClass: string;
    icon: typeof CheckCircle2;
  }
> = {
  open: {
    textClass: 'text-visa-green',
    hoverBorderClass: 'hover:border-visa-green/45',
    icon: CheckCircle2,
  },
  limited: {
    textClass: 'text-[#8C5B00]',
    hoverBorderClass: 'hover:border-marigold/70',
    icon: Clock,
  },
  waitlist: {
    textClass: 'text-stamp-red',
    hoverBorderClass: 'hover:border-stamp-red/40',
    icon: AlertCircle,
  },
};

export function SchengenSlotAvailability({
  id = 'schengen-slots',
  eyebrow,
  heading,
  headingAs = 'h3',
  subcopy,
  pollIntervalMs = 5000,
  inquiryHref = '/schengen-appointments#apply',
  className = '',
}: SchengenSlotAvailabilityProps) {
  const { t, isUrdu, localizeCountry } = useLanguage();
  const resolvedEyebrow = eyebrow ?? t.schengenSlots.eyebrow;
  const resolvedHeading = heading ?? t.schengenSlots.heading;
  const resolvedSubcopy = subcopy ?? t.schengenSlots.subcopy;
  const [feedState, setFeedState] = useState(() => createInitialSchengenSlotFeed(INITIAL_FEED_ISO));
  const [hydrated, setHydrated] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cityFilter, setCityFilter] = useState<SchengenCityId>('all');
  const [statusFilter, setStatusFilter] = useState<SlotStatus | 'all'>('all');

  useEffect(() => {
    setHydrated(true);
    setFeedState(createInitialSchengenSlotFeed());
  }, []);

  useEffect(() => {
    if (!isStreaming) return undefined;
    const timer = window.setInterval(() => {
      setFeedState((prev) => advanceSchengenSlotFeed(prev));
    }, pollIntervalMs);

    return () => window.clearInterval(timer);
  }, [isStreaming, pollIntervalMs]);

  const filteredEntries = useMemo(
    () =>
      filterSchengenSlots(feedState.entries, {
        city: cityFilter,
        status: statusFilter,
      }),
    [feedState.entries, cityFilter, statusFilter],
  );

  const overallSummary = useMemo(
    () => summarizeSlotAvailability(feedState.entries),
    [feedState.entries],
  );

  const handleManualPoll = () => {
    setFeedState((prev) => advanceSchengenSlotFeed(prev));
  };

  const handleResetFilters = () => {
    setCityFilter('all');
    setStatusFilter('all');
  };

  const hasActiveFilters = cityFilter !== 'all' || statusFilter !== 'all';

  const HeadingTag = headingAs;

  return (
    <div
      id={id}
      data-testid="schengen-slot-availability"
      data-feed-state={isStreaming ? 'live' : 'paused'}
      data-tick-count={feedState.tickCount}
      className={`paper-card-texture border border-ink/75 rounded-[3px] p-5 sm:p-7 lg:p-8 scroll-mt-24 ${className}`}
    >
      {/* Header & Indicative Queue Guide Control Strip */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 pb-6 border-b border-rule">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mono-label text-ink-muted">
            <span
              className={`inline-flex items-center gap-1.5 ${
                isStreaming ? 'text-visa-green' : 'text-[#8C5B00]'
              }`}
            >
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  isStreaming
                    ? 'bg-visa-green animate-pulse motion-reduce:animate-none'
                    : 'bg-[#8C5B00]'
                }`}
                aria-hidden="true"
              />
              <span>
                {isStreaming
                  ? t.schengenSlots.feedLive
                  : isUrdu
                    ? 'موسمی قطار کا تخمینی جائزہ · منصوبہ بندی سمولیشن (لائیو VFS/BLS فیڈ نہیں)'
                    : 'Indicative Seasonal Queue Guide · Planning Simulation (Not Live VFS/BLS Feed)'}
              </span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{resolvedEyebrow}</span>
          </div>

          <HeadingTag className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2 leading-tight">
            {resolvedHeading}
          </HeadingTag>
          <p className="mt-2.5 text-sm sm:text-[15px] text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        {/* Feed Telemetry + Controls */}
        <div className="flex flex-col sm:items-end gap-3 shrink-0">
          <div
            className="text-xs text-ink-muted flex flex-wrap items-center gap-x-3 gap-y-1 tabular-nums"
            aria-live="polite"
          >
            <span>
              {isUrdu ? 'ڈیسک نظرثانی:' : 'Desk review:'}{' '}
              <strong className="font-latin-mono text-ink font-medium">
                {SITE_CONFIG.guideReviewDateLabel}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {t.schengenSlots.lastSync}{' '}
              <strong className="font-latin-mono text-ink font-medium">
                {hydrated ? formatFeedClock(feedState.lastPolledAt) : '--:--:--'}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {t.schengenSlots.updates}{' '}
              <strong
                className="font-latin-mono text-ink font-medium"
                data-testid="schengen-tick-count"
              >
                {feedState.tickCount}
              </strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={buildWhatsAppUrl(
                'current VFS / BLS Schengen appointment windows',
                'Hello Visahouse, please confirm the real current VFS Global / BLS International Schengen appointment availability for my target destination.',
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 border border-visa-green/60 bg-slip text-visa-green text-xs sm:text-sm font-medium rounded-[2px] hover:bg-visa-green hover:text-slip transition-colors whitespace-nowrap"
            >
              <span>{isUrdu ? 'لائیو سلاٹس واٹس ایپ پر چیک کریں' : 'Verify Real Slots on WhatsApp'}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setIsStreaming((prev) => !prev)}
              aria-pressed={!isStreaming}
              className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 border border-ink/80 bg-slip text-ink text-xs sm:text-sm font-medium rounded-[2px] hover:bg-paper-deep transition-colors cursor-pointer whitespace-nowrap"
            >
              {isStreaming ? (
                <>
                  <Pause className="h-3.5 w-3.5 text-ink shrink-0" aria-hidden="true" />
                  <span>{t.schengenSlots.pauseFeed}</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 text-visa-green shrink-0" aria-hidden="true" />
                  <span>{t.schengenSlots.resumeFeed}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleManualPoll}
              className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 bg-visa-green text-slip text-xs sm:text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t.schengenSlots.pollNow}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unboxed Summary Strip + Interactive Filters */}
      <div className="py-5 border-b border-rule flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        {/* Compact Tabular Summary */}
        <div
          className="flex flex-col gap-1 tabular-nums"
          aria-label={t.schengenSlots.heading}
        >
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-latin-mono text-base font-semibold text-visa-green">
                {overallSummary.openCount}
              </strong>
              <span className="text-ink-muted">{t.schengenSlots.openLabel}</span>
            </span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-latin-mono text-base font-semibold text-[#8C5B00]">
                {overallSummary.limitedCount}
              </strong>
              <span className="text-ink-muted">{t.schengenSlots.limitedLabel}</span>
            </span>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-latin-mono text-base font-semibold text-stamp-red">
                {overallSummary.waitlistCount}
              </strong>
              <span className="text-ink-muted">{t.schengenSlots.waitlistLabel}</span>
            </span>
          </div>
          <p className="text-xs text-ink-muted">
            <strong className="font-latin-mono font-semibold text-ink">
              {overallSummary.totalEstimatedSlots}
            </strong>{' '}
            {t.schengenSlots.estSlotsSummary}
          </p>
        </div>

        {/* City & Status Filters */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label={t.schengenSlots.cityFilterLabel}
          >
            <span className="mono-label text-ink-muted me-1">{t.schengenSlots.cityFilterLabel}</span>
            {SCHENGEN_CITY_OPTIONS.map((city) => {
              const active = cityFilter === city.id;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setCityFilter(city.id)}
                  aria-pressed={active}
                  className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-ink text-slip border-ink'
                      : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                  }`}
                >
                  {city.id === 'all' ? t.schengenSlots.allCities : city.label}
                </button>
              );
            })}
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label={t.schengenSlots.statusFilterLabel}
          >
            <span className="mono-label text-ink-muted me-1">
              {t.schengenSlots.statusFilterLabel}
            </span>
            {SLOT_STATUS_FILTER_OPTIONS.map((option) => {
              const active = statusFilter === option.id;
              const statusLabel =
                option.id === 'all'
                  ? t.schengenSlots.allStatuses
                  : option.id === 'open'
                    ? t.schengenSlots.openLabel
                    : option.id === 'limited'
                      ? t.schengenSlots.limitedLabel
                      : t.schengenSlots.waitlistLabel;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setStatusFilter(option.id)}
                  aria-pressed={active}
                  className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-visa-green text-slip border-visa-green'
                      : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                  }`}
                >
                  {statusLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Destination Slot Ledger Grid */}
      {filteredEntries.length === 0 ? (
        <div className="py-10 text-center border-b border-rule">
          <p className="font-display text-xl text-ink">{t.schengenSlots.emptyTitle}</p>
          <p className="mt-1.5 text-sm text-ink-muted">{t.schengenSlots.emptyBody}</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-4 inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-ink/80 bg-slip text-ink text-xs font-medium rounded-[2px] hover:bg-paper-deep transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.schengenSlots.resetAllFilters}</span>
            </button>
          )}
        </div>
      ) : (
        <div
          className="py-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 border-b border-rule"
          data-testid="schengen-slot-grid"
        >
          {filteredEntries.map((entry) => {
            const statusMeta = SLOT_STATUS_META[entry.status];
            const style = STATUS_STYLE[entry.status];
            const StatusIcon = style.icon;
            const waHref = buildWhatsAppUrl(
              `${entry.country} Schengen appointment & dossier readiness (${statusMeta.label})`,
            );

            return (
              <article
                key={entry.id}
                data-testid={`slot-card-${entry.id}`}
                data-slot-status={entry.status}
                className={`bg-slip border rounded-[3px] p-4 flex flex-col justify-between transition-colors duration-300 ${
                  entry.recentlyChanged
                    ? 'border-visa-green bg-[#F3F8F5]'
                    : `border-rule ${style.hoverBorderClass}`
                }`}
              >
                <div>
                  {/* Card Top Line: Country + ISO & Sync Time */}
                  <div className="flex items-baseline justify-between gap-2 pb-2.5 border-b border-rule/80">
                    <div className="min-w-0">
                      {entry.guideHref ? (
                        <Link
                          to={entry.guideHref}
                          className="font-display text-xl font-medium text-ink hover:text-visa-green hover:underline underline-offset-4 inline-flex items-baseline gap-1"
                        >
                          <span>{localizeCountry(entry.country)}</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-ink-muted shrink-0 rtl:-scale-x-100"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : (
                        <h4 className="font-display text-xl font-medium text-ink">
                          {localizeCountry(entry.country)}
                        </h4>
                      )}
                    </div>
                    <span className="font-latin-mono text-[11px] text-ink-muted tabular-nums shrink-0">
                      <strong className="font-semibold text-ink">{entry.isoCode}</strong> ·{' '}
                      {hydrated ? formatFeedClock(entry.lastUpdatedAt) : '--:--:--'}
                    </span>
                  </div>

                  {/* Explicit Status Line (Icon + Label + Slot Count, Never Color Alone) */}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        isUrdu ? '' : 'font-mono uppercase tracking-[0.08em]'
                      } ${style.textClass}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        {entry.status === 'open'
                          ? t.schengenSlots.openLabel
                          : entry.status === 'limited'
                            ? t.schengenSlots.limitedLabel
                            : t.schengenSlots.waitlistLabel}
                      </span>
                    </span>
                    <span className="font-latin-mono text-xs font-semibold text-ink tabular-nums">
                      {entry.estimatedSlots > 0
                        ? `${entry.estimatedSlots} est. ${entry.estimatedSlots === 1 ? 'slot' : 'slots'}`
                        : '0 open'}
                    </span>
                  </div>

                  {/* Earliest Window & Centre Details */}
                  <dl className="mt-3 space-y-1.5 text-xs text-ink-body">
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="text-ink-muted shrink-0">{t.schengenSlots.earliestLabel}</dt>
                      <dd className="font-medium text-ink text-end tabular-nums">
                        {entry.earliestWindowLabel}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-2">
                      <dt className="text-ink-muted shrink-0">{t.schengenSlots.channelLabel}</dt>
                      <dd className="text-end text-ink-body">{entry.centre}</dd>
                    </div>
                  </dl>

                  <p className="mt-2.5 text-xs text-ink-body leading-relaxed">
                    {entry.lastChangeSummary}
                  </p>
                </div>

                {/* Card Footer: Cities + Action */}
                <div className="mt-4 pt-3 border-t border-rule/75 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-muted">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span>{formatCitiesList(entry.cities)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-0.5 text-xs">
                    <a
                      href={inquiryHref}
                      className="font-medium text-visa-green hover:text-visa-green-dark hover:underline underline-offset-4"
                    >
                      {t.schengenSlots.prepareDossier} {isUrdu ? '←' : '→'}
                    </a>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-muted hover:text-ink hover:underline underline-offset-4"
                    >
                      {t.common.whatsappDesk}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Recent Simulated Feed Activity Log */}
      <div className="pt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7">
          <p className="mono-label text-ink-muted mb-2.5">{t.schengenSlots.recentChanges}</p>
          <ul
            className="space-y-1.5 text-xs text-ink-body"
            data-testid="schengen-feed-events"
            aria-live="polite"
          >
            {feedState.events.slice(0, 4).map((event) => (
              <li
                key={event.id}
                className="flex items-baseline gap-2.5 py-1 border-b border-rule/50 last:border-b-0"
              >
                <span className="font-latin-mono text-[11px] text-ink-muted tabular-nums shrink-0">
                  {hydrated ? formatFeedClock(event.timestamp) : '--:--:--'}
                </span>
                <span className="font-latin-mono text-[11px] font-semibold text-visa-green shrink-0">
                  {event.isoCode}
                </span>
                <span className="leading-snug">{event.message}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 bg-paper-deep/65 border border-rule rounded-[2px] p-4 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-ink-muted shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-ink-body leading-relaxed">
            <strong
              className={`text-ink me-1.5 ${
                isUrdu ? 'font-semibold' : 'font-mono uppercase tracking-[0.08em]'
              }`}
            >
              {t.schengenSlots.simulatedNotice}
            </strong>
            {SCHENGEN_FEED_DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  );
}
