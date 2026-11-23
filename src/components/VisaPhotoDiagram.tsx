import type { PhotoSpecimenVariant } from '../utils/visaPhotoRequirements';

interface VisaPhotoDiagramProps {
  specimen: PhotoSpecimenVariant;
  dimensionBadge: string;
}

/**
 * Archival consular biometric specimen plate rendered as crisp vector artwork.
 * Visually illustrates exact framing, background lighting, headwear clearance,
 * glasses glare, shadow errors, and head-crop defects in Visahouse's ink/paper palette.
 */
export function VisaPhotoDiagram({ specimen, dimensionBadge }: VisaPhotoDiagramProps) {
  const isApproved = specimen === 'approved-standard' || specimen === 'approved-headwear';
  const accentStroke = isApproved ? '#0F5C4B' : '#B93222';
  const isShadowBg = specimen === 'rejected-shadow-bg';
  const isCropped = specimen === 'rejected-cropped';
  const isExpression = specimen === 'rejected-expression';
  const isGlasses = specimen === 'rejected-glasses';
  const isHeadwear = specimen === 'approved-headwear';

  const bgFill = isShadowBg ? '#DCE4EC' : '#FFFFFF';
  const portraitTransform = isCropped
    ? 'translate(2, -62) scale(1.28)'
    : isExpression
      ? 'rotate(9 110 132)'
      : undefined;

  return (
    <div className="bg-paper-deep/55 border border-rule rounded-[2px] p-3 flex items-center justify-center">
      <svg
        viewBox="0 0 220 250"
        className="w-full max-w-[205px] h-auto block"
        role="img"
        aria-label={`Biometric visa photo diagram: ${specimen.replace(/-/g, ' ')}`}
      >
        <defs>
          <clipPath id={`photo-frame-${specimen}`}>
            <rect x="24" y="16" width="172" height="214" rx="1" />
          </clipPath>
          <pattern
            id={`hatch-${specimen}`}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="#9BAEC2" strokeWidth="1.2" opacity="0.55" />
          </pattern>
        </defs>

        {/* Outer archival mat background */}
        <rect x="0" y="0" width="220" height="250" fill="transparent" />

        {/* Corner registration ticks */}
        <g stroke="#59554C" strokeWidth="1" opacity="0.65">
          <path d="M16 16 H22 M24 8 V14" />
          <path d="M198 16 H204 M196 8 V14" />
          <path d="M16 230 H22 M24 232 V238" />
          <path d="M198 230 H204 M196 232 V238" />
        </g>

        {/* Inner Photo Print Surface */}
        <g clipPath={`url(#photo-frame-${specimen})`}>
          <rect x="24" y="16" width="172" height="214" fill={bgFill} />

          {/* Textured / patterned blue studio backdrop defect */}
          {isShadowBg && (
            <>
              <rect x="24" y="16" width="172" height="214" fill={`url(#hatch-${specimen})`} />
              {/* Harsh offset wall shadow behind head and shoulders */}
              <ellipse cx="136" cy="116" rx="40" ry="50" fill="#5D6B7A" opacity="0.35" />
              <path
                d="M72 232 C76 184 96 172 134 172 C172 172 188 186 196 232 Z"
                fill="#5D6B7A"
                opacity="0.28"
              />
            </>
          )}

          {/* Artificial phone filter vignette / bokeh rings defect */}
          {isExpression && (
            <g opacity="0.22" fill="none" stroke="#B93222" strokeDasharray="3 3">
              <circle cx="110" cy="118" r="82" strokeWidth="1.5" />
              <circle cx="110" cy="118" r="96" strokeWidth="1.5" />
            </g>
          )}

          {/* Biometric Portrait Illustration */}
          <g transform={portraitTransform}>
            {/* Shoulders & Collared Garment */}
            <path
              d="M44 234 C48 188 74 174 110 174 C146 174 172 188 176 234 Z"
              fill={isHeadwear ? '#2F4640' : '#32302B'}
              stroke="#1C1B19"
              strokeWidth="1.5"
            />
            {/* Shirt collar / neckline */}
            {!isHeadwear && (
              <path
                d="M94 174 L110 198 L126 174"
                fill="#F4EEE1"
                stroke="#1C1B19"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            )}

            {/* Neck */}
            <path
              d="M97 148 L97 177 C102 182 118 182 123 177 L123 148 Z"
              fill="#EFE6D5"
              stroke="#1C1B19"
              strokeWidth="1.4"
            />

            {/* Back Hijab / Headscarf Drape (Approved Headwear Example) */}
            {isHeadwear && (
              <path
                d="M66 112 C64 68 82 48 110 48 C138 48 156 68 154 112 L162 188 C144 198 76 198 58 188 Z"
                fill="#2F4640"
                stroke="#1C1B19"
                strokeWidth="1.5"
              />
            )}

            {/* Ears (visible when not wearing headwear) */}
            {!isHeadwear && (
              <>
                <ellipse
                  cx="76"
                  cy="113"
                  rx="5.5"
                  ry="11"
                  fill="#EFE6D5"
                  stroke="#1C1B19"
                  strokeWidth="1.4"
                />
                <ellipse
                  cx="144"
                  cy="113"
                  rx="5.5"
                  ry="11"
                  fill="#EFE6D5"
                  stroke="#1C1B19"
                  strokeWidth="1.4"
                />
              </>
            )}

            {/* Head Oval */}
            <ellipse
              cx="110"
              cy="110"
              rx="33"
              ry="44"
              fill="#F7F1E3"
              stroke="#1C1B19"
              strokeWidth="1.6"
            />

            {/* Side-face harsh shadow cast across right half of face */}
            {isShadowBg && (
              <path
                d="M110 66 A33 44 0 0 1 110 154 L110 66 Z"
                fill="#59554C"
                opacity="0.22"
              />
            )}

            {/* Hair Crown or Clean Hijab Inner Frame */}
            {isHeadwear ? (
              <path
                d="M78 106 C79 78 92 66 110 66 C128 66 141 78 142 106 C142 132 128 154 110 156 C92 154 78 132 78 106 Z"
                fill="none"
                stroke="#1C1B19"
                strokeWidth="1.8"
              />
            ) : (
              <path
                d="M76 102 C75 68 90 54 110 54 C130 54 145 68 144 102 C139 84 128 74 110 74 C92 74 81 84 76 102 Z"
                fill="#2C2A26"
                stroke="#1C1B19"
                strokeWidth="1.4"
              />
            )}

            {/* Eyebrows */}
            <path
              d="M90 98 Q97 95 104 98"
              fill="none"
              stroke="#1C1B19"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M116 98 Q123 95 130 98"
              fill="none"
              stroke="#1C1B19"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Eyes */}
            <g fill="#1C1B19">
              <circle cx={isExpression ? '100' : '97'} cy="106" r="2.3" />
              <circle cx={isExpression ? '126' : '123'} cy="106" r="2.3" />
            </g>

            {/* Nose */}
            <path
              d="M110 107 L108 122 L113 123"
              fill="none"
              stroke="#1C1B19"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Mouth: Neutral Closed vs Wide Open-Mouth Smile */}
            {isExpression ? (
              <path
                d="M96 132 Q110 146 124 132 Z"
                fill="#FFFFFF"
                stroke="#1C1B19"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M100 135 Q110 137 120 135"
                fill="none"
                stroke="#1C1B19"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}

            {/* Eyeglasses + Specular Flash Glare Defect */}
            {isGlasses && (
              <g>
                <rect
                  x="83"
                  y="99"
                  width="24"
                  height="15"
                  rx="2.5"
                  fill="#B93222"
                  fillOpacity="0.12"
                  stroke="#1C1B19"
                  strokeWidth="2.4"
                />
                <rect
                  x="113"
                  y="99"
                  width="24"
                  height="15"
                  rx="2.5"
                  fill="#B93222"
                  fillOpacity="0.12"
                  stroke="#1C1B19"
                  strokeWidth="2.4"
                />
                <line x1="107" y1="106" x2="113" y2="106" stroke="#1C1B19" strokeWidth="2.2" />
                {/* Bright studio glare streaks */}
                <line x1="87" y1="112" x2="99" y2="101" stroke="#FFFFFF" strokeWidth="3" />
                <line x1="94" y1="112" x2="103" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="117" y1="112" x2="129" y2="101" stroke="#FFFFFF" strokeWidth="3" />
                <line x1="124" y1="112" x2="133" y2="103" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            )}
          </g>

          {/* Measurement Overlays */}
          {isApproved && (
            <g stroke="#0F5C4B" strokeWidth="0.9" opacity="0.85">
              {/* Eye-level alignment dashed rule */}
              <line x1="28" y1="106" x2="192" y2="106" strokeDasharray="3 3" />
              {/* Crown-to-chin biometric caliper */}
              <line x1="176" y1="54" x2="176" y2="154" />
              <line x1="170" y1="54" x2="182" y2="54" />
              <line x1="170" y1="154" x2="182" y2="154" />
              {/* Vertical centerline tick */}
              <line x1="110" y1="20" x2="110" y2="34" strokeDasharray="2 2" />
            </g>
          )}

          {isCropped && (
            <g stroke="#B93222" strokeWidth="1.4">
              {/* Clipped top border indicator */}
              <line x1="24" y1="18" x2="196" y2="18" strokeWidth="3" />
              <line x1="110" y1="20" x2="110" y2="226" strokeDasharray="3 3" opacity="0.7" />
            </g>
          )}

          {isExpression && (
            <g stroke="#B93222" strokeWidth="1.2" fill="none">
              {/* Vertical reference vs tilted axis */}
              <line x1="110" y1="26" x2="110" y2="162" strokeDasharray="3 3" opacity="0.7" />
              <line x1="124" y1="28" x2="96" y2="162" opacity="0.8" />
            </g>
          )}

          {isGlasses && (
            <g stroke="#B93222" strokeWidth="1.3">
              <line x1="78" y1="95" x2="142" y2="118" strokeDasharray="3 2" />
            </g>
          )}

          {/* Subtle archival border inside clip */}
          <rect
            x="24.5"
            y="16.5"
            width="171"
            height="213"
            fill="none"
            stroke={accentStroke}
            strokeWidth="1.4"
          />
        </g>

        {/* Bottom Dimension Footnote */}
        <text
          x="110"
          y="244"
          textAnchor="middle"
          fill="#59554C"
          fontSize="9.5"
          fontFamily="IBM Plex Mono, ui-monospace, monospace"
          letterSpacing="0.08em"
        >
          {isApproved ? `OK · ${dimensionBadge}` : `REJECT · ${dimensionBadge}`}
        </text>
      </svg>
    </div>
  );
}
