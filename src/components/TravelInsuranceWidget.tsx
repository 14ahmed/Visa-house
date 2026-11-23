import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { formatRegulatedValue } from '../utils/formatters';

export interface TravelInsuranceWidgetProps {
  variant?: 'card' | 'banner';
  eyebrow?: string;
  heading?: string;
  explainer?: string;
  ctaLabel?: string;
  inquiryHref?: string;
  plansHref?: string;
  premiumQuote?: string;
  className?: string;
}

export function TravelInsuranceWidget({
  variant = 'card',
  eyebrow = 'Travel Insurance · Schengen-Compliant Desk',
  heading = 'Schengen €30,000 Travel Medical Insurance',
  explainer = 'Schengen embassies and visa centres require an active policy covering at least €30,000 in emergency medical care, hospitalisation, and repatriation across every member state for your full travel window. Even outside Europe, verified medical cover protects you against sudden hospital and flight disruption costs.',
  ctaLabel = 'Start Insurance Inquiry',
  inquiryHref = '/travel-insurance#apply',
  plansHref = '/travel-insurance',
  premiumQuote = '',
  className = '',
}: TravelInsuranceWidgetProps) {
  const formattedQuote = formatRegulatedValue(premiumQuote);

  if (variant === 'banner') {
    return (
      <aside
        aria-label="Schengen-compliant travel insurance widget"
        className={`bg-slip border border-ink/80 rounded-[3px] p-6 sm:p-8 ${className}`.trim()}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-3xl">
            <div className="h-10 w-10 border border-visa-green/40 bg-paper rounded-[2px] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="h-5 w-5 text-visa-green" aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="mono-label text-visa-green">{eyebrow}</p>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] px-1.5 py-0.5 border border-ink/30 rounded-[2px] text-ink">
                  INS · €30,000 MIN
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mt-1.5">
                {heading}
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] text-ink-body leading-relaxed">
                {explainer}
              </p>
              <dl className="mt-4 pt-3 border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <dt className="mono-label text-ink-muted">Schengen Minimum</dt>
                  <dd className="mt-0.5 font-medium text-ink">€30,000 Medical &amp; Repatriation</dd>
                </div>
                <div>
                  <dt className="mono-label text-ink-muted">Certificate Format</dt>
                  <dd className="mt-0.5 font-medium text-ink">VFS / BLS &amp; Embassy Ready</dd>
                </div>
                <div>
                  <dt className="mono-label text-ink-muted">Premium Quote (PKR)</dt>
                  <dd className="mt-0.5 font-medium text-visa-green">{formattedQuote}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-col items-stretch gap-2.5 shrink-0">
            <Link
              to={inquiryHref}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to={plansHref}
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 border border-ink/75 bg-paper text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep transition-colors whitespace-nowrap"
            >
              Compare Coverage Tiers
            </Link>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Schengen-compliant travel insurance widget"
      className={`bg-slip border border-ink/80 rounded-[3px] p-6 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-rule">
        <div className="inline-flex items-center gap-2 text-visa-green">
          <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="mono-label text-visa-green">{eyebrow}</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] px-1.5 py-0.5 border border-ink/30 rounded-[2px] text-ink">
          INS
        </span>
      </div>

      <h3 className="font-display text-2xl font-medium text-ink mt-4">{heading}</h3>
      <p className="mt-2.5 text-sm sm:text-[15px] text-ink-body leading-relaxed">{explainer}</p>

      <dl className="mt-5 pt-4 border-t border-rule grid grid-cols-2 gap-4 text-xs">
        <div>
          <dt className="mono-label text-ink-muted">Coverage Floor</dt>
          <dd className="mt-1 font-medium text-ink">€30,000 Medical</dd>
        </div>
        <div>
          <dt className="mono-label text-ink-muted">Quote (PKR)</dt>
          <dd className="mt-1 font-medium text-visa-green">{formattedQuote}</dd>
        </div>
      </dl>

      <div className="mt-5 pt-4 border-t border-rule flex flex-col sm:flex-row gap-2.5">
        <Link
          to={inquiryHref}
          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          to={plansHref}
          className="inline-flex items-center justify-center min-h-[44px] px-4 py-2.5 border border-ink/75 bg-paper text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep transition-colors whitespace-nowrap"
        >
          View Plans
        </Link>
      </div>
    </aside>
  );
}
