'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@olwiba/cn';

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({ icon: Icon, title, description, href, className, ...props }: FeatureCardProps) {
  const content = (
    <div
      className={cn(
        'group relative flex flex-col gap-4 rounded-2xl border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        href && 'cursor-pointer',
        className,
      )}
      {...props}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
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

  if (href) {
    return <a href={href} className="block">{content}</a>;
  }

  return content;
}
