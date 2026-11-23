/**
 * Central editable configuration for Visahouse.
 * Update these values before production launch.
 */
export const SITE_CONFIG = {
  brandName: 'Visahouse',
  tagline: 'Every visa under one roof.',
  passportAudience: 'Pakistan',
  passportAdjective: 'Pakistani',
  currency: 'PKR',
  domain: 'amgvisa.com',
  siteUrl: 'https://amgvisa.com',
  whatsappDisplay: '+92 331 8877655',
  whatsappNumber: '923318877655',
  email: 'info@visahouse.online',
  officeHours: 'Monday to Saturday, 10:00 – 19:00 PKT',
  responseExpectation: 'Same-day document check via WhatsApp or email',
  disclaimer:
    'Visahouse is a private consultancy, not a government body or embassy. Final decisions rest with the authorities.',
  confirmFallback: 'Confirm with our team',
  guideReviewDateIso: '2026-11-23',
  guideReviewDateLabel: 'November 2026',
  /** Optional zero-backend form endpoint (e.g. Formspree or Web3Forms URL) to email leads to info@visahouse.online */
  leadFormEndpoint: '',
} as const;

export const EDITORIAL_IMAGES = {
  desk: {
    src: '/src/assets/images/editorial_passport_desk_1795385383765.avif',
    width: 1200,
    height: 900,
    alt: 'Visahouse Pakistan visa desk with passport application file, route map, pen, and verification stamp',
  },
  airport: {
    src: '/src/assets/images/editorial_airport_departure_1795385384640.avif',
    width: 1408,
    height: 768,
    alt: 'International airport departure terminal for Pakistani travellers heading to Europe and worldwide destinations',
  },
  asiaSkyline: {
    src: '/src/assets/images/editorial_asia_skyline_1795385383837.avif',
    width: 1200,
    height: 900,
    alt: 'Asian temple skyline beside river and bridge representing Asia tourist and business visas from Pakistan',
  },
} as const;
