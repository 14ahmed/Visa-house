import { useEffect, useId, useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  Download,
  FileDown,
  FileText,
  MessageCircle,
  Printer,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { useLanguage } from '../context/LanguageContext';
import { buildWhatsAppUrl } from '../utils/formatters';
import { formatLocalizedCopy } from '../utils/i18n';
import {
  buildChecklistFilename,
  buildVisaChecklistDocument,
  CHECKLIST_DESTINATIONS,
  formatChecklistForDownload,
  NATIONALITY_OPTIONS,
  VISA_TYPE_OPTIONS,
  type VisaTypeId,
} from '../utils/checklistLibrary';
import {
  buildChecklistPdfFilename,
  generateChecklistPdfBytes,
} from '../utils/checklistPdf';
import { buildPrintDocumentHeading, triggerScopedPrint } from '../utils/printDocument';
import { DocumentChecklist } from './DocumentChecklist';

interface DocumentChecklistLibraryProps {
  id?: string;
  defaultDestinationId?: string;
  /** Optional externally synced destination ID (e.g. from InteractiveVisaGlobe). */
  selectedDestinationId?: string;
  /** Optional callback fired when user switches destination inside the checklist selector. */
  onDestinationChange?: (destinationId: string) => void;
  defaultNationalityId?: string;
  defaultVisaTypeId?: VisaTypeId;
  sectionNumber?: string;
  heading?: string;
  subcopy?: string;
}

/**
 * Interactive Document Checklist Builder allowing users to select their target
 * country, travel purpose, and passport profile to receive a customized,
 * tickable, and downloadable PDF list of required visa documents.
 */
export function DocumentChecklistLibrary({
  id = 'checklist-library',
  defaultDestinationId = 'canada',
  selectedDestinationId,
  onDestinationChange,
  defaultNationalityId = 'pakistan',
  defaultVisaTypeId = 'tourist',
  sectionNumber,
  heading,
  subcopy,
}: DocumentChecklistLibraryProps) {
  const { t, isUrdu, localizeCountry, localizeChannel, localizeVisaType } = useLanguage();
  const resolvedSectionNumber = sectionNumber ?? t.home.no02ChecklistEyebrow;
  const resolvedHeading = heading ?? t.checklist.libraryHeading;
  const resolvedSubcopy = subcopy ?? t.checklist.librarySubcopy;
  const initialDest = selectedDestinationId ?? defaultDestinationId;
  const [selectedVisaType, setSelectedVisaType] = useState<VisaTypeId>(defaultVisaTypeId);
  const [selectedNationality, setSelectedNationality] = useState(defaultNationalityId);
  const [customNationality, setCustomNationality] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(initialDest);
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  // Active dossier query state keeps live sync on select change AND explicit generate submit.
  const [activeQuery, setActiveQuery] = useState<{
    visaTypeId: VisaTypeId;
    nationalityId: string;
    customNationality: string;
    destinationId: string;
  }>({
    visaTypeId: defaultVisaTypeId,
    nationalityId: defaultNationalityId,
    customNationality: '',
    destinationId: initialDest,
  });

  // Sync smoothly whenever an external selector (such as the 3D D3.js Globe) picks a country.
  useEffect(() => {
    if (!selectedDestinationId) return;
    if (selectedDestinationId === activeQuery.destinationId && selectedDestinationId === selectedDestination) {
      return;
    }
    setSelectedDestination(selectedDestinationId);
    setCheckedMap({});
    setCopied(false);
    setActiveQuery((prev) => ({
      ...prev,
      destinationId: selectedDestinationId,
    }));
    const syncedDoc = buildVisaChecklistDocument({
      visaTypeId: activeQuery.visaTypeId,
      nationalityId: activeQuery.nationalityId,
      customNationality: activeQuery.customNationality,
      destinationId: selectedDestinationId,
    });
    setStatusFeedback(
      isUrdu
        ? `تھری ڈی گلوب سے منسلک: ${localizeCountry(syncedDoc.destinationName)} (${syncedDoc.totalItems} دستاویزات)`
        : `Synced from 3D Globe: ${syncedDoc.destinationName} (${syncedDoc.totalItems} required documents).`,
    );
  }, [selectedDestinationId]);

  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const headingId = useId();
  const visaTypeSelectId = useId();
  const nationalitySelectId = useId();
  const customNationalityInputId = useId();
  const destinationSelectId = useId();

  const generatedDoc = useMemo(
    () => buildVisaChecklistDocument(activeQuery),
    [activeQuery],
  );

  const plainTextChecklist = useMemo(
    () => formatChecklistForDownload(generatedDoc),
    [generatedDoc],
  );

  const checkedIdSet = useMemo(
    () => new Set(Object.keys(checkedMap).filter((key) => checkedMap[key])),
    [checkedMap],
  );

  const applySelection = (next: {
    visaTypeId?: VisaTypeId;
    nationalityId?: string;
    customNationality?: string;
    destinationId?: string;
  }) => {
    setStatusFeedback(null);
    setCopied(false);
    setCheckedMap({});
    setActiveQuery((prev) => ({
      visaTypeId: next.visaTypeId ?? prev.visaTypeId,
      nationalityId: next.nationalityId ?? prev.nationalityId,
      customNationality: next.customNationality ?? prev.customNationality,
      destinationId: next.destinationId ?? prev.destinationId,
    }));
  };

  const handleVisaTypeChange = (value: VisaTypeId) => {
    setSelectedVisaType(value);
    applySelection({ visaTypeId: value });
  };

  const handleNationalityChange = (value: string) => {
    setSelectedNationality(value);
    applySelection({
      nationalityId: value,
      customNationality: value === 'other' ? customNationality : '',
    });
  };

  const handleCustomNationalityChange = (value: string) => {
    setCustomNationality(value);
    if (selectedNationality === 'other') {
      applySelection({ customNationality: value });
    }
  };

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value);
    applySelection({ destinationId: value });
    onDestinationChange?.(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextDoc = buildVisaChecklistDocument({
      visaTypeId: selectedVisaType,
      nationalityId: selectedNationality,
      customNationality: selectedNationality === 'other' ? customNationality : '',
      destinationId: selectedDestination,
    });
    setActiveQuery({
      visaTypeId: selectedVisaType,
      nationalityId: selectedNationality,
      customNationality: selectedNationality === 'other' ? customNationality : '',
      destinationId: selectedDestination,
    });
    setStatusFeedback(
      `Ready: ${nextDoc.totalItems}-item ${nextDoc.visaTypeLabel} checklist for ${nextDoc.destinationName} (${nextDoc.nationalityLabel}). Download your PDF below.`,
    );
  };

  const triggerBlobDownload = (blob: Blob, filename: string) => {
    if (typeof document === 'undefined' || typeof URL === 'undefined') return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDownloadPdf = () => {
    const filename = buildChecklistPdfFilename(generatedDoc);
    const pdfBytes = generateChecklistPdfBytes(generatedDoc, checkedIdSet);
    const pdfBuffer = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength,
    ) as ArrayBuffer;
    const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
    triggerBlobDownload(blob, filename);
    const tickedCount = checkedIdSet.size;
    setStatusFeedback(
      tickedCount > 0
        ? `Downloaded ${filename} (${tickedCount} of ${generatedDoc.totalItems} items marked prepared).`
        : `Downloaded ${filename} (${generatedDoc.totalItems} required documents).`,
    );
  };

  const handleDownloadTxt = () => {
    const filename = buildChecklistFilename(generatedDoc);
    const blob = new Blob([plainTextChecklist], { type: 'text/plain;charset=utf-8' });
    triggerBlobDownload(blob, filename);
    setStatusFeedback(`Downloaded plain-text copy: ${filename}`);
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(plainTextChecklist);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setCopied(true);
      setStatusFeedback('Copied formatted checklist to clipboard.');
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatusFeedback('Clipboard permission blocked—use Download PDF instead.');
    }
  };

  const whatsappUrl = buildWhatsAppUrl(
    `${generatedDoc.destinationName} ${generatedDoc.visaTypeLabel} checklist`,
    `Hello Visahouse, I hold a ${generatedDoc.nationalityLabel} and would like you to review my ${generatedDoc.destinationName} ${generatedDoc.visaTypeLabel} document checklist (${generatedDoc.channel}).`,
  );

  const individualCount = CHECKLIST_DESTINATIONS.filter((d) => d.id !== 'schengen').length;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-print-document="true"
      data-print-kind="checklist"
      className="paper-card-texture border border-ink/80 rounded-[3px] p-5 sm:p-8 lg:p-10 scroll-mt-24"
    >
      {/* Print-Only Archival Consular Letterhead */}
      <div className="print-only print-letterhead" aria-hidden="true">
        <div>
          <p className="print-letterhead-brand">{SITE_CONFIG.brandName}</p>
          <p className="mono-label mt-1">
            {buildPrintDocumentHeading('checklist', generatedDoc.destinationName)}
          </p>
        </div>
        <div className="print-letterhead-meta">
          <p>
            {generatedDoc.isoCode} · {generatedDoc.visaTypeLabel}
          </p>
          <p>
            {SITE_CONFIG.domain} · {SITE_CONFIG.email}
          </p>
        </div>
      </div>

      {/* Editorial Header (hidden in print; replaced by crisp letterhead) */}
      <div className="no-print flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-ink/75">
        <div className="max-w-3xl">
          <p className="mono-label text-visa-green">{resolvedSectionNumber}</p>
          <h2
            id={headingId}
            className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1.5"
          >
            {resolvedHeading}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-ink-body leading-relaxed">
            {resolvedSubcopy}
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3 self-start lg:self-end border border-rule bg-paper px-3.5 py-2 rounded-[2px]">
          <FileText className="h-4 w-4 text-visa-green shrink-0" aria-hidden="true" />
          <span
            className={`text-xs text-ink tabular-nums ${
              isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.12em]'
            }`}
          >
            {formatLocalizedCopy(t.checklist.badgeCount, {
              countries: CHECKLIST_DESTINATIONS.length,
              purposes: VISA_TYPE_OPTIONS.length,
            })}
          </span>
        </div>
      </div>

      {/* Selector Control Desk (hidden in print) */}
      <form
        onSubmit={handleSubmit}
        className="no-print mt-6 bg-paper border border-rule rounded-[3px] p-4 sm:p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-4">
            <label
              htmlFor={destinationSelectId}
              className="block mono-label text-ink mb-1.5"
            >
              {t.checklist.step1Country}
            </label>
            <select
              id={destinationSelectId}
              name="checklistDestination"
              value={selectedDestination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              <optgroup
                label={formatLocalizedCopy(t.checklist.individualGuidesGroup, {
                  count: individualCount,
                })}
              >
                {CHECKLIST_DESTINATIONS.filter((d) => d.id !== 'schengen').map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {localizeCountry(dest.country)} ({dest.isoCode}) — {localizeChannel(dest.channel)}
                  </option>
                ))}
              </optgroup>
              <optgroup label={t.checklist.europeZoneGroup}>
                {CHECKLIST_DESTINATIONS.filter((d) => d.id === 'schengen').map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {localizeCountry(dest.country)} ({dest.isoCode}) — {localizeChannel(dest.channel)}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor={visaTypeSelectId}
              className="block mono-label text-ink mb-1.5"
            >
              {t.checklist.step2Purpose}
            </label>
            <select
              id={visaTypeSelectId}
              name="checklistVisaType"
              value={selectedVisaType}
              onChange={(e) => handleVisaTypeChange(e.target.value as VisaTypeId)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              {VISA_TYPE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {localizeVisaType(opt.id, opt.label)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor={nationalitySelectId}
              className="block mono-label text-ink mb-1.5"
            >
              {t.checklist.step3Passport}
            </label>
            <select
              id={nationalitySelectId}
              name="checklistNationality"
              value={selectedNationality}
              onChange={(e) => handleNationalityChange(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink focus:border-visa-green"
            >
              {NATIONALITY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 bg-ink text-slip hover:bg-visa-green text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{t.checklist.buildListBtn}</span>
              <ArrowRight className="h-4 w-4 shrink-0 rtl:rotate-180" aria-hidden="true" />
            </button>
          </div>
        </div>

        {selectedNationality === 'other' && (
          <div className="mt-4 pt-4 border-t border-rule">
            <label
              htmlFor={customNationalityInputId}
              className="block mono-label text-ink mb-1.5"
            >
              {t.checklist.customNationalityLabel}
            </label>
            <input
              id={customNationalityInputId}
              type="text"
              value={customNationality}
              onChange={(e) => handleCustomNationalityChange(e.target.value)}
              placeholder={t.checklist.customNationalityPlaceholder}
              className="w-full sm:max-w-md min-h-[44px] px-3.5 py-2 bg-slip border border-ink/40 rounded-[2px] text-sm text-ink placeholder:text-ink-muted focus:border-visa-green"
            />
          </div>
        )}
      </form>

      {/* Non-Pakistani Jurisdiction & Nationality Advisory */}
      {generatedDoc.requiresVerificationAdvisory && generatedDoc.advisoryText && (
        <div
          role="note"
          className="mt-5 p-4 sm:p-5 bg-marigold/15 border border-stamp-red/45 rounded-[2px] flex items-start gap-3"
        >
          <AlertTriangle
            className="h-5 w-5 text-stamp-red shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="mono-label text-stamp-red">
              Nationality &amp; Jurisdiction Notice ({generatedDoc.nationalityLabel})
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {generatedDoc.advisoryText}
            </p>
          </div>
        </div>
      )}

      {/* Travel Purpose Specific Advisory (e.g. Student Attestation / Transit ATV Rules) */}
      {generatedDoc.visaTypeAdvisory && (
        <div
          role="note"
          className="mt-5 p-4 sm:p-5 bg-visa-green-soft/60 border border-visa-green/45 rounded-[2px] flex items-start gap-3"
        >
          <AlertTriangle
            className="h-5 w-5 text-visa-green shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="mono-label text-visa-green">
              Travel Purpose Note ({generatedDoc.visaTypeLabel})
            </p>
            <p className="mt-1 text-sm text-ink leading-relaxed">
              {generatedDoc.visaTypeAdvisory}
            </p>
          </div>
        </div>
      )}

      {/* Active Dossier Summary Bar + PDF / Text / Print Export Actions */}
      <div className="print-summary-bar mt-6 bg-paper border border-ink/60 rounded-[3px] p-4 sm:p-5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 min-w-0 flex-1">
            <span
              className="font-latin-mono inline-flex items-center justify-center px-3 py-2 text-lg font-bold tracking-[0.14em] border rounded-[2px] bg-slip shrink-0"
              style={{
                color: generatedDoc.accentHex,
                borderColor: generatedDoc.accentHex,
              }}
            >
              {generatedDoc.isoCode}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <h3 className="font-display text-xl font-medium text-ink">
                  {localizeCountry(generatedDoc.destinationName)}
                </h3>
                <span
                  className={`text-[11px] text-ink-body ${
                    isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.12em]'
                  }`}
                >
                  · {localizeVisaType(generatedDoc.visaTypeId, generatedDoc.visaTypeLabel)}
                </span>
                <span
                  className={`text-[11px] text-visa-green font-medium ${
                    isUrdu ? '' : 'font-mono uppercase tracking-[0.12em]'
                  }`}
                >
                  · {localizeChannel(generatedDoc.channel)}
                </span>
              </div>
              <p
                className={`mt-1 text-xs text-ink-muted tabular-nums ${
                  isUrdu ? '' : 'font-mono tracking-[0.06em]'
                }`}
              >
                {t.checklist.passportMetaPrefix}: {generatedDoc.nationalityLabel} ·{' '}
                {generatedDoc.coreItems}{' '}
                {formatLocalizedCopy(t.checklist.coreItemsMeta, {
                  total: generatedDoc.totalItems,
                })}{' '}
                ·{' '}
                {formatLocalizedCopy(t.checklist.preparedMeta, {
                  checked: checkedIdSet.size,
                })}
              </p>
            </div>
          </div>

          {/* Primary PDF Export + Secondary Actions (hidden in print) */}
          <div className="no-print flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 bg-visa-green text-slip hover:bg-visa-green-dark text-sm font-medium rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileDown className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.checklist.downloadPdfBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => triggerScopedPrint('checklist')}
              className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 bg-slip border border-ink/50 text-ink hover:border-visa-green hover:text-visa-green text-xs rounded-[2px] transition-colors cursor-pointer whitespace-nowrap ${
                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
              }`}
            >
              <Printer className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t.common.printSheet}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTxt}
              className="font-latin-mono inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 bg-slip border border-ink/50 text-ink hover:border-ink text-xs uppercase tracking-[0.08em] rounded-[2px] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>.TXT</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 bg-slip border border-ink/50 text-ink hover:border-ink text-xs rounded-[2px] transition-colors cursor-pointer whitespace-nowrap ${
                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
              }`}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-visa-green shrink-0" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{copied ? t.common.copied : t.common.copy}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 border border-visa-green text-visa-green hover:bg-visa-green-soft text-sm font-medium rounded-[2px] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.checklist.verifyWhatsappBtn}</span>
            </a>

            <Link
              to={generatedDoc.detailPath}
              className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-2.5 py-2 text-xs text-ink-muted hover:text-ink underline underline-offset-4 whitespace-nowrap ${
                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.1em]'
              }`}
            >
              <span>{t.checklist.fullGuideBtn}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <p className="mt-4 pt-3 border-t border-rule text-sm text-ink-body leading-relaxed">
          <strong className="text-ink font-medium">{t.checklist.eligibilityNoteLabel}</strong>{' '}
          {generatedDoc.eligibilityNote}
        </p>

        {statusFeedback && (
          <p
            role="status"
            aria-live="polite"
            className="no-print mt-3 font-mono text-xs text-visa-green bg-visa-green-soft border border-visa-green/30 px-3 py-2 rounded-[2px]"
          >
            {statusFeedback}
          </p>
        )}
      </div>

      {/* Displayable & Tickable Interactive Checklist (ticks flow into downloaded PDF & Print Sheet) */}
      <div className="mt-6">
        <DocumentChecklist
          key={`${generatedDoc.destinationId}-${generatedDoc.visaTypeId}-${generatedDoc.nationalityLabel}`}
          country={`${localizeCountry(generatedDoc.destinationName)} — ${localizeVisaType(
            generatedDoc.visaTypeId,
            generatedDoc.visaTypeLabel,
          )}`}
          groups={generatedDoc.groups}
          checkedMap={checkedMap}
          onCheckedChange={setCheckedMap}
          standalonePrint={false}
        />
      </div>

      <p className="no-print mt-4 text-xs text-ink-muted leading-relaxed">
        {t.common.disclaimer} {t.checklist.disclaimerSuffix}
      </p>

      {/* Print-Only Archival Footer */}
      <div className="print-only print-doc-footer" aria-hidden="true">
        <span>{t.common.disclaimer}</span>
        <span className="font-latin-mono whitespace-nowrap">
          {SITE_CONFIG.brandName} · {SITE_CONFIG.domain}
        </span>
      </div>
    </section>
  );
}
