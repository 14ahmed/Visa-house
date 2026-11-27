import { createContext, useContext, useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';
import {
  buildCanonicalUrl,
  buildPageGraph,
  OG_IMAGE_URL,
  type PageSeoSpec,
} from '../utils/seo';

export interface SsrHeadCollector {
  spec: PageSeoSpec | null;
}

export const SsrHeadContext = createContext<SsrHeadCollector | null>(null);

function upsertMeta(attrName: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attrName: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attrName}="${key}"]`)?.remove();
}

const SOCIAL_META_KEYS: { attr: 'name' | 'property'; key: string }[] = [
  { attr: 'property', key: 'og:type' },
  { attr: 'property', key: 'og:locale' },
  { attr: 'property', key: 'og:locale:alternate' },
  { attr: 'property', key: 'og:site_name' },
  { attr: 'property', key: 'og:url' },
  { attr: 'property', key: 'og:title' },
  { attr: 'property', key: 'og:description' },
  { attr: 'property', key: 'og:image' },
  { attr: 'property', key: 'og:image:type' },
  { attr: 'property', key: 'og:image:width' },
  { attr: 'property', key: 'og:image:height' },
  { attr: 'property', key: 'og:image:alt' },
  { attr: 'name', key: 'twitter:card' },
  { attr: 'name', key: 'twitter:title' },
  { attr: 'name', key: 'twitter:description' },
  { attr: 'name', key: 'twitter:image' },
  { attr: 'name', key: 'twitter:image:alt' },
];

/**
 * Updates per-route <title>, meta description, canonical URL, OpenGraph, Twitter,
 * and unified Schema.org JSON-LD @graph script on the client, and records them during SSR.
 */
export function SeoHead(spec: PageSeoSpec) {
  const ssrCollector = useContext(SsrHeadContext);
  if (ssrCollector) {
    ssrCollector.spec = spec;
  }

  const schemasKey = JSON.stringify({
    b: spec.breadcrumbs ?? [],
    s: spec.schemas ?? [],
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = spec.title;
    upsertMeta('name', 'description', spec.description);

    // Clear all previous JSON-LD scripts (including SSR-rendered ones) to prevent duplicates
    document.head
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((node) => node.remove());

    if (spec.noindex) {
      upsertMeta('name', 'robots', 'noindex, follow');
      document.head.querySelector('link[rel="canonical"]')?.remove();
      for (const { attr, key } of SOCIAL_META_KEYS) {
        removeMeta(attr, key);
      }
      return;
    }

    removeMeta('name', 'robots');

    const canonical = buildCanonicalUrl(spec.path);
    const ogImageAlt = `${SITE_CONFIG.brandName} Pakistan Visa Desk — ${spec.title}`;

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'en_PK');
    upsertMeta('property', 'og:locale:alternate', 'ur_PK');
    upsertMeta('property', 'og:site_name', SITE_CONFIG.brandName);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:title', spec.title);
    upsertMeta('property', 'og:description', spec.description);
    upsertMeta('property', 'og:image', OG_IMAGE_URL);
    upsertMeta('property', 'og:image:type', 'image/jpeg');
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', ogImageAlt);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', spec.title);
    upsertMeta('name', 'twitter:description', spec.description);
    upsertMeta('name', 'twitter:image', OG_IMAGE_URL);
    upsertMeta('name', 'twitter:image:alt', ogImageAlt);

    let linkCanonical = document.head.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    const graph = buildPageGraph(spec);
    if (graph) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-visahouse-ld', 'true');
      script.textContent = JSON.stringify(graph);
      document.head.appendChild(script);
    }
  }, [spec.title, spec.description, spec.path, spec.noindex, schemasKey]);

  return null;
}
