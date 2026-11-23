import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { BreadcrumbItem } from '../utils/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t, isUrdu, localizeCountry } = useLanguage();

  const localizeCrumb = (name: string): string => {
    if (!isUrdu) return name;
    const map: Record<string, string> = {
      Home: t.common.home,
      Visas: t.common.visas,
      'Schengen Appointments': t.footer.schengenAppointments,
      'Travel Insurance': t.footer.travelInsurance,
      About: t.common.about,
      Contact: t.common.contact,
      'Privacy Policy': t.footer.privacyPolicy,
      'Terms of Service': t.footer.termsOfService,
    };
    return map[name] ?? localizeCountry(name);
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted ${
          isUrdu ? 'font-medium' : 'font-mono tracking-[0.08em] uppercase'
        }`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const displayName = localizeCrumb(item.name);
          return (
            <li key={item.path} className="inline-flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-ink font-medium">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-ink underline-offset-4 hover:underline"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
