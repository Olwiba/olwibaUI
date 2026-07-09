import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface SettingsSectionProps {
  title: string;
  description?: string;
  /** Form fields, buttons, or any content for the right-hand column — e.g. a `<form>`. */
  children: React.ReactNode;
  /** Styles the content column for a destructive action (e.g. "Delete account"). @default false */
  danger?: boolean;
  className?: string;
}

/**
 * One title+description+content row for a settings page. Stack a few inside
 * a `<div className="divide-y divide-border">` to build a full settings
 * page — one block reused per row, rather than a bespoke layout each time.
 */
export function SettingsSection({ title, description, children, danger = false, className }: SettingsSectionProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-x-8 gap-y-6 py-10 sm:grid-cols-3', className)}>
      <div>
        <h2 className={cn('text-base font-semibold', danger && 'text-destructive')}>{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}
