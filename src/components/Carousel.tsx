'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';

export interface CarouselProps {
  /** Items to scroll through — each child becomes one snap slide. */
  children: React.ReactNode;
  /** Width classes applied to each slide. @default 'w-[280px] sm:w-[320px]' */
  itemClassName?: string;
  /** Prev/next control placement. @default 'top-right' */
  controls?: 'top-right' | 'none';
  /** Accessible label for the scroll region. */
  ariaLabel?: string;
  className?: string;
}

/**
 * Scroll-snap carousel behavior — wraps any children in a horizontally
 * scrolling track with prev/next controls. A mechanic, not a section:
 * feed it cards, images, or whole blocks. No carousel dependency.
 */
export function Carousel({
  children,
  itemClassName = 'w-[280px] sm:w-[320px]',
  controls = 'top-right',
  ariaLabel,
  className,
}: CarouselProps) {
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

  const scrollByItem = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.querySelector<HTMLElement>('[data-carousel-item]');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    const step = item ? item.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const controlClasses = cn(
    'flex size-9 items-center justify-center border bg-background text-foreground transition-colors',
    'hover:bg-muted disabled:opacity-40 disabled:hover:bg-background',
    mode === 'smooth' ? 'rounded-2xl' : 'rounded-xl',
  );

  return (
    <div className={className}>
      {controls === 'top-right' && (
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            type="button"
            aria-label="Previous"
            className={controlClasses}
            onClick={() => scrollByItem(-1)}
            disabled={!canPrev}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className={controlClasses}
            onClick={() => scrollByItem(1)}
            disabled={!canNext}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {React.Children.map(children, (child) =>
          child == null ? null : (
            <div data-carousel-item className={cn('shrink-0 snap-start', itemClassName)}>
              {child}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
