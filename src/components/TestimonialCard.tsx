'use client';

import * as React from 'react';
import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, cn } from '@olwiba/cn';

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  initials?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  avatar,
  initials,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div
      className={cn('flex flex-col gap-4 rounded-2xl border bg-card p-6', className)}
      {...props}
    >
      <Quote className="size-4 text-muted-foreground/40" />
      <p className="flex-1 text-sm leading-relaxed">{quote}</p>
      <div className="flex items-center gap-3">
        <Avatar className="size-9 rounded-xl">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="rounded-xl text-xs">{initials ?? name.slice(0, 2).toUpperCase()}</AvatarFallback>
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
}
