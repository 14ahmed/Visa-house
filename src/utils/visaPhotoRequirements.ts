import { SITE_CONFIG } from '../config/site';

export type PhotoStandardId = 'schengen-uk' | 'usa-digital' | 'canada' | 'japan-asia';
export type PhotoExampleFilter = 'all' | 'correct' | 'incorrect';
export type PhotoSpecimenVariant =
  | 'approved-standard'
  | 'approved-headwear'
  | 'rejected-glasses'
  | 'rejected-shadow-bg'
  | 'rejected-cropped'
  | 'rejected-expression';

export interface VisaPhotoStandard {
  id: PhotoStandardId;
  shortLabel: string;
  title: string;
  countriesSummary: string;
  dimensionsLabel: string;
  aspectRatioLabel: string;
  digitalSpec: string;
  headHeightSpec: string;
  backgroundSpec: string;
  glassesRule: string;
  recencyRule: string;
  studioNote: string;
}

export interface VisaPhotoExample {
  id: string;
  specimen: PhotoSpecimenVariant;
  isCorrect: boolean;
  plateCode: string;
  title: string;
  verdictLabel: string;
  ruleSummary: string;
  detailNote: string;
}

export const VISA_PHOTO_STANDARDS: VisaPhotoStandard[] = [
  {
    id: 'schengen-uk',
    shortLabel: 'Schengen & UK',
    title: 'Schengen Area & UK Biometric Standard',
    countriesSummary: 'France, Italy, Spain, Germany, Switzerland, Netherlands, UK & EU states',
    dimensionsLabel: '35 × 45 mm',
    aspectRatioLabel: '35×45 mm',
    digitalSpec: '600 × 750 px min (JPEG · UK online)',
    headHeightSpec: '70–80% of frame (32–36 mm)',
    backgroundSpec: 'Plain white or very light neutral matte',
    glassesRule: 'No glasses strongly advised (strictly zero glare/tinted lenses)',
    recencyRule: 'Taken within last 6 months',
    studioNote:
      'Ask your studio for matte finish paper (not glossy) with zero retouching around skin texture or hairline.',
  },
  {
    id: 'usa-digital',
    shortLabel: 'USA (2 × 2 in)',
    title: 'United States DS-160 & Interview Standard',
    countriesSummary: 'United States B1/B2, F-1 Student, and square-format global e-Visas',
    dimensionsLabel: '51 × 51 mm (2 × 2 in)',
    aspectRatioLabel: '2×2 in',
    digitalSpec: '600 × 600 px to 1200 × 1200 px (JPEG ≤ 240 KB)',
    headHeightSpec: '50–69% of frame (25–35 mm)',
    backgroundSpec: 'Pure off-white or white, zero shadows',
    glassesRule: 'Eyeglasses strictly prohibited (medical exceptions require signed doctor note)',
    recencyRule: 'Taken within last 6 months (must differ from prior US visa photo)',
    studioNote:
      'Bring both the raw digital JPEG on USB/email for DS-160 upload and two printed 2×2 inch copies to the embassy.',
  },
  {
    id: 'canada',
    shortLabel: 'Canada & ANZ',
    title: 'Canada TRV / PR & Australia / NZ Standard',
    countriesSummary: 'Canada Visitor & PR, Australia Subclass 600, New Zealand Visitor',
    dimensionsLabel: '35 × 45 mm (50 × 70 mm PR)',
    aspectRatioLabel: '35×45 / 50×70',
    digitalSpec: '420 × 540 px min (IRCC / ImmiAccount JPEG)',
    headHeightSpec: '31–36 mm chin-to-crown',
    backgroundSpec: 'Plain white background, uniform front lighting',
    glassesRule: 'Remove glasses to avoid frame obstruction or glare rejection',
    recencyRule: 'Taken within last 6 months',
    studioNote:
      'For paper Canadian PR submissions (50 × 70 mm), the studio must stamp its name, address, and capture date on the back of one print.',
  },
  {
    id: 'japan-asia',
    shortLabel: 'Japan & Asia',
    title: 'Japan, South Korea & Asian Mission Standard',
    countriesSummary: 'Japan (45 × 45 / 35 × 45 mm), South Korea, Thailand, Singapore, Malaysia',
    dimensionsLabel: '45 × 45 mm or 35 × 45 mm',
    aspectRatioLabel: '45×45 / 35×45',
    digitalSpec: '400 × 514 px min (clean white backdrop for e-Visas)',
    headHeightSpec: '65–75% of frame (centered)',
    backgroundSpec: 'Pure white matte background (never blue passport backdrop)',
    glassesRule: 'No glasses or coloured contact lenses',
    recencyRule: 'Taken within last 6 months',
    studioNote:
      'Many Pakistani studios default to blue backgrounds for CNIC—explicitly request a pure white background for all international visa filings.',
  },
];

export const VISA_PHOTO_EXAMPLES: VisaPhotoExample[] = [
  {
    id: 'correct-centered',
    specimen: 'approved-standard',
    isCorrect: true,
    plateCode: 'PLATE A1',
    title: 'Centered, Neutral & Evenly Lit',
    verdictLabel: 'Approved Standard',
    ruleSummary: 'Plain white background · 70–80% head ratio',
    detailNote:
      'Face straight toward the camera with both eyes open, relaxed closed mouth, natural skin tone, and clear upper shoulders.',
  },
  {
    id: 'correct-headwear',
    specimen: 'approved-headwear',
    isCorrect: true,
    plateCode: 'PLATE A2',
    title: 'Religious Headwear Permitted',
    verdictLabel: 'Approved Standard',
    ruleSummary: 'Full face visible · Zero cast shadows',
    detailNote:
      'Hijab or daily religious headwear is accepted when the entire face from forehead hairline to chin and both cheek edges stay clearly unobstructed.',
  },
  {
    id: 'incorrect-glasses',
    specimen: 'rejected-glasses',
    isCorrect: false,
    plateCode: 'PLATE R1',
    title: 'Eyeglasses Glare or Heavy Frames',
    verdictLabel: 'Common Rejection',
    ruleSummary: 'Lens reflections · Obscured eyes',
    detailNote:
      'USA strictly bans eyeglasses, and Schengen/UK biometric scanners frequently reject frames that cast shadows or reflect studio flash across pupils.',
  },
  {
    id: 'incorrect-shadow-bg',
    specimen: 'rejected-shadow-bg',
    isCorrect: false,
    plateCode: 'PLATE R2',
    title: 'Blue Backdrop or Harsh Shadows',
    verdictLabel: 'Common Rejection',
    ruleSummary: 'Coloured/textured backdrop · Side shadow',
    detailNote:
      'Local blue CNIC backdrops, visible wallpaper, or uneven side lighting behind the ears trigger automatic VFS/BLS and e-Visa portal rejection.',
  },
  {
    id: 'incorrect-cropped',
    specimen: 'rejected-cropped',
    isCorrect: false,
    plateCode: 'PLATE R3',
    title: 'Cropped Crown or Off-Center Head',
    verdictLabel: 'Common Rejection',
    ruleSummary: 'Zoomed too close · Head clipped',
    detailNote:
      'Allow clear white space above the hair and keep the nose aligned to the vertical centerline so biometric landmarks calibrate accurately.',
  },
  {
    id: 'incorrect-expression',
    specimen: 'rejected-expression',
    isCorrect: false,
    plateCode: 'PLATE R4',
    title: 'Wide Smile, Tilted Head or Filters',
    verdictLabel: 'Common Rejection',
    ruleSummary: 'Open mouth · Head tilt · Retouching',
    detailNote:
      'Teeth-showing smiles, tilted posture, phone beauty filters, or re-photographing an old paper print cause facial-recognition mismatches.',
  },
];

export function getPhotoStandardById(id: PhotoStandardId): VisaPhotoStandard {
  return VISA_PHOTO_STANDARDS.find((s) => s.id === id) ?? VISA_PHOTO_STANDARDS[0];
}

export function filterPhotoExamples(
  examples: VisaPhotoExample[],
  filter: PhotoExampleFilter,
): VisaPhotoExample[] {
  if (filter === 'correct') {
    return examples.filter((item) => item.isCorrect);
  }
  if (filter === 'incorrect') {
    return examples.filter((item) => !item.isCorrect);
  }
  return examples;
}

export function formatPhotoStudioSpecText(standard: VisaPhotoStandard): string {
  return [
    `VISAHOUSE — STUDIO PHOTO SPECIFICATION (${standard.shortLabel})`,
    `Applies To: ${standard.countriesSummary}`,
    `Print Dimensions: ${standard.dimensionsLabel}`,
    `Digital File Spec: ${standard.digitalSpec}`,
    `Head Height Ratio: ${standard.headHeightSpec}`,
    `Background & Finish: ${standard.backgroundSpec}`,
    `Eyeglasses Policy: ${standard.glassesRule}`,
    `Recency: ${standard.recencyRule}`,
    `Studio Tip: ${standard.studioNote}`,
    `Note: ${SITE_CONFIG.disclaimer}`,
  ].join('\n');
}
