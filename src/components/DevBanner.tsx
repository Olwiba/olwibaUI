'use client';

import { cn } from '../lib/utils';

export interface DevBannerProps {
  environment?: string;
  className?: string;
}

export function DevBanner({ environment = 'development', className }: DevBannerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 bg-amber-500/15 px-4 py-1 text-xs font-medium text-amber-700 dark:text-amber-400',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-amber-500" />
      <span>{environment}</span>
    </div>
  );
}
