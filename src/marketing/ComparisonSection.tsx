'use client';

import { cn, useUIVariant } from '@olwiba/cn';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';

export interface ComparisonColumn {
  label: string;
  cost: string;
  costDetail?: string;
  items: string[];
  highlighted?: boolean;
}

export interface ComparisonSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  columns: ComparisonColumn[];
}

export function ComparisonSection({
  badge = 'The math',
  title = 'The math is simple',
  description,
  columns,
}: ComparisonSectionProps) {
  const mode = useUIVariant();
  const sectionClasses = cn(
    'overflow-hidden bg-card',
    mode === 'smooth' && 'rounded-3xl border',
    mode === 'playful' && 'rounded-2xl border-primary/25 border',
    !mode && 'rounded-2xl border',
  );

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle badge={badge} title={title} description={description} />

          <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-3">
            {columns.map((col) => (
              <div
                key={col.label}
                className={cn(
                  'flex h-full flex-col rounded-2xl border p-6',
                  col.highlighted
                    ? 'border-primary bg-primary/10 ring-1 ring-primary/20'
                    : 'border-border bg-muted/40',
                )}
              >
                <div className="mb-6">
                  <p
                    className={cn(
                      'text-xs font-semibold uppercase tracking-widest',
                      col.highlighted ? 'text-primary/80' : 'text-muted-foreground',
                    )}
                  >
                    {col.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {col.cost}
                  </p>
                  {col.costDetail && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {col.costDetail}
                    </p>
                  )}
                </div>

                <ul className="flex flex-col gap-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      {col.highlighted ? (
                        <span className="mt-0.5 shrink-0 text-sm leading-none">⚡</span>
                      ) : (
                        <span className="mt-0.5 shrink-0 text-sm leading-none">❌</span>
                      )}
                      <span
                        className={cn(
                          'text-sm leading-snug',
                          col.highlighted ? 'text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
