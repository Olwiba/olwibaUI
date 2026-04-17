'use client';

import { Separator } from '@olwiba/cn';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';
import { CountUp } from '../motion/CountUp';

export interface StatsSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  stats: Array<{ value: string; label: string; description?: string }>;
}

function parseStatValue(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  const suffix = match[2] || '';
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
  return { num, suffix, decimals };
}

function StatValue({ value }: { value: string }) {
  const parsed = parseStatValue(value);
  if (!parsed) return <>{value}</>;
  return <CountUp to={parsed.num} decimals={parsed.decimals} suffix={parsed.suffix} />;
}

export function StatsSection({
  title = 'Built for scale, used in production',
  description,
  badge = 'By the numbers',
  stats,
}: StatsSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative px-6 py-14 sm:px-10 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl">
          <SectionTitle title={title} description={description} badge={badge} />

          <StaggerChildren className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2 bg-card px-6 py-8">
                <div className="text-4xl font-bold tracking-tight">
                  <StatValue value={stat.value} />
                </div>
                <div className="font-medium">{stat.label}</div>
                {stat.description && (
                  <>
                    <Separator />
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </>
                )}
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
