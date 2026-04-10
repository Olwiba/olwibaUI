'use client';

import * as React from 'react';
import { CreditCard, Download, FileText, LayoutGrid, Settings, Shield, User, Zap } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  cn,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@olwiba/cn';
import { StatCard, Button } from '@olwiba/ui';

const navItems = [
  { id: 'billing', label: 'Billing', Icon: CreditCard },
  { id: 'profile', label: 'Profile', Icon: User },
  { id: 'security', label: 'Security', Icon: Shield },
  { id: 'integrations', label: 'Integrations', Icon: LayoutGrid },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

const invoices = [
  { id: 'INV-2024-009', date: 'Mar 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-2024-008', date: 'Feb 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-2024-007', date: 'Jan 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-2024-006', date: 'Dec 1, 2025', amount: '$29.00', status: 'Paid' },
  { id: 'INV-2024-005', date: 'Nov 1, 2025', amount: '$19.00', status: 'Paid' },
];

export default function BillingPageDemo() {
  return (
    <div className="w-full max-w-5xl overflow-hidden rounded-2xl border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </div>
          Olwiba
        </div>
        <Button variant="ghost" size="sm" className="gap-2">
          <Avatar className="size-6">
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>
          Olivia Reed
        </Button>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <nav className="space-y-1 border-b p-4 lg:border-b-0 lg:border-r">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                id === 'billing'
                  ? 'bg-accent font-medium text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Main */}
        <div className="space-y-8 p-6 lg:p-8">
          {/* Current plan */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Billing & Subscription</h2>
              <p className="text-sm text-muted-foreground">Manage your plan, payment method, and invoices.</p>
            </div>
            <Separator />
            <div className="rounded-xl border bg-muted/40 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Pro Plan</span>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">$29 / month · renews Apr 1, 2026</p>
                  <p className="text-xs text-muted-foreground">Billed to Visa ending in 4242</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Change plan</Button>
                  <Button variant="outline" size="sm">Update card</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Usage stats */}
          <div className="space-y-3">
            <h3 className="font-medium">Usage this month</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard value="24" label="Active projects" delta="+2" trend="up" description="3 projects added this month" />
              <StatCard value="1,240" label="API calls" delta="+18%" trend="up" description="vs 1,051 last month" />
              <StatCard value="4.2 GB" label="Storage used" delta="of 20 GB" trend="neutral" description="21% of your plan limit" />
            </div>
          </div>

          {/* Invoice history */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium">Invoice history</h3>
              <Button variant="outline" size="sm">
                <Download className="mr-2 size-3.5" />
                Export all
              </Button>
            </div>
            <div className="rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">PDF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                      <TableCell className="text-sm">{inv.amount}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{inv.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="size-7">
                          <FileText className="size-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
