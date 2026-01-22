import * as React from 'react';
import { cn } from '../lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'size-4 border-2',
    md: 'size-6 border-2',
    lg: 'size-8 border-3',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-muted-foreground/20 border-t-muted-foreground',
        sizeClasses[size],
        className
      )}
    />
  );
}

interface FullPageSpinnerProps {
  message?: string;
}

export function FullPageSpinner({ message }: FullPageSpinnerProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      {message && <p className="text-muted-foreground text-sm">{message}</p>}
    </div>
  );
}
