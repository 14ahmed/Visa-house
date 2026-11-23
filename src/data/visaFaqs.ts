import type { FaqItem } from './types';

export type VisaFaqCategory = 'timelines' | 'documents';

export interface PakistaniVisaFaqItem extends FaqItem {
  id: string;
  category: VisaFaqCategory;
  categoryLabel: string;
  keyStandard: string;
}

export const VISA_FAQ_CATEGORIES: readonly {
  id: 'all' | VisaFaqCategory;
  label: string;
}[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'timelines', label: 'Application Timelines' },
  { id: 'documents', label: 'Document Requirements' },
];

export const PAKISTANI_VISA_FAQS: readonly PakistaniVisaFaqItem[] = [
  {
    id: 'lead-time-by-region',
    category: 'timelines',
    categoryLabel: 'Application Timelines',
    question: 'How early should Pakistani passport holders apply before their travel date?',
    answer:
      'Lead times depend heavily on the submission channel. For Schengen Type-C visas, applications may generally be lodged up to six months ahead, and starting 10 to 14 weeks early is prudent before summer or Eid travel peaks so you can secure a legitimate VFS Global or BLS appointment. Embassy sticker visas such as Japan or South Korea are best initiated 6 to 8 weeks ahead, Southeast Asian and Gulf e-Visas 3 to 4 weeks ahead, and US B1/B2 interviews several months in advance due to Islamabad and Karachi waitlists.',
    keyStandard: 'Plan 3–4 weeks for e-Visas, 6–8 weeks for embassy drop-box, and 10–14+ weeks for Schengen.',
  },
  {
    id: 'channel-timeline-difference',
    category: 'timelines',
    categoryLabel: 'Application Timelines',
    question: 'How do timelines differ between e-Visas, embassy drop-boxes, and biometric centres?',
    answer:
      'Online e-Visa portals (such as Malaysia, Indonesia, Singapore, Bahrain, or Uzbekistan) review digital uploads without taking your physical passport, so turnaround begins as soon as the portal payment clears. Embassy drop-box missions (such as Japan and South Korea) assess physical paper visa files and return passports through their designated counter or courier. Biometric visa centres (Schengen VFS/BLS, UK, USA) require booking an in-person slot first—embassy processing only starts after your biometrics and physical folder are logged.',
    keyStandard: 'Embassy processing clocks start after biometrics or physical drop-off, not on form completion.',
  },
  {
    id: 'passport-retention-during-review',
    category: 'timelines',
    categoryLabel: 'Application Timelines',
    question: 'Does my Pakistani passport remain with the embassy during visa processing?',
    answer:
      'Yes for sticker visas—including Schengen missions, Japan, South Korea, and the United States—your original passport stays with the embassy or consulate until a decision is stamped and dispatched. For pure e-Visas, you retain your passport throughout review. Avoid scheduling back-to-back international trips or purchasing non-refundable airline tickets while your passport is lodged.',
    keyStandard: 'Keep travel flexible whenever an embassy holds your original passport for sticker issuance.',
  },
  {
    id: 'seasonal-delays-pakistan',
    category: 'timelines',
    categoryLabel: 'Application Timelines',
    question: 'What causes unexpected visa delays for applicants filing from Pakistan?',
    answer:
      'Common bottlenecks include public holidays in both Pakistan and the destination country, Eid and summer peak caseload surges, bank-statement verification inquiries, and provincial jurisdiction errors between Islamabad and Karachi missions. Incomplete PDF scans, mismatched hotel dates, or missing employer leave confirmations also trigger document holdbacks that add days or weeks to an otherwise routine file.',
    keyStandard: 'Clean pre-submission audits eliminate avoidable holdbacks and resubmission cycles.',
  },
  {
    id: 'passport-validity-pages',
    category: 'documents',
    categoryLabel: 'Document Requirements',
    question: 'What passport validity and blank page requirements apply to Pakistani passports?',
    answer:
      'Most Asian, Gulf, and global destinations require your Pakistani passport to have at least six months of remaining validity from your entry or return date, plus at least two consecutive blank visa pages. Schengen missions require validity of at least three months beyond your planned exit from the Schengen Area and an issue date within the past ten years. Always include clear colour copies of prior visas and entry/exit stamps from current and expired passports to support your travel history.',
    keyStandard: 'Minimum 6 months validity (3 months post-exit for Schengen) + 2 clean blank pages.',
  },
  {
    id: 'bank-statement-financial-proof',
    category: 'documents',
    categoryLabel: 'Document Requirements',
    question: 'What bank statement and tax records do embassies expect from Pakistan?',
    answer:
      'Embassies typically ask for a stamped six-month personal bank statement (plus company statement for business owners) showing steady income, regular operating activity, and a closing balance proportionate to your trip length, paired with a signed Account Maintenance Certificate (AMC) on bank letterhead. Adding your FBR NTN registration and recent Income Tax Returns reinforces financial credibility. Avoid sudden, unexplained cash deposits shortly before lodging your file.',
    keyStandard: '6-month stamped bank statement + Account Maintenance Certificate + FBR NTN / tax returns.',
  },
  {
    id: 'employment-business-nadra-ties',
    category: 'documents',
    categoryLabel: 'Document Requirements',
    question: 'Which employment, business, and NADRA civil documents prove ties to Pakistan?',
    answer:
      'Salaried applicants should provide an original Employer No Objection Certificate (NOC) on company letterhead confirming job title, tenure, salary, and approved leave dates, accompanied by the last three salary slips. Self-employed applicants should include business NTN, Chamber of Commerce or SECP incorporation records, and business letterhead. To document family ties, include valid CNIC copies, a NADRA Family Registration Certificate (FRC), Marriage Registration Certificate (MRC) for spouses, and B-Form / school NOC for travelling children.',
    keyStandard: 'Pair occupation proof (NOC or SECP/Chamber) with NADRA CNIC and Family Registration Certificate.',
  },
  {
    id: 'insurance-itinerary-arrival-cards',
    category: 'documents',
    categoryLabel: 'Document Requirements',
    question: 'Are travel insurance, hotel bookings, and flight reservations required before approval?',
    answer:
      'For Schengen applications, travel medical insurance covering at least €30,000 in emergency medical care and repatriation across all Schengen member states for your entire trip is strictly mandatory at submission. Most embassies accept verifiable flight reservations and refundable hotel bookings aligned day-by-day with your cover letter—do not buy non-refundable flights unless a specific mission requires it. After approval, remember pre-flight digital arrival cards (such as Malaysia MDAC, Singapore SGAC, Visit Japan Web, or Philippines eTravel).',
    keyStandard: 'Schengen requires €30,000 medical & repatriation cover; match every hotel night to your itinerary.',
  },
];

export function filterVisaFaqs(
  items: readonly PakistaniVisaFaqItem[],
  category: 'all' | VisaFaqCategory,
): PakistaniVisaFaqItem[] {
  if (category === 'all') {
    return [...items];
  }
  return items.filter((item) => item.category === category);
}
