'use client';

import * as React from 'react';
import { Badge, cn } from '@olwiba/cn';
import { FadeIn } from '../motion/FadeIn';

export interface SectionTitleProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  /**
   * Heading element for the title. Pass `'h1'` when this section opens the
   * page, so the page has exactly one top-level heading. @default 'h2'
   */
  titleAs?: 'h1' | 'h2';
  /**
   * Horizontal alignment. `'start'` suits split and rail layouts, where the
   * heading shares a left edge with the content beneath or beside it.
   * @default 'center'
   */
  align?: 'center' | 'start';
}

/** The eyebrow pill above a section heading; shared so every section's label matches. */
export const sectionBadgeClassName =
  'pointer-events-none cursor-default border-primary/25 bg-card/80 px-3 py-1 text-foreground shadow-[0_0_24px_-6px_color-mix(in_srgb,var(--primary)_32%,transparent)]';

export function SectionTitle({
  title,
  description,
  badge,
  className,
  titleAs: Title = 'h2',
  align = 'center',
}: SectionTitleProps) {
  const start = align === 'start';

  return (
    <FadeIn direction="up">
      <div className={cn(start ? 'text-left' : 'text-center', className)}>
        {badge && (
          <Badge
            variant="outline"
            data-section-badge=""
            className={cn('mb-4', sectionBadgeClassName)}
          >
            {badge}
          </Badge>
        )}
        <Title className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </Title>
        {description && (
          <p
            className={cn('mt-4 max-w-2xl text-pretty text-muted-foreground', !start && 'mx-auto')}
          >
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
