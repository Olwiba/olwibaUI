'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { AlertCircle, AlertTriangle, CheckCircle2, Inbox, Info, X } from 'lucide-react';
import { cn } from '@olwiba/cn';
import { Button } from '../primitives/Button';

export interface NotifyAction {
  label: string;
  onClick: () => void;
}

export interface NotificationToastProps {
  variant?: 'success' | 'info' | 'warning' | 'error' | 'message';
  title: string;
  description?: string;
  /** Avatar image — overrides the variant icon (e.g. for a message-from-a-person toast). */
  avatar?: string;
  /** Primary action, right-aligned next to the description (e.g. "Undo"). */
  action?: NotifyAction;
  /** Secondary action, rendered after the primary one (e.g. "Decline"). */
  secondaryAction?: NotifyAction;
  onDismiss?: () => void;
}

const variantIcon = {
  success: <CheckCircle2 className="size-5 text-primary" />,
  info: <Info className="size-5 text-muted-foreground" />,
  warning: <AlertTriangle className="size-5 text-amber-500 dark:text-amber-400" />,
  error: <AlertCircle className="size-5 text-destructive" />,
  message: <Inbox className="size-5 text-muted-foreground" />,
} as const;

/**
 * Rich toast content — rendered via `notify()` inside sonner's `toast.custom`.
 * One component: `variant` swaps the default icon, `avatar`/`action`/
 * `secondaryAction` add the pieces a given toast needs, rather than a
 * separate toast component per shape.
 */
export function NotificationToast({
  variant = 'info',
  title,
  description,
  avatar,
  action,
  secondaryAction,
  onDismiss,
}: NotificationToastProps) {
  return (
    <div className="w-full max-w-sm rounded-lg border bg-card p-4 text-card-foreground shadow-lg">
      <div className="flex items-start gap-3">
        <div className="shrink-0 pt-0.5">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className="size-9 rounded-full border object-cover" />
          ) : (
            variantIcon[variant]
          )}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium">{title}</p>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          {(action || secondaryAction) && (
            <div className={cn('mt-3 flex gap-4', avatar && 'gap-3')}>
              {action && (
                <button type="button" onClick={action.onClick} className="text-sm font-medium text-primary hover:underline">
                  {action.label}
                </button>
              )}
              {secondaryAction && (
                <button type="button" onClick={secondaryAction.onClick} className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" className="size-6 shrink-0 -mt-1 -mr-1" onClick={onDismiss}>
          <X className="size-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </div>
  );
}

export interface NotifyOptions extends Omit<NotificationToastProps, 'onDismiss'> {
  duration?: number;
}

/** Fires a `NotificationToast` through sonner. Requires `<Toaster />` from `@olwiba/cn` mounted once in your app. */
export function notify(options: NotifyOptions) {
  const { duration, ...toastProps } = options;
  return toast.custom((id) => <NotificationToast {...toastProps} onDismiss={() => toast.dismiss(id)} />, { duration });
}
