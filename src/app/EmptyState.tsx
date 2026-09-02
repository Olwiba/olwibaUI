'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@olwiba/cn';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  /** Adds the application-card surface used for route-level empty states. */
  variant?: 'plain' | 'card';
  /** Reduces the card presentation's minimum height and padding. */
  compact?: boolean;
  /** Fills a flex-sized parent rather than using a fixed minimum height. */
  fill?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  eyebrow,
  action,
  secondaryAction,
  variant = 'plain',
  compact = false,
  fill = false,
  className,
  ...props
}: EmptyStateProps) {
  const card = variant === 'card';

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden text-center',
        !card && 'gap-3 py-12',
        card && 'min-h-72 rounded-xl border border-dashed bg-card/80 p-8 shadow-sm sm:p-10',
        card && compact && 'min-h-0 p-5 sm:p-6',
        fill && 'min-h-0 w-full flex-1',
        className,
      )}
      {...props}
    >
      {card && (
        <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-primary/10 blur-3xl" />
      )}
      <div className={cn('relative flex flex-col items-center', card ? 'gap-4' : 'gap-3')}>
        {Icon && (
          <div
            className={cn(
              'flex size-12 items-center justify-center rounded-2xl border',
              card ? 'bg-background text-primary shadow-sm' : 'bg-muted text-muted-foreground',
            )}
          >
            <Icon className={card ? 'size-5' : 'size-6'} />
          </div>
        )}
        <div className={cn(card ? 'max-w-md space-y-2' : 'max-w-xs space-y-1')}>
          {eyebrow && (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <h3 className={cn('font-semibold', card && 'text-xl tracking-tight')}>{title}</h3>
          {description && (
            <div className={cn('text-sm text-muted-foreground', card && 'leading-6')}>
              {description}
            </div>
          )}
        </div>
        {(action || secondaryAction) && (
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    </div>
  );
}
