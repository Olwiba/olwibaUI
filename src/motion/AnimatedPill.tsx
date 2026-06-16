'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@olwiba/cn';

export interface AnimatedPillProps {
  labels: string[];
  interval?: number;
  className?: string;
}

export function AnimatedPill({ labels, interval = 3800, className }: AnimatedPillProps) {
  const pillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pill = pillRef.current;
    const text = textRef.current;
    if (!pill || !text || labels.length < 2) return;

    pill.style.width = pill.offsetWidth + 'px';
    pill.dataset.w = String(pill.offsetWidth);

    let idx = 0;

    const cycle = () => {
      idx = (idx + 1) % labels.length;

      text.style.transition = 'opacity 140ms ease';
      text.style.opacity = '0';

      setTimeout(() => {
        text.textContent = labels[idx] ?? '';

        const oldW = parseFloat(pill.dataset.w ?? '0');
        pill.style.transition = 'none';
        pill.style.width = 'auto';
        const newW = pill.offsetWidth;

        pill.style.width = oldW + 'px';
        void pill.offsetWidth;

        pill.style.transition = 'width 280ms cubic-bezier(0.4, 0, 0.2, 1)';
        pill.style.width = newW + 'px';
        pill.dataset.w = String(newW);

        setTimeout(() => {
          text.style.transition = 'opacity 140ms ease';
          text.style.opacity = '1';
        }, 260);
      }, 150);
    };

    const id = setInterval(cycle, interval);
    return () => clearInterval(id);
  }, [labels, interval]);

  if (!labels.length) return null;

  return (
    <span
      ref={pillRef}
      className={cn(
        'inline-flex items-center overflow-hidden whitespace-nowrap rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground',
        className,
      )}
    >
      <span ref={textRef}>{labels[0]}</span>
    </span>
  );
}
