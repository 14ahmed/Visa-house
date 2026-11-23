import type { DestinationData } from './types';

interface SchengenCountrySeed {
  slug: string;
  country: string;
  isoCode: string;
  accentHex: string;
  stampLabel: string;
  stampRotation: number;
  mrzCode: string;
  seoTitle: string;
  seoDescription: string;
  heroPromise: string;
  portalAndCentre: string;
  pakistanCities: string;
  jurisdictionNote: string;
  hostFormLabel: string;
  hostFormDetail: string;
  signatureCities: string;
  bestSeasonBody: string;
  overviewParagraph1: string;
  overviewParagraph2: string;
  entryTipsBody: string;
  countrySpecificRefusalTitle: string;
  countrySpecificRefusalCause: string;
  countrySpecificRefusalPrevention: string;
  countrySpecificFaqQ: string;
  countrySpecificFaqA: string;
  relatedSlugs: string[];
}

function buildSchengenDestination(seed: SchengenCountrySeed): DestinationData {
  const isHub = seed.slug === 'schengen-states';
  const targetLabel = isHub ? 'the Schengen Area' : seed.country;
  const visaName = isHub
    ? 'Schengen Short-Stay Visa (Type-C · 29 Member States)'
    : `${seed.country} Schengen Short-Stay Visa (Type-C)`;

  return {
    slug: seed.slug,
    country: seed.country,
    isoCode: seed.isoCode,
    region: 'Europe & UK',
    channel: 'Hybrid / Centre',
    accentHex: seed.accentHex,
    stampLabel: seed.stampLabel,
    stampRotation: seed.stampRotation,
    heroPromise: seed.heroPromise,
    seoTitle: seed.seoTitle,
    seoDescription: seed.seoDescription,
    facts: {
      visaType: visaName,
      entryType: 'Single or Multiple Entry (up to 90 days in any 180-day period)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: `V<${seed.isoCode}VISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<`,
      mrzLine2: `${seed.isoCode}0000000PAK0000000M0000000<<<<<<<<<<<<<<${seed.mrzCode}`,
    },
    whoCanApply: {
      intro: `Pakistani passport holders travelling to ${targetLabel} for leisure holidays, visiting relatives, or corporate meetings lodge a Schengen Short-Stay (Type-C) visa file via ${seed.portalAndCentre} across ${seed.pakistanCities}.`,
      profiles: [
        `Salaried professionals and managers with six-month stamped bank statements, FBR tax returns, and formal employer leave letters covering ${targetLabel}`,
        `Pakistani business owners and exporters with SECP/Chamber records visiting European trade partners or exhibitions in ${seed.signatureCities}`,
        `Families and couples planning multi-city European itineraries where ${isHub ? 'the Main-Destination Rule determines the filing embassy' : `${seed.country} represents the longest overnight stay`}`,
        `Relatives invited by legal residents or citizens in ${targetLabel} supported by ${seed.hostFormLabel}`,
      ],
      eligibilityNote: seed.jurisdictionNote,
    },
    checklist: [
      {
        groupTitle: 'Schengen Type-C Application & Identity',
        items: [
          {
            id: `${seed.slug}-passport`,
            label: 'Original Pakistani Passport & Prior Visa Copies',
            detail:
              'Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.',
            mandatory: true,
          },
          {
            id: `${seed.slug}-form`,
            label: `Harmonised Schengen Application Form (${seed.country})`,
            detail: `Completed via ${seed.portalAndCentre} with exact passport spelling, matching arrival/exit dates, and applicant signatures.`,
            mandatory: true,
          },
          {
            id: `${seed.slug}-photos`,
            label: 'Two ICAO Biometric Photographs (35mm × 45mm)',
            detail:
              'Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.',
            mandatory: true,
          },
          {
            id: `${seed.slug}-nadra`,
            label: 'CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof',
            detail:
              'Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Insurance, Financial Ties & Host / Itinerary Pack',
        items: [
          {
            id: `${seed.slug}-insurance`,
            label: 'Schengen-Compliant Travel Medical Insurance (€30,000+)',
            detail:
              'Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.',
            mandatory: true,
          },
          {
            id: `${seed.slug}-bank`,
            label: 'Six-Month Stamped Bank Statement & Maintenance Certificate',
            detail:
              'Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.',
            mandatory: true,
          },
          {
            id: `${seed.slug}-work`,
            label: 'Employer NOC & Pay Slips (or Business Registration Pack)',
            detail:
              'Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.',
            mandatory: true,
          },
          {
            id: `${seed.slug}-itinerary`,
            label: `Cover Letter, Hotel Bookings & ${seed.hostFormLabel}`,
            detail: `Day-by-day route across ${seed.signatureCities} with matching round-trip flight reservations; for sponsored visits include ${seed.hostFormDetail}.`,
            mandatory: true,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Main-Destination & Jurisdiction Verification',
        youDo: `Share every European city on your trip, your intended travel month, and your residential city in Pakistan (${seed.pakistanCities}).`,
        weDo: `Verify that ${isHub ? 'your main destination embassy is selected lawfully under the Schengen Visa Code' : `${seed.country} is your lawful primary filing mission`} and confirm current embassy & visa-centre PKR fees.`,
      },
      {
        stepNumber: '02',
        title: 'Financial Audit, Insurance & Visa File Drafting',
        youDo:
          'Send your passport scans, six-month bank statements, FBR tax returns, employment or business documents, and host letters if visiting family.',
        weDo: `Audit bank-line consistency, draft your ${seed.country} cover letter and rail/flight itinerary, and match your €30,000 Schengen travel insurance dates.`,
      },
      {
        stepNumber: '03',
        title: 'Official Visa-Centre Appointment Guidance',
        youDo: `Remain available for official OTP/portal confirmations and attend your scheduled appointment via ${seed.portalAndCentre}.`,
        weDo:
          'Guide legitimate booking strictly through official authorised visa-centre calendars—never unofficial brokers—and index your counter-ready paper packet.',
      },
      {
        stepNumber: '04',
        title: 'Biometrics, Passport Tracking & Border Readiness',
        youDo:
          'Provide biometric fingerprints in person at the visa centre and track courier/collection notices with our desk.',
        weDo: `Share border-entry readiness notes for ${targetLabel} covering printed insurance certificates, hotel vouchers, and 90/180-day stay compliance.`,
      },
    ],
    refusalReasons: [
      {
        title: seed.countrySpecificRefusalTitle,
        cause: seed.countrySpecificRefusalCause,
        prevention: seed.countrySpecificRefusalPrevention,
      },
      {
        title: 'Non-Compliant €30,000 Travel Insurance Wording or Date Gaps',
        cause:
          'Policies omitting explicit Schengen-wide repatriation coverage or falling even one day short of return flight dates trigger immediate centre or embassy pushback.',
        prevention:
          'We verify every travel insurance certificate line by line against your departure, landing, and return dates.',
      },
      {
        title: 'Unexplained Bank Deposits or Weak FBR Alignment',
        cause:
          'Recent lump-sum cash inflows unsupported by salary slips, business revenue, or FBR tax returns trigger doubts over genuine subsistence means.',
        prevention:
          'We audit six full months of statements alongside tax and employment proofs before your file reaches the visa officer.',
      },
    ],
    localNotes: {
      overview: [seed.overviewParagraph1, seed.overviewParagraph2],
      bestSeasonTitle: `Best Time to Visit ${seed.country}`,
      bestSeasonBody: seed.bestSeasonBody,
      citiesTitle: 'Key Cities & Regions',
      citiesBody: seed.signatureCities,
      entryTipsTitle: 'Schengen Border & Arrival Preparation',
      entryTipsBody: seed.entryTipsBody,
    },
    packages: [
      {
        id: `${seed.slug}-standard`,
        tabLabel: 'Tourist / Visitor',
        title: `${seed.country} Schengen Visa File & Filing Prep`,
        bestFor: `Pakistani tourists, couples, and families lodging a Type-C file for ${targetLabel}.`,
        serviceFee: '',
        turnaroundNote: 'Complete visa file drafting ahead of official VFS / BLS biometrics',
        includes: [
          `Main-Destination Rule verification & ${seed.country} Schengen form drafting`,
          'Six-month bank statement, FBR tax & employer NOC audit',
          'Tailored cover letter, realistic itinerary & €30,000 insurance check',
          'Tabbed physical packet index & official appointment guidance',
        ],
        excludesNote:
          'Excludes official Schengen embassy visa fee, authorised visa-centre biometrics charges, and travel insurance premium.',
      },
      {
        id: `${seed.slug}-business`,
        tabLabel: 'Business / Family Host',
        title: `${seed.country} Corporate & Sponsored Visit Pack`,
        bestFor: `Business delegates or family visitors carrying ${seed.hostFormLabel}.`,
        serviceFee: '',
        turnaroundNote: 'Includes official European host / invitation document audit',
        includes: [
          'Everything in Tourist / Visitor preparation',
          `Verification of ${seed.hostFormLabel} and European sponsor records`,
          'Prior Schengen refusal diagnosis (if reapplying)',
          'Direct WhatsApp consultant follow-up through passport release',
        ],
        excludesNote:
          'Excludes official Schengen embassy fees, visa-centre logistics, and travel insurance.',
      },
    ],
    faqs: [
      {
        question: seed.countrySpecificFaqQ,
        answer: seed.countrySpecificFaqA,
      },
      {
        question: `How early should Pakistani passport holders apply for ${targetLabel}?`,
        answer:
          'Under the Schengen Visa Code, short-stay applications may generally be lodged up to six months ahead of travel. Starting 10 to 14 weeks early is strongly advised ahead of summer, Eid, or Christmas travel peaks so you can book a legitimate visa-centre appointment calmly.',
      },
      {
        question: `Is €30,000 travel medical insurance mandatory for ${seed.country}?`,
        answer:
          'Yes. Every Schengen Type-C applicant must present a compliant travel medical policy offering at least €30,000 in emergency medical care and repatriation valid across all Schengen member states for the entire trip.',
      },
      {
        question: `Can I visit other European countries on a ${seed.country} Schengen visa?`,
        answer: isHub
          ? 'Yes—a uniform Schengen Type-C visa permits seamless internal border travel across all 29 Schengen states provided you lodge your application with your true main-destination embassy.'
          : `Yes—once issued a uniform Type-C visa by ${seed.country}, you may visit neighbouring Schengen countries on the same itinerary as long as ${seed.country} remains your honest primary destination.`,
      },
      {
        question: 'Does Visahouse guarantee an appointment date or Schengen approval?',
        answer:
          'No. Official appointment slots are released solely by embassies and authorised visa centres, and visa decisions rest exclusively with embassy authorities. We focus on building an audit-clean visa file and guiding official booking properly.',
      },
      {
        question: 'Do I have to appear in person for Schengen biometrics in Pakistan?',
        answer: `Yes—applicants attend their booked appointment via ${seed.portalAndCentre} in person to submit their folder and fingerprints unless an active VIS biometric exemption applies under current mission policy.`,
      },
    ],
    relatedSlugs: seed.relatedSlugs,
  };
}

const SCHENGEN_SEEDS: SchengenCountrySeed[] = [
  {
    slug: 'schengen-states',
    country: 'Schengen States',
    isoCode: 'SCH',
    accentHex: '#0F5C4B',
    stampLabel: 'EUROPE · SCH',
    stampRotation: -3,
    mrzCode: '18',
    seoTitle: 'Schengen States Visa from Pakistan — Guide | Visahouse',
    seoDescription:
      'Prepare a multi-country Schengen States Type-C visa from Pakistan with Main-Destination audit, €30,000 insurance, and VFS/BLS prep.',
    heroPromise:
      'Complete multi-country Schengen Area (29 States) Type-C visa file auditing, Main-Destination embassy selection, €30,000 travel insurance alignment, and official VFS/BLS guidance from Pakistan.',
    portalAndCentre: 'Authorised Visa Centres (VFS Global, BLS International, Gerry’s & Embassy calendars)',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Under the Schengen Visa Code, multi-country travellers must file at the embassy of their main destination (most overnight stays)—or the country of first entry only when nights are split equally.',
    hostFormLabel: 'Official Host Sponsorship / Business Invitation',
    hostFormDetail: 'municipality-verified sponsorship or corporate host invitation from your primary Schengen state',
    signatureCities: 'Paris, Rome, Barcelona, Berlin, Amsterdam, Zurich, Vienna, Lisbon, Athens, and Stockholm',
    bestSeasonBody:
      'April to June and September to October deliver balanced weather, calmer museum queues, and better appointment planning than mid-July peak summer.',
    overviewParagraph1:
      'The Schengen Area spans 29 European countries operating a common short-stay border regime—allowing Pakistani travellers with a single uniform Type-C visa to move smoothly by high-speed rail or regional flight across Western, Central, Southern, and Northern Europe.',
    overviewParagraph2:
      'Successful Schengen filings from Pakistan hinge on three pillars: applying to the legally correct embassy under the Main-Destination Rule, demonstrating clean six-month bank continuity backed by FBR tax returns, and pairing verifiable hotel reservations with compliant €30,000 medical insurance.',
    entryTipsBody:
      'Carry printed copies of your return flights, hotel bookings across all Schengen countries, €30,000 insurance certificate, and bank card/funds proof at your first European port of entry.',
    countrySpecificRefusalTitle: 'Applying to the Wrong Embassy (Main-Destination Error)',
    countrySpecificRefusalCause:
      'Lodging with whichever country appears to have earlier slots rather than your longest-stay destination violates the Schengen Visa Code and triggers refusals or border questioning.',
    countrySpecificRefusalPrevention:
      'We calculate your exact overnight stay count across every Schengen country before drafting a single form.',
    countrySpecificFaqQ: 'Which embassy should I apply to when visiting multiple Schengen States?',
    countrySpecificFaqA:
      'Apply to the embassy or authorised visa centre of the Schengen country where you will spend the highest number of nights. Only if two or more countries have identical overnight counts do you apply to the country of first entry.',
    relatedSlugs: ['france', 'germany', 'switzerland', 'netherlands'],
  },
  {
    slug: 'germany',
    country: 'Germany',
    isoCode: 'DEU',
    accentHex: '#2B3A42',
    stampLabel: 'BERLIN · DEU',
    stampRotation: 3,
    mrzCode: '19',
    seoTitle: 'Germany Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Prepare a Germany Schengen visa from Pakistan with VIDEX form drafting, bank-statement checks, Messe trade-fair prep, and jurisdiction guidance.',
    heroPromise:
      'Precision Germany Schengen (VIDEX) form drafting, Islamabad vs Karachi embassy jurisdiction checks, trade-fair (Messe) invitations, and Verpflichtungserklärung review for Pakistani travellers.',
    portalAndCentre: 'VIDEX Online Form & Authorised German Mission / Visa Centre Channel',
    pakistanCities: 'Islamabad (Federal, Punjab, KP, AJK, GB) and Karachi (Sindh & Balochistan)',
    jurisdictionNote:
      'Germany enforces strict territorial jurisdiction in Pakistan between the Embassy in Islamabad and the Consulate General in Karachi based on your verified residential province.',
    hostFormLabel: 'Formal Verpflichtungserklärung (Formal Obligation)',
    hostFormDetail: 'an original municipality-issued Verpflichtungserklärung from your German host or trade-fair Messe invitation',
    signatureCities: 'Berlin, Munich, Frankfurt, Hamburg, Cologne, Düsseldorf, and Heidelberg',
    bestSeasonBody:
      'May through September brings warm Bavarian and Rhine sightseeing weather; spring and autumn host major Messe industrial trade fairs in Frankfurt, Munich, and Düsseldorf.',
    overviewParagraph1:
      'Germany is one of Pakistan’s most important European partners for both commercial trade-fair travel (Medica, Heimtextil, Automechanika, ITB Berlin) and cultural holidays linking Berlin’s history, Munich’s Bavarian Alps, and Frankfurt’s financial hub.',
    overviewParagraph2:
      'German embassy sections expect exact documentary discipline: clean VIDEX barcode printouts, bank-stamped six-month statements aligned with FBR tax returns, and unambiguous employer leave or SECP/Chamber business verification.',
    entryTipsBody:
      'Frankfurt and Munich border officers routinely ask to see your return ticket, Messe badge or hotel bookings, and printed €30,000 travel medical policy on arrival.',
    countrySpecificRefusalTitle: 'VIDEX Barcode Errors or Wrong Embassy Jurisdiction',
    countrySpecificRefusalCause:
      'Submitting hand-edited VIDEX printouts or booking under Islamabad while residing in Sindh leads to instant counter turn-aways.',
    countrySpecificRefusalPrevention:
      'We verify your CNIC/residence jurisdiction first and generate a spotless, error-free VIDEX PDF before your appointment.',
    countrySpecificFaqQ: 'What is a Verpflichtungserklärung for a Germany visit visa?',
    countrySpecificFaqA:
      'It is an official formal obligation letter issued by a local Ausländerbehörde (foreigners authority) in Germany where your host legally undertakes financial and accommodation responsibility during your stay.',
    relatedSlugs: ['austria', 'switzerland', 'netherlands', 'france'],
  },
  {
    slug: 'france',
    country: 'France',
    isoCode: 'FRA',
    accentHex: '#23395B',
    stampLabel: 'PARIS · FRA',
    stampRotation: -4,
    mrzCode: '20',
    seoTitle: 'France Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a France Schengen visa from Pakistan with France-Visas portal drafting, itinerary alignment, bank audit, and VFS/Gerry’s prep.',
    heroPromise:
      'France-Visas portal form drafting, Paris & French Riviera day-by-day itinerary alignment, Attestation d’accueil host checks, and official visa-centre preparation from Pakistan.',
    portalAndCentre: 'France-Visas Portal & Authorised Visa Centre (VFS Global / Gerry’s)',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'All short-stay France applications from Pakistan begin on the official France-Visas portal before scheduling biometric submission at an authorised centre in Islamabad, Lahore, or Karachi.',
    hostFormLabel: 'Attestation d’accueil (Mairie Host Certificate)',
    hostFormDetail: 'an original municipality-stamped Attestation d’accueil from your French host when staying in a private residence',
    signatureCities: 'Paris, Nice, Lyon, Marseille, Cannes, Annecy, and Strasbourg',
    bestSeasonBody:
      'April to June and September to October offer pleasant Parisian café weather and sunlit Riviera coasts without August holiday crowds.',
    overviewParagraph1:
      'France consistently ranks among the most popular Schengen destinations for Pakistani families, honeymooners, and executives—combining Paris’s iconic boulevards and museums with Lyon’s gastronomy, the Côte d’Azur in Nice, and Alpine towns near Annecy and Chamonix.',
    overviewParagraph2:
      'Visa officers reviewing France-Visas visa files value coherent, well-paced itineraries supported by matching hotel confirmations, realistic daily spending capacity on six-month bank statements, and clear proof of return employment or business commitments in Pakistan.',
    entryTipsBody:
      'At Paris Charles de Gaulle or Nice border control, keep printed hotel vouchers, TGV/intercity tickets if booked, return flights, and your €30,000 travel insurance schedule accessible.',
    countrySpecificRefusalTitle: 'Incomplete Private-Stay Attestation d’accueil',
    countrySpecificRefusalCause:
      'Planning to stay with friends or relatives in France using an informal email instead of the official Mairie-stamped Attestation d’accueil frequently causes refusal.',
    countrySpecificRefusalPrevention:
      'We clarify early whether verified hotel reservations or an original Attestation d’accueil applies to your exact trip.',
    countrySpecificFaqQ: 'Do I fill out the France-Visas online portal before booking my appointment?',
    countrySpecificFaqA:
      'Yes. You must complete your official France-Visas application and generate the receipt reference before securing your biometric submission appointment at the authorised centre in Pakistan.',
    relatedSlugs: ['switzerland', 'belgium', 'netherlands', 'schengen-states'],
  },
  {
    slug: 'greece',
    country: 'Greece',
    isoCode: 'GRC',
    accentHex: '#1A5276',
    stampLabel: 'ATHENS · GRC',
    stampRotation: 4,
    mrzCode: '21',
    seoTitle: 'Greece Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Prepare a Greece Schengen visa from Pakistan with Athens & island ferry itinerary alignment, bank audit, and visa-centre guidance.',
    heroPromise:
      'Structured Greece Schengen visa file drafting, Athens & Aegean island (Santorini, Mykonos, Crete) transit alignment, and official visa-centre preparation for Pakistani travellers.',
    portalAndCentre: 'Embassy of Greece Islamabad / Authorised Visa Centre (GVCW / VFS)',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Greece processes Pakistani Schengen applications through its authorised visa centres in Pakistan routed to the Embassy of Greece in Islamabad; summer appointment demand peaks sharply from March onward.',
    hostFormLabel: 'Notarised Greek Host Declaration (Solemn Declaration)',
    hostFormDetail: 'an official KEP/gov.gr verified host solemn declaration and residency proof if staying privately in Greece',
    signatureCities: 'Athens, Santorini, Mykonos, Crete (Heraklion & Chania), Rhodes, and Thessaloniki',
    bestSeasonBody:
      'May to June and September to mid-October offer warm Aegean seas and comfortable Acropolis sightseeing without July–August peak heat.',
    overviewParagraph1:
      'Greece pairs classical antiquities in Athens and Delphi with sun-drenched island escapes across Santorini, Mykonos, Crete, and Rhodes—making it a top choice for Pakistani honeymooners and summer family holidays.',
    overviewParagraph2:
      'Because Greek island itineraries involve domestic flights or Aegean ferry crossings from Piraeus, embassy reviewers inspect whether every single island hotel night and inter-island transfer fits together realistically.',
    entryTipsBody:
      'Keep printed hotel vouchers for both Athens and your island stays plus ferry/flight reservations handy when clearing Athens Eleftherios Venizelos Airport.',
    countrySpecificRefusalTitle: 'Disconnected Island Hotel Dates & Missing Transit Logic',
    countrySpecificRefusalCause:
      'Listing Athens, Santorini, Mykonos, and Crete with overlapping hotel dates or unexplained ferry/flight transitions undermines itinerary credibility.',
    countrySpecificRefusalPrevention:
      'We build a realistic day-by-day Aegean route matching exact port schedules, hotel nights, and return flights to Athens.',
    countrySpecificFaqQ: 'When should I start preparing a summer Greece Schengen visa from Pakistan?',
    countrySpecificFaqA:
      'Because Greek island summer travel peaks from May to September, starting your visa file and monitoring official appointment slots 3 to 4 months ahead is strongly recommended.',
    relatedSlugs: ['portugal', 'france', 'austria', 'schengen-states'],
  },
  {
    slug: 'portugal',
    country: 'Portugal',
    isoCode: 'PRT',
    accentHex: '#1F614A',
    stampLabel: 'LISBON · PRT',
    stampRotation: -3,
    mrzCode: '22',
    seoTitle: 'Portugal Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a Portugal Schengen visa from Pakistan with Termo de Responsabilidade checks, bank audit, and Lisbon & Porto itinerary prep.',
    heroPromise:
      'Portugal Schengen Type-C file preparation, Lisbon, Porto & Algarve itinerary drafting, bank-statement auditing, and official mission/centre guidance from Pakistan.',
    portalAndCentre: 'Embassy of Portugal Islamabad / Authorised Visa Centre Channel',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Verify live appointment release calendars and authorised submission channels with our desk early, as Portugal visa slots from Pakistan fill rapidly across spring and summer.',
    hostFormLabel: 'Termo de Responsabilidade (Statement of Responsibility)',
    hostFormDetail: 'an authenticated Portuguese Termo de Responsabilidade plus host residency and income proofs where staying with a sponsor',
    signatureCities: 'Lisbon, Sintra, Porto, Cascais, Coimbra, and the Algarve (Faro & Lagos)',
    bestSeasonBody:
      'April to June and September to October deliver sunny coastal weather in Lisbon and the Algarve with mild temperatures for Porto and Douro Valley trips.',
    overviewParagraph1:
      'Portugal blends tiled historic quarters in Lisbon and Porto with Atlantic cliffs in the Algarve and palace estates in Sintra—becoming an increasingly favoured European destination for Pakistani tourists and business delegates.',
    overviewParagraph2:
      'Clean Portugal Schengen applications rely on consistent six-month bank history, active FBR taxpayer records, verifiable return flight itineraries, and coherent rail connections between Lisbon, Porto, and Faro.',
    entryTipsBody:
      'Carry printed accommodation confirmations, €30,000 Schengen travel insurance, and return tickets when arriving at Lisbon Humberto Delgado or Porto Airport.',
    countrySpecificRefusalTitle: 'Incomplete Financial Provenance or Unverified Host Papers',
    countrySpecificRefusalCause:
      'Submitting unauthenticated sponsor letters or short bank histories without FBR returns weakens short-stay assessment.',
    countrySpecificRefusalPrevention:
      'We audit your six-month bank statements, FBR filings, and Termo de Responsabilidade authentication requirements before filing.',
    countrySpecificFaqQ: 'What is a Termo de Responsabilidade for Portugal?',
    countrySpecificFaqA:
      'It is the official Portuguese Statement of Responsibility signed and authenticated by a legal resident or citizen in Portugal who is hosting your accommodation or stay.',
    relatedSlugs: ['france', 'greece', 'morocco', 'schengen-states'],
  },
  {
    slug: 'hungary',
    country: 'Hungary',
    isoCode: 'HUN',
    accentHex: '#8C3B2B',
    stampLabel: 'BUDAPEST · HUN',
    stampRotation: 3,
    mrzCode: '23',
    seoTitle: 'Hungary Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Prepare a Hungary Schengen visa from Pakistan with Budapest itinerary drafting, bank-statement audit, and Islamabad / VFS filing prep.',
    heroPromise:
      'Hungary Schengen Type-C visa file preparation, Budapest & Central European rail itinerary structuring, financial auditing, and official visa-centre guidance from Pakistan.',
    portalAndCentre: 'Embassy of Hungary Islamabad & Authorised Visa Centre (VFS Global)',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Hungary evaluates Pakistani short-stay visa files through the Embassy in Islamabad via authorised visa centres; verify Main-Destination night counts if pairing Budapest with Vienna or Prague.',
    hostFormLabel: 'Official Letter of Invitation (NDGAP Verified)',
    hostFormDetail: 'an official invitation approved by Hungary’s National Directorate-General for Aliens Policing (NDGAP) when sponsored',
    signatureCities: 'Budapest, Szentendre, Eger, Pécs, and Lake Balaton',
    bestSeasonBody:
      'April to June and September to October offer crisp Danube evenings and vibrant outdoor cafés; December showcases Budapest’s famous winter Christmas markets.',
    overviewParagraph1:
      'Hungary’s capital Budapest—split by the Danube into hilly Buda and lively Pest—offers grand architecture, thermal baths, and straightforward rail links to Vienna and Bratislava, making it an appealing Central European hub for Pakistani travellers.',
    overviewParagraph2:
      'Embassy officers examine accommodation confirmations, €30,000 insurance schedules, and steady six-month bank statements carefully, especially when travellers combine Hungary with neighbouring Austria or Czechia.',
    entryTipsBody:
      'Keep printed hotel vouchers, return flights from Budapest Ferenc Liszt Airport, and your Schengen insurance certificate accessible during arrival screening.',
    countrySpecificRefusalTitle: 'Unclear Central Europe Multi-City Night Allocation',
    countrySpecificRefusalCause:
      'Booking more nights in Austria or Germany while applying at the Hungarian mission breaches the Main-Destination Rule.',
    countrySpecificRefusalPrevention:
      'We audit your rail itinerary so Budapest/Hungary legitimately accounts for the majority of overnight stays.',
    countrySpecificFaqQ: 'Can I combine Budapest with Vienna on a Hungary Schengen visa?',
    countrySpecificFaqA:
      'Yes—Budapest and Vienna are under three hours apart by train. Simply ensure Hungary is your primary destination (most nights) and list both cities transparently in your itinerary.',
    relatedSlugs: ['austria', 'poland', 'germany', 'schengen-states'],
  },
  {
    slug: 'poland',
    country: 'Poland',
    isoCode: 'POL',
    accentHex: '#9A2E3A',
    stampLabel: 'WARSAW · POL',
    stampRotation: -3,
    mrzCode: '24',
    seoTitle: 'Poland Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a Poland Schengen visa from Pakistan with e-Konsulat / visa-centre form drafting, bank audit, and Warsaw & Kraków prep.',
    heroPromise:
      'Poland Schengen Type-C visa file auditing, e-Konsulat form precision, Voivodeship invitation verification, and Warsaw/Kraków itinerary planning for Pakistani passport holders.',
    portalAndCentre: 'e-Konsulat System & Embassy of Poland Islamabad / Authorised Centre',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Poland manages visa appointment registration strictly through official e-Konsulat / authorised centre queues under the Embassy of Poland in Islamabad—watch slot releases early and never use unofficial agents.',
    hostFormLabel: 'Voivodeship Registered Invitation (Zaproszenie)',
    hostFormDetail: 'an official invitation registered with the local Polish Voivode office for sponsored family or private visits',
    signatureCities: 'Warsaw, Kraków, Gdańsk, Wrocław, Zakopane, and Poznań',
    bestSeasonBody:
      'May through September provides warm, sunny sightseeing across Warsaw, Kraków’s Old Town, and the Tatra Mountains near Zakopane.',
    overviewParagraph1:
      'Poland combines historic market squares in Kraków and Gdańsk with Warsaw’s dynamic business district and scenic alpine foothills in Zakopane—drawing Pakistani corporate visitors, trade buyers, and cultural tourists alike.',
    overviewParagraph2:
      'Polish embassy files require crisp consistency across e-Konsulat application entries, six-month stamped bank statements, FBR tax documentation, and formal Polish business or Voivodeship host invitations.',
    entryTipsBody:
      'Carry printed accommodation confirmations, return tickets, and €30,000 Schengen travel insurance when arriving at Warsaw Chopin or Kraków Airport.',
    countrySpecificRefusalTitle: 'Informal Private Invitations Missing Voivodeship Registration',
    countrySpecificRefusalCause:
      'Relying on an unregistered personal letter instead of an official Zaproszenie when claiming host sponsorship in Poland often results in refusal.',
    countrySpecificRefusalPrevention:
      'We verify whether self-funded tourism with confirmed hotels or a registered Zaproszenie fits your trip cleanly.',
    countrySpecificFaqQ: 'Does Poland accept an informal email invitation from a friend in Warsaw?',
    countrySpecificFaqA:
      'For formal sponsored private visits, Polish consulates expect an official invitation registered with the Voivodeship office (Zaproszenie). Self-funded tourists can instead apply cleanly with confirmed hotel bookings and their own strong bank statements.',
    relatedSlugs: ['germany', 'hungary', 'austria', 'schengen-states'],
  },
  {
    slug: 'netherlands',
    country: 'Netherlands',
    isoCode: 'NLD',
    accentHex: '#B85D19',
    stampLabel: 'AMSTERDAM · NLD',
    stampRotation: 4,
    mrzCode: '25',
    seoTitle: 'Netherlands Visa from Pakistan — Checklist | Visahouse',
    seoDescription:
      'Prepare a Netherlands Schengen visa from Pakistan with digital portal drafting, Bewijs van garantstelling checks, and VFS Global prep.',
    heroPromise:
      'Netherlands Schengen online form preparation, Amsterdam & Benelux itinerary structuring, financial auditing, and official VFS Global biometric guidance across Pakistan.',
    portalAndCentre: 'Official Netherlands Visa Portal & VFS Global Centres',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Pakistani applicants complete the official Netherlands Schengen digital form before booking biometric submission at VFS Global in Islamabad, Lahore, or Karachi.',
    hostFormLabel: 'Bewijs van garantstelling (Municipality Proof of Sponsorship)',
    hostFormDetail: 'a Dutch municipality-legalised Proof of Sponsorship and/or Private Accommodation form plus host payslips',
    signatureCities: 'Amsterdam, Rotterdam, Utrecht, The Hague, Delft, and Haarlem',
    bestSeasonBody:
      'April and early May showcase Keukenhof tulip gardens; May through September offers pleasant canal-side cycling and long northern European daylight.',
    overviewParagraph1:
      'The Netherlands is a premier European gateway for Pakistani tourists, agriculture and tech business delegations, and visiting families—anchored by Amsterdam’s canals, Rotterdam’s modern port architecture, Utrecht’s historic centre, and easy rail access to Belgium and Germany.',
    overviewParagraph2:
      'Dutch embassy reviewers appreciate concise, well-indexed documentation: clean six-month bank statements, FBR tax filings, verifiable hotel or legalised Dutch host sponsorship, and zero date discrepancies on €30,000 travel insurance.',
    entryTipsBody:
      'Amsterdam Schiphol border officers routinely verify your return ticket, hotel booking or legalised sponsor form, and Schengen travel medical certificate.',
    countrySpecificRefusalTitle: 'Unlegalised Dutch Sponsor Form',
    countrySpecificRefusalCause:
      'Submitting a signed Proof of Sponsorship form without the Dutch municipality (Gemeente) signature legalisation stamp invalidates sponsorship support.',
    countrySpecificRefusalPrevention:
      'We send your Dutch host a clear Gemeente legalisation checklist alongside required salary slips before booking VFS.',
    countrySpecificFaqQ: 'What is a Bewijs van garantstelling for a Netherlands visit visa?',
    countrySpecificFaqA:
      'It is the official Dutch Proof of Sponsorship and/or Private Accommodation form that your host in the Netherlands must have legalised at their local municipality (Gemeente) before sending to you.',
    relatedSlugs: ['belgium', 'luxembourg', 'germany', 'france'],
  },
  {
    slug: 'norway',
    country: 'Norway',
    isoCode: 'NOR',
    accentHex: '#1D4E6B',
    stampLabel: 'OSLO · NOR',
    stampRotation: -4,
    mrzCode: '26',
    seoTitle: 'Norway Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a Norway Schengen visa from Pakistan with UDI Application Portal drafting, sponsorship checks, and VFS Global preparation.',
    heroPromise:
      'UDI Application Portal drafting, Norwegian family-sponsorship verification, fjord itinerary alignment, and VFS Global biometric preparation for Pakistani passport holders.',
    portalAndCentre: 'UDI Application Portal & VFS Global Centres in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Norway requires completing and paying online through the official UDI Application Portal prior to booking your physical document drop-off and biometrics at VFS Global in Pakistan.',
    hostFormLabel: 'UDI Sponsorship Form (Garantiskjema for besøk)',
    hostFormDetail: 'an official Norwegian police-stamped Sponsorship Form or digital UDI sponsor guarantee plus host tax/income records',
    signatureCities: 'Oslo, Bergen, Flåm, Stavanger, Trondheim, and Tromsø',
    bestSeasonBody:
      'June through August brings midnight sun and open western fjord routes around Bergen and Geiranger; November to March is prime for Tromsø Northern Lights.',
    overviewParagraph1:
      'Norway shares deep family and community ties with Pakistan—particularly around Oslo and Drammen—while also attracting leisure travellers to Bergen’s UNESCO wharf, dramatic western fjords, and Arctic Northern Lights in Tromsø.',
    overviewParagraph2:
      'Because Norway has a high cost of living and strict sponsorship rules, UDI and embassy caseworkers carefully verify either robust personal savings on six-month Pakistani bank statements or properly stamped Norwegian host sponsorship guarantees.',
    entryTipsBody:
      'Keep printed hotel vouchers or your UDI host guarantee copy, return tickets, and €30,000 travel medical policy ready at Oslo Gardermoen Airport.',
    countrySpecificRefusalTitle: 'Incomplete Norwegian Family Sponsorship Proof',
    countrySpecificRefusalCause:
      'Visiting relatives in Oslo without the formal police-verified UDI Sponsorship Form (where the host funds the trip) or missing relationship proof via NADRA FRC causes delays or refusal.',
    countrySpecificRefusalPrevention:
      'We verify your NADRA FRC relationship link and guide your Norwegian sponsor through UDI documentation rules upfront.',
    countrySpecificFaqQ: 'Do I register on the UDI portal before visiting VFS Global for Norway?',
    countrySpecificFaqA:
      'Yes. Norway requires online registration and official fee payment on the UDI Application Portal first; you then print the UDI cover letter and attend VFS Global in Pakistan with your supporting documents.',
    relatedSlugs: ['sweden', 'denmark', 'finland', 'schengen-states'],
  },
  {
    slug: 'denmark',
    country: 'Denmark',
    isoCode: 'DNK',
    accentHex: '#8E2932',
    stampLabel: 'COPENHAGEN · DNK',
    stampRotation: 3,
    mrzCode: '27',
    seoTitle: 'Denmark Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Prepare a Denmark Schengen visa from Pakistan with ApplyVisa portal drafting, VU2/VU1 invitation checks, and VFS Global guidance.',
    heroPromise:
      'ApplyVisa portal drafting, official VU1/VU2 invitation verification, six-month financial auditing, and VFS Global biometric prep for Pakistani applicants heading to Denmark.',
    portalAndCentre: 'Official ApplyVisa Portal & VFS Global Centres in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Denmark assesses visa applications under specific country-group rules and requires online registration via ApplyVisa followed by biometric submission at VFS Global in Pakistan.',
    hostFormLabel: 'Official VU2 (Private) or VU1 (Business) Invitation Form',
    hostFormDetail: 'a digitally submitted MitID-signed VU2 family/friend invitation or VU1 corporate invitation with invitation ID',
    signatureCities: 'Copenhagen, Aarhus, Odense, Roskilde, and Helsingør',
    bestSeasonBody:
      'May through September delivers bright Scandinavian summer days ideal for Copenhagen canals, Tivoli Gardens, and coastal cycling.',
    overviewParagraph1:
      'Denmark is a welcoming Nordic hub for Pakistani family visits, maritime and green-energy business delegates, and design-minded travellers exploring Copenhagen’s harbourfront, historic castles, and Aarhus.',
    overviewParagraph2:
      'Danish immigration authorities place strong importance on official MitID-verified VU1/VU2 invitations (for hosted visits) alongside transparent employment, tax, and financial ties in Pakistan.',
    entryTipsBody:
      'Carry your printed ApplyVisa cover sheet summary, hotel bookings or VU2 invitation ID, return flights, and €30,000 Schengen medical policy at Copenhagen Kastrup Airport.',
    countrySpecificRefusalTitle: 'Missing Official VU1 / VU2 Invitation Reference ID',
    countrySpecificRefusalCause:
      'Hosted business or family applicants submitting an informal PDF letter instead of Denmark’s official MitID-authenticated VU1/VU2 invitation often face processing blocks.',
    countrySpecificRefusalPrevention:
      'We guide your Danish host to issue the digital VU1/VU2 invitation ID before you attend your VFS Global appointment.',
    countrySpecificFaqQ: 'What is a VU2 or VU1 form for a Denmark visa?',
    countrySpecificFaqA:
      'VU2 is Denmark’s official online invitation form for private/family visits (and VU1 for business visits) completed by your Danish host using MitID, generating an official invitation ID linked directly to your ApplyVisa file.',
    relatedSlugs: ['sweden', 'norway', 'germany', 'schengen-states'],
  },
  {
    slug: 'belgium',
    country: 'Belgium',
    isoCode: 'BEL',
    accentHex: '#6E4C1E',
    stampLabel: 'BRUSSELS · BEL',
    stampRotation: -3,
    mrzCode: '28',
    seoTitle: 'Belgium Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a Belgium Schengen visa from Pakistan with Visa-on-Web form drafting, Annex 3bis host checks, and VFS Global prep.',
    heroPromise:
      'Belgium Visa-on-Web drafting, Annex 3bis sponsorship verification, Brussels EU/corporate invitation checks, and official VFS Global preparation from Pakistan.',
    portalAndCentre: 'Visa-on-Web (VOW) Portal & VFS Global Centres in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Short-stay Belgium filings from Pakistan start on the official Visa-on-Web (FPS Foreign Affairs) portal prior to biometric drop-off at VFS Global in Islamabad, Lahore, or Karachi.',
    hostFormLabel: 'Annex 3bis (Engagement de prise en charge)',
    hostFormDetail: 'an original municipality-legalised Annex 3bis formal pledge of financial support plus Belgian host income proofs',
    signatureCities: 'Brussels, Bruges, Ghent, Antwerp, and Leuven',
    bestSeasonBody:
      'April to June and September to October offer comfortable walking weather across Bruges canals, Ghent medieval plazas, and Brussels parks.',
    overviewParagraph1:
      'Belgium sits at the geographic and institutional crossroads of Western Europe—combining Brussels’ EU institutions and corporate meetings with fairy-tale medieval canals in Bruges and Ghent and Antwerp’s trade heritage.',
    overviewParagraph2:
      'Because Belgium is compact and frequently paired with the Netherlands, Luxembourg, or France, clean visa files show clear hotel night allocations, bank-statement continuity, and properly legalised Annex 3bis paperwork whenever a Belgian host sponsors costs.',
    entryTipsBody:
      'Keep printed hotel vouchers, Thalys/Eurostar rail tickets if continuing to Paris or Amsterdam, return flights, and €30,000 insurance handy at Brussels Zaventem Airport.',
    countrySpecificRefusalTitle: 'Incomplete Annex 3bis Municipality Legalisation',
    countrySpecificRefusalCause:
      'Claiming Belgian host financial support without a municipality-stamped Annex 3bis and three recent host salary slips triggers refusal.',
    countrySpecificRefusalPrevention:
      'We verify every Annex 3bis legalisation detail—or structure a clean self-funded hotel visa file—before booking VFS.',
    countrySpecificFaqQ: 'What is Annex 3bis for a Belgium Schengen visa?',
    countrySpecificFaqA:
      'Annex 3bis (Engagement de prise en charge / Verbintenis tot tenlasteneming) is the official municipality-stamped sponsorship form used when a resident in Belgium formally guarantees your travel and stay expenses.',
    relatedSlugs: ['netherlands', 'luxembourg', 'france', 'germany'],
  },
  {
    slug: 'luxembourg',
    country: 'Luxembourg',
    isoCode: 'LUX',
    accentHex: '#2A627A',
    stampLabel: 'LUXEMBOURG · LUX',
    stampRotation: 4,
    mrzCode: '29',
    seoTitle: 'Luxembourg Visa from Pakistan — Checklist | Visahouse',
    seoDescription:
      'Prepare a Luxembourg Schengen visa from Pakistan with embassy representation checks, bank audit, and Benelux itinerary alignment.',
    heroPromise:
      'Luxembourg Schengen Type-C representation verification, Engagement de prise en charge review, financial auditing, and Benelux route planning for Pakistani applicants.',
    portalAndCentre: 'Authorised Schengen Representation / VFS Global Channel in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Because Luxembourg handles short-stay Schengen visa representation in Pakistan through designated partner missions/visa centres, our desk confirms the exact live filing channel before you prepare forms.',
    hostFormLabel: 'Engagement de prise en charge (Ministry Certified)',
    hostFormDetail: 'an official Luxembourg Ministry of Foreign Affairs validated Engagement de prise en charge from your host',
    signatureCities: 'Luxembourg City, Vianden, Echternach, and the Moselle Valley',
    bestSeasonBody:
      'May through September delivers lush green valleys, scenic castle trails around Vianden, and pleasant café weather in Luxembourg City.',
    overviewParagraph1:
      'Luxembourg pairs dramatic fortress cliffs and UNESCO Old Quarters in Luxembourg City with one of Europe’s premier banking and fintech hubs—and offers completely free nationwide public transport across trains, trams, and buses.',
    overviewParagraph2:
      'Pakistani business delegates and Benelux leisure travellers applying for Luxembourg benefit from verifying live embassy representation early and keeping bank balances, corporate invitations, and hotel confirmations aligned with high Western European daily budgets.',
    entryTipsBody:
      'Keep your printed hotel reservation, corporate invitation (if applicable), return ticket, and €30,000 Schengen insurance ready whether arriving via Luxembourg Findel Airport or by rail from Brussels or Paris.',
    countrySpecificRefusalTitle: 'Filing Under an Outdated Embassy Representation Channel',
    countrySpecificRefusalCause:
      'Schengen representation agreements for smaller European states can change; applying through the wrong partner embassy wastes appointment lead time.',
    countrySpecificRefusalPrevention:
      'We verify Luxembourg’s active representing mission and visa centre in Pakistan live before drafting your form.',
    countrySpecificFaqQ: 'Where do Pakistani passport holders apply for a Luxembourg Schengen visa?',
    countrySpecificFaqA:
      'Luxembourg does not operate a standalone resident embassy in Pakistan for routine short-stay visas and relies on a designated Schengen partner mission/visa centre—we confirm the exact active representation channel before you book.',
    relatedSlugs: ['belgium', 'netherlands', 'france', 'germany'],
  },
  {
    slug: 'finland',
    country: 'Finland',
    isoCode: 'FIN',
    accentHex: '#214E78',
    stampLabel: 'HELSINKI · FIN',
    stampRotation: -3,
    mrzCode: '30',
    seoTitle: 'Finland Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Prepare a Finland Schengen visa from Pakistan with Finland Visa Portal drafting, Lapland & Helsinki itinerary prep, and VFS Global guidance.',
    heroPromise:
      'Finland Schengen portal drafting, Helsinki & Lapland Aurora itinerary alignment, six-month bank auditing, and official VFS Global preparation for Pakistani citizens.',
    portalAndCentre: 'Finland Visa Portal & VFS Global Centres in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Finland processes short-stay Pakistani Schengen applications through its official online visa form and VFS Global biometric centres in Pakistan; verify active embassy processing windows ahead of winter Lapland peak.',
    hostFormLabel: 'Signed Finnish Host Invitation & Residence Copy',
    hostFormDetail: 'a clear signed invitation from your host in Finland with their Finnish ID/residence permit copy and relationship proof',
    signatureCities: 'Helsinki, Rovaniemi (Lapland), Tampere, Turku, and Porvoo',
    bestSeasonBody:
      'June to August showcases sunlit Baltic islands and lakes; December to March is magical for Rovaniemi snow adventures and Northern Lights in Lapland.',
    overviewParagraph1:
      'Finland appeals to Pakistani families, winter-adventure travellers, and tech/telecom professionals—pairing Helsinki’s maritime design districts and ferries to Tallinn with Arctic snow resorts and Northern Lights lodges in Rovaniemi and Finnish Lapland.',
    overviewParagraph2:
      'Because winter Lapland lodging and domestic flights carry premium seasonal rates, Finnish visa officers check that your six-month bank balance comfortably supports realistic winter travel costs alongside strong ties in Pakistan.',
    entryTipsBody:
      'Carry printed hotel/igloo bookings, return tickets, and €30,000 Schengen travel insurance (ensure winter-sport coverage if skiing or snowmobiling) at Helsinki-Vantaa Airport.',
    countrySpecificRefusalTitle: 'Underbudgeted Lapland Winter Itinerary',
    countrySpecificRefusalCause:
      'Proposing high-season Rovaniemi glass-igloo stays with thin liquid bank reserves raises concerns over financial sustainability.',
    countrySpecificRefusalPrevention:
      'We align your Helsinki/Lapland itinerary costs honestly against your verified six-month bank statements and FBR income.',
    countrySpecificFaqQ: 'When should I apply for a December or January Lapland trip to Finland?',
    countrySpecificFaqA:
      'Start preparing your Finland Schengen visa file 3 to 4 months ahead (by August or September) so you can secure official VFS biometrics well ahead of winter holiday surges.',
    relatedSlugs: ['sweden', 'norway', 'denmark', 'schengen-states'],
  },
  {
    slug: 'sweden',
    country: 'Sweden',
    isoCode: 'SWE',
    accentHex: '#1F4B7A',
    stampLabel: 'STOCKHOLM · SWE',
    stampRotation: 3,
    mrzCode: '31',
    seoTitle: 'Sweden Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a Sweden Schengen visa from Pakistan with Form 241011 host invitation checks, bank audit, and VFS Global appointment prep.',
    heroPromise:
      'Sweden Schengen visa file preparation, Migrationsverket Form 241011 invitation verification, six-month bank auditing, and official VFS Global guidance across Pakistan.',
    portalAndCentre: 'Embassy of Sweden / Authorised VFS Global Centres in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Sweden evaluates short-stay Pakistani visa files lodged via authorised VFS Global centres; confirm live processing channels and host Personbevis documentation before submitting.',
    hostFormLabel: 'Migrationsverket Invitation Form 241011 + Personbevis',
    hostFormDetail: 'completed Swedish Migration Agency Form 241011 paired with a fresh Skatteverket civic registration extract (Personbevis)',
    signatureCities: 'Stockholm, Gothenburg, Malmö, Uppsala, and Kiruna',
    bestSeasonBody:
      'May through September offers long sunlit Nordic evenings across Stockholm’s archipelago and Gothenburg; winter draws Northern Lights visitors to Swedish Lapland.',
    overviewParagraph1:
      'Sweden connects Pakistani families visiting relatives and students in Stockholm, Gothenburg, Uppsala, and Malmö with leisure travellers discovering Stockholm’s 14-island Old Town (Gamla Stan), clean Nordic design, and coastal archipelagos.',
    overviewParagraph2:
      'Swedish embassy reviewers examine civic ties closely—expecting a fresh Skatteverket Personbevis and Form 241011 for hosted visits, paired with transparent Pakistani bank statements, FBR tax filings, and employer NOCs.',
    entryTipsBody:
      'Keep printed copies of your Form 241011 / hotel confirmations, return flights, and €30,000 medical cover ready when clearing Stockholm Arlanda Airport.',
    countrySpecificRefusalTitle: 'Outdated Personbevis or Incomplete Form 241011',
    countrySpecificRefusalCause:
      'Submitting a Swedish host’s Skatteverket Personbevis older than three months or leaving financial-responsibility fields blank on Form 241011 weakens hosted applications.',
    countrySpecificRefusalPrevention:
      'We review your host’s Form 241011, fresh Personbevis, and salary statements before your VFS appointment.',
    countrySpecificFaqQ: 'What is a Personbevis for a Sweden visit visa?',
    countrySpecificFaqA:
      'A Personbevis is an official civic registration extract issued by the Swedish Tax Agency (Skatteverket) confirming your host’s legal residence and family particulars—it should generally be less than three months old when submitted.',
    relatedSlugs: ['norway', 'denmark', 'finland', 'schengen-states'],
  },
  {
    slug: 'switzerland',
    country: 'Switzerland',
    isoCode: 'CHE',
    accentHex: '#A62626',
    stampLabel: 'ZURICH · CHE',
    stampRotation: -4,
    mrzCode: '32',
    seoTitle: 'Switzerland Visa from Pakistan — Checklist | Visahouse',
    seoDescription:
      'Prepare a Switzerland Schengen visa from Pakistan with Swiss online form drafting, alpine budget audit, and VFS Global prep.',
    heroPromise:
      'Switzerland Schengen form drafting, Zurich, Lucerne & Interlaken alpine itinerary alignment, financial ratio auditing, and official VFS Global preparation from Pakistan.',
    portalAndCentre: 'Swiss Online Visa System & VFS Global Centres in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'All short-stay Swiss visas from Pakistan are decided by the Embassy of Switzerland in Islamabad following biometric submission at authorised VFS Global centres across Pakistan.',
    hostFormLabel: 'Signed Swiss Host Invitation (Declaration of Sponsorship if requested)',
    hostFormDetail: 'a signed host invitation with Swiss passport/permit copy (plus municipality Declaration of Sponsorship only if requested by the Embassy)',
    signatureCities: 'Zurich, Lucerne, Interlaken, Grindelwald, Zermatt, Geneva, and Montreux',
    bestSeasonBody:
      'May to September opens panoramic alpine passes, Lake Lucerne cruises, and Jungfraujoch peaks; December to March brings crisp winter snow resorts.',
    overviewParagraph1:
      'Switzerland is the dream alpine holiday for Pakistani families and honeymooners—linking Zurich and Geneva with turquoise lakes in Lucerne and Interlaken, dramatic peaks around Grindelwald and Zermatt, and scenic trains like the Glacier Express.',
    overviewParagraph2:
      'Because Switzerland has among the highest daily hotel and rail costs in Europe, the Embassy of Switzerland in Islamabad places particular weight on strong six-month bank balances, consistent FBR tax filings, and well-matched hotel confirmations.',
    entryTipsBody:
      'Carry printed copies of your hotel confirmations, Swiss Travel Pass/rail plan if purchased, return tickets, and €30,000 Schengen medical policy when landing in Zurich or Geneva.',
    countrySpecificRefusalTitle: 'Bank Balance Disproportionate to Alpine Travel Costs',
    countrySpecificRefusalCause:
      'Planning a 12-day Interlaken, Zermatt, and Zurich itinerary on minimal bank reserves leads visa officers to question affordability.',
    countrySpecificRefusalPrevention:
      'We review your six-month bank statement and FBR returns upfront so your duration and hotel tier match your verified budget comfortably.',
    countrySpecificFaqQ: 'Is Switzerland part of the Schengen Area for Pakistani passport holders?',
    countrySpecificFaqA:
      'Yes—Switzerland is a full Schengen member state. A uniform Schengen Type-C visa issued by Switzerland allows entry to Switzerland and neighbouring Schengen countries such as Italy, France, Germany, and Austria.',
    relatedSlugs: ['austria', 'france', 'germany', 'schengen-states'],
  },
  {
    slug: 'austria',
    country: 'Austria',
    isoCode: 'AUT',
    accentHex: '#9E2B25',
    stampLabel: 'VIENNA · AUT',
    stampRotation: 3,
    mrzCode: '33',
    seoTitle: 'Austria Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for an Austria Schengen visa from Pakistan with Vienna & Salzburg itinerary prep, EVE sponsorship checks, and VFS Global guidance.',
    heroPromise:
      'Austria Schengen visa file preparation, Vienna, Salzburg & Hallstatt itinerary alignment, EVE electronic sponsorship checks, and VFS Global biometric guidance from Pakistan.',
    portalAndCentre: 'Embassy of Austria Islamabad & VFS Global Centres in Pakistan',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Austria processes Pakistani short-stay Schengen applications via VFS Global centres routed to the Embassy of Austria in Islamabad; verify EVE electronic sponsorship IDs ahead of your slot.',
    hostFormLabel: 'Elektronische Verpflichtungserklärung (EVE ID)',
    hostFormDetail: 'an official 8-digit EVE electronic declaration registered by your Austrian host at their local Aliens Police department',
    signatureCities: 'Vienna, Salzburg, Innsbruck, Hallstatt, Graz, and Zell am See',
    bestSeasonBody:
      'May through September brings sunlit alpine lakes in Hallstatt and Zell am See plus palace gardens in Vienna; December showcases traditional Viennese Christmas markets.',
    overviewParagraph1:
      'Austria blends imperial concert halls and coffeehouses in Vienna with Mozart’s Salzburg, postcard alpine villages like Hallstatt and Zell am See, and dramatic Tyrolean peaks around Innsbruck—making it a favourite Central European anchor for Pakistani travellers.',
    overviewParagraph2:
      'Clean Austrian Schengen files pair crisp six-month stamped bank statements and FBR tax history with rail-logical itineraries (especially when linking Vienna with Salzburg, Munich, or Budapest) and exact €30,000 insurance dates.',
    entryTipsBody:
      'Keep printed hotel vouchers, ÖBB rail reservations if visiting Salzburg or Budapest, return flights, and your €30,000 Schengen travel insurance schedule accessible at Vienna International Airport.',
    countrySpecificRefusalTitle: 'Missing Electronic EVE ID for Sponsored Visits',
    countrySpecificRefusalCause:
      'Relying on an informal host email rather than Austria’s official electronic EVE sponsorship registration delays or weakens family/friend visit visa files.',
    countrySpecificRefusalPrevention:
      'We check your host’s EVE registration timeline (typically submitted at least 2–3 weeks before your VFS slot) or build a clean self-funded hotel file.',
    countrySpecificFaqQ: 'What is an EVE for an Austria Schengen visa?',
    countrySpecificFaqA:
      'An EVE (Elektronische Verpflichtungserklärung) is Austria’s official electronic declaration of liability registered by your host at their local Austrian police authority, linked digitally to the Embassy of Austria in Islamabad via an 8-digit EVE ID.',
    relatedSlugs: ['switzerland', 'germany', 'hungary', 'schengen-states'],
  },
  {
    slug: 'italy',
    country: 'Italy',
    isoCode: 'ITA',
    accentHex: '#2A5C45',
    stampLabel: 'ROME · ITA',
    stampRotation: -3,
    mrzCode: '39',
    seoTitle: 'Italy Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for an Italy Schengen visa from Pakistan with Rome, Milan & Venice itinerary prep, Gerrys/BLS/Embassy checklist, and bank review.',
    heroPromise:
      'Italy Schengen visa file preparation, Rome, Milan, Florence & Venice itinerary alignment, financial ratio checks, and official appointment guidance from Pakistan.',
    portalAndCentre: 'Embassy of Italy Islamabad, Consulate Karachi & Authorised Visa Centres',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Applications from Sindh and Balochistan route to the Consulate General of Italy in Karachi, while Federal, Punjab, KP, AJK, and GB route to the Embassy of Italy in Islamabad via authorised submission centres.',
    hostFormLabel: 'Lettera di Invito (Italian Host Invitation Form)',
    hostFormDetail: 'an official signed Lettera di Invito accompanied by your Italian host’s Carta d’Identità or Permesso di Soggiorno copy',
    signatureCities: 'Rome, Milan, Venice, Florence, Naples, Lake Como, and Bologna',
    bestSeasonBody:
      'April to June and September to October bring pleasant Mediterranean weather across Rome, Florence, and Lake Como without peak August heat or crowds.',
    overviewParagraph1:
      'Italy is one of the most popular European destinations for Pakistani families, honeymooners, and trade visitors—connecting Rome’s Colosseum and Vatican museums with Milan’s fashion and trade fairs, Florence’s Renaissance art, and Venice’s grand canals.',
    overviewParagraph2:
      'Italian visa officers in Islamabad and Karachi inspect bank statement continuity, FBR tax returns, and employer NOCs closely—especially for first-time Schengen applicants. Clean, day-by-day hotel bookings and realistic Trenitalia/Italo rail connections make a noticeable difference.',
    entryTipsBody:
      'Carry printed copies of your hotel confirmations, internal rail plan, return flights, and €30,000 Schengen travel insurance policy when clearing Rome Fiumicino (FCO) or Milan Malpensa (MXP).',
    countrySpecificRefusalTitle: 'Jurisdiction Mismatch or Weak Hotel/Rail Continuity',
    countrySpecificRefusalCause:
      'Filing in the wrong provincial jurisdiction (Islamabad vs Karachi) or submitting unconfirmed multi-city hotel holds that do not match flight dates triggers avoidable refusals.',
    countrySpecificRefusalPrevention:
      'We verify your provincial filing desk from your CNIC/residence records and align every hotel night, cover letter date, and €30,000 insurance certificate before submission.',
    countrySpecificFaqQ: 'Do I apply for an Italy visa in Islamabad or Karachi from Pakistan?',
    countrySpecificFaqA:
      'Residents of Sindh and Balochistan generally fall under the Consulate General of Italy in Karachi, while applicants from Islamabad, Punjab, KP, AJK, and GB apply through the Embassy of Italy in Islamabad’s authorised centre.',
    relatedSlugs: ['spain', 'france', 'switzerland', 'schengen-states'],
  },
  {
    slug: 'spain',
    country: 'Spain',
    isoCode: 'ESP',
    accentHex: '#B23A2A',
    stampLabel: 'MADRID · ESP',
    stampRotation: 4,
    mrzCode: '40',
    seoTitle: 'Spain Visa from Pakistan — BLS Checklist | Visahouse',
    seoDescription:
      'Apply for a Spain Schengen visa from Pakistan with BLS International appointment prep, Barcelona & Madrid itinerary, and bank statement check.',
    heroPromise:
      'Spain Schengen visa preparation, official BLS International appointment guidance across Islamabad, Lahore & Karachi, and clean Barcelona, Madrid & Andalusia itineraries from Pakistan.',
    portalAndCentre: 'BLS International Spain Visa Application Centres (Pakistan)',
    pakistanCities: 'Islamabad, Lahore, and Karachi',
    jurisdictionNote:
      'Spain processes short-stay Schengen visa applications from Pakistan exclusively through official BLS International centres in Islamabad, Lahore, and Karachi for review by the Embassy of Spain in Islamabad.',
    hostFormLabel: 'Carta de Invitación (Police-Issued Spanish Invitation)',
    hostFormDetail: 'an original Carta de Invitación issued by the Spanish National Police (Policía Nacional) for hosted stays with family or friends',
    signatureCities: 'Barcelona, Madrid, Seville, Granada, Cordoba, Valencia, and Malaga',
    bestSeasonBody:
      'March to June and September to November offer warm sunny days across Barcelona, Madrid, and Andalusia’s Islamic heritage cities (Granada, Cordoba, Seville) without midsummer heat.',
    overviewParagraph1:
      'Spain holds deep cultural appeal for Pakistani travellers—blending Barcelona’s Sagrada Familia and Mediterranean beaches with Madrid’s boulevards and the historic Islamic architecture of Granada’s Alhambra, Cordoba’s Mezquita, and Seville.',
    overviewParagraph2:
      'Because Spain handles Pakistani submissions through BLS International, applicants should plan well ahead for legitimate BLS appointment releases and present tidy six-month stamped bank statements, FBR tax returns, and clear daily plans.',
    entryTipsBody:
      'Keep printed copies of your hotel confirmations, AVE high-speed train tickets if travelling between Madrid, Barcelona, and Seville, return flights, and €30,000 Schengen medical cover ready at Madrid Barajas (MAD) or Barcelona El Prat (BCN).',
    countrySpecificRefusalTitle: 'Missing Police-Issued Carta de Invitación for Hosted Stays',
    countrySpecificRefusalCause:
      'Relying on an informal friend’s letter instead of an official Policía Nacional Carta de Invitación—or leaving gaps in six-month bank statements—commonly triggers Spain visa refusals.',
    countrySpecificRefusalPrevention:
      'We confirm whether a self-funded hotel file or an official Carta de Invitación fits your timeline better and audit every bank line before your BLS appointment.',
    countrySpecificFaqQ: 'Which visa centre handles Spain Schengen visas in Pakistan?',
    countrySpecificFaqA:
      'Spain short-stay Schengen visas in Pakistan are submitted through official BLS International centres in Islamabad, Lahore, and Karachi, and decided by the Embassy of Spain in Islamabad.',
    relatedSlugs: ['italy', 'portugal', 'france', 'schengen-states'],
  },
];

export const SCHENGEN_DESTINATIONS: DestinationData[] = SCHENGEN_SEEDS.map(
  buildSchengenDestination,
);
