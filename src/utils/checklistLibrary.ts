import { SITE_CONFIG } from '../config/site';
import {
  CHECKLIST_DESTINATION_SOURCES,
  type ChecklistDestinationSource,
} from '../data/checklistsData';
import { SCHENGEN_DOCUMENTS } from '../data/services';
import type { ChecklistGroup } from '../data/types';

export interface NationalityOption {
  id: string;
  label: string;
  shortLabel: string;
  requiresVerificationAdvisory: boolean;
  advisoryDetail?: string;
}

export const NATIONALITY_OPTIONS: readonly NationalityOption[] = [
  {
    id: 'pakistan',
    label: 'Pakistan (Pakistani Passport)',
    shortLabel: 'Pakistani Passport',
    requiresVerificationAdvisory: false,
  },
  {
    id: 'pakistani-gcc-resident',
    label: 'Pakistan (Pakistani Passport + UAE / GCC Residency)',
    shortLabel: 'Pakistani Passport (GCC Resident)',
    requiresVerificationAdvisory: true,
    advisoryDetail:
      'Holding a valid UAE, Saudi, Qatar, Kuwait, Oman, or Bahrain residence visa can change submission jurisdiction (local embassy/visa centre in your country of residence vs Pakistan) or unlock select e-Visa/visa-on-arrival routes. Confirm live residency rules with our team before applying.',
  },
  {
    id: 'dual-national',
    label: 'Dual National (Pakistan + UK / US / EU / CA / AU)',
    shortLabel: 'Dual National',
    requiresVerificationAdvisory: true,
    advisoryDetail:
      'Entry rules, visa-free waivers, and ETA requirements depend strictly on the specific passport you will present at check-in and border control. Confirm with our team which passport you should travel on and whether e-authorisation applies.',
  },
  {
    id: 'foreign-resident-pk',
    label: 'Foreign National Residing in Pakistan (Valid PK Visa / POC)',
    shortLabel: 'Foreign Resident in Pakistan',
    requiresVerificationAdvisory: true,
    advisoryDetail:
      'Third-country nationals lodging applications from within Pakistan normally must include a valid Pakistani residence permit, long-term visa, or POC card alongside nationality-specific embassy forms. Confirm consular jurisdiction with our team first.',
  },
  {
    id: 'other',
    label: 'Other Passport Nationality (Specify Below)',
    shortLabel: 'Other Passport',
    requiresVerificationAdvisory: true,
    advisoryDetail:
      'The baseline checklist below reflects our Pakistan submission desk requirements. Because visa-free exemptions, e-Visa eligibility, and supporting bank rules vary strictly by passport nationality and residence status, confirm live requirements for your passport with our team.',
  },
];

export interface ChecklistDestinationOption {
  id: string;
  country: string;
  isoCode: string;
  accentHex: string;
  channel: string;
  detailPath: string;
  lastVerified: string;
  eligibilityNote: string;
  groups: ChecklistGroup[];
}

function buildSchengenChecklistGroups(): ChecklistGroup[] {
  return [
    {
      groupTitle: 'Application, Passport & Civil Identity',
      items: [
        {
          id: 'sch-form',
          label: 'Schengen Short-Stay (Type C) Application Form',
          detail: `${SCHENGEN_DOCUMENTS[0]}—verify portal QR barcode or matching signature on every page.`,
          mandatory: true,
        },
        {
          id: 'sch-passport',
          label: 'Original Valid Passport & Prior Visa Scans',
          detail:
            'Valid at least 3 months past intended Schengen exit with two blank visa pages, plus colour copies of prior Schengen/UK/US/other visas.',
          mandatory: true,
        },
        {
          id: 'sch-photos',
          label: 'Recent ICAO Biometric Photographs (2×)',
          detail:
            '35mm × 45mm crisp matte prints on a light neutral background, neutral expression, matching current mission specification.',
          mandatory: true,
        },
        {
          id: 'sch-nadra',
          label: 'National ID & Family Civil Ties (CNIC / FRC / Marriage)',
          detail:
            'Colour copy of CNIC (or valid residence ID), NADRA Family Registration Certificate (FRC), and Marriage Certificate / B-Form where applicable.',
          mandatory: true,
        },
      ],
    },
    {
      groupTitle: 'Travel Medical Insurance & Trip Itinerary',
      items: [
        {
          id: 'sch-insurance',
          label: 'Schengen-Compliant Travel Medical Insurance (€30,000+)',
          detail:
            'Must cover emergency hospitalisation & repatriation across all Schengen member states for every travel day with clean policy wording.',
          mandatory: true,
        },
        {
          id: 'sch-cover-letter',
          label: 'Cover Letter & Day-by-Day European Itinerary',
          detail:
            'Concise trip purpose note explaining your main destination (most nights), transport links, and funding source.',
          mandatory: true,
        },
        {
          id: 'sch-flights-hotels',
          label: 'Flight Reservation & Full Accommodation Bookings',
          detail:
            'Verifiable round-trip flight itinerary paired with hotel or host confirmations covering every night in the Schengen Area.',
          mandatory: true,
        },
      ],
    },
    {
      groupTitle: 'Financial, Tax & Employment Ties',
      items: [
        {
          id: 'sch-bank',
          label: 'Six-Month Bank Statement & Maintenance Letter',
          detail:
            'Bank-stamped personal statement showing consistent balance and income plus an Account Maintenance Certificate signed by the branch.',
          mandatory: true,
        },
        {
          id: 'sch-fbr',
          label: 'FBR NTN Registration & Recent Tax Returns',
          detail:
            'Active FBR taxpayer profile and filed income tax returns corroborating declared annual income and savings.',
          mandatory: true,
        },
        {
          id: 'sch-employment',
          label: 'Employer NOC & Pay Slips (or Business Registration)',
          detail:
            'Signed leave letter with salary slips for employees, or SECP incorporation / Chamber of Commerce / sole-proprietor evidence for owners.',
          mandatory: true,
        },
      ],
    },
  ];
}

function mapDestinationToChecklistOption(dest: ChecklistDestinationSource): ChecklistDestinationOption {
  return {
    id: dest.slug,
    country: dest.country,
    isoCode: dest.isoCode,
    accentHex: dest.accentHex,
    channel: dest.channel,
    detailPath: `/visas/${dest.slug}`,
    lastVerified: dest.lastVerified,
    eligibilityNote: dest.eligibilityNote,
    groups: dest.checklist,
  };
}

export const CHECKLIST_DESTINATIONS: ChecklistDestinationOption[] = [
  ...CHECKLIST_DESTINATION_SOURCES.map(mapDestinationToChecklistOption),
  {
    id: 'schengen',
    country: 'Schengen Area (Type-C)',
    isoCode: 'SCH',
    accentHex: '#0F5C4B',
    channel: 'Authorised Visa Centre (VFS / BLS)',
    detailPath: '/visas/schengen-states',
    lastVerified: 'Confirm mission checklist',
    eligibilityNote:
      'Apply through the mission of your main Schengen destination (longest overnight stay; or first entry if nights are split equally).',
    groups: buildSchengenChecklistGroups(),
  },
];

export type VisaTypeId = 'tourist' | 'business' | 'family_visit' | 'student' | 'transit';

export interface VisaTypeOption {
  id: VisaTypeId;
  label: string;
  shortLabel: string;
  advisoryNote?: string;
}

export const VISA_TYPE_OPTIONS: readonly VisaTypeOption[] = [
  {
    id: 'tourist',
    label: 'Tourist / Leisure Visit',
    shortLabel: 'Tourist',
  },
  {
    id: 'business',
    label: 'Business / Trade Visit',
    shortLabel: 'Business',
  },
  {
    id: 'family_visit',
    label: 'Family / Sponsored Visit',
    shortLabel: 'Family Visit',
  },
  {
    id: 'student',
    label: 'Student / Academic Filing',
    shortLabel: 'Student',
    advisoryNote:
      'Long-stay student visas (Type-D / national study permits) frequently require direct embassy attestation (HEC/IBCC/MOFA) and separate university sponsorship verification beyond standard tourist rules. Confirm your specific study category with our team before booking.',
  },
  {
    id: 'transit',
    label: 'Transit / Airport Stopover',
    shortLabel: 'Transit',
    advisoryNote:
      'Airside transit rules vary sharply by passport nationality, airline terminal transfer, and whether you hold a valid US/UK/Canada/Schengen visa. Confirm whether an Airport Transit Visa (ATV) or short-stay entry visa is required before ticketing.',
  },
];

function getVisaTypeTailoredGroup(
  visaTypeId: VisaTypeId,
  destination: ChecklistDestinationOption,
): ChecklistGroup | null {
  switch (visaTypeId) {
    case 'business':
      return {
        groupTitle: `Business & Trade Supporting Papers (${destination.country})`,
        items: [
          {
            id: `${destination.id}-biz-invitation`,
            label: 'Signed Host Company Invitation Letter (Official Letterhead)',
            detail:
              'Issued by the overseas partner, event organiser, or corporate host specifying meeting dates, invitee passport details, and expense coverage.',
            mandatory: true,
          },
          {
            id: `${destination.id}-biz-pak-ties`,
            label: 'Pakistani Employer Support Letter / SECP & Chamber Certificate',
            detail:
              'Authorisation letter on company letterhead for employees, or SECP incorporation, Chamber of Commerce membership, and FBR Active Taxpayer (ATL) status for proprietors.',
            mandatory: true,
          },
          {
            id: `${destination.id}-biz-funds`,
            label: 'Corporate Bank Statement & Recent Tax Return (if company-funded)',
            detail:
              'Six-month stamped business bank statement + Account Maintenance Certificate matching company signatory records.',
            mandatory: false,
          },
        ],
      };

    case 'family_visit':
      return {
        groupTitle: `Sponsor & Relationship Proof — Family Visit (${destination.country})`,
        items: [
          {
            id: `${destination.id}-fam-invite`,
            label: 'Signed Host Invitation Letter & Overseas Status Copy',
            detail:
              'Invitation letter signed by your relative or host abroad along with a clear scan of their valid passport and visa/residence permit or national ID.',
            mandatory: true,
          },
          {
            id: `${destination.id}-fam-nadra`,
            label: 'Official Kinship Proof (NADRA FRC / Nikahnama / Birth Certificate)',
            detail:
              'Government-issued NADRA Family Registration Certificate or attested marriage/birth certificate demonstrating relationship to the sponsor.',
            mandatory: true,
          },
          {
            id: `${destination.id}-fam-accom`,
            label: 'Host Accommodation & Sponsor Financial Proof (if sponsored)',
            detail:
              'Tenancy lease, property deed, or utility bill confirming stay address plus sponsor pay slips/bank statement if they fund the visit.',
            mandatory: false,
          },
        ],
      };

    case 'student':
      return {
        groupTitle: `Academic Admission & Funding Papers (${destination.country})`,
        items: [
          {
            id: `${destination.id}-stu-offer`,
            label: 'Unconditional Institutional Offer / Enrolment Confirmation',
            detail:
              'Official university or college acceptance letter detailing programme dates, campus address, and tuition fee breakdown.',
            mandatory: true,
          },
          {
            id: `${destination.id}-stu-attestation`,
            label: 'HEC / IBCC / MOFA Attested Transcripts & Language Scores',
            detail:
              'Verified academic certificates/degrees alongside official IELTS/TOEFL or institutional language waiver where required by the mission.',
            mandatory: true,
          },
          {
            id: `${destination.id}-stu-sponsor`,
            label: 'Tuition Receipt & Parental / Sponsor Bank Maintenance Evidence',
            detail:
              'Clear source-of-funds trail, parental bank statements, and signed financial sponsorship undertaking covering tuition and living expenses.',
            mandatory: true,
          },
        ],
      };

    case 'transit':
      return {
        groupTitle: `Onward Flight & Stopover Clearance (${destination.country})`,
        items: [
          {
            id: `${destination.id}-trn-onward`,
            label: 'Confirmed Onward Flight Ticket & Full Airline PNR',
            detail:
              'Complete e-ticket showing arrival into and confirmed departure out of the transit hub within the permitted layover window.',
            mandatory: true,
          },
          {
            id: `${destination.id}-trn-final-visa`,
            label: 'Valid Visa or Residence Permit for Final Destination Country',
            detail:
              'Clear copy of the valid visa, e-Visa, or entry authorisation proving lawful admission to your onward destination.',
            mandatory: true,
          },
          {
            id: `${destination.id}-trn-hotel`,
            label: 'Stopover Hotel Booking (if exiting airport overnight)',
            detail:
              'Required whenever baggage re-check, separate PNR ticketing, or overnight layover necessitates passing through immigration control.',
            mandatory: false,
          },
        ],
      };

    case 'tourist':
    default:
      return null;
  }
}

export interface ChecklistQueryInput {
  nationalityId?: string;
  customNationality?: string;
  visaTypeId?: VisaTypeId;
  destinationId: string;
}

export interface GeneratedChecklistDocument {
  destinationId: string;
  destinationName: string;
  isoCode: string;
  accentHex: string;
  channel: string;
  detailPath: string;
  visaTypeId: VisaTypeId;
  visaTypeLabel: string;
  visaTypeAdvisory: string | null;
  nationalityId: string;
  nationalityLabel: string;
  requiresVerificationAdvisory: boolean;
  advisoryText: string | null;
  lastVerified: string;
  eligibilityNote: string;
  groups: ChecklistGroup[];
  totalItems: number;
  coreItems: number;
  disclaimer: string;
}

/**
 * Generates a structured visa document checklist dossier tailored by visa type,
 * destination, and passport nationality for Pakistani applicants without
 * inventing foreign-embassy legal exemptions.
 */
export function buildVisaChecklistDocument(
  input: ChecklistQueryInput,
): GeneratedChecklistDocument {
  const nationalityPreset =
    NATIONALITY_OPTIONS.find((item) => item.id === (input.nationalityId ?? 'pakistan')) ??
    NATIONALITY_OPTIONS[0];
  const visaTypePreset =
    VISA_TYPE_OPTIONS.find((item) => item.id === (input.visaTypeId ?? 'tourist')) ??
    VISA_TYPE_OPTIONS[0];
  const normalizedDestinationId =
    input.destinationId === 'schengen-states' ? 'schengen' : input.destinationId;
  const destination =
    CHECKLIST_DESTINATIONS.find((item) => item.id === normalizedDestinationId) ??
    CHECKLIST_DESTINATIONS[0];

  const customTrimmed = (input.customNationality ?? '').trim();
  const nationalityLabel =
    nationalityPreset.id === 'other' && customTrimmed
      ? `${customTrimmed} Passport`
      : nationalityPreset.shortLabel;

  const extraForeignItemGroup: ChecklistGroup | null =
    nationalityPreset.id === 'foreign-resident-pk'
      ? {
          groupTitle: 'Residency Proof (Third-Country Applicants in Pakistan)',
          items: [
            {
              id: `${destination.id}-residency-pk`,
              label: 'Valid Pakistani residence permit / long-term visa / POC copy',
              detail:
                'Must confirm lawful stay in Pakistan covering application lodgement and passport return; confirm validity minimum with our desk.',
              mandatory: true,
            },
          ],
        }
      : null;

  const baseGroups = destination.groups.map((group) => ({
    groupTitle: group.groupTitle,
    items: group.items.map((item) => ({
      ...item,
      id: `${destination.id}-${visaTypePreset.id}-${nationalityPreset.id}-${item.id}`,
    })),
  }));

  const visaTypeExtra = getVisaTypeTailoredGroup(visaTypePreset.id, destination);

  const groups = [
    ...(visaTypeExtra ? [visaTypeExtra] : []),
    ...baseGroups,
    ...(extraForeignItemGroup ? [extraForeignItemGroup] : []),
  ];

  const totalItems = groups.reduce((sum, g) => sum + g.items.length, 0);
  const coreItems = groups.reduce(
    (sum, g) => sum + g.items.filter((item) => Boolean(item.mandatory)).length,
    0,
  );

  return {
    destinationId: destination.id,
    destinationName: destination.country,
    isoCode: destination.isoCode,
    accentHex: destination.accentHex,
    channel: destination.channel,
    detailPath: destination.detailPath,
    visaTypeId: visaTypePreset.id,
    visaTypeLabel: visaTypePreset.label,
    visaTypeAdvisory: visaTypePreset.advisoryNote ?? null,
    nationalityId: nationalityPreset.id,
    nationalityLabel,
    requiresVerificationAdvisory: nationalityPreset.requiresVerificationAdvisory,
    advisoryText: nationalityPreset.requiresVerificationAdvisory
      ? nationalityPreset.advisoryDetail ?? null
      : null,
    lastVerified: destination.lastVerified || SITE_CONFIG.confirmFallback,
    eligibilityNote: destination.eligibilityNote,
    groups,
    totalItems,
    coreItems,
    disclaimer: SITE_CONFIG.disclaimer,
  };
}

/**
 * Formats a generated checklist document into a clean archival .txt file
 * suitable for offline review, printing, or sharing via WhatsApp.
 */
export function formatChecklistForDownload(doc: GeneratedChecklistDocument): string {
  const divider = '========================================================================';
  const subDivider = '------------------------------------------------------------------------';

  const lines: string[] = [
    `${SITE_CONFIG.brandName.toUpperCase()} — VISA DOCUMENT CHECKLIST`,
    divider,
    `Destination       : ${doc.destinationName} (${doc.isoCode})`,
    `Visa Category     : ${doc.visaTypeLabel}`,
    `Passport Profile  : ${doc.nationalityLabel}`,
    `Submission Channel: ${doc.channel}`,
    `Checklist Items   : ${doc.totalItems} total (${doc.coreItems} core mandatory)`,
    `Last Verified Note: ${doc.lastVerified}`,
    `Reference Guide   : ${SITE_CONFIG.siteUrl}${doc.detailPath}`,
    divider,
    '',
    'ELIGIBILITY NOTE:',
    doc.eligibilityNote,
  ];

  if (doc.visaTypeAdvisory) {
    lines.push('', 'CATEGORY ADVISORY:', doc.visaTypeAdvisory);
  }

  if (doc.requiresVerificationAdvisory && doc.advisoryText) {
    lines.push(
      '',
      'JURISDICTION & NATIONALITY ADVISORY:',
      doc.advisoryText,
    );
  }

  for (const group of doc.groups) {
    lines.push('', subDivider, group.groupTitle.toUpperCase(), subDivider);
    for (const item of group.items) {
      const tag = item.mandatory ? '[CORE] ' : '';
      lines.push(`[ ] ${tag}${item.label}`);
      lines.push(`    -> ${item.detail}`);
    }
  }

  lines.push(
    '',
    divider,
    `LIVE DESK CONFIRMATION : ${SITE_CONFIG.whatsappDisplay} | ${SITE_CONFIG.email}`,
    `REGULATORY DISCLAIMER  : ${doc.disclaimer}`,
    divider,
    '',
  );

  return lines.join('\n');
}

/**
 * Builds a clean kebab-case filename for downloaded checklist files.
 */
export function buildChecklistFilename(doc: GeneratedChecklistDocument): string {
  const safeDest = doc.destinationId.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const safeVisa = doc.visaTypeId.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const safeNat = doc.nationalityLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'passport';
  const base =
    safeVisa === 'tourist'
      ? `visahouse-${safeDest}-${safeNat}-checklist.txt`
      : `visahouse-${safeDest}-${safeVisa}-${safeNat}-checklist.txt`;
  return base;
}
