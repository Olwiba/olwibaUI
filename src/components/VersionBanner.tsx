'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface VersionBannerProps {
  version: string;
  message?: string;
  className?: string;
  onDismiss?: () => void;
}

export function VersionBanner({ version, message, className, onDismiss }: VersionBannerProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  return (
    <div className={cn('flex items-center justify-between gap-4 bg-primary/10 px-4 py-2 text-sm', className)}>
      <div className="flex items-center gap-2">
        <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs font-semibold text-primary">
          v{version}
        </span>
        {message && <span className="text-muted-foreground">{message}</span>}
      </div>
      {onDismiss && (
        <button
          onClick={() => { setDismissed(true); onDismiss(); }}
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
