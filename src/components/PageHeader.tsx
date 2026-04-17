'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import type { AppShellRenderLink } from '../app/AppShell';

export interface PageHeaderBreadcrumb {
  label: string;
  href?: string;
}

export interface PageHeaderBackButton {
  label?: string;
  href?: string;
  onClick?: () => void;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: PageHeaderBreadcrumb[];
  backButton?: PageHeaderBackButton;
  renderLink?: AppShellRenderLink;
  className?: string;
  children?: React.ReactNode;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function PageHeader({
  title,
  description,
  breadcrumbs,
  backButton,
  renderLink = defaultRenderLink,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1 pb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight className="size-3.5 shrink-0" />}
                {isLast || !crumb.href ? (
                  <span className={cn(isLast && 'text-foreground font-medium')}>{crumb.label}</span>
                ) : (
                  renderLink({
                    href: crumb.href,
                    children: crumb.label,
                    className: 'hover:text-foreground transition-colors',
                  })
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      {backButton && (
        <div className="mb-2">
          {backButton.href ? (
            renderLink({
              href: backButton.href,
              children: (
                <>
                  <ChevronLeft className="size-4" />
                  <span>{backButton.label ?? 'Back'}</span>
                </>
              ),
              className: 'inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors',
            })
          ) : (
            <button
              type="button"
              onClick={backButton.onClick}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="size-4" />
              <span>{backButton.label ?? 'Back'}</span>
            </button>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {children && <div className="flex shrink-0 items-center gap-2">{children}</div>}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
