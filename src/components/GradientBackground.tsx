'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'mesh' | 'radial' | 'aurora';
  animated?: boolean;
}

export function GradientBackground({
  variant = 'mesh',
  animated = true,
  className,
  children,
  ...props
}: GradientBackgroundProps) {
  const gradients: Record<string, string> = {
    mesh: [
      'radial-gradient(at 20% 20%, hsl(var(--primary) / 0.3) 0px, transparent 50%)',
      'radial-gradient(at 80% 10%, hsl(var(--chart-2) / 0.2) 0px, transparent 50%)',
      'radial-gradient(at 10% 80%, hsl(var(--chart-3) / 0.2) 0px, transparent 50%)',
      'radial-gradient(at 90% 90%, hsl(var(--chart-4) / 0.2) 0px, transparent 50%)',
    ].join(', '),
    radial: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
    aurora: [
      'radial-gradient(at 30% 50%, hsl(var(--primary) / 0.4) 0px, transparent 50%)',
      'radial-gradient(at 70% 30%, hsl(var(--chart-2) / 0.3) 0px, transparent 50%)',
      'radial-gradient(at 50% 80%, hsl(var(--chart-3) / 0.25) 0px, transparent 40%)',
    ].join(', '),
  };

  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          animated && 'animate-[gradient_8s_ease_infinite]',
        )}
        style={{ backgroundImage: gradients[variant] }}
      />
      {children}
    </div>
  );
}
