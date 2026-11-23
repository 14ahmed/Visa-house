import { lazy, Suspense, useEffect, useState, type ComponentProps } from 'react';
import type { InteractiveVisaGlobe as InteractiveVisaGlobeType } from './InteractiveVisaGlobe';

const LazyGlobe = lazy(() =>
  import('./InteractiveVisaGlobe').then((mod) => ({ default: mod.InteractiveVisaGlobe })),
);

type GlobeProps = ComponentProps<typeof InteractiveVisaGlobeType>;

function GlobeFallback({ id = 'interactive-globe' }: { id?: string }) {
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
      <div className="mt-6 min-h-[380px] rounded-[2px] border border-rule bg-paper/70 flex items-center justify-center text-sm text-ink-muted">
        Loading interactive 3D visa globe…
      </div>
    </section>
  );
}

/**
 * Code-splits the heavy D3 + TopoJSON + World Atlas 3D globe into an async client chunk
 * while keeping SSR prerendering fast and synchronous.
 */
export function LazyInteractiveVisaGlobe(props: GlobeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GlobeFallback id={props.id} />;
  }

  return (
    <Suspense fallback={<GlobeFallback id={props.id} />}>
      <LazyGlobe {...props} />
    </Suspense>
  );
}
