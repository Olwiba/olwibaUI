import { ThemeColorUpdater } from '@olwiba/ui';
import * as React from 'react';

const themes = ['blue', 'green', 'red', 'orange', 'purple'];

export default function ThemeColorUpdaterDemo() {
  const [color, setColor] = React.useState('blue');

  return (
    <div className="flex flex-col items-center gap-4">
      <ThemeColorUpdater colorTheme={color} />
      <div className="flex flex-wrap gap-2 justify-center">
        {themes.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize transition-colors ${
              color === c
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground font-mono">
        document.documentElement[data-theme="{color}"]
      </p>
    </div>
  );
}
