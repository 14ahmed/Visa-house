import type { DestinationData } from './types';

export const SOUTH_CENTRAL_ME_DESTINATIONS: DestinationData[] = [
  {
    slug: 'sri-lanka',
    country: 'Sri Lanka',
    isoCode: 'LKA',
    region: 'South Asia',
    channel: 'e-Visa',
    accentHex: '#2D5236',
    stampLabel: 'COLOMBO · LKA',
    stampRotation: -4,
    heroPromise:
      'Clean Sri Lanka ETA / tourist e-Visa preparation and Colombo arrival guidance for Pakistani families, cricket fans, and tea-country travellers.',
    seoTitle: 'Sri Lanka Visa from Pakistan — ETA Guide | Visahouse',
    seoDescription:
      'Apply for a Sri Lanka tourist ETA or e-Visa from Pakistan with passport checks, family itineraries, and Colombo arrival tips.',
    facts: {
      visaType: 'Sri Lanka Tourist ETA / e-Visa',
      entryType: 'Double Entry (standard short-stay tourist category, confirm active rule)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<LKAVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'LKA0000000PAK0000000M0000000<<<<<<<<<<<<<<05',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders visiting Sri Lanka for coastal holidays, misty Kandy and Nuwara Eliya tea estates, wildlife safaris in Yala, cricket series, or medical and business visits apply through Sri Lanka’s official electronic travel authorisation or e-Visa channel prior to travel.',
      profiles: [
        'Families from Karachi and Lahore taking advantage of short direct SriLankan Airlines flights to Colombo',
        'Honeymooners combining Bentota beaches with Ella hill-country train rides and tea bungalows',
        'Business buyers in textiles, gemstones, spices, and tea attending meetings in Colombo',
        'Cricket supporters and small groups planning short 4-to-7-day winter breaks',
      ],
      eligibilityNote:
        'Sri Lanka has periodically transitioned between its ETA portal and third-party e-Visa platforms and adjusted fee exemptions by nationality. Our desk confirms the live official portal and exact fee rule before you apply.',
    },
    checklist: [
      {
        groupTitle: 'Digital Application Essentials',
        items: [
          {
            id: 'lka-passport',
            label: 'Valid Pakistani Passport Bio-Page Scan',
            detail:
              'Passport meeting Sri Lankan remaining-validity rules from the date of arrival at Bandaranaike International Airport (CMB).',
            mandatory: true,
          },
          {
            id: 'lka-flight',
            label: 'Confirmed Return Flight Details',
            detail:
              'Round-trip flight routing into Colombo (CMB) with planned entry and departure dates.',
            mandatory: true,
          },
          {
            id: 'lka-hotel',
            label: 'First-Night & Full-Trip Hotel Addresses',
            detail:
              'Accurate hotel names and districts across Colombo, Kandy, Nuwara Eliya, or Bentota.',
            mandatory: true,
          },
          {
            id: 'lka-photo',
            label: 'Digital Portrait Photo (When Requested by Portal)',
            detail:
              'Clean white-background photograph kept ready in case your active category requests an image upload.',
          },
        ],
      },
      {
        groupTitle: 'Colombo Immigration Carry-On Pack',
        items: [
          {
            id: 'lka-funds',
            label: 'Proof of Accessible Travel Funds',
            detail:
              'Bank card or USD cash notes adequate for hotel bills, private driver hire, and daily expenses.',
            mandatory: true,
          },
          {
            id: 'lka-business',
            label: 'Sri Lankan Host Letter (For Business ETA)',
            detail:
              'Required when applying under the short-term business category rather than pure tourism.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Live Portal & Fee Verification',
        youDo:
          'Share your departure city, travel dates, and whether your trip is leisure or business.',
        weDo:
          'Verify the active Sri Lankan immigration portal (ETA vs e-Visa), current nationality fee update, and double-entry rules.',
      },
      {
        stepNumber: '02',
        title: 'Passport & Detail Audit',
        youDo:
          'Send a clean passport bio scan and your planned Sri Lankan cities.',
        weDo:
          'Check passport expiry margins, spelling accuracy, and hotel address details so no typographical mismatch reaches immigration.',
      },
      {
        stepNumber: '03',
        title: 'Filing & Approval Delivery',
        youDo:
          'Approve the summary sheet and settle applicable official charges.',
        weDo:
          'Submit your electronic application, monitor approval notice issuance, and send your printable ETA / e-Visa confirmation.',
      },
      {
        stepNumber: '04',
        title: 'Bandaranaike Arrival & Routing Tips',
        youDo:
          'Confirm your arrival flight time and driver pickup.',
        weDo:
          'Share Colombo arrival card guidance, currency exchange tips at CMB, and regional weather notes.',
      },
    ],
    refusalReasons: [
      {
        title: 'Passport Number or Name Typos on Automated Forms',
        cause:
          'Even a single transposed digit or swapped surname/given-name order causes airline check-in systems in Karachi or Lahore to block boarding.',
        prevention:
          'We transcribe strictly from your passport MRZ line and double-verify the issued approval PDF against your bio page.',
      },
      {
        title: 'Applying for Tourism While Entering for Commercial Trade',
        cause:
          'Declaring factory inspections or buyer meetings at Colombo immigration while holding a leisure ETA can trigger secondary questioning.',
        prevention:
          'We match your true trip purpose to the correct Tourist or Business category upfront.',
      },
      {
        title: 'Submitting Through Unofficial Mark-Up Sites',
        cause:
          'Search results frequently promote high-fee private intermediaries that mimic the official Sri Lankan portal without providing genuine review support.',
        prevention:
          'We file cleanly through official channels and keep our consultancy fee transparent and separated from government fees.',
      },
      {
        title: 'Underestimating Dual-Monsoon Weather',
        cause:
          'Booking south-coast resorts during peak southwest monsoon storms leads to washed-out itineraries and hurried rebookings.',
        prevention:
          'Our local notes match your travel month to the drier coast before you lock non-refundable resorts.',
      },
    ],
    localNotes: {
      overview: [
        'Few countries pack as much geographic variety into a three-and-a-half-hour flight from Karachi as Sri Lanka. Within a single week you can sip Ceylon tea beside waterfalls in Nuwara Eliya, trace Dutch colonial ramparts inside Galle Fort, spot leopards on an early morning jeep drive through Yala, and end with grilled seafood along Bentota’s palm-lined shoreline. Direct flights from Karachi and Lahore on SriLankan Airlines make it an effortless regional escape without long Gulf layovers.',
        'Warm cultural familiarity also appeals strongly to Pakistani families: cricket is a shared passion, halal food is widely available across Colombo, Kandy, and Beruwala through Sri Lanka’s vibrant Muslim community, and hiring a dedicated English-speaking car and driver for a full loop costs far less than comparable private transport elsewhere in Asia.',
      ],
      bestSeasonTitle: 'Two monsoons mean one coast is almost always sunny',
      bestSeasonBody:
        'Sri Lanka is governed by two alternating monsoons. From December through April, the west and south coasts (Colombo, Bentota, Mirissa, Galle) and the central hill country (Kandy, Nuwara Eliya, Ella) enjoy dry, bright days—ideal for winter escapes from Pakistan. From May through September, rains shift toward the southwest while the east coast (Trincomalee, Pasikudah, Arugam Bay) and ancient cultural triangle (Sigiriya, Polonnaruwa) turn dry and sunny.',
      citiesTitle: 'Classic 7-day island circuit without road fatigue',
      citiesBody:
        'Sri Lankan mountain roads are scenic but slow; distances that look short on a map often take three to four hours by car. A calm first-time loop starts with two nights in Kandy (Temple of the Sacred Tooth Relic, Peradeniya Botanical Gardens), moves up into Nuwara Eliya or Ella via the iconic blue hill-country train through misted tea estates, drops down to Bentota or Galle Fort for two coastal nights, and finishes with a final night in Colombo for shopping and halal dining along Galle Road and Marine Drive.',
      entryTipsTitle: 'Colombo (CMB) arrival and airport logistics',
      entryTipsBody:
        'Bandaranaike International Airport (CMB) sits in Katunayake, roughly 35 to 50 minutes north of central Colombo via the expressway. Carry a printed copy of your ETA or e-Visa approval alongside your return ticket and hotel bookings. Airport bank counters in the arrivals hall offer regulated, transparent rupee exchange rates—keep your exchange receipt if you intend to convert unused LKR back at departure—and pick up a local Dialog or Mobitel tourist SIM right outside customs.',
    },
    packages: [
      {
        id: 'lka-tourist',
        tabLabel: 'Tourist ETA',
        title: 'Sri Lanka Tourist ETA / e-Visa Desk',
        bestFor: 'Solo visitors, couples, and cricket travellers heading to Colombo and the hill country.',
        serviceFee: '',
        turnaroundNote: 'Fast electronic submission with MRZ verification.',
        includes: [
          'Active portal and nationality fee verification',
          'Passport MRZ audit and complete form submission',
          'Approval PDF cross-check before delivery',
          'Colombo airport and seasonal coast routing guide',
        ],
        excludesNote: 'Official Sri Lankan government fee (if applicable under current update) is billed separately.',
      },
      {
        id: 'lka-family',
        tabLabel: 'Family Group',
        title: 'Family & Group Sri Lanka Filing',
        bestFor: 'Extended families travelling together for winter holidays or weddings.',
        serviceFee: '',
        turnaroundNote: 'Coordinated group submissions delivered in one tidy packet.',
        includes: [
          'Batch MRZ verification across adult and child passports',
          'Linked hotel and arrival details for the entire group',
          'Printable family border visa file pack',
          'Optional South Asia travel medical insurance add-on',
        ],
        excludesNote: 'Government charges apply per passport where mandated.',
      },
    ],
    faqs: [
      {
        question: 'Do Pakistani citizens need a visa to visit Sri Lanka?',
        answer:
          'Yes. Pakistani passport holders must obtain prior electronic travel authorisation (ETA / e-Visa) before flying to Sri Lanka unless a specific verified exemption update is active at the time of travel. Always confirm live status with our team.',
      },
      {
        question: 'Is Sri Lanka visa currently free for Pakistani passport holders?',
        answer:
          'Sri Lanka has periodically announced temporary fee-waiver pilots and updated visa updates for selected nationalities. Because these policies change on short government notice, we confirm the live fee status on the exact day you apply.',
      },
      {
        question: 'How long is the direct flight from Karachi or Lahore to Colombo?',
        answer:
          'Direct flights from Karachi to Colombo take roughly three and a half hours, and from Lahore roughly four hours, making Sri Lanka one of the closest tropical destinations to Pakistan.',
      },
      {
        question: 'Do I need a hotel booking for every city before applying for a Sri Lanka ETA?',
        answer:
          'You should have at least your primary arrival address in Sri Lanka confirmed before submitting, and carry full accommodation bookings and your return ticket in hand luggage for Colombo airport immigration.',
      },
      {
        question: 'Can I book the scenic Kandy-to-Ella train in advance?',
        answer:
          'Reserved observation and first-class seats sell out weeks ahead during December–April peak season. Once your travel dates and ETA are lined up, book train seats early or ask your ground operator to secure them.',
      },
      {
        question: 'Is Sri Lanka easy for halal food and family travel?',
        answer:
          'Very much so. Halal eateries are abundant in Colombo, Kandy, Negombo, Galle, and Beruwala, and hotels across the hill country routinely prepare halal poultry and seafood meals on request.',
      },
    ],
    relatedSlugs: ['nepal', 'malaysia', 'thailand', 'uzbekistan'],
  },
  {
    slug: 'nepal',
    country: 'Nepal',
    isoCode: 'NPL',
    region: 'South Asia',
    channel: 'Hybrid / Centre',
    accentHex: '#5E2C3B',
    stampLabel: 'KATHMANDU · NPL',
    stampRotation: 4,
    heroPromise:
      'Clear pre-departure visa preparation, Kathmandu embassy or arrival-procedure checks, and Himalayan trek logistics for Pakistani visitors to Nepal.',
    seoTitle: 'Nepal Visa from Pakistan — Travel & Filing | Visahouse',
    seoDescription:
      'Plan your Nepal tourist visa from Pakistan with SAARC nationality guidance, Kathmandu arrival prep, and Pokhara routing notes.',
    facts: {
      visaType: 'Nepal Tourist Visa (SAARC / Embassy or Arrival Rule Check)',
      entryType: 'Single or Multiple Entry (subject to active immigration rule)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<NPLVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'NPL0000000PAK0000000M0000000<<<<<<<<<<<<<<03',
    },
    whoCanApply: {
      intro:
        'Pakistani travellers heading to Nepal for Kathmandu’s medieval palace squares, Pokhara’s lakeside mountain views, Himalayan trekking (Annapurna or Everest base regions), or regional conferences benefit from confirming current SAARC-member visa rules before departure.',
      profiles: [
        'Mountain trekkers and adventure photographers travelling to Pokhara, Annapurna Base Camp, or Lukla',
        'Cultural travellers exploring Kathmandu, Patan, Bhaktapur, and Chitwan National Park',
        'SAARC conference delegates, NGO staff, and academics visiting Kathmandu Valley',
        'Families seeking cool summer mountain retreats with direct Gulf connections into Tribhuvan Airport',
      ],
      eligibilityNote:
        'Nepal maintains distinct SAARC nationality provisions alongside online pre-arrival form requirements and Embassy of Nepal Islamabad filing options. Confirm the live rule for Pakistani ordinary passports before boarding.',
    },
    checklist: [
      {
        groupTitle: 'Core Identity & Pre-Arrival Papers',
        items: [
          {
            id: 'npl-passport',
            label: 'Valid Pakistani Passport (Clean Pages & Validity)',
            detail:
              'Machine-readable passport with required remaining validity and at least two blank pages for visa sticker and stamps.',
            mandatory: true,
          },
          {
            id: 'npl-form',
            label: 'Online Pre-Arrival Visa Form Receipt',
            detail:
              'Barcode confirmation generated from Nepal’s Department of Immigration online portal within its active validity window before arrival or embassy submission.',
            mandatory: true,
          },
          {
            id: 'npl-photo',
            label: 'Recent Passport Photographs (White Background)',
            detail:
              'Two printed copies plus a clean digital scan for visa forms and optional trekking permits (TIMS / national park entries).',
            mandatory: true,
          },
          {
            id: 'npl-bookings',
            label: 'Return Ticket & Kathmandu / Pokhara Hotel Bookings',
            detail:
              'Shows full stay dates and verifiable local contact address in Nepal.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Trekking & Extended Stay Additions',
        items: [
          {
            id: 'npl-insurance',
            label: 'High-Altitude Medical & Evacuation Insurance (For Trekkers)',
            detail:
              'Standard city travel policies often cap altitude limits; trekkers heading above 3,000m need explicit helicopter evacuation cover.',
          },
          {
            id: 'npl-cash',
            label: 'Clean Small-Denomination USD Notes',
            detail:
              'Essential if settling any applicable arrival charges, national park fees, or permit counters in Kathmandu.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'SAARC Rule & Entry-Channel Confirmation',
        youDo:
          'Share your planned length of stay, whether this is your first Nepal visit this calendar year, and whether you will trek.',
        weDo:
          'Verify current SAARC tourist visa rules for Pakistani passports, embassy vs airport pre-arrival options, and any applicable official fee.',
      },
      {
        stepNumber: '02',
        title: 'Pre-Arrival Form & Visa File Prep',
        youDo:
          'Send your passport bio scan, digital portrait, flight schedule, and Kathmandu hotel confirmation.',
        weDo:
          'Prepare the online immigration form cleanly (or compile the Embassy of Nepal Islamabad packet if obtaining a sticker beforehand).',
      },
      {
        stepNumber: '03',
        title: 'Trekking Permit & Insurance Alignment',
        youDo:
          'Let us know if Annapurna, Langtang, or Everest trails are on your route.',
        weDo:
          'Guide high-altitude travel insurance selection and list exact photo and passport copies needed for local trekking permits.',
      },
      {
        stepNumber: '04',
        title: 'Tribhuvan Airport (KTM) Arrival Sheet',
        youDo:
          'Print your barcode form and hotel vouchers before boarding.',
        weDo:
          'Send a clear step-by-step Tribhuvan Airport arrival-hall guide so you clear counters swiftly without kiosk queues.',
      },
    ],
    refusalReasons: [
      {
        title: 'Expired Pre-Arrival Online Barcode',
        cause:
          'Nepal’s online tourist visa pre-registration barcode remains valid only for a limited window before entry; submitting too early causes it to lapse.',
        prevention:
          'We time your online pre-arrival form inside the exact active window ahead of your departure flight.',
      },
      {
        title: 'Misunderstanding Annual SAARC Entry Limits',
        cause:
          'Travellers returning to Nepal multiple times in the same calendar year sometimes overlook how repeat-visit fee rules apply after the first annual stay.',
        prevention:
          'We check your passport’s calendar-year Nepal travel history before advising on fee obligations.',
      },
      {
        title: 'Airline Check-In Uncertainty Without Pre-Documentation',
        cause:
          'Transit airlines in Gulf hubs occasionally ask for clear proof of Nepal entry eligibility, hotel bookings, and onward tickets.',
        prevention:
          'We assemble a crisp printed boarding visa file—or arrange advance Embassy of Nepal Islamabad sticker prep when preferred.',
      },
      {
        title: 'Under-Insured Himalayan Trekking',
        cause:
          'Standard urban travel policies exclude treks above 3,000 metres, leaving travellers exposed if altitude sickness strikes.',
        prevention:
          'We flag altitude coverage clauses early and connect you with appropriate medical evacuation options.',
      },
    ],
    localNotes: {
      overview: [
        'Nepal holds a quiet, magnetic charm for Pakistani travellers—familiar Himalayan warmth paired with a distinct world of carved Newari brick courtyards, prayer-flag mountain passes, and lakeside evenings in Pokhara with the fishtail silhouette of Machhapuchhre reflected in Phewa Lake. Because direct air corridors fluctuate, most travellers route cleanly from Karachi, Lahore, or Islamabad through Doha, Dubai, Sharjah, or Kuwait into Kathmandu’s Tribhuvan International Airport.',
        'Whether you plan a gentle heritage-and-lakeside trip or a multi-day teahouse trek into the Annapurna Sanctuary, clean pre-arrival paperwork lets you walk past crowded airport kiosks and straight into the Kathmandu Valley.',
      ],
      bestSeasonTitle: 'Clear autumn Himalayan horizons vs spring rhododendrons',
      bestSeasonBody:
        'October and November deliver Nepal’s sharpest, clearest post-monsoon skies—crisp mornings, golden rice terraces, and uninterrupted snow-peak views from Pokhara and Nagarkot. March through May is the second prime window, bringing milder temperatures and hillsides blazing with blooming rhododendrons, though afternoon valley haze increases in late April. June to early September brings heavy monsoon rain and leech-prone trails, while December to February is bright and quiet in the lowlands and valleys with crisp chilly evenings.',
      citiesTitle: 'Kathmandu Valley, Pokhara, and Chitwan balance',
      citiesBody:
        'Start with two or three days across the Kathmandu Valley—walking the brick squares of Patan and Bhaktapur, visiting historic Kashmiri Taqiya and Nepali Jame Masjid near Ghantaghar (where halal dining is plentiful around Thamel and Durbar Marg)—before taking a short scenic flight west to Pokhara. Spend three nights beside Phewa Lake for Sarangkot sunrise views, paragliding, or the beginner-friendly Poon Hill trail. Families wanting wildlife without altitude add two nights in Chitwan’s subtropical river plains for canoe safaris and one-horned rhinos.',
      entryTipsTitle: 'Tribhuvan Airport (KTM) and domestic mountain flight notes',
      entryTipsBody:
        'Print your Nepal Immigration online barcode confirmation before leaving Pakistan; airport touchscreen kiosks frequently queue up when widebody flights land together. Carry crisp, undamaged USD bills if paying any fees or hiring local trek guides, and build at least one buffer day in Kathmandu before your international return flight if you are flying back from Pokhara or Lukla, as mountain weather routinely delays short domestic hops.',
    },
    packages: [
      {
        id: 'npl-prearrival',
        tabLabel: 'Pre-Arrival Desk',
        title: 'Nepal Pre-Arrival & Verification Pack',
        bestFor: 'Pakistani travellers using Nepal’s arrival procedure who want verified SAARC rules and ready barcode forms.',
        serviceFee: '',
        turnaroundNote: 'Prepared inside the active pre-arrival window.',
        includes: [
          'Live verification of SAARC / Pakistani passport entry terms',
          'Timed completion of official online immigration pre-arrival form',
          'Boarding visa file with hotel, flight, and Tribhuvan Airport arrival guide',
          'Optional trekking permit checklist and insurance referral',
        ],
        excludesNote: 'Any applicable government visa fees or trekking park permits are paid at actuals.',
      },
      {
        id: 'npl-embassy',
        tabLabel: 'Embassy Sticker',
        title: 'Embassy of Nepal Islamabad Filing Prep',
        bestFor: 'Travellers who prefer holding a physical sticker visa before flying out of Pakistan.',
        serviceFee: '',
        turnaroundNote: 'Complete embassy-order packet preparation.',
        includes: [
          'Embassy form compilation and cover letter drafting',
          'Passport, CNIC, and hotel confirmation audit',
          'Submission scheduling guidance for Islamabad',
          'Pre-flight Kathmandu and Pokhara briefing sheet',
        ],
        excludesNote: 'Official embassy fees and courier charges are confirmed separately with our team.',
      },
    ],
    faqs: [
      {
        question: 'Do Pakistani citizens get special SAARC terms for a Nepal tourist visa?',
        answer:
          'Nepal’s immigration framework includes specific SAARC nationality provisions (including limited first-visit fee exemptions in a calendar year under standard rules). Because government updates can be amended, we verify current SAARC terms for your passport before you fly.',
      },
      {
        question: 'Should I get a Nepal visa from the Embassy in Islamabad or use arrival procedures?',
        answer:
          'Both routes can work depending on your travel dates and airline transit comfort. Some travellers prefer securing an advance embassy sticker in Islamabad to avoid any airport queue or transit-airline questions—our desk helps you pick the cleaner option.',
      },
      {
        question: 'Can I find halal food easily in Kathmandu and Pokhara?',
        answer:
          'Yes. Kathmandu has established Muslim neighbourhoods around Ghantaghar and Thamel with certified halal Nepali, Kashmiri, Turkish, and Mughlai restaurants, and Pokhara’s Lakeside strip also hosts dedicated halal kitchens.',
      },
      {
        question: 'Are guides mandatory for trekking in Nepal?',
        answer:
          'Nepal Tourism Board regulations have tightened rules around licensed guides in many protected national park zones. Always confirm current permit and licensed-guide rules for your exact trail (Annapurna, Langtang, or Khumbu) before starting.',
      },
      {
        question: 'How many days should I plan for a first trip to Nepal?',
        answer:
          'Seven to nine days comfortably covers Kathmandu Valley heritage sites, Pokhara’s lakes and sunrise viewpoints, and either Chitwan wildlife or a short two-day mountain hike.',
      },
      {
        question: 'Can I convert Pakistani Rupees (PKR) directly in Kathmandu?',
        answer:
          'PKR is generally not accepted at Nepalese street exchange counters. Carry clean, newer-series US Dollars (USD) from Pakistan to convert into Nepalese Rupees (NPR) at Kathmandu banks or licensed money changers.',
      },
    ],
    relatedSlugs: ['sri-lanka', 'uzbekistan', 'thailand', 'cambodia'],
  },
  {
    slug: 'uzbekistan',
    country: 'Uzbekistan',
    isoCode: 'UZB',
    region: 'Central Asia & Gulf',
    channel: 'Hybrid / Centre',
    accentHex: '#1E4B6E',
    stampLabel: 'SAMARKAND · UZB',
    stampRotation: -3,
    heroPromise:
      'Step-by-step Uzbekistan tourist visa guidance—LOI verification, embassy or e-Visa pathway checks, and Silk Road rail planning for Pakistani travellers.',
    seoTitle: 'Uzbekistan Visa from Pakistan — Silk Road Guide | Visahouse',
    seoDescription:
      'Apply for an Uzbekistan tourist visa from Pakistan with LOI / visa-support guidance, document checks, and Samarkand travel notes.',
    facts: {
      visaType: 'Uzbekistan Tourist Visa (LOI / Embassy or e-Visa Channel Check)',
      entryType: 'Single or Double Entry (category-dependent)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<UZBVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'UZB0000000PAK0000000M0000000<<<<<<<<<<<<<<07',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders visiting Tashkent, Samarkand, Bukhara, and Khiva for Silk Road heritage tours, Ziyarat of historic scholars (Imam Bukhari, Bahauddin Naqshband), winter ski trips near Chimgan, or trade visits require prior Uzbekistan visa clearance.',
      profiles: [
        'Heritage and family groups exploring Samarkand’s Registan, Bukhara’s old city, and Tashkent',
        'Ziyarat travellers visiting Imam al-Bukhari complex and historic Timurid shrines',
        'Winter travellers heading to Amirsoy mountain resort just outside Tashkent',
        'Pakistani textile, pharmaceutical, and agricultural exporters attending Tashkent trade fairs',
      ],
      eligibilityNote:
        'Uzbekistan visa requirements for Pakistani nationals (including whether a Ministry of Foreign Affairs Letter of Invitation / visa-support telex is required prior to embassy stamping or e-Visa eligibility) are regulated strictly by bilateral updates. We verify the live channel before collecting fees.',
    },
    checklist: [
      {
        groupTitle: 'Core Visa & Visa-Support Packet',
        items: [
          {
            id: 'uzb-passport',
            label: 'Original Pakistani Passport & High-Res Scan',
            detail:
              'Machine-readable passport with required validity beyond return date and clean blank pages.',
            mandatory: true,
          },
          {
            id: 'uzb-loi',
            label: 'Licensed Tour Operator Visa Support / LOI (Where Mandated)',
            detail:
              'Official MFA-cleared invitation reference issued via an authorised Uzbek host or licensed tour operator when required for your nationality.',
            mandatory: true,
          },
          {
            id: 'uzb-photo',
            label: 'Recent Biometric Photographs',
            detail:
              'Crisp white-background portrait matching Uzbek embassy specifications.',
            mandatory: true,
          },
          {
            id: 'uzb-cnic',
            label: 'CNIC & Occupation / Business Proof',
            detail:
              'Employer letter on company letterhead or NTN business registration demonstrating home ties in Pakistan.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Travel & Hotel Registration Records',
        items: [
          {
            id: 'uzb-flights',
            label: 'Return Flight Itinerary (Lahore / Islamabad → Tashkent)',
            detail:
              'Consistent arrival and exit dates aligned with your visa-support validity window.',
            mandatory: true,
          },
          {
            id: 'uzb-hotels',
            label: 'Licensed Hotel Bookings Across Uzbekistan',
            detail:
              'Every hotel in Uzbekistan issues a mandatory electronic registration slip (E-Mehmon) that you keep until departure.',
            mandatory: true,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Channel & LOI Eligibility Check',
        youDo:
          'Tell us your planned Silk Road cities, departure city in Pakistan, and whether you are travelling solo or with family.',
        weDo:
          'Confirm whether your current category routes via MFA visa-support LOI + Embassy of Uzbekistan Islamabad or digital channel, plus exact fees.',
      },
      {
        stepNumber: '02',
        title: 'Visa-Support Coordination & Document Check',
        youDo:
          'Share your passport scan, portrait, CNIC, and occupation letter.',
        weDo:
          'Coordinate verified visa-support documentation where needed and audit every form field for spelling and date alignment.',
      },
      {
        stepNumber: '03',
        title: 'Embassy / Portal Filing',
        youDo:
          'Approve the compiled visa file and prepare passport submission if embassy stamping applies.',
        weDo:
          'Prepare the Embassy of Uzbekistan application form and cover sheet, guiding submission cleanly through issuance.',
      },
      {
        stepNumber: '04',
        title: 'Afrosiyob Train & E-Mehmon Briefing',
        youDo:
          'Confirm your hotel stays across Tashkent, Samarkand, and Bukhara.',
        weDo:
          'Send a Silk Road travel note covering Afrosiyob high-speed rail booking windows and mandatory E-Mehmon hotel registration slips.',
      },
    ],
    refusalReasons: [
      {
        title: 'Submitting Without Verified Visa Support / Telex',
        cause:
          'When Pakistani passport categories require prior MFA visa-support clearance, applying directly without a valid telex number leads to immediate rejection.',
        prevention:
          'We verify active LOI requirements first and ensure any host or tour operator letter carries proper MFA authorisation.',
      },
      {
        title: 'Date Mismatch Between LOI and Requested Visa Dates',
        cause:
          'Flight dates shifted by even a single day outside the invitation window invalidate the embassy stamping alignment.',
        prevention:
          'We lock your itinerary window cleanly across LOI, application form, and hotel reservations.',
      },
      {
        title: 'Ignoring Mandatory Hotel Registration (E-Mehmon)',
        cause:
          'Staying in unregistered private apartments without E-Mehmon registration creates serious departure-border fines at Tashkent airport.',
        prevention:
          'Our pre-departure sheet reminds you to collect and verify your hotel registration receipt at every check-out.',
      },
      {
        title: 'Unchecked Prescription Medication Rules',
        cause:
          'Uzbekistan enforces strict customs controls on certain common painkillers and sedatives containing restricted compounds.',
        prevention:
          'We advise carrying original doctor prescriptions and declaring any regulated medicines transparently at customs.',
      },
    ],
    localNotes: {
      overview: [
        'Uzbekistan feels both wondrously foreign and deeply familiar to Pakistani travellers. Barely two hours north across the Hindu Kush by direct flight from Lahore or Islamabad to Tashkent, you step onto turquoise-tiled plazas built by the Timurid ancestors of South Asia’s Mughal architecture. Shared vocabulary, warm hospitality, fragrant plov and samsa cooked in clay tandoors, and effortless halal food everywhere make Uzbekistan one of the most rewarding cultural journeys from Pakistan.',
        'Travelling between cities is remarkably modern: the Spanish-built Afrosiyob bullet train glides from Tashkent to Samarkand in just over two hours and onward to Bukhara in under two more, letting families experience centuries of Silk Road craftsmanship without exhausting highway drives.',
      ],
      bestSeasonTitle: 'Crisp spring blossoms, golden autumn, and winter snow',
      bestSeasonBody:
        'April through May and September through October are Uzbekistan’s finest months—warm sun, cool nights, ripe melons and pomegranates in the bazaars, and comfortable sightseeing weather in Samarkand and Bukhara. July and August turn intensely hot across the Kyzylkum desert plains (frequently above 40°C). December through February brings crisp cold and snow-dusted domes, drawing skiers and families to modern alpine gondolas at Amirsoy resort near Tashkent.',
      citiesTitle: 'Tashkent, Samarkand, Bukhara, and Khiva pacing',
      citiesBody:
        'Spend two nights in Tashkent to ride its chandelier-lit Soviet-era metro stations, browse Chorsu Bazaar beneath its blue dome, and visit Hazrati Imam complex. Ride the morning Afrosiyob rail to Samarkand for two nights—covering Registan Square at dusk, Shah-i-Zinda’s tiled necropolis, Gur-e-Amir, and the Imam al-Bukhari shrine outside town. Continue to Bukhara for two slower nights wandering car-free alleys around Lyabi-Hauz and Poi Kalyan; travellers with nine or more days can add an overnight rail or short flight out to Khiva’s walled desert citadel.',
      entryTipsTitle: 'High-speed rail tickets, customs, and registration slips',
      entryTipsBody:
        'Afrosiyob bullet train tickets open roughly 45 days in advance and sell out swiftly during spring and autumn—reserve seats as soon as your visa is confirmed. Keep every hotel’s electronic registration slip (E-Mehmon) saved on your phone and printed until you clear exit passport control at Tashkent Airport. Bring crisp USD notes to exchange into Uzbek Som at official bank counters or withdraw via Visa/Mastercard ATMs in central Tashkent and Samarkand.',
    },
    packages: [
      {
        id: 'uzb-tourist',
        tabLabel: 'Tourist File',
        title: 'Uzbekistan Tourist Visa Guidance',
        bestFor: 'Solo visitors, couples, and Ziyarat travellers planning Tashkent, Samarkand, and Bukhara.',
        serviceFee: '',
        turnaroundNote: 'Channel verification plus complete visa file assembly.',
        includes: [
          'Live confirmation of LOI / embassy vs digital pathway for Pakistani passports',
          'Official visa form drafting and document verification',
          'Licensed tour-operator visa-support coordination guidance where required',
          'Silk Road Afrosiyob rail & E-Mehmon pre-departure checklist',
        ],
        excludesNote: 'Embassy fees and third-party LOI issuance fees are confirmed separately with our team.',
      },
      {
        id: 'uzb-group',
        tabLabel: 'Family / Ziyarat Group',
        title: 'Group & Family Silk Road Filing',
        bestFor: 'Families of 4+ travelling together for heritage tours or winter snow holidays.',
        serviceFee: '',
        turnaroundNote: 'Synchronised group submission for aligned issuance.',
        includes: [
          'Linked family itinerary and hotel registration alignment',
          'Individual embassy forms and MRZ audit across all passports',
          'Senior-friendly pacing tips for Samarkand and Bukhara sites',
          'Dedicated WhatsApp consultant from intake to boarding',
        ],
        excludesNote: 'Official embassy charges apply per applicant.',
      },
    ],
    faqs: [
      {
        question: 'Is Uzbekistan e-Visa available for Pakistani passport holders?',
        answer:
          'Uzbekistan’s visa channel for Pakistani ordinary passports depends on live MFA regulations—some categories require prior visa support (LOI) and embassy stamping in Islamabad while others may qualify digitally. Confirm active rules with our desk before starting.',
      },
      {
        question: 'Are there direct flights from Pakistan to Tashkent?',
        answer:
          'Uzbekistan Airways and regional carriers operate seasonal or scheduled direct flights between Lahore/Islamabad and Tashkent alongside easy Gulf connections. Flight frequency shifts by season, so align your visa window before paying for tickets.',
      },
      {
        question: 'What is E-Mehmon hotel registration in Uzbekistan?',
        answer:
          'Uzbekistan requires foreign visitors to be electronically registered by their hotel within three working days of arrival. Licensed hotels handle this automatically at check-in and give you a registration slip—keep it until you depart.',
      },
      {
        question: 'Is halal food easily available across Uzbekistan?',
        answer:
          'Yes. Uzbekistan is a Muslim-majority country where traditional Uzbek cuisine—plov, shashlik, lagman, manti, and fresh non flatbread—is widely halal across Tashkent, Samarkand, Bukhara, and Khiva.',
      },
      {
        question: 'Can I visit Kazakhstan or Kyrgyzstan on the same Uzbekistan visa?',
        answer:
          'No. Each Central Asian republic issues its own separate visa. If you plan to cross overland to Shymkent or Bishkek and return to Tashkent for your flight home, request a double-entry Uzbekistan visa upfront.',
      },
      {
        question: 'How early should I apply for an Uzbekistan visa from Pakistan?',
        answer:
          'Start four to six weeks ahead of your departure month, especially if MFA visa-support telex clearance is required prior to Islamabad embassy submission.',
      },
    ],
    relatedSlugs: ['bahrain', 'nepal', 'sri-lanka', 'thailand'],
  },
  {
    slug: 'bahrain',
    country: 'Bahrain',
    isoCode: 'BHR',
    region: 'Central Asia & Gulf',
    channel: 'e-Visa',
    accentHex: '#6E242E',
    stampLabel: 'MANAMA · BHR',
    stampRotation: 3,
    heroPromise:
      'Accurate Bahrain e-Visa filing, GCC residency check, and bank-statement preparation for Pakistani visitors travelling to Manama for leisure, family, or business.',
    seoTitle: 'Bahrain Visa from Pakistan — e-Visa Guide | Visahouse',
    seoDescription:
      'Apply for a Bahrain tourist or business e-Visa from Pakistan with NPRA eligibility checks, bank-statement audit, and Manama entry tips.',
    facts: {
      visaType: 'Bahrain Visit e-Visa (NPRA Portal)',
      entryType: 'Single or Multiple Entry (subject to NPRA category)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<BHRVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'BHR0000000PAK0000000M0000000<<<<<<<<<<<<<<02',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders visiting Bahrain for Manama city breaks, visiting family residing in the Kingdom, attending Formula 1 or Gulf financial conferences, or transiting through Muharraq can apply electronically through Bahrain’s NPRA e-Visa system (or via a Bahraini sponsor where applicable).',
      profiles: [
        'Tourists and weekend travellers flying directly from Karachi, Lahore, Islamabad, Sialkot, or Peshawar via Gulf Air',
        'Pakistani professionals holding valid GCC residency or valid US/UK/Schengen visas (often qualifying for streamlined e-Visa tiers)',
        'Relatives visiting family members working in Bahrain with CPR sponsorship copies',
        'Business delegates meeting banking, logistics, or industrial partners in Manama and Seef District',
      ],
      eligibilityNote:
        'Bahrain’s Nationality, Passports & Residence Affairs (NPRA) adjusts eligible e-Visa tiers depending on whether you hold valid GCC residency, certain Western visas, or apply directly from Pakistan with bank-statement proof.',
    },
    checklist: [
      {
        groupTitle: 'NPRA Digital Application Documents',
        items: [
          {
            id: 'bhr-passport',
            label: 'Valid Pakistani Passport Bio-Page Scan',
            detail:
              'Clear colour scan with required validity beyond planned exit from Bahrain International Airport (BAH).',
            mandatory: true,
          },
          {
            id: 'bhr-bank',
            label: 'Recent Stamped Bank Statement (3 Months)',
            detail:
              'Official statement in applicant’s name meeting NPRA minimum liquid balance threshold for direct Pakistan applications.',
            mandatory: true,
          },
          {
            id: 'bhr-flight',
            label: 'Confirmed Return Flight Booking',
            detail:
              'Round-trip itinerary into Manama (BAH) matching your declared visit window.',
            mandatory: true,
          },
          {
            id: 'bhr-hotel',
            label: 'Hotel Booking or Bahrain Host CPR Copy',
            detail:
              'Confirmed hotel reservation in Manama/Seef/Juffair, or front-and-back copy of your host’s Bahraini CPR ID card if staying with family.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Supporting Eligibility Boosters',
        items: [
          {
            id: 'bhr-priorvisas',
            label: 'Copies of Valid US, UK, Schengen, or GCC Residence Visas (If Held)',
            detail:
              'Strengthens NPRA assessment and may unlock broader multi-entry e-Visa tiers.',
          },
          {
            id: 'bhr-work',
            label: 'Employer Letter or Business Proof',
            detail:
              'Helpful if NPRA requests supplementary verification of occupation during review.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'NPRA Eligibility & Tier Check',
        youDo:
          'Share your passport details, whether you hold any valid GCC/UK/US/Schengen visa, and whether you are staying at a hotel or with a CPR-holding relative.',
        weDo:
          'Verify your exact eligible NPRA e-Visa category, current government fees, and document requirements.',
      },
      {
        stepNumber: '02',
        title: 'Statement & Scan Verification',
        youDo:
          'Send your passport bio scan, bank statement, hotel/CPR copy, and flight reservation.',
        weDo:
          'Inspect statement balance readability, file-size tolerances for NPRA uploads, and ensure zero spelling conflicts.',
      },
      {
        stepNumber: '03',
        title: 'e-Visa Submission & Query Handling',
        youDo:
          'Review your compiled form summary before submission.',
        weDo:
          'File through the official NPRA workflow, monitor status closely, and respond promptly if immigration requests an extra document.',
      },
      {
        stepNumber: '04',
        title: 'Approval Delivery & Manama Arrival Notes',
        youDo:
          'Print your electronic visa notice ahead of departure.',
        weDo:
          'Cross-check passport digits on the issued Bahrain e-Visa and share Bahrain Airport (BAH) entry notes.',
      },
    ],
    refusalReasons: [
      {
        title: 'Submitting Incomplete or Cropped Bank Statements',
        cause:
          'NPRA reviewers reject PDFs that omit the bank’s header, applicant name, or recent transaction months.',
        prevention:
          'We inspect all three months of official bank statements and verify closing-balance clarity before upload.',
      },
      {
        title: 'Expired or Unclear Host CPR Copies',
        cause:
          'When visiting relatives in Bahrain, uploading a faded phone photo or an expired CPR card stalls approval.',
        prevention:
          'We verify both front and back of the host’s valid CPR card (and address record) at intake.',
      },
      {
        title: 'Applying Under a GCC-Resident Tier With Low Residency Validity',
        cause:
          'GCC expatriate e-Visa rules require minimum remaining validity on the Gulf residence permit.',
        prevention:
          'We verify residency expiry margins before selecting your NPRA category.',
      },
      {
        title: 'Prior Overstays or Unresolved GCC Immigration Flags',
        cause:
          'Unresolved travel bans or prior overstays in Bahrain trigger automatic NPRA rejection.',
        prevention:
          'We review prior Bahrain travel history candidly during initial triage so you do not waste non-refundable application fees.',
      },
    ],
    localNotes: {
      overview: [
        'Bahrain is one of the most approachable Gulf destinations from Pakistan—barely two and a half hours from Karachi on direct Gulf Air flights and well connected from Lahore, Islamabad, Peshawar, and Sialkot. Unlike megacities built solely around skyscrapers, Bahrain blends deep island heritage with compact convenience: you can explore the ancient UNESCO mounds and Portuguese-era walls of Qal’at al-Bahrain in the morning, walk Muharraq’s restored Pearling Path houses at noon, and dine beside Bahrain Bay by evening.',
        'Its compact scale makes Bahrain equally popular for three-day business trips, family reunions with the large Pakistani diaspora in Manama, and winter long weekends during Formula 1 testing or Bahrain National Day celebrations.',
      ],
      bestSeasonTitle: 'Pleasant island winter vs indoor summer comfort',
      bestSeasonBody:
        'November through March delivers Bahrain’s sweetest weather—daytime highs between 19°C and 26°C with gentle Gulf sea breezes ideal for walking Muharraq’s heritage alleys, touring Bahrain Fort, or watching motorsport at Sakhir. April and October stay warm but manageable by late afternoon. Between May and September, Gulf summer heat and coastal humidity peak sharply, shifting daily life into air-conditioned museums, souqs after sunset, and waterfront malls.',
      citiesTitle: 'Manama, Muharraq, and Seef District highlights',
      citiesBody:
        'Stay in Seef District, Diplomatic Area, or Bahrain Bay for sleek modern hotels with swift access to Bahrain National Museum and City Centre mall, or choose Juffair and Adliya for lively late-evening dining terraces. Do not miss old Muharraq—connected by a short causeway next to the airport—where traditional wind-tower coral-stone residences and historic halwa sweet shops preserve pre-oil Gulf craft. Bab Al Bahrain Souq remains an atmospheric evening stop for spices, pearls, and textiles.',
      entryTipsTitle: 'Bahrain International Airport (BAH) and King Fahd Causeway notes',
      entryTipsBody:
        'Carry printed copies of your Bahrain e-Visa, return flight booking, and hotel voucher or family CPR copy when landing at Bahrain’s modernised Muharraq terminal. Note that crossing the King Fahd Causeway into Saudi Arabia requires a separate valid Saudi visa and, if returning to Bahrain, a multiple-entry Bahrain visa—never drive onto the causeway on a single-entry pass without verifying both sides.',
    },
    packages: [
      {
        id: 'bhr-standard',
        tabLabel: 'Visit e-Visa',
        title: 'Bahrain NPRA Visit e-Visa Filing',
        bestFor: 'Pakistani tourists, family visitors, and short business travellers.',
        serviceFee: '',
        turnaroundNote: 'Complete NPRA portal audit and tracking.',
        includes: [
          'NPRA eligibility and tier assessment',
          'Bank statement and CPR/hotel document review',
          'Full e-Visa form preparation and submission tracking',
          'Bahrain International Airport arrival briefing',
        ],
        excludesNote: 'Official Bahrain NPRA application and issuance fees are paid separately; confirm current figures with our team.',
      },
      {
        id: 'bhr-family',
        tabLabel: 'Family Visit',
        title: 'Family Reunion & Multi-Applicant Desk',
        bestFor: 'Parents and families visiting relatives living in Bahrain.',
        serviceFee: '',
        turnaroundNote: 'Coordinated family file assembly with CPR alignment.',
        includes: [
          'Host CPR and relationship document alignment',
          'Linked e-Visa applications for all family members',
          'Handling of any NPRA requests for supplementary papers',
          'Optional Gulf travel medical insurance add-on',
        ],
        excludesNote: 'Official NPRA charges apply per applicant.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders apply for a Bahrain e-Visa from Pakistan?',
        answer:
          'Yes, Pakistani nationals can apply electronically under Bahrain’s NPRA e-Visa system subject to meeting current financial, passport, and category eligibility rules. Confirm the active tier with our team before applying.',
      },
      {
        question: 'Do I need a sponsor in Bahrain to get a tourist e-Visa?',
        answer:
          'Not always—direct tourist e-Visa applications with confirmed hotel bookings and qualifying bank statements are available under NPRA criteria, while family visitors can alternatively include a Bahraini resident’s CPR details. We confirm which route fits your profile strongest.',
      },
      {
        question: 'Are Bahrain e-Visa government fees refundable if refused?',
        answer:
          'NPRA generally charges a non-refundable application processing fee, while separate visa issuance charges depend on the portal stage. Confirm the exact fee split with our team before submitting.',
      },
      {
        question: 'Can I cross from Bahrain to Saudi Arabia on a Bahrain visit visa?',
        answer:
          'No. Saudi Arabia requires its own separate valid visa, and returning to Bahrain across the King Fahd Causeway requires a multiple-entry Bahrain visa.',
      },
      {
        question: 'Does holding a valid US, UK, or Schengen visa help with a Bahrain e-Visa?',
        answer:
          'Holding a valid, unexpired US, UK, Schengen, or GCC residence visa often strengthens NPRA assessment and can qualify applicants for broader e-Visa categories. Share copies with our team during assessment.',
      },
      {
        question: 'How early should I apply for a Bahrain e-Visa before my flight?',
        answer:
          'Apply at least two to three weeks prior to travel so there is comfortable margin if NPRA requests supplementary employment or financial clarification.',
      },
    ],
    relatedSlugs: ['uzbekistan', 'sri-lanka', 'malaysia', 'thailand'],
  },
  {
    slug: 'turkey',
    country: 'Turkey',
    isoCode: 'TUR',
    accentHex: '#B8332A',
    stampLabel: 'ISTANBUL · TUR',
    stampRotation: -3,
    seoTitle: 'Turkey Visa from Pakistan — Checklist & Guide | Visahouse',
    seoDescription:
      'Apply for a Turkey tourist or business visa from Pakistan with Anatolia VAC sticker filing, e-Visa eligibility check, and bank review.',
    heroPromise:
      'Turkey sticker visa and conditional e-Visa guidance for Pakistani passport holders—Anatolia VAC appointment prep, bank statement audit, and Istanbul & Cappadocia itineraries.',
    region: 'Central Asia & Gulf',
    channel: 'Hybrid / Centre',
    facts: {
      visaType: 'Sticker Visa (Anatolia VAC) / Conditional e-Visa',
      entryType: 'Single or Multiple Entry (embassy discretion)',
      stayDuration: 'Up to 30 days typical',
      validity: '90–180 days typical',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<TURVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'TUR0000000PAK0000000M0000000<<<<<<<<<<<<<<41',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders travelling to Istanbul, Cappadocia, Antalya, or Ankara apply either through the authorised Anatolia Visa Application Centre (sticker visa) or—if holding a valid, unexpired US, UK, Schengen, or Ireland visa/residence permit—via Turkey’s official e-Visa portal.',
      profiles: [
        'Salaried employees with a 6-month stamped bank statement, Account Maintenance Certificate (AMC), Employer NOC, and recent salary slips.',
        'Business owners and directors with NTN, FBR tax returns, company letterhead, and company + personal bank statements.',
        'Families, honeymooners, and retirees submitting linked NADRA FRC/MRC records and clear financial sponsorship.',
        'Eligible US, UK, Schengen, or Ireland visa holders who qualify for Turkey’s faster online e-Visa route.',
      ],
      eligibilityNote:
        'Standard Pakistani passport holders without a valid US, UK, Schengen, or Ireland visa must submit biometrics and physical documents at an authorised Anatolia VAC in Islamabad, Lahore, or Karachi.',
    },
    checklist: [
      {
        groupTitle: 'Core Identity & Travel Papers',
        items: [
          {
            id: 'tur-passport',
            label: 'Original Pakistani Passport & Prior Passports',
            detail: 'Valid at least 6 months with 2 blank visa pages plus copies of previous visas.',
            mandatory: true,
          },
          {
            id: 'tur-cnic',
            label: 'CNIC & NADRA Family Records (FRC / MRC)',
            detail: 'Clear front/back CNIC copy plus NADRA FRC and Marriage Certificate for families.',
            mandatory: true,
          },
          {
            id: 'tur-photos',
            label: 'Biometric Photographs (50×60 mm)',
            detail: 'Two recent white-background prints matching Anatolia VAC dimensions.',
            mandatory: true,
          },
          {
            id: 'tur-insurance',
            label: 'Travel Medical Insurance for Turkey',
            detail: 'Valid emergency medical policy covering your full travel dates in Turkey.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial & Employment Proof',
        items: [
          {
            id: 'tur-bank',
            label: '6-Month Stamped Bank Statement & AMC',
            detail: 'Recent personal statement stamped by the bank with signed Account Maintenance Certificate.',
            mandatory: true,
          },
          {
            id: 'tur-fbr',
            label: 'FBR NTN & Latest Income Tax Return',
            detail: 'Strengthens financial credibility for salaried and business applicants.',
            mandatory: false,
          },
          {
            id: 'tur-noc',
            label: 'Employer NOC & Salary Slips (or Business Proof)',
            detail: 'Company letterhead NOC + 3 salary slips, or business registration and company statement.',
            mandatory: true,
          },
          {
            id: 'tur-bookings',
            label: 'Return Flight Reservation & Hotel Bookings',
            detail: 'Verifiable reservations aligned with your Istanbul / Cappadocia daily itinerary.',
            mandatory: true,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Route Check (Sticker vs. Conditional e-Visa)',
        youDo: 'Share your passport bio page, existing valid US/UK/Schengen visas (if any), and travel month on WhatsApp.',
        weDo: 'We confirm immediately whether you qualify for Turkey’s online e-Visa or require an Anatolia VAC sticker visa appointment.',
      },
      {
        stepNumber: '02',
        title: 'Bank Statement & Document Check',
        youDo: 'Send scans of your 6-month bank statement, AMC, NOC/business papers, and family NADRA records.',
        weDo: 'We audit cash flow, closing balance, and date alignment before booking your Anatolia submission slot.',
      },
      {
        stepNumber: '03',
        title: 'Form Drafting, Cover Letter & Insurance',
        youDo: 'Review your completed Turkey visa form, day-by-day Istanbul/Cappadocia plan, and travel insurance certificate.',
        weDo: 'We compile a clean, indexed paper file ready for your Anatolia VAC counter submission in Islamabad, Lahore, or Karachi.',
      },
      {
        stepNumber: '04',
        title: 'Biometrics Submission & Passport Return',
        youDo: 'Attend your Anatolia VAC appointment to submit biometrics and your physical file.',
        weDo: 'We guide tracking until passport collection and send practical arrival tips for Istanbul Airport (IST/SAW).',
      },
    ],
    refusalReasons: [
      {
        title: 'Applying for e-Visa Without a Qualifying Visa',
        cause: 'Many Pakistani applicants mistakenly pay third-party sites for a Turkey e-Visa without holding a valid US, UK, Schengen, or Ireland visa—leading to boarding denial.',
        prevention: 'We verify your exact eligibility before you spend a single rupee on portal fees or flight reservations.',
      },
      {
        title: 'Sudden Large Cash Deposits Before Filing',
        cause: 'Depositing a large lump sum into a quiet bank account right before applying raises red flags during Turkish embassy financial review.',
        prevention: 'We inspect your 6-month transaction trend first and advise on clean supporting evidence (FBR returns, salary credits, or business invoices).',
      },
      {
        title: 'Wrong Photo Size for Anatolia VAC',
        cause: 'Standard 35×45 mm passport photos are frequently rejected at Anatolia counters, which specifically require 50×60 mm biometric prints.',
        prevention: 'We send exact studio photo specs so your appointment runs smoothly on the first visit.',
      },
    ],
    localNotes: {
      overview: [
        'Turkey is one of the top international holiday destinations for Pakistani families, honeymooners, and business travellers—linking Istanbul’s Hagia Sophia, Blue Mosque, and Bosphorus cruises with Cappadocia’s hot-air balloons, Antalya’s Mediterranean coast, and Bursa’s mountain cable cars.',
        'Direct flights from Islamabad, Lahore, and Karachi (Turkish Airlines, PIA, and Pegasus) plus widely available halal food and warm cultural hospitality make Turkey effortless to navigate once your visa file is prepared cleanly.',
      ],
      bestSeasonTitle: 'Best Time to Visit Turkey',
      bestSeasonBody:
        'April to June and September to November bring crisp skies for Istanbul sightseeing and Cappadocia sunrise balloons; December to February offers snow in Bursa Uludağ and Cappadocia.',
      citiesTitle: 'Top Cities & Route Tips',
      citiesBody:
        'A classic 8–10 day Pakistani family itinerary pairs 4 nights in Istanbul with 2–3 nights in Cappadocia (fly IST/SAW to Kayseri or Nevşehir) and optionally 2 nights in Antalya or Bursa.',
      entryTipsTitle: 'Airport & Entry Tips',
      entryTipsBody:
        'Carry printed copies of your hotel confirmations, return flight ticket, travel insurance, and visa/e-Visa approval when clearing passport control at Istanbul Airport (IST) or Sabiha Gökçen (SAW).',
    },
    packages: [
      {
        id: 'tur-tourist',
        tabLabel: 'Tourist Visa File',
        title: 'Turkey Tourist Visa File Prep',
        bestFor: 'Solo travellers, couples, and families planning an Istanbul, Cappadocia, or Antalya holiday.',
        serviceFee: 'Confirm with our team',
        turnaroundNote: 'Anatolia VAC checklist + form + cover letter + insurance guidance',
        includes: [
          'Eligibility check (Anatolia sticker vs. conditional e-Visa)',
          '6-month bank statement & AMC review',
          'Visa form drafting, cover letter & day-by-day Turkey itinerary',
          'Anatolia VAC appointment guidance (Islamabad, Lahore, Karachi)',
        ],
        excludesNote: 'Excludes official Turkish embassy visa fee and Anatolia VAC service charges.',
      },
      {
        id: 'tur-business',
        tabLabel: 'Business / Trade',
        title: 'Turkey Business & Exhibition File',
        bestFor: 'Pakistani exporters, textile buyers, and corporate delegates visiting Istanbul or Ankara.',
        serviceFee: 'Confirm with our team',
        turnaroundNote: 'Commercial invitation check + corporate file assembly',
        includes: [
          'Everything in Tourist Visa File preparation',
          'Turkish host company invitation & chamber letter review',
          'Company NTN, tax return & corporate bank statement alignment',
        ],
        excludesNote: 'Excludes official Turkish embassy fees and Anatolia VAC charges.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders get a Turkey e-Visa?',
        answer:
          'Only if you hold a valid, unexpired visa or residence permit from the USA, UK, Schengen Area, or Ireland (and meet official portal criteria). All other Pakistani passport holders apply for a sticker visa via Anatolia VAC.',
      },
      {
        question: 'How long does a Turkey sticker visa take from Pakistan?',
        answer:
          'Standard sticker visa processing via Anatolia VAC typically takes 10 to 15 working days after biometrics, though peak summer and Eid seasons can take longer. Apply 4 to 6 weeks ahead.',
      },
      {
        question: 'What photo size is required for a Turkey visa in Pakistan?',
        answer:
          'Anatolia Visa Application Centres in Pakistan require two recent 50×60 mm biometric photographs on a plain white background—larger than standard Schengen 35×45 mm photos.',
      },
      {
        question: 'How much bank balance is advisable for a Turkey tourist visa?',
        answer:
          'A steady 6-month bank statement showing regular income and enough closing balance to cover flights, hotels, and daily expenses comfortably (commonly PKR 600,000+ per adult traveller) is advisable.',
      },
      {
        question: 'Is travel insurance mandatory for a Turkey visa from Pakistan?',
        answer:
          'Yes—valid travel medical insurance covering your entire planned stay in Turkey is mandatory for Anatolia sticker visa submissions.',
      },
      {
        question: 'Can families apply together for a Turkey visa?',
        answer:
          'Yes—spouses and children can submit linked files with a NADRA Family Registration Certificate (FRC), Marriage Registration Certificate (MRC), and the main sponsor’s bank statement and NOC.',
      },
    ],
    relatedSlugs: ['azerbaijan', 'uzbekistan', 'greece', 'italy'],
  },
  {
    slug: 'azerbaijan',
    country: 'Azerbaijan',
    isoCode: 'AZE',
    accentHex: '#1F5C78',
    stampLabel: 'BAKU · AZE',
    stampRotation: 3,
    seoTitle: 'Azerbaijan e-Visa from Pakistan — Fast Guide | Visahouse',
    seoDescription:
      'Apply for an Azerbaijan ASAN e-Visa from Pakistan in 3 working days. Check passport rules, fees in PKR, and Baku & Gabala travel tips.',
    heroPromise:
      'Fast online Azerbaijan ASAN e-Visa filing for Pakistani passport holders—clean passport scan verification, 3-working-day standard or urgent processing, and Baku & Gabala travel prep.',
    region: 'Central Asia & Gulf',
    channel: 'e-Visa',
    facts: {
      visaType: 'ASAN Electronic Visa (e-Visa)',
      entryType: 'Single Entry',
      stayDuration: 'Up to 30 days',
      validity: '90 days from issue',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<AZEVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'AZE0000000PAK0000000M0000000<<<<<<<<<<<<<<42',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders are fully eligible for Azerbaijan’s official ASAN e-Visa portal—making Baku, Gabala, and Shahdag one of the fastest, most budget-friendly international getaways from Pakistan with no embassy visit or biometrics required.',
      profiles: [
        'Tourists, families, and honeymooners seeking a fast 3-working-day online visa with direct flights from Islamabad, Lahore, and Karachi.',
        'First-time international travellers building clean travel history before applying for Schengen, UK, or US visas.',
        'Business visitors attending Baku conferences, trade exhibitions, or regional corporate meetings.',
        'Urgent travellers needing the official 3-to-5-hour expedited ASAN e-Visa option.',
      ],
      eligibilityNote:
        'Your Pakistani passport must have at least 6 months validity (minimum 3 months beyond your e-Visa expiry date). Remember: stays over 15 days require free online migration registration.',
    },
    checklist: [
      {
        groupTitle: 'Core Online e-Visa Requirements',
        items: [
          {
            id: 'aze-passport',
            label: 'Pakistani Passport Bio Page Scan',
            detail: 'High-resolution colour scan of passport valid 6+ months with readable MRZ lines.',
            mandatory: true,
          },
          {
            id: 'aze-cnic',
            label: 'CNIC Copy & Pakistan Home Address',
            detail: 'Clear CNIC copy and residential details for the ASAN portal application.',
            mandatory: true,
          },
          {
            id: 'aze-email',
            label: 'Active Email & WhatsApp Number',
            detail: 'Used for official ASAN e-Visa PDF delivery and arrival instructions.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Arrival & Border Supporting Papers',
        items: [
          {
            id: 'aze-hotel',
            label: 'Confirmed Baku / Gabala Hotel Booking',
            detail: 'Printed accommodation voucher matching your arrival and departure dates.',
            mandatory: true,
          },
          {
            id: 'aze-flight',
            label: 'Confirmed Return Flight Ticket',
            detail: 'Return itinerary (AZAL, PIA, or connecting carrier) checked at boarding.',
            mandatory: true,
          },
          {
            id: 'aze-cash',
            label: 'Travel Insurance & Travel Funds',
            detail: 'Recommended medical cover plus cards/cash for Heydar Aliyev Airport arrival.',
            mandatory: false,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Passport Scan & Travel Date Check',
        youDo: 'Send a flat, glare-free scan of your Pakistani passport bio page and planned Baku arrival date on WhatsApp.',
        weDo: 'We verify passport validity, exact MRZ spelling, and whether Standard (3 working days) or Urgent processing fits your flight.',
      },
      {
        stepNumber: '02',
        title: 'Official ASAN e-Visa Submission',
        youDo: 'Confirm your personal details and planned accommodation address in Baku.',
        weDo: 'We lodge your application cleanly on Azerbaijan’s official ASAN e-Visa portal with zero data-entry typos.',
      },
      {
        stepNumber: '03',
        title: 'PDF e-Visa Delivery & Print Check',
        youDo: 'Receive your approved Azerbaijan e-Visa PDF via WhatsApp and email.',
        weDo: 'We double-check passport number, dates, and entry window on the issued PDF before you print it.',
      },
      {
        stepNumber: '04',
        title: 'Baku Arrival & 15-Day Registration Reminder',
        youDo: 'Carry your printed e-Visa, hotel voucher, and return flight ticket to the airport.',
        weDo: 'We brief you on Heydar Aliyev Airport arrival and Azerbaijan’s mandatory migration registration if staying over 15 days.',
      },
    ],
    refusalReasons: [
      {
        title: 'Passport Number or Name Typo on ASAN Portal',
        cause: 'Even a single wrong digit in your passport number or transposed surname invalidates an Azerbaijan e-Visa at airline check-in.',
        prevention: 'We cross-check every character against your passport’s bottom MRZ line before submitting.',
      },
      {
        title: 'Forgetting Migration Registration on 15+ Day Stays',
        cause: 'Travellers staying longer than 15 days who fail to register their address (usually handled by your hotel) face airport exit fines.',
        prevention: 'We remind you in your arrival brief to confirm hotel migration registration on check-in.',
      },
      {
        title: 'Overpaying Unofficial Lookalike Websites',
        cause: 'Many unofficial sites charge 3× to 4× the official ASAN e-Visa fee while offering zero support if a scan is rejected.',
        prevention: 'We quote transparent official portal fees plus our clear service fee in PKR upfront.',
      },
    ],
    localNotes: {
      overview: [
        'Azerbaijan has surged into one of Pakistan’s favourite short-haul destinations—combining Baku’s UNESCO-listed Old City (Icherisheher), Flame Towers, and Caspian Boulevard with Gabala’s lush mountain lakes and Shahdag’s winter ski slopes.',
        'With direct flights from Islamabad, Lahore, and Karachi (Azerbaijan Airlines and PIA), affordable halal cuisine, and a 3-working-day e-Visa, Baku is ideal for both family holidays and first-time travellers building passport history.',
      ],
      bestSeasonTitle: 'Best Time to Visit Azerbaijan',
      bestSeasonBody:
        'April to June and September to October offer mild breezes in Baku and green valleys in Gabala; December to February is peak snow season at Shahdag Mountain Resort.',
      citiesTitle: 'Top Cities & Route Tips',
      citiesBody:
        'A popular 6–7 day trip covers 4 nights in Baku (Old City, Heydar Aliyev Center, Gobustan mud volcanoes) and 2 nights in Gabala (Tufandag cable car, Nohur Lake) or Shahdag.',
      entryTipsTitle: 'Airport & Entry Tips',
      entryTipsBody:
        'Print your Azerbaijan e-Visa PDF on clean A4 paper before boarding—airlines in Pakistan check the printed copy along with your return flight and hotel booking.',
    },
    packages: [
      {
        id: 'aze-standard',
        tabLabel: 'Standard e-Visa',
        title: 'Azerbaijan Standard e-Visa (3 Working Days)',
        bestFor: 'Tourists, families, and first-time travellers planning a Baku & Gabala trip.',
        serviceFee: 'Confirm with our team',
        turnaroundNote: '3 working days via official ASAN portal',
        includes: [
          'Passport validity & MRZ spelling verification',
          'Official ASAN e-Visa portal filing',
          'Issued e-Visa PDF verification & print-ready delivery',
          'Baku arrival tips & hotel registration checklist',
        ],
        excludesNote: 'Excludes official Azerbaijan ASAN government e-Visa fee.',
      },
      {
        id: 'aze-urgent',
        tabLabel: 'Urgent e-Visa',
        title: 'Azerbaijan Urgent e-Visa (3–5 Hours)',
        bestFor: 'Last-minute business or leisure travellers flying within 48 hours.',
        serviceFee: 'Confirm with our team',
        turnaroundNote: '3–5 hours priority processing via official ASAN portal',
        includes: [
          'Priority same-day ASAN e-Visa portal submission',
          'Immediate passport scan & data-accuracy audit',
          'Instant WhatsApp & email PDF delivery upon approval',
        ],
        excludesNote: 'Excludes official Azerbaijan urgent government e-Visa fee.',
      },
    ],
    faqs: [
      {
        question: 'How long does an Azerbaijan e-Visa take from Pakistan?',
        answer:
          'A standard Azerbaijan ASAN e-Visa takes 3 working days, while the official urgent e-Visa option is typically issued within 3 to 5 hours.',
      },
      {
        question: 'Do Pakistani citizens need a bank statement for an Azerbaijan e-Visa?',
        answer:
          'No—the online ASAN e-Visa application only requires a clear Pakistani passport scan and basic travel details. No bank statement or embassy interview is required to apply.',
      },
      {
        question: 'Can I get an Azerbaijan visa on arrival as a Pakistani citizen?',
        answer:
          'No—standard Pakistani passport holders must obtain an approved ASAN e-Visa before boarding their flight to Baku (exceptions apply only to valid UAE residence visa holders under specific rules).',
      },
      {
        question: 'How long can I stay in Azerbaijan on a tourist e-Visa?',
        answer:
          'The standard Azerbaijan e-Visa allows a single entry stay of up to 30 days within a 90-day validity window.',
      },
      {
        question: 'Do I need to print my Azerbaijan e-Visa?',
        answer:
          'Yes—carry a clear printed copy of your approved e-Visa PDF along with your passport, hotel booking, and return flight ticket for airport check-in in Pakistan and immigration in Baku.',
      },
      {
        question: 'What is the 15-day registration rule in Azerbaijan?',
        answer:
          'Foreign visitors staying in Azerbaijan for more than 15 days must register their place of stay with the State Migration Service (hotels normally complete this free upon check-in).',
      },
    ],
    relatedSlugs: ['turkey', 'uzbekistan', 'bahrain', 'malaysia'],
  },
];
