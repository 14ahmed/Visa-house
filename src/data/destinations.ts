import { SEASIA_DESTINATIONS } from './destinations-seasia';
import { SOUTH_CENTRAL_ME_DESTINATIONS } from './destinations-south-central-me';
import { EAST_WEST_DESTINATIONS } from './destinations-east-west';
import { COMMONWEALTH_OCEANIA_DESTINATIONS } from './destinations-commonwealth-oceania';
import { SCHENGEN_DESTINATIONS } from './destinations-schengen';
import { AFRICA_DESTINATIONS } from './destinations-africa';
import { buildCountryKeywordGuide } from './countryKeywordResearch';
import type { DestinationData, RegionId, VisaChannel } from './types';

/**
 * Single source of truth for every country visa page (42 destinations).
 * Adding a new destination country = adding one entry to the appropriate regional file.
 */
const RAW_DESTINATIONS: DestinationData[] = [
  ...SEASIA_DESTINATIONS.slice(0, 5), // thailand, malaysia, indonesia, singapore, cambodia
  ...SOUTH_CENTRAL_ME_DESTINATIONS, // sri-lanka, nepal, uzbekistan, bahrain, turkey, azerbaijan
  ...EAST_WEST_DESTINATIONS.slice(0, 2), // japan, south-korea
  SEASIA_DESTINATIONS[5], // philippines
  EAST_WEST_DESTINATIONS[2], // usa
  ...COMMONWEALTH_OCEANIA_DESTINATIONS, // canada, uk, australia, new-zealand
  ...SCHENGEN_DESTINATIONS, // schengen-states + 17 Schengen countries
  ...AFRICA_DESTINATIONS, // egypt, morocco, kenya, south-africa, zimbabwe
];

export const DESTINATIONS: DestinationData[] = RAW_DESTINATIONS.map((dest) => ({
  ...dest,
  seoKeywordGuide: dest.seoKeywordGuide ?? buildCountryKeywordGuide(dest),
}));

export const REGIONS: RegionId[] = [
  'Europe & UK',
  'North America',
  'Oceania',
  'Africa',
  'Southeast Asia',
  'South Asia',
  'Central Asia & Gulf',
  'East Asia',
];

export const VISA_CHANNELS: VisaChannel[] = [
  'e-Visa',
  'Hybrid / Centre',
  'Sticker / Embassy',
  'Interview / Consulate',
];

export function getDestinationBySlug(slug: string): DestinationData | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function getRelatedDestinations(slugs: string[]): DestinationData[] {
  return slugs
    .map((slug) => getDestinationBySlug(slug))
    .filter((item): item is DestinationData => Boolean(item));
}
