'use client';

import { Separator } from '@olwiba/cn';
import type { ReactNode } from 'react';
import type { AppShellRenderLink } from '../app/AppShell';

export interface FooterProps {
  brand: { name: string; logo?: ReactNode; description?: string; href?: string };
  columns: Array<{ heading: string; links: Array<{ label: string; href: string }> }>;
  socialLinks?: Array<{ label: string; href: string; icon: ReactNode }>;
  legal?: string;
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function Footer({
  brand,
  columns,
  socialLinks,
  legal,
  renderLink = defaultRenderLink,
}: FooterProps) {
  const brandHref = brand.href ?? '/';
  const copyrightText = legal ?? `\u00A9 ${new Date().getFullYear()} ${brand.name}. All rights reserved.`;

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <footer className="px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:flex lg:gap-8">
          {/* Brand */}
          <div className="space-y-4 lg:flex-[1.5]">
            {renderLink({
              href: brandHref,
              children: (
                <span className="flex items-center gap-2 font-semibold">
                  {brand.logo && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      {brand.logo}
                    </span>
                  )}
                  <span>{brand.name}</span>
                </span>
              ),
            })}
            {brand.description && (
              <p className="max-w-xs text-sm text-muted-foreground">
                {brand.description}
              </p>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="space-y-3 lg:flex-1">
              <div className="text-sm font-medium">{col.heading}</div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {renderLink({
                      href: link.href,
                      className: 'text-sm text-muted-foreground transition-colors hover:text-foreground',
                      children: link.label,
                    })}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-10" />

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <span>{copyrightText}</span>
        </div>
      </footer>
    </section>
  );
}
