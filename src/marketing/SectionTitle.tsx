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
}

export function SectionTitle({
  title,
  description,
  badge,
  className,
  titleAs: Title = 'h2',
}: SectionTitleProps) {
  return (
    <FadeIn direction="up">
      <div className={cn('text-center', className)}>
        {badge && <Badge variant="secondary" className="mb-4">{badge}</Badge>}
        <Title className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </Title>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
