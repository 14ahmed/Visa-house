import { useMemo, useState } from 'react';
import { Printer, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { ChecklistGroup } from '../data/types';
import { formatLocalizedCopy } from '../utils/i18n';
import { triggerScopedPrint } from '../utils/printDocument';

interface DocumentChecklistProps {
  country: string;
  groups: ChecklistGroup[];
  checkedMap?: Record<string, boolean>;
  onCheckedChange?: (next: Record<string, boolean>) => void;
  /** True when rendered directly on a Country page; false when nested inside DocumentChecklistLibrary. */
  standalonePrint?: boolean;
}

/**
 * Interactive tickable document checklist for country visa pages and the PDF builder.
 * Tracks ticked progress live, resets selections, and formats cleanly into a 2-column A4 print sheet.
 */
export function DocumentChecklist({
  country,
  groups,
  checkedMap,
  onCheckedChange,
  standalonePrint = true,
}: DocumentChecklistProps) {
  const { t, isUrdu } = useLanguage();
  const allIds = useMemo(
    () => groups.flatMap((g) => g.items.map((item) => item.id)),
    [groups],
  );
  const [internalChecked, setInternalChecked] = useState<Record<string, boolean>>({});
  const checked = checkedMap ?? internalChecked;

  const checkedCount = allIds.filter((id) => checked[id]).length;
  const totalCount = allIds.length;

  const updateChecked = (next: Record<string, boolean>) => {
    if (onCheckedChange) {
      onCheckedChange(next);
    } else {
      setInternalChecked(next);
    }
  };

  const toggleItem = (id: string) => {
    updateChecked({ ...checked, [id]: !checked[id] });
  };

  const resetAll = () => {
    updateChecked({});
  };

  const buttonLabelClass = isUrdu ? 'text-xs font-medium' : 'text-xs font-mono uppercase tracking-[0.08em]';

  return (
    <div
      data-print-document={standalonePrint ? 'true' : undefined}
      data-print-nested={!standalonePrint ? 'true' : undefined}
      data-print-kind="checklist"
      className="bg-slip border border-rule rounded-[3px] p-5 sm:p-7"
    >
      <div className="print-checklist-header flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-ink/25">
        <div>
          <p className="mono-label text-ink-muted">
            {standalonePrint ? t.checklist.partOneLabel : t.checklist.auditLabel}
          </p>
          <h3 className="font-display text-xl sm:text-2xl font-medium text-ink mt-1">
            {country} {t.checklist.headingSuffix}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs text-ink tabular-nums ${isUrdu ? 'font-medium' : 'font-mono tracking-[0.1em]'}`}
            aria-live="polite"
          >
            {formatLocalizedCopy(t.checklist.readyCount, {
              checked: checkedCount,
              total: totalCount,
            })}
          </span>
          {standalonePrint && (
            <button
              type="button"
              onClick={() => triggerScopedPrint('all')}
              className={`no-print inline-flex items-center gap-1.5 min-h-[36px] px-2.5 ${buttonLabelClass} text-ink hover:text-visa-green border border-ink/40 hover:border-visa-green rounded-[2px] cursor-pointer whitespace-nowrap transition-colors`}
            >
              <Printer className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{t.common.printBrief}</span>
            </button>
          )}
          {checkedCount > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className={`no-print inline-flex items-center gap-1.5 min-h-[36px] px-2.5 ${buttonLabelClass} text-ink-muted hover:text-ink border border-rule rounded-[2px] cursor-pointer whitespace-nowrap`}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.common.reset}</span>
            </button>
          )}
        </div>
      </div>

      {/* Hairline progress meter (hidden in print) */}
      <div
        className="no-print w-full h-1 bg-paper-deep mt-4 overflow-hidden"
        role="progressbar"
        aria-valuenow={checkedCount}
        aria-valuemin={0}
        aria-valuemax={totalCount}
        aria-label={t.checklist.auditLabel}
      >
        <div
          className="h-full bg-visa-green transition-all duration-200"
          style={{ width: totalCount > 0 ? `${(checkedCount / totalCount) * 100}%` : '0%' }}
        />
      </div>

      <div className="print-checklist-groups mt-6 space-y-7">
        {groups.map((group) => (
          <div key={group.groupTitle}>
            <h4 className="mono-label text-ink mb-3 pb-1.5 border-b border-rule">
              {group.groupTitle}
            </h4>
            <ul className="divide-y divide-rule/70">
              {group.items.map((item) => {
                const isChecked = Boolean(checked[item.id]);
                return (
                  <li key={item.id} className="py-3.5 first:pt-1 last:pb-0">
                    <label
                      htmlFor={item.id}
                      className="flex items-start gap-3.5 cursor-pointer select-none group min-h-[44px]"
                    >
                      <input
                        id={item.id}
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        className="mt-1 h-5 w-5 shrink-0 accent-visa-green border-ink rounded-[2px] cursor-pointer"
                      />
                      <span className="flex-1 min-w-0">
                        <span className="block leading-snug">
                          <span
                            className={`print-checklist-item-title text-[15px] font-medium transition-colors ${
                              isChecked ? 'line-through text-ink-muted' : 'text-ink'
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.mandatory && (
                            <span
                              className={`print-checklist-core-tag ms-2 text-[11px] text-stamp-red whitespace-nowrap ${
                                isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.12em]'
                              }`}
                            >
                              {t.checklist.coreTag}
                            </span>
                          )}
                        </span>
                        <span className="print-checklist-item-detail block mt-1 text-sm text-ink-muted leading-relaxed">
                          {item.detail}
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export { DocumentChecklistLibrary } from './DocumentChecklistLibrary';
