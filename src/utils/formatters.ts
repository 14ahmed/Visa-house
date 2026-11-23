import { SITE_CONFIG } from '../config/site';
import type {
  DestinationData,
  LeadFormInput,
  LeadValidationResult,
  RegionId,
  VisaChannel,
} from '../data/types';

/**
 * Returns the trimmed regulated value, or "Confirm with our team"
 * when a fee, processing window, or legal figure is blank.
 */
export function formatRegulatedValue(value?: string | null): string {
  if (!value || !value.trim()) {
    return SITE_CONFIG.confirmFallback;
  }
  return value.trim();
}

/**
 * Builds a contextual wa.me link prefilled with the current page's destination.
 */
export function buildWhatsAppUrl(destinationLabel: string, customNote?: string): string {
  const digits = SITE_CONFIG.whatsappNumber.replace(/[^\d]/g, '');
  const baseMessage = customNote
    ? customNote
    : `Hello Visahouse, I hold a ${SITE_CONFIG.passportAdjective} passport and would like guidance on ${destinationLabel}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(baseMessage)}`;
}

/**
 * Validates the Visahouse lead capture form and detects honeypot triggers.
 */
export function validateLeadForm(input: LeadFormInput): LeadValidationResult {
  if (input.website && input.website.trim().length > 0) {
    return { valid: false, isSpam: true, errors: {} };
  }

  const errors: Partial<Record<keyof LeadFormInput, string>> = {};

  const trimmedName = input.fullName.trim();
  if (!trimmedName) {
    errors.fullName = 'Please enter your full name as it appears on your passport.';
  } else if (trimmedName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const trimmedWhatsapp = input.whatsapp.trim();
  if (!trimmedWhatsapp) {
    errors.whatsapp = 'Please enter your WhatsApp number.';
  } else if (!/^\d+$/.test(trimmedWhatsapp)) {
    errors.whatsapp = 'WhatsApp number must contain digits only (e.g. 923001234567).';
  } else if (trimmedWhatsapp.length < 10 || trimmedWhatsapp.length > 15) {
    errors.whatsapp =
      'WhatsApp number must be between 10 and 15 digits (including country code).';
  }

  if (!input.destination.trim()) {
    errors.destination = 'Please select a destination or service.';
  }

  const trimmedPassport = input.passportNationality.trim();
  if (!trimmedPassport) {
    errors.passportNationality = 'Please specify your passport nationality.';
  } else if (trimmedPassport.length < 2) {
    errors.passportNationality = 'Passport nationality must be at least 2 characters.';
  }

  if (!input.travelMonth.trim()) {
    errors.travelMonth = 'Please select your planned travel month.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    isSpam: false,
    errors,
  };
}

/**
 * Pure filter function for the /visas directory page.
 */
export function filterDestinations(
  destinations: readonly DestinationData[],
  options: {
    region: RegionId | 'All';
    channel: VisaChannel | 'All';
    query: string;
  },
): DestinationData[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  return destinations.filter((item) => {
    if (options.region !== 'All' && item.region !== options.region) {
      return false;
    }
    if (options.channel !== 'All' && item.channel !== options.channel) {
      return false;
    }
    if (normalizedQuery) {
      const searchable = [
        item.country,
        item.isoCode,
        item.region,
        item.channel,
        item.heroPromise,
        item.localNotes.citiesBody,
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(normalizedQuery);
    }
    return true;
  });
}

/**
 * Counts words in prose text (used to verify editorial depth).
 */
export function countWords(text: string): number {
  const cleaned = text.trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).length;
}

/**
 * Computes total unique narrative words across a destination entry.
 */
export function countDestinationNarrativeWords(dest: DestinationData): number {
  const sections = [
    dest.heroPromise,
    dest.whoCanApply.intro,
    dest.whoCanApply.eligibilityNote,
    ...dest.whoCanApply.profiles,
    ...dest.localNotes.overview,
    dest.localNotes.bestSeasonBody,
    dest.localNotes.citiesBody,
    dest.localNotes.entryTipsBody,
    ...dest.refusalReasons.flatMap((r) => [r.title, r.cause, r.prevention]),
    ...dest.steps.flatMap((s) => [s.title, s.youDo, s.weDo]),
    ...dest.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  return countWords(sections.join(' '));
}

/**
 * Generates travel month options starting from the current or upcoming months.
 */
export function getUpcomingTravelMonths(): string[] {
  return [
    'Flexible / Not Decided Yet',
    'December 2026',
    'January 2027',
    'February 2027',
    'March 2027',
    'April 2027',
    'May 2027',
    'June 2027',
    'July 2027',
    'August 2027',
    'September 2027',
    'October 2027',
    'November 2027',
  ];
}
