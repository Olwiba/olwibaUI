'use client';

import { cn, useUIVariant } from '@olwiba/cn';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface StepItem {
  title: string;
  description: string;
}

export interface StepsSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  steps: StepItem[];
}

export function StepsSection({
  badge = 'How it works',
  title = 'From zero to shipped',
  description,
  steps,
}: StepsSectionProps) {
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

          <div className="mt-12">
            {/* Desktop: horizontal row with connecting lines */}
            <div className="hidden sm:grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
              {steps.map((step, i) => (
                <FadeIn key={step.title} direction="up" delay={i * 80}>
                  <div className="relative flex flex-col items-center text-center px-4">
                    {/* Connecting line */}
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute top-5 left-1/2 w-full border-t border-dashed border-border"
                      />
                    )}
                    {/* Number badge */}
                    <div
                      className={cn(
                        'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground text-sm font-semibold',
                        mode === 'smooth' ? 'rounded-2xl' : 'rounded-xl',
                      )}
                    >
                      {i + 1}
                    </div>
                    <h3 className="mt-4 font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="flex flex-col gap-0 sm:hidden">
              {steps.map((step, i) => (
                <FadeIn key={step.title} direction="up" delay={i * 80}>
                  <div className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Vertical connecting line */}
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute left-5 top-10 bottom-0 w-px border-l border-dashed border-border"
                      />
                    )}
                    {/* Number badge */}
                    <div
                      className={cn(
                        'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground text-sm font-semibold',
                        mode === 'smooth' ? 'rounded-2xl' : 'rounded-xl',
                      )}
                    >
                      {i + 1}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
