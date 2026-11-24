import type { ChecklistGroup, VisaChannel } from './types';

export interface ChecklistDestinationSource {
  slug: string;
  country: string;
  isoCode: string;
  accentHex: string;
  channel: VisaChannel;
  lastVerified: string;
  eligibilityNote: string;
  checklist: ChecklistGroup[];
}

/**
 * Lightweight checklist payload for DocumentChecklistLibrary and InteractiveVisaGlobe,
 * excluding long country essays, FAQs, refusal audits, and SEO keyword metadata.
 */
export const CHECKLIST_DESTINATION_SOURCES: readonly ChecklistDestinationSource[] = [
  {
    "slug": "thailand",
    "country": "Thailand",
    "isoCode": "THA",
    "accentHex": "#1D5248",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Submission jurisdiction depends on your province of residence or CNIC issuance (Islamabad, Lahore, or Karachi submission desks) as well as whether the Royal Thai Embassy currently routes your category through the official e-Visa portal or designated drop-off centres.",
    "checklist": [
      {
        "groupTitle": "Core Identity & Travel Papers",
        "items": [
          {
            "id": "tha-passport",
            "label": "Original Pakistani Passport & Previous Passports",
            "detail": "Machine-readable passport with required remaining validity beyond travel dates and clean blank pages, plus copies of prior travel stamps if held.",
            "mandatory": true
          },
          {
            "id": "tha-cnic",
            "label": "Valid CNIC / B-Form Copies",
            "detail": "Clear front-and-back colour scan of CNIC for adults, or NADRA CRC / B-Form and parent consent letters for minors.",
            "mandatory": true
          },
          {
            "id": "tha-photos",
            "label": "Recent Biometric Photographs",
            "detail": "White-background matte photographs meeting Royal Thai Embassy head-size proportions, taken within recent months without heavy retouching.",
            "mandatory": true
          },
          {
            "id": "tha-bookings",
            "label": "Return Flight Itinerary & Hotel Confirmations",
            "detail": "Consistent round-trip flight reservation matching every night of hotel bookings across Bangkok, Phuket, or Chiang Mai.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial & Occupation Proof",
        "items": [
          {
            "id": "tha-bank",
            "label": "Signed Bank Statement & Account Maintenance Certificate",
            "detail": "Stamped statement showing regular salary or business turnover rather than sudden unexplained last-minute cash deposits.",
            "mandatory": true
          },
          {
            "id": "tha-employment",
            "label": "Employment Letter & Pay Slips (Salaried)",
            "detail": "Company letterhead confirming designation, tenure, approved leave dates, and monthly salary aligned with bank credits."
          },
          {
            "id": "tha-business",
            "label": "NTN Certificate & Business Letterhead (Self-Employed)",
            "detail": "Active FBR tax registration, company letterhead cover note, and business account history where personal funds derive from company revenue."
          },
          {
            "id": "tha-frc",
            "label": "NADRA Family Registration Certificate (FRC) or Marriage Certificate",
            "detail": "Required when spouses or parents sponsor dependent travellers on a joint itinerary."
          }
        ]
      }
    ]
  },
  {
    "slug": "malaysia",
    "country": "Malaysia",
    "isoCode": "MYS",
    "accentHex": "#1D4B64",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "All travellers entering Malaysia must also complete the Malaysia Digital Arrival Card (MDAC) within the prescribed window prior to arrival—separate from the e-Visa grant itself.",
    "checklist": [
      {
        "groupTitle": "Digital Identity & Travel File",
        "items": [
          {
            "id": "mys-passport",
            "label": "Passport Bio-Data Page Scan (High Resolution)",
            "detail": "Flat, glare-free colour scan of the passport bio page including the bottom MRZ strip and valid signature page.",
            "mandatory": true
          },
          {
            "id": "mys-photo",
            "label": "Studio Digital Portrait Photo",
            "detail": "Clean white backdrop, neutral expression, no shadows or eyeglasses glare, matching Malaysia e-Visa pixel dimensions.",
            "mandatory": true
          },
          {
            "id": "mys-flight",
            "label": "Confirmed Return Flight Booking",
            "detail": "Round-trip itinerary showing entry into KLIA or Penang and onward departure within permitted stay limits.",
            "mandatory": true
          },
          {
            "id": "mys-hotel",
            "label": "Hotel Bookings or Host Invitation Letter",
            "detail": "Accommodation vouchers covering all nights, or a formal host invitation with Malaysian resident ID/visa copy if staying with family.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Supporting Financial & Family Proof",
        "items": [
          {
            "id": "mys-bank",
            "label": "Recent Bank Statement",
            "detail": "Consistent account history demonstrating liquid funds to sustain hotel stays, domestic transfers, and meals.",
            "mandatory": true
          },
          {
            "id": "mys-job",
            "label": "Employment Verification or Business Proof",
            "detail": "Employer letter on letterhead or NTN/business registration showing strong ties in Pakistan."
          },
          {
            "id": "mys-minors",
            "label": "Birth Certificate / NADRA B-Form for Minors",
            "detail": "Mandatory for children under 18 applying alongside parents on the e-Visa portal."
          }
        ]
      }
    ]
  },
  {
    "slug": "indonesia",
    "country": "Indonesia",
    "isoCode": "IDN",
    "accentHex": "#6B3828",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Indonesian immigration periodically updates sponsorship requirements and digital portal categories for calling-visa or tourist e-Visa nationalities. Our desk verifies the active pathway for Pakistani passports before initiating payment.",
    "checklist": [
      {
        "groupTitle": "Core Passport & Portal Requirements",
        "items": [
          {
            "id": "idn-passport",
            "label": "Pakistani Passport Valid Beyond Entry",
            "detail": "Colour bio-page scan with clean MRZ code and sufficient remaining validity as mandated by Indonesian immigration.",
            "mandatory": true
          },
          {
            "id": "idn-photo",
            "label": "Recent Colour Digital Photograph",
            "detail": "Clear front-facing portrait on light/white background matching Indonesian e-Visa upload rules.",
            "mandatory": true
          },
          {
            "id": "idn-bank",
            "label": "Personal Bank Statement (Liquid Funds)",
            "detail": "Recent statement showing accessible balance meeting Indonesian visitor threshold requirements, translated or issued in English.",
            "mandatory": true
          },
          {
            "id": "idn-itinerary",
            "label": "Return Flight & Hotel / Villa Bookings",
            "detail": "Consistent entry and exit itinerary for Denpasar (DPS) or Jakarta (CGK) plus accommodation addresses.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Occupation & Sponsor Papers (If Applicable)",
        "items": [
          {
            "id": "idn-job",
            "label": "Employer Letter or Business NTN Proof",
            "detail": "Establishes professional ties in Pakistan and clarifies the source of travel funding."
          },
          {
            "id": "idn-sponsor",
            "label": "Sponsor / Guarantor Paperwork (Category-Dependent)",
            "detail": "Where an Indonesian guarantor or local sponsor document is required under current regulations, our desk clarifies exact paperwork before filing."
          }
        ]
      }
    ]
  },
  {
    "slug": "singapore",
    "country": "Singapore",
    "isoCode": "SGP",
    "accentHex": "#7A2832",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Singapore’s Immigration & Checkpoints Authority (ICA) places strong emphasis on a properly completed Form 14A and, where applicable, a Letter of Introduction (Form V39A) from an eligible Singapore contact or registered business.",
    "checklist": [
      {
        "groupTitle": "Mandatory ICA Forms & Identity",
        "items": [
          {
            "id": "sgp-passport",
            "label": "Valid Pakistani Passport & Bio-Page Copy",
            "detail": "Passport meeting remaining validity rules with copies of previous visas (especially Schengen, UK, US, or prior ASEAN travel).",
            "mandatory": true
          },
          {
            "id": "sgp-form14a",
            "label": "Completed & Signed Form 14A",
            "detail": "Official ICA visa application form filled consistently without abbreviations or date contradictions.",
            "mandatory": true
          },
          {
            "id": "sgp-photo",
            "label": "Recent White-Background Matte Photo",
            "detail": "Taken within the last three months, 35mm × 45mm dimensions, dark attire preferred for clean contrast against white background.",
            "mandatory": true
          },
          {
            "id": "sgp-v39a",
            "label": "Letter of Introduction (Form V39A) / Sponsor Details",
            "detail": "Where applying via a Singapore citizen, PR, or Singapore corporate host, Form V39A signed by the local contact plus their NRIC/company details."
          }
        ]
      },
      {
        "groupTitle": "Financial & Return-Tie Proof",
        "items": [
          {
            "id": "sgp-bank",
            "label": "Stamped Bank Statement & Account Certificate",
            "detail": "Reflects stable personal or household income sufficient for Singapore’s higher daily hotel and transport costs.",
            "mandatory": true
          },
          {
            "id": "sgp-work",
            "label": "Employer NOC or Company NTN & Letterhead",
            "detail": "Confirms active role, salary, and approved leave dates—or business ownership in Pakistan.",
            "mandatory": true
          },
          {
            "id": "sgp-bookings",
            "label": "Return Flight & Hotel Confirmation",
            "detail": "Shows exact arrival via Changi Airport or Johor land checkpoint and confirmed lodging in Singapore.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "cambodia",
    "country": "Cambodia",
    "isoCode": "KHM",
    "accentHex": "#5A3E2B",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Cambodia’s e-Visa is valid ONLY at designated international airports (Phnom Penh, Siem Reap-Angkor, Sihanoukville) and specific approved land borders—confirm your exact crossing point before applying.",
    "checklist": [
      {
        "groupTitle": "e-Visa Digital Packet",
        "items": [
          {
            "id": "khm-passport",
            "label": "Valid Pakistani Passport Bio-Page Scan",
            "detail": "Clear colour scan showing remaining validity and clean blank pages for entry/exit stamps.",
            "mandatory": true
          },
          {
            "id": "khm-photo",
            "label": "Recent Passport-Style Digital Portrait",
            "detail": "Unobstructed face on a plain light background, JPEG format resized to official portal tolerances.",
            "mandatory": true
          },
          {
            "id": "khm-routing",
            "label": "Flight & Designated Entry-Port Details",
            "detail": "Confirms arrival through Siem Reap-Angkor (SAI), Phnom Penh (PNH), or an e-Visa-approved land border.",
            "mandatory": true
          },
          {
            "id": "khm-hotel",
            "label": "Cambodia Hotel Address & Booking Confirmation",
            "detail": "Full hotel name, street, and city required on both the e-Visa form and the Cambodia e-Arrival card.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Border & Financial Backups",
        "items": [
          {
            "id": "khm-funds",
            "label": "Proof of Travel Funds & Return Ticket",
            "detail": "Printed onward flight out of Cambodia and bank/card evidence to present if requested at airport immigration.",
            "mandatory": true
          },
          {
            "id": "khm-insurance",
            "label": "Optional Comprehensive Travel Insurance",
            "detail": "Recommended for temple excursions, tuk-tuk transit, and regional medical evacuation cover."
          }
        ]
      }
    ]
  },
  {
    "slug": "sri-lanka",
    "country": "Sri Lanka",
    "isoCode": "LKA",
    "accentHex": "#2D5236",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Sri Lanka has periodically transitioned between its ETA portal and third-party e-Visa platforms and adjusted fee exemptions by nationality. Our desk confirms the live official portal and exact fee rule before you apply.",
    "checklist": [
      {
        "groupTitle": "Digital Application Essentials",
        "items": [
          {
            "id": "lka-passport",
            "label": "Valid Pakistani Passport Bio-Page Scan",
            "detail": "Passport meeting Sri Lankan remaining-validity rules from the date of arrival at Bandaranaike International Airport (CMB).",
            "mandatory": true
          },
          {
            "id": "lka-flight",
            "label": "Confirmed Return Flight Details",
            "detail": "Round-trip flight routing into Colombo (CMB) with planned entry and departure dates.",
            "mandatory": true
          },
          {
            "id": "lka-hotel",
            "label": "First-Night & Full-Trip Hotel Addresses",
            "detail": "Accurate hotel names and districts across Colombo, Kandy, Nuwara Eliya, or Bentota.",
            "mandatory": true
          },
          {
            "id": "lka-photo",
            "label": "Digital Portrait Photo (When Requested by Portal)",
            "detail": "Clean white-background photograph kept ready in case your active category requests an image upload."
          }
        ]
      },
      {
        "groupTitle": "Colombo Immigration Carry-On Pack",
        "items": [
          {
            "id": "lka-funds",
            "label": "Proof of Accessible Travel Funds",
            "detail": "Bank card or USD cash notes adequate for hotel bills, private driver hire, and daily expenses.",
            "mandatory": true
          },
          {
            "id": "lka-business",
            "label": "Sri Lankan Host Letter (For Business ETA)",
            "detail": "Required when applying under the short-term business category rather than pure tourism."
          }
        ]
      }
    ]
  },
  {
    "slug": "nepal",
    "country": "Nepal",
    "isoCode": "NPL",
    "accentHex": "#5E2C3B",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Nepal maintains distinct SAARC nationality provisions alongside online pre-arrival form requirements and Embassy of Nepal Islamabad filing options. Confirm the live rule for Pakistani ordinary passports before boarding.",
    "checklist": [
      {
        "groupTitle": "Core Identity & Pre-Arrival Papers",
        "items": [
          {
            "id": "npl-passport",
            "label": "Valid Pakistani Passport (Clean Pages & Validity)",
            "detail": "Machine-readable passport with required remaining validity and at least two blank pages for visa sticker and stamps.",
            "mandatory": true
          },
          {
            "id": "npl-form",
            "label": "Online Pre-Arrival Visa Form Receipt",
            "detail": "Barcode confirmation generated from Nepal’s Department of Immigration online portal within its active validity window before arrival or embassy submission.",
            "mandatory": true
          },
          {
            "id": "npl-photo",
            "label": "Recent Passport Photographs (White Background)",
            "detail": "Two printed copies plus a clean digital scan for visa forms and optional trekking permits (TIMS / national park entries).",
            "mandatory": true
          },
          {
            "id": "npl-bookings",
            "label": "Return Ticket & Kathmandu / Pokhara Hotel Bookings",
            "detail": "Shows full stay dates and verifiable local contact address in Nepal.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Trekking & Extended Stay Additions",
        "items": [
          {
            "id": "npl-insurance",
            "label": "High-Altitude Medical & Evacuation Insurance (For Trekkers)",
            "detail": "Standard city travel policies often cap altitude limits; trekkers heading above 3,000m need explicit helicopter evacuation cover."
          },
          {
            "id": "npl-cash",
            "label": "Clean Small-Denomination USD Notes",
            "detail": "Essential if settling any applicable arrival charges, national park fees, or permit counters in Kathmandu."
          }
        ]
      }
    ]
  },
  {
    "slug": "uzbekistan",
    "country": "Uzbekistan",
    "isoCode": "UZB",
    "accentHex": "#1E4B6E",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Uzbekistan visa requirements for Pakistani nationals (including whether a Ministry of Foreign Affairs Letter of Invitation / visa-support telex is required prior to embassy stamping or e-Visa eligibility) are regulated strictly by bilateral updates. We verify the live channel before collecting fees.",
    "checklist": [
      {
        "groupTitle": "Core Visa & Visa-Support Packet",
        "items": [
          {
            "id": "uzb-passport",
            "label": "Original Pakistani Passport & High-Res Scan",
            "detail": "Machine-readable passport with required validity beyond return date and clean blank pages.",
            "mandatory": true
          },
          {
            "id": "uzb-loi",
            "label": "Licensed Tour Operator Visa Support / LOI (Where Mandated)",
            "detail": "Official MFA-cleared invitation reference issued via an authorised Uzbek host or licensed tour operator when required for your nationality.",
            "mandatory": true
          },
          {
            "id": "uzb-photo",
            "label": "Recent Biometric Photographs",
            "detail": "Crisp white-background portrait matching Uzbek embassy specifications.",
            "mandatory": true
          },
          {
            "id": "uzb-cnic",
            "label": "CNIC & Occupation / Business Proof",
            "detail": "Employer letter on company letterhead or NTN business registration demonstrating home ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Travel & Hotel Registration Records",
        "items": [
          {
            "id": "uzb-flights",
            "label": "Return Flight Itinerary (Lahore / Islamabad → Tashkent)",
            "detail": "Consistent arrival and exit dates aligned with your visa-support validity window.",
            "mandatory": true
          },
          {
            "id": "uzb-hotels",
            "label": "Licensed Hotel Bookings Across Uzbekistan",
            "detail": "Every hotel in Uzbekistan issues a mandatory electronic registration slip (E-Mehmon) that you keep until departure.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "bahrain",
    "country": "Bahrain",
    "isoCode": "BHR",
    "accentHex": "#6E242E",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Bahrain’s Nationality, Passports & Residence Affairs (NPRA) adjusts eligible e-Visa tiers depending on whether you hold valid GCC residency, certain Western visas, or apply directly from Pakistan with bank-statement proof.",
    "checklist": [
      {
        "groupTitle": "NPRA Digital Application Documents",
        "items": [
          {
            "id": "bhr-passport",
            "label": "Valid Pakistani Passport Bio-Page Scan",
            "detail": "Clear colour scan with required validity beyond planned exit from Bahrain International Airport (BAH).",
            "mandatory": true
          },
          {
            "id": "bhr-bank",
            "label": "Recent Stamped Bank Statement (3 Months)",
            "detail": "Official statement in applicant’s name meeting NPRA minimum liquid balance threshold for direct Pakistan applications.",
            "mandatory": true
          },
          {
            "id": "bhr-flight",
            "label": "Confirmed Return Flight Booking",
            "detail": "Round-trip itinerary into Manama (BAH) matching your declared visit window.",
            "mandatory": true
          },
          {
            "id": "bhr-hotel",
            "label": "Hotel Booking or Bahrain Host CPR Copy",
            "detail": "Confirmed hotel reservation in Manama/Seef/Juffair, or front-and-back copy of your host’s Bahraini CPR ID card if staying with family.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Supporting Eligibility Boosters",
        "items": [
          {
            "id": "bhr-priorvisas",
            "label": "Copies of Valid US, UK, Schengen, or GCC Residence Visas (If Held)",
            "detail": "Strengthens NPRA assessment and may unlock broader multi-entry e-Visa tiers."
          },
          {
            "id": "bhr-work",
            "label": "Employer Letter or Business Proof",
            "detail": "Helpful if NPRA requests supplementary verification of occupation during review."
          }
        ]
      }
    ]
  },
  {
    "slug": "turkey",
    "country": "Turkey",
    "isoCode": "TUR",
    "accentHex": "#B8332A",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Standard Pakistani passport holders without a valid US, UK, Schengen, or Ireland visa must submit biometrics and physical documents at an authorised Anatolia VAC in Islamabad, Lahore, or Karachi. Travellers eligible for Turkey’s conditional e-Visa must also meet strict boarding checks at Pakistani departure airports (confirmed round-trip ticket, verifiable hotel booking, and proof of funds of at least USD 50 per day).",
    "checklist": [
      {
        "groupTitle": "Core Identity & Travel Papers",
        "items": [
          {
            "id": "tur-passport",
            "label": "Original Pakistani Passport & Prior Passports",
            "detail": "Valid at least 6 months with 2 blank visa pages plus copies of previous visas.",
            "mandatory": true
          },
          {
            "id": "tur-cnic",
            "label": "CNIC & NADRA Family Records (FRC / MRC)",
            "detail": "Clear front/back CNIC copy plus NADRA FRC and Marriage Certificate for families.",
            "mandatory": true
          },
          {
            "id": "tur-photos",
            "label": "Biometric Photographs (50×60 mm)",
            "detail": "Two recent white-background prints matching Anatolia VAC dimensions.",
            "mandatory": true
          },
          {
            "id": "tur-insurance",
            "label": "Travel Medical Insurance for Turkey",
            "detail": "Valid emergency medical policy covering your full travel dates in Turkey.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial & Employment Proof",
        "items": [
          {
            "id": "tur-bank",
            "label": "6-Month Stamped Bank Statement & AMC",
            "detail": "Recent personal statement stamped by the bank with signed Account Maintenance Certificate.",
            "mandatory": true
          },
          {
            "id": "tur-fbr",
            "label": "FBR NTN & Latest Income Tax Return",
            "detail": "Strengthens financial credibility for salaried and business applicants.",
            "mandatory": false
          },
          {
            "id": "tur-noc",
            "label": "Employer NOC & Salary Slips (or Business Proof)",
            "detail": "Company letterhead NOC + 3 salary slips, or business registration and company statement.",
            "mandatory": true
          },
          {
            "id": "tur-bookings",
            "label": "Return Flight Reservation & Hotel Bookings",
            "detail": "Verifiable reservations aligned with your Istanbul / Cappadocia daily itinerary.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "azerbaijan",
    "country": "Azerbaijan",
    "isoCode": "AZE",
    "accentHex": "#1F5C78",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Your Pakistani passport must have at least 6 months validity (minimum 3 months beyond your e-Visa expiry date). Remember: stays over 15 days require free online migration registration.",
    "checklist": [
      {
        "groupTitle": "Core Online e-Visa Requirements",
        "items": [
          {
            "id": "aze-passport",
            "label": "Pakistani Passport Bio Page Scan",
            "detail": "High-resolution colour scan of passport valid 6+ months with readable MRZ lines.",
            "mandatory": true
          },
          {
            "id": "aze-cnic",
            "label": "CNIC Copy & Pakistan Home Address",
            "detail": "Clear CNIC copy and residential details for the ASAN portal application.",
            "mandatory": true
          },
          {
            "id": "aze-email",
            "label": "Active Email & WhatsApp Number",
            "detail": "Used for official ASAN e-Visa PDF delivery and arrival instructions.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Arrival & Border Supporting Papers",
        "items": [
          {
            "id": "aze-hotel",
            "label": "Confirmed Baku / Gabala Hotel Booking",
            "detail": "Printed accommodation voucher matching your arrival and departure dates.",
            "mandatory": true
          },
          {
            "id": "aze-flight",
            "label": "Confirmed Return Flight Ticket",
            "detail": "Return itinerary (AZAL, PIA, or connecting carrier) checked at boarding.",
            "mandatory": true
          },
          {
            "id": "aze-cash",
            "label": "Travel Insurance & Travel Funds",
            "detail": "Recommended medical cover plus cards/cash for Heydar Aliyev Airport arrival.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "japan",
    "country": "Japan",
    "isoCode": "JPN",
    "accentHex": "#343A59",
    "channel": "Sticker / Embassy",
    "lastVerified": "",
    "eligibilityNote": "Japan enforces strict provincial embassy jurisdiction between Islamabad (Federal, Punjab, KP, AJK, GB) and Karachi (Sindh & Balochistan) and examines the daily Schedule of Stay (Taizai Yoteihyo) line by line.",
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
    ]
  },
  {
    "slug": "south-korea",
    "country": "South Korea",
    "isoCode": "KOR",
    "accentHex": "#274166",
    "channel": "Sticker / Embassy",
    "lastVerified": "",
    "eligibilityNote": "Pakistani nationals are not eligible for K-ETA visa-free entry; a formal C-3 visa granted prior to departure is mandatory, and visa officers review financial stability and employment ties thoroughly.",
    "checklist": [
      {
        "groupTitle": "Embassy Application & Personal Papers",
        "items": [
          {
            "id": "kor-passport",
            "label": "Original Pakistani Passport & Prior Travel Copies",
            "detail": "Current passport with clean pages plus copies of prior visas (OECD / Asian travel records help establish compliance).",
            "mandatory": true
          },
          {
            "id": "kor-form",
            "label": "Completed Korea Visa Application Form (e-Form / Official PDF)",
            "detail": "Filled completely in English with consistent residential, employment, and Korea host/hotel details.",
            "mandatory": true
          },
          {
            "id": "kor-photo",
            "label": "Recent Colour Photograph (35mm × 45mm)",
            "detail": "White background, front-facing matte photo taken within six months.",
            "mandatory": true
          },
          {
            "id": "kor-cnic",
            "label": "CNIC & NADRA Family Registration Certificate (FRC)",
            "detail": "Establishes personal identity and family ties anchored in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial, Tax & Trip Proof",
        "items": [
          {
            "id": "kor-bank",
            "label": "Six-Month Personal Bank Statement & Balance Certificate",
            "detail": "Bank-stamped statement showing authentic monthly salary or business inflows.",
            "mandatory": true
          },
          {
            "id": "kor-tax",
            "label": "FBR NTN & Recent Tax Returns",
            "detail": "Demonstrates documented tax-paying status in Pakistan.",
            "mandatory": true
          },
          {
            "id": "kor-work",
            "label": "Employer NOC & Pay Slips / Business Chamber Letter",
            "detail": "Confirms employment continuity, salary, and approved vacation window.",
            "mandatory": true
          },
          {
            "id": "kor-itinerary",
            "label": "Detailed Korea Itinerary, Flight & Hotel Bookings",
            "detail": "Day-by-day route across Seoul, Nami Island, Busan, or Jeju matching confirmed lodging.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "philippines",
    "country": "Philippines",
    "isoCode": "PHL",
    "accentHex": "#1F4F5A",
    "channel": "Sticker / Embassy",
    "lastVerified": "",
    "eligibilityNote": "Embassy of the Philippines visa officers review ties to Pakistan closely and may request in-person appearance or interview in Islamabad, plus authenticated invitation letters where a local host is involved.",
    "checklist": [
      {
        "groupTitle": "Embassy Forms & Personal Papers",
        "items": [
          {
            "id": "phl-passport",
            "label": "Original Pakistani Passport & Copies",
            "detail": "Machine-readable passport valid well beyond planned return date, plus copies of prior visas and entry stamps.",
            "mandatory": true
          },
          {
            "id": "phl-form",
            "label": "Completed Non-Immigrant Visa Application Form (FA Form No. 2)",
            "detail": "Typed cleanly without blanks, signed consistently with the passport signature.",
            "mandatory": true
          },
          {
            "id": "phl-photos",
            "label": "Recent Colour Passport Photographs",
            "detail": "Clean white backdrop, 2×2 inch format matching Philippine embassy requirements.",
            "mandatory": true
          },
          {
            "id": "phl-cnic",
            "label": "CNIC & NADRA Police Character Certificate (Where Requested)",
            "detail": "Colour CNIC copy; confirm with our team whether police clearance or additional attestations apply to your profile.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial, Work & Itinerary Proof",
        "items": [
          {
            "id": "phl-bank",
            "label": "Six-Month Bank Statement & Account Maintenance Letter",
            "detail": "Bank-stamped statement showing steady inflows matching your stated income.",
            "mandatory": true
          },
          {
            "id": "phl-work",
            "label": "Employment Certificate / Business Registration & Tax Returns",
            "detail": "Employer NOC with salary and leave approval, or NTN/Chamber registration and FBR returns for business owners.",
            "mandatory": true
          },
          {
            "id": "phl-bookings",
            "label": "Round-Trip Flight Reservation & Hotel Confirmations",
            "detail": "Realistic routing into Manila (MNL) or Cebu (CEB) with matching hotel dates across islands.",
            "mandatory": true
          },
          {
            "id": "phl-invite",
            "label": "Notarised Invitation / Affidavit of Support (If Visiting a Host)",
            "detail": "Required when staying with a Filipino citizen or resident rather than booking commercial hotels."
          }
        ]
      }
    ]
  },
  {
    "slug": "usa",
    "country": "United States",
    "isoCode": "USA",
    "accentHex": "#223A5E",
    "channel": "Interview / Consulate",
    "lastVerified": "",
    "eligibilityNote": "Under Section 214(b) of US immigration law, every B1/B2 decision hinges primarily on your DS-160 application and your brief live conversation with the visa officer—never on thick stacks of unrequested paper. Truthful, concise preparation is everything. Also note: interview-waiver (\"Dropbox\") renewal rules are tightly restricted (confirm current 12-month same-category eligibility), and STEM, medical, or engineering profiles can face Section 221(g) administrative processing lasting several weeks—apply 4–6 months ahead.",
    "checklist": [
      {
        "groupTitle": "Mandatory Consulate Appointment Items",
        "items": [
          {
            "id": "usa-passport",
            "label": "Valid Pakistani Passport & All Previous Passports",
            "detail": "Current passport plus expired passports showing prior US, UK, Schengen, or international travel compliance.",
            "mandatory": true
          },
          {
            "id": "usa-ds160",
            "label": "DS-160 Confirmation Page (With Barcode)",
            "detail": "Printed laser-quality confirmation page matching the exact confirmation number linked to your appointment profile.",
            "mandatory": true
          },
          {
            "id": "usa-appt",
            "label": "Official Appointment Confirmation & MRV Fee Receipt",
            "detail": "Generated directly from the official US visa scheduling portal for Embassy Islamabad or Consulate-General Karachi.",
            "mandatory": true
          },
          {
            "id": "usa-photo",
            "label": "Recent 2×2 Inch (51mm × 51mm) US-Spec Photograph",
            "detail": "White background, no eyeglasses, taken within six months—both digital upload for DS-160 and two printed copies for the window.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Supporting Evidence (Carry Organized, Present Only If Asked)",
        "items": [
          {
            "id": "usa-work",
            "label": "Employment Letter, Recent Pay Slips, or Business Registration",
            "detail": "Clean one-page summary of your role, tenure, salary/income, and business ties in Pakistan."
          },
          {
            "id": "usa-tax",
            "label": "FBR Tax Returns & Recent Bank Statement",
            "detail": "Kept neatly in a clear folder strictly as backup if the visa officer asks to inspect financial capacity."
          },
          {
            "id": "usa-purpose",
            "label": "Conference Registration, Graduation Letter, or Medical/Host Note",
            "detail": "Short, factual proof of why you are travelling on those specific dates."
          },
          {
            "id": "usa-family",
            "label": "NADRA FRC / Marriage Certificate & Property Summary",
            "detail": "Documents social and family anchors in Pakistan if queried during the interview."
          }
        ]
      }
    ]
  },
  {
    "slug": "canada",
    "country": "Canada",
    "isoCode": "CAN",
    "accentHex": "#9E2A2B",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Canadian visa officers evaluate every TRV file on paper without an in-person interview, placing decisive weight on purpose of visit, financial sustainability, prior international travel compliance, and compelling economic and family ties to Pakistan.",
    "checklist": [
      {
        "groupTitle": "IRCC Online Forms & Identity",
        "items": [
          {
            "id": "can-passport",
            "label": "Valid Pakistani Passport & All Previous Passports",
            "detail": "Complete scan of bio page plus every stamped page, visa sticker, and entry/exit record from the last ten years.",
            "mandatory": true
          },
          {
            "id": "can-imm-forms",
            "label": "IRCC Visitor Application & Family Information Forms (IMM 5257 / IMM 5645)",
            "detail": "Accurate digital completion with consistent education, employment, and ten-year travel history aligned to your CNIC and FRC.",
            "mandatory": true
          },
          {
            "id": "can-nadra",
            "label": "CNIC, NADRA FRC & Marriage Certificate",
            "detail": "Demonstrates immediate family ties in Pakistan and supports relationship verification when visiting relatives in Canada.",
            "mandatory": true
          },
          {
            "id": "can-sop",
            "label": "Structured Purpose of Travel & Home-Ties Letter",
            "detail": "Clear, factual narrative explaining trip dates, daily plan, funding source, and why you will return to Pakistan promptly.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial Strength, Tax & Host Evidence",
        "items": [
          {
            "id": "can-bank",
            "label": "Six-Month Personal Bank Statement & Maintenance Certificate",
            "detail": "Stamped bank statement with healthy closing balance, regular income inflows, and clear explanation for any significant credits.",
            "mandatory": true
          },
          {
            "id": "can-fbr",
            "label": "FBR NTN Registration & Recent Income Tax Returns (2–3 Years)",
            "detail": "Tax returns and wealth statement corroborating declared salary or business income plus immovable property/asset holdings.",
            "mandatory": true
          },
          {
            "id": "can-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed leave approval specifying return-to-work date, or SECP incorporation, Chamber certificate, and company bank statements.",
            "mandatory": true
          },
          {
            "id": "can-invite",
            "label": "Canadian Host Invitation, PR/Citizenship Proof & NOA (if visiting family)",
            "detail": "Signed invitation letter, host’s PR card or Canadian passport copy, Notice of Assessment (NOA), and proof of relationship.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "uk",
    "country": "United Kingdom",
    "isoCode": "GBR",
    "accentHex": "#1D3557",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "UK Visas and Immigration (UKVI) entry clearance officers scrutinise exact arithmetic between declared monthly income, living costs in Pakistan, total trip cost, and every non-salary credit appearing on your six-month bank statement.",
    "checklist": [
      {
        "groupTitle": "GOV.UK Application & Identity",
        "items": [
          {
            "id": "uk-passport",
            "label": "Valid Pakistani Passport & Prior Passports",
            "detail": "Original passport for biometric centre verification plus scans of prior UK, Schengen, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "uk-gov-form",
            "label": "Completed GOV.UK Standard Visitor Online Form",
            "detail": "Every income figure, monthly expense estimate, trip budget, and ten-year travel entry verified before payment.",
            "mandatory": true
          },
          {
            "id": "uk-nadra",
            "label": "CNIC, NADRA FRC & Marriage / Birth Certificates",
            "detail": "Establishes family ties in Pakistan and confirms relationship to UK sponsors or accompanying dependants.",
            "mandatory": true
          },
          {
            "id": "uk-cover",
            "label": "Detailed Cover Letter & Trip Cost Breakdown",
            "detail": "Explains itinerary, realistic GBP spending budget, any irregular bank transactions, and strong reasons to return.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial Provenance, Employment & UK Sponsor",
        "items": [
          {
            "id": "uk-bank",
            "label": "Six-Month Personal Bank Statement & Salary Slips",
            "detail": "Must show consistent salary or business credits matching your GOV.UK income declarations with zero unexplained cash jumps.",
            "mandatory": true
          },
          {
            "id": "uk-work-tax",
            "label": "Employer Leave Letter (NOC) / Business & FBR Tax Filings",
            "detail": "Signed HR letter confirming salary and leave dates, or SECP/NTN/Chamber proofs and filed FBR returns for owners.",
            "mandatory": true
          },
          {
            "id": "uk-accommodation",
            "label": "Hotel Confirmations or UK Sponsor Accommodation Pack",
            "detail": "Verifiable hotel bookings, or host invitation letter, UK passport/BRP/eVisa share code, and tenancy/mortgage proof.",
            "mandatory": true
          },
          {
            "id": "uk-property",
            "label": "Additional Home-Ties Evidence (Property / Dependants / Studies)",
            "detail": "Registry copies, university enrolment letters, or children’s school letters demonstrating ongoing commitments in Pakistan.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "australia",
    "country": "Australia",
    "isoCode": "AUS",
    "accentHex": "#1B5E63",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Australia issues electronic visas (no passport sticker) and assesses every Subclass 600 file strictly on uploaded documentary evidence proving Genuine Temporary Entrant (GTE) intent and financial capacity.",
    "checklist": [
      {
        "groupTitle": "ImmiAccount Application & Identity",
        "items": [
          {
            "id": "aus-passport",
            "label": "Valid Pakistani Passport & Prior Visa History",
            "detail": "High-resolution colour scans of your current bio page and all stamped pages from current and previous passports.",
            "mandatory": true
          },
          {
            "id": "aus-immi",
            "label": "Subclass 600 ImmiAccount Form & Form 54 Family Composition",
            "detail": "Accurate digital entries reconciled with your NADRA FRC, CNIC, and complete employment/education background.",
            "mandatory": true
          },
          {
            "id": "aus-nadra",
            "label": "CNIC, NADRA FRC & Marriage Certificate",
            "detail": "Verifies immediate family structure and anchors ongoing personal ties in Pakistan.",
            "mandatory": true
          },
          {
            "id": "aus-gte",
            "label": "Genuine Temporary Entrant (GTE) & Travel Plan Statement",
            "detail": "Structured written statement outlining trip purpose, realistic city schedule, funding, and compelling incentives to return.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial Evidence, Ties & Australian Host",
        "items": [
          {
            "id": "aus-bank",
            "label": "Six-Month Bank Statement & Account Maintenance Letter",
            "detail": "Stamped personal statement demonstrating genuine savings growth and steady income inflows.",
            "mandatory": true
          },
          {
            "id": "aus-work-tax",
            "label": "Employer NOC, Pay Slips & FBR Tax Returns",
            "detail": "Signed leave letter with salary verification, or business incorporation, Chamber certificate, and FBR ATL returns.",
            "mandatory": true
          },
          {
            "id": "aus-invite",
            "label": "Australian Host Invitation & Citizenship/PR Proof (if applicable)",
            "detail": "Signed invitation letter, host’s Australian passport or VEVO visa record, and proof of address or funding support.",
            "mandatory": false
          },
          {
            "id": "aus-health",
            "label": "Biometrics & Panel Medical Readiness (where requested)",
            "detail": "VFS biometrics notice is issued post-lodgement; older travellers or longer stays may also receive a HAP ID health exam request.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "new-zealand",
    "country": "New Zealand",
    "isoCode": "NZL",
    "accentHex": "#254E58",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Immigration New Zealand assesses Visitor Visas digitally on documentary merit, requiring clear evidence of bona fide visitor intent, sufficient funds per month of stay, and confirmed ties back to Pakistan.",
    "checklist": [
      {
        "groupTitle": "INZ Online Portal & Identity",
        "items": [
          {
            "id": "nzl-passport",
            "label": "Valid Pakistani Passport & Prior Travel Scans",
            "detail": "Valid at least 3 months past intended New Zealand departure plus clear colour scans of previous visas and entry stamps.",
            "mandatory": true
          },
          {
            "id": "nzl-photo",
            "label": "Digital Passport-Style Photograph (INZ Spec)",
            "detail": "High-resolution portrait on a plain light background meeting Immigration New Zealand automated quality checks.",
            "mandatory": true
          },
          {
            "id": "nzl-nadra",
            "label": "CNIC, NADRA FRC & Family Civil Documents",
            "detail": "Supports family-ties proof and verifies dependants when applying as a couple or family group.",
            "mandatory": true
          },
          {
            "id": "nzl-cover",
            "label": "Bona Fide Visitor Statement & Island Itinerary",
            "detail": "Day-by-day North/South Island travel plan with realistic internal flights or driving legs and return rationale.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial Maintenance, Ties & Sponsorship",
        "items": [
          {
            "id": "nzl-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Demonstrates readily accessible funds covering accommodation, daily living expenses, and onward/return flights.",
            "mandatory": true
          },
          {
            "id": "nzl-work-tax",
            "label": "Employer NOC & Pay Slips (or Business & FBR Tax Pack)",
            "detail": "Confirms approved leave and continuing employment, or SECP/NTN/Chamber proofs and filed tax returns.",
            "mandatory": true
          },
          {
            "id": "nzl-sponsor",
            "label": "INZ 1025 Sponsorship Form & Host Proof (if visiting family)",
            "detail": "Signed official sponsorship form from an eligible New Zealand citizen or resident host plus their residency and income evidence.",
            "mandatory": false
          },
          {
            "id": "nzl-medical",
            "label": "Chest X-Ray / Medical Clearance (if staying over 6 months)",
            "detail": "Short holidays rarely require panel medicals unless staying longer or meeting specific TB-screening criteria—confirmed live.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "germany",
    "country": "Germany",
    "isoCode": "DEU",
    "accentHex": "#2B3A42",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Germany enforces strict territorial jurisdiction in Pakistan between the Embassy in Islamabad and the Consulate General in Karachi based on your verified residential province.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "germany-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "germany-form",
            "label": "Harmonised Schengen Application Form (Germany)",
            "detail": "Completed via VIDEX Online Form & Authorised German Mission / Visa Centre Channel with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "germany-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "germany-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "germany-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "germany-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "germany-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "germany-itinerary",
            "label": "Cover Letter, Hotel Bookings & Formal Verpflichtungserklärung (Formal Obligation)",
            "detail": "Day-by-day route across Berlin, Munich, Frankfurt, Hamburg, Cologne, Düsseldorf, and Heidelberg with matching round-trip flight reservations; for sponsored visits include an original municipality-issued Verpflichtungserklärung from your German host or trade-fair Messe invitation.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "france",
    "country": "France",
    "isoCode": "FRA",
    "accentHex": "#23395B",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "All short-stay France applications from Pakistan begin on the official France-Visas portal before scheduling biometric submission at an authorised centre in Islamabad, Lahore, or Karachi.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "france-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "france-form",
            "label": "Harmonised Schengen Application Form (France)",
            "detail": "Completed via France-Visas Portal & Authorised Visa Centre (VFS Global / Gerry’s) with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "france-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "france-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "france-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "france-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "france-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "france-itinerary",
            "label": "Cover Letter, Hotel Bookings & Attestation d’accueil (Mairie Host Certificate)",
            "detail": "Day-by-day route across Paris, Nice, Lyon, Marseille, Cannes, Annecy, and Strasbourg with matching round-trip flight reservations; for sponsored visits include an original municipality-stamped Attestation d’accueil from your French host when staying in a private residence.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "greece",
    "country": "Greece",
    "isoCode": "GRC",
    "accentHex": "#1A5276",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Greece processes Pakistani Schengen applications through its authorised visa centres in Pakistan routed to the Embassy of Greece in Islamabad; summer appointment demand peaks sharply from March onward.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "greece-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "greece-form",
            "label": "Harmonised Schengen Application Form (Greece)",
            "detail": "Completed via Embassy of Greece Islamabad / Authorised Visa Centre (GVCW / VFS) with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "greece-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "greece-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "greece-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "greece-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "greece-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "greece-itinerary",
            "label": "Cover Letter, Hotel Bookings & Notarised Greek Host Declaration (Solemn Declaration)",
            "detail": "Day-by-day route across Athens, Santorini, Mykonos, Crete (Heraklion & Chania), Rhodes, and Thessaloniki with matching round-trip flight reservations; for sponsored visits include an official KEP/gov.gr verified host solemn declaration and residency proof if staying privately in Greece.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "portugal",
    "country": "Portugal",
    "isoCode": "PRT",
    "accentHex": "#1F614A",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Verify live appointment release calendars and authorised submission channels with our desk early, as Portugal visa slots from Pakistan fill rapidly across spring and summer.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "portugal-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "portugal-form",
            "label": "Harmonised Schengen Application Form (Portugal)",
            "detail": "Completed via Embassy of Portugal Islamabad / Authorised Visa Centre Channel with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "portugal-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "portugal-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "portugal-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "portugal-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "portugal-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "portugal-itinerary",
            "label": "Cover Letter, Hotel Bookings & Termo de Responsabilidade (Statement of Responsibility)",
            "detail": "Day-by-day route across Lisbon, Sintra, Porto, Cascais, Coimbra, and the Algarve (Faro & Lagos) with matching round-trip flight reservations; for sponsored visits include an authenticated Portuguese Termo de Responsabilidade plus host residency and income proofs where staying with a sponsor.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "hungary",
    "country": "Hungary",
    "isoCode": "HUN",
    "accentHex": "#8C3B2B",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Hungary evaluates Pakistani short-stay visa files through the Embassy in Islamabad via authorised visa centres; verify Main-Destination night counts if pairing Budapest with Vienna or Prague.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "hungary-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "hungary-form",
            "label": "Harmonised Schengen Application Form (Hungary)",
            "detail": "Completed via Embassy of Hungary Islamabad & Authorised Visa Centre (VFS Global) with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "hungary-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "hungary-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "hungary-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "hungary-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "hungary-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "hungary-itinerary",
            "label": "Cover Letter, Hotel Bookings & Official Letter of Invitation (NDGAP Verified)",
            "detail": "Day-by-day route across Budapest, Szentendre, Eger, Pécs, and Lake Balaton with matching round-trip flight reservations; for sponsored visits include an official invitation approved by Hungary’s National Directorate-General for Aliens Policing (NDGAP) when sponsored.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "poland",
    "country": "Poland",
    "isoCode": "POL",
    "accentHex": "#9A2E3A",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Poland manages visa appointment registration strictly through official e-Konsulat / authorised centre queues under the Embassy of Poland in Islamabad—watch slot releases early and never use unofficial agents.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "poland-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "poland-form",
            "label": "Harmonised Schengen Application Form (Poland)",
            "detail": "Completed via e-Konsulat System & Embassy of Poland Islamabad / Authorised Centre with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "poland-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "poland-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "poland-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "poland-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "poland-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "poland-itinerary",
            "label": "Cover Letter, Hotel Bookings & Voivodeship Registered Invitation (Zaproszenie)",
            "detail": "Day-by-day route across Warsaw, Kraków, Gdańsk, Wrocław, Zakopane, and Poznań with matching round-trip flight reservations; for sponsored visits include an official invitation registered with the local Polish Voivode office for sponsored family or private visits.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "netherlands",
    "country": "Netherlands",
    "isoCode": "NLD",
    "accentHex": "#B85D19",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Pakistani applicants complete the official Netherlands Schengen digital form before booking biometric submission at VFS Global in Islamabad, Lahore, or Karachi.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "netherlands-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "netherlands-form",
            "label": "Harmonised Schengen Application Form (Netherlands)",
            "detail": "Completed via Official Netherlands Visa Portal & VFS Global Centres with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "netherlands-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "netherlands-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "netherlands-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "netherlands-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "netherlands-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "netherlands-itinerary",
            "label": "Cover Letter, Hotel Bookings & Bewijs van garantstelling (Municipality Proof of Sponsorship)",
            "detail": "Day-by-day route across Amsterdam, Rotterdam, Utrecht, The Hague, Delft, and Haarlem with matching round-trip flight reservations; for sponsored visits include a Dutch municipality-legalised Proof of Sponsorship and/or Private Accommodation form plus host payslips.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "norway",
    "country": "Norway",
    "isoCode": "NOR",
    "accentHex": "#1D4E6B",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Norway requires completing and paying online through the official UDI Application Portal prior to booking your physical document drop-off and biometrics at VFS Global in Pakistan.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "norway-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "norway-form",
            "label": "Harmonised Schengen Application Form (Norway)",
            "detail": "Completed via UDI Application Portal & VFS Global Centres in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "norway-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "norway-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "norway-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "norway-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "norway-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "norway-itinerary",
            "label": "Cover Letter, Hotel Bookings & UDI Sponsorship Form (Garantiskjema for besøk)",
            "detail": "Day-by-day route across Oslo, Bergen, Flåm, Stavanger, Trondheim, and Tromsø with matching round-trip flight reservations; for sponsored visits include an official Norwegian police-stamped Sponsorship Form or digital UDI sponsor guarantee plus host tax/income records.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "denmark",
    "country": "Denmark",
    "isoCode": "DNK",
    "accentHex": "#8E2932",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Denmark assesses visa applications under specific country-group rules and requires online registration via ApplyVisa followed by biometric submission at VFS Global in Pakistan.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "denmark-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "denmark-form",
            "label": "Harmonised Schengen Application Form (Denmark)",
            "detail": "Completed via Official ApplyVisa Portal & VFS Global Centres in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "denmark-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "denmark-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "denmark-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "denmark-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "denmark-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "denmark-itinerary",
            "label": "Cover Letter, Hotel Bookings & Official VU2 (Private) or VU1 (Business) Invitation Form",
            "detail": "Day-by-day route across Copenhagen, Aarhus, Odense, Roskilde, and Helsingør with matching round-trip flight reservations; for sponsored visits include a digitally submitted MitID-signed VU2 family/friend invitation or VU1 corporate invitation with invitation ID.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "belgium",
    "country": "Belgium",
    "isoCode": "BEL",
    "accentHex": "#6E4C1E",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Short-stay Belgium filings from Pakistan start on the official Visa-on-Web (FPS Foreign Affairs) portal prior to biometric drop-off at VFS Global in Islamabad, Lahore, or Karachi.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "belgium-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "belgium-form",
            "label": "Harmonised Schengen Application Form (Belgium)",
            "detail": "Completed via Visa-on-Web (VOW) Portal & VFS Global Centres in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "belgium-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "belgium-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "belgium-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "belgium-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "belgium-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "belgium-itinerary",
            "label": "Cover Letter, Hotel Bookings & Annex 3bis (Engagement de prise en charge)",
            "detail": "Day-by-day route across Brussels, Bruges, Ghent, Antwerp, and Leuven with matching round-trip flight reservations; for sponsored visits include an original municipality-legalised Annex 3bis formal pledge of financial support plus Belgian host income proofs.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "luxembourg",
    "country": "Luxembourg",
    "isoCode": "LUX",
    "accentHex": "#2A627A",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Because Luxembourg handles short-stay Schengen visa representation in Pakistan through designated partner missions/visa centres, our desk confirms the exact live filing channel before you prepare forms.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "luxembourg-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "luxembourg-form",
            "label": "Harmonised Schengen Application Form (Luxembourg)",
            "detail": "Completed via Authorised Schengen Representation / VFS Global Channel in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "luxembourg-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "luxembourg-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "luxembourg-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "luxembourg-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "luxembourg-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "luxembourg-itinerary",
            "label": "Cover Letter, Hotel Bookings & Engagement de prise en charge (Ministry Certified)",
            "detail": "Day-by-day route across Luxembourg City, Vianden, Echternach, and the Moselle Valley with matching round-trip flight reservations; for sponsored visits include an official Luxembourg Ministry of Foreign Affairs validated Engagement de prise en charge from your host.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "finland",
    "country": "Finland",
    "isoCode": "FIN",
    "accentHex": "#214E78",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Finland processes short-stay Pakistani Schengen applications through its official online visa form and VFS Global biometric centres in Pakistan; verify active embassy processing windows ahead of winter Lapland peak.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "finland-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "finland-form",
            "label": "Harmonised Schengen Application Form (Finland)",
            "detail": "Completed via Finland Visa Portal & VFS Global Centres in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "finland-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "finland-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "finland-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "finland-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "finland-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "finland-itinerary",
            "label": "Cover Letter, Hotel Bookings & Signed Finnish Host Invitation & Residence Copy",
            "detail": "Day-by-day route across Helsinki, Rovaniemi (Lapland), Tampere, Turku, and Porvoo with matching round-trip flight reservations; for sponsored visits include a clear signed invitation from your host in Finland with their Finnish ID/residence permit copy and relationship proof.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "sweden",
    "country": "Sweden",
    "isoCode": "SWE",
    "accentHex": "#1F4B7A",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Sweden evaluates short-stay Pakistani visa files lodged via authorised VFS Global centres; confirm live processing channels and host Personbevis documentation before submitting.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "sweden-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "sweden-form",
            "label": "Harmonised Schengen Application Form (Sweden)",
            "detail": "Completed via Embassy of Sweden / Authorised VFS Global Centres in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "sweden-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "sweden-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "sweden-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "sweden-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "sweden-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "sweden-itinerary",
            "label": "Cover Letter, Hotel Bookings & Migrationsverket Invitation Form 241011 + Personbevis",
            "detail": "Day-by-day route across Stockholm, Gothenburg, Malmö, Uppsala, and Kiruna with matching round-trip flight reservations; for sponsored visits include completed Swedish Migration Agency Form 241011 paired with a fresh Skatteverket civic registration extract (Personbevis).",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "switzerland",
    "country": "Switzerland",
    "isoCode": "CHE",
    "accentHex": "#A62626",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "All short-stay Swiss visas from Pakistan are decided by the Embassy of Switzerland in Islamabad following biometric submission at authorised VFS Global centres across Pakistan.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "switzerland-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "switzerland-form",
            "label": "Harmonised Schengen Application Form (Switzerland)",
            "detail": "Completed via Swiss Online Visa System & VFS Global Centres in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "switzerland-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "switzerland-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "switzerland-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "switzerland-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "switzerland-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "switzerland-itinerary",
            "label": "Cover Letter, Hotel Bookings & Signed Swiss Host Invitation (Declaration of Sponsorship if requested)",
            "detail": "Day-by-day route across Zurich, Lucerne, Interlaken, Grindelwald, Zermatt, Geneva, and Montreux with matching round-trip flight reservations; for sponsored visits include a signed host invitation with Swiss passport/permit copy (plus municipality Declaration of Sponsorship only if requested by the Embassy).",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "austria",
    "country": "Austria",
    "isoCode": "AUT",
    "accentHex": "#9E2B25",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Austria processes Pakistani short-stay Schengen applications via VFS Global centres routed to the Embassy of Austria in Islamabad; verify EVE electronic sponsorship IDs ahead of your slot.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "austria-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "austria-form",
            "label": "Harmonised Schengen Application Form (Austria)",
            "detail": "Completed via Embassy of Austria Islamabad & VFS Global Centres in Pakistan with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "austria-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "austria-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "austria-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "austria-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "austria-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "austria-itinerary",
            "label": "Cover Letter, Hotel Bookings & Elektronische Verpflichtungserklärung (EVE ID)",
            "detail": "Day-by-day route across Vienna, Salzburg, Innsbruck, Hallstatt, Graz, and Zell am See with matching round-trip flight reservations; for sponsored visits include an official 8-digit EVE electronic declaration registered by your Austrian host at their local Aliens Police department.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "italy",
    "country": "Italy",
    "isoCode": "ITA",
    "accentHex": "#2A5C45",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Applications from Sindh and Balochistan route to the Consulate General of Italy in Karachi, while Federal, Punjab, KP, AJK, and GB route to the Embassy of Italy in Islamabad via authorised submission centres.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "italy-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "italy-form",
            "label": "Harmonised Schengen Application Form (Italy)",
            "detail": "Completed via Embassy of Italy Islamabad, Consulate Karachi & Authorised Visa Centres with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "italy-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "italy-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "italy-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "italy-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "italy-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "italy-itinerary",
            "label": "Cover Letter, Hotel Bookings & Lettera di Invito (Italian Host Invitation Form)",
            "detail": "Day-by-day route across Rome, Milan, Venice, Florence, Naples, Lake Como, and Bologna with matching round-trip flight reservations; for sponsored visits include an official signed Lettera di Invito accompanied by your Italian host’s Carta d’Identità or Permesso di Soggiorno copy.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "spain",
    "country": "Spain",
    "isoCode": "ESP",
    "accentHex": "#B23A2A",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "Spain processes short-stay Schengen visa applications from Pakistan exclusively through official BLS International centres in Islamabad, Lahore, and Karachi for review by the Embassy of Spain in Islamabad.",
    "checklist": [
      {
        "groupTitle": "Schengen Type-C Application & Identity",
        "items": [
          {
            "id": "spain-passport",
            "label": "Original Pakistani Passport & Prior Visa Copies",
            "detail": "Valid at least 3 months beyond your planned Schengen exit date with two blank pages, plus colour copies of prior Schengen, UK, US, or other international visas.",
            "mandatory": true
          },
          {
            "id": "spain-form",
            "label": "Harmonised Schengen Application Form (Spain)",
            "detail": "Completed via BLS International Spain Visa Application Centres (Pakistan) with exact passport spelling, matching arrival/exit dates, and applicant signatures.",
            "mandatory": true
          },
          {
            "id": "spain-photos",
            "label": "Two ICAO Biometric Photographs (35mm × 45mm)",
            "detail": "Recent matte prints on a light neutral background taken within six months, meeting European biometric framing rules.",
            "mandatory": true
          },
          {
            "id": "spain-nadra",
            "label": "CNIC, NADRA Family Registration Certificate (FRC) & Civil Proof",
            "detail": "Colour CNIC copy plus English NADRA FRC and Marriage Certificate / B-Form demonstrating family ties in Pakistan.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Insurance, Financial Ties & Host / Itinerary Pack",
        "items": [
          {
            "id": "spain-insurance",
            "label": "Schengen-Compliant Travel Medical Insurance (€30,000+)",
            "detail": "Covers emergency medical hospitalisation and repatriation across all Schengen member states for every single trip day with compliant wording.",
            "mandatory": true
          },
          {
            "id": "spain-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Branch-stamped personal bank statement paired with FBR NTN registration and recent income tax returns showing sustainable travel funds.",
            "mandatory": true
          },
          {
            "id": "spain-work",
            "label": "Employer NOC & Pay Slips (or Business Registration Pack)",
            "detail": "Signed HR leave letter confirming return-to-work dates and salary, or SECP/Chamber/NTN records for proprietors.",
            "mandatory": true
          },
          {
            "id": "spain-itinerary",
            "label": "Cover Letter, Hotel Bookings & Carta de Invitación (Police-Issued Spanish Invitation)",
            "detail": "Day-by-day route across Barcelona, Madrid, Seville, Granada, Cordoba, Valencia, and Malaga with matching round-trip flight reservations; for sponsored visits include an original Carta de Invitación issued by the Spanish National Police (Policía Nacional) for hosted stays with family or friends.",
            "mandatory": true
          }
        ]
      }
    ]
  },
  {
    "slug": "egypt",
    "country": "Egypt",
    "isoCode": "EGY",
    "accentHex": "#9A6324",
    "channel": "Sticker / Embassy",
    "lastVerified": "",
    "eligibilityNote": "Egypt enforces advance security-clearance review for Pakistani passport applications lodged in Islamabad, making early lead time and clean bank, employment, and hotel documentation essential.",
    "checklist": [
      {
        "groupTitle": "Embassy Application & Identity",
        "items": [
          {
            "id": "egy-passport",
            "label": "Original Pakistani Passport (6+ Months Validity)",
            "detail": "Must hold at least two blank visa pages alongside colour copies of the bio page and prior international visas.",
            "mandatory": true
          },
          {
            "id": "egy-form",
            "label": "Completed Embassy of Egypt Visa Application Form",
            "detail": "Typed cleanly with matching passport spelling, exact Egyptian hotel address, and signed applicant declaration.",
            "mandatory": true
          },
          {
            "id": "egy-photos",
            "label": "Recent White-Background Photographs (2×)",
            "detail": "Crisp matte embassy prints matching current Embassy of Egypt Islamabad size specifications.",
            "mandatory": true
          },
          {
            "id": "egy-cnic",
            "label": "CNIC & NADRA FRC Copies",
            "detail": "Valid national ID copies plus Family Registration Certificate when travelling with spouse or children.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial Ties & Egypt Travel Proof",
        "items": [
          {
            "id": "egy-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Demonstrates stable income and sufficient balance covering return flights, Nile tours, and hotel stays.",
            "mandatory": true
          },
          {
            "id": "egy-work",
            "label": "Employer NOC Letter (or Business NTN / Chamber Proof)",
            "detail": "Official company letterhead confirming designation, salary, and approved leave dates, or business registration and FBR returns.",
            "mandatory": true
          },
          {
            "id": "egy-bookings",
            "label": "Confirmed Return Flight Reservation & Hotel Vouchers",
            "detail": "Aligned Cairo, Luxor, or Sharm El Sheikh accommodation vouchers matching your daily itinerary.",
            "mandatory": true
          },
          {
            "id": "egy-invite",
            "label": "Authorised Egyptian Tour Agency / Business Invitation (where applicable)",
            "detail": "For corporate visits or guided group packages, an official Egyptian company invitation or licensed agency confirmation strengthens the file.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "morocco",
    "country": "Morocco",
    "isoCode": "MAR",
    "accentHex": "#A63A2B",
    "channel": "Sticker / Embassy",
    "lastVerified": "",
    "eligibilityNote": "Standard Pakistani passports require Embassy of Morocco Islamabad submission; applicants holding qualifying valid US, UK, Schengen, Canada, or Australia visas/residence permits should confirm live Acces Maroc e-Visa eligibility with our desk first.",
    "checklist": [
      {
        "groupTitle": "Embassy Forms & Identity",
        "items": [
          {
            "id": "mar-passport",
            "label": "Original Valid Pakistani Passport (6+ Months Validity)",
            "detail": "Include colour copies of the bio page plus valid or prior Schengen, UK, US, or Gulf visa pages.",
            "mandatory": true
          },
          {
            "id": "mar-form",
            "label": "Completed Kingdom of Morocco Visa Application Form",
            "detail": "Filled accurately in English or French with matching passport details and clear Moroccan accommodation addresses.",
            "mandatory": true
          },
          {
            "id": "mar-photos",
            "label": "Recent Colour Photographs (2× · 4cm × 3cm)",
            "detail": "Clear white background, matte finish, matching current Moroccan embassy photo rules.",
            "mandatory": true
          },
          {
            "id": "mar-cnic",
            "label": "CNIC & NADRA Family Registration Certificate",
            "detail": "Colour copies supporting identity and family travel ties.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial Proof, Insurance & Itinerary",
        "items": [
          {
            "id": "mar-bank",
            "label": "Six-Month Stamped Bank Statement & Maintenance Certificate",
            "detail": "Personal bank statement showing steady income and comfortable reserves for flights, riads, and domestic rail.",
            "mandatory": true
          },
          {
            "id": "mar-work",
            "label": "Employer NOC & Salary Slips (or Business NTN / Chamber Papers)",
            "detail": "Verifies ongoing employment or registered Pakistani business activity and approved vacation window.",
            "mandatory": true
          },
          {
            "id": "mar-bookings",
            "label": "Return Flight Reservation, Riad/Hotel Bookings & Travel Insurance",
            "detail": "Date-aligned bookings across Casablanca, Marrakech, Fes, or Rabat paired with worldwide emergency medical cover.",
            "mandatory": true
          },
          {
            "id": "mar-invite",
            "label": "Business Invitation or Authorised Tour Voucher (if applicable)",
            "detail": "Official Moroccan host company invitation for business visits or licensed tour confirmation for Sahara excursions.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "kenya",
    "country": "Kenya",
    "isoCode": "KEN",
    "accentHex": "#2E6B3E",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Kenya replaced legacy e-Visas with its mandatory online Electronic Travel Authorisation (eTA) system; every traveller—including minors—requires an approved digital eTA PDF before airline check-in from Pakistan.",
    "checklist": [
      {
        "groupTitle": "Kenya eTA Portal & Identity",
        "items": [
          {
            "id": "ken-passport",
            "label": "Valid Pakistani Passport (6+ Months Validity)",
            "detail": "Clear colour scan of the bio page with at least two blank pages for Jomo Kenyatta / Moi airport entry stamps.",
            "mandatory": true
          },
          {
            "id": "ken-photo",
            "label": "Recent Digital Passport Photo / Selfie (Light Background)",
            "detail": "High-contrast portrait without shadows or eyewear meeting Kenya eTA portal biometric upload checks.",
            "mandatory": true
          },
          {
            "id": "ken-flights",
            "label": "Confirmed Return / Onward Flight Itinerary",
            "detail": "Must display passenger name matching your passport and exact arrival/departure dates for Nairobi or Mombasa.",
            "mandatory": true
          },
          {
            "id": "ken-lodging",
            "label": "Hotel, Safari Lodge, or Host Invitation Confirmation",
            "detail": "Verifiable accommodation bookings or Kenyan host invitation letter + host national ID / alien card copy.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Health, Purpose & Supporting Records",
        "items": [
          {
            "id": "ken-health",
            "label": "Yellow Fever / Polio Vaccination Certificate Check",
            "detail": "Pakistani travellers must carry a valid Oral Polio Vaccination (OPV/IPV) certificate where required for exit, plus Yellow Fever proof if transiting endemic countries.",
            "mandatory": true
          },
          {
            "id": "ken-funds",
            "label": "Financial Proof / Recent Bank Statement",
            "detail": "Readily available statement or card balance demonstrating trip funding during eTA vetting or arrival inspection.",
            "mandatory": false
          },
          {
            "id": "ken-business",
            "label": "Kenyan Business Invitation & Company Registration (Business Visits)",
            "detail": "Required on company letterhead for trade, tea-auction, or conference travel to Nairobi or Mombasa.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "south-africa",
    "country": "South Africa",
    "isoCode": "ZAF",
    "accentHex": "#1F5C48",
    "channel": "Hybrid / Centre",
    "lastVerified": "",
    "eligibilityNote": "South African embassy desks strictly inspect stamped bank statements (recent 3–6 months), original wet-ink signatures on Form DHA-84, and verifiable accommodation or host documentation.",
    "checklist": [
      {
        "groupTitle": "DHA-84 Form & Identity",
        "items": [
          {
            "id": "zaf-passport",
            "label": "Original Pakistani Passport (2+ Blank Visa Pages)",
            "detail": "Valid at least 30 days beyond planned exit (6+ months strongly advised) plus copies of bio page and prior visas.",
            "mandatory": true
          },
          {
            "id": "zaf-form",
            "label": "Completed & Signed Form BI-84 / DHA-84",
            "detail": "Filled strictly in black ink / clean typed format with zero corrections and matching passport particulars.",
            "mandatory": true
          },
          {
            "id": "zaf-photos",
            "label": "Recent White-Background Photographs (2× · 35mm × 45mm)",
            "detail": "Unedited biometric prints matching South African High Commission guidelines.",
            "mandatory": true
          },
          {
            "id": "zaf-nadra",
            "label": "CNIC, NADRA FRC & Unabridged Birth Certificates (Minors)",
            "detail": "South Africa enforces strict minor-travel rules requiring unabridged birth certificates and parental consent affidavits when children travel.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Financial Strength, Ties & Travel Proof",
        "items": [
          {
            "id": "zaf-bank",
            "label": "Recent Bank-Stamped Statement (3–6 Months) & Maintenance Letter",
            "detail": "Every page officially stamped and signed by your Pakistani bank branch showing consistent balance and income.",
            "mandatory": true
          },
          {
            "id": "zaf-work",
            "label": "Employer NOC & Pay Slips (or Business NTN / Chamber Papers)",
            "detail": "Confirms approved leave dates, salary, and continuing ties in Pakistan, or SECP/NTN/Chamber documentation for owners.",
            "mandatory": true
          },
          {
            "id": "zaf-bookings",
            "label": "Return Flight Reservation, Hotel Confirmations & Cover Letter",
            "detail": "Clear day-by-day Cape Town/Johannesburg/Kruger plan matching accommodation bookings and travel medical insurance.",
            "mandatory": true
          },
          {
            "id": "zaf-invite",
            "label": "South African Host Invitation + Certified ID & Utility Bill (if visiting)",
            "detail": "Signed invitation letter paired with police-certified host ID/passport copy and recent proof of South African residence.",
            "mandatory": false
          }
        ]
      }
    ]
  },
  {
    "slug": "zimbabwe",
    "country": "Zimbabwe",
    "isoCode": "ZWE",
    "accentHex": "#7A542E",
    "channel": "e-Visa",
    "lastVerified": "",
    "eligibilityNote": "Pakistani citizens fall under Zimbabwe’s pre-clearance visa regime and must secure an approved e-Visa confirmation letter prior to boarding rather than expecting visa-on-arrival at Harare or Victoria Falls.",
    "checklist": [
      {
        "groupTitle": "Zimbabwe e-Visa Portal & Identity",
        "items": [
          {
            "id": "zwe-passport",
            "label": "Valid Pakistani Passport (6+ Months Validity)",
            "detail": "Clear colour scan of the bio page with at least two blank pages for entry stamps at Victoria Falls or Harare.",
            "mandatory": true
          },
          {
            "id": "zwe-photo",
            "label": "Recent Digital Passport Photograph",
            "detail": "Plain white background digital portrait formatted to Zimbabwe e-Visa portal file-size limits.",
            "mandatory": true
          },
          {
            "id": "zwe-residence",
            "label": "Proof of Residence in Pakistan (CNIC / Utility Bill)",
            "detail": "Confirms residential address matching your e-Visa application form.",
            "mandatory": true
          },
          {
            "id": "zwe-flights",
            "label": "Return / Onward Flight Reservation",
            "detail": "Verifiable itinerary showing entry and exit via Harare or Victoria Falls International Airport.",
            "mandatory": true
          }
        ]
      },
      {
        "groupTitle": "Accommodation, Funds & Host Papers",
        "items": [
          {
            "id": "zwe-lodging",
            "label": "Confirmed Hotel / Safari Lodge Booking (or Host Invitation)",
            "detail": "Paid or confirmed Victoria Falls/Harare hotel voucher, or signed host invitation letter with host ID and proof of address.",
            "mandatory": true
          },
          {
            "id": "zwe-bank",
            "label": "Recent Bank Statement & Employer / Business Letter",
            "detail": "Demonstrates financial self-sufficiency and continuing employment or commercial ties in Pakistan.",
            "mandatory": true
          },
          {
            "id": "zwe-business",
            "label": "Zimbabwean Company Invitation & Certificate (Business Visits)",
            "detail": "Official invitation on Zimbabwean company letterhead plus registration proof for commercial visits.",
            "mandatory": false
          }
        ]
      }
    ]
  }
];
