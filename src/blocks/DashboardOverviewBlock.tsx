'use client';

import * as React from 'react';
import { ArrowUpRight, Clock3, DollarSign, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@olwiba/cn';

const stats = [
  { label: 'Revenue', value: '$82,430', delta: '+12.4%', icon: DollarSign },
  { label: 'Active Users', value: '14,281', delta: '+4.1%', icon: Users },
  { label: 'Avg. Response', value: '184ms', delta: '-17ms', icon: Clock3 },
];

const activity = [
  { id: '#INV-9031', customer: 'Northline Ltd', total: '$2,440', status: 'Paid' },
  { id: '#INV-9030', customer: 'Otter Systems', total: '$1,120', status: 'Pending' },
  { id: '#INV-9029', customer: 'Luma Group', total: '$860', status: 'Paid' },
  { id: '#INV-9028', customer: 'Apex Build', total: '$530', status: 'Overdue' },
];

export function DashboardOverviewBlock() {
  return (
    <section className="space-y-6 rounded-2xl border bg-card p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="text-sm text-muted-foreground">Snapshot of key product and revenue metrics.</p>
        </div>
        <Button variant="outline" size="sm">Export report <ArrowUpRight className="ml-2 size-4" /></Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Badge variant="secondary">{stat.delta}</Badge>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent invoices</CardTitle>
            <CardDescription>Latest billing activity from your workspace.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === 'Paid' ? 'default' : 'outline'}>{row.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage goals</CardTitle>
            <CardDescription>Track progress on this month goals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>API calls</span><span>72%</span>
              </div>
              <Progress value={72} />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Onboarding completion</span><span>54%</span>
              </div>
              <Progress value={54} />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Retention target</span><span>88%</span>
              </div>
              <Progress value={88} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
