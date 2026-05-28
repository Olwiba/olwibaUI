'use client';

import type { ReactNode } from 'react';
import type { AppShellRenderLink } from '../app/AppShell';

export interface FooterProps {
  brand: { name: string; logo?: ReactNode; href?: string };
  navLinks?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ label: string; href: string; icon: ReactNode }>;
  legal?: string;
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function Footer({
  brand,
  navLinks,
  socialLinks,
  legal,
  renderLink = defaultRenderLink,
}: FooterProps) {
  const brandHref = brand.href ?? '/';
  const copyrightText = legal ?? `\u00A9 ${new Date().getFullYear()} ${brand.name}. All rights reserved.`;

  return (
    <footer className="overflow-hidden rounded-2xl border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        {/* Brand */}
        <div className="flex justify-center">
          {renderLink({
            href: brandHref,
            className: 'flex items-center gap-2',
            children: (
              <>
                {brand.logo && (
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/10 text-background">
                    {brand.logo}
                  </span>
                )}
                <span className="text-lg font-semibold text-background">{brand.name}</span>
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
                  className: 'text-sm/6 text-background/70 transition-colors hover:text-background',
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
                className="text-background/70 transition-colors hover:text-background"
              >
                {icon}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <p className="mt-10 text-center text-sm/6 text-background/50">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}
