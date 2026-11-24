import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import {
  getLoadedDestination,
  hasDestinationSlug,
  loadDestination,
} from './data/loadDestination';
import type { DestinationData } from './data/types';

function createPreloadablePage(loader: () => Promise<ComponentType>) {
  let Resolved: ComponentType | null = null;
  const LazyComp = lazy(async () => ({ default: await loader() }));

  async function preload(): Promise<void> {
    if (Resolved) return;
    Resolved = await loader();
  }

  function Component() {
    if (Resolved) {
      return <Resolved />;
    }
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <LazyComp />
      </Suspense>
    );
  }

  return { Component, preload };
}

type CountryPageComponent = ComponentType<{ destination: DestinationData }>;
let ResolvedCountryPage: CountryPageComponent | null = null;
const loadCountryPageModule = async (): Promise<CountryPageComponent> =>
  (await import('./pages/CountryPage')).CountryPage;
const LazyCountryPage = lazy(async () => ({ default: await loadCountryPageModule() }));

const CountryPageEntry = {
  preload: async (): Promise<void> => {
    if (ResolvedCountryPage) return;
    ResolvedCountryPage = await loadCountryPageModule();
  },
  Component: function CountryPage(props: { destination: DestinationData }) {
    if (ResolvedCountryPage) {
      return <ResolvedCountryPage {...props} />;
    }
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <LazyCountryPage {...props} />
      </Suspense>
    );
  },
};

// Each page is split into its own independent JS chunk (never loaded upfront unless visited)
const HomePageEntry = createPreloadablePage(async () => (await import('./pages/HomePage')).HomePage);
const VisasDirectoryPageEntry = createPreloadablePage(
  async () => (await import('./pages/VisasDirectoryPage')).VisasDirectoryPage,
);
const SchengenPageEntry = createPreloadablePage(
  async () => (await import('./pages/SchengenPage')).SchengenPage,
);
const InsurancePageEntry = createPreloadablePage(
  async () => (await import('./pages/InsurancePage')).InsurancePage,
);
const AboutPageEntry = createPreloadablePage(async () => (await import('./pages/AboutPage')).AboutPage);
const ContactPageEntry = createPreloadablePage(
  async () => (await import('./pages/ContactPage')).ContactPage,
);
const PrivacyPageEntry = createPreloadablePage(
  async () => (await import('./pages/LegalPages')).PrivacyPage,
);
const TermsPageEntry = createPreloadablePage(
  async () => (await import('./pages/LegalPages')).TermsPage,
);
const NotFoundPageEntry = createPreloadablePage(
  async () => (await import('./pages/NotFoundPage')).NotFoundPage,
);

const HomePage = HomePageEntry.Component;
const VisasDirectoryPage = VisasDirectoryPageEntry.Component;
const CountryPage = CountryPageEntry.Component;
const SchengenPage = SchengenPageEntry.Component;
const InsurancePage = InsurancePageEntry.Component;
const AboutPage = AboutPageEntry.Component;
const ContactPage = ContactPageEntry.Component;
const PrivacyPage = PrivacyPageEntry.Component;
const TermsPage = TermsPageEntry.Component;
const NotFoundPage = NotFoundPageEntry.Component;

/**
 * Preloads ONLY the single active route chunk (and, on /visas/:slug, ONLY that single country's
 * data chunk) and caches the resolved component synchronously prior to React hydration so
 * prerendered HTML hydrates without React Suspense mismatch (#418).
 */
export async function preloadRouteForPath(pathname: string): Promise<void> {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (clean === '/') {
    await HomePageEntry.preload();
    return;
  }
  if (clean === '/visas') {
    await VisasDirectoryPageEntry.preload();
    return;
  }
  if (clean.startsWith('/visas/')) {
    const slug = clean.slice('/visas/'.length);
    if (hasDestinationSlug(slug)) {
      await Promise.all([CountryPageEntry.preload(), loadDestination(slug)]);
    } else {
      await NotFoundPageEntry.preload();
    }
    return;
  }
  if (clean === '/schengen-appointments') {
    await SchengenPageEntry.preload();
    return;
  }
  if (clean === '/travel-insurance') {
    await InsurancePageEntry.preload();
    return;
  }
  if (clean === '/about') {
    await AboutPageEntry.preload();
    return;
  }
  if (clean === '/contact') {
    await ContactPageEntry.preload();
    return;
  }
  if (clean === '/privacy') {
    await PrivacyPageEntry.preload();
    return;
  }
  if (clean === '/terms') {
    await TermsPageEntry.preload();
    return;
  }
  await NotFoundPageEntry.preload();
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
    </>
  );
}
