'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { useSectionSurface, type MarketingSurface } from './section-surface';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface StepItem {
  emoji?: string;
  title: string;
  description: React.ReactNode;
}

export interface StepGroup {
  steps: StepItem[];
  /** Content rendered after this group, outside the timeline (e.g. a CTA card). */
  after?: React.ReactNode;
}

export interface StepsSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  steps?: StepItem[];
  /** 'default': horizontal row (vertical on mobile). 'timeline': vertical numbered timeline with a fading accent line. */
  variant?: 'default' | 'timeline';
  /** Timeline only — step groups with optional interstitial content; overrides `steps`. Numbering continues across groups. */
  groups?: StepGroup[];
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

function TimelineGroup({
  steps,
  startNumber,
  fadeIn,
}: {
  steps: StepItem[];
  startNumber: number;
  fadeIn: boolean;
}) {
  const fadePx = 48;
  return (
    <div className="relative">
      {/* Accent line: optional fade-in head, solid middle, fade-out tail */}
      {fadeIn && (
        <div
          aria-hidden="true"
          className="absolute left-[19px] w-1 bg-gradient-to-b from-transparent to-primary"
          style={{ top: 0, height: fadePx }}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute left-[19px] w-1 bg-primary"
        style={{
          top: fadeIn ? fadePx : 20,
          height: fadeIn ? `calc(100% - ${fadePx}px)` : 'calc(100% - 20px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-[19px] w-1 bg-gradient-to-b from-primary to-transparent"
        style={{ top: '100%', height: fadePx }}
      />

      <div className="space-y-10" style={fadeIn ? { paddingTop: fadePx } : undefined}>
        {steps.map((step, i) => (
          <FadeIn key={step.title} direction="up" delay={i * 80}>
            <div className="relative flex gap-5">
              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary text-lg font-bold text-primary-foreground">
                {step.emoji ?? startNumber + i}
              </div>
              <div className="flex-1 pt-1 pb-2">
                <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                <div className="text-sm leading-relaxed text-muted-foreground">{step.description}</div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export function StepsSection({
  badge = 'How it works',
  title = 'From zero to shipped',
  description,
  steps,
  variant = 'default',
  groups,
  surface,
}: StepsSectionProps) {
  const sectionClasses = useSectionSurface(surface);

  if (variant === 'timeline') {
    const resolvedGroups: StepGroup[] = groups ?? (steps ? [{ steps }] : []);
    let nextNumber = 1;

    return (
      <section className={sectionClasses}>
        <div className="px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionTitle badge={badge} title={title} description={description} className="text-left [&>p]:mx-0" />
            <div className="mt-12">
              {resolvedGroups.map((group, groupIndex) => {
                const startNumber = nextNumber;
                nextNumber += group.steps.length;
                return (
                  <React.Fragment key={groupIndex}>
                    <div className={cn(groupIndex > 0 && 'mt-10')}>
                      <TimelineGroup steps={group.steps} startNumber={startNumber} fadeIn={groupIndex > 0} />
                    </div>
                    {group.after && <div className="mt-16">{group.after}</div>}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const resolvedSteps = steps ?? [];

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle badge={badge} title={title} description={description} />

          <div className="mt-12">
            {/* Desktop: horizontal row */}
            <div className="hidden sm:grid" style={{ gridTemplateColumns: `repeat(${resolvedSteps.length}, 1fr)` }}>
              {resolvedSteps.map((step, i) => (
                <FadeIn key={step.title} direction="up" delay={i * 80}>
                  <div className="relative flex flex-col items-center text-center px-4">
                    {/* Dashed connector to next step */}
                    {i < resolvedSteps.length - 1 && (
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
                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="flex flex-col gap-0 sm:hidden">
              {resolvedSteps.map((step, i) => (
                <FadeIn key={step.title} direction="up" delay={i * 80}>
                  <div className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Vertical connector */}
                    {i < resolvedSteps.length - 1 && (
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
                      <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</div>
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
