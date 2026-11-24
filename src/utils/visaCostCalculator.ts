import { SITE_CONFIG } from '../config/site';
import {
  DESTINATION_SUMMARIES as DESTINATIONS,
  getDestinationSummaryBySlug as getDestinationBySlug,
} from '../data/destinationIndex';
import type { DestinationData, RegionId, VisaChannel } from '../data/types';
import { VISA_TYPE_OPTIONS, type VisaTypeId } from './checklistLibrary';

export type CalculatorCurrency = 'PKR' | 'USD';

export interface CalculatorAddOnOption {
  id: 'travel_insurance' | 'express_audit';
  label: string;
  description: string;
  pricePerApplicantPkr: number;
}

export const CALCULATOR_ADDONS: readonly CalculatorAddOnOption[] = [
  {
    id: 'travel_insurance',
    label: 'Compliant Travel Medical Insurance',
    description: '15-day €30,000+ Schengen / worldwide medical & emergency repatriation policy estimate.',
    pricePerApplicantPkr: 6500,
  },
  {
    id: 'express_audit',
    label: 'Priority 24-Hour Dossier Audit',
    description: 'Expedited same-day bank-statement audit, cover-letter drafting, and upload prep.',
    pricePerApplicantPkr: 7500,
  },
];

export interface VisaCostCalculatorInput {
  destinationSlug: string;
  visaTypeId: VisaTypeId;
  applicants: number;
  includeTravelInsurance?: boolean;
  includeExpressAudit?: boolean;
}

export interface VisaCostLineItem {
  id: string;
  label: string;
  detail: string;
  perApplicantPkr: number;
  subtotalPkr: number;
  perApplicantUsd: number;
  subtotalUsd: number;
  category: 'embassy' | 'centre' | 'service' | 'addon';
}

export interface VisaCostEstimate {
  destinationSlug: string;
  destinationName: string;
  isoCode: string;
  region: RegionId;
  channel: VisaChannel;
  accentHex: string;
  visaTypeId: VisaTypeId;
  visaTypeLabel: string;
  applicants: number;
  officialCurrencyNote: string;
  centreProviderLabel: string;
  processingWindowEstimate: string;
  embassyPerApplicantPkr: number;
  embassySubtotalPkr: number;
  centrePerApplicantPkr: number;
  centreSubtotalPkr: number;
  serviceBasePerApplicantPkr: number;
  serviceSubtotalPkr: number;
  groupSavingsPkr: number;
  addOnsSubtotalPkr: number;
  grandTotalPkr: number;
  grandTotalUsd: number;
  perApplicantAveragePkr: number;
  perApplicantAverageUsd: number;
  lineItems: VisaCostLineItem[];
  notes: string[];
  exchangeRateNotice: string;
}

/**
 * Indicative reference FX table (PKR per 1 unit of foreign currency).
 * Used purely for transparent calculator estimates; live rates are verified on filing day.
 */
export const REFERENCE_FX_TO_PKR = {
  USD: 278,
  EUR: 302,
  GBP: 354,
  CAD: 202,
  AUD: 182,
  NZD: 166,
  JPY: 1.85,
  SGD: 208,
  MYR: 63,
  BHD: 738,
  ZAR: 15.5,
} as const;

type BillingCurrency = keyof typeof REFERENCE_FX_TO_PKR;

interface DestinationFeeSchedule {
  currency: BillingCurrency;
  /** Official government / embassy fee per applicant by visa category (in billing currency). */
  embassyFeeByType: Record<VisaTypeId, number>;
  /** Biometrics, VFS/BLS/Gerry's, or official e-Visa gateway handling fee per applicant in PKR. */
  centreFeePkr: number;
  centreProviderLabel: string;
  /** Base Visahouse consultancy service charge per primary applicant (Tourist baseline) in PKR. */
  baseServiceFeePkr: number;
  processingWindowEstimate: string;
  specialNote?: string;
}

const SCHENGEN_BASE_SCHEDULE: DestinationFeeSchedule = {
  currency: 'EUR',
  embassyFeeByType: {
    tourist: 90,
    business: 90,
    family_visit: 90,
    student: 85,
    transit: 90,
  },
  centreFeePkr: 11500,
  centreProviderLabel: 'VFS Global / BLS International / Authorised Visa Centre',
  baseServiceFeePkr: 28000,
  processingWindowEstimate: '15–30 calendar days after biometrics',
  specialNote:
    'Uniform Schengen Type-C fee is €90 for adults (reduced €45 for ages 6–12, waived under 6). National D student fees vary slightly by member state.',
};

const FEE_SCHEDULES: Record<string, DestinationFeeSchedule> = {
  // Southeast Asia
  thailand: {
    currency: 'USD',
    embassyFeeByType: { tourist: 40, business: 80, family_visit: 40, student: 80, transit: 35 },
    centreFeePkr: 3500,
    centreProviderLabel: 'Royal Thai e-Visa Portal / Authorised Drop-Off Handling',
    baseServiceFeePkr: 14500,
    processingWindowEstimate: '5–10 working days',
    specialNote: 'Tourist (TR) single-entry baseline; Non-Immigrant B/ED categories carry higher mission fees.',
  },
  malaysia: {
    currency: 'MYR',
    embassyFeeByType: { tourist: 125, business: 145, family_visit: 125, student: 160, transit: 105 },
    centreFeePkr: 0,
    centreProviderLabel: 'Direct Official Malaysia eVISA Portal (No VFS Fee)',
    baseServiceFeePkr: 10500,
    processingWindowEstimate: '3–7 working days',
    specialNote: 'Includes official MYR 20 visa fee plus mandatory MYR 105 eVISA portal processing surcharge.',
  },
  indonesia: {
    currency: 'USD',
    embassyFeeByType: { tourist: 65, business: 105, family_visit: 65, student: 120, transit: 50 },
    centreFeePkr: 0,
    centreProviderLabel: 'Official Directorate General of Immigration e-Visa Portal',
    baseServiceFeePkr: 11500,
    processingWindowEstimate: '5–8 working days',
    specialNote: 'C1 Tourist and C2 Business e-Visa rates reflect standard Immigration PNBP portal tariffs.',
  },
  singapore: {
    currency: 'SGD',
    embassyFeeByType: { tourist: 30, business: 30, family_visit: 30, student: 45, transit: 30 },
    centreFeePkr: 6500,
    centreProviderLabel: 'ICA Authorised Visa Agent (AVA) Submission Fee',
    baseServiceFeePkr: 14000,
    processingWindowEstimate: '5–9 working days',
    specialNote: 'Requires Form V39A Letter of Introduction from a Singapore Citizen/PR or approved local sponsor.',
  },
  cambodia: {
    currency: 'USD',
    embassyFeeByType: { tourist: 36, business: 42, family_visit: 36, student: 42, transit: 36 },
    centreFeePkr: 0,
    centreProviderLabel: 'Official MFAIC Cambodia e-Visa Portal',
    baseServiceFeePkr: 8500,
    processingWindowEstimate: '3–5 working days',
    specialNote: 'Official portal fee includes $30 visa fee + $6 government processing surcharge.',
  },
  philippines: {
    currency: 'USD',
    embassyFeeByType: { tourist: 40, business: 40, family_visit: 40, student: 60, transit: 40 },
    centreFeePkr: 2500,
    centreProviderLabel: 'Embassy of the Philippines Islamabad / Courier Handling',
    baseServiceFeePkr: 15500,
    processingWindowEstimate: '7–14 working days',
    specialNote: '9(a) Temporary Visitor single-entry sticker baseline; multiple-entry validity carries higher consular tariffs.',
  },

  // South Asia
  'sri-lanka': {
    currency: 'USD',
    embassyFeeByType: { tourist: 20, business: 30, family_visit: 20, student: 50, transit: 0 },
    centreFeePkr: 0,
    centreProviderLabel: 'Official Sri Lanka Department of Immigration ETA Portal',
    baseServiceFeePkr: 8500,
    processingWindowEstimate: '2–4 working days',
    specialNote: 'Reflects SAARC-nationality ETA tariff for Pakistani passport holders (48-hour transit ETA is free of govt fee).',
  },
  nepal: {
    currency: 'USD',
    embassyFeeByType: { tourist: 30, business: 50, family_visit: 30, student: 50, transit: 5 },
    centreFeePkr: 2000,
    centreProviderLabel: 'Embassy of Nepal Islamabad Counter / Courier Handling',
    baseServiceFeePkr: 11000,
    processingWindowEstimate: '4–7 working days',
    specialNote: '30-day tourist baseline shown; SAARC first-visit-in-calendar-year gratis rules may reduce the embassy fee.',
  },

  // Central Asia & Gulf
  uzbekistan: {
    currency: 'USD',
    embassyFeeByType: { tourist: 20, business: 60, family_visit: 40, student: 50, transit: 20 },
    centreFeePkr: 3000,
    centreProviderLabel: 'Uzbekistan E-VISA Portal / Islamabad Embassy Handling',
    baseServiceFeePkr: 13500,
    processingWindowEstimate: '5–10 working days',
    specialNote: 'Single-entry e-Visa baseline; some itineraries require MFA telex / LOI sponsorship clearance.',
  },
  bahrain: {
    currency: 'BHD',
    embassyFeeByType: { tourist: 13, business: 19, family_visit: 13, student: 25, transit: 9 },
    centreFeePkr: 0,
    centreProviderLabel: 'Official NPRA Bahrain eVisa Portal',
    baseServiceFeePkr: 10500,
    processingWindowEstimate: '3–7 working days',
    specialNote: 'Includes BHD 4 non-refundable application fee + BHD 9 two-week tourist visa issuance fee.',
  },

  // East Asia
  japan: {
    currency: 'JPY',
    embassyFeeByType: { tourist: 3000, business: 3000, family_visit: 3000, student: 3000, transit: 700 },
    centreFeePkr: 4500,
    centreProviderLabel: 'Embassy Islamabad / Consulate Karachi Authorised Drop-Off',
    baseServiceFeePkr: 18500,
    processingWindowEstimate: '6–12 working days',
    specialNote: 'Japanese mission fees are modest (JPY 3,000 single entry), but Schedule of Stay and bank-line scrutiny is strict.',
  },
  'south-korea': {
    currency: 'USD',
    embassyFeeByType: { tourist: 40, business: 40, family_visit: 40, student: 60, transit: 40 },
    centreFeePkr: 3500,
    centreProviderLabel: 'Embassy Islamabad / Consulate Karachi Visa Submission',
    baseServiceFeePkr: 17500,
    processingWindowEstimate: '8–15 working days',
    specialNote: 'C-3-9 single-entry short-stay (up to 90 days) baseline; multiple-entry C-3 tariffs are higher.',
  },

  // North America
  usa: {
    currency: 'USD',
    embassyFeeByType: { tourist: 185, business: 185, family_visit: 185, student: 185, transit: 185 },
    centreFeePkr: 0,
    centreProviderLabel: 'U.S. Embassy Islamabad / Consulate Karachi (MRV Fee)',
    baseServiceFeePkr: 29500,
    processingWindowEstimate: 'Appointment wait varies; 5–15 working days post-interview',
    specialNote: 'MRV fee ($185) is non-refundable. F-1 students also pay a separate SEVIS I-901 fee directly to DHS.',
  },
  canada: {
    currency: 'CAD',
    embassyFeeByType: { tourist: 185, business: 185, family_visit: 185, student: 235, transit: 85 },
    centreFeePkr: 5500,
    centreProviderLabel: 'VFS Global Canada VAC (Biometrics & Passport Transmission)',
    baseServiceFeePkr: 31000,
    processingWindowEstimate: '4–10 weeks (IRCC processing times fluctuate)',
    specialNote: 'Includes CAD 100 TRV application fee + CAD 85 IRCC biometrics fee (Study Permit CAD 150 + CAD 85).',
  },

  // UK & Oceania
  uk: {
    currency: 'GBP',
    embassyFeeByType: { tourist: 135, business: 135, family_visit: 135, student: 558, transit: 35 },
    centreFeePkr: 9500,
    centreProviderLabel: 'VFS Global UK Visa Application Centre (Islamabad · Lahore · Karachi · Mirpur)',
    baseServiceFeePkr: 29000,
    processingWindowEstimate: '15–21 working days (Standard UKVI)',
    specialNote:
      '6-month Standard Visitor (£135) and Student (£558) per official GOV.UK tariffs; UK Student applicants also pay the Immigration Health Surcharge (IHS).',
  },
  australia: {
    currency: 'AUD',
    embassyFeeByType: { tourist: 250, business: 250, family_visit: 250, student: 2500, transit: 0 },
    centreFeePkr: 10500,
    centreProviderLabel: 'VFS Global Australia Biometrics Collection Centre',
    baseServiceFeePkr: 30000,
    processingWindowEstimate: '3–6 weeks via ImmiAccount',
    specialNote:
      'Subclass 600 Visitor Visa (AUD 250) and Subclass 500 Student (AUD 2,500) online via ImmiAccount plus mandatory in-person biometrics in Pakistan.',
  },
  'new-zealand': {
    currency: 'NZD',
    embassyFeeByType: { tourist: 441, business: 441, family_visit: 441, student: 850, transit: 235 },
    centreFeePkr: 6000,
    centreProviderLabel: 'Immigration New Zealand Online Portal / VAC Passport Check',
    baseServiceFeePkr: 27500,
    processingWindowEstimate: '4–7 weeks via INZ Online',
    specialNote:
      'Visitor fee (NZD 441) combines NZD 300 application fee + NZD 41 immigration levy + NZD 100 IVL; Fee-Paying Student baseline is NZD 850 per Immigration New Zealand.',
  },

  // Schengen States + 15 Schengen countries
  'schengen-states': SCHENGEN_BASE_SCHEDULE,
  germany: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'German Missions Waitlist / Consular Services Portal & Authorised VAC (Islamabad · Karachi jurisdiction)',
    processingWindowEstimate: '15–30 calendar days post-appointment',
  },
  france: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global France (Islamabad · Lahore · Karachi)',
  },
  greece: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Greece / Embassy of Greece Islamabad',
  },
  portugal: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Portugal / Consular Representation Desk',
  },
  hungary: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Hungary (Islamabad · Lahore · Karachi)',
  },
  poland: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'Embassy of Poland Islamabad (e-Konsulat / VFS)',
  },
  netherlands: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Netherlands (Islamabad · Lahore · Karachi)',
  },
  norway: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Norway (Islamabad · Lahore · Karachi)',
  },
  denmark: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Denmark (Islamabad · Lahore · Karachi)',
  },
  belgium: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Belgium (Islamabad · Lahore · Karachi)',
  },
  luxembourg: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global / Belgian-Represented Luxembourg Desk',
  },
  finland: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Finland (Islamabad · Lahore · Karachi)',
  },
  sweden: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Sweden / Embassy Representation Desk',
  },
  switzerland: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Switzerland (Islamabad · Lahore · Karachi)',
  },
  austria: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'VFS Global Austria (Islamabad · Lahore · Karachi)',
  },
  italy: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'Embassy of Italy Islamabad / Consulate Karachi & VAC',
  },
  spain: {
    ...SCHENGEN_BASE_SCHEDULE,
    centreProviderLabel: 'BLS International Spain (Islamabad · Lahore · Karachi)',
  },
  turkey: {
    currency: 'USD',
    embassyFeeByType: { tourist: 60, business: 60, family_visit: 60, student: 60, transit: 60 },
    centreFeePkr: 16500,
    centreProviderLabel: 'Anatolia Visa Application Centre (Islamabad · Lahore · Karachi)',
    baseServiceFeePkr: 18500,
    processingWindowEstimate: '10–15 working days (sticker) · 1–3 days (qualifying e-Visa)',
    specialNote: 'Standard applicants apply via Anatolia VAC; valid US/UK/Schengen/Ireland visa holders may qualify for Turkey e-Visa.',
  },
  azerbaijan: {
    currency: 'USD',
    embassyFeeByType: { tourist: 26, business: 26, family_visit: 26, student: 26, transit: 26 },
    centreFeePkr: 0,
    centreProviderLabel: 'Official Azerbaijan ASAN e-Visa Portal',
    baseServiceFeePkr: 7500,
    processingWindowEstimate: '3 working days (Standard) · 3–5 hours (Urgent)',
    specialNote: 'Official ASAN standard e-Visa is USD 26 (urgent 3-hour lane is higher). No embassy visit required.',
  },

  // Africa
  egypt: {
    currency: 'USD',
    embassyFeeByType: { tourist: 30, business: 60, family_visit: 30, student: 45, transit: 25 },
    centreFeePkr: 3000,
    centreProviderLabel: 'Embassy of Egypt Islamabad Drop-Off & Handling',
    baseServiceFeePkr: 14500,
    processingWindowEstimate: '7–14 working days',
    specialNote: 'Sticker visa filed in advance via the Embassy of Egypt in Islamabad; allow extra lead time for security clearance.',
  },
  morocco: {
    currency: 'EUR',
    embassyFeeByType: { tourist: 25, business: 35, family_visit: 25, student: 40, transit: 20 },
    centreFeePkr: 3000,
    centreProviderLabel: 'Embassy of Morocco Islamabad Consular Section',
    baseServiceFeePkr: 15500,
    processingWindowEstimate: '10–15 working days',
    specialNote: 'Short-stay tourist sticker tariff paid in PKR equivalent as per current mission circular.',
  },
  kenya: {
    currency: 'USD',
    embassyFeeByType: { tourist: 33, business: 33, family_visit: 33, student: 50, transit: 33 },
    centreFeePkr: 0,
    centreProviderLabel: 'Official Republic of Kenya eTA Portal',
    baseServiceFeePkr: 9500,
    processingWindowEstimate: '3–5 working days',
    specialNote: 'Standard Kenya eTA online fee is ~$32.50 (rounded to $33 for budgeting); Yellow Fever rules apply if transiting endemic hubs.',
  },
  'south-africa': {
    currency: 'ZAR',
    embassyFeeByType: { tourist: 425, business: 425, family_visit: 425, student: 425, transit: 425 },
    centreFeePkr: 11000,
    centreProviderLabel: 'VFS Global South Africa / Gerry’s Visa Centre',
    baseServiceFeePkr: 17500,
    processingWindowEstimate: '10–20 working days',
    specialNote: 'Embassy fee is modest (ZAR 425), with mandatory VFS service charges and Yellow Fever / bank-statement verification.',
  },
  zimbabwe: {
    currency: 'USD',
    embassyFeeByType: { tourist: 30, business: 45, family_visit: 30, student: 50, transit: 30 },
    centreFeePkr: 0,
    centreProviderLabel: 'Official Zimbabwe Immigration e-Visa Portal',
    baseServiceFeePkr: 10500,
    processingWindowEstimate: '5–10 working days',
    specialNote: 'Category C Pakistani passport holders must secure advance e-Visa clearance before boarding.',
  },
};

const VISA_TYPE_SERVICE_ADJUSTMENT_PKR: Record<VisaTypeId, number> = {
  tourist: 0,
  business: 3500,
  family_visit: 2000,
  student: 6000,
  transit: -3000,
};

const GROUP_ADDITIONAL_DISCOUNT_RATE = 0.15;

export function roundToNearestHundred(amount: number): number {
  return Math.round(amount / 100) * 100;
}

export function clampApplicants(count: number): number {
  if (!Number.isFinite(count)) return 1;
  return Math.min(10, Math.max(1, Math.round(count)));
}

export function pkrToUsd(pkr: number): number {
  return Math.round(pkr / REFERENCE_FX_TO_PKR.USD);
}

export function formatCurrencyAmount(amountPkr: number, currency: CalculatorCurrency): string {
  if (currency === 'USD') {
    const usd = pkrToUsd(amountPkr);
    return `USD ${usd.toLocaleString('en-US')}`;
  }
  return `PKR ${Math.round(amountPkr).toLocaleString('en-US')}`;
}

export function getCostCalculatorSchedule(slug: string): DestinationFeeSchedule {
  return FEE_SCHEDULES[slug] ?? FEE_SCHEDULES['schengen-states'];
}

export function hasFeeScheduleForAllDestinations(destinations: readonly DestinationData[]): boolean {
  return destinations.every((d) => Boolean(FEE_SCHEDULES[d.slug]));
}

/**
 * Pure calculation engine for the interactive Visa Cost Calculator.
 * Combines indicative embassy fees, visa-centre/biometric handling, Visahouse
 * consultancy charges (with multi-applicant family/group discount), and optional add-ons.
 */
export function calculateVisaCost(input: VisaCostCalculatorInput): VisaCostEstimate {
  const destination =
    getDestinationBySlug(input.destinationSlug) ??
    getDestinationBySlug('schengen-states') ??
    DESTINATIONS[0];

  const visaOption =
    VISA_TYPE_OPTIONS.find((opt) => opt.id === input.visaTypeId) ?? VISA_TYPE_OPTIONS[0];
  const applicants = clampApplicants(input.applicants);
  const schedule = getCostCalculatorSchedule(destination.slug);

  const officialFeeAmount = schedule.embassyFeeByType[visaOption.id] ?? schedule.embassyFeeByType.tourist;
  const fxRate = REFERENCE_FX_TO_PKR[schedule.currency];
  const embassyPerApplicantPkr =
    officialFeeAmount === 0 ? 0 : roundToNearestHundred(officialFeeAmount * fxRate);
  const embassySubtotalPkr = embassyPerApplicantPkr * applicants;

  const centrePerApplicantPkr = schedule.centreFeePkr;
  const centreSubtotalPkr = centrePerApplicantPkr * applicants;

  const adjustedServiceBasePkr = Math.max(
    5500,
    schedule.baseServiceFeePkr + (VISA_TYPE_SERVICE_ADJUSTMENT_PKR[visaOption.id] ?? 0),
  );

  // First applicant pays 100% of consultancy fee; additional companions in the same file save 15% on service charge.
  const additionalApplicants = Math.max(0, applicants - 1);
  const additionalServicePerApplicantPkr = roundToNearestHundred(
    adjustedServiceBasePkr * (1 - GROUP_ADDITIONAL_DISCOUNT_RATE),
  );
  const serviceSubtotalPkr =
    adjustedServiceBasePkr + additionalApplicants * additionalServicePerApplicantPkr;
  const undiscountedServicePkr = adjustedServiceBasePkr * applicants;
  const groupSavingsPkr = Math.max(0, undiscountedServicePkr - serviceSubtotalPkr);

  const officialCurrencyNote =
    officialFeeAmount === 0
      ? `${schedule.currency} 0 (Govt fee waived for this category)`
      : `${schedule.currency} ${officialFeeAmount.toLocaleString('en-US')} / applicant`;

  const lineItems: VisaCostLineItem[] = [
    {
      id: 'embassy-fee',
      label: 'Embassy / Government Visa Fee',
      detail: `${officialCurrencyNote} · Paid to mission / official portal`,
      perApplicantPkr: embassyPerApplicantPkr,
      subtotalPkr: embassySubtotalPkr,
      perApplicantUsd: pkrToUsd(embassyPerApplicantPkr),
      subtotalUsd: pkrToUsd(embassySubtotalPkr),
      category: 'embassy',
    },
    {
      id: 'centre-fee',
      label: 'Visa Centre / Biometrics / Portal Handling',
      detail: schedule.centreProviderLabel,
      perApplicantPkr: centrePerApplicantPkr,
      subtotalPkr: centreSubtotalPkr,
      perApplicantUsd: pkrToUsd(centrePerApplicantPkr),
      subtotalUsd: pkrToUsd(centreSubtotalPkr),
      category: 'centre',
    },
    {
      id: 'service-charge',
      label: `${SITE_CONFIG.brandName} Service Charge`,
      detail:
        applicants > 1
          ? `Dossier audit, form drafting & filing (${Math.round(GROUP_ADDITIONAL_DISCOUNT_RATE * 100)}% companion savings applied)`
          : 'Line-by-line bank audit, form drafting, itinerary & submission guidance',
      perApplicantPkr: Math.round(serviceSubtotalPkr / applicants),
      subtotalPkr: serviceSubtotalPkr,
      perApplicantUsd: pkrToUsd(Math.round(serviceSubtotalPkr / applicants)),
      subtotalUsd: pkrToUsd(serviceSubtotalPkr),
      category: 'service',
    },
  ];

  let addOnsSubtotalPkr = 0;

  if (input.includeTravelInsurance) {
    const opt = CALCULATOR_ADDONS[0];
    const subtotalPkr = opt.pricePerApplicantPkr * applicants;
    addOnsSubtotalPkr += subtotalPkr;
    lineItems.push({
      id: opt.id,
      label: opt.label,
      detail: opt.description,
      perApplicantPkr: opt.pricePerApplicantPkr,
      subtotalPkr,
      perApplicantUsd: pkrToUsd(opt.pricePerApplicantPkr),
      subtotalUsd: pkrToUsd(subtotalPkr),
      category: 'addon',
    });
  }

  if (input.includeExpressAudit) {
    const opt = CALCULATOR_ADDONS[1];
    const subtotalPkr = opt.pricePerApplicantPkr * applicants;
    addOnsSubtotalPkr += subtotalPkr;
    lineItems.push({
      id: opt.id,
      label: opt.label,
      detail: opt.description,
      perApplicantPkr: opt.pricePerApplicantPkr,
      subtotalPkr,
      perApplicantUsd: pkrToUsd(opt.pricePerApplicantPkr),
      subtotalUsd: pkrToUsd(subtotalPkr),
      category: 'addon',
    });
  }

  const grandTotalPkr =
    embassySubtotalPkr + centreSubtotalPkr + serviceSubtotalPkr + addOnsSubtotalPkr;
  const grandTotalUsd = pkrToUsd(grandTotalPkr);
  const perApplicantAveragePkr = Math.round(grandTotalPkr / applicants);
  const perApplicantAverageUsd = pkrToUsd(perApplicantAveragePkr);

  const notes: string[] = [];
  if (schedule.specialNote) {
    notes.push(schedule.specialNote);
  }
  notes.push(
    'Pakistani bank cards used on online mission portals (GOV.UK, IRCC, ImmiAccount, e-Visa) typically incur an additional ~4–5% international FX conversion, FED, and withholding markup on bank billing day.',
  );
  notes.push(
    'Embassy and visa-centre fees are non-refundable once submitted, regardless of the consular outcome.',
  );

  return {
    destinationSlug: destination.slug,
    destinationName: destination.country,
    isoCode: destination.isoCode,
    region: destination.region,
    channel: destination.channel,
    accentHex: destination.accentHex,
    visaTypeId: visaOption.id,
    visaTypeLabel: visaOption.label,
    applicants,
    officialCurrencyNote,
    centreProviderLabel: schedule.centreProviderLabel,
    processingWindowEstimate: schedule.processingWindowEstimate,
    embassyPerApplicantPkr,
    embassySubtotalPkr,
    centrePerApplicantPkr,
    centreSubtotalPkr,
    serviceBasePerApplicantPkr: adjustedServiceBasePkr,
    serviceSubtotalPkr,
    groupSavingsPkr,
    addOnsSubtotalPkr,
    grandTotalPkr,
    grandTotalUsd,
    perApplicantAveragePkr,
    perApplicantAverageUsd,
    lineItems,
    notes,
    exchangeRateNotice:
      schedule.currency === 'USD'
        ? `Indicative reference rate (USD 1 ≈ PKR ${REFERENCE_FX_TO_PKR.USD}). Confirm exact live rates before payment.`
        : `Indicative reference rate (${schedule.currency} 1 ≈ PKR ${fxRate}; USD 1 ≈ PKR ${REFERENCE_FX_TO_PKR.USD}). Confirm exact live rates before payment.`,
  };
}

/**
 * Formats a clean plain-text cost breakdown suitable for clipboard copy or WhatsApp inquiry.
 */
export function formatCostEstimateSummary(
  estimate: VisaCostEstimate,
  currency: CalculatorCurrency,
): string {
  const lines = [
    `${SITE_CONFIG.brandName.toUpperCase()} — VISA COST ESTIMATE (${estimate.isoCode})`,
    `Destination: ${estimate.destinationName} (${estimate.region})`,
    `Visa Type: ${estimate.visaTypeLabel}`,
    `Applicants: ${estimate.applicants} (${SITE_CONFIG.passportAdjective} Passport)`,
    `Channel: ${estimate.channel}`,
    '',
    'ESTIMATED BREAKDOWN:',
    ...estimate.lineItems.map(
      (item) => `- ${item.label}: ${formatCurrencyAmount(item.subtotalPkr, currency)}`,
    ),
    '',
    `ESTIMATED TOTAL: ${formatCurrencyAmount(estimate.grandTotalPkr, currency)}`,
    ...(estimate.applicants > 1
      ? [`Per Applicant Avg: ${formatCurrencyAmount(estimate.perApplicantAveragePkr, currency)}`]
      : []),
    '',
    estimate.exchangeRateNotice,
    SITE_CONFIG.disclaimer,
  ];
  return lines.join('\n');
}
