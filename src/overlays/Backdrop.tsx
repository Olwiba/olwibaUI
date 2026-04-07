'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';

// ─── Gradient ─────────────────────────────────────────────────────────────────

interface GradientBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'mesh' | 'radial' | 'aurora';
  animated?: boolean;
}

function GradientBackdrop({ variant, animated = true, className, children, ...props }: GradientBackdropProps) {
  const gradients: Record<string, string> = {
    mesh: [
      'radial-gradient(at 20% 20%, hsl(var(--primary) / 0.3) 0px, transparent 50%)',
      'radial-gradient(at 80% 10%, hsl(var(--chart-2) / 0.2) 0px, transparent 50%)',
      'radial-gradient(at 10% 80%, hsl(var(--chart-3) / 0.2) 0px, transparent 50%)',
      'radial-gradient(at 90% 90%, hsl(var(--chart-4) / 0.2) 0px, transparent 50%)',
    ].join(', '),
    radial: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)',
    aurora: [
      'radial-gradient(at 30% 50%, hsl(var(--primary) / 0.4) 0px, transparent 50%)',
      'radial-gradient(at 70% 30%, hsl(var(--chart-2) / 0.3) 0px, transparent 50%)',
      'radial-gradient(at 50% 80%, hsl(var(--chart-3) / 0.25) 0px, transparent 40%)',
    ].join(', '),
  };

  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          animated && 'animate-[gradient_8s_ease_infinite]',
        )}
        style={{ backgroundImage: gradients[variant] }}
      />
      {children}
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

interface GridBackdropProps extends React.SVGAttributes<SVGElement> {
  variant: 'dots' | 'lines' | 'cross';
  size?: number;
  className?: string;
}

function GridBackdrop({ variant, size = 24, className, ...props }: GridBackdropProps) {
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
      className={cn('pointer-events-none absolute inset-0 h-full w-full text-border', className)}
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

// ─── Noise ────────────────────────────────────────────────────────────────────

interface NoiseBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
}

function NoiseBackdrop({ opacity = 0.04, blendMode = 'overlay', className, style, ...props }: NoiseBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        opacity,
        mixBlendMode: blendMode,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
        ...style,
      }}
      {...props}
    />
  );
}

// ─── Glow ─────────────────────────────────────────────────────────────────────

const blurClass = { sm: 'blur-xl', md: 'blur-2xl', lg: 'blur-3xl', xl: 'blur-[80px]' } as const;

interface GlowBackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  followCursor?: boolean;
  blur?: keyof typeof blurClass;
}

function GlowBackdrop({
  size = 400,
  color = 'hsl(var(--primary) / 0.3)',
  followCursor = false,
  blur = 'lg',
  className,
  style,
  ...props
}: GlowBackdropProps) {
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
          ...style,
        }}
      />
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

type BackdropVariant = 'mesh' | 'radial' | 'aurora' | 'dots' | 'lines' | 'cross' | 'noise' | 'glow';

type BackdropProps = { variant: BackdropVariant; className?: string } & (
  | ({ variant: 'mesh' | 'radial' | 'aurora' } & Omit<GradientBackdropProps, 'variant'>)
  | ({ variant: 'dots' | 'lines' | 'cross' } & Omit<GridBackdropProps, 'variant'>)
  | ({ variant: 'noise' } & Omit<NoiseBackdropProps, 'variant'>)
  | ({ variant: 'glow' } & Omit<GlowBackdropProps, 'variant'>)
);

export function Backdrop(props: BackdropProps) {
  const { variant } = props;

  if (variant === 'mesh' || variant === 'radial' || variant === 'aurora') {
    return <GradientBackdrop {...(props as GradientBackdropProps)} />;
  }
  if (variant === 'dots' || variant === 'lines' || variant === 'cross') {
    return <GridBackdrop {...(props as GridBackdropProps)} />;
  }
  if (variant === 'noise') {
    return <NoiseBackdrop {...(props as NoiseBackdropProps)} />;
  }
  return <GlowBackdrop {...(props as GlowBackdropProps)} />;
}

export type { BackdropProps, BackdropVariant };
