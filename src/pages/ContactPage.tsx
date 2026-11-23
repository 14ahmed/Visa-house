import { Link } from 'react-router-dom';
import { Clock, Mail, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/formatters';
import type { BreadcrumbItem } from '../utils/seo';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Layout } from '../components/Layout';
import { LeadForm } from '../components/LeadForm';
import { SeoHead } from '../components/SeoHead';
import { VisaStatusTracker } from '../components/VisaStatusTracker';

export function ContactPage() {
  const { t, isUrdu, localizeCountry } = useLanguage();
  const path = '/contact';
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path },
  ];
  const waHref = buildWhatsAppUrl('a new visa inquiry');

  return (
    <Layout whatsappContext="visa consultation" applyHref="#apply">
      <SeoHead
        title="Contact Visahouse — WhatsApp & Online Visa Desk | Pakistan"
        description="Reach the Visahouse online visa desk on WhatsApp or via our inquiry form for live fee confirmation and document checklists in Pakistan."
        path={path}
        breadcrumbs={breadcrumbs}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div>
              <p className="mono-label text-ink-muted">{t.pages.contactEyebrow}</p>
              <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mt-2">
                {t.pages.contactHeadingPrefix}{' '}
                <span className="highlighter-mark">{t.common.brandName}</span>
              </h1>
              <p className="mt-4 text-[15px] text-ink-body leading-relaxed">
                {isUrdu
                  ? 'اپنی منزل، پاسپورٹ شہریت اور متوقع سفری مہینہ شیئر کریں۔ ہم پورے پاکستان میں مکمل آن لائن سروس فراہم کرتے ہیں اور دفتری اوقات میں جواب دیتے ہیں۔'
                  : 'Send your destination, passport nationality, and intended travel month. We handle enquiries completely online across Pakistan and reply during working hours.'}
              </p>
            </div>

            <div className="bg-slip border border-rule rounded-[3px] p-6 space-y-5">
              <div>
                <div className="flex items-center gap-2 mono-label text-visa-green">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>{t.common.whatsappDesk}</span>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block font-latin-mono text-base font-medium text-ink hover:text-visa-green hover:underline underline-offset-4"
                >
                  {SITE_CONFIG.whatsappDisplay}
                </a>
                <p className="mt-1 text-xs text-ink-muted">
                  {isUrdu
                    ? 'چیک لسٹ اور تازہ فیس کی تصدیق کا تیز ترین ذریعہ۔'
                    : 'Fastest channel for checklist and fee confirmation.'}
                </p>
              </div>

              <div className="pt-4 border-t border-rule">
                <div className="flex items-center gap-2 mono-label text-ink-muted">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{t.pages.contactEmailDesk}</span>
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="mt-1.5 inline-block font-latin-mono text-base font-medium text-ink hover:text-visa-green hover:underline underline-offset-4"
                >
                  {SITE_CONFIG.email}
                </a>
                <p className="mt-1 text-xs text-ink-muted">
                  {isUrdu
                    ? 'کارپوریٹ وفود، پی ڈی ایف دستاویزات اور باضابطہ کوٹس کے لیے موزوں۔'
                    : 'Ideal for corporate delegations, PDF document sets, and formal quotes.'}
                </p>
              </div>

              <div className="pt-4 border-t border-rule">
                <div className="flex items-center gap-2 mono-label text-ink-muted">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{t.pages.contactDeskHours}</span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-ink">{t.common.officeHours}</p>
                <p className="mt-1 text-xs text-ink-muted">{t.common.responseExpectation}</p>
              </div>
            </div>

            <div className="text-sm space-y-2 pt-2">
              <p className="mono-label text-ink-muted">{t.pages.contactQuickLinks}</p>
              <ul className="space-y-1.5">
                <li>
                  <Link
                    to="/visas/thailand"
                    className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                  >
                    {localizeCountry('Thailand')} {t.pages.countryVisaSuffix}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/schengen-appointments"
                    className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                  >
                    {t.footer.schengenAppointments}
                  </Link>
                </li>
                <li>
                  <a
                    href="#track-status"
                    className="text-visa-green font-medium hover:underline underline-offset-4"
                  >
                    {t.home.no11TrackLink}
                  </a>
                </li>
                <li>
                  <Link
                    to="/travel-insurance"
                    className="text-ink hover:text-visa-green hover:underline underline-offset-4"
                  >
                    {t.footer.travelInsurance}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div id="apply" className="lg:col-span-8 scroll-mt-24">
            <LeadForm defaultDestination="Thailand Visa" />
            <p className="mt-6 text-xs text-ink-muted leading-relaxed">{t.common.disclaimer}</p>
          </div>
        </div>

        <div className="mt-14 pt-14 border-t border-rule">
          <VisaStatusTracker />
        </div>
      </section>
    </Layout>
  );
}
