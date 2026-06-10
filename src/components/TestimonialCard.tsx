'use client';

import * as React from 'react';
import { Quote, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, cn, useUIVariant } from '@olwiba/cn';

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  initials?: string;
  rating?: number;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  avatar,
  initials,
  rating,
  className,
  ...props
}: TestimonialCardProps) {
  const mode = useUIVariant();

  const cardInner = (
    <div
      className={cn(
        'flex flex-col gap-4 border bg-card p-6',
        mode === 'playful'
          ? 'rounded-2xl rotate-[0.3deg]'
          : mode === 'smooth'
            ? 'rounded-3xl'
            : 'rounded-2xl',
        mode !== 'playful' && className,
      )}
      {...(mode !== 'playful' ? props : {})}
    >
      <Quote className="size-4 text-muted-foreground/40" />
      {rating != null && (
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                'size-4',
                i < rating
                  ? 'fill-current text-amber-400'
                  : 'text-muted-foreground/30',
              )}
            />
          ))}
        </div>
      )}
      <p className="flex-1 text-sm leading-relaxed">{quote}</p>
      <div className="flex items-center gap-3">
        <Avatar className="size-9">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-xs">{initials ?? name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium leading-tight">{name}</div>
          <div className="text-xs text-muted-foreground">
            {role}{company ? ` · ${company}` : ''}
          </div>
        </div>
      </div>
    </div>
  );

  if (mode === 'playful') {
    return (
      <div className={cn('group/playful relative', className)} {...props}>
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-border transition-transform duration-200 translate-x-[5px] translate-y-[5px] -rotate-[0.5deg] group-hover/playful:-rotate-[1.5deg] group-hover/playful:translate-x-[6px] group-hover/playful:translate-y-[6px]"
        />
        {cardInner}
      </div>
    );
  }

  return cardInner;
}
