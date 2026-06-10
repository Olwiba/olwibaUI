'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({ icon: Icon, title, description, href, className, ...props }: FeatureCardProps) {
  const mode = useUIVariant();

  const cardInner = (
    <div
      className={cn(
        'group relative flex flex-col gap-4 border bg-card p-6 transition-all duration-200',
        mode === 'playful'
          ? 'rounded-2xl rotate-[0.3deg]'
          : mode === 'smooth'
            ? 'rounded-3xl hover:-translate-y-0.5 hover:shadow-md'
            : 'rounded-2xl hover:-translate-y-0.5 hover:shadow-md',
        href && 'cursor-pointer',
        mode !== 'playful' && className,
      )}
      {...(mode !== 'playful' ? props : {})}
    >
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground',
          mode === 'smooth' ? 'rounded-2xl' : 'rounded-xl',
        )}
      >
        <Icon className="size-5" />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold leading-tight">{title}</h3>
          {href && (
            <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          )}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  const content =
    mode === 'playful' ? (
      <div className={cn('group/playful relative', className)} {...props}>
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-border transition-transform duration-200 translate-x-[5px] translate-y-[5px] -rotate-[0.5deg] group-hover/playful:-rotate-[1.5deg] group-hover/playful:translate-x-[6px] group-hover/playful:translate-y-[6px]"
        />
        {cardInner}
      </div>
    ) : (
      cardInner
    );

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }

  return content;
}
