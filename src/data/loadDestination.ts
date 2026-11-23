import type { DestinationData } from './types';

type CountryLoader = () => Promise<DestinationData>;

const COUNTRY_LOADERS: Record<string, CountryLoader> = {
  'thailand': () => import('./countries/thailand').then((m) => m.destination),
  'malaysia': () => import('./countries/malaysia').then((m) => m.destination),
  'indonesia': () => import('./countries/indonesia').then((m) => m.destination),
  'singapore': () => import('./countries/singapore').then((m) => m.destination),
  'cambodia': () => import('./countries/cambodia').then((m) => m.destination),
  'sri-lanka': () => import('./countries/sri-lanka').then((m) => m.destination),
  'nepal': () => import('./countries/nepal').then((m) => m.destination),
  'uzbekistan': () => import('./countries/uzbekistan').then((m) => m.destination),
  'bahrain': () => import('./countries/bahrain').then((m) => m.destination),
  'turkey': () => import('./countries/turkey').then((m) => m.destination),
  'azerbaijan': () => import('./countries/azerbaijan').then((m) => m.destination),
  'japan': () => import('./countries/japan').then((m) => m.destination),
  'south-korea': () => import('./countries/south-korea').then((m) => m.destination),
  'philippines': () => import('./countries/philippines').then((m) => m.destination),
  'usa': () => import('./countries/usa').then((m) => m.destination),
  'canada': () => import('./countries/canada').then((m) => m.destination),
  'uk': () => import('./countries/uk').then((m) => m.destination),
  'australia': () => import('./countries/australia').then((m) => m.destination),
  'new-zealand': () => import('./countries/new-zealand').then((m) => m.destination),
  'schengen-states': () => import('./countries/schengen-states').then((m) => m.destination),
  'germany': () => import('./countries/germany').then((m) => m.destination),
  'france': () => import('./countries/france').then((m) => m.destination),
  'greece': () => import('./countries/greece').then((m) => m.destination),
  'portugal': () => import('./countries/portugal').then((m) => m.destination),
  'hungary': () => import('./countries/hungary').then((m) => m.destination),
  'poland': () => import('./countries/poland').then((m) => m.destination),
  'netherlands': () => import('./countries/netherlands').then((m) => m.destination),
  'norway': () => import('./countries/norway').then((m) => m.destination),
  'denmark': () => import('./countries/denmark').then((m) => m.destination),
  'belgium': () => import('./countries/belgium').then((m) => m.destination),
  'luxembourg': () => import('./countries/luxembourg').then((m) => m.destination),
  'finland': () => import('./countries/finland').then((m) => m.destination),
  'sweden': () => import('./countries/sweden').then((m) => m.destination),
  'switzerland': () => import('./countries/switzerland').then((m) => m.destination),
  'austria': () => import('./countries/austria').then((m) => m.destination),
  'italy': () => import('./countries/italy').then((m) => m.destination),
  'spain': () => import('./countries/spain').then((m) => m.destination),
  'egypt': () => import('./countries/egypt').then((m) => m.destination),
  'morocco': () => import('./countries/morocco').then((m) => m.destination),
  'kenya': () => import('./countries/kenya').then((m) => m.destination),
  'south-africa': () => import('./countries/south-africa').then((m) => m.destination),
  'zimbabwe': () => import('./countries/zimbabwe').then((m) => m.destination),
};

const loadedCache = new Map<string, DestinationData>();

export function hasDestinationSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(COUNTRY_LOADERS, slug);
}

export function getLoadedDestination(slug: string): DestinationData | undefined {
  return loadedCache.get(slug);
}

export async function loadDestination(slug: string): Promise<DestinationData | null> {
  const cached = loadedCache.get(slug);
  if (cached) return cached;

  const loader = COUNTRY_LOADERS[slug];
  if (!loader) return null;

  const data = await loader();
  loadedCache.set(slug, data);
  return data;
}
