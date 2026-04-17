'use client';

import * as React from 'react';
import { Badge, cn } from '@olwiba/cn';
import { PricingCard, type PricingFeature } from '../components/PricingCard';
import { StaggerChildren } from '../motion/StaggerChildren';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PricingPlan {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  cta: string;
  highlighted?: boolean;
  features: PricingFeature[];
}

export interface PricingSectionProps {
  title?: string;
  description?: string;
  badge?: string;
  plans: PricingPlan[];
  saveBadge?: string;
  isAuthenticated?: boolean;
  renderLink?: AppShellRenderLink;
  footnote?: string;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function PricingSection({
  title = 'Simple, transparent pricing',
  description = 'Start for free. Scale as you grow. No hidden fees.',
  badge = 'Pricing',
  plans,
  saveBadge = 'Save 34%',
  isAuthenticated,
  renderLink = defaultRenderLink,
  footnote,
}: PricingSectionProps) {
  const [annual, setAnnual] = React.useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center">
            {badge && (
              <Badge variant="secondary" className="mb-4">{badge}</Badge>
            )}
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
                {description}
              </p>
            )}

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
                {saveBadge && (
                  <Badge variant="secondary" className="text-xs">{saveBadge}</Badge>
                )}
              </button>
            </div>
          </div>

          {/* Plan cards */}
          <StaggerChildren className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => {
              const price = annual ? plan.annual : plan.monthly;
              return (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  price={`$${price}`}
                  period={price > 0 ? '/mo' : ''}
                  description={plan.description}
                  features={plan.features}
                  cta={plan.cta}
                  highlighted={plan.highlighted}
                  badge={plan.highlighted ? 'Most popular' : undefined}
                />
              );
            })}
          </StaggerChildren>

          {/* Footnote */}
          {footnote && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {footnote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
