'use client';

import * as React from 'react';
import { useIsMobile } from '@olwiba/cn';

interface OlwibaUIContextValue {
  isMobile: boolean;
}

const OlwibaUIContext = React.createContext<OlwibaUIContextValue>({
  isMobile: false,
});

export interface OlwibaUIProviderProps {
  children: React.ReactNode;
  /**
   * Override the mobile detection. If omitted, uses useIsMobile() from @olwiba/cn
   * which detects based on a 768px viewport breakpoint.
   */
  isMobile?: boolean;
}

export function OlwibaUIProvider({ children, isMobile: isMobileProp }: OlwibaUIProviderProps) {
  const detectedMobile = useIsMobile();
  const isMobile = isMobileProp ?? detectedMobile;

  return (
    <OlwibaUIContext.Provider value={{ isMobile }}>
      {children}
    </OlwibaUIContext.Provider>
  );
}

export function useOlwibaUI() {
  return React.useContext(OlwibaUIContext);
}
