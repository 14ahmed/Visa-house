import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import {
  getLoadedDestination,
  hasDestinationSlug,
  loadDestination,
} from './data/loadDestination';
import type { DestinationData } from './data/types';

// Each page is split into its own independent JS chunk (never loaded upfront unless visited)
const loadHomePage = () => import('./pages/HomePage').then((m) => ({ default: m.HomePage }));
const loadVisasDirectoryPage = () =>
  import('./pages/VisasDirectoryPage').then((m) => ({ default: m.VisasDirectoryPage }));
const loadCountryPage = () =>
  import('./pages/CountryPage').then((m) => ({ default: m.CountryPage }));
const loadSchengenPage = () =>
  import('./pages/SchengenPage').then((m) => ({ default: m.SchengenPage }));
const loadInsurancePage = () =>
  import('./pages/InsurancePage').then((m) => ({ default: m.InsurancePage }));
const loadAboutPage = () => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }));
const loadContactPage = () =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }));
const loadPrivacyPage = () =>
  import('./pages/LegalPages').then((m) => ({ default: m.PrivacyPage }));
const loadTermsPage = () => import('./pages/LegalPages').then((m) => ({ default: m.TermsPage }));
const loadNotFoundPage = () =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }));

const HomePage = lazy(loadHomePage);
const VisasDirectoryPage = lazy(loadVisasDirectoryPage);
const CountryPage = lazy(loadCountryPage);
const SchengenPage = lazy(loadSchengenPage);
const InsurancePage = lazy(loadInsurancePage);
const AboutPage = lazy(loadAboutPage);
const ContactPage = lazy(loadContactPage);
const PrivacyPage = lazy(loadPrivacyPage);
const TermsPage = lazy(loadTermsPage);
const NotFoundPage = lazy(loadNotFoundPage);

/**
 * Preloads ONLY the single active route chunk (and, on /visas/:slug, ONLY that single country's
 * data chunk) prior to React hydration so prerendered HTML hydrates cleanly without loading other pages.
 */
export async function preloadRouteForPath(pathname: string): Promise<void> {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (clean === '/') {
    await loadHomePage();
    return;
  }
  if (clean === '/visas') {
    await loadVisasDirectoryPage();
    return;
  }
  if (clean.startsWith('/visas/')) {
    const slug = clean.slice('/visas/'.length);
    if (hasDestinationSlug(slug)) {
      await Promise.all([loadCountryPage(), loadDestination(slug)]);
    } else {
      await loadNotFoundPage();
    }
    return;
  }
  if (clean === '/schengen-appointments') {
    await loadSchengenPage();
    return;
  }
  if (clean === '/travel-insurance') {
    await loadInsurancePage();
    return;
  }
  if (clean === '/about') {
    await loadAboutPage();
    return;
  }
  if (clean === '/contact') {
    await loadContactPage();
    return;
  }
  if (clean === '/privacy') {
    await loadPrivacyPage();
    return;
  }
  if (clean === '/terms') {
    await loadTermsPage();
    return;
  }
  await loadNotFoundPage();
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function PageLoadingFallback() {
  return (
    <div className="min-h-screen paper-grain flex items-center justify-center px-4 text-sm font-mono text-ink-muted">
      Loading Visahouse guide…
    </div>
  );
}

function CountryRoute() {
  const { slug = '' } = useParams<{ slug: string }>();
  const validSlug = hasDestinationSlug(slug);
  const [destination, setDestination] = useState<DestinationData | null>(() =>
    validSlug ? (getLoadedDestination(slug) ?? null) : null,
  );

  useEffect(() => {
    if (!validSlug) {
      setDestination(null);
      return;
    }

    const cached = getLoadedDestination(slug);
    if (cached) {
      setDestination(cached);
      return;
    }

    let cancelled = false;
    setDestination(null);
    loadDestination(slug).then((loaded) => {
      if (!cancelled) {
        setDestination(loaded);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug, validSlug]);

  if (!validSlug) {
    return <NotFoundPage />;
  }

  if (!destination || destination.slug !== slug) {
    return <PageLoadingFallback />;
  }

  return <CountryPage destination={destination} />;
}

export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/visas" element={<VisasDirectoryPage />} />
          <Route path="/visas/:slug" element={<CountryRoute />} />
          <Route path="/schengen-appointments" element={<SchengenPage />} />
          <Route path="/travel-insurance" element={<InsurancePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
