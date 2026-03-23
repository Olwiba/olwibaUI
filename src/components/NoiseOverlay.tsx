'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface NoiseOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
}

export function NoiseOverlay({ opacity = 0.04, blendMode = 'overlay', className, style, ...props }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        opacity,
        mixBlendMode: blendMode,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        ...style,
      }}
      {...props}
    />
  );
}
