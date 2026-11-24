import { useState } from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import type { PackageTier } from '../data/types';
import { buildWhatsAppUrl, formatRegulatedValue } from '../utils/formatters';

interface ManilaPackagesProps {
  country: string;
  packages: PackageTier[];
  accentHex: string;
  onSelectPackage?: (pkgTitle: string) => void;
}

/**
 * Tactile Manila-folder tab switcher for service packages.
 * Active folder tab merges seamlessly with the archival folder sheet beneath it.
 */
export function ManilaPackages({
  country,
  packages,
  accentHex,
  onSelectPackage,
}: ManilaPackagesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePkg = packages[activeIndex] ?? packages[0];

  if (!activePkg) return null;

  const feeText = formatRegulatedValue(activePkg.serviceFee);
  const waHref = buildWhatsAppUrl(
    `${country} visa (${activePkg.title})`,
    `Hello Visahouse, I hold a ${SITE_CONFIG.passportAdjective} passport and would like fee confirmation for the "${activePkg.title}" package for ${country}.`,
  );

  return (
    <div>
      {/* Stepped Manila folder tabs */}
      <div
        role="tablist"
        aria-label={`${country} visa service packages`}
        className="flex flex-wrap items-end gap-1.5 border-b border-ink/70"
      >
        {packages.map((pkg, idx) => {
          const selected = idx === activeIndex;
          return (
            <button
              key={pkg.id}
              type="button"
              role="tab"
              id={`tab-${pkg.id}`}
              aria-selected={selected}
              aria-controls={`panel-${pkg.id}`}
              onClick={() => setActiveIndex(idx)}
              className={`relative px-4 sm:px-5 py-3 min-h-[44px] text-left font-mono text-xs tracking-[0.1em] uppercase whitespace-nowrap shrink-0 rounded-t-[3px] border border-b-0 transition-colors cursor-pointer ${
                selected
                  ? 'bg-slip text-ink border-ink/70 font-semibold -mb-[1px] pb-[13px]'
                  : 'bg-paper-deep/80 text-ink-muted border-rule hover:text-ink hover:bg-paper-deep'
              }`}
            >
              <span className="mr-2 text-ink-muted">0{idx + 1}</span>
              {pkg.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Folder sheet body */}
      <div
        role="tabpanel"
        id={`panel-${activePkg.id}`}
        aria-labelledby={`tab-${activePkg.id}`}
        className="bg-slip border border-t-0 border-ink/70 rounded-b-[3px] p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <p className="mono-label text-ink-muted">
              Folder Dossier · Tier 0{activeIndex + 1}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2">
              {activePkg.title}
            </h3>
            <p className="mt-3 text-ink-body text-base leading-relaxed max-w-prose">
              {activePkg.bestFor}
            </p>

            <ul className="mt-6 space-y-3 border-t border-rule pt-5">
              {activePkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm sm:text-[15px] text-ink-body">
                  <Check
                    className="h-4 w-4 mt-1 shrink-0"
                    style={{ color: accentHex }}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-paper/75 border border-rule p-5 sm:p-6 rounded-[2px]">
            <div className="pb-4 border-b border-rule">
              <p className="mono-label text-ink-muted">
                Consultancy Fee ({SITE_CONFIG.currency})
              </p>
              <p className="font-display text-2xl font-medium text-visa-green mt-1.5 tabular-nums">
                {feeText}
              </p>
              <p className="mt-2 text-xs text-ink-muted leading-relaxed">
                {activePkg.turnaroundNote}
              </p>
            </div>

            <p className="mt-4 text-xs text-ink-muted leading-relaxed">
              {activePkg.excludesNote}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="#apply"
                onClick={() => onSelectPackage?.(activePkg.title)}
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-sm font-medium rounded-[2px] hover:bg-visa-green-dark transition-colors whitespace-nowrap"
              >
                Request This Package
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 border border-ink/70 text-ink text-sm font-medium rounded-[2px] hover:bg-paper-deep transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Confirm Fee on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
