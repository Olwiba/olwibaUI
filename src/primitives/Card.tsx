'use client';

import * as React from 'react';
import {
  Card as CNCard, type CardProps as CNCardProps,
  CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

export type CardProps = CNCardProps;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ mode, ...props }, ref) => {
    const ctxMode = useUIMode();
    const resolvedMode = mode ?? (ctxMode !== 'default' ? (ctxMode as "playful" | "smooth") : undefined);
    return <CNCard mode={resolvedMode} {...props} ref={ref} />;
  }
);
Card.displayName = 'Card';

// Sub-components are pass-throughs — no mode logic needed.
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
