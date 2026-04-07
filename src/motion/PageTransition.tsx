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
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const initial: React.CSSProperties =
    variant === 'slide-up'
      ? { opacity: 0, transform: 'translateY(16px)' }
      : variant === 'slide-down'
        ? { opacity: 0, transform: 'translateY(-16px)' }
        : { opacity: 0 };

  const entered: React.CSSProperties = { opacity: 1, transform: 'translateY(0)' };

  return (
    <div
      className={cn(className)}
      style={{
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        ...(mounted ? entered : initial),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
