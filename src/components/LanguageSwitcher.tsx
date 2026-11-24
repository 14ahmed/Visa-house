import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LOCALE_METADATA, type Locale } from '../utils/i18n';

export interface LanguageSwitcherProps {
  /** Compact mode fits cleanly inside the top navigation bar; full mode displays full language names (e.g. footer / mobile drawer). */
  variant?: 'compact' | 'full';
  className?: string;
}

const LOCALE_ORDER: readonly Locale[] = ['en', 'ur'];

/**
 * Tactile archival segmented language switcher for toggling between
 * English (LTR) and Urdu (RTL) across all Visahouse pages and tools.
 */
export function LanguageSwitcher({
  variant = 'compact',
  className = '',
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.common.languageSwitcherLabel}
      data-testid={variant === 'compact' ? 'language-switcher' : 'language-switcher-full'}
      data-active-locale={locale}
      dir="ltr"
      className={`no-print inline-flex items-center border border-ink/55 bg-slip rounded-[2px] p-0.5 shrink-0 ${className}`.trim()}
    >
      {variant === 'full' && (
        <span
          className="inline-flex items-center gap-1.5 px-2.5 text-[11px] font-mono uppercase tracking-[0.1em] text-ink-muted shrink-0"
          aria-hidden="true"
        >
          <Languages className="h-3.5 w-3.5 text-visa-green" />
        </span>
      )}
      {LOCALE_ORDER.map((itemLocale) => {
        const meta = LOCALE_METADATA[itemLocale];
        const active = locale === itemLocale;
        const isUrduBtn = itemLocale === 'ur';
        const label = variant === 'full' ? meta.nativeLabel : meta.shortCode;

        return (
          <button
            key={itemLocale}
            type="button"
            lang={meta.htmlLang}
            aria-pressed={active}
            aria-label={
              itemLocale === 'en'
                ? `${label} — Switch language to English`
                : `${label} — زبان اردو میں تبدیل کریں`
            }
            onClick={() => setLocale(itemLocale)}
            className={`inline-flex items-center justify-center rounded-[1px] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-visa-green ${
              variant === 'compact' ? 'min-h-[34px] px-2.5 py-1' : 'min-h-[38px] px-3.5 py-1.5'
            } ${
              isUrduBtn
                ? 'text-[13px] font-medium leading-none tracking-normal'
                : 'font-mono text-[11px] font-medium uppercase tracking-[0.08em]'
            } ${
              active
                ? 'bg-visa-green text-slip'
                : 'text-ink-body hover:text-ink hover:bg-paper-deep/70'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
