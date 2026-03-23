'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

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
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const [tx, ty] = translateMap[direction];

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {React.Children.map(children, (child, i) => (
        <div
          style={{
            transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
            transitionDelay: `${delay + i * stagger}ms`,
            opacity: visible ? 1 : 0,
            transform: visible ? 'translate(0,0)' : `translate(${tx}px,${ty}px)`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
