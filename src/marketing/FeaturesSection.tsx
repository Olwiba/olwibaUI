'use client';

import type { LucideIcon } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';
import { FeatureCard } from '../components/FeatureCard';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';

export interface FeaturesSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  features: Array<{ icon: LucideIcon; title: string; description: string; href?: string }>;
}

export function FeaturesSection({
  title = 'Everything you need to ship fast',
  description = 'A complete system of components, blocks, and hooks designed to work together - and get out of your way.',
  badge = 'Features',
  features,
}: FeaturesSectionProps) {
  const mode = useUIVariant()
  const sectionClasses = cn(
    'overflow-hidden bg-card',
    mode === 'smooth' && 'rounded-3xl border',
    mode === 'playful' && 'rounded-2xl border-primary/25 border',
    !mode && 'rounded-2xl border',
  )
  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title={title} description={description} badge={badge} />

          <StaggerChildren className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
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
      </div>
    </section>
  );
}
