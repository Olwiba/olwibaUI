'use client';

import * as React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@olwiba/cn';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

export function StatCard({ value, label, delta, trend = 'neutral', description, className, ...props }: StatCardProps) {
  return (
    <div
      className={cn('rounded-2xl border bg-card p-5', className)}
      {...props}
    >
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {delta && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              trend === 'up' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
              trend === 'down' && 'bg-red-500/10 text-red-600 dark:text-red-400',
              trend === 'neutral' && 'bg-muted text-muted-foreground',
            )}
          >
            {trend === 'up' && <TrendingUp className="size-3" />}
            {trend === 'down' && <TrendingDown className="size-3" />}
            {delta}
          </div>
        )}
      </div>
      {description && (
        <p className="mt-1.5 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
