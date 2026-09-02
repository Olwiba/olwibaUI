'use client';

import * as React from 'react';
import { Button, Spinner, cn } from '@olwiba/cn';

export interface LoadMoreProps extends React.HTMLAttributes<HTMLDivElement> {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void | Promise<unknown>;
  /** Watches the sentinel instead of showing a manual button. */
  auto?: boolean;
  /** Plural noun used by the manual button, for example `properties`. */
  label?: string;
  /** Starts loading before the sentinel reaches the viewport. */
  rootMargin?: string;
}

/** Cursor-pagination footer with either guarded infinite scroll or a manual fallback. */
export function LoadMore({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  auto = true,
  label = 'more',
  rootMargin = '400px',
  className,
  ...props
}: LoadMoreProps) {
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const stateRef = React.useRef({ hasNextPage, isFetchingNextPage, fetchNextPage });
  stateRef.current = { hasNextPage, isFetchingNextPage, fetchNextPage };

  React.useEffect(() => {
    if (!auto) return;
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const state = stateRef.current;
        if (state.hasNextPage && !state.isFetchingNextPage) void state.fetchNextPage();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [auto, rootMargin]);

  if (!hasNextPage) return null;

  return (
    <div ref={sentinelRef} className={cn('flex justify-center py-4', className)} {...props}>
      {auto ? (
        <span className="flex h-9 items-center text-sm text-muted-foreground" aria-live="polite">
          {isFetchingNextPage && (
            <>
              <Spinner className="mr-2 size-4" /> Loading more…
            </>
          )}
        </span>
      ) : (
        <Button
          variant="outline"
          onClick={() => void fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <>
              <Spinner className="mr-2 size-4" /> Loading…
            </>
          ) : (
            `Load more ${label}`
          )}
        </Button>
      )}
    </div>
  );
}
