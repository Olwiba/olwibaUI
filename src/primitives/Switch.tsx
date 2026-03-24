'use client';

import * as React from 'react';
import { Switch as CNSwitch, type SwitchProps as CNSwitchProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type SwitchProps = CNSwitchProps;

export const Switch = React.forwardRef<
  React.ElementRef<typeof CNSwitch>,
  SwitchProps
>(({ playful, ...props }, ref) => {
  const mode = useUIMode();
  return (
    <CNSwitch
      playful={playful ?? mode === 'playful'}
      {...props}
      ref={ref}
    />
  );
});
Switch.displayName = 'Switch';
