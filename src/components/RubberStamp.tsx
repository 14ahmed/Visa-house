import { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface RubberStampProps {
  label: string;
  sublabel?: string;
  color?: string;
  rotation?: number;
  variant?: 'rect' | 'oval';
  className?: string;
}

const URDU_SCRIPT_RE = /[\u0600-\u06FF]/;

/**
 * Tactile rubber-stamp mark rendered with SVG feTurbulence rough ink edges.
 * Rotated 2–6° and lands once when scrolled into view (honours prefers-reduced-motion).
 */
export function RubberStamp({
  label,
  sublabel,
  color = '#B93222',
  rotation = -4,
  variant = 'rect',
  className = '',
}: RubberStampProps) {
  const { isUrdu } = useLanguage();
  const resolvedSublabel = sublabel ?? (isUrdu ? 'ویزا ہاؤس ڈیسک' : 'VISAHOUSE DESK');
  const labelIsUrdu = URDU_SCRIPT_RE.test(label);
  const sublabelIsUrdu = URDU_SCRIPT_RE.test(resolvedSublabel);
  const footerText = isUrdu ? 'نجی کنسلٹنسی · پاکستان' : 'PRIVATE CONSULTANCY · PAK';

  const rawId = useId().replace(/:/g, '');
  const filterId = `ink-rough-${rawId}`;
  const ref = useRef<HTMLDivElement | null>(null);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLanded(true);
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      setLanded(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setLanded(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ ['--stamp-rot' as string]: `${rotation}deg` }}
      className={`inline-block select-none pointer-events-none ${
        landed ? 'stamp-landed' : 'stamp-land-ready'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={variant === 'oval' ? '0 0 210 104' : '0 0 220 82'}
        className={variant === 'oval' ? 'w-44 h-auto' : 'w-48 h-auto'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.065"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter={`url(#${filterId})`} stroke={color} fill={color}>
          {variant === 'oval' ? (
            <>
              <ellipse cx="105" cy="52" rx="98" ry="44" fill="none" strokeWidth="2.5" />
              <ellipse
                cx="105"
                cy="52"
                rx="91"
                ry="37"
                fill="none"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x="105"
                y="46"
                textAnchor="middle"
                stroke="none"
                fontFamily={
                  labelIsUrdu ? 'Noto Naskh Arabic, system-ui, sans-serif' : 'IBM Plex Mono, monospace'
                }
                fontSize={labelIsUrdu ? '13.5' : '11.5'}
                fontWeight="600"
                letterSpacing={labelIsUrdu ? '0' : '2.2'}
              >
                {label}
              </text>
              <line x1="36" y1="54" x2="174" y2="54" strokeWidth="1" opacity="0.7" />
              <text
                x="105"
                y="70"
                textAnchor="middle"
                stroke="none"
                fontFamily={
                  sublabelIsUrdu
                    ? 'Noto Naskh Arabic, system-ui, sans-serif'
                    : 'IBM Plex Mono, monospace'
                }
                fontSize={sublabelIsUrdu ? '10.5' : '9'}
                fontWeight="500"
                letterSpacing={sublabelIsUrdu ? '0' : '2.4'}
                opacity="0.85"
              >
                {resolvedSublabel}
              </text>
            </>
          ) : (
            <>
              <rect x="4" y="4" width="212" height="74" rx="3" fill="none" strokeWidth="2.6" />
              <rect x="9" y="9" width="202" height="64" rx="1.5" fill="none" strokeWidth="1" />
              <line x1="16" y1="27" x2="204" y2="27" strokeWidth="0.9" opacity="0.75" />
              <line x1="16" y1="55" x2="204" y2="55" strokeWidth="0.9" opacity="0.75" />
              <text
                x="110"
                y="21"
                textAnchor="middle"
                stroke="none"
                fontFamily={
                  sublabelIsUrdu
                    ? 'Noto Naskh Arabic, system-ui, sans-serif'
                    : 'IBM Plex Mono, monospace'
                }
                fontSize={sublabelIsUrdu ? '10' : '8.5'}
                fontWeight="500"
                letterSpacing={sublabelIsUrdu ? '0' : '2.6'}
                opacity="0.88"
              >
                {resolvedSublabel}
              </text>
              <text
                x="110"
                y="46"
                textAnchor="middle"
                stroke="none"
                fontFamily={
                  labelIsUrdu ? 'Noto Naskh Arabic, system-ui, sans-serif' : 'IBM Plex Mono, monospace'
                }
                fontSize={labelIsUrdu ? '14' : '12.5'}
                fontWeight="600"
                letterSpacing={labelIsUrdu ? '0' : '2'}
              >
                {label}
              </text>
              <text
                x="110"
                y="67"
                textAnchor="middle"
                stroke="none"
                fontFamily={
                  isUrdu ? 'Noto Naskh Arabic, system-ui, sans-serif' : 'IBM Plex Mono, monospace'
                }
                fontSize={isUrdu ? '9.5' : '8'}
                fontWeight="500"
                letterSpacing={isUrdu ? '0' : '2.4'}
                opacity="0.82"
              >
                {footerText}
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
}
