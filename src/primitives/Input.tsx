'use client';

import * as React from 'react';
import { Input as CNInput, type InputProps as CNInputProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type InputProps = CNInputProps;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ mode, ...props }, ref) => {
    const ctxMode = useUIMode();
    const resolvedMode = mode ?? (ctxMode !== 'default' ? (ctxMode as "playful" | "smooth") : undefined);
    return <CNInput mode={resolvedMode} {...props} ref={ref} />;
  }
);
Input.displayName = 'Input';
