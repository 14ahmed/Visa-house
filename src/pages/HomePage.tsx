import { lazy, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { EDITORIAL_IMAGES, SITE_CONFIG } from '../config/site';
import { DESTINATION_SUMMARIES as DESTINATIONS, REGIONS } from '../data/destinationIndex';
import type { RegionId } from '../data/types';
import { PAKISTANI_VISA_FAQS } from '../data/visaFaqs';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/formatters';
import { buildFaqSchema, buildHomeSchemas } from '../utils/seo';
import { HeroSection } from '../components/HeroSection';
import { LazyInteractiveVisaGlobe as InteractiveVisaGlobe } from '../components/LazyInteractiveVisaGlobe';
import { Layout } from '../components/Layout';
import { PakistaniVisaFaqSection } from '../components/PakistaniVisaFaqSection';
import { PostageStamp } from '../components/PostageStamp';
import { SeoHead } from '../components/SeoHead';
import { ViewportLazyWidget } from '../components/ViewportLazyWidget';

const LazyClientTestimonial = lazy(async () => ({
  default: (await import('../components/ClientTestimonial')).ClientTestimonial,
}));
const LazyDocumentChecklistLibrary = lazy(async () => ({
  default: (await import('../components/DocumentChecklistLibrary')).DocumentChecklistLibrary,
}));
const LazyLeadForm = lazy(async () => ({
  default: (await import('../components/LeadForm')).LeadForm,
}));
const LazyRubberStamp = lazy(async () => ({
  default: (await import('../components/RubberStamp')).RubberStamp,
}));
const LazySchengenSlotAvailability = lazy(async () => ({
  default: (await import('../components/SchengenSlotAvailability')).SchengenSlotAvailability,
}));
const LazyTravelInsuranceAdvisor = lazy(async () => ({
  default: (await import('../components/TravelInsuranceAdvisor')).TravelInsuranceAdvisor,
}));
const LazyTravelReadinessGuide = lazy(async () => ({
  default: (await import('../components/TravelReadinessGuide')).TravelReadinessGuide,
}));
const LazyVisaCostCalculator = lazy(async () => ({
  default: (await import('../components/VisaCostCalculator')).VisaCostCalculator,
}));
const LazyVisaNewsAlerts = lazy(async () => ({
  default: (await import('../components/VisaNewsAlerts')).VisaNewsAlerts,
}));
const LazyVisaPhotoRequirements = lazy(async () => ({
  default: (await import('../components/VisaPhotoRequirements')).VisaPhotoRequirements,
}));
const LazyVisaStatusTracker = lazy(async () => ({
  default: (await import('../components/VisaStatusTracker')).VisaStatusTracker,
}));
const LazyWorldVisaHub = lazy(async () => ({
  default: (await import('../components/WorldVisaHub')).WorldVisaHub,
}));

const TOP_PAKISTAN_SLUGS = [
  'turkey',
  'azerbaijan',
  'uk',
  'usa',
  'canada',
  'australia',
  'italy',
  'spain',
  'france',
  'germany',
  'malaysia',
  'thailand',
] as const;

export function HomePage() {
  const { t, isUrdu, localizeCountry, localizeRegion, localizeChannel } = useLanguage();
  const waHref = buildWhatsAppUrl(`visas from ${SITE_CONFIG.passportAudience}`);
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'All'>('All');
  const [showAllStamps, setShowAllStamps] = useState<boolean>(false);
  const [checklistDestinationId, setChecklistDestinationId] = useState<string>('canada');

  const visibleDestinations = useMemo(() => {
    if (selectedRegion !== 'All') {
      return DESTINATIONS.filter((d) => d.region === selectedRegion);
    }
    if (showAllStamps) {
      return DESTINATIONS;
    }
    const priorityMap = new Map(DESTINATIONS.map((d) => [d.slug, d]));
    const featured = TOP_PAKISTAN_SLUGS.map((slug) => priorityMap.get(slug)).filter(
      (d): d is (typeof DESTINATIONS)[number] => Boolean(d),
    );
    return featured.length > 0 ? featured : DESTINATIONS.slice(0, 12);
  }, [selectedRegion, showAllStamps]);

  const chipFontClass = isUrdu
    ? 'text-xs font-medium'
    : 'text-xs font-mono uppercase tracking-[0.08em]';

  return (
    <Layout whatsappContext="visa guidance" applyHref="#apply">
      <SeoHead
        title="Visahouse — Every Visa Under One Roof | Pakistan"
        description="Online-first visa filing, Schengen appointment guidance, and travel insurance for Pakistani passport holders. Every visa under one roof."
        path="/"
        schemas={[...buildHomeSchemas(), buildFaqSchema([...PAKISTANI_VISA_FAQS])]}
      />

      {/* HERO: Dedicated Editorial Hero Section Component */}
      <HeroSection />

      {/* NO. 01: POSTAGE STAMP SHEET OF ALL DESTINATIONS + SCHENGEN + INSURANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="mono-label text-ink-muted">{t.home.no01Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {t.home.no01Heading}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/visas#route-map"
              className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-visa-green text-visa-green hover:bg-visa-green-soft rounded-[2px] whitespace-nowrap ${
                isUrdu ? 'text-xs font-medium' : 'text-xs font-mono uppercase tracking-[0.12em]'
              }`}
            >
              <span>{t.home.routeAtlasBtn}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link
              to="/visas"
              className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 border border-ink/70 bg-slip text-ink hover:bg-paper-deep rounded-[2px] whitespace-nowrap ${
                isUrdu ? 'text-xs font-medium' : 'text-xs font-mono uppercase tracking-[0.12em]'
              }`}
            >
              <span>{t.home.filterByRegionBtn}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Interactive Region Filter Tabs */}
        <div
          role="group"
          aria-label={t.home.filterByRegionBtn}
          className="mb-5 flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setSelectedRegion('All')}
            aria-pressed={selectedRegion === 'All'}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${chipFontClass} ${
              selectedRegion === 'All'
                ? 'bg-visa-green text-slip border-visa-green'
                : 'bg-slip text-ink-body border-rule hover:border-ink/60'
            }`}
          >
            {t.common.all} (<span className="font-latin-mono">{DESTINATIONS.length}</span>)
          </button>
          {REGIONS.map((reg) => {
            const count = DESTINATIONS.filter((d) => d.region === reg).length;
            const active = selectedRegion === reg;
            return (
              <button
                key={reg}
                type="button"
                onClick={() => setSelectedRegion(reg)}
                aria-pressed={active}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${chipFontClass} ${
                  active
                    ? 'bg-ink text-slip border-ink'
                    : 'bg-slip text-ink-body border-rule hover:border-ink/60'
                }`}
              >
                {localizeRegion(reg)} (<span className="font-latin-mono">{count}</span>)
              </button>
            );
          })}
        </div>

        {/* Archival Stamp Sheet Tray */}
        <div className="p-4 sm:p-6 bg-paper-deep/60 border border-rule rounded-[3px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {visibleDestinations.map((dest) => (
              <PostageStamp
                key={dest.slug}
                to={`/visas/${dest.slug}`}
                isoCode={dest.isoCode}
                title={localizeCountry(dest.country)}
                subtitle={localizeRegion(dest.region)}
                channelLabel={localizeChannel(dest.channel)}
                accentHex={dest.accentHex}
              />
            ))}
            {(selectedRegion === 'All' || selectedRegion === 'Europe & UK') && (
              <PostageStamp
                to="/schengen-appointments"
                isoCode="SCH"
                title={t.home.schengenDeskTitle}
                subtitle={t.home.schengenDeskSub}
                channelLabel={t.home.schengenDeskChannel}
                accentHex="#0F5C4B"
              />
            )}
            {selectedRegion === 'All' && (
              <PostageStamp
                to="/travel-insurance"
                isoCode="INS"
                title={t.home.insuranceTitle}
                subtitle={t.home.insuranceSub}
                channelLabel={t.home.insuranceChannel}
                accentHex="#B93222"
              />
            )}
          </div>

          {selectedRegion === 'All' && DESTINATIONS.length > visibleDestinations.length && (
            <div className="mt-6 pt-5 border-t border-rule flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-ink-muted">
                {isUrdu
                  ? `پاکستان سے مقبول ${visibleDestinations.length} ممالک دکھائے جا رہے ہیں (کل ${DESTINATIONS.length} گائیڈز دستیاب)`
                  : `Showing top ${visibleDestinations.length} popular destinations from Pakistan (${DESTINATIONS.length} total guides available).`}
              </p>
              <button
                type="button"
                onClick={() => setShowAllStamps(true)}
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-slip border border-ink/70 text-ink hover:bg-visa-green hover:text-slip hover:border-visa-green text-xs font-mono uppercase tracking-[0.1em] rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>
                  {isUrdu
                    ? `تمام ${DESTINATIONS.length} ممالک دکھائیں`
                    : `Show All ${DESTINATIONS.length} Countries (+${DESTINATIONS.length - visibleDestinations.length} more)`}
                </span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>
          )}
          {selectedRegion === 'All' && showAllStamps && (
            <div className="mt-6 pt-5 border-t border-rule flex justify-end">
              <button
                type="button"
                onClick={() => setShowAllStamps(false)}
                className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-rule text-ink-body hover:border-ink hover:text-ink text-xs font-mono uppercase tracking-[0.1em] rounded-[2px] transition-colors cursor-pointer"
              >
                {isUrdu ? 'صرف مقبول ممالک دکھائیں' : 'Show Popular 12 Only'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* NO. 02: INTERACTIVE 3D D3.JS GLOBE + DOCUMENT CHECKLIST PDF BUILDER + VISA PHOTO GUIDE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule space-y-10">
        <InteractiveVisaGlobe
          id="visa-globe"
          selectedChecklistId={checklistDestinationId}
          onSelectDestination={(checklistId) => setChecklistDestinationId(checklistId)}
          checklistAnchorId="document-checklist"
        />
        <div className="no-print">
          <ViewportLazyWidget
            id="world-visa-hub"
            eyebrow={isUrdu ? 'گلوبل ٹائم لائنز' : 'Global Turnaround Index'}
            heading={
              isUrdu
                ? '42 ممالک کی پروسیسنگ رفتار اور متبادل راستے'
                : 'World Visa Hub: Processing Times Across 42 Countries'
            }
            description={
              isUrdu
                ? 'خطے کے لحاظ سے پروسیسنگ وقت کا موازنہ کریں اور تیز تر ویزا راستے دیکھیں۔'
                : 'Compare regional visa processing timelines and discover faster e-Visa alternatives for Pakistani travellers.'
            }
            buttonLabel={isUrdu ? 'گلوبل ویزا ہب کھولیں' : 'Open Global Visa Hub'}
            minHeightClass="min-h-[260px]"
          >
            {() => (
              <LazyWorldVisaHub
                id="world-visa-hub"
                onSelectDestination={(checklistId) => setChecklistDestinationId(checklistId)}
                checklistAnchorId="document-checklist"
              />
            )}
          </ViewportLazyWidget>
        </div>
        <ViewportLazyWidget
          id="document-checklist"
          eyebrow={t.home.no02ChecklistEyebrow}
          heading={isUrdu ? 'دستاویز چیک لسٹ اور PDF بلڈر' : 'Interactive Document Checklist & PDF Builder'}
          description={
            isUrdu
              ? 'اپنے سفر کے مقصد کے مطابق مکمل دستاویزات منتخب کریں اور A4 چیک لسٹ ڈاؤن لوڈ کریں۔'
              : 'Build a tailored embassy document checklist by country and travel purpose, and download a formatted A4 PDF.'
          }
          buttonLabel={isUrdu ? 'چیک لسٹ بلڈر کھولیں' : 'Open Checklist Builder'}
          minHeightClass="min-h-[300px]"
        >
          {() => (
            <LazyDocumentChecklistLibrary
              id="document-checklist"
              selectedDestinationId={checklistDestinationId}
              onDestinationChange={setChecklistDestinationId}
              sectionNumber={t.home.no02ChecklistEyebrow}
            />
          )}
        </ViewportLazyWidget>
        <div className="no-print">
          <ViewportLazyWidget
            id="photo-requirements"
            eyebrow={t.home.no02PhotoEyebrow}
            heading={t.home.no02PhotoHeading}
            description={
              isUrdu
                ? 'شینگن، برطانیہ، امریکہ اور ای ویزا بایومیٹرک تصویر کے سائز اور بیک گراؤنڈ معیار دیکھیں۔'
                : 'Embassy biometric photo dimensions, background rules, and common studio errors for Schengen, UK, USA, and e-Visa.'
            }
            buttonLabel={isUrdu ? 'تصویر گائیڈ کھولیں' : 'Open Photo Guide'}
            minHeightClass="min-h-[240px]"
          >
            {() => (
              <LazyVisaPhotoRequirements
                id="photo-requirements"
                headingAs="h3"
                eyebrow={t.home.no02PhotoEyebrow}
                heading={t.home.no02PhotoHeading}
              />
            )}
          </ViewportLazyWidget>
        </div>
      </div>

      {/* NO. 03: INTERACTIVE VISA COST CALCULATOR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <ViewportLazyWidget
          id="cost-calculator"
          eyebrow={t.home.no03CalcEyebrow}
          heading={isUrdu ? 'ویزا اخراجات اور PKR فیس کیلکولیٹر' : 'Interactive Visa Cost & PKR Fee Calculator'}
          description={
            isUrdu
              ? 'ملک، درخواست دہندگان اور اضافی سروسز منتخب کر کے مکمل لاگت کا تخمینہ دیکھیں۔'
              : 'Estimate total visa costs in PKR across destinations, applicant counts, and optional support services.'
          }
          buttonLabel={isUrdu ? 'کیلکولیٹر کھولیں' : 'Open Cost Calculator'}
          minHeightClass="min-h-[280px]"
          eagerMatchSearch="country="
        >
          {() => (
            <LazyVisaCostCalculator
              id="cost-calculator"
              sectionNumber={t.home.no03CalcEyebrow}
            />
          )}
        </ViewportLazyWidget>
      </div>

      {/* NO. 04: LIVE VISA STATUS TRACKER (PAPER-CARD-TEXTURE + SSE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <ViewportLazyWidget
          id="track-status"
          eyebrow={t.home.no04TrackerEyebrow}
          heading={isUrdu ? 'اپنی ویزا درخواست کا اسٹیٹس ٹریک کریں' : 'Live Visa Application Status Tracker'}
          description={
            isUrdu
              ? 'اپنا ریفرنس نمبر درج کر کے فائل کی تیاری، اپائنٹمنٹ اور سفارتخانے کے مراحل دیکھیں۔'
              : 'Enter your Visahouse reference number to inspect dossier audit, appointment, and embassy tracking stages.'
          }
          buttonLabel={isUrdu ? 'اسٹیٹس ٹریکر کھولیں' : 'Open Status Tracker'}
          minHeightClass="min-h-[260px]"
        >
          {() => (
            <LazyVisaStatusTracker
              id="track-status"
              eyebrow={t.home.no04TrackerEyebrow}
            />
          )}
        </ViewportLazyWidget>
      </div>

      {/* NO. 05: HOW VISAHOUSE WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="mono-label text-ink-muted">{t.home.no05Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {t.home.no05Heading}
            </h2>
            <p className="mt-4 text-[15px] text-ink-body leading-relaxed">
              {t.home.no05Body}
            </p>

            {/* Duotone Editorial Desk Photograph */}
            <figure className="mt-7">
              <div className="duotone-frame border border-ink/50 rounded-[2px]">
                <img
                  src={EDITORIAL_IMAGES.desk.src}
                  alt={EDITORIAL_IMAGES.desk.alt}
                  width={EDITORIAL_IMAGES.desk.width}
                  height={EDITORIAL_IMAGES.desk.height}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <figcaption className="mt-2 mono-label text-[11px] text-ink-muted">
                {t.home.no05Caption}
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-8 border-t border-ink/70 divide-y divide-rule">
            {t.home.howItWorksSteps.map((step) => (
              <div
                key={step.number}
                className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline"
              >
                <span className="sm:col-span-2 font-latin-mono text-2xl font-medium text-visa-green tabular-nums">
                  {step.number}
                </span>
                <div className="sm:col-span-10">
                  <h3 className="font-display text-2xl font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-body leading-relaxed max-w-2xl">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NO. 06: WHY VISAHOUSE (PROCESS PROMISES — ZERO FAKE STATS OR REVIEWS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="mono-label text-ink-muted">{t.home.no06Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {t.home.no06Heading}
            </h2>
          </div>
          <ViewportLazyWidget
            id="why-visahouse-stamp"
            eyebrow={t.home.no06Eyebrow}
            heading={t.home.no06StampLabel}
            description={t.home.no06StampSublabel}
            compactFallback={() => <div className="h-[72px] w-[148px]" aria-hidden="true" />}
          >
            {() => (
              <LazyRubberStamp
                label={t.home.no06StampLabel}
                sublabel={t.home.no06StampSublabel}
                color="#0F5C4B"
                rotation={4}
                variant="oval"
              />
            )}
          </ViewportLazyWidget>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.home.processPromises.map((promise) => (
            <div
              key={promise.index}
              className="bg-slip border border-rule rounded-[3px] p-6 sm:p-7"
            >
              <p className="mono-label text-visa-green">{promise.index}</p>
              <h3 className="font-display text-2xl font-medium text-ink mt-2">{promise.title}</h3>
              <p className="mt-3 text-[15px] text-ink-body leading-relaxed">{promise.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NO. 07: SCHENGEN APPOINTMENTS + TRAVEL INSURANCE EDITORIAL BLOCKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="no-print mb-8">
          <p className="mono-label text-ink-muted">{t.home.no07Eyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {t.home.no07Heading}
          </h2>
        </div>

        <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Schengen Feature Block (Asymmetric 7 cols) */}
          <article className="lg:col-span-7 bg-slip border border-ink/70 rounded-[3px] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-rule">
                <span className="mono-label text-visa-green">{t.home.schengenCardEyebrow}</span>
                <span className="font-latin-mono text-lg font-semibold text-visa-green">SCH</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-5">
                {t.home.schengenCardTitle}
              </h3>
              <p className="mt-3 text-[15px] text-ink-body leading-relaxed">
                {t.home.schengenCardBody}
              </p>

              <figure className="mt-6">
                <div className="duotone-frame border border-rule rounded-[2px]">
                  <img
                    src={EDITORIAL_IMAGES.airport.src}
                    alt={EDITORIAL_IMAGES.airport.alt}
                    width={EDITORIAL_IMAGES.airport.width}
                    height={EDITORIAL_IMAGES.airport.height}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
              </figure>
            </div>

            <div className="mt-6 pt-5 border-t border-rule flex flex-wrap items-center justify-between gap-4">
              <span className="mono-label text-ink-muted">
                {t.home.schengenCardCities}
              </span>
              <Link
                to="/schengen-appointments"
                className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
              >
                <span>{t.home.schengenCardCta}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Travel Insurance Feature Block (Asymmetric 5 cols) */}
          <article className="lg:col-span-5 bg-slip border border-ink/70 rounded-[3px] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-rule">
                <span className="mono-label text-stamp-red">{t.home.insuranceCardEyebrow}</span>
                <span className="font-latin-mono text-lg font-semibold text-stamp-red">INS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-5">
                {t.home.insuranceCardTitle}
              </h3>
              <p className="mt-3 text-[15px] text-ink-body leading-relaxed">
                {t.home.insuranceCardBody}
              </p>

              <dl className="mt-6 border-t border-rule divide-y divide-rule text-sm">
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="mono-label text-ink-muted">{t.home.insuranceMinimumLabel}</dt>
                  <dd className="font-medium text-ink tabular-nums">{t.home.insuranceMinimumVal}</dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="mono-label text-ink-muted">{t.home.insuranceZonesLabel}</dt>
                  <dd className="font-medium text-ink">{t.home.insuranceZonesVal}</dd>
                </div>
                <div className="py-3 flex items-baseline justify-between gap-4">
                  <dt className="mono-label text-ink-muted">{t.home.insurancePremiumLabel}</dt>
                  <dd className="font-medium text-visa-green">{t.common.confirmWithTeam}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 pt-5 border-t border-rule">
              <Link
                to="/travel-insurance"
                className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 border border-ink/80 text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep transition-colors whitespace-nowrap"
              >
                <span>{t.home.insuranceCardCta}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>

        {/* Simulated Live Schengen Appointment Slot Availability Indicator */}
        <div className="no-print mt-8">
          <ViewportLazyWidget
            id="schengen-slots"
            eyebrow={t.schengenSlots.eyebrow}
            heading={t.schengenSlots.heading}
            description={t.schengenSlots.subcopy}
            buttonLabel={isUrdu ? 'اپائنٹمنٹ انڈیکیٹر کھولیں' : 'Open Appointment Indicator'}
            minHeightClass="min-h-[260px]"
          >
            {() => (
              <LazySchengenSlotAvailability
                id="schengen-slots"
                inquiryHref="/schengen-appointments#apply"
              />
            )}
          </ViewportLazyWidget>
        </div>

        {/* Interactive Travel Insurance Advisor */}
        <div className="no-print mt-8">
          <ViewportLazyWidget
            id="insurance-advisor"
            eyebrow={t.home.insuranceCardEyebrow}
            heading={isUrdu ? 'ٹریول انشورنس پلان ایڈوائزر' : 'Interactive Travel Insurance Advisor'}
            description={t.home.insuranceCardBody}
            buttonLabel={isUrdu ? 'انشورنس ایڈوائزر کھولیں' : 'Open Insurance Advisor'}
            minHeightClass="min-h-[260px]"
          >
            {() => (
              <LazyTravelInsuranceAdvisor
                id="insurance-advisor"
                headingAs="h3"
                inquiryHref="/travel-insurance#apply"
              />
            )}
          </ViewportLazyWidget>
        </div>

        {/* Structured Archival Travel Readiness Guide (All 38 Destinations) */}
        <div className="mt-8">
          <ViewportLazyWidget
            id="travel-readiness"
            eyebrow={isUrdu ? 'سفر سے پہلے کی تیاری' : 'Country Entry & Travel Guide'}
            heading={
              isUrdu
                ? 'پاور پلگ، سم کارڈ اور مقامی سفری ہدایات'
                : 'Travel Readiness Guide: Plugs, SIM Cards & Local Etiquette'
            }
            description={
              isUrdu
                ? '42 ممالک کے لیے بجلی کے ساکٹ، مقامی سم، کرنسی اور سفری احتیاط دیکھیں۔'
                : 'Essential arrival notes covering power adapters, local SIM options, and entry etiquette for all 42 destinations.'
            }
            buttonLabel={isUrdu ? 'ٹریول گائیڈ کھولیں' : 'Open Travel Readiness Guide'}
            minHeightClass="min-h-[260px]"
          >
            {() => (
              <LazyTravelReadinessGuide
                id="travel-readiness"
                headingAs="h3"
              />
            )}
          </ViewportLazyWidget>
        </div>
      </section>

      {/* NO. 08: CLIENT TESTIMONIALS / VISA SUCCESS STORIES */}
      <ViewportLazyWidget
        id="testimonials"
        eyebrow={t.home.no08TestimonialsEyebrow}
        heading={t.testimonials.title}
        description={t.testimonials.subcopy}
        compactFallback={(onLoadNow) => (
          <section
            id="testimonials"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule scroll-mt-24"
          >
            <div className="paper-card-texture border border-ink/75 rounded-[3px] p-6 sm:p-8 flex flex-col justify-between gap-5 min-h-[260px]">
              <div className="max-w-2xl">
                <p className="mono-label text-ink-muted">{t.home.no08TestimonialsEyebrow}</p>
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2">
                  {t.testimonials.title}
                </h2>
                <p className="mt-2.5 text-sm sm:text-[15px] text-ink-body leading-relaxed">
                  {t.testimonials.subcopy}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={onLoadNow}
                  className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-xs font-mono uppercase tracking-[0.1em] rounded-[2px] hover:bg-visa-green-dark transition-colors cursor-pointer"
                >
                  {isUrdu ? 'کامیابی کی کہانیاں دیکھیں' : 'View Visa Success Stories'}
                </button>
              </div>
            </div>
          </section>
        )}
      >
        {() => <LazyClientTestimonial eyebrow={t.home.no08TestimonialsEyebrow} />}
      </ViewportLazyWidget>

      {/* NO. 09: TIMELINES & DOCUMENT REQUIREMENTS FAQ (FRAUNCES HEADINGS) */}
      <PakistaniVisaFaqSection
        id="faq"
        eyebrow={t.home.no09FaqEyebrow}
        heading={t.home.no09FaqHeading}
        description={t.home.no09FaqDesc}
        className="border-b border-rule"
      />

      {/* NO. 10: VISA NEWS & POLICY ALERTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <ViewportLazyWidget
          id="visa-alerts"
          eyebrow={t.home.no10AlertsEyebrow}
          heading={t.alerts.heading}
          description={t.alerts.subcopy}
          buttonLabel={isUrdu ? 'ویزا الرٹس کھولیں' : 'Open Visa Policy Alerts'}
          minHeightClass="min-h-[240px]"
        >
          {() => (
            <LazyVisaNewsAlerts
              sectionNumber={t.home.no10AlertsEyebrow}
              sourcePath="/"
            />
          )}
        </ViewportLazyWidget>
      </div>

      {/* NO. 11: CLOSING LEAD FORM */}
      <section id="apply" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="mono-label text-ink-muted">{t.home.no11Eyebrow}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {t.home.no11Heading}
            </h2>
            <p className="mt-4 text-[15px] text-ink-body leading-relaxed">
              {t.home.no11Body}
            </p>
            <div className="mt-6 pt-5 border-t border-rule text-sm space-y-2.5">
              <p className="mono-label text-ink-muted">{t.home.no11DirectPrompt}</p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-visa-green font-medium hover:underline underline-offset-4"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>
                  {t.common.whatsapp}{' '}
                  <span className="font-latin-mono">{SITE_CONFIG.whatsappDisplay}</span>
                </span>
              </a>
              <div>
                <Link
                  to="/contact#track-status"
                  className="inline-flex items-center gap-1.5 text-ink hover:text-visa-green hover:underline underline-offset-4"
                >
                  <span>{t.home.no11TrackLink}</span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ViewportLazyWidget
              id="apply-form"
              extraHashes={['apply']}
              eyebrow={t.home.no11Eyebrow}
              heading={isUrdu ? 'ویزا درخواست فارم' : 'Start Your Visa Assessment'}
              description={t.home.no11Body}
              buttonLabel={isUrdu ? 'درخواست فارم کھولیں' : 'Open Application Form'}
              minHeightClass="min-h-[320px]"
            >
              {() => <LazyLeadForm defaultDestination="Thailand Visa" />}
            </ViewportLazyWidget>
          </div>
        </div>
      </section>
    </Layout>
  );
}
