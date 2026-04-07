'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@olwiba/cn';

export function CtaSection() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative px-6 py-16 sm:px-10 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Start building your next product today
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            Hundreds of teams use Olwiba to ship faster. Get access to the full component library, blocks, and hooks — free to start.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">
              Get started for free
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline">
              View the docs
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
