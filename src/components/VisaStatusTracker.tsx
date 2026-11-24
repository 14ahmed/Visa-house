import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
  Loader2,
  MessageCircle,
  Radio,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  formatUpdateClock,
  formatUpdateDateStamp,
  getSessionInquiries,
  lookupVisaStatus,
  requestLiveStatusSync,
  SAMPLE_VISA_STATUS_RECORDS,
  subscribeToVisaStatusStream,
  validateReferenceNumber,
  type StreamConnectionState,
  type VisaStatusRecord,
} from '../utils/visaStatusTracker';
import { RubberStamp } from './RubberStamp';
import { VisaProgressTimeline } from './VisaProgressTimeline';

export interface VisaStatusTrackerProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  subcopy?: string;
  initialReferenceId?: string;
  onLookupStatus?: (referenceId: string) => Promise<VisaStatusRecord | null>;
  className?: string;
}

const STAGE_INDEX_MAP: Record<VisaStatusRecord['currentStage'], string> = {
  intake: '01',
  audit: '02',
  filing: '03',
  embassy_review: '04',
  ready: '05',
};

/**
 * Editorial paper-textured Visa Status Tracker allowing applicants to enter
 * their Application ID and receive live Server-Sent Events (SSE) processing
 * updates directly from the Visahouse case desk server.
 */
export function VisaStatusTracker({
  id = 'track-status',
  eyebrow,
  heading,
  subcopy,
  initialReferenceId = '',
  onLookupStatus = lookupVisaStatus,
  className = '',
}: VisaStatusTrackerProps) {
  const { t, isUrdu } = useLanguage();
  const resolvedEyebrow = eyebrow ?? t.tracker.eyebrow;
  const resolvedHeading = heading ?? t.tracker.heading;
  const resolvedSubcopy = subcopy ?? t.tracker.subcopy;
  const fieldId = useId();
  const [referenceInput, setReferenceInput] = useState(initialReferenceId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncingLive, setSyncingLive] = useState(false);
  const [searchedReference, setSearchedReference] = useState<string | null>(null);
  const [record, setRecord] = useState<VisaStatusRecord | null>(null);
  const [streamState, setStreamState] = useState<StreamConnectionState>('idle');
  const [lastLiveEventId, setLastLiveEventId] = useState<string | null>(null);
  const [retrievalCount, setRetrievalCount] = useState(0);
  const retrievalSeqRef = useRef(0);
  const [stampOverlay, setStampOverlay] = useState<{
    key: number;
    phase: 'idle' | 'ready' | 'landed' | 'fading';
    label: string;
    sublabel: string;
    color: string;
  }>({
    key: 0,
    phase: 'idle',
    label: '',
    sublabel: '',
    color: '#0F5C4B',
  });

  const stampTimersRef = useRef<{
    raf1?: number;
    raf2?: number;
    fadeTimer?: number;
    clearTimer?: number;
  }>({});

  const clearStampTimers = () => {
    const timers = stampTimersRef.current;
    if (typeof window === 'undefined') return;
    if (timers.raf1 !== undefined) window.cancelAnimationFrame(timers.raf1);
    if (timers.raf2 !== undefined) window.cancelAnimationFrame(timers.raf2);
    if (timers.fadeTimer !== undefined) window.clearTimeout(timers.fadeTimer);
    if (timers.clearTimer !== undefined) window.clearTimeout(timers.clearTimer);
    stampTimersRef.current = {};
  };

  useEffect(() => {
    return () => {
      clearStampTimers();
    };
  }, []);

  const triggerStampOverlay = (foundRecord: VisaStatusRecord, nextKey: number) => {
    clearStampTimers();

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setStampOverlay({
      key: nextKey,
      phase: prefersReduced ? 'landed' : 'ready',
      label: foundRecord.stampLabel,
      sublabel: `STATUS VERIFIED · ${foundRecord.referenceId}`,
      color: foundRecord.stampColor,
    });

    if (typeof window === 'undefined') return;

    if (!prefersReduced) {
      // Double-rAF ensures the browser paints .stamp-land-ready before transitioning to .stamp-landed
      stampTimersRef.current.raf1 = window.requestAnimationFrame(() => {
        stampTimersRef.current.raf2 = window.requestAnimationFrame(() => {
          setStampOverlay((prev) =>
            prev.key === nextKey ? { ...prev, phase: 'landed' } : prev,
          );
        });
      });
    }

    stampTimersRef.current.fadeTimer = window.setTimeout(() => {
      setStampOverlay((prev) =>
        prev.key === nextKey ? { ...prev, phase: 'fading' } : prev,
      );
    }, prefersReduced ? 600 : 1050);

    stampTimersRef.current.clearTimer = window.setTimeout(() => {
      setStampOverlay((prev) =>
        prev.key === nextKey ? { ...prev, phase: 'idle' } : prev,
      );
    }, prefersReduced ? 750 : 1550);
  };

  const sessionQuickRefs = useMemo(() => {
    const items = getSessionInquiries();
    return items.slice(0, 2);
  }, [searchedReference]);

  const activeReferenceId = record?.referenceId ?? null;

  // Open live SSE subscription whenever an active dossier record is loaded
  useEffect(() => {
    if (!activeReferenceId) {
      setStreamState('idle');
      return;
    }

    const unsubscribe = subscribeToVisaStatusStream(activeReferenceId, {
      onStateChange: (nextState) => {
        setStreamState(nextState);
      },
      onSnapshot: (snapshotRecord) => {
        setRecord(snapshotRecord);
      },
      onUpdate: (updatedRecord, event) => {
        setRecord(updatedRecord);
        setLastLiveEventId(event.id);
        setSyncMessage(`Live update received at ${formatUpdateClock(event.timestamp)}.`);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [activeReferenceId]);

  const runLookup = async (rawValue: string) => {
    const check = validateReferenceNumber(rawValue);
    if (!check.valid) {
      setErrorMessage(check.error ?? 'Please enter a valid application ID.');
      return;
    }

    setErrorMessage(null);
    setSyncMessage(null);
    setLastLiveEventId(null);
    setReferenceInput(check.normalized);

    try {
      setLoading(true);
      const found = await onLookupStatus(check.normalized);
      setSearchedReference(check.normalized);
      setRecord(found);
      if (found) {
        retrievalSeqRef.current += 1;
        const nextKey = retrievalSeqRef.current;
        setRetrievalCount(nextKey);
        triggerStampOverlay(found, nextKey);
      } else {
        clearStampTimers();
        setStampOverlay((prev) => ({ ...prev, phase: 'idle' }));
        setStreamState('idle');
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to look up that application ID right now. Please message our desk on WhatsApp.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await runLookup(referenceInput);
  };

  const handleRequestLiveSync = async () => {
    if (!record || syncingLive) return;
    setSyncMessage(null);
    setErrorMessage(null);
    try {
      setSyncingLive(true);
      const result = await requestLiveStatusSync(record.referenceId);
      if (result) {
        setRecord(result.record);
        setLastLiveEventId(result.event.id);
        setSyncMessage(`Live desk sync verified at ${formatUpdateClock(result.event.timestamp)}.`);
      }
    } catch (err) {
      setSyncMessage(
        err instanceof Error
          ? err.message
          : 'Live sync is temporarily unavailable. Your current snapshot remains visible.',
      );
    } finally {
      setSyncingLive(false);
    }
  };

  const handleReset = () => {
    clearStampTimers();
    setStampOverlay((prev) => ({ ...prev, phase: 'idle' }));
    setReferenceInput('');
    setErrorMessage(null);
    setSyncMessage(null);
    setSearchedReference(null);
    setRecord(null);
    setLastLiveEventId(null);
    setStreamState('idle');
  };

  const activeRefForWhatsApp = record?.referenceId ?? searchedReference ?? 'my application';
  const waHref = buildWhatsAppUrl(
    `status check (${activeRefForWhatsApp})`,
    `Hello Visahouse, I would like a live status update on application ID ${activeRefForWhatsApp}.`,
  );

  const streamLabel =
    streamState === 'live'
      ? t.tracker.streamLive
      : streamState === 'connecting'
        ? t.tracker.streamConnecting
        : streamState === 'reconnecting'
          ? t.tracker.streamReconnecting
          : streamState === 'offline'
            ? t.tracker.streamOffline
            : t.tracker.streamIdle;

  return (
    <section
      id={id}
      aria-labelledby={`${fieldId}-heading`}
      className={`paper-card-texture border border-ink/75 rounded-[3px] p-6 sm:p-8 lg:p-10 scroll-mt-24 ${className}`.trim()}
    >
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-ink/75">
        <div className="max-w-2xl">
          <p className="mono-label text-visa-green">{resolvedEyebrow}</p>
          <h2
            id={`${fieldId}-heading`}
            className="font-display text-3xl sm:text-4xl font-medium tracking-tight leading-[1.12] text-ink mt-2 text-balance"
          >
            {resolvedHeading}
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        <div className="shrink-0 text-start lg:text-end space-y-1">
          <p className="mono-label text-ink-muted">{t.tracker.formatLabel}</p>
          <p className="font-latin-mono text-sm font-semibold tracking-[0.12em] text-ink tabular-nums">
            VH-XXX-0000
          </p>
        </div>
      </div>

      {/* Application ID Lookup Bar */}
      <form onSubmit={handleSubmit} noValidate className="pt-6 pb-6 border-b border-rule">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-8">
            <label htmlFor={`${fieldId}-ref`} className="block mono-label text-ink mb-2">
              {t.tracker.applicationIdLabel} <span className="text-stamp-red">*</span>
            </label>
            <input
              id={`${fieldId}-ref`}
              name="visaApplicationId"
              type="text"
              dir="ltr"
              autoComplete="off"
              spellCheck={false}
              placeholder={t.tracker.placeholder}
              value={referenceInput}
              onChange={(e) => {
                setReferenceInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              aria-invalid={Boolean(errorMessage)}
              aria-describedby={errorMessage ? `${fieldId}-ref-err` : `${fieldId}-ref-hint`}
              className={`w-full min-h-[48px] px-4 py-2.5 bg-paper border rounded-[2px] font-latin-mono text-sm uppercase tracking-[0.08em] text-ink placeholder:normal-case placeholder:tracking-normal placeholder:font-sans placeholder:text-ink-muted/75 focus:bg-slip transition-colors ${
                errorMessage
                  ? 'border-stamp-red focus:border-stamp-red'
                  : 'border-ink/45 focus:border-visa-green'
              }`}
            />
            {errorMessage ? (
              <p
                id={`${fieldId}-ref-err`}
                role="alert"
                className="mt-2 text-xs text-stamp-red font-medium"
              >
                {errorMessage}
              </p>
            ) : (
              <p id={`${fieldId}-ref-hint`} className="mt-2 text-xs text-ink-muted">
                {t.tracker.hint}
              </p>
            )}
          </div>

          <div className="md:col-span-4 md:pt-[24px] flex items-center gap-2.5">
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 bg-visa-green text-slip hover:bg-visa-green-dark disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {loading ? (
                <>
                  <Loader2
                    className="h-4 w-4 animate-spin motion-reduce:animate-none shrink-0"
                    aria-hidden="true"
                  />
                  <span>{t.tracker.checkingBtn}</span>
                </>
              ) : (
                <span>{t.tracker.trackBtn}</span>
              )}
            </button>

            {searchedReference && (
              <button
                type="button"
                onClick={handleReset}
                aria-label={t.common.reset}
                className="inline-flex items-center justify-center min-h-[48px] px-3.5 border border-ink/55 bg-paper text-ink hover:bg-paper-deep rounded-[2px] transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Quick-Fill Sample & Session Dossiers + Direct Active File Check */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label text-ink-muted me-1">{t.tracker.sampleDossiers}</span>
            {SAMPLE_VISA_STATUS_RECORDS.map((sample) => {
            const active = record?.referenceId === sample.referenceId;
            return (
              <button
                key={sample.referenceId}
                type="button"
                dir="ltr"
                onClick={() => runLookup(sample.referenceId)}
                disabled={loading}
                aria-pressed={active}
                className={`font-latin-mono min-h-[40px] px-3.5 py-1.5 text-xs tracking-[0.06em] rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                  active
                    ? 'bg-ink text-slip border-ink'
                    : 'bg-paper text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                }`}
              >
                {sample.referenceId} · {sample.isoCode}
              </button>
            );
          })}

          {sessionQuickRefs.map((item) => {
            const active = record?.referenceId === item.referenceId;
            return (
              <button
                key={item.referenceId}
                type="button"
                onClick={() => runLookup(item.referenceId)}
                disabled={loading}
                aria-pressed={active}
                className={`min-h-[40px] px-3.5 py-1.5 text-xs rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                  isUrdu ? 'font-medium' : 'font-mono tracking-[0.06em]'
                } ${
                  active
                    ? 'bg-visa-green text-slip border-visa-green'
                    : 'bg-slip text-visa-green border-visa-green/45 hover:border-visa-green'
                }`}
              >
                <span className="font-latin-mono">{item.referenceId}</span> · {t.tracker.yourInquiry}
              </button>
            );
          })}
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 border border-visa-green/60 bg-slip text-visa-green hover:bg-visa-green hover:text-slip text-xs font-medium rounded-[2px] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{isUrdu ? 'واٹس ایپ پر لائیو فائل چیک کریں' : 'Check Active File on WhatsApp'}</span>
          </a>
        </div>

        <p className="mt-3 text-xs text-ink-muted leading-relaxed">
          {isUrdu
            ? 'نوٹ: آن لائن لُک اپ نمونہ ڈوزئیرز اور اسی براؤزر سیشن کی انکوائریز دکھاتا ہے۔ دوسرے فون یا لیپ ٹاپ پر فعال فائل کی تازہ سفارتی صورتحال کے لیے براہِ راست واٹس ایپ بٹن استعمال کریں۔'
            : 'Note: Self-service lookup displays sample dossiers and inquiries created in this browser session. For real-time multi-device updates on an active paid file, tap Check Active File on WhatsApp.'}
        </p>
      </form>

      {/* Idle 5-Stage Journey Preview Timeline (before lookup) */}
      {!searchedReference && (
        <div className="pt-6">
          <VisaProgressTimeline record={null} />
        </div>
      )}

      {/* Active Dossier Live View */}
      {searchedReference && record && (
        <div
          role="region"
          aria-live="polite"
          aria-label={`Live processing status for ${record.referenceId}`}
          className="relative pt-7"
        >
          {/* Subtle Stamp Animation Overlay on Successful Status Retrieval */}
          {stampOverlay.phase !== 'idle' && (
            <div
              key={stampOverlay.key}
              aria-hidden="true"
              data-stamp-overlay-phase={stampOverlay.phase}
              className={`pointer-events-none select-none absolute inset-x-0 top-4 z-30 flex items-center justify-center transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                stampOverlay.phase === 'fading' ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div
                style={{
                  ['--stamp-rot' as string]: '-5deg',
                  borderColor: stampOverlay.color,
                  color: stampOverlay.color,
                }}
                className={`px-5 py-3 bg-slip/92 border-2 rounded-[3px] shadow-[0_1px_0_rgba(28,27,25,0.08)] backdrop-blur-[1px] ${
                  stampOverlay.phase === 'ready' ? 'stamp-land-ready' : 'stamp-landed'
                }`}
              >
                <div
                  style={{ borderColor: stampOverlay.color }}
                  className="border border-dashed px-4 py-2 text-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-85">
                    {stampOverlay.sublabel}
                  </p>
                  <p className="mt-1 font-mono text-sm sm:text-base font-bold uppercase tracking-[0.18em]">
                    {stampOverlay.label}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] opacity-75">
                    VISAHOUSE CASE LEDGER · LIVE
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Dossier Identity + Live Stream Bar + Stamp */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-rule">
            <div className="flex items-start gap-4 min-w-0">
              <div className="inline-flex flex-col items-center justify-center px-3 py-2 border border-visa-green bg-paper rounded-[2px] shrink-0">
                <span className="font-mono text-base font-bold tracking-[0.14em] text-visa-green leading-none">
                  {record.isoCode}
                </span>
                <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                  Stage {STAGE_INDEX_MAP[record.currentStage]}
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted tabular-nums">
                  <span className="text-ink font-semibold">{record.referenceId}</span>
                  <span aria-hidden="true">·</span>
                  <span>{record.isDemoRecord ? 'Sample Dossier' : 'Logged Inquiry'}</span>
                  <span aria-hidden="true">·</span>
                  <span>Stage {STAGE_INDEX_MAP[record.currentStage]} of 05</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1 leading-snug">
                  {record.destination}
                </h3>

                <p className="mt-1 text-sm text-ink-body font-medium">{record.statusLabel}</p>

                {/* Real-Time Stream Telemetry + Manual Live Check Action */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted tabular-nums">
                    {streamState === 'live' ? (
                      <span
                        className="h-2 w-2 rounded-full bg-visa-green shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Radio className="h-3.5 w-3.5 text-ink-muted shrink-0" aria-hidden="true" />
                    )}
                    <span className={streamState === 'live' ? 'text-visa-green font-medium' : ''}>
                      {streamLabel}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={handleRequestLiveSync}
                    disabled={syncingLive}
                    className={`inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1 border border-ink/55 bg-paper hover:bg-paper-deep text-ink text-[11px] rounded-[2px] transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap shrink-0 ${
                      isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.1em]'
                    }`}
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 shrink-0 ${
                        syncingLive ? 'animate-spin motion-reduce:animate-none' : ''
                      }`}
                      aria-hidden="true"
                    />
                    <span>{syncingLive ? t.tracker.syncingDesk : t.tracker.syncLiveStatus}</span>
                  </button>
                </div>

                {syncMessage && (
                  <p className="mt-2 font-mono text-xs text-visa-green tabular-nums">
                    {syncMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="shrink-0 self-start">
              <RubberStamp
                key={`${record.referenceId}-${retrievalCount}`}
                label={record.stampLabel}
                sublabel={record.referenceId}
                color={record.stampColor}
                rotation={-3}
                variant="rect"
              />
            </div>
          </div>

          {/* 4-Column Dossier Metadata Ledger */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-5 border-b border-rule text-sm">
            <div>
              <dt className="mono-label text-ink-muted">{t.tracker.applicationIdLabel}</dt>
              <dd className="mt-1 font-latin-mono font-semibold text-ink tabular-nums">
                {record.referenceId}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-ink-muted">{t.tracker.channelLabel}</dt>
              <dd className="mt-1 font-medium text-ink">{record.channel}</dd>
            </div>
            <div>
              <dt className="mono-label text-ink-muted">{t.tracker.passportMonthLabel}</dt>
              <dd className="mt-1 font-medium text-ink">
                {record.passportNationality} · {record.travelMonth}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-ink-muted">{t.tracker.lastSyncedLabel}</dt>
              <dd className="mt-1 font-latin-mono text-xs sm:text-[13px] font-medium text-visa-green tabular-nums">
                {formatUpdateDateStamp(record.lastSyncedAt)}
              </dd>
            </div>
          </dl>

          {/* Visual 5-Stage Application Progress Timeline */}
          <div className="mt-6">
            <VisaProgressTimeline record={record} lastLiveEventId={lastLiveEventId} />
          </div>

          {/* Asymmetric 2-Column Split: 5-Stage Ledger + Live Updates Feed */}
          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left (7 cols): 5-Stage Dossier Progress Ledger */}
            <div className="lg:col-span-7">
              <div className="flex items-baseline justify-between gap-3 mb-3.5">
                <p className="mono-label text-ink">{t.tracker.processingStages}</p>
                <span
                  className={`text-[11px] text-ink-muted tabular-nums ${
                    isUrdu ? '' : 'font-mono uppercase tracking-[0.1em]'
                  }`}
                >
                  {formatLocalizedCopy(t.tracker.completedActive, {
                    done: record.milestones.filter((m) => m.state === 'done').length,
                  })}
                </span>
              </div>

              <ol className="divide-y divide-rule border-t border-b border-ink/35">
                {record.milestones.map((milestone) => {
                  const isDone = milestone.state === 'done';
                  const isCurrent = milestone.state === 'current';
                  return (
                    <li
                      key={milestone.id}
                      className={`py-4 px-3 sm:px-4 flex items-start gap-3.5 transition-colors duration-150 ${
                        isCurrent ? 'bg-visa-green/[0.07]' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="h-5 w-5 text-visa-green" aria-hidden="true" />
                        ) : isCurrent ? (
                          <Clock className="h-5 w-5 text-visa-green" aria-hidden="true" />
                        ) : (
                          <Circle className="h-5 w-5 text-ink-muted/45" aria-hidden="true" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4
                            className={`text-[15px] font-medium ${
                              isCurrent || isDone ? 'text-ink' : 'text-ink-muted'
                            }`}
                          >
                            <span className="font-mono text-xs mr-2 text-ink-muted tabular-nums">
                              {milestone.step}
                            </span>
                            {milestone.title}
                          </h4>
                          <span
                            className={`font-mono text-[11px] uppercase tracking-[0.1em] tabular-nums ${
                              isCurrent
                                ? 'text-visa-green font-semibold'
                                : isDone
                                  ? 'text-ink-muted'
                                  : 'text-ink-muted/65'
                            }`}
                          >
                            {milestone.timestamp ??
                              (isCurrent ? 'Current Stage' : isDone ? 'Completed' : 'Pending')}
                          </span>
                        </div>
                        <p
                          className={`mt-1 text-sm leading-relaxed ${
                            isCurrent || isDone ? 'text-ink-body' : 'text-ink-muted/80'
                          }`}
                        >
                          {milestone.detail}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Right (5 cols): Real-Time Server Updates Feed + Next Step */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-3.5">
                  <p className="mono-label text-ink">{t.tracker.liveActivityLog}</p>
                  <span className="font-latin-mono text-[11px] text-ink-muted tabular-nums">
                    {record.updates.length}
                  </span>
                </div>

                <ol className="divide-y divide-rule border-t border-b border-ink/35">
                  {record.updates.map((evt) => {
                    const isFresh = evt.id === lastLiveEventId;
                    return (
                      <li
                        key={evt.id}
                        className={`py-3.5 px-3 transition-colors duration-200 ${
                          isFresh ? 'bg-marigold/15' : ''
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] tabular-nums">
                          <span
                            className={
                              evt.isLiveBroadcast
                                ? 'text-visa-green font-semibold'
                                : 'text-ink-muted'
                            }
                          >
                            {evt.source}
                          </span>
                          <span className="font-latin-mono text-ink-muted">
                            {formatUpdateDateStamp(evt.timestamp)}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-ink-body leading-relaxed">
                          {evt.message}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Next Recommended Action + WhatsApp Desk Link */}
              <div className="pt-2 space-y-4">
                <div>
                  <p className="mono-label text-ink">{t.tracker.nextStepGuidance}</p>
                  <p className="mt-1.5 text-sm text-ink-body leading-relaxed">
                    {record.nextAction}
                  </p>
                </div>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 bg-visa-green text-slip hover:bg-visa-green-dark text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {formatLocalizedCopy(t.tracker.askDeskAbout, {
                      ref: record.referenceId,
                    })}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Not Found State */}
      {searchedReference && !record && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 pt-6 border-t border-stamp-red/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-stamp-red shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="mono-label text-stamp-red">
                {formatLocalizedCopy(t.tracker.notFoundTitle, {
                  ref: searchedReference,
                })}
              </p>
              <p className="mt-1.5 text-sm text-ink-body leading-relaxed max-w-2xl">
                We could not match <strong className="font-latin-mono">{searchedReference}</strong>{' '}
                in our live case ledger or sample dossiers. If our desk opened your file via
                WhatsApp, message us directly with your application ID for an immediate embassy or
                visa-centre update.
              </p>
            </div>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-ink text-slip hover:bg-visa-green text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{t.tracker.confirmWhatsapp}</span>
          </a>
        </div>
      )}

      <p className="mt-6 pt-4 border-t border-rule/80 text-xs text-ink-muted leading-relaxed">
        {t.common.disclaimer} {t.tracker.disclaimerSuffix}
      </p>
    </section>
  );
}
