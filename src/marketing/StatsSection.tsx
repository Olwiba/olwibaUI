'use client';

import { Badge, Separator } from '@olwiba/cn';

const stats = [
  { value: '200+', label: 'Components & blocks', description: 'Production-ready pieces across blocks, components, and hooks' },
  { value: '12k+', label: 'Weekly downloads', description: 'Teams installing and using Olwiba packages every week' },
  { value: '98%', label: 'TypeScript coverage', description: 'Fully typed API surface with no implicit any' },
  { value: '4.9★', label: 'Average rating', description: 'Rated by engineers who use Olwiba in production' },
];

export function StatsSection() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative px-6 py-14 sm:px-10 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">By the numbers</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for scale, used in production
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 bg-card px-6 py-8">
                <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
                <div className="font-medium">{stat.label}</div>
                <Separator />
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
