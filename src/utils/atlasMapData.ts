import { DESTINATION_SUMMARIES as DESTINATIONS } from '../data/destinationIndex';
import { SCHENGEN_COUNTRIES } from '../data/services';
import type { VisaChannel } from '../data/types';

export type AtlasScope = 'global' | 'schengen';

export interface AtlasPin {
  id: string;
  country: string;
  isoCode: string;
  lon: number;
  lat: number;
  scope: AtlasScope;
  visaSummary: string;
  channelLabel: string;
  quickNote: string;
  to: string;
  accentHex: string;
  isSchengen: boolean;
  channelGroup?: VisaChannel;
}

export interface ProjectedPin extends AtlasPin {
  x: number;
  y: number;
  pctX: number;
  pctY: number;
}

export const MAP_VIEWBOX_WIDTH = 1000;
export const MAP_VIEWBOX_HEIGHT = 460;

interface ProjectionBounds {
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
}

const PROJECTION_BOUNDS: Record<AtlasScope, ProjectionBounds> = {
  global: { minLon: -170, maxLon: 180, minLat: -52, maxLat: 74 },
  schengen: { minLon: -12, maxLon: 30, minLat: 34, maxLat: 68 },
};

export function projectLonLat(
  lon: number,
  lat: number,
  scope: AtlasScope,
): { x: number; y: number; pctX: number; pctY: number } {
  const b = PROJECTION_BOUNDS[scope];
  const x = ((lon - b.minLon) / (b.maxLon - b.minLon)) * MAP_VIEWBOX_WIDTH;
  const y = ((b.maxLat - lat) / (b.maxLat - b.minLat)) * MAP_VIEWBOX_HEIGHT;
  return {
    x: Number(x.toFixed(1)),
    y: Number(y.toFixed(1)),
    pctX: Number(((x / MAP_VIEWBOX_WIDTH) * 100).toFixed(2)),
    pctY: Number(((y / MAP_VIEWBOX_HEIGHT) * 100).toFixed(2)),
  };
}

export function buildPolygonPath(
  coords: readonly [number, number][],
  scope: AtlasScope,
): string {
  if (coords.length === 0) return '';
  return (
    coords
      .map(([lon, lat], idx) => {
        const pt = projectLonLat(lon, lat, scope);
        return `${idx === 0 ? 'M' : 'L'}${pt.x} ${pt.y}`;
      })
      .join(' ') + ' Z'
  );
}

/**
 * Builds a clean upward quadratic curve from origin (Pakistan) to destination.
 */
export function buildFlightArcPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
): string {
  const midX = (from.x + to.x) / 2;
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const lift = Math.min(72, Math.max(14, dist * 0.2));
  const midY = (from.y + to.y) / 2 - lift;
  return `M${from.x} ${from.y} Q${midX.toFixed(1)} ${midY.toFixed(1)} ${to.x} ${to.y}`;
}

export const PAKISTAN_HUB = {
  id: 'pakistan-hub',
  label: 'Pakistan Desk (ISB · LHE · KHI)',
  isoCode: 'PAK',
  lon: 70,
  lat: 30,
};

const LANDMASS_COORDS: readonly [number, number][][] = [
  // North America
  [
    [-168, 66],
    [-162, 55],
    [-140, 60],
    [-125, 49],
    [-124, 40],
    [-117, 32],
    [-105, 20],
    [-96, 15],
    [-84, 10],
    [-78, 9],
    [-82, 22],
    [-81, 31],
    [-75, 35],
    [-70, 42],
    [-60, 46],
    [-54, 52],
    [-64, 60],
    [-78, 63],
    [-95, 69],
    [-120, 71],
    [-145, 70],
    [-168, 66],
  ],
  // Greenland
  [
    [-52, 60],
    [-42, 60],
    [-20, 70],
    [-18, 73],
    [-45, 73],
    [-58, 72],
    [-52, 60],
  ],
  // South America
  [
    [-78, 9],
    [-70, 12],
    [-60, 8],
    [-50, 1],
    [-35, -6],
    [-38, -14],
    [-41, -22],
    [-52, -33],
    [-63, -41],
    [-68, -52],
    [-74, -50],
    [-72, -36],
    [-70, -18],
    [-81, -5],
    [-78, 9],
  ],
  // Europe (Schengen Mainland + Iberia + Italy + Greece + Nordics)
  [
    [-9.3, 37.0],
    [-9.5, 38.8],
    [-9.0, 43.0],
    [-2.0, 43.4],
    [-1.4, 46.2],
    [-4.8, 48.4],
    [-1.8, 49.6],
    [2.0, 51.0],
    [4.6, 53.0],
    [8.2, 54.0],
    [8.1, 57.1],
    [10.6, 57.7],
    [12.5, 55.7],
    [14.2, 53.9],
    [19.5, 54.4],
    [21.0, 56.0],
    [24.1, 57.0],
    [24.7, 59.4],
    [28.5, 60.5],
    [30.0, 68.0],
    [22.0, 70.0],
    [12.0, 67.0],
    [5.0, 61.0],
    [6.0, 58.0],
    [10.5, 59.5],
    [18.0, 60.0],
    [19.0, 55.0],
    [24.0, 54.0],
    [28.0, 46.0],
    [29.0, 41.0],
    [24.0, 38.0],
    [22.0, 37.0],
    [20.2, 39.8],
    [18.4, 40.1],
    [16.5, 39.0],
    [15.7, 38.0],
    [14.2, 40.8],
    [12.2, 41.8],
    [10.4, 43.8],
    [12.5, 44.5],
    [13.8, 45.6],
    [12.3, 45.4],
    [8.9, 44.4],
    [7.2, 43.7],
    [3.2, 42.4],
    [2.1, 41.4],
    [-0.4, 39.5],
    [-2.2, 36.8],
    [-5.6, 36.0],
    [-9.3, 37.0],
  ],
  // Sicily & Sardinia
  [
    [12.5, 38.1],
    [15.6, 38.2],
    [15.1, 36.7],
    [12.6, 37.6],
    [12.5, 38.1],
  ],
  [
    [8.2, 41.2],
    [9.8, 41.0],
    [9.6, 39.0],
    [8.4, 39.1],
    [8.2, 41.2],
  ],
  // Great Britain & Ireland
  [
    [-6, 50],
    [-5, 55],
    [-3, 58],
    [1, 53],
    [1, 51],
    [-6, 50],
  ],
  // Africa
  [
    [-17, 15],
    [-16, 22],
    [-6, 36],
    [10, 37],
    [12, 33],
    [25, 32],
    [32, 31],
    [39, 20],
    [43, 12],
    [51, 12],
    [49, 4],
    [40, -5],
    [40, -16],
    [34, -26],
    [28, -33],
    [18, -35],
    [14, -22],
    [12, -12],
    [9, 4],
    [2, 6],
    [-8, 4],
    [-14, 10],
    [-17, 15],
  ],
  // Madagascar
  [
    [44, -25],
    [47, -25],
    [50, -15],
    [48, -13],
    [44, -18],
    [44, -25],
  ],
  // Asia Mainland (Turkey, Gulf, Pakistan, India, Indochina, East Asia)
  [
    [28, 41],
    [36, 37],
    [35, 31],
    [35, 28],
    [43, 13],
    [53, 16],
    [59, 22],
    [56, 26],
    [51, 26],
    [49, 29],
    [56, 27],
    [62, 25],
    [67, 25],
    [70, 22],
    [73, 15],
    [77, 8],
    [80, 10],
    [82, 16],
    [88, 22],
    [92, 21],
    [97, 16],
    [100, 13],
    [103, 2],
    [104, 2],
    [104, 10],
    [109, 12],
    [108, 18],
    [106, 21],
    [114, 22],
    [121, 25],
    [122, 31],
    [120, 35],
    [122, 38],
    [126, 38],
    [127, 35],
    [129, 35],
    [130, 38],
    [135, 44],
    [141, 52],
    [142, 60],
    [162, 60],
    [175, 66],
    [160, 71],
    [125, 72],
    [95, 73],
    [70, 72],
    [55, 70],
    [42, 68],
    [30, 68],
    [30, 60],
    [28, 46],
    [28, 41],
  ],
  // Sri Lanka
  [
    [80, 9.5],
    [81.8, 7.5],
    [80.5, 6.0],
    [79.7, 7.5],
    [80, 9.5],
  ],
  // Japan Archipelago
  [
    [130, 31],
    [131, 34],
    [136, 34],
    [140, 36],
    [141, 41],
    [145, 43],
    [142, 45],
    [140, 41],
    [138, 37],
    [132, 35],
    [130, 31],
  ],
  // Philippines
  [
    [120, 18],
    [122, 18],
    [123, 14],
    [126, 7],
    [123, 6],
    [121, 10],
    [120, 14],
    [120, 18],
  ],
  // Sumatra & Java
  [
    [95, 5],
    [104, 1],
    [106, -6],
    [114, -8],
    [105, -8],
    [99, 0],
    [95, 5],
  ],
  // Borneo
  [
    [109, 1],
    [117, 6],
    [118, 1],
    [116, -3],
    [110, -3],
    [109, 1],
  ],
  // Australia
  [
    [114, -22],
    [123, -17],
    [131, -12],
    [136, -12],
    [142, -11],
    [149, -20],
    [153, -28],
    [150, -37],
    [141, -38],
    [135, -34],
    [128, -32],
    [115, -34],
    [114, -22],
  ],
  // New Zealand (North & South Islands)
  [
    [172.8, -34.5],
    [178.0, -37.8],
    [175.3, -41.5],
    [173.5, -38.8],
    [172.8, -34.5],
  ],
  [
    [172.8, -41.2],
    [174.1, -41.8],
    [170.5, -45.8],
    [167.0, -46.2],
    [168.0, -44.2],
    [172.8, -41.2],
  ],
];

export function getLandmassPaths(scope: AtlasScope): string[] {
  return LANDMASS_COORDS.map((poly) => buildPolygonPath(poly, scope));
}

const COUNTRY_COORDS: Record<string, { lon: number; lat: number }> = {
  usa: { lon: -96, lat: 39 },
  canada: { lon: -102, lat: 56 },
  uk: { lon: -2.2, lat: 54.0 },
  'schengen-states': { lon: 10.2, lat: 48.2 },
  australia: { lon: 134.5, lat: -25.2 },
  'new-zealand': { lon: 173.2, lat: -41.2 },
  egypt: { lon: 30.8, lat: 26.8 },
  morocco: { lon: -7.1, lat: 31.8 },
  kenya: { lon: 37.9, lat: -0.5 },
  'south-africa': { lon: 24.5, lat: -29.0 },
  zimbabwe: { lon: 29.8, lat: -19.0 },
  bahrain: { lon: 50.5, lat: 26.1 },
  turkey: { lon: 35.2, lat: 39.0 },
  azerbaijan: { lon: 47.6, lat: 40.4 },
  uzbekistan: { lon: 64.6, lat: 41.4 },
  nepal: { lon: 85.3, lat: 27.7 },
  'sri-lanka': { lon: 80.7, lat: 7.5 },
  thailand: { lon: 100.5, lat: 14.5 },
  cambodia: { lon: 105.0, lat: 12.0 },
  malaysia: { lon: 101.7, lat: 3.6 },
  singapore: { lon: 103.8, lat: 1.2 },
  indonesia: { lon: 110.5, lat: -6.5 },
  philippines: { lon: 121.5, lat: 14.5 },
  'south-korea': { lon: 127.0, lat: 37.5 },
  japan: { lon: 138.2, lat: 36.2 },
};

/**
 * Individual European Schengen member guides are plotted inside the zoomed
 * 'schengen' scope so the global world atlas stays spatially legible without
 * overlapping European pins.
 */
const INDIVIDUAL_SCHENGEN_SLUGS = new Set([
  'germany',
  'france',
  'greece',
  'portugal',
  'hungary',
  'poland',
  'netherlands',
  'norway',
  'denmark',
  'belgium',
  'luxembourg',
  'finland',
  'sweden',
  'switzerland',
  'austria',
  'italy',
  'spain',
]);

const SCHENGEN_HUB_COORDS: Record<string, { lon: number; lat: number }> = {
  FRA: { lon: 2.3, lat: 46.6 },
  ITA: { lon: 12.6, lat: 42.2 },
  ESP: { lon: -3.7, lat: 40.4 },
  DEU: { lon: 10.5, lat: 51.4 },
  CHE: { lon: 8.2, lat: 46.8 },
  NLD: { lon: 5.3, lat: 52.5 },
  GRC: { lon: 23.7, lat: 38.0 },
  AUT: { lon: 14.5, lat: 47.5 },
  PRT: { lon: -9.1, lat: 38.7 },
  BEL: { lon: 4.4, lat: 50.8 },
  HUN: { lon: 19.1, lat: 47.3 },
  POL: { lon: 19.4, lat: 52.2 },
  LUX: { lon: 6.1, lat: 49.6 },
  NOR: { lon: 10.7, lat: 60.5 },
  DNK: { lon: 10.5, lat: 56.0 },
  FIN: { lon: 25.0, lat: 61.5 },
  SWE: { lon: 17.5, lat: 60.2 },
};

export function getAtlasPins(scope: AtlasScope): ProjectedPin[] {
  if (scope === 'schengen') {
    const destByIso = new Map(DESTINATIONS.map((d) => [d.isoCode, d]));
    const selectedSchengen = SCHENGEN_COUNTRIES.filter((c) => c.iso in SCHENGEN_HUB_COORDS);
    return selectedSchengen.map((item) => {
      const pt = SCHENGEN_HUB_COORDS[item.iso];
      const pos = projectLonLat(pt.lon, pt.lat, 'schengen');
      const matchedDest = destByIso.get(item.iso);
      return {
        id: `sch-${item.iso.toLowerCase()}`,
        country: item.name,
        isoCode: item.iso,
        lon: pt.lon,
        lat: pt.lat,
        scope: 'schengen',
        visaSummary: 'Schengen Short-Stay Visa (Type C)',
        channelLabel: matchedDest ? matchedDest.channel : 'Official Visa Centre (VFS / BLS)',
        quickNote: `${item.note.split(';')[0]}. Cities in Pakistan: ${item.citiesInPakistan}.`,
        to: matchedDest ? `/visas/${matchedDest.slug}` : '/schengen-appointments',
        accentHex: matchedDest?.accentHex ?? '#0F5C4B',
        isSchengen: true,
        channelGroup: 'Hybrid / Centre',
        ...pos,
      };
    });
  }

  const globalCountryPins: AtlasPin[] = DESTINATIONS.filter(
    (dest) => !INDIVIDUAL_SCHENGEN_SLUGS.has(dest.slug),
  ).map((dest) => {
    const coords = COUNTRY_COORDS[dest.slug] ?? { lon: 0, lat: 20 };
    const isSchengenHub = dest.slug === 'schengen-states';
    return {
      id: isSchengenHub ? 'schengen-states' : dest.slug,
      country: isSchengenHub ? 'Schengen States (Europe)' : dest.country,
      isoCode: dest.isoCode,
      lon: coords.lon,
      lat: coords.lat,
      scope: 'global',
      visaSummary: isSchengenHub
        ? 'Short-Stay Type-C (29 Schengen States)'
        : `${dest.facts.visaType} · ${dest.facts.entryType}`,
      channelLabel: dest.channel,
      quickNote: dest.heroPromise,
      to: `/visas/${dest.slug}`,
      accentHex: dest.accentHex,
      isSchengen: isSchengenHub,
      channelGroup: dest.channel,
    };
  });

  // Sort Schengen hub pin first so default focus highlights the European hub cleanly
  globalCountryPins.sort((a, b) => (a.isSchengen === b.isSchengen ? 0 : a.isSchengen ? -1 : 1));

  return globalCountryPins.map((pin) => ({
    ...pin,
    ...projectLonLat(pin.lon, pin.lat, 'global'),
  }));
}
