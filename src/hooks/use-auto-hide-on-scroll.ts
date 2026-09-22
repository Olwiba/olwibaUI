'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

export interface AutoHideOnScrollOptions {
  /**
   * Movement required before the state flips, in px.
   *
   * Without it, momentum scrolling and trackpad jitter cross zero constantly
   * and the header strobes. Small enough to feel immediate, large enough that
   * an accidental nudge is not a direction change.
   */
  threshold?: number;
  /**
   * Distance from the top inside which the header is always shown, in px.
   *
   * A header that stays hidden at scroll position 0 looks broken, and rubber
   * banding on iOS can report a scroll-down while bouncing back at the top.
   */
  revealNearTopPx?: number;
  /** Escape hatch for consumers that want the header always visible. */
  enabled?: boolean;
}

/**
 * Hide app chrome while scrolling down, bring it straight back on any scroll up.
 *
 * The rule is direction, not depth: however far down the page you are, one
 * upward gesture should return the header. Anything keyed to position instead
 * makes the user scroll all the way back up to reach navigation, which is the
 * behaviour this replaces.
 *
 * Takes the scrolling element rather than reading `window`, because in a
 * sidebar shell the page does not scroll — an inset pane does, and window
 * scroll events never fire.
 */
export function useAutoHideOnScroll(
  ref: RefObject<HTMLElement | null>,
  { threshold = 8, revealNearTopPx = 64, enabled = true }: AutoHideOnScrollOptions = {},
): boolean {
  const [hidden, setHidden] = useState(false);
  // Refs, not state: these update on every scroll frame and must not re-render.
  const lastY = useRef(0);
  const lastDirectionY = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) {
      setHidden(false);
      return;
    }

    lastY.current = element.scrollTop;
    lastDirectionY.current = element.scrollTop;

    const onScroll = () => {
      const y = element.scrollTop;

      if (y <= revealNearTopPx) {
        setHidden(false);
        lastY.current = y;
        lastDirectionY.current = y;
        return;
      }

      // Measured against the last point the direction actually changed, not
      // the previous frame. Frame-to-frame deltas are smaller than any useful
      // threshold, so a per-frame comparison either never fires or fires on
      // noise depending on where the number is set.
      const movedDown = y > lastY.current;
      const turned = movedDown !== y > lastDirectionY.current;
      if (turned) lastDirectionY.current = lastY.current;

      if (Math.abs(y - lastDirectionY.current) > threshold) {
        setHidden(movedDown);
        lastDirectionY.current = y;
      }

      lastY.current = y;
    };

    element.addEventListener('scroll', onScroll, { passive: true });
    return () => element.removeEventListener('scroll', onScroll);
  }, [ref, threshold, revealNearTopPx, enabled]);

  return hidden;
}
