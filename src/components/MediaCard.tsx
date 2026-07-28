'use client';

import * as React from 'react';
import { Card, cn } from '@olwiba/cn';

const bannerAspectClass = {
  wide: 'aspect-[3/1]',
  video: 'aspect-video',
  square: 'aspect-square',
};

export interface MediaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Banner rendered above the content, clipped to the card's rounded corners.
   * A ReactNode rather than a src, so a brand fallback, an inline SVG, a map,
   * or a plain <img> all work — this is the difference from ImageCard, which
   * takes a URL and is the right choice when you actually have one.
   */
  banner?: React.ReactNode;
  /** Banner proportions. Default 'wide' (3:1), which suits a header strip. */
  bannerAspect?: keyof typeof bannerAspectClass;
  /**
   * Pinned to the bottom of the card. In a grid this is what keeps the
   * primary action on a shared baseline across a row, however unevenly the
   * titles above it wrap.
   */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * A Card with an optional banner and a bottom-pinned footer.
 *
 * Deliberately knows nothing about what it is showing — the domain-shaped
 * cards (a property, a monitor, an article) compose this and supply their own
 * content. It exists because "banner, then content, then an action pinned to
 * the bottom, all the same height across a row" was being hand-rolled per
 * product, and the equal-height part in particular is easy to get subtly
 * wrong.
 *
 * `h-full` is on the card itself so a bare `<MediaCard>` inside a grid cell
 * fills that cell without every caller remembering to ask.
 */
export function MediaCard({
  banner,
  bannerAspect = 'wide',
  footer,
  children,
  className,
  ...props
}: MediaCardProps) {
  return (
    <Card
      className={cn('flex h-full w-full flex-col overflow-hidden', banner && 'pt-0', className)}
      {...props}
    >
      {banner && (
        <div className={cn('w-full shrink-0 overflow-hidden', bannerAspectClass[bannerAspect])}>
          {banner}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {children}
        {footer && <div className="mt-auto pt-1">{footer}</div>}
      </div>
    </Card>
  );
}
