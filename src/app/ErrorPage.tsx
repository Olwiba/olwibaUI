'use client';

import type { ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@olwiba/cn';
import { Button } from '../primitives/Button';
import type { AppShellRenderLink } from './AppShell';

export interface ErrorPageLink {
  label: string;
  href: string;
  description?: string;
  icon?: ReactNode;
}

export interface ErrorPageProps {
  statusCode?: string;
  title?: string;
  description?: string;
  action?: { label: string; href: string };
  backAction?: { label: string; href?: string; onClick?: () => void };
  /** Optional "maybe you were looking for" links rendered below the actions. */
  links?: ErrorPageLink[];
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function ErrorPage({
  statusCode = '404',
  title = 'Page not found',
  description = "The page you're looking for doesn't exist or has been moved. Check the URL or head back home.",
  action = { label: 'Take me home', href: '/' },
  backAction = { label: 'Go back' },
  links,
  renderLink = defaultRenderLink,
}: ErrorPageProps) {
  const hasLinks = links && links.length > 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-card">
      {/* Dot grid, faded toward the edges */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      {/* Soft brand glow behind the numerals */}
      <div
        aria-hidden
        className="absolute left-1/2 top-24 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        className={cn(
          'relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-20 text-center sm:pt-24',
          hasLinks ? 'pb-16' : 'pb-24 sm:pb-28',
        )}
      >
        <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
          </span>
          HTTP {statusCode}
        </span>

        <div
          aria-hidden
          className="pointer-events-none -mb-8 mt-2 select-none bg-gradient-to-b from-foreground/15 via-foreground/[0.06] to-transparent bg-clip-text text-[9rem] font-black leading-none tracking-tighter text-transparent sm:-mb-12 sm:text-[13rem]"
        >
          {statusCode}
        </div>

        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {backAction &&
            (backAction.href ? (
              renderLink({
                href: backAction.href,
                children: (
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 size-4" />
                    {backAction.label}
                  </Button>
                ),
              })
            ) : (
              <Button variant="outline" onClick={backAction.onClick}>
                <ArrowLeft className="mr-2 size-4" />
                {backAction.label}
              </Button>
            ))}
          {action &&
            renderLink({
              href: action.href,
              children: <Button>{action.label}</Button>,
            })}
        </div>

        {hasLinks && (
          <div className="mt-14 w-full">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Maybe you were looking for
            </p>
            <div className="mt-4 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
              {links.map((link) =>
                renderLink({
                  href: link.href,
                  className:
                    'group flex items-start gap-3 rounded-xl border bg-background/60 p-4 backdrop-blur transition-colors hover:border-primary/40 hover:bg-accent',
                  children: (
                    <>
                      {link.icon && (
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                          {link.icon}
                        </span>
                      )}
                      <span className="min-w-0 grow">
                        <span className="flex items-center gap-1 text-sm font-medium">
                          {link.label}
                          <ArrowUpRight className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                        </span>
                        {link.description && (
                          <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                            {link.description}
                          </span>
                        )}
                      </span>
                    </>
                  ),
                }),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
