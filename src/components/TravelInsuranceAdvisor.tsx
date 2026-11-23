import { useMemo, useState } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Info,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  ADVISOR_DESTINATIONS,
  AGE_BAND_OPTIONS,
  TRIP_DURATION_PRESETS,
  VISA_REQUIREMENT_OPTIONS,
  clampTravellerCount,
  clampTripDurationDays,
  recommendTravelInsurance,
  type AdvisorDestinationId,
  type ComplianceLevel,
  type InsuranceVisaRequirementId,
  type TravellerAgeBandId,
} from '../utils/travelInsuranceAdvisor';

interface TravelInsuranceAdvisorProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  headingAs?: 'h2' | 'h3';
  subcopy?: string;
  inquiryHref?: string;
  defaultDestinationId?: AdvisorDestinationId;
  className?: string;
}

const COMPLIANCE_STYLE: Record<
  ComplianceLevel,
  {
    textClass: string;
    icon: typeof ShieldCheck;
  }
> = {
  mandatory: {
    textClass: 'text-stamp-red',
    icon: AlertCircle,
  },
  conditional: {
    textClass: 'text-[#8C5B00]',
    icon: Info,
  },
  recommended: {
    textClass: 'text-visa-green',
    icon: CheckCircle2,
  },
};

export function TravelInsuranceAdvisor({
  id = 'insurance-advisor',
  eyebrow,
  heading,
  headingAs = 'h2',
  subcopy,
  inquiryHref = '/travel-insurance#apply',
  defaultDestinationId = 'schengen',
  className = '',
}: TravelInsuranceAdvisorProps) {
  const { t, isUrdu } = useLanguage();
  const resolvedEyebrow = eyebrow ?? t.insuranceAdvisor.eyebrow;
  const resolvedHeading = heading ?? t.insuranceAdvisor.heading;
  const resolvedSubcopy = subcopy ?? t.insuranceAdvisor.subcopy;
  const [destinationId, setDestinationId] = useState<AdvisorDestinationId>(defaultDestinationId);
  const [tripDays, setTripDays] = useState<number>(14);
  const [visaRequirementId, setVisaRequirementId] = useState<InsuranceVisaRequirementId>(
    defaultDestinationId === 'schengen' ? 'schengen-embassy' : 'tourist-short',
  );
  const [ageBandId, setAgeBandId] = useState<TravellerAgeBandId>('under-45');
  const [travellers, setTravellers] = useState<number>(1);
  const [includeTripCancellation, setIncludeTripCancellation] = useState<boolean>(false);
  const [includeAdventureCover, setIncludeAdventureCover] = useState<boolean>(false);
  const [includeZeroDeductible, setIncludeZeroDeductible] = useState<boolean>(
    defaultDestinationId === 'schengen',
  );
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  const recommendation = useMemo(
    () =>
      recommendTravelInsurance({
        destinationId,
        tripDays,
        visaRequirementId,
        ageBandId,
        travellers,
        includeTripCancellation,
        includeAdventureCover,
        includeZeroDeductible,
      }),
    [
      destinationId,
      tripDays,
      visaRequirementId,
      ageBandId,
      travellers,
      includeTripCancellation,
      includeAdventureCover,
      includeZeroDeductible,
    ],
  );

  const handleDestinationChange = (nextDestination: AdvisorDestinationId) => {
    setDestinationId(nextDestination);
    if (nextDestination === 'schengen') {
      setVisaRequirementId('schengen-embassy');
      setIncludeZeroDeductible(true);
    } else if (visaRequirementId === 'schengen-embassy') {
      setVisaRequirementId('tourist-short');
    }
  };

  const handleReset = () => {
    setDestinationId(defaultDestinationId);
    setTripDays(14);
    setVisaRequirementId(
      defaultDestinationId === 'schengen' ? 'schengen-embassy' : 'tourist-short',
    );
    setAgeBandId('under-45');
    setTravellers(1);
    setIncludeTripCancellation(false);
    setIncludeAdventureCover(false);
    setIncludeZeroDeductible(defaultDestinationId === 'schengen');
    setCopiedBrief(false);
  };

  const handleCopyBrief = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(recommendation.briefText);
      }
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2600);
    } catch {
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2600);
    }
  };

  const complianceStyle = COMPLIANCE_STYLE[recommendation.complianceLevel];
  const ComplianceIcon = complianceStyle.icon;
  const waHref = buildWhatsAppUrl(
    `Travel insurance quote — ${recommendation.recommendedTierName} for ${recommendation.destination.isoCode}, ${recommendation.recommendedPolicyDays} policy days (${recommendation.tripDays} trip days), ${recommendation.travellers} traveller(s), age ${recommendation.ageBandLabel}`,
  );
  const HeadingTag = headingAs;

  return (
    <div
      id={id}
      data-testid="travel-insurance-advisor"
      data-recommended-tier={recommendation.recommendedTierId}
      data-compliance-level={recommendation.complianceLevel}
      className={`paper-card-texture border border-ink/75 rounded-[3px] p-5 sm:p-7 lg:p-8 scroll-mt-24 ${className}`}
    >
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-rule">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mono-label text-ink-muted">
            <span className="font-latin-mono text-stamp-red">INS</span>
            <span aria-hidden="true">·</span>
            <span>{resolvedEyebrow}</span>
          </div>
          <HeadingTag className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2 leading-tight">
            {resolvedHeading}
          </HeadingTag>
          <p className="mt-2 text-sm sm:text-[15px] text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center justify-center gap-1.5 self-start sm:self-end min-h-[38px] px-3.5 py-2 border border-rule bg-slip text-xs font-medium text-ink-body rounded-[2px] hover:border-ink/60 hover:text-ink transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{t.insuranceAdvisor.resetSelections}</span>
        </button>
      </div>

      {/* Main Split: Left Inputs (7 cols) + Right Recommendation Dossier (5 cols) */}
      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Trip & Visa Requirement Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Destination Zone / Country */}
          <div>
            <label
              htmlFor={`${id}-destination`}
              className="block mono-label text-ink-muted mb-2"
            >
              {t.insuranceAdvisor.step1Dest}
            </label>
            <select
              id={`${id}-destination`}
              value={destinationId}
              onChange={(e) => handleDestinationChange(e.target.value as AdvisorDestinationId)}
              className="w-full min-h-[46px] ps-3.5 pe-9 py-2.5 bg-slip border border-ink/60 rounded-[2px] text-sm sm:text-[15px] text-ink focus:outline-none focus:ring-2 focus:ring-visa-green/40 focus:border-visa-green"
            >
              {ADVISOR_DESTINATIONS.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.label}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-ink-muted">
              {recommendation.destination.regionLabel} · {t.insuranceAdvisor.step1Hint}
            </p>
          </div>

          {/* 2. Visa Requirement / Filing Purpose */}
          <div>
            <p className="mono-label text-ink-muted mb-2">{t.insuranceAdvisor.step2Purpose}</p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={t.insuranceAdvisor.step2Purpose}
            >
              {VISA_REQUIREMENT_OPTIONS.map((option) => {
                const active = visaRequirementId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setVisaRequirementId(option.id)}
                    aria-pressed={active}
                    className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-ink text-slip border-ink'
                        : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                    }`}
                  >
                    {option.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Trip Duration (Days) & Travellers */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-7">
              <label
                htmlFor={`${id}-duration`}
                className="block mono-label text-ink-muted mb-2"
              >
                {t.insuranceAdvisor.step3Duration}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTripDays((d) => clampTripDurationDays(d - 1))}
                  aria-label="Decrease trip duration by 1 day"
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-ink/60 bg-slip text-ink rounded-[2px] hover:bg-paper-deep transition-colors cursor-pointer shrink-0"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <input
                  id={`${id}-duration`}
                  type="number"
                  min={1}
                  max={365}
                  value={tripDays}
                  onChange={(e) => setTripDays(clampTripDurationDays(Number(e.target.value)))}
                  className="w-24 min-h-[44px] px-3 py-2 text-center font-mono text-base font-medium tabular-nums bg-slip border border-ink/60 rounded-[2px] text-ink focus:outline-none focus:ring-2 focus:ring-visa-green/40 focus:border-visa-green"
                />
                <button
                  type="button"
                  onClick={() => setTripDays((d) => clampTripDurationDays(d + 1))}
                  aria-label="Increase trip duration by 1 day"
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-ink/60 bg-slip text-ink rounded-[2px] hover:bg-paper-deep transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div
                className="mt-2.5 flex flex-wrap gap-1.5"
                role="group"
                aria-label="Quick trip duration presets"
              >
                {TRIP_DURATION_PRESETS.map((preset) => {
                  const active = tripDays === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTripDays(preset)}
                      aria-pressed={active}
                      className={`min-h-[34px] px-2.5 py-1 font-mono text-xs tabular-nums rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-visa-green text-slip border-visa-green'
                          : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                      }`}
                    >
                      {preset}d
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs font-mono text-ink-muted tabular-nums">
                {recommendation.durationBandLabel}
              </p>
            </div>

            <div className="sm:col-span-5">
              <p className="mono-label text-ink-muted mb-2">{t.insuranceAdvisor.step4Travellers}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTravellers((c) => clampTravellerCount(c - 1))}
                  aria-label="Decrease travellers count"
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-ink/60 bg-slip text-ink rounded-[2px] hover:bg-paper-deep transition-colors cursor-pointer shrink-0"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  data-testid="advisor-travellers-count"
                  className="min-w-[68px] min-h-[44px] px-3 inline-flex items-center justify-center font-latin-mono text-base font-medium tabular-nums bg-slip border border-ink/60 rounded-[2px] text-ink"
                >
                  {travellers}
                </span>
                <button
                  type="button"
                  onClick={() => setTravellers((c) => clampTravellerCount(c + 1))}
                  aria-label="Increase travellers count"
                  className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] border border-ink/60 bg-slip text-ink rounded-[2px] hover:bg-paper-deep transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-2 text-xs text-ink-muted">
                {travellers === 1
                  ? t.insuranceAdvisor.singlePassportNote
                  : formatLocalizedCopy(t.insuranceAdvisor.multiPassportNote, {
                      count: travellers,
                    })}
              </p>
            </div>
          </div>

          {/* 5. Eldest Traveller Age Band */}
          <div>
            <p className="mono-label text-ink-muted mb-2">{t.insuranceAdvisor.step5Age}</p>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label={t.insuranceAdvisor.step5Age}
            >
              {AGE_BAND_OPTIONS.map((band) => {
                const active = ageBandId === band.id;
                return (
                  <button
                    key={band.id}
                    type="button"
                    onClick={() => setAgeBandId(band.id)}
                    aria-pressed={active}
                    className={`min-h-[40px] px-3.5 py-2 text-xs sm:text-sm font-medium rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap tabular-nums ${
                      active
                        ? 'bg-ink text-slip border-ink'
                        : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                    }`}
                  >
                    {band.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Specific Coverage Priorities */}
          <div className="pt-4 border-t border-rule">
            <p className="mono-label text-ink-muted mb-3">{t.insuranceAdvisor.step6Riders}</p>
            <div className="space-y-2.5">
              <label className="flex items-start gap-3 text-sm text-ink-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeZeroDeductible}
                  onChange={(e) => setIncludeZeroDeductible(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded-[2px] border-ink/60 accent-visa-green cursor-pointer shrink-0"
                />
                <span>
                  <strong className="font-medium text-ink">{t.insuranceAdvisor.riderZeroTitle}</strong>{' '}
                  — {t.insuranceAdvisor.riderZeroDesc}
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-ink-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeTripCancellation}
                  onChange={(e) => setIncludeTripCancellation(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded-[2px] border-ink/60 accent-visa-green cursor-pointer shrink-0"
                />
                <span>
                  <strong className="font-medium text-ink">
                    {t.insuranceAdvisor.riderCancelTitle}
                  </strong>{' '}
                  — {t.insuranceAdvisor.riderCancelDesc}
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm text-ink-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAdventureCover}
                  onChange={(e) => setIncludeAdventureCover(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded-[2px] border-ink/60 accent-visa-green cursor-pointer shrink-0"
                />
                <span>
                  <strong className="font-medium text-ink">
                    {t.insuranceAdvisor.riderAdventureTitle}
                  </strong>{' '}
                  — {t.insuranceAdvisor.riderAdventureDesc}
                </span>
              </label>
            </div>
          </div>

          {/* Visa Minimum Benchmarks Reference */}
          <div className="pt-4 border-t border-rule">
            <p className="mono-label text-ink-muted mb-2.5">
              {t.insuranceAdvisor.benchmarksTitle}
            </p>
            <dl className="divide-y divide-rule/75 text-xs">
              <div className="py-2 flex flex-wrap items-baseline justify-between gap-2">
                <dt className="font-medium text-ink">Schengen Visa Code (Article 15)</dt>
                <dd className="font-latin-mono text-stamp-red tabular-nums">
                  €30,000 min · Mandatory
                </dd>
              </div>
              <div className="py-2 flex flex-wrap items-baseline justify-between gap-2">
                <dt className="font-medium text-ink">Canada Parent / Grandparent Super Visa</dt>
                <dd className="font-latin-mono text-[#8C5B00] tabular-nums">
                  CAD 100,000 · 1-year rule
                </dd>
              </div>
              <div className="py-2 flex flex-wrap items-baseline justify-between gap-2">
                <dt className="font-medium text-ink">USA, Japan &amp; Australia Visitors</dt>
                <dd className="font-latin-mono text-visa-green tabular-nums">
                  USD 100,000+ advised
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Recommended Coverage Slip */}
        <div
          className="lg:col-span-5 bg-slip border border-ink/75 rounded-[3px] p-5 sm:p-6 flex flex-col justify-between"
          aria-live="polite"
          data-testid="advisor-recommendation-panel"
        >
          <div>
            {/* Compliance Status + ISO */}
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-rule">
              <span
                className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] font-semibold ${complianceStyle.textClass}`}
                data-testid="advisor-compliance-label"
              >
                <ComplianceIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{recommendation.complianceLabel}</span>
              </span>
              <span className="font-latin-mono text-xs font-semibold text-ink-muted">
                {recommendation.destination.isoCode}
              </span>
            </div>

            {/* Recommended Plan Tier */}
            <div className="mt-4">
              <p className="mono-label text-ink-muted">{t.insuranceAdvisor.recommendedTierLabel}</p>
              <h4
                data-testid="advisor-tier-name"
                className="font-display text-2xl font-medium text-ink mt-1 leading-snug"
              >
                {recommendation.recommendedTierName}
              </h4>
              <p className="mt-1.5 text-xs sm:text-sm text-ink-body leading-relaxed">
                {recommendation.tierTagline}
              </p>
            </div>

            {/* Key Specifications Ledger */}
            <dl className="mt-5 border-t border-b border-rule divide-y divide-rule/75 text-xs sm:text-sm">
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-ink-muted shrink-0">{t.insuranceAdvisor.medicalCeiling}</dt>
                <dd
                  data-testid="advisor-medical-ceiling"
                  className="font-medium text-ink text-end tabular-nums"
                >
                  {recommendation.minimumMedicalCeiling}
                </dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-ink-muted shrink-0">{t.insuranceAdvisor.territoryWording}</dt>
                <dd className="font-medium text-ink text-end">
                  {recommendation.territoryWording}
                </dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-ink-muted shrink-0">{t.insuranceAdvisor.policyWindow}</dt>
                <dd
                  data-testid="advisor-policy-window"
                  className="font-latin-mono text-xs sm:text-sm font-medium text-visa-green text-end tabular-nums"
                >
                  {recommendation.recommendedPolicyDays} days
                  {recommendation.bufferDays > 0
                    ? ` (${recommendation.tripDays}d + ${recommendation.bufferDays}d buffer)`
                    : ` (${recommendation.tripDays}d stay)`}
                </dd>
              </div>
              <div className="py-2.5 flex items-baseline justify-between gap-3">
                <dt className="text-ink-muted shrink-0">{t.insuranceAdvisor.premiumLabel}</dt>
                <dd className="font-medium text-ink text-end">{t.common.confirmWithTeam}</dd>
              </div>
            </dl>

            {/* Embassy & Certificate Checklist */}
            <div className="mt-5">
              <p className="mono-label text-visa-green mb-2.5">
                {t.insuranceAdvisor.certificateChecklist}
              </p>
              <ul className="space-y-2 text-xs sm:text-[13px] text-ink-body leading-relaxed">
                {recommendation.certificateChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check
                      className="h-3.5 w-3.5 text-visa-green mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Underwriting & Visa Rule Notes */}
            <div className="mt-5 pt-4 border-t border-rule/80">
              <p className="mono-label text-ink-muted mb-2">{t.insuranceAdvisor.underwritingNotes}</p>
              <ul className="space-y-2 text-xs text-ink-body leading-relaxed">
                {recommendation.underwritingNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-ink-muted mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="mt-6 pt-4 border-t border-rule space-y-2.5">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.insuranceAdvisor.requestWhatsapp}</span>
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={inquiryHref}
                className="inline-flex items-center justify-center min-h-[40px] px-3 py-2 border border-ink/80 bg-slip text-ink text-xs font-medium rounded-[2px] hover:bg-paper-deep transition-colors whitespace-nowrap"
              >
                {t.insuranceAdvisor.openQuoteForm} {isUrdu ? '←' : '→'}
              </a>
              <button
                type="button"
                onClick={handleCopyBrief}
                className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-2 border border-rule bg-paper/70 text-ink text-xs font-medium rounded-[2px] hover:border-ink/70 hover:bg-paper-deep transition-colors cursor-pointer whitespace-nowrap"
              >
                <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>
                  {copiedBrief ? t.insuranceAdvisor.briefCopied : t.insuranceAdvisor.copyCoverageBrief}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Honest Underwriting Footer Note */}
      <div className="mt-6 pt-4 border-t border-rule text-xs text-ink-muted leading-relaxed">
        <strong
          className={`text-ink me-1.5 ${
            isUrdu ? 'font-semibold' : 'font-mono uppercase tracking-[0.08em]'
          }`}
        >
          {t.common.policyNotice}
        </strong>
        {recommendation.premiumGuidance} {t.common.disclaimer}
      </div>
    </div>
  );
}
