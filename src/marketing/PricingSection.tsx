'use client';

import * as React from 'react';
import { Check, Minus, Zap } from 'lucide-react';
import { Badge, Button, cn, Separator } from '@olwiba/cn';

const tiers = [
  {
    name: 'Starter',
    monthly: 0,
    annual: 0,
    description: 'Everything you need to start building.',
    cta: 'Get started free',
    variant: 'outline' as const,
    highlighted: false,
    features: [
      'Up to 3 projects',
      '20 components',
      'Community support',
      'Basic analytics',
      null,
      null,
    ],
  },
  {
    name: 'Pro',
    monthly: 29,
    annual: 19,
    description: 'For teams shipping production products.',
    cta: 'Start free trial',
    variant: 'default' as const,
    highlighted: true,
    features: [
      'Unlimited projects',
      'All components & blocks',
      'Priority support',
      'Advanced analytics',
      'Custom themes',
      'Team collaboration',
    ],
  },
  {
    name: 'Enterprise',
    monthly: 99,
    annual: 79,
    description: 'Custom setup for large organisations.',
    cta: 'Contact sales',
    variant: 'outline' as const,
    highlighted: false,
    features: [
      'Unlimited projects',
      'All components & blocks',
      'Dedicated support',
      'Advanced analytics',
      'Custom themes',
      'SSO & audit logs',
    ],
  },
];

const featureLabels = [
  'Projects',
  'Components',
  'Support',
  'Analytics',
  'Themes',
  'Team features',
];

export function PricingSection() {
  const [annual, setAnnual] = React.useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
              Start for free. Scale as you grow. No hidden fees.
            </p>

            {/* Billing toggle */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-muted p-1">
              <button
                onClick={() => setAnnual(false)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  !annual ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  annual ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                Annual
                <Badge variant="secondary" className="text-xs">Save 34%</Badge>
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-6',
                  tier.highlighted ? 'border-primary bg-primary/5 shadow-sm' : 'bg-card',
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Most popular</Badge>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">{tier.name}</div>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight">
                      ${annual ? tier.annual : tier.monthly}
                    </span>
                    {(annual ? tier.annual : tier.monthly) > 0 && (
                      <span className="mb-1 text-sm text-muted-foreground">/mo</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                <Button variant={tier.variant} className="mt-6 w-full">{tier.cta}</Button>

                <Separator className="my-6" />

                <ul className="space-y-3 text-sm">
                  {tier.features.map((feat, i) => (
                    <li key={featureLabels[i]} className="flex items-center gap-2">
                      {feat ? (
                        <>
                          <Check className="size-4 shrink-0 text-primary" />
                          <span>{feat}</span>
                        </>
                      ) : (
                        <>
                          <Minus className="size-4 shrink-0 text-muted-foreground/40" />
                          <span className="text-muted-foreground/40">{featureLabels[i]}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.{' '}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">
              Compare all features
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
