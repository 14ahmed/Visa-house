import type { VisaTypeId } from './checklistLibrary';
import { VISA_TYPE_OPTIONS } from './checklistLibrary';
import { SITE_CONFIG } from '../config/site';
import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';
import { calculateVisaCost } from './visaCostCalculator';

export interface FeeEstimatorDestinationOption {
  id: string;
  label: string;
  countryName: string;
  isoCode: string;
}

const EXTRA_POPULAR_DESTINATIONS: readonly FeeEstimatorDestinationOption[] = [
  { id: 'uae', label: 'United Arab Emirates (ARE)', countryName: 'United Arab Emirates', isoCode: 'ARE' },
  { id: 'saudi-arabia', label: 'Saudi Arabia (SAU)', countryName: 'Saudi Arabia', isoCode: 'SAU' },
];

export const FEE_ESTIMATOR_DESTINATIONS: readonly FeeEstimatorDestinationOption[] = [
  { id: 'schengen', label: 'Schengen Area (Type-C · 29 States)', countryName: 'Schengen Area', isoCode: 'SCH' },
  ...DESTINATIONS.filter((d) => d.slug !== 'schengen-states').map((d) => ({
    id: d.slug,
    label: `${d.country} (${d.isoCode})`,
    countryName: d.country,
    isoCode: d.isoCode,
  })),
  ...EXTRA_POPULAR_DESTINATIONS,
];

export const APPLICANT_CITY_OPTIONS = [
  { id: 'islamabad', label: 'Islamabad / Federal & KP Desk' },
  { id: 'lahore', label: 'Lahore / Punjab Desk' },
  { id: 'karachi', label: 'Karachi / Sindh & Balochistan Desk' },
] as const;

export type ApplicantCityId = (typeof APPLICANT_CITY_OPTIONS)[number]['id'];

export interface VisaFeeEstimateRequest {
  destination: string;
  visaType: VisaTypeId | string;
  applicantCity?: string;
}

export interface VisaFeeEstimateResult {
  destination: string;
  visaTypeLabel: string;
  passportNationality: string;
  approximateGovtFee: string;
  approximatePkrEquivalent: string;
  serviceCentreFeeNote: string;
  standardProcessingWindow: string;
  expressOrPriorityNote: string;
  validityAndStayHint: string;
  officialChannel: string;
  feeDrivers: string[];
  advisoryNote: string;
  retrievedAt: string;
  model: string;
}

export interface FeeEstimatorValidationResult {
  valid: boolean;
  error?: string;
  normalized?: {
    destination: string;
    visaTypeId: string;
    visaTypeLabel: string;
    applicantCityLabel: string;
  };
}

/**
 * Resolves a human-readable visa type label from either a known VisaTypeId or freeform label.
 */
export function resolveVisaTypeLabel(visaType: string): string {
  const trimmed = visaType.trim();
  const matched = VISA_TYPE_OPTIONS.find(
    (opt) => opt.id === trimmed || opt.label.toLowerCase() === trimmed.toLowerCase(),
  );
  return matched ? matched.label : trimmed || VISA_TYPE_OPTIONS[0].label;
}

/**
 * Validates and normalizes inputs for the Visa Fee Estimator API and UI form.
 */
export function validateFeeEstimatorInput(
  input: Partial<VisaFeeEstimateRequest>,
): FeeEstimatorValidationResult {
  const destinationRaw = (input.destination ?? '').trim();
  if (!destinationRaw) {
    return {
      valid: false,
      error: 'Please choose or enter a destination country (e.g. Japan, Schengen Area, United States).',
    };
  }
  if (destinationRaw.length < 2 || destinationRaw.length > 80) {
    return {
      valid: false,
      error: 'Destination country must be between 2 and 80 characters.',
    };
  }
  if (/[<>{}`]/.test(destinationRaw)) {
    return {
      valid: false,
      error: 'Destination contains unsupported characters.',
    };
  }

  const visaTypeRaw = (input.visaType ?? '').trim();
  if (!visaTypeRaw) {
    return {
      valid: false,
      error: 'Please select a visa category.',
    };
  }

  const cityMatched = APPLICANT_CITY_OPTIONS.find(
    (c) => c.id === input.applicantCity || c.label === input.applicantCity,
  );

  return {
    valid: true,
    normalized: {
      destination: destinationRaw,
      visaTypeId: visaTypeRaw,
      visaTypeLabel: resolveVisaTypeLabel(visaTypeRaw),
      applicantCityLabel: cityMatched ? cityMatched.label : 'Pakistan (All Submission Desks)',
    },
  };
}

/**
 * Builds the structured Gemini prompt for Pakistani passport holders.
 */
export function buildVisaFeePrompt(input: {
  destination: string;
  visaTypeLabel: string;
  applicantCityLabel: string;
}): string {
  return [
    `Provide approximate official visa fee and processing time estimates for a Pakistani passport holder applying from Pakistan (${input.applicantCityLabel}).`,
    `Target Destination: ${input.destination}`,
    `Visa Category: ${input.visaTypeLabel}`,
    '',
    'Requirements:',
    '1. Clearly separate the approximate embassy/government visa fee (in original official currency such as USD, EUR, JPY, or AED) from estimated PKR conversion range.',
    '2. Mention mandatory third-party visa centre or biometric service charges (such as VFS Global, BLS International, Gerrys/FedEx, or portal processing fees) separately where applicable.',
    '3. Provide realistic approximate embassy/consulate processing windows in working days or weeks, explicitly noting peak-season variation.',
    '4. Never promise guaranteed visa issuance or claim fixed unchangeable rates; advise confirming exact fee circulars at booking.',
  ].join('\n');
}

/**
 * Safely parses and validates the structured JSON returned by Gemini for the fee estimator.
 */
export function parseGeminiFeeEstimate(
  rawJsonText: string,
  meta: {
    destination: string;
    visaTypeLabel: string;
    model: string;
    retrievedAt?: string;
  },
): VisaFeeEstimateResult {
  const cleaned = rawJsonText
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  let parsed: Record<string, unknown>;
  try {
    const candidate = JSON.parse(cleaned);
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      throw new Error('Expected JSON object');
    }
    parsed = candidate as Record<string, unknown>;
  } catch {
    throw new Error('Received an unreadable fee estimate payload from Gemini. Please try again.');
  }

  const readField = (key: string, fallback: string): string => {
    const val = parsed[key];
    return typeof val === 'string' && val.trim() ? val.trim() : fallback;
  };

  const govtFee = readField('approximateGovtFee', '');
  const processing = readField('standardProcessingWindow', '');
  if (!govtFee || !processing) {
    throw new Error('Gemini returned an incomplete estimate (missing fee or processing timeline).');
  }

  const rawDrivers = Array.isArray(parsed.feeDrivers) ? parsed.feeDrivers : [];
  const feeDrivers = rawDrivers
    .filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
    .map((entry) => entry.trim())
    .slice(0, 5);

  return {
    destination: meta.destination,
    visaTypeLabel: meta.visaTypeLabel,
    passportNationality: SITE_CONFIG.passportAudience,
    approximateGovtFee: govtFee,
    approximatePkrEquivalent: readField(
      'approximatePkrEquivalent',
      'Varies with SBP / bank exchange rate on filing day',
    ),
    serviceCentreFeeNote: readField(
      'serviceCentreFeeNote',
      'Additional VFS/BLS/courier charges apply if filed via an authorised visa centre.',
    ),
    standardProcessingWindow: processing,
    expressOrPriorityNote: readField(
      'expressOrPriorityNote',
      'Priority / expedite lanes depend on destination mission policy—confirm live before travel.',
    ),
    validityAndStayHint: readField(
      'validityAndStayHint',
      'Issued validity and authorised stay length remain at consular officer discretion.',
    ),
    officialChannel: readField(
      'officialChannel',
      'Official Embassy / Consulate, Authorised Visa Centre, or Government e-Visa Portal',
    ),
    feeDrivers:
      feeDrivers.length > 0
        ? feeDrivers
        : [
            'Exchange rate movements between PKR and the embassy billing currency.',
            'Authorised visa-centre biometrics, courier return, or SMS charges.',
          ],
    advisoryNote: readField(
      'advisoryNote',
      'Approximate consular guidance only—confirm exact fee circulars and appointment windows before paying.',
    ),
    retrievedAt: meta.retrievedAt ?? new Date().toISOString(),
    model: meta.model,
  };
}

const VALID_VISA_TYPE_IDS = new Set<string>(VISA_TYPE_OPTIONS.map((opt) => opt.id));

function formatPkrRange(basePkr: number): string {
  const low = Math.max(1000, Math.round((basePkr * 0.94) / 500) * 500);
  const high = Math.max(low + 1000, Math.round((basePkr * 1.08) / 500) * 500);
  return `Approx. PKR ${low.toLocaleString('en-US')} – PKR ${high.toLocaleString('en-US')} (subject to bank/SBP exchange rate)`;
}

/**
 * Computes a deterministic client-side visa fee & processing estimate from
 * Visahouse's curated consular dataset (no backend API required).
 */
export function buildLocalVisaFeeEstimate(
  input: VisaFeeEstimateRequest,
): VisaFeeEstimateResult {
  const validation = validateFeeEstimatorInput(input);
  if (!validation.valid || !validation.normalized) {
    throw new Error(validation.error ?? 'Please enter a valid destination and visa type.');
  }

  const { destination, visaTypeId, visaTypeLabel, applicantCityLabel } = validation.normalized;
  const normalizedLower = destination.toLowerCase();
  const safeVisaTypeId: VisaTypeId = VALID_VISA_TYPE_IDS.has(visaTypeId)
    ? (visaTypeId as VisaTypeId)
    : 'tourist';

  const matchedDestination =
    normalizedLower.includes('schengen')
      ? DESTINATIONS.find((d) => d.slug === 'schengen-states')
      : DESTINATIONS.find(
          (d) =>
            d.country.toLowerCase() === normalizedLower ||
            d.slug.toLowerCase() === normalizedLower ||
            d.isoCode.toLowerCase() === normalizedLower,
        );

  if (matchedDestination) {
    const calc = calculateVisaCost({
      destinationSlug: matchedDestination.slug,
      visaTypeId: safeVisaTypeId,
      applicants: 1,
      includeTravelInsurance: false,
      includeExpressAudit: false,
    });

    const centreNote =
      calc.centrePerApplicantPkr > 0
        ? `${calc.centreProviderLabel}: approx. PKR ${calc.centrePerApplicantPkr.toLocaleString('en-US')} charged separately for biometrics, handling, or courier return.`
        : `${calc.centreProviderLabel}: no separate third-party visa-centre surcharge typically applies; portal payment or card FX fees may still apply.`;

    return {
      destination: matchedDestination.country,
      visaTypeLabel,
      passportNationality: SITE_CONFIG.passportAudience,
      approximateGovtFee: calc.officialCurrencyNote,
      approximatePkrEquivalent: formatPkrRange(calc.embassyPerApplicantPkr),
      serviceCentreFeeNote: centreNote,
      standardProcessingWindow: calc.processingWindowEstimate,
      expressOrPriorityNote:
        matchedDestination.channel === 'e-Visa'
          ? 'Online e-Visa portals occasionally offer priority lanes depending on nationality and season; confirm at filing.'
          : 'Standard embassy/consulate processing applies; priority slots (where offered) carry separate mission surcharges.',
      validityAndStayHint:
        safeVisaTypeId === 'student'
          ? 'Typically aligned with course duration or initial academic term at consular discretion.'
          : 'Commonly 30–90 days stay window or multi-entry validity depending on travel history and mission discretion.',
      officialChannel: `${calc.centreProviderLabel} (${applicantCityLabel})`,
      feeDrivers: [
        'Daily bank / SBP exchange rate between PKR and the embassy currency.',
        'Single-entry vs. multiple-entry visa and visa-centre biometric or courier charges.',
        'Peak travel season appointment queues and embassy verification time.',
        'Extra document costs (travel insurance, translations, or attestations).',
      ],
      advisoryNote:
        'These are rough estimates based on Visahouse reference rates—always confirm the latest embassy fees before paying.',
      retrievedAt: new Date().toISOString(),
      model: 'local-consular-schedule',
    };
  }

  return {
    destination,
    visaTypeLabel,
    passportNationality: SITE_CONFIG.passportAudience,
    approximateGovtFee: 'Varies by embassy rules (usually USD 60 – USD 185 equivalent)',
    approximatePkrEquivalent: 'Approx. PKR 17,000 – PKR 52,000 (depends on embassy fee & exchange rate)',
    serviceCentreFeeNote:
      'VFS Global, BLS International, Gerrys/FedEx, or online portal service fees may apply separately.',
    standardProcessingWindow: '10 – 25 working days after biometrics or online submission',
    expressOrPriorityNote:
      'Urgent or priority processing depends on the embassy—confirm live with our team before booking flights.',
    validityAndStayHint:
      'Visa validity and allowed stay are always decided by the embassy visa officer.',
    officialChannel: `Embassy / Consulate or Authorised Visa Centre (${applicantCityLabel})`,
    feeDrivers: [
      'Official embassy fee for Pakistani passport holders and entry type.',
      'Daily exchange rate between PKR and the embassy currency.',
      'Visa-centre biometric, SMS, and courier charges.',
      'Busy-season appointment waitlists and verification time.',
    ],
    advisoryNote:
      'This country is not in our quick list yet. Confirm exact live embassy fees and appointment dates with our team on WhatsApp before paying.',
    retrievedAt: new Date().toISOString(),
    model: 'local-consular-schedule',
  };
}
