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

const upgradeThemeVars = {
  '--rmbot-font-display': '"Space Grotesk", sans-serif',
  '--rmbot-font-ui': 'Geist, sans-serif',
  '--rmbot-font-mono': '"IBM Plex Mono", monospace',
  '--rmbot-bg-base': 'var(--bg-base, #080808)',
  '--rmbot-bg-surface': 'var(--bg-surface, #0D1110)',
  '--rmbot-bg-raised': 'var(--bg-raised, #171D1C)',
  '--rmbot-border': 'var(--border, #24302C)',
  '--rmbot-text-1': 'var(--text-1, #F5F7F6)',
  '--rmbot-text-2': 'var(--text-2, #A3A3A3)',
  '--rmbot-emerald-500': 'var(--emerald-500, #10b981)',
  '--rmbot-radius-sm': 'var(--radius-sm, 8px)',
  '--rmbot-radius-md': 'var(--radius-md, 12px)',
  '--rmbot-radius-lg': 'var(--radius-lg, 16px)',
  '--rmbot-shadow-raised': '0 24px 80px rgba(0, 0, 0, 0.32)',
} as React.CSSProperties;

const comparisonRows = [
  { label: 'Monitors', free: '1', paid: '10' },
  { label: 'Poll rate', free: '5 min', paid: '1 min' },
  { label: 'WhatsApp', free: '✓', paid: '✓' },
  { label: 'Email', free: '✓', paid: '✓' },
  { label: 'Sources', free: 'RM + SR', paid: 'RM + SR + Zoopla' },
];

export interface UpgradePromptBlockProps {
  variant: 'inline' | 'modal';
  onUpgrade: () => void;
  onDismiss?: () => void;
  price?: string;
  isOpen?: boolean;
  className?: string;
}

export function UpgradePromptBlock({
  variant,
  onUpgrade,
  onDismiss,
  price = '£15/mo',
  isOpen = true,
  className,
}: UpgradePromptBlockProps) {
  if (variant === 'modal' && !isOpen) {
    return null;
  }

  if (variant === 'inline') {
    return (
      <section
        className={cn('border border-dashed p-5 sm:p-6', className)}
        style={{
          ...upgradeThemeVars,
          backgroundColor: 'var(--rmbot-bg-surface)',
          borderColor: 'var(--rmbot-border)',
          borderRadius: 'var(--rmbot-radius-md)',
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3
              className="text-xl"
              style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-display)', fontWeight: 700 }}
            >
              Add more monitors
            </h3>
            <p
              className="mt-2 max-w-xl text-sm leading-6"
              style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-ui)' }}
            >
              Free tier includes one live monitor. Upgrade to keep multiple areas running at once
              and drop the poll rate to one minute.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {onDismiss ? (
              <Button
                type="button"
                variant="ghost"
                onClick={onDismiss}
                className="border"
                style={{
                  borderColor: 'var(--rmbot-border)',
                  borderRadius: 'var(--rmbot-radius-sm)',
                  color: 'var(--rmbot-text-2)',
                  fontFamily: 'var(--rmbot-font-ui)',
                }}
              >
                Dismiss
              </Button>
            ) : null}
            <Button
              type="button"
              onClick={onUpgrade}
              className="shadow-none"
              style={{
                backgroundColor: 'var(--rmbot-emerald-500)',
                borderRadius: 'var(--rmbot-radius-sm)',
                color: 'var(--rmbot-bg-base)',
                fontFamily: 'var(--rmbot-font-display)',
              }}
            >
              Upgrade {price}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn('w-full max-w-3xl border p-6 sm:p-7', className)}
      style={{
        ...upgradeThemeVars,
        backgroundColor: 'var(--rmbot-bg-raised)',
        borderColor: 'var(--rmbot-border)',
        borderRadius: 'var(--rmbot-radius-lg)',
        boxShadow: 'var(--rmbot-shadow-raised)',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ color: 'var(--rmbot-emerald-500)', fontFamily: 'var(--rmbot-font-mono)' }}
          >
            Paid tier
          </div>
          <h3
            className="mt-3 text-2xl sm:text-[1.75rem]"
            style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-display)', fontWeight: 700 }}
          >
            Upgrade your monitoring edge
          </h3>
          <p
            className="mt-3 max-w-2xl text-sm leading-6 sm:text-base"
            style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-ui)' }}
          >
            Run more areas, check more often, and add Zoopla without leaving the same workflow.
          </p>
        </div>

        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex size-9 items-center justify-center border transition-colors"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'var(--rmbot-border)',
              borderRadius: 'var(--rmbot-radius-sm)',
              color: 'var(--rmbot-text-2)',
            }}
            aria-label="Dismiss upgrade prompt"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>

      <div
        className="mt-6 overflow-hidden border"
        style={{
          backgroundColor: 'color-mix(in oklab, var(--rmbot-bg-surface) 75%, black)',
          borderColor: 'var(--rmbot-border)',
          borderRadius: 'var(--rmbot-radius-md)',
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: 'var(--rmbot-border)' }}>
              <TableHead
                style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
              />
              <TableHead
                style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
              >
                Free
              </TableHead>
              <TableHead
                style={{ color: 'var(--rmbot-emerald-500)', fontFamily: 'var(--rmbot-font-mono)' }}
              >
                Paid
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonRows.map((row) => (
              <TableRow key={row.label} style={{ borderColor: 'var(--rmbot-border)' }}>
                <TableCell
                  style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-ui)' }}
                >
                  {row.label}
                </TableCell>
                <TableCell
                  style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
                >
                  {row.free}
                </TableCell>
                <TableCell
                  style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-mono)' }}
                >
                  {row.paid}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-sm"
          style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-ui)' }}
        >
          Upgrade when the free cap starts hiding opportunities.
        </p>
        <div className="flex flex-wrap gap-2">
          {onDismiss ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onDismiss}
              className="border"
              style={{
                borderColor: 'var(--rmbot-border)',
                borderRadius: 'var(--rmbot-radius-sm)',
                color: 'var(--rmbot-text-2)',
                fontFamily: 'var(--rmbot-font-ui)',
              }}
            >
              Maybe later
            </Button>
          ) : null}
          <Button
            type="button"
            onClick={onUpgrade}
            className="shadow-none"
            style={{
              backgroundColor: 'var(--rmbot-emerald-500)',
              borderRadius: 'var(--rmbot-radius-sm)',
              color: 'var(--rmbot-bg-base)',
              fontFamily: 'var(--rmbot-font-display)',
            }}
          >
            Upgrade {price}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default UpgradePromptBlock;
