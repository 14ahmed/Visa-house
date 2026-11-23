import { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  filterVisaFaqs,
  PAKISTANI_VISA_FAQS,
  VISA_FAQ_CATEGORIES,
  type PakistaniVisaFaqItem,
  type VisaFaqCategory,
} from '../data/visaFaqs';

export interface PakistaniVisaFaqSectionProps {
  id?: string;
  eyebrow?: string;
  heading?: string;
  description?: string;
  items?: readonly PakistaniVisaFaqItem[];
  initialCategory?: 'all' | VisaFaqCategory;
  showUtilityLinks?: boolean;
  className?: string;
}

/**
 * Editorial FAQ section set with Fraunces display serif headings,
 * addressing visa application timelines and document requirements
 * for Pakistani passport holders.
 */
export function PakistaniVisaFaqSection({
  id = 'faq',
  eyebrow,
  heading,
  description,
  items = PAKISTANI_VISA_FAQS,
  initialCategory = 'all',
  showUtilityLinks = true,
  className = '',
}: PakistaniVisaFaqSectionProps) {
  const { t, isUrdu } = useLanguage();
  const resolvedEyebrow = eyebrow ?? t.home.no09FaqEyebrow;
  const resolvedHeading = heading ?? t.home.no09FaqHeading;
  const resolvedDescription = description ?? t.home.no09FaqDesc;

  const reactId = useId();
  const [activeCategory, setActiveCategory] = useState<'all' | VisaFaqCategory>(initialCategory);
  const [openIds, setOpenIds] = useState<string[]>(() =>
    items.length > 0 ? [items[0].id] : [],
  );

  const visibleItems = useMemo(
    () => filterVisaFaqs(items, activeCategory),
    [items, activeCategory],
  );

  const categoryCounts = useMemo(
    () => ({
      all: items.length,
      timelines: items.filter((item) => item.category === 'timelines').length,
      documents: items.filter((item) => item.category === 'documents').length,
    }),
    [items],
  );

  const getCategoryLabel = (catId: 'all' | VisaFaqCategory) => {
    if (catId === 'all') return t.faq.catAll;
    if (catId === 'timelines') return t.faq.catTimelines;
    return t.faq.catDocuments;
  };

  const allVisibleOpen =
    visibleItems.length > 0 && visibleItems.every((item) => openIds.includes(item.id));

  const handleCategoryChange = (nextCategory: 'all' | VisaFaqCategory) => {
    setActiveCategory(nextCategory);
    const nextList = filterVisaFaqs(items, nextCategory);
    setOpenIds((prev) => {
      const stillVisible = prev.filter((openId) => nextList.some((item) => item.id === openId));
      if (stillVisible.length > 0) return stillVisible;
      return nextList.length > 0 ? [nextList[0].id] : [];
    });
  };

  const toggleItem = (itemId: string) => {
    setOpenIds((prev) =>
      prev.includes(itemId) ? prev.filter((existing) => existing !== itemId) : [...prev, itemId],
    );
  };

  const toggleAllVisible = () => {
    if (allVisibleOpen) {
      const visibleSet = new Set(visibleItems.map((item) => item.id));
      setOpenIds((prev) => prev.filter((openId) => !visibleSet.has(openId)));
    } else {
      setOpenIds((prev) => Array.from(new Set([...prev, ...visibleItems.map((item) => item.id)])));
    }
  };

  const headingId = `${reactId}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 ${className}`.trim()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Editorial Column: Fraunces Section Heading + Reference Standards */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <p className="mono-label text-visa-green">{resolvedEyebrow}</p>
            <h2
              id={headingId}
              className="font-display text-3xl sm:text-4xl font-medium tracking-tight leading-[1.1] text-ink mt-2 text-balance"
            >
              {resolvedHeading}
            </h2>
            <p className="mt-3.5 text-[15px] text-ink-body leading-relaxed">
              {resolvedDescription}
            </p>
          </div>

          {/* Archival Baseline Reference Ledger */}
          <div className="bg-slip border border-rule rounded-[3px] p-5">
            <h3 className="font-display text-xl font-medium text-ink pb-3 border-b border-ink/30">
              {t.faq.baselineTitle}
            </h3>
            <dl className="divide-y divide-rule text-sm">
              <div className="py-3">
                <dt className="mono-label text-ink-muted">{t.faq.passportValidity}</dt>
                <dd className="mt-1 text-ink-body leading-snug">{t.faq.passportValidityVal}</dd>
              </div>
              <div className="py-3">
                <dt className="mono-label text-ink-muted">{t.faq.financialProof}</dt>
                <dd className="mt-1 text-ink-body leading-snug">{t.faq.financialProofVal}</dd>
              </div>
              <div className="py-3 pb-1">
                <dt className="mono-label text-ink-muted">{t.faq.recommendedLeadTime}</dt>
                <dd className="mt-1 text-ink-body leading-snug">
                  {t.faq.recommendedLeadTimeVal}
                </dd>
              </div>
            </dl>

            {showUtilityLinks && (
              <div className="mt-4 pt-3.5 border-t border-rule flex flex-col gap-2 text-sm">
                <Link
                  to="/visas#checklist-library"
                  className="inline-flex items-center justify-between gap-2 text-ink hover:text-visa-green font-medium transition-colors"
                >
                  <span>{t.faq.buildChecklistLink}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
                </Link>
                <Link
                  to="/visas#fee-estimator"
                  className="inline-flex items-center justify-between gap-2 text-ink hover:text-visa-green font-medium transition-colors"
                >
                  <span>{t.faq.estimateFeesLink}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Editorial Column: Category Controls + Fraunces Accordion */}
        <div className="lg:col-span-8">
          {/* Interactive Filter Controls + Expand/Collapse */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
            <div
              role="group"
              aria-label={t.faq.catAll}
              className="flex flex-wrap items-center gap-1.5"
            >
              {VISA_FAQ_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id];
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`min-h-[40px] px-3.5 py-2 text-xs rounded-[2px] border transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums ${
                      isUrdu ? 'font-medium' : 'font-mono uppercase tracking-[0.08em]'
                    } ${
                      isActive
                        ? 'bg-visa-green text-slip border-visa-green'
                        : 'bg-slip text-ink-body border-rule hover:border-ink/60 hover:text-ink'
                    }`}
                  >
                    {getCategoryLabel(cat.id)} ({count})
                  </button>
                );
              })}
            </div>

            {visibleItems.length > 1 && (
              <button
                type="button"
                onClick={toggleAllVisible}
                className="mono-label text-ink-muted hover:text-visa-green underline-offset-4 hover:underline cursor-pointer min-h-[40px] px-1 whitespace-nowrap shrink-0"
              >
                {allVisibleOpen ? t.faq.collapseAll : t.faq.expandAll}
              </button>
            )}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {visibleItems.length} questions.
          </p>

          {/* Hairline-Ruled Editorial Accordion */}
          <div className="border-y border-ink/80 divide-y divide-rule bg-slip/60">
            {visibleItems.map((item, idx) => {
              const isOpen = openIds.includes(item.id);
              const buttonId = `${reactId}-btn-${item.id}`;
              const panelId = `${reactId}-panel-${item.id}`;
              const numberLabel = String(idx + 1).padStart(2, '0');

              return (
                <article
                  key={item.id}
                  className={`transition-colors duration-150 ${
                    isOpen ? 'bg-slip' : 'hover:bg-slip/85'
                  }`}
                >
                  <h3 className="font-display">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(item.id)}
                      className="w-full px-4 sm:px-5 py-4 sm:py-5 flex items-start justify-between gap-4 text-start min-h-[56px] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-visa-green"
                    >
                      <span className="min-w-0 flex-1">
                        <span
                          className={`flex items-center gap-2 text-[11px] text-ink-muted tabular-nums ${
                            isUrdu ? '' : 'font-mono uppercase tracking-[0.12em]'
                          }`}
                        >
                          <span
                            className={`font-latin-mono ${
                              isOpen ? 'text-visa-green font-semibold' : ''
                            }`}
                          >
                            {numberLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{getCategoryLabel(item.category)}</span>
                        </span>
                        <span className="block mt-1.5 font-display text-lg sm:text-[1.3rem] font-medium leading-snug text-ink group-hover:text-visa-green transition-colors">
                          {item.question}
                        </span>
                      </span>

                      <span
                        className={`mt-1 h-8 w-8 border rounded-[2px] inline-flex items-center justify-center shrink-0 transition-colors ${
                          isOpen
                            ? 'bg-visa-green border-visa-green text-slip'
                            : 'bg-paper border-ink/30 text-ink group-hover:border-ink/70'
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-4 sm:px-5 pb-5 sm:pb-6"
                    >
                      <p className="text-[15px] text-ink-body leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                      <p className="mt-3.5 pt-3 border-t border-rule/80 text-xs sm:text-[13px] text-ink-muted leading-relaxed">
                        <span
                          className={`text-visa-green font-medium me-2 ${
                            isUrdu ? '' : 'font-mono uppercase tracking-[0.1em]'
                          }`}
                        >
                          {t.faq.keyStandard}
                        </span>
                        <span className="text-ink">{item.keyStandard}</span>
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
