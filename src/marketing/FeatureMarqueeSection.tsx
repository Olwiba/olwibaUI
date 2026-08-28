'use client';

import type { LucideIcon } from 'lucide-react';
import { cn } from '@olwiba/cn';
import { useSectionSurface, type MarketingSurface } from './section-surface';
import { SectionTitle } from './SectionTitle';
import { FadeIn } from '../motion/FadeIn';

export interface FeatureMarqueeItem {
  icon: LucideIcon;
  title: string;
}

export interface FeatureMarqueeRow {
  items: FeatureMarqueeItem[];
  direction?: 'left' | 'right';
}

export interface FeatureMarqueeSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  rows: FeatureMarqueeRow[];
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

const speedDuration = {
  slow: '280s',
  normal: '180s',
  fast: '100s',
} as const;

export function FeatureMarqueeSection({
  badge,
  title,
  description,
  rows,
  speed = 'normal',
  pauseOnHover = true,
  surface,
}: FeatureMarqueeSectionProps) {
  const duration = speedDuration[speed];
  const sectionClasses = useSectionSurface(surface);

  return (
    <section className={sectionClasses}>
      <div className="py-14 sm:py-20">
        {(title || badge || description) && (
          <FadeIn direction="up">
            <div className="mx-auto mb-10 max-w-4xl px-6 sm:px-10">
              <SectionTitle title={title ?? ''} description={description} badge={badge} />
            </div>
          </FadeIn>
        )}

        <div className="space-y-3">
          {rows.map((row, i) => {
            const direction = row.direction ?? (i % 2 === 0 ? 'left' : 'right');
            const reversed = direction === 'right';
            // Repeat enough that one set exceeds 4K viewport (~3840px).
            const set = Array.from({ length: 4 }, () => row.items).flat();
            const items = [...set, ...set];

            return (
              <div
                key={i}
                className="group relative overflow-hidden"
                style={{
                  maskImage:
                    'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                }}
              >
                <div
                  className={cn(
                    'flex w-max gap-3 py-0.5',
                    pauseOnHover && 'group-hover:[animation-play-state:paused]',
                  )}
                  style={{
                    animation: `${reversed ? 'feature-marquee-right' : 'feature-marquee-left'} ${duration} linear infinite`,
                  }}
                >
                  {items.map((item, j) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={`${item.title}-${j}`}
                        className="flex shrink-0 items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm shadow-sm"
                      >
                        <Icon className="size-3.5 shrink-0 text-primary" />
                        <span className="whitespace-nowrap text-foreground">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes feature-marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes feature-marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
