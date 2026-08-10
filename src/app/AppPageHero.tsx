'use client';

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export interface AppPageHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  action?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
  className?: string;
}

/**
 * Rich page header for signed-in product/admin pages.
 *
 * Use this when a route needs more visual weight than a simple `PageHeader`,
 * but still keep product-specific stats, actions, and copy in the consumer.
 */
export function AppPageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
  children,
  compact = false,
  className,
}: AppPageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border bg-card/80 p-5 shadow-sm sm:p-6',
        'before:absolute before:-right-16 before:-top-16 before:size-44 before:rounded-full before:bg-primary/15 before:blur-3xl',
        'after:absolute after:-bottom-20 after:left-10 after:size-52 after:rounded-full after:bg-primary/10 after:blur-3xl',
        className,
      )}
    >
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          {Icon && (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-background/70 text-primary shadow-sm">
              <Icon className="size-5" />
            </div>
          )}
          <div className="min-w-0 space-y-2">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                'font-semibold tracking-tight',
                compact ? 'text-2xl' : 'text-3xl sm:text-4xl',
              )}
            >
              {title}
            </h1>
            {description && (
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
        {action && <div className="relative shrink-0 sm:pt-1">{action}</div>}
      </div>
      {children && <div className="relative mt-5">{children}</div>}
    </section>
  );
}
