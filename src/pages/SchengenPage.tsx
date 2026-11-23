import { Link } from 'react-router-dom';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { EDITORIAL_IMAGES, SITE_CONFIG } from '../config/site';
import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';
import {
  SCHENGEN_COUNTRIES,
  SCHENGEN_DOCUMENTS,
  SCHENGEN_FAQS,
  SCHENGEN_STEPS,
} from '../data/services';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/formatters';
import { buildFaqSchema, buildServiceSchema, type BreadcrumbItem } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FaqAccordion } from '../components/FaqAccordion';
import { Layout } from '../components/Layout';
import { LeadForm } from '../components/LeadForm';
import { RubberStamp } from '../components/RubberStamp';
import { SchengenSlotAvailability } from '../components/SchengenSlotAvailability';
import { SeoHead } from '../components/SeoHead';
import { TravelInsuranceWidget } from '../components/TravelInsuranceWidget';
import { VisaNewsAlerts } from '../components/VisaNewsAlerts';

export function SchengenPage() {
  const { t, isUrdu, localizeCountry } = useLanguage();
  const path = '/schengen-appointments';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Schengen Appointments', path },
  ];
  const waHref = buildWhatsAppUrl(
    `Schengen visa appointment & dossier filing from ${SITE_CONFIG.passportAudience}`,
  );

  return (
    <Layout whatsappContext="Schengen visa appointments" applyHref="#apply">
      <SeoHead
        title="Schengen Visa Appointments from Pakistan | Visahouse"
        description="Book Schengen appointments through official visa-centre channels from Pakistan with Main-Destination checks, dossier audit, and travel insurance."
        path={path}
        breadcrumbs={breadcrumbs}
        schemas={[
          buildServiceSchema({
            name: `Schengen Visa Appointments & Dossier Guidance from ${SITE_CONFIG.passportAudience}`,
            description:
              'Official-channel Schengen visa appointment preparation and complete dossier assembly for Pakistani applicants.',
            path,
            serviceType: 'Schengen Visa Consultancy',
          }),
          buildFaqSchema(SCHENGEN_FAQS),
        ]}
      />

      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 border-b border-ink/80">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mono-label text-ink-muted mb-4">
              <span className="font-latin-mono text-visa-green">SCH</span>
              <span aria-hidden="true">·</span>
              <span>{t.home.schengenCardEyebrow}</span>
              <span aria-hidden="true">·</span>
              <span>{t.home.schengenCardCities}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-medium tracking-tight leading-[1.06] text-ink">
              {t.pages.schengenHeroTitlePrefix}{' '}
              <span className="highlighter-mark">{t.pages.schengenHeroHighlight}</span>
            </h1>

            <p className="mt-5 text-lg text-ink-body leading-relaxed max-w-2xl">
              {t.home.schengenCardBody}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#apply"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
              >
                {t.pages.schengenRequestBtn}
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

          <div className="lg:col-span-5 space-y-5">
            <figure>
              <div className="duotone-frame border border-ink/60 rounded-[2px]">
                <img
                  src={EDITORIAL_IMAGES.airport.src}
                  alt={EDITORIAL_IMAGES.airport.alt}
                  width={EDITORIAL_IMAGES.airport.width}
                  height={EDITORIAL_IMAGES.airport.height}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover"
                />
              </div>
              <figcaption className="mt-2 mono-label text-[11px] text-ink-muted">
                {isUrdu
                  ? 'تصویر 02 — صرف مجاز ویزا سینٹر اور سرکاری قونصلر چینلز'
                  : 'Fig. 02 — Official visa-centre & consular filing channel only'}
              </figcaption>
            </figure>

            <div className="bg-slip border border-rule p-5 rounded-[3px] flex items-center justify-between gap-4">
              <div>
                <p className="mono-label text-stamp-red">
                  {isUrdu ? 'شفاف پالیسی' : 'Transparent Policy'}
                </p>
                <p className="mt-1 text-sm text-ink-body leading-relaxed">
                  {isUrdu
                    ? 'ہم کبھی بلیک مارکیٹ سلاٹس فروخت نہیں کرتے اور نہ ہی یقینی تاریخوں کا جھوٹا وعدہ کرتے ہیں۔ تمام بکنگ درخواست گزار کے اپنے نام پر سرکاری پورٹل سے کی جاتی ہیں۔'
                    : "We never sell black-market slots or promise guaranteed dates. All bookings are placed strictly through authorised official portals in the applicant's own name."}
                </p>
              </div>
              <div className="hidden sm:block shrink-0">
                <RubberStamp
                  label={isUrdu ? 'سرکاری پورٹل' : 'OFFICIAL PORTAL'}
                  sublabel={isUrdu ? 'شینگن · پاکستان' : 'SCH · PAKISTAN'}
                  color="#0F5C4B"
                  rotation={-4}
                  variant="rect"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Simulated Schengen Slot Availability Indicator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-rule">
        <SchengenSlotAvailability
          id="schengen-slots"
          headingAs="h2"
          inquiryHref="#apply"
        />
      </section>

      {/* No. 01: Countries We Cover */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="max-w-2xl mb-10">
          <p className="mono-label text-ink-muted">
            {isUrdu ? 'نمبر 01 · شینگن مشنز' : 'No. 01 · Covered Missions'}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {isUrdu
              ? 'پاکستان سے ہم جن شینگن ممالک کی فائلنگ تیار کرتے ہیں'
              : `Schengen countries we prepare from ${SITE_CONFIG.passportAudience}`}
          </h2>
          <p className="mt-3 text-[15px] text-ink-body leading-relaxed">
            {isUrdu
              ? 'مجاز ویزا سینٹرز (مثلاً VFS Global / Gerry’s یا BLS International) اور صوبائی دائرہ اختیار وقتاً فوقتاً بدلتے رہتے ہیں — ہم فائل کھولنے سے پہلے فعال چینل کی تصدیق کرتے ہیں۔'
              : "Authorised contractors (such as VFS Global / Gerry's or BLS International) and provincial embassy jurisdictions update periodically—we verify the active channel for your chosen country before opening your file."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCHENGEN_COUNTRIES.map((country) => {
            const matchedDest = DESTINATIONS.find((d) => d.isoCode === country.iso);
            return (
              <article
                key={country.iso}
                className="bg-slip border border-rule rounded-[3px] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2 pb-2.5 border-b border-rule">
                    <h3 className="font-display text-xl font-medium text-ink">
                      {matchedDest ? (
                        <Link
                          to={`/visas/${matchedDest.slug}`}
                          className="hover:text-visa-green hover:underline underline-offset-4"
                        >
                          {localizeCountry(country.name)}
                        </Link>
                      ) : (
                        localizeCountry(country.name)
                      )}
                    </h3>
                    <span className="font-latin-mono text-xs font-semibold text-visa-green">
                      {country.iso}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-body leading-relaxed">{country.note}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-rule/80 text-xs text-ink-muted space-y-2">
                  <div className="space-y-1">
                    <p className="font-latin-mono">{country.citiesInPakistan}</p>
                    <p>{country.centre}</p>
                  </div>
                  {matchedDest && (
                    <Link
                      to={`/visas/${matchedDest.slug}`}
                      className="inline-flex items-center gap-1 text-visa-green font-medium hover:underline underline-offset-4"
                    >
                      <span>
                        {isUrdu
                          ? `${localizeCountry(country.name)} ویزا گائیڈ دیکھیں`
                          : `Open ${country.name} Visa Guide`}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* No. 02: Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="max-w-2xl">
          <p className="mono-label text-ink-muted">
            {isUrdu ? 'نمبر 02 · مرحلہ وار طریقہ کار' : 'No. 02 · Step-by-Step Workflow'}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {isUrdu
              ? 'ہم آپ کی شینگن اپائنٹمنٹ اور فائلنگ میں کیسے رہنمائی کرتے ہیں'
              : 'How we guide your Schengen booking & submission'}
          </h2>
        </div>

        <div className="mt-10 border-t border-ink/70 divide-y divide-rule">
          {SCHENGEN_STEPS.map((step) => (
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

      {/* No. 03: Core Document Dossier + Insurance Cross-Link */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="mono-label text-ink-muted">
              {isUrdu ? 'نمبر 03 · بنیادی دستاویزات' : 'No. 03 · Core Paperwork'}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {isUrdu
                ? 'معیاری شینگن ٹائپ-سی (Type-C) دستاویزی فائل'
                : 'Standard Schengen Type-C document dossier'}
            </h2>
            <p className="mt-3 text-[15px] text-ink-body leading-relaxed">
              {isUrdu
                ? 'ہر سفارتخانے کی چند مقامی شرائط ہو سکتی ہیں، لیکن یہ دس بنیادی دستاویزات پاکستان سے مضبوط مختصر مدتی سیاحتی یا کاروباری درخواست کی بنیاد ہیں۔'
                : `Every mission adds minor local nuances, but these ten foundational records form the backbone of a strong short-stay tourist or business submission from ${SITE_CONFIG.passportAudience}.`}
            </p>

            <ul className="mt-6 bg-slip border border-rule rounded-[3px] p-6 divide-y divide-rule/70">
              {SCHENGEN_DOCUMENTS.map((doc) => (
                <li
                  key={doc}
                  className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 text-sm sm:text-[15px] text-ink-body"
                >
                  <Check className="h-4 w-4 text-visa-green mt-1 shrink-0" aria-hidden="true" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <TravelInsuranceWidget
              variant="card"
              eyebrow={isUrdu ? 'لازمی شرط' : 'Mandatory Requirement'}
              heading={
                isUrdu
                  ? 'شینگن €30,000 ٹریول میڈیکل انشورنس'
                  : 'Schengen €30,000 Travel Medical Insurance'
              }
              explainer={
                isUrdu
                  ? 'کوئی بھی شینگن ویزا سینٹر تمام شینگن ممالک میں پورے قیام کے لیے درست میڈیکل اور وطن واپسی کوریج کے بغیر درخواست قبول نہیں کرتا۔'
                  : 'No Schengen visa centre will accept an application without compliant medical and repatriation cover valid across all Schengen states for your full stay. Start an insurance inquiry to pair embassy-ready wording with your appointment.'
              }
              ctaLabel={t.pages.insuranceRequestBtn}
              inquiryHref="/travel-insurance#apply"
            />

            <div className="bg-paper-deep/65 border border-rule rounded-[3px] p-6">
              <p className="mono-label text-ink-muted">
                {isUrdu ? 'دیگر ممالک بھی دیکھنا چاہتے ہیں؟' : 'Also Exploring Other Regions?'}
              </p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <Link
                    to="/visas/usa"
                    className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                  >
                    {localizeCountry('USA')} {t.pages.countryVisaSuffix}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/visas/japan"
                    className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                  >
                    {localizeCountry('Japan')} {t.pages.countryVisaSuffix}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/visas/south-korea"
                    className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                  >
                    {localizeCountry('South Korea')} {t.pages.countryVisaSuffix}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/visas/thailand"
                    className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                  >
                    {localizeCountry('Thailand')} {t.pages.countryVisaSuffix}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* No. 04: Schengen Policy & Appointment Alerts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <VisaNewsAlerts
          sectionNumber={isUrdu ? 'نمبر 04 · شینگن پالیسی الرٹس' : 'No. 04 · Schengen Policy Alerts'}
          defaultTopics={['schengen']}
          sourcePath="/schengen-appointments"
        />
      </div>

      {/* No. 05: Schengen FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="mono-label text-ink-muted">
              {isUrdu ? 'نمبر 05 · اکثر پوچھے گئے سوالات' : 'No. 05 · Frequently Asked'}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
              {isUrdu
                ? 'شینگن فائلنگ اور اپائنٹمنٹ کے سوالات'
                : 'Schengen filing & appointment questions'}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={SCHENGEN_FAQS} idPrefix="schengen-faq" />
          </div>
        </div>
      </section>

      {/* No. 06: Appointment Request Form */}
      <section id="apply" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-24">
        <LeadForm
          defaultDestination="Schengen Visa Appointment & Filing"
          heading={
            isUrdu
              ? 'شینگن اپائنٹمنٹ اور دستاویزی رہنمائی کی درخواست کریں'
              : 'Request Schengen appointment & dossier support'
          }
          subcopy={
            isUrdu
              ? 'اپنے مطلوبہ شینگن ملک، ترجیحی شہر (اسلام آباد، لاہور یا کراچی) اور متوقع سفری مہینے کا ذکر کریں۔'
              : 'Mention your target Schengen country (or countries), your preferred submission city (Islamabad, Lahore, or Karachi), and your target travel month.'
          }
          submitLabel={isUrdu ? 'شینگن انکوائری جمع کروائیں' : 'Submit Schengen Inquiry'}
        />
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
