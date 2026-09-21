'use client';

import type { ReactNode } from 'react';
import { StatusIndicator } from '@olwiba/cn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface FooterProps {
  brand: { name: string; logo?: ReactNode; href?: string };
  navLinks?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ label: string; href: string; icon: ReactNode }>;
  legal?: string;
  /**
   * Live status pill. `label` is a ReactNode, not a string: a real status
   * pill often carries per-service detail in a tooltip, and typing it as
   * string forced consumers to smuggle that through `as unknown as string`.
   * A plain string still works and is the common case.
   */
  status?: {
    label: ReactNode;
    /**
     * Three states, because one service being unavailable is not the same
     * event as everything being unavailable. `operational` alone could only
     * say "fine" or "not fine", so a partial outage painted the same red as
     * a total one — and a pill that shouts at the same volume for both is
     * one people learn to stop reading.
     */
    severity?: 'operational' | 'degraded' | 'down';
    /** @deprecated Pass `severity`. Kept so existing callers keep working. */
    operational?: boolean;
  };
  renderLink?: AppShellRenderLink;
}

const SEVERITY_DOT = {
  operational: 'text-emerald-500',
  degraded: 'text-amber-500',
  down: 'text-destructive',
} as const;

/** Falls back to the old boolean so callers that predate `severity` are unchanged. */
function footerSeverity(status: { severity?: 'operational' | 'degraded' | 'down'; operational?: boolean }) {
  if (status.severity) return status.severity;
  return status.operational !== false ? 'operational' : 'down';
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function Footer({
  brand,
  navLinks,
  socialLinks,
  legal,
  status,
  renderLink = defaultRenderLink,
}: FooterProps) {
  const brandHref = brand.href ?? '/';
  const copyrightText = legal ?? `\u00A9 ${new Date().getFullYear()} ${brand.name}. All rights reserved.`;

  return (
    <footer className="overflow-hidden rounded-2xl border bg-card text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        {/* Brand */}
        <div className="flex justify-center">
          {renderLink({
            href: brandHref,
            className: 'flex items-center gap-2',
            children: (
              <>
                {brand.logo}
                {/* Same trim as Navbar's lockup, and more visible here: text-lg
                    scales the unused ascender space up with the font size. */}
                <span className="text-lg font-semibold leading-none text-foreground [text-box-edge:ex_alphabetic] [text-box-trim:trim-both]">
                  {brand.name}
                </span>
              </>
            ),
          })}
        </div>

        {/* Nav links */}
        {navLinks && navLinks.length > 0 && (
          <nav className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-3" aria-label="Footer">
            {navLinks.map(({ label, href }) => (
              <div key={label}>
                {renderLink({
                  href,
                  className: 'text-sm/6 text-muted-foreground transition-colors hover:text-foreground',
                  children: label,
                })}
              </div>
            ))}
          </nav>
        )}

        {/* Social icons */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="mt-10 flex justify-center gap-x-10">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {icon}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <p className="mt-10 text-center text-sm/6 text-muted-foreground/70">
          {copyrightText}
        </p>

        {/* Status */}
        {status && (
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              <StatusIndicator
                pulse={footerSeverity(status) === 'operational'}
                dotClassName={SEVERITY_DOT[footerSeverity(status)]}
                size="sm"
              >
                {status.label}
              </StatusIndicator>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
