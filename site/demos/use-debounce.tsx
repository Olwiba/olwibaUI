'use client';
import * as React from 'react';
import { useDebounce } from '@olwiba/ui';
import { Input } from '@olwiba/cn';

export default function Demo() {
  const [value, setValue] = React.useState('');
  const debounced = useDebounce(value, 400);

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 p-8">
      <Input placeholder="Type something..." value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="space-y-1 rounded-xl border bg-card p-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Live</span>
          <span className="font-mono">{value || '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Debounced (400ms)</span>
          <span className="font-mono">{debounced || '—'}</span>
        </div>
      </div>
    </div>
  );
}
