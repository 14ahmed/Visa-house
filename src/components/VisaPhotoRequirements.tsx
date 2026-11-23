import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Copy, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  VISA_PHOTO_EXAMPLES,
  VISA_PHOTO_STANDARDS,
  filterPhotoExamples,
  formatPhotoStudioSpecText,
  getPhotoStandardById,
  type PhotoExampleFilter,
  type PhotoStandardId,
} from '../utils/visaPhotoRequirements';
import { VisaPhotoDiagram } from './VisaPhotoDiagram';

interface VisaPhotoRequirementsProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingAs?: 'h2' | 'h3';
  subcopy?: string;
  defaultStandardId?: PhotoStandardId;
  className?: string;
}

export function VisaPhotoRequirements({
  id = 'photo-requirements',
  eyebrow,
  heading,
  headingAs = 'h2',
  subcopy,
  defaultStandardId = 'schengen-uk',
  className = '',
}: VisaPhotoRequirementsProps) {
  const { t, isUrdu } = useLanguage();
  const resolvedEyebrow = eyebrow ?? t.photoGuide.eyebrow;
  const resolvedHeading = heading ?? t.photoGuide.heading;
  const resolvedSubcopy = subcopy ?? t.photoGuide.subcopy;

  const filterOptions: Array<{ id: PhotoExampleFilter; label: string }> = [
    { id: 'all', label: t.photoGuide.filterAll },
    { id: 'correct', label: t.photoGuide.filterCorrect },
    { id: 'incorrect', label: t.photoGuide.filterIncorrect },
  ];

  const [standardId, setStandardId] = useState<PhotoStandardId>(defaultStandardId);
  const [filter, setFilter] = useState<PhotoExampleFilter>('all');
  const [copiedSpec, setCopiedSpec] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const activeStandard = useMemo(() => getPhotoStandardById(standardId), [standardId]);
  const visibleExamples = useMemo(
    () => filterPhotoExamples(VISA_PHOTO_EXAMPLES, filter),
    [filter],
  );

  const handleCopySpec = () => {
    const specText = formatPhotoStudioSpecText(activeStandard);
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(specText).catch(() => {
        // Clipboard permissions can be restricted in sandboxed previews.
      });
    }
    setCopiedSpec(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopiedSpec(false);
      copyTimerRef.current = null;
    }, 2600);
  };

  const HeadingTag = headingAs;

  return (
    <section
      id={id}
      data-testid="visa-photo-requirements"
      data-photo-standard={standardId}
      className={`paper-card-texture border border-ink/75 rounded-[3px] p-5 sm:p-7 lg:p-8 scroll-mt-24 ${className}`}
    >
      {/* Header & Copy Studio Spec Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-rule">
        <div className="max-w-2xl">
          <p className="mono-label text-ink-muted">{resolvedEyebrow}</p>
          <HeadingTag className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2 leading-tight">
            {resolvedHeading}
          </HeadingTag>
          <p className="mt-2.5 text-sm sm:text-[15px] text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopySpec}
          className="inline-flex items-center justify-center gap-2 self-start lg:self-end min-h-[42px] px-4 py-2 bg-visa-green text-slip text-xs sm:text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{copiedSpec ? t.photoGuide.studioSpecCopied : t.photoGuide.copyStudioSpec}</span>
        </button>
      </div>

      {/* Controls Row: Embassy Standard Presets + Verdict Filter */}
      <div className="py-5 border-b border-rule flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label={t.photoGuide.standardLabel}
        >
          <span className="mono-label text-ink-muted me-1">{t.photoGuide.standardLabel}</span>
          {VISA_PHOTO_STANDARDS.map((std) => {
            const active = standardId === std.id;
            return (
              <button
                key={std.id}
                type="button"
                onClick={() => setStandardId(std.id)}
                aria-pressed={active}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-ink text-slip border-ink'
                    : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                }`}
              >
                {std.shortLabel}
              </button>
            );
          })}
        </div>

        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label={t.photoGuide.viewLabel}
        >
          <span className="mono-label text-ink-muted me-1">{t.photoGuide.viewLabel}</span>
          {filterOptions.map((option) => {
            const active = filter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={active}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-visa-green text-slip border-visa-green'
                    : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Embassy Specification Ledger */}
      <div
        className="py-5 border-b border-rule"
        aria-live="polite"
        data-testid="photo-standard-specs"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3.5">
          <h3 className="font-display text-xl font-medium text-ink">{activeStandard.title}</h3>
          <span className="text-xs text-ink-muted">{activeStandard.countriesSummary}</span>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slip border border-rule rounded-[2px] p-3.5">
            <dt className="mono-label text-ink-muted">{t.photoGuide.printDigitalSize}</dt>
            <dd
              data-testid="photo-spec-dimensions"
              className="mt-1 font-latin-mono text-sm font-semibold text-ink tabular-nums"
            >
              {activeStandard.dimensionsLabel}
            </dd>
            <dd className="mt-1 text-xs text-ink-muted tabular-nums">
              {activeStandard.digitalSpec}
            </dd>
          </div>

          <div className="bg-slip border border-rule rounded-[2px] p-3.5">
            <dt className="mono-label text-ink-muted">{t.photoGuide.headHeightRatio}</dt>
            <dd
              data-testid="photo-spec-head"
              className="mt-1 font-latin-mono text-sm font-semibold text-visa-green tabular-nums"
            >
              {activeStandard.headHeightSpec}
            </dd>
            <dd className="mt-1 text-xs text-ink-muted">{t.photoGuide.headHeightHint}</dd>
          </div>

          <div className="bg-slip border border-rule rounded-[2px] p-3.5">
            <dt className="mono-label text-ink-muted">{t.photoGuide.backgroundPaper}</dt>
            <dd className="mt-1 text-sm font-medium text-ink">{activeStandard.backgroundSpec}</dd>
            <dd className="mt-1 text-xs text-ink-muted">{activeStandard.recencyRule}</dd>
          </div>

          <div className="bg-slip border border-rule rounded-[2px] p-3.5">
            <dt className="mono-label text-ink-muted">{t.photoGuide.eyeglassesPolicy}</dt>
            <dd className="mt-1 text-xs sm:text-[13px] font-medium text-ink leading-snug">
              {activeStandard.glassesRule}
            </dd>
          </div>
        </dl>
      </div>

      {/* Visual Specimen Grid: Correct vs Incorrect Photo Examples */}
      <div
        className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 border-b border-rule"
        data-testid="photo-examples-grid"
      >
        {visibleExamples.map((example) => {
          const isCorrect = example.isCorrect;
          return (
            <article
              key={example.id}
              data-testid={`photo-example-${example.id}`}
              data-verdict={isCorrect ? 'correct' : 'incorrect'}
              className={`bg-slip border rounded-[3px] p-4 flex flex-col justify-between ${
                isCorrect ? 'border-visa-green/55' : 'border-rule'
              }`}
            >
              <div>
                {/* Explicit Status Verdict Header (Icon + Text + Plate Code) */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-rule/80">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      isUrdu ? '' : 'font-mono uppercase tracking-[0.08em]'
                    } ${isCorrect ? 'text-visa-green' : 'text-stamp-red'}`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    <span>
                      {isCorrect ? t.photoGuide.approvedVerdict : t.photoGuide.rejectedVerdict}
                    </span>
                  </span>
                  <span className="font-latin-mono text-[11px] text-ink-muted tabular-nums">
                    {example.plateCode}
                  </span>
                </div>

                {/* Archival Biometric Specimen Diagram */}
                <VisaPhotoDiagram
                  specimen={example.specimen}
                  dimensionBadge={activeStandard.aspectRatioLabel}
                />

                {/* Title & Rule Summary */}
                <div className="mt-3.5">
                  <h4 className="font-display text-lg font-medium text-ink leading-snug">
                    {example.title}
                  </h4>
                  <p className="mt-1 font-mono text-[11px] text-ink-muted">
                    {example.ruleSummary}
                  </p>
                  <p className="mt-2 text-xs sm:text-[13px] text-ink-body leading-relaxed">
                    {example.detailNote}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Studio Takeaway Footer Note */}
      <div className="pt-5 text-xs sm:text-sm text-ink-body leading-relaxed">
        <strong
          className={`text-xs text-ink me-2 ${
            isUrdu ? 'font-semibold' : 'font-mono uppercase tracking-[0.08em]'
          }`}
        >
          {t.photoGuide.pakistanStudioTip}
        </strong>
        {activeStandard.studioNote}
      </div>
    </section>
  );
}
