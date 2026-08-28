'use client';

import { TestimonialCard } from '../components/TestimonialCard';
import { SectionTitle } from './SectionTitle';
import { StaggerChildren } from '../motion/StaggerChildren';
import { useSectionSurface, type MarketingSurface } from './section-surface';

export interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    company?: string;
    avatar?: string;
    initials?: string;
    rating?: number;
  }>;
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

export function TestimonialsSection({
  title = 'Trusted by teams shipping real products',
  description = "Here's what engineers and product teams say after using Olwiba in production.",
  badge = 'Testimonials',
  testimonials,
  surface,
}: TestimonialsSectionProps) {
  const sectionClasses = useSectionSurface(surface);
  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title={title} description={description} badge={badge} />

          <StaggerChildren className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="mb-4 break-inside-avoid transition-transform hover:-translate-y-0.5"
              >
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  company={t.company}
                  avatar={t.avatar}
                  initials={t.initials}
                  rating={t.rating}
                />
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
