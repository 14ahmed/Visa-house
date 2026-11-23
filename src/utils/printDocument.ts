export type PrintDocumentScope = 'all' | 'checklist' | 'readiness';

export interface PrintTargetElement {
  setAttribute: (name: string, value: string) => void;
  removeAttribute: (name: string) => void;
}

/**
 * Applies print-scope data attributes to the document root so @media print
 * isolates either the Document Checklist, the Travel Readiness Guide (or a
 * single focused destination row), or both together on one clean A4 sheet.
 */
export function applyPrintScopeAttributes(
  root: PrintTargetElement,
  scope: PrintDocumentScope,
  focusedSlug?: string,
): () => void {
  if (scope === 'all') {
    root.removeAttribute('data-print-scope');
  } else {
    root.setAttribute('data-print-scope', scope);
  }

  if (focusedSlug && focusedSlug.trim()) {
    root.setAttribute('data-print-slug', focusedSlug.trim());
  } else {
    root.removeAttribute('data-print-slug');
  }

  return () => {
    root.removeAttribute('data-print-scope');
    root.removeAttribute('data-print-slug');
  };
}

/**
 * Triggers window.print() with automatic scope attribute cleanup once the
 * browser print dialog closes (via afterprint + safety timeout fallback).
 */
export function triggerScopedPrint(
  scope: PrintDocumentScope,
  focusedSlug?: string,
  onAfterCleanup?: () => void,
): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const cleanupAttrs = applyPrintScopeAttributes(document.documentElement, scope, focusedSlug);
  let cleaned = false;

  const finalize = () => {
    if (cleaned) return;
    cleaned = true;
    cleanupAttrs();
    window.removeEventListener('afterprint', finalize);
    onAfterCleanup?.();
  };

  window.addEventListener('afterprint', finalize, { once: true });
  window.print();
  // Fallback for environments where afterprint does not fire synchronously.
  window.setTimeout(finalize, 1500);
}

export function buildPrintDocumentHeading(
  kind: 'checklist' | 'readiness' | 'combined',
  destinationName?: string,
): string {
  const dest = destinationName?.trim();
  if (kind === 'checklist') {
    return dest ? `${dest} — Visa Document Checklist` : 'Visa Document Checklist';
  }
  if (kind === 'readiness') {
    return dest ? `${dest} — Travel Readiness Field Card` : 'Travel Readiness Guide';
  }
  return dest
    ? `${dest} — Visa Document Checklist & Travel Readiness Brief`
    : 'Visahouse — Document Checklist & Travel Readiness Brief';
}
