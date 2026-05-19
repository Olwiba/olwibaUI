'use client';
import { useMediaQuery } from '@olwiba/ui';
import { cn } from '@olwiba/cn';

const breakpoints = [
  { label: 'sm', query: '(min-width: 640px)' },
  { label: 'md', query: '(min-width: 768px)' },
  { label: 'lg', query: '(min-width: 1024px)' },
  { label: 'xl', query: '(min-width: 1280px)' },
  { label: 'dark', query: '(prefers-color-scheme: dark)' },
];

function Row({ label, query }: { label: string; query: string }) {
  const matches = useMediaQuery(query);
  return (
    <div className={cn('flex items-center justify-between rounded-xl border px-4 py-2.5 text-sm transition-colors', matches ? 'border-primary bg-primary/5' : 'bg-card')}>
      <code className="font-mono text-xs">{query}</code>
      <span className={cn('text-xs font-medium', matches ? 'text-primary' : 'text-muted-foreground')}>
        {matches ? 'matches' : 'no match'}
      </span>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex flex-col gap-2 p-6">
      {breakpoints.map((bp) => <Row key={bp.label} {...bp} />)}
    </div>
  );
}
