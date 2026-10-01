'use client';

import * as React from 'react';

export type ProgressiveRevealState = 'static' | 'hidden' | 'revealed';

interface ProgressiveRevealOptions {
  enabled?: boolean;
  once?: boolean;
  threshold?: number;
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/**
 * Adds scroll reveal as a progressive enhancement.
 *
 * The server and first client render are always visible. After hydration, an
 * element is prepared for reveal only when it is still fully below the
 * viewport, so content that a person may already have seen never disappears.
 * Reduced-motion and data-saver users keep the static rendering.
 */
export function useProgressiveReveal<T extends Element>({
  enabled = true,
  once = true,
  threshold = 0.1,
}: ProgressiveRevealOptions = {}): [React.RefObject<T | null>, ProgressiveRevealState] {
  const ref = React.useRef<T>(null);
  const [state, setState] = React.useState<ProgressiveRevealState>('static');

  React.useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) {
      setState('static');
      return;
    }

    const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;

    if (
      motionPreference?.matches ||
      saveData ||
      typeof window.IntersectionObserver !== 'function'
    ) {
      setState('static');
      return;
    }

    // Never hide something that could already have painted in the viewport.
    // Only untouched, fully off-screen content is eligible for scroll reveal.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setState('static');
      return;
    }

    setState('hidden');

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState('revealed');
          if (once) observer.disconnect();
        } else if (!once) {
          setState('hidden');
        }
      },
      { threshold },
    );

    const showWithoutMotion = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      setState('static');
      observer.disconnect();
    };

    motionPreference?.addEventListener?.('change', showWithoutMotion);
    observer.observe(element);

    return () => {
      motionPreference?.removeEventListener?.('change', showWithoutMotion);
      observer.disconnect();
    };
  }, [enabled, once, threshold]);

  return [ref, state];
}
