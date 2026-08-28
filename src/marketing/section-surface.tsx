'use client';

import * as React from 'react';
import { cn, useUIVariant } from '@olwiba/cn';

/**
 * How a marketing section sits on the page.
 *
 * Every section used to hard-code the same island — an opaque `bg-card` panel
 * with a border and a radius — which is right for a page that is only its
 * sections, and wrong for one with an ambient background behind it: a run of
 * opaque slabs blocks the thing that makes the page feel alive.
 *
 * - `'card'` — the opaque island. Contained, high contrast, reads as a panel.
 * - `'soft'` — translucent and blurred. Still a shape, but the page behind it
 *   shows through, which is the treatment that works over an aura or gradient.
 * - `'plain'` — no panel at all. The content sits directly on the page.
 *
 * `'card'` stays the default so nothing changes for a page that never sets it.
 */
export type MarketingSurface = 'card' | 'soft' | 'plain';

const MarketingSurfaceContext = React.createContext<MarketingSurface | undefined>(undefined);

/**
 * Sets the default surface for every marketing section beneath it.
 *
 * Page-level rather than per-section because "this page has an ambient
 * background, so its sections should not be opaque" is one decision, and making
 * it once beats repeating it on every section and having a new section silently
 * default back to an island.
 */
export function MarketingSurfaceProvider({
  surface,
  children,
}: {
  surface: MarketingSurface | undefined;
  children: React.ReactNode;
}) {
  return (
    <MarketingSurfaceContext.Provider value={surface}>{children}</MarketingSurfaceContext.Provider>
  );
}

export function useMarketingSurface(): MarketingSurface | undefined {
  return React.useContext(MarketingSurfaceContext);
}

/**
 * The section wrapper's classes for the resolved surface and UI mode.
 *
 * `overflow-hidden` is unconditional on every surface, including `'plain'` —
 * the marquee and carousel sections clip their own content against it, so
 * dropping it with the panel would let them bleed across the page.
 *
 * Resolution order is prop, then `MarketingSurfaceProvider`, then `'card'`.
 * Both context reads happen every render rather than short-circuiting on the
 * prop: `modeProp ?? useHook()` skips a hook call and changes hook order
 * between renders, which is the exact bug @olwiba/cn 0.1.28 and 0.1.30 fixed in
 * `Toaster` and `Input`.
 *
 * Only `smooth`, `playful` and unset are branched on. olwibaCN's source has a
 * fourth `glass` variant, but the published `UIVariant` type does not carry it
 * yet, so a branch for it does not typecheck here.
 */
export function useSectionSurface(override?: MarketingSurface): string {
  const mode = useUIVariant();
  const contextSurface = useMarketingSurface();
  const surface = override ?? contextSurface ?? 'card';

  if (surface === 'plain') return 'overflow-hidden';

  if (surface === 'soft') {
    return cn(
      'overflow-hidden border backdrop-blur-md',
      mode === 'smooth' && 'rounded-[2rem] border-border/40 bg-card/40',
      mode === 'playful' && 'rounded-3xl border-primary/20 bg-card/50',
      !mode && 'rounded-3xl border-border/50 bg-card/45',
    );
  }

  return cn(
    'overflow-hidden bg-card',
    mode === 'smooth' && 'rounded-3xl border',
    mode === 'playful' && 'rounded-2xl border-primary/25 border',
    !mode && 'rounded-2xl border',
  );
}
