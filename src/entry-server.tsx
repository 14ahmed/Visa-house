import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { SsrRoutes } from './SsrRoutes';
import { SsrHeadContext, type SsrHeadCollector } from './components/SeoHead';
import { LanguageProvider } from './context/LanguageContext';
import { renderSeoTagsToHtml } from './utils/seo';

export function renderRoute(url: string): { html: string; headTags: string } {
  const collector: SsrHeadCollector = { spec: null };

  const html = renderToString(
    <LanguageProvider initialLocale="en">
      <SsrHeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <SsrRoutes />
        </StaticRouter>
      </SsrHeadContext.Provider>
    </LanguageProvider>,
  );

  const headTags = collector.spec ? renderSeoTagsToHtml(collector.spec) : '';
  return { html, headTags };
}
