import { lazy, Suspense, useEffect, useRef, useState, type ComponentProps } from 'react';
import type { InteractiveVisaGlobe as InteractiveVisaGlobeType } from './InteractiveVisaGlobe';

const LazyGlobe = lazy(() =>
  import('./InteractiveVisaGlobe').then((mod) => ({ default: mod.InteractiveVisaGlobe })),
);

type GlobeProps = ComponentProps<typeof InteractiveVisaGlobeType>;

function GlobeFallback({
  id = 'visa-globe',
  onLoadNow,
}: {
  id?: string;
  onLoadNow?: () => void;
}) {
  return (
    <section
      id={id}
      aria-label="Interactive 3D World Visa Map"
      className="paper-card-texture border border-ink/75 rounded-[3px] p-6 sm:p-8 lg:p-10 scroll-mt-24"
    >
      <p className="mono-label text-visa-green">Interactive 3D World Visa Map</p>
      <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-2">
        Spin the 3D globe and click any highlighted country for its visa checklist
      </h2>
      <div className="mt-6 min-h-[380px] rounded-[2px] border border-rule bg-paper/70 flex flex-col items-center justify-center gap-3 px-4 text-center text-sm text-ink-muted">
        <p>Interactive 3D visa globe loads automatically when scrolled into view.</p>
        {onLoadNow && (
          <button
            type="button"
            onClick={onLoadNow}
            className="min-h-[44px] px-5 py-2.5 bg-visa-green text-slip text-xs font-mono uppercase tracking-[0.1em] rounded-[2px] hover:bg-visa-green-dark transition-colors cursor-pointer"
          >
            Load Interactive 3D Globe
          </button>
        )}
      </div>
    </section>
  );
}

/**
 * Code-splits the heavy D3 + TopoJSON + World Atlas 3D globe and defers both
 * chunk fetch and SVG projection until the section nears the viewport (or is requested).
 */
export function LazyInteractiveVisaGlobe(props: GlobeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldLoad || typeof window === 'undefined') return undefined;

    if (
      window.location.hash === `#${props.id ?? 'visa-globe'}` ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setShouldLoad(true);
      return undefined;
    }

    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px', threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad, props.id]);

  return (
    <div ref={containerRef}>
      {!shouldLoad ? (
        <GlobeFallback id={props.id} onLoadNow={() => setShouldLoad(true)} />
      ) : (
        <Suspense fallback={<GlobeFallback id={props.id} />}>
          <LazyGlobe {...props} />
        </Suspense>
      )}
    </div>
  );
}
