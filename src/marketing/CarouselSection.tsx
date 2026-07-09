'use client';

import type { LucideIcon } from 'lucide-react';
import { FeaturesSection } from './FeaturesSection';

export interface CarouselSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  features: Array<{ icon: LucideIcon; title: string; description: string; href?: string }>;
}

/**
 * @deprecated Use `FeaturesSection` with `layout="carousel"` instead, or wrap
 * your own content with the `Carousel` mechanic. Will be removed in 0.2.0.
 */
export function CarouselSection({
  title = 'Explore the platform',
  description,
  badge = 'Features',
  features,
}: CarouselSectionProps) {
  return (
    <FeaturesSection
      layout="carousel"
      title={title}
      description={description}
      badge={badge}
      features={features}
    />
  );
}
