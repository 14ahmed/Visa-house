import { useEffect, useId, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calculator,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  Send,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DESTINATION_SUMMARIES as DESTINATIONS, REGIONS } from '../data/destinationIndex';
import {
  sendVisaQuoteEmail,
  type SendQuoteEmailResult,
} from '../services/quoteEmailService';
import { VISA_TYPE_OPTIONS, type VisaTypeId } from '../utils/checklistLibrary';
import { buildWhatsAppUrl } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  buildSafeMailtoHref,
  readRememberedQuoteEmail,
  validateQuoteEmailInput,
} from '../utils/quoteEmail';
import {
  CALCULATOR_ADDONS,
  calculateVisaCost,
  clampApplicants,
  formatCostEstimateSummary,
  formatCurrencyAmount,
  type CalculatorCurrency,
} from '../utils/visaCostCalculator';

interface VisaCostCalculatorProps {
  id?: string;
  defaultDestinationSlug?: string;
  defaultVisaTypeId?: VisaTypeId;
  sectionNumber?: string;
  heading?: string;
  subcopy?: string;
}

const POPULAR_SHORTCUTS: ReadonlyArray<{ slug: string; country: string; shortEn: string }> = [
  { slug: 'schengen-states', country: 'Schengen States', shortEn: 'Schengen' },
  { slug: 'uk', country: 'United Kingdom', shortEn: 'UK' },
  { slug: 'usa', country: 'United States', shortEn: 'USA' },
  { slug: 'canada', country: 'Canada', shortEn: 'Canada' },
  { slug: 'thailand', country: 'Thailand', shortEn: 'Thailand' },
  { slug: 'japan', country: 'Japan', shortEn: 'Japan' },
];

/**
 * Interactive Visa Cost Calculator for Pakistani passport holders.
 * Instantly computes indicative embassy fees, visa-centre handling, Visahouse
 * service charges (with companion savings), and optional add-ons across all 38 destinations.
 */
export function VisaCostCalculator({
  id = 'cost-calculator',
  defaultDestinationSlug = 'schengen-states',
  defaultVisaTypeId = 'tourist',
  sectionNumber,
  heading,
  subcopy,
}: VisaCostCalculatorProps) {
  const { t, isUrdu, localizeCountry, localizeRegion, localizeChannel, localizeVisaType } =
    useLanguage();
  const resolvedSectionNumber = sectionNumber ?? t.home.no03CalcEyebrow;
  const resolvedHeading = heading ?? t.calculator.heading;
  const resolvedSubcopy = subcopy ?? t.calculator.subcopy;
  const [destinationSlug, setDestinationSlug] = useState<string>(defaultDestinationSlug);
  const [visaTypeId, setVisaTypeId] = useState<VisaTypeId>(defaultVisaTypeId);
  const [applicants, setApplicants] = useState<number>(1);
  const [currency, setCurrency] = useState<CalculatorCurrency>('PKR');
  const [includeTravelInsurance, setIncludeTravelInsurance] = useState<boolean>(false);
  const [includeExpressAudit, setIncludeExpressAudit] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Email Quote Dispatch state
  const [emailPanelOpen, setEmailPanelOpen] = useState<boolean>(false);
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [emailHoneypot, setEmailHoneypot] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailServerError, setEmailServerError] = useState<string | null>(null);
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [sentReceipt, setSentReceipt] = useState<{
    result: SendQuoteEmailResult;
    snapshotKey: string;
    snapshotLabel: string;
    snapshotTotal: string;
  } | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState<boolean>(false);

  const headingId = useId();
  const destinationSelectId = useId();
  const visaTypeSelectId = useId();
  const quotePanelId = useId();
  const quoteEmailInputId = useId();
  const quoteNameInputId = useId();
  const quoteHoneypotId = useId();

  useEffect(() => {
    const saved = readRememberedQuoteEmail();
    if (saved) {
      setRecipientEmail(saved);
    }
    if (typeof window !== 'undefined') {
      const requested = new URLSearchParams(window.location.search).get('country');
      if (requested && DESTINATIONS.some((d) => d.slug === requested)) {
        setDestinationSlug(requested);
      }
    }
  }, []);

  const groupedDestinations = useMemo(
    () =>
      REGIONS.map((region) => ({
        region,
        items: DESTINATIONS.filter((d) => d.region === region),
      })).filter((group) => group.items.length > 0),
    [],
  );

  const estimate = useMemo(
    () =>
      calculateVisaCost({
        destinationSlug,
        visaTypeId,
        applicants,
        includeTravelInsurance,
        includeExpressAudit,
      }),
    [destinationSlug, visaTypeId, applicants, includeTravelInsurance, includeExpressAudit],
  );

  const currentSnapshotKey = `${destinationSlug}|${visaTypeId}|${applicants}|${currency}|${includeTravelInsurance}|${includeExpressAudit}`;
  const isReceiptStale = Boolean(sentReceipt && sentReceipt.snapshotKey !== currentSnapshotKey);

  const handleCopyEstimate = async () => {
    const text = formatCostEstimateSummary(estimate, currency);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setDestinationSlug(defaultDestinationSlug);
    setVisaTypeId(defaultVisaTypeId);
    setApplicants(1);
    setCurrency('PKR');
    setIncludeTravelInsurance(false);
    setIncludeExpressAudit(false);
    setCopied(false);
    setEmailError(null);
    setEmailServerError(null);
  };

  const handleToggleEmailPanel = () => {
    setEmailPanelOpen((open) => !open);
    setEmailError(null);
    setEmailServerError(null);
  };

  const handleSendQuoteEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailServerError(null);

    const trimmed = recipientEmail.trim();
    const check = validateQuoteEmailInput({
      email: recipientEmail,
      recipientName,
      honeypot: emailHoneypot,
    });

    if (check.isSpam) {
      setSentReceipt({
        result: {
          ok: true,
          quoteId: 'QTE-RECEIVED',
          email: trimmed,
          recipientName: recipientName.trim(),
          deliveryMode: 'desk_recorded',
          subject: '',
          textBody: '',
          sentAt: new Date().toISOString(),
          message: 'Quote request noted.',
        },
        snapshotKey: currentSnapshotKey,
        snapshotLabel: `${localizeCountry(estimate.destinationName)} · ${localizeVisaType(visaTypeId, estimate.visaTypeLabel)}`,
        snapshotTotal: formatCurrencyAmount(estimate.grandTotalPkr, currency),
      });
      return;
    }

    if (!check.valid) {
      if (!trimmed) {
        setEmailError(t.calculator.emailRequiredError);
      } else if (check.emailError) {
        setEmailError(t.calculator.emailInvalidError);
      } else if (check.nameError) {
        setEmailError(check.nameError);
      }
      return;
    }

    setEmailError(null);
    setSendingEmail(true);
    try {
      const result = await sendVisaQuoteEmail({
        email: recipientEmail,
        recipientName,
        destinationSlug,
        visaTypeId,
        applicants,
        currency,
        includeTravelInsurance,
        includeExpressAudit,
        honeypot: emailHoneypot,
      });
      setSentReceipt({
        result,
        snapshotKey: currentSnapshotKey,
        snapshotLabel: `${localizeCountry(estimate.destinationName)} · ${localizeVisaType(visaTypeId, estimate.visaTypeLabel)}`,
        snapshotTotal: formatCurrencyAmount(estimate.grandTotalPkr, currency),
      });
      setShowEmailPreview(false);
    } catch (err) {
      setEmailServerError(
        err instanceof Error
          ? err.message
          : 'Unable to dispatch your visa cost quote right now. Please try again.',
      );
    } finally {
      setSendingEmail(false);
    }
  };

  const whatsappHref = buildWhatsAppUrl(
    `${estimate.destinationName} ${estimate.visaTypeLabel} cost quote`,
    `Hello Visahouse, I calculated an estimate for ${estimate.destinationName} (${estimate.visaTypeLabel}) for ${estimate.applicants} Pakistani passport applicant(s) — approx. ${formatCurrencyAmount(estimate.grandTotalPkr, currency)}. Please confirm the exact live embassy fee and service charges.`,
  );

  const mailtoHref = sentReceipt
    ? buildSafeMailtoHref(
        sentReceipt.result.email,
        sentReceipt.result.subject,
        sentReceipt.result.textBody,
      )
    : '#';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="paper-card-texture border border-ink/80 rounded-[3px] p-5 sm:p-8 lg:p-10 scroll-mt-24"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-ink/75">
        <div className="max-w-3xl">
          <p className="mono-label text-visa-green">{resolvedSectionNumber}</p>
          <h2
            id={headingId}
            className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5 text-balance"
          >
            {resolvedHeading}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        {/* Currency Segmented Toggle */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <span className="mono-label text-ink-muted">{t.calculator.displayCurrency}</span>
          <div
            role="group"
            aria-label={t.calculator.displayCurrency}
            className="inline-flex border border-ink/60 rounded-[2px] bg-paper p-0.5"
            dir="ltr"
          >
            {(['PKR', 'USD'] as const).map((unit) => {
              const active = currency === unit;
              return (
                <button
                  key={unit}
                  type="button"
                  onClick={() => setCurrency(unit)}
                  aria-pressed={active}
                  className={`font-latin-mono min-h-[38px] px-3.5 py-1.5 text-xs uppercase tracking-[0.1em] rounded-[1px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-visa-green text-slip font-medium'
                      : 'text-ink-body hover:text-ink'
                  }`}
                >
                  {unit}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 2-Column Calculator Grid */}
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column: Interactive Configuration Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Quick Destination Presets */}
          <div>
            <p className="mono-label text-ink-muted mb-2">{t.calculator.popularRoutes}</p>
            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label={t.calculator.popularRoutes}
            >
              {POPULAR_SHORTCUTS.map((item) => {
                const active = destinationSlug === item.slug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => {
                      setDestinationSlug(item.slug);
                      setCopied(false);
                    }}
                    aria-pressed={active}
                    className={`min-h-[38px] px-3 py-1.5 text-xs rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                    } ${
                      active
                        ? 'bg-ink text-slip border-ink'
                        : 'bg-paper text-ink-body border-rule hover:border-ink/70 hover:text-ink'
                    }`}
                  >
                    {isUrdu ? localizeCountry(item.country) : item.shortEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Destination Select */}
          <div>
            <label htmlFor={destinationSelectId} className="block mono-label text-ink mb-1.5">
              {formatLocalizedCopy(t.calculator.step1Destination, {
                count: DESTINATIONS.length,
              })}
            </label>
            <select
              id={destinationSelectId}
              name="calculatorDestination"
              value={destinationSlug}
              onChange={(e) => {
                setDestinationSlug(e.target.value);
                setCopied(false);
              }}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-paper border border-ink/45 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              {groupedDestinations.map((group) => (
                <optgroup key={group.region} label={localizeRegion(group.region)}>
                  {group.items.map((dest) => (
                    <option key={dest.slug} value={dest.slug}>
                      {localizeCountry(dest.country)} ({dest.isoCode}) — {localizeChannel(dest.channel)}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Visa Type Select */}
          <div>
            <label htmlFor={visaTypeSelectId} className="block mono-label text-ink mb-1.5">
              {t.calculator.step2VisaType}
            </label>
            <select
              id={visaTypeSelectId}
              name="calculatorVisaType"
              value={visaTypeId}
              onChange={(e) => {
                setVisaTypeId(e.target.value as VisaTypeId);
                setCopied(false);
              }}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-paper border border-ink/45 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              {VISA_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {localizeVisaType(opt.id, opt.label)}
                </option>
              ))}
            </select>
          </div>

          {/* Applicant Count Stepper */}
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <span className="mono-label text-ink">{t.calculator.step3Applicants}</span>
              <span className="text-xs text-ink-muted">
                {applicants > 1 ? t.calculator.savingsActive : t.calculator.savingsPrompt}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 bg-paper border border-ink/45 rounded-[2px] p-1.5">
              <button
                type="button"
                onClick={() => {
                  setApplicants((n) => clampApplicants(n - 1));
                  setCopied(false);
                }}
                disabled={applicants <= 1}
                aria-label="Decrease number of applicants"
                className="inline-flex items-center justify-center min-h-[40px] min-w-[40px] bg-slip border border-rule text-ink hover:border-ink disabled:opacity-45 disabled:cursor-not-allowed rounded-[2px] transition-colors cursor-pointer"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="text-center">
                <span
                  data-testid="calculator-applicants-value"
                  className="font-latin-mono text-lg font-semibold text-ink tabular-nums"
                >
                  {applicants}
                </span>
                <span className="ms-2 text-xs text-ink-muted">
                  {applicants === 1 ? t.calculator.passportSingular : t.calculator.passportPlural}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setApplicants((n) => clampApplicants(n + 1));
                  setCopied(false);
                }}
                disabled={applicants >= 10}
                aria-label="Increase number of applicants"
                className="inline-flex items-center justify-center min-h-[40px] min-w-[40px] bg-slip border border-rule text-ink hover:border-ink disabled:opacity-45 disabled:cursor-not-allowed rounded-[2px] transition-colors cursor-pointer"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Optional Add-ons */}
          <div className="pt-2 border-t border-rule space-y-2.5">
            <p className="mono-label text-ink">{t.calculator.step4Addons}</p>

            <label className="flex items-start gap-3 p-3 bg-paper border border-rule hover:border-ink/50 rounded-[2px] cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={includeTravelInsurance}
                onChange={(e) => {
                  setIncludeTravelInsurance(e.target.checked);
                  setCopied(false);
                }}
                className="mt-0.5 h-4 w-4 accent-visa-green shrink-0 cursor-pointer"
              />
              <span className="flex-1 min-w-0">
                <span className="flex items-baseline justify-between gap-2 text-sm font-medium text-ink">
                  <span>{CALCULATOR_ADDONS[0].label}</span>
                  <span className="font-latin-mono text-xs text-visa-green tabular-nums whitespace-nowrap shrink-0">
                    +{formatCurrencyAmount(CALCULATOR_ADDONS[0].pricePerApplicantPkr, currency)}/ea
                  </span>
                </span>
                <span className="block mt-0.5 text-xs text-ink-muted leading-relaxed">
                  {CALCULATOR_ADDONS[0].description}
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 bg-paper border border-rule hover:border-ink/50 rounded-[2px] cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={includeExpressAudit}
                onChange={(e) => {
                  setIncludeExpressAudit(e.target.checked);
                  setCopied(false);
                }}
                className="mt-0.5 h-4 w-4 accent-visa-green shrink-0 cursor-pointer"
              />
              <span className="flex-1 min-w-0">
                <span className="flex items-baseline justify-between gap-2 text-sm font-medium text-ink">
                  <span>{CALCULATOR_ADDONS[1].label}</span>
                  <span className="font-latin-mono text-xs text-visa-green tabular-nums whitespace-nowrap shrink-0">
                    +{formatCurrencyAmount(CALCULATOR_ADDONS[1].pricePerApplicantPkr, currency)}/ea
                  </span>
                </span>
                <span className="block mt-0.5 text-xs text-ink-muted leading-relaxed">
                  {CALCULATOR_ADDONS[1].description}
                </span>
              </span>
            </label>
          </div>

          {/* Utility Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <Link
              to={`/visas/${estimate.destinationSlug}`}
              className={`inline-flex items-center gap-1.5 text-xs text-visa-green hover:underline underline-offset-4 whitespace-nowrap ${
                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
              }`}
            >
              <span>
                {formatLocalizedCopy(t.calculator.viewGuide, {
                  country: localizeCountry(estimate.destinationName),
                })}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex items-center gap-1.5 min-h-[36px] px-2.5 text-xs text-ink-muted hover:text-ink cursor-pointer whitespace-nowrap ${
                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t.common.reset}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Archival Cost Ledger */}
        <div
          aria-live="polite"
          className="lg:col-span-7 bg-paper border border-ink/75 rounded-[3px] p-5 sm:p-7 flex flex-col justify-between"
        >
          <div>
            {/* Ledger Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-ink/35">
              <div className="min-w-0 flex-1">
                <div
                  className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted ${
                    isUrdu ? '' : 'font-mono'
                  }`}
                >
                  <span className="font-latin-mono font-semibold" style={{ color: estimate.accentHex }}>
                    {estimate.isoCode}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{localizeRegion(estimate.region)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{localizeChannel(estimate.channel)}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-[26px] font-medium text-ink mt-1.5 leading-snug">
                  {localizeCountry(estimate.destinationName)} —{' '}
                  {localizeVisaType(visaTypeId, estimate.visaTypeLabel)}
                </h3>
                <p className="mt-1.5 text-xs text-ink-muted">
                  {t.calculator.typicalProcessing}{' '}
                  <span className="text-ink-body font-medium">{estimate.processingWindowEstimate}</span>
                </p>
              </div>

              <div className="text-start sm:text-end shrink-0">
                <p className="mono-label text-visa-green">{t.calculator.estimatedTotal}</p>
                <p
                  data-testid="calculator-grand-total"
                  dir="ltr"
                  className="font-display text-3xl sm:text-[34px] font-semibold text-ink tracking-tight mt-1 tabular-nums whitespace-nowrap"
                >
                  {formatCurrencyAmount(estimate.grandTotalPkr, currency)}
                </p>
                <p
                  dir="ltr"
                  className="mt-0.5 text-xs font-latin-mono text-ink-muted tabular-nums whitespace-nowrap"
                >
                  {currency === 'PKR'
                    ? `≈ ${formatCurrencyAmount(estimate.grandTotalPkr, 'USD')}`
                    : `≈ ${formatCurrencyAmount(estimate.grandTotalPkr, 'PKR')}`}
                  {estimate.applicants > 1 && (
                    <>
                      {' '}· {formatCurrencyAmount(estimate.perApplicantAveragePkr, currency)}/ea
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Itemized Cost Rows */}
            <dl className="mt-4 divide-y divide-rule text-sm">
              {estimate.lineItems.map((item) => (
                <div
                  key={item.id}
                  data-testid={`cost-row-${item.id}`}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <dt className="min-w-0 pe-2">
                    <span className="block font-medium text-ink">{item.label}</span>
                    <span className="block text-xs text-ink-muted mt-0.5 leading-relaxed">
                      {item.detail}
                    </span>
                  </dt>
                  <dd className="sm:text-end shrink-0 tabular-nums">
                    <span
                      dir="ltr"
                      className="font-latin-mono text-sm sm:text-[15px] font-semibold text-ink"
                    >
                      {item.subtotalPkr === 0
                        ? t.calculator.waivedDirect
                        : formatCurrencyAmount(item.subtotalPkr, currency)}
                    </span>
                    {estimate.applicants > 1 && item.subtotalPkr > 0 && (
                      <span
                        dir="ltr"
                        className="block font-latin-mono text-[11px] text-ink-muted mt-0.5"
                      >
                        {formatCurrencyAmount(item.perApplicantPkr, currency)} × {estimate.applicants}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Companion Savings Highlight Row (only when 2+ applicants) */}
            {estimate.groupSavingsPkr > 0 && (
              <div
                className={`mt-2 pt-3 border-t border-rule flex items-baseline justify-between gap-4 text-xs text-visa-green ${
                  isUrdu ? '' : 'font-mono'
                }`}
              >
                <span>{t.calculator.groupSavingsApplied}</span>
                <span dir="ltr" className="font-latin-mono font-semibold tabular-nums whitespace-nowrap">
                  −{formatCurrencyAmount(estimate.groupSavingsPkr, currency)}
                </span>
              </div>
            )}

            {/* Total Summary Footer Bar */}
            <div className="mt-4 pt-4 border-t border-ink/70 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="mono-label text-ink">
                  {formatLocalizedCopy(t.calculator.estimatedGrandTotal, {
                    count: estimate.applicants,
                    unit:
                      estimate.applicants === 1
                        ? t.calculator.applicantSingular
                        : t.calculator.applicantPlural,
                  })}
                </span>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  {estimate.exchangeRateNotice}
                </p>
              </div>
              <span
                dir="ltr"
                className="font-latin-mono text-xl font-semibold text-visa-green tabular-nums whitespace-nowrap shrink-0"
              >
                {formatCurrencyAmount(estimate.grandTotalPkr, currency)}
              </span>
            </div>

            {/* Consular Notes */}
            <ul className="mt-4 pt-4 border-t border-rule space-y-1.5 text-xs text-ink-body list-disc ps-4">
              {estimate.notes.map((note, idx) => (
                <li key={idx} className="leading-relaxed">
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Primary & Utility Actions */}
          <div className="mt-6 pt-5 border-t border-ink/30 flex flex-wrap items-center gap-2.5">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-visa-green text-slip hover:bg-visa-green-dark text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.calculator.confirmWhatsapp}</span>
            </a>

            <button
              type="button"
              onClick={handleToggleEmailPanel}
              aria-expanded={emailPanelOpen}
              aria-controls={quotePanelId}
              className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 border text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                emailPanelOpen
                  ? 'bg-ink text-slip border-ink'
                  : 'bg-slip border-ink/75 text-ink hover:border-visa-green hover:text-visa-green'
              }`}
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.calculator.emailQuoteBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyEstimate}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-slip border border-ink/55 text-ink hover:border-visa-green hover:text-visa-green text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-visa-green shrink-0" aria-hidden="true" />
                  <span>{t.common.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.calculator.copyEstimate}</span>
                </>
              )}
            </button>

            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 text-sm font-medium text-ink hover:text-visa-green hover:underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              <Calculator className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.calculator.startDossier}</span>
            </a>
          </div>

          {/* Inline Archival Quote Email Dispatch Slip */}
          {emailPanelOpen && (
            <div
              id={quotePanelId}
              data-testid="quote-email-panel"
              className="mt-5 pt-5 border-t border-ink/30"
            >
              {sentReceipt ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-slip border border-visa-green/55 rounded-[2px] p-4 sm:p-5 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="h-7 w-7 rounded-[2px] bg-visa-green text-slip flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="mono-label text-visa-green">
                        <span>
                          {sentReceipt.result.deliveryMode === 'email_sent'
                            ? t.calculator.emailReceiptSentBadge
                            : t.calculator.emailReceiptLoggedBadge}
                        </span>
                        <span aria-hidden="true"> · </span>
                        <span dir="ltr" className="font-latin-mono">
                          {sentReceipt.result.quoteId}
                        </span>
                      </p>
                      <p
                        dir="ltr"
                        className="font-latin-mono text-sm font-semibold text-ink mt-1 break-all"
                      >
                        {sentReceipt.result.email}
                      </p>
                      <p className="mt-1.5 text-sm text-ink-body leading-relaxed">
                        {sentReceipt.result.message}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-rule flex flex-wrap items-baseline justify-between gap-2 text-xs text-ink-muted">
                    <span>
                      {t.calculator.emailSummaryPreviewLabel}{' '}
                      <span className="text-ink font-medium">{sentReceipt.snapshotLabel}</span>
                    </span>
                    <span
                      dir="ltr"
                      className="font-latin-mono font-semibold text-visa-green tabular-nums whitespace-nowrap"
                    >
                      {sentReceipt.snapshotTotal}
                    </span>
                  </div>

                  {isReceiptStale && (
                    <div className="pt-3 border-t border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-ink-body">
                      <span>{t.calculator.emailUpdatedNotice}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSentReceipt(null);
                          setShowEmailPreview(false);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 min-h-[38px] px-3 py-1.5 bg-ink text-slip hover:bg-ink/90 text-xs font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Send className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{t.calculator.emailSendUpdatedBtn}</span>
                      </button>
                    </div>
                  )}

                  <div className="pt-1 flex flex-wrap items-center gap-2.5">
                    {mailtoHref !== '#' && (
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 bg-visa-green text-slip hover:bg-visa-green-dark text-xs sm:text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap shrink-0"
                      >
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{t.calculator.emailOpenInAppBtn}</span>
                      </a>
                    )}

                    {sentReceipt.result.textBody && (
                      <button
                        type="button"
                        onClick={() => setShowEmailPreview((prev) => !prev)}
                        aria-expanded={showEmailPreview}
                        className="inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3.5 py-2 bg-paper border border-ink/55 text-ink hover:border-visa-green hover:text-visa-green text-xs sm:text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>
                          {showEmailPreview
                            ? t.calculator.emailHideCopyBtn
                            : t.calculator.emailShowCopyBtn}
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSentReceipt(null);
                        setShowEmailPreview(false);
                      }}
                      className="inline-flex items-center justify-center min-h-[42px] px-3 py-2 text-xs sm:text-sm text-ink-muted hover:text-ink hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {t.calculator.emailSendAnotherBtn}
                    </button>
                  </div>

                  {showEmailPreview && sentReceipt.result.textBody && (
                    <div className="pt-3 border-t border-rule">
                      <p
                        dir="ltr"
                        className="font-latin-mono text-[11px] text-ink-muted mb-1.5 break-words"
                      >
                        Subject: {sentReceipt.result.subject}
                      </p>
                      <pre
                        dir="ltr"
                        className="max-h-56 overflow-y-auto p-3.5 bg-paper border border-rule rounded-[2px] font-latin-mono text-xs text-ink-body whitespace-pre-wrap leading-relaxed"
                      >
                        {sentReceipt.result.textBody}
                      </pre>
                    </div>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={handleSendQuoteEmail}
                  noValidate
                  className="bg-slip border border-rule rounded-[2px] p-4 sm:p-5 space-y-4"
                >
                  {/* Honeypot anti-spam */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor={quoteHoneypotId}>Website</label>
                    <input
                      id={quoteHoneypotId}
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={emailHoneypot}
                      onChange={(e) => setEmailHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <h4
                      className={`font-display text-lg font-medium text-ink ${
                        isUrdu ? 'leading-loose pb-0.5' : 'leading-snug'
                      }`}
                    >
                      {t.calculator.emailQuoteOpenTitle}
                    </h4>
                    <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                      {t.calculator.emailQuoteSubtitle}
                    </p>
                  </div>

                  {/* Live Attached Estimate Row */}
                  <div className="py-2.5 border-y border-rule flex flex-wrap items-baseline justify-between gap-2 text-xs">
                    <span className="text-ink-muted">
                      {t.calculator.emailSummaryPreviewLabel}{' '}
                      <span className="text-ink font-medium">
                        {localizeCountry(estimate.destinationName)} ·{' '}
                        {localizeVisaType(visaTypeId, estimate.visaTypeLabel)} ·{' '}
                        <span className="tabular-nums">{estimate.applicants}</span>{' '}
                        {estimate.applicants === 1
                          ? t.calculator.applicantSingular
                          : t.calculator.applicantPlural}
                      </span>
                    </span>
                    <span
                      dir="ltr"
                      className="font-latin-mono font-semibold text-visa-green tabular-nums whitespace-nowrap"
                    >
                      {formatCurrencyAmount(estimate.grandTotalPkr, currency)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor={quoteEmailInputId}
                        className="block mono-label text-ink mb-1.5"
                      >
                        {t.calculator.emailRecipientLabel}
                      </label>
                      <input
                        id={quoteEmailInputId}
                        name="quoteEmail"
                        type="email"
                        dir="ltr"
                        autoComplete="email"
                        required
                        value={recipientEmail}
                        onChange={(e) => {
                          setRecipientEmail(e.target.value);
                          if (emailError) setEmailError(null);
                          if (emailServerError) setEmailServerError(null);
                        }}
                        placeholder={t.calculator.emailRecipientPlaceholder}
                        aria-invalid={Boolean(emailError)}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-paper border border-ink/45 rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:border-visa-green"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={quoteNameInputId}
                        className="block mono-label text-ink mb-1.5"
                      >
                        {t.calculator.emailNameLabel}
                      </label>
                      <input
                        id={quoteNameInputId}
                        name="quoteRecipientName"
                        type="text"
                        autoComplete="name"
                        maxLength={80}
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder={t.calculator.emailNamePlaceholder}
                        className="w-full min-h-[44px] px-3.5 py-2.5 bg-paper border border-ink/45 rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:border-visa-green"
                      />
                    </div>
                  </div>

                  {emailError && (
                    <p role="alert" className="text-xs text-stamp-red font-medium">
                      {emailError}
                    </p>
                  )}
                  {emailServerError && (
                    <p role="alert" className="text-xs text-stamp-red font-medium">
                      {emailServerError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="submit"
                      disabled={sendingEmail}
                      aria-busy={sendingEmail}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-visa-green text-slip hover:bg-visa-green-dark disabled:opacity-65 disabled:cursor-not-allowed text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {sendingEmail ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
                          <span>{t.calculator.emailSendingBtn}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>{t.calculator.emailSendBtn}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmailPanelOpen(false);
                        setEmailError(null);
                        setEmailServerError(null);
                      }}
                      className="inline-flex items-center justify-center min-h-[44px] px-3.5 py-2 text-sm text-ink-muted hover:text-ink cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {t.calculator.emailCancelBtn}
                    </button>
                  </div>

                  <p className="text-xs text-ink-muted leading-relaxed">
                    {t.calculator.emailPrivacyNote}
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mandatory Honest Consultancy Disclaimer */}
      <p className="mt-5 text-xs text-ink-muted leading-relaxed">
        {t.common.disclaimer} {t.calculator.disclaimerSuffix}
      </p>
    </section>
  );
}
