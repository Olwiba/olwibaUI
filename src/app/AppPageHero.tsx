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
  /**
   * How the address is drawn.
   * - `"card"` (default) — a bordered surface that introduces the route.
   * - `"plain"` — type only. Use when the page content is itself made of
   *   surfaces: a second card at the top competes with them instead of
   *   introducing them, and pushes the region that actually does something
   *   further down the page.
   */
  surface?: 'card' | 'plain';
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
  surface = 'card',
  className,
}: AppPageHeroProps) {
  const isPlain = surface === 'plain';

  return (
    <section
      className={cn(
        'relative',
        !isPlain && [
          'overflow-hidden border bg-card/80 shadow-sm',
          // Compact is the page-pattern header: same surface and glow, less
          // bulk, so it introduces a route without eating the fold above dense
          // content.
          compact ? 'rounded-2xl p-4 sm:p-5' : 'rounded-3xl p-5 sm:p-6',
          // The glow blobs are decoration, and `::after` is the section's last
          // child — so with everything on `z-index: auto` it paints above the
          // header content and swallows clicks on whatever sits under it. At
          // narrow widths the action row stacks below the copy, right into the
          // bottom-left blob, which is how a visible button stops responding.
          // pointer-events-none keeps them purely visual.
          'before:pointer-events-none before:absolute before:-right-16 before:-top-16 before:rounded-full before:bg-primary/15 before:blur-3xl',
          'after:pointer-events-none after:absolute after:left-10 after:rounded-full after:bg-primary/10 after:blur-3xl',
          compact
            ? 'before:size-32 after:-bottom-16 after:size-40'
            : 'before:size-44 after:-bottom-20 after:size-52',
        ],
        className,
      )}
    >
      <div
        className={cn(
          'relative flex flex-col sm:flex-row sm:items-start sm:justify-between',
          compact ? 'gap-3' : 'gap-5',
        )}
      >
        <div className={cn('flex min-w-0 items-start', compact ? 'gap-3' : 'gap-4')}>
          {Icon && (
            <div
              className={cn(
                'flex shrink-0 items-center justify-center border bg-background/70 text-primary shadow-sm',
                compact ? 'size-10 rounded-xl' : 'size-12 rounded-2xl',
              )}
            >
              <Icon className={compact ? 'size-4' : 'size-5'} />
            </div>
          )}
          <div className={cn('min-w-0', compact ? 'space-y-1' : 'space-y-2')}>
            {eyebrow && (
              <p
                className={cn(
                  'font-semibold uppercase text-primary/80',
                  compact
                    ? 'text-[11px] tracking-[0.18em]'
                    : 'text-xs tracking-[0.24em]',
                )}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className={cn(
                // Default leading puts ~4px of half-leading above the cap, so
                // the title reads as sitting low against a top-aligned icon.
                'font-semibold leading-tight tracking-tight',
                compact ? 'text-xl sm:text-2xl' : 'text-3xl sm:text-4xl',
              )}
            >
              {title}
            </h1>
            {description && (
              <p
                className={cn(
                  'max-w-2xl text-muted-foreground',
                  compact ? 'text-sm leading-5' : 'text-sm leading-6',
                )}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        {action && (
          <div className={cn('relative shrink-0', !compact && 'sm:pt-1')}>{action}</div>
        )}
      </div>
      {children && <div className={cn('relative', compact ? 'mt-4' : 'mt-5')}>{children}</div>}
    </section>
  );
}
