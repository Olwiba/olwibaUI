'use client';

import * as React from 'react';
import { Textarea as CNTextarea, type TextareaProps as CNTextareaProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type TextareaProps = CNTextareaProps;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ playful, smooth, ...props }, ref) => {
    const mode = useUIMode();
    return (
      <CNTextarea
        playful={playful ?? mode === 'playful'}
        smooth={smooth ?? mode === 'smooth'}
        {...props}
        ref={ref}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
