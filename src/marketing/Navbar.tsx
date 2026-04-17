'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { Button, Separator, Sheet, SheetContent, SheetTrigger } from '@olwiba/cn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface NavbarProps {
  brand: { name: string; logo?: React.ReactNode; href?: string };
  navLinks: Array<{ label: string; href: string }>;
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  actions?: React.ReactNode;
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function Navbar({
  brand,
  navLinks,
  cta,
  actions,
  renderLink = defaultRenderLink,
}: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const brandHref = brand.href ?? '/';

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <nav className="flex h-16 items-center justify-between px-6">
        {/* Brand */}
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

        {/* Desktop nav links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <span key={link.label}>
              {renderLink({
                href: link.href,
                className: 'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                children: link.label,
              })}
            </span>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          {actions}
          {cta?.secondary &&
            renderLink({
              href: cta.secondary.href,
              children: <Button variant="ghost" size="sm">{cta.secondary.label}</Button>,
            })}
          {cta?.primary &&
            renderLink({
              href: cta.primary.href,
              children: <Button size="sm">{cta.primary.label}</Button>,
            })}
        </div>

        {/* Mobile drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center justify-between pb-4">
              <span
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
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
              </span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="size-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <Separator />
            <nav className="mt-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <span key={link.label} onClick={() => setOpen(false)}>
                  {renderLink({
                    href: link.href,
                    className: 'block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                    children: link.label,
                  })}
                </span>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              {actions && <div className="flex justify-end">{actions}</div>}
              {cta?.secondary &&
                renderLink({
                  href: cta.secondary.href,
                  children: <Button variant="outline" className="w-full">{cta.secondary.label}</Button>,
                })}
              {cta?.primary &&
                renderLink({
                  href: cta.primary.href,
                  children: <Button className="w-full">{cta.primary.label}</Button>,
                })}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </section>
  );
}
