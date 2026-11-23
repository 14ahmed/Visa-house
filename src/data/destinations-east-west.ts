import type { DestinationData } from './types';

export const EAST_WEST_DESTINATIONS: DestinationData[] = [
  {
    slug: 'japan',
    country: 'Japan',
    isoCode: 'JPN',
    region: 'East Asia',
    channel: 'Sticker / Embassy',
    accentHex: '#343A59',
    stampLabel: 'TOKYO · JPN',
    stampRotation: -4,
    heroPromise:
      'Meticulous embassy-order visa file assembly, day-by-day Schedule of Stay drafting, and financial auditing for Pakistani travellers applying to visit Japan.',
    seoTitle: 'Japan Visa from Pakistan — Checklist & Filing | Visahouse',
    seoDescription:
      'Prepare a Japan tourist or business visa from Pakistan with Schedule of Stay drafting, bank-statement checks, and embassy guidance.',
    facts: {
      visaType: 'Temporary Visitor Visa (Short-Term Tourism / Business / Family)',
      entryType: 'Single or Multiple Entry (embassy discretion)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<JPNVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'JPN0000000PAK0000000M0000000<<<<<<<<<<<<<<05',
    },
    whoCanApply: {
      intro:
        'Pakistani citizens travelling to Tokyo, Kyoto, Osaka, Hokkaido, or Hiroshima for cherry-blossom holidays, autumn foliage trips, family visits, or corporate meetings submit a complete paper visa file to the Embassy of Japan in Islamabad or the Consulate-General of Japan in Karachi (strictly by residential jurisdiction).',
      profiles: [
        'Salaried professionals and senior managers with established tax filings, strong bank continuity, and prior international travel',
        'Business owners and exporters visiting Japanese machinery, automotive, or textile partners (with official Japanese invitation pack)',
        'Families planning spring Sakura or autumn Momiji holidays across Tokyo, Kyoto, and Osaka',
        'Relatives invited by family members legally residing in Japan (with formal Juminhyo and guarantor paperwork)',
      ],
      eligibilityNote:
        'Japan enforces strict provincial embassy jurisdiction between Islamabad (Federal, Punjab, KP, AJK, GB) and Karachi (Sindh & Balochistan) and examines the daily Schedule of Stay (Taizai Yoteihyo) line by line.',
    },
    checklist: [
      {
        groupTitle: 'Embassy Forms & Identity',
        items: [
          {
            id: 'jpn-passport',
            label: 'Original Pakistani Passport & Previous Passports',
            detail:
              'Current machine-readable passport plus old passports demonstrating international travel history and visa compliance.',
            mandatory: true,
          },
          {
            id: 'jpn-form',
            label: 'Official Japan Visa Application Form (Typed & Signed)',
            detail:
              'Completed neatly with barcode/printable layout matching your passport bio page, with no blank sections (use N/A where inapplicable).',
            mandatory: true,
          },
          {
            id: 'jpn-photo',
            label: 'Recent Photograph (45mm × 35mm / Square-Check Embassy Spec)',
            detail:
              'Crisp white background, taken within six months, glued neatly per exact Embassy of Japan / Consulate-General Karachi instruction.',
            mandatory: true,
          },
          {
            id: 'jpn-schedule',
            label: 'Detailed Day-by-Day Schedule of Stay (Taizai Yoteihyo)',
            detail:
              'Mandatory Japanese embassy form listing every date, planned activity, transit city, and hotel contact telephone number.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial, Tax & Tie Documentation',
        items: [
          {
            id: 'jpn-bank',
            label: 'Six-Month Bank Statement & Account Maintenance Certificate',
            detail:
              'Stamped original statement demonstrating sustained financial stability without sudden unexplained deposits.',
            mandatory: true,
          },
          {
            id: 'jpn-tax',
            label: 'FBR NTN & Recent Income Tax Returns / Wealth Statement',
            detail:
              'Strongly reinforces financial credibility and long-term economic ties in Pakistan.',
            mandatory: true,
          },
          {
            id: 'jpn-work',
            label: 'Employment Certificate (NOC) or Business Registration',
            detail:
              'Confirms designation, length of service, salary, and exact approved leave window matching your Schedule of Stay.',
            mandatory: true,
          },
          {
            id: 'jpn-bookings',
            label: 'Flight Reservation & Hotel Confirmations',
            detail:
              'Must align date-for-date with every hotel address entered on the Schedule of Stay.',
            mandatory: true,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Jurisdiction & Profile Triage',
        youDo:
          'Share your residential province in Pakistan, travel season (Sakura, summer, autumn, or winter), and occupation profile.',
        weDo:
          'Confirm Islamabad vs Karachi embassy jurisdiction, check active submission procedures (direct vs authorised channel), and audit profile readiness.',
      },
      {
        stepNumber: '02',
        title: 'Schedule of Stay & Visa File Drafting',
        youDo:
          'Send your bank statements, FBR tax filings, employment/business papers, and rough city preferences.',
        weDo:
          'Craft a realistic, rail-coherent Schedule of Stay (Tokyo, Kyoto, Osaka, Fuji), type your embassy form, and audit bank-to-income alignment.',
      },
      {
        stepNumber: '03',
        title: 'Physical Packet Indexing & Submission',
        youDo:
          'Print and sign the finalised forms and submit via the designated Islamabad or Karachi channel.',
        weDo:
          'Organise your complete paper packet in strict embassy order—with zero staples where prohibited—and verify every phone number and date.',
      },
      {
        stepNumber: '04',
        title: 'Visit Japan Web & Arrival Prep',
        youDo:
          'Share your confirmed arrival airport (Haneda, Narita, or Kansai) once your passport returns with the visa sticker.',
        weDo:
          'Guide your official Visit Japan Web QR setup for immigration and customs plus IC card (Suica/Pasmo) and Shinkansen baggage notes.',
      },
    ],
    refusalReasons: [
      {
        title: 'Vague or Geographically Impossible Schedule of Stay',
        cause:
          'Copy-pasted itineraries listing "Sightseeing in Tokyo" without daily details or attempting Tokyo, Hokkaido, and Okinawa in five days undermine genuine tourist intent.',
        prevention:
          'We write realistic, bullet-train-paced daily schedules with exact hotel names, phone numbers, and logical transit transitions.',
      },
      {
        title: 'Weak Tax History or Unexplained Bank Jumps',
        cause:
          'Japanese visa officers cross-check stated income against bank statement inflows and FBR tax documentation.',
        prevention:
          'We audit six months of statements alongside your tax returns and salary slips to surface and explain any irregular credits beforehand.',
      },
      {
        title: 'Filing Under the Wrong Embassy Jurisdiction',
        cause:
          'Karachi residents submitting through Islamabad (or vice versa) without matching residence proof face immediate administrative return.',
        prevention:
          'We verify CNIC and utility/employment residence proofs against strict Islamabad and Karachi jurisdictional boundaries.',
      },
      {
        title: 'Missing Guarantor Documents for Family or Business Invitations',
        cause:
          'Incomplete Japanese host documents (missing Juminhyo, Letter of Reason for Invitation, or corporate registry) stall invited applications.',
        prevention:
          'We provide your Japanese host or company with a precise checklist of exact Japanese-side originals required.',
      },
    ],
    localNotes: {
      overview: [
        'Japan rewards disciplined preparation more generously than almost any destination on earth. The same precision you experience in a Kyoto ryokan tea service or a Shinkansen arriving to the exact second governs how the Embassy of Japan evaluates a visa packet: clear, honest paperwork assembled without exaggeration goes a long way.',
        'For Pakistani travellers, Japan’s appeal spans serene temple gardens in Kyoto, neon-lit neighbourhood alleys in Shinjuku and Dotonbori, Mount Fuji lakeshores, and a rapidly expanding halal dining scene across Tokyo (Asakusa, Shibuya, Tokyo Camii in Yoyogi) and Osaka. Once your visa sticker is in hand, navigating Japan by rail is intuitive even for first-time visitors.',
      ],
      bestSeasonTitle: 'Cherry blossoms, fiery autumn maples, and quiet winter clarity',
      bestSeasonBody:
        'Late March through mid-April brings cherry blossoms (Sakura) across Tokyo, Kyoto, and Osaka—breathtaking but accompanied by peak hotel rates and early Shinkansen crowds. Mid-November to early December offers crisp skies and glowing crimson maple leaves (Momiji) with calmer evenings. January and February provide the clearest winter views of snow-capped Mount Fuji and world-class powder in Hokkaido and Nagano, while July and August turn hot and humid across Honshu’s cities.',
      citiesTitle: 'The Golden Route: Tokyo, Hakone/Fuji, Kyoto, and Osaka',
      citiesBody:
        'A classic ten-day first visit balances four nights in Tokyo (Asakusa’s Senso-ji, Meiji Shrine, Shibuya, day trip to Kamakura or Nikko), an optional night near Lake Kawaguchiko or Hakone for Mount Fuji views, three nights in Kyoto for Arashiyama bamboo groves, Fushimi Inari torii gates, and Gion’s preserved wooden lanes, and two lively evenings in Osaka (with an easy 45-minute train hop to Nara’s deer park). Flying into Tokyo (HND/NRT) and home from Osaka Kansai (KIX) eliminates backtracking.',
      entryTipsTitle: 'Visit Japan Web, IC transit cards, and luggage rules',
      entryTipsBody:
        'Complete the free official Visit Japan Web registration ahead of flying to generate your immigration and customs QR codes. Japan remains surprisingly cash-friendly at temples, shrines, and small ramen counters—carry Japanese Yen alongside a foreign-friendly debit/credit card and load a digital Suica or ICOCA transit card onto your phone (or pick up a Welcome Suica at Haneda/Narita). Note that oversized suitcases (total dimensions 160–250 cm) require free advance seat-and-luggage reservations on the Tokaido Shinkansen between Tokyo, Kyoto, and Osaka.',
    },
    packages: [
      {
        id: 'jpn-tourist',
        tabLabel: 'Tourist Visa File',
        title: 'Japan Temporary Visitor Packet Prep',
        bestFor: 'Solo travellers and couples preparing an Islamabad or Karachi embassy submission.',
        serviceFee: '',
        turnaroundNote: 'Detailed Schedule of Stay + full embassy audit.',
        includes: [
          'Jurisdiction verification (Islamabad Embassy vs Karachi Consulate-General)',
          'Custom rail-paced Schedule of Stay (Taizai Yoteihyo)',
          'Typed embassy application form and bank/FBR tax alignment audit',
          'Visit Japan Web and Shinkansen pre-departure briefing',
        ],
        excludesNote: 'Official embassy fees (where applicable) and drop-off/courier charges are confirmed separately with our team.',
      },
      {
        id: 'jpn-family',
        tabLabel: 'Family / Sakura',
        title: 'Family Holiday Japan Desk',
        bestFor: 'Families planning spring Sakura or autumn Momiji multi-city trips.',
        serviceFee: '',
        turnaroundNote: 'Synchronised family packets and sponsor linking.',
        includes: [
          'Unified family Schedule of Stay and hotel reservations alignment',
          'Sponsor letter, FRC/marriage documentation, and school leave templates',
          'Individual typed forms checked across every passport',
          'Halal-friendly Tokyo/Kyoto/Osaka dining & rail guide',
        ],
        excludesNote: 'Any embassy or authorised-channel charges apply per applicant.',
      },
      {
        id: 'jpn-business',
        tabLabel: 'Business Invite',
        title: 'Japan Corporate Visit Visa File',
        bestFor: 'Pakistani executives invited by Japanese firms or trade exhibitions.',
        serviceFee: '',
        turnaroundNote: 'Full review of Japanese-side invitation originals.',
        includes: [
          'Checklist and audit of Japanese host Letter of Reason & Guarantee',
          'Pakistani corporate cover letter, NTN, and chamber alignment',
          'Business Schedule of Stay structured around meetings and factories',
          'Embassy submission checklist and tracking tips',
        ],
        excludesNote: 'Embassy charges are confirmed prior to filing.',
      },
    ],
    faqs: [
      {
        question: 'Does Japan offer an e-Visa for Pakistani residents applying from Pakistan?',
        answer:
          'Japan’s e-Visa availability depends strictly on country of residence and active diplomatic updates; Pakistani residents applying inside Pakistan typically submit paper visa files through the Embassy of Japan in Islamabad, the Consulate-General in Karachi, or their designated submission channel. Confirm live procedure with our desk.',
      },
      {
        question: 'Is there a visa fee for Pakistani citizens applying for a Japan short-term visa?',
        answer:
          'Bilateral fee arrangements and authorised-centre service charges can change by official notification. Confirm current embassy fee status with our team at the time of application.',
      },
      {
        question: 'Can I apply for a Japan visa with a fresh Pakistani passport and no prior travel?',
        answer:
          'There is no legal ban on first-time travellers applying, though strong, well-documented employment, FBR tax history, clean six-month bank flow, and a realistic itinerary carry decisive weight. We give you a candid readiness review before you invest in filings.',
      },
      {
        question: 'What is the Schedule of Stay form required by the Embassy of Japan?',
        answer:
          'The Schedule of Stay (Taizai Yoteihyo) is an official tabular sheet listing every day of your trip in Japan—dates, planned cities and activities, and exact hotel names and phone numbers. We draft this meticulously so it matches your flight and lodging reservations.',
      },
      {
        question: 'Do I need confirmed paid flight tickets for a Japan visa?',
        answer:
          'The embassy generally advises against purchasing non-refundable tickets prior to visa issuance; verifiable flight reservations aligned with your Schedule of Stay are standard during filing. Confirm exact current embassy instructions with our team.',
      },
      {
        question: 'How early should I start preparing a Japan visa for Cherry Blossom season?',
        answer:
          'Begin eight to ten weeks before late March so you have ample time to gather stamped bank statements, tax records, and submit before spring embassy queues peak.',
      },
    ],
    relatedSlugs: ['south-korea', 'singapore', 'thailand', 'usa'],
  },
  {
    slug: 'south-korea',
    country: 'South Korea',
    isoCode: 'KOR',
    region: 'East Asia',
    channel: 'Sticker / Embassy',
    accentHex: '#274166',
    stampLabel: 'SEOUL · KOR',
    stampRotation: 4,
    heroPromise:
      'Structured C-3-9 tourist and C-3-4 business visa file preparation for Pakistani travellers visiting Seoul, Busan, and Jeju Island.',
    seoTitle: 'South Korea Visa from Pakistan — C-3 Guide | Visahouse',
    seoDescription:
      'Apply for a South Korea tourist or business visa from Pakistan with complete embassy visa file assembly, financial audit, and Seoul travel notes.',
    facts: {
      visaType: 'Short-Term General (C-3-9 Tourist / C-3-4 Business)',
      entryType: 'Single or Multiple Entry (embassy discretion)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<KORVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'KOR0000000PAK0000000M0000000<<<<<<<<<<<<<<01',
    },
    whoCanApply: {
      intro:
        'Pakistani passport holders visiting South Korea for tourism in Seoul and Busan, K-culture and culinary travel, trade fairs in COEX/KINTEX, or visiting relatives must apply for a C-3 short-term visa through the Embassy of the Republic of Korea in Islamabad or the Consulate-General in Karachi according to jurisdiction.',
      profiles: [
        'Salaried professionals and couples with verified tax returns, payroll bank flow, and international travel history',
        'Business importers, textile buyers, and tech founders invited by Korean corporations (C-3-4 category)',
        'Students and academics attending South Korean conferences, exchange seminars, or university visits',
        'Families planning autumn foliage or spring cherry-blossom trips across Seoul, Gyeongju, and Busan',
      ],
      eligibilityNote:
        'Pakistani nationals are not eligible for K-ETA visa-free entry; a formal C-3 visa granted prior to departure is mandatory, and visa officers review financial stability and employment ties thoroughly.',
    },
    checklist: [
      {
        groupTitle: 'Embassy Application & Personal Papers',
        items: [
          {
            id: 'kor-passport',
            label: 'Original Pakistani Passport & Prior Travel Copies',
            detail:
              'Current passport with clean pages plus copies of prior visas (OECD / Asian travel records help establish compliance).',
            mandatory: true,
          },
          {
            id: 'kor-form',
            label: 'Completed Korea Visa Application Form (e-Form / Official PDF)',
            detail:
              'Filled completely in English with consistent residential, employment, and Korea host/hotel details.',
            mandatory: true,
          },
          {
            id: 'kor-photo',
            label: 'Recent Colour Photograph (35mm × 45mm)',
            detail:
              'White background, front-facing matte photo taken within six months.',
            mandatory: true,
          },
          {
            id: 'kor-cnic',
            label: 'CNIC & NADRA Family Registration Certificate (FRC)',
            detail:
              'Establishes personal identity and family ties anchored in Pakistan.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Financial, Tax & Trip Proof',
        items: [
          {
            id: 'kor-bank',
            label: 'Six-Month Personal Bank Statement & Balance Certificate',
            detail:
              'Bank-stamped statement showing authentic monthly salary or business inflows.',
            mandatory: true,
          },
          {
            id: 'kor-tax',
            label: 'FBR NTN & Recent Tax Returns',
            detail:
              'Demonstrates documented tax-paying status in Pakistan.',
            mandatory: true,
          },
          {
            id: 'kor-work',
            label: 'Employer NOC & Pay Slips / Business Chamber Letter',
            detail:
              'Confirms employment continuity, salary, and approved vacation window.',
            mandatory: true,
          },
          {
            id: 'kor-itinerary',
            label: 'Detailed Korea Itinerary, Flight & Hotel Bookings',
            detail:
              'Day-by-day route across Seoul, Nami Island, Busan, or Jeju matching confirmed lodging.',
            mandatory: true,
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Jurisdiction & Category Review',
        youDo:
          'Confirm your province of residence in Pakistan, trip purpose (C-3-9 tourist vs C-3-4 business), and travel window.',
        weDo:
          'Verify Islamabad vs Karachi embassy jurisdiction, active appointment or drop-off rules, and current official fee structure.',
      },
      {
        stepNumber: '02',
        title: 'Financial & Document Audit',
        youDo:
          'Share your bank statements, FBR tax filings, employer or business papers, and passport scans.',
        weDo:
          'Check statement health, cross-verify salary/tax figures, and draft a crisp cover letter and Seoul–Busan day plan.',
      },
      {
        stepNumber: '03',
        title: 'Form Completion & Packet Indexing',
        youDo:
          'Review and sign the completed Korea visa application form.',
        weDo:
          'Compile your tabbed embassy visa file in exact submission order and brief you on drop-off and status tracking via the Korea Visa Portal.',
      },
      {
        stepNumber: '04',
        title: 'Visa Grant Notice & Incheon Arrival Prep',
        youDo:
          'Verify your Visa Grant Notice once approved on the Korea Visa Portal.',
        weDo:
          'Audit every digit on your grant PDF and send an Incheon arrival sheet covering T-money transit cards, Naver Map, and halal Itaewon tips.',
      },
    ],
    refusalReasons: [
      {
        title: 'Confusing K-ETA Eligibility With Pakistani Passport Rules',
        cause:
          'Travellers occasionally assume South Korea’s online K-ETA covers all nationalities and miss the mandatory embassy C-3 filing window.',
        prevention:
          'We plan strictly around formal embassy/consulate processing timelines from day one.',
      },
      {
        title: 'Insufficient Financial Provenance',
        cause:
          'A high closing balance without matching salary deposits, tax filings, or business turnover looks artificial to embassy examiners.',
        prevention:
          'We tie your bank statement directly to pay slips, employer letters, or FBR returns so every rupee makes sense.',
      },
      {
        title: 'Generic Copy-Pasted Tourist Itineraries',
        cause:
          'Boilerplate schedules that lack coherent transit links or realistic daily pacing weaken perceived travel authenticity.',
        prevention:
          'We tailor a realistic KTX-connected plan matching your arrival airport, hotel districts, and season.',
      },
      {
        title: 'Unverified Korean Business Invitations',
        cause:
          'Business C-3-4 applications missing the Korean host’s Business Registration Certificate (Saopja Deungnokjeung) or formal seal get delayed or denied.',
        prevention:
          'We verify the exact Korean corporate document set required from your host before you submit.',
      },
    ],
    localNotes: {
      overview: [
        'South Korea pairs six-hundred-year-old Joseon palace courtyards with hyper-modern design districts, mountain hiking trails inside city limits, and coastal boardwalks in Busan. For Pakistani travellers, Seoul feels surprisingly welcoming: Itaewon’s Seoul Central Mosque anchors an entire hillside of certified halal Korean barbecue, Uzbek, Turkish, and Pakistani kitchens, while clean subway signage in English makes moving around effortless.',
        'Note that South Korea issues electronic Visa Grant Notices (printed on A4 paper via the official Korea Visa Portal) rather than physical passport stickers for most approved applications—meaning you verify and print your grant certificate directly once the embassy completes assessment.',
      ],
      bestSeasonTitle: 'Crisp autumn foliage, pink spring avenues, and bright winter snow',
      bestSeasonBody:
        'Late September through early November is Korea’s standout season—clear cobalt skies, comfortable 15–22°C afternoons, and blazing ginkgo and maple avenues inside Gyeongbokgung Palace and Nami Island. April brings cherry blossoms across Yeouido and Busan’s Dalmaji Hill. December through February turns briskly cold with ski resorts across Gangwon Province (Pyeongchang, Yongpyong) drawing winter travellers, while July and August bring humid monsoon heat.',
      citiesTitle: 'Seoul, Busan, and Jeju Island routing',
      citiesBody:
        'Anchor four or five nights in Seoul—staying near Myeongdong, Insadong, or Itaewon—to explore Bukchon Hanok Village, Gyeongbokgung Palace, N Seoul Tower, Hongdae’s design cafés, and a half-day excursion out to Nami Island or Suwon Hwaseong Fortress. Then board the sleek KTX bullet train south to Busan (under three hours) for Haeundae Beach, Gamcheon Culture Village’s terraced hillside lanes, and seaside temple views at Haedong Yonggungsa. Travellers with ten days can add a one-hour flight down to volcanic Jeju Island.',
      entryTipsTitle: 'Incheon (ICN) arrival, Naver Map, and transit cards',
      entryTipsBody:
        'Print your official Korea Visa Grant Notice cleanly before boarding and check whether South Korea’s e-Arrival Card applies to your arrival window. One practical quirk catches nearly every first-timer: Google Maps walking and driving navigation is restricted inside South Korea—download Naver Map or KakaoMap (both support English) before landing at Incheon Airport, and pick up a T-money card at any airport convenience store for seamless subway, bus, and taxi payments.',
    },
    packages: [
      {
        id: 'kor-tourist',
        tabLabel: 'C-3-9 Tourist',
        title: 'South Korea Tourist Visa File Prep',
        bestFor: 'Solo travellers and couples filing a C-3-9 application in Islamabad or Karachi.',
        serviceFee: '',
        turnaroundNote: 'Full embassy-order preparation and portal tracking guide.',
        includes: [
          'Islamabad vs Karachi jurisdiction and procedure verification',
          'Complete Korea visa form drafting and cover letter writing',
          'Bank statement, FBR tax, and employment tie audit',
          'Custom Seoul/Busan itinerary plus Incheon arrival notes',
        ],
        excludesNote: 'Official embassy fees and authorised-centre fees are confirmed separately with our team.',
      },
      {
        id: 'kor-business',
        tabLabel: 'C-3-4 Business',
        title: 'Korea Trade & Corporate Visit Desk',
        bestFor: 'Pakistani importers, engineers, and delegates invited by Korean firms.',
        serviceFee: '',
        turnaroundNote: 'Korean-side host registry and invitation audit.',
        includes: [
          'Verification of Korean company invitation & Business Registration Certificate',
          'Pakistani company cover letter, chamber/NTN alignment',
          'C-3-4 application packet compilation',
          'Korea Visa Portal tracking walkthrough',
        ],
        excludesNote: 'Official embassy fees are billed at actuals.',
      },
    ],
    faqs: [
      {
        question: 'Can Pakistani passport holders enter South Korea with K-ETA?',
        answer:
          'No. Pakistani passport holders are not eligible for K-ETA visa-free entry and must obtain a prior South Korean visa (such as C-3-9 tourist or C-3-4 business) before travelling.',
      },
      {
        question: 'Can Pakistanis visit Jeju Island visa-free?',
        answer:
          'Jeju Island’s visa-waiver list excludes several nationalities and enforces strict direct-flight rules. Pakistani citizens generally require a valid South Korean visa—confirm current Jeju entry regulations with our team before booking.',
      },
      {
        question: 'Will I get a sticker in my passport for a South Korea visa?',
        answer:
          'South Korea transitioned largely to electronic Visa Grant Notices downloadable from the official Korea Visa Portal once approved. You print the grant notice on paper and carry it alongside your passport.',
      },
      {
        question: 'What financial documents carry the most weight for a South Korea visa from Pakistan?',
        answer:
          'Visa officers look for coherence across three items: a six-month bank statement showing genuine monthly inflows, FBR tax returns/NTN records, and an employer NOC or verifiable business registration.',
      },
      {
        question: 'Is halal food available in Seoul and Busan?',
        answer:
          'Yes. Seoul’s Itaewon district surrounding Seoul Central Mosque has dozens of certified halal restaurants (including halal Korean BBQ and traditional dishes), and Busan also hosts halal eateries near Nampo-dong and Busan Mosque in Geumjeong.',
      },
      {
        question: 'How far ahead should I start my South Korea visa application?',
        answer:
          'Start six to eight weeks prior to travel—particularly ahead of April cherry blossoms or October autumn foliage—to allow comfortable document auditing and embassy assessment time.',
      },
    ],
    relatedSlugs: ['japan', 'singapore', 'philippines', 'usa'],
  },
  {
    slug: 'usa',
    country: 'United States',
    isoCode: 'USA',
    region: 'North America',
    channel: 'Interview / Consulate',
    accentHex: '#223A5E',
    stampLabel: 'B1 / B2 DESK · USA',
    stampRotation: -3,
    heroPromise:
      'Disciplined B1/B2 visitor visa guidance, accurate DS-160 drafting, official appointment scheduling support, and realistic embassy interview coaching for Pakistani applicants.',
    seoTitle: 'USA Visit Visa from Pakistan — DS-160 & Prep | Visahouse',
    seoDescription:
      'Prepare your US B1/B2 visitor visa from Pakistan with accurate DS-160 form drafting, official appointment guidance, and interview coaching.',
    facts: {
      visaType: 'B1/B2 Non-Immigrant Visitor Visa (Business / Tourism)',
      entryType: 'Multiple or Single Entry (visa officer discretion)',
      stayDuration: '',
      validity: '',
      processingTime: '',
      govtFee: '',
      ourFee: '',
      lastVerified: '',
      mrzLine1: 'V<USAVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<',
      mrzLine2: 'USA0000000PAK0000000M0000000<<<<<<<<<<<<<<04',
    },
    whoCanApply: {
      intro:
        'Pakistani citizens travelling to the United States for tourism, visiting family or graduations, attending medical consultations, or conducting short business meetings and conferences apply for a B1/B2 non-immigrant visitor visa and attend an in-person embassy interview in Islamabad or Karachi (unless qualifying for an official interview-waiver renewal).',
      profiles: [
        'Salaried executives, doctors, engineers, and established business owners visiting the US for holidays or conferences',
        'Parents and immediate relatives attending university graduations, weddings, or family visits in the US',
        'Repeat US travellers renewing an eligible expiring B1/B2 visa (confirm live interview-waiver rules)',
        'Corporate delegates invited to US trade shows, client headquarters, or professional training seminars (non-employment B1)',
      ],
      eligibilityNote:
        'Under Section 214(b) of US immigration law, every B1/B2 decision hinges primarily on your DS-160 application and your brief live conversation with the visa officer—never on thick stacks of unrequested paper. Truthful, concise preparation is everything.',
    },
    checklist: [
      {
        groupTitle: 'Mandatory Consulate Appointment Items',
        items: [
          {
            id: 'usa-passport',
            label: 'Valid Pakistani Passport & All Previous Passports',
            detail:
              'Current passport plus expired passports showing prior US, UK, Schengen, or international travel compliance.',
            mandatory: true,
          },
          {
            id: 'usa-ds160',
            label: 'DS-160 Confirmation Page (With Barcode)',
            detail:
              'Printed laser-quality confirmation page matching the exact confirmation number linked to your appointment profile.',
            mandatory: true,
          },
          {
            id: 'usa-appt',
            label: 'Official Appointment Confirmation & MRV Fee Receipt',
            detail:
              'Generated directly from the official US visa scheduling portal for Embassy Islamabad or Consulate-General Karachi.',
            mandatory: true,
          },
          {
            id: 'usa-photo',
            label: 'Recent 2×2 Inch (51mm × 51mm) US-Spec Photograph',
            detail:
              'White background, no eyeglasses, taken within six months—both digital upload for DS-160 and two printed copies for the window.',
            mandatory: true,
          },
        ],
      },
      {
        groupTitle: 'Supporting Evidence (Carry Organized, Present Only If Asked)',
        items: [
          {
            id: 'usa-work',
            label: 'Employment Letter, Recent Pay Slips, or Business Registration',
            detail:
              'Clean one-page summary of your role, tenure, salary/income, and business ties in Pakistan.',
          },
          {
            id: 'usa-tax',
            label: 'FBR Tax Returns & Recent Bank Statement',
            detail:
              'Kept neatly in a clear folder strictly as backup if the visa officer asks to inspect financial capacity.',
          },
          {
            id: 'usa-purpose',
            label: 'Conference Registration, Graduation Letter, or Medical/Host Note',
            detail:
              'Short, factual proof of why you are travelling on those specific dates.',
          },
          {
            id: 'usa-family',
            label: 'NADRA FRC / Marriage Certificate & Property Summary',
            detail:
              'Documents social and family anchors in Pakistan if queried during the interview.',
          },
        ],
      },
    ],
    steps: [
      {
        stepNumber: '01',
        title: 'Honest Profile & Section 214(b) Assessment',
        youDo:
          'Share your travel purpose, occupation, prior international travel, any previous US visa refusals, and US relatives.',
        weDo:
          'Evaluate your profile transparently under B1/B2 standards, identify weak points early, and confirm whether Islamabad or Karachi suits your schedule.',
      },
      {
        stepNumber: '02',
        title: 'Precision DS-160 Drafting & Review',
        youDo:
          'Complete our structured intake questionnaire accurately (employment history, education, travel dates, social/family details).',
        weDo:
          'Draft your DS-160 cleanly with accurate job-duty phrasing and consistent dates—reviewing every single screen with you before electronic signature.',
      },
      {
        stepNumber: '03',
        title: 'Official Portal Profile & Appointment Guidance',
        youDo:
          'Settle the official US MRV application fee directly through the authorised bank/payment channel.',
        weDo:
          'Guide profile creation on the official US visa scheduling system and help you monitor official calendar openings for Islamabad or Karachi.',
      },
      {
        stepNumber: '04',
        title: 'Mock Embassy Interview Coaching',
        youDo:
          'Join a structured 1-on-1 practice interview session ahead of your appointment date.',
        weDo:
          'Drill realistic 2-to-3-minute embassy questions tailored strictly to your DS-160 answers so you speak clearly, truthfully, and concisely at the window.',
      },
    ],
    refusalReasons: [
      {
        title: 'Inaccurate or Sloppy DS-160 Entries',
        cause:
          'Agents rushing DS-160 forms often enter generic job titles ("Business"), wrong salaries, or omit prior refusals—creating immediate credibility mismatches at the interview window.',
        prevention:
          'We verify every DS-160 field line by line with you in plain English before submission so your spoken answers and digital record match 100%.',
      },
      {
        title: 'Rehearsed, Robotic, or Over-Long Interview Answers',
        cause:
          'Embassy interviews typically last two to three minutes; reciting memorised speeches or volunteering unrelated details raises suspicion.',
        prevention:
          'Our mock coaching trains calm, natural, two-sentence answers grounded purely in your real facts—never scripted fiction.',
      },
      {
        title: 'Vague Travel Purpose or Unrealistic Length of Stay',
        cause:
          'Asking for a four-month tourist holiday while claiming a full-time corporate job in Pakistan signals weak occupational ties under Section 214(b).',
        prevention:
          'We align your planned trip duration realistically with your employer leave policy or business schedule.',
      },
      {
        title: 'Relying on "Sponsorship" Letters Instead of Personal Ties',
        cause:
          'Many Pakistani applicants mistakenly believe an affidavit from a US-based relative guarantees approval; US law evaluates the applicant’s own ties back to Pakistan first.',
        prevention:
          'We structure your preparation around demonstrating clear, verifiable anchors in Pakistan rather than leaning on a host letter.',
      },
    ],
    localNotes: {
      overview: [
        'Applying for a United States B1/B2 visitor visa from Pakistan is fundamentally different from preparing an Asian or European file. Visa officers at the US Embassy in Islamabad and the US Consulate-General in Karachi rarely inspect thick folders of bank statements unless a specific doubt arises. Instead, the decision rests overwhelmingly on two pillars: the clarity and honesty of your DS-160 form, and how naturally and credibly you answer three to five direct questions at the interview window.',
        'Wait times for official B1/B2 interview slots in Islamabad and Karachi fluctuate widely throughout the year. Starting your DS-160 and official MRV fee setup well ahead of a planned graduation, conference, or summer family visit gives you room to select an official date calmly without falling for unauthorised "priority-slot" brokers.',
      ],
      bestSeasonTitle: 'Matching US seasons to your region of travel',
      bestSeasonBody:
        'The United States spans every climate zone. April through June and September through October bring crisp, comfortable walking weather to East Coast cities (New York, Washington D.C., Boston) and Chicago, with New England autumn foliage peaking in October. California and the Southwest stay bright nearly year-round, while Florida and Texas are most comfortable from November through March. Mountain national parks such as Yellowstone and Glacier open fully only from late June through September.',
      citiesTitle: 'Realistic first-time US routes without cross-country burnout',
      citiesBody:
        'First-time Pakistani visitors often underestimate US distances—New York to Los Angeles is a six-hour flight. Group your itinerary regionally: an East Coast corridor (New York, Washington D.C., and Philadelphia linked smoothly by Amtrak rail), a West Coast loop (San Francisco, Yosemite, and Los Angeles), or a family-focused stay in Houston, Dallas, Chicago, or Northern Virginia where South Asian halal restaurants, mosques, and family communities are deeply established.',
      entryTipsTitle: 'Consulate day etiquette and US CBP port-of-entry notes',
      entryTipsBody:
        'On interview day in Islamabad (Diplomatic Enclave shuttle) or Karachi, remember that mobile phones, smartwatches, USB drives, and large bags are prohibited inside embassy premises—bring only your clear document folder. Once your visa is issued and you fly to the United States, note that Customs and Border Protection (CBP) determines your authorised stay length on arrival via your electronic I-94 record; always download and check your I-94 online after landing so you depart well before the permitted date.',
    },
    usaGuidance: {
      visitorOverview:
        'Our US Visitor Visa desk focuses exclusively on honest, transparent preparation for B1 (short business meetings, conferences, client visits) and B2 (tourism, family reunions, graduations, medical visits) applicants in Pakistan. We never fabricate ties, never invent itineraries, and never claim guaranteed interview outcomes or backdoor slots.',
      ds160Steps: [
        {
          title: 'Pre-DS-160 Fact Sheet',
          detail:
            'We collect your complete 5-year employment, education, prior travel, family, and social details in a clean bilingual-friendly intake worksheet so no date is guessed while the portal times out.',
        },
        {
          title: 'Accurate Job-Duty Framing',
          detail:
            'The DS-160 "Briefly Describe Your Duties" box is often the first text a visa officer reads. We draft clear, jargon-free two-sentence descriptions reflecting your real responsibilities in Pakistan.',
        },
        {
          title: 'Zero-Mismatch Screen Audit',
          detail:
            'Before you click Submit on the official CEAC portal, we walk through the full DS-160 preview line by line with you—verifying passport digits, prior visa history, and US contact details.',
        },
      ],
      interviewPrepPoints: [
        {
          title: 'Two-Minute Window Simulation',
          detail:
            'Practise answering high-frequency embassy questions ("Why are you travelling?", "What do you do in Pakistan?", "Who is paying?", "Who lives in the US?") clearly in under 15 seconds per answer.',
        },
        {
          title: 'Document Discipline',
          detail:
            'Know which mandatory items to hold in hand (passport, DS-160 barcode, appointment letter) versus which backup papers stay in your folder unless specifically requested.',
        },
        {
          title: 'Handling Previous Refusals or Administrative Processing (221g)',
          detail:
            'If you had a prior Section 214(b) refusal or 221(g) check, we review what genuinely changed in your profile and how to address prior history calmly and truthfully.',
        },
      ],
    },
    packages: [
      {
        id: 'usa-ds160',
        tabLabel: 'DS-160 Only',
        title: 'DS-160 Precision Drafting & Audit',
        bestFor: 'Confident travellers who only need meticulous DS-160 form accuracy and error checking.',
        serviceFee: '',
        turnaroundNote: 'Completed with live screen-by-screen client approval.',
        includes: [
          'Structured intake audit covering employment, travel, and family history',
          'Clear, accurate job-duty and trip-purpose wording',
          'Line-by-line review prior to final CEAC submission',
          'US-spec 2×2 inch digital photo compliance check',
        ],
        excludesNote: 'Official US Department of State MRV visa fee is paid directly by the applicant.',
      },
      {
        id: 'usa-full',
        tabLabel: 'DS-160 + Interview Prep',
        title: 'Complete B1/B2 Guidance & Mock Interview',
        bestFor: 'First-time US applicants and families seeking end-to-end form, scheduling, and coaching support.',
        serviceFee: '',
        turnaroundNote: 'Guided from intake through interview day.',
        includes: [
          'Everything in DS-160 Precision Drafting & Audit',
          'Official US appointment portal setup & calendar guidance (Islamabad / Karachi)',
          'One-on-one mock embassy interview session with candid feedback',
          'Clean backup document folder index and consulate-day etiquette sheet',
        ],
        excludesNote: 'Official MRV fee is settled directly via designated bank channels; Visahouse does not sell or guarantee priority embassy slots.',
      },
      {
        id: 'usa-refusal',
        tabLabel: 'Re-Application Review',
        title: 'Post-Refusal Profile & Strategy Session',
        bestFor: 'Applicants with a prior Section 214(b) refusal evaluating whether and when to reapply.',
        serviceFee: '',
        turnaroundNote: 'Honest diagnostic before spending another MRV fee.',
        includes: [
          'Audit of prior DS-160 answers and interview transcript recall',
          'Candid assessment of whether meaningful profile changes exist',
          'Revised DS-160 drafting and focused mock interview if proceeding',
          'Clear written recommendation if waiting is the wiser option',
        ],
        excludesNote: 'Official MRV fee applies only if you choose to file a new application.',
      },
    ],
    faqs: [
      {
        question: 'Can Visahouse guarantee an early US visa appointment or approval in Islamabad or Karachi?',
        answer:
          'No. Official appointment calendars are controlled solely by the US Mission in Pakistan, and visa decisions are made exclusively by US visa officers. We help you prepare an accurate DS-160, navigate official scheduling cleanly, and practise thoroughly for your interview.',
      },
      {
        question: 'Do I need confirmed flight tickets or hotel bookings before my US B1/B2 interview?',
        answer:
          'No. The US Embassy explicitly advises applicants not to buy non-refundable airline tickets before receiving an issued visa in their passport. A clear, realistic travel plan and tentative dates are sufficient for your DS-160 and interview.',
      },
      {
        question: 'How long does a US B1/B2 visa interview usually take?',
        answer:
          'While you may spend one to two hours passing through security, biometrics, and waiting queues at Islamabad or Karachi, the actual conversation at the embassy window typically lasts two to four minutes.',
      },
      {
        question: 'Does an invitation letter from a relative in the US guarantee my visitor visa?',
        answer:
          'No. Visa officers evaluate your own professional, financial, and family ties in Pakistan first. A simple factual note from a US host can clarify where you plan to stay, but it cannot substitute for strong ties back home.',
      },
      {
        question: 'What is Administrative Processing (Section 221(g))?',
        answer:
          'After an interview, a visa officer may place an application under Section 221(g) for additional document verification or security review. Timelines vary widely by case and cannot be expedited by private agencies.',
      },
      {
        question: 'Can I renew my expiring US B1/B2 visa without an interview?',
        answer:
          'US interview-waiver (drop-box) eligibility rules are updated periodically by the Department of State based on expiry windows and prior visa class. Confirm live renewal eligibility with our team before scheduling.',
      },
      {
        question: 'Should I carry bank statements and property documents to the US Consulate?',
        answer:
          'Yes, carry a neatly indexed supporting folder (employment letter, tax returns, recent bank statement, FRC) in case the officer asks—but never push papers through the window unless specifically requested.',
      },
    ],
    relatedSlugs: ['japan', 'south-korea', 'singapore', 'thailand'],
  },
];
