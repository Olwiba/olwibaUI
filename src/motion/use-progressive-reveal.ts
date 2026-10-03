'use client';

import * as React from 'react';

export type ProgressiveRevealState = 'static' | 'hidden' | 'revealed';

interface ProgressiveRevealOptions {
  enabled?: boolean;
  once?: boolean;
  /** Share of the element that must be on screen to reveal it. Default 0: the first pixel. */
  threshold?: number;
  /**
   * Milliseconds the reveal takes, delays included. Once it has run, the
   * element returns to `static`, so the caller can drop its transition and
   * transform and the browser stops compositing it as a moving layer.
   */
  settleAfter?: number;
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

/**
 * Root margin that treats everything above the viewport as already seen.
 *
 * A reveal fires on crossing into view, and a jump can carry the page past an
 * element without it ever crossing: back-navigation restoring a scroll
 * position, a fast fling on a phone, an anchor link. Without this, whatever
 * was jumped over stays invisible until the reader scrolls back up to it, and
 * then pops in. Content below the viewport still waits to be scrolled to.
 */
const ABOVE_COUNTS_AS_SEEN = '100000px 0px 0px 0px';

/**
 * Adds scroll reveal as a progressive enhancement.
 *
 * The server and first client render are always visible. After hydration, an
 * element is prepared for reveal only when it is still fully below the
 * viewport, so content that a person may already have seen never disappears.
 * Reduced-motion and data-saver users keep the static rendering.
 *
 * A reveal happens once and then gets out of the way: as soon as any of the
 * element is on screen (a tall block on a phone should not sit blank until a
 * tenth of it has scrolled in), and back to `static` when `settleAfter` has
 * passed. A page of finished reveals is then plain content, not dozens of
 * layers the browser keeps composited, which is what made long pages on
 * mobile Safari blank out blocks mid-scroll.
 */
export function useProgressiveReveal<T extends Element>({
  enabled = true,
  once = true,
  threshold = 0,
  settleAfter,
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

    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState('revealed');
          if (once) {
            observer.disconnect();
            if (settleAfter !== undefined) {
              settleTimer = setTimeout(() => setState('static'), settleAfter);
            }
          }
        } else if (!once) {
          setState('hidden');
        }
      },
      { threshold, rootMargin: once ? ABOVE_COUNTS_AS_SEEN : '0px' },
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
      clearTimeout(settleTimer);
    };
  }, [enabled, once, threshold, settleAfter]);

  return [ref, state];
}
