'use client';

import * as React from 'react';
import { Badge, Button, cn, useUIVariant } from '@olwiba/cn';
import { PricingCard, type PricingFeature } from '../components/PricingCard';
import { StaggerChildren } from '../motion/StaggerChildren';
import { CountdownTimer } from '../motion/CountdownTimer';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PricingPlan {
  name: string;
  monthly: number;
  annual: number;
  description: string;
  cta: string;
  highlighted?: boolean;
  disabled?: boolean;
  /** Disables only the CTA button, leaving the rest of the card interactive. */
  ctaDisabled?: boolean;
  features: PricingFeature[];
  /** Overrides computed price display (e.g. "$?" for community/reach-out tiers). */
  priceDisplay?: string;
  /** Overrides computed period display. */
  periodDisplay?: string;
}

export interface PricingSectionProps {
  title?: string;
  description?: string;
  badge?: React.ReactNode;
  plans: PricingPlan[];
  saveBadge?: string;
  isAuthenticated?: boolean;
  renderLink?: AppShellRenderLink;
  footnote?: string;
  mode?: 'subscription' | 'one-time';
  foundingDeadline?: string;
  /** Rendered below each plan's CTA button (e.g. a "Get notified" link). */
  renderPlanFooter?: (plan: PricingPlan) => React.ReactNode;
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
  mode = 'subscription',
  foundingDeadline,
  renderPlanFooter,
}: PricingSectionProps) {
  const [annual, setAnnual] = React.useState(false);
  const isOneTime = mode === 'one-time';
  const uiMode = useUIVariant();
  const sectionClasses = cn(
    'overflow-hidden bg-card',
    uiMode === 'smooth' && 'rounded-3xl border',
    uiMode === 'playful' && 'rounded-2xl border-primary/25 border',
    !uiMode && 'rounded-2xl border',
  );

  return (
    <section className={sectionClasses}>
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center">
            {badge && (
              typeof badge === 'string'
                ? <Badge variant="secondary" className="mb-4">{badge}</Badge>
                : <div className="mb-4">{badge}</div>
            )}
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
                {description}
              </p>
            )}

            {/* Billing toggle — subscription mode only */}
            {!isOneTime && (
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-muted p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAnnual(false)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    !annual ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  Monthly
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
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
                </Button>
              </div>
            )}
          </div>

          {/* Plan cards */}
          <StaggerChildren className="mt-10 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => {
              const rawPrice = isOneTime ? plan.monthly : (annual ? plan.annual : plan.monthly);
              const price = plan.priceDisplay ?? `$${rawPrice}`;
              const period = plan.periodDisplay ?? (isOneTime ? 'one-time' : (rawPrice > 0 ? '/mo' : ''));
              const badge = plan.highlighted && foundingDeadline
                ? (
                  <span className="inline-flex items-center rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    <CountdownTimer deadline={foundingDeadline} compact />
                  </span>
                )
                : plan.highlighted
                  ? 'Founding member'
                  : undefined;
              return (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  price={price}
                  period={period}
                  description={plan.description}
                  features={plan.features}
                  cta={plan.cta}
                  highlighted={plan.highlighted}
                  disabled={plan.disabled}
                  ctaDisabled={plan.ctaDisabled}
                  badge={badge}
                  footer={renderPlanFooter?.(plan)}
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
