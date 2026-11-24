import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DESTINATIONS, REGIONS, VISA_CHANNELS } from '../src/data/destinations.ts';
import { getCostCalculatorSchedule } from '../src/utils/visaCostCalculator.ts';

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: 'USD ',
  EUR: '€',
  GBP: '£',
  CAD: 'CAD ',
  AUD: 'AUD ',
  NZD: 'NZD ',
  JPY: '¥',
  SGD: 'SGD ',
  MYR: 'MYR ',
  BHD: 'BHD ',
  ZAR: 'ZAR ',
};

function buildIndicativeSummary(slug: string): {
  indicativeFeeLabel: string;
  indicativeProcessing: string;
} {
  const schedule = getCostCalculatorSchedule(slug);
  const fee = schedule.embassyFeeByType.tourist;
  const sym = CURRENCY_SYMBOL[schedule.currency] ?? `${schedule.currency} `;
  return {
    indicativeFeeLabel:
      fee === 0 ? 'Fee-waived / low e-Visa' : `~${sym}${fee.toLocaleString('en-US')} govt fee`,
    indicativeProcessing: schedule.processingWindowEstimate,
  };
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const countriesDir = path.resolve(rootDir, 'src/data/countries');

fs.mkdirSync(countriesDir, { recursive: true });

// 1. Emit one standalone TS module per country (42 separate Vite chunks)
for (const dest of DESTINATIONS) {
  const filePath = path.resolve(countriesDir, `${dest.slug}.ts`);
  const content = `import type { DestinationData } from '../types';\n\nexport const destination: DestinationData = ${JSON.stringify(dest, null, 2)};\n`;
  fs.writeFileSync(filePath, content, 'utf-8');
}

// 2. Emit lightweight destination summary index (no 500-word prose, FAQs, steps, or checklists)
const summaries = DESTINATIONS.map((d) => {
  const indicative = buildIndicativeSummary(d.slug);
  return {
    slug: d.slug,
    country: d.country,
    isoCode: d.isoCode,
    region: d.region,
    channel: d.channel,
    accentHex: d.accentHex,
    heroPromise: d.heroPromise,
    indicativeFeeLabel: indicative.indicativeFeeLabel,
    indicativeProcessing: indicative.indicativeProcessing,
    facts: {
      visaType: d.facts.visaType,
      entryType: d.facts.entryType,
      stayDuration: d.facts.stayDuration,
      processingTime: d.facts.processingTime,
      govtFee: d.facts.govtFee,
    },
  };
});

const indexContent = `import type { RegionId, VisaChannel } from './types';

export interface DestinationSummary {
  slug: string;
  country: string;
  isoCode: string;
  region: RegionId;
  channel: VisaChannel;
  accentHex: string;
  heroPromise: string;
  indicativeFeeLabel: string;
  indicativeProcessing: string;
  facts: {
    visaType: string;
    entryType: string;
    stayDuration: string;
    processingTime: string;
    govtFee: string;
  };
}

export const REGIONS: RegionId[] = ${JSON.stringify(REGIONS, null, 2)};

export const VISA_CHANNELS: VisaChannel[] = ${JSON.stringify(VISA_CHANNELS, null, 2)};

/**
 * Lightweight metadata index for all ${DESTINATIONS.length} destinations.
 * Keeps global shell (Header, Footer, Cards, Forms) small without bundling full country guides.
 */
export const DESTINATION_SUMMARIES: readonly DestinationSummary[] = ${JSON.stringify(summaries, null, 2)};

export function getDestinationSummaryBySlug(slug: string): DestinationSummary | undefined {
  return DESTINATION_SUMMARIES.find((d) => d.slug === slug);
}

export function getRelatedDestinationSummaries(slugs: string[]): DestinationSummary[] {
  return slugs
    .map((slug) => getDestinationSummaryBySlug(slug))
    .filter((item): item is DestinationSummary => Boolean(item));
}
`;
fs.writeFileSync(path.resolve(rootDir, 'src/data/destinationIndex.ts'), indexContent, 'utf-8');

// 3. Emit per-country async dynamic import loader map
const loaderEntries = DESTINATIONS.map(
  (d) => `  '${d.slug}': () => import('./countries/${d.slug}').then((m) => m.destination),`,
).join('\n');

const loaderContent = `import type { DestinationData } from './types';

type CountryLoader = () => Promise<DestinationData>;

const COUNTRY_LOADERS: Record<string, CountryLoader> = {
${loaderEntries}
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
`;
fs.writeFileSync(path.resolve(rootDir, 'src/data/loadDestination.ts'), loaderContent, 'utf-8');

// 4. Emit lightweight checklist source data (without 500-word essays, FAQs, steps, or seoKeywordGuide)
const checklistSources = DESTINATIONS.filter((d) => d.slug !== 'schengen-states').map((d) => ({
  slug: d.slug,
  country: d.country,
  isoCode: d.isoCode,
  accentHex: d.accentHex,
  channel: d.channel,
  lastVerified: d.facts.lastVerified,
  eligibilityNote: d.whoCanApply.eligibilityNote,
  checklist: d.checklist,
}));

const checklistsContent = `import type { ChecklistGroup, VisaChannel } from './types';

export interface ChecklistDestinationSource {
  slug: string;
  country: string;
  isoCode: string;
  accentHex: string;
  channel: VisaChannel;
  lastVerified: string;
  eligibilityNote: string;
  checklist: ChecklistGroup[];
}

/**
 * Lightweight checklist payload for DocumentChecklistLibrary and InteractiveVisaGlobe,
 * excluding long country essays, FAQs, refusal audits, and SEO keyword metadata.
 */
export const CHECKLIST_DESTINATION_SOURCES: readonly ChecklistDestinationSource[] = ${JSON.stringify(checklistSources, null, 2)};
`;
fs.writeFileSync(path.resolve(rootDir, 'src/data/checklistsData.ts'), checklistsContent, 'utf-8');

console.log(`Generated ${DESTINATIONS.length} separate country modules + destinationIndex.ts + loadDestination.ts + checklistsData.ts`);
