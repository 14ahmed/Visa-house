import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { EDITORIAL_IMAGES, SITE_CONFIG } from '../config/site';
import { DESTINATIONS, REGIONS, VISA_CHANNELS } from '../data/destinations';
import { PAKISTANI_VISA_FAQS } from '../data/visaFaqs';
import type { RegionId, VisaChannel } from '../data/types';
import { useLanguage } from '../context/LanguageContext';
import { filterDestinations, formatRegulatedValue } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  buildFaqSchema,
  buildItemListSchema,
  buildServiceSchema,
  type BreadcrumbItem,
} from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DestinationAtlasMap } from '../components/DestinationAtlasMap';
import { DocumentChecklistLibrary } from '../components/DocumentChecklistLibrary';
import { LazyInteractiveVisaGlobe as InteractiveVisaGlobe } from '../components/LazyInteractiveVisaGlobe';
import { Layout } from '../components/Layout';
import { LeadForm } from '../components/LeadForm';
import { PakistaniVisaFaqSection } from '../components/PakistaniVisaFaqSection';
import { PostageStamp } from '../components/PostageStamp';
import { SeoHead } from '../components/SeoHead';
import { TravelReadinessGuide } from '../components/TravelReadinessGuide';
import { VisaCostCalculator } from '../components/VisaCostCalculator';
import { VisaFeeEstimator } from '../components/VisaFeeEstimator';
import { VisaPhotoRequirements } from '../components/VisaPhotoRequirements';
import { WorldVisaHub } from '../components/WorldVisaHub';

export function VisasDirectoryPage() {
  const { t, isUrdu, localizeCountry, localizeRegion, localizeChannel } = useLanguage();
  const [region, setRegion] = useState<RegionId | 'All'>('All');
  const [channel, setChannel] = useState<VisaChannel | 'All'>('All');
  const [query, setQuery] = useState('');
  const [checklistDestinationId, setChecklistDestinationId] = useState<string>('japan');

  const filtered = useMemo(
    () => filterDestinations(DESTINATIONS, { region, channel, query }),
    [region, channel, query],
  );

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Visas', path: '/visas' },
  ];

  const resetFilters = () => {
    setRegion('All');
    setChannel('All');
    setQuery('');
  };

  const regionBtnFont = isUrdu
    ? 'text-xs font-medium'
    : 'text-xs font-mono uppercase tracking-[0.08em]';

  return (
    <Layout whatsappContext="choosing a visa destination" applyHref="#apply">
      <SeoHead
        title="All Visa Destinations from Pakistan | Visahouse"
        description={`Browse ${DESTINATIONS.length} country visa guides from Pakistan—UK, Canada, USA, Australia, Schengen states, Africa, and Asia.`}
        path="/visas"
        breadcrumbs={breadcrumbs}
        schemas={[
          buildServiceSchema({
            name: `Visa Consultancy Directory for ${SITE_CONFIG.passportAudience}`,
            description:
              'Complete index of tourist, business, and visitor visa guides prepared for Pakistani passport holders.',
            path: '/visas',
            serviceType: 'Visa Consultancy Directory',
          }),
          buildItemListSchema(
            `Visa Guides from ${SITE_CONFIG.passportAudience}`,
            DESTINATIONS.map((d) => ({
              name: `${d.country} Visa from ${SITE_CONFIG.passportAudience}`,
              path: `/visas/${d.slug}`,
            })),
          ),
          buildFaqSchema([...PAKISTANI_VISA_FAQS]),
        ]}
      />

      {/* Directory Editorial Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 border-b border-ink/80">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="mono-label text-ink-muted">
              {formatLocalizedCopy(t.pages.visasEyebrow, { count: DESTINATIONS.length })}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mt-2">
              {t.pages.visasHeadingPrefix}{' '}
              <span className="highlighter-mark">{t.common.pakistan}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-body leading-relaxed max-w-2xl">
              {t.pages.visasSubcopy}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#route-map"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.home.routeAtlasBtn}
              </a>
              <a
                href="#world-visa-hub"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.worldVisaHub.jumpLinkLabel}
              </a>
              <a
                href="#checklist-library"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.header.dynamicChecklistLibrary}
              </a>
              <a
                href="#photo-requirements"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.photoGuide.heading}
              </a>
              <a
                href="#travel-readiness"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.readiness.headingDirectory}
              </a>
              <a
                href="#cost-calculator"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.footer.visaCostCalculator}
              </a>
              <a
                href="#fee-estimator"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.header.visaFeeEstimator}
              </a>
              <a
                href="#visa-faq"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-slip border border-ink/80 hover:border-visa-green hover:text-visa-green text-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.footer.timelinesDocFaqs}
              </a>
              <a
                href="#apply"
                className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-visa-green text-slip hover:bg-ink text-sm font-medium rounded-[2px] transition-colors"
              >
                {t.hero.ctaPrimary}
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <figure>
              <div className="duotone-frame border border-ink/50 rounded-[2px]">
                <img
                  src={EDITORIAL_IMAGES.asiaSkyline.src}
                  alt={EDITORIAL_IMAGES.asiaSkyline.alt}
                  width={EDITORIAL_IMAGES.asiaSkyline.width}
                  height={EDITORIAL_IMAGES.asiaSkyline.height}
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* Filter Bar + Stamp Sheet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-rule">
        <div className="bg-slip border border-rule rounded-[3px] p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <label htmlFor="visas-search" className="sr-only">
                {t.pages.visasSearchPlaceholder}
              </label>
              <Search
                className="h-4 w-4 text-ink-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="visas-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.pages.visasSearchPlaceholder}
                className="w-full min-h-[44px] ps-10 pe-3.5 py-2 bg-paper border border-ink/40 rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:border-visa-green"
              />
            </div>

            {/* Channel Filter */}
            <div className="lg:col-span-5 flex flex-wrap items-center gap-1.5">
              <span className="mono-label text-ink-muted me-1">{t.pages.visasChannelLabel}</span>
              {(['All', ...VISA_CHANNELS] as const).map((ch) => {
                const active = channel === ch;
                return (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    aria-pressed={active}
                    className={`min-h-[38px] px-3 py-1.5 text-xs rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                      isUrdu ? 'font-medium' : 'font-mono'
                    } ${
                      active
                        ? 'bg-ink text-slip border-ink'
                        : 'bg-paper text-ink-body border-rule hover:border-ink/60'
                    }`}
                  >
                    {localizeChannel(ch)}
                  </button>
                );
              })}
            </div>

            {/* Result Counter */}
            <div className="lg:col-span-2 lg:text-end">
              <span className="mono-label text-ink tabular-nums" aria-live="polite">
                {formatLocalizedCopy(t.pages.visasShownCount, {
                  shown: filtered.length,
                  total: DESTINATIONS.length,
                })}
              </span>
            </div>
          </div>

          {/* Region Filter Row */}
          <div className="pt-4 border-t border-rule flex flex-wrap items-center gap-1.5">
            <span className="mono-label text-ink-muted me-1">{t.pages.visasRegionLabel}</span>
            {(['All', ...REGIONS] as const).map((reg) => {
              const active = region === reg;
              return (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setRegion(reg)}
                  aria-pressed={active}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${regionBtnFont} ${
                    active
                      ? 'bg-visa-green text-slip border-visa-green'
                      : 'bg-paper text-ink-body border-rule hover:border-ink/60'
                  }`}
                >
                  {localizeRegion(reg)}
                </button>
              );
            })}
            {(region !== 'All' || channel !== 'All' || query.trim() !== '') && (
              <button
                type="button"
                onClick={resetFilters}
                className={`ms-auto text-stamp-red hover:underline underline-offset-4 cursor-pointer min-h-[40px] px-2 ${
                  isUrdu ? 'text-xs font-medium' : 'text-xs font-mono uppercase tracking-[0.1em]'
                }`}
              >
                {t.common.resetFilters}
              </button>
            )}
          </div>
        </div>

        {/* Results Stamp Grid */}
        {filtered.length === 0 ? (
          <div className="mt-8 p-10 bg-slip border border-rule rounded-[3px] text-center">
            <p className="font-display text-2xl text-ink">
              {isUrdu ? 'آپ کے فلٹر سے کوئی ملک مطابقت نہیں رکھتا۔' : 'No destinations matched your filter.'}
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              {isUrdu
                ? 'اپنی تلاش یا ریجن فلٹر صاف کریں — یا کسی اور ملک کے لیے ہمارے ڈیسک کو پیغام بھیجیں۔'
                : 'Try clearing your search or region filter—or message our desk if you need a country outside this index.'}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] cursor-pointer"
            >
              {formatLocalizedCopy(t.pages.browseAllCountries, { count: DESTINATIONS.length })}
            </button>
          </div>
        ) : (
          <div className="mt-8 p-4 sm:p-6 bg-paper-deep/60 border border-rule rounded-[3px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((dest) => (
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
            </div>
          </div>
        )}

        {/* Companion Services Row */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          <PostageStamp
            to="/schengen-appointments"
            isoCode="SCH"
            title={t.home.schengenDeskTitle}
            subtitle={t.home.schengenDeskSub}
            channelLabel={t.home.schengenDeskChannel}
            accentHex="#0F5C4B"
          />
          <PostageStamp
            to="/travel-insurance"
            isoCode="INS"
            title={t.home.insuranceTitle}
            subtitle={t.home.insuranceSub}
            channelLabel={t.home.insuranceChannel}
            accentHex="#B93222"
          />
        </div>
      </section>

      {/* Consular Route & Schengen SVG Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule">
        <DestinationAtlasMap />
      </div>

      {/* Quick Comparison Ledger Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule">
        <p className="mono-label text-ink-muted">{t.pages.visasLedgerEyebrow}</p>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5 mb-6">
          {t.pages.visasLedgerHeading}
        </h2>

        <div className="overflow-x-auto bg-slip border border-rule rounded-[3px]">
          <table className="w-full text-start border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink/60 bg-paper-deep/50">
                <th className="py-3.5 px-4 mono-label text-ink">{t.pages.tableCountry}</th>
                <th className="py-3.5 px-4 mono-label text-ink">{t.pages.tableIso}</th>
                <th className="py-3.5 px-4 mono-label text-ink">{t.pages.tableRegion}</th>
                <th className="py-3.5 px-4 mono-label text-ink">{t.pages.tableChannel}</th>
                <th className="py-3.5 px-4 mono-label text-ink">{t.pages.tableFees}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {DESTINATIONS.map((dest) => (
                <tr key={dest.slug} className="hover:bg-paper/60 transition-colors">
                  <td className="py-3.5 px-4 font-medium">
                    <Link
                      to={`/visas/${dest.slug}`}
                      className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {localizeCountry(dest.country)} {t.pages.countryVisaSuffix}
                    </Link>
                  </td>
                  <td
                    className="py-3.5 px-4 font-latin-mono text-xs font-semibold tabular-nums"
                    style={{ color: dest.accentHex }}
                  >
                    {dest.isoCode}
                  </td>
                  <td className="py-3.5 px-4 text-ink-body">{localizeRegion(dest.region)}</td>
                  <td className="py-3.5 px-4 text-ink-body">{localizeChannel(dest.channel)}</td>
                  <td className="py-3.5 px-4 text-visa-green font-medium">
                    {formatRegulatedValue(dest.facts.govtFee) === SITE_CONFIG.confirmFallback
                      ? t.common.confirmWithTeam
                      : formatRegulatedValue(dest.facts.govtFee)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive 3D D3.js Globe + Document Checklist Library + Visa Photo Visual Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule space-y-10">
        <InteractiveVisaGlobe
          id="visa-globe"
          selectedChecklistId={checklistDestinationId}
          onSelectDestination={(checklistId) => setChecklistDestinationId(checklistId)}
          checklistAnchorId="checklist-library"
        />
        <div className="no-print">
          <WorldVisaHub
            id="world-visa-hub"
            onSelectDestination={(checklistId) => setChecklistDestinationId(checklistId)}
            checklistAnchorId="checklist-library"
          />
        </div>
        <DocumentChecklistLibrary
          selectedDestinationId={checklistDestinationId}
          onDestinationChange={setChecklistDestinationId}
        />
        <div className="no-print">
          <VisaPhotoRequirements id="photo-requirements" headingAs="h2" />
        </div>
        <TravelReadinessGuide id="travel-readiness" headingAs="h2" />
      </div>

      {/* Interactive Visa Cost Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule">
        <VisaCostCalculator id="cost-calculator" />
      </div>

      {/* Gemini Visa Fee & Processing Time Estimator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule">
        <VisaFeeEstimator />
      </div>

      {/* Timelines & Document Requirements FAQ */}
      <PakistaniVisaFaqSection
        id="visa-faq"
        eyebrow={t.home.no09FaqEyebrow}
        heading={t.home.no09FaqHeading}
        description={t.home.no09FaqDesc}
        showUtilityLinks={false}
        className="border-b border-rule"
      />

      {/* Closing Lead Form */}
      <section id="apply" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 scroll-mt-24">
        <LeadForm
          defaultDestination="Multiple Destinations / General Inquiry"
          heading={
            isUrdu
              ? 'یقین نہیں کہ آپ کی پروفائل کے لیے کون سا ملک موزوں ہے؟'
              : 'Not sure which country fits your passport profile?'
          }
          subcopy={
            isUrdu
              ? 'اپنا متوقع سفری مہینہ، بجٹ اور سابقہ سفری تاریخ بتائیں۔ ہمارا ڈیسک حقیقت پسندانہ تجاویز اور تازہ دستاویزی چیک لسٹ کی تصدیق کرے گا۔'
              : 'Tell us your travel month, budget, and any prior travel history. Our desk will recommend realistic options and confirm current document checklists.'
          }
        />
        <p className="mt-6 text-xs text-ink-muted">{t.common.disclaimer}</p>
      </section>
    </Layout>
  );
}
