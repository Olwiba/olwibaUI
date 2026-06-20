'use client';

import * as React from 'react';
import { Badge, cn } from '@olwiba/cn';
import { ArrowRight } from 'lucide-react';
import type { AppShellRenderLink } from '../app/AppShell';

export type ChangelogReleaseType = 'release' | 'fix' | 'enhancement';

export interface ChangelogHighlight {
  title: string;
  description: string;
}

export interface ChangelogCardProps {
  title: string;
  summary: string;
  date: string;
  slug: string;
  version?: string;
  releaseType?: ChangelogReleaseType;
  highlights?: ChangelogHighlight[];
  hrefPrefix?: string;
  renderLink?: AppShellRenderLink;
}

const releaseTypeLabel: Record<ChangelogReleaseType, string> = {
  release: 'Major Release',
  fix: 'Fix',
  enhancement: 'Enhancement',
};

const releaseTypeVariant: Record<ChangelogReleaseType, 'default' | 'secondary' | 'outline'> = {
  release: 'default',
  fix: 'outline',
  enhancement: 'secondary',
};

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
  releaseType,
  highlights,
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

  const hasHighlights = highlights && highlights.length > 0;

  return (
    <article
      className={cn(
        'flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8',
        !hasHighlights && 'border-b border-border/60 rounded-none bg-transparent p-0 pb-8 last:pb-0 last:border-0',
      )}
    >
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <time className="text-sm text-muted-foreground" dateTime={date}>
            {formatDate(date)}
          </time>
          {version && (
            <Badge variant="secondary" className="font-mono text-xs">
              {version}
            </Badge>
          )}
          {releaseType && (
            <Badge variant={releaseTypeVariant[releaseType]} className="text-xs">
              {releaseTypeLabel[releaseType]}
            </Badge>
          )}
        </div>
        <LinkWrapper className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
          Read update
          <ArrowRight className="size-3.5" />
        </LinkWrapper>
      </div>

      {/* Title + summary */}
      <div>
        <h2 className="text-lg font-semibold leading-snug tracking-tight">
          <LinkWrapper className="transition-colors hover:text-primary">{title}</LinkWrapper>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      </div>

      {/* Highlights grid */}
      {hasHighlights && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-border/70 bg-background p-4"
            >
              <p className="text-sm font-semibold leading-snug">{h.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{h.description}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
