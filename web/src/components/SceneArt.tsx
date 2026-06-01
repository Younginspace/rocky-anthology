import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A picture-book illustration with a soft GSAP entrance: a gentle fade + scale
 * settle, optionally followed by a slow "breathing" ken-burns drift. Honors
 * prefers-reduced-motion (renders the still image with no motion).
 */
export function SceneArt({
  src,
  className = '',
  loop = false,
}: {
  src: string;
  className?: string;
  loop?: boolean;
}) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.08, transformOrigin: '50% 38%' },
        {
          opacity: 1,
          scale: 1,
          duration: 1.3,
          ease: 'power2.out',
          onComplete: loop
            ? () => gsap.to(el, { scale: 1.07, duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1 })
            : undefined,
        },
      );
    });
    return () => ctx.revert();
  }, [src, loop]);

  return <img ref={ref} className={`scene-art ${className}`} src={src} alt="" style={{ opacity: 0 }} />;
}
