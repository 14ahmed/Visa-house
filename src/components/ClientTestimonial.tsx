import { useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  filterTestimonialsByRegion,
  TESTIMONIAL_REGIONS,
  VISA_SUCCESS_STORIES,
  type TestimonialRegionId,
  type VisaSuccessStory,
} from '../data/testimonials';
import { RubberStamp } from './RubberStamp';

export interface ClientTestimonialProps {
  stories?: readonly VisaSuccessStory[];
  eyebrow?: string;
  title?: string;
  subcopy?: string;
  initialRegion?: 'all' | TestimonialRegionId;
  className?: string;
}

/**
 * Editorial visa success-stories showcase using a responsive card-based layout
 * with a subtle cotton-paper grain texture and interactive region filters.
 */
export function ClientTestimonial({
  stories = VISA_SUCCESS_STORIES,
  eyebrow,
  title,
  subcopy,
  initialRegion = 'all',
  className = '',
}: ClientTestimonialProps) {
  const { t, isUrdu } = useLanguage();
  const resolvedEyebrow = eyebrow ?? t.home.no08TestimonialsEyebrow;
  const resolvedTitle = title ?? t.testimonials.title;
  const resolvedSubcopy = subcopy ?? t.testimonials.subcopy;
  const [selectedRegion, setSelectedRegion] = useState<'all' | TestimonialRegionId>(initialRegion);

  const visibleStories = useMemo(
    () => filterTestimonialsByRegion(stories, selectedRegion),
    [stories, selectedRegion],
  );

  const regionCounts = useMemo(
    () => ({
      all: stories.length,
      'schengen-west': stories.filter((s) => s.regionId === 'schengen-west').length,
      'east-asia': stories.filter((s) => s.regionId === 'east-asia').length,
      'southeast-asia': stories.filter((s) => s.regionId === 'southeast-asia').length,
    }),
    [stories],
  );

  const getRegionLabel = (id: 'all' | TestimonialRegionId) => {
    if (id === 'all') return t.testimonials.regionAll;
    if (id === 'schengen-west') return t.testimonials.regionSchengenWest;
    if (id === 'east-asia') return t.testimonials.regionEastAsia;
    return t.testimonials.regionSoutheastAsia;
  };

  if (stories.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule scroll-mt-24 ${className}`.trim()}
    >
      {/* Editorial Header + Stamp + Interactive Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-rule">
        <div className="max-w-2xl">
          <p className="mono-label text-visa-green">{resolvedEyebrow}</p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl sm:text-4xl font-medium tracking-tight leading-[1.12] text-ink mt-2 text-balance"
          >
            {resolvedTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end lg:flex-col lg:items-end gap-5 shrink-0">
          <div className="hidden sm:block">
            <RubberStamp
              label={t.testimonials.stampLabel}
              sublabel={t.testimonials.stampSublabel}
              color="#0F5C4B"
              rotation={-4}
              variant="rect"
            />
          </div>

          <div
            role="group"
            aria-label={t.testimonials.title}
            className="flex flex-wrap items-center gap-1.5"
          >
            {TESTIMONIAL_REGIONS.map((region) => {
              const active = selectedRegion === region.id;
              const count = regionCounts[region.id];
              return (
                <button
                  key={region.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedRegion(region.id)}
                  className={`min-h-[40px] px-3.5 py-2 text-xs rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                    isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                  } ${
                    active
                      ? 'bg-visa-green text-slip border-visa-green'
                      : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                  }`}
                >
                  {getRegionLabel(region.id)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card-Based Paper-Textured Grid with Fraunces Quotes */}
      <div
        aria-live="polite"
        className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
      >
        {visibleStories.map((story) => (
          <article
            key={story.id}
            className="paper-card-texture border border-ink/25 hover:border-ink/60 rounded-[3px] p-6 flex flex-col justify-between transition-colors duration-150"
          >
            <div>
              {/* Unboxed Metadata Header Row */}
              <div className="flex items-baseline justify-between gap-3 pb-3.5 border-b border-rule">
                <span className="font-latin-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted tabular-nums">
                  {story.caseCode}
                </span>
                <span
                  className="font-latin-mono text-xs font-semibold tracking-[0.14em]"
                  style={{ color: story.accentHex }}
                >
                  {story.isoCode}
                </span>
              </div>

              {/* Outcome Header */}
              <div className="mt-4">
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-visa-green font-medium">
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{story.visaGranted}</span>
                </p>
                <h3 className="font-display text-lg font-medium text-ink mt-1 leading-snug">
                  {story.destination}
                </h3>
                <p className="mt-0.5 text-xs font-mono text-ink-muted">
                  {story.filingChannel} · {story.turnaroundNote}
                </p>
              </div>

              {/* Quote Body Set Explicitly in Fraunces */}
              <blockquote className="mt-4 pt-4 border-t border-rule/80">
                <span
                  aria-hidden="true"
                  style={{ color: story.accentHex }}
                  className="block font-display text-3xl leading-none opacity-65 select-none -mb-1"
                >
                  “
                </span>
                <p className="font-display italic text-[17px] sm:text-[18px] font-normal text-ink leading-[1.52] tracking-[-0.005em]">
                  {story.quote}”
                </p>
              </blockquote>
            </div>

            {/* Footer Attribution + File Focus */}
            <footer className="mt-5 pt-4 border-t border-rule space-y-2.5">
              <p className="text-xs text-ink-muted leading-relaxed">
                <span
                  className={`text-ink me-1.5 ${
                    isUrdu ? 'font-semibold' : 'font-mono uppercase tracking-[0.08em]'
                  }`}
                >
                  {t.testimonials.fileFocus}
                </span>
                {story.dossierHighlight}
              </p>
              <div className="flex items-baseline justify-between gap-2 pt-2 border-t border-rule/60">
                <div className="min-w-0">
                  <p className="font-display text-base font-medium text-ink truncate">
                    {story.applicantName}
                  </p>
                  <p className="text-xs text-ink-muted truncate">{story.applicantRole}</p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted shrink-0">
                  {story.city}
                </span>
              </div>
            </footer>
          </article>
        ))}
      </div>

      {/* Mandatory Editorial Honesty Notice */}
      <p className="mt-6 text-xs text-ink-muted leading-relaxed max-w-3xl">
        {t.testimonials.honestyNote} {t.common.disclaimer}
      </p>
    </section>
  );
}

export { ClientTestimonial as VisaSuccessTestimonials };
