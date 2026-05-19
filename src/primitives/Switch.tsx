'use client';

import * as React from 'react';
import { Switch as CNSwitch, type SwitchProps as CNSwitchProps } from '@olwiba/cn';

export type SwitchProps = CNSwitchProps & {
  mode?: 'default' | 'playful' | 'smooth';
};

export const Switch = React.forwardRef<
  React.ElementRef<typeof CNSwitch>,
  SwitchProps
>(({ mode: _mode, ...props }, ref) => {
  return <CNSwitch {...props} ref={ref} />;
});
Switch.displayName = 'Switch';
