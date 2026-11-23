import type { FaqItem, ProcessStep } from './types';

export interface SchengenCountryInfo {
  name: string;
  iso: string;
  centre: string;
  citiesInPakistan: string;
  note: string;
}

export const SCHENGEN_COUNTRIES: SchengenCountryInfo[] = [
  {
    name: 'France',
    iso: 'FRA',
    centre: 'Authorised Visa Centre (e.g. Gerry’s / VFS — confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Popular for Paris, Riviera, and multi-country western Europe loops; strong emphasis on detailed day-by-day itineraries.',
  },
  {
    name: 'Italy',
    iso: 'ITA',
    centre: 'Authorised Visa Centre (e.g. Gerry’s / VFS — confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'High seasonal demand from Pakistani tourists and trade visitors; check territorial jurisdiction between Islamabad Embassy and Karachi Consulate.',
  },
  {
    name: 'Spain',
    iso: 'ESP',
    centre: 'Authorised Visa Centre (e.g. BLS International — confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Strict document formatting on bank maintenance letters, travel insurance wording, and hotel confirmations.',
  },
  {
    name: 'Germany',
    iso: 'DEU',
    centre: 'Authorised Visa Centre / Mission Channel (confirm active channel)',
    citiesInPakistan: 'Islamabad, Karachi (consular jurisdiction)',
    note: 'Structured checklists for both tourism and trade-fair (Messe) visits; requires clear employer NOC and FBR tax documentation.',
  },
  {
    name: 'Switzerland',
    iso: 'CHE',
    centre: 'Authorised Visa Centre (confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Favourite summer family destination; alpine hotel budgets require matching bank statement strength.',
  },
  {
    name: 'Netherlands',
    iso: 'NLD',
    centre: 'Authorised Visa Centre (confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Clear digital form preparation via official consular portal paired with biometric drop-off.',
  },
  {
    name: 'Greece',
    iso: 'GRC',
    centre: 'Authorised Visa Centre (confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Seasonal summer surge for Athens and Aegean islands; plan ferry/flight links cleanly in your dossier.',
  },
  {
    name: 'Austria',
    iso: 'AUT',
    centre: 'Authorised Visa Centre (confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Ideal anchor for Vienna, Salzburg, and Central European rail loops alongside Czechia or Hungary.',
  },
  {
    name: 'Portugal',
    iso: 'PRT',
    centre: 'Authorised Visa Centre / Mission Channel (confirm active channel)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Growing demand for Lisbon and Porto; verify active representation and appointment release windows early.',
  },
  {
    name: 'Belgium',
    iso: 'BEL',
    centre: 'Authorised Visa Centre (confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Common entry for Brussels corporate visits and Benelux holidays; requires crisp sponsor or hotel alignment.',
  },
  {
    name: 'Hungary',
    iso: 'HUN',
    centre: 'Authorised Visa Centre (confirm active contractor)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Budapest pairs smoothly by rail with Vienna or Prague; confirm main-destination rule before selecting which mission to file with.',
  },
  {
    name: 'Poland',
    iso: 'POL',
    centre: 'e-Konsulat / Authorised Visa Centre (confirm active channel)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Popular for Warsaw and Kraków tourism plus commercial visits; verify Voivodeship invitation rules for private sponsorship.',
  },
  {
    name: 'Luxembourg',
    iso: 'LUX',
    centre: 'Designated Schengen Partner Mission / VFS (confirm active representation)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Compact Benelux financial and cultural hub; confirm active Schengen representation channel in Pakistan before filing.',
  },
  {
    name: 'Norway',
    iso: 'NOR',
    centre: 'UDI Portal + Authorised Visa Centre (VFS Global)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Strong family-visit demand for Oslo and fjord holidays in Bergen; verify UDI Sponsorship Form requirements early.',
  },
  {
    name: 'Denmark',
    iso: 'DNK',
    centre: 'ApplyVisa Portal + Authorised Visa Centre (VFS Global)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Copenhagen business and family visits require MitID-verified VU1 or VU2 invitation IDs for hosted stays.',
  },
  {
    name: 'Finland',
    iso: 'FIN',
    centre: 'Finland Visa Portal + Authorised Visa Centre (VFS Global)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Helsinki and Lapland Aurora itineraries; align winter resort budgets cleanly against six-month bank reserves.',
  },
  {
    name: 'Sweden',
    iso: 'SWE',
    centre: 'Authorised Visa Centre (VFS Global)',
    citiesInPakistan: 'Islamabad, Lahore, Karachi',
    note: 'Stockholm, Gothenburg, and Malmö visits; hosted filings require Form 241011 and a fresh Skatteverket Personbevis.',
  },
];

export const SCHENGEN_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Main-Destination Rule & Jurisdiction Audit',
    youDo:
      'Share every European city you hope to visit, your intended travel month, and your city of residence in Pakistan.',
    weDo:
      'Apply the Schengen Main-Destination Rule (longest stay, or first entry if nights are equal) so you apply through the legally correct embassy and visa centre.',
  },
  {
    stepNumber: '02',
    title: 'Complete Schengen Dossier Preparation',
    youDo:
      'Send your passport scans, six-month bank statements, FBR tax returns, employment or business papers, and FRC.',
    weDo:
      'Draft your Schengen harmonized form, tailored cover letter, realistic inter-city itinerary, and check Schengen-compliant €30,000 travel insurance wording.',
  },
  {
    stepNumber: '03',
    title: 'Official Visa-Centre Appointment Guidance',
    youDo:
      'Review our appointment readiness brief and remain available for official portal OTP/verification steps.',
    weDo:
      'Guide booking strictly through official authorised visa-centre portals (such as VFS Global, BLS International, or embassy calendars) as legitimate slots open—never through unauthorised brokers.',
  },
  {
    stepNumber: '04',
    title: 'Biometrics Day Packet & Tracking',
    youDo:
      'Attend your scheduled appointment in Islamabad, Lahore, or Karachi in person to submit biometrics and your physical file.',
    weDo:
      'Deliver a tabbed, centre-ready paper checklist so your submission desk check runs smoothly with zero missing photocopies.',
  },
];

export const SCHENGEN_DOCUMENTS: string[] = [
  'Completed & signed Schengen Short-Stay (Type C) Visa Application Form',
  'Original Pakistani passport (valid at least 3 months beyond planned Schengen exit) + copies of prior visas',
  'Two recent ICAO-standard biometric photographs (35mm × 45mm, light background)',
  'Schengen-compliant travel medical insurance (minimum €30,000 emergency medical & repatriation cover across all Schengen states)',
  'Personalised cover letter and realistic day-by-day European itinerary',
  'Verifiable round-trip flight reservation and hotel bookings covering every night',
  'Six-month stamped bank statement + Account Maintenance Certificate',
  'FBR NTN registration and recent Income Tax Returns (salaried or business)',
  'Employer NOC with approved leave dates & last three salary slips (or Chamber / SECP business documents)',
  'NADRA CNIC, Family Registration Certificate (FRC), and Marriage Certificate / B-Form where applicable',
];

export const SCHENGEN_FAQS: FaqItem[] = [
  {
    question: 'Does Visahouse guarantee a Schengen appointment date or visa approval?',
    answer:
      'No. Official appointment slots are released solely by embassies and their authorised visa centres (such as VFS Global or BLS International), and visa decisions rest exclusively with consular authorities. We help you monitor official channels properly and prepare a rock-solid file so you are ready when legitimate slots open.',
  },
  {
    question: 'Which Schengen country should I apply to if I am visiting three countries?',
    answer:
      'Under the Schengen Visa Code, you must apply at the embassy/visa centre of your main destination—the country where you will spend the greatest number of nights. Only if your nights are split equally across countries do you apply to the country of first entry.',
  },
  {
    question: 'How early can I apply for a Schengen visa from Pakistan?',
    answer:
      'Schengen rules generally allow lodging an application up to six months ahead of intended travel (confirm current mission lead times). Starting three to four months early is strongly advised ahead of summer or Eid travel peaks.',
  },
  {
    question: 'Do I have to appear in person at the visa centre?',
    answer:
      'Yes—most applicants must attend their scheduled appointment in Islamabad, Lahore, or Karachi in person to provide biometric fingerprints and submit their physical packet (unless a verified recent VIS biometric exemption applies under that mission’s rules).',
  },
  {
    question: 'Can I buy Schengen travel insurance through Visahouse?',
    answer:
      'Yes. We assist with Schengen-compliant travel medical policies meeting the mandatory €30,000 medical and repatriation requirement across all member states. See our Travel Insurance page to compare tiers.',
  },
  {
    question: 'Can I switch my itinerary completely after receiving a Schengen visa?',
    answer:
      'Substantially abandoning the primary country that issued your visa ("visa shopping") can cause questioning at European border control or harm future applications. Always build an honest itinerary anchored in the country you genuinely intend to prioritise.',
  },
];

export interface InsurancePlan {
  id: string;
  tierName: string;
  tagline: string;
  bestFor: string;
  medicalLimit: string;
  schengenCompliant: string;
  repatriation: string;
  baggageDelay: string;
  tripCancellation: string;
  deductibleNote: string;
  indicativePremium: string;
}

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'ins-regional',
    tierName: 'Asia & Gulf Essential',
    tagline: 'Focused emergency medical cover for regional holidays',
    bestFor: 'Thailand, Malaysia, Indonesia, Singapore, Sri Lanka, Nepal, Uzbekistan, and Bahrain trips.',
    medicalLimit: 'Confirm tier limit with our team (regional medical tiers)',
    schengenCompliant: 'No (Regional Asia / Middle East zone)',
    repatriation: 'Included per policy wording',
    baggageDelay: 'Included on qualifying tiers',
    tripCancellation: 'Optional add-on',
    deductibleNote: 'Policy deductible confirmed on schedule before issuance',
    indicativePremium: '',
  },
  {
    id: 'ins-schengen',
    tierName: 'Schengen Compliant €30,000+',
    tagline: 'Embassy-ready certificate formatted for VFS / BLS desks',
    bestFor: 'All Schengen Area visa applications (France, Italy, Spain, Germany, Switzerland, Netherlands, and more).',
    medicalLimit: 'Meets or exceeds mandatory €30,000 emergency medical minimum',
    schengenCompliant: 'Yes — full Schengen Area coverage + zero-gap date formatting',
    repatriation: 'Emergency medical evacuation & repatriation included',
    baggageDelay: 'Included per selected underwriter schedule',
    tripCancellation: 'Available on Enhanced Schengen tier',
    deductibleNote: 'Zero-deductible / low-deductible options verified per embassy preference',
    indicativePremium: '',
  },
  {
    id: 'ins-worldwide',
    tierName: 'Worldwide Including USA & Japan',
    tagline: 'Higher medical ceiling for high-cost healthcare destinations',
    bestFor: 'United States, Japan, South Korea, Canada, UK, and multi-region itineraries.',
    medicalLimit: 'Higher worldwide medical tier (confirm exact USD limit with our team)',
    schengenCompliant: 'Yes — covers Schengen plus Worldwide including North America',
    repatriation: 'Emergency evacuation & repatriation included',
    baggageDelay: 'Included with flight delay protection',
    tripCancellation: 'Available on Premier Worldwide tier',
    deductibleNote: 'Underwriter terms & age bands confirmed prior to issue',
    indicativePremium: '',
  },
];

export const INSURANCE_CLAIMS_STEPS = [
  {
    step: '01',
    title: 'Call the 24/7 Emergency Assistance Line First',
    detail:
      'Before admitting to a hospital abroad (wherever medically safe), contact the insurer’s 24-hour international assistance number printed on your policy certificate so they can open a case file and guide cashless or reimbursement procedures.',
  },
  {
    step: '02',
    title: 'Keep Every Original Medical & Airline Report',
    detail:
      'Retain original itemised hospital bills, doctor’s clinical diagnosis, prescriptions, payment receipts, boarding passes, and—for baggage or flight claims—the airline’s official Property Irregularity Report (PIR) or written delay letter.',
  },
  {
    step: '03',
    title: 'Notify Within the Policy Window',
    detail:
      'Submit your claim notification and clear scans within the insurer’s stated notice window (typically during the trip or shortly after returning to Pakistan).',
  },
  {
    step: '04',
    title: 'Visahouse Claim-Desk Guidance',
    detail:
      'While underwriting and claim settlements are decided solely by the licensed insurance provider, our team helps you organise required claim forms and follow up on documentation checklists.',
  },
];

export const INSURANCE_FAQS: FaqItem[] = [
  {
    question: 'What makes a travel insurance policy genuinely Schengen-compliant?',
    answer:
      'Under the Schengen Visa Code, a compliant policy must provide at least €30,000 in emergency medical care, hospitalisation, and medical repatriation, remain valid across the entire Schengen Area (not just one country), and cover every single day from arrival through departure—often with an extra grace buffer recommended by individual missions.',
  },
  {
    question: 'Are pre-existing medical conditions covered by standard travel insurance?',
    answer:
      'Most standard short-term travel policies exclude pre-existing illnesses or chronic conditions unless specifically declared and accepted in writing by the underwriter. Always disclose age and medical history honestly before purchasing so we match you to accurate policy terms.',
  },
  {
    question: 'Can I get my travel insurance dates shifted or refunded if my visa is delayed or refused?',
    answer:
      'Date-amendment and visa-refusal refund clauses vary by licensed underwriter. We confirm the exact modification and cancellation terms of your chosen policy in writing before you pay.',
  },
  {
    question: 'Is travel insurance mandatory for Thailand, Malaysia, or Japan?',
    answer:
      'While not always a strict consular upload for every Asian destination, carrying emergency medical cover is strongly recommended—hospital bills in Japan, Singapore, South Korea, or the USA can escalate rapidly from even a minor accident.',
  },
  {
    question: 'How quickly is a travel insurance certificate issued?',
    answer:
      'Once you confirm traveller passport details, age, destination zone, and policy terms, digital certificates are generally issued swiftly for visa filing—confirm exact turnaround with our team.',
  },
  {
    question: 'Does travel insurance cover high-altitude trekking in Nepal?',
    answer:
      'Standard leisure policies usually exclude trekking above specified elevation caps (commonly 3,000m) and helicopter rescue. Let our desk know if your trip includes Himalayan trekking or winter skiing so we quote an appropriate adventure-endorsement policy.',
  },
];

export const HOME_FAQS: FaqItem[] = [
  {
    question: 'Is Visahouse an embassy or authorised government body?',
    answer:
      'No. Visahouse is a private visa consultancy and travel documentation desk. We prepare files, audit bank statements and forms, guide official portal submissions, and arrange travel insurance, while all visa decisions rest strictly with the respective embassies and immigration authorities.',
  },
  {
    question: 'Can I apply through Visahouse completely online from anywhere in Pakistan?',
    answer:
      'Yes. Our entire intake, document audit, bank-statement review, itinerary drafting, and e-Visa preparation runs online via WhatsApp and email whether you live in Karachi, Lahore, Islamabad, Faisalabad, Multan, Peshawar, or Quetta. Where an embassy requires in-person biometrics or an interview, we prepare your complete paper folder in advance.',
  },
  {
    question: 'Why do some fee and processing fields say "Confirm with our team"?',
    answer:
      'Embassy fees, PKR exchange rates, authorised visa-centre charges, and consular processing windows shift frequently without long advance notice. Rather than publishing outdated or invented figures, we confirm the live official fee and current timeline on the day you enquire.',
  },
  {
    question: 'Do you guarantee visa approval or early embassy appointments?',
    answer:
      'Never—and we caution travellers against anyone who promises guaranteed visas or secret embassy slots. What we do commit to is clerical precision: clean forms, honest financial presentation, coherent itineraries, and zero avoidable filing mistakes.',
  },
  {
    question: 'Can Visahouse review my documents if I have been refused before?',
    answer:
      'Yes. Prior refusals require careful diagnosis before refiling. Share your refusal notice (if issued) and prior application summary so our desk can identify gaps in financial provenance, home ties, or itinerary logic before you spend another government fee.',
  },
  {
    question: 'How quickly will a consultant respond after I submit the inquiry form?',
    answer:
      'We respond during office hours (Monday to Saturday, 10:00 – 19:00 PKT) via WhatsApp or email with a tailored document checklist and live fee breakdown for your destination.',
  },
];
