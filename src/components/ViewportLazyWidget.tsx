import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

interface ViewportLazyWidgetProps {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  buttonLabel?: string;
  minHeightClass?: string;
  eagerMatchSearch?: string;
  children: () => ReactNode;
}

/**
 * Renders a lightweight, SEO-friendly HTML landmark during SSR and initial paint,
 * deferring heavy interactive React bundles until the user scrolls near the widget,
 * navigates to its hash anchor, matches an optional URL query, or clicks to open it.
 */
export function ViewportLazyWidget({
  id,
  eyebrow,
  heading,
  description,
  buttonLabel = 'Open Interactive Tool',
  minHeightClass = 'min-h-[240px]',
  eagerMatchSearch,
  children,
}: ViewportLazyWidgetProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldLoad || typeof window === 'undefined') return undefined;

    const hashMatches = () => window.location.hash === `#${id}`;
    const searchMatches =
      Boolean(eagerMatchSearch) && window.location.search.includes(eagerMatchSearch!);

    if (hashMatches() || searchMatches || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return undefined;
    }

    const onHashChange = () => {
      if (hashMatches()) {
        setShouldLoad(true);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    const node = containerRef.current;
    let observer: IntersectionObserver | null = null;
    if (node) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setShouldLoad(true);
            observer?.disconnect();
          }
        },
        { rootMargin: '300px 0px', threshold: 0.01 },
      );
      observer.observe(node);
    }

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      observer?.disconnect();
    };
  }, [shouldLoad, id, eagerMatchSearch]);

  const shell = (
    <section
      id={id}
      className={`paper-card-texture border border-ink/75 rounded-[3px] p-6 sm:p-8 scroll-mt-24 flex flex-col justify-between gap-5 ${minHeightClass}`}
    >
      <div className="max-w-2xl">
        <p className="mono-label text-ink-muted">{eyebrow}</p>
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2">
          {heading}
        </h3>
        <p className="mt-2.5 text-sm sm:text-[15px] text-ink-body leading-relaxed">
          {description}
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-xs font-mono uppercase tracking-[0.1em] rounded-[2px] hover:bg-visa-green-dark transition-colors cursor-pointer"
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );

  return (
    <div ref={containerRef}>
      {!shouldLoad ? (
        shell
      ) : (
        <Suspense
          fallback={
            <div className={`paper-card-texture border border-rule rounded-[3px] p-6 sm:p-8 flex items-center justify-center text-sm font-mono text-ink-muted ${minHeightClass}`}>
              Loading {heading}…
            </div>
          }
        >
          {children()}
        </Suspense>
      )}
    </div>
  );
}
