'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

export interface GlowEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  followCursor?: boolean;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

const blurClass = {
  sm: 'blur-xl',
  md: 'blur-2xl',
  lg: 'blur-3xl',
  xl: 'blur-[80px]',
};

export function GlowEffect({
  size = 400,
  color = 'hsl(var(--primary) / 0.3)',
  followCursor = false,
  blur = 'lg',
  className,
  style,
  ...props
}: GlowEffectProps) {
  const [pos, setPos] = React.useState({ x: '50%', y: '50%' });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!followCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({
        x: `${e.clientX - rect.left}px`,
        y: `${e.clientY - rect.top}px`,
      });
    };

    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, [followCursor]);

  return (
    <div ref={containerRef} className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} {...props}>
      <div
        aria-hidden="true"
        className={cn('absolute rounded-full', blurClass[blur])}
        style={{
          width: size,
          height: size,
          background: color,
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          transition: followCursor ? 'none' : undefined,
          ...style,
        }}
      />
    </div>
  );
}
