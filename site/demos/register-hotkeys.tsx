import { RegisterHotkeys } from '@olwiba/ui';
import type { Hotkey } from '@olwiba/ui';
import * as React from 'react';

export default function RegisterHotkeysDemo() {
  const [lastKey, setLastKey] = React.useState<string | null>(null);

  const hotkeys: Hotkey[] = [
    { key: 'k', meta: true, handler: () => setLastKey('⌘K — Open search'), description: 'Open search' },
    { key: 'Escape', handler: () => setLastKey('Esc — Close'), description: 'Close' },
    { key: '?', shift: true, handler: () => setLastKey('Shift+? — Show help'), description: 'Show help' },
  ];

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <RegisterHotkeys hotkeys={hotkeys} />
      <p className="text-sm text-muted-foreground">
        Focus this area and try:
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        {[
          { label: '⌘K', desc: 'Search' },
          { label: 'Esc', desc: 'Close' },
          { label: 'Shift+?', desc: 'Help' },
        ].map(({ label, desc }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">{label}</kbd>
            <span className="text-xs text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>
      {lastKey && (
        <div className="rounded-lg bg-muted px-4 py-2 text-sm font-mono">
          {lastKey}
        </div>
      )}
    </div>
  );
}
