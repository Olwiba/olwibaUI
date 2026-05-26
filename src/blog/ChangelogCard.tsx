'use client';

import * as React from 'react';
import { Badge, cn } from '@olwiba/cn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface ChangelogCardProps {
  title: string;
  summary: string;
  date: string;
  slug: string;
  version?: string;
  hrefPrefix?: string;
  renderLink?: AppShellRenderLink;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ChangelogCard({
  title,
  summary,
  date,
  slug,
  version,
  hrefPrefix = '/changelog',
  renderLink,
}: ChangelogCardProps) {
  const href = `${hrefPrefix}/${slug}`;

  const LinkWrapper = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) =>
    renderLink ? (
      renderLink({ href, children, className })
    ) : (
      <a href={href} className={className}>
        {children}
      </a>
    );

  return (
    <article className="group flex flex-col gap-3 border-b border-border/60 pb-8 last:border-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <time dateTime={date}>{formatDate(date)}</time>
        {version && (
          <>
            <span>·</span>
            <Badge variant="secondary" className="font-mono text-xs">
              {version}
            </Badge>
          </>
        )}
      </div>
      <h2 className="text-lg font-semibold leading-snug tracking-tight">
        <LinkWrapper className="transition-colors hover:text-primary">{title}</LinkWrapper>
      </h2>
      <p className={cn('line-clamp-3 text-sm text-muted-foreground')}>{summary}</p>
      <LinkWrapper className="text-sm font-medium text-primary hover:underline">
        Read release notes →
      </LinkWrapper>
    </article>
  );
}
