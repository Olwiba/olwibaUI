'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
  children: React.ReactNode;
}

const translateMap = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
  none: '',
};

export function FadeIn({
  delay = 0,
  duration = 600,
  direction = 'up',
  once = true,
  children,
  className,
  style,
  ...props
}: FadeInProps) {
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

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all',
        visible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${translateMap[direction]}`,
        className,
      )}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
