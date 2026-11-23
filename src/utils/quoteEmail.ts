import { SITE_CONFIG } from '../config/site';
import {
  formatCurrencyAmount,
  type CalculatorCurrency,
  type VisaCostEstimate,
} from './visaCostCalculator';

export interface QuoteEmailInput {
  email: string;
  recipientName?: string;
  honeypot?: string;
}

export interface QuoteEmailValidationResult {
  valid: boolean;
  isSpam: boolean;
  emailError?: string;
  nameError?: string;
  normalizedEmail?: string;
  normalizedName?: string;
}

export interface QuoteEmailContent {
  quoteId: string;
  subject: string;
  textBody: string;
  htmlBody: string;
  createdAt: string;
}

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"']+@[^\s@<>()[\]\\,;:"']+\.[^\s@<>()[\]\\,;:"']{2,}$/;

/**
 * Strips CR/LF and non-printable ASCII control characters to prevent header injection.
 */
export function stripControlChars(raw: string): string {
  return raw.replace(/[\r\n\t\x00-\x1F\x7F]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

export function normalizeQuoteEmail(raw: string): string {
  return stripControlChars(raw).toLowerCase();
}

export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates recipient email and optional name for Visa Cost Calculator quote dispatch.
 */
export function validateQuoteEmailInput(input: QuoteEmailInput): QuoteEmailValidationResult {
  if ((input.honeypot ?? '').trim().length > 0) {
    return { valid: false, isSpam: true };
  }

  const normalizedEmail = normalizeQuoteEmail(input.email ?? '');
  let emailError: string | undefined;

  if (!normalizedEmail) {
    emailError = 'Please enter your email address to receive this cost quote.';
  } else if (normalizedEmail.length > 254 || !EMAIL_PATTERN.test(normalizedEmail)) {
    emailError = 'Please enter a valid email address (for example, name@domain.com).';
  }

  const rawName = stripControlChars(input.recipientName ?? '');
  let nameError: string | undefined;
  if (rawName.length > 80) {
    nameError = 'Recipient name must be 80 characters or fewer.';
  }

  return {
    valid: !emailError && !nameError,
    isSpam: false,
    emailError,
    nameError,
    normalizedEmail: emailError ? undefined : normalizedEmail,
    normalizedName: nameError ? undefined : rawName,
  };
}

/**
 * Generates an archival quote reference identifier (e.g., QTE-48291).
 */
export function createQuoteReferenceId(timestampMs = Date.now()): string {
  const digits = String(Math.abs(Math.floor(timestampMs))).slice(-5).padStart(5, '0');
  return `QTE-${digits}`;
}

/**
 * Builds clean plain-text and escaped HTML email bodies from a server-verified VisaCostEstimate.
 */
export function buildQuoteEmailContent(
  estimate: VisaCostEstimate,
  currency: CalculatorCurrency,
  options?: {
    quoteId?: string;
    recipientName?: string;
    createdAt?: string;
  },
): QuoteEmailContent {
  const quoteId = stripControlChars(options?.quoteId || createQuoteReferenceId());
  const recipientName = stripControlChars(options?.recipientName ?? '');
  const createdAt = options?.createdAt ?? new Date().toISOString();
  const formattedTotal = formatCurrencyAmount(estimate.grandTotalPkr, currency);
  const altCurrency: CalculatorCurrency = currency === 'PKR' ? 'USD' : 'PKR';
  const formattedAltTotal = formatCurrencyAmount(estimate.grandTotalPkr, altCurrency);

  const subject = stripControlChars(
    `${SITE_CONFIG.brandName} Visa Cost Quote (${quoteId}): ${estimate.destinationName} — ${formattedTotal}`,
  );

  const greeting = recipientName ? `Dear ${recipientName},` : 'Hello,';

  const textLines: string[] = [
    greeting,
    '',
    `Here is your indicative ${SITE_CONFIG.brandName} visa cost summary prepared for ${SITE_CONFIG.passportAdjective} passport travel:`,
    '',
    `QUOTE REFERENCE: ${quoteId}`,
    `Destination: ${estimate.destinationName} (${estimate.isoCode} · ${estimate.region})`,
    `Visa Category: ${estimate.visaTypeLabel}`,
    `Applicants: ${estimate.applicants} (${SITE_CONFIG.passportAdjective} Passport${estimate.applicants > 1 ? 's' : ''})`,
    `Submission Channel: ${estimate.channel}`,
    `Typical Processing Window: ${estimate.processingWindowEstimate}`,
    '',
    'ITEMIZED ESTIMATED BREAKDOWN:',
    ...estimate.lineItems.map((item) => {
      const amount =
        item.subtotalPkr === 0
          ? 'Waived / Direct'
          : formatCurrencyAmount(item.subtotalPkr, currency);
      const perUnit =
        estimate.applicants > 1 && item.subtotalPkr > 0
          ? ` (${formatCurrencyAmount(item.perApplicantPkr, currency)} × ${estimate.applicants})`
          : '';
      return `• ${item.label}: ${amount}${perUnit}\n  ${item.detail}`;
    }),
    ...(estimate.groupSavingsPkr > 0
      ? [
          '',
          `Companion Service Savings Applied (15% on additional applicants): −${formatCurrencyAmount(estimate.groupSavingsPkr, currency)}`,
        ]
      : []),
    '',
    `ESTIMATED GRAND TOTAL: ${formattedTotal} (approx. ${formattedAltTotal})`,
    ...(estimate.applicants > 1
      ? [
          `Average per Applicant: ${formatCurrencyAmount(estimate.perApplicantAveragePkr, currency)}`,
        ]
      : []),
    '',
    'IMPORTANT CONSULAR NOTES:',
    ...estimate.notes.map((note) => `- ${note}`),
    `- ${estimate.exchangeRateNotice}`,
    '',
    `Desk Hours: ${SITE_CONFIG.officeHours}`,
    SITE_CONFIG.disclaimer,
  ];

  const textBody = textLines.join('\n');

  const safeRows = estimate.lineItems
    .map((item) => {
      const amount =
        item.subtotalPkr === 0
          ? 'Waived / Direct'
          : formatCurrencyAmount(item.subtotalPkr, currency);
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #d6cebe;vertical-align:top;">
          <div style="font-weight:600;color:#1c1917;">${escapeHtml(item.label)}</div>
          <div style="font-size:12px;color:#57534e;margin-top:2px;">${escapeHtml(item.detail)}</div>
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #d6cebe;text-align:right;white-space:nowrap;font-family:monospace;font-weight:600;color:#1c1917;vertical-align:top;">
          ${escapeHtml(amount)}
        </td>
      </tr>`;
    })
    .join('\n');

  const htmlBody = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f7f4ee;font-family:Georgia,serif;color:#1c1917;">
  <div style="max-width:600px;margin:0 auto;background:#fbf9f5;border:1px solid #292524;padding:24px;">
    <p style="margin:0;font-family:monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#14532d;">
      ${escapeHtml(SITE_CONFIG.brandName)} · Quote Reference ${escapeHtml(quoteId)}
    </p>
    <h1 style="margin:8px 0 4px;font-size:22px;font-weight:500;">
      ${escapeHtml(estimate.destinationName)} — ${escapeHtml(estimate.visaTypeLabel)}
    </h1>
    <p style="margin:0 0 16px;font-size:13px;color:#57534e;">
      ${escapeHtml(greeting)} Indicative cost summary for ${estimate.applicants} ${escapeHtml(SITE_CONFIG.passportAdjective)} passport applicant${estimate.applicants > 1 ? 's' : ''}.
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${safeRows}
    </table>
    <div style="margin-top:16px;padding-top:12px;border-top:2px solid #292524;display:flex;justify-content:space-between;">
      <strong style="font-family:monospace;font-size:12px;text-transform:uppercase;">Estimated Grand Total</strong>
      <strong style="font-family:monospace;font-size:18px;color:#14532d;">${escapeHtml(formattedTotal)}</strong>
    </div>
    <p style="margin:8px 0 0;font-size:12px;color:#57534e;">
      Approx. ${escapeHtml(formattedAltTotal)} · Typical processing: ${escapeHtml(estimate.processingWindowEstimate)}
    </p>
    <p style="margin:16px 0 0;font-size:12px;color:#57534e;line-height:1.5;">
      ${escapeHtml(estimate.exchangeRateNotice)}<br/>
      ${escapeHtml(SITE_CONFIG.disclaimer)}
    </p>
  </div>
</body>
</html>`;

  return {
    quoteId,
    subject,
    textBody,
    htmlBody,
    createdAt,
  };
}

/**
 * Constructs a safe mailto: URI using validated recipient email and strict URL encoding.
 * Caps body length to avoid OS / browser mailto URI limits.
 */
export function buildSafeMailtoHref(
  email: string,
  subject: string,
  body: string,
): string {
  const normalizedEmail = normalizeQuoteEmail(email);
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return '#';
  }
  const safeSubject = stripControlChars(subject).slice(0, 180);
  const safeBody = body.length > 1500 ? `${body.slice(0, 1460).trimEnd()}\n…` : body;
  return `mailto:${encodeURIComponent(normalizedEmail)}?subject=${encodeURIComponent(safeSubject)}&body=${encodeURIComponent(safeBody)}`;
}

const QUOTE_EMAIL_STORAGE_KEY = 'visahouse_quote_email_v1';

export function rememberQuoteEmail(email: string): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    const cleaned = normalizeQuoteEmail(email);
    if (EMAIL_PATTERN.test(cleaned)) {
      window.sessionStorage.setItem(QUOTE_EMAIL_STORAGE_KEY, cleaned);
    }
  } catch {
    // Ignore restricted storage environments
  }
}

export function readRememberedQuoteEmail(): string {
  if (typeof window === 'undefined' || !window.sessionStorage) return '';
  try {
    const raw = window.sessionStorage.getItem(QUOTE_EMAIL_STORAGE_KEY) ?? '';
    const cleaned = normalizeQuoteEmail(raw);
    return EMAIL_PATTERN.test(cleaned) ? cleaned : '';
  } catch {
    return '';
  }
}
