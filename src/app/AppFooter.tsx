'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils';

export interface AppFooterProps extends HTMLAttributes<HTMLElement> {
  /** Leading content — a product line, build info, a rotating message. */
  start?: ReactNode;
  /** Trailing content — a status pill, version, or a short link row. */
  end?: ReactNode;
}

/**
 * Quiet utility row for signed-in chrome.
 *
 * Pass it to `AppShell`'s `footer` slot: it is app chrome, so it lives beside
 * the page outlet rather than inside a page pattern. Public marketing pages use
 * the full `Footer` instead — this exists so long app pages do not end abruptly.
 *
 * The row owns its solid chrome surface and geometry so page ambience cannot
 * bleed through it. What the slots contain — live status, version, links,
 * product copy — stays with the product.
 */
export function AppFooter({ start, end, children, className, ...props }: AppFooterProps) {
  return (
    <footer
      {...props}
      className={cn(
        'border-t bg-background px-4 py-3 text-xs text-muted-foreground sm:px-6',
        className,
      )}
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="min-w-0 font-medium text-foreground">{start ?? children}</div>
        {end && <div className="flex shrink-0 items-center gap-2">{end}</div>}
      </div>
    </footer>
  );
}
