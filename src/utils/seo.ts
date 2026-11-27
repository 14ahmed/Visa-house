import { SITE_CONFIG } from '../config/site';
import { CONSULTANCY_FEE_RANGE_PKR } from '../data/consultancyFees';
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

export const ORG_ID = `${SITE_CONFIG.siteUrl}/#organization`;
export const WEBSITE_ID = `${SITE_CONFIG.siteUrl}/#website`;
export const LOGO_ID = `${SITE_CONFIG.siteUrl}/#logo`;
export const PRIMARY_IMAGE_ID = `${SITE_CONFIG.siteUrl}/#primaryimage`;
export const PARENT_ORG_ID = `${SITE_CONFIG.parentBrandUrl}/#organization`;
export const OG_IMAGE_URL = `${SITE_CONFIG.siteUrl}/og-image.jpg`;
export const LOGO_IMAGE_URL = `${SITE_CONFIG.siteUrl}/logo.png`;

const REVIEWED_BY_NODE = {
  '@type': 'Organization',
  '@id': PARENT_ORG_ID,
  name: 'AMG Visa Desk',
  url: SITE_CONFIG.parentBrandUrl,
} as const;

export function buildCanonicalUrl(path: string): string {
  if (path === '/') return `${SITE_CONFIG.siteUrl}/`;
  const cleanPath = path.replace(/\/+$/, '');
  return `${SITE_CONFIG.siteUrl}${cleanPath}`;
}

export function buildOrganizationNode(): Record<string, unknown> {
  return {
    '@type': ['Organization', 'OnlineBusiness'],
    '@id': ORG_ID,
    name: SITE_CONFIG.brandName,
    alternateName: ['AMG Visa', 'Visahouse Pakistan'],
    description: `${SITE_CONFIG.tagline} Online visa guidance, Schengen appointment help, and travel insurance for ${SITE_CONFIG.passportAdjective} passport holders.`,
    url: `${SITE_CONFIG.siteUrl}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: LOGO_IMAGE_URL,
      contentUrl: LOGO_IMAGE_URL,
      width: 512,
      height: 512,
      caption: SITE_CONFIG.brandName,
    },
    image: {
      '@type': 'ImageObject',
      '@id': PRIMARY_IMAGE_ID,
      url: OG_IMAGE_URL,
      contentUrl: OG_IMAGE_URL,
      width: 1200,
      height: 630,
      caption: `${SITE_CONFIG.brandName} Pakistan Visa Desk`,
    },
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.whatsappDisplay,
    sameAs: [SITE_CONFIG.parentBrandUrl, `https://wa.me/${SITE_CONFIG.whatsappNumber}`],
    areaServed: {
      '@type': 'Country',
      name: SITE_CONFIG.passportAudience,
    },
    knowsAbout: [
      'Pakistan Visa Consultancy',
      'Schengen Visa Appointments',
      'UK Standard Visitor Visa',
      'Canada Visitor Visa',
      'USA B1/B2 Visa',
      'Australia Visitor Visa',
      'Travel Medical Insurance',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'https://schema.org/Monday',
          'https://schema.org/Tuesday',
          'https://schema.org/Wednesday',
          'https://schema.org/Thursday',
          'https://schema.org/Friday',
          'https://schema.org/Saturday',
        ],
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
        url: buildCanonicalUrl('/contact'),
      },
    ],
    parentOrganization: {
      '@type': 'Organization',
      '@id': PARENT_ORG_ID,
      name: 'AMG',
      url: SITE_CONFIG.parentBrandUrl,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${SITE_CONFIG.brandName} ${SITE_CONFIG.passportAudience} Visa & Travel Documentation Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Online Visa Filing & Dossier Audit from ${SITE_CONFIG.passportAudience}`,
            url: buildCanonicalUrl('/visas'),
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: SITE_CONFIG.currency,
            minPrice: CONSULTANCY_FEE_RANGE_PKR.min,
            maxPrice: CONSULTANCY_FEE_RANGE_PKR.max,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Schengen Visa Appointment & Dossier Guidance from ${SITE_CONFIG.passportAudience}`,
            url: buildCanonicalUrl('/schengen-appointments'),
          },
          priceCurrency: SITE_CONFIG.currency,
          price: 30000,
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `Schengen €30,000 & Worldwide Travel Medical Insurance from ${SITE_CONFIG.passportAudience}`,
            url: buildCanonicalUrl('/travel-insurance'),
          },
        },
      ],
    },
  };
}

export function buildWebSiteNode(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_CONFIG.brandName,
    alternateName: ['Visahouse Pakistan', 'AMG Visa'],
    url: `${SITE_CONFIG.siteUrl}/`,
    description: SITE_CONFIG.tagline,
    inLanguage: ['en-PK', 'ur-PK'],
    publisher: {
      '@id': ORG_ID,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  const lastPath = items[items.length - 1]?.path ?? '/';
  const canonical = buildCanonicalUrl(lastPath);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildWebPageSchema(params: {
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
  name: string;
  description: string;
  path: string;
  dateModified?: string;
  speakableSelectors?: string[];
  mainEntityId?: string;
  aboutId?: string;
  hasBreadcrumb?: boolean;
}): Record<string, unknown> {
  const canonical = buildCanonicalUrl(params.path);
  const modified = params.dateModified ?? SITE_CONFIG.guideReviewDateIso;
  const node: Record<string, unknown> = {
    '@type': params.type ?? 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: params.name,
    description: params.description,
    inLanguage: 'en-PK',
    dateModified: modified,
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    publisher: {
      '@id': ORG_ID,
    },
    author: {
      '@id': ORG_ID,
    },
    reviewedBy: REVIEWED_BY_NODE,
    primaryImageOfPage: {
      '@id': PRIMARY_IMAGE_ID,
    },
  };

  if (params.hasBreadcrumb) {
    node.breadcrumb = { '@id': `${canonical}#breadcrumb` };
  }
  if (params.mainEntityId) {
    node.mainEntity = { '@id': params.mainEntityId };
  }
  if (params.aboutId) {
    node.about = { '@id': params.aboutId };
  }
  if (params.speakableSelectors && params.speakableSelectors.length > 0) {
    node.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: params.speakableSelectors,
    };
  }

  return node;
}

export function buildHomeSchemas(): Record<string, unknown>[] {
  return [
    buildWebPageSchema({
      name: 'Visahouse — Every Visa Under One Roof | Pakistan',
      description:
        'Online-first visa filing, Schengen appointment guidance, and travel insurance for Pakistani passport holders. Every visa under one roof.',
      path: '/',
      aboutId: ORG_ID,
      speakableSelectors: ['h1'],
    }),
  ];
}

export function buildItemListSchema(
  name: string,
  items: { name: string; path: string }[],
  path = '/visas',
): Record<string, unknown> {
  const canonical = buildCanonicalUrl(path);
  return {
    '@type': 'ItemList',
    '@id': `${canonical}#itemlist`,
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
  pricePkr?: number;
  lowPricePkr?: number;
  highPricePkr?: number;
  offerCount?: number;
  offerDescription?: string;
}): Record<string, unknown> {
  const canonical = buildCanonicalUrl(params.path);
  const node: Record<string, unknown> = {
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: params.name,
    serviceType: params.serviceType,
    description: params.description,
    url: canonical,
    provider: {
      '@id': ORG_ID,
    },
    areaServed: {
      '@type': 'Country',
      name: SITE_CONFIG.passportAudience,
    },
    audience: {
      '@type': 'Audience',
      audienceType: `${SITE_CONFIG.passportAdjective} passport holders`,
    },
  };

  if (typeof params.pricePkr === 'number') {
    node.offers = {
      '@type': 'Offer',
      priceCurrency: SITE_CONFIG.currency,
      price: params.pricePkr,
      availability: 'https://schema.org/InStock',
      url: canonical,
      ...(params.offerDescription ? { description: params.offerDescription } : {}),
    };
  } else if (typeof params.lowPricePkr === 'number' && typeof params.highPricePkr === 'number') {
    node.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: SITE_CONFIG.currency,
      lowPrice: params.lowPricePkr,
      highPrice: params.highPricePkr,
      ...(typeof params.offerCount === 'number' ? { offerCount: params.offerCount } : {}),
      url: canonical,
      ...(params.offerDescription ? { description: params.offerDescription } : {}),
    };
  }

  return node;
}

export function buildGuideWebPageSchema(params: {
  name: string;
  description: string;
  path: string;
  dateModified?: string;
}): Record<string, unknown> {
  const canonical = buildCanonicalUrl(params.path);
  return buildWebPageSchema({
    name: params.name,
    description: params.description,
    path: params.path,
    dateModified: params.dateModified,
    speakableSelectors: ['#quick-answer-heading', '[data-aeo-answer="true"]'],
    mainEntityId: `${canonical}#service`,
    hasBreadcrumb: true,
  });
}

export function buildHowToSchema(params: {
  name: string;
  description: string;
  path?: string;
  steps: { title: string; youDo?: string; weDo?: string; detail?: string }[];
}): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@type': 'HowTo',
    name: params.name,
    description: params.description,
    step: params.steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.title,
      text: (step.detail ?? `${step.youDo ?? ''} ${step.weDo ?? ''}`).trim(),
    })),
  };

  if (params.path) {
    node['@id'] = `${buildCanonicalUrl(params.path)}#howto`;
  }

  return node;
}

export function buildFaqSchema(faqs: FaqItem[], path?: string): Record<string, unknown> {
  const node: Record<string, unknown> = {
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

  if (path) {
    const canonical = buildCanonicalUrl(path);
    node['@id'] = `${canonical}#faq`;
    node.isPartOf = { '@id': `${canonical}#webpage` };
  }

  return node;
}

export function buildPageGraph(spec: PageSeoSpec): Record<string, unknown> | null {
  if (spec.noindex) return null;

  const rawNodes: Record<string, unknown>[] = [buildOrganizationNode(), buildWebSiteNode()];

  if (spec.breadcrumbs && spec.breadcrumbs.length > 0) {
    rawNodes.push(buildBreadcrumbSchema(spec.breadcrumbs));
  }
  if (spec.schemas && spec.schemas.length > 0) {
    rawNodes.push(...spec.schemas);
  }

  const seenIds = new Set<string>();
  const graphNodes: Record<string, unknown>[] = [];

  for (const rawNode of rawNodes) {
    const { '@context': _ignoredContext, ...cleanNode } = rawNode;
    const nodeId = typeof cleanNode['@id'] === 'string' ? cleanNode['@id'] : null;
    if (nodeId) {
      if (seenIds.has(nodeId)) continue;
      seenIds.add(nodeId);
    }
    graphNodes.push(cleanNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
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
  const lines: string[] = [
    `<title>${escapeAttr(spec.title)}</title>`,
    `<meta name="description" content="${escapeAttr(spec.description)}" />`,
  ];

  if (spec.noindex) {
    lines.push(`<meta name="robots" content="noindex, follow" />`);
    return lines.join('\n    ');
  }

  const canonical = buildCanonicalUrl(spec.path);
  const ogImageAlt = `${SITE_CONFIG.brandName} Pakistan Visa Desk — ${spec.title}`;

  lines.push(
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_PK" />`,
    `<meta property="og:locale:alternate" content="ur_PK" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_CONFIG.brandName)}" />`,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(spec.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(spec.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(OG_IMAGE_URL)}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(spec.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(spec.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(OG_IMAGE_URL)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(ogImageAlt)}" />`,
  );

  const graph = buildPageGraph(spec);
  if (graph) {
    const safeJson = JSON.stringify(graph).replace(/</g, '\\u003c');
    lines.push(`<script type="application/ld+json" data-visahouse-ld="true">${safeJson}</script>`);
  }

  return lines.join('\n    ');
}
