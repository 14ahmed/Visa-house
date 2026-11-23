import type { DestinationData } from '../data/types';

export interface CountryArtworkMeta {
  code: string;
  motif: string;
  imageSrc: string;
}

/**
 * Registry of cohesive hand-drawn archival pen-and-ink & watercolor landmark illustrations
 * covering all 38 destinations plus the companion Travel Insurance card (INS).
 */
export const COUNTRY_ARTWORK_META: Record<string, CountryArtworkMeta> = {
  THA: {
    code: 'THA',
    motif: 'Wat Arun riverside temple spires & Chao Phraya longtail boat',
    imageSrc: '/src/assets/images/stamp_thailand_1795434245187.avif',
  },
  MYS: {
    code: 'MYS',
    motif: 'Petronas Twin Towers skybridge & Kuala Lumpur palms',
    imageSrc: '/src/assets/images/stamp_malaysia_1795434132427.avif',
  },
  IDN: {
    code: 'IDN',
    motif: 'Balinese Candi Bentar split stone temple gate & terraced rice hills',
    imageSrc: '/src/assets/images/stamp_indonesia_1795434245215.avif',
  },
  SGP: {
    code: 'SGP',
    motif: 'Marina Bay three-tower SkyPark & lotus waterfront pavilion',
    imageSrc: '/src/assets/images/stamp_singapore_1795434133710.avif',
  },
  KHM: {
    code: 'KHM',
    motif: 'Angkor Wat lotus-bud stone towers & still reflection pool',
    imageSrc: '/src/assets/images/stamp_cambodia_1795434132593.avif',
  },
  LKA: {
    code: 'LKA',
    motif: 'Nine Arch Stone Viaduct Bridge & Ella highland tea slopes',
    imageSrc: '/src/assets/images/stamp_sri_lanka_1795434133245.avif',
  },
  NPL: {
    code: 'NPL',
    motif: 'Kathmandu Boudhanath stupa spire & snow-capped Himalayan peaks',
    imageSrc: '/src/assets/images/stamp_nepal_1795434245053.avif',
  },
  UZB: {
    code: 'UZB',
    motif: 'Samarkand Registan tiled pishtaq archway & turquoise dome',
    imageSrc: '/src/assets/images/stamp_uzbekistan_1795434132176.avif',
  },
  BHR: {
    code: 'BHR',
    motif: 'Manama World Trade Center twin wind-turbine sail towers',
    imageSrc: '/src/assets/images/stamp_bahrain_1795434245538.avif',
  },
  TUR: {
    code: 'TUR',
    motif: 'Istanbul Blue Mosque domes, slender minarets & Bosphorus ferry',
    imageSrc: '/src/assets/images/stamp_turkey.avif',
  },
  AZE: {
    code: 'AZE',
    motif: 'Baku Flame Towers rising above historic Maiden Tower on the Caspian',
    imageSrc: '/src/assets/images/stamp_azerbaijan.avif',
  },
  ITA: {
    code: 'ITA',
    motif: 'Roman Colosseum stone arches framed by Mediterranean cypresses',
    imageSrc: '/src/assets/images/stamp_italy.avif',
  },
  ESP: {
    code: 'ESP',
    motif: 'Barcelona Sagrada Familia ornate spires & Catalan arches',
    imageSrc: '/src/assets/images/stamp_spain.avif',
  },
  JPN: {
    code: 'JPN',
    motif: 'Wooden Shinto torii gate framing Mount Fuji & blossom branches',
    imageSrc: '/src/assets/images/stamp_japan_1795434245845.avif',
  },
  KOR: {
    code: 'KOR',
    motif: 'Seoul Gyeongbokgung curved palace eaves & courtyard pine',
    imageSrc: '/src/assets/images/stamp_south_korea_1795434132252.avif',
  },
  PHL: {
    code: 'PHL',
    motif: 'Palawan limestone karst cliffs & lagoon outrigger boat',
    imageSrc: '/src/assets/images/stamp_philippines_1795434132351.avif',
  },
  USA: {
    code: 'USA',
    motif: 'United States neoclassical Capitol dome & grand colonnade',
    imageSrc: '/src/assets/images/stamp_usa_1795434131418.avif',
  },
  CAN: {
    code: 'CAN',
    motif: 'Toronto CN Tower needle & snow-dusted Canadian Rockies',
    imageSrc: '/src/assets/images/stamp_canada_1795434244609.avif',
  },
  GBR: {
    code: 'GBR',
    motif: 'London Big Ben Elizabeth Tower & Westminster Bridge arches',
    imageSrc: '/src/assets/images/stamp_uk_1795434245251.avif',
  },
  AUS: {
    code: 'AUS',
    motif: 'Sydney Opera House billowing harbour shells & coastal ripples',
    imageSrc: '/src/assets/images/stamp_australia_1795434131694.avif',
  },
  NZL: {
    code: 'NZL',
    motif: 'Milford Sound Mitre Peak & reflective fiord waters',
    imageSrc: '/src/assets/images/stamp_new_zealand_1795434246198.avif',
  },
  SCH: {
    code: 'SCH',
    motif: 'Antique European cartographic compass rose & twelve-star ring',
    imageSrc: '/src/assets/images/stamp_schengen_1795434244942.avif',
  },
  DEU: {
    code: 'DEU',
    motif: 'Berlin Brandenburg Gate neoclassical colonnade & quadriga',
    imageSrc: '/src/assets/images/stamp_germany_1795434245476.avif',
  },
  FRA: {
    code: 'FRA',
    motif: 'Paris Eiffel Tower wrought-iron lattice & chestnut treetops',
    imageSrc: '/src/assets/images/stamp_france_1795434134185.avif',
  },
  GRC: {
    code: 'GRC',
    motif: 'Athens Acropolis Parthenon Doric colonnade & limestone hill',
    imageSrc: '/src/assets/images/stamp_greece_1795434244712.avif',
  },
  PRT: {
    code: 'PRT',
    motif: 'Lisbon Belém limestone fortress watchtower & Atlantic waves',
    imageSrc: '/src/assets/images/stamp_portugal_1795434245145.avif',
  },
  HUN: {
    code: 'HUN',
    motif: 'Budapest Neo-Gothic Parliament dome & Danube reflection',
    imageSrc: '/src/assets/images/stamp_hungary_1795434132388.avif',
  },
  POL: {
    code: 'POL',
    motif: 'Polish Old Town Renaissance gabled facades & Gothic spire',
    imageSrc: '/src/assets/images/stamp_poland_1795434245182.avif',
  },
  NLD: {
    code: 'NLD',
    motif: 'Traditional Dutch timber windmill & gabled Amsterdam canal houses',
    imageSrc: '/src/assets/images/stamp_netherlands_clean_1795434333496.avif',
  },
  NOR: {
    code: 'NOR',
    motif: 'Norwegian fjord cliffs & tiered wooden stave church',
    imageSrc: '/src/assets/images/stamp_norway_1795434245446.avif',
  },
  DNK: {
    code: 'DNK',
    motif: 'Copenhagen Nyhavn gabled townhouses & wooden sailboat mast',
    imageSrc: '/src/assets/images/stamp_denmark_1795434133211.avif',
  },
  BEL: {
    code: 'BEL',
    motif: 'Brussels Grand Place Gothic belfry spire & Flemish guildhalls',
    imageSrc: '/src/assets/images/stamp_belgium_1795434133986.avif',
  },
  LUX: {
    code: 'LUX',
    motif: 'Luxembourg City Pont Adolphe monumental masonry arch bridge',
    imageSrc: '/src/assets/images/stamp_luxembourg_1795434334139.avif',
  },
  FIN: {
    code: 'FIN',
    motif: 'Helsinki neoclassical Cathedral dome & birch-framed steps',
    imageSrc: '/src/assets/images/stamp_finland_1795434132665.avif',
  },
  SWE: {
    code: 'SWE',
    motif: 'Stockholm City Hall brick waterfront bell tower & arches',
    imageSrc: '/src/assets/images/stamp_sweden_1795434334351.avif',
  },
  CHE: {
    code: 'CHE',
    motif: 'Matterhorn alpine pyramid peak & mountain railway viaduct',
    imageSrc: '/src/assets/images/stamp_switzerland_1795434133849.avif',
  },
  AUT: {
    code: 'AUT',
    motif: 'Vienna Karlskirche baroque verdigris dome & twin columns',
    imageSrc: '/src/assets/images/stamp_austria_1795434133382.avif',
  },
  EGY: {
    code: 'EGY',
    motif: 'Great Pyramids of Giza, desert dunes & Nile felucca sail',
    imageSrc: '/src/assets/images/stamp_egypt_1795434334043.avif',
  },
  MAR: {
    code: 'MAR',
    motif: 'Marrakech Koutoubia minaret framed by scalloped horseshoe arch',
    imageSrc: '/src/assets/images/stamp_morocco_1795434131114.avif',
  },
  KEN: {
    code: 'KEN',
    motif: 'Kenyan savannah flat-topped acacia tree & distant alpine peak',
    imageSrc: '/src/assets/images/stamp_kenya_1795434333329.avif',
  },
  ZAF: {
    code: 'ZAF',
    motif: 'Cape Town Table Mountain coastal massif & ocean bay',
    imageSrc: '/src/assets/images/stamp_south_africa_clean_1795434333323.avif',
  },
  ZWE: {
    code: 'ZWE',
    motif: 'Victoria Falls cascading gorge & historic steel arch bridge',
    imageSrc: '/src/assets/images/stamp_zimbabwe_1795434132286.avif',
  },
  INS: {
    code: 'INS',
    motif: 'Archival heraldic travel medical protection shield & wings',
    imageSrc: '/src/assets/images/stamp_insurance_1795434133216.avif',
  },
};

export function getCountryArtworkMeta(code: string): CountryArtworkMeta | undefined {
  return COUNTRY_ARTWORK_META[code.trim().toUpperCase()];
}

export function getCountryIllustrationSrc(code: string): string | undefined {
  return getCountryArtworkMeta(code)?.imageSrc;
}

export function hasCountryArtworkForAllDestinations(
  destinations: readonly DestinationData[],
): boolean {
  return destinations.every((d) => Boolean(getCountryArtworkMeta(d.isoCode)));
}

export function hasCountryIllustrationsForAllDestinations(
  destinations: readonly DestinationData[],
): boolean {
  return destinations.every((d) => {
    const src = getCountryIllustrationSrc(d.isoCode);
    return Boolean(src && src.startsWith('/src/assets/images/stamp_') && src.endsWith('.avif'));
  });
}
