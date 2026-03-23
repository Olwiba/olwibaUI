'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys: string | string[];
}

export function Kbd({ keys, className, ...props }: KbdProps) {
  const keyList = Array.isArray(keys) ? keys : [keys];

  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} {...props}>
      {keyList.map((key, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-muted-foreground/50 text-xs">+</span>}
          <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[11px] font-medium text-muted-foreground shadow-[0_1px_0_0_hsl(var(--border))]">
            {key}
          </kbd>
        </React.Fragment>
      ))}
    </span>
  );
}
