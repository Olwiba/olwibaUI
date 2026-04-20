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
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        {/* Brand */}
        <div className="flex justify-center">
          {renderLink({
            href: brandHref,
            className: 'flex items-center gap-2',
            children: (
              <>
                {brand.logo && (
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                    {brand.logo}
                  </span>
                )}
                <span className="text-lg font-semibold text-white">{brand.name}</span>
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
                  className: 'text-sm/6 text-gray-400 hover:text-white transition-colors',
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
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        )}

        {/* Copyright */}
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}
