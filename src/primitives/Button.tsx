'use client';

import * as React from 'react';
import { Button as CNButton, type ButtonProps as CNButtonProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type ButtonProps = CNButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ mode, ...props }, ref) => {
    const ctxMode = useUIMode();
    const resolvedMode = mode ?? (ctxMode !== 'default' ? (ctxMode as "playful" | "smooth") : undefined);
    return <CNButton mode={resolvedMode} {...props} ref={ref} />;
  }
);
Button.displayName = 'Button';
