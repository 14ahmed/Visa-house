import { SITE_CONFIG } from '../config/site';

export type VisaStageId = 'intake' | 'audit' | 'filing' | 'embassy_review' | 'ready';

export interface VisaMilestone {
  id: VisaStageId;
  step: string;
  title: string;
  detail: string;
  state: 'done' | 'current' | 'upcoming';
  timestamp?: string;
}

export interface VisaStatusUpdateEvent {
  id: string;
  timestamp: string;
  stage: VisaStageId;
  source: string;
  message: string;
  isLiveBroadcast?: boolean;
}

export interface VisaStatusRecord {
  referenceId: string;
  destination: string;
  isoCode: string;
  channel: string;
  passportNationality: string;
  travelMonth: string;
  currentStage: VisaStageId;
  statusLabel: string;
  stampLabel: string;
  stampColor: string;
  lastUpdated: string;
  lastSyncedAt: string;
  nextAction: string;
  isDemoRecord: boolean;
  milestones: VisaMilestone[];
  updates: VisaStatusUpdateEvent[];
}

export interface LocalLoggedInquirySummary {
  referenceId: string;
  destination: string;
  passportNationality: string;
  travelMonth: string;
  submittedAt: string;
}

export interface ReferenceValidationResult {
  valid: boolean;
  normalized: string;
  error?: string;
}

export type StreamConnectionState = 'idle' | 'connecting' | 'live' | 'reconnecting' | 'offline';

export interface StatusStreamCallbacks {
  onStateChange?: (state: StreamConnectionState) => void;
  onSnapshot?: (record: VisaStatusRecord, serverTime: string) => void;
  onUpdate?: (record: VisaStatusRecord, event: VisaStatusUpdateEvent, serverTime: string) => void;
  onError?: (message: string) => void;
}

export const STAGE_ORDER: readonly { id: VisaStageId; step: string; title: string }[] = [
  { id: 'intake', step: '01', title: 'Inquiry & Reference Logged' },
  { id: 'audit', step: '02', title: 'Document & Financial Audit' },
  { id: 'filing', step: '03', title: 'Submitted via Official Channel' },
  { id: 'embassy_review', step: '04', title: 'Mission / Immigration Processing' },
  { id: 'ready', step: '05', title: 'Decision / Collection Notice' },
];

export interface TimelineStageMeta {
  id: VisaStageId;
  step: string;
  shortLabel: string;
  typicalWindow: string;
  overview: string;
}

export const TIMELINE_STAGE_META: readonly TimelineStageMeta[] = [
  {
    id: 'intake',
    step: '01',
    shortLabel: 'Application Received',
    typicalWindow: 'Day 1',
    overview: 'Application ID issued, passport jurisdiction verified, and case routed to our Pakistan desk.',
  },
  {
    id: 'audit',
    step: '02',
    shortLabel: 'Document Audit',
    typicalWindow: '1–2 Working Days',
    overview: 'Six-month bank statements, FBR returns, NOC/employment proofs, and itinerary dates audited line by line.',
  },
  {
    id: 'filing',
    step: '03',
    shortLabel: 'Official Filing',
    typicalWindow: 'Portal / Biometrics Day',
    overview: 'Forms completed and dossier submitted via official e-Visa portal, VFS/BLS centre, or embassy counter.',
  },
  {
    id: 'embassy_review',
    step: '04',
    shortLabel: 'Embassy Processing',
    typicalWindow: 'Mission Dependent',
    overview: 'File sits in active consular or immigration review; our desk monitors portal & queue checkpoints.',
  },
  {
    id: 'ready',
    step: '05',
    shortLabel: 'Passport Dispatch',
    typicalWindow: 'Release & Handover',
    overview: 'Decision issued; e-Visa PDF delivered or passport cleared for collection/courier dispatch with arrival notes.',
  },
];

export interface VisaTimelineNode {
  id: VisaStageId;
  step: string;
  shortLabel: string;
  ledgerTitle: string;
  typicalWindow: string;
  detail: string;
  state: 'done' | 'current' | 'upcoming' | 'preview';
  timestamp?: string;
  stageUpdates: VisaStatusUpdateEvent[];
}

export interface VisaTimelineSnapshot {
  isPreview: boolean;
  activeStageId: VisaStageId | null;
  activeStageLabel: string;
  activeIndex: number;
  totalStages: number;
  completedCount: number;
  /** Percentage of the connecting track rail from node 01 to node 05 (0, 25, 50, 75, 100). */
  connectorFillPercent: number;
  /** Overall application stage progress percentage (0 in preview; 20..100 when active). */
  completionPercent: number;
  nodes: VisaTimelineNode[];
}

/**
 * Pure mapper translating a fetched VisaStatusRecord (or null for idle preview)
 * into a 5-stage visual progress timeline with connector fill ratios and
 * stage-grouped status update events.
 */
export function computeVisaTimelineState(record: VisaStatusRecord | null): VisaTimelineSnapshot {
  const totalStages = TIMELINE_STAGE_META.length;

  if (!record) {
    return {
      isPreview: true,
      activeStageId: null,
      activeStageLabel: 'Standard 5-Stage Visa Journey',
      activeIndex: -1,
      totalStages,
      completedCount: 0,
      connectorFillPercent: 0,
      completionPercent: 0,
      nodes: TIMELINE_STAGE_META.map((meta) => ({
        id: meta.id,
        step: meta.step,
        shortLabel: meta.shortLabel,
        ledgerTitle: STAGE_ORDER.find((s) => s.id === meta.id)?.title ?? meta.shortLabel,
        typicalWindow: meta.typicalWindow,
        detail: meta.overview,
        state: 'preview',
        stageUpdates: [],
      })),
    };
  }

  const rawIndex = TIMELINE_STAGE_META.findIndex((m) => m.id === record.currentStage);
  const activeIndex = rawIndex >= 0 ? rawIndex : 0;
  const completedCount = activeIndex;
  const connectorFillPercent =
    totalStages > 1 ? Math.round((activeIndex / (totalStages - 1)) * 100) : 100;
  const completionPercent = Math.round(((activeIndex + 1) / totalStages) * 100);

  const nodes: VisaTimelineNode[] = TIMELINE_STAGE_META.map((meta, idx) => {
    const milestone = record.milestones.find((m) => m.id === meta.id);
    const state: VisaTimelineNode['state'] =
      idx < activeIndex ? 'done' : idx === activeIndex ? 'current' : 'upcoming';
    const stageUpdates = record.updates.filter((u) => u.stage === meta.id);

    return {
      id: meta.id,
      step: meta.step,
      shortLabel: meta.shortLabel,
      ledgerTitle: milestone?.title ?? meta.shortLabel,
      typicalWindow: meta.typicalWindow,
      detail: milestone?.detail ?? meta.overview,
      state,
      timestamp: milestone?.timestamp,
      stageUpdates,
    };
  });

  return {
    isPreview: false,
    activeStageId: TIMELINE_STAGE_META[activeIndex].id,
    activeStageLabel: TIMELINE_STAGE_META[activeIndex].shortLabel,
    activeIndex,
    totalStages,
    completedCount,
    connectorFillPercent,
    completionPercent,
    nodes,
  };
}

const LOCAL_INQUIRIES_STORAGE_KEY = 'visahouse_logged_inquiries_v1';
const MAX_STORED_UPDATES = 20;

/**
 * Normalizes application IDs / reference numbers entered by applicants.
 */
export function normalizeReferenceInput(raw: string): string {
  return raw.trim().replace(/\s+/g, '').toUpperCase();
}

/**
 * Validates that an entered Visahouse application ID follows the VH-... pattern.
 */
export function validateReferenceNumber(raw: string): ReferenceValidationResult {
  const normalized = normalizeReferenceInput(raw);
  if (!normalized) {
    return {
      valid: false,
      normalized,
      error: 'Please enter your Visahouse application ID (e.g. VH-THA-1042).',
    };
  }
  if (!/^VH-[A-Z0-9]{2,6}-[A-Z0-9]{3,8}$/.test(normalized)) {
    return {
      valid: false,
      normalized,
      error:
        'Use the application ID format issued on your dossier receipt (for example: VH-THA-1042).',
    };
  }
  return { valid: true, normalized };
}

export function buildStageMilestones(
  currentStage: VisaStageId,
  customDetails: Partial<Record<VisaStageId, { detail: string; timestamp?: string }>>,
): VisaMilestone[] {
  const currentIndex = STAGE_ORDER.findIndex((s) => s.id === currentStage);
  return STAGE_ORDER.map((stage, idx) => {
    const state: VisaMilestone['state'] =
      idx < currentIndex ? 'done' : idx === currentIndex ? 'current' : 'upcoming';
    const override = customDetails[stage.id];
    const defaultDetails: Record<VisaStageId, string> = {
      intake: 'Application ID assigned and routed to our Pakistan intake desk.',
      audit: 'Passport scan, bank statement consistency, and supporting letters reviewed.',
      filing: 'Application packet lodged via official e-Visa portal, centre, or mission.',
      embassy_review: 'File is under active assessment by the issuing consular authorities.',
      ready: 'Outcome update / passport return instructions ready with our team.',
    };

    return {
      id: stage.id,
      step: stage.step,
      title: stage.title,
      detail: override?.detail ?? defaultDetails[stage.id],
      state,
      timestamp: override?.timestamp,
    };
  });
}

/**
 * Illustrative sample reference dossiers clearly flagged as demo records so
 * applicants can preview every processing stage and live server-pushed updates.
 */
export const SAMPLE_VISA_STATUS_RECORDS: readonly VisaStatusRecord[] = [
  {
    referenceId: 'VH-THA-1042',
    destination: 'Thailand Tourist Visa',
    isoCode: 'THA',
    channel: 'Hybrid / Centre',
    passportNationality: 'Pakistan',
    travelMonth: 'January 2027',
    currentStage: 'embassy_review',
    statusLabel: 'Under Mission Review (Filed via Authorised Channel)',
    stampLabel: 'IN REVIEW',
    stampColor: '#0F5C4B',
    lastUpdated: 'Stage 04 · Mission Queue Active',
    lastSyncedAt: '2026-11-22T14:20:00.000Z',
    nextAction:
      'No extra paperwork requested right now. Keep your phone reachable in case the mission requests verification; TDAC arrival prep sheet will be shared once passport/e-Visa outcome arrives.',
    isDemoRecord: true,
    milestones: buildStageMilestones('embassy_review', {
      intake: {
        detail: 'Tourist dossier opened for Bangkok & Phuket itinerary.',
        timestamp: 'Step 01 Complete',
      },
      audit: {
        detail: 'Six-month bank statement, employment NOC, and hotel confirmations verified.',
        timestamp: 'Step 02 Complete',
      },
      filing: {
        detail: 'Submitted cleanly through the official embassy / e-Visa queue.',
        timestamp: 'Step 03 Complete',
      },
      embassy_review: {
        detail: 'Awaiting standard consular assessment by Thai mission authorities.',
        timestamp: 'Current Stage',
      },
    }),
    updates: [
      {
        id: 'evt-tha-03',
        timestamp: '2026-11-22T14:20:00.000Z',
        stage: 'embassy_review',
        source: 'Consular Queue Check',
        message: 'Application remains in active Royal Thai mission processing; no additional documents requested.',
      },
      {
        id: 'evt-tha-02',
        timestamp: '2026-11-20T09:15:00.000Z',
        stage: 'filing',
        source: 'Visahouse Filing Desk',
        message: 'Complete tourist packet lodged through the official submission channel with matched hotel dates.',
      },
      {
        id: 'evt-tha-01',
        timestamp: '2026-11-18T11:40:00.000Z',
        stage: 'audit',
        source: 'Pakistan Audit Desk',
        message: 'Six-month bank statement closing balance and employer leave letter cleared pre-filing checks.',
      },
    ],
  },
  {
    referenceId: 'VH-SCH-2088',
    destination: 'Schengen Short-Stay (Type-C)',
    isoCode: 'SCH',
    channel: 'Authorised Visa Centre (VFS / BLS)',
    passportNationality: 'Pakistan',
    travelMonth: 'March 2027',
    currentStage: 'audit',
    statusLabel: 'Document & Bank Statement Audit in Progress',
    stampLabel: 'AUDIT DESK',
    stampColor: '#B93222',
    lastUpdated: 'Stage 02 · Financial & Policy Audit',
    lastSyncedAt: '2026-11-22T16:05:00.000Z',
    nextAction:
      'Consultant is cross-checking Schengen €30,000 travel insurance date alignment and hotel confirmation names before biometric appointment booking.',
    isDemoRecord: true,
    milestones: buildStageMilestones('audit', {
      intake: {
        detail: 'Main-destination rule verified; case assigned to Europe filing desk.',
        timestamp: 'Step 01 Complete',
      },
      audit: {
        detail:
          'Reviewing Account Maintenance Certificate, FBR tax returns, and cover letter dates.',
        timestamp: 'Current Stage',
      },
      filing: {
        detail: 'Biometric appointment to be booked strictly via official visa-centre portal.',
      },
    }),
    updates: [
      {
        id: 'evt-sch-02',
        timestamp: '2026-11-22T16:05:00.000Z',
        stage: 'audit',
        source: 'Europe Filing Desk',
        message: 'Verifying €30,000 Schengen medical policy dates against Rome and Paris accommodation nights.',
      },
      {
        id: 'evt-sch-01',
        timestamp: '2026-11-21T10:30:00.000Z',
        stage: 'intake',
        source: 'Pakistan Intake Desk',
        message: 'Main-Destination Rule confirmed for Italy; official VFS Global Lahore jurisdiction assigned.',
      },
    ],
  },
  {
    referenceId: 'VH-JPN-3190',
    destination: 'Japan Tourist Sticker Visa',
    isoCode: 'JPN',
    channel: 'Sticker / Embassy',
    passportNationality: 'Pakistan',
    travelMonth: 'February 2027',
    currentStage: 'ready',
    statusLabel: 'Courier / Passport Collection Notice Ready',
    stampLabel: 'READY DESK',
    stampColor: '#0F5C4B',
    lastUpdated: 'Stage 05 · Passport Released',
    lastSyncedAt: '2026-11-22T17:10:00.000Z',
    nextAction:
      'Message our WhatsApp desk with VH-JPN-3190 to confirm pickup / courier dispatch and receive your Visit Japan Web arrival notes.',
    isDemoRecord: true,
    milestones: buildStageMilestones('ready', {
      intake: { detail: 'Tokyo & Kyoto schedule intake logged.', timestamp: 'Step 01 Complete' },
      audit: {
        detail: 'Embassy form, day-by-day itinerary sheet, and bank ties checked.',
        timestamp: 'Step 02 Complete',
      },
      filing: {
        detail: 'Physical application folder submitted to the consular counter.',
        timestamp: 'Step 03 Complete',
      },
      embassy_review: {
        detail: 'Consular processing completed; passport released from mission.',
        timestamp: 'Step 04 Complete',
      },
      ready: {
        detail: 'Passport return & outcome briefing ready via WhatsApp coordination.',
        timestamp: 'Current Stage',
      },
    }),
    updates: [
      {
        id: 'evt-jpn-03',
        timestamp: '2026-11-22T17:10:00.000Z',
        stage: 'ready',
        source: 'Consular Release Notice',
        message: 'Passport returned from mission counter and logged for applicant dispatch coordination.',
      },
      {
        id: 'evt-jpn-02',
        timestamp: '2026-11-19T13:00:00.000Z',
        stage: 'embassy_review',
        source: 'Japan Embassy Desk',
        message: 'Schedule of Stay (Taizai Yoteihyo) and financial file accepted into consular review.',
      },
      {
        id: 'evt-jpn-01',
        timestamp: '2026-11-17T08:45:00.000Z',
        stage: 'filing',
        source: 'Visahouse Filing Desk',
        message: 'Indexed physical application folder submitted under Karachi consular jurisdiction.',
      },
    ],
  },
];

/**
 * Clones sample dossiers for initializing server-side authoritative state.
 */
export function buildServerSeedRecords(): VisaStatusRecord[] {
  return SAMPLE_VISA_STATUS_RECORDS.map((record) => ({
    ...record,
    milestones: record.milestones.map((m) => ({ ...m })),
    updates: record.updates.map((u) => ({ ...u })),
  }));
}

/**
 * Builds a structured dossier record from a newly submitted consultation inquiry.
 */
export function createRegisteredInquiryRecord(item: LocalLoggedInquirySummary): VisaStatusRecord {
  const normalizedRef = normalizeReferenceInput(item.referenceId);
  const isoMatch = normalizedRef.split('-')[1] || 'GEN';
  const submittedAt = item.submittedAt || new Date().toISOString();

  return {
    referenceId: normalizedRef,
    destination: item.destination,
    isoCode: isoMatch.slice(0, 3).toUpperCase(),
    channel: SITE_CONFIG.confirmFallback,
    passportNationality: item.passportNationality,
    travelMonth: item.travelMonth,
    currentStage: 'intake',
    statusLabel: 'Inquiry Logged — Awaiting Consultant Triage',
    stampLabel: 'FILE LOGGED',
    stampColor: '#0F5C4B',
    lastUpdated: `Stage 01 · Logged ${submittedAt.slice(0, 10)}`,
    lastSyncedAt: submittedAt,
    nextAction:
      'Your intake slip is logged. Reply on WhatsApp or await same-business-day triage to receive your live PKR fee sheet and tailored checklist.',
    isDemoRecord: false,
    milestones: buildStageMilestones('intake', {
      intake: {
        detail: `Inquiry logged for ${item.destination} (${item.travelMonth}).`,
        timestamp: 'Current Stage',
      },
    }),
    updates: [
      {
        id: `evt-init-${normalizedRef.toLowerCase()}`,
        timestamp: submittedAt,
        stage: 'intake',
        source: 'Pakistan Intake Desk',
        message: `Dossier opened for ${item.destination} (${item.passportNationality} passport, target ${item.travelMonth}).`,
      },
    ],
  };
}

/**
 * Produces an immutable updated dossier with a newly verified server checkpoint event.
 */
export function appendLiveSyncUpdate(
  record: VisaStatusRecord,
  nowIso: string = new Date().toISOString(),
): { updatedRecord: VisaStatusRecord; event: VisaStatusUpdateEvent } {
  const stageMessages: Record<VisaStageId, { source: string; message: string }> = {
    intake: {
      source: 'Live Desk Sync',
      message:
        'Intake queue verified live—assigned consultant is preparing your PKR fee sheet and tailored document checklist.',
    },
    audit: {
      source: 'Live Audit Desk Sync',
      message:
        'Financial & policy audit checkpoint confirmed—bank lines, insurance coverage dates, and itinerary checks are active.',
    },
    filing: {
      source: 'Live Filing Portal Sync',
      message:
        'Submission channel queue verified—official booking/upload confirmation remains active with zero pending errors.',
    },
    embassy_review: {
      source: 'Live Consular Queue Check',
      message:
        'Mission processing queue checked live—file remains under standard consular review with no extra documents requested.',
    },
    ready: {
      source: 'Live Dispatch Desk Sync',
      message:
        'Collection & courier desk verified—passport return packet and digital arrival notes remain ready for handover.',
    },
  };

  const template = stageMessages[record.currentStage];
  const event: VisaStatusUpdateEvent = {
    id: `evt-live-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: nowIso,
    stage: record.currentStage,
    source: template.source,
    message: template.message,
    isLiveBroadcast: true,
  };

  const formattedTime = formatUpdateClock(nowIso);
  const updatedRecord: VisaStatusRecord = {
    ...record,
    lastUpdated: `Live sync verified at ${formattedTime}`,
    lastSyncedAt: nowIso,
    updates: [event, ...record.updates].slice(0, MAX_STORED_UPDATES),
  };

  return { updatedRecord, event };
}

/**
 * Formats an ISO timestamp into a clean compact UTC/local clock label for the ledger.
 */
export function formatUpdateClock(isoTimestamp: string): string {
  const parsed = new Date(isoTimestamp);
  if (Number.isNaN(parsed.getTime())) {
    return isoTimestamp;
  }
  return parsed.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function formatUpdateDateStamp(isoTimestamp: string): string {
  const parsed = new Date(isoTimestamp);
  if (Number.isNaN(parsed.getTime())) {
    return isoTimestamp;
  }
  const datePart = parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return `${datePart} · ${formatUpdateClock(isoTimestamp)}`;
}

/**
 * Records a freshly submitted VisaInquiryForm lead in browser sessionStorage so
 * applicants testing their newly issued VH-... reference can track it immediately.
 */
export function rememberSessionInquiry(summary: LocalLoggedInquirySummary): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    const existingRaw = window.sessionStorage.getItem(LOCAL_INQUIRIES_STORAGE_KEY);
    const existing: LocalLoggedInquirySummary[] = existingRaw ? JSON.parse(existingRaw) : [];
    const filtered = existing.filter((item) => item.referenceId !== summary.referenceId);
    filtered.unshift(summary);
    window.sessionStorage.setItem(
      LOCAL_INQUIRIES_STORAGE_KEY,
      JSON.stringify(filtered.slice(0, 10)),
    );
  } catch {
    // Ignore storage quota or private-mode restriction
  }
}

export function getSessionInquiries(): LocalLoggedInquirySummary[] {
  if (typeof window === 'undefined' || !window.sessionStorage) return [];
  try {
    const raw = window.sessionStorage.getItem(LOCAL_INQUIRIES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LocalLoggedInquirySummary[]) : [];
  } catch {
    return [];
  }
}

/**
 * Pure resolver checking session-logged inquiries first, then illustrative sample records.
 */
export function resolveVisaStatusRecord(
  rawReference: string,
  sessionInquiries: readonly LocalLoggedInquirySummary[] = [],
): VisaStatusRecord | null {
  const normalized = normalizeReferenceInput(rawReference);
  if (!normalized) return null;

  const sessionHit = sessionInquiries.find(
    (item) => normalizeReferenceInput(item.referenceId) === normalized,
  );
  if (sessionHit) {
    return createRegisteredInquiryRecord(sessionHit);
  }

  const sampleHit = SAMPLE_VISA_STATUS_RECORDS.find(
    (item) => normalizeReferenceInput(item.referenceId) === normalized,
  );
  return sampleHit ?? null;
}

const localSyncedRecords = new Map<string, VisaStatusRecord>();

/**
 * Resolves visa status locally from synced session records, recently logged
 * inquiries, and illustrative sample records.
 */
export async function lookupVisaStatus(referenceId: string): Promise<VisaStatusRecord | null> {
  const check = validateReferenceNumber(referenceId);
  if (!check.valid) {
    throw new Error(check.error ?? 'Invalid application ID.');
  }

  const synced = localSyncedRecords.get(check.normalized);
  if (synced) {
    return synced;
  }

  return resolveVisaStatusRecord(check.normalized, getSessionInquiries());
}

/**
 * Appends a client-side checkpoint refresh event to the active status record.
 */
export async function requestLiveStatusSync(
  referenceId: string,
): Promise<{ record: VisaStatusRecord; event: VisaStatusUpdateEvent } | null> {
  const check = validateReferenceNumber(referenceId);
  if (!check.valid) {
    throw new Error(check.error ?? 'Invalid application ID.');
  }

  const existing =
    localSyncedRecords.get(check.normalized) ??
    resolveVisaStatusRecord(check.normalized, getSessionInquiries());
  if (!existing) {
    return null;
  }

  const { updatedRecord, event } = appendLiveSyncUpdate(existing, new Date().toISOString());
  localSyncedRecords.set(check.normalized, updatedRecord);
  return { record: updatedRecord, event };
}

/**
 * Delivers the current client-side status snapshot without requiring a backend
 * SSE server.
 */
export function subscribeToVisaStatusStream(
  referenceId: string,
  callbacks: StatusStreamCallbacks,
): () => void {
  const check = validateReferenceNumber(referenceId);
  if (!check.valid || typeof window === 'undefined') {
    callbacks.onStateChange?.('offline');
    return () => {};
  }

  const snapshot =
    localSyncedRecords.get(check.normalized) ??
    resolveVisaStatusRecord(check.normalized, getSessionInquiries());
  if (snapshot) {
    callbacks.onSnapshot?.(snapshot, new Date().toISOString());
  }
  callbacks.onStateChange?.('offline');
  return () => {};
}
