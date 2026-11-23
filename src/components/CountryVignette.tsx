import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getCountryArtworkMeta } from '../utils/countryArtwork';
import { CountryArtworkSvg } from './CountryArtwork';

interface CountryVignetteProps {
  isoCode: string;
  countryName: string;
  accentHex: string;
  className?: string;
}

/**
 * Bespoke hand-drawn archival etching plate per destination.
 * Displays the cohesive generated pen-and-ink & watercolor illustration with an automatic SVG fallback.
 */
export function CountryVignette({
  isoCode,
  countryName,
  accentHex,
  className = 'w-full h-52',
}: CountryVignetteProps) {
  const { isUrdu } = useLanguage();
  const [imgFailed, setImgFailed] = useState(false);

  const normalizedCode = isoCode.trim().toUpperCase();
  const artworkMeta = getCountryArtworkMeta(normalizedCode);
  const illustrationSrc = !imgFailed ? artworkMeta?.imageSrc : undefined;

  return (
    <div
      className={`relative border border-rule bg-slip/80 p-4 flex flex-col justify-between overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between mono-label text-ink-muted">
        <span>
          {isUrdu ? 'پلیٹ · ' : 'PLATE · '}
          <span className="font-latin-mono">{normalizedCode}</span>
        </span>
        <span>{isUrdu ? 'ہاتھ سے بنایا گیا نقش' : 'DESTINATION PLATE'}</span>
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center my-1.5 overflow-hidden">
        {illustrationSrc ? (
          <img
            src={illustrationSrc}
            alt={
              artworkMeta
                ? `${countryName} visa from Pakistan — ${artworkMeta.motif}`
                : `${countryName} visa guide from Pakistan`
            }
            data-artwork-code={normalizedCode}
            referrerPolicy="no-referrer"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="w-full h-full max-h-36 object-contain mix-blend-multiply brightness-[1.05] contrast-[1.07] [mask-image:radial-gradient(ellipse_92%_90%_at_50%_50%,#000_74%,transparent_100%)] select-none"
          />
        ) : (
          <CountryArtworkSvg
            isoCode={normalizedCode}
            accentHex={accentHex}
            variant="plate"
            className="w-full h-32 mx-auto"
          />
        )}
      </div>

      <div
        className={`flex items-center justify-between border-t border-rule/80 pt-2 text-xs text-ink-muted ${
          isUrdu ? 'font-medium' : 'font-mono'
        }`}
      >
        <span>{isUrdu ? countryName : countryName.toUpperCase()}</span>
        <span>{isUrdu ? 'پاکستان ڈیسک' : 'PAKISTAN DESK'}</span>
      </div>
    </div>
  );
}
