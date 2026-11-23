export type SchengenCityId = 'all' | 'islamabad' | 'lahore' | 'karachi';
export type SlotStatus = 'open' | 'limited' | 'waitlist';

export interface SchengenSlotEntry {
  id: string;
  country: string;
  isoCode: string;
  guideHref: string | null;
  centre: string;
  cities: Array<'islamabad' | 'lahore' | 'karachi'>;
  category: string;
  status: SlotStatus;
  estimatedSlots: number;
  earliestDaysOut: number | null;
  earliestWindowLabel: string;
  lastUpdatedAt: string;
  lastChangeSummary: string;
  recentlyChanged: boolean;
}

export interface SlotFeedEvent {
  id: string;
  timestamp: string;
  isoCode: string;
  country: string;
  previousStatus: SlotStatus;
  nextStatus: SlotStatus;
  estimatedSlots: number;
  message: string;
}

export interface SchengenSlotFeedState {
  entries: SchengenSlotEntry[];
  events: SlotFeedEvent[];
  tickCount: number;
  lastPolledAt: string;
}

export interface SlotAvailabilitySummary {
  total: number;
  openCount: number;
  limitedCount: number;
  waitlistCount: number;
  totalEstimatedSlots: number;
}

export const SCHENGEN_CITY_OPTIONS: Array<{ id: SchengenCityId; label: string }> = [
  { id: 'all', label: 'All Centres' },
  { id: 'islamabad', label: 'Islamabad' },
  { id: 'lahore', label: 'Lahore' },
  { id: 'karachi', label: 'Karachi' },
];

export const SLOT_STATUS_FILTER_OPTIONS: Array<{ id: SlotStatus | 'all'; label: string }> = [
  { id: 'all', label: 'All Statuses' },
  { id: 'open', label: 'Open' },
  { id: 'limited', label: 'Limited' },
  { id: 'waitlist', label: 'Waitlist' },
];

export const SLOT_STATUS_META: Record<
  SlotStatus,
  {
    label: string;
    shortLabel: string;
    description: string;
  }
> = {
  open: {
    label: 'Slots Open',
    shortLabel: 'Open',
    description: 'Multiple short-stay biometric windows currently visible in the simulated release cycle.',
  },
  limited: {
    label: 'Limited Slots',
    shortLabel: 'Limited',
    description: 'Few scattered appointment dates remaining; dossier should already be audit-ready.',
  },
  waitlist: {
    label: 'Waitlist Only',
    shortLabel: 'Waitlist',
    description: 'No open biometric slots in the current snapshot; monitoring next official batch release.',
  },
};

export const SCHENGEN_FEED_DISCLAIMER =
  'Simulated real-time indicator for travel planning only. Official Schengen appointment calendars change by the minute on VFS Global, BLS International, and mission portals. Visahouse never uses unauthorised brokers or promises fixed slot dates—all bookings are placed legitimately in the applicant’s own name.';

const CITY_DISPLAY_NAMES: Record<'islamabad' | 'lahore' | 'karachi', string> = {
  islamabad: 'Islamabad',
  lahore: 'Lahore',
  karachi: 'Karachi',
};

export function formatCitiesList(cities: Array<'islamabad' | 'lahore' | 'karachi'>): string {
  return cities.map((c) => CITY_DISPLAY_NAMES[c]).join(' · ');
}

export function formatFeedClock(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '00:00:00';
  }
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export function createInitialSchengenSlotFeed(
  baseIso: string = new Date().toISOString(),
): SchengenSlotFeedState {
  const baseMs = Number.isNaN(Date.parse(baseIso)) ? Date.now() : Date.parse(baseIso);
  const isoMinusSec = (seconds: number) => new Date(baseMs - seconds * 1000).toISOString();

  const entries: SchengenSlotEntry[] = [
    {
      id: 'france',
      country: 'France',
      isoCode: 'FRA',
      guideHref: '/visas/france',
      centre: 'VFS Global / Gerry’s',
      cities: ['islamabad', 'lahore', 'karachi'],
      category: 'Type-C Short-Stay',
      status: 'open',
      estimatedSlots: 11,
      earliestDaysOut: 14,
      earliestWindowLabel: '14–18 days out',
      lastUpdatedAt: isoMinusSec(18),
      lastChangeSummary: 'Morning batch opened across Islamabad and Lahore desks.',
      recentlyChanged: false,
    },
    {
      id: 'italy',
      country: 'Italy',
      isoCode: 'ITA',
      guideHref: null,
      centre: 'VFS Global / Gerry’s',
      cities: ['islamabad', 'lahore', 'karachi'],
      category: 'Type-C Short-Stay',
      status: 'waitlist',
      estimatedSlots: 0,
      earliestDaysOut: null,
      earliestWindowLabel: 'Next release cycle',
      lastUpdatedAt: isoMinusSec(42),
      lastChangeSummary: 'Current tourist batch fully claimed; watching next release.',
      recentlyChanged: false,
    },
    {
      id: 'spain',
      country: 'Spain',
      isoCode: 'ESP',
      guideHref: null,
      centre: 'BLS International',
      cities: ['islamabad', 'lahore', 'karachi'],
      category: 'Type-C Short-Stay',
      status: 'limited',
      estimatedSlots: 3,
      earliestDaysOut: 19,
      earliestWindowLabel: '19–24 days out',
      lastUpdatedAt: isoMinusSec(27),
      lastChangeSummary: 'Three mid-week slots still open in Lahore and Karachi.',
      recentlyChanged: false,
    },
    {
      id: 'germany',
      country: 'Germany',
      isoCode: 'DEU',
      guideHref: '/visas/germany',
      centre: 'Consular / Mission Channel',
      cities: ['islamabad', 'karachi'],
      category: 'Type-C Tourist & Messe',
      status: 'limited',
      estimatedSlots: 4,
      earliestDaysOut: 22,
      earliestWindowLabel: '22–28 days out',
      lastUpdatedAt: isoMinusSec(55),
      lastChangeSummary: 'Limited trade-fair and tourist slots under consular jurisdiction.',
      recentlyChanged: false,
    },
    {
      id: 'switzerland',
      country: 'Switzerland',
      isoCode: 'CHE',
      guideHref: '/visas/switzerland',
      centre: 'VFS Global / Gerry’s',
      cities: ['islamabad', 'lahore', 'karachi'],
      category: 'Type-C Short-Stay',
      status: 'open',
      estimatedSlots: 9,
      earliestDaysOut: 11,
      earliestWindowLabel: '11–15 days out',
      lastUpdatedAt: isoMinusSec(31),
      lastChangeSummary: 'Steady availability for family and alpine leisure dossiers.',
      recentlyChanged: false,
    },
    {
      id: 'netherlands',
      country: 'Netherlands',
      isoCode: 'NLD',
      guideHref: '/visas/netherlands',
      centre: 'VFS Global / Gerry’s',
      cities: ['islamabad', 'lahore', 'karachi'],
      category: 'Type-C Short-Stay',
      status: 'open',
      estimatedSlots: 13,
      earliestDaysOut: 9,
      earliestWindowLabel: '9–14 days out',
      lastUpdatedAt: isoMinusSec(12),
      lastChangeSummary: 'Open biometric windows across all three centres.',
      recentlyChanged: false,
    },
    {
      id: 'greece',
      country: 'Greece',
      isoCode: 'GRC',
      guideHref: '/visas/greece',
      centre: 'VFS Global / Gerry’s',
      cities: ['islamabad', 'lahore', 'karachi'],
      category: 'Type-C Short-Stay',
      status: 'limited',
      estimatedSlots: 2,
      earliestDaysOut: 17,
      earliestWindowLabel: '17–21 days out',
      lastUpdatedAt: isoMinusSec(64),
      lastChangeSummary: 'High leisure demand; two remaining dates in the current window.',
      recentlyChanged: false,
    },
    {
      id: 'austria',
      country: 'Austria',
      isoCode: 'AUT',
      guideHref: '/visas/austria',
      centre: 'VFS Global / Gerry’s',
      cities: ['islamabad', 'lahore', 'karachi'],
      category: 'Type-C Short-Stay',
      status: 'waitlist',
      estimatedSlots: 0,
      earliestDaysOut: null,
      earliestWindowLabel: 'Next release cycle',
      lastUpdatedAt: isoMinusSec(75),
      lastChangeSummary: 'Waiting on next Vienna short-stay biometric allocation.',
      recentlyChanged: false,
    },
  ];

  const events: SlotFeedEvent[] = [
    {
      id: 'init-1',
      timestamp: isoMinusSec(12),
      isoCode: 'NLD',
      country: 'Netherlands',
      previousStatus: 'limited',
      nextStatus: 'open',
      estimatedSlots: 13,
      message: 'Netherlands opened 13 biometric slots (9–14 days out).',
    },
    {
      id: 'init-2',
      timestamp: isoMinusSec(18),
      isoCode: 'FRA',
      country: 'France',
      previousStatus: 'limited',
      nextStatus: 'open',
      estimatedSlots: 11,
      message: 'France added morning release slots across Islamabad & Lahore.',
    },
    {
      id: 'init-3',
      timestamp: isoMinusSec(27),
      isoCode: 'ESP',
      country: 'Spain',
      previousStatus: 'open',
      nextStatus: 'limited',
      estimatedSlots: 3,
      message: 'Spain narrowed to 3 remaining BLS slots (19–24 days out).',
    },
  ];

  return {
    entries,
    events,
    tickCount: 0,
    lastPolledAt: new Date(baseMs).toISOString(),
  };
}

interface SimulatedDeltaSpec {
  targetId: string;
  nextStatus: SlotStatus;
  estimatedSlots: number;
  earliestDaysOut: number | null;
  earliestWindowLabel: string;
  changeSummary: string;
  eventMessage: string;
}

const SIMULATED_FEED_SCRIPT: SimulatedDeltaSpec[][] = [
  [
    {
      targetId: 'italy',
      nextStatus: 'limited',
      estimatedSlots: 4,
      earliestDaysOut: 21,
      earliestWindowLabel: '21–26 days out',
      changeSummary: 'Cancellation release opened 4 short-stay slots in Islamabad & Lahore.',
      eventMessage: 'Italy moved from Waitlist to Limited (4 cancellation slots released).',
    },
    {
      targetId: 'greece',
      nextStatus: 'waitlist',
      estimatedSlots: 0,
      earliestDaysOut: null,
      earliestWindowLabel: 'Next release cycle',
      changeSummary: 'Last two seasonal dates filled; awaiting next VFS batch.',
      eventMessage: 'Greece filled remaining dates and shifted to Waitlist Only.',
    },
  ],
  [
    {
      targetId: 'spain',
      nextStatus: 'open',
      estimatedSlots: 8,
      earliestDaysOut: 16,
      earliestWindowLabel: '16–20 days out',
      changeSummary: 'Fresh BLS International afternoon batch released across centres.',
      eventMessage: 'Spain opened 8 biometric slots (16–20 days out).',
    },
    {
      targetId: 'france',
      nextStatus: 'limited',
      estimatedSlots: 4,
      earliestDaysOut: 18,
      earliestWindowLabel: '18–22 days out',
      changeSummary: 'Morning allocation mostly taken; 4 slots remaining.',
      eventMessage: 'France narrowed to Limited (4 slots left, 18–22 days out).',
    },
  ],
  [
    {
      targetId: 'austria',
      nextStatus: 'limited',
      estimatedSlots: 5,
      earliestDaysOut: 15,
      earliestWindowLabel: '15–19 days out',
      changeSummary: 'New Central Europe short-stay window opened for Islamabad & Lahore.',
      eventMessage: 'Austria opened 5 Limited slots (15–19 days out).',
    },
    {
      targetId: 'germany',
      nextStatus: 'waitlist',
      estimatedSlots: 0,
      earliestDaysOut: null,
      earliestWindowLabel: 'Next consular release',
      changeSummary: 'Current consular allocation full; tracking next trade-fair & tourist release.',
      eventMessage: 'Germany consular calendar moved to Waitlist Only.',
    },
  ],
  [
    {
      targetId: 'greece',
      nextStatus: 'open',
      estimatedSlots: 10,
      earliestDaysOut: 13,
      earliestWindowLabel: '13–17 days out',
      changeSummary: 'Seasonal mid-month allocation opened across all three centres.',
      eventMessage: 'Greece released 10 Open slots (13–17 days out).',
    },
    {
      targetId: 'italy',
      nextStatus: 'waitlist',
      estimatedSlots: 0,
      earliestDaysOut: null,
      earliestWindowLabel: 'Next release cycle',
      changeSummary: 'Cancellation batch claimed; monitoring next embassy quota.',
      eventMessage: 'Italy cancellation slots filled; returned to Waitlist Only.',
    },
  ],
  [
    {
      targetId: 'france',
      nextStatus: 'open',
      estimatedSlots: 12,
      earliestDaysOut: 12,
      earliestWindowLabel: '12–16 days out',
      changeSummary: 'New bi-weekly Paris tourist & business batch opened.',
      eventMessage: 'France released 12 Open slots (12–16 days out).',
    },
    {
      targetId: 'switzerland',
      nextStatus: 'limited',
      estimatedSlots: 3,
      earliestDaysOut: 19,
      earliestWindowLabel: '19–23 days out',
      changeSummary: 'Peak family travel bookings reduced slots to 3 dates.',
      eventMessage: 'Switzerland narrowed to Limited (3 slots remaining).',
    },
  ],
  [
    {
      targetId: 'germany',
      nextStatus: 'limited',
      estimatedSlots: 5,
      earliestDaysOut: 20,
      earliestWindowLabel: '20–25 days out',
      changeSummary: 'Five consular dates opened across Islamabad and Karachi desks.',
      eventMessage: 'Germany reopened 5 Limited consular slots (20–25 days out).',
    },
    {
      targetId: 'austria',
      nextStatus: 'waitlist',
      estimatedSlots: 0,
      earliestDaysOut: null,
      earliestWindowLabel: 'Next release cycle',
      changeSummary: 'Current five-slot release claimed; waiting for next Vienna batch.',
      eventMessage: 'Austria filled remaining slots and returned to Waitlist Only.',
    },
  ],
  [
    {
      targetId: 'switzerland',
      nextStatus: 'open',
      estimatedSlots: 9,
      earliestDaysOut: 11,
      earliestWindowLabel: '11–15 days out',
      changeSummary: 'Fresh alpine travel biometric slots added for Islamabad, Lahore, Karachi.',
      eventMessage: 'Switzerland reopened 9 Open slots (11–15 days out).',
    },
    {
      targetId: 'spain',
      nextStatus: 'limited',
      estimatedSlots: 3,
      earliestDaysOut: 21,
      earliestWindowLabel: '21–25 days out',
      changeSummary: 'Three BLS slots remain in the current booking window.',
      eventMessage: 'Spain narrowed to Limited (3 BLS slots left).',
    },
  ],
];

export function advanceSchengenSlotFeed(
  state: SchengenSlotFeedState,
  nowIso: string = new Date().toISOString(),
): SchengenSlotFeedState {
  const nextTick = state.tickCount + 1;
  const scriptBatch = SIMULATED_FEED_SCRIPT[(nextTick - 1) % SIMULATED_FEED_SCRIPT.length];
  const deltaById = new Map(scriptBatch.map((spec) => [spec.targetId, spec]));
  const newEvents: SlotFeedEvent[] = [];

  const nextEntries = state.entries.map((entry) => {
    const delta = deltaById.get(entry.id);
    if (!delta) {
      return {
        ...entry,
        recentlyChanged: false,
      };
    }

    newEvents.push({
      id: `tick-${nextTick}-${entry.id}`,
      timestamp: nowIso,
      isoCode: entry.isoCode,
      country: entry.country,
      previousStatus: entry.status,
      nextStatus: delta.nextStatus,
      estimatedSlots: delta.estimatedSlots,
      message: delta.eventMessage,
    });

    return {
      ...entry,
      status: delta.nextStatus,
      estimatedSlots: delta.estimatedSlots,
      earliestDaysOut: delta.earliestDaysOut,
      earliestWindowLabel: delta.earliestWindowLabel,
      lastUpdatedAt: nowIso,
      lastChangeSummary: delta.changeSummary,
      recentlyChanged: true,
    };
  });

  return {
    entries: nextEntries,
    events: [...newEvents, ...state.events].slice(0, 8),
    tickCount: nextTick,
    lastPolledAt: nowIso,
  };
}

export function filterSchengenSlots(
  entries: SchengenSlotEntry[],
  filters: { city: SchengenCityId; status: SlotStatus | 'all' },
): SchengenSlotEntry[] {
  return entries.filter((entry) => {
    const cityMatch = filters.city === 'all' || entry.cities.includes(filters.city);
    const statusMatch = filters.status === 'all' || entry.status === filters.status;
    return cityMatch && statusMatch;
  });
}

export function summarizeSlotAvailability(entries: SchengenSlotEntry[]): SlotAvailabilitySummary {
  let openCount = 0;
  let limitedCount = 0;
  let waitlistCount = 0;
  let totalEstimatedSlots = 0;

  for (const entry of entries) {
    if (entry.status === 'open') {
      openCount += 1;
    } else if (entry.status === 'limited') {
      limitedCount += 1;
    } else {
      waitlistCount += 1;
    }
    totalEstimatedSlots += entry.estimatedSlots;
  }

  return {
    total: entries.length,
    openCount,
    limitedCount,
    waitlistCount,
    totalEstimatedSlots,
  };
}
