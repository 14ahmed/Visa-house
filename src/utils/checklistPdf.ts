import { SITE_CONFIG } from '../config/site';
import type { GeneratedChecklistDocument } from './checklistLibrary';

const PAGE_WIDTH = 595.28; // A4 width in pt
const PAGE_HEIGHT = 841.89; // A4 height in pt
const MARGIN_X = 46;
const MARGIN_TOP = 48;
const MARGIN_BOTTOM = 54;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;

const COLOR_INK = '0.110 0.106 0.098'; // #1C1B19
const COLOR_BODY = '0.173 0.165 0.149'; // #2C2A26
const COLOR_MUTED = '0.349 0.333 0.298'; // #59554C
const COLOR_GREEN = '0.059 0.361 0.294'; // #0F5C4B
const COLOR_RED = '0.725 0.196 0.133'; // #B93222
const COLOR_RULE = '0.812 0.773 0.698'; // #CFC5B2
const COLOR_PANEL_BG = '0.976 0.961 0.925'; // #F9F5EC
const COLOR_NOTICE_BG = '0.957 0.933 0.878'; // #F4EEE0

type PdfFontId = 'F1' | 'F2' | 'F3' | 'F4';
// F1 = Helvetica, F2 = Helvetica-Bold, F3 = Courier, F4 = Courier-Bold

/**
 * Normalizes Unicode punctuation to clean standard PDF WinAnsi / ASCII characters
 * and escapes PDF string delimiters.
 */
export function sanitizePdfText(raw: string): string {
  const normalized = raw
    .replace(/\r\n|\r|\n/g, ' ')
    .replace(/[\u2014\u2015]/g, ' -- ')
    .replace(/[\u2013\u2212]/g, '-')
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/\u00B7|\u2022/g, '|')
    .replace(/\u20AC/g, 'EUR ')
    .replace(/\u00A3/g, 'GBP ')
    .replace(/\u00D7/g, 'x')
    .replace(/\u2192/g, '->')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return normalized
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Word-wraps plain text to fit within maxWidthPt for the chosen PDF font & size.
 */
function wrapTextLines(
  rawText: string,
  maxWidthPt: number,
  fontSize: number,
  font: PdfFontId,
): string[] {
  const clean = rawText
    .replace(/\r\n|\r|\n/g, ' ')
    .replace(/[\u2014\u2015]/g, ' -- ')
    .replace(/[\u2013\u2212]/g, '-')
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/\u00B7|\u2022/g, '|')
    .replace(/\u20AC/g, 'EUR ')
    .replace(/\u00A3/g, 'GBP ')
    .replace(/\u00D7/g, 'x')
    .replace(/\u2192/g, '->')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) return [];

  // Conservative average character width factors for Helvetica / Courier
  const charFactor = font === 'F3' || font === 'F4' ? 0.61 : font === 'F2' ? 0.56 : 0.52;
  const maxChars = Math.max(18, Math.floor(maxWidthPt / (fontSize * charFactor)));

  const words = clean.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) {
        lines.push(current);
      }
      if (word.length > maxChars) {
        let rest = word;
        while (rest.length > maxChars) {
          lines.push(rest.slice(0, maxChars));
          rest = rest.slice(maxChars);
        }
        current = rest;
      } else {
        current = word;
      }
    }
  }
  if (current) {
    lines.push(current);
  }
  return lines;
}

class PdfPageBuilder {
  private pages: string[][] = [[]];
  private y = PAGE_HEIGHT - MARGIN_TOP;
  private readonly runningTitle: string;

  constructor(runningTitle: string) {
    this.runningTitle = runningTitle;
  }

  get cursorY(): number {
    return this.y;
  }

  private currentOps(): string[] {
    return this.pages[this.pages.length - 1];
  }

  advance(deltaPt: number): void {
    this.y -= deltaPt;
  }

  ensureSpace(requiredPt: number): void {
    if (this.y - requiredPt < MARGIN_BOTTOM) {
      this.newPage();
    }
  }

  newPage(): void {
    this.pages.push([]);
    this.y = PAGE_HEIGHT - MARGIN_TOP;
    // Running archival top strip on continuation pages
    this.drawText(this.runningTitle.toUpperCase(), MARGIN_X, this.y, {
      font: 'F4',
      size: 7.5,
      color: COLOR_MUTED,
    });
    this.drawLine(MARGIN_X, this.y - 6, PAGE_WIDTH - MARGIN_X, this.y - 6, COLOR_RULE, 0.75);
    this.y -= 24;
  }

  drawRect(
    x: number,
    yBottom: number,
    width: number,
    height: number,
    opts?: { fill?: string; stroke?: string; lineWidth?: number },
  ): void {
    const ops = this.currentOps();
    ops.push('q');
    if (opts?.fill) ops.push(`${opts.fill} rg`);
    if (opts?.stroke) ops.push(`${opts.stroke} RG`);
    if (opts?.lineWidth) ops.push(`${opts.lineWidth.toFixed(2)} w`);
    ops.push(`${x.toFixed(2)} ${yBottom.toFixed(2)} ${width.toFixed(2)} ${height.toFixed(2)} re`);
    if (opts?.fill && opts?.stroke) {
      ops.push('B');
    } else if (opts?.fill) {
      ops.push('f');
    } else if (opts?.stroke) {
      ops.push('S');
    }
    ops.push('Q');
  }

  drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    lineWidth = 0.75,
  ): void {
    const ops = this.currentOps();
    ops.push(
      `q ${color} RG ${lineWidth.toFixed(2)} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S Q`,
    );
  }

  drawCheckbox(x: number, yBottom: number, size: number, checked: boolean): void {
    this.drawRect(x, yBottom, size, size, {
      fill: checked ? COLOR_GREEN : '1 1 1',
      stroke: checked ? COLOR_GREEN : COLOR_INK,
      lineWidth: 0.9,
    });
    if (checked) {
      const ops = this.currentOps();
      const x1 = x + size * 0.22;
      const y1 = yBottom + size * 0.48;
      const x2 = x + size * 0.44;
      const y2 = yBottom + size * 0.24;
      const x3 = x + size * 0.8;
      const y3 = yBottom + size * 0.76;
      ops.push(
        `q 1 1 1 RG 1.25 w 1 J 1 j ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l ${x3.toFixed(2)} ${y3.toFixed(2)} l S Q`,
      );
    }
  }

  drawText(
    text: string,
    x: number,
    yBaseline: number,
    opts: { font: PdfFontId; size: number; color: string },
  ): void {
    const safe = sanitizePdfText(text);
    if (!safe) return;
    this.currentOps().push(
      `BT /${opts.font} ${opts.size.toFixed(1)} Tf ${opts.color} rg 1 0 0 1 ${x.toFixed(2)} ${yBaseline.toFixed(2)} Tm (${safe}) Tj ET`,
    );
  }

  drawWrappedText(
    text: string,
    x: number,
    maxWidthPt: number,
    opts: { font: PdfFontId; size: number; lineHeight: number; color: string },
  ): number {
    const lines = wrapTextLines(text, maxWidthPt, opts.size, opts.font);
    for (const line of lines) {
      this.ensureSpace(opts.lineHeight + 2);
      this.drawText(line, x, this.y, {
        font: opts.font,
        size: opts.size,
        color: opts.color,
      });
      this.y -= opts.lineHeight;
    }
    return lines.length;
  }

  finalizePageStreams(): string[] {
    const total = this.pages.length;
    return this.pages.map((ops, index) => {
      const pageNum = index + 1;
      const footerOps: string[] = [
        `q ${COLOR_RULE} RG 0.75 w ${MARGIN_X.toFixed(2)} 38.00 m ${(PAGE_WIDTH - MARGIN_X).toFixed(2)} 38.00 l S Q`,
        `BT /F3 7.5 Tf ${COLOR_MUTED} rg 1 0 0 1 ${MARGIN_X.toFixed(2)} 25.00 Tm (${sanitizePdfText(
          `${SITE_CONFIG.brandName} | ${SITE_CONFIG.whatsappDisplay} | ${SITE_CONFIG.email}`,
        )}) Tj ET`,
        `BT /F4 7.5 Tf ${COLOR_MUTED} rg 1 0 0 1 ${(PAGE_WIDTH - MARGIN_X - 58).toFixed(2)} 25.00 Tm (${sanitizePdfText(
          `PAGE ${pageNum} OF ${total}`,
        )}) Tj ET`,
      ];
      return [...ops, ...footerOps].join('\n');
    });
  }
}

/**
 * Assembles valid PDF 1.4 binary bytes from an array of page content streams.
 */
function assemblePdf14(pageStreams: string[], title: string): Uint8Array {
  const encoder = new TextEncoder();
  const objects: string[] = [];

  // Object 1: Catalog
  // Object 2: Pages
  // Object 3..6: Standard Type 1 Fonts (Helvetica, Helvetica-Bold, Courier, Courier-Bold)
  // Object 7: Info dictionary
  // Object 8+: Alternating Page and Content Stream objects
  const fontObjIds = { F1: 3, F2: 4, F3: 5, F4: 6 };
  const firstPageObjId = 8;
  const pageObjIds: number[] = [];

  for (let i = 0; i < pageStreams.length; i += 1) {
    pageObjIds.push(firstPageObjId + i * 2);
  }

  objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);
  objects.push(
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageObjIds.length} >>\nendobj\n`,
  );
  objects.push(
    `3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n`,
  );
  objects.push(
    `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n`,
  );
  objects.push(
    `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>\nendobj\n`,
  );
  objects.push(
    `6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold /Encoding /WinAnsiEncoding >>\nendobj\n`,
  );
  objects.push(
    `7 0 obj\n<< /Title (${sanitizePdfText(title)}) /Creator (${sanitizePdfText(
      SITE_CONFIG.brandName,
    )}) /Producer (${sanitizePdfText(`${SITE_CONFIG.brandName} PDF Dossier Engine`)}) >>\nendobj\n`,
  );

  for (let i = 0; i < pageStreams.length; i += 1) {
    const pageId = firstPageObjId + i * 2;
    const streamId = pageId + 1;
    const streamBody = pageStreams[i];
    const streamLength = encoder.encode(streamBody).length;

    objects.push(
      `${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] /Resources << /Font << /F1 ${fontObjIds.F1} 0 R /F2 ${fontObjIds.F2} 0 R /F3 ${fontObjIds.F3} 0 R /F4 ${fontObjIds.F4} 0 R >> >> /Contents ${streamId} 0 R >>\nendobj\n`,
    );
    objects.push(
      `${streamId} 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamBody}\nendstream\nendobj\n`,
    );
  }

  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const parts: Uint8Array[] = [encoder.encode(header)];
  let offset = parts[0].length;
  const xrefOffsets: number[] = [0];

  for (const objStr of objects) {
    xrefOffsets.push(offset);
    const bytes = encoder.encode(objStr);
    parts.push(bytes);
    offset += bytes.length;
  }

  const xrefStart = offset;
  const xrefLines = [
    'xref',
    `0 ${xrefOffsets.length}`,
    '0000000000 65535 f ',
    ...xrefOffsets.slice(1).map((pos) => `${String(pos).padStart(10, '0')} 00000 n `),
  ];
  const trailer = [
    'trailer',
    `<< /Size ${xrefOffsets.length} /Root 1 0 R /Info 7 0 R >>`,
    'startxref',
    String(xrefStart),
    '%%EOF',
    '',
  ];
  parts.push(encoder.encode(`${xrefLines.join('\n')}\n${trailer.join('\n')}`));

  const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
  const result = new Uint8Array(totalLength);
  let cursor = 0;
  for (const part of parts) {
    result.set(part, cursor);
    cursor += part.length;
  }
  return result;
}

/**
 * Builds a clean kebab-case PDF filename for downloaded document checklists.
 */
export function buildChecklistPdfFilename(doc: GeneratedChecklistDocument): string {
  const safeDest = doc.destinationId.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const safePurpose = doc.visaTypeId.replace(/[^a-z0-9-]+/gi, '-').toLowerCase();
  const safeNat =
    doc.nationalityLabel
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'passport';
  return `visahouse-${safeDest}-${safePurpose}-${safeNat}-checklist.pdf`;
}

/**
 * Generates a formatted, multi-page A4 PDF dossier for the selected target country,
 * travel purpose, and passport profile — reflecting any items already ticked off.
 */
export function generateChecklistPdfBytes(
  doc: GeneratedChecklistDocument,
  checkedIds?: ReadonlySet<string>,
): Uint8Array {
  const checkedCount = checkedIds
    ? doc.groups.reduce(
        (sum, group) => sum + group.items.filter((item) => checkedIds.has(item.id)).length,
        0,
      )
    : 0;

  const pdfTitle = `${doc.destinationName} (${doc.isoCode}) — ${doc.visaTypeLabel} Document Checklist`;
  const builder = new PdfPageBuilder(
    `${SITE_CONFIG.brandName} | ${doc.destinationName} (${doc.isoCode}) | ${doc.visaTypeLabel}`,
  );

  // Top Editorial Masthead Accent Rule
  builder.drawRect(MARGIN_X, builder.cursorY - 2, CONTENT_WIDTH, 4, { fill: COLOR_GREEN });
  builder.advance(18);

  builder.drawText(
    `${SITE_CONFIG.brandName.toUpperCase()}  |  VISA DOCUMENT CHECKLIST DOSSIER`,
    MARGIN_X,
    builder.cursorY,
    { font: 'F4', size: 8.5, color: COLOR_GREEN },
  );
  builder.drawText(
    `ISO: ${doc.isoCode}`,
    PAGE_WIDTH - MARGIN_X - 58,
    builder.cursorY,
    { font: 'F4', size: 9, color: COLOR_INK },
  );
  builder.advance(20);

  // Main Destination Heading
  builder.drawWrappedText(
    `${doc.destinationName} — ${doc.visaTypeLabel}`,
    MARGIN_X,
    CONTENT_WIDTH,
    { font: 'F2', size: 17, lineHeight: 21, color: COLOR_INK },
  );
  builder.advance(4);

  // Metadata Summary Card
  const cardHeight = 68;
  const cardBottom = builder.cursorY - cardHeight;
  builder.drawRect(MARGIN_X, cardBottom, CONTENT_WIDTH, cardHeight, {
    fill: COLOR_PANEL_BG,
    stroke: COLOR_RULE,
    lineWidth: 0.85,
  });

  const col1X = MARGIN_X + 12;
  const col2X = MARGIN_X + CONTENT_WIDTH * 0.52;
  const row1Y = cardBottom + cardHeight - 16;
  const row2Y = cardBottom + cardHeight - 36;
  const row3Y = cardBottom + cardHeight - 56;

  builder.drawText(`PASSPORT PROFILE: ${doc.nationalityLabel}`, col1X, row1Y, {
    font: 'F4',
    size: 8.5,
    color: COLOR_INK,
  });
  builder.drawText(`CHANNEL: ${doc.channel}`, col2X, row1Y, {
    font: 'F4',
    size: 8.5,
    color: COLOR_GREEN,
  });
  builder.drawText(
    `CHECKLIST ITEMS: ${doc.totalItems} Total (${doc.coreItems} Core Mandatory)`,
    col1X,
    row2Y,
    { font: 'F3', size: 8.5, color: COLOR_BODY },
  );
  builder.drawText(
    `PREPARED PROGRESS: ${checkedCount} of ${doc.totalItems} Checked`,
    col2X,
    row2Y,
    { font: 'F3', size: 8.5, color: COLOR_BODY },
  );
  builder.drawText(
    `VERIFICATION NOTE: ${doc.lastVerified}`,
    col1X,
    row3Y,
    { font: 'F3', size: 8, color: COLOR_MUTED },
  );
  builder.drawText(
    `GUIDE: ${SITE_CONFIG.domain}${doc.detailPath}`,
    col2X,
    row3Y,
    { font: 'F3', size: 8, color: COLOR_MUTED },
  );

  builder.advance(cardHeight + 16);

  // Eligibility Note
  builder.drawText('ELIGIBILITY & JURISDICTION SUMMARY', MARGIN_X, builder.cursorY, {
    font: 'F4',
    size: 8,
    color: COLOR_MUTED,
  });
  builder.advance(13);
  builder.drawWrappedText(doc.eligibilityNote, MARGIN_X, CONTENT_WIDTH, {
    font: 'F1',
    size: 9.5,
    lineHeight: 13.5,
    color: COLOR_BODY,
  });
  builder.advance(10);

  // Optional Travel Purpose Advisory
  if (doc.visaTypeAdvisory) {
    const lines = wrapTextLines(doc.visaTypeAdvisory, CONTENT_WIDTH - 20, 8.8, 'F1');
    const boxH = lines.length * 12.5 + 24;
    builder.ensureSpace(boxH + 8);
    const boxBottom = builder.cursorY - boxH;
    builder.drawRect(MARGIN_X, boxBottom, CONTENT_WIDTH, boxH, {
      fill: COLOR_NOTICE_BG,
      stroke: COLOR_GREEN,
      lineWidth: 0.75,
    });
    builder.advance(14);
    builder.drawText(`TRAVEL PURPOSE NOTE (${doc.visaTypeLabel.toUpperCase()})`, MARGIN_X + 10, builder.cursorY, {
      font: 'F4',
      size: 7.8,
      color: COLOR_GREEN,
    });
    builder.advance(12);
    builder.drawWrappedText(doc.visaTypeAdvisory, MARGIN_X + 10, CONTENT_WIDTH - 20, {
      font: 'F1',
      size: 8.8,
      lineHeight: 12.5,
      color: COLOR_INK,
    });
    builder.advance(12);
  }

  // Optional Nationality / Jurisdiction Advisory
  if (doc.requiresVerificationAdvisory && doc.advisoryText) {
    const lines = wrapTextLines(doc.advisoryText, CONTENT_WIDTH - 20, 8.8, 'F1');
    const boxH = lines.length * 12.5 + 24;
    builder.ensureSpace(boxH + 8);
    const boxBottom = builder.cursorY - boxH;
    builder.drawRect(MARGIN_X, boxBottom, CONTENT_WIDTH, boxH, {
      fill: COLOR_NOTICE_BG,
      stroke: COLOR_RED,
      lineWidth: 0.75,
    });
    builder.advance(14);
    builder.drawText(
      `NATIONALITY & JURISDICTION NOTICE (${doc.nationalityLabel.toUpperCase()})`,
      MARGIN_X + 10,
      builder.cursorY,
      { font: 'F4', size: 7.8, color: COLOR_RED },
    );
    builder.advance(12);
    builder.drawWrappedText(doc.advisoryText, MARGIN_X + 10, CONTENT_WIDTH - 20, {
      font: 'F1',
      size: 8.8,
      lineHeight: 12.5,
      color: COLOR_INK,
    });
    builder.advance(12);
  }

  // Grouped Checklist Sections
  for (let gIdx = 0; gIdx < doc.groups.length; gIdx += 1) {
    const group = doc.groups[gIdx];
    builder.ensureSpace(48);

    builder.drawLine(
      MARGIN_X,
      builder.cursorY + 6,
      PAGE_WIDTH - MARGIN_X,
      builder.cursorY + 6,
      COLOR_INK,
      1.0,
    );
    builder.advance(8);
    builder.drawText(
      `${String(gIdx + 1).padStart(2, '0')}  |  ${group.groupTitle.toUpperCase()}`,
      MARGIN_X,
      builder.cursorY,
      { font: 'F4', size: 9, color: COLOR_GREEN },
    );
    builder.advance(16);

    for (const item of group.items) {
      const labelText = item.mandatory ? `${item.label}  [CORE]` : item.label;
      const labelLines = wrapTextLines(labelText, CONTENT_WIDTH - 22, 10, 'F2');
      const detailLines = wrapTextLines(item.detail, CONTENT_WIDTH - 22, 8.8, 'F1');
      const itemBlockHeight = labelLines.length * 13.5 + detailLines.length * 12 + 10;

      builder.ensureSpace(itemBlockHeight);

      const isChecked = Boolean(checkedIds?.has(item.id));
      builder.drawCheckbox(MARGIN_X, builder.cursorY - 1.5, 9.5, isChecked);

      // Draw item title lines
      for (let i = 0; i < labelLines.length; i += 1) {
        builder.drawText(labelLines[i], MARGIN_X + 18, builder.cursorY, {
          font: 'F2',
          size: 10,
          color: isChecked ? COLOR_MUTED : COLOR_INK,
        });
        builder.advance(13.2);
      }

      // Draw explanatory detail lines
      for (const detailLine of detailLines) {
        builder.drawText(detailLine, MARGIN_X + 18, builder.cursorY, {
          font: 'F1',
          size: 8.8,
          color: COLOR_MUTED,
        });
        builder.advance(12);
      }

      builder.advance(6);
    }

    builder.advance(8);
  }

  // Closing Desk Confirmation & Regulatory Disclaimer Block
  builder.ensureSpace(64);
  builder.drawLine(
    MARGIN_X,
    builder.cursorY + 4,
    PAGE_WIDTH - MARGIN_X,
    builder.cursorY + 4,
    COLOR_RULE,
    0.85,
  );
  builder.advance(12);
  builder.drawText(
    `LIVE DESK VERIFICATION: WhatsApp ${SITE_CONFIG.whatsappDisplay}  |  ${SITE_CONFIG.email}`,
    MARGIN_X,
    builder.cursorY,
    { font: 'F4', size: 8.5, color: COLOR_GREEN },
  );
  builder.advance(14);
  builder.drawWrappedText(
    `Regulatory Notice: ${doc.disclaimer} Embassy fees, document rules, and processing windows are verified live before submission.`,
    MARGIN_X,
    CONTENT_WIDTH,
    { font: 'F1', size: 8.2, lineHeight: 11.5, color: COLOR_MUTED },
  );

  const pageStreams = builder.finalizePageStreams();
  return assemblePdf14(pageStreams, pdfTitle);
}
