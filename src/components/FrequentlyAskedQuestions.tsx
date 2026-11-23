import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { HOME_FAQS } from '../data/services';
import type { FaqItem } from '../data/types';

export interface FaqAccordionProps {
  items: FaqItem[];
  idPrefix?: string;
  defaultOpenIndex?: number | null;
  showExpandToggle?: boolean;
}

export interface FrequentlyAskedQuestionsProps {
  items?: FaqItem[];
  idPrefix?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  defaultOpenIndex?: number | null;
  showExpandToggle?: boolean;
  className?: string;
}

/**
 * Editorial hairline-ruled FAQ accordion using native buttons and ARIA regions.
 */
export function FaqAccordion({
  items,
  idPrefix,
  defaultOpenIndex = 0,
  showExpandToggle = true,
}: FaqAccordionProps) {
  const reactId = useId();
  const baseId = idPrefix ?? `faq-${reactId}`;

  const [openIndices, setOpenIndices] = useState<number[]>(() =>
    defaultOpenIndex !== null && defaultOpenIndex >= 0 && defaultOpenIndex < items.length
      ? [defaultOpenIndex]
      : [],
  );

  const allExpanded = items.length > 0 && openIndices.length === items.length;

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx],
    );
  };

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(items.map((_, idx) => idx));
    }
  };

  return (
    <div>
      {showExpandToggle && items.length > 1 && (
        <div className="flex items-center justify-between pb-2.5">
          <span className="mono-label text-ink-muted">
            {items.length} Recorded {items.length === 1 ? 'Query' : 'Queries'}
          </span>
          <button
            type="button"
            onClick={toggleAll}
            className="mono-label text-ink-muted hover:text-visa-green underline-offset-4 hover:underline cursor-pointer min-h-[36px] px-1"
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      )}

      <div className="border-y border-ink/75 divide-y divide-rule bg-slip/55">
        {items.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          const buttonId = `${baseId}-btn-${idx}`;
          const panelId = `${baseId}-panel-${idx}`;
          const numberLabel = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={item.question}
              className={`transition-colors ${
                isOpen ? 'bg-slip' : 'hover:bg-slip/80'
              }`}
            >
              <h3 className="font-display">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(idx)}
                  className="w-full px-3 sm:px-4 py-4 sm:py-5 flex items-start justify-between gap-4 text-left min-h-[52px] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-visa-green"
                >
                  <span className="flex items-baseline gap-3 sm:gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs tabular-nums shrink-0 transition-colors ${
                        isOpen ? 'text-visa-green font-medium' : 'text-ink-muted'
                      }`}
                    >
                      {numberLabel}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-medium text-ink group-hover:text-visa-green transition-colors">
                      {item.question}
                    </span>
                  </span>
                  <span
                    className={`mt-0.5 h-7 w-7 border rounded-[2px] inline-flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-visa-green border-visa-green text-slip'
                        : 'bg-paper border-ink/30 text-ink group-hover:border-ink/70'
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
              </h3>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-3 sm:px-4 pb-5 pl-10 sm:pl-12 pr-6 text-[15px] text-ink-body leading-relaxed max-w-3xl"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Standalone Frequently Asked Questions section styled in Visahouse's paper-and-ink aesthetic.
 */
export function FrequentlyAskedQuestions({
  items = HOME_FAQS,
  idPrefix = 'faq-section',
  eyebrow = 'Frequently Asked Questions',
  title = 'Common visa & filing queries',
  description = 'Clear answers on submission channels, bank statements, fee verification, and how our online desk supports applicants.',
  defaultOpenIndex = 0,
  showExpandToggle = true,
  className = '',
}: FrequentlyAskedQuestionsProps) {
  return (
    <section
      aria-label={eyebrow}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ${className}`.trim()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="mono-label text-ink-muted">{eyebrow}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink mt-2">
            {title}
          </h2>
          <p className="mt-3 text-sm text-ink-muted leading-relaxed">{description}</p>
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion
            items={items}
            idPrefix={idPrefix}
            defaultOpenIndex={defaultOpenIndex}
            showExpandToggle={showExpandToggle}
          />
        </div>
      </div>
    </section>
  );
}
