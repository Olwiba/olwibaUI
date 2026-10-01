'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { useProgressiveReveal } from './use-progressive-reveal';

export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  /** Animate immediately with CSS instead of waiting for a scroll reveal. */
  eager?: boolean;
  children: React.ReactNode;
}

const translateMap = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
  none: '',
};

const enterMap = {
  up: 'motion-safe:slide-in-from-bottom-6',
  down: 'motion-safe:slide-in-from-top-6',
  left: 'motion-safe:slide-in-from-right-6',
  right: 'motion-safe:slide-in-from-left-6',
  none: '',
};

export function FadeIn({
  delay = 0,
  duration = 600,
  direction = 'up',
  once = true,
  eager = false,
  children,
  className,
  style,
  ...props
}: FadeInProps) {
  const [ref, revealState] = useProgressiveReveal<HTMLDivElement>({ enabled: !eager, once });
  const hidden = revealState === 'hidden';

  return (
    <div
      ref={ref}
      className={cn(
        eager
          ? cn(
              'motion-safe:animate-in motion-safe:fade-in motion-reduce:animate-none',
              enterMap[direction],
            )
          : 'motion-safe:transition-[opacity,transform]',
        hidden ? `opacity-0 ${translateMap[direction]}` : 'opacity-100 translate-x-0 translate-y-0',
        'motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        className,
      )}
      style={
        eager
          ? { animationDuration: `${duration}ms`, animationDelay: `${delay}ms`, ...style }
          : { transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms`, ...style }
      }
      {...props}
    >
      {children}
    </div>
  );
}
