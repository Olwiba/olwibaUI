'use client';

import type { LucideIcon } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';
import { FeatureCard } from '../components/FeatureCard';
import { Carousel } from '../components/Carousel';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';
import { FadeIn } from '../motion/FadeIn';

export interface FeaturesSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  features: Array<{ icon: LucideIcon; title: string; description: string; href?: string }>;
  /** How the feature cards are arranged. @default 'grid' */
  layout?: 'grid' | 'carousel';
}

export function FeaturesSection({
  title = 'Everything you need to ship fast',
  description = 'A complete system of components, blocks, and hooks designed to work together - and get out of your way.',
  badge = 'Features',
  features,
  layout = 'grid',
}: FeaturesSectionProps) {
  const mode = useUIVariant()
  const sectionClasses = cn(
    'overflow-hidden bg-card',
    mode === 'smooth' && 'rounded-3xl border',
    mode === 'playful' && 'rounded-2xl border-primary/25 border',
    !mode && 'rounded-2xl border',
  )
  const cards = features.map((feature) => (
    <FeatureCard
      key={feature.title}
      icon={feature.icon}
      title={feature.title}
      description={feature.description}
      href={feature.href}
    />
  ));

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className={cn('mx-auto', layout === 'carousel' ? 'max-w-5xl' : 'max-w-4xl')}>
          <SectionTitle title={title} description={description} badge={badge} />

          {layout === 'carousel' ? (
            <FadeIn direction="up">
              <Carousel className="mt-10" ariaLabel={title}>
                {cards}
              </Carousel>
            </FadeIn>
          ) : (
            <StaggerChildren className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cards}
            </StaggerChildren>
          )}
        </div>
      </div>
    </section>
  );
}
