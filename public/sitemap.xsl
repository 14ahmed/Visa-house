<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <xsl:output method="html" version="5.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Visahouse XML Sitemap — visahouse.online</title>
        <style>
          :root {
            --paper: #F5F0E3;
            --slip: #FAF6EC;
            --ink: #1C1B19;
            --muted: #5A554B;
            --green: #0F5C4B;
            --rule: rgba(28, 27, 25, 0.16);
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 2rem 1rem 3rem;
            background: var(--paper);
            color: var(--ink);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.5;
          }
          .wrap { max-width: 1080px; margin: 0 auto; }
          .card {
            background: var(--slip);
            border: 1px solid var(--ink);
            border-radius: 3px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .eyebrow {
            display: inline-block;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 0.72rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--green);
            margin-bottom: 0.5rem;
          }
          h1 {
            margin: 0 0 0.5rem;
            font-family: Georgia, "Times New Roman", serif;
            font-size: 1.85rem;
            font-weight: 600;
          }
          .meta {
            margin: 0;
            color: var(--muted);
            font-size: 0.92rem;
          }
          .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--rule);
            font-size: 0.88rem;
          }
          .stat strong { color: var(--green); }
          .back-link {
            color: var(--green);
            font-weight: 600;
            text-decoration: none;
          }
          .back-link:hover { text-decoration: underline; }
          .table-wrap {
            background: var(--slip);
            border: 1px solid var(--ink);
            border-radius: 3px;
            overflow-x: auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.88rem;
          }
          th, td {
            padding: 0.65rem 0.85rem;
            text-align: left;
            border-bottom: 1px solid var(--rule);
          }
          th {
            background: #EFE9D8;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 0.72rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--muted);
          }
          tr:hover td { background: rgba(15, 92, 75, 0.04); }
          a.url {
            color: var(--green);
            text-decoration: none;
            word-break: break-all;
          }
          a.url:hover { text-decoration: underline; }
          .mono {
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 0.82rem;
            white-space: nowrap;
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="card">
            <span class="eyebrow">XML Sitemap &amp; Google Image Index</span>
            <h1>Visahouse XML Sitemap</h1>
            <p class="meta">
              Structured search engine and AI crawler index for
              <a class="back-link" href="https://visahouse.online/">visahouse.online</a>
              (A project by AMG).
            </p>
            <div class="stats">
              <span class="stat">Total URLs: <strong><xsl:value-of select="count(sm:urlset/sm:url)" /></strong></span>
              <span class="stat">Indexed Images: <strong><xsl:value-of select="count(sm:urlset/sm:url/image:image)" /></strong></span>
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  <th>Images</th>
                  <th>Priority</th>
                  <th>Change Freq</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sm:urlset/sm:url">
                  <tr>
                    <td class="mono"><xsl:value-of select="position()" /></td>
                    <td>
                      <a class="url" href="{sm:loc}">
                        <xsl:value-of select="sm:loc" />
                      </a>
                    </td>
                    <td class="mono"><xsl:value-of select="count(image:image)" /></td>
                    <td class="mono"><xsl:value-of select="sm:priority" /></td>
                    <td class="mono"><xsl:value-of select="sm:changefreq" /></td>
                    <td class="mono"><xsl:value-of select="sm:lastmod" /></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
