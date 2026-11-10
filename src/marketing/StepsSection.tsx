'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { useSectionSurface, type MarketingSurface } from './section-surface';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';
import { useProgressiveReveal } from '../motion/use-progressive-reveal';

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
  /** 'connected': sequential glowing steps. 'default': horizontal row. 'timeline': vertical numbered timeline. */
  variant?: 'default' | 'timeline' | 'connected';
  /** Timeline only — step groups with optional interstitial content; overrides `steps`. Numbering continues across groups. */
  groups?: StepGroup[];
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

/** One clock makes each arrival follow the end of the previous connector. */
function ConnectedSteps({ steps }: { steps: StepItem[] }) {
  const beat = 650;
  const [ref, revealState] = useProgressiveReveal<HTMLOListElement>({
    settleAfter: Math.max(1, steps.length) * beat,
  });
  const moving = revealState !== 'static';
  const animating = revealState === 'revealed';
  const hidden = revealState === 'hidden';

  return (
    <ol
      ref={ref}
      data-step-sequence
      data-reveal={revealState}
      className="relative isolate mt-12 grid gap-8 lg:grid-cols-[repeat(var(--step-count),minmax(0,1fr))]"
      style={{ '--step-count': Math.max(1, steps.length) } as React.CSSProperties}
    >
      {steps.map((step, index) => {
        const arrival = index * beat;
        const arrivalStyle = animating
          ? { transitionDuration: '380ms', transitionDelay: arrival + 'ms' }
          : undefined;

        return (
          <li key={step.title} className="relative">
            {index < steps.length - 1 && (
              <div
                aria-hidden="true"
                data-step-connector
                className="pointer-events-none absolute left-1/2 top-full z-10 h-8 w-0.5 -translate-x-1/2 lg:left-[calc(50%_+_1.5rem)] lg:top-[calc(3rem_-_1px)] lg:h-0.5 lg:w-[calc(100%_-_1rem)] lg:translate-x-0"
              >
                <div
                  data-step-connector-draw
                  className={cn(
                    'absolute inset-0 border-l-2 border-dashed border-primary/60 lg:border-l-0 lg:border-t-2',
                    animating && 'motion-safe:transition-[clip-path] motion-safe:ease-linear',
                    hidden
                      ? '[clip-path:inset(0_0_100%_0)] lg:[clip-path:inset(0_100%_0_0)]'
                      : '[clip-path:inset(0)]',
                  )}
                  style={
                    animating
                      ? { transitionDuration: '450ms', transitionDelay: arrival + 200 + 'ms' }
                      : undefined
                  }
                />
              </div>
            )}
            <div
              data-step-node
              className="relative flex h-full flex-col items-center gap-4 p-6 text-center"
            >
              <span
                aria-hidden="true"
                data-step-glow
                className={cn(
                  // Sits exactly under the icon (p-6 down, size-12) and carries only a
                  // shadow: a blurred, pulled-in box-shadow falls off smoothly from the
                  // circle's edge, the same soft accent glow the hero screenshot has.
                  'pointer-events-none absolute left-1/2 top-6 -z-10 size-12 -translate-x-1/2 rounded-full shadow-[0_0_32px_-6px_color-mix(in_srgb,var(--primary)_32%,transparent)]',
                  animating && 'motion-safe:transition-[opacity,scale] motion-safe:ease-out',
                  moving && (hidden ? 'scale-75 opacity-0' : 'scale-100 opacity-100'),
                )}
                style={
                  animating
                    ? { transitionDuration: '650ms', transitionDelay: arrival + 'ms' }
                    : undefined
                }
              />
              <div
                data-step-icon
                className={cn(
                  // Above the connectors (z-10): the pop-in overshoots past the circle's
                  // resting edge, and the line must not draw across the opaque disc.
                  'relative z-20 grid size-12 shrink-0 place-items-center rounded-full bg-card text-2xl leading-none text-primary ring-1 ring-primary/30',
                  animating &&
                    'motion-safe:transition-[opacity,scale] motion-safe:ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                  moving && (hidden ? 'scale-75 opacity-0' : 'scale-100 opacity-100'),
                )}
                style={arrivalStyle}
              >
                {step.emoji ?? <span className="text-sm font-semibold">{index + 1}</span>}
              </div>
              <div
                data-step-copy
                className={cn(
                  animating && 'motion-safe:transition-[opacity,translate] motion-safe:ease-out',
                  moving && (hidden ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'),
                )}
                style={arrivalStyle}
              >
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <div className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {step.description}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
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
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </div>
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

  if (variant === 'connected') {
    const resolvedSteps = steps ?? [];

    return (
      <section className={sectionClasses}>
        <div className="px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle badge={badge} title={title} description={description} />
            <ConnectedSteps steps={resolvedSteps} />
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'timeline') {
    const resolvedGroups: StepGroup[] = groups ?? (steps ? [{ steps }] : []);
    let nextNumber = 1;

    return (
      <section className={sectionClasses}>
        <div className="px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionTitle
              badge={badge}
              title={title}
              description={description}
              className="text-left [&>p]:mx-0"
            />
            <div className="mt-12">
              {resolvedGroups.map((group, groupIndex) => {
                const startNumber = nextNumber;
                nextNumber += group.steps.length;
                return (
                  <React.Fragment key={groupIndex}>
                    <div className={cn(groupIndex > 0 && 'mt-10')}>
                      <TimelineGroup
                        steps={group.steps}
                        startNumber={startNumber}
                        fadeIn={groupIndex > 0}
                      />
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
            <div
              className="hidden sm:grid"
              style={{ gridTemplateColumns: `repeat(${resolvedSteps.length}, 1fr)` }}
            >
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
                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </div>
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
                      <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </div>
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
