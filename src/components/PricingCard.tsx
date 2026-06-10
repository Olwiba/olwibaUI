'use client';

import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import { Badge, Button, cn, Separator, useUIVariant } from '@olwiba/cn';

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
  badge?: string;
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
  badge,
  onSelect,
  className,
  ...props
}: PricingCardProps) {
  const mode = useUIVariant();

  const cardInner = (
    <div
      className={cn(
        'relative flex flex-col border p-6',
        mode === 'playful'
          ? 'rounded-2xl rotate-[0.3deg]'
          : mode === 'smooth'
            ? 'rounded-3xl'
            : 'rounded-2xl',
        highlighted ? 'border-primary bg-primary/5 shadow-sm' : 'bg-card',
        mode !== 'playful' && className,
      )}
      {...(mode !== 'playful' ? props : {})}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge>{badge}</Badge>
        </div>
      )}

      <div className="space-y-1">
        <div className="text-sm font-medium text-muted-foreground">{name}</div>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          <span className="mb-1 text-sm text-muted-foreground">{period}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Button
        variant={highlighted ? 'default' : 'outline'}
        className="mt-6 w-full"
        onClick={onSelect}
      >
        {cta}
      </Button>

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
