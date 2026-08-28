'use client';

import { Check, X } from 'lucide-react';
import { cn } from '@olwiba/cn';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';
import { useSectionSurface, type MarketingSurface } from './section-surface';

export interface QualificationItem {
  text: string;
}

export interface QualificationColumn {
  heading: string;
  variant: 'positive' | 'negative';
  items: string[];
}

export interface QualificationSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  columns: [QualificationColumn, QualificationColumn];
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

export function QualificationSection({
  badge = 'Who it is for',
  title = 'Is this for you?',
  description,
  columns,
  surface,
}: QualificationSectionProps) {
  const sectionClasses = useSectionSurface(surface);

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle badge={badge} title={title} description={description} />

          <FadeIn direction="up" className="mt-12 grid gap-6 sm:grid-cols-2">
            {columns.map((col) => {
              const isPositive = col.variant === 'positive';
              const Icon = isPositive ? Check : X;

              return (
                <div
                  key={col.heading}
                  className={cn(
                    'flex flex-col gap-4 rounded-2xl border p-6',
                    isPositive ? 'border-border bg-muted/30' : 'border-border bg-muted/10',
                  )}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {col.heading}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
                            isPositive
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
                          )}
                        >
                          <Icon className="size-3" />
                        </span>
                        <span className="text-sm leading-relaxed text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
