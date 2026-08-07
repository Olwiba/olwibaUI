'use client';

import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import { Badge, Button, cn, Separator, useUIVariant } from '@olwiba/cn';
import { AnimatedSwap, type AnimatedSwapEffect, type AnimatedSwapSpec } from '../motion/AnimatedSwap';

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  highlighted?: boolean;
  disabled?: boolean;
  /** Disables only the CTA button, leaving the rest of the card interactive. */
  ctaDisabled?: boolean;
  badge?: React.ReactNode;
  /** Rendered directly below the CTA button (e.g. a "Get notified" link). */
  footer?: React.ReactNode;
  /**
   * How the price transitions when a cadence toggle swaps it. Omit and the
   * current UI mode decides — `fade` in default, `roll` in playful, `slide` in
   * smooth — which is the right answer for a product that has picked a mode
   * and wants every swap on the page to agree with it. Set it when the price
   * specifically should read as a mechanism (`'roll'`) without moving the
   * whole app to playful.
   */
  priceEffect?: AnimatedSwapEffect | AnimatedSwapSpec;
  onSelect?: () => void;
}

export function PricingCard({
  name,
  price,
  period = '/mo',
  description,
  features,
  cta,
  highlighted = false,
  disabled = false,
  ctaDisabled = false,
  badge,
  footer,
  priceEffect,
  onSelect,
  className,
  ...props
}: PricingCardProps) {
  const mode = useUIVariant();

  const cardInner = (
    <div
      className={cn(
        'relative flex flex-col border p-6 transition-opacity',
        mode === 'playful'
          ? 'rounded-2xl rotate-[0.3deg]'
          : mode === 'smooth'
            ? 'rounded-3xl'
            : 'rounded-2xl',
        highlighted ? 'border-primary bg-primary/5 shadow-sm' : 'bg-card',
        disabled && 'pointer-events-none opacity-40 select-none',
        mode !== 'playful' && className,
      )}
      {...(mode !== 'playful' ? props : {})}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          {typeof badge === 'string' ? <Badge>{badge}</Badge> : badge}
        </div>
      )}

      <div className="space-y-1">
        <div className="text-sm font-medium text-muted-foreground">{name}</div>
        <div className="flex items-end gap-1">
          {/* Animates when a billing-cadence toggle swaps the price out. The
              price is its own swap key: a card whose price never changes never
              animates. `effect` undefined leaves AnimatedSwap on the mode
              default. */}
          <AnimatedSwap
            swapKey={price}
            effect={priceEffect}
            className="text-4xl font-bold tracking-tight"
          >
            {price}
          </AnimatedSwap>
          <span className="mb-1 text-sm text-muted-foreground">{period}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Button
        variant={highlighted ? 'default' : 'outline'}
        className="mt-6 w-full"
        onClick={onSelect}
        disabled={disabled || ctaDisabled}
      >
        {cta}
      </Button>

      {footer && <div className="mt-3 text-center text-sm">{footer}</div>}

      <Separator className="my-6" />

      <ul className="space-y-3 text-sm">
        {features.map((feat) => (
          <li key={feat.label} className="flex items-center gap-2">
            {feat.included ? (
              <>
                <Check className="size-4 shrink-0 text-primary" />
                <span>{feat.label}</span>
              </>
            ) : (
              <>
                <Minus className="size-4 shrink-0 text-muted-foreground/40" />
                <span className="text-muted-foreground/40">{feat.label}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  if (mode === 'playful') {
    return (
      <div className={cn('group/playful relative', className)} {...props}>
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 rounded-2xl transition-transform duration-200 translate-x-[5px] translate-y-[5px] -rotate-[0.5deg] group-hover/playful:-rotate-[1.5deg] group-hover/playful:translate-x-[6px] group-hover/playful:translate-y-[6px]',
            highlighted ? 'bg-primary/20' : 'bg-border',
          )}
        />
        {cardInner}
      </div>
    );
  }

  return cardInner;
}
