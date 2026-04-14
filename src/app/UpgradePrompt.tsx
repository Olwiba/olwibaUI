'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from '@olwiba/cn';

export interface UpgradeComparisonRow {
  key?: React.Key;
  label: React.ReactNode;
  currentValue: React.ReactNode;
  upgradedValue: React.ReactNode;
}

export interface UpgradePromptProps {
  /** Layout variant. `banner` is an inline strip; `comparison` is a full feature-table block. */
  variant: 'banner' | 'comparison';
  /** Primary heading shown in both variants. */
  title: React.ReactNode;
  /** Supporting copy shown below the title. */
  description: React.ReactNode;
  /** Label for the primary upgrade CTA. Include pricing here if relevant. */
  primaryActionLabel: React.ReactNode;
  /** Called when the primary upgrade CTA is clicked. */
  onPrimaryAction: () => void;
  /** Optional secondary action label, typically for "maybe later" or dismiss behavior. */
  secondaryActionLabel?: React.ReactNode;
  /** Called when the optional secondary action is clicked. */
  onSecondaryAction?: () => void;
  /** Small eyebrow label shown above the title in the comparison variant. */
  eyebrow?: React.ReactNode;
  /** Feature comparison rows for the comparison variant. */
  rows?: UpgradeComparisonRow[];
  /** Column header for the current plan. Defaults to "Current". */
  currentPlanLabel?: React.ReactNode;
  /** Column header for the upgraded plan. Defaults to "Upgrade". */
  upgradedPlanLabel?: React.ReactNode;
  /** Small body text shown below the comparison table, before the action buttons. */
  footer?: React.ReactNode;
  /** Optional close icon action for the comparison variant. */
  onClose?: () => void;
  /** Accessible label for the comparison close icon. Defaults to "Close". */
  closeLabel?: string;
  className?: string;
}

export function UpgradePrompt({
  variant,
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  eyebrow,
  rows,
  currentPlanLabel = 'Current',
  upgradedPlanLabel = 'Upgrade',
  footer,
  onClose,
  closeLabel = 'Close',
  className,
}: UpgradePromptProps) {
  const hasSecondaryAction = Boolean(secondaryActionLabel && onSecondaryAction);

  if (variant === 'banner') {
    return (
      <section
        className={cn(
          'rounded-xl border border-dashed bg-card/40 p-5 sm:p-6',
          className,
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {hasSecondaryAction ? (
              <Button
                type="button"
                variant="ghost"
                onClick={onSecondaryAction}
                className="border"
              >
                {secondaryActionLabel}
              </Button>
            ) : null}
            <Button type="button" onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'w-full max-w-3xl rounded-2xl border bg-card p-6 shadow-sm sm:p-7',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-primary">
              {eyebrow}
            </div>
          ) : null}
          <h3
            className={cn(
              'text-2xl font-semibold sm:text-[1.75rem]',
              eyebrow ? 'mt-3' : '',
            )}
          >
            {title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors hover:bg-muted"
            aria-label={closeLabel}
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      {rows && rows.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-xl border bg-muted/30">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {currentPlanLabel}
                </TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider text-primary">
                  {upgradedPlanLabel}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.key ?? index}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    {row.currentValue}
                  </TableCell>
                  <TableCell className="font-mono">{row.upgradedValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}

      <div
        className={cn(
          'mt-6 flex flex-col gap-3 sm:flex-row sm:items-center',
          footer || hasSecondaryAction ? 'sm:justify-between' : 'sm:justify-end',
        )}
      >
        {footer ? <p className="text-sm text-muted-foreground">{footer}</p> : null}
        <div className="flex flex-wrap gap-2">
          {hasSecondaryAction ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onSecondaryAction}
              className="border"
            >
              {secondaryActionLabel}
            </Button>
          ) : null}
          <Button type="button" onClick={onPrimaryAction}>
            {primaryActionLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
