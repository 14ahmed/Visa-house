import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { EDITORIAL_IMAGES, SITE_CONFIG } from '../src/config/site.ts';
import { DESTINATIONS } from '../src/data/destinations.ts';
import { STATIC_ROUTES } from '../src/data/routes.ts';
import { COUNTRY_ARTWORK_META } from '../src/utils/countryArtwork.ts';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const ssrEntryPath = path.resolve(rootDir, 'dist-ssr/entry-server.js');
const publicDir = path.resolve(rootDir, 'public');

function isPreviewOrNoIndexBuild(): boolean {
  if (process.env.NOINDEX === 'true') return true;
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') return true;
  if (process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy') return true;
  if (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main') return true;
  return false;
}

async function prerender() {
  const isPreview = isPreviewOrNoIndexBuild();
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run `vite build` first.');
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const { renderRoute } = (await import(pathToFileURL(ssrEntryPath).href)) as {
    renderRoute: (url: string) => { html: string; headTags: string };
  };

  const routesToRender = [
    ...STATIC_ROUTES.map((r) => r.path),
    '/404',
  ];

  for (const routePath of routesToRender) {
    const { html, headTags } = renderRoute(routePath);

    let finalHeadTags = headTags;
    if (isPreview) {
      finalHeadTags = finalHeadTags.includes('name="robots"')
        ? finalHeadTags.replace(
            /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
            '<meta name="robots" content="noindex, nofollow" />',
          )
        : `${finalHeadTags}\n    <meta name="robots" content="noindex, nofollow" />`;
    }

    let pageHtml = template.replace('<!--app-html-->', html);
    if (finalHeadTags) {
      pageHtml = pageHtml.replace(
        /<!--app-head-->[\s\S]*?<!--\/app-head-->/,
        `<!--app-head-->\n    ${finalHeadTags}\n    <!--/app-head-->`,
      );
    }

    let outFile: string;
    if (routePath === '/') {
      outFile = path.resolve(distDir, 'index.html');
    } else if (routePath === '/404') {
      outFile = path.resolve(distDir, '404.html');
    } else {
      const cleanRel = routePath.replace(/^\/+/, '');
      const dir = path.resolve(distDir, cleanRel);
      fs.mkdirSync(dir, { recursive: true });
      outFile = path.resolve(dir, 'index.html');
    }

    fs.writeFileSync(outFile, pageHtml, 'utf-8');
  }

  // Generate sitemap.xml and robots.txt into both dist/ and public/
  const lastmod = SITE_CONFIG.guideReviewDateIso;
  const destBySlug = new Map(DESTINATIONS.map((d) => [d.slug, d]));

  const sitemapEntries = STATIC_ROUTES.map((route) => {
    const loc =
      route.path === '/'
        ? `${SITE_CONFIG.siteUrl}/`
        : `${SITE_CONFIG.siteUrl}${route.path}`;

    const images: { loc: string; title: string }[] = [];
    if (route.path === '/') {
      images.push(
        {
          loc: `${SITE_CONFIG.siteUrl}/og-image.avif`,
          title: `${SITE_CONFIG.brandName} Pakistan Visa Desk`,
        },
        {
          loc: `${SITE_CONFIG.siteUrl}${EDITORIAL_IMAGES.desk.src}`,
          title: EDITORIAL_IMAGES.desk.alt,
        },
      );
    } else if (route.path.startsWith('/visas/')) {
      const slug = route.path.slice('/visas/'.length);
      const dest = destBySlug.get(slug);
      const art = dest ? COUNTRY_ARTWORK_META[dest.isoCode] : undefined;
      if (dest && art) {
        images.push({
          loc: `${SITE_CONFIG.siteUrl}${art.imageSrc}`,
          title: `${dest.country} Visa from Pakistan - ${art.motif}`,
        });
      }
    } else if (route.path === '/schengen-appointments' && COUNTRY_ARTWORK_META.SCH) {
      images.push({
        loc: `${SITE_CONFIG.siteUrl}${COUNTRY_ARTWORK_META.SCH.imageSrc}`,
        title: `Schengen Visa Appointments from Pakistan - ${COUNTRY_ARTWORK_META.SCH.motif}`,
      });
    } else if (route.path === '/travel-insurance' && COUNTRY_ARTWORK_META.INS) {
      images.push({
        loc: `${SITE_CONFIG.siteUrl}${COUNTRY_ARTWORK_META.INS.imageSrc}`,
        title: `Schengen & Worldwide Travel Insurance from Pakistan - ${COUNTRY_ARTWORK_META.INS.motif}`,
      });
    }

    const imageNodes = images
      .map(
        (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`,
      )
      .join('\n');

    return [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
      `    <changefreq>${escapeXml(route.changefreq)}</changefreq>`,
      `    <priority>${escapeXml(route.priority)}</priority>`,
      ...(imageNodes ? [imageNodes] : []),
      '  </url>',
    ].join('\n');
  }).join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries}
</urlset>
`;

  const robotsTxt = isPreview
    ? [
        `# ${SITE_CONFIG.brandName} (${SITE_CONFIG.domain}) - Preview / Staging Environment`,
        '# Search engine indexing is disabled for non-production builds.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n')
    : [
        `# ${SITE_CONFIG.brandName} (${SITE_CONFIG.siteUrl}) - A project by AMG (${SITE_CONFIG.parentBrandUrl})`,
        `# Technical SEO, AEO & GEO robots.txt (RFC 9309 compliant)`,
        `# AI Knowledge Base: ${SITE_CONFIG.siteUrl}/llms.txt`,
        `# Full Structured Guide: ${SITE_CONFIG.siteUrl}/llms-full.txt`,
        '',
        '# Primary Search Engines',
        'User-agent: Googlebot',
        'User-agent: Googlebot-Image',
        'User-agent: Bingbot',
        'User-agent: Applebot',
        'User-agent: DuckDuckBot',
        'Allow: /',
        'Allow: /assets/',
        'Disallow: /404',
        'Disallow: /404.html',
        'Disallow: /*?utm_*',
        'Disallow: /*?fbclid=*',
        'Disallow: /*?gclid=*',
        '',
        '# AI Search, Answer Engines & Citation Crawlers (AEO / GEO)',
        'User-agent: OAI-SearchBot',
        'User-agent: ChatGPT-User',
        'User-agent: GPTBot',
        'User-agent: Google-Extended',
        'User-agent: PerplexityBot',
        'User-agent: Perplexity-User',
        'User-agent: ClaudeBot',
        'User-agent: Claude-SearchBot',
        'User-agent: Claude-User',
        'User-agent: Applebot-Extended',
        'User-agent: Amazonbot',
        'Allow: /',
        'Allow: /llms.txt',
        'Allow: /llms-full.txt',
        'Disallow: /404',
        'Disallow: /404.html',
        'Disallow: /*?utm_*',
        'Disallow: /*?fbclid=*',
        'Disallow: /*?gclid=*',
        '',
        '# All Other Compliant Crawlers',
        'User-agent: *',
        'Allow: /',
        'Allow: /assets/',
        'Disallow: /404',
        'Disallow: /404.html',
        'Disallow: /*?utm_*',
        'Disallow: /*?fbclid=*',
        'Disallow: /*?gclid=*',
        '',
        '# XML Sitemap',
        `Sitemap: ${SITE_CONFIG.siteUrl}/sitemap.xml`,
        '',
      ].join('\n');

  const llmsTxt = [
    `# ${SITE_CONFIG.brandName}`,
    '',
    `> ${SITE_CONFIG.tagline} Online visa guidance, document checklists, Schengen appointment help, and travel insurance for ${SITE_CONFIG.passportAdjective} passport holders. Operated by AMG (${SITE_CONFIG.parentBrandUrl}).`,
    '',
    `- Brand & Alternate Names: ${SITE_CONFIG.brandName}, AMG Visa, Visahouse Pakistan`,
    `- Website: ${SITE_CONFIG.siteUrl}`,
    `- Full Structured Knowledge Base: ${SITE_CONFIG.siteUrl}/llms-full.txt`,
    `- WhatsApp / Phone: ${SITE_CONFIG.whatsappDisplay}`,
    `- Email: ${SITE_CONFIG.email}`,
    `- Office Hours: ${SITE_CONFIG.officeHours}`,
    `- Disclaimer: ${SITE_CONFIG.disclaimer}`,
    '',
    '## Core Pages',
    `- [Home](${SITE_CONFIG.siteUrl}/): Overview, document checklist builder, visa cost calculator, photo guide, and visa status tracker`,
    `- [All Visa Guides](${SITE_CONFIG.siteUrl}/visas): Directory of ${DESTINATIONS.length} country visa guides from Pakistan`,
    `- [Schengen Appointments](${SITE_CONFIG.siteUrl}/schengen-appointments): Official VFS Global & BLS International guidance from Islamabad, Lahore, and Karachi`,
    `- [Travel Insurance](${SITE_CONFIG.siteUrl}/travel-insurance): Schengen-accepted (€30,000+ medical) and worldwide travel insurance plans`,
    `- [About Visahouse](${SITE_CONFIG.siteUrl}/about): How our online visa desk works`,
    `- [Contact](${SITE_CONFIG.siteUrl}/contact): WhatsApp and email inquiry desk`,
    '',
    `## Country Visa Guides from Pakistan (${DESTINATIONS.length})`,
    ...DESTINATIONS.map(
      (d) =>
        `- [${d.country} Visa from Pakistan](${SITE_CONFIG.siteUrl}/visas/${d.slug}): ${d.region} · ${d.channel} · ${d.facts.processingTime}`,
    ),
    '',
  ].join('\n');

  const llmsFullTxt = [
    `# ${SITE_CONFIG.brandName} (AMG Visa) — Full Pakistan Visa Knowledge Base`,
    '',
    `> Last updated: ${lastmod}. Source: ${SITE_CONFIG.siteUrl}. ${SITE_CONFIG.disclaimer}`,
    '',
    `- Contact WhatsApp / Phone: ${SITE_CONFIG.whatsappDisplay}`,
    `- Contact Email: ${SITE_CONFIG.email}`,
    `- Working Hours: ${SITE_CONFIG.officeHours}`,
    '',
    `## All ${DESTINATIONS.length} Country Visa Summaries (Pakistani Passport Holders)`,
    '',
    ...DESTINATIONS.flatMap((d) => {
      const topDocs = d.checklist
        .flatMap((g) => g.items)
        .slice(0, 5)
        .map((item) => item.label)
        .join('; ');
      return [
        `### ${d.country} Visa from Pakistan`,
        `- URL: ${SITE_CONFIG.siteUrl}/visas/${d.slug}`,
        `- Region: ${d.region} | Channel: ${d.channel} | Visa Type: ${d.facts.visaType} (${d.facts.entryType})`,
        `- Typical Processing: ${d.facts.processingTime} | Stay: ${d.facts.stayDuration} | Validity: ${d.facts.validity}`,
        `- Summary: ${d.heroPromise}`,
        `- Core Documents: ${topDocs}`,
        '',
      ];
    }),
  ].join('\n');

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.resolve(distDir, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.resolve(distDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  if (!isPreview) {
    fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
    fs.writeFileSync(path.resolve(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
    fs.writeFileSync(path.resolve(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  }

  // Remove temporary SSR bundle directory
  fs.rmSync(path.resolve(rootDir, 'dist-ssr'), { recursive: true, force: true });

  console.log(
    `Prerendered ${routesToRender.length} static routes + sitemap.xml + robots.txt + llms.txt + llms-full.txt${
      isPreview ? ' (PREVIEW NOINDEX MODE)' : ''
    }`,
  );
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
