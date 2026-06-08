'use client';

import * as React from 'react';
import { LayoutGrid, Sparkles, Layers } from 'lucide-react';
import { Button } from '@olwiba/cn';
import { useOlwibaUI, type UIMode } from '../context/OlwibaUIContext';

const MODES: UIMode[] = ['default', 'playful', 'smooth'];

const MODE_ICONS: Record<UIMode, React.ReactNode> = {
  default: <LayoutGrid className="size-4" />,
  playful: <Sparkles className="size-4" />,
  smooth: <Layers className="size-4" />,
};

const MODE_LABELS: Record<UIMode, string> = {
  default: 'Default mode',
  playful: 'Playful mode',
  smooth: 'Smooth mode',
};

export function ModeSwitchMinimal() {
  const { mode, setMode } = useOlwibaUI();

  const cycle = () => {
    const idx = MODES.indexOf(mode);
    setMode(MODES[(idx + 1) % MODES.length]);
  };

  return (
    <Button variant="ghost" size="icon" onClick={cycle} className="size-8" aria-label={MODE_LABELS[mode]}>
      <span
        key={mode}
        className="inline-flex size-4 items-center justify-center animate-in fade-in zoom-in-75 duration-200 motion-reduce:animate-none"
      >
        {MODE_ICONS[mode]}
      </span>
    </Button>
  );
}
