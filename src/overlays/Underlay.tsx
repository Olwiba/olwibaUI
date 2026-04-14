'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface GridUnderlayProps extends React.SVGAttributes<SVGElement> {
  variant: 'dots' | 'lines' | 'cross';
  size?: number;
  className?: string;
}

function GridUnderlay({ variant, size = 24, className, ...props }: GridUnderlayProps) {
  const id = React.useId();

  const pattern =
    variant === 'dots' ? (
      <circle cx={size / 2} cy={size / 2} r={1} fill="currentColor" />
    ) : variant === 'lines' ? (
      <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="currentColor" strokeWidth={0.5} />
    ) : (
      <>
        <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke="currentColor" strokeWidth={0.5} />
        <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke="currentColor" strokeWidth={0.5} />
      </>
    );

  return (
    <svg
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full text-foreground/15', className)}
      {...props}
    >
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          {pattern}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Glow ─────────────────────────────────────────────────────────────────────

const blurClass = { sm: 'blur-xl', md: 'blur-2xl', lg: 'blur-3xl', xl: 'blur-[80px]' } as const;

interface GlowUnderlayProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  followCursor?: boolean;
  blur?: keyof typeof blurClass;
}

function GlowUnderlay({
  size = 400,
  color = 'color-mix(in oklch, var(--primary) 45%, transparent)',
  followCursor = false,
  blur = 'lg',
  className,
  style,
  ...props
}: GlowUnderlayProps) {
  const [pos, setPos] = React.useState({ x: '50%', y: '50%' });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!followCursor) return;
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
          ...style,
        }}
      />
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

type UnderlayVariant = 'dots' | 'lines' | 'cross' | 'glow';

type UnderlayProps =
  | ({ variant: 'dots' | 'lines' | 'cross' } & Omit<GridUnderlayProps, 'variant'>)
  | ({ variant: 'glow' } & Omit<GlowUnderlayProps, 'variant'>);

export function Underlay(props: UnderlayProps) {
  if (props.variant === 'glow') {
    return <GlowUnderlay {...(props as GlowUnderlayProps)} />;
  }
  return <GridUnderlay {...(props as GridUnderlayProps)} />;
}

export type { UnderlayProps, UnderlayVariant };
