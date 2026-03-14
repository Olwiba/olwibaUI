'use client';

import * as React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@olwiba/cn';

const features = [
  {
    title: 'Composable by default',
    description: 'Every section is built from olwibaCN primitives so you can re-arrange quickly.',
  },
  {
    title: 'Consistent tokens',
    description: 'Spacing, colors, and radius stay aligned across app surfaces.',
  },
  {
    title: 'Production-friendly',
    description: 'These blocks are designed to drop into real app pages, not only demos.',
  },
];

export function MarketingHeroBlock() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative px-6 py-14 sm:px-10 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_40%),radial-gradient(circle_at_80%_20%,hsl(var(--chart-2)/0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge className="mb-4" variant="secondary">Base UI Blocks</Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Ship polished screens with olwibaCN-powered building blocks
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Start with production-ready sections and tailor content, structure, and interactions to your product.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">Get started <ArrowRight className="ml-2 size-4" /></Button>
            <Button size="lg" variant="outline">View examples</Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="space-y-3">
              <CheckCircle2 className="size-5 text-primary" />
              <CardTitle className="text-base">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </section>
  );
}
