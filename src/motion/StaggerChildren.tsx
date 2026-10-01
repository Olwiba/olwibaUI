'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { useProgressiveReveal } from './use-progressive-reveal';

export interface StaggerChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
  stagger?: number;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  children: React.ReactNode;
}

const translateMap = {
  up: [0, 20],
  down: [0, -20],
  left: [20, 0],
  right: [-20, 0],
  none: [0, 0],
};

export function StaggerChildren({
  stagger = 80,
  delay = 0,
  duration = 500,
  direction = 'up',
  once = true,
  children,
  className,
  ...props
}: StaggerChildrenProps) {
  const [ref, revealState] = useProgressiveReveal<HTMLDivElement>({ once });
  const hidden = revealState === 'hidden';

  const [tx, ty] = translateMap[direction];

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {React.Children.map(children, (child, i) => (
        <div
          className="h-full"
          style={{
            transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
            transitionDelay: `${delay + i * stagger}ms`,
            opacity: hidden ? 0 : 1,
            transform: hidden ? `translate(${tx}px,${ty}px)` : 'translate(0,0)',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
