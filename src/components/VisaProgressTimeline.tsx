import { useEffect, useMemo, useState } from 'react';
import {
  Check,
  FileCheck2,
  Inbox,
  Landmark,
  PackageCheck,
  Send,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  computeVisaTimelineState,
  formatUpdateDateStamp,
  type VisaStageId,
  type VisaStatusRecord,
} from '../utils/visaStatusTracker';

interface VisaProgressTimelineProps {
  record: VisaStatusRecord | null;
  lastLiveEventId?: string | null;
}

const STAGE_ICONS: Record<VisaStageId, typeof Inbox> = {
  intake: Inbox,
  audit: FileCheck2,
  filing: Send,
  embassy_review: Landmark,
  ready: PackageCheck,
};

const STAGE_LABELS_UR: Record<VisaStageId, { short: string; detail: string; window: string }> = {
  intake: {
    short: 'درخواست موصول',
    detail: 'آپ کی ابتدائی فائل اور سفری تفصیلات ہمارے آن لائن ڈیسک پر درج کر لی گئی ہیں۔',
    window: 'پہلا دن',
  },
  audit: {
    short: 'دستاویزات کا آڈٹ',
    detail: 'کنسلٹنٹ بینک اسٹیٹمنٹ، این ٹی این، پاسپورٹ ہجے اور ہوٹل تاریخوں کی جانچ کر رہا ہے۔',
    window: '1–2 کاروباری دن',
  },
  filing: {
    short: 'سرکاری فائلنگ',
    detail: 'آفیشل پورٹل پر فارم جمع کروا دیا گیا ہے یا مجاز ویزا سینٹر میں اپائنٹمنٹ شیڈول ہو گئی ہے۔',
    window: '3–5 دن',
  },
  embassy_review: {
    short: 'سفارتخانہ پراسیسنگ',
    detail: 'درخواست اس وقت متعلقہ سفارتخانے یا امیگریشن اتھارٹی کے زیرِ غور ہے۔',
    window: 'ملک کے مطابق',
  },
  ready: {
    short: 'پاسپورٹ ڈسپیچ',
    detail: 'فیصلہ مکمل ہو چکا ہے؛ ای-ویزا پی ڈی ایف یا پاسپورٹ وصولی کی ہدایات تیار ہیں۔',
    window: 'حتمی مرحلہ',
  },
};

/**
 * Editorial visual progress timeline mapping the 5 standard stages of a visa
 * application (Application Received -> Document Audit -> Official Filing ->
 * Embassy Processing -> Passport Dispatch). Renders both an educational preview
 * before lookup and an interactive live-updating progress rail once fetched.
 */
export function VisaProgressTimeline({
  record,
  lastLiveEventId = null,
}: VisaProgressTimelineProps) {
  const { isUrdu } = useLanguage();
  const timeline = useMemo(() => computeVisaTimelineState(record), [record]);

  const [inspectedStageId, setInspectedStageId] = useState<VisaStageId>(
    timeline.activeStageId ?? 'intake',
  );

  // Sync inspected stage whenever a new application record or stage update arrives
  useEffect(() => {
    if (timeline.activeStageId) {
      setInspectedStageId(timeline.activeStageId);
    } else {
      setInspectedStageId('intake');
    }
  }, [record?.referenceId, timeline.activeStageId, lastLiveEventId]);

  const inspectedNode =
    timeline.nodes.find((node) => node.id === inspectedStageId) ?? timeline.nodes[0];

  const railScale = timeline.connectorFillPercent / 100;

  const stageLabel = (id: VisaStageId, fallback: string) =>
    isUrdu ? STAGE_LABELS_UR[id].short : fallback;
  const stageDetail = (id: VisaStageId, fallback: string) =>
    isUrdu ? STAGE_LABELS_UR[id].detail : fallback;
  const stageWindow = (id: VisaStageId, fallback: string) =>
    isUrdu ? STAGE_LABELS_UR[id].window : fallback;

  const activeLocalizedLabel = timeline.activeStageId
    ? stageLabel(timeline.activeStageId, timeline.activeStageLabel)
    : timeline.activeStageLabel;

  return (
    <div
      data-testid="visa-progress-timeline"
      className="bg-paper border border-ink/45 rounded-[3px] p-4 sm:p-6"
    >
      {/* Timeline Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-rule">
        <div>
          <p className="mono-label text-visa-green">
            {timeline.isPreview
              ? isUrdu
                ? 'ویزا درخواست کے 5 معیاری مراحل'
                : 'Typical Visa Application Journey · 5 Stages'
              : isUrdu
                ? 'ویزا پراگریس ٹائم لائن'
                : 'Visual Application Progress Timeline'}
          </p>
          <p className="mt-1 text-xs sm:text-sm text-ink-body">
            {timeline.isPreview
              ? isUrdu
                ? 'کسی بھی مرحلے کی تفصیل دیکھنے کے لیے نیچے کلک کریں، یا لائیو اسٹیٹس کے لیے اوپر ریفرنس آئی ڈی درج کریں۔'
                : 'Select any stage below to preview what happens at each step, or enter your Application ID above to map live progress.'
              : isUrdu
                ? `اس وقت مرحلہ ${timeline.nodes[timeline.activeIndex].step} (${activeLocalizedLabel}) جاری ہے · تفصیلات کے لیے کسی بھی مرحلے پر کلک کریں۔`
                : `Currently at Stage ${timeline.nodes[timeline.activeIndex].step} (${timeline.activeStageLabel}) · Click any stage to inspect checkpoint details.`}
          </p>
        </div>

        <div
          className={`flex items-center gap-2 text-xs text-ink shrink-0 tabular-nums ${
            isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.1em]'
          }`}
        >
          {timeline.isPreview ? (
            <span className="text-ink-muted">
              {isUrdu ? '05 معیاری مراحل' : '05 Standard Milestones'}
            </span>
          ) : (
            <>
              <span className="text-visa-green font-semibold" data-testid="timeline-progress-pct">
                <span className="font-latin-mono">{timeline.completionPercent}%</span>{' '}
                {isUrdu ? 'مکمل' : 'Progress'}
              </span>
              <span aria-hidden="true" className="text-ink-muted">
                ·
              </span>
              <span className="text-ink-muted">
                {isUrdu
                  ? `مرحلہ ${timeline.nodes[timeline.activeIndex].step} از 05`
                  : `Stage ${timeline.nodes[timeline.activeIndex].step} of 05`}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Accessible Progressbar Semantics */}
      {!timeline.isPreview && (
        <div
          role="progressbar"
          aria-label={`Visa application progress: ${activeLocalizedLabel}, ${timeline.completionPercent}%`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={timeline.completionPercent}
          className="sr-only"
        />
      )}

      {/* Desktop Horizontal Visual Progress Stepper (md+) */}
      <div className="hidden md:block pt-7 pb-3">
        <div className="relative">
          {/* Connecting Track Rail centered vertically through the 44px milestone nodes */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[22px] h-[2px] bg-rule overflow-hidden"
          >
            <div
              data-testid="timeline-progress-rail"
              style={{ transform: `scaleX(${railScale})` }}
              className="h-full w-full origin-left rtl:origin-right bg-visa-green transition-transform duration-500 ease-out motion-reduce:transition-none"
            />
          </div>

          <ol className="relative z-10 grid grid-cols-5 gap-3">
            {timeline.nodes.map((node) => {
              const Icon = STAGE_ICONS[node.id];
              const isDone = node.state === 'done';
              const isCurrent = node.state === 'current';
              const isPreview = node.state === 'preview';
              const isSelected = inspectedNode.id === node.id;

              return (
                <li key={node.id} className="flex flex-col items-center text-center">
                  <button
                    type="button"
                    onClick={() => setInspectedStageId(node.id)}
                    aria-pressed={isSelected}
                    aria-current={isCurrent ? 'step' : undefined}
                    data-stage-id={node.id}
                    data-stage-state={node.state}
                    className="group flex flex-col items-center w-full focus-visible:outline-2 focus-visible:outline-visa-green rounded-[2px] py-0.5 cursor-pointer"
                  >
                    {/* Milestone Node Marker */}
                    <span
                      className={`relative flex items-center justify-center h-11 w-11 rounded-full border-2 transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none ${
                        isDone
                          ? 'bg-visa-green border-visa-green text-slip'
                          : isCurrent
                            ? 'bg-slip border-visa-green text-visa-green ring-4 ring-visa-green/15'
                            : isPreview && isSelected
                              ? 'bg-ink border-ink text-slip'
                              : 'bg-paper border-rule text-ink-muted group-hover:border-ink/60 group-hover:text-ink'
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-5 w-5 stroke-[2.4]" aria-hidden="true" />
                      ) : (
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      )}
                    </span>

                    {/* Step Index & Stage Label */}
                    <span
                      className={`mt-3 text-[10px] tabular-nums ${
                        isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.14em]'
                      } ${
                        isCurrent || isDone
                          ? 'text-visa-green font-semibold'
                          : isSelected
                            ? 'text-ink font-semibold'
                            : 'text-ink-muted'
                      }`}
                    >
                      {isUrdu ? `مرحلہ ${node.step}` : `Stage ${node.step}`}
                    </span>

                    <span
                      className={`mt-1 text-[13px] leading-snug font-medium px-1 transition-colors ${
                        isCurrent || isSelected
                          ? 'text-ink underline decoration-visa-green/70 underline-offset-4'
                          : isDone
                            ? 'text-ink'
                            : 'text-ink-muted group-hover:text-ink'
                      }`}
                    >
                      {stageLabel(node.id, node.shortLabel)}
                    </span>

                    <span
                      className={`mt-1 text-[10px] text-ink-muted/85 tabular-nums ${
                        isUrdu ? '' : 'font-mono'
                      }`}
                    >
                      {isDone
                        ? isUrdu
                          ? 'مکمل'
                          : 'Completed'
                        : isCurrent
                          ? isUrdu
                            ? 'جاری ہے'
                            : 'In Progress'
                          : isPreview
                            ? stageWindow(node.id, node.typicalWindow)
                            : isUrdu
                              ? 'آئندہ'
                              : 'Upcoming'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Mobile Vertical Connected Progress Timeline (< md) */}
      <ol className="md:hidden mt-5 space-y-0">
        {timeline.nodes.map((node, idx) => {
          const Icon = STAGE_ICONS[node.id];
          const isDone = node.state === 'done';
          const isCurrent = node.state === 'current';
          const isPreview = node.state === 'preview';
          const isSelected = inspectedNode.id === node.id;
          const isLast = idx === timeline.nodes.length - 1;
          const segmentFilled = !timeline.isPreview && idx < timeline.activeIndex;

          return (
            <li key={node.id} className="relative flex items-start gap-3.5 pb-4 last:pb-0">
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={`absolute start-[19px] top-10 bottom-0 w-[2px] ${
                    segmentFilled ? 'bg-visa-green' : 'bg-rule'
                  }`}
                />
              )}

              <button
                type="button"
                onClick={() => setInspectedStageId(node.id)}
                aria-pressed={isSelected}
                aria-current={isCurrent ? 'step' : undefined}
                className="relative z-10 flex items-start gap-3.5 w-full text-start min-h-[44px] py-0.5 cursor-pointer"
              >
                <span
                  className={`flex items-center justify-center h-10 w-10 rounded-full border-2 shrink-0 ${
                    isDone
                      ? 'bg-visa-green border-visa-green text-slip'
                      : isCurrent
                        ? 'bg-slip border-visa-green text-visa-green ring-4 ring-visa-green/15'
                        : isPreview && isSelected
                          ? 'bg-ink border-ink text-slip'
                          : 'bg-paper border-rule text-ink-muted'
                  }`}
                >
                  {isDone ? (
                    <Check className="h-4 w-4 stroke-[2.4]" aria-hidden="true" />
                  ) : (
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  )}
                </span>

                <span className="flex-1 min-w-0 pt-0.5">
                  <span className="flex items-baseline justify-between gap-2">
                    <span
                      className={`text-sm font-medium ${
                        isCurrent || isDone || isSelected ? 'text-ink' : 'text-ink-muted'
                      }`}
                    >
                      <span className="font-latin-mono text-[11px] text-ink-muted me-1.5 tabular-nums">
                        {node.step}
                      </span>
                      {stageLabel(node.id, node.shortLabel)}
                    </span>
                    <span
                      className={`text-[10px] shrink-0 tabular-nums ${
                        isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                      } ${isCurrent || isDone ? 'text-visa-green font-semibold' : 'text-ink-muted'}`}
                    >
                      {isDone
                        ? isUrdu
                          ? 'مکمل'
                          : 'Done'
                        : isCurrent
                          ? isUrdu
                            ? 'فعال'
                            : 'Active'
                          : isPreview
                            ? stageWindow(node.id, node.typicalWindow)
                            : isUrdu
                              ? 'زیرِ التوا'
                              : 'Pending'}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Selected Stage Inspection Strip */}
      <div
        data-testid="timeline-stage-inspector"
        className="mt-4 pt-4 border-t border-rule flex flex-col sm:flex-row sm:items-start justify-between gap-4"
      >
        <div className="min-w-0 flex-1">
          <div
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink-muted tabular-nums ${
              isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.1em]'
            }`}
          >
            <span className="text-visa-green font-semibold">
              {isUrdu
                ? `مرحلہ ${inspectedNode.step} · ${stageLabel(inspectedNode.id, inspectedNode.shortLabel)}`
                : `Stage ${inspectedNode.step} · ${inspectedNode.shortLabel}`}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {inspectedNode.state === 'done'
                ? isUrdu
                  ? 'مکمل'
                  : 'Completed'
                : inspectedNode.state === 'current'
                  ? isUrdu
                    ? 'فعال مرحلہ'
                    : 'Active Checkpoint'
                  : inspectedNode.state === 'preview'
                    ? isUrdu
                      ? `عمومی دورانیہ: ${stageWindow(inspectedNode.id, inspectedNode.typicalWindow)}`
                      : `Typical Window: ${inspectedNode.typicalWindow}`
                    : isUrdu
                      ? 'آئندہ مرحلہ'
                      : 'Upcoming Stage'}
            </span>
            {inspectedNode.stageUpdates.length > 0 && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-ink">
                  <span className="font-latin-mono">{inspectedNode.stageUpdates.length}</span>{' '}
                  {isUrdu
                    ? 'تازہ اپ ڈیٹس'
                    : inspectedNode.stageUpdates.length === 1
                      ? 'Fetched Update'
                      : 'Fetched Updates'}
                </span>
              </>
            )}
          </div>

          <p className="mt-1.5 text-sm text-ink-body leading-relaxed">
            {stageDetail(inspectedNode.id, inspectedNode.detail)}
          </p>

          {inspectedNode.stageUpdates.length > 0 && (
            <p className="mt-2 text-xs text-ink-muted leading-relaxed tabular-nums">
              {isUrdu ? 'تازہ ترین اندراج' : 'Latest log'} (
              <span className="font-latin-mono">
                {formatUpdateDateStamp(inspectedNode.stageUpdates[0].timestamp)}
              </span>
              ): <span className="text-ink">{inspectedNode.stageUpdates[0].message}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
