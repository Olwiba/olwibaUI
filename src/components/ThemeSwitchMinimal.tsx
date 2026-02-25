'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@olwiba/cn';

export function ThemeSwitchMinimal() {
  const [theme, setThemeState] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const resolved = stored ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setThemeState(resolved);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="size-8" aria-label="Toggle theme">
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
