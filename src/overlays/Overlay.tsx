'use client';

import * as React from 'react';
import { cn } from '@olwiba/cn';
import { Loader2 } from 'lucide-react';

// ─── Dim ──────────────────────────────────────────────────────────────────────

interface DimOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
}

function DimOverlay({ opacity = 0.5, className, style, ...props }: DimOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 bg-background', className)}
      style={{ opacity, ...style }}
      {...props}
    />
  );
}

// ─── Scrim ────────────────────────────────────────────────────────────────────

type ScrimDirection = 'top' | 'bottom' | 'left' | 'right';

interface ScrimOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ScrimDirection;
  color?: string;
}

const scrimGradients: Record<ScrimDirection, string> = {
  bottom: 'to bottom',
  top: 'to top',
  left: 'to left',
  right: 'to right',
};

function ScrimOverlay({ direction = 'bottom', color = 'var(--background)', className, style, ...props }: ScrimOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-x-0 bottom-0 h-1/2', className)}
      style={{
        background: `linear-gradient(${scrimGradients[direction]}, transparent, ${color})`,
        ...style,
      }}
      {...props}
    />
  );
}

// ─── Loading ──────────────────────────────────────────────────────────────────

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

function LoadingOverlay({ label, className, ...props }: LoadingOverlayProps) {
  return (
    <div
      role="status"
      className={cn('absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 backdrop-blur-sm', className)}
      {...props}
    >
      <Loader2 className="size-5 animate-spin text-muted-foreground" />
      {label && <p className="text-xs text-muted-foreground">{label}</p>}
    </div>
  );
}

// ─── Public API ───────────────────────────────────────────────────────────────

type OverlayVariant = 'dim' | 'scrim' | 'loading';

type OverlayProps =
  | ({ variant: 'dim' } & DimOverlayProps)
  | ({ variant: 'scrim' } & ScrimOverlayProps)
  | ({ variant: 'loading' } & LoadingOverlayProps);

export function Overlay(props: OverlayProps) {
  if (props.variant === 'dim') return <DimOverlay {...(props as DimOverlayProps)} />;
  if (props.variant === 'scrim') return <ScrimOverlay {...(props as ScrimOverlayProps)} />;
  return <LoadingOverlay {...(props as LoadingOverlayProps)} />;
}

export type { OverlayProps, OverlayVariant };
