'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';
import { FeatureCard } from '../components/FeatureCard';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface CarouselSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  features: Array<{ icon: LucideIcon; title: string; description: string; href?: string }>;
}

/**
 * Horizontally scrolling card carousel for feature-style content.
 * Scroll-snap based with prev/next controls — no carousel dependency.
 */
export function CarouselSection({
  title = 'Explore the platform',
  description,
  badge = 'Features',
  features,
}: CarouselSectionProps) {
  const mode = useUIVariant();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const updateScrollState = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 8);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
  }, []);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    return () => {
      track.removeEventListener('scroll', updateScrollState);
      observer.disconnect();
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-carousel-item]');
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const sectionClasses = cn(
    'overflow-hidden bg-card',
    mode === 'smooth' && 'rounded-3xl border',
    mode === 'playful' && 'rounded-2xl border-primary/25 border',
    !mode && 'rounded-2xl border',
  );

  const controlClasses = cn(
    'flex size-9 items-center justify-center border bg-background text-foreground transition-colors',
    'hover:bg-muted disabled:opacity-40 disabled:hover:bg-background',
    mode === 'smooth' ? 'rounded-2xl' : 'rounded-xl',
  );

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title={title} description={description} badge={badge} />

          <FadeIn direction="up">
            <div className="mt-10 flex items-center justify-end gap-2">
              <button
                type="button"
                aria-label="Previous"
                className={controlClasses}
                onClick={() => scrollByCard(-1)}
                disabled={!canPrev}
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className={controlClasses}
                onClick={() => scrollByCard(1)}
                disabled={!canNext}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <div
              ref={trackRef}
              className="mt-4 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {features.map((feature) => (
                <div
                  key={feature.title}
                  data-carousel-item
                  className="w-[280px] shrink-0 snap-start sm:w-[320px]"
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    href={feature.href}
                  />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
