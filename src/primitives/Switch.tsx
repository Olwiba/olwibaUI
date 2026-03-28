'use client';

import * as React from 'react';
import { Switch as CNSwitch, type SwitchProps as CNSwitchProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type SwitchProps = CNSwitchProps;

export const Switch = React.forwardRef<
  React.ElementRef<typeof CNSwitch>,
  SwitchProps
>(({ mode, ...props }, ref) => {
  const ctxMode = useUIMode();
  // Switch only supports playful — smooth is not applicable
  const resolvedMode = mode ?? (ctxMode === 'playful' ? 'playful' : undefined);
  return <CNSwitch mode={resolvedMode} {...props} ref={ref} />;
});
Switch.displayName = 'Switch';
