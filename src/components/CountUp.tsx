'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface CountUpProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  once?: boolean;
}

export function CountUp({
  from = 0,
  to,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  once = true,
  className,
  ...props
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [value, setValue] = React.useState(from);
  const hasStarted = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!once || !hasStarted.current)) {
          hasStarted.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration, once]);

  return (
    <span ref={ref} className={cn(className)} {...props}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  );
}
