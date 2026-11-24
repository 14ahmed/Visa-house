export type RegionId =
  | 'Southeast Asia'
  | 'South Asia'
  | 'East Asia'
  | 'Central Asia & Gulf'
  | 'North America'
  | 'Europe & UK'
  | 'Oceania'
  | 'Africa';

export type VisaChannel = 'e-Visa' | 'Sticker / Embassy' | 'Hybrid / Centre' | 'Interview / Consulate';

export interface VisaSlipFacts {
  visaType: string;
  entryType: string;
  stayDuration: string;
  validity: string;
  processingTime: string;
  govtFee: string;
  ourFee: string;
  lastVerified: string;
  mrzLine1: string;
  mrzLine2: string;
}

export interface ChecklistGroup {
  groupTitle: string;
  items: {
    id: string;
    label: string;
    detail: string;
    mandatory?: boolean;
  }[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  youDo: string;
  weDo: string;
}

export interface RefusalReason {
  title: string;
  cause: string;
  prevention: string;
}

export interface PackageTier {
  id: string;
  tabLabel: string;
  title: string;
  bestFor: string;
  serviceFee: string;
  turnaroundNote: string;
  includes: string[];
  excludesNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LocalNotes {
  overview: string[];
  bestSeasonTitle: string;
  bestSeasonBody: string;
  citiesTitle: string;
  citiesBody: string;
  entryTipsTitle: string;
  entryTipsBody: string;
}

export interface UsaGuidance {
  visitorOverview: string;
  ds160Steps: { title: string; detail: string }[];
  interviewPrepPoints: { title: string; detail: string }[];
}

export interface KeywordContentBlock {
  heading: string;
  keywordFocus: string;
  body: string;
}

export interface CountryKeywordGuide {
  sectionHeading: string;
  intro: string;
  primaryKeywords: string[];
  blocks: KeywordContentBlock[];
}

export interface DestinationData {
  slug: string;
  country: string;
  isoCode: string;
  region: RegionId;
  channel: VisaChannel;
  accentHex: string;
  stampLabel: string;
  stampRotation: number;
  heroPromise: string;
  seoTitle: string;
  seoDescription: string;
  facts: VisaSlipFacts;
  whoCanApply: {
    intro: string;
    profiles: string[];
    eligibilityNote: string;
  };
  checklist: ChecklistGroup[];
  steps: ProcessStep[];
  refusalReasons: RefusalReason[];
  localNotes: LocalNotes;
  packages: PackageTier[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  usaGuidance?: UsaGuidance;
  seoKeywordGuide?: CountryKeywordGuide;
}

export interface LeadFormInput {
  fullName: string;
  whatsapp: string;
  destination: string;
  passportNationality: string;
  travelMonth: string;
  applicantProfile?: string;
  travelHistory?: string;
  priorRefusal?: string;
  notes: string;
  website?: string; // honeypot field
  selectedPackage?: string;
}

export interface LeadValidationResult {
  valid: boolean;
  isSpam: boolean;
  errors: Partial<Record<keyof LeadFormInput, string>>;
}
