import type { RegionId, VisaChannel } from './types';

export interface DestinationSummary {
  slug: string;
  country: string;
  isoCode: string;
  region: RegionId;
  channel: VisaChannel;
  accentHex: string;
  heroPromise: string;
  facts: {
    visaType: string;
    entryType: string;
    stayDuration: string;
    processingTime: string;
    govtFee: string;
  };
}

export const REGIONS: RegionId[] = [
  "Europe & UK",
  "North America",
  "Oceania",
  "Africa",
  "Southeast Asia",
  "South Asia",
  "Central Asia & Gulf",
  "East Asia"
];

export const VISA_CHANNELS: VisaChannel[] = [
  "e-Visa",
  "Hybrid / Centre",
  "Sticker / Embassy",
  "Interview / Consulate"
];

/**
 * Lightweight metadata index for all 42 destinations.
 * Keeps global shell (Header, Footer, Cards, Forms) small without bundling full country guides.
 */
export const DESTINATION_SUMMARIES: readonly DestinationSummary[] = [
  {
    "slug": "thailand",
    "country": "Thailand",
    "isoCode": "THA",
    "region": "Southeast Asia",
    "channel": "Hybrid / Centre",
    "accentHex": "#1D5248",
    "heroPromise": "Structured file preparation, bank-statement review, and authorised submission guidance for Pakistani travellers heading to Bangkok, Phuket, Krabi, or Chiang Mai.",
    "facts": {
      "visaType": "Tourist Visa (TR) / e-Visa channel",
      "entryType": "Single or Multiple Entry (category-dependent)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "malaysia",
    "country": "Malaysia",
    "isoCode": "MYS",
    "region": "Southeast Asia",
    "channel": "e-Visa",
    "accentHex": "#1D4B64",
    "heroPromise": "Clean Malaysia e-Visa filing and MDAC arrival guidance for Pakistani travellers visiting Kuala Lumpur, Langkawi, Penang, and Genting Highlands.",
    "facts": {
      "visaType": "Malaysia Tourist e-Visa",
      "entryType": "Single or Multiple Entry (subject to eligibility)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "indonesia",
    "country": "Indonesia",
    "isoCode": "IDN",
    "region": "Southeast Asia",
    "channel": "e-Visa",
    "accentHex": "#6B3828",
    "heroPromise": "Guidance on Indonesian tourist e-Visas, sponsorship rules, and Bali arrival requirements for Pakistani travellers planning island escapes or Jakarta visits.",
    "facts": {
      "visaType": "Visitor e-Visa (C1 / Tourist Category)",
      "entryType": "Single Entry (standard tourist category)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "singapore",
    "country": "Singapore",
    "isoCode": "SGP",
    "region": "Southeast Asia",
    "channel": "Hybrid / Centre",
    "accentHex": "#7A2832",
    "heroPromise": "Authorised-channel guidance, Form 14A precision, and sponsor or hotel file assembly for Pakistani travellers heading to Singapore.",
    "facts": {
      "visaType": "Singapore Entry Visa (Assessment Level II)",
      "entryType": "Single or Multiple Entry (at ICA discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "cambodia",
    "country": "Cambodia",
    "isoCode": "KHM",
    "region": "Southeast Asia",
    "channel": "e-Visa",
    "accentHex": "#5A3E2B",
    "heroPromise": "Straightforward Cambodia tourist e-Visa filing, port-of-entry verification, and Cambodia e-Arrival prep for Pakistani travellers visiting Siem Reap and Phnom Penh.",
    "facts": {
      "visaType": "Cambodia Tourist e-Visa (Type T)",
      "entryType": "Single Entry",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "sri-lanka",
    "country": "Sri Lanka",
    "isoCode": "LKA",
    "region": "South Asia",
    "channel": "e-Visa",
    "accentHex": "#2D5236",
    "heroPromise": "Clean Sri Lanka ETA / tourist e-Visa preparation and Colombo arrival guidance for Pakistani families, cricket fans, and tea-country travellers.",
    "facts": {
      "visaType": "Sri Lanka Tourist ETA / e-Visa",
      "entryType": "Double Entry (standard short-stay tourist category, confirm active rule)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "nepal",
    "country": "Nepal",
    "isoCode": "NPL",
    "region": "South Asia",
    "channel": "Hybrid / Centre",
    "accentHex": "#5E2C3B",
    "heroPromise": "Clear pre-departure visa preparation, Kathmandu embassy or arrival-procedure checks, and Himalayan trek logistics for Pakistani visitors to Nepal.",
    "facts": {
      "visaType": "Nepal Tourist Visa (SAARC / Embassy or Arrival Rule Check)",
      "entryType": "Single or Multiple Entry (subject to active immigration rule)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "uzbekistan",
    "country": "Uzbekistan",
    "isoCode": "UZB",
    "region": "Central Asia & Gulf",
    "channel": "Hybrid / Centre",
    "accentHex": "#1E4B6E",
    "heroPromise": "Step-by-step Uzbekistan tourist visa guidance—LOI verification, embassy or e-Visa pathway checks, and Silk Road rail planning for Pakistani travellers.",
    "facts": {
      "visaType": "Uzbekistan Tourist Visa (LOI / Embassy or e-Visa Channel Check)",
      "entryType": "Single or Double Entry (category-dependent)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "bahrain",
    "country": "Bahrain",
    "isoCode": "BHR",
    "region": "Central Asia & Gulf",
    "channel": "e-Visa",
    "accentHex": "#6E242E",
    "heroPromise": "Accurate Bahrain e-Visa filing, GCC residency check, and bank-statement preparation for Pakistani visitors travelling to Manama for leisure, family, or business.",
    "facts": {
      "visaType": "Bahrain Visit e-Visa (NPRA Portal)",
      "entryType": "Single or Multiple Entry (subject to NPRA category)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "turkey",
    "country": "Turkey",
    "isoCode": "TUR",
    "region": "Central Asia & Gulf",
    "channel": "Hybrid / Centre",
    "accentHex": "#B8332A",
    "heroPromise": "Turkey sticker visa and conditional e-Visa guidance for Pakistani passport holders—Anatolia VAC appointment prep, bank statement audit, and Istanbul & Cappadocia itineraries.",
    "facts": {
      "visaType": "Sticker Visa (Anatolia VAC) / Conditional e-Visa",
      "entryType": "Single or Multiple Entry (embassy discretion)",
      "stayDuration": "Up to 30 days typical",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "azerbaijan",
    "country": "Azerbaijan",
    "isoCode": "AZE",
    "region": "Central Asia & Gulf",
    "channel": "e-Visa",
    "accentHex": "#1F5C78",
    "heroPromise": "Fast online Azerbaijan ASAN e-Visa filing for Pakistani passport holders—clean passport scan verification, 3-working-day standard or urgent processing, and Baku & Gabala travel prep.",
    "facts": {
      "visaType": "ASAN Electronic Visa (e-Visa)",
      "entryType": "Single Entry",
      "stayDuration": "Up to 30 days",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "japan",
    "country": "Japan",
    "isoCode": "JPN",
    "region": "East Asia",
    "channel": "Sticker / Embassy",
    "accentHex": "#343A59",
    "heroPromise": "Meticulous embassy-order visa file assembly, day-by-day Schedule of Stay drafting, and financial auditing for Pakistani travellers applying to visit Japan.",
    "facts": {
      "visaType": "Temporary Visitor Visa (Short-Term Tourism / Business / Family)",
      "entryType": "Single or Multiple Entry (embassy discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "south-korea",
    "country": "South Korea",
    "isoCode": "KOR",
    "region": "East Asia",
    "channel": "Sticker / Embassy",
    "accentHex": "#274166",
    "heroPromise": "Structured C-3-9 tourist and C-3-4 business visa file preparation for Pakistani travellers visiting Seoul, Busan, and Jeju Island.",
    "facts": {
      "visaType": "Short-Term General (C-3-9 Tourist / C-3-4 Business)",
      "entryType": "Single or Multiple Entry (embassy discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "philippines",
    "country": "Philippines",
    "isoCode": "PHL",
    "region": "Southeast Asia",
    "channel": "Sticker / Embassy",
    "accentHex": "#1F4F5A",
    "heroPromise": "Complete embassy-packet preparation, notarisation checks, and eTravel guidance for Pakistani passport holders applying for a Philippines temporary visitor visa.",
    "facts": {
      "visaType": "Temporary Visitor Visa (9(a) Tourist / Business)",
      "entryType": "Single or Multiple Entry (embassy discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "usa",
    "country": "United States",
    "isoCode": "USA",
    "region": "North America",
    "channel": "Interview / Consulate",
    "accentHex": "#223A5E",
    "heroPromise": "Disciplined B1/B2 visitor visa guidance, accurate DS-160 drafting, official appointment scheduling support, and realistic embassy interview coaching for Pakistani applicants.",
    "facts": {
      "visaType": "B1/B2 Non-Immigrant Visitor Visa (Business / Tourism)",
      "entryType": "Multiple or Single Entry (visa officer discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "canada",
    "country": "Canada",
    "isoCode": "CAN",
    "region": "North America",
    "channel": "Hybrid / Centre",
    "accentHex": "#9E2A2B",
    "heroPromise": "IRCC portal drafting, home-ties statement of purpose structuring, financial provenance auditing, and VFS Global biometrics preparation for Pakistani applicants visiting Canada.",
    "facts": {
      "visaType": "Temporary Resident Visa (TRV · Tourism / Family / Business)",
      "entryType": "Single or Multiple Entry (up to passport validity · officer discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "uk",
    "country": "United Kingdom",
    "isoCode": "GBR",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#1D3557",
    "heroPromise": "Precision GOV.UK Standard Visitor Visa drafting, bank-to-salary reconciliation, sponsor paperwork auditing, and VFS Global biometric prep for Pakistani applicants.",
    "facts": {
      "visaType": "UK Standard Visitor Visa (Tourism / Family / Business)",
      "entryType": "Multiple Entry (6-Month, 2-Year, 5-Year or 10-Year tiers)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "australia",
    "country": "Australia",
    "isoCode": "AUS",
    "region": "Oceania",
    "channel": "Hybrid / Centre",
    "accentHex": "#1B5E63",
    "heroPromise": "ImmiAccount Subclass 600 Visitor Visa filing, Genuine Temporary Entrant documentation, financial audit, and VFS Global biometrics preparation from Pakistan.",
    "facts": {
      "visaType": "Visitor Visa (Subclass 600 · Tourist / Sponsored Family / Business)",
      "entryType": "Single or Multiple Entry (electronic visa linked to passport)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "new-zealand",
    "country": "New Zealand",
    "isoCode": "NZL",
    "region": "Oceania",
    "channel": "e-Visa",
    "accentHex": "#254E58",
    "heroPromise": "Immigration New Zealand online Visitor Visa drafting, genuine tourist intent letters, bank-statement auditing, and NZTD arrival preparation for Pakistani travellers.",
    "facts": {
      "visaType": "New Zealand Visitor Visa (Online eVisa · Tourism / Family / Business)",
      "entryType": "Single or Multiple Entry (electronic approval)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "schengen-states",
    "country": "Schengen States",
    "isoCode": "SCH",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#0F5C4B",
    "heroPromise": "Complete multi-country Schengen Area (29 States) Type-C visa file auditing, Main-Destination embassy selection, €30,000 travel insurance alignment, and official VFS/BLS guidance from Pakistan.",
    "facts": {
      "visaType": "Schengen Short-Stay Visa (Type-C · 29 Member States)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "germany",
    "country": "Germany",
    "isoCode": "DEU",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#2B3A42",
    "heroPromise": "Precision Germany Schengen (VIDEX) form drafting, Islamabad vs Karachi embassy jurisdiction checks, trade-fair (Messe) invitations, and Verpflichtungserklärung review for Pakistani travellers.",
    "facts": {
      "visaType": "Germany Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "france",
    "country": "France",
    "isoCode": "FRA",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#23395B",
    "heroPromise": "France-Visas portal form drafting, Paris & French Riviera day-by-day itinerary alignment, Attestation d’accueil host checks, and official visa-centre preparation from Pakistan.",
    "facts": {
      "visaType": "France Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "greece",
    "country": "Greece",
    "isoCode": "GRC",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#1A5276",
    "heroPromise": "Structured Greece Schengen visa file drafting, Athens & Aegean island (Santorini, Mykonos, Crete) transit alignment, and official visa-centre preparation for Pakistani travellers.",
    "facts": {
      "visaType": "Greece Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "portugal",
    "country": "Portugal",
    "isoCode": "PRT",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#1F614A",
    "heroPromise": "Portugal Schengen Type-C file preparation, Lisbon, Porto & Algarve itinerary drafting, bank-statement auditing, and official mission/centre guidance from Pakistan.",
    "facts": {
      "visaType": "Portugal Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "hungary",
    "country": "Hungary",
    "isoCode": "HUN",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#8C3B2B",
    "heroPromise": "Hungary Schengen Type-C visa file preparation, Budapest & Central European rail itinerary structuring, financial auditing, and official visa-centre guidance from Pakistan.",
    "facts": {
      "visaType": "Hungary Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "poland",
    "country": "Poland",
    "isoCode": "POL",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#9A2E3A",
    "heroPromise": "Poland Schengen Type-C visa file auditing, e-Konsulat form precision, Voivodeship invitation verification, and Warsaw/Kraków itinerary planning for Pakistani passport holders.",
    "facts": {
      "visaType": "Poland Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "netherlands",
    "country": "Netherlands",
    "isoCode": "NLD",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#B85D19",
    "heroPromise": "Netherlands Schengen online form preparation, Amsterdam & Benelux itinerary structuring, financial auditing, and official VFS Global biometric guidance across Pakistan.",
    "facts": {
      "visaType": "Netherlands Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "norway",
    "country": "Norway",
    "isoCode": "NOR",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#1D4E6B",
    "heroPromise": "UDI Application Portal drafting, Norwegian family-sponsorship verification, fjord itinerary alignment, and VFS Global biometric preparation for Pakistani passport holders.",
    "facts": {
      "visaType": "Norway Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "denmark",
    "country": "Denmark",
    "isoCode": "DNK",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#8E2932",
    "heroPromise": "ApplyVisa portal drafting, official VU1/VU2 invitation verification, six-month financial auditing, and VFS Global biometric prep for Pakistani applicants heading to Denmark.",
    "facts": {
      "visaType": "Denmark Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "belgium",
    "country": "Belgium",
    "isoCode": "BEL",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#6E4C1E",
    "heroPromise": "Belgium Visa-on-Web drafting, Annex 3bis sponsorship verification, Brussels EU/corporate invitation checks, and official VFS Global preparation from Pakistan.",
    "facts": {
      "visaType": "Belgium Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "luxembourg",
    "country": "Luxembourg",
    "isoCode": "LUX",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#2A627A",
    "heroPromise": "Luxembourg Schengen Type-C representation verification, Engagement de prise en charge review, financial auditing, and Benelux route planning for Pakistani applicants.",
    "facts": {
      "visaType": "Luxembourg Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "finland",
    "country": "Finland",
    "isoCode": "FIN",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#214E78",
    "heroPromise": "Finland Schengen portal drafting, Helsinki & Lapland Aurora itinerary alignment, six-month bank auditing, and official VFS Global preparation for Pakistani citizens.",
    "facts": {
      "visaType": "Finland Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "sweden",
    "country": "Sweden",
    "isoCode": "SWE",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#1F4B7A",
    "heroPromise": "Sweden Schengen visa file preparation, Migrationsverket Form 241011 invitation verification, six-month bank auditing, and official VFS Global guidance across Pakistan.",
    "facts": {
      "visaType": "Sweden Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "switzerland",
    "country": "Switzerland",
    "isoCode": "CHE",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#A62626",
    "heroPromise": "Switzerland Schengen form drafting, Zurich, Lucerne & Interlaken alpine itinerary alignment, financial ratio auditing, and official VFS Global preparation from Pakistan.",
    "facts": {
      "visaType": "Switzerland Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "austria",
    "country": "Austria",
    "isoCode": "AUT",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#9E2B25",
    "heroPromise": "Austria Schengen visa file preparation, Vienna, Salzburg & Hallstatt itinerary alignment, EVE electronic sponsorship checks, and VFS Global biometric guidance from Pakistan.",
    "facts": {
      "visaType": "Austria Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "italy",
    "country": "Italy",
    "isoCode": "ITA",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#2A5C45",
    "heroPromise": "Italy Schengen visa file preparation, Rome, Milan, Florence & Venice itinerary alignment, financial ratio checks, and official appointment guidance from Pakistan.",
    "facts": {
      "visaType": "Italy Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "spain",
    "country": "Spain",
    "isoCode": "ESP",
    "region": "Europe & UK",
    "channel": "Hybrid / Centre",
    "accentHex": "#B23A2A",
    "heroPromise": "Spain Schengen visa preparation, official BLS International appointment guidance across Islamabad, Lahore & Karachi, and clean Barcelona, Madrid & Andalusia itineraries from Pakistan.",
    "facts": {
      "visaType": "Spain Schengen Short-Stay Visa (Type-C)",
      "entryType": "Single or Multiple Entry (up to 90 days in any 180-day period)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "egypt",
    "country": "Egypt",
    "isoCode": "EGY",
    "region": "Africa",
    "channel": "Sticker / Embassy",
    "accentHex": "#9A6324",
    "heroPromise": "Embassy of Egypt Islamabad visa file assembly, security-clearance timeline planning, and Nile & Red Sea itinerary structuring for Pakistani passport holders.",
    "facts": {
      "visaType": "Egypt Short-Term Tourist / Business Sticker Visa",
      "entryType": "Single or Multiple Entry (embassy discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "morocco",
    "country": "Morocco",
    "isoCode": "MAR",
    "region": "Africa",
    "channel": "Sticker / Embassy",
    "accentHex": "#A63A2B",
    "heroPromise": "Embassy of Morocco Islamabad visa file drafting, bank-statement auditing, and Marrakech, Fes & Casablanca itinerary alignment for Pakistani citizens.",
    "facts": {
      "visaType": "Morocco Short-Stay Tourist / Business Visa",
      "entryType": "Single or Multiple Entry (embassy discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "kenya",
    "country": "Kenya",
    "isoCode": "KEN",
    "region": "Africa",
    "channel": "e-Visa",
    "accentHex": "#2E6B3E",
    "heroPromise": "Official Kenya Electronic Travel Authorisation (eTA) preparation, safari & Nairobi itinerary alignment, and health-certificate checks for Pakistani passport holders.",
    "facts": {
      "visaType": "Kenya Electronic Travel Authorisation (eTA · Tourism / Business)",
      "entryType": "Single Entry (digital pre-travel authorisation)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "south-africa",
    "country": "South Africa",
    "isoCode": "ZAF",
    "region": "Africa",
    "channel": "Hybrid / Centre",
    "accentHex": "#1F5C48",
    "heroPromise": "High Commission of South Africa & VFS Global visa file assembly, bank-statement auditing, and Cape Town & Kruger itinerary prep for Pakistani citizens.",
    "facts": {
      "visaType": "South Africa Visitor Visa (DHA-84 · Tourism / Business / Family)",
      "entryType": "Single or Multiple Entry (embassy discretion)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  },
  {
    "slug": "zimbabwe",
    "country": "Zimbabwe",
    "isoCode": "ZWE",
    "region": "Africa",
    "channel": "e-Visa",
    "accentHex": "#7A542E",
    "heroPromise": "Official Zimbabwe e-Visa portal filing, Victoria Falls & Harare itinerary structuring, and Southern Africa border prep for Pakistani passport holders.",
    "facts": {
      "visaType": "Zimbabwe Electronic Visa (e-Visa · Tourism / Business)",
      "entryType": "Single or Double Entry (category dependent)",
      "stayDuration": "",
      "processingTime": "",
      "govtFee": ""
    }
  }
];

export function getDestinationSummaryBySlug(slug: string): DestinationSummary | undefined {
  return DESTINATION_SUMMARIES.find((d) => d.slug === slug);
}

export function getRelatedDestinationSummaries(slugs: string[]): DestinationSummary[] {
  return slugs
    .map((slug) => getDestinationSummaryBySlug(slug))
    .filter((item): item is DestinationSummary => Boolean(item));
}
