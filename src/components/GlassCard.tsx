'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const blurClass = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
};

export function GlassCard({ blur = 'md', className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/20 bg-background/50 shadow-sm',
        blurClass[blur],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
