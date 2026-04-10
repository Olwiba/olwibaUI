'use client';

import * as React from 'react';
import { useIsMobile, UIVariantProvider, type UIVariant } from '@olwiba/cn';

export type UIMode = 'default' | 'playful' | 'smooth';

interface OlwibaUIContextValue {
  isMobile: boolean;
  mode: UIMode;
}

const OlwibaUIContext = React.createContext<OlwibaUIContextValue>({
  isMobile: false,
  mode: 'default',
});

export interface OlwibaUIProviderProps {
  children: React.ReactNode;
  /**
   * Override the mobile detection. If omitted, uses useIsMobile() from @olwiba/cn
   * which detects based on a 768px viewport breakpoint.
   */
  isMobile?: boolean;
  /**
   * Global component mode. Primitives imported from @olwiba/ui will automatically
   * apply this mode unless overridden at the component level.
   *
   * - `'default'`  — standard square shadcn/Radix appearance
   * - `'playful'`  — slight rotation + offset drop shadow backdrop
   * - `'smooth'`   — softer, larger border-radius across all components
   */
  mode?: UIMode;
}

export function OlwibaUIProvider({ children, isMobile: isMobileProp, mode = 'default' }: OlwibaUIProviderProps) {
  const detectedMobile = useIsMobile();
  const isMobile = isMobileProp ?? detectedMobile;

  const variant = mode !== 'default' ? (mode as UIVariant) : undefined;

  return (
    <OlwibaUIContext.Provider value={{ isMobile, mode }}>
      <UIVariantProvider mode={variant}>
        {children}
      </UIVariantProvider>
    </OlwibaUIContext.Provider>
  );
}

export function useOlwibaUI() {
  return React.useContext(OlwibaUIContext);
}

/** Returns just the current UI mode from context. */
export function useUIMode(): UIMode {
  return React.useContext(OlwibaUIContext).mode;
}
