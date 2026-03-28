'use client';

import * as React from 'react';
import { Checkbox as CNCheckbox, type CheckboxProps as CNCheckboxProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type CheckboxProps = CNCheckboxProps;

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CNCheckbox>,
  CheckboxProps
>(({ mode, ...props }, ref) => {
  const ctxMode = useUIMode();
  const resolvedMode = mode ?? (ctxMode !== 'default' ? (ctxMode as "playful" | "smooth") : undefined);
  return <CNCheckbox mode={resolvedMode} {...props} ref={ref} />;
});
Checkbox.displayName = 'Checkbox';
