import { Route, Routes, useParams } from 'react-router-dom';
import { getDestinationBySlug } from './data/destinations';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CountryPage } from './pages/CountryPage';
import { HomePage } from './pages/HomePage';
import { InsurancePage } from './pages/InsurancePage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { SchengenPage } from './pages/SchengenPage';
import { VisasDirectoryPage } from './pages/VisasDirectoryPage';

function SsrCountryRoute() {
  const { slug } = useParams<{ slug: string }>();
  const destination = slug ? getDestinationBySlug(slug) : undefined;
  if (!destination) {
    return <NotFoundPage />;
  }
  return <CountryPage destination={destination} />;
}

/**
 * Synchronous route tree used strictly during static SSR prerendering (`src/entry-server.tsx`).
 * Client builds use `src/AppRoutes.tsx` where every page and every country data script is split into its own chunk.
 */
export function SsrRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/visas" element={<VisasDirectoryPage />} />
      <Route path="/visas/:slug" element={<SsrCountryRoute />} />
      <Route path="/schengen-appointments" element={<SchengenPage />} />
      <Route path="/travel-insurance" element={<InsurancePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
