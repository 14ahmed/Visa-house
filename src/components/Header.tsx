import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Home, Menu, X } from 'lucide-react';
import { DESTINATION_SUMMARIES as DESTINATIONS, REGIONS } from '../data/destinationIndex';
import { useLanguage } from '../context/LanguageContext';
import { formatLocalizedCopy } from '../utils/i18n';
import { BrandLogo } from './BrandMark';
import { LanguageSwitcher } from './LanguageSwitcher';

export interface HeaderProps {
  contactHref?: string;
}

export function Header({ contactHref = '/contact' }: HeaderProps) {
  const location = useLocation();
  const { t, isUrdu, localizeCountry, localizeRegion } = useLanguage();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMegaOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mega menu on outside click or Escape key
  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [megaOpen]);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-xs border-b border-ink/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Site Logo */}
        <Link
          to="/"
          aria-label={t.common.brandName}
          className="inline-flex items-center gap-2.5 text-ink whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-visa-green rounded-[2px]"
        >
          <BrandLogo
            className="h-11 sm:h-12 md:h-[54px] shrink-0"
            alt={t.common.brandName}
          />
          {isUrdu && (
            <span className="hidden sm:inline border-s border-rule ps-2.5 font-display text-lg font-semibold text-ink">
              {t.common.brandName}
            </span>
          )}
        </Link>

        {/* Zone 2: Primary Navigation with Visas Mega-Menu */}
        <nav
          aria-label={t.header.primaryNavLabel}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-body"
        >
          <Link
            to="/"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            className={`inline-flex items-center gap-1.5 py-2 hover:text-ink hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
              location.pathname === '/' ? 'text-visa-green font-semibold underline' : 'text-ink-body'
            }`}
          >
            <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{t.common.home}</span>
          </Link>

          <div ref={megaRef} className="relative">
            <button
              type="button"
              aria-expanded={megaOpen}
              aria-controls="visas-mega-menu"
              onClick={() => setMegaOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1 py-2 hover:text-ink hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                megaOpen ? 'text-ink underline' : 'text-ink-body'
              }`}
            >
              <span>{t.common.visas}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 motion-reduce:transition-none ${
                  megaOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {megaOpen && (
              <div
                id="visas-mega-menu"
                className="absolute start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 top-full mt-2 w-[900px] max-w-[94vw] max-h-[78vh] overflow-y-auto bg-slip border border-ink/80 rounded-[3px] p-6 z-50"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-rule">
                  <span className="mono-label text-ink-muted">{t.header.megaEyebrow}</span>
                  <Link
                    to="/visas"
                    className={`text-xs text-visa-green hover:underline underline-offset-4 whitespace-nowrap ${
                      isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.12em]'
                    }`}
                  >
                    {formatLocalizedCopy(t.header.viewAllCountries, { count: DESTINATIONS.length })}{' '}
                    {isUrdu ? '←' : '→'}
                  </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
                  {REGIONS.map((region) => {
                    const items = DESTINATIONS.filter((d) => d.region === region);
                    const isWideRegion = items.length > 8;
                    return (
                      <div key={region} className={isWideRegion ? 'col-span-2' : ''}>
                        <p className="mono-label text-ink-muted mb-2">{localizeRegion(region)}</p>
                        <ul
                          className={
                            isWideRegion
                              ? 'grid grid-cols-2 gap-x-5 gap-y-1'
                              : 'space-y-1'
                          }
                        >
                          {items.map((dest) => (
                            <li key={dest.slug}>
                              <Link
                                to={`/visas/${dest.slug}`}
                                className="flex items-baseline justify-between gap-2 py-0.5 text-[13px] text-ink hover:text-visa-green hover:underline underline-offset-4"
                              >
                                <span className="truncate">{localizeCountry(dest.country)}</span>
                                <span
                                  className="font-latin-mono text-[10px] tracking-[0.08em] shrink-0"
                                  style={{ color: dest.accentHex }}
                                >
                                  {dest.isoCode}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}

                  <div className="border-t border-rule pt-3 col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-5 text-sm">
                      <Link
                        to="/schengen-appointments"
                        className="font-medium text-ink hover:text-visa-green hover:underline underline-offset-4"
                      >
                        {t.header.schengenAppointments}
                      </Link>
                      <Link
                        to="/travel-insurance"
                        className="font-medium text-ink hover:text-visa-green hover:underline underline-offset-4"
                      >
                        {t.header.travelInsurance}
                      </Link>
                      <Link
                        to="/visas#checklist-library"
                        className="font-medium text-visa-green hover:underline underline-offset-4"
                      >
                        {t.header.dynamicChecklistLibrary} {isUrdu ? '←' : '→'}
                      </Link>
                      <Link
                        to="/visas#fee-estimator"
                        className="font-medium text-visa-green hover:underline underline-offset-4"
                      >
                        {t.header.visaFeeEstimator} {isUrdu ? '←' : '→'}
                      </Link>
                    </div>
                    <span className={isUrdu ? 'text-xs text-ink-muted' : 'font-mono text-[11px] text-ink-muted'}>
                      {t.header.onlineFirstPakistan}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/schengen-appointments"
            className="py-2 hover:text-ink hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.common.schengen}
          </Link>
          <Link
            to="/travel-insurance"
            className="py-2 hover:text-ink hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.common.insurance}
          </Link>
          <Link
            to="/about"
            className="py-2 hover:text-ink hover:underline decoration-1 underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.common.about}
          </Link>
        </nav>

        {/* Zone 3: Language Switcher + Contact Button (+ Mobile Drawer Toggle) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <LanguageSwitcher variant="compact" />
          <Link
            to={contactHref}
            className="hidden md:inline-flex items-center justify-center min-h-[40px] px-4 py-2 bg-visa-green text-slip text-sm font-medium rounded-[2px] border border-ink/20 hover:bg-visa-green-dark transition-colors whitespace-nowrap shrink-0"
          >
            {t.common.contact}
          </Link>
          <button
            type="button"
            aria-label={mobileMenuOpen ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 border border-ink/40 rounded-[2px] text-ink hover:bg-paper-deep cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-slip border-t border-ink/60 max-h-[75vh] overflow-y-auto"
        >
          <nav aria-label={t.header.mobileNavLabel} className="px-4 py-5 space-y-5">
            <div className="flex flex-col divide-y divide-rule border-y border-rule">
              <Link
                to="/"
                aria-current={location.pathname === '/' ? 'page' : undefined}
                className={`py-3 font-display text-lg inline-flex items-center gap-2 ${
                  location.pathname === '/' ? 'text-visa-green font-semibold' : 'text-ink'
                }`}
              >
                <Home className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{t.common.home}</span>
              </Link>
              <Link to="/visas" className="py-3 font-display text-lg text-ink">
                {formatLocalizedCopy(t.header.allDestinations, { count: DESTINATIONS.length })}
              </Link>
              <Link to="/schengen-appointments" className="py-3 font-display text-lg text-ink">
                {t.footer.schengenAppointments}
              </Link>
              <Link to="/travel-insurance" className="py-3 font-display text-lg text-ink">
                {t.footer.travelInsurance}
              </Link>
              <Link to="/about" className="py-3 font-display text-lg text-ink">
                {t.header.aboutVisahouse}
              </Link>
              <Link to={contactHref} className="py-3 font-display text-lg text-visa-green font-medium">
                {t.header.contactDesk}
              </Link>
            </div>

            <div>
              <p className="mono-label text-ink-muted mb-3">{t.header.quickCountryLinks}</p>
              <div className="grid grid-cols-2 gap-2">
                {DESTINATIONS.map((dest) => (
                  <Link
                    key={dest.slug}
                    to={`/visas/${dest.slug}`}
                    className="flex items-center justify-between px-3 py-2.5 min-h-[44px] border border-rule bg-paper text-sm text-ink rounded-[2px]"
                  >
                    <span className="truncate">{localizeCountry(dest.country)}</span>
                    <span className="font-latin-mono text-[11px] text-ink-muted shrink-0">
                      {dest.isoCode}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
