import { SITE_CONFIG } from '../config/site';
import type { LeadFormInput } from '../data/types';
import { validateLeadForm } from '../utils/formatters';
import { rememberSessionInquiry } from '../utils/visaStatusTracker';

export interface LeadSubmissionPayload extends LeadFormInput {
  sourcePath: string;
  submittedAt: string;
}

export interface LeadSubmissionResult {
  ok: boolean;
  referenceId: string;
  message: string;
}

/**
 * Single integration point for wiring Visahouse leads to your backend,
 * CRM webhook, or WhatsApp automation API.
 *
 * To connect your own endpoint, replace the local confirmation block below with:
 *
 *   const res = await fetch('/api/leads', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) throw new Error('Lead submission failed');
 *   return res.json();
 */
export async function submitLead(
  payload: LeadSubmissionPayload,
): Promise<LeadSubmissionResult> {
  const check = validateLeadForm(payload);

  if (check.isSpam) {
    return {
      ok: true,
      referenceId: 'VH-RECEIVED',
      message: 'Inquiry logged.',
    };
  }

  if (!check.valid) {
    throw new Error('Please complete all required fields before submitting.');
  }

  // Simulate brief network settling without blocking static hosting
  await new Promise((resolve) => setTimeout(resolve, 180));

  const codePrefix = payload.destination
    .replace(/[^A-Za-z]/g, '')
    .slice(0, 3)
    .toUpperCase() || 'GEN';
  const suffix = String(Date.now()).slice(-4);
  const referenceId = `VH-${codePrefix}-${suffix}`;

  // Mock lead submission: log captured inquiry data to the console
  console.log('[Visahouse] submitLead:', {
    referenceId,
    name: payload.fullName.trim(),
    whatsapp: payload.whatsapp.trim(),
    destination: payload.destination.trim(),
    passportNationality: payload.passportNationality.trim(),
    travelMonth: payload.travelMonth.trim(),
    notes: payload.notes.trim(),
    sourcePath: payload.sourcePath,
    submittedAt: payload.submittedAt,
  });

  rememberSessionInquiry({
    referenceId,
    destination: payload.destination.trim(),
    passportNationality: payload.passportNationality.trim(),
    travelMonth: payload.travelMonth.trim(),
    submittedAt: payload.submittedAt,
  });

  // Optional zero-backend form delivery (Formspree / Web3Forms / CRM webhook) when configured
  const endpoint = SITE_CONFIG.leadFormEndpoint.trim();
  let deliveredRemotely = false;
  if (endpoint && typeof fetch === 'function') {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          referenceId,
          name: payload.fullName.trim(),
          whatsapp: payload.whatsapp.trim(),
          destination: payload.destination.trim(),
          passportNationality: payload.passportNationality.trim(),
          travelMonth: payload.travelMonth.trim(),
          notes: payload.notes.trim(),
          sourcePath: payload.sourcePath,
          submittedAt: payload.submittedAt,
        }),
      });
      deliveredRemotely = res.ok;
    } catch {
      deliveredRemotely = false;
    }
  }

  return {
    ok: true,
    referenceId,
    message: deliveredRemotely
      ? 'Your inquiry has been sent to our desk. A Visahouse consultant will review your travel dates and contact you on WhatsApp with the current document checklist and fee confirmation.'
      : 'Your reference ID is ready. Tap "Continue on WhatsApp with Reference" below to send your details straight to our visa desk on +92 331 8877655 for the fastest reply.',
  };
}
