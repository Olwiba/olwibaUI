'use client';

import * as React from 'react';
import { Textarea as CNTextarea, type TextareaProps as CNTextareaProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type TextareaProps = CNTextareaProps;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ mode, ...props }, ref) => {
    const ctxMode = useUIMode();
    const resolvedMode = mode ?? (ctxMode !== 'default' ? (ctxMode as "playful" | "smooth") : undefined);
    return <CNTextarea mode={resolvedMode} {...props} ref={ref} />;
  }
);
Textarea.displayName = 'Textarea';
