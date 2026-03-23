'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface GridPatternProps extends React.SVGAttributes<SVGElement> {
  variant?: 'dots' | 'lines' | 'cross';
  size?: number;
  className?: string;
}

export function GridPattern({ variant = 'dots', size = 24, className, ...props }: GridPatternProps) {
  const id = React.useId();

  const pattern =
    variant === 'dots' ? (
      <circle cx={size / 2} cy={size / 2} r={1} fill="currentColor" />
    ) : variant === 'lines' ? (
      <>
        <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="currentColor" strokeWidth={0.5} />
      </>
    ) : (
      <>
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="currentColor" strokeWidth={0.5} />
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="currentColor" strokeWidth={0.5} />
      </>
    );

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full text-border', className)}
      {...props}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          {pattern}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
