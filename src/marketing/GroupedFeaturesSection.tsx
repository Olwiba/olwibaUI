'use client';

import type { LucideIcon } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';
import { FadeIn } from '../motion/FadeIn';
import { useSectionSurface, type MarketingSurface } from './section-surface';

export interface GroupedFeatureGroup {
  label: string;
  features: Array<{ icon: LucideIcon; title: string; description: string; href?: string }>;
}

export interface GroupedFeaturesSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  groups: GroupedFeatureGroup[];
  /**
   * `'stacked'`: each group's label sits above its cards, under a centred
   * heading. `'rail'`: from `lg` the labels move into a numbered left column
   * beside their cards and the heading aligns with them, which shortens a long
   * catalogue and gives it an index to scan. Below `lg` both stack.
   * @default 'stacked'
   */
  layout?: 'stacked' | 'rail';
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

export function GroupedFeaturesSection({
  badge = 'Features',
  title = 'Everything you need to ship',
  description,
  groups,
  layout = 'stacked',
  surface,
}: GroupedFeaturesSectionProps) {
  const sectionClasses = useSectionSurface(surface);

  if (layout === 'rail') {
    return (
      <section className={sectionClasses}>
        <div className="px-6 py-14 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title={title} description={description} badge={badge} align="start" />

            <div className="mt-10 sm:mt-14">
              {groups.map((group, i) => (
                <div
                  key={group.label}
                  className="grid gap-6 border-t py-8 last:pb-0 sm:py-10 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10"
                >
                  <FadeIn direction="up" delay={i * 60}>
                    <div className="flex items-baseline gap-3 lg:flex-col lg:gap-2">
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs font-medium tabular-nums text-primary"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-base font-semibold leading-snug tracking-tight text-foreground">
                        {group.label}
                      </p>
                    </div>
                  </FadeIn>
                  <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.features.map((feature) => (
                      <FeatureCard
                        key={feature.title}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        href={feature.href}
                      />
                    ))}
                  </StaggerChildren>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title={title} description={description} badge={badge} />

          <div className="mt-14 space-y-14">
            {groups.map((group, i) => (
              <div key={group.label}>
                <FadeIn direction="up" delay={i * 60}>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                      {group.label}
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                </FadeIn>
                <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.features.map((feature) => (
                    <FeatureCard
                      key={feature.title}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      href={feature.href}
                    />
                  ))}
                </StaggerChildren>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
