import type { VisaTypeId } from '../utils/checklistLibrary';
import {
  buildQuoteEmailContent,
  createQuoteReferenceId,
  rememberQuoteEmail,
  validateQuoteEmailInput,
} from '../utils/quoteEmail';
import {
  calculateVisaCost,
  type CalculatorCurrency,
} from '../utils/visaCostCalculator';

export interface SendQuoteEmailRequest {
  email: string;
  recipientName?: string;
  destinationSlug: string;
  visaTypeId: VisaTypeId;
  applicants: number;
  currency: CalculatorCurrency;
  includeTravelInsurance: boolean;
  includeExpressAudit: boolean;
  honeypot?: string;
}

export interface SendQuoteEmailResult {
  ok: boolean;
  quoteId: string;
  email: string;
  recipientName: string;
  deliveryMode: 'email_sent' | 'desk_recorded';
  subject: string;
  textBody: string;
  sentAt: string;
  message: string;
}

/**
 * Builds and logs an estimated Visa Cost Calculator quote summary locally
 * so users can open or copy their itemized summary directly in their email app.
 */
export async function sendVisaQuoteEmail(
  payload: SendQuoteEmailRequest,
): Promise<SendQuoteEmailResult> {
  const check = validateQuoteEmailInput({
    email: payload.email,
    recipientName: payload.recipientName,
    honeypot: payload.honeypot,
  });

  if (check.isSpam) {
    return {
      ok: true,
      quoteId: 'QTE-RECEIVED',
      email: '',
      recipientName: '',
      deliveryMode: 'desk_recorded',
      subject: '',
      textBody: '',
      sentAt: new Date().toISOString(),
      message: 'Quote request noted.',
    };
  }

  if (!check.valid || !check.normalizedEmail) {
    throw new Error(
      check.emailError ??
        check.nameError ??
        'Please enter a valid email address to receive this cost quote.',
    );
  }

  const normalizedEmail = check.normalizedEmail;
  const normalizedName = check.normalizedName ?? '';

  await new Promise((resolve) => setTimeout(resolve, 160));
  const estimate = calculateVisaCost({
    destinationSlug: payload.destinationSlug,
    visaTypeId: payload.visaTypeId,
    applicants: payload.applicants,
    includeTravelInsurance: payload.includeTravelInsurance,
    includeExpressAudit: payload.includeExpressAudit,
  });

  const quoteId = createQuoteReferenceId();
  const content = buildQuoteEmailContent(estimate, payload.currency, {
    quoteId,
    recipientName: normalizedName,
  });

  rememberQuoteEmail(normalizedEmail);

  return {
    ok: true,
    quoteId: content.quoteId,
    email: normalizedEmail,
    recipientName: normalizedName,
    deliveryMode: 'desk_recorded',
    subject: content.subject,
    textBody: content.textBody,
    sentAt: content.createdAt,
    message:
      'Your detailed quote summary is saved and ready. Click "Open in Email App" below to keep a copy in your inbox right away.',
  };
}
