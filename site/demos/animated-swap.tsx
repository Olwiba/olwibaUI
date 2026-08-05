'use client';
import * as React from 'react';
import { AnimatedSwap, Button, type AnimatedSwapEffect } from '@olwiba/ui';

const PRICES = ['$9', '$25', '$120'];
const EFFECTS: AnimatedSwapEffect[] = ['roll', 'fade', 'slide'];

export default function Demo() {
  const [step, setStep] = React.useState(0);
  const [effect, setEffect] = React.useState<AnimatedSwapEffect>('roll');
  const price = PRICES[step % PRICES.length]!;

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="flex gap-1 rounded-full border bg-card p-1">
        {EFFECTS.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setEffect(name)}
            className={`rounded-full px-3 py-1 text-sm capitalize transition-colors ${
              effect === name ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-1">
        <AnimatedSwap swapKey={price} effect={effect} className="text-5xl font-bold tracking-tight">
          {price}
        </AnimatedSwap>
        <span className="mb-1.5 text-sm text-muted-foreground">/month</span>
      </div>

      <Button variant="outline" onClick={() => setStep((s) => s + 1)}>
        Change plan
      </Button>
    </div>
  );
}
