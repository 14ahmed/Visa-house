import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { RegionId, VisaChannel } from '../data/types';
import type { VisaTypeId } from '../utils/checklistLibrary';
import {
  getLocaleMetadata,
  getTranslation,
  LOCALE_STORAGE_KEY,
  normalizeLocale,
  translateChannel,
  translateCountryName,
  translateRegion,
  translateVisaTypeLabel,
  type Locale,
  type LocaleMetadata,
  type TextDirection,
  type TranslationBundle,
} from '../utils/i18n';

interface LanguageContextValue {
  locale: Locale;
  dir: TextDirection;
  isUrdu: boolean;
  meta: LocaleMetadata;
  t: TranslationBundle;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  localizeCountry: (country: string) => string;
  localizeRegion: (region: RegionId | 'All') => string;
  localizeChannel: (channel: VisaChannel | 'All' | string) => string;
  localizeVisaType: (visaTypeId: VisaTypeId, fallbackEn: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveInitialLocale(defaultLocale: Locale = 'en'): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang) {
      return normalizeLocale(paramLang);
    }
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored) {
      return normalizeLocale(stored);
    }
  } catch {
    // Ignore storage/URL errors in restricted contexts
  }
  return defaultLocale;
}

export function LanguageProvider({
  children,
  initialLocale = 'en',
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(() => resolveInitialLocale(initialLocale));

  const setLocale = useCallback((next: Locale) => {
    const normalized = normalizeLocale(next);
    setLocaleState(normalized);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, normalized);
      } catch {
        // Ignore storage write errors
      }
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'ur' : 'en');
  }, [locale, setLocale]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const meta = getLocaleMetadata(locale);
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
    document.documentElement.dataset.locale = meta.locale;

    // Load Urdu web fonts on demand so English visitors avoid downloading them upfront
    if (locale === 'ur' && !document.getElementById('visahouse-urdu-fonts')) {
      const link = document.createElement('link');
      link.id = 'visahouse-urdu-fonts';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const meta = getLocaleMetadata(locale);
    return {
      locale,
      dir: meta.dir,
      isUrdu: locale === 'ur',
      meta,
      t: getTranslation(locale),
      setLocale,
      toggleLocale,
      localizeCountry: (country: string) => translateCountryName(country, locale),
      localizeRegion: (region: RegionId | 'All') => translateRegion(region, locale),
      localizeChannel: (channel: VisaChannel | 'All' | string) => translateChannel(channel, locale),
      localizeVisaType: (visaTypeId: VisaTypeId, fallbackEn: string) =>
        translateVisaTypeLabel(visaTypeId, fallbackEn, locale),
    };
  }, [locale, setLocale, toggleLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback for isolated tests or components mounted outside provider
    const meta = getLocaleMetadata('en');
    return {
      locale: 'en',
      dir: meta.dir,
      isUrdu: false,
      meta,
      t: getTranslation('en'),
      setLocale: () => {},
      toggleLocale: () => {},
      localizeCountry: (country: string) => country,
      localizeRegion: (region: RegionId | 'All') => region,
      localizeChannel: (channel: VisaChannel | 'All' | string) => channel,
      localizeVisaType: (_id: VisaTypeId, fallbackEn: string) => fallbackEn,
    };
  }
  return ctx;
}
