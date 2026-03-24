'use client';

import * as React from 'react';
import {
  Card as CNCard, type CardProps as CNCardProps,
  CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type CardProps = CNCardProps;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ playful, smooth, ...props }, ref) => {
    const mode = useUIMode();
    return (
      <CNCard
        playful={playful ?? mode === 'playful'}
        smooth={smooth ?? mode === 'smooth'}
        {...props}
        ref={ref}
      />
    );
  }
);
Card.displayName = 'Card';

// Sub-components are pass-throughs — no mode logic needed.
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
