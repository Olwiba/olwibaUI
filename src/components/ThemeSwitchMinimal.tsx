'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@olwiba/cn';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
  return stored ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

export function ThemeSwitchMinimal() {
  const [theme, setThemeState] = React.useState<'light' | 'dark'>(getInitialTheme);

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
