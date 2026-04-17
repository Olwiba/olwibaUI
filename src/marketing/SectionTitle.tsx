'use client';

import * as React from 'react';
import { Badge, cn } from '@olwiba/cn';
import { FadeIn } from '../motion/FadeIn';

export interface SectionTitleProps {
  title: string;
  description?: string;
  badge?: string;
  className?: string;
}

export function SectionTitle({ title, description, badge, className }: SectionTitleProps) {
  return (
    <FadeIn direction="up">
      <div className={cn('text-center', className)}>
        {badge && <Badge variant="secondary" className="mb-4">{badge}</Badge>}
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
