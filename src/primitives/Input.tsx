'use client';

import * as React from 'react';
import { Input as CNInput, type InputProps as CNInputProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type InputProps = CNInputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ playful, smooth, ...props }, ref) => {
    const mode = useUIMode();
    return (
      <CNInput
        playful={playful ?? mode === 'playful'}
        smooth={smooth ?? mode === 'smooth'}
        {...props}
        ref={ref}
      />
    );
  }
);
Input.displayName = 'Input';
