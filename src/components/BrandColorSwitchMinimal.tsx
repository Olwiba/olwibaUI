'use client';

import * as React from 'react';
import { Palette } from 'lucide-react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@olwiba/cn';

interface BrandColor {
  name: string;
  label: string;
  css: string;
}

const BRAND_COLORS: BrandColor[] = [
  {
    name: 'zinc',
    label: 'Zinc',
    css: `
      :root { --primary: oklch(0.205 0 0); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.708 0 0); }
      .dark  { --primary: oklch(0.922 0 0); --primary-foreground: oklch(0.205 0 0); --ring: oklch(0.556 0 0); }
    `,
  },
  {
    name: 'blue',
    label: 'Blue',
    css: `
      :root { --primary: oklch(0.546 0.245 262.881); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.546 0.245 262.881); }
      .dark  { --primary: oklch(0.623 0.214 259.815); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.623 0.214 259.815); }
    `,
  },
  {
    name: 'emerald',
    label: 'Emerald',
    css: `
      :root { --primary: oklch(0.596 0.145 163.225); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.596 0.145 163.225); }
      .dark  { --primary: oklch(0.765 0.177 163.223); --primary-foreground: oklch(0.145 0 0); --ring: oklch(0.765 0.177 163.223); }
    `,
  },
  {
    name: 'purple',
    label: 'Purple',
    css: `
      :root { --primary: oklch(0.558 0.288 302.321); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.558 0.288 302.321); }
      .dark  { --primary: oklch(0.714 0.203 305.504); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.714 0.203 305.504); }
    `,
  },
  {
    name: 'rose',
    label: 'Rose',
    css: `
      :root { --primary: oklch(0.645 0.246 16.439); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.645 0.246 16.439); }
      .dark  { --primary: oklch(0.717 0.194 17.428); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.717 0.194 17.428); }
    `,
  },
  {
    name: 'orange',
    label: 'Orange',
    css: `
      :root { --primary: oklch(0.705 0.213 47.604); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.705 0.213 47.604); }
      .dark  { --primary: oklch(0.792 0.184 70.08); --primary-foreground: oklch(0.145 0 0); --ring: oklch(0.792 0.184 70.08); }
    `,
  },
  {
    name: 'slate',
    label: 'Slate',
    css: `
      :root { --primary: oklch(0.446 0.043 257.281); --primary-foreground: oklch(0.985 0 0); --ring: oklch(0.446 0.043 257.281); }
      .dark  { --primary: oklch(0.704 0.04 256.788); --primary-foreground: oklch(0.129 0.042 264.695); --ring: oklch(0.704 0.04 256.788); }
    `,
  },
];

// Preview hex values matched to each preset (used for swatch circles only)
const PREVIEW_HEX: Record<string, string> = {
  zinc: '#27272a',
  blue: '#3b82f6',
  emerald: '#10b981',
  purple: '#a855f7',
  rose: '#f43f5e',
  orange: '#f97316',
  slate: '#64748b',
};

const STORAGE_KEY = 'brand-color';
const STYLE_ID = 'brand-color-override';

function applyColor(color: BrandColor) {
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = color.css;
  localStorage.setItem(STORAGE_KEY, color.name);
}

function getInitialColorName(): string {
  if (typeof localStorage === 'undefined') return 'emerald';
  return localStorage.getItem(STORAGE_KEY) ?? 'emerald';
}

export function BrandColorSwitchMinimal() {
  const [active, setActive] = React.useState<string>(getInitialColorName);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) ?? 'emerald';
    const color = BRAND_COLORS.find((c) => c.name === saved);
    if (color) applyColor(color);
  }, []);

  function select(color: BrandColor) {
    applyColor(color);
    setActive(color.name);
    setOpen(false);
  }

  const activeHex = PREVIEW_HEX[active] ?? '#27272a';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label="Change brand color"
        >
          <span className="relative inline-flex size-4 items-center justify-center">
            <Palette className="size-4" />
            <span
              className="absolute -bottom-0.5 -right-0.5 size-1.5 rounded-full ring-1 ring-background"
              style={{ background: activeHex }}
            />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="end">
        <p className="mb-2.5 text-xs font-medium text-muted-foreground">Brand color</p>
        <div className="grid grid-cols-4 gap-1.5">
          {BRAND_COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => select(color)}
              title={color.label}
              className="group flex flex-col items-center gap-1"
            >
              <span
                className="flex size-7 items-center justify-center rounded-full ring-offset-background transition-all group-hover:scale-110"
                style={{
                  background: PREVIEW_HEX[color.name],
                  boxShadow:
                    active === color.name
                      ? `0 0 0 2px var(--background), 0 0 0 4px ${PREVIEW_HEX[color.name]}`
                      : undefined,
                }}
              >
                {active === color.name && (
                  <svg className="size-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-[10px] text-muted-foreground">{color.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
