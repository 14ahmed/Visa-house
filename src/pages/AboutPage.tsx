import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EDITORIAL_IMAGES, SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { buildWebPageSchema, ORG_ID, type BreadcrumbItem } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ClientTestimonial } from '../components/ClientTestimonial';
import { Layout } from '../components/Layout';
import { RubberStamp } from '../components/RubberStamp';
import { SeoHead } from '../components/SeoHead';

export function AboutPage() {
  const { t, isUrdu } = useLanguage();
  const path = '/about';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path },
  ];

  return (
    <Layout whatsappContext="Visahouse consultancy services" applyHref="/contact#apply">
      <SeoHead
        title="About Visahouse — Online Visa Consultancy | Pakistan"
        description="Learn how Visahouse prepares honest, audit-clean visa dossiers, Schengen guidance, and travel insurance for Pakistani passport holders."
        path={path}
        breadcrumbs={breadcrumbs}
        schemas={[
          buildWebPageSchema({
            type: 'AboutPage',
            name: 'About Visahouse — Online Visa Consultancy | Pakistan',
            description:
              'Learn how Visahouse prepares honest, audit-clean visa dossiers, Schengen guidance, and travel insurance for Pakistani passport holders.',
            path,
            mainEntityId: ORG_ID,
            hasBreadcrumb: true,
          }),
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 border-b border-ink/80">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="mono-label text-ink-muted">{t.pages.aboutEyebrow}</p>
            <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight leading-[1.08] text-ink mt-2">
              {t.common.tagline}{' '}
              <span className="highlighter-mark">{t.pages.aboutHighlight}</span>
            </h1>
            <p className="mt-5 text-lg text-ink-body leading-relaxed max-w-2xl">
              {t.footer.blurb}
            </p>
            <div className="mt-7">
              <RubberStamp
                label={isUrdu ? 'آن لائن فرسٹ ڈیسک' : 'ONLINE-FIRST DESK'}
                sublabel={isUrdu ? 'ویزاہاؤس · پاکستان' : 'VISAHOUSE · PAK'}
                color="#0F5C4B"
                rotation={-3}
                variant="rect"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure>
              <div className="duotone-frame border border-ink/60 rounded-[2px]">
                <img
                  src={EDITORIAL_IMAGES.desk.src}
                  alt={EDITORIAL_IMAGES.desk.alt}
                  width={EDITORIAL_IMAGES.desk.width}
                  height={EDITORIAL_IMAGES.desk.height}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <figcaption className="mt-2 mono-label text-[11px] text-ink-muted">
                {t.home.no05Caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <p className="mono-label text-ink-muted">{t.pages.aboutPrinciplesEyebrow}</p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2 mb-10">
          {t.pages.aboutPrinciplesHeading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.home.processPromises.map((p, idx) => (
            <article key={p.index} className="bg-slip border border-rule p-6 sm:p-7 rounded-[3px]">
              <span className="font-latin-mono text-sm font-semibold text-visa-green tabular-nums">
                0{idx + 1}
              </span>
              <h3 className="font-display text-2xl font-medium text-ink mt-2">{p.title}</h3>
              <p className="mt-3 text-[15px] text-ink-body leading-relaxed">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <ClientTestimonial
        eyebrow={isUrdu ? 'نمبر 02 · ویزا کامیابی کی کہانیاں' : 'No. 02 · Visa Success Stories'}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-rule">
        <p className="mono-label text-ink-muted">
          {isUrdu ? 'دائرہ کار، شفاف شناخت اور ادائیگی کے اصول' : 'No. 03 · Scope of Practice & Governance'}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2 mb-8">
          {isUrdu
            ? 'ہماری خدمات کی قانونی حدود اور ادائیگی تحفظ'
            : 'Consultancy Scope, Operator Disclosure & Payment Safety'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-slip border border-rule rounded-[3px] p-6 space-y-2">
            <p className="mono-label text-visa-green">
              {isUrdu ? 'ڈیسک شناخت' : 'Operator & Network'}
            </p>
            <h3 className="font-display text-xl font-medium text-ink">
              {SITE_CONFIG.brandName} · {SITE_CONFIG.domain}
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">
              {SITE_CONFIG.legal.operatorDisclosure}. {SITE_CONFIG.legal.serviceCities}.
            </p>
          </article>

          <article className="bg-slip border border-rule rounded-[3px] p-6 space-y-2">
            <p className="mono-label text-visa-green">
              {isUrdu ? 'خدمات کی حدود' : 'Scope of Practice'}
            </p>
            <h3 className="font-display text-xl font-medium text-ink">
              {isUrdu ? 'صرف ایڈمنسٹریٹو فائل تیاری' : 'Administrative Visitor & Business Filing'}
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">
              {isUrdu
                ? 'ویزاہاؤس صرف سیاحتی، فیملی اور بزنس ویزا دستاویزات کی جانچ اور فارم تیاری فراہم کرتا ہے۔ ہم کینیڈا (CICC)، آسٹریلیا (MARA)، برطانیہ (IAA/OISC) یا امریکی امیگریشن اٹارنی جیسی قانونی نمائندگی فراہم نہیں کرتے۔'
                : 'We provide visitor, business, and tourist dossier audits, form preparation, and official-portal scheduling guidance—not regulated legal representation for asylum, appeals, or permanent residency under CICC (Canada), MARA (Australia), IAA/OISC (UK), or U.S. immigration law.'}
            </p>
          </article>

          <article className="bg-slip border border-rule rounded-[3px] p-6 space-y-2">
            <p className="mono-label text-stamp-red">
              {isUrdu ? 'ادائیگی اور دستاویز تحفظ' : 'Official Payment & Retention'}
            </p>
            <h3 className="font-display text-xl font-medium text-ink">
              {isUrdu ? 'صرف آفیشل اکاؤنٹ میں ادائیگی' : 'Verified Invoice Accounts Only'}
            </h3>
            <p className="text-sm text-ink-body leading-relaxed">
              {SITE_CONFIG.legal.paymentSafetyNotice}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <Link to="/terms" className="text-visa-green hover:underline underline-offset-4">
                {isUrdu ? 'شرائطِ خدمت اور ریفنڈ پالیسی →' : 'Terms & Refund Policy →'}
              </Link>
              <Link to="/privacy" className="text-visa-green hover:underline underline-offset-4">
                {isUrdu ? 'پرائیویسی پالیسی →' : 'Privacy & Purge Policy →'}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-slip border border-ink/70 p-6 sm:p-8 rounded-[3px] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mono-label text-ink-muted">
              {isUrdu ? 'اگلا قدم؟' : 'Where Next?'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5">
              {isUrdu
                ? 'کسی ملک کی گائیڈ دیکھیں یا براہِ راست ہمارے ڈیسک سے رابطہ کریں'
                : 'Inspect a country guide or talk directly with our desk'}
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] text-ink-body">
              {t.common.disclaimer}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/visas"
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark whitespace-nowrap"
            >
              <span>{t.hero.ctaSecondary}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 border border-ink/80 text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep whitespace-nowrap"
            >
              {t.header.contactDesk}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
