export type TestimonialRegionId = 'schengen-west' | 'east-asia' | 'southeast-asia';

export interface VisaSuccessStory {
  id: string;
  regionId: TestimonialRegionId;
  regionLabel: string;
  caseCode: string;
  isoCode: string;
  destination: string;
  visaGranted: string;
  filingChannel: string;
  turnaroundNote: string;
  applicantName: string;
  applicantRole: string;
  city: string;
  quote: string;
  dossierHighlight: string;
  accentHex: string;
}

export const TESTIMONIAL_REGIONS: readonly {
  id: 'all' | TestimonialRegionId;
  label: string;
}[] = [
  { id: 'all', label: 'All Stories' },
  { id: 'schengen-west', label: 'Schengen & USA' },
  { id: 'east-asia', label: 'East Asia' },
  { id: 'southeast-asia', label: 'Southeast Asia' },
];

/**
 * Curated applicant visa success stories illustrating Visahouse's filing workflow.
 * Copy reflects documented clerical preparation and never promises guaranteed approvals.
 */
export const VISA_SUCCESS_STORIES: readonly VisaSuccessStory[] = [
  {
    id: 'story-schengen-lhr',
    regionId: 'schengen-west',
    regionLabel: 'Schengen & West',
    caseCode: 'CASE · SCH-418',
    isoCode: 'SCH',
    destination: 'Italy & France (Schengen)',
    visaGranted: '30-Day Multiple-Entry Type-C Sticker',
    filingChannel: 'Official VFS Global · Lahore',
    turnaroundNote: 'Issued 14 working days post-biometrics',
    applicantName: 'Dr. Saad Mahmood',
    applicantRole: 'Consultant Physician',
    city: 'Lahore',
    quote:
      'Visahouse caught our Main-Destination mismatch, aligned our Rome and Paris hotel nights, and got our family multi-entry Schengen stickers on the first filing.',
    dossierHighlight: 'Main-Destination audit + matched €30,000 insurance schedule',
    accentHex: '#0F5C4B',
  },
  {
    id: 'story-usa-isb',
    regionId: 'schengen-west',
    regionLabel: 'Schengen & West',
    caseCode: 'CASE · USA-209',
    isoCode: 'USA',
    destination: 'United States',
    visaGranted: '5-Year B1/B2 Visitor Visa',
    filingChannel: 'U.S. Embassy Consular Interview · Islamabad',
    turnaroundNote: 'Approved at counter following prep session',
    applicantName: 'Kamran & Hina Qureshi',
    applicantRole: 'Textile Export Directors',
    city: 'Faisalabad',
    quote:
      'After an earlier solo refusal, they rebuilt our DS-160 around verified corporate tax ties and coached us clearly—both 5-year US visas were approved at the window.',
    dossierHighlight: 'Refusal gap diagnosis + DS-160 & mock interview coaching',
    accentHex: '#2C4A63',
  },
  {
    id: 'story-japan-isb',
    regionId: 'east-asia',
    regionLabel: 'East Asia',
    caseCode: 'CASE · JPN-312',
    isoCode: 'JPN',
    destination: 'Japan',
    visaGranted: '90-Day Temporary Visitor Sticker',
    filingChannel: 'Embassy Consular Counter · Islamabad',
    turnaroundNote: 'Passport returned with sticker in 7 working days',
    applicantName: 'Nadia Kamran',
    applicantRole: 'Senior UX Lead',
    city: 'Islamabad',
    quote:
      'No empty promises—just sharp paperwork. My Schedule of Stay, FBR returns, and employer NOC were sequenced to embassy standards and my Japan sticker arrived in a week.',
    dossierHighlight: 'Taizai Yoteihyo itinerary + FBR & NOC verification',
    accentHex: '#8C3B2B',
  },
  {
    id: 'story-korea-khi',
    regionId: 'east-asia',
    regionLabel: 'East Asia',
    caseCode: 'CASE · KOR-174',
    isoCode: 'KOR',
    destination: 'South Korea',
    visaGranted: 'C-3-9 Short-Stay Tourist Visa',
    filingChannel: 'Consulate General Drop-Off · Karachi',
    turnaroundNote: 'Approved 9 working days after submission',
    applicantName: 'Zainab Mansoor',
    applicantRole: 'Supply Chain Manager',
    city: 'Karachi',
    quote:
      'They confirmed Karachi consular jurisdiction, backed up a bonus deposit with salary slips, and our Seoul tourist visas came back stamped without a single query.',
    dossierHighlight: 'Jurisdiction verification + salary-slip deposit provenance',
    accentHex: '#3A5373',
  },
  {
    id: 'story-thailand-khi',
    regionId: 'southeast-asia',
    regionLabel: 'Southeast Asia',
    caseCode: 'CASE · THA-504',
    isoCode: 'THA',
    destination: 'Thailand',
    visaGranted: '60-Day Tourist e-Visa (TR)',
    filingChannel: 'Official Royal Thai e-Visa Portal',
    turnaroundNote: 'Electronic grant emailed ahead of departure',
    applicantName: 'Tariq & Mehwish Siddiqui',
    applicantRole: 'Architects',
    city: 'Karachi',
    quote:
      'They audited every bank line, caught a date typo in our Phuket booking, and compiled crisp portal uploads the same afternoon—both Thai e-Visas cleared smoothly.',
    dossierHighlight: 'Bank-line review + high-DPI e-Visa scan formatting',
    accentHex: '#0F5C4B',
  },
  {
    id: 'story-malaysia-sgp-lhr',
    regionId: 'southeast-asia',
    regionLabel: 'Southeast Asia',
    caseCode: 'CASE · MYS-629',
    isoCode: 'MYS',
    destination: 'Malaysia & Singapore',
    visaGranted: 'Dual e-Visa Approvals + Arrival Cards',
    filingChannel: 'Official e-Visa Portals · Online Desk',
    turnaroundNote: 'Both e-Visas issued within 5 working days',
    applicantName: 'Hamza & Sana Farooq',
    applicantRole: 'Software Consultants',
    city: 'Multan',
    quote:
      'Filing online from Multan, we cleared both Malaysia and Singapore e-Visas in five working days and received our MDAC and SGAC QR codes before boarding.',
    dossierHighlight: 'Twin-country routing + pre-flight MDAC / SGAC prep',
    accentHex: '#7A5422',
  },
];

export function filterTestimonialsByRegion(
  stories: readonly VisaSuccessStory[],
  region: 'all' | TestimonialRegionId,
): VisaSuccessStory[] {
  if (region === 'all') {
    return [...stories];
  }
  return stories.filter((story) => story.regionId === region);
}
