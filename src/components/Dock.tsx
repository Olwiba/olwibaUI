'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, cn } from '@olwiba/cn';

export interface DockItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  iconSize?: number;
  magnification?: number;
}

const BASE = 40;
const MAGNIFY_RADIUS = 80;

export function Dock({ items, iconSize = BASE, magnification = 1.7, className, ...props }: DockProps) {
  const [mouseX, setMouseX] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  function getScale(index: number): number {
    if (mouseX === null || !containerRef.current) return 1;
    const container = containerRef.current;
    const buttons = container.querySelectorAll<HTMLElement>('[data-dock-item]');
    const btn = buttons[index];
    if (!btn) return 1;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);
    if (distance > MAGNIFY_RADIUS) return 1;
    const t = 1 - distance / MAGNIFY_RADIUS;
    return 1 + (magnification - 1) * t;
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div
        ref={containerRef}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className={cn(
          'inline-flex items-end gap-2 rounded-2xl border bg-background/80 px-4 py-3 shadow-lg backdrop-blur-md',
          className,
        )}
        {...props}
      >
        {items.map((item, i) => {
          const scale = getScale(i);
          const size = iconSize * scale;

          const button = (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <button
                  data-dock-item
                  onClick={item.onClick}
                  className="flex items-center justify-center rounded-xl bg-muted text-foreground transition-colors hover:bg-accent"
                  style={{
                    width: size,
                    height: size,
                    transition: 'width 100ms ease, height 100ms ease',
                    transformOrigin: 'bottom center',
                  }}
                  aria-label={item.label}
                >
                  <item.icon style={{ width: size * 0.5, height: size * 0.5 }} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={8}>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );

          if (item.href) {
            return (
              <a key={item.label} href={item.href}>
                {button}
              </a>
            );
          }

          return button;
        })}
      </div>
    </TooltipProvider>
  );
}
