'use client';
import * as React from 'react';
import { PageTransition } from '@olwiba/ui';
import { Button } from '@olwiba/cn';

const variants = ['fade', 'slide-up', 'slide-down'] as const;
type Variant = typeof variants[number];

export default function Demo() {
  const [key, setKey] = React.useState(0);
  const [variant, setVariant] = React.useState<Variant>('slide-up');

  function play(v: Variant) {
    setVariant(v);
    setKey((k) => k + 1);
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="flex flex-wrap justify-center gap-2">
        {variants.map((v) => (
          <Button key={v} size="sm" variant={variant === v ? 'default' : 'outline'} onClick={() => play(v)}>
            {v}
          </Button>
        ))}
      </div>
      <PageTransition key={key} variant={variant} duration={400} className="w-full max-w-xs rounded-2xl border bg-card p-6 text-center">
        <p className="font-semibold">Animated content</p>
        <p className="mt-1 text-sm text-muted-foreground">Using <strong>{variant}</strong></p>
      </PageTransition>
      <Button variant="ghost" size="sm" onClick={() => setKey((k) => k + 1)}>↺ Replay</Button>
    </div>
  );
}
