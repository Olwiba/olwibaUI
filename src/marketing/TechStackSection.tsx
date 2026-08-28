'use client';

import type { LucideIcon } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';
import { useSectionSurface, type MarketingSurface } from './section-surface';

export interface TechStackItem {
  icon: LucideIcon;
  name: string;
  description: string;
  href?: string;
}

export interface TechStackSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  items: TechStackItem[];
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

export function TechStackSection({
  badge = 'Built on',
  title = 'The stack',
  description,
  items,
  surface,
}: TechStackSectionProps) {
  // Still read directly: `mode` also drives the per-item tile rounding below.
  const mode = useUIVariant();
  const sectionClasses = useSectionSurface(surface);

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle badge={badge} title={title} description={description} />

          <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
              const Icon = item.icon;
              const card = (
                <div
                  className={cn(
                    'group flex flex-col gap-3 border bg-background p-5 transition-all duration-200',
                    mode === 'smooth'
                      ? 'rounded-2xl hover:-translate-y-0.5 hover:shadow-md'
                      : 'rounded-xl hover:-translate-y-0.5 hover:shadow-md',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary',
                      mode === 'smooth' ? 'rounded-xl' : 'rounded-lg',
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{item.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );

              if (item.href) {
                return (
                  <a key={item.name} href={item.href} className="block">
                    {card}
                  </a>
                );
              }
              return <div key={item.name}>{card}</div>;
            })}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
