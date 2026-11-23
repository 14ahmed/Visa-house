interface CountryArtworkSvgProps {
  isoCode: string;
  accentHex: string;
  variant?: 'stamp' | 'plate';
  className?: string;
}

/**
 * Shared archival engraved line-art landmark drawing for every destination
 * (all 38 countries + Schengen + Travel Insurance).
 * Uses clean duotone ink strokes with subtle tinted architectural silhouettes
 * so drawings read crisply at both postage-stamp and full-plate sizes.
 */
export function CountryArtworkSvg({
  isoCode,
  accentHex,
  variant = 'stamp',
  className = 'w-full h-full',
}: CountryArtworkSvgProps) {
  const strokeW = variant === 'stamp' ? 1.85 : 1.45;
  const softFill = `${accentHex}16`;
  const midFill = `${accentHex}24`;

  const renderArt = () => {
    switch (isoCode.toUpperCase()) {
      case 'THA':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Thai Chedi & Chao Phraya river waves */}
            <path d="M126 88 L160 56 L194 88 L196 112 L124 112 Z" fill={softFill} stroke="none" />
            <path d="M160 18 L160 34 M148 44 L160 28 L172 44 M138 62 L160 40 L182 62 M126 88 L160 56 L194 88" />
            <path d="M116 112 L204 112 M124 88 L124 112 M196 88 L196 112 M144 88 L144 112 M176 88 L176 112" />
            <path d="M84 112 L100 72 L116 112 M204 112 L220 72 L236 112" opacity="0.72" />
            <path d="M36 126 Q72 118 108 126 T180 126 T252 126 T288 126" opacity="0.6" />
            <path d="M52 136 Q96 130 140 136 T228 136 T274 136" opacity="0.4" />
          </g>
        );
      case 'MYS':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Petronas twin spires + skybridge */}
            <path d="M126 116 L126 42 L134 22 L142 42 L142 116 Z" fill={softFill} />
            <path d="M178 116 L178 42 L186 22 L194 42 L194 116 Z" fill={softFill} />
            <line x1="142" y1="74" x2="178" y2="74" strokeWidth={strokeW + 0.4} />
            <path d="M142 86 L160 74 L178 86" />
            <path d="M118 60 L150 60 M170 60 L202 60 M118 92 L150 92 M170 92 L202 92" opacity="0.6" />
            <line x1="56" y1="116" x2="264" y2="116" />
          </g>
        );
      case 'IDN':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Balinese Candi Bentar split gate + terraced hills */}
            <path d="M110 116 L110 56 L122 56 L122 44 L134 44 L134 30 L144 30 L144 116 Z" fill={softFill} />
            <path d="M210 116 L210 56 L198 56 L198 44 L186 44 L186 30 L176 30 L176 116 Z" fill={softFill} />
            <path d="M40 116 Q80 96 110 116 M210 116 Q240 96 280 116" opacity="0.6" />
            <path d="M48 128 Q160 118 272 128" opacity="0.45" />
          </g>
        );
      case 'SGP':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Marina Bay three towers + skypark + conservatory domes */}
            <path d="M98 44 Q160 32 228 42 L222 52 Q160 44 102 52 Z" fill={midFill} />
            <path d="M112 52 L112 116 M130 52 L130 116 M150 49 L150 116 M168 49 L168 116 M188 50 L188 116 M206 50 L206 116" />
            <path d="M52 116 Q76 82 100 116" fill={softFill} opacity="0.85" />
            <path d="M220 116 Q244 86 268 116" fill={softFill} opacity="0.85" />
            <line x1="40" y1="116" x2="280" y2="116" />
          </g>
        );
      case 'KHM':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Angkor lotus towers */}
            <path d="M160 22 C148 42 146 66 146 92 L174 92 C174 66 172 42 160 22 Z" fill={softFill} />
            <path d="M120 44 C112 58 110 74 110 92 L132 92 C132 74 130 58 120 44 Z" fill={softFill} />
            <path d="M200 44 C190 58 188 74 188 92 L210 92 C210 74 208 58 200 44 Z" fill={softFill} />
            <rect x="76" y="92" width="168" height="24" fill={softFill} />
            <line x1="60" y1="126" x2="260" y2="126" opacity="0.55" />
          </g>
        );
      case 'LKA':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Nine Arch Bridge & tea hills */}
            <path d="M40 58 Q100 30 160 54 T280 46 L280 72 L40 72 Z" fill={softFill} stroke="none" />
            <path d="M40 72 L280 72 M40 80 L280 80" />
            <path d="M62 116 L62 80 A14 14 0 0 1 90 80 L90 116" />
            <path d="M104 116 L104 80 A14 14 0 0 1 132 80 L132 116" />
            <path d="M146 116 L146 80 A14 14 0 0 1 174 80 L174 116" />
            <path d="M188 116 L188 80 A14 14 0 0 1 216 80 L216 116" />
            <path d="M230 116 L230 80 A14 14 0 0 1 258 80 L258 116" />
            <path d="M40 58 Q100 30 160 54 T280 46" opacity="0.55" />
          </g>
        );
      case 'NPL':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Himalayan ridge & stupa dome */}
            <path d="M36 114 L98 44 L138 82 L176 26 L224 78 L256 54 L286 114 Z" fill={softFill} />
            <path d="M158 52 L176 26 L194 52" opacity="0.6" />
            <path d="M126 114 A34 22 0 0 1 194 114" fill={midFill} />
            <path d="M152 92 L160 72 L168 92" />
            <line x1="36" y1="114" x2="286" y2="114" />
          </g>
        );
      case 'UZB':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Samarkand Registan pishtaq arch & turquoise dome */}
            <path d="M134 42 C134 20 186 20 186 42 Z" fill={midFill} />
            <rect x="108" y="42" width="104" height="74" fill={softFill} />
            <path d="M132 116 L132 72 Q160 48 188 72 L188 116" />
            <path d="M84 116 L84 36 L96 36 L96 116 M224 116 L224 36 L236 36 L236 116" />
            <line x1="56" y1="116" x2="264" y2="116" />
          </g>
        );
      case 'BHR':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Manama twin sails & Gulf horizon */}
            <path d="M114 116 Q126 58 148 24 L152 116 Z" fill={softFill} />
            <path d="M168 116 L172 24 Q194 58 206 116 Z" fill={softFill} />
            <circle cx="160" cy="64" r="7" />
            <circle cx="160" cy="88" r="7" />
            <line x1="149" y1="64" x2="171" y2="64" />
            <line x1="150" y1="88" x2="170" y2="88" />
            <path d="M44 124 Q160 116 276 124" opacity="0.6" />
          </g>
        );
      case 'JPN':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Torii gate + Mount Fuji silhouette */}
            <path d="M44 116 L112 52 L140 52 L208 116 Z" fill={softFill} opacity="0.7" />
            <path d="M98 40 Q160 50 222 40" strokeWidth={strokeW + 0.8} />
            <line x1="108" y1="56" x2="212" y2="56" strokeWidth={strokeW + 0.2} />
            <line x1="126" y1="44" x2="122" y2="116" strokeWidth={strokeW + 0.5} />
            <line x1="194" y1="44" x2="198" y2="116" strokeWidth={strokeW + 0.5} />
            <line x1="160" y1="45" x2="160" y2="56" strokeWidth={strokeW + 0.5} />
            <line x1="40" y1="116" x2="280" y2="116" />
          </g>
        );
      case 'KOR':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Gyeongbokgung curved eaves & stone base */}
            <path d="M74 64 Q160 44 246 64 L232 76 L88 76 Z" fill={midFill} />
            <path d="M96 48 Q160 32 224 48" />
            <line x1="104" y1="76" x2="104" y2="104" />
            <line x1="136" y1="76" x2="136" y2="104" />
            <line x1="184" y1="76" x2="184" y2="104" />
            <line x1="216" y1="76" x2="216" y2="104" />
            <rect x="80" y="104" width="160" height="14" fill={softFill} />
            <path d="M148 118 L148 108 A12 10 0 0 1 172 108 L172 118" />
          </g>
        );
      case 'PHL':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Palawan karst cliffs & Intramuros arch */}
            <path d="M52 116 L76 62 L98 78 L124 44 L148 116 Z" fill={softFill} opacity="0.7" />
            <rect x="148" y="54" width="112" height="62" fill={softFill} />
            <path d="M184 116 L184 82 A20 20 0 0 1 224 82 L224 116" />
            <path d="M40 126 Q160 118 280 126" opacity="0.6" />
          </g>
        );
      case 'USA':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Classic civic dome & colonnade */}
            <path d="M128 66 C128 32 192 32 192 66 Z" fill={midFill} />
            <line x1="160" y1="22" x2="160" y2="34" />
            <rect x="114" y="66" width="92" height="16" fill={softFill} />
            <rect x="76" y="82" width="168" height="34" fill={softFill} />
            <line x1="94" y1="82" x2="94" y2="116" />
            <line x1="118" y1="82" x2="118" y2="116" />
            <line x1="142" y1="82" x2="142" y2="116" />
            <line x1="178" y1="82" x2="178" y2="116" />
            <line x1="202" y1="82" x2="202" y2="116" />
            <line x1="226" y1="82" x2="226" y2="116" />
            <line x1="56" y1="116" x2="264" y2="116" />
          </g>
        );
      case 'CAN':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* CN Tower & Rocky Mountain ridge */}
            <path d="M40 116 L90 66 L124 94 L152 116 Z" fill={softFill} opacity="0.65" />
            <path d="M188 116 L228 62 L278 116 Z" fill={softFill} opacity="0.65" />
            <line x1="160" y1="18" x2="160" y2="38" strokeWidth={strokeW + 0.3} />
            <path d="M153 56 L157 38 L163 38 L167 56 Z" fill={midFill} />
            <ellipse cx="160" cy="54" rx="14" ry="5" fill={softFill} />
            <path d="M155 59 L148 116 M165 59 L172 116" />
            <line x1="40" y1="116" x2="280" y2="116" />
          </g>
        );
      case 'GBR':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Westminster clock tower & Thames bridge arches */}
            <path d="M144 116 L144 48 L160 22 L176 48 L176 116 Z" fill={softFill} />
            <rect x="148" y="54" width="24" height="24" fill={midFill} />
            <circle cx="160" cy="66" r="8" />
            <path d="M160 66 L160 61 M160 66 L165 66" />
            <path d="M44 96 L144 96 M176 96 L276 96" />
            <path d="M56 116 A22 18 0 0 1 100 116 M100 116 A22 18 0 0 1 144 116" opacity="0.7" />
            <path d="M176 116 A22 18 0 0 1 220 116 M220 116 A22 18 0 0 1 264 116" opacity="0.7" />
            <line x1="40" y1="116" x2="280" y2="116" />
          </g>
        );
      case 'AUS':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Sydney Harbour billowing opera shells */}
            <path d="M62 112 Q84 52 126 112 Z" fill={softFill} />
            <path d="M92 112 Q122 36 174 112 Z" fill={midFill} />
            <path d="M138 112 Q168 48 214 112 Z" fill={softFill} />
            <path d="M188 112 Q212 68 250 112 Z" fill={softFill} />
            <line x1="44" y1="112" x2="276" y2="112" />
            <path d="M44 124 Q102 118 160 124 T276 124" opacity="0.55" />
          </g>
        );
      case 'NZL':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Milford Sound peak & fiord reflection */}
            <path d="M44 102 L106 46 L142 74 L178 28 L224 80 L276 102 Z" fill={softFill} />
            <path d="M160 52 L178 28 L194 52" opacity="0.6" />
            <line x1="36" y1="102" x2="284" y2="102" />
            <path d="M64 114 L256 114 M88 124 L232 124 M118 132 L202 132" opacity="0.5" />
          </g>
        );
      case 'SCH':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* European compass ring & 12-star constellation */}
            <circle cx="160" cy="76" r="44" fill={softFill} />
            <circle cx="160" cy="76" r="28" strokeDasharray="3 4" />
            <path d="M160 28 L160 124 M112 76 L208 76" opacity="0.45" />
            <path d="M160 44 L166 70 L192 76 L166 82 L160 108 L154 82 L128 76 L154 70 Z" fill={midFill} />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <circle
                  key={deg}
                  cx={160 + Math.cos(rad) * 36}
                  cy={76 + Math.sin(rad) * 36}
                  r="1.5"
                  fill={accentHex}
                  stroke="none"
                />
              );
            })}
          </g>
        );
      case 'DEU':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Brandenburg Gate colonnade */}
            <rect x="86" y="42" width="148" height="16" fill={softFill} />
            <rect x="134" y="28" width="52" height="14" fill={midFill} />
            <line x1="98" y1="58" x2="98" y2="116" strokeWidth={strokeW + 0.4} />
            <line x1="122" y1="58" x2="122" y2="116" strokeWidth={strokeW + 0.4} />
            <line x1="146" y1="58" x2="146" y2="116" strokeWidth={strokeW + 0.4} />
            <line x1="174" y1="58" x2="174" y2="116" strokeWidth={strokeW + 0.4} />
            <line x1="198" y1="58" x2="198" y2="116" strokeWidth={strokeW + 0.4} />
            <line x1="222" y1="58" x2="222" y2="116" strokeWidth={strokeW + 0.4} />
            <line x1="56" y1="116" x2="264" y2="116" />
          </g>
        );
      case 'FRA':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Eiffel lattice tower */}
            <path d="M160 20 L153 74 L124 116 L142 116 A18 18 0 0 1 178 116 L196 116 L167 74 Z" fill={softFill} />
            <line x1="146" y1="68" x2="174" y2="68" />
            <line x1="138" y1="90" x2="182" y2="90" />
            <path d="M155 46 L165 56 M165 46 L155 56 M148 74 L172 86 M172 74 L148 86" opacity="0.65" />
            <line x1="60" y1="116" x2="260" y2="116" />
          </g>
        );
      case 'GRC':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Acropolis temple pediment & Doric columns */}
            <path d="M78 56 L160 26 L242 56 Z" fill={midFill} />
            <line x1="84" y1="62" x2="236" y2="62" />
            <line x1="96" y1="62" x2="96" y2="110" />
            <line x1="122" y1="62" x2="122" y2="110" />
            <line x1="148" y1="62" x2="148" y2="110" />
            <line x1="172" y1="62" x2="172" y2="110" />
            <line x1="198" y1="62" x2="198" y2="110" />
            <line x1="224" y1="62" x2="224" y2="110" />
            <rect x="74" y="110" width="172" height="8" fill={softFill} />
            <path d="M54 128 Q106 122 160 128 T266 128" opacity="0.55" />
          </g>
        );
      case 'PRT':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Lisbon river tower & coastal bridge */}
            <rect x="128" y="42" width="64" height="72" fill={softFill} />
            <path d="M128 42 L128 34 L138 34 L138 42 M155 42 L155 34 L165 34 L165 42 M182 42 L182 34 L192 34 L192 42" />
            <path d="M148 114 L148 86 A12 12 0 0 1 172 86 L172 114" fill={midFill} />
            <path d="M44 114 Q86 78 128 114 M192 114 Q234 78 276 114" opacity="0.55" />
            <path d="M44 124 Q160 118 276 124" opacity="0.55" />
          </g>
        );
      case 'HUN':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Danube Parliament dome & Chain Bridge */}
            <path d="M138 66 C138 36 182 36 182 66 Z" fill={midFill} />
            <line x1="160" y1="22" x2="160" y2="38" />
            <rect x="92" y="66" width="136" height="44" fill={softFill} />
            <path d="M108 66 L108 48 L114 66 M206 66 L212 48 L212 66" />
            <path d="M44 110 Q102 88 160 110 T276 110" opacity="0.65" />
            <line x1="40" y1="122" x2="280" y2="122" opacity="0.5" />
          </g>
        );
      case 'POL':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Old Town market gables & Gothic spire */}
            <path d="M74 116 L74 72 L94 52 L114 72 L114 116 Z" fill={softFill} />
            <path d="M114 116 L114 64 L138 42 L162 64 L162 116 Z" fill={softFill} />
            <path d="M162 116 L162 56 L176 26 L190 56 L190 116 Z" fill={midFill} />
            <path d="M190 116 L190 70 L214 50 L238 70 L238 116 Z" fill={softFill} />
            <line x1="56" y1="116" x2="264" y2="116" />
          </g>
        );
      case 'NLD':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Windmill sails & canal houses */}
            <path d="M140 116 L150 54 L170 54 L180 116 Z" fill={midFill} />
            <line x1="124" y1="30" x2="196" y2="86" strokeWidth={strokeW + 0.35} />
            <line x1="196" y1="30" x2="124" y2="86" strokeWidth={strokeW + 0.35} />
            <path d="M68 116 L68 78 L88 64 L108 78 L108 116 Z" fill={softFill} opacity="0.7" />
            <path d="M212 116 L212 78 L232 64 L252 78 L252 116 Z" fill={softFill} opacity="0.7" />
            <line x1="48" y1="116" x2="272" y2="116" />
          </g>
        );
      case 'NOR':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Fjord cliffs & Nordic stave gable */}
            <path d="M36 42 L94 108 M284 42 L226 108" opacity="0.6" />
            <path d="M134 108 L160 66 L186 108 Z" fill={softFill} />
            <path d="M142 82 L160 48 L178 82 M150 58 L160 34 L170 58" />
            <line x1="40" y1="108" x2="280" y2="108" />
            <path d="M72 120 Q160 114 248 120" opacity="0.55" />
          </g>
        );
      case 'DNK':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Nyhavn canal row & maritime mast */}
            <rect x="70" y="64" width="38" height="50" fill={softFill} />
            <path d="M70 64 L89 48 L108 64" />
            <rect x="108" y="54" width="44" height="60" fill={midFill} />
            <path d="M108 54 L130 38 L152 54" />
            <rect x="152" y="62" width="40" height="52" fill={softFill} />
            <path d="M152 62 L172 46 L192 62" />
            <path d="M226 32 L226 114 M226 42 L254 96 L226 96" opacity="0.75" />
            <line x1="52" y1="114" x2="268" y2="114" />
          </g>
        );
      case 'BEL':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Brussels spire & Grand Place facade */}
            <path d="M150 116 L154 44 L160 20 L166 44 L170 116 Z" fill={midFill} />
            <rect x="86" y="72" width="148" height="44" fill={softFill} />
            <path d="M100 116 L100 90 A10 10 0 0 1 120 90 L120 116" />
            <path d="M200 116 L200 90 A10 10 0 0 1 220 90 L220 116" />
            <line x1="60" y1="116" x2="260" y2="116" />
          </g>
        );
      case 'LUX':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Pont Adolphe monumental stone arch */}
            <path d="M76 62 L244 62 L244 116 A84 54 0 0 0 76 116 Z" fill={softFill} stroke="none" />
            <line x1="44" y1="54" x2="276" y2="54" strokeWidth={strokeW + 0.35} />
            <line x1="44" y1="62" x2="276" y2="62" />
            <path d="M76 116 A84 54 0 0 1 244 116" strokeWidth={strokeW + 0.3} />
            <path d="M106 116 A54 34 0 0 1 214 116" opacity="0.7" />
            <line x1="76" y1="62" x2="76" y2="116" />
            <line x1="244" y1="62" x2="244" y2="116" />
            <line x1="44" y1="116" x2="276" y2="116" />
          </g>
        );
      case 'FIN':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Helsinki Cathedral dome & Nordic horizon */}
            <path d="M138 64 C138 36 182 36 182 64 Z" fill={midFill} />
            <line x1="160" y1="24" x2="160" y2="38" />
            <rect x="116" y="64" width="88" height="44" fill={softFill} />
            <line x1="132" y1="64" x2="132" y2="108" />
            <line x1="150" y1="64" x2="150" y2="108" />
            <line x1="170" y1="64" x2="170" y2="108" />
            <line x1="188" y1="64" x2="188" y2="108" />
            <path d="M76 108 L244 108 M64 116 L256 116" />
          </g>
        );
      case 'SWE':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Stockholm tower & archipelago water */}
            <rect x="86" y="68" width="118" height="44" fill={softFill} />
            <rect x="196" y="34" width="24" height="78" fill={midFill} />
            <path d="M200 34 L208 20 L216 34" />
            <path d="M98 112 L98 92 A8 8 0 0 1 114 92 L114 112 M130 112 L130 92 A8 8 0 0 1 146 92 L146 112 M162 112 L162 92 A8 8 0 0 1 178 92 L178 112" />
            <path d="M44 124 Q102 118 160 124 T276 124" opacity="0.6" />
          </g>
        );
      case 'CHE':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Matterhorn alpine pyramid & rail viaduct */}
            <path d="M44 114 L106 64 L164 24 L218 82 L276 114 Z" fill={softFill} />
            <path d="M164 24 L152 68 L178 114" opacity="0.55" />
            <path d="M70 114 A18 14 0 0 1 106 114 M106 114 A18 14 0 0 1 142 114 M178 114 A18 14 0 0 1 214 114" opacity="0.75" />
            <line x1="40" y1="114" x2="280" y2="114" />
          </g>
        );
      case 'AUT':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Vienna baroque dome & alpine crest */}
            <path d="M44 114 L92 68 L126 92" opacity="0.5" />
            <path d="M194 92 L228 68 L276 114" opacity="0.5" />
            <path d="M134 68 C134 38 186 38 186 68 Z" fill={midFill} />
            <rect x="104" y="68" width="112" height="46" fill={softFill} />
            <path d="M148 114 L148 88 A12 12 0 0 1 172 88 L172 114" />
            <line x1="44" y1="114" x2="276" y2="114" />
          </g>
        );
      case 'EGY':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Great Pyramids of Giza & Nile wave */}
            <path d="M48 112 L114 38 L180 112 Z" fill={softFill} />
            <path d="M114 38 L130 112" opacity="0.55" />
            <path d="M144 112 L198 52 L252 112 Z" fill={midFill} />
            <path d="M198 52 L212 112" opacity="0.55" />
            <path d="M222 112 L252 78 L282 112 Z" fill={softFill} opacity="0.8" />
            <path d="M44 124 Q102 118 160 124 T276 124" opacity="0.55" />
          </g>
        );
      case 'MAR':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Marrakech horseshoe arch & Koutoubia minaret */}
            <rect x="102" y="44" width="116" height="72" fill={softFill} />
            <path d="M134 116 L134 90 C126 70 140 56 160 56 C180 56 194 70 186 90 L186 116" fill={midFill} />
            <rect x="224" y="34" width="22" height="82" fill={softFill} />
            <path d="M229 34 L235 22 L241 34" />
            <line x1="60" y1="116" x2="268" y2="116" />
          </g>
        );
      case 'KEN':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Savannah acacia & highland silhouette */}
            <path d="M40 114 Q112 66 184 86 T280 74" opacity="0.5" />
            <path d="M160 114 L160 66 M160 80 L134 62 M160 76 L188 60" strokeWidth={strokeW + 0.3} />
            <path d="M108 62 Q160 44 212 62 Q160 66 108 62 Z" fill={midFill} />
            <circle cx="242" cy="42" r="11" fill={softFill} opacity="0.85" />
            <line x1="40" y1="114" x2="280" y2="114" />
          </g>
        );
      case 'ZAF':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Table Mountain flat massif & Cape coast */}
            <path d="M44 112 L88 54 L224 54 L268 112 Z" fill={softFill} strokeWidth={strokeW + 0.2} />
            <path d="M98 54 L112 112 M210 54 L196 112" opacity="0.45" />
            <path d="M40 112 L280 112" />
            <path d="M52 124 Q106 118 160 124 T268 124" opacity="0.6" />
          </g>
        );
      case 'ZWE':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Victoria Falls bridge arch & cascade lines */}
            <line x1="44" y1="54" x2="276" y2="54" strokeWidth={strokeW + 0.25} />
            <path d="M84 114 A76 54 0 0 1 236 114" />
            <path d="M116 58 L116 110 M136 58 L136 112 M160 58 L160 114 M184 58 L184 112 M204 58 L204 110" strokeDasharray="4 4" opacity="0.7" />
            <path d="M56 122 Q160 114 264 122" opacity="0.55" />
          </g>
        );
      case 'INS':
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Protective Travel Medical Insurance shield, cross & flight wings */}
            <path
              d="M160 22 L208 38 V76 C208 102 187 118 160 128 C133 118 112 102 112 76 V38 Z"
              fill={softFill}
            />
            <path
              d="M160 32 L198 45 V75 C198 96 181 109 160 118 C139 109 122 96 122 75 V45 Z"
              opacity="0.55"
            />
            <path
              d="M154 56 H166 V68 H178 V80 H166 V92 H154 V80 H142 V68 H154 Z"
              fill={midFill}
            />
            <path d="M62 66 Q84 58 104 66 M68 78 Q86 72 104 78" opacity="0.6" />
            <path d="M216 66 Q236 58 258 66 M216 78 Q234 72 252 78" opacity="0.6" />
          </g>
        );
      default:
        return (
          <g stroke={accentHex} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
            <circle cx="160" cy="74" r="42" fill={softFill} />
            <ellipse cx="160" cy="74" rx="20" ry="42" />
            <line x1="118" y1="74" x2="202" y2="74" />
            <line x1="124" y1="54" x2="196" y2="54" opacity="0.55" />
            <line x1="124" y1="94" x2="196" y2="94" opacity="0.55" />
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 320 148"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-artwork-code={isoCode.toUpperCase()}
    >
      {/* Fine cartographic registration hairlines */}
      <line x1="24" y1="18" x2="296" y2="18" stroke={accentHex} strokeWidth="0.6" opacity="0.24" />
      <line x1="24" y1="138" x2="296" y2="138" stroke={accentHex} strokeWidth="0.6" opacity="0.24" />
      {renderArt()}
    </svg>
  );
}
