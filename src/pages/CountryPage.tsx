import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import {
  DESTINATION_SUMMARIES as DESTINATIONS,
  getRelatedDestinationSummaries as getRelatedDestinations,
} from '../data/destinationIndex';
import type { DestinationData } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl, formatRegulatedValue } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  buildFaqSchema,
  buildGuideWebPageSchema,
  buildHowToSchema,
  buildServiceSchema,
  type BreadcrumbItem,
} from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CountryVignette } from '../components/CountryVignette';
import { DocumentChecklist } from '../components/DocumentChecklist';
import { FaqAccordion } from '../components/FaqAccordion';
import { Layout } from '../components/Layout';
import { LeadForm } from '../components/LeadForm';
import { ManilaPackages } from '../components/ManilaPackages';
import { PostageStamp } from '../components/PostageStamp';
import { RubberStamp } from '../components/RubberStamp';
import { SeoHead } from '../components/SeoHead';
import { TravelInsuranceWidget } from '../components/TravelInsuranceWidget';
import { TravelReadinessGuide } from '../components/TravelReadinessGuide';
import { VisaSlip } from '../components/VisaSlip';
import { buildPrintDocumentHeading } from '../utils/printDocument';

interface CountryPageProps {
  destination: DestinationData;
}

/**
 * Single reusable Country Page template fed by src/data/destinations.ts.
 * Implements all 9 requested editorial sections + conditional USA B1/B2 guidance.
 */
export function CountryPage({ destination }: CountryPageProps) {
  const { t, isUrdu, localizeCountry, localizeRegion, localizeChannel } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState('');

  const localizedCountry = localizeCountry(destination.country);
  const localizedRegion = localizeRegion(destination.region);
  const localizedChannel = localizeChannel(destination.channel);

  const path = `/visas/${destination.slug}`;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Visas', path: '/visas' },
    { name: destination.country, path },
  ];

  const related = getRelatedDestinations(destination.relatedSlugs);
  const waHref = buildWhatsAppUrl(`${destination.country} visa from ${SITE_CONFIG.passportAudience}`);

  return (
    <Layout whatsappContext={`${destination.country} visa`} applyHref="#apply">
      <SeoHead
        title={destination.seoTitle}
        description={destination.seoDescription}
        path={path}
        breadcrumbs={breadcrumbs}
        schemas={[
          buildServiceSchema({
            name: `${destination.country} Visa from ${SITE_CONFIG.passportAudience}`,
            description: destination.seoDescription,
            path,
            serviceType: `${destination.country} Visa Consultancy`,
          }),
          buildGuideWebPageSchema({
            name: `${destination.country} Visa from ${SITE_CONFIG.passportAudience}`,
            description: destination.seoDescription,
            path,
          }),
          buildHowToSchema({
            name: `How to apply for a ${destination.country} visa from ${SITE_CONFIG.passportAudience}`,
            description: destination.heroPromise,
            steps: destination.steps,
          }),
          buildFaqSchema(destination.faqs),
        ]}
      />

      {/* SECTION 01: Asymmetric Editorial Hero + SECTION 02: Visa Slip Quick Facts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 rule-double-bottom">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Oversized Display H1, Promise, Actions, Rubber Stamp */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mono-label text-ink-muted mb-4">
              <span className="font-latin-mono" style={{ color: destination.accentHex }}>
                {destination.isoCode}
              </span>
              <span aria-hidden="true">·</span>
              <span>{localizedRegion}</span>
              <span aria-hidden="true">·</span>
              <span>{localizedChannel}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight leading-[1.06] text-ink">
              {localizedCountry} {t.pages.countryVisaSuffix}{' '}
              <span className="highlighter-mark">{t.pages.countryFromPrefix}</span>
            </h1>

            <p
              dir="auto"
              className="mt-5 text-lg sm:text-[1.15rem] text-ink-body leading-relaxed max-w-2xl"
            >
              {destination.heroPromise}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#apply"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
              >
                {formatLocalizedCopy(t.pages.countryApplyBtn, { country: localizedCountry })}
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 border border-ink/80 bg-slip text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 text-visa-green shrink-0" aria-hidden="true" />
                <span>{t.common.whatsappDesk}</span>
              </a>
            </div>

            {/* Subtle editorial stamp & architectural vignette */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7">
                <CountryVignette
                  isoCode={destination.isoCode}
                  countryName={localizedCountry}
                  accentHex={destination.accentHex}
                />
              </div>
              <div className="sm:col-span-5 flex sm:justify-end">
                <RubberStamp
                  label={isUrdu ? `${localizedCountry} فائل` : destination.stampLabel}
                  sublabel={isUrdu ? 'دستاویز آڈٹ' : 'DOSSIER AUDIT'}
                  color={destination.accentHex}
                  rotation={destination.stampRotation}
                  variant="rect"
                />
              </div>
            </div>
          </div>

          {/* Right: Section 02 Visa Slip Quick Facts */}
          <div className="lg:col-span-5">
            <VisaSlip
              country={localizedCountry}
              isoCode={destination.isoCode}
              accentHex={destination.accentHex}
              facts={destination.facts}
            />
            <p className="mt-3 text-xs text-ink-muted leading-relaxed">
              {t.pages.countryFeesNote}
            </p>
            <div className="mt-3">
              <Link
                to={`/?country=${destination.slug}#cost-calculator`}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.08em] text-visa-green font-medium hover:underline underline-offset-4"
              >
                <span>
                  {isUrdu
                    ? `${localizedCountry} ویزا کا متوقع خرچ PKR میں جانیں`
                    : `Estimate ${destination.country} total cost in PKR`}
                </span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER & STRUCTURED FACT TABLE (Human & AI Citation Summary) */}
      <section
        aria-labelledby="quick-answer-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-rule"
      >
        <div className="bg-slip border border-rule rounded-[3px] p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-rule">
            <div>
              <p className="mono-label text-visa-green">
                {isUrdu ? 'مختصر جواب · پاکستانی پاسپورٹ' : 'Quick Answer · Pakistani Passport Holders'}
              </p>
              <h2
                id="quick-answer-heading"
                className="font-display text-xl sm:text-2xl font-medium text-ink mt-1"
              >
                {isUrdu
                  ? `پاکستان سے ${localizedCountry} ویزا کا خلاصہ`
                  : `${destination.country} Visa from Pakistan at a Glance`}
              </h2>
            </div>
            <p className="text-xs font-mono text-ink-muted">
              {isUrdu
                ? `${t.common.brandName} پاکستان ڈیسک · تازہ کاری `
                : `Updated by ${SITE_CONFIG.brandName} Pakistan Desk · `}
              <time dateTime={SITE_CONFIG.guideReviewDateIso}>
                {destination.facts.lastVerified.trim() || SITE_CONFIG.guideReviewDateLabel}
              </time>
            </p>
          </div>

          <p
            dir="auto"
            data-aeo-answer="true"
            className="mt-4 text-sm sm:text-[15px] text-ink-body leading-relaxed max-w-4xl"
          >
            Pakistani passport holders applying for a <strong>{destination.country}</strong> visa
            typically apply via <strong>{destination.channel}</strong> ({destination.facts.visaType}).
            Typical allowed stay is <strong>{formatRegulatedValue(destination.facts.stayDuration)}</strong>{' '}
            with validity of <strong>{formatRegulatedValue(destination.facts.validity)}</strong>, and
            live processing times and fees are confirmed directly before filing.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <caption className="sr-only">
                {destination.country} visa quick facts for Pakistani passport holders
              </caption>
              <thead>
                <tr className="border-b border-ink/40 text-xs font-mono uppercase tracking-[0.08em] text-ink-muted">
                  <th scope="col" className="py-2.5 pe-4">Requirement</th>
                  <th scope="col" className="py-2.5">Details for Pakistani Applicants</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule text-ink-body">
                <tr>
                  <th scope="row" className="py-2.5 pe-4 font-medium text-ink whitespace-nowrap">Visa Type</th>
                  <td className="py-2.5">{destination.facts.visaType} ({destination.facts.entryType})</td>
                </tr>
                <tr>
                  <th scope="row" className="py-2.5 pe-4 font-medium text-ink whitespace-nowrap">How to Apply</th>
                  <td className="py-2.5">{destination.channel} · {destination.region}</td>
                </tr>
                <tr>
                  <th scope="row" className="py-2.5 pe-4 font-medium text-ink whitespace-nowrap">Processing Time</th>
                  <td className="py-2.5">{formatRegulatedValue(destination.facts.processingTime)}</td>
                </tr>
                <tr>
                  <th scope="row" className="py-2.5 pe-4 font-medium text-ink whitespace-nowrap">Stay &amp; Validity</th>
                  <td className="py-2.5">
                    {formatRegulatedValue(destination.facts.stayDuration)} ·{' '}
                    {formatRegulatedValue(destination.facts.validity)}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-2.5 pe-4 font-medium text-ink whitespace-nowrap">Govt &amp; Service Fees</th>
                  <td className="py-2.5">
                    {formatRegulatedValue(destination.facts.govtFee)} (live PKR rate before payment)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Contextual Internal Links & Direct Consultation */}
          <div className="mt-5 pt-4 border-t border-rule flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-visa-green hover:underline underline-offset-4"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Ask {destination.country} Visa Desk on WhatsApp</span>
            </a>
            <Link
              to={`/?country=${destination.slug}#cost-calculator`}
              className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
            >
              Estimate {destination.country} Visa Cost in PKR
            </Link>
            {destination.region === 'Europe & UK' && destination.slug !== 'uk' && (
              <Link
                to="/schengen-appointments"
                className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
              >
                Schengen Appointments (VFS &amp; BLS)
              </Link>
            )}
            <Link
              to="/travel-insurance"
              className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
            >
              Travel Insurance for {destination.country}
            </Link>
            <Link
              to="/visas"
              className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
            >
              All {DESTINATIONS.length} Visa Guides
            </Link>
          </div>
        </div>
      </section>

      {/* OPTIONAL SPECIALIZED BLOCK FOR USA (B1/B2 Visitor Guidance, DS-160 & Interview Prep) */}
      {destination.usaGuidance && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="mono-label text-ink-muted">
                {isUrdu ? 'خصوصی ڈیسک · B1/B2' : 'Special Desk · B1/B2'}
              </p>
              <h2 className="font-display text-3xl font-medium text-ink mt-2">
                {isUrdu
                  ? 'DS-160 درستگی اور قونصلر انٹرویو کی تیاری'
                  : 'DS-160 Precision & Consular Interview Preparation'}
              </h2>
              <p className="mt-4 text-[15px] text-ink-body leading-relaxed">
                {destination.usaGuidance.visitorOverview}
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slip border border-rule p-6 rounded-[3px]">
                <p className="mono-label text-visa-green mb-4">
                  {isUrdu ? 'DS-160 ڈرافٹنگ طریقہ کار' : 'DS-160 Drafting Workflow'}
                </p>
                <ol className="space-y-4 divide-y divide-rule/70">
                  {destination.usaGuidance.ds160Steps.map((step, i) => (
                    <li key={step.title} className={i > 0 ? 'pt-4' : ''}>
                      <h3 className="font-display text-lg font-medium text-ink">
                        <span className="font-latin-mono">0{i + 1}.</span> {step.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-body leading-relaxed">{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-slip border border-rule p-6 rounded-[3px]">
                <p className="mono-label text-stamp-red mb-4">
                  {isUrdu ? 'قونصلر انٹرویو کوچنگ' : 'Consulate Interview Coaching'}
                </p>
                <ol className="space-y-4 divide-y divide-rule/70">
                  {destination.usaGuidance.interviewPrepPoints.map((pt, i) => (
                    <li key={pt.title} className={i > 0 ? 'pt-4' : ''}>
                      <h3 className="font-display text-lg font-medium text-ink">
                        <span className="font-latin-mono">0{i + 1}.</span> {pt.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-body leading-relaxed">{pt.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 03: Who Can Apply + Interactive Tickable Document Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        {/* Combined Print-Only Visahouse Consular Letterhead (Country Page Single-Page Brief) */}
        <div
          className="print-only print-letterhead print-combined-letterhead"
          aria-hidden="true"
        >
          <div>
            <p className="print-letterhead-brand">{t.common.brandName}</p>
            <p className="mono-label mt-1">
              {buildPrintDocumentHeading('combined', localizedCountry)}
            </p>
          </div>
          <div className="print-letterhead-meta">
            <p>
              {destination.isoCode} · {localizedRegion} · {localizedChannel}
            </p>
            <p className="font-latin-mono">
              {SITE_CONFIG.domain} · {SITE_CONFIG.email}
            </p>
          </div>
        </div>

        <div className="print-flatten-grid grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="no-print lg:col-span-5">
            <p className="mono-label text-ink-muted">{t.pages.countryNo03Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {t.pages.countryNo03Heading}
            </h2>
            <p className="mt-4 text-[15px] text-ink-body leading-relaxed">
              {destination.whoCanApply.intro}
            </p>

            <ul className="mt-6 space-y-3 border-t border-rule pt-5">
              {destination.whoCanApply.profiles.map((profile, idx) => (
                <li key={profile} className="flex items-start gap-3 text-sm sm:text-[15px] text-ink-body">
                  <span className="font-latin-mono text-xs text-ink-muted mt-1 shrink-0 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{profile}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-paper-deep/65 border border-rule rounded-[2px] text-sm text-ink-body leading-relaxed">
              <span className="mono-label text-ink block mb-1.5">
                {t.pages.countryEligibilityNote}
              </span>
              {destination.whoCanApply.eligibilityNote}
            </div>
          </div>

          <div className="lg:col-span-7">
            <DocumentChecklist country={localizedCountry} groups={destination.checklist} />
          </div>
        </div>
      </section>

      {/* SECTION 04: Steps — What You Do / What We Do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="max-w-2xl">
          <p className="mono-label text-ink-muted">{t.pages.countryNo04Eyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {formatLocalizedCopy(t.pages.countryNo04Heading, { country: localizedCountry })}
          </h2>
        </div>

        <div className="mt-10 border-t border-ink/70 divide-y divide-rule">
          {destination.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="py-6 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start"
            >
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="font-latin-mono text-sm font-semibold text-visa-green tabular-nums">
                  {step.stepNumber}
                </span>
                <h3 className="font-display text-xl font-medium text-ink">{step.title}</h3>
              </div>
              <div className="md:col-span-4">
                <p className="mono-label text-ink-muted mb-1.5">{t.pages.countryWhatYouDo}</p>
                <p className="text-sm sm:text-[15px] text-ink-body leading-relaxed">{step.youDo}</p>
              </div>
              <div className="md:col-span-4">
                <p className="mono-label text-visa-green mb-1.5">{t.pages.countryWhatWeDo}</p>
                <p className="text-sm sm:text-[15px] text-ink leading-relaxed">{step.weDo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 05: Common Refusal Reasons + How We Prevent Them */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mono-label text-stamp-red">{t.pages.countryNo05Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {formatLocalizedCopy(t.pages.countryNo05Heading, { country: localizedCountry })}
            </h2>
          </div>
          <RubberStamp
            label={isUrdu ? 'دستاویزی جانچ' : 'CLERICAL CHECK'}
            sublabel={isUrdu ? 'فائلنگ سے قبل آڈٹ' : 'PRE-FILING AUDIT'}
            color="#B93222"
            rotation={3}
            variant="oval"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {destination.refusalReasons.map((item, idx) => (
            <article
              key={item.title}
              className="bg-slip border border-rule rounded-[3px] p-6 flex flex-col justify-between"
            >
              <div>
                <p className="mono-label text-stamp-red">
                  {isUrdu ? `خدشہ 0${idx + 1}` : `Risk 0${idx + 1}`}
                </p>
                <h3 className="font-display text-xl font-medium text-ink mt-1.5">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-body leading-relaxed">{item.cause}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-rule">
                <p className="mono-label text-visa-green mb-1">{t.pages.countryPrevention}</p>
                <p className="text-sm text-ink leading-relaxed">{item.prevention}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 06: Local Notes (Why Go, Best Season, Cities, Entry Tips) + Travel Readiness */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="mono-label text-ink-muted">{t.pages.countryNo06Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {formatLocalizedCopy(t.pages.countryNo06Heading, { country: localizedCountry })}
            </h2>
            <div className="mt-5 space-y-4 text-[15px] text-ink-body leading-relaxed">
              {destination.localNotes.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slip border border-rule p-6 rounded-[3px]">
              <p className="mono-label text-ink-muted">{t.pages.countryBestSeason}</p>
              <h3 className="font-display text-xl font-medium text-ink mt-1.5">
                {destination.localNotes.bestSeasonTitle}
              </h3>
              <p className="mt-2.5 text-[15px] text-ink-body leading-relaxed">
                {destination.localNotes.bestSeasonBody}
              </p>
            </div>

            <div className="bg-slip border border-rule p-6 rounded-[3px]">
              <p className="mono-label text-ink-muted">{t.pages.countryCities}</p>
              <h3 className="font-display text-xl font-medium text-ink mt-1.5">
                {destination.localNotes.citiesTitle}
              </h3>
              <p className="mt-2.5 text-[15px] text-ink-body leading-relaxed">
                {destination.localNotes.citiesBody}
              </p>
            </div>

            <div className="bg-slip border border-rule p-6 rounded-[3px]">
              <p className="mono-label text-ink-muted">{t.pages.countryEntryTips}</p>
              <h3 className="font-display text-xl font-medium text-ink mt-1.5">
                {destination.localNotes.entryTipsTitle}
              </h3>
              <p className="mt-2.5 text-[15px] text-ink-body leading-relaxed">
                {destination.localNotes.entryTipsBody}
              </p>
            </div>
          </div>
        </div>

        {/* Focused Archival Travel Readiness Field Card for This Destination */}
        <div className="mt-10">
          <TravelReadinessGuide
            id="travel-readiness"
            destinationSlug={destination.slug}
            headingAs="h3"
          />
        </div>
      </section>

      {/* SECTION 07: Packages as Manila-Folder Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="max-w-2xl mb-8">
          <p className="mono-label text-ink-muted">{t.pages.countryNo07Eyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {formatLocalizedCopy(t.pages.countryNo07Heading, { country: localizedCountry })}
          </h2>
          <p className="mt-3 text-[15px] text-ink-body leading-relaxed">
            {isUrdu
              ? 'ہر پیکج میں سرکاری سفارتی/پورٹل فیس اور ویزاہاؤس کنسلٹنسی فیس الگ الگ واضح کی جاتی ہے تاکہ ادائیگی سے پہلے ہر مد شفاف رہے۔'
              : 'Every package separates official embassy/portal fees from Visahouse consultancy work so you always see what goes where before paying.'}
          </p>
        </div>

        <ManilaPackages
          country={localizedCountry}
          packages={destination.packages}
          accentHex={destination.accentHex}
          onSelectPackage={(pkgTitle) => setSelectedPackage(pkgTitle)}
        />
      </section>

      {/* KEYWORD-TARGETED PAKISTAN APPLICANT GUIDE (Tailored per Country Chunk) */}
      {destination.seoKeywordGuide && (
        <section
          aria-labelledby="pakistan-search-guide-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule"
        >
          <div className="max-w-3xl mb-8">
            <p className="mono-label text-visa-green">
              {isUrdu
                ? `پاکستانی درخواست گزاروں کے لیے اہم معلومات · ${localizedCountry}`
                : `Pakistan Applicant Guide · ${destination.country}`}
            </p>
            <h2
              id="pakistan-search-guide-heading"
              className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2"
            >
              {destination.seoKeywordGuide.sectionHeading}
            </h2>
            <p className="mt-3 text-[15px] text-ink-body leading-relaxed">
              {destination.seoKeywordGuide.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.seoKeywordGuide.blocks.map((block, index) => (
              <article
                key={block.heading}
                className="bg-slip border border-rule rounded-[3px] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-latin-mono text-xs font-semibold text-visa-green">
                    0{index + 1} · {block.keywordFocus}
                  </p>
                  <h3 className="font-display text-xl font-medium text-ink mt-2 leading-snug">
                    {block.heading}
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] text-ink-body leading-relaxed">
                    {block.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mono-label text-ink-muted me-1">
              {isUrdu ? 'متعلقہ موضوعات:' : 'Key Topics Covered:'}
            </span>
            {destination.seoKeywordGuide.primaryKeywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center px-2.5 py-1 bg-paper-deep/75 border border-rule rounded-[2px] text-xs text-ink-body"
              >
                {kw}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 08: 6–8 FAQs Written Like Real Google Searches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="mono-label text-ink-muted">{t.pages.countryNo08Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {formatLocalizedCopy(t.pages.countryNo08Heading, { country: localizedCountry })}
            </h2>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              {isUrdu
                ? 'اہلیت، بینک اسٹیٹمنٹ اور ایئرپورٹ انٹری سے متعلق ان عام سوالات کے واضح جوابات جو ہمارا ڈیسک ہر ہفتے حل کرتا ہے۔'
                : 'Plain-spoken answers to the exact eligibility, bank statement, and airport entry questions our desk handles every week.'}
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={destination.faqs} idPrefix={`faq-${destination.slug}`} />
          </div>
        </div>
      </section>

      {/* SECTION 09: Related Destinations, Travel Insurance Link, Closing Lead CTA & Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <TravelInsuranceWidget
          variant="banner"
          className="mb-14"
          heading={
            isUrdu
              ? `${localizedCountry} کے سفر کے ساتھ شینگن اور عالمی میڈیکل انشورنس شامل کریں`
              : `Pair your ${destination.country} trip with Schengen-ready & worldwide medical cover`
          }
          explainer={
            isUrdu
              ? 'چاہے آپ علاقائی سفر کر رہے ہوں یا یورپ (تمام شینگن ممالک کے لیے کم از کم €30,000 ایمرجنسی میڈیکل اور وطن واپسی لازمی)، صاف ڈیجیٹل پالیسی سرٹیفکیٹ آپ کو غیر متوقع طبی اخراجات سے محفوظ رکھتا ہے۔'
              : 'Whether you are travelling regionally, continuing onward to Europe (minimum €30,000 emergency medical & repatriation required across all Schengen states), or flying long-haul, clean digital cover protects against unexpected hospitalisation and trip interruptions.'
          }
          ctaLabel={t.pages.insuranceRequestBtn}
          inquiryHref="/travel-insurance#apply"
        />

        {/* Related Destinations Stamp Strip */}
        <div className="mb-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <div>
              <p className="mono-label text-ink-muted">{t.pages.countryNo09Eyebrow}</p>
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1">
                {formatLocalizedCopy(t.pages.countryNo09Heading, { country: localizedCountry })}
              </h2>
            </div>
            <Link
              to="/visas"
              className={`inline-flex items-center gap-1.5 text-visa-green hover:underline underline-offset-4 whitespace-nowrap ${
                isUrdu ? 'text-sm font-medium' : 'text-sm font-mono uppercase tracking-[0.12em]'
              }`}
            >
              <span>
                {formatLocalizedCopy(t.pages.browseAllCountries, { count: DESTINATIONS.length })}
              </span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((rel) => (
              <PostageStamp
                key={rel.slug}
                to={`/visas/${rel.slug}`}
                isoCode={rel.isoCode}
                title={`${localizeCountry(rel.country)} ${t.pages.countryVisaSuffix}`}
                subtitle={localizeRegion(rel.region)}
                channelLabel={localizeChannel(rel.channel)}
                accentHex={rel.accentHex}
              />
            ))}
          </div>
        </div>

        {/* Closing Lead Form */}
        <div id="apply" className="scroll-mt-24">
          <LeadForm
            defaultDestination={`${destination.country} Visa`}
            selectedPackageNote={selectedPackage}
            heading={
              isUrdu
                ? `${localizedCountry} ویزا انکوائری شروع کریں`
                : `Start your ${destination.country} visa inquiry`
            }
            subcopy={
              isUrdu
                ? `اپنے متوقع سفری مہینے اور پاکستان میں اپنے شہر کی تفصیل شیئر کریں۔ ہمارا ڈیسک ${localizedCountry} کی تازہ چیک لسٹ، سرکاری فیس اور کنسلٹنسی چارجز کی تصدیق کرے گا۔`
                : `Tell us your planned travel month and city in ${SITE_CONFIG.passportAudience}. Our desk will reply with the live ${destination.country} checklist, current official fee schedule, and our consultancy charge.`
            }
            submitLabel={
              isUrdu
                ? `${localizedCountry} ویزا چیک لسٹ حاصل کریں`
                : `Request ${destination.country} Visa Checklist`
            }
          />
        </div>

        {/* Mandatory Visa-Page Consultancy Disclaimer */}
        <div className="mt-8 p-4 border-t border-b border-rule text-xs sm:text-sm text-ink-body leading-relaxed">
          <strong
            className={`text-ink me-2 ${
              isUrdu ? 'font-semibold' : 'font-mono uppercase tracking-[0.1em]'
            }`}
          >
            {t.common.consultancyNotice}
          </strong>
          {t.common.disclaimer}
        </div>
      </section>
    </Layout>
  );
}
