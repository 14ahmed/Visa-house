import { useId, useState, type FormEvent } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Coins,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { VISA_TYPE_OPTIONS, type VisaTypeId } from '../utils/checklistLibrary';
import { buildWhatsAppUrl } from '../utils/formatters';
import {
  APPLICANT_CITY_OPTIONS,
  buildLocalVisaFeeEstimate,
  FEE_ESTIMATOR_DESTINATIONS,
  validateFeeEstimatorInput,
  type ApplicantCityId,
  type VisaFeeEstimateResult,
} from '../utils/visaFeeEstimator';

interface VisaFeeEstimatorProps {
  defaultDestination?: string;
  defaultVisaType?: VisaTypeId;
  sectionNumber?: string;
  heading?: string;
  subcopy?: string;
}

const CUSTOM_OPTION_VALUE = '__custom__';

const QUICK_PRESETS: ReadonlyArray<{
  label: string;
  destination: string;
  visaType: VisaTypeId;
}> = [
  { label: 'Schengen Tourist', destination: 'Schengen Area', visaType: 'tourist' },
  { label: 'Japan Business', destination: 'Japan', visaType: 'business' },
  { label: 'USA B1/B2', destination: 'United States', visaType: 'tourist' },
  { label: 'UK Student', destination: 'United Kingdom', visaType: 'student' },
];

/**
 * Interactive Visa Fee & Processing Time Estimator for Pakistani passport holders.
 * Computes approximate consular guidance locally from Visahouse's curated schedules.
 */
export function VisaFeeEstimator({
  defaultDestination = 'Schengen Area',
  defaultVisaType = 'tourist',
  sectionNumber = '03. Visa Fee & Time Estimator',
  heading = 'Estimate visa fees and processing times',
  subcopy = 'Pick a country and visa type to check estimated embassy fees, PKR ranges, visa-centre charges, and usual processing times for Pakistani passport holders.',
}: VisaFeeEstimatorProps) {
  const initialPreset = FEE_ESTIMATOR_DESTINATIONS.find(
    (item) => item.countryName.toLowerCase() === defaultDestination.toLowerCase(),
  );

  const [selectedPreset, setSelectedPreset] = useState<string>(
    initialPreset ? initialPreset.countryName : CUSTOM_OPTION_VALUE,
  );
  const [customDestination, setCustomDestination] = useState<string>(
    initialPreset ? '' : defaultDestination,
  );
  const [visaType, setVisaType] = useState<VisaTypeId>(defaultVisaType);
  const [applicantCity, setApplicantCity] = useState<ApplicantCityId>('islamabad');

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<VisaFeeEstimateResult | null>(null);

  const destinationSelectId = useId();
  const customDestinationInputId = useId();
  const visaTypeSelectId = useId();
  const citySelectId = useId();

  const resolvedDestination =
    selectedPreset === CUSTOM_OPTION_VALUE ? customDestination : selectedPreset;

  const requestEstimate = async (params: {
    destination: string;
    visaType: VisaTypeId;
    city: ApplicantCityId;
  }) => {
    setFormError(null);
    setApiError(null);

    const validation = validateFeeEstimatorInput({
      destination: params.destination,
      visaType: params.visaType,
      applicantCity: params.city,
    });

    if (!validation.valid || !validation.normalized) {
      setFormError(validation.error ?? 'Please enter a valid destination and visa type.');
      return;
    }

    setLoading(true);
    try {
      const localEstimate = buildLocalVisaFeeEstimate({
        destination: validation.normalized.destination,
        visaType: validation.normalized.visaTypeId,
        applicantCity: params.city,
      });
      setEstimate(localEstimate);
    } catch (err) {
      setEstimate(null);
      setApiError(
        err instanceof Error
          ? err.message
          : 'Unable to compute an estimate right now. Please try again or verify live rates with our desk.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestEstimate({
      destination: resolvedDestination,
      visaType,
      city: applicantCity,
    });
  };

  const handlePresetClick = async (preset: (typeof QUICK_PRESETS)[number]) => {
    setSelectedPreset(preset.destination);
    setCustomDestination('');
    setVisaType(preset.visaType);
    await requestEstimate({
      destination: preset.destination,
      visaType: preset.visaType,
      city: applicantCity,
    });
  };

  const whatsappConfirmHref = buildWhatsAppUrl(
    `${resolvedDestination || 'visa'} fee & timeline confirmation`,
    `Hello Visahouse, I hold a Pakistani passport and would like exact live fee and processing confirmation for a ${
      VISA_TYPE_OPTIONS.find((opt) => opt.id === visaType)?.label ?? visaType
    } visa to ${resolvedDestination || 'my chosen destination'}.`,
  );

  return (
    <section
      id="fee-estimator"
      aria-labelledby="fee-estimator-heading"
      className="bg-slip border border-ink/80 rounded-[3px] p-5 sm:p-8 lg:p-10 scroll-mt-24"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-ink/75">
        <div className="max-w-3xl">
          <p className="mono-label text-visa-green">{sectionNumber}</p>
          <h2
            id="fee-estimator-heading"
            className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5 text-balance"
          >
            {heading}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-body leading-relaxed">
            {subcopy}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted shrink-0">
          <span>Pakistani Passport Desk</span>
          <span aria-hidden="true">·</span>
          <span>Estimated Embassy Fees</span>
        </div>
      </div>

      {/* Estimator Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 bg-paper border border-rule rounded-[3px] p-4 sm:p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label htmlFor={destinationSelectId} className="block mono-label text-ink mb-1.5">
              1. Destination Country
            </label>
            <select
              id={destinationSelectId}
              name="estimatorDestination"
              value={selectedPreset}
              onChange={(e) => {
                setSelectedPreset(e.target.value);
                setFormError(null);
              }}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              {FEE_ESTIMATOR_DESTINATIONS.map((dest) => (
                <option key={dest.id} value={dest.countryName}>
                  {dest.label}
                </option>
              ))}
              <option value={CUSTOM_OPTION_VALUE}>Other Country (Enter Manually)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor={visaTypeSelectId} className="block mono-label text-ink mb-1.5">
              2. Visa Type
            </label>
            <select
              id={visaTypeSelectId}
              name="estimatorVisaType"
              value={visaType}
              onChange={(e) => setVisaType(e.target.value as VisaTypeId)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              {VISA_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label htmlFor={citySelectId} className="block mono-label text-ink mb-1.5">
              3. Submission City
            </label>
            <select
              id={citySelectId}
              name="estimatorCity"
              value={applicantCity}
              onChange={(e) => setApplicantCity(e.target.value as ApplicantCityId)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              {APPLICANT_CITY_OPTIONS.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-visa-green text-slip hover:bg-visa-green-dark disabled:opacity-65 disabled:cursor-not-allowed text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
                  <span>Estimating</span>
                </>
              ) : (
                <>
                  <span>Estimate</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>

        {selectedPreset === CUSTOM_OPTION_VALUE && (
          <div className="mt-4 pt-4 border-t border-rule">
            <label
              htmlFor={customDestinationInputId}
              className="block mono-label text-ink mb-1.5"
            >
              Enter Destination Country Name
            </label>
            <input
              id={customDestinationInputId}
              name="estimatorCustomDestination"
              type="text"
              value={customDestination}
              onChange={(e) => {
                setCustomDestination(e.target.value);
                if (formError) setFormError(null);
              }}
              placeholder="e.g. Australia, Azerbaijan, China, Qatar"
              className="w-full sm:max-w-md min-h-[44px] px-3.5 py-2 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:border-visa-green"
            />
          </div>
        )}

        {formError && (
          <p role="alert" className="mt-3 text-sm text-stamp-red font-medium">
            {formError}
          </p>
        )}

        {/* Quick Preset Triggers */}
        <div className="mt-4 pt-3 border-t border-rule flex flex-wrap items-center gap-2">
          <span className="mono-label text-ink-muted mr-1">Quick Checks:</span>
          {QUICK_PRESETS.map((preset) => (
            <button
              key={`${preset.destination}-${preset.visaType}`}
              type="button"
              disabled={loading}
              onClick={() => handlePresetClick(preset)}
              className="min-h-[36px] px-3 py-1.5 bg-slip border border-rule hover:border-ink text-xs font-mono text-ink rounded-[2px] transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 bg-paper border border-rule rounded-[3px] p-6 flex items-center gap-3.5 text-ink"
        >
          <Loader2 className="h-5 w-5 text-visa-green animate-spin shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium">
              Retrieving approximate fees and processing windows for {resolvedDestination}
            </p>
            <p className="text-xs text-ink-muted mt-0.5">
              Checking consular currency figures, PKR range, and typical visa-centre timelines.
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {!loading && apiError && (
        <div
          role="alert"
          className="mt-6 bg-paper border border-stamp-red/50 rounded-[3px] p-5 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-stamp-red shrink-0 mt-0.5" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="mono-label text-stamp-red">Estimator Unavailable</p>
              <p className="mt-1.5 text-sm text-ink leading-relaxed">{apiError}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    requestEstimate({
                      destination: resolvedDestination,
                      visaType,
                      city: applicantCity,
                    })
                  }
                  className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 bg-ink text-slip hover:bg-visa-green text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Try Again
                </button>
                <a
                  href={whatsappConfirmHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-visa-green text-visa-green hover:bg-visa-green-soft text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Confirm Live Rate on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Fee & Processing Ledger */}
      {!loading && estimate && (
        <div className="mt-6 bg-paper border border-ink/70 rounded-[3px] p-5 sm:p-7">
          <div className="pb-4 border-b border-ink/30 space-y-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-ink-muted">
              <span className="text-visa-green font-semibold">APPROXIMATE ESTIMATE</span>
              <span aria-hidden="true">·</span>
              <span>{estimate.passportNationality} Passport</span>
              <span aria-hidden="true">·</span>
              <span>{estimate.visaTypeLabel}</span>
            </div>
            <h3 className="font-display text-2xl font-medium text-ink text-balance">
              {estimate.destination} — Fee and Processing Overview
            </h3>
            <p className="text-xs font-mono text-ink-muted leading-relaxed">
              Primary Submission Channel: <span className="text-ink">{estimate.officialChannel}</span>
            </p>
          </div>

          {/* 2-Column Highlight Figures */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slip border border-rule rounded-[2px] p-4 sm:p-5">
              <div className="flex items-center gap-2 text-visa-green">
                <Coins className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="mono-label">Approximate Embassy / Govt Fee</span>
              </div>
              <p className="font-display text-xl sm:text-2xl font-medium text-ink mt-2 tabular-nums">
                {estimate.approximateGovtFee}
              </p>
              <p className="mt-1.5 text-sm text-ink-body tabular-nums">
                Est. PKR Range: <strong className="text-ink font-medium">{estimate.approximatePkrEquivalent}</strong>
              </p>
            </div>

            <div className="bg-slip border border-rule rounded-[2px] p-4 sm:p-5">
              <div className="flex items-center gap-2 text-visa-green">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="mono-label">Estimated Processing Time</span>
              </div>
              <p className="font-display text-xl sm:text-2xl font-medium text-ink mt-2 tabular-nums">
                {estimate.standardProcessingWindow}
              </p>
              <p className="mt-1.5 text-sm text-ink-body">
                {estimate.expressOrPriorityNote}
              </p>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <dl className="mt-5 border-t border-rule divide-y divide-rule text-sm">
            <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-2">
              <dt className="sm:col-span-4 mono-label text-ink-muted">Centre &amp; Portal Fees</dt>
              <dd className="sm:col-span-8 text-ink-body leading-relaxed">
                {estimate.serviceCentreFeeNote}
              </dd>
            </div>
            <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-2">
              <dt className="sm:col-span-4 mono-label text-ink-muted">Usual Validity &amp; Stay</dt>
              <dd className="sm:col-span-8 text-ink-body leading-relaxed tabular-nums">
                {estimate.validityAndStayHint}
              </dd>
            </div>
            <div className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-2">
              <dt className="sm:col-span-4 mono-label text-ink-muted">What Affects Fees &amp; Time</dt>
              <dd className="sm:col-span-8">
                <ul className="space-y-1.5 text-ink-body list-disc pl-4">
                  {estimate.feeDrivers.map((driver, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {driver}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          {/* Verification Advisory & Next Action */}
          <div className="mt-5 pt-4 border-t border-ink/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-ink-muted leading-relaxed max-w-2xl">
              {estimate.advisoryNote}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={whatsappConfirmHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 bg-visa-green text-slip hover:bg-ink text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Confirm Live Rate via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Initial / Idle Helper State */}
      {!loading && !estimate && !apiError && (
        <div className="mt-6 bg-paper border border-rule rounded-[3px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm text-ink-body leading-relaxed max-w-2xl">
            <strong className="text-ink font-medium">Ready to estimate:</strong> Choose any country
            and visa type above, then click <span className="font-medium text-ink">Estimate</span> to
            view approximate consular fees, PKR conversion guidance, visa-centre service
            charges, and expected processing timelines.
          </div>
          <a
            href={whatsappConfirmHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[40px] px-3.5 py-2 border border-ink/50 text-ink hover:border-visa-green hover:text-visa-green text-xs font-mono uppercase tracking-[0.08em] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Need Live Quote Instead?</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      )}

      <p className="mt-4 text-xs text-ink-muted leading-relaxed">
        {SITE_CONFIG.disclaimer} Estimated fee figures are approximate guidance only; exact official
        circulars and PKR equivalents are confirmed live with our desk before payment.
      </p>
    </section>
  );
}
