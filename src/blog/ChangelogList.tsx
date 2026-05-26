'use client';

import type { AppShellRenderLink } from '../app/AppShell';
import { ChangelogCard, type ChangelogCardProps } from './ChangelogCard';

export interface ChangelogListProps {
  entries: ChangelogCardProps[];
  renderLink?: AppShellRenderLink;
  emptyMessage?: string;
  hrefPrefix?: string;
}

export function ChangelogList({
  entries,
  renderLink,
  emptyMessage = 'No changelog entries yet.',
  hrefPrefix,
}: ChangelogListProps) {
  if (entries.length === 0) {
    return <p className="text-sm italic text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {entries.map((entry) => (
        <ChangelogCard
          key={entry.slug}
          {...entry}
          hrefPrefix={hrefPrefix}
          renderLink={renderLink}
        />
      ))}
    </div>
  );
}
