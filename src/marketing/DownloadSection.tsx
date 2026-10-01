'use client';

import * as React from 'react';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, cn } from '@olwiba/cn';
import { Button } from '../primitives/Button';
import { SectionTitle } from './SectionTitle';
import { useSectionSurface, type MarketingSurface } from './section-surface';
import { useCopyToClipboard } from '../hooks/use-copy-to-clipboard';

export interface DownloadItem {
  id: string;
  label: string;
  description?: string;
  href?: string;
  command?: string;
  icon?: React.ReactNode;
  badge?: string;
  external?: boolean;
  download?: boolean | string;
}

export interface DownloadGroup {
  id: string;
  heading: string;
  description?: string;
  items: DownloadItem[];
}

export interface DownloadSectionProps {
  heading: string;
  description?: string;
  groups: DownloadGroup[];
  surface?: MarketingSurface;
  className?: string;
}

function DownloadAction({ item }: { item: DownloadItem }) {
  const [copied, copy] = useCopyToClipboard();

  if (item.command) {
    return (
      <Button type="button" variant="outline" size="sm" onClick={() => copy(item.command!)}>
        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {copied ? 'Copied' : 'Copy command'}
      </Button>
    );
  }

  if (!item.href) return null;
  return (
    <Button asChild size="sm">
      <a
        href={item.href}
        download={item.download}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
      >
        {item.external ? (
          <ExternalLink className="size-4" aria-hidden />
        ) : (
          <Download className="size-4" aria-hidden />
        )}
        {item.download ? 'Download' : 'Open'}
        {item.external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    </Button>
  );
}

/** Data-driven download cards for desktop, mobile, and package-manager paths. */
export function DownloadSection({
  heading,
  description,
  groups,
  surface,
  className,
}: DownloadSectionProps) {
  const sectionClasses = useSectionSurface(surface);

  return (
    <section className={cn(sectionClasses, className)} data-slot="download-section">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
        <SectionTitle title={heading} description={description} />
        <div className="mt-8 space-y-8">
          {groups.map((group) => (
            <div key={group.id}>
              <div className="mb-3">
                <h3 className="font-semibold">{group.heading}</h3>
                {group.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
                )}
              </div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <Card key={item.id} className="flex h-full flex-col">
                    <CardHeader className="flex-row items-start gap-3">
                      {item.icon && (
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                          {item.icon}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-base">{item.label}</CardTitle>
                          {item.badge && (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <CardDescription className="mt-1">{item.description}</CardDescription>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      {item.command && (
                        <code className="mb-3 block overflow-x-auto rounded-md bg-muted px-3 py-2 text-xs">
                          {item.command}
                        </code>
                      )}
                      <DownloadAction item={item} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
