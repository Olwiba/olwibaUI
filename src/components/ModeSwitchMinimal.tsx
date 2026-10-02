'use client';

import { ModeSwitchMinimal as ModeSwitchMinimalBase } from '@olwiba/cn';
import { useOlwibaUI, type UIMode } from '../context/OlwibaUIContext';

/**
 * The shared mode switch from @olwiba/cn, bound to this package's provider.
 *
 * The button itself moved to CN so the docs sites, which keep the mode in a
 * store of their own, can use the same control.
 */
export function ModeSwitchMinimal() {
  const { mode, setMode } = useOlwibaUI();
  return <ModeSwitchMinimalBase mode={mode} onModeChange={(next) => setMode(next as UIMode)} />;
}
