'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1 pb-6', className)}>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
