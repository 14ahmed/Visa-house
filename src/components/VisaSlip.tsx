import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import type { VisaSlipFacts } from '../data/types';
import { formatRegulatedValue } from '../utils/formatters';

interface VisaSlipProps {
  country: string;
  isoCode: string;
  accentHex?: string;
  facts: VisaSlipFacts;
  specimenMode?: boolean;
  className?: string;
}

/**
 * Archival Visa-Slip facts card with monospace/bilingual labels, tabular numerals,
 * localized "Confirm with our team" fallback for empty regulated fields, and LTR dummy MRZ lines.
 */
export function VisaSlip({
  country,
  isoCode,
  accentHex = '#0F5C4B',
  facts,
  specimenMode = false,
  className = '',
}: VisaSlipProps) {
  const { t, isUrdu, localizeCountry } = useLanguage();

  const resolveVal = (raw?: string | null) => {
    const val = formatRegulatedValue(raw);
    return val === SITE_CONFIG.confirmFallback ? t.common.confirmWithTeam : val;
  };

  const rows: { label: string; value: string; isConfirm: boolean }[] = [
    { label: t.visaSlip.visaType, value: resolveVal(facts.visaType), isConfirm: formatRegulatedValue(facts.visaType) === SITE_CONFIG.confirmFallback },
    { label: t.visaSlip.entry, value: resolveVal(facts.entryType), isConfirm: formatRegulatedValue(facts.entryType) === SITE_CONFIG.confirmFallback },
    { label: t.visaSlip.permittedStay, value: resolveVal(facts.stayDuration), isConfirm: formatRegulatedValue(facts.stayDuration) === SITE_CONFIG.confirmFallback },
    { label: t.visaSlip.validityWindow, value: resolveVal(facts.validity), isConfirm: formatRegulatedValue(facts.validity) === SITE_CONFIG.confirmFallback },
    { label: t.visaSlip.processingTime, value: resolveVal(facts.processingTime), isConfirm: formatRegulatedValue(facts.processingTime) === SITE_CONFIG.confirmFallback },
    { label: t.visaSlip.govtFee, value: resolveVal(facts.govtFee), isConfirm: formatRegulatedValue(facts.govtFee) === SITE_CONFIG.confirmFallback },
    { label: t.visaSlip.ourFee, value: resolveVal(facts.ourFee), isConfirm: formatRegulatedValue(facts.ourFee) === SITE_CONFIG.confirmFallback },
    { label: t.visaSlip.lastVerified, value: resolveVal(facts.lastVerified), isConfirm: formatRegulatedValue(facts.lastVerified) === SITE_CONFIG.confirmFallback },
  ];

  const displayCountry = specimenMode ? country : localizeCountry(country);

  return (
    <aside
      aria-label={specimenMode ? t.visaSlip.specimenHeader : `${displayCountry} ${t.visaSlip.consularSlipHeader}`}
      className={`bg-slip border border-ink/80 rounded-[3px] p-5 sm:p-6 ${className}`}
    >
      {/* Top archival slip header */}
      <div className="flex items-start justify-between gap-4 pb-3.5 border-b border-ink/25">
        <div>
          <p className="mono-label text-ink-muted">
            {specimenMode ? t.visaSlip.specimenHeader : t.visaSlip.consularSlipHeader}
          </p>
          <h2 className="font-display text-2xl sm:text-[1.65rem] font-medium text-ink mt-1 leading-tight">
            {displayCountry}
          </h2>
        </div>
        <div
          className="border px-2.5 py-1 text-center shrink-0"
          style={{ borderColor: accentHex, color: accentHex }}
        >
          <span className="block font-latin-mono text-xs tracking-[0.18em] font-semibold">
            {isoCode}
          </span>
          <span
            className={`block text-[10px] text-ink-muted ${
              isUrdu ? 'font-medium' : 'font-mono tracking-[0.12em]'
            }`}
          >
            {t.visaSlip.fromPak}
          </span>
        </div>
      </div>

      {/* Key-value facts grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 py-4 border-b border-ink/25">
        {rows.map((row) => (
          <div key={row.label} className="min-w-0">
            <dt className="mono-label text-ink-muted">{row.label}</dt>
            <dd
              className={`mt-1 text-sm font-medium leading-snug tabular-nums ${
                row.isConfirm ? 'text-visa-green' : 'text-ink'
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* Decorative dummy MRZ machine-readable footer strip */}
      <div className="pt-3.5">
        <div
          className={`flex items-center justify-between text-[10px] text-ink-muted mb-1.5 ${
            isUrdu ? 'font-medium' : 'font-mono tracking-[0.14em] uppercase'
          }`}
        >
          <span>{t.visaSlip.decorativeMrz}</span>
          <span>{t.visaSlip.nonOfficialRef}</span>
        </div>
        <div
          dir="ltr"
          className="bg-paper/80 border border-rule px-3 py-2 font-mono text-[11px] sm:text-xs tracking-[0.11em] text-ink/75 overflow-x-auto whitespace-nowrap select-none text-left"
          aria-hidden="true"
        >
          <div>{facts.mrzLine1}</div>
          <div>{facts.mrzLine2}</div>
        </div>
      </div>
    </aside>
  );
}
