'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { useProgressiveReveal } from './use-progressive-reveal';

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
  const [ref, revealState] = useProgressiveReveal<HTMLSpanElement>({ once, threshold: 0.5 });
  // The useful value is the server fallback; animation may enhance it later.
  const [value, setValue] = React.useState(to);

  React.useEffect(() => {
    if (revealState === 'static') {
      setValue(to);
      return;
    }
    if (revealState === 'hidden') {
      setValue(from);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [from, to, duration, revealState]);

  return (
    <span ref={ref} className={cn(className)} {...props}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
