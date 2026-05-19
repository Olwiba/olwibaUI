'use client';
import * as React from 'react';
import { useIntersectionObserver } from '@olwiba/ui';
import { cn } from '@olwiba/cn';

export default function Demo() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div className="space-y-3 p-6">
      <div className="text-sm text-center">
        Status:{' '}
        <strong className={isVisible ? 'text-emerald-500' : 'text-muted-foreground'}>
          {isVisible ? 'intersecting' : 'not intersecting'}
        </strong>
      </div>
      <div className="h-44 overflow-y-auto rounded-xl border">
        <div className="flex h-16 items-center justify-center text-xs text-muted-foreground">↓ scroll</div>
        <div
          ref={ref as unknown as React.RefObject<HTMLDivElement>}
          className={cn(
            'mx-4 rounded-xl border p-4 text-sm text-center transition-all duration-500',
            isVisible ? 'border-primary bg-primary/5 text-primary' : 'bg-muted text-muted-foreground',
          )}
        >
          Observed element
        </div>
        <div className="flex h-16 items-center justify-center text-xs text-muted-foreground">↑ scroll</div>
      </div>
    </div>
  );
}
