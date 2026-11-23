import {
  rememberAlertSubscription,
  validateAlertSignupInput,
  type StoredAlertSubscription,
  type VisaAlertTopicId,
} from '../utils/visaAlerts';

export interface AlertSubscriptionRequest {
  email: string;
  topics: VisaAlertTopicId[];
  sourcePath: string;
  honeypot?: string;
}

export interface AlertSubscriptionResult {
  ok: boolean;
  subscriptionId: string;
  email: string;
  topics: VisaAlertTopicId[];
  message: string;
}

/**
 * Registers a user's email address and selected destination alert feeds for
 * Visahouse policy circulars locally in the browser session.
 */
export async function subscribeToVisaAlerts(
  payload: AlertSubscriptionRequest,
): Promise<AlertSubscriptionResult> {
  const check = validateAlertSignupInput({
    email: payload.email,
    topics: payload.topics,
    honeypot: payload.honeypot,
  });

  if (check.isSpam) {
    return {
      ok: true,
      subscriptionId: 'ALR-RECEIVED',
      email: '',
      topics: [],
      message: 'Subscription noted.',
    };
  }

  if (!check.valid || !check.normalizedEmail || !check.normalizedTopics) {
    throw new Error(
      check.emailError ??
        check.topicsError ??
        'Please enter a valid email address and select at least one destination feed.',
    );
  }

  const normalizedEmail = check.normalizedEmail;
  const normalizedTopics = check.normalizedTopics;

  await new Promise((resolve) => setTimeout(resolve, 160));
  const suffix = String(Date.now()).slice(-5);
  const subscriptionId = `ALR-${suffix}`;

  console.log('[Visahouse] subscribeToVisaAlerts:', {
    subscriptionId,
    email: normalizedEmail,
    topics: normalizedTopics,
    sourcePath: payload.sourcePath,
    subscribedAt: new Date().toISOString(),
  });

  const stored: StoredAlertSubscription = {
    subscriptionId,
    email: normalizedEmail,
    topics: normalizedTopics,
    subscribedAt: new Date().toISOString(),
  };
  rememberAlertSubscription(stored);

  return {
    ok: true,
    subscriptionId,
    email: normalizedEmail,
    topics: normalizedTopics,
    message:
      'Confirmed—you are now subscribed to Visahouse visa updates for your selected countries.',
  };
}
