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
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

export function GroupedFeaturesSection({
  badge = 'Features',
  title = 'Everything you need to ship',
  description,
  groups,
  surface,
}: GroupedFeaturesSectionProps) {
  const sectionClasses = useSectionSurface(surface);

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
