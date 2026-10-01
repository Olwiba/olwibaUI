'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'fade' | 'slide-up' | 'slide-down';
  duration?: number;
  children: React.ReactNode;
}

export function PageTransition({
  variant = 'fade',
  duration = 300,
  children,
  className,
  style,
  ...props
}: PageTransitionProps) {
  const variantClass =
    variant === 'slide-up'
      ? 'motion-safe:slide-in-from-bottom-4'
      : variant === 'slide-down'
        ? 'motion-safe:slide-in-from-top-4'
        : undefined;

  return (
    <div
      className={cn(
        'motion-safe:animate-in motion-safe:fade-in motion-reduce:animate-none',
        variantClass,
        className,
      )}
      style={{
        animationDuration: `${duration}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
