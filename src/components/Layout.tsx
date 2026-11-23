import { useCallback, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';
import { buildWhatsAppUrl } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import { BrandLogo } from './BrandMark';
import { Header } from './Header';
import { LanguageSwitcher } from './LanguageSwitcher';
import { WhatsAppWidget } from './WhatsAppWidget';

interface LayoutProps {
  children: ReactNode;
  whatsappContext?: string;
  applyHref?: string;
}

export function Layout({
  children,
  whatsappContext = 'visa assistance',
  applyHref = '#apply',
}: LayoutProps) {
  const location = useLocation();
  const { t, localizeCountry } = useLanguage();
  const waHref = buildWhatsAppUrl(whatsappContext);
  const [waOpen, setWaOpen] = useState(false);
  const handleToggleWa = useCallback(() => setWaOpen((prev) => !prev), []);
  const handleCloseWa = useCallback(() => setWaOpen(false), []);
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col paper-grain text-ink pb-[60px] md:pb-0">
      <a
        href="#main-content"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-visa-green focus:text-slip focus:text-sm"
      >
        {t.common.skipToContent}
      </a>

      <Header />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Editorial Full-Sitemap Footer */}
      <footer className="mt-20 rule-double-top bg-paper-deep/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-rule">
            {/* Brand column */}
            <div className="lg:col-span-3 space-y-4">
              <Link
                to="/"
                aria-label={t.common.brandName}
                className="inline-flex items-center text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-visa-green rounded-[2px]"
              >
                <BrandLogo
                  className="h-20 sm:h-24"
                  alt={t.common.brandName}
                />
              </Link>
              <p className="font-display italic text-lg text-ink-body">{t.common.tagline}</p>
              <p className="text-sm text-ink-muted leading-relaxed max-w-sm">{t.footer.blurb}</p>
              <div className="pt-1">
                <LanguageSwitcher variant="full" />
              </div>
              <div className="pt-2 space-y-1 text-sm text-ink">
                <p>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-visa-green underline-offset-4 hover:underline"
                  >
                    {t.footer.whatsappLabel}:{' '}
                    <span className="font-latin-mono">{SITE_CONFIG.whatsappDisplay}</span>
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="hover:text-visa-green underline-offset-4 hover:underline"
                  >
                    {t.footer.emailLabel}:{' '}
                    <span className="font-latin-mono">{SITE_CONFIG.email}</span>
                  </a>
                </p>
                <p className="text-xs text-ink-muted pt-1">{t.common.officeHours}</p>
              </div>
            </div>

            {/* All Country Visa Guides */}
            <div className="lg:col-span-6">
              <p className="mono-label text-ink-muted mb-4">
                {formatLocalizedCopy(t.footer.countryVisaGuides, { count: DESTINATIONS.length })}
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1.5 text-[13px]">
                {DESTINATIONS.map((dest) => (
                  <li key={dest.slug}>
                    <Link
                      to={`/visas/${dest.slug}`}
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4 inline-flex items-baseline gap-1.5"
                    >
                      <span>{localizeCountry(dest.country)}</span>
                      <span className="font-latin-mono text-[10px] text-ink-muted">
                        {dest.isoCode}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services, Directory & Legal */}
            <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-6">
              <div>
                <p className="mono-label text-ink-muted mb-3">{t.footer.servicesAndDesk}</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="/"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.common.home}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/visas"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.allDestinationsDirectory}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/schengen-appointments"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.schengenAppointments}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/travel-insurance"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.travelInsurance}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#cost-calculator"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.visaCostCalculator}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#visa-alerts"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.visaNewsAlerts}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#faq"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.timelinesDocFaqs}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#testimonials"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.visaSuccessStories}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mono-label text-ink-muted mb-3">{t.footer.consultancyAndLegal}</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      to="/about"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.aboutVisahouse}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.contactIntakeDesk}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.privacyPolicy}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-ink-body hover:text-visa-green hover:underline underline-offset-4"
                    >
                      {t.footer.termsOfService}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mandatory Consultancy Disclaimer */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-ink-muted leading-relaxed">
            <p className="max-w-2xl font-medium text-ink-body">{t.common.disclaimer}</p>
            <div className="flex flex-col sm:items-end gap-1 shrink-0">
              <p className="font-latin-mono whitespace-nowrap">
                © {new Date().getFullYear()} {SITE_CONFIG.brandName} · {SITE_CONFIG.domain}
              </p>
              <p className="whitespace-nowrap">
                A project by{' '}
                <a
                  href="https://amgvisa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink hover:text-visa-green underline underline-offset-4 transition-colors"
                >
                  AMG
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick-Messages Widget */}
      <WhatsAppWidget
        whatsappContext={whatsappContext}
        open={waOpen}
        onToggle={handleToggleWa}
        onClose={handleCloseWa}
      />

      {/* Compact Mobile Bottom Action Bar (<= 15% aggregate sticky height with top header) */}
      <div className="no-print md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-paper/95 backdrop-blur-xs border-t border-ink/80 px-3 flex items-center gap-2">
        <Link
          to="/"
          aria-label={t.common.home}
          aria-current={isHome ? 'page' : undefined}
          className={`inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-[2px] border transition-colors ${
            isHome
              ? 'border-visa-green bg-visa-green/10 text-visa-green'
              : 'border-ink/40 bg-slip text-ink hover:text-visa-green'
          }`}
        >
          <Home className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href={applyHref}
          className="flex-1 inline-flex items-center justify-center min-h-[44px] bg-visa-green text-slip text-sm font-medium rounded-[2px] whitespace-nowrap"
        >
          {t.common.applyNow}
        </a>
        <button
          type="button"
          data-whatsapp-trigger="true"
          aria-expanded={waOpen}
          aria-controls="whatsapp-quick-messages"
          onClick={handleToggleWa}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] border rounded-[2px] text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
            waOpen
              ? 'border-visa-green bg-visa-green text-slip'
              : 'border-ink/80 bg-slip text-ink'
          }`}
        >
          <MessageCircle
            className={`h-4 w-4 shrink-0 ${waOpen ? 'text-slip' : 'text-visa-green'}`}
            aria-hidden="true"
          />
          <span>{t.common.whatsapp}</span>
        </button>
      </div>
    </div>
  );
}
