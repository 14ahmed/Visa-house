import { createContext, useContext, useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';
import {
  buildBreadcrumbSchema,
  buildCanonicalUrl,
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

/**
 * Updates per-route <title>, meta description, canonical URL, OpenGraph, Twitter,
 * and Schema.org JSON-LD scripts on the client, and records them during static SSR prerendering.
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
    const canonical = buildCanonicalUrl(spec.path);
    const ogImageUrl = `${SITE_CONFIG.siteUrl}/og-image.avif`;
    const ogImageAlt = `${SITE_CONFIG.brandName} Pakistan Visa Desk — ${spec.title}`;

    upsertMeta('name', 'description', spec.description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'en_PK');
    upsertMeta('property', 'og:site_name', SITE_CONFIG.brandName);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:title', spec.title);
    upsertMeta('property', 'og:description', spec.description);
    upsertMeta('property', 'og:image', ogImageUrl);
    upsertMeta('property', 'og:image:type', 'image/avif');
    upsertMeta('property', 'og:image:alt', ogImageAlt);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', spec.title);
    upsertMeta('name', 'twitter:description', spec.description);
    upsertMeta('name', 'twitter:image', ogImageUrl);
    upsertMeta('name', 'twitter:image:alt', ogImageAlt);

    if (spec.noindex) {
      upsertMeta('name', 'robots', 'noindex, follow');
    } else {
      const existingRobots = document.head.querySelector('meta[name="robots"]');
      if (existingRobots) existingRobots.remove();
    }

    let linkCanonical = document.head.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);

    // Replace previous route-injected JSON-LD tags
    document.head
      .querySelectorAll('script[data-visahouse-ld="true"]')
      .forEach((node) => node.remove());

    const allSchemas: Record<string, unknown>[] = [];
    if (spec.breadcrumbs && spec.breadcrumbs.length > 0) {
      allSchemas.push(buildBreadcrumbSchema(spec.breadcrumbs));
    }
    if (spec.schemas && spec.schemas.length > 0) {
      allSchemas.push(...spec.schemas);
    }

    for (const schema of allSchemas) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-visahouse-ld', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [spec.title, spec.description, spec.path, spec.noindex, schemasKey]);

  return null;
}
