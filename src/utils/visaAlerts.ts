export type VisaAlertTopicId =
  | 'schengen'
  | 'east-asia'
  | 'usa-uk'
  | 'southeast-gulf';

export interface VisaAlertTopic {
  id: VisaAlertTopicId;
  title: string;
  scope: string;
}

export const VISA_ALERT_TOPICS: readonly VisaAlertTopic[] = [
  {
    id: 'schengen',
    title: 'Schengen Type-C & VFS / BLS Alerts',
    scope: 'France, Italy, Spain, Germany, Switzerland & Netherlands slot and insurance circulars',
  },
  {
    id: 'east-asia',
    title: 'Japan & South Korea Consular Notices',
    scope: 'Embassy drop-box procedures, jurisdiction updates, and seasonal caseload shifts',
  },
  {
    id: 'usa-uk',
    title: 'US B1/B2 & UK Visitor Updates',
    scope: 'Consular interview waitlists, DS-160 reminders, and UK eVisa transitions',
  },
  {
    id: 'southeast-gulf',
    title: 'Thailand, Malaysia, Singapore & Gulf e-Visas',
    scope: 'Portal outages, PKR fee circular changes, and mandatory digital arrival cards',
  },
];

export interface PolicyDispatchNote {
  code: string;
  region: string;
  headline: string;
  summary: string;
}

export const RECENT_POLICY_DISPATCHES: readonly PolicyDispatchNote[] = [
  {
    code: 'SCH',
    region: 'Schengen Desk',
    headline: 'Main-Destination Rule & €30,000 policy wording checks',
    summary:
      'VFS & BLS counters continue rejecting policies missing explicit emergency repatriation wording or mismatched Schengen entry dates.',
  },
  {
    code: 'SEA',
    region: 'Southeast Asia',
    headline: 'Pre-flight digital arrival cards (MDAC, SGAC & eTravel)',
    summary:
      'Airline check-in counters in Karachi, Lahore, and Islamabad routinely inspect QR receipts for Malaysia, Singapore, and Philippines arrivals.',
  },
  {
    code: 'JPN',
    region: 'East Asia',
    headline: 'Provincial jurisdiction splits & Schedule of Stay clarity',
    summary:
      'Applicants must align CNIC/residence proofs with Islamabad or Karachi mission coverage before dropping off Taizai Yoteihyo itineraries.',
  },
];

export interface AlertSignupInput {
  email: string;
  topics: VisaAlertTopicId[];
  honeypot?: string;
}

export interface AlertSignupValidationResult {
  valid: boolean;
  isSpam: boolean;
  emailError?: string;
  topicsError?: string;
  normalizedEmail?: string;
  normalizedTopics?: VisaAlertTopicId[];
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeAlertEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

/**
 * Validates Visa News & Alerts signup payloads before client or server submission.
 */
export function validateAlertSignupInput(
  input: AlertSignupInput,
): AlertSignupValidationResult {
  if ((input.honeypot ?? '').trim().length > 0) {
    return { valid: false, isSpam: true };
  }

  const normalizedEmail = normalizeAlertEmail(input.email ?? '');
  let emailError: string | undefined;

  if (!normalizedEmail) {
    emailError = 'Please enter your email address to receive visa policy alerts.';
  } else if (normalizedEmail.length > 254 || !EMAIL_PATTERN.test(normalizedEmail)) {
    emailError = 'Please enter a valid email address (for example, name@domain.com).';
  }

  const validTopicIds = new Set(VISA_ALERT_TOPICS.map((t) => t.id));
  const dedupedTopics = Array.from(
    new Set((input.topics ?? []).filter((id): id is VisaAlertTopicId => validTopicIds.has(id))),
  );

  let topicsError: string | undefined;
  if (dedupedTopics.length === 0) {
    topicsError = 'Select at least one destination alert feed.';
  }

  return {
    valid: !emailError && !topicsError,
    isSpam: false,
    emailError,
    topicsError,
    normalizedEmail: emailError ? undefined : normalizedEmail,
    normalizedTopics: topicsError ? undefined : dedupedTopics,
  };
}

export function formatAlertTopicsSummary(topicIds: VisaAlertTopicId[]): string {
  const labels = topicIds
    .map((id) => VISA_ALERT_TOPICS.find((topic) => topic.id === id)?.title)
    .filter((label): label is string => Boolean(label));
  return labels.join(' · ');
}

export interface StoredAlertSubscription {
  subscriptionId: string;
  email: string;
  topics: VisaAlertTopicId[];
  subscribedAt: string;
}

const ALERT_STORAGE_KEY = 'visahouse_alert_subscription_v1';

export function rememberAlertSubscription(record: StoredAlertSubscription): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(ALERT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore restricted storage environments
  }
}

export function readRememberedAlertSubscription(): StoredAlertSubscription | null {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;
  try {
    const raw = window.sessionStorage.getItem(ALERT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredAlertSubscription>;
    if (!parsed.email || !Array.isArray(parsed.topics) || !parsed.subscriptionId) {
      return null;
    }
    return {
      subscriptionId: String(parsed.subscriptionId),
      email: String(parsed.email),
      topics: parsed.topics as VisaAlertTopicId[],
      subscribedAt: String(parsed.subscribedAt ?? ''),
    };
  } catch {
    return null;
  }
}
