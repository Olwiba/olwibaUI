'use client';

import { cn, useUIVariant } from '@olwiba/cn';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface StepItem {
  emoji?: string;
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
            {/* Desktop: horizontal row */}
            <div className="hidden sm:grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
              {steps.map((step, i) => (
                <FadeIn key={step.title} direction="up" delay={i * 80}>
                  <div className="relative flex flex-col items-center text-center px-4">
                    {/* Dashed connector to next step */}
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute top-6 left-1/2 w-full border-t border-dashed border-border"
                      />
                    )}
                    {/* Emoji badge (or fallback number) */}
                    <div className="relative z-10 mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-2xl">
                      {step.emoji ?? (
                        <span className="text-sm font-semibold text-primary">{i + 1}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
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
                    {/* Vertical connector */}
                    {i < steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="absolute left-[23px] top-14 bottom-0 w-px border-l border-dashed border-border"
                      />
                    )}
                    {/* Emoji badge (or fallback number) */}
                    <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-muted text-2xl">
                      {step.emoji ?? (
                        <span className="text-sm font-semibold text-primary">{i + 1}</span>
                      )}
                    </div>
                    <div className="pt-3">
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
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
