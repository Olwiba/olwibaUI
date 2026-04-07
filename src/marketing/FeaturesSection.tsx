'use client';

import { BarChart3, Code2, Layers, Lock, Paintbrush, Zap } from 'lucide-react';
import { Badge } from '@olwiba/cn';

const features = [
  {
    Icon: Layers,
    title: 'Composable architecture',
    description:
      'Every block and component is built on top of primitive parts. Swap, extend, or re-arrange without fighting the library.',
  },
  {
    Icon: Paintbrush,
    title: 'Design tokens built in',
    description:
      'Colors, spacing, radius, and typography are driven by CSS variables — light and dark mode work out of the box.',
  },
  {
    Icon: Zap,
    title: 'Instant integration',
    description:
      'Drop a block into any React project in minutes. No configuration, no theme wiring, no style resets needed.',
  },
  {
    Icon: Code2,
    title: 'Copy and own the code',
    description:
      'Components are yours to modify. Nothing is locked behind a runtime. Ship the exact code you need.',
  },
  {
    Icon: Lock,
    title: 'Accessible by default',
    description:
      'Built on Radix UI primitives. Keyboard navigation, ARIA attributes, and focus management come standard.',
  },
  {
    Icon: BarChart3,
    title: 'Production tested',
    description:
      'These patterns have been used in real products. Not just demos — code that holds up under real usage.',
  },
];

export function FeaturesSection() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to ship fast
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
              A complete system of components, blocks, and hooks designed to work together — and get out of your way.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ Icon, title, description }) => (
              <div key={title} className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
