'use client';

import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { CreditCard, Download } from 'lucide-react';
import { Badge, Progress } from '@olwiba/cn';
import { Button } from '../primitives/Button';
import { DataTable } from '../components/DataTable';
import { SettingsSection } from './SettingsSection';

export interface BillingUsageMetric {
  label: string;
  used: number;
  limit: number;
  unit?: string;
}

export interface BillingInvoice {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'open' | 'void';
  downloadUrl?: string;
}

export interface BillingPaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
}

export interface BillingPanelProps {
  planName: string;
  planPrice?: string;
  renewalDate?: string;
  usage?: BillingUsageMetric[];
  paymentMethod?: BillingPaymentMethod;
  invoices?: BillingInvoice[];
  onManagePlan?: () => void;
  onUpdatePaymentMethod?: () => void;
  className?: string;
}

const invoiceStatusVariant = {
  paid: 'secondary',
  open: 'outline',
  void: 'destructive',
} as const;

/**
 * In-app billing summary — current plan + usage, payment method, invoice
 * history. Built from `SettingsSection` rows and `DataTable`, rather than a
 * one-off billing page each time. Marketing plan comparisons stay in
 * `PricingSection`/`UpgradePrompt` — this is the account-side view.
 */
export function BillingPanel({
  planName,
  planPrice,
  renewalDate,
  usage,
  paymentMethod,
  invoices,
  onManagePlan,
  onUpdatePaymentMethod,
  className,
}: BillingPanelProps) {
  // Dates and amounts are display strings — sorting them would be lexicographic, so keep it off
  const invoiceColumns = React.useMemo<ColumnDef<BillingInvoice>[]>(() => [
    { accessorKey: 'date', header: 'Date', enableSorting: false },
    { accessorKey: 'amount', header: 'Amount', enableSorting: false },
    {
      accessorKey: 'status',
      header: 'Status',
      enableSorting: false,
      cell: ({ row }) => (
        <Badge variant={invoiceStatusVariant[row.original.status]} className="capitalize">
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'download',
      header: '',
      cell: ({ row }) =>
        row.original.downloadUrl ? (
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <a href={row.original.downloadUrl} download>
              <Download className="size-4" />
              <span className="sr-only">Download invoice</span>
            </a>
          </Button>
        ) : null,
      enableSorting: false,
    },
  ], []);

  return (
    <div className={className}>
      <div className="divide-y divide-border">
        <SettingsSection title="Current plan" description="Your subscription and usage against plan limits.">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card/60 p-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{planName}</p>
                {planPrice && <Badge variant="secondary">{planPrice}</Badge>}
              </div>
              {renewalDate && <p className="mt-1 text-sm text-muted-foreground">Renews {renewalDate}</p>}
            </div>
            {onManagePlan && <Button onClick={onManagePlan}>Manage plan</Button>}
          </div>
          {usage && usage.length > 0 && (
            <div className="mt-4 space-y-4">
              {usage.map((metric) => {
                const overLimit = metric.limit > 0 && metric.used > metric.limit;
                const percent = metric.limit > 0 ? Math.min(100, (metric.used / metric.limit) * 100) : 0;
                return (
                  <div key={metric.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span>{metric.label}</span>
                      <span className={overLimit ? 'font-medium text-destructive' : 'text-muted-foreground'}>
                        {metric.used}{metric.unit} / {metric.limit}{metric.unit}
                      </span>
                    </div>
                    <Progress value={percent} className={overLimit ? '[&>div]:bg-destructive' : undefined} />
                  </div>
                );
              })}
            </div>
          )}
        </SettingsSection>

        {paymentMethod && (
          <SettingsSection title="Payment method" description="Used for your subscription renewal.">
            <div className="flex items-center justify-between gap-4 rounded-lg border bg-card/60 p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="size-5 text-muted-foreground" />
                <p className="text-sm">
                  <span className="font-medium capitalize">{paymentMethod.brand}</span> ending in {paymentMethod.last4}
                  <span className="text-muted-foreground"> · expires {paymentMethod.expiry}</span>
                </p>
              </div>
              {onUpdatePaymentMethod && <Button variant="outline" onClick={onUpdatePaymentMethod}>Update</Button>}
            </div>
          </SettingsSection>
        )}

        {invoices && invoices.length > 0 && (
          <SettingsSection title="Billing history" description="Download past invoices for your records.">
            <DataTable columns={invoiceColumns} data={invoices} pageSize={5} />
          </SettingsSection>
        )}
      </div>
    </div>
  );
}
