import type { DestinationData } from './types';

export const SEASIA_DESTINATIONS: DestinationData[] = [
  {
    slug: 'thailand',
    country: 'Thailand',
    isoCode: 'THA',
    region: 'Southeast Asia',
    channel: 'Hybrid / Centre',
    accentHex: '#1D5248',
    stampLabel: 'BANGKOK DESK · THA',
    stampRotation: -4,
    heroPromise:
      'Structured file preparation, bank-statement review, and authorised submission guidance for Pakistani travellers heading to Bangkok, Phuket, Krabi, or Chiang Mai.',
    seoTitle: 'Thailand Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Apply for a Thailand tourist visa from Pakistan with structured bank-statement checks, document assembly, and step-by-step filing guidance.',
    facts: {
      visaType: 'Tourist Visa (TR) / e-Visa channel',
      entryType: 'Single or Multiple Entry (category-dependent)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<THAVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'THA0000000PAK0000000M0000000<<<<<<<<<<<<<<04',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders planning leisure trips, honeymoons, family holidays, medical consultations in Bangkok, or short trade visits must obtain prior visa clearance before boarding flights to Thailand.',
      profiles: [
        'Salaried professionals employed in Pakistan with verifiable payroll history and employer leave approval',
        'Business owners, sole proprietors, and company directors registered with NTN or chamber memberships',
        'Families, newlyweds, and retirees travelling on personal or sponsored household bank accounts',
        'University students travelling with parents or presenting confirmed academic enrolment and sponsorship letters',
      ],
      eligibilityNote:
        'Submission jurisdiction depends on your province of residence or CNIC issuance (Islamabad, Lahore, or Karachi submission desks) as well as whether the Royal Thai Embassy currently routes your category through the official e-Visa portal or designated drop-off centres.',
    },
    checklist: [
      {
        groupTitle: 'Core Identity & Travel Papers',
        items: [
          {
            id: 'tha-passport',
            label: 'Original Pakistani Passport & Previous Passports',
            detail:
              'Machine-readable passport with required remaining validity beyond travel dates and clean blank pages, plus copies of prior travel stamps if held.',
            mandatory: true,
          },
          {
            id: 'tha-cnic',
            label: 'Valid CNIC / B-Form Copies',
            detail:
              'Clear front-and-back colour scan of CNIC for adults, or NADRA CRC / B-Form and parent consent letters for minors.',
            mandatory: true,
          },
          {
            id: 'tha-photos',
            label: 'Recent Biometric Photographs',
            detail:
              'White-background matte photographs meeting Royal Thai Embassy head-size proportions, taken within recent months without heavy retouching.',
            mandatory: true,
          },
          {
            id: 'tha-bookings',
            label: 'Return Flight Itinerary & Hotel Confirmations',
            detail:
              'Consistent round-trip flight reservation matching every night of hotel bookings across Bangkok, Phuket, or Chiang Mai.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial & Occupation Proof',
        items: [
          {
            id: 'tha-bank',
            label: 'Signed Bank Statement & Account Maintenance Certificate',
            detail:
              'Stamped statement showing regular salary or business turnover rather than sudden unexplained last-minute cash deposits.',
            mandatory: true,
          },
          {
            id: 'tha-employment',
            label: 'Employment Letter & Pay Slips (Salaried)',
            detail:
              'Company letterhead confirming designation, tenure, approved leave dates, and monthly salary aligned with bank credits.',
          },
          {
            id: 'tha-business',
            label: 'NTN Certificate & Business Letterhead (Self-Employed)',
            detail:
              'Active FBR tax registration, company letterhead cover note, and business account history where personal funds derive from company revenue.',
          },
          {
            id: 'tha-frc',
            label: 'NADRA Family Registration Certificate (FRC) or Marriage Certificate',
            detail:
              'Required when spouses or parents sponsor dependent travellers on a joint itinerary.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Profile Assessment & Channel Check',
        youDo:
          'Share your planned travel dates, departure city in Pakistan, and occupation profile over WhatsApp or our intake form.',
        weDo:
          'Confirm the active submission channel (e-Visa portal or authorised centre), current fee schedule, and tailor your exact document checklist.',
      },
      {
        stepNumber: '02',
        title: 'Document Audit & Bank Review',
        youDo:
          'Send clean scans of your passport, CNIC, bank statement, employment or business papers, and tentative hotel plans.',
        weDo:
          'Line-check statement continuity, name spelling consistency across NADRA and bank records, and draft your cover letter and day-by-day itinerary.',
      },
      {
        stepNumber: '03',
        title: 'Form Completion & Filing',
        youDo:
          'Approve the compiled packet and settle official charges through the active payment method.',
        weDo:
          'Prepare the application form with zero field mismatches, resize scans to portal specifications, and guide submission or drop-off.',
      },
      {
        stepNumber: '04',
        title: 'Tracking & Pre-Departure Briefing',
        youDo:
          'Wait for embassy assessment without purchasing non-refundable domestic add-ons prematurely.',
        weDo:
          'Monitor portal or centre status updates and send a pre-flight arrival sheet covering Suvarnabhumi or Don Mueang immigration checks.',
      },
    ],
    refusalReasons: [
      {
        title: 'Unexplained Sudden Cash Deposits',
        cause:
          'Large lump-sum cash inflows deposited right before printing a bank statement raise doubts about genuine liquid travel funds.',
        prevention:
          'We inspect six months of statement flow beforehand and advise how to document legitimate transfers, bonuses, or business draws cleanly.',
      },
      {
        title: 'Itinerary & Hotel Date Gaps',
        cause:
          'Multi-city Thailand trips (Bangkok plus Phuket or Pattaya) often leave an unaccounted night between domestic transfers.',
        prevention:
          'We reconcile arrival times, domestic flight segments, and hotel check-in/check-out dates night by night before filing.',
      },
      {
        title: 'Weak Home-Tie Documentation',
        cause:
          'Generic two-line employment letters that omit approved leave dates or salary figures fail to establish a clear return anchor in Pakistan.',
        prevention:
          'We supply a structured employer NOC template and review tax, family, or business ties so the file reads coherently.',
      },
      {
        title: 'Photo & Scan Rejections on Digital Portals',
        cause:
          'Shadowed selfies, cropped passport MRZ strips, or low-DPI PDF statements delay assessment or trigger administrative rejection.',
        prevention:
          'Our desk formats every photograph and PDF to exact pixel and file-size tolerances prior to upload.',
      },
    ],
    localNotes: {
      overview: [
        'Thailand remains the benchmark first international holiday for Pakistani families, honeymooners, and independent travellers because it pairs reliable hospitality infrastructure with a deep contrast between riverfront heritage and Andaman island coastlines. Direct flights on Thai Airways from Karachi, Lahore, and Islamabad—alongside frequent one-stop connections via Gulf hubs—make Bangkok an accessible gateway whether you are planning a five-night city break or a two-week north-to-south circuit.',
        'What separates a smooth Thai visa file from a stalled one is rarely the destination itself; it is clerical precision. Thai visa officers pay close attention to whether your stated travel budget aligns with your monthly bank inflows and whether hotel bookings cover every night between arrival at Suvarnabhumi and departure back to Pakistan.',
      ],
      bestSeasonTitle: 'When to travel: cool dry months vs Andaman & Gulf rhythms',
      bestSeasonBody:
        'From November through February, Bangkok, Chiang Mai, and the Andaman coast (Phuket, Krabi, Phi Phi) enjoy lower humidity, calm seas, and clear evenings—making it peak winter escape season from Pakistan. March and April turn hot in central plains, culminating in Songkran water festival crowds in mid-April. Between May and October, monsoon squalls pass in sharp afternoon bursts along the west coast while Gulf islands such as Koh Samui and Koh Phangan stay comparatively drier through August.',
      citiesTitle: 'Key regions and practical routing from Pakistan',
      citiesBody:
        'Most Pakistani itineraries anchor three to four nights in Bangkok for Chao Phraya river ferries, Chatuchak weekend markets, and halal-friendly dining along Sukhumvit Soi 3 (Nana) and Silom before flying south to Phuket or Krabi for longtail island hopping. Travellers seeking cooler mountain air, craft cafés, and ethical elephant sanctuaries route north to Chiang Mai and Chiang Rai instead. Avoid cramming four distant provinces into a six-day trip; two well-paced bases save airport transfers and look far more credible on a visa itinerary.',
      entryTipsTitle: 'Airport arrival and immigration desk notes',
      entryTipsBody:
        'Keep printed copies of your visa grant notice (or passport sticker page), return ticket, hotel confirmation, and proof of accessible travel funds in your cabin folder when landing at Suvarnabhumi (BKK), Don Mueang (DMK), or Phuket (HKT). Thai immigration officers can ask visitors to show sufficient cash or travel cards on arrival even with an approved visa. Carry crisp, undamaged USD notes for favourable exchange rates at basement rail-link booths in Suvarnabhumi rather than upper-floor counters.',
    },
    packages: [
      {
        id: 'tha-review',
        tabLabel: 'Document Audit',
        title: 'File Review & Checklist Audit',
        bestFor: 'Self-filers who want every scan, statement, and cover letter verified before submitting.',
        serviceFee: '',
        turnaroundNote: 'Document review completed promptly once scans arrive.',
        includes: [
          'Full audit of bank statement continuity and NADRA/passport alignment',
          'Custom cover letter and night-by-night Thailand itinerary draft',
          'Employer NOC / business sponsorship wording templates',
          'Photo and PDF compression formatted to portal requirements',
        ],
        excludesNote: 'Embassy/e-Visa government fees and courier charges are paid separately.',
      },
      {
        id: 'tha-standard',
        tabLabel: 'Full Filing',
        title: 'End-to-End Visa Filing Support',
        bestFor: 'Solo travellers and couples seeking guided preparation and submission management.',
        serviceFee: '',
        turnaroundNote: 'Active tracking from intake through embassy outcome.',
        includes: [
          'Everything in Document Audit',
          'Complete application form drafting and submission preparation',
          'Verifiable hotel and flight reservation support for filing',
          'Status tracking updates via WhatsApp plus arrival briefing note',
        ],
        excludesNote: 'Official government/centre charges are billed at actuals; confirm current figures with our team.',
      },
      {
        id: 'tha-family',
        tabLabel: 'Family Visa File',
        title: 'Family & Group Visa File Desk',
        bestFor: 'Families of 3+ travelling together with linked sponsorship and B-Form / FRC documentation.',
        serviceFee: '',
        turnaroundNote: 'Coordinated packet assembly so all family files cross-reference cleanly.',
        includes: [
          'Synchronised sponsor letter and joint financial mapping',
          'Individual checklists for adults, minors, and senior travellers',
          'Unified multi-city itinerary across Bangkok and island stops',
          'Optional Schengen/Asia travel insurance bundling',
        ],
        excludesNote: 'Official embassy charges apply per traveller; confirm exact totals with our team.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders get a Thailand visa on arrival?',
        answer:
          'Pakistani passport holders generally require prior visa approval before travelling to Thailand rather than visa on arrival. Always confirm the active category and portal requirements with our team before booking non-refundable airfare.',
      },
      {
        question: 'How much bank balance is advisable for a Thailand tourist visa from Pakistan?',
        answer:
          'Embassy officers look at both closing balance and steady monthly income activity over recent months so your funds clearly cover flights, hotels, and daily expenses without exhausting your savings. We review your statement and trip length to advise an appropriate documentation structure rather than quoting an arbitrary blanket figure.',
      },
      {
        question: 'Do I need to visit the Royal Thai Embassy in Islamabad in person?',
        answer:
          'Depending on the currently active submission route (official e-Visa portal versus authorised drop-off centres in Karachi, Lahore, and Islamabad), most tourist applicants do not attend an embassy interview unless specifically called by a visa officer.',
      },
      {
        question: 'Should I buy confirmed non-refundable flight tickets before my Thailand visa is issued?',
        answer:
          'We strongly advise against paying for non-refundable airline tickets before your visa decision is issued. A verifiable flight itinerary aligned with your hotel reservations is typically used during preparation—confirm current submission rules with our desk.',
      },
      {
        question: 'Can a housewife or student apply for a Thailand visa without a personal bank account?',
        answer:
          'Yes, provided a qualifying immediate family member (such as a spouse or parent) signs a formal sponsorship affidavit and supplies their bank statement, employment or business proof, and NADRA FRC or marriage certificate linking the relationship.',
      },
      {
        question: 'What happens if my Thailand visa is refused?',
        answer:
          'Embassy authorities do not always issue detailed written explanations, and government fees are typically non-refundable. Before reapplying, we audit your prior submission packet to identify financial, itinerary, or clerical weaknesses so you do not repeat the same gap.',
      },
    ],
    relatedSlugs: ['malaysia', 'indonesia', 'singapore', 'cambodia'],
  },
  {
    slug: 'malaysia',
    country: 'Malaysia',
    isoCode: 'MYS',
    region: 'Southeast Asia',
    channel: 'e-Visa',
    accentHex: '#1D4B64',
    stampLabel: 'KUALA LUMPUR · MYS',
    stampRotation: 3,
    heroPromise:
      'Clean Malaysia e-Visa filing and MDAC arrival guidance for Pakistani travellers visiting Kuala Lumpur, Langkawi, Penang, and Genting Highlands.',
    seoTitle: 'Malaysia Visa from Pakistan — e-Visa Guide | Visahouse',
    seoDescription:
      'Apply for a Malaysia tourist e-Visa from Pakistan with document verification, itinerary alignment, and MDAC arrival guidance.',
    facts: {
      visaType: 'Malaysia Tourist e-Visa',
      entryType: 'Single or Multiple Entry (subject to eligibility)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<MYSVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'MYS0000000PAK0000000M0000000<<<<<<<<<<<<<<02',
    },
    whoCanApply: {
      intro:
        'Pakistani citizens travelling to Malaysia for tourism, visiting relatives, university campus visits, or short business conferences can apply digitally through the Malaysian e-Visa channel, subject to meeting identity and financial verification rules.',
      profiles: [
        'Independent tourists and honeymooners visiting Kuala Lumpur, Langkawi, or Penang',
        'Families travelling with school-age children during winter or Eid holidays',
        'Corporate travellers attending meetings or exhibitions in Kuala Lumpur and Selangor',
        'Parents visiting Pakistani students enrolled at Malaysian universities',
      ],
      eligibilityNote:
        'All travellers entering Malaysia must also complete the Malaysia Digital Arrival Card (MDAC) within the prescribed window prior to arrival—separate from the e-Visa grant itself.',
    },
    checklist: [
      {
        groupTitle: 'Digital Identity & Travel File',
        items: [
          {
            id: 'mys-passport',
            label: 'Passport Bio-Data Page Scan (High Resolution)',
            detail:
              'Flat, glare-free colour scan of the passport bio page including the bottom MRZ strip and valid signature page.',
            mandatory: true,
          },
          {
            id: 'mys-photo',
            label: 'Studio Digital Portrait Photo',
            detail:
              'Clean white backdrop, neutral expression, no shadows or eyeglasses glare, matching Malaysia e-Visa pixel dimensions.',
            mandatory: true,
          },
          {
            id: 'mys-flight',
            label: 'Confirmed Return Flight Booking',
            detail:
              'Round-trip itinerary showing entry into KLIA or Penang and onward departure within permitted stay limits.',
            mandatory: true,
          },
          {
            id: 'mys-hotel',
            label: 'Hotel Bookings or Host Invitation Letter',
            detail:
              'Accommodation vouchers covering all nights, or a formal host invitation with Malaysian resident ID/visa copy if staying with family.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Supporting Financial & Family Proof',
        items: [
          {
            id: 'mys-bank',
            label: 'Recent Bank Statement',
            detail:
              'Consistent account history demonstrating liquid funds to sustain hotel stays, domestic transfers, and meals.',
            mandatory: true,
          },
          {
            id: 'mys-job',
            label: 'Employment Verification or Business Proof',
            detail:
              'Employer letter on letterhead or NTN/business registration showing strong ties in Pakistan.',
          },
          {
            id: 'mys-minors',
            label: 'Birth Certificate / NADRA B-Form for Minors',
            detail:
              'Mandatory for children under 18 applying alongside parents on the e-Visa portal.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Eligibility & Prior-Travel Check',
        youDo:
          'Tell us your travel dates, whether you have visited Malaysia before, and if you are pairing Malaysia with Singapore or Thailand.',
        weDo:
          'Verify whether single-entry or multi-country routing suits your passport and confirm current official fees.',
      },
      {
        stepNumber: '02',
        title: 'Scan & Portrait Verification',
        youDo:
          'Send passport scans, studio portrait photo, bank statement, and accommodation details via WhatsApp.',
        weDo:
          'Inspect MRZ readability, crop and validate portrait sizing, and check that hotel and flight dates have zero contradictions.',
      },
      {
        stepNumber: '03',
        title: 'e-Visa Submission & Monitoring',
        youDo:
          'Review your completed summary sheet before submission.',
        weDo:
          'Submit the digital packet cleanly, track any immigration queries for additional documents, and forward your approved e-Visa PDF.',
      },
      {
        stepNumber: '04',
        title: 'MDAC Filing & KLIA Arrival Prep',
        youDo:
          'Share your confirmed flight number three days before departure.',
        weDo:
          'Guide your Malaysia Digital Arrival Card (MDAC) submission and send a printed-folder checklist for KLIA immigration.',
      },
    ],
    refusalReasons: [
      {
        title: 'Blurry Passport Scans or Cropped MRZ Lines',
        cause:
          'Phone snapshots taken at an angle or with flash reflections over the laminated bio page are frequently rejected by automated verification.',
        prevention:
          'We verify flat flatbed-grade scans before uploading and reject glare-affected images at intake.',
      },
      {
        title: 'Mismatch Between e-Visa Dates and Flight Routing',
        cause:
          'Travellers combining Malaysia and Singapore sometimes forget to reflect the overland bus or short-hop return segment cleanly.',
        prevention:
          'We map cross-border dates clearly so Malaysian immigration sees an unambiguous exit plan.',
      },
      {
        title: 'Missing Minor Documentation',
        cause:
          'Uploading only the child’s passport without birth registration linking the accompanying parents stalls family applications.',
        prevention:
          'We attach NADRA birth certificates or B-Forms alongside parent passports in the correct portal fields.',
      },
      {
        title: 'Incomplete Supporting Funds on Short-Notice Requests',
        cause:
          'Malaysian immigration officers occasionally trigger a request for further financial proof after initial submission.',
        prevention:
          'We prepare your bank statement and employer proof upfront so any verification query is answered within hours.',
      },
    ],
    localNotes: {
      overview: [
        'For Pakistani travellers, Malaysia sits in a rare sweet spot: effortless halal gastronomy on every street corner, familiar English signage, modern rail transit, and dramatic variety from Kuala Lumpur’s glass skyline to Langkawi’s limestone archipelagos and Penang’s UNESCO shophouse lanes. Direct flights operated by Batik Air and Pakistan International routes—plus brisk connections via Doha, Dubai, and Muscat—keep total door-to-door transit manageable even for five-day trips.',
        'Because Malaysia’s e-Visa is assessed digitally without a physical embassy interview for most tourists, the quality of your uploaded file carries the entire weight of the application. Clean scans, realistic day-to-day lodging, and timely completion of the MDAC arrival card make the difference between a breezy KLIA clearance and secondary questioning.',
      ],
      bestSeasonTitle: 'Balancing west coast islands and highland escapes',
      bestSeasonBody:
        'Malaysia sits close to the equator, staying warm year-round with brief tropical showers rather than prolonged cold winters. November through March brings the sunniest beach weather to Langkawi and Penang on the west coast, aligning neatly with Pakistani winter school breaks. June through August offers calmer seas along the east coast islands (Perhentian and Redang) while Cameron Highlands and Genting Highlands remain refreshingly cool in every month.',
      citiesTitle: 'Classic routes: Kuala Lumpur, Penang, Langkawi, and Melaka',
      citiesBody:
        'First-time visitors typically split a week between Kuala Lumpur (KLCC, Bukit Bintang, Batu Caves, and a cool-air day trip up to Genting Highlands) and a short domestic hop on AirAsia or Malaysia Airlines to Langkawi for cable-car views and mangrove boat tours. Food-focused travellers trade beaches for George Town in Penang, where Malay, Nyonya, and Indian-Muslim nasi kandar kitchens sit minutes apart. Families with older relatives appreciate Melaka’s flat river promenade just two hours south of KL by highway.',
      entryTipsTitle: 'Clearing KLIA and remembering the MDAC rule',
      entryTipsBody:
        'An approved e-Visa PDF is not the only document checked at Kuala Lumpur International Airport (KLIA Terminal 1 or Terminal 2). Print your e-Visa on clean A4 paper, complete your Malaysia Digital Arrival Card (MDAC) within three days before landing, and carry printed hotel confirmations, return tickets, and evidence of travel funds (cash or international cards). Immigration officers routinely inspect return bookings before stamping entry.',
    },
    packages: [
      {
        id: 'mys-single',
        tabLabel: 'Standard e-Visa',
        title: 'Individual Malaysia e-Visa Filing',
        bestFor: 'Solo leisure and business visitors travelling directly to Malaysia.',
        serviceFee: '',
        turnaroundNote: 'Fast digital intake and portal tracking.',
        includes: [
          'Passport scan and biometric portrait compliance check',
          'Full Malaysia e-Visa online submission and monitoring',
          'Hotel and flight itinerary alignment review',
          'Pre-departure MDAC arrival card guidance',
        ],
        excludesNote: 'Official Malaysian e-Visa government fee is billed separately; confirm current rate with our team.',
      },
      {
        id: 'mys-family',
        tabLabel: 'Family Packet',
        title: 'Family & Honeymoon Malaysia Desk',
        bestFor: 'Couples and families with children needing linked birth certificates and shared bookings.',
        serviceFee: '',
        turnaroundNote: 'Linked submissions timed together for group travel.',
        includes: [
          'Everything in Standard e-Visa for each traveller',
          'Minor B-Form / birth certificate formatting and sponsor linking',
          'Multi-city KL + Langkawi / Penang itinerary structuring',
          'Group MDAC checklist three days prior to departure',
        ],
        excludesNote: 'Official portal charges apply per passport.',
      },
      {
        id: 'mys-combo',
        tabLabel: 'MYS + SGP Combo',
        title: 'Malaysia + Singapore Twin-Trip Coordination',
        bestFor: 'Travellers pairing Kuala Lumpur with Singapore by flight or coach.',
        serviceFee: '',
        turnaroundNote: 'Sequenced filing so cross-border entry rules match cleanly.',
        includes: [
          'Entry-count planning (avoiding single-entry trap on return legs)',
          'Coordinated filing timeline for both destinations',
          'Cross-border transport and lodging documentation alignment',
          'WhatsApp desk support across both arrival cards (MDAC & SGAC)',
        ],
        excludesNote: 'Government fees for each country are confirmed separately with our team.',
      },
    ],
    faqs: [
      {
        question: 'Is Malaysia visa-free for Pakistani passport holders?',
        answer:
          'No. Pakistani passport holders must obtain an approved Malaysia e-Visa (or appropriate visa category) before boarding their flight to Malaysia.',
      },
      {
        question: 'What is the Malaysia Digital Arrival Card (MDAC) and is it a visa?',
        answer:
          'MDAC is a mandatory online arrival declaration submitted within three days before landing in Malaysia. It does not replace a visa; you must hold both your approved e-Visa and your MDAC confirmation.',
      },
      {
        question: 'Can I travel from Kuala Lumpur to Singapore and return to Kuala Lumpur on a single-entry Malaysia e-Visa?',
        answer:
          'No. Once you exit Malaysia into Singapore, a single-entry visa is spent. If your return flight to Pakistan departs from Kuala Lumpur, plan your routing or entry count with our team before filing.',
      },
      {
        question: 'Do I need to submit my physical passport for a Malaysia e-Visa?',
        answer:
          'No physical passport drop-off is required for standard Malaysia e-Visa filing. The application is completed digitally using high-resolution scans, and the approved e-Visa is printed on A4 paper to carry alongside your passport.',
      },
      {
        question: 'How early should I apply for a Malaysia visa from Pakistan?',
        answer:
          'We recommend starting your application several weeks ahead of departure—especially before Eid, December school holidays, or peak winter travel—to leave buffer room in case immigration requests additional supporting documents.',
      },
      {
        question: 'Can I extend a Malaysia tourist e-Visa after arriving?',
        answer:
          'Tourist e-Visas are issued for fixed short visits and extensions are strictly restricted by Malaysian immigration except in rare documented emergencies. Always plan your return flight strictly inside the permitted stay granted on entry.',
      },
    ],
    relatedSlugs: ['singapore', 'thailand', 'indonesia', 'cambodia'],
  },
  {
    slug: 'indonesia',
    country: 'Indonesia',
    isoCode: 'IDN',
    region: 'Southeast Asia',
    channel: 'e-Visa',
    accentHex: '#6B3828',
    stampLabel: 'BALI & JAKARTA · IDN',
    stampRotation: -3,
    heroPromise:
      'Guidance on Indonesian tourist e-Visas, sponsorship rules, and Bali arrival requirements for Pakistani travellers planning island escapes or Jakarta visits.',
    seoTitle: 'Indonesia & Bali Visa from Pakistan | Visahouse',
    seoDescription:
      'Plan your Indonesia and Bali tourist visa from Pakistan with clear category guidance, bank-statement checks, and arrival preparation.',
    facts: {
      visaType: 'Visitor e-Visa (C1 / Tourist Category)',
      entryType: 'Single Entry (standard tourist category)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<IDNVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'IDN0000000PAK0000000M0000000<<<<<<<<<<<<<<08',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders travelling to Bali, Jakarta, Yogyakarta, or Lombok for leisure, honeymoons, wellness retreats, or business meetings require prior Indonesian visa clearance rather than visa on arrival.',
      profiles: [
        'Honeymooners and leisure travellers bound for Ubud, Seminyak, Nusa Dua, or Uluwatu in Bali',
        'Families seeking private villa stays and halal-friendly resorts in Bali and Lombok',
        'Corporate delegates and textile or trade buyers visiting Jakarta, Surabaya, or Bandung',
        'Repeat travellers exploring Yogyakarta’s temple heritage or Komodo marine circuits',
      ],
      eligibilityNote:
        'Indonesian immigration periodically updates sponsorship requirements and digital portal categories for calling-visa or tourist e-Visa nationalities. Our desk verifies the active pathway for Pakistani passports before initiating payment.',
    },
    checklist: [
      {
        groupTitle: 'Core Passport & Portal Requirements',
        items: [
          {
            id: 'idn-passport',
            label: 'Pakistani Passport Valid Beyond Entry',
            detail:
              'Colour bio-page scan with clean MRZ code and sufficient remaining validity as mandated by Indonesian immigration.',
            mandatory: true,
          },
          {
            id: 'idn-photo',
            label: 'Recent Colour Digital Photograph',
            detail:
              'Clear front-facing portrait on light/white background matching Indonesian e-Visa upload rules.',
            mandatory: true,
          },
          {
            id: 'idn-bank',
            label: 'Personal Bank Statement (Liquid Funds)',
            detail:
              'Recent statement showing accessible balance meeting Indonesian visitor threshold requirements, translated or issued in English.',
            mandatory: true,
          },
          {
            id: 'idn-itinerary',
            label: 'Return Flight & Hotel / Villa Bookings',
            detail:
              'Consistent entry and exit itinerary for Denpasar (DPS) or Jakarta (CGK) plus accommodation addresses.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Occupation & Sponsor Papers (If Applicable)',
        items: [
          {
            id: 'idn-job',
            label: 'Employer Letter or Business NTN Proof',
            detail:
              'Establishes professional ties in Pakistan and clarifies the source of travel funding.',
          },
          {
            id: 'idn-sponsor',
            label: 'Sponsor / Guarantor Paperwork (Category-Dependent)',
            detail:
              'Where an Indonesian guarantor or local sponsor document is required under current regulations, our desk clarifies exact paperwork before filing.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Current Regulation Check',
        youDo:
          'Share whether you are flying to Bali or Jakarta, your travel month, and whether you are travelling solo or with family.',
        weDo:
          'Confirm the currently active Indonesian visa category, sponsor requirements if any, and official fee structure.',
      },
      {
        stepNumber: '02',
        title: 'Financial & Document Readiness',
        youDo:
          'Send your passport bio scan, portrait photo, bank statement, and accommodation details.',
        weDo:
          'Verify English-language bank statement clarity, balance adequacy, and address formatting for Indonesian immigration forms.',
      },
      {
        stepNumber: '03',
        title: 'Application Preparation & Submission',
        youDo:
          'Approve your drafted details and settle official government fees.',
        weDo:
          'Manage portal submission or embassy packet preparation and monitor immigration review until your e-Visa PDF is issued.',
      },
      {
        stepNumber: '04',
        title: 'Customs, Health & Bali Levy Briefing',
        youDo:
          'Confirm your final flight schedule 48 hours before departure.',
        weDo:
          'Send links and instructions for Indonesia’s electronic customs declaration (e-CD), SATUSEHAT health pass where active, and the Bali provincial tourist levy.',
      },
    ],
    refusalReasons: [
      {
        title: 'Using Outdated Visa-on-Arrival Assumptions',
        cause:
          'Travellers sometimes read generic international blogs assuming Bali grants Visa on Arrival to all passports and get denied boarding in Karachi or Doha.',
        prevention:
          'We verify Pakistani passport rules explicitly and secure prior e-Visa approval well before departure.',
      },
      {
        title: 'Bank Statements Missing Account Holder Details or Currency',
        cause:
          'Unstamped app screenshots or statements lacking account holder name and clear closing balance fail Indonesian portal checks.',
        prevention:
          'We verify official bank-issued PDFs or stamped statements displaying full name, account number, and closing balance.',
      },
      {
        title: 'Incomplete Accommodation Addresses',
        cause:
          'Private Bali villas booked through peer platforms often omit full street and regency details needed on the immigration form.',
        prevention:
          'We verify complete Indonesian address fields (street, district, regency, postal code) before filing.',
      },
      {
        title: 'Applying Too Close to Departure',
        cause:
          'Indonesian public holidays (Nyepi in Bali, Lebaran/Eid, and national holidays) can pause immigration review desks.',
        prevention:
          'We map your filing window around Indonesian holiday calendars so your departure stays protected.',
      },
    ],
    localNotes: {
      overview: [
        'Indonesia draws Pakistani travellers primarily for Bali’s terraced rice valleys, cliffside sunset temples, and private pool villas—yet the archipelago stretches far beyond Denpasar. Yogyakarta offers centuries-old Javanese craft and volcanic dawn hikes, Lombok delivers quieter coral bays with abundant halal cuisine, and Jakarta pulses as Southeast Asia’s commercial capital.',
        'Because Indonesian immigration rules for Pakistani passports have shifted several times across recent years—including digital e-Visa transitions, financial threshold checks, and Bali’s provincial tourism levy—working off fresh verification rather than year-old forum threads prevents expensive airport surprises.',
      ],
      bestSeasonTitle: 'Dry-season sunshine vs lush green rice terraces',
      bestSeasonBody:
        'Bali, Lombok, and Java enjoy their driest, sunniest weather from May through September, with low humidity and clear mornings ideal for Mount Batur sunrises or Nusa Penida boat crossings. April and October are rewarding shoulder months with gentler villa rates. From November to March, tropical rainstorms arrive—often intensely for an hour or two—turning Ubud’s rice fields electric green while keeping spa retreats and cafés relaxed.',
      citiesTitle: 'Designing a balanced Bali or Java itinerary',
      citiesBody:
        'Traffic between southern Bali beaches and central highlands is notorious, so smart itineraries split stays geographically rather than commuting daily. Pair three nights in Ubud for jungle valleys, Tegallalang terraces, and artisan woodcarving with three to four nights on the coast in Seminyak, Nusa Dua, or cliff-perched Uluwatu. Travellers looking for an explicitly halal-focused island pairing add a short hop across the strait to Lombok’s Senggigi and Gili islands.',
      entryTipsTitle: 'Denpasar (DPS) and Jakarta (CGK) arrival essentials',
      entryTipsBody:
        'Before flying, complete Indonesia’s electronic customs declaration (e-CD) to obtain your QR code and check whether the Bali provincial tourist levy applies to your entry—paying online ahead of landing saves queues at Ngurah Rai Airport. Keep your printed e-Visa, return ticket, and villa confirmations accessible in hand luggage, and note that Bali observes Nyepi (the annual Day of Silence in March) when the entire island and airport shut down for 24 hours.',
    },
    packages: [
      {
        id: 'idn-standard',
        tabLabel: 'Tourist e-Visa',
        title: 'Indonesia / Bali Tourist Visa Desk',
        bestFor: 'Individual leisure and business travellers preparing an Indonesian visitor e-Visa.',
        serviceFee: '',
        turnaroundNote: 'Active portal verification and tracking.',
        includes: [
          'Current category and sponsorship eligibility check',
          'Bank statement and passport scan compliance audit',
          'Complete form drafting and application submission guidance',
          'Pre-flight Bali levy and e-CD customs briefing',
        ],
        excludesNote: 'Official Indonesian government fees and Bali provincial levy are paid separately.',
      },
      {
        id: 'idn-honeymoon',
        tabLabel: 'Couple / Honeymoon',
        title: 'Bali Honeymoon & Couple Filing',
        bestFor: 'Couples planning multi-stop Ubud and coastal villa itineraries.',
        serviceFee: '',
        turnaroundNote: 'Synchronised filing for both spouses.',
        includes: [
          'Joint application coordination and marriage/sponsor alignment',
          'Villa and multi-area Bali address verification',
          'Verifiable flight itinerary formatting for filing',
          'Dedicated WhatsApp check-in through departure',
        ],
        excludesNote: 'Official immigration charges apply per applicant; confirm current figures with our team.',
      },
      {
        id: 'idn-business',
        tabLabel: 'Business Visit',
        title: 'Jakarta / Trade Visit Visa File',
        bestFor: 'Pakistani buyers, exporters, and delegates visiting Indonesian firms.',
        serviceFee: '',
        turnaroundNote: 'Structured corporate invitation review.',
        includes: [
          'Indonesian host company invitation wording audit',
          'Pakistani company cover letter and NTN alignment',
          'Visa category confirmation (non-work commercial meetings)',
          'Pre-arrival Jakarta CGK customs and entry notes',
        ],
        excludesNote: 'Government charges are confirmed at actuals before submission.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders get a Bali Visa on Arrival?',
        answer:
          'No. Pakistani passport holders are not eligible for Indonesia’s Visa on Arrival and must secure prior visa approval before departing Pakistan.',
      },
      {
        question: 'Do I need an Indonesian sponsor for a Bali tourist visa?',
        answer:
          'Sponsorship rules depend on the exact visa subclass currently open to Pakistani nationals. Confirm the active tourist e-Visa pathway with our team before assembling your file.',
      },
      {
        question: 'Is Bali suitable for Pakistani families looking for halal food?',
        answer:
          'Yes. While Bali has a predominantly Hindu culture, halal-certified Indonesian, Middle Eastern, and Pakistani-friendly dining is widely available across Kuta, Seminyak, Nusa Dua, and Ubud—and neighbouring Lombok is predominantly Muslim.',
      },
      {
        question: 'What is the Bali tourist levy and is it included in the visa fee?',
        answer:
          'The Bali provincial government charges a separate international tourist levy for visitors entering Bali. It is distinct from the national Indonesian immigration visa fee.',
      },
      {
        question: 'How much bank balance do I need to show for an Indonesia visa?',
        answer:
          'Indonesian immigration specifies minimum liquid balance proof on recent personal bank statements. Because thresholds can be updated by update, our team confirms the exact current figure and checks your statement format before filing.',
      },
      {
        question: 'Can I visit both Jakarta and Bali on one Indonesian tourist visa?',
        answer:
          'Yes. A standard Indonesian tourist visa covers travel across Indonesian provinces, allowing domestic flights between Jakarta, Yogyakarta, Bali, and Lombok within a single entry.',
      },
    ],
    relatedSlugs: ['malaysia', 'thailand', 'singapore', 'philippines'],
  },
  {
    slug: 'singapore',
    country: 'Singapore',
    isoCode: 'SGP',
    region: 'Southeast Asia',
    channel: 'Hybrid / Centre',
    accentHex: '#7A2832',
    stampLabel: 'SINGAPORE · SGP',
    stampRotation: 4,
    heroPromise:
      'Authorised-channel guidance, Form 14A precision, and sponsor or hotel file assembly for Pakistani travellers heading to Singapore.',
    seoTitle: 'Singapore Visa from Pakistan — Filing Guide | Visahouse',
    seoDescription:
      'Prepare a clean Singapore entry visa from Pakistan with Form 14A drafting, V39A invitation guidance, and SG Arrival Card prep.',
    facts: {
      visaType: 'Singapore Entry Visa (Assessment Level II)',
      entryType: 'Single or Multiple Entry (at ICA discretion)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<SGPVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'SGP0000000PAK0000000M0000000<<<<<<<<<<<<<<06',
    },
    whoCanApply: {
      intro:
        'Pakistani citizens fall under Singapore’s Assessment Level II entry visa framework, meaning every tourist, family visitor, or corporate traveller must apply through an authorised visa agent or local Singaporean sponsor before departure.',
      profiles: [
        'Families and couples visiting Marina Bay, Sentosa, and Singapore Zoo—often paired with Malaysia',
        'Relatives invited by Singapore citizens or Permanent Residents via Form V39A',
        'Corporate executives, tech founders, and conference attendees invited by Singapore-registered companies',
        'Cruise passengers embarking or disembarking at Marina Bay Cruise Centre',
      ],
      eligibilityNote:
        'Singapore’s Immigration & Checkpoints Authority (ICA) places strong emphasis on a properly completed Form 14A and, where applicable, a Letter of Introduction (Form V39A) from an eligible Singapore contact or registered business.',
    },
    checklist: [
      {
        groupTitle: 'Mandatory ICA Forms & Identity',
        items: [
          {
            id: 'sgp-passport',
            label: 'Valid Pakistani Passport & Bio-Page Copy',
            detail:
              'Passport meeting remaining validity rules with copies of previous visas (especially Schengen, UK, US, or prior ASEAN travel).',
            mandatory: true,
          },
          {
            id: 'sgp-form14a',
            label: 'Completed & Signed Form 14A',
            detail:
              'Official ICA visa application form filled consistently without abbreviations or date contradictions.',
            mandatory: true,
          },
          {
            id: 'sgp-photo',
            label: 'Recent White-Background Matte Photo',
            detail:
              'Taken within the last three months, 35mm × 45mm dimensions, dark attire preferred for clean contrast against white background.',
            mandatory: true,
          },
          {
            id: 'sgp-v39a',
            label: 'Letter of Introduction (Form V39A) / Sponsor Details',
            detail:
              'Where applying via a Singapore citizen, PR, or Singapore corporate host, Form V39A signed by the local contact plus their NRIC/company details.',
          },
        ],
      },
      {
        groupTitle: 'Financial & Return-Tie Proof',
        items: [
          {
            id: 'sgp-bank',
            label: 'Stamped Bank Statement & Account Certificate',
            detail:
              'Reflects stable personal or household income sufficient for Singapore’s higher daily hotel and transport costs.',
            mandatory: true,
          },
          {
            id: 'sgp-work',
            label: 'Employer NOC or Company NTN & Letterhead',
            detail:
              'Confirms active role, salary, and approved leave dates—or business ownership in Pakistan.',
            mandatory: true,
          },
          {
            id: 'sgp-bookings',
            label: 'Return Flight & Hotel Confirmation',
            detail:
              'Shows exact arrival via Changi Airport or Johor land checkpoint and confirmed lodging in Singapore.',
            mandatory: true,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Sponsor & Pathway Evaluation',
        youDo:
          'Tell us whether you have a Singapore host (relative or corporate partner) or are travelling purely for tourism.',
        weDo:
          'Assess Assessment Level II documentation requirements, clarify V39A availability, and confirm the authorised submission channel.',
      },
      {
        stepNumber: '02',
        title: 'Form 14A & Visa File Assembly',
        youDo:
          'Share your passport scans, photo, bank statement, employment papers, and Singapore contact details if any.',
        weDo:
          'Draft Form 14A accurately, verify V39A wording where used, and audit financial capacity against Singapore hotel budgets.',
      },
      {
        stepNumber: '03',
        title: 'Authorised Channel Filing',
        youDo:
          'Sign the finalised Form 14A and approve submission.',
        weDo:
          'Coordinate filing through the proper authorised channel and keep you updated until ICA issues the electronic visa notice.',
      },
      {
        stepNumber: '04',
        title: 'SG Arrival Card & Changi Readiness',
        youDo:
          'Send your confirmed flight details three days prior to travel.',
        weDo:
          'Guide your free SG Arrival Card (SGAC) online filing and share Changi immigration and MRT transit tips.',
      },
    ],
    refusalReasons: [
      {
        title: 'Missing or Improperly Signed Form V39A',
        cause:
          'Assessment Level II applications without a valid Letter of Introduction from an eligible local contact or approved channel face steep scrutiny.',
        prevention:
          'We verify sponsor eligibility (Singapore citizen or PR aged 21+, or local corporate representative) and check every V39A field before submission.',
      },
      {
        title: 'Understated Budget for Singapore Costs',
        cause:
          'Singapore hotel rates and daily expenses are significantly higher than regional neighbours; thin bank balances look misaligned with a 5-night stay.',
        prevention:
          'We evaluate your statement balance alongside realistic trip duration and advise on clean sponsor or joint family documentation.',
      },
      {
        title: 'Discrepancies in Form 14A Personal History',
        cause:
          'Leaving out prior visa refusals, past names, or inconsistent employer addresses triggers immediate red flags with ICA.',
        prevention:
          'Our desk cross-checks every Form 14A line against your passport, CNIC, and employment letterhead.',
      },
      {
        title: 'Overlooking Visa-Free Transit Limits',
        cause:
          'Travellers assume a layover allows entering Singapore without checking strict Visa-Free Transit Facility (VFTF) nationality and third-country visa rules.',
        prevention:
          'We clarify whether you genuinely require a full entry visa rather than gambling at the Changi transit counter.',
      },
    ],
    localNotes: {
      overview: [
        'Compact, impeccably organised, and effortlessly walkable, Singapore is one of the easiest cities in Asia for Pakistani families travelling with young children or elderly parents. Within twenty minutes of clearing Changi Airport, you can move from colonial shophouses in Kampong Gelam—anchored by the golden dome of Sultan Mosque and dozens of Malay, Turkish, and Lebanese halal kitchens—to the glass conservatories of Gardens by the Bay.',
        'Entry preparation, however, demands more discipline than casual regional trips. Singapore treats visa issuance as a pre-entry assessment rather than an entitlement, and final stay length is granted by the immigration officer at Changi or Woodlands checkpoint upon arrival.',
      ],
      bestSeasonTitle: 'Year-round city breaks and festival timing',
      bestSeasonBody:
        'Singapore experiences equatorial warmth year-round, with air-conditioned malls, museums, and covered walkways making every month viable. February through April tends to see slightly brighter skies and fewer prolonged downpours, while November and December bring dramatic afternoon rainstorms alongside festive Orchard Road illuminations. Watch hotel surges around the September Formula 1 weekend and Chinese New Year, when room tariffs climb sharply.',
      citiesTitle: 'Neighbourhoods worth prioritising in a 3-to-5-day stay',
      citiesBody:
        'Base yourself near Bugis, Arab Street (Kampong Gelam), or Lavender for immediate access to halal dining and dual MRT lines, or choose Marina Bay if skyline views are the centerpiece of your trip. Dedicate one full day to Sentosa Island (Universal Studios, S.E.A. Aquarium, and cable car), an evening to the Supertree light show and Cloud Forest, a morning to Singapore Zoo or Bird Paradise in Mandai, and a relaxed afternoon browsing Little India and Chinatown heritage streets.',
      entryTipsTitle: 'SG Arrival Card, customs rules, and land crossings to Malaysia',
      entryTipsBody:
        'Complete the official SG Arrival Card (SGAC) within three days before landing—it is free on the ICA portal, so avoid paid third-party lookalike websites. Singapore enforces strict customs laws on chewing gum, e-cigarettes/vapes (strictly prohibited), and undeclared tobacco. If you plan to cross by coach or train to Johor Bahru or Kuala Lumpur, confirm your Malaysian entry requirements separately so your passport clears both sides smoothly.',
    },
    packages: [
      {
        id: 'sgp-standard',
        tabLabel: 'Tourist / Family',
        title: 'Singapore Entry Visa Preparation',
        bestFor: 'Pakistani visitors travelling with a local host V39A or authorised tourist channel.',
        serviceFee: '',
        turnaroundNote: 'Thorough Form 14A and V39A audit prior to submission.',
        includes: [
          'Assessment Level II eligibility and V39A verification',
          'Complete Form 14A drafting and error audit',
          'Financial and employment document check',
          'SG Arrival Card (SGAC) pre-departure walkthrough',
        ],
        excludesNote: 'Official ICA fee and authorised agent handling charges are confirmed separately with our team.',
      },
      {
        id: 'sgp-business',
        tabLabel: 'Corporate Desk',
        title: 'Singapore Business & Conference File',
        bestFor: 'Executives and delegates invited by Singapore-registered companies or summits.',
        serviceFee: '',
        turnaroundNote: 'Priority corporate invitation and ACRA alignment.',
        includes: [
          'Host company V39A and business-profile alignment',
          'Pakistani corporate cover letter and designation drafting',
          'Form 14A and conference itinerary packaging',
          'Changi transit and SGAC departure checklist',
        ],
        excludesNote: 'Official ICA charges are confirmed prior to filing.',
      },
      {
        id: 'sgp-combo',
        tabLabel: 'SGP + MYS Route',
        title: 'Singapore + Malaysia Dual Planning',
        bestFor: 'Families combining Singapore and Kuala Lumpur in one holiday.',
        serviceFee: '',
        turnaroundNote: 'Coordinated entry sequencing across both borders.',
        includes: [
          'Flight vs coach routing plan (preventing single-entry conflicts)',
          'Synchronised checklists for ICA and Malaysia e-Visa',
          'Dual arrival card prep (SGAC + MDAC)',
          'Single WhatsApp case consultant across both files',
        ],
        excludesNote: 'Government fees for both countries are confirmed with our team.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders apply directly online on the Singapore ICA portal?',
        answer:
          'Generally, foreign applicants cannot submit directly without a Singpass-holding local sponsor or an authorised visa agent. Our team guides you on the proper pathway based on whether you have a local contact in Singapore.',
      },
      {
        question: 'What is Form V39A for a Singapore visa?',
        answer:
          'Form V39A is the official Letter of Introduction completed by a Singapore citizen or Permanent Resident (aged 21 or above), or an authorised local corporate representative, vouching for the visitor during an Assessment Level II application.',
      },
      {
        question: 'Does holding a valid US or Schengen visa make Singapore visa-free for Pakistanis?',
        answer:
          'No—it does not make Singapore generally visa-free for tourism. While Singapore maintains narrow Visa-Free Transit Facility (VFTF) rules for specific nationalities under strict 96-hour onward-flight conditions, eligibility is strictly regulated and must be verified carefully; most Pakistani travellers obtain a full Singapore entry visa in advance.',
      },
      {
        question: 'How long can I stay in Singapore once my visa is approved?',
        answer:
          'A Singapore entry visa permits you to travel to the border, but the exact number of days permitted is stamped by the ICA officer upon arrival via the electronic Visit Pass (e-Pass). Confirm typical visit windows with our team.',
      },
      {
        question: 'Is the SG Arrival Card the same as a Singapore visa?',
        answer:
          'No. The SG Arrival Card (SGAC) is an electronic health and arrival declaration required within three days before entry. You still need your approved Singapore entry visa beforehand.',
      },
      {
        question: 'Do I receive a physical sticker in my passport for Singapore?',
        answer:
          'Singapore typically issues an electronic visa (e-Visa) PDF that you print and carry alongside your passport rather than a physical embassy sticker.',
      },
    ],
    relatedSlugs: ['malaysia', 'thailand', 'indonesia', 'japan'],
  },
  {
    slug: 'cambodia',
    country: 'Cambodia',
    isoCode: 'KHM',
    region: 'Southeast Asia',
    channel: 'e-Visa',
    accentHex: '#5A3E2B',
    stampLabel: 'ANGKOR · KHM',
    stampRotation: -5,
    heroPromise:
      'Straightforward Cambodia tourist e-Visa filing, port-of-entry verification, and Cambodia e-Arrival prep for Pakistani travellers visiting Siem Reap and Phnom Penh.',
    seoTitle: 'Cambodia Visa from Pakistan — e-Visa Guide | Visahouse',
    seoDescription:
      'Apply for a Cambodia tourist e-Visa from Pakistan with port-of-entry checks, photo formatting, and Siem Reap arrival tips.',
    facts: {
      visaType: 'Cambodia Tourist e-Visa (Type T)',
      entryType: 'Single Entry',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<KHMVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'KHM0000000PAK0000000M0000000<<<<<<<<<<<<<<01',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders visiting Cambodia for archaeological sightseeing at Angkor Wat, Mekong heritage tours in Phnom Penh, or coastal relaxation near Kampot and Koh Rong should secure prior e-Visa or embassy clearance before departure.',
      profiles: [
        'Cultural travellers pairing Bangkok or Kuala Lumpur with a 3-to-5-day Siem Reap Angkor Wat extension',
        'Solo backpackers and photographers exploring Khmer temples and Tonlé Sap floating villages',
        'Small groups travelling across Indochina overland or via short regional flights',
        'Business travellers requiring Type E ordinary-visa guidance (confirm category before filing)',
      ],
      eligibilityNote:
        'Cambodia’s e-Visa is valid ONLY at designated international airports (Phnom Penh, Siem Reap-Angkor, Sihanoukville) and specific approved land borders—confirm your exact crossing point before applying.',
    },
    checklist: [
      {
        groupTitle: 'e-Visa Digital Packet',
        items: [
          {
            id: 'khm-passport',
            label: 'Valid Pakistani Passport Bio-Page Scan',
            detail:
              'Clear colour scan showing remaining validity and clean blank pages for entry/exit stamps.',
            mandatory: true,
          },
          {
            id: 'khm-photo',
            label: 'Recent Passport-Style Digital Portrait',
            detail:
              'Unobstructed face on a plain light background, JPEG format resized to official portal tolerances.',
            mandatory: true,
          },
          {
            id: 'khm-routing',
            label: 'Flight & Designated Entry-Port Details',
            detail:
              'Confirms arrival through Siem Reap-Angkor (SAI), Phnom Penh (PNH), or an e-Visa-approved land border.',
            mandatory: true,
          },
          {
            id: 'khm-hotel',
            label: 'Cambodia Hotel Address & Booking Confirmation',
            detail:
              'Full hotel name, street, and city required on both the e-Visa form and the Cambodia e-Arrival card.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Border & Financial Backups',
        items: [
          {
            id: 'khm-funds',
            label: 'Proof of Travel Funds & Return Ticket',
            detail:
              'Printed onward flight out of Cambodia and bank/card evidence to present if requested at airport immigration.',
            mandatory: true,
          },
          {
            id: 'khm-insurance',
            label: 'Optional Comprehensive Travel Insurance',
            detail:
              'Recommended for temple excursions, tuk-tuk transit, and regional medical evacuation cover.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Port-of-Entry & Category Check',
        youDo:
          'Confirm whether you are flying into Siem Reap (SAI), Phnom Penh (PNH), or crossing overland from Thailand or Vietnam.',
        weDo:
          'Verify your entry checkpoint accepts the Cambodia e-Visa and confirm active official portal charges.',
      },
      {
        stepNumber: '02',
        title: 'Scan & Form Verification',
        youDo:
          'Share your passport scan, digital photo, and first-night hotel details.',
        weDo:
          'Check name spelling, passport expiry, and crop portrait imagery cleanly to avoid portal validation errors.',
      },
      {
        stepNumber: '03',
        title: 'Official Portal Filing & Delivery',
        youDo:
          'Approve your compiled summary sheet.',
        weDo:
          'Submit your application cleanly, monitor issuance, and deliver your approved e-Visa PDF ready for two printed copies.',
      },
      {
        stepNumber: '04',
        title: 'Cambodia e-Arrival Card Prep',
        youDo:
          'Confirm your final flight number inside the 7-day pre-arrival window.',
        weDo:
          'Walk you through the official Cambodia e-Arrival (CeA) digital form and USD cash notes tip for Angkor passes.',
      },
    ],
    refusalReasons: [
      {
        title: 'Arriving at a Non-e-Visa Land Border',
        cause:
          'Not every overland crossing from Thailand, Laos, or Vietnam accepts the Cambodia e-Visa, leading to refusal at the frontier.',
        prevention:
          'We verify your exact land or air port of entry against the currently authorised e-Visa checkpoint list before filing.',
      },
      {
        title: 'Confusing Official Portal with Inflated Unofficial Websites',
        cause:
          'Travellers occasionally pay lookalike domains that mis-enter passport numbers or deliver unusable vouchers.',
        prevention:
          'We verify certificate authenticity and double-check every passport digit against your MRZ strip.',
      },
      {
        title: 'Passport Damage or Short Validity',
        cause:
          'Cambodian border officers strictly refuse entry for torn bio pages, water-stained laminates, or passports close to expiry.',
        prevention:
          'We inspect your full bio-page scan at intake and flag physical condition risks early.',
      },
      {
        title: 'Skipping the Onward Ticket on Regional Hops',
        cause:
          'Budget carriers out of Bangkok or Kuala Lumpur often check printed proof of onward travel out of Cambodia before issuing boarding passes.',
        prevention:
          'We include an airline-check folder summary covering both your e-Visa PDF and exit reservation.',
      },
    ],
    localNotes: {
      overview: [
        'Cambodia rewards travellers who look beyond crowded beaches toward living architectural history. Standing before Angkor Wat’s lotus towers at dawn or wandering beneath the strangler-fig roots of Ta Prohm in Siem Reap feels genuinely transformative—and because Siem Reap sits barely an hour’s flight from Bangkok or two hours from Kuala Lumpur, Pakistani travellers routinely fold Cambodia into a broader Southeast Asian trip.',
        'Entry logistics have modernised rapidly: Siem Reap now operates out of the new Siem Reap-Angkor International Airport (SAI) roughly an hour outside town, and Cambodia has introduced the digital Cambodia e-Arrival (CeA) declaration alongside its e-Visa.',
      ],
      bestSeasonTitle: 'Cool temple mornings vs emerald monsoon moats',
      bestSeasonBody:
        'November through February is Cambodia’s most comfortable season, offering dry mornings around 22–28°C that make full-day Angkor temple circuits far less exhausting. March and April turn intensely hot and dusty across the Angkor plain. Between June and October, afternoon rains refill the temple moats and turn surrounding forests deep green while tourist crowds thin dramatically—often yielding the most dramatic photography.',
      citiesTitle: 'Siem Reap, Phnom Penh, and Kampot pacing',
      citiesBody:
        'Give Siem Reap at least three full days: one for Angkor Wat, Bayon, and Ta Prohm on the Small Circuit, a second for outer pink-sandstone carvings at Banteay Srei and lakeside stilt villages on Tonlé Sap, and a slower day for riverside cafés and artisan workshops. Add two nights in Phnom Penh for the Royal Palace, National Museum, and poignant modern history sites (Tuol Sleng and Choeung Ek), where halal Cambodian-Cham restaurants cluster around Boeung Kak and Chroy Changvar.',
      entryTipsTitle: 'Cash etiquette, airport transfer, and e-Arrival notes',
      entryTipsBody:
        'Cambodia operates a dual-currency economy using both crisp US dollars and Cambodian riel (small change is normally returned in riel). Inspect every USD bill you carry from Pakistan—even tiny tears or ink marks are routinely rejected by hotels and shops. Print two copies of your Cambodia e-Visa (immigration retains one on arrival) and complete the Cambodia e-Arrival card within seven days before landing at SAI or PNH.',
    },
    packages: [
      {
        id: 'khm-standard',
        tabLabel: 'Tourist e-Visa',
        title: 'Cambodia Type-T e-Visa Filing',
        bestFor: 'Solo and couple travellers heading to Siem Reap or Phnom Penh.',
        serviceFee: '',
        turnaroundNote: 'Fast digital filing and e-Arrival support.',
        includes: [
          'Port-of-entry eligibility verification (air or approved land crossing)',
          'Passport and digital photo compliance formatting',
          'Official e-Visa filing and delivery of printable PDF',
          'Cambodia e-Arrival (CeA) pre-flight walkthrough',
        ],
        excludesNote: 'Official Cambodian government e-Visa fee is billed separately; confirm current rate with our team.',
      },
      {
        id: 'khm-indochina',
        tabLabel: 'Multi-Country Add-On',
        title: 'Thailand + Cambodia Twin-Trip Filing',
        bestFor: 'Pakistani travellers adding Angkor Wat onto a Bangkok or Kuala Lumpur itinerary.',
        serviceFee: '',
        turnaroundNote: 'Coordinated dates so re-entry rules stay intact.',
        includes: [
          'Multi-border entry-count check (preventing Bangkok re-entry issues)',
          'Cambodia e-Visa filing aligned with regional flight segments',
          'Airport-to-Siem Reap transfer and Angkor pass preparation tips',
          'Unified WhatsApp case desk throughout your journey',
        ],
        excludesNote: 'Official government fees for each destination are confirmed separately.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders get a Cambodia visa on arrival?',
        answer:
          'Pakistani citizens are advised to secure prior visa clearance (such as the Cambodia e-Visa or embassy visa where applicable) before travelling, as visa-on-arrival eligibility for Pakistani passports is restricted. Confirm current nationality rules with our team before departure.',
      },
      {
        question: 'Which airports accept the Cambodia tourist e-Visa?',
        answer:
          'Cambodia’s e-Visa is accepted at Phnom Penh International Airport (PNH), Siem Reap-Angkor International Airport (SAI), and Sihanoukville International Airport (KOS), plus specific designated land borders with Thailand, Vietnam, and Laos.',
      },
      {
        question: 'Is there halal food available in Siem Reap and Phnom Penh?',
        answer:
          'Yes. Cambodia has a longstanding Muslim Cham community, and both Siem Reap (near the Old Market and Steung Thmey mosque) and Phnom Penh offer dedicated halal restaurants serving Khmer, Malay, and South Asian dishes.',
      },
      {
        question: 'What is the Cambodia e-Arrival Card?',
        answer:
          'The Cambodia e-Arrival (CeA) system combines immigration, customs, and health declarations into one free digital form completed within seven days before arriving at Cambodia’s international airports. It supplements, rather than replaces, your visa.',
      },
      {
        question: 'If I fly from Bangkok to Siem Reap and back to Bangkok, what Thailand visa do I need?',
        answer:
          'Exiting Thailand for Cambodia uses up a single-entry Thai visa. If you plan to re-enter Thailand afterwards, plan a multiple-entry visa or re-entry permit strategy with our team before your first flight.',
      },
      {
        question: 'Do I need to print my Cambodia e-Visa?',
        answer:
          'Yes. Print two clear copies of your e-Visa PDF to keep inside your passport—border officers inspect and typically collect one copy upon arrival.',
      },
    ],
    relatedSlugs: ['thailand', 'malaysia', 'indonesia', 'philippines'],
  },
  {
    slug: 'philippines',
    country: 'Philippines',
    isoCode: 'PHL',
    region: 'Southeast Asia',
    channel: 'Sticker / Embassy',
    accentHex: '#1F4F5A',
    stampLabel: 'MANILA DESK · PHL',
    stampRotation: 3,
    heroPromise:
      'Complete embassy-packet preparation, notarisation checks, and eTravel guidance for Pakistani passport holders applying for a Philippines temporary visitor visa.',
    seoTitle: 'Philippines Visa from Pakistan — Checklist | Visahouse',
    seoDescription:
      'Apply for a Philippines tourist or business visa from Pakistan with embassy checklist auditing, cover letters, and eTravel guidance.',
    facts: {
      visaType: 'Temporary Visitor Visa (9(a) Tourist / Business)',
      entryType: 'Single or Multiple Entry (embassy discretion)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<PHLVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'PHL0000000PAK0000000M0000000<<<<<<<<<<<<<<09',
    },
    whoCanApply: {
      intro:
        'Pakistani citizens travelling to Manila, Cebu, Boracay, or Palawan for tourism, visiting family, or commercial meetings apply through the Embassy of the Republic of the Philippines in Islamabad or designated honorary consulates, subject to current submission rules.',
      profiles: [
        'Leisure travellers heading to Boracay’s white-sand beaches, El Nido lagoons in Palawan, or Cebu',
        'Corporate visitors and BPO/tech partners attending meetings in Bonifacio Global City (BGC) or Makati',
        'Family visitors invited by Filipino spouses or relatives (with formal Affidavit of Support where applicable)',
        'Experienced Asian travellers with established bank and employment history in Pakistan',
      ],
      eligibilityNote:
        'Embassy of the Philippines visa officers review ties to Pakistan closely and may request in-person appearance or interview in Islamabad, plus authenticated invitation letters where a local host is involved.',
    },
    checklist: [
      {
        groupTitle: 'Embassy Forms & Personal Papers',
        items: [
          {
            id: 'phl-passport',
            label: 'Original Pakistani Passport & Copies',
            detail:
              'Machine-readable passport valid well beyond planned return date, plus copies of prior visas and entry stamps.',
            mandatory: true,
          },
          {
            id: 'phl-form',
            label: 'Completed Non-Immigrant Visa Application Form (FA Form No. 2)',
            detail:
              'Typed cleanly without blanks, signed consistently with the passport signature.',
            mandatory: true,
          },
          {
            id: 'phl-photos',
            label: 'Recent Colour Passport Photographs',
            detail:
              'Clean white backdrop, 2×2 inch format matching Philippine embassy requirements.',
            mandatory: true,
          },
          {
            id: 'phl-cnic',
            label: 'CNIC & NADRA Police Character Certificate (Where Requested)',
            detail:
              'Colour CNIC copy; confirm with our team whether police clearance or additional attestations apply to your profile.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial, Work & Itinerary Proof',
        items: [
          {
            id: 'phl-bank',
            label: 'Six-Month Bank Statement & Account Maintenance Letter',
            detail:
              'Bank-stamped statement showing steady inflows matching your stated income.',
            mandatory: true,
          },
          {
            id: 'phl-work',
            label: 'Employment Certificate / Business Registration & Tax Returns',
            detail:
              'Employer NOC with salary and leave approval, or NTN/Chamber registration and FBR returns for business owners.',
            mandatory: true,
          },
          {
            id: 'phl-bookings',
            label: 'Round-Trip Flight Reservation & Hotel Confirmations',
            detail:
              'Realistic routing into Manila (MNL) or Cebu (CEB) with matching hotel dates across islands.',
            mandatory: true,
          },
          {
            id: 'phl-invite',
            label: 'Notarised Invitation / Affidavit of Support (If Visiting a Host)',
            detail:
              'Required when staying with a Filipino citizen or resident rather than booking commercial hotels.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Jurisdiction & Category Verification',
        youDo:
          'Share your city of residence in Pakistan, trip purpose (tourism, business, or family visit), and travel dates.',
        weDo:
          'Confirm current Embassy of the Philippines submission procedures, appointment rules, and exact official fee schedule.',
      },
      {
        stepNumber: '02',
        title: 'Document Check & Form Drafting',
        youDo:
          'Provide your passport scans, bank statement, employment or tax papers, and host invitation if applicable.',
        weDo:
          'Complete FA Form No. 2, draft your tailored cover letter and day-by-day island itinerary, and check host affidavit compliance.',
      },
      {
        stepNumber: '03',
        title: 'Submission & Interview Readiness',
        youDo:
          'Attend Islamabad submission/interview if scheduled by the embassy.',
        weDo:
          'Organise your tabbed physical visa file in exact embassy order and brief you on typical verification questions.',
      },
      {
        stepNumber: '04',
        title: 'eTravel Registration & Arrival Notes',
        youDo:
          'Confirm your final flights 72 hours before departure.',
        weDo:
          'Guide your official Philippines eTravel QR registration and share NAIA terminal transfer tips.',
      },
    ],
    refusalReasons: [
      {
        title: 'Informal or Un-notarised Host Letters',
        cause:
          'Casual emails or unsigned invitations from friends or relatives in the Philippines rarely satisfy embassy standards.',
        prevention:
          'Where a host is involved, we advise on formal notarised invitation wording and host ID documentation before submission.',
      },
      {
        title: 'Incomplete Tax or Employment Backing',
        cause:
          'Submitting a bank statement without tax returns, salary slips, or verifiable employer credentials weakens perceived ties to Pakistan.',
        prevention:
          'We align your bank credits directly against salary certificates or FBR tax filings so financial provenance is transparent.',
      },
      {
        title: 'Unrealistic Island-Hopping Schedules',
        cause:
          'Listing five separate islands in six days ignores domestic flight connections out of Manila’s separate NAIA terminals.',
        prevention:
          'We design practical itineraries (for example Manila + Boracay or Cebu + Bohol) with realistic transfer buffers.',
      },
      {
        title: 'Missing eTravel QR Code at Check-in',
        cause:
          'Airlines flying into Manila and Cebu verify your free Philippine eTravel registration before boarding.',
        prevention:
          'We send step-by-step eTravel instructions inside the 72-hour window ahead of your flight.',
      },
    ],
    localNotes: {
      overview: [
        'Stretching across more than seven thousand islands, the Philippines offers dramatic limestone coves in Palawan, powdery sands in Boracay, Spanish-era walled quarters in Intramuros, and a warm, English-speaking hospitality culture that makes navigating domestic flights and island ferries straightforward for Pakistani visitors. Business travellers also connect frequently with Manila’s financial districts in Makati and Bonifacio Global City.',
        'Because Philippine visitor visas for Pakistani passports are assessed through formal embassy procedures rather than instant portals, early preparation pays off. Giving your file ample lead time allows calm document verification without rushing courier or Islamabad appointment logistics.',
      ],
      bestSeasonTitle: 'Amihan dry trade winds vs typhoon awareness',
      bestSeasonBody:
        'December through May is the prime dry window across Manila, Boracay, Cebu, and Palawan—coolest in January and February, warmer and sunnier through March and April. Between June and November, the southwest monsoon (Habagat) brings heavier rains and occasional tropical storms across Luzon and the Visayas, making flight buffer days and flexible travel insurance especially wise during mid-year trips.',
      citiesTitle: 'Manila, Boracay, Palawan, and Cebu routing',
      citiesBody:
        'International connections from Pakistan via Gulf or Southeast Asian hubs typically touch down in Manila (NAIA) or Cebu (Mactan-Cebu). Spending one or two nights in Makati or BGC lets you explore historic Intramuros and Rizal Park before hopping south to Caticlan for Boracay, Puerto Princesa or El Nido for Palawan’s turquoise lagoons, or Cebu for whale-shark coastal drives and Bohol’s Chocolate Hills. Halal restaurants are concentrated in Manila’s Ermita/Quiapo districts, Makati, and Cebu City.',
      entryTipsTitle: 'NAIA terminal transfers and eTravel checklist',
      entryTipsBody:
        'Manila’s Ninoy Aquino International Airport (NAIA) spans four separate terminals that are not connected airside; leave at least four hours if transferring onto a domestic island flight, or fly directly into Cebu where international and domestic gates sit minutes apart. Complete the free official Philippines eTravel declaration within 72 hours of arrival and carry printed copies of your passport visa, return flight, and hotel bookings.',
    },
    packages: [
      {
        id: 'phl-tourist',
        tabLabel: '9(a) Tourist',
        title: 'Philippines Tourist Visa File',
        bestFor: 'Leisure travellers preparing an embassy submission for Manila, Boracay, Cebu, or Palawan.',
        serviceFee: '',
        turnaroundNote: 'Complete form, itinerary, and embassy-order packet prep.',
        includes: [
          'FA Form No. 2 completion and document audit',
          'Bank statement, employment/NTN, and tie-strength review',
          'Tailored cover letter and realistic island itinerary',
          'Interview readiness notes and Philippines eTravel guidance',
        ],
        excludesNote: 'Embassy embassy fees and personal travel/courier costs are paid separately; confirm current rates with our team.',
      },
      {
        id: 'phl-business',
        tabLabel: '9(a) Business',
        title: 'Philippines Commercial Visit Filing',
        bestFor: 'Pakistani executives and technical partners invited by Philippine firms.',
        serviceFee: '',
        turnaroundNote: 'Structured host-company invitation alignment.',
        includes: [
          'Philippine company invitation and SEC/host check',
          'Pakistani corporate sponsorship and cover letter drafting',
          'Complete embassy visa file indexing',
          'eTravel and arrival preparation sheet',
        ],
        excludesNote: 'Embassy fees are confirmed at actuals prior to filing.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders enter the Philippines visa-free?',
        answer:
          'No. Pakistani passport holders generally require a prior Philippine Temporary Visitor Visa (9(a)) obtained before travel. Always confirm any rare conditional exemptions or current updates directly with our team.',
      },
      {
        question: 'Where do Pakistani applicants submit a Philippines visa application?',
        answer:
          'Applications are handled under the jurisdiction of the Embassy of the Republic of the Philippines in Islamabad or authorised embassy channels. Confirm current drop-off and interview procedures with our desk before preparing courier plans.',
      },
      {
        question: 'Is an interview required for a Philippines visa from Pakistan?',
        answer:
          'The visa officer retains discretion to call any applicant for an in-person or verification interview. We prepare your physical folder and brief you on your itinerary and ties so you feel completely ready if called.',
      },
      {
        question: 'What is the Philippines eTravel pass?',
        answer:
          'eTravel is the Philippine government’s free electronic arrival and customs registration portal completed within 72 hours before departure. It generates a QR code checked by airlines and airport immigration, and does not replace a visa.',
      },
      {
        question: 'Can I extend a Philippine tourist visa after arriving in Manila?',
        answer:
          'Extension policies are governed solely by the Philippine Bureau of Immigration and depend on the specific visa endorsement granted. Plan your initial itinerary strictly within your approved stay.',
      },
      {
        question: 'How far in advance should I start my Philippines visa file?',
        answer:
          'Because embassy review and any document verification take longer than automated e-Visas, we recommend starting at least six to eight weeks ahead of your intended departure month.',
      },
    ],
    relatedSlugs: ['indonesia', 'malaysia', 'thailand', 'south-korea'],
  },
];
