'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { useUIMode, type UIMode } from '../context/OlwibaUIContext';

/**
 * A transition is pure data: two layers, each with a start and an end style.
 * Adding an effect means adding an entry to {@link EFFECTS} — the component
 * itself never learns what "roll" means. Consumers can pass a spec object
 * directly for anything not in the set.
 */
export interface AnimatedSwapSpec {
  /** Hide overflow on the container. Required by effects that travel further than they fade. */
  clip: boolean;
  duration: number;
  easing: string;
  /** The incoming layer: where it starts, where it lands. */
  enter: { from: React.CSSProperties; to: React.CSSProperties };
  /** The outgoing layer: where it starts, where it leaves. */
  exit: { from: React.CSSProperties; to: React.CSSProperties };
}

export type AnimatedSwapEffect = 'roll' | 'fade' | 'slide' | 'none';

const EFFECTS: Record<Exclude<AnimatedSwapEffect, 'none'>, AnimatedSwapSpec> = {
  // Odometer. No opacity at all — the two values are solid and one physically
  // displaces the other, which is what makes it read as a mechanism rather
  // than a crossfade. Needs `clip`, or the departing value is legible above
  // the container the whole way out.
  roll: {
    clip: true,
    duration: 320,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    enter: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
    exit: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-100%)' } },
  },
  // The neutral one. No movement, so it never fights a layout that's also
  // reflowing around it.
  fade: {
    clip: false,
    duration: 220,
    easing: 'ease',
    enter: { from: { opacity: 0 }, to: { opacity: 1 } },
    exit: { from: { opacity: 1 }, to: { opacity: 0 } },
  },
  // Horizontal, and short: 0.75rem of travel carried by opacity, so it needs
  // no clipping and won't crop a ring or drop shadow on whatever it wraps.
  slide: {
    clip: false,
    duration: 280,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    enter: {
      from: { opacity: 0, transform: 'translateX(0.75rem)' },
      to: { opacity: 1, transform: 'translateX(0)' },
    },
    exit: {
      from: { opacity: 1, transform: 'translateX(0)' },
      to: { opacity: 0, transform: 'translateX(-0.75rem)' },
    },
  },
};

/** Mode picks the effect when the caller doesn't. An explicit `effect` always wins. */
const MODE_EFFECT: Record<UIMode, AnimatedSwapEffect> = {
  default: 'fade',
  playful: 'roll',
  smooth: 'slide',
};

export interface AnimatedSwapProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Changing this is the swap. Nothing else triggers one — the component
   * can't see inside `children`, so re-rendering with different content under
   * the same key updates in place with no animation.
   */
  swapKey: React.Key;
  /** Named effect, or a spec of your own. Defaults from the current UI mode. */
  effect?: AnimatedSwapEffect | AnimatedSwapSpec;
  /** Override the effect's duration, in ms. */
  duration?: number;
  children: React.ReactNode;
}

/**
 * Animates the replacement of arbitrary content when `swapKey` changes: a
 * price when the billing cadence toggles, a chart when the range changes, a
 * status pill when a job finishes.
 *
 * Both versions are mounted for the length of the transition. The incoming
 * one stays in normal flow so the container sizes to it immediately; the
 * outgoing one is lifted out of flow and overlaid, so content below settles
 * once, at the start, under cover of the animation — rather than snapping
 * when the old copy unmounts.
 *
 * CSS transitions only: no keyframes to register in a consumer's Tailwind
 * config, and no motion library.
 */
export function AnimatedSwap({
  swapKey,
  effect,
  duration,
  children,
  className,
  style,
  ...props
}: AnimatedSwapProps) {
  const mode = useUIMode();
  const resolved = effect ?? MODE_EFFECT[mode];
  const spec = typeof resolved !== 'string' ? resolved : resolved === 'none' ? null : EFFECTS[resolved];
  const ms = duration ?? spec?.duration ?? 0;

  const reduced = usePrefersReducedMotion();
  const animated = spec !== null && !reduced;

  // What was on screen last commit. Read during the render that notices the
  // key changed — by then `children` is already the new content, so the
  // outgoing copy can only come from here.
  const previous = React.useRef(children);
  const seenKey = React.useRef(swapKey);

  const [swap, setSwap] = React.useState<{ key: React.Key; out: React.ReactNode; running: boolean } | null>(null);

  if (seenKey.current !== swapKey) {
    const out = previous.current;
    seenKey.current = swapKey;
    if (animated) setSwap({ key: swapKey, out, running: false });
  }

  React.useEffect(() => {
    previous.current = children;
  });

  // Mount the incoming layer at its start style first, then flip on the next
  // frame. Committing both in one pass gives the browser no start value to
  // transition from and the swap just snaps.
  React.useEffect(() => {
    if (!swap || swap.running) return;
    const raf = requestAnimationFrame(() => {
      setSwap((s) => (s && s.key === swap.key ? { ...s, running: true } : s));
    });
    return () => cancelAnimationFrame(raf);
  }, [swap]);

  // Timer rather than onTransitionEnd: an effect may animate a property the
  // wrapped node also transitions on its own, and there's no reliable single
  // event marking the end of both layers.
  React.useEffect(() => {
    if (!swap?.running) return;
    const done = setTimeout(() => {
      setSwap((s) => (s && s.key === swap.key ? null : s));
    }, ms);
    return () => clearTimeout(done);
  }, [swap, ms]);

  const phase = (layer: 'enter' | 'exit'): React.CSSProperties | undefined => {
    if (!swap || !spec) return undefined;
    return {
      ...spec[layer][swap.running ? 'to' : 'from'],
      transition: `transform ${ms}ms ${spec.easing}, opacity ${ms}ms ${spec.easing}`,
    };
  };

  return (
    <span
      className={cn('relative inline-block', swap && spec?.clip && 'overflow-hidden', className)}
      style={style}
      {...props}
    >
      <span className="block" style={phase('enter')}>
        {children}
      </span>
      {swap && (
        // Pinned rather than inset-0: stretching the outgoing copy to the
        // incoming one's box would resize it mid-exit.
        <span className="absolute left-0 top-0 block" aria-hidden="true" style={phase('exit')}>
          {swap.out}
        </span>
      )}
    </span>
  );
}

function usePrefersReducedMotion() {
  // Not read during render on the server: the query is unknowable there, and
  // guessing either way produces a hydration mismatch. Every swap happens
  // after mount, by which point this is settled.
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return;
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
