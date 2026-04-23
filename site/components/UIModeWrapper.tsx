'use client';

import * as React from 'react';
import { OlwibaUIProvider, type UIMode } from '@olwiba/ui';
import { getUIMode, subscribeUIMode } from '@olwiba/docs';
import { projectThemeStyleCss } from '~/project.config';

/**
 * Root-level provider that keeps OlwibaUIProvider in sync with the
 * ui-mode-store. Wrap the entire app body so every component — not just
 * demos — reacts to mode changes from the header dropdown.
 */
export function UIModeWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<UIMode>(() => getUIMode() as UIMode);

  React.useEffect(() => subscribeUIMode((m) => setMode(m as UIMode)), []);

  return (
    <>
      <style>{projectThemeStyleCss}</style>
      <OlwibaUIProvider mode={mode}>{children}</OlwibaUIProvider>
    </>
  );
}
