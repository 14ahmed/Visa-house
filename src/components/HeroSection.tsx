import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';
import type { VisaSlipFacts } from '../data/types';
import { buildWhatsAppUrl } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import { RubberStamp } from './RubberStamp';
import { VisaSlip } from './VisaSlip';

export interface HeroValuePoint {
  index: string;
  label: string;
  detail: string;
}

export interface HeroSectionProps {
  kickerItems?: readonly string[];
  headlinePrefix?: string;
  headlineHighlight?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  whatsappContext?: string;
  valuePoints?: readonly HeroValuePoint[];
  specimenFacts?: VisaSlipFacts;
  className?: string;
}

const DEFAULT_HERO_SPECIMEN_FACTS_EN: VisaSlipFacts = {
  visaType: 'Tourist & Business Dossier (Specimen)',
  entryType: 'Single / Multiple (Mission Dependent)',
  stayDuration: 'Sample · Varies by Country',
  validity: 'Sample · Varies by Mission',
  processingTime: 'Sample · Confirm Live',
  govtFee: 'Confirm with our team',
  ourFee: 'Confirm with our team',
  lastVerified: 'Illustrative Specimen Only',
  mrzLine1: 'V<PAKVISAHOUSE<<SPECIMEN<DOSSIER<<<<<<<<<<<<',
  mrzLine2: 'VH0000000PAK0000000M0000000<<<<<<<<<<<<<<00',
};

const DEFAULT_HERO_SPECIMEN_FACTS_UR: VisaSlipFacts = {
  visaType: 'سیاحتی اور کاروباری ڈوزئیر (نمونہ)',
  entryType: 'سنگل / ملٹی پل (سفارتخانے کے مطابق)',
  stayDuration: 'نمونہ · ملک کے مطابق مختلف',
  validity: 'نمونہ · مشن کے مطابق مختلف',
  processingTime: 'نمونہ · لائیو تصدیق',
  govtFee: 'Confirm with our team',
  ourFee: 'Confirm with our team',
  lastVerified: 'صرف وضاحتی نمونہ',
  mrzLine1: 'V<PAKVISAHOUSE<<SPECIMEN<DOSSIER<<<<<<<<<<<<',
  mrzLine2: 'VH0000000PAK0000000M0000000<<<<<<<<<<<<<<00',
};

/**
 * Editorial asymmetric hero section featuring Fraunces / Nastaliq display typography,
 * a clear value-proposition subheadline, a primary consultation CTA,
 * and the tactile Specimen Visa Slip dossier visual.
 */
export function HeroSection({
  kickerItems,
  headlinePrefix,
  headlineHighlight,
  subheadline,
  ctaLabel,
  ctaHref = '#apply',
  secondaryHref = '/visas',
  secondaryLabel,
  whatsappContext = `a visa consultation from ${SITE_CONFIG.passportAudience}`,
  valuePoints,
  specimenFacts,
  className = '',
}: HeroSectionProps) {
  const { t, isUrdu } = useLanguage();

  const resolvedKickers = kickerItems ?? [
    t.hero.kickerDesk,
    formatLocalizedCopy(t.hero.kickerGuides, { count: DESTINATIONS.length }),
    t.hero.kickerSchengen,
  ];
  const resolvedPrefix = headlinePrefix ?? t.hero.headlinePrefix;
  const resolvedHighlight = headlineHighlight ?? t.hero.headlineHighlight;
  const resolvedSubheadline = subheadline ?? t.hero.subheadline;
  const resolvedCtaLabel = ctaLabel ?? t.hero.ctaPrimary;
  const resolvedSecondaryLabel = secondaryLabel ?? t.hero.ctaSecondary;
  const resolvedValuePoints = valuePoints ?? t.hero.valuePoints;
  const resolvedSpecimenFacts =
    specimenFacts ?? (isUrdu ? DEFAULT_HERO_SPECIMEN_FACTS_UR : DEFAULT_HERO_SPECIMEN_FACTS_EN);

  const waHref = buildWhatsAppUrl(whatsappContext);
  const isInternalRoute = ctaHref.startsWith('/') && !ctaHref.startsWith('//');

  return (
    <section
      aria-labelledby="hero-section-heading"
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 rule-double-bottom ${className}`.trim()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Editorial Copy, Value Proposition & Primary Consultation CTA */}
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mono-label text-ink-muted mb-5">
            {resolvedKickers.map((item, idx) => (
              <span key={item} className="inline-flex items-center gap-x-3">
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span className={idx === 0 ? 'text-visa-green font-medium' : ''}>{item}</span>
              </span>
            ))}
          </div>

          <h1
            id="hero-section-heading"
            className={`font-display font-medium tracking-tight text-ink text-balance ${
              isUrdu
                ? 'text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.85]'
                : 'text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.05]'
            }`}
          >
            {resolvedPrefix}{' '}
            <span className="highlighter-mark">{resolvedHighlight}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-[1.15rem] text-ink-body leading-relaxed max-w-2xl">
            {resolvedSubheadline}
          </p>

          {/* Primary Consultation CTA + Supporting Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {isInternalRoute ? (
              <Link
                to={ctaHref}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap shrink-0"
              >
                <span>{resolvedCtaLabel}</span>
                <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
              </Link>
            ) : (
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap shrink-0"
              >
                <span>{resolvedCtaLabel}</span>
                <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
              </a>
            )}

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 border border-ink/80 bg-slip text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="h-4 w-4 text-visa-green shrink-0" aria-hidden="true" />
              <span>{t.common.whatsappDesk}</span>
            </a>

            <Link
              to={secondaryHref}
              className={`inline-flex items-center gap-1.5 min-h-[44px] px-2 text-xs sm:text-sm text-ink hover:text-visa-green underline-offset-4 hover:underline whitespace-nowrap shrink-0 ${
                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.1em]'
              }`}
            >
              <span>{resolvedSecondaryLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          {/* Value Proposition Strip */}
          {resolvedValuePoints.length > 0 && (
            <dl className="mt-9 pt-6 border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-5">
              {resolvedValuePoints.map((point) => (
                <div key={point.index} className="min-w-0">
                  <dt className="flex items-baseline gap-2">
                    <span className="font-latin-mono text-xs font-semibold text-visa-green tabular-nums">
                      {point.index}
                    </span>
                    <span className="text-sm font-semibold text-ink leading-snug">
                      {point.label}
                    </span>
                  </dt>
                  <dd className="mt-1.5 text-xs sm:text-[13px] text-ink-muted leading-relaxed">
                    {point.detail}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Honest Consultancy Standards Line */}
          <div
            className={`mt-6 pt-4 border-t border-rule/70 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-ink-muted ${
              isUrdu
                ? 'text-xs font-medium'
                : 'text-[11px] font-mono uppercase tracking-[0.07em]'
            }`}
          >
            <span>{t.hero.standardsNonGov}</span>
            <span aria-hidden="true">·</span>
            <span>{t.hero.standardsNoGuarantee}</span>
            <span aria-hidden="true">·</span>
            <span>{t.hero.standardsLiveFees}</span>
          </div>
        </div>

        {/* Right: Tactile Tilted Specimen Visa Slip + Rubber Stamp */}
        <div className="lg:col-span-5 relative py-2">
          <div className="relative lg:rotate-[1.5deg] rtl:lg:-rotate-[1.5deg] transition-transform duration-300 hover:rotate-0">
            <VisaSlip
              country={t.hero.specimenTitle}
              isoCode="PAK"
              accentHex="#0F5C4B"
              facts={resolvedSpecimenFacts}
              specimenMode
              className="paper-card-texture"
            />
            <div className="mt-4 lg:mt-0 lg:absolute lg:-bottom-6 lg:-end-4">
              <RubberStamp
                label={t.hero.stampLabel}
                sublabel={t.hero.stampSublabel}
                color="#B93222"
                rotation={-5}
                variant="rect"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
