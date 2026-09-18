'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@olwiba/cn';

function readTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
  return stored ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

export function ThemeSwitchMinimal() {
  /**
   * Seeded with a constant, then corrected on mount.
   *
   * This used to initialise from `readTheme`, and a state initialiser runs
   * during the first client render — the one React reconciles against the
   * server's HTML. The server has no DOM and returned 'dark', so a light-theme
   * visitor rendered a Moon where the server had sent a Sun, and hydration
   * failed with React #418 on every page carrying the nav.
   *
   * It went unnoticed for as long as the theme was always dark: both sides
   * agreed by accident. Genesis's browser journey caught it within one run of
   * the app defaulting to light.
   *
   * The cost is one frame showing the wrong icon before the effect runs, on
   * light only. The button is still correct the moment anyone can act on it.
   */
  const [theme, setThemeState] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    setThemeState(readTheme());
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="size-8" aria-label="Toggle theme">
      <span
        key={theme}
        className="inline-flex size-4 items-center justify-center animate-in fade-in zoom-in-75 spin-in-90 duration-200 motion-reduce:animate-none"
      >
        {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </span>
    </Button>
  );
}
