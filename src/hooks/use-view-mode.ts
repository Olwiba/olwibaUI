'use client';

import { useLocalStorage } from './use-local-storage';
import { useMounted } from './use-mounted';

export type ViewMode = 'cards' | 'list';

export interface UseViewModeReturn {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  /**
   * False until the stored preference is readable. Render a skeleton or hold
   * the section until this is true — see the note below on why.
   */
  ready: boolean;
}

/**
 * Remembered cards/list preference.
 *
 * Returns the fallback on the server and on the first client render, then
 * settles to the stored value once mounted. Returning the stored value
 * immediately would have the server emit card markup while the client builds
 * a table — a hydration mismatch — and painting the fallback first flashes
 * the wrong view at someone who chose the other one. `ready` lets callers
 * wait for the real answer instead of doing either.
 *
 * The key is shared by default so the choice reads as one product-wide
 * preference: pick list on one page and every page follows. Pass a distinct
 * key where a page genuinely wants its own.
 */
export function useViewMode(key = 'view-mode', fallback: ViewMode = 'cards'): UseViewModeReturn {
  const [stored, setStored] = useLocalStorage<ViewMode>(key, fallback);
  const mounted = useMounted();
  return { view: mounted ? stored : fallback, setView: setStored, ready: mounted };
}
