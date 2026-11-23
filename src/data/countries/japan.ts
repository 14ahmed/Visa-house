import type { DestinationData } from '../types';

export const destination: DestinationData = {
  "slug": "japan",
  "country": "Japan",
  "isoCode": "JPN",
  "region": "East Asia",
  "channel": "Sticker / Embassy",
  "accentHex": "#343A59",
  "stampLabel": "TOKYO · JPN",
  "stampRotation": -4,
  "heroPromise": "Meticulous embassy-order visa file assembly, day-by-day Schedule of Stay drafting, and financial auditing for Pakistani travellers applying to visit Japan.",
  "seoTitle": "Japan Visa from Pakistan — Checklist & Filing | Visahouse",
  "seoDescription": "Prepare a Japan tourist or business visa from Pakistan with Schedule of Stay drafting, bank-statement checks, and embassy guidance.",
  "facts": {
    "visaType": "Temporary Visitor Visa (Short-Term Tourism / Business / Family)",
    "entryType": "Single or Multiple Entry (embassy discretion)",
    "stayDuration": "",
    "validity": "",
    "processingTime": "",
    "govtFee": "",
    "ourFee": "",
    "lastVerified": "",
    "mrzLine1": "V<JPNVISAHOUSE<<SPECIMEN<PAK<<<<<<<<<<<<<<<<",
    "mrzLine2": "JPN0000000PAK0000000M0000000<<<<<<<<<<<<<<05"
  },
  "whoCanApply": {
    "intro": "Pakistani citizens travelling to Tokyo, Kyoto, Osaka, Hokkaido, or Hiroshima for cherry-blossom holidays, autumn foliage trips, family visits, or corporate meetings submit a complete paper visa file to the Embassy of Japan in Islamabad or the Consulate-General of Japan in Karachi (strictly by residential jurisdiction).",
    "profiles": [
      "Salaried professionals and senior managers with established tax filings, strong bank continuity, and prior international travel",
      "Business owners and exporters visiting Japanese machinery, automotive, or textile partners (with official Japanese invitation pack)",
      "Families planning spring Sakura or autumn Momiji holidays across Tokyo, Kyoto, and Osaka",
      "Relatives invited by family members legally residing in Japan (with formal Juminhyo and guarantor paperwork)"
    ],
    "eligibilityNote": "Japan enforces strict provincial embassy jurisdiction between Islamabad (Federal, Punjab, KP, AJK, GB) and Karachi (Sindh & Balochistan) and examines the daily Schedule of Stay (Taizai Yoteihyo) line by line."
  },
  "checklist": [
    {
      "groupTitle": "Embassy Forms & Identity",
      "items": [
        {
          "id": "jpn-passport",
          "label": "Original Pakistani Passport & Previous Passports",
          "detail": "Current machine-readable passport plus old passports demonstrating international travel history and visa compliance.",
          "mandatory": true
        },
        {
          "id": "jpn-form",
          "label": "Official Japan Visa Application Form (Typed & Signed)",
          "detail": "Completed neatly with barcode/printable layout matching your passport bio page, with no blank sections (use N/A where inapplicable).",
          "mandatory": true
        },
        {
          "id": "jpn-photo",
          "label": "Recent Photograph (45mm × 35mm / Square-Check Embassy Spec)",
          "detail": "Crisp white background, taken within six months, glued neatly per exact Embassy of Japan / Consulate-General Karachi instruction.",
          "mandatory": true
        },
        {
          "id": "jpn-schedule",
          "label": "Detailed Day-by-Day Schedule of Stay (Taizai Yoteihyo)",
          "detail": "Mandatory Japanese embassy form listing every date, planned activity, transit city, and hotel contact telephone number.",
          "mandatory": true
        }
      ]
    },
    {
      "groupTitle": "Financial, Tax & Tie Documentation",
      "items": [
        {
          "id": "jpn-bank",
          "label": "Six-Month Bank Statement & Account Maintenance Certificate",
          "detail": "Stamped original statement demonstrating sustained financial stability without sudden unexplained deposits.",
          "mandatory": true
        },
        {
          "id": "jpn-tax",
          "label": "FBR NTN & Recent Income Tax Returns / Wealth Statement",
          "detail": "Strongly reinforces financial credibility and long-term economic ties in Pakistan.",
          "mandatory": true
        },
        {
          "id": "jpn-work",
          "label": "Employment Certificate (NOC) or Business Registration",
          "detail": "Confirms designation, length of service, salary, and exact approved leave window matching your Schedule of Stay.",
          "mandatory": true
        },
        {
          "id": "jpn-bookings",
          "label": "Flight Reservation & Hotel Confirmations",
          "detail": "Must align date-for-date with every hotel address entered on the Schedule of Stay.",
          "mandatory": true
        }
      ]
    }
  ],
  "steps": [
    {
      "stepNumber": "01",
      "title": "Jurisdiction & Profile Triage",
      "youDo": "Share your residential province in Pakistan, travel season (Sakura, summer, autumn, or winter), and occupation profile.",
      "weDo": "Confirm Islamabad vs Karachi embassy jurisdiction, check active submission procedures (direct vs authorised channel), and audit profile readiness."
    },
    {
      "stepNumber": "02",
      "title": "Schedule of Stay & Visa File Drafting",
      "youDo": "Send your bank statements, FBR tax filings, employment/business papers, and rough city preferences.",
      "weDo": "Craft a realistic, rail-coherent Schedule of Stay (Tokyo, Kyoto, Osaka, Fuji), type your embassy form, and audit bank-to-income alignment."
    },
    {
      "stepNumber": "03",
      "title": "Physical Packet Indexing & Submission",
      "youDo": "Print and sign the finalised forms and submit via the designated Islamabad or Karachi channel.",
      "weDo": "Organise your complete paper packet in strict embassy order—with zero staples where prohibited—and verify every phone number and date."
    },
    {
      "stepNumber": "04",
      "title": "Visit Japan Web & Arrival Prep",
      "youDo": "Share your confirmed arrival airport (Haneda, Narita, or Kansai) once your passport returns with the visa sticker.",
      "weDo": "Guide your official Visit Japan Web QR setup for immigration and customs plus IC card (Suica/Pasmo) and Shinkansen baggage notes."
    }
  ],
  "refusalReasons": [
    {
      "title": "Vague or Geographically Impossible Schedule of Stay",
      "cause": "Copy-pasted itineraries listing \"Sightseeing in Tokyo\" without daily details or attempting Tokyo, Hokkaido, and Okinawa in five days undermine genuine tourist intent.",
      "prevention": "We write realistic, bullet-train-paced daily schedules with exact hotel names, phone numbers, and logical transit transitions."
    },
    {
      "title": "Weak Tax History or Unexplained Bank Jumps",
      "cause": "Japanese visa officers cross-check stated income against bank statement inflows and FBR tax documentation.",
      "prevention": "We audit six months of statements alongside your tax returns and salary slips to surface and explain any irregular credits beforehand."
    },
    {
      "title": "Filing Under the Wrong Embassy Jurisdiction",
      "cause": "Karachi residents submitting through Islamabad (or vice versa) without matching residence proof face immediate administrative return.",
      "prevention": "We verify CNIC and utility/employment residence proofs against strict Islamabad and Karachi jurisdictional boundaries."
    },
    {
      "title": "Missing Guarantor Documents for Family or Business Invitations",
      "cause": "Incomplete Japanese host documents (missing Juminhyo, Letter of Reason for Invitation, or corporate registry) stall invited applications.",
      "prevention": "We provide your Japanese host or company with a precise checklist of exact Japanese-side originals required."
    }
  ],
  "localNotes": {
    "overview": [
      "Japan rewards disciplined preparation more generously than almost any destination on earth. The same precision you experience in a Kyoto ryokan tea service or a Shinkansen arriving to the exact second governs how the Embassy of Japan evaluates a visa packet: clear, honest paperwork assembled without exaggeration goes a long way.",
      "For Pakistani travellers, Japan’s appeal spans serene temple gardens in Kyoto, neon-lit neighbourhood alleys in Shinjuku and Dotonbori, Mount Fuji lakeshores, and a rapidly expanding halal dining scene across Tokyo (Asakusa, Shibuya, Tokyo Camii in Yoyogi) and Osaka. Once your visa sticker is in hand, navigating Japan by rail is intuitive even for first-time visitors."
    ],
    "bestSeasonTitle": "Cherry blossoms, fiery autumn maples, and quiet winter clarity",
    "bestSeasonBody": "Late March through mid-April brings cherry blossoms (Sakura) across Tokyo, Kyoto, and Osaka—breathtaking but accompanied by peak hotel rates and early Shinkansen crowds. Mid-November to early December offers crisp skies and glowing crimson maple leaves (Momiji) with calmer evenings. January and February provide the clearest winter views of snow-capped Mount Fuji and world-class powder in Hokkaido and Nagano, while July and August turn hot and humid across Honshu’s cities.",
    "citiesTitle": "The Golden Route: Tokyo, Hakone/Fuji, Kyoto, and Osaka",
    "citiesBody": "A classic ten-day first visit balances four nights in Tokyo (Asakusa’s Senso-ji, Meiji Shrine, Shibuya, day trip to Kamakura or Nikko), an optional night near Lake Kawaguchiko or Hakone for Mount Fuji views, three nights in Kyoto for Arashiyama bamboo groves, Fushimi Inari torii gates, and Gion’s preserved wooden lanes, and two lively evenings in Osaka (with an easy 45-minute train hop to Nara’s deer park). Flying into Tokyo (HND/NRT) and home from Osaka Kansai (KIX) eliminates backtracking.",
    "entryTipsTitle": "Visit Japan Web, IC transit cards, and luggage rules",
    "entryTipsBody": "Complete the free official Visit Japan Web registration ahead of flying to generate your immigration and customs QR codes. Japan remains surprisingly cash-friendly at temples, shrines, and small ramen counters—carry Japanese Yen alongside a foreign-friendly debit/credit card and load a digital Suica or ICOCA transit card onto your phone (or pick up a Welcome Suica at Haneda/Narita). Note that oversized suitcases (total dimensions 160–250 cm) require free advance seat-and-luggage reservations on the Tokaido Shinkansen between Tokyo, Kyoto, and Osaka."
  },
  "packages": [
    {
      "id": "jpn-tourist",
      "tabLabel": "Tourist Visa File",
      "title": "Japan Temporary Visitor Packet Prep",
      "bestFor": "Solo travellers and couples preparing an Islamabad or Karachi embassy submission.",
      "serviceFee": "",
      "turnaroundNote": "Detailed Schedule of Stay + full embassy audit.",
      "includes": [
        "Jurisdiction verification (Islamabad Embassy vs Karachi Consulate-General)",
        "Custom rail-paced Schedule of Stay (Taizai Yoteihyo)",
        "Typed embassy application form and bank/FBR tax alignment audit",
        "Visit Japan Web and Shinkansen pre-departure briefing"
      ],
      "excludesNote": "Official embassy fees (where applicable) and drop-off/courier charges are confirmed separately with our team."
    },
    {
      "id": "jpn-family",
      "tabLabel": "Family / Sakura",
      "title": "Family Holiday Japan Desk",
      "bestFor": "Families planning spring Sakura or autumn Momiji multi-city trips.",
      "serviceFee": "",
      "turnaroundNote": "Synchronised family packets and sponsor linking.",
      "includes": [
        "Unified family Schedule of Stay and hotel reservations alignment",
        "Sponsor letter, FRC/marriage documentation, and school leave templates",
        "Individual typed forms checked across every passport",
        "Halal-friendly Tokyo/Kyoto/Osaka dining & rail guide"
      ],
      "excludesNote": "Any embassy or authorised-channel charges apply per applicant."
    },
    {
      "id": "jpn-business",
      "tabLabel": "Business Invite",
      "title": "Japan Corporate Visit Visa File",
      "bestFor": "Pakistani executives invited by Japanese firms or trade exhibitions.",
      "serviceFee": "",
      "turnaroundNote": "Full review of Japanese-side invitation originals.",
      "includes": [
        "Checklist and audit of Japanese host Letter of Reason & Guarantee",
        "Pakistani corporate cover letter, NTN, and chamber alignment",
        "Business Schedule of Stay structured around meetings and factories",
        "Embassy submission checklist and tracking tips"
      ],
      "excludesNote": "Embassy charges are confirmed prior to filing."
    }
  ],
  "faqs": [
    {
      "question": "Does Japan offer an e-Visa for Pakistani residents applying from Pakistan?",
      "answer": "Japan’s e-Visa availability depends strictly on country of residence and active diplomatic updates; Pakistani residents applying inside Pakistan typically submit paper visa files through the Embassy of Japan in Islamabad, the Consulate-General in Karachi, or their designated submission channel. Confirm live procedure with our desk."
    },
    {
      "question": "Is there a visa fee for Pakistani citizens applying for a Japan short-term visa?",
      "answer": "Bilateral fee arrangements and authorised-centre service charges can change by official notification. Confirm current embassy fee status with our team at the time of application."
    },
    {
      "question": "Can I apply for a Japan visa with a fresh Pakistani passport and no prior travel?",
      "answer": "There is no legal ban on first-time travellers applying, though strong, well-documented employment, FBR tax history, clean six-month bank flow, and a realistic itinerary carry decisive weight. We give you a candid readiness review before you invest in filings."
    },
    {
      "question": "What is the Schedule of Stay form required by the Embassy of Japan?",
      "answer": "The Schedule of Stay (Taizai Yoteihyo) is an official tabular sheet listing every day of your trip in Japan—dates, planned cities and activities, and exact hotel names and phone numbers. We draft this meticulously so it matches your flight and lodging reservations."
    },
    {
      "question": "Do I need confirmed paid flight tickets for a Japan visa?",
      "answer": "The embassy generally advises against purchasing non-refundable tickets prior to visa issuance; verifiable flight reservations aligned with your Schedule of Stay are standard during filing. Confirm exact current embassy instructions with our team."
    },
    {
      "question": "How early should I start preparing a Japan visa for Cherry Blossom season?",
      "answer": "Begin eight to ten weeks before late March so you have ample time to gather stamped bank statements, tax records, and submit before spring embassy queues peak."
    }
  ],
  "relatedSlugs": [
    "south-korea",
    "singapore",
    "thailand",
    "usa"
  ],
  "seoKeywordGuide": {
    "sectionHeading": "Japan Tourist & Business Visa Requirements from Pakistan",
    "intro": "Japan is a dream cherry-blossom and autumn destination for Pakistani travellers. Searches focus on Embassy of Japan Islamabad vs. Karachi jurisdiction, the daily Schedule of Stay, and bank balance.",
    "primaryKeywords": [
      "Japan visa from Pakistan",
      "Japan tourist visa requirements Pakistani passport",
      "Embassy of Japan Islamabad Karachi visa",
      "Japan Schedule of Stay Taizai Yoteihyo",
      "Japan visa bank statement requirement Pakistan",
      "Japan visa fee in Pakistan"
    ],
    "blocks": [
      {
        "heading": "Islamabad vs. Karachi Provincial Jurisdiction for Japan Visas",
        "keywordFocus": "Japan visa from Pakistan",
        "body": "Japan strictly divides Pakistani applicants between the Embassy of Japan in Islamabad (Federal, Punjab, KP, AJK, GB) and the Consulate General in Karachi (Sindh & Balochistan) through authorised submission desks."
      },
      {
        "heading": "Japan Visa Fees in PKR & Six-Month Financial Proof",
        "keywordFocus": "Japan visa fee in PKR",
        "body": "Official Japanese embassy visa fees and handling charges are confirmed live in PKR. Embassy reviewers examine a stamped 6-month bank statement, AMC, FBR NTN/tax returns, and Employer NOC or business proof closely."
      },
      {
        "heading": "Schedule of Stay (Taizai Yoteihyo) & Visit Japan Web",
        "keywordFocus": "Japan visa processing time Pakistan",
        "body": "A realistic day-by-day Schedule of Stay matching your Tokyo, Kyoto, and Osaka hotel bookings is essential. Apply 6 to 8 weeks before cherry blossom (March–April) or autumn (November) travel, and register on Visit Japan Web before boarding."
      }
    ]
  }
};
