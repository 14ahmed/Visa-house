import type { DestinationData } from './types';

export const COMMONWEALTH_OCEANIA_DESTINATIONS: DestinationData[] = [
  {
    slug: 'canada',
    country: 'Canada',
    isoCode: 'CAN',
    region: 'North America',
    channel: 'Hybrid / Centre',
    accentHex: '#9E2A2B',
    stampLabel: 'OTTAWA · CAN',
    stampRotation: -3,
    heroPromise:
      'IRCC portal drafting, home-ties statement of purpose structuring, financial provenance auditing, and VFS Global biometrics preparation for Pakistani applicants visiting Canada.',
    seoTitle: 'Canada Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Prepare a Canada visitor visa (TRV) from Pakistan with IRCC form drafting, bank-statement checks, ties letter, and VFS biometrics prep.',
    facts: {
      visaType: 'Temporary Resident Visa (TRV · Tourism / Family / Business)',
      entryType: 'Single or Multiple Entry (up to passport validity · officer discretion)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<CANVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'CAN0000000PAK0000000M0000000<<<<<<<<<<<<<<14',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders travelling to Toronto, Vancouver, Montreal, Calgary, or Ottawa for tourism, visiting relatives, or business conferences submit an online Temporary Resident Visa (TRV) application through the official IRCC portal followed by mandatory in-person biometrics at an authorised Visa Application Centre (VFS Global in Islamabad, Lahore, or Karachi).',
      profiles: [
        'Salaried executives, physicians, engineers, and corporate staff with verifiable employment continuity and FBR tax compliance',
        'Parents and grandparents visiting Canadian citizen or permanent resident children (Visitor Visa or Super Visa preparation)',
        'Established Pakistani business owners with SECP/NTN records, active corporate bank turnover, and property or family ties',
        'Trade delegates and professionals attending Canadian industry conferences with verifiable host invitations',
      ],
      eligibilityNote:
        'Canadian visa officers evaluate every TRV file on paper without an in-person interview, placing decisive weight on purpose of visit, financial sustainability, prior international travel compliance, and compelling economic and family ties to Pakistan.',
    },
    checklist: [
      {
        groupTitle: 'IRCC Online Forms & Identity',
        items: [
          {
            id: 'can-passport',
            label: 'Valid Pakistani Passport & All Previous Passports',
            detail:
              'Complete scan of bio page plus every stamped page, visa sticker, and entry/exit record from the last ten years.',
            mandatory: true,
          },
          {
            id: 'can-imm-forms',
            label: 'IRCC Visitor Application & Family Information Forms (IMM 5257 / IMM 5645)',
            detail:
              'Accurate digital completion with consistent education, employment, and ten-year travel history aligned to your CNIC and FRC.',
            mandatory: true,
          },
          {
            id: 'can-nadra',
            label: 'CNIC, NADRA FRC & Marriage Certificate',
            detail:
              'Demonstrates immediate family ties in Pakistan and supports relationship verification when visiting relatives in Canada.',
            mandatory: true,
          },
          {
            id: 'can-sop',
            label: 'Structured Purpose of Travel & Home-Ties Letter',
            detail:
              'Clear, factual narrative explaining trip dates, daily plan, funding source, and why you will return to Pakistan promptly.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial Strength, Tax & Host Evidence',
        items: [
          {
            id: 'can-bank',
            label: 'Six-Month Personal Bank Statement & Maintenance Certificate',
            detail:
              'Stamped bank statement with healthy closing balance, regular income inflows, and clear explanation for any significant credits.',
            mandatory: true,
          },
          {
            id: 'can-fbr',
            label: 'FBR NTN Registration & Recent Income Tax Returns (2–3 Years)',
            detail:
              'Tax returns and wealth statement corroborating declared salary or business income plus immovable property/asset holdings.',
            mandatory: true,
          },
          {
            id: 'can-work',
            label: 'Employer NOC & Pay Slips (or Business Registration Pack)',
            detail:
              'Signed leave approval specifying return-to-work date, or SECP incorporation, Chamber certificate, and company bank statements.',
            mandatory: true,
          },
          {
            id: 'can-invite',
            label: 'Canadian Host Invitation, PR/Citizenship Proof & NOA (if visiting family)',
            detail:
              'Signed invitation letter, host’s PR card or Canadian passport copy, Notice of Assessment (NOA), and proof of relationship.',
            mandatory: false,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Eligibility & Refusal-Risk Audit',
        youDo:
          'Share your travel purpose, prior visa history (including any previous refusals), occupation, and Canadian host details if applicable.',
        weDo:
          'Assess home-ties balance, verify whether standard TRV or Super Visa applies, and confirm current IRCC and VFS fee structures in PKR.',
      },
      {
        stepNumber: '02',
        title: 'Financial Reconciliation & Statement Drafting',
        youDo:
          'Send your six-month bank statements, FBR tax returns, property/employment documents, and host paperwork online.',
        weDo:
          'Audit every credit entry, draft a concise IRCC-ready Letter of Explanation, and merge indexed PDF evidence bundles within IRCC upload limits.',
      },
      {
        stepNumber: '03',
        title: 'IRCC Portal Upload & Biometric Instruction Letter',
        youDo:
          'Review every IMM form line by line and settle official government visa and biometric fees directly via card.',
        weDo:
          'Complete portal submission cleanly and schedule your official VFS Global biometric appointment in Islamabad, Lahore, or Karachi.',
      },
      {
        stepNumber: '04',
        title: 'Passport Request (PPR) & Stamping Coordination',
        youDo:
          'Monitor portal messages with us and submit your physical passport to VFS once IRCC issues a Passport Request letter.',
        weDo:
          'Guide VFS two-way courier or counter submission and share arrival preparation notes covering customs declarations and travel insurance.',
      },
    ],
    refusalReasons: [
      {
        title: 'Weak Economic & Family Ties Narrative',
        cause:
          'Uploading raw documents without a cohesive explanation often leads officers to doubt the applicant will depart Canada at the end of their stay.',
        prevention:
          'We pair structured employer/business proof, tax records, and family documentation with a calm, factual Letter of Explanation.',
      },
      {
        title: 'Unexplained Lump-Sum Bank Deposits',
        cause:
          'Sudden large cash deposits shortly before applying raise immediate red flags during IRCC financial verification.',
        prevention:
          'We review six months of transactions alongside salary slips, FBR wealth statements, or sale deeds so every balance is transparently backed.',
      },
      {
        title: 'Inconsistent Prior Refusal Disclosures',
        cause:
          'Omitting an earlier refusal from the US, UK, Schengen, or Canada triggers misrepresentation findings under IRCC rules.',
        prevention:
          'We cross-check your complete travel and refusal history carefully before signing statutory declaration fields.',
      },
    ],
    localNotes: {
      overview: [
        'Canada offers dramatic seasonal variety for Pakistani travellers—from Toronto and Niagara Falls to Vancouver’s Pacific coastline, Banff and Jasper in the Rockies, and French-speaking Montreal and Quebec City. Because distances between provinces are vast, realistic two-week itineraries focus on either Eastern Canada or Western Canada rather than crisscrossing five time zones.',
        'Pakistani applicants must complete biometrics at an authorised VFS Global centre unless valid Canadian biometrics from the past ten years remain on file. Processing times fluctuate widely by season and caseload, so applying several months ahead of summer weddings, graduations, or autumn foliage trips is strongly advised.',
      ],
      bestSeasonTitle: 'Best Time to Visit Canada',
      bestSeasonBody:
        'Late May through October brings mild sightseeing weather, open mountain passes in Banff, and crisp autumn colours in Ontario and Quebec. Winter (December–March) is best reserved for family visits or dedicated ski travel.',
      citiesTitle: 'Key Cities & Regions',
      citiesBody:
        'Toronto, Ottawa, Montreal, and Quebec City anchor Eastern Canada routes, while Vancouver, Victoria, Calgary, and Banff headline Western itineraries.',
      entryTipsTitle: 'Airport Arrival & Border Preparation',
      entryTipsBody:
        'Carry printed copies of your return ticket, accommodation/host address, and comprehensive worldwide medical insurance—Canadian emergency hospital care is extremely costly for uninsured visitors.',
    },
    packages: [
      {
        id: 'can-standard',
        tabLabel: 'Standard TRV Prep',
        title: 'Canada Visitor Visa (TRV) Complete Visa File',
        bestFor: 'Tourists, business visitors, and families applying online from Pakistan.',
        serviceFee: '',
        turnaroundNote: 'Drafted online prior to IRCC upload & VFS biometrics',
        includes: [
          'Full IMM form completion & travel-history reconciliation',
          'Six-month bank statement & FBR tax-tie review',
          'Tailored Purpose of Travel & Home-Ties Letter',
          'Indexed PDF evidence compilation & VFS biometrics guide',
        ],
        excludesNote: 'Excludes official IRCC visa fee, biometric fee, and VFS passport transmission charges.',
      },
      {
        id: 'can-family',
        tabLabel: 'Family / Super Visa',
        title: 'Parent, Grandparent & Refusal-Review Filing',
        bestFor: 'Parents visiting Canadian children or applicants reapplying after a prior refusal.',
        serviceFee: '',
        turnaroundNote: 'Includes host income/NOA audit & prior-refusal gap review',
        includes: [
          'Everything in Standard TRV Prep',
          'Host invitation, LICO/NOA income verification & Super Visa insurance check',
          'GCMS / refusal-letter gap analysis for re-applications',
          'Direct WhatsApp desk coordination through PPR passport stamping',
        ],
        excludesNote: 'Excludes IRCC fees, medical panel exam fees, and Super Visa insurance premiums.',
      },
    ],
    faqs: [
      {
        question: 'Does Canada require an in-person embassy interview in Pakistan?',
        answer:
          'Standard Canadian Visitor Visa (TRV) applications are assessed on your submitted online visa file rather than a routine interview. You still attend VFS Global in Islamabad, Lahore, or Karachi in person to submit biometric fingerprints and a digital photograph.',
      },
      {
        question: 'How much bank balance do I need for a Canada visit visa from Pakistan?',
        answer:
          'IRCC does not publish a fixed minimum PKR figure. Your closing balance and six-month cash flow must comfortably cover return airfare, accommodation, local spending, and continuing family obligations in Pakistan without exhausting your savings.',
      },
      {
        question: 'Can my relative in Canada sponsor my entire trip?',
        answer:
          'A Canadian citizen or permanent resident can issue an invitation letter and show financial support via their Notice of Assessment (NOA) and pay stubs, yet IRCC still examines the Pakistani applicant’s own personal ties, employment, and financial standing closely.',
      },
      {
        question: 'Do I have to submit my physical passport when I apply online?',
        answer:
          'No. You keep your Pakistani passport during IRCC processing and only submit it via VFS Global if and when IRCC sends an official Passport Request (PPR) notice.',
      },
      {
        question: 'How early should Pakistani passport holders apply for Canada?',
        answer:
          'Because IRCC processing queues from Pakistan can stretch across several weeks or months during peak periods, initiating document preparation 3 to 5 months before planned travel is prudent.',
      },
      {
        question: 'What if I was previously refused a Canada or US visa?',
        answer:
          'Every prior refusal must be disclosed honestly on the IRCC form. Sharing your previous refusal letter lets our desk address the exact officer concerns—such as financial provenance or return ties—before lodging a fresh file.',
      },
    ],
    relatedSlugs: ['usa', 'uk', 'australia', 'schengen-states'],
  },
  {
    slug: 'uk',
    country: 'United Kingdom',
    isoCode: 'GBR',
    region: 'Europe & UK',
    channel: 'Hybrid / Centre',
    accentHex: '#1D3557',
    stampLabel: 'LONDON · GBR',
    stampRotation: 3,
    heroPromise:
      'Precision GOV.UK Standard Visitor Visa drafting, bank-to-salary reconciliation, sponsor paperwork auditing, and VFS Global biometric prep for Pakistani applicants.',
    seoTitle: 'UK Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a UK Standard Visitor Visa from Pakistan with GOV.UK form drafting, financial audit, and VFS Global biometric appointment guidance.',
    facts: {
      visaType: 'UK Standard Visitor Visa (Tourism / Family / Business)',
      entryType: 'Multiple Entry (6-Month, 2-Year, 5-Year or 10-Year tiers)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<GBRVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'GBR0000000PAK0000000M0000000<<<<<<<<<<<<<<15',
    },
    whoCanApply: {
      intro:
        'Pakistani citizens travelling to London, Manchester, Birmingham, Edinburgh, or Oxford for holidays, family visits, graduations, or business meetings apply online via the official GOV.UK visa portal and attend biometric enrolment at VFS Global in Islamabad, Lahore, Karachi, or Mirpur.',
      profiles: [
        'Salaried professionals whose monthly bank deposits match payslips, employer letters, and declared monthly expenditure',
        'Families visiting UK-based relatives or attending university graduations and weddings with formal sponsor documentation',
        'Business owners and directors meeting UK buyers, suppliers, or professional bodies with verifiable SECP/FBR history',
        'Frequent travellers upgrading from prior compliant 6-month UK visas to 2-year or 5-year long-term visitor tiers',
      ],
      eligibilityNote:
        'UK Visas and Immigration (UKVI) entry clearance officers scrutinise exact arithmetic between declared monthly income, living costs in Pakistan, total trip cost, and every non-salary credit appearing on your six-month bank statement.',
    },
    checklist: [
      {
        groupTitle: 'GOV.UK Application & Identity',
        items: [
          {
            id: 'uk-passport',
            label: 'Valid Pakistani Passport & Prior Passports',
            detail:
              'Original passport for biometric centre verification plus scans of prior UK, Schengen, US, or other international visas.',
            mandatory: true,
          },
          {
            id: 'uk-gov-form',
            label: 'Completed GOV.UK Standard Visitor Online Form',
            detail:
              'Every income figure, monthly expense estimate, trip budget, and ten-year travel entry verified before payment.',
            mandatory: true,
          },
          {
            id: 'uk-nadra',
            label: 'CNIC, NADRA FRC & Marriage / Birth Certificates',
            detail:
              'Establishes family ties in Pakistan and confirms relationship to UK sponsors or accompanying dependants.',
            mandatory: true,
          },
          {
            id: 'uk-cover',
            label: 'Detailed Cover Letter & Trip Cost Breakdown',
            detail:
              'Explains itinerary, realistic GBP spending budget, any irregular bank transactions, and strong reasons to return.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial Provenance, Employment & UK Sponsor',
        items: [
          {
            id: 'uk-bank',
            label: 'Six-Month Personal Bank Statement & Salary Slips',
            detail:
              'Must show consistent salary or business credits matching your GOV.UK income declarations with zero unexplained cash jumps.',
            mandatory: true,
          },
          {
            id: 'uk-work-tax',
            label: 'Employer Leave Letter (NOC) / Business & FBR Tax Filings',
            detail:
              'Signed HR letter confirming salary and leave dates, or SECP/NTN/Chamber proofs and filed FBR returns for owners.',
            mandatory: true,
          },
          {
            id: 'uk-accommodation',
            label: 'Hotel Confirmations or UK Sponsor Accommodation Pack',
            detail:
              'Verifiable hotel bookings, or host invitation letter, UK passport/BRP/eVisa share code, and tenancy/mortgage proof.',
            mandatory: true,
          },
          {
            id: 'uk-property',
            label: 'Additional Home-Ties Evidence (Property / Dependants / Studies)',
            detail:
              'Registry copies, university enrolment letters, or children’s school letters demonstrating ongoing commitments in Pakistan.',
            mandatory: false,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Income & Financial Arithmetic Audit',
        youDo:
          'Share your salary slips or business filings, six-month bank statements, planned GBP trip budget, and any UK sponsor documents.',
        weDo:
          'Cross-check every deposit against declared income so your GOV.UK financial answers reconcile cleanly to the rupee.',
      },
      {
        stepNumber: '02',
        title: 'GOV.UK Application & Explanatory Statement Drafting',
        youDo:
          'Confirm your ten-year travel log, family particulars, and planned arrival/departure cities in Britain.',
        weDo:
          'Draft the complete GOV.UK form, write a crisp Entry Clearance Officer cover letter, and index PDF uploads by UKVI category.',
      },
      {
        stepNumber: '03',
        title: 'VFS Global Biometrics & Self-Upload',
        youDo:
          'Settle the official GOV.UK visa fee online and attend your VFS Global appointment in Islamabad, Lahore, Karachi, or Mirpur.',
        weDo:
          'Guide official VFS slot booking (including optional Keep My Passport or Priority services where offered) and verify every uploaded PDF.',
      },
      {
        stepNumber: '04',
        title: 'Decision Notice, UKVI eVisa & Travel Prep',
        youDo:
          'Share your UKVI decision email and passport collection notice once issued.',
        weDo:
          'Explain passport vignette or digital UKVI eVisa account access requirements and pre-flight border readiness.',
      },
    ],
    refusalReasons: [
      {
        title: 'Mismatch Between Stated Income & Bank Credits',
        cause:
          'Declaring a monthly salary on the GOV.UK form that does not match bank statement credits—or omitting cash-deposit explanations—is the leading cause of UKVI Paragraph V 4.2 refusals.',
        prevention:
          'We reconcile every monthly salary slip and business inflow directly against the six-month bank statement before filing.',
      },
      {
        title: 'Disproportionate Trip Cost Relative to Savings',
        cause:
          'Proposing a GBP trip budget that consumes nearly all liquid savings signals financial vulnerability to UKVI officers.',
        prevention:
          'We help frame a realistic duration and budget proportionate to your disposable income and verifiable financial reserves.',
      },
      {
        title: 'Incomplete UK Sponsor Documentation',
        cause:
          'Claiming accommodation or funding from a UK relative without their legal status proof, housing proof, and bank statements weakens credibility.',
        prevention:
          'We provide a clear checklist for your UK host covering invitation wording, immigration status, and accommodation capacity.',
      },
    ],
    localNotes: {
      overview: [
        'The United Kingdom remains one of the most visited long-haul destinations for Pakistani families, professionals, and students’ parents—connecting London’s museums and financial districts with Manchester, Birmingham, and Scotland’s historic Edinburgh and Highlands.',
        'UKVI has progressively transitioned many visa routes toward digital eVisa records alongside traditional vignettes, and VFS Global operates authorised biometric centres across Islamabad, Lahore, Karachi, and Mirpur. Preparing a crystal-clear paper trail well ahead of summer or Eid peaks keeps processing calm.',
      ],
      bestSeasonTitle: 'Best Time to Visit the UK',
      bestSeasonBody:
        'May through September offers long daylight hours and pleasant temperatures across England and Scotland; December brings festive London lights though short winter days.',
      citiesTitle: 'Key Cities & Rail Routes',
      citiesBody:
        'London, Oxford, Bath, Manchester, Birmingham, and Edinburgh connect smoothly via intercity rail without needing a rental car.',
      entryTipsTitle: 'Border & Travel Preparation',
      entryTipsBody:
        'Keep your UK accommodation address, return flight details, and travel medical insurance handy at Heathrow, Gatwick, or Manchester border control.',
    },
    packages: [
      {
        id: 'uk-standard',
        tabLabel: 'Standard Visitor',
        title: 'UK Standard Visitor Visa Complete Preparation',
        bestFor: 'First-time or returning Pakistani tourists, family visitors, and business travellers.',
        serviceFee: '',
        turnaroundNote: 'Complete GOV.UK form, bank audit & VFS PDF upload pack',
        includes: [
          'Line-by-line GOV.UK Standard Visitor application drafting',
          'Six-month bank statement & income-to-budget reconciliation',
          'Tailored cover letter & indexed VFS self-upload PDF bundle',
          'Official VFS Global appointment & biometrics day checklist',
        ],
        excludesNote: 'Excludes official GOV.UK visa fees and optional VFS priority or Keep My Passport add-ons.',
      },
      {
        id: 'uk-refusal',
        tabLabel: 'Prior Refusal / Long-Term',
        title: 'UK Refusal Re-Application & 2/5-Year Tier Review',
        bestFor: 'Applicants overcoming a prior UKVI refusal notice or upgrading to multi-year visas.',
        serviceFee: '',
        turnaroundNote: 'Includes paragraph-by-paragraph refusal rebuttal drafting',
        includes: [
          'Everything in Standard Visitor preparation',
          'Detailed UKVI refusal notice diagnosis & corrective evidence plan',
          'Sponsor financial & accommodation pack verification',
          'Dedicated WhatsApp consultant follow-up through decision',
        ],
        excludesNote: 'Excludes official UKVI visa fees and VFS centre service fees.',
      },
    ],
    faqs: [
      {
        question: 'Where do Pakistani applicants submit biometrics for a UK visa?',
        answer:
          'After completing the online GOV.UK application and fee payment, applicants attend an authorised VFS Global Visa Application Centre in Islamabad, Lahore, Karachi, or Mirpur for biometric capture.',
      },
      {
        question: 'How long does UK Standard Visitor Visa processing take from Pakistan?',
        answer:
          'Standard UKVI processing timelines shift by season and caseload (and optional Priority lanes depend on live availability). We confirm current published UKVI processing windows before you book your appointment.',
      },
      {
        question: 'Should I buy non-refundable flight tickets before my UK visa is approved?',
        answer:
          'UKVI explicitly advises against purchasing non-refundable flights before a visa decision is issued. A clear travel plan and realistic GBP cost estimate are sufficient for the application.',
      },
      {
        question: 'What is the most common reason UK visitor visas are refused in Pakistan?',
        answer:
          'Unexplained bank deposits and inconsistencies between stated monthly income, living expenses, and six-month bank statement figures are the most frequent triggers for UKVI refusals.',
      },
      {
        question: 'Can I apply for a 2-year or 5-year UK visit visa on my first trip?',
        answer:
          'While eligible to apply, UKVI generally expects a demonstrated history of compliant UK or international travel and strong ongoing reasons for frequent visits before granting longer multi-year durations.',
      },
      {
        question: 'Do I still need travel medical insurance for the United Kingdom?',
        answer:
          'Yes—visitors are not entitled to free NHS hospital treatment beyond limited emergency care, so carrying worldwide travel medical insurance is strongly recommended.',
      },
    ],
    relatedSlugs: ['canada', 'usa', 'schengen-states', 'france'],
  },
  {
    slug: 'australia',
    country: 'Australia',
    isoCode: 'AUS',
    region: 'Oceania',
    channel: 'Hybrid / Centre',
    accentHex: '#1B5E63',
    stampLabel: 'SYDNEY · AUS',
    stampRotation: -4,
    heroPromise:
      'ImmiAccount Subclass 600 Visitor Visa filing, Genuine Temporary Entrant documentation, financial audit, and VFS Global biometrics preparation from Pakistan.',
    seoTitle: 'Australia Visa from Pakistan — Subclass 600 | Visahouse',
    seoDescription:
      'Prepare an Australia Subclass 600 Visitor Visa from Pakistan with ImmiAccount filing, GTE statement, bank audit, and VFS biometrics prep.',
    facts: {
      visaType: 'Visitor Visa (Subclass 600 · Tourist / Sponsored Family / Business)',
      entryType: 'Single or Multiple Entry (electronic visa linked to passport)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<AUSVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'AUS0000000PAK0000000M0000000<<<<<<<<<<<<<<16',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders visiting Sydney, Melbourne, Brisbane, Perth, or the Gold Coast for tourism, family reunions, or business conferences apply online through the Department of Home Affairs ImmiAccount portal (Subclass 600) and complete in-person biometrics at an authorised Australian Biometrics Collection Centre (VFS Global) in Pakistan.',
      profiles: [
        'Salaried professionals and corporate travellers with clean tax returns, bank continuity, and verified employer leave',
        'Parents and siblings visiting Australian citizens or permanent residents in Melbourne, Sydney, Brisbane, or Adelaide',
        'Business owners with SECP/FBR registration planning family holidays or trade visits',
        'Visitors attending academic graduations, conferences, or family ceremonies in Australia',
      ],
      eligibilityNote:
        'Australia issues electronic visas (no passport sticker) and assesses every Subclass 600 file strictly on uploaded documentary evidence proving Genuine Temporary Entrant (GTE) intent and financial capacity.',
    },
    checklist: [
      {
        groupTitle: 'ImmiAccount Application & Identity',
        items: [
          {
            id: 'aus-passport',
            label: 'Valid Pakistani Passport & Prior Visa History',
            detail:
              'High-resolution colour scans of your current bio page and all stamped pages from current and previous passports.',
            mandatory: true,
          },
          {
            id: 'aus-immi',
            label: 'Subclass 600 ImmiAccount Form & Form 54 Family Composition',
            detail:
              'Accurate digital entries reconciled with your NADRA FRC, CNIC, and complete employment/education background.',
            mandatory: true,
          },
          {
            id: 'aus-nadra',
            label: 'CNIC, NADRA FRC & Marriage Certificate',
            detail:
              'Verifies immediate family structure and anchors ongoing personal ties in Pakistan.',
            mandatory: true,
          },
          {
            id: 'aus-gte',
            label: 'Genuine Temporary Entrant (GTE) & Travel Plan Statement',
            detail:
              'Structured written statement outlining trip purpose, realistic city schedule, funding, and compelling incentives to return.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial Evidence, Ties & Australian Host',
        items: [
          {
            id: 'aus-bank',
            label: 'Six-Month Bank Statement & Account Maintenance Letter',
            detail:
              'Stamped personal statement demonstrating genuine savings growth and steady income inflows.',
            mandatory: true,
          },
          {
            id: 'aus-work-tax',
            label: 'Employer NOC, Pay Slips & FBR Tax Returns',
            detail:
              'Signed leave letter with salary verification, or business incorporation, Chamber certificate, and FBR ATL returns.',
            mandatory: true,
          },
          {
            id: 'aus-invite',
            label: 'Australian Host Invitation & Citizenship/PR Proof (if applicable)',
            detail:
              'Signed invitation letter, host’s Australian passport or VEVO visa record, and proof of address or funding support.',
            mandatory: false,
          },
          {
            id: 'aus-health',
            label: 'Biometrics & Panel Medical Readiness (where requested)',
            detail:
              'VFS biometrics notice is issued post-lodgement; older travellers or longer stays may also receive a HAP ID health exam request.',
            mandatory: false,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Subclass 600 Stream & Profile Review',
        youDo:
          'Share whether you are travelling for tourism, family visits, or business meetings plus your planned duration and travel month.',
        weDo:
          'Select the right Subclass 600 stream (Tourist vs Business Visitor), audit home ties, and confirm current Home Affairs & VFS fees.',
      },
      {
        stepNumber: '02',
        title: 'GTE Statement & Document Indexing',
        youDo:
          'Upload your passport scans, bank statements, tax returns, employer/business letters, and any Australian host documents.',
        weDo:
          'Audit bank continuity, draft your GTE letter and day-by-day route plan, and label every ImmiAccount attachment clearly.',
      },
      {
        stepNumber: '03',
        title: 'ImmiAccount Lodgement & VFS Biometrics',
        youDo:
          'Pay the official Department of Home Affairs fee online and attend your VFS Global biometrics collection appointment in Pakistan.',
        weDo:
          'Verify your s257A Biometrics Requirement letter, guide VFS booking, and track any follow-up HAP medical instructions.',
      },
      {
        stepNumber: '04',
        title: 'Electronic Grant Notice & Arrival Readiness',
        youDo:
          'Receive your digital Visa Grant Notice PDF via email once Home Affairs finalises your application.',
        weDo:
          'Verify grant conditions (such as Condition 8503 / multiple-entry validity) and share Australian biosecurity & customs rules.',
      },
    ],
    refusalReasons: [
      {
        title: 'Insufficient Genuine Temporary Entrant (GTE) Incentives',
        cause:
          'Home Affairs officers refuse applications when employment, business, or family reasons to return to Pakistan are weakly documented.',
        prevention:
          'We assemble layered employment, tax, property, and family evidence paired with a factual GTE narrative.',
      },
      {
        title: 'Missing Biometrics Within the 14-Day Window',
        cause:
          'After ImmiAccount lodgement, applicants receive a strict deadline to complete VFS biometrics in Pakistan; missing it stalls or jeopardises the file.',
        prevention:
          'We monitor your ImmiAccount immediately upon submission and guide prompt official VFS biometric scheduling.',
      },
      {
        title: 'Unverified Large Cash Deposits',
        cause:
          'Sudden unexplained bank credits shortly prior to lodgement undermine confidence in genuine financial capacity.',
        prevention:
          'We inspect six months of statements beforehand and document lawful sources for any non-routine credits.',
      },
    ],
    localNotes: {
      overview: [
        'Australia combines iconic coastal cities—Sydney Harbour, Melbourne’s laneways, Brisbane, and Perth—with natural wonders including the Great Ocean Road, Uluru, and the Great Barrier Reef. Because seasons in the Southern Hemisphere are reversed relative to Pakistan, winter in Karachi or Lahore corresponds to Australian summer.',
        'All Australian Subclass 600 visitor visas are issued electronically and linked directly to your Pakistani passport number, meaning your passport never leaves your hands during processing. Note that Australia enforces strict airport biosecurity laws on food, spices, and plant products.',
      ],
      bestSeasonTitle: 'Best Time to Visit Australia',
      bestSeasonBody:
        'September to November (spring) and March to May (autumn) provide comfortable sightseeing across Sydney, Melbourne, and Perth; December–February is peak beach summer.',
      citiesTitle: 'Key Cities & Regions',
      citiesBody:
        'Sydney, Melbourne, the Gold Coast, Brisbane, Canberra, Adelaide, and Perth are connected by frequent domestic flights.',
      entryTipsTitle: 'Strict Australian Biosecurity & Arrival Rules',
      entryTipsBody:
        'Always declare every food item, spice, dry fruit, or herbal medicine on your Incoming Passenger Card—undeclared items carry steep on-the-spot penalties at Australian airports.',
    },
    packages: [
      {
        id: 'aus-standard',
        tabLabel: 'Subclass 600 Tourist',
        title: 'Australia Subclass 600 Complete Online Filing',
        bestFor: 'Pakistani tourists, family visitors, and business delegates applying via ImmiAccount.',
        serviceFee: '',
        turnaroundNote: 'Complete ImmiAccount drafting + VFS biometrics guidance',
        includes: [
          'Full Subclass 600 ImmiAccount & Form 54 preparation',
          'Six-month bank statement & FBR tax audit',
          'Genuine Temporary Entrant (GTE) letter & realistic itinerary',
          'VFS Global biometrics scheduling guide & post-grant check',
        ],
        excludesNote: 'Excludes official Department of Home Affairs visa charges, VFS biometric fees, and panel medicals if requested.',
      },
      {
        id: 'aus-family',
        tabLabel: 'Family / Parents',
        title: 'Parents & Multi-Traveller Family Visa File',
        bestFor: 'Parents visiting Australian children or multi-member family holidays.',
        serviceFee: '',
        turnaroundNote: 'Includes sponsor pack review & medical-exam coordination notes',
        includes: [
          'Everything in Subclass 600 Tourist preparation',
          'Linked family ImmiAccount group organisation',
          'Australian sponsor VEVO, income & invitation verification',
          'Health-insurance and panel-clinic (HAP ID) readiness briefing',
        ],
        excludesNote: 'Excludes Home Affairs fees, VFS fees, medical exams, and travel insurance premiums.',
      },
    ],
    faqs: [
      {
        question: 'Does Australia put a visa sticker inside my Pakistani passport?',
        answer:
          'No. Approved Subclass 600 visas are fully digital and linked electronically to your passport number. You receive a PDF Visa Grant Notice to carry during check-in.',
      },
      {
        question: 'Are biometrics mandatory for Pakistani citizens applying to Australia?',
        answer:
          'Yes—applicants lodging from Pakistan normally receive an electronic Biometrics Requirement letter right after ImmiAccount submission and must visit an authorised VFS Global centre within the stated deadline.',
      },
      {
        question: 'Will my parents need a medical exam for an Australian visit visa?',
        answer:
          'Applicants aged 75 and over, or visitors requesting longer stays (such as 6 to 12 months), are frequently asked by Home Affairs to complete an approved panel medical exam and carry health insurance.',
      },
      {
        question: 'How early should I apply for an Australia Subclass 600 visa?',
        answer:
          'Home Affairs processing times vary significantly by season and verification checks. Starting your document preparation 8 to 12 weeks before planned departure provides a healthy buffer.',
      },
      {
        question: 'Can I travel to New Zealand on an Australian Visitor Visa?',
        answer:
          'No. Australia and New Zealand operate separate immigration systems—Pakistani passport holders need a separate New Zealand Visitor Visa even when visiting both countries on one trip.',
      },
      {
        question: 'Should I book non-refundable flights before receiving my Australia grant?',
        answer:
          'No. Department of Home Affairs explicitly advises applicants not to pay for non-refundable flights until their electronic Visa Grant Notice has been issued.',
      },
    ],
    relatedSlugs: ['new-zealand', 'uk', 'canada', 'singapore'],
  },
  {
    slug: 'new-zealand',
    country: 'New Zealand',
    isoCode: 'NZL',
    region: 'Oceania',
    channel: 'e-Visa',
    accentHex: '#254E58',
    stampLabel: 'AUCKLAND · NZL',
    stampRotation: 4,
    heroPromise:
      'Immigration New Zealand online Visitor Visa drafting, genuine tourist intent letters, bank-statement auditing, and NZTD arrival preparation for Pakistani travellers.',
    seoTitle: 'New Zealand Visa from Pakistan — Checklist | Visahouse',
    seoDescription:
      'Apply for a New Zealand Visitor Visa from Pakistan with Immigration New Zealand online filing, financial checks, and itinerary preparation.',
    facts: {
      visaType: 'New Zealand Visitor Visa (Online eVisa · Tourism / Family / Business)',
      entryType: 'Single or Multiple Entry (electronic approval)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<NZLVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'NZL0000000PAK0000000M0000000<<<<<<<<<<<<<<17',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders planning scenic holidays across Auckland, Queenstown, Rotorua, and Milford Sound—or visiting family and business partners—apply online through the official Immigration New Zealand (INZ) portal for a fully digital Visitor Visa (Pakistani passports are not NZeTA-exempt).',
      profiles: [
        'Established Pakistani tourists and honeymooners planning North and South Island scenic itineraries',
        'Parents and relatives visiting New Zealand citizens or residents with formal INZ Sponsorship Form (INZ 1025) support',
        'Salaried professionals and business owners with strong FBR tax filings, verifiable savings, and prior international travel',
        'Travellers combining Australia and New Zealand on a single Oceania holiday (separate visas filed in sequence)',
      ],
      eligibilityNote:
        'Immigration New Zealand assesses Visitor Visas digitally on documentary merit, requiring clear evidence of bona fide visitor intent, sufficient funds per month of stay, and confirmed ties back to Pakistan.',
    },
    checklist: [
      {
        groupTitle: 'INZ Online Portal & Identity',
        items: [
          {
            id: 'nzl-passport',
            label: 'Valid Pakistani Passport & Prior Travel Scans',
            detail:
              'Valid at least 3 months past intended New Zealand departure plus clear colour scans of previous visas and entry stamps.',
            mandatory: true,
          },
          {
            id: 'nzl-photo',
            label: 'Digital Passport-Style Photograph (INZ Spec)',
            detail:
              'High-resolution portrait on a plain light background meeting Immigration New Zealand automated quality checks.',
            mandatory: true,
          },
          {
            id: 'nzl-nadra',
            label: 'CNIC, NADRA FRC & Family Civil Documents',
            detail:
              'Supports family-ties proof and verifies dependants when applying as a couple or family group.',
            mandatory: true,
          },
          {
            id: 'nzl-cover',
            label: 'Bona Fide Visitor Statement & Island Itinerary',
            detail:
              'Day-by-day North/South Island travel plan with realistic internal flights or driving legs and return rationale.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial Maintenance, Ties & Sponsorship',
        items: [
          {
            id: 'nzl-bank',
            label: 'Six-Month Stamped Bank Statement & Maintenance Certificate',
            detail:
              'Demonstrates readily accessible funds covering accommodation, daily living expenses, and onward/return flights.',
            mandatory: true,
          },
          {
            id: 'nzl-work-tax',
            label: 'Employer NOC & Pay Slips (or Business & FBR Tax Pack)',
            detail:
              'Confirms approved leave and continuing employment, or SECP/NTN/Chamber proofs and filed tax returns.',
            mandatory: true,
          },
          {
            id: 'nzl-sponsor',
            label: 'INZ 1025 Sponsorship Form & Host Proof (if visiting family)',
            detail:
              'Signed official sponsorship form from an eligible New Zealand citizen or resident host plus their residency and income evidence.',
            mandatory: false,
          },
          {
            id: 'nzl-medical',
            label: 'Chest X-Ray / Medical Clearance (if staying over 6 months)',
            detail:
              'Short holidays rarely require panel medicals unless staying longer or meeting specific TB-screening criteria—confirmed live.',
            mandatory: false,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Bona Fide Profile & Route Assessment',
        youDo:
          'Share your target travel season, North/South Island plans, family sponsor details (if any), and prior visa history.',
        weDo:
          'Confirm current Immigration New Zealand visa and IVL levy rules, audit profile readiness, and map document requirements.',
      },
      {
        stepNumber: '02',
        title: 'Financial Audit & INZ Portal Drafting',
        youDo:
          'Send your passport scans, six-month bank statements, FBR returns, employment NOC, and host sponsorship form if applicable.',
        weDo:
          'Reconcile every financial record, craft your bona fide cover letter and realistic itinerary, and prepare crisp INZ portal uploads.',
      },
      {
        stepNumber: '03',
        title: 'Online Submission & Verification Follow-Up',
        youDo:
          'Review your Immigration New Zealand online form and settle official government fees directly via card.',
        weDo:
          'Ensure every mandatory field and supporting PDF is uploaded cleanly and monitor portal notices for any PPI or medical requests.',
      },
      {
        stepNumber: '04',
        title: 'eVisa Approval & New Zealand Traveller Declaration',
        youDo:
          'Receive your digital Visitor Visa letter via email and book confirmed flights.',
        weDo:
          'Guide your mandatory online New Zealand Traveller Declaration (NZTD) and biosecurity checklist before departure.',
      },
    ],
    refusalReasons: [
      {
        title: 'Weak Proof of Ongoing Ties to Pakistan',
        cause:
          'INZ officers closely assess whether an applicant has genuine employment, business, or family reasons to depart New Zealand on time.',
        prevention:
          'We pair formal employer leave confirmations, FBR tax filings, and family records with a transparent return timeline.',
      },
      {
        title: 'Unrealistic Itinerary or Funding Gap',
        cause:
          'Underestimating New Zealand accommodation and domestic travel costs relative to liquid bank balances undermines application credibility.',
        prevention:
          'We align your day-by-day route budget with verified bank savings and prepaid or clearly budgeted lodging.',
      },
      {
        title: 'Unclear English Translations or Unlabelled Scans',
        cause:
          'Submitting untranslated Urdu civil documents or illegible scans triggers delays or negative credibility assessments.',
        prevention:
          'We verify English NADRA certificates, certified translations where needed, and crisp PDF naming before upload.',
      },
    ],
    localNotes: {
      overview: [
        'New Zealand rewards travellers with alpine lakes, geothermal parks, coastal fiords, and cosmopolitan cities across two distinct islands—Auckland, Rotorua, and Wellington in the North Island, and Queenstown, Wanaka, Christchurch, and Milford Sound in the South Island.',
        'Pakistani passport holders require a full Visitor Visa rather than an NZeTA, and the entire submission runs online through Immigration New Zealand without surrendering your physical passport. Before flying, every passenger must also complete the digital New Zealand Traveller Declaration (NZTD).',
      ],
      bestSeasonTitle: 'Best Time to Visit New Zealand',
      bestSeasonBody:
        'November to April delivers warm summer and crisp autumn conditions ideal for scenic drives, Queenstown lakes, and Milford Sound cruises.',
      citiesTitle: 'Key Cities & Scenic Hubs',
      citiesBody:
        'Auckland, Rotorua, Wellington, Christchurch, Queenstown, and Te Anau form the classic two-island visitor route.',
      entryTipsTitle: 'NZTD & Biosecurity Declaration',
      entryTipsBody:
        'Complete the official New Zealand Traveller Declaration (NZTD) within 24 hours of flight departure and declare all food, outdoor hiking boots, and plant products honestly at customs.',
    },
    packages: [
      {
        id: 'nzl-standard',
        tabLabel: 'Online Visitor Visa',
        title: 'New Zealand Digital Visitor Visa Preparation',
        bestFor: 'Pakistani tourists, couples, and business travellers applying online.',
        serviceFee: '',
        turnaroundNote: '100% online INZ visa file prep + NZTD arrival briefing',
        includes: [
          'Complete Immigration New Zealand online form drafting',
          'Six-month bank statement & FBR tax verification',
          'Bona fide visitor statement & realistic two-island itinerary',
          'Post-approval New Zealand Traveller Declaration (NZTD) guide',
        ],
        excludesNote: 'Excludes official Immigration New Zealand visa fee and International Visitor Levy (IVL).',
      },
      {
        id: 'nzl-family',
        tabLabel: 'Family / Dual Oceania',
        title: 'Sponsored Family & Australia + NZ Combo Prep',
        bestFor: 'Relatives using INZ 1025 sponsorship or travellers pairing Australia and New Zealand.',
        serviceFee: '',
        turnaroundNote: 'Coordinated Oceania itinerary & sponsor document verification',
        includes: [
          'Everything in Online Visitor Visa preparation',
          'INZ 1025 Sponsorship Form & host eligibility audit',
          'Coordinated sequencing for combined Australia + New Zealand trips',
          'WhatsApp desk guidance through portal decision',
        ],
        excludesNote: 'Excludes official INZ fees, Australian visa fees, and travel insurance.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders enter New Zealand with an NZeTA?',
        answer:
          'No. Pakistan is not a visa-waiver country for New Zealand, so Pakistani citizens must apply online for a full Visitor Visa through Immigration New Zealand before travelling.',
      },
      {
        question: 'Do I have to submit my physical passport for a New Zealand visa?',
        answer:
          'New Zealand Visitor Visas are generally processed digitally as eVisas linked to your passport, though Immigration New Zealand reserves the right to request passport verification through an authorised centre if needed.',
      },
      {
        question: 'How long does New Zealand Visitor Visa processing take from Pakistan?',
        answer:
          'INZ processing queues vary significantly between off-peak months and the busy November–March Southern Hemisphere summer. We check current published INZ windows and recommend starting 8 to 10 weeks ahead.',
      },
      {
        question: 'Do I need to pay the International Visitor Levy (IVL)?',
        answer:
          'Most tourist visitor applications include New Zealand’s mandatory International Visitor Conservation and Tourism Levy (IVL) collected directly at official checkout—confirm live NZD and PKR totals with our desk.',
      },
      {
        question: 'Can a family member in New Zealand sponsor my Visitor Visa?',
        answer:
          'Yes—an eligible New Zealand citizen or resident can complete Form INZ 1025 to sponsor accommodation and maintenance, alongside your own strong evidence of return ties to Pakistan.',
      },
      {
        question: 'What is the New Zealand Traveller Declaration (NZTD)?',
        answer:
          'It is a mandatory free digital customs, biosecurity, and immigration declaration completed online before boarding your flight to New Zealand.',
      },
    ],
    relatedSlugs: ['australia', 'uk', 'canada', 'singapore'],
  },
];
