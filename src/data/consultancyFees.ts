/**
 * Zero-dependency baseline consultancy service fee schedule per destination slug (PKR).
 * Kept independent of visaCostCalculator/checklistsData so lightweight page templates
 * (like CountryPage and Schema builders) never pull large checklist datasets into client chunks.
 */
export const CONSULTANCY_FEE_PKR: Record<string, number> = {
  // E-Visa / Low-complexity regional routes
  azerbaijan: 7500,
  cambodia: 8500,
  'sri-lanka': 8500,
  kenya: 9500,
  malaysia: 10500,
  bahrain: 10500,
  zimbabwe: 10500,
  nepal: 11000,
  indonesia: 11500,
  uzbekistan: 13500,
  singapore: 14000,
  thailand: 14500,
  egypt: 14500,
  philippines: 15500,
  morocco: 15500,
  turkey: 18500,

  // Mid-high tier sticker destinations
  japan: 25000,
  'south-korea': 25000,
  'south-africa': 25000,

  // USA & Schengen Area
  usa: 30000,
  'schengen-states': 30000,
  germany: 30000,
  france: 30000,
  greece: 30000,
  portugal: 30000,
  hungary: 30000,
  poland: 30000,
  netherlands: 30000,
  norway: 30000,
  denmark: 30000,
  belgium: 30000,
  luxembourg: 30000,
  finland: 30000,
  sweden: 30000,
  switzerland: 30000,
  austria: 30000,
  italy: 30000,
  spain: 30000,

  // High-scrutiny Five Eyes sticker/biometric routes
  uk: 40000,
  canada: 40000,
  australia: 40000,
  'new-zealand': 40000,
};

export const CONSULTANCY_FEE_RANGE_PKR = {
  min: 7500,
  max: 40000,
} as const;

export function getConsultancyFeePkr(slug: string): number {
  return CONSULTANCY_FEE_PKR[slug] ?? 30000;
}
