'use client';

import * as React from 'react';
import { Check, ChevronRight, Layers, Paintbrush, Rocket, Users, Zap } from 'lucide-react';
import { Badge, Button, cn, Separator } from '@olwiba/cn';

const steps = [
  {
    id: 1,
    Icon: Zap,
    title: 'Create your workspace',
    description: 'Give your workspace a name and choose a URL. You can always change this later.',
  },
  {
    id: 2,
    Icon: Users,
    title: 'Invite your team',
    description: 'Add teammates by email. They\'ll get an invite link and can join right away.',
  },
  {
    id: 3,
    Icon: Paintbrush,
    title: 'Set up your brand',
    description: 'Upload a logo, choose your accent colour, and match the look to your product.',
  },
  {
    id: 4,
    Icon: Layers,
    title: 'Connect your tools',
    description: 'Integrate with GitHub, Slack, and the rest of your stack in one click.',
  },
  {
    id: 5,
    Icon: Rocket,
    title: 'Launch your first project',
    description: 'You\'re ready. Create a project and start shipping.',
  },
];

export function OnboardingBlock() {
  const [current, setCurrent] = React.useState(1);
  const [completed, setCompleted] = React.useState<number[]>([]);

  function handleNext() {
    if (current < steps.length) {
      setCompleted((prev) => [...prev, current]);
      setCurrent((prev) => prev + 1);
    }
  }

  function handleSkip() {
    if (current < steps.length) {
      setCurrent((prev) => prev + 1);
    }
  }

  const step = steps.find((s) => s.id === current)!;
  const isLast = current === steps.length;

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="grid min-h-[560px] lg:grid-cols-[280px_1fr]">
        {/* Sidebar steps */}
        <div className="border-b bg-muted/40 p-6 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </div>
            <div className="mt-3 text-sm font-semibold">Getting started</div>
            <div className="text-xs text-muted-foreground">{completed.length} of {steps.length} complete</div>
          </div>

          <nav className="space-y-1">
            {steps.map((s) => {
              const done = completed.includes(s.id);
              const active = s.id === current;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrent(s.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    active ? 'bg-background font-medium shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  <div className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs',
                    done ? 'border-primary bg-primary text-primary-foreground' : active ? 'border-primary' : 'border-muted-foreground/30',
                  )}>
                    {done ? <Check className="size-3" /> : s.id}
                  </div>
                  {s.title}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex flex-col p-8">
          <div className="flex-1 space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">Step {current} of {steps.length}</Badge>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <step.Icon className="size-6" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{step.title}</h2>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>

            {/* Placeholder form area */}
            <div className="rounded-xl border border-dashed bg-muted/40 p-6 text-sm text-muted-foreground">
              Form fields for "{step.title}" go here
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              disabled={isLast}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-40"
            >
              Skip for now
            </button>
            <Button onClick={handleNext} disabled={isLast}>
              {isLast ? 'Finish' : 'Continue'}
              {!isLast && <ChevronRight className="ml-2 size-4" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
