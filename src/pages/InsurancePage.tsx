import { Link } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import {
  INSURANCE_CLAIMS_STEPS,
  INSURANCE_FAQS,
  INSURANCE_PLANS,
} from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl, formatRegulatedValue } from '../utils/formatters';
import {
  buildCanonicalUrl,
  buildFaqSchema,
  buildHowToSchema,
  buildServiceSchema,
  buildWebPageSchema,
  type BreadcrumbItem,
} from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FaqAccordion } from '../components/FaqAccordion';
import { Layout } from '../components/Layout';
import { LeadForm } from '../components/LeadForm';
import { RubberStamp } from '../components/RubberStamp';
import { SeoHead } from '../components/SeoHead';
import { TravelInsuranceAdvisor } from '../components/TravelInsuranceAdvisor';

const COVERAGE_PILLARS = [
  {
    title: 'Emergency Hospitalisation & Medical Evacuation',
    body: 'Covers sudden illness or accidental injury abroad, inpatient hospital bills, and medically necessary evacuation back to Pakistan per the licensed policy schedule.',
  },
  {
    title: 'Schengen Embassy Compliance (€30,000+)',
    body: 'Formatted explicitly for VFS Global, BLS International, and European consular counters—clearly showing territory ("Schengen States"), €30,000+ medical ceiling, and repatriation.',
  },
  {
    title: 'Passport Loss & Baggage Protection',
    body: 'Assistance and benefit caps (on qualifying tiers) for delayed checked luggage, lost travel documents, and urgent consular replacement costs.',
  },
  {
    title: 'Trip Delay & Cancellation Options',
    body: 'Optional enhanced protection for covered weather delays or documented pre-departure emergencies—always confirmed against underwriter policy wording before purchase.',
  },
];

export function InsurancePage() {
  const { t, isUrdu, localizeCountry } = useLanguage();
  const path = '/travel-insurance';
  const insuranceDescription =
    'Compare Schengen-compliant €30,000, Asia, and Worldwide travel medical insurance plans from Pakistan with clear coverage and claims steps.';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Travel Insurance', path },
  ];
  const waHref = buildWhatsAppUrl(
    `Schengen or worldwide travel insurance from ${SITE_CONFIG.passportAudience}`,
  );

  return (
    <Layout whatsappContext="travel insurance quote" applyHref="#apply">
      <SeoHead
        title="Travel Insurance from Pakistan — Schengen Cover | Visahouse"
        description={insuranceDescription}
        path={path}
        breadcrumbs={breadcrumbs}
        schemas={[
          buildWebPageSchema({
            name: 'Travel Insurance from Pakistan — Schengen Cover | Visahouse',
            description: insuranceDescription,
            path,
            mainEntityId: `${buildCanonicalUrl(path)}#service`,
            hasBreadcrumb: true,
            speakableSelectors: ['h1', '[data-aeo-answer="true"]'],
          }),
          buildServiceSchema({
            name: `Travel Insurance & Schengen Medical Cover from ${SITE_CONFIG.passportAudience}`,
            description:
              'Comparison and quote assistance for Schengen-compliant, Asia, and Worldwide travel medical insurance policies.',
            path,
            serviceType: 'Travel Insurance Consultancy',
          }),
          buildHowToSchema({
            name: 'How to file a travel medical insurance claim abroad',
            description:
              'Emergency assistance contact, original itemised medical & airline documentation, insurer notification, and claim-desk support.',
            path,
            steps: INSURANCE_CLAIMS_STEPS,
          }),
          buildFaqSchema(INSURANCE_FAQS, path),
        ]}
      />

      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 border-b border-ink/80">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mono-label text-ink-muted mb-4">
              <span className="font-latin-mono text-stamp-red">INS</span>
              <span aria-hidden="true">·</span>
              <span>{t.home.insuranceZonesVal}</span>
              <span aria-hidden="true">·</span>
              <span>{t.common.pakistan}</span>
              <span aria-hidden="true">·</span>
              <span>
                Updated{' '}
                <time dateTime={SITE_CONFIG.guideReviewDateIso}>
                  {SITE_CONFIG.guideReviewDateLabel}
                </time>
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-medium tracking-tight leading-[1.06] text-ink">
              {t.pages.insuranceHeroTitlePrefix}{' '}
              <span className="highlighter-mark">{t.pages.insuranceHeroHighlight}</span>
            </h1>

            <p data-aeo-answer="true" className="mt-5 text-lg text-ink-body leading-relaxed max-w-2xl">
              {t.home.insuranceCardBody}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#apply"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
              >
                {t.pages.insuranceRequestBtn}
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
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <RubberStamp
              label={isUrdu ? 'شینگن €30K+' : 'SCHENGEN €30K+'}
              sublabel={isUrdu ? 'پالیسی ڈیسک · INS' : 'POLICY DESK · INS'}
              color="#B93222"
              rotation={4}
              variant="oval"
            />
          </div>
        </div>
      </section>

      {/* Interactive Travel Insurance Advisor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule">
        <TravelInsuranceAdvisor
          id="insurance-advisor"
          headingAs="h2"
          inquiryHref="#apply"
        />
      </section>

      {/* No. 01: Plan Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="max-w-2xl mb-8">
          <p className="mono-label text-ink-muted">
            {isUrdu ? 'نمبر 01 · پلانز کا موازنہ' : 'No. 01 · Plan Comparison'}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {isUrdu
              ? 'ٹریول انشورنس زونز اور کوریج درجوں کا موازنہ کریں'
              : 'Compare travel insurance zones & coverage tiers'}
          </h2>
          <p className="mt-3 text-[15px] text-ink-body leading-relaxed">
            {isUrdu
              ? 'حتمی پریمیم مسافر کی عمر، سفر کے کل دنوں اور منزل کے زون پر منحصر ہوتا ہے — ہماری ٹیم اجرا سے قبل لائسنس یافتہ انڈر رائٹر سے درست PKR کوٹ کی تصدیق کرتی ہے۔'
              : `Final premiums depend strictly on traveller age band, exact trip duration in days, and destination zone—so our team confirms exact ${SITE_CONFIG.currency} quotes directly from licensed underwriters before issuance.`}
          </p>
        </div>

        <div className="overflow-x-auto bg-slip border border-ink/70 rounded-[3px]">
          <table className="w-full text-start border-collapse text-sm min-w-[740px]">
            <thead>
              <tr className="border-b border-ink/60 bg-paper-deep/55">
                <th className="py-4 px-4 mono-label text-ink w-48">
                  {isUrdu ? 'خصوصیت' : 'Feature'}
                </th>
                {INSURANCE_PLANS.map((plan) => (
                  <th key={plan.id} className="py-4 px-4 align-top">
                    <span className="font-display text-lg font-medium text-ink block">
                      {plan.tierName}
                    </span>
                    <span className="text-xs font-normal text-ink-muted mt-1 block">
                      {plan.tagline}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <tr>
                <th scope="row" className="py-3.5 px-4 mono-label text-ink-muted font-normal">
                  {isUrdu ? 'کس کے لیے موزوں' : 'Best For'}
                </th>
                {INSURANCE_PLANS.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-ink-body align-top">
                    {p.bestFor}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="py-3.5 px-4 mono-label text-ink-muted font-normal">
                  {isUrdu ? 'میڈیکل حد' : 'Medical Limit'}
                </th>
                {INSURANCE_PLANS.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-ink font-medium align-top tabular-nums">
                    {p.medicalLimit}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="py-3.5 px-4 mono-label text-ink-muted font-normal">
                  {isUrdu ? 'شینگن مطابقت' : 'Schengen Compliant'}
                </th>
                {INSURANCE_PLANS.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-ink-body align-top">
                    {p.schengenCompliant}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="py-3.5 px-4 mono-label text-ink-muted font-normal">
                  {isUrdu ? 'وطن واپسی (Repatriation)' : 'Repatriation'}
                </th>
                {INSURANCE_PLANS.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-ink-body align-top">
                    {p.repatriation}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="py-3.5 px-4 mono-label text-ink-muted font-normal">
                  {isUrdu ? 'سامان اور تاخیر' : 'Baggage & Delay'}
                </th>
                {INSURANCE_PLANS.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-ink-body align-top">
                    {p.baggageDelay}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="py-3.5 px-4 mono-label text-ink-muted font-normal">
                  {isUrdu ? 'سفر کی منسوخی' : 'Trip Cancellation'}
                </th>
                {INSURANCE_PLANS.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-ink-body align-top">
                    {p.tripCancellation}
                  </td>
                ))}
              </tr>
              <tr className="bg-paper/60">
                <th scope="row" className="py-4 px-4 mono-label text-ink font-normal">
                  {isUrdu ? `پریمیم (${SITE_CONFIG.currency})` : `Premium (${SITE_CONFIG.currency})`}
                </th>
                {INSURANCE_PLANS.map((p) => (
                  <td key={p.id} className="py-4 px-4 font-medium text-visa-green align-top">
                    {formatRegulatedValue(p.indicativePremium) === SITE_CONFIG.confirmFallback
                      ? t.common.confirmWithTeam
                      : formatRegulatedValue(p.indicativePremium)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* No. 02: Coverage Pillars & Schengen Compliance Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="mono-label text-ink-muted">
              {isUrdu ? 'نمبر 02 · کوریج کی تفصیل' : 'No. 02 · What It Covers'}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {isUrdu
                ? 'شینگن کے مطابق سرٹیفکیٹس اور عملی کوریج'
                : 'Schengen-compliant certificates & practical coverage'}
            </h2>
            <p className="mt-4 text-[15px] text-ink-body leading-relaxed">
              {isUrdu
                ? 'یورپی سفارتخانے عام طور پر ایسی پالیسیاں مسترد کر دیتے ہیں جن میں وطن واپسی کی عبارت نہ ہو یا تاریخوں میں ایک دن کا بھی فرق ہو۔ ہم بائیو میٹرکس سے پہلے ہر سطر کی تصدیق کرتے ہیں۔'
                : 'European embassies routinely reject generic policies that omit repatriation language, list only one country instead of the entire Schengen Area, or leave a single date gap around midnight flights. We verify every line on your certificate against your flight itinerary before you attend biometrics.'}
            </p>

            <div className="mt-6 bg-slip border border-ink/70 p-5 rounded-[3px]">
              <div className="flex items-center gap-2 text-visa-green">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                <span className="mono-label text-visa-green">
                  {isUrdu ? 'یورپ کے لیے درخواست؟' : 'Filing for Europe?'}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-body leading-relaxed">
                {isUrdu
                  ? 'اپنی شینگن ٹریول انشورنس کو ہمارے سرکاری اپائنٹمنٹ اور دستاویزی ڈیسک کے ساتھ جوڑیں۔'
                  : 'Pair your Schengen travel insurance directly with our official-channel appointment and dossier preparation desk.'}
              </p>
              <Link
                to="/schengen-appointments"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-visa-green hover:underline underline-offset-4"
              >
                <span>{t.home.schengenCardCta}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COVERAGE_PILLARS.map((pillar) => (
              <div key={pillar.title} className="bg-slip border border-rule p-6 rounded-[3px]">
                <Check className="h-4 w-4 text-visa-green mb-3" aria-hidden="true" />
                <h3 className="font-display text-xl font-medium text-ink">{pillar.title}</h3>
                <p className="mt-2.5 text-sm text-ink-body leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No. 03: How Claims Work */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="max-w-2xl mb-8">
          <p className="mono-label text-ink-muted">
            {isUrdu ? 'نمبر 03 · کلیم کا طریقہ کار' : 'No. 03 · Claims Procedure'}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {isUrdu
              ? 'بیرونِ ملک ہنگامی صورتحال میں کلیم کیسے کام کرتا ہے'
              : 'How claims work if something goes wrong abroad'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INSURANCE_CLAIMS_STEPS.map((item) => (
            <div key={item.step} className="bg-slip border border-rule p-5 rounded-[3px]">
              <span className="font-latin-mono text-lg font-semibold text-visa-green tabular-nums">
                {item.step}
              </span>
              <h3 className="font-display text-xl font-medium text-ink mt-2">{item.title}</h3>
              <p className="mt-2.5 text-sm text-ink-body leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* No. 04: Insurance FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="mono-label text-ink-muted">
              {isUrdu ? 'نمبر 04 · اکثر پوچھے گئے سوالات' : 'No. 04 · Frequently Asked'}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {isUrdu
                ? 'پاکستان سے ٹریول انشورنس کے سوالات'
                : `Travel insurance questions from ${SITE_CONFIG.passportAudience}`}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={INSURANCE_FAQS} idPrefix="insurance-faq" />
          </div>
        </div>
      </section>

      {/* No. 05: Quote Form + Related Links */}
      <section id="apply" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-24">
        <LeadForm
          defaultDestination="Travel Insurance Quote"
          heading={
            isUrdu ? 'ٹریول انشورنس کوٹ کی درخواست کریں' : 'Request a travel insurance quote'
          }
          subcopy={
            isUrdu
              ? 'نوٹس میں تمام مسافروں کی عمریں، منزل کے ممالک اور متوقع دن لکھیں تاکہ ہم PKR میں لائسنس یافتہ پالیسی کی تصدیق کر سکیں۔'
              : 'Include the ages of all travellers, your exact destination countries, and approximate trip length in the notes box so we can confirm licensed policy options in PKR.'
          }
          submitLabel={t.pages.insuranceRequestBtn}
        />

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="mono-label text-ink-muted">
            {isUrdu ? 'مقبول ویزا جوڑیاں:' : 'Popular visa pairings:'}
          </span>
          <Link
            to="/schengen-appointments"
            className="text-ink hover:text-visa-green hover:underline underline-offset-4"
          >
            {t.footer.schengenAppointments}
          </Link>
          <Link
            to="/visas/usa"
            className="text-ink hover:text-visa-green hover:underline underline-offset-4"
          >
            {localizeCountry('USA')} {t.pages.countryVisaSuffix}
          </Link>
          <Link
            to="/visas/japan"
            className="text-ink hover:text-visa-green hover:underline underline-offset-4"
          >
            {localizeCountry('Japan')} {t.pages.countryVisaSuffix}
          </Link>
          <Link
            to="/visas/thailand"
            className="text-ink hover:text-visa-green hover:underline underline-offset-4"
          >
            {localizeCountry('Thailand')} {t.pages.countryVisaSuffix}
          </Link>
        </div>

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
