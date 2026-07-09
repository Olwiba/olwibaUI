'use client';

import * as React from 'react';
import { Activity } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, cn } from '@olwiba/cn';

export interface ActivityFeedItem {
  id: string;
  /** Main line — pass rich nodes for emphasis, e.g. <><b>Ana</b> deployed to production</>. */
  title: React.ReactNode;
  description?: string;
  /** Pre-formatted timestamp, e.g. "2h ago" or "Mar 4". */
  timestamp?: string;
  /** Avatar image — takes precedence over `icon`. */
  avatar?: string;
  /** Fallback initials when `avatar` is set but fails to load. */
  initials?: string;
  /** Icon node rendered in the timeline marker when there is no avatar. */
  icon?: React.ReactNode;
}

export interface ActivityFeedProps {
  items: ActivityFeedItem[];
  emptyMessage?: string;
  className?: string;
}

/**
 * Vertical activity timeline — avatar or icon markers connected by a rail,
 * one row per event. Presentation-only: pass pre-formatted timestamps and
 * rich `title` nodes from your own data layer.
 */
export function ActivityFeed({
  items,
  emptyMessage = 'No activity yet.',
  className,
}: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div className={cn('flex flex-col items-center gap-2 py-10 text-center', className)}>
        <Activity className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ol className={className}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-6 last:pb-0">
          {/* Rail connecting this marker to the next */}
          {i !== items.length - 1 && (
            <span aria-hidden className="absolute left-4 top-9 bottom-0 w-px -translate-x-1/2 bg-border" />
          )}
          <span className="relative z-10 flex size-8 shrink-0 items-center justify-center">
            {item.avatar ? (
              <Avatar className="size-8">
                <AvatarImage src={item.avatar} alt="" />
                <AvatarFallback className="text-xs">{item.initials ?? '?'}</AvatarFallback>
              </Avatar>
            ) : (
              <span className="flex size-8 items-center justify-center rounded-full border bg-card text-muted-foreground [&>svg]:size-4">
                {item.icon ?? <Activity />}
              </span>
            )}
          </span>
          <div className="min-w-0 flex-1 pt-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm">{item.title}</p>
              {item.timestamp && (
                <span className="shrink-0 text-xs text-muted-foreground">{item.timestamp}</span>
              )}
            </div>
            {item.description && (
              <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
