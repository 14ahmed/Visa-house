export const VISAHOUSE_THEMED_LOGO_SRC =
  '/src/assets/images/visahouse_themed_logo_1795428543532.avif';

interface BrandLogoProps {
  className?: string;
  alt?: string;
}

/**
 * Full theme-matched Visahouse travel logo recolored to the archival
 * consular green (#0F5C4B / #0A4336), ink (#1C1B19), and marigold (#E8A93B) palette.
 * Uses mix-blend-multiply so its pure white ground dissolves seamlessly onto paper surfaces.
 */
export function BrandLogo({
  className = 'h-12 w-auto',
  alt = 'Visahouse — Online Visa Consultancy Pakistan',
}: BrandLogoProps) {
  return (
    <img
      src={VISAHOUSE_THEMED_LOGO_SRC}
      alt={alt}
      width={400}
      height={223}
      referrerPolicy="no-referrer"
      decoding="async"
      className={`block w-auto object-contain mix-blend-multiply brightness-[1.03] contrast-[1.05] select-none ${className}`}
    />
  );
}

interface BrandMarkProps {
  className?: string;
}

/**
 * Visahouse Roofline-"V" house glyph logo.
 * Combines an architectural pitched roofline over a crisp V monogram.
 */
export function BrandMark({ className = 'h-7 w-7' }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer archival frame */}
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Pitched roofline */}
      <path
        d="M5.5 16.5L18 6.5L30.5 16.5"
        stroke="#0F5C4B"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Hairline eaves rule */}
      <line x1="8" y1="17.5" x2="28" y2="17.5" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      {/* Sharp V monogram beneath the roof */}
      <path
        d="M11.5 18.5L18 30L24.5 18.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Subtle chimney / stamp notch */}
      <line x1="25" y1="8.5" x2="25" y2="12" stroke="#B93222" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
