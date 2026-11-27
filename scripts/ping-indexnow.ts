import { SITE_CONFIG } from '../src/config/site.ts';
import { STATIC_ROUTES } from '../src/data/routes.ts';

const INDEXNOW_KEY = 'e4f8a19c2b7d4065a3c9e18f7b2d504a';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function pingIndexNow() {
  const urlList = STATIC_ROUTES.map((route) =>
    route.path === '/'
      ? `${SITE_CONFIG.siteUrl}/`
      : `${SITE_CONFIG.siteUrl}${route.path}`,
  );

  const payload = {
    host: SITE_CONFIG.domain,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_CONFIG.siteUrl}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  console.log(`Submitting ${urlList.length} URLs for ${SITE_CONFIG.domain} to IndexNow...`);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  const body = await response.text();
  console.log(`IndexNow response: HTTP ${response.status} ${response.statusText}`);
  if (body) {
    console.log(body);
  }

  if (!response.ok) {
    process.exitCode = 1;
  }
}

pingIndexNow().catch((err) => {
  console.error('IndexNow submission failed:', err);
  process.exit(1);
});
