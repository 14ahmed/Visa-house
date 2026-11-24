import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCountryArtworkMeta } from '../utils/countryArtwork';
import { CountryArtworkSvg } from './CountryArtwork';

interface PostageStampProps {
  to: string;
  isoCode: string;
  title: string;
  subtitle: string;
  channelLabel: string;
  accentHex: string;
}

/**
 * Tactile postage-stamp tile with CSS radial-gradient scalloped perforations,
 * bespoke hand-drawn archival illustration replacing the country text name,
 * muted country ink accent frame, and subtle postmark ink waves.
 */
export function PostageStamp({
  to,
  isoCode,
  title,
  subtitle,
  channelLabel,
  accentHex,
}: PostageStampProps) {
  const { isUrdu } = useLanguage();
  const [imgFailed, setImgFailed] = useState(false);

  const normalizedCode = isoCode.trim().toUpperCase();
  const artworkMeta = getCountryArtworkMeta(normalizedCode);
  const illustrationSrc = !imgFailed ? artworkMeta?.imageSrc : undefined;
  const baseLabel =
    normalizedCode === 'INS' || /visa|insurance|desk|ویزا|انشورنس/i.test(title)
      ? title
      : `${title} visa`;
  const altText = artworkMeta
    ? `${baseLabel} from Pakistan — ${artworkMeta.motif}`
    : `${baseLabel} guide from Pakistan`;

  return (
    <Link
      to={to}
      title={title}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-visa-green rounded-[2px] transition-transform duration-200 hover:-translate-y-0.5"
    >
      <span className="sr-only">{title}</span>

      {/* Subtle dark-paper backing so perforated scallops contrast cleanly against the sheet */}
      <div className="p-[1px] bg-ink/15 group-hover:bg-ink/30 transition-colors duration-200">
        <div className="stamp-perforated relative p-4 sm:p-5 min-h-[224px] flex flex-col justify-between overflow-hidden">
          {/* Inner hairline stamp engraving frame */}
          <div
            className="pointer-events-none absolute inset-[10px] border transition-colors duration-200"
            style={{ borderColor: `${accentHex}55` }}
            aria-hidden="true"
          />

          {/* Subtle postmark cancellation wavy lines */}
          <svg
            viewBox="0 0 110 38"
            className="pointer-events-none absolute top-3 end-3 w-16 h-6 opacity-15 group-hover:opacity-30 transition-opacity duration-200"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 8 Q18 2 34 8 T66 8 T98 8"
              stroke={accentHex}
              strokeWidth="1.2"
            />
            <path
              d="M2 18 Q18 12 34 18 T66 18 T98 18"
              stroke={accentHex}
              strokeWidth="1.2"
            />
            <path
              d="M2 28 Q18 22 34 28 T66 28 T98 28"
              stroke={accentHex}
              strokeWidth="1.2"
            />
          </svg>

          {/* Top metadata row (unboxed clean text, zero pills) */}
          <div className="relative z-10 flex items-center justify-between gap-2 pt-1 px-1">
            <span
              className={`leading-tight text-ink-muted truncate ${
                isUrdu
                  ? 'text-[11px] font-medium'
                  : 'font-mono text-[10px] tracking-[0.1em] uppercase'
              }`}
            >
              {channelLabel}
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-ink-muted group-hover:text-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 shrink-0"
              aria-hidden="true"
            />
          </div>

          {/* Bespoke hand-drawn archival illustration replacing the country's text name */}
          <div
            data-testid="stamp-artwork"
            data-country-code={normalizedCode}
            className="relative z-10 my-1.5 px-0.5 flex items-center justify-center overflow-hidden"
          >
            {illustrationSrc ? (
              <img
                src={illustrationSrc}
                alt={altText}
                data-artwork-code={normalizedCode}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onError={() => setImgFailed(true)}
                className="w-full h-[132px] sm:h-[140px] object-contain mix-blend-multiply brightness-[1.05] contrast-[1.07] [mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,#000_74%,transparent_100%)] select-none transition-transform duration-300 ease-out group-hover:scale-[1.06]"
              />
            ) : (
              <CountryArtworkSvg
                isoCode={normalizedCode}
                accentHex={accentHex}
                variant="stamp"
                className="w-full h-[126px] sm:h-[132px] transition-transform duration-200 ease-out group-hover:scale-[1.04]"
              />
            )}
          </div>

          {/* Minimal archival region footer (full width at rest; crossfades to country name on hover/focus) */}
          <div className="relative z-10 border-t border-rule/80 pt-2 px-1">
            <div className="relative min-h-[18px] flex items-center">
              <span
                className={`block w-full text-[11px] text-ink-muted truncate transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 ${
                  isUrdu ? 'font-normal' : 'font-mono tracking-[0.04em]'
                }`}
              >
                {subtitle}
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center font-display text-[13px] font-medium text-ink truncate opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
