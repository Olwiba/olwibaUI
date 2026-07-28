'use client';

import * as React from 'react';
import { Button, cn } from '@olwiba/cn';
import { LayoutGrid, List } from 'lucide-react';
import type { ViewMode } from '../hooks/use-view-mode';

export interface ViewToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
  labels?: { cards?: string; list?: string };
}

/**
 * Two-state segmented control for switching a collection between cards and a
 * list. Controlled — pair it with useViewMode to persist the choice.
 */
export function ViewToggle({ view, onChange, labels, className, ...props }: ViewToggleProps) {
  const options = [
    { mode: 'cards' as const, label: labels?.cards ?? 'Card view', Icon: LayoutGrid },
    { mode: 'list' as const, label: labels?.list ?? 'List view', Icon: List },
  ];

  return (
    <div
      className={cn('inline-flex items-center rounded-md border p-0.5', className)}
      role="group"
      aria-label="View mode"
      {...props}
    >
      {options.map(({ mode, label, Icon }) => (
        <Button
          key={mode}
          type="button"
          size="sm"
          variant={view === mode ? 'secondary' : 'ghost'}
          className="h-7 px-2"
          aria-label={label}
          aria-pressed={view === mode}
          onClick={() => onChange(mode)}
        >
          <Icon className="size-4" />
        </Button>
      ))}
    </div>
  );
}
