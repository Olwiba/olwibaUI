'use client';

import * as React from 'react';
import { Badge, Button, cn } from '@olwiba/cn';
import { useSectionSurface, type MarketingSurface } from './section-surface';
import { PricingCard, type PricingCardProps, type PricingFeature } from '../components/PricingCard';
import { StaggerChildren } from '../motion/StaggerChildren';
import { CountdownTimer } from '../motion/CountdownTimer';
import type { AppShellRenderLink } from '../app/AppShell';

/**
 * One billing period a plan can be bought at.
 *
 * Products are not all sold monthly-or-annually: weekly, quarterly, and
 * one-off all exist. Pass `cadences` to describe whatever this product
 * actually sells and the section renders a tab per entry, rather than the
 * fixed Monthly/Annual pair it assumes otherwise.
 */
export interface PricingCadence {
  /** Matches the keys of `PricingPlan.prices`. */
  key: string;
  label: string;
  /**
   * Billing periods in a year — 52 weekly, 12 monthly, 1 annual. Used only to
   * compare cadences for the savings badge; omit it and no badge is computed
   * for this cadence.
   */
  periodsPerYear?: number;
  /** Price suffix, e.g. "/ week". Falls back to `PricingPlan.periodDisplay`. */
  suffix?: string;
}

export interface PricingPlan {
  name: string;
  monthly: number;
  annual: number;
  /**
   * Price per cadence key, for products using `cadences`. The `monthly` and
   * `annual` fields above stay as the fallback for callers that don't.
   */
  prices?: Record<string, number>;
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

/**
 * Cheapest-per-year wins: annualise every cadence across all plans and return
 * a `Save N%` label for each one that costs less than the default.
 *
 * Computed rather than configured because a hand-written "Save 34%" silently
 * stops being true the first time a price changes.
 */
function computeSaveBadges(
  plans: PricingPlan[],
  cadences: PricingCadence[],
  defaultKey: string,
): Record<string, string> {
  const annualised = (key: string) => {
    const cadence = cadences.find((c) => c.key === key);
    if (!cadence?.periodsPerYear) return null;
    // Plans priced by `priceDisplay` (pay-what-you-can, "contact us") carry no
    // comparable number, so they're left out of the comparison entirely.
    const totals = plans
      .filter((plan) => plan.priceDisplay === undefined && plan.prices?.[key] !== undefined)
      .map((plan) => plan.prices![key]! * cadence.periodsPerYear!);
    return totals.length > 0 ? totals.reduce((sum, n) => sum + n, 0) : null;
  };

  const baseline = annualised(defaultKey);
  if (!baseline) return {};

  const badges: Record<string, string> = {};
  for (const cadence of cadences) {
    if (cadence.key === defaultKey) continue;
    const total = annualised(cadence.key);
    if (!total || total >= baseline) continue;
    const percent = Math.round(((baseline - total) / baseline) * 100);
    if (percent > 0) badges[cadence.key] = `Save ${percent}%`;
  }
  return badges;
}

/**
 * Column layout for the number of plans actually being shown.
 *
 * A fixed three-column grid leaves one or two plans hugging the left edge with
 * dead space beside them, which reads as a rendering fault rather than a
 * deliberate layout. Width is capped per count so cards keep a sensible size
 * instead of stretching to fill.
 */
function gridClassesFor(count: number): string {
  if (count <= 1) return 'mx-auto max-w-sm';
  if (count === 2) return 'mx-auto max-w-3xl sm:grid-cols-2';
  if (count === 3) return 'mx-auto max-w-5xl lg:grid-cols-3';
  if (count === 4) return 'mx-auto max-w-6xl sm:grid-cols-2 lg:grid-cols-4';
  // Beyond four, wrapping at three keeps each card readable. A carousel is the
  // answer if a catalogue ever genuinely needs it.
  return 'mx-auto max-w-5xl sm:grid-cols-2 lg:grid-cols-3';
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
  /** Symbol prepended to the computed price. Ignored by plans with `priceDisplay`. */
  currency?: string;
  /** Badge label for `highlighted` plans with no active `foundingDeadline` countdown. Pass '' to show no badge. */
  highlightedBadgeLabel?: string;
  /** Rendered below each plan's CTA button (e.g. a "Get notified" link). */
  renderPlanFooter?: (plan: PricingPlan) => React.ReactNode;
  /**
   * Billing periods this product sells at. One entry renders no toggle at all;
   * two or more render a tab each, with savings badges computed from
   * `periodsPerYear`. Omit to keep the built-in Monthly/Annual pair.
   */
  cadences?: PricingCadence[];
  /** Which cadence opens selected. Defaults to the first in `cadences`. */
  defaultCadence?: string;
  /**
   * Called when a plan's CTA is pressed, with the cadence currently selected —
   * which is the half the caller can't otherwise know, since the toggle's state
   * lives in here. Without it the CTA is inert: `PricingCard` takes an
   * `onSelect` and this section had never passed one.
   */
  onSelectPlan?: (plan: PricingPlan, cadence?: string) => void;
  /** Marks one plan as busy (e.g. its checkout is being created). */
  pendingPlanName?: string;
  /**
   * How each card's price transitions when the cadence toggle changes it.
   * Omit and the current UI mode decides (see `PricingCard.priceEffect`) —
   * pass `'roll'` for an odometer on a product that is otherwise in default
   * mode.
   */
  priceEffect?: PricingCardProps['priceEffect'];
  /**
   * How the section sits on the page. @default 'card'
   *
   * Named `surface` rather than following the `mode` convention the other
   * sections use, because `mode` on this component already means
   * subscription-vs-one-time.
   */
  surface?: MarketingSurface;
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
  currency = '$',
  highlightedBadgeLabel = 'Founding member',
  renderPlanFooter,
  cadences,
  defaultCadence,
  onSelectPlan,
  pendingPlanName,
  priceEffect,
  surface,
}: PricingSectionProps) {
  const [annual, setAnnual] = React.useState(false);
  const isOneTime = mode === 'one-time';

  // Explicit cadences replace the built-in Monthly/Annual pair entirely.
  const useCadences = !!cadences?.length;
  const initialCadence =
    (defaultCadence && cadences?.some((c) => c.key === defaultCadence) ? defaultCadence : null) ??
    cadences?.[0]?.key ??
    '';
  const [activeCadence, setActiveCadence] = React.useState(initialCadence);
  const cadence = cadences?.find((c) => c.key === activeCadence);
  const saveBadges = React.useMemo(
    () => (useCadences ? computeSaveBadges(plans, cadences!, initialCadence) : {}),
    [useCadences, plans, cadences, initialCadence],
  );
  // A single cadence is just a label for the price — nothing to switch between.
  const showToggle = useCadences ? cadences!.length > 1 : !isOneTime;
  const sectionClasses = useSectionSurface(surface);

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

            {/* Billing toggle: one tab per cadence, or the legacy Monthly/Annual pair */}
            {showToggle && (
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-muted p-1">
                {useCadences
                  ? cadences!.map((entry) => (
                      <Button
                        key={entry.key}
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveCadence(entry.key)}
                        className={cn(
                          'flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                          entry.key === activeCadence
                            ? 'bg-background text-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {entry.label}
                        {saveBadges[entry.key] && (
                          // `default` (primary), not `secondary`: the toggle is
                          // `bg-muted` with a `bg-background` active tab, and a
                          // secondary badge is the same grey as both — the
                          // saving is the incentive, so it has to carry brand
                          // colour to read at all.
                          <Badge variant="default" className="text-xs">
                            {saveBadges[entry.key]}
                          </Badge>
                        )}
                      </Button>
                    ))
                  : (
                    <>
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
                          <Badge variant="default" className="text-xs">{saveBadge}</Badge>
                        )}
                      </Button>
                    </>
                  )}
              </div>
            )}
          </div>

          {/* Plan cards */}
          <StaggerChildren className={cn('mt-10 grid gap-4', gridClassesFor(plans.length))}>
            {plans.map((plan) => {
              const rawPrice = useCadences
                ? (plan.prices?.[activeCadence] ?? plan.monthly)
                : isOneTime
                  ? plan.monthly
                  : annual
                    ? plan.annual
                    : plan.monthly;
              const price = plan.priceDisplay ?? `${currency}${rawPrice}`;
              // With cadences the suffix follows the selected tab, so a plan's
              // own periodDisplay would pin it to whichever it was written for.
              const period = useCadences
                ? (cadence?.suffix ?? plan.periodDisplay ?? '')
                : (plan.periodDisplay ?? (isOneTime ? 'one-time' : rawPrice > 0 ? '/mo' : ''));
              const badge = plan.highlighted && foundingDeadline
                ? (
                  <span className="inline-flex items-center rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                    <CountdownTimer deadline={foundingDeadline} compact />
                  </span>
                )
                : plan.highlighted && highlightedBadgeLabel
                  ? highlightedBadgeLabel
                  : undefined;
              return (
                <PricingCard
                  key={plan.name}
                  name={plan.name}
                  price={price}
                  period={period}
                  description={plan.description}
                  features={plan.features}
                  cta={pendingPlanName === plan.name ? 'Redirecting…' : plan.cta}
                  highlighted={plan.highlighted}
                  disabled={plan.disabled}
                  // A plan mid-checkout is disabled too, so a second click
                  // can't open a second session.
                  ctaDisabled={plan.ctaDisabled || pendingPlanName === plan.name}
                  badge={badge}
                  footer={renderPlanFooter?.(plan)}
                  priceEffect={priceEffect}
                  onSelect={
                    onSelectPlan
                      ? () => onSelectPlan(plan, useCadences ? activeCadence : undefined)
                      : undefined
                  }
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
