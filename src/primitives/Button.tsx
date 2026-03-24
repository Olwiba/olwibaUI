'use client';

import * as React from 'react';
import { Button as CNButton, type ButtonProps as CNButtonProps } from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type ButtonProps = CNButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ playful, smooth, ...props }, ref) => {
    const mode = useUIMode();
    return (
      <CNButton
        playful={playful ?? mode === 'playful'}
        smooth={smooth ?? mode === 'smooth'}
        {...props}
        ref={ref}
      />
    );
  }
);
Button.displayName = 'Button';
