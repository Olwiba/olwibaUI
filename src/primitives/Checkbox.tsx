'use client';

import * as React from 'react';
import { Checkbox as CNCheckbox, type CheckboxProps as CNCheckboxProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type CheckboxProps = CNCheckboxProps;

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CNCheckbox>,
  CheckboxProps
>(({ playful, smooth, ...props }, ref) => {
  const mode = useUIMode();
  return (
    <CNCheckbox
      playful={playful ?? mode === 'playful'}
      smooth={smooth ?? mode === 'smooth'}
      {...props}
      ref={ref}
    />
  );
});
Checkbox.displayName = 'Checkbox';
