import { DESTINATIONS } from './destinations';

export interface StaticRouteEntry {
  path: string;
  label: string;
  priority: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export const STATIC_ROUTES: StaticRouteEntry[] = [
  { path: '/', label: 'Home', priority: '1.0', changefreq: 'weekly' },
  { path: '/visas', label: 'All Visas', priority: '0.9', changefreq: 'weekly' },
  ...DESTINATIONS.map((d) => ({
    path: `/visas/${d.slug}`,
    label: `${d.country} Visa`,
    priority: '0.85',
    changefreq: 'weekly' as const,
  })),
  {
    path: '/schengen-appointments',
    label: 'Schengen Appointments',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/travel-insurance',
    label: 'Travel Insurance',
    priority: '0.85',
    changefreq: 'weekly',
  },
  { path: '/about', label: 'About Visahouse', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', label: 'Contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', label: 'Privacy Policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', label: 'Terms of Service', priority: '0.3', changefreq: 'yearly' },
];
