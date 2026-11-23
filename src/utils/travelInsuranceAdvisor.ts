import { SITE_CONFIG } from '../config/site';

export type AdvisorDestinationId =
  | 'schengen'
  | 'usa'
  | 'canada'
  | 'uk'
  | 'australia-nz'
  | 'japan-korea'
  | 'southeast-asia'
  | 'nepal-srilanka'
  | 'africa';

export type InsuranceVisaRequirementId =
  | 'schengen-embassy'
  | 'tourist-short'
  | 'business-messe'
  | 'student-long'
  | 'family-senior';

export type TravellerAgeBandId = 'under-45' | '45-59' | '60-69' | '70-plus';

export type RecommendedTierId = 'ins-schengen' | 'ins-worldwide' | 'ins-regional';
export type ComplianceLevel = 'mandatory' | 'conditional' | 'recommended';

export interface AdvisorDestinationOption {
  id: AdvisorDestinationId;
  label: string;
  isoCode: string;
  regionLabel: string;
  defaultTierId: RecommendedTierId;
  baseCompliance: ComplianceLevel;
  minimumMedicalCeiling: string;
  territoryWording: string;
  defaultBufferDays: number;
  visaRuleSummary: string;
}

export interface TravelInsuranceAdvisorInput {
  destinationId: AdvisorDestinationId;
  tripDays: number;
  visaRequirementId: InsuranceVisaRequirementId;
  ageBandId: TravellerAgeBandId;
  travellers: number;
  includeTripCancellation?: boolean;
  includeAdventureCover?: boolean;
  includeZeroDeductible?: boolean;
}

export interface TravelInsuranceRecommendation {
  destination: AdvisorDestinationOption;
  recommendedTierId: RecommendedTierId;
  recommendedTierName: string;
  tierTagline: string;
  complianceLevel: ComplianceLevel;
  complianceLabel: string;
  minimumMedicalCeiling: string;
  territoryWording: string;
  tripDays: number;
  bufferDays: number;
  recommendedPolicyDays: number;
  durationBandLabel: string;
  travellers: number;
  ageBandLabel: string;
  visaRequirementLabel: string;
  certificateChecklist: string[];
  underwritingNotes: string[];
  premiumGuidance: string;
  briefText: string;
}

export const ADVISOR_DESTINATIONS: AdvisorDestinationOption[] = [
  {
    id: 'schengen',
    label: 'Schengen Area (France, Italy, Spain, Germany, Switzerland & EU)',
    isoCode: 'SCH',
    regionLabel: 'Europe · Schengen Visa Code',
    defaultTierId: 'ins-schengen',
    baseCompliance: 'mandatory',
    minimumMedicalCeiling: '€30,000+ Emergency Medical',
    territoryWording: 'All Schengen Member States',
    defaultBufferDays: 5,
    visaRuleSummary:
      'Mandatory under Schengen Visa Code Article 15: minimum €30,000 medical & repatriation cover valid across all member states with zero date gaps.',
  },
  {
    id: 'usa',
    label: 'United States (B1/B2 Visitor or Student)',
    isoCode: 'USA',
    regionLabel: 'North America · High-Cost Healthcare',
    defaultTierId: 'ins-worldwide',
    baseCompliance: 'recommended',
    minimumMedicalCeiling: 'USD 100,000+ Emergency Medical',
    territoryWording: 'Worldwide Including USA & Canada',
    defaultBufferDays: 2,
    visaRuleSummary:
      'Not a mandatory B1/B2 interview upload, but high-limit USD 100,000+ cover is critical because US emergency hospitalisation costs escalate rapidly.',
  },
  {
    id: 'canada',
    label: 'Canada (Visitor, Family or Super Visa)',
    isoCode: 'CAN',
    regionLabel: 'North America · Worldwide Zone',
    defaultTierId: 'ins-worldwide',
    baseCompliance: 'conditional',
    minimumMedicalCeiling: 'CAD 100,000 / USD 100,000+',
    territoryWording: 'Worldwide Including Canada & USA',
    defaultBufferDays: 2,
    visaRuleSummary:
      'Recommended for standard TRV visitors; strictly mandatory (minimum CAD 100,000 for 1 year from an authorised insurer) for Parent & Grandparent Super Visas.',
  },
  {
    id: 'uk',
    label: 'United Kingdom (Standard Visitor or Student)',
    isoCode: 'GBR',
    regionLabel: 'United Kingdom · Worldwide Zone',
    defaultTierId: 'ins-worldwide',
    baseCompliance: 'recommended',
    minimumMedicalCeiling: 'GBP 50,000 / USD 50,000+',
    territoryWording: 'United Kingdom & Europe / Worldwide',
    defaultBufferDays: 2,
    visaRuleSummary:
      'Short-term visitors are not eligible for free NHS inpatient care; long-stay students (>6 months) pay the statutory Immigration Health Surcharge (IHS) separately.',
  },
  {
    id: 'australia-nz',
    label: 'Australia & New Zealand',
    isoCode: 'ANZ',
    regionLabel: 'Oceania · Worldwide Zone',
    defaultTierId: 'ins-worldwide',
    baseCompliance: 'conditional',
    minimumMedicalCeiling: 'USD 100,000+ Emergency Medical',
    territoryWording: 'Worldwide Including Oceania',
    defaultBufferDays: 2,
    visaRuleSummary:
      'Strongly advised for visitor subclasses (and mandatory OSHC for Australian student visas; elderly visitors may face Condition 8501 health cover requirements).',
  },
  {
    id: 'japan-korea',
    label: 'Japan & South Korea',
    isoCode: 'EAS',
    regionLabel: 'East Asia · Worldwide / Enhanced Zone',
    defaultTierId: 'ins-worldwide',
    baseCompliance: 'recommended',
    minimumMedicalCeiling: 'USD 50,000 – 100,000 Medical',
    territoryWording: 'Worldwide (Excluding or Including USA)',
    defaultBufferDays: 2,
    visaRuleSummary:
      'Strongly recommended for Tokyo, Osaka, and Seoul trips; international hospital admission deposits in Japan and South Korea are substantial without cashless cover.',
  },
  {
    id: 'southeast-asia',
    label: 'Thailand, Malaysia, Singapore, Indonesia & Philippines',
    isoCode: 'SEA',
    regionLabel: 'Southeast Asia · Regional Zone',
    defaultTierId: 'ins-regional',
    baseCompliance: 'recommended',
    minimumMedicalCeiling: 'USD 50,000 Emergency Medical',
    territoryWording: 'Asia & Regional Destinations',
    defaultBufferDays: 1,
    visaRuleSummary:
      'Practical emergency hospital, flight delay, and baggage protection for popular regional holidays and family itineraries.',
  },
  {
    id: 'nepal-srilanka',
    label: 'Nepal, Sri Lanka, Uzbekistan & Bahrain',
    isoCode: 'REG',
    regionLabel: 'South / Central Asia & Gulf',
    defaultTierId: 'ins-regional',
    baseCompliance: 'recommended',
    minimumMedicalCeiling: 'USD 50,000 Emergency Medical',
    territoryWording: 'Asia & Middle East Regional Zone',
    defaultBufferDays: 1,
    visaRuleSummary:
      'Standard regional medical cover works for city stays; Nepal trekking above 3,000m requires an explicit high-altitude and helicopter evacuation endorsement.',
  },
  {
    id: 'africa',
    label: 'Egypt, Morocco, Kenya, South Africa & Zimbabwe',
    isoCode: 'AFR',
    regionLabel: 'Africa · Worldwide Zone',
    defaultTierId: 'ins-worldwide',
    baseCompliance: 'recommended',
    minimumMedicalCeiling: 'USD 50,000+ Medical & Evacuation',
    territoryWording: 'Worldwide (Excl. USA/Canada or Full Worldwide)',
    defaultBufferDays: 2,
    visaRuleSummary:
      'Prioritise emergency medical evacuation and repatriation benefits, especially for safari parks in Kenya, South Africa, or Victoria Falls.',
  },
];

export const VISA_REQUIREMENT_OPTIONS: Array<{
  id: InsuranceVisaRequirementId;
  label: string;
  shortLabel: string;
}> = [
  {
    id: 'schengen-embassy',
    label: 'Schengen / Mandatory Embassy Upload',
    shortLabel: 'Embassy Mandatory',
  },
  {
    id: 'tourist-short',
    label: 'Tourist / Leisure Short-Stay',
    shortLabel: 'Tourist',
  },
  {
    id: 'business-messe',
    label: 'Business / Trade Fair (Messe)',
    shortLabel: 'Business',
  },
  {
    id: 'student-long',
    label: 'Student / Long-Stay Visa',
    shortLabel: 'Student',
  },
  {
    id: 'family-senior',
    label: 'Family Visit / Parents',
    shortLabel: 'Family Visit',
  },
];

export const AGE_BAND_OPTIONS: Array<{
  id: TravellerAgeBandId;
  label: string;
  shortLabel: string;
}> = [
  { id: 'under-45', label: 'Under 45 years', shortLabel: 'Under 45' },
  { id: '45-59', label: '45 – 59 years', shortLabel: '45–59' },
  { id: '60-69', label: '60 – 69 years', shortLabel: '60–69' },
  { id: '70-plus', label: '70+ years (Senior underwriting)', shortLabel: '70+' },
];

export const TRIP_DURATION_PRESETS = [7, 14, 30, 60, 90] as const;

const TIER_CATALOG: Record<
  RecommendedTierId,
  { name: string; tagline: string }
> = {
  'ins-schengen': {
    name: 'Schengen Compliant €30,000+',
    tagline: 'Embassy-ready certificate formatted for VFS Global, BLS & consular desks',
  },
  'ins-worldwide': {
    name: 'Worldwide Including USA & Japan',
    tagline: 'Higher medical ceiling for high-cost healthcare & multi-region itineraries',
  },
  'ins-regional': {
    name: 'Asia & Gulf Essential',
    tagline: 'Focused emergency medical & travel delay cover for regional journeys',
  },
};

const COMPLIANCE_LABELS: Record<ComplianceLevel, string> = {
  mandatory: 'Mandatory for Visa Filing',
  conditional: 'Conditional Visa Requirement',
  recommended: 'Strongly Recommended Cover',
};

export function clampTripDurationDays(days: number): number {
  if (!Number.isFinite(days)) return 14;
  return Math.max(1, Math.min(365, Math.round(days)));
}

export function clampTravellerCount(count: number): number {
  if (!Number.isFinite(count)) return 1;
  return Math.max(1, Math.min(10, Math.round(count)));
}

export function getDurationBandLabel(days: number): string {
  if (days <= 15) return 'Short-Stay (1–15 days)';
  if (days <= 30) return 'Standard Stay (16–30 days)';
  if (days <= 90) return 'Extended Stay (31–90 days)';
  return 'Long-Stay / Multi-Month (91+ days)';
}

export function recommendTravelInsurance(
  input: TravelInsuranceAdvisorInput,
): TravelInsuranceRecommendation {
  const destination =
    ADVISOR_DESTINATIONS.find((d) => d.id === input.destinationId) ?? ADVISOR_DESTINATIONS[0];
  const tripDays = clampTripDurationDays(input.tripDays);
  const travellers = clampTravellerCount(input.travellers);
  const ageOption = AGE_BAND_OPTIONS.find((a) => a.id === input.ageBandId) ?? AGE_BAND_OPTIONS[0];
  const visaOption =
    VISA_REQUIREMENT_OPTIONS.find((v) => v.id === input.visaRequirementId) ??
    VISA_REQUIREMENT_OPTIONS[0];

  // Determine recommended tier & compliance level
  let recommendedTierId: RecommendedTierId = destination.defaultTierId;
  let complianceLevel: ComplianceLevel = destination.baseCompliance;
  let minimumMedicalCeiling = destination.minimumMedicalCeiling;
  let territoryWording = destination.territoryWording;

  const isSchengenFiling =
    destination.id === 'schengen' || input.visaRequirementId === 'schengen-embassy';

  if (isSchengenFiling) {
    complianceLevel = 'mandatory';
    if (destination.id === 'schengen') {
      recommendedTierId = 'ins-schengen';
      minimumMedicalCeiling = '€30,000+ Emergency Medical';
      territoryWording = 'All Schengen Member States';
    } else {
      // Multi-region trip that also requires Schengen embassy compliance
      recommendedTierId = 'ins-worldwide';
      minimumMedicalCeiling = 'USD 100,000+ (Exceeds €30,000 Schengen Min.)';
      territoryWording = 'Worldwide Including All Schengen States';
    }
  }

  if (input.visaRequirementId === 'student-long' && (destination.id === 'australia-nz' || destination.id === 'uk' || destination.id === 'schengen')) {
    complianceLevel = 'mandatory';
  }

  if (input.visaRequirementId === 'family-senior' && destination.id === 'canada' && tripDays >= 90) {
    complianceLevel = 'mandatory';
  }

  // Buffer days for midnight connections / Schengen grace recommendations
  let bufferDays = destination.defaultBufferDays;
  if (isSchengenFiling && tripDays <= 90) {
    bufferDays = 5;
  } else if (tripDays > 180) {
    bufferDays = 0;
  }
  const recommendedPolicyDays = Math.min(365, tripDays + bufferDays);

  // Build tailored embassy / certificate wording checklist
  const certificateChecklist: string[] = [];

  if (isSchengenFiling) {
    certificateChecklist.push(
      'Territory line explicitly reads "Schengen States" (valid across every member state, not a single country).',
    );
    certificateChecklist.push(
      'Minimum €30,000 emergency medical care, hospitalisation, and medical repatriation printed clearly in EUR.',
    );
    certificateChecklist.push(
      `Zero-gap coverage from Pakistan departure through return arrival (${recommendedPolicyDays} policy days including ${bufferDays}-day Schengen grace buffer).`,
    );
  } else {
    certificateChecklist.push(
      `Medical limit of ${minimumMedicalCeiling} with 24/7 international emergency assistance hotline on the certificate.`,
    );
    certificateChecklist.push(
      'Emergency medical evacuation and repatriation of remains explicitly listed in the benefit schedule.',
    );
    certificateChecklist.push(
      `Passport-exact traveller spelling and uninterrupted dates covering ${recommendedPolicyDays} days (${tripDays} trip days${bufferDays > 0 ? ` + ${bufferDays}-day flight buffer` : ''}).`,
    );
  }

  if (input.includeZeroDeductible || isSchengenFiling) {
    certificateChecklist.push(
      'Zero-deductible or low-deductible wording verified to match strict embassy & visa-centre preferences.',
    );
  }

  if (input.visaRequirementId === 'business-messe') {
    certificateChecklist.push(
      'Flight delay, missed connection, and checked baggage protection included for tight trade-fair schedules.',
    );
  }

  if (input.includeTripCancellation) {
    certificateChecklist.push(
      'Enhanced trip cancellation & written date-amendment / visa-refusal refund terms confirmed prior to issuance.',
    );
  }

  // Build tailored underwriting & practical advisories
  const underwritingNotes: string[] = [destination.visaRuleSummary];

  if (input.visaRequirementId === 'student-long') {
    underwritingNotes.push(
      'Student & long-stay filings often require country-specific statutory health cover (such as Australian OSHC, UK IHS, or German incoming + statutory student insurance). Verify exact university and embassy rules before buying.',
    );
  }

  if (tripDays > 90) {
    underwritingNotes.push(
      'Trips exceeding 90 consecutive days require a long-stay or annual multi-trip schedule check—standard single-trip leisure certificates often cap continuous stays at 90 days.',
    );
  }

  if (input.ageBandId === '60-69' || input.ageBandId === '70-plus') {
    underwritingNotes.push(
      'Travellers aged 60+ are quoted under senior age bands with specific medical sub-limits. Standard short-term policies exclude undeclared pre-existing conditions—disclose medical history before issuance.',
    );
  }

  if (input.includeAdventureCover || destination.id === 'nepal-srilanka') {
    underwritingNotes.push(
      'Standard leisure plans usually exclude high-altitude trekking above 3,000m, winter skiing, and helicopter rescue—request an explicit adventure sports endorsement if applicable.',
    );
  }

  if (travellers > 1) {
    underwritingNotes.push(
      `Family / group filing (${travellers} travellers): verify whether individual embassy certificates per passport number are required by your visa centre.`,
    );
  }

  const tier = TIER_CATALOG[recommendedTierId];
  const durationBandLabel = getDurationBandLabel(tripDays);
  const premiumGuidance = `${SITE_CONFIG.confirmFallback} — licensed underwriter PKR quotes depend strictly on traveller age band (${ageOption.shortLabel}), exact trip dates (${recommendedPolicyDays} policy days), and zone.`;

  const briefLines = [
    `VISAHOUSE — TRAVEL INSURANCE ADVISOR BRIEF (${destination.isoCode})`,
    `Destination: ${destination.label}`,
    `Visa / Trip Requirement: ${visaOption.label}`,
    `Trip Duration: ${tripDays} days (Recommended Policy Window: ${recommendedPolicyDays} days)`,
    `Travellers: ${travellers} · Age Band: ${ageOption.label}`,
    `Recommended Tier: ${tier.name}`,
    `Compliance Status: ${COMPLIANCE_LABELS[complianceLevel]}`,
    `Minimum Medical Ceiling: ${minimumMedicalCeiling}`,
    `Territory Wording: ${territoryWording}`,
    `Options: ${[
      input.includeZeroDeductible ? 'Zero-deductible preferred' : null,
      input.includeTripCancellation ? 'Trip cancellation add-on' : null,
      input.includeAdventureCover ? 'Adventure / high-altitude endorsement' : null,
    ]
      .filter(Boolean)
      .join(', ') || 'Standard medical & repatriation schedule'}`,
    `Premium Quote: ${SITE_CONFIG.confirmFallback} (licensed PKR schedule confirmed before issue)`,
    `Note: ${SITE_CONFIG.disclaimer}`,
  ];

  return {
    destination,
    recommendedTierId,
    recommendedTierName: tier.name,
    tierTagline: tier.tagline,
    complianceLevel,
    complianceLabel: COMPLIANCE_LABELS[complianceLevel],
    minimumMedicalCeiling,
    territoryWording,
    tripDays,
    bufferDays,
    recommendedPolicyDays,
    durationBandLabel,
    travellers,
    ageBandLabel: ageOption.label,
    visaRequirementLabel: visaOption.label,
    certificateChecklist,
    underwritingNotes,
    premiumGuidance,
    briefText: briefLines.join('\n'),
  };
}
