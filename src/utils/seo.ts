import { SITE_CONFIG } from '../config/site';
import type { FaqItem } from '../data/types';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface PageSeoSpec {
  title: string;
  description: string;
  path: string;
  breadcrumbs?: BreadcrumbItem[];
  schemas?: Record<string, unknown>[];
  noindex?: boolean;
}

export function buildCanonicalUrl(path: string): string {
  const cleanPath = path === '/' ? '' : path.replace(/\/+$/, '');
  return `${SITE_CONFIG.siteUrl}${cleanPath}`;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildHomeSchemas(): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: SITE_CONFIG.brandName,
      alternateName: ['AMG Visa', 'Visahouse Pakistan'],
      description: `${SITE_CONFIG.tagline} Online visa guidance, Schengen appointment help, and travel insurance for ${SITE_CONFIG.passportAdjective} passport holders.`,
      url: SITE_CONFIG.siteUrl,
      logo: `${SITE_CONFIG.siteUrl}/favicon.svg`,
      image: `${SITE_CONFIG.siteUrl}/og-image.avif`,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.whatsappDisplay,
      areaServed: {
        '@type': 'Country',
        name: SITE_CONFIG.passportAudience,
      },
      priceRange: SITE_CONFIG.currency,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00',
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: SITE_CONFIG.whatsappDisplay,
          email: SITE_CONFIG.email,
          areaServed: 'PK',
          availableLanguage: ['English', 'Urdu'],
        },
      ],
      parentOrganization: {
        '@type': 'Organization',
        name: 'AMG',
        url: SITE_CONFIG.siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.siteUrl,
      description: SITE_CONFIG.tagline,
      inLanguage: ['en-PK', 'ur-PK'],
    },
  ];
}

export function buildItemListSchema(
  name: string,
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildServiceSchema(params: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    serviceType: params.serviceType,
    description: params.description,
    url: buildCanonicalUrl(params.path),
    provider: {
      '@type': 'TravelAgency',
      name: SITE_CONFIG.brandName,
      alternateName: ['AMG Visa', 'Visahouse Pakistan'],
      url: SITE_CONFIG.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: SITE_CONFIG.passportAudience,
    },
  };
}

export function buildGuideWebPageSchema(params: {
  name: string;
  description: string;
  path: string;
  dateModified?: string;
}): Record<string, unknown> {
  const modified = params.dateModified ?? SITE_CONFIG.guideReviewDateIso;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: params.name,
    description: params.description,
    url: buildCanonicalUrl(params.path),
    inLanguage: 'en-PK',
    dateModified: modified,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#quick-answer-heading', '[data-aeo-answer="true"]'],
    },
    author: {
      '@type': 'Organization',
      name: `${SITE_CONFIG.brandName} Pakistan Visa Desk`,
      url: SITE_CONFIG.siteUrl,
    },
    reviewedBy: {
      '@type': 'Organization',
      name: 'AMG Visa Desk',
      url: SITE_CONFIG.siteUrl,
    },
  };
}

export function buildHowToSchema(params: {
  name: string;
  description: string;
  steps: { title: string; youDo: string; weDo: string }[];
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    step: params.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.title,
      text: `${step.youDo} ${step.weDo}`.trim(),
    })),
  };
}

export function buildFaqSchema(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Serializes PageSeoSpec to HTML head tags for static prerendering.
 */
export function renderSeoTagsToHtml(spec: PageSeoSpec): string {
  const canonical = buildCanonicalUrl(spec.path);
  const ogImageUrl = `${SITE_CONFIG.siteUrl}/og-image.avif`;
  const ogImageAlt = `${SITE_CONFIG.brandName} Pakistan Visa Desk — ${spec.title}`;
  const lines: string[] = [
    `<title>${escapeAttr(spec.title)}</title>`,
    `<meta name="description" content="${escapeAttr(spec.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_PK" />`,
    `<meta property="og:locale:alternate" content="ur_PK" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_CONFIG.brandName)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(spec.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(spec.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(ogImageUrl)}" />`,
    `<meta property="og:image:type" content="image/avif" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(spec.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(spec.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(ogImageUrl)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(ogImageAlt)}" />`,
  ];

  if (spec.noindex) {
    lines.push(`<meta name="robots" content="noindex, follow" />`);
  }

  const allSchemas: Record<string, unknown>[] = [];
  if (spec.breadcrumbs && spec.breadcrumbs.length > 0) {
    allSchemas.push(buildBreadcrumbSchema(spec.breadcrumbs));
  }
  if (spec.schemas && spec.schemas.length > 0) {
    allSchemas.push(...spec.schemas);
  }

  for (const schema of allSchemas) {
    const safeJson = JSON.stringify(schema).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json">${safeJson}</script>`);
  }

  return lines.join('\n    ');
}
