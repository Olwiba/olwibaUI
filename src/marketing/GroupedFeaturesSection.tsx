'use client';

import type { LucideIcon } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';
import { FeatureCard } from '../components/FeatureCard';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';
import { FadeIn } from '../motion/FadeIn';

export interface GroupedFeatureGroup {
  label: string;
  features: Array<{ icon: LucideIcon; title: string; description: string; href?: string }>;
}

export interface GroupedFeaturesSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  groups: GroupedFeatureGroup[];
}

export function GroupedFeaturesSection({
  badge = 'Features',
  title = 'Everything you need to ship',
  description,
  groups,
}: GroupedFeaturesSectionProps) {
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
