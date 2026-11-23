import { DESTINATION_SUMMARIES as DESTINATIONS, REGIONS } from '../data/destinationIndex';
import type { RegionId, VisaChannel } from '../data/types';
import { getCostCalculatorSchedule } from './visaCostCalculator';
import { destinationSlugToChecklistId } from './visaGlobeData';

export type TurnaroundTier = 'express' | 'moderate' | 'extended';
export type TurnaroundFilterId = 'all' | 'under_10' | 'under_21';

export interface ParsedWaitWindow {
  minCalendarDays: number;
  maxCalendarDays: number;
  medianCalendarDays: number;
  appointmentDependent: boolean;
}

export interface WorldVisaEntry {
  slug: string;
  checklistId: string;
  country: string;
  isoCode: string;
  region: RegionId;
  channel: VisaChannel;
  accentHex: string;
  visaType: string;
  processingEstimate: string;
  minCalendarDays: number;
  maxCalendarDays: number;
  medianCalendarDays: number;
  appointmentDependent: boolean;
  tier: TurnaroundTier;
  detailPath: string;
}

export interface RegionalWaitSummary {
  rank: number;
  region: RegionId;
  destinationCount: number;
  eVisaCount: number;
  avgMedianDays: number;
  minDays: number;
  maxDays: number;
  tier: TurnaroundTier;
  isShortestTurnaround: boolean;
  fastestDestination: WorldVisaEntry;
  destinations: WorldVisaEntry[];
}

export interface GlobalWaitOverview {
  totalDestinations: number;
  totalRegions: number;
  globalAvgDays: number;
  fastTrackCount: number;
  eVisaCount: number;
  shortestRegion: RegionalWaitSummary;
  fastestDestination: WorldVisaEntry;
  longestRegion: RegionalWaitSummary;
}

export interface TravelAlternativeMatch {
  destination: WorldVisaEntry;
  daysSaved: number;
  isEVisaAdvantage: boolean;
  isShortestRegion: boolean;
}

/**
 * Converts indicative consular processing text (working days, calendar days,
 * weeks, or interview-wait wording) into normalized calendar-day metrics for
 * transparent apples-to-apples regional turnaround comparisons.
 */
export function parseProcessingWindowToDays(estimate: string): ParsedWaitWindow {
  const normalized = estimate.trim().toLowerCase();
  const appointmentDependent = /appointment\s+wait|interview/i.test(normalized);

  // Interview-wait destinations (e.g., USA B1/B2 from Pakistan) carry substantial
  // consular appointment lead time beyond the post-interview printing window.
  if (appointmentDependent) {
    return {
      minCalendarDays: 45,
      maxCalendarDays: 120,
      medianCalendarDays: 82,
      appointmentDependent: true,
    };
  }

  const rangeMatch = normalized.match(/(\d+)\s*[–-]\s*(\d+)\s*(working\s+days?|business\s+days?|calendar\s+days?|days?|weeks?)/i);
  if (rangeMatch) {
    const low = Number.parseInt(rangeMatch[1], 10);
    const high = Number.parseInt(rangeMatch[2], 10);
    const unit = rangeMatch[3].toLowerCase();

    let multiplier = 1;
    if (unit.startsWith('week')) {
      multiplier = 7;
    } else if (unit.startsWith('working') || unit.startsWith('business')) {
      // 5 working days ≈ 7 calendar days
      multiplier = 1.4;
    }

    const minCalendarDays = Math.max(1, Math.round(low * multiplier));
    const maxCalendarDays = Math.max(minCalendarDays, Math.round(high * multiplier));
    const medianCalendarDays = Math.round((minCalendarDays + maxCalendarDays) / 2);

    return {
      minCalendarDays,
      maxCalendarDays,
      medianCalendarDays,
      appointmentDependent: false,
    };
  }

  const singleMatch = normalized.match(/(\d+)\s*(working\s+days?|business\s+days?|calendar\s+days?|days?|weeks?)/i);
  if (singleMatch) {
    const val = Number.parseInt(singleMatch[1], 10);
    const unit = singleMatch[2].toLowerCase();
    const multiplier = unit.startsWith('week') ? 7 : unit.startsWith('working') || unit.startsWith('business') ? 1.4 : 1;
    const days = Math.max(1, Math.round(val * multiplier));
    return {
      minCalendarDays: days,
      maxCalendarDays: days,
      medianCalendarDays: days,
      appointmentDependent: false,
    };
  }

  return {
    minCalendarDays: 15,
    maxCalendarDays: 30,
    medianCalendarDays: 22,
    appointmentDependent: false,
  };
}

export function classifyTurnaroundTier(medianCalendarDays: number): TurnaroundTier {
  if (medianCalendarDays <= 11) return 'express';
  if (medianCalendarDays <= 25) return 'moderate';
  return 'extended';
}

export const WORLD_VISA_ENTRIES: readonly WorldVisaEntry[] = DESTINATIONS.map((dest) => {
  const schedule = getCostCalculatorSchedule(dest.slug);
  const processingEstimate =
    dest.facts.processingTime.trim() || schedule.processingWindowEstimate;
  const parsed = parseProcessingWindowToDays(processingEstimate);

  return {
    slug: dest.slug,
    checklistId: destinationSlugToChecklistId(dest.slug),
    country: dest.country,
    isoCode: dest.isoCode,
    region: dest.region,
    channel: dest.channel,
    accentHex: dest.accentHex,
    visaType: dest.facts.visaType,
    processingEstimate,
    minCalendarDays: parsed.minCalendarDays,
    maxCalendarDays: parsed.maxCalendarDays,
    medianCalendarDays: parsed.medianCalendarDays,
    appointmentDependent: parsed.appointmentDependent,
    tier: classifyTurnaroundTier(parsed.medianCalendarDays),
    detailPath: `/visas/${dest.slug}`,
  };
}).sort((a, b) => {
  if (a.medianCalendarDays !== b.medianCalendarDays) {
    return a.medianCalendarDays - b.medianCalendarDays;
  }
  if (a.minCalendarDays !== b.minCalendarDays) {
    return a.minCalendarDays - b.minCalendarDays;
  }
  return a.country.localeCompare(b.country);
});

export function buildRegionalWaitSummaries(
  entries: readonly WorldVisaEntry[] = WORLD_VISA_ENTRIES,
): RegionalWaitSummary[] {
  const grouped = new Map<RegionId, WorldVisaEntry[]>();
  for (const reg of REGIONS) {
    grouped.set(reg, []);
  }
  for (const entry of entries) {
    const bucket = grouped.get(entry.region);
    if (bucket) {
      bucket.push(entry);
    }
  }

  const rawSummaries = REGIONS.map((region) => {
    const list = [...(grouped.get(region) ?? [])].sort((a, b) => {
      if (a.medianCalendarDays !== b.medianCalendarDays) {
        return a.medianCalendarDays - b.medianCalendarDays;
      }
      return a.minCalendarDays - b.minCalendarDays;
    });

    const totalMedian = list.reduce((sum, item) => sum + item.medianCalendarDays, 0);
    const avgMedianDays = list.length > 0 ? Math.round(totalMedian / list.length) : 0;
    const minDays = list.length > 0 ? Math.min(...list.map((d) => d.minCalendarDays)) : 0;
    const maxDays = list.length > 0 ? Math.max(...list.map((d) => d.maxCalendarDays)) : 0;
    const eVisaCount = list.filter((d) => d.channel === 'e-Visa').length;

    return {
      region,
      destinationCount: list.length,
      eVisaCount,
      avgMedianDays,
      minDays,
      maxDays,
      tier: classifyTurnaroundTier(avgMedianDays),
      fastestDestination: list[0],
      destinations: list,
    };
  }).filter((item) => item.destinationCount > 0);

  rawSummaries.sort((a, b) => {
    if (a.avgMedianDays !== b.avgMedianDays) {
      return a.avgMedianDays - b.avgMedianDays;
    }
    if (a.minDays !== b.minDays) {
      return a.minDays - b.minDays;
    }
    return b.eVisaCount - a.eVisaCount;
  });

  return rawSummaries.map((item, idx) => ({
    ...item,
    rank: idx + 1,
    // Highlight the top 3 regions with the shortest turnaround
    isShortestTurnaround: idx < 3,
  }));
}

export const REGIONAL_WAIT_SUMMARIES: readonly RegionalWaitSummary[] =
  buildRegionalWaitSummaries(WORLD_VISA_ENTRIES);

const SHORTEST_REGION_SET = new Set<RegionId>(
  REGIONAL_WAIT_SUMMARIES.filter((r) => r.isShortestTurnaround).map((r) => r.region),
);

export function buildGlobalWaitOverview(
  entries: readonly WorldVisaEntry[] = WORLD_VISA_ENTRIES,
  regions: readonly RegionalWaitSummary[] = REGIONAL_WAIT_SUMMARIES,
): GlobalWaitOverview {
  const totalMedian = entries.reduce((sum, e) => sum + e.medianCalendarDays, 0);
  const globalAvgDays = entries.length > 0 ? Math.round(totalMedian / entries.length) : 0;
  const fastTrackCount = entries.filter((e) => e.medianCalendarDays <= 11).length;
  const eVisaCount = entries.filter((e) => e.channel === 'e-Visa').length;

  return {
    totalDestinations: entries.length,
    totalRegions: regions.length,
    globalAvgDays,
    fastTrackCount,
    eVisaCount,
    shortestRegion: regions[0],
    fastestDestination: entries[0],
    longestRegion: regions[regions.length - 1],
  };
}

/**
 * Curated list of higher-wait benchmark destinations that travellers frequently
 * compare against shorter-turnaround travel alternatives.
 */
export const POPULAR_BENCHMARK_SLUGS = [
  'canada',
  'usa',
  'germany',
  'uk',
  'australia',
  'france',
] as const;

/**
 * Returns data-backed faster travel alternatives for a given target destination,
 * prioritizing distinct shortest-turnaround regions and e-Visa convenience.
 */
export function findFasterAlternatives(
  targetSlug: string,
  maxResults = 4,
  entries: readonly WorldVisaEntry[] = WORLD_VISA_ENTRIES,
): { target: WorldVisaEntry; alternatives: TravelAlternativeMatch[] } {
  const target =
    entries.find((e) => e.slug === targetSlug) ??
    entries.find((e) => e.slug === 'canada') ??
    entries[entries.length - 1];

  const fasterPool = entries
    .filter((candidate) => {
      if (candidate.slug === target.slug) return false;
      return candidate.medianCalendarDays < target.medianCalendarDays;
    })
    .sort((a, b) => {
      // Prioritize shortest turnaround, then e-Visa convenience, then minDays
      if (a.medianCalendarDays !== b.medianCalendarDays) {
        return a.medianCalendarDays - b.medianCalendarDays;
      }
      const aEvisa = a.channel === 'e-Visa' ? 0 : 1;
      const bEvisa = b.channel === 'e-Visa' ? 0 : 1;
      if (aEvisa !== bEvisa) return aEvisa - bEvisa;
      return a.minCalendarDays - b.minCalendarDays;
    });

  // Spread recommendations across distinct regions first so the user sees varied travel alternatives
  const picked: WorldVisaEntry[] = [];
  const usedRegions = new Set<RegionId>();

  for (const candidate of fasterPool) {
    if (picked.length >= maxResults) break;
    if (!usedRegions.has(candidate.region)) {
      picked.push(candidate);
      usedRegions.add(candidate.region);
    }
  }

  for (const candidate of fasterPool) {
    if (picked.length >= maxResults) break;
    if (!picked.some((p) => p.slug === candidate.slug)) {
      picked.push(candidate);
    }
  }

  const alternatives: TravelAlternativeMatch[] = picked.map((destination) => ({
    destination,
    daysSaved: Math.max(1, target.medianCalendarDays - destination.medianCalendarDays),
    isEVisaAdvantage: destination.channel === 'e-Visa' && target.channel !== 'e-Visa',
    isShortestRegion: SHORTEST_REGION_SET.has(destination.region),
  }));

  return { target, alternatives };
}

export function filterWorldVisaEntries(
  options: {
    region?: RegionId | 'All';
    turnaround?: TurnaroundFilterId;
    eVisaOnly?: boolean;
  },
  entries: readonly WorldVisaEntry[] = WORLD_VISA_ENTRIES,
): WorldVisaEntry[] {
  const { region = 'All', turnaround = 'all', eVisaOnly = false } = options;

  return entries.filter((entry) => {
    if (region !== 'All' && entry.region !== region) return false;
    if (eVisaOnly && entry.channel !== 'e-Visa') return false;
    if (turnaround === 'under_10' && entry.medianCalendarDays > 11) return false;
    if (turnaround === 'under_21' && entry.medianCalendarDays > 21) return false;
    return true;
  });
}
