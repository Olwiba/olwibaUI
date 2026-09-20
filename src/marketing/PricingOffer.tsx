'use client';

import * as React from 'react';
import { Badge, cn } from '@olwiba/cn';
import {
  AnimatedSwap,
  type AnimatedSwapEffect,
  type AnimatedSwapSpec,
} from '../motion/AnimatedSwap';
import { CountdownTimer } from '../motion/CountdownTimer';

export interface PricingOffer {
  discountPercent: number;
  deadline: string;
  deadlineLabel: string;
  /** Label before the countdown. Defaults to `Offer · N% off`. */
  bannerLabel?: React.ReactNode;
  /** Badge straddling each eligible card. Defaults to `Extra N% off`. */
  cardBadgeLabel?: React.ReactNode;
}

export function applyPricingDiscount(price: number, discountPercent: number): number {
  const minorUnits = Math.round(price * 100);
  const discountedMinorUnits = Math.round((minorUnits * (100 - discountPercent)) / 100);
  return discountedMinorUnits / 100;
}

function formatPrice(price: number): string {
  return price.toFixed(2);
}

export function PricingOfferBanner({
  offer,
  className,
}: {
  offer: PricingOffer;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto mt-6 flex w-fit max-w-full flex-col items-center gap-2 rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3 text-center sm:flex-row sm:justify-center sm:gap-4',
        className,
      )}
    >
      <Badge className="shrink-0">
        {offer.bannerLabel ?? `Offer · ${offer.discountPercent}% off`}
      </Badge>
      <CountdownTimer deadline={offer.deadline} label="Ends in" />
    </div>
  );
}

export function PricingOfferPrice({
  price,
  period,
  offer,
  currency = '$',
  effect = 'roll',
  className,
}: {
  price: number;
  period: string;
  offer: PricingOffer;
  currency?: string;
  effect?: AnimatedSwapEffect | AnimatedSwapSpec;
  className?: string;
}) {
  const original = `${currency}${formatPrice(price)}`;
  const discounted = `${currency}${formatPrice(
    applyPricingDiscount(price, offer.discountPercent),
  )}`;

  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
        <del className="mb-1 text-lg font-medium text-muted-foreground decoration-2">
          {original}
        </del>
        <AnimatedSwap
          swapKey={discounted}
          effect={effect}
          className="text-4xl font-bold tracking-tight text-foreground"
        >
          {discounted}
        </AnimatedSwap>
        <span className="mb-1 text-sm text-muted-foreground">{period}</span>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        <span className="block">
          {offer.discountPercent}% off until {offer.deadlineLabel}.
        </span>
        <span className="block">
          Then {original}
          {period}.
        </span>
      </p>
    </div>
  );
}
