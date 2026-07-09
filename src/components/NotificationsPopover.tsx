'use client';

import * as React from 'react';
import { Bell, Inbox } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from '@olwiba/cn';
import { Button } from '../primitives/Button';

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  /** Pre-formatted timestamp, e.g. "2h ago" or "Yesterday". */
  timestamp?: string;
  read?: boolean;
  /** Avatar image — takes precedence over `icon`. */
  avatar?: string;
  icon?: React.ReactNode;
}

export interface NotificationsPopoverProps {
  notifications: NotificationItem[];
  onNotificationClick?: (notification: NotificationItem) => void;
  /** Shows a "Mark all read" action in the header when there are unread items. */
  onMarkAllRead?: () => void;
  title?: string;
  emptyMessage?: string;
  /** Popover alignment relative to the bell button. @default 'end' */
  align?: 'start' | 'center' | 'end';
  /** Controlled open state — omit to let the component manage it internally. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Bell button + persistent notification inbox. Complements `notify()` toasts:
 * a toast announces an event as it happens, this popover holds the history.
 * Presentation-only — pass `notifications` from your own data layer and
 * persist read state via `onMarkAllRead`/`onNotificationClick`.
 */
export function NotificationsPopover({
  notifications,
  onNotificationClick,
  onMarkAllRead,
  title = 'Notifications',
  emptyMessage = 'Nothing new — you’re all caught up.',
  align = 'end',
  open,
  onOpenChange,
  className,
}: NotificationsPopoverProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={cn('relative size-8', className)}>
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-4 text-primary-foreground">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          <span className="sr-only">
            {title}{unreadCount > 0 ? ` (${unreadCount} unread)` : ''}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">{title}</p>
          {onMarkAllRead && unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Mark all read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
            <Inbox className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <li key={notification.id} className="border-b last:border-b-0">
                <button
                  type="button"
                  onClick={() => onNotificationClick?.(notification)}
                  className={cn(
                    'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60',
                    !notification.read && 'bg-muted/40',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'mt-1.5 size-2 shrink-0 rounded-full',
                      notification.read ? 'bg-transparent' : 'bg-primary',
                    )}
                  />
                  {notification.avatar ? (
                    <Avatar className="size-8 shrink-0">
                      <AvatarImage src={notification.avatar} alt="" />
                      <AvatarFallback>{notification.title.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : notification.icon ? (
                    <span className="mt-0.5 shrink-0 text-muted-foreground">{notification.icon}</span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className={cn('block truncate text-sm', !notification.read && 'font-medium')}>
                      {notification.title}
                    </span>
                    {notification.description && (
                      <span className="mt-0.5 line-clamp-2 block text-xs text-muted-foreground">
                        {notification.description}
                      </span>
                    )}
                    {notification.timestamp && (
                      <span className="mt-1 block text-xs text-muted-foreground/70">
                        {notification.timestamp}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
