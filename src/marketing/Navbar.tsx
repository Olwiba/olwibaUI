'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { Button, Separator, Sheet, SheetContent, SheetTrigger } from '@olwiba/cn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface NavbarProps {
  brand: { name: string; logo?: React.ReactNode; href?: string };
  navLinks: Array<{ label: string; href: string }>;
  cta?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  /** Icon-button controls rendered right-of-nav, left-of-CTA. Pass e.g. ModeSwitchMinimal, ThemeSwitchMinimal. */
  controls?: React.ReactNode[];
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function Navbar({
  brand,
  navLinks,
  cta,
  controls,
  renderLink = defaultRenderLink,
}: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const brandHref = brand.href ?? '/';
  const hasRightContent = controls?.length || cta?.primary || cta?.secondary;
  const closeMobileMenu = React.useCallback(() => setOpen(false), []);

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <nav className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-6">
        {/* Brand — left column */}
        {renderLink({
          href: brandHref,
          children: (
            <span className="flex items-center gap-2 font-semibold">
              {brand.logo}
              {/* `items-center` centres the text's *box*, not its glyphs, and
                  the box reserves room for ascenders and descenders the name may
                  not use — so a lowercase wordmark sits low with dead air above.
                  `leading-none` only removes half-leading; the ascender space is
                  still inside the box, which is why it wasn't enough on its own.

                  text-box-trim/-edge trims the box to the glyphs themselves.
                  `ex alphabetic` = x-height to baseline, chosen over `cap
                  alphabetic` because these wordmarks are lowercase (nestrrr).
                  A product with a capitalised name wants `cap` instead —
                  otherwise its capitals overflow the trimmed box and read high.

                  leading-none stays as the fallback: text-box-trim is not
                  Baseline yet (no Firefox), and there it degrades to the old
                  behaviour rather than breaking. */}
              <span className="leading-none [text-box-edge:ex_alphabetic] [text-box-trim:trim-both]">
                {brand.name}
              </span>
            </span>
          ),
        })}

        {/* Desktop nav links — center column when right content exists, else shift right */}
        <div className={`hidden items-center gap-1 md:flex ${!hasRightContent ? 'col-span-2 justify-end' : ''}`}>
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

        {/* Desktop right — controls + CTA */}
        {hasRightContent && (
          <div className="hidden items-center justify-end gap-2 md:flex">
            {controls?.map((control, i) => (
              <React.Fragment key={i}>{control}</React.Fragment>
            ))}
            {(cta?.secondary || cta?.primary) && controls?.length ? (
              <div className="mx-1 h-4 w-px bg-border" />
            ) : null}
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
        )}

        {/* Mobile controls + drawer trigger — keep quick toggles visible, with menu last. */}
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="col-start-3 flex items-center justify-end gap-1 md:hidden">
            {controls?.map((control, i) => (
              <React.Fragment key={i}>{control}</React.Fragment>
            ))}
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
          </div>
          <SheetContent side="left" className="w-72">
            {/* Brand row alone at the top — leaves the top-right corner to the built-in close */}
            <div className="flex items-center pb-4">
              <span onClickCapture={closeMobileMenu} className="cursor-pointer">
                {renderLink({
                  href: brandHref,
                  children: (
                    <span className="flex items-center gap-2 font-semibold">
                      {brand.logo}
                      {/* Same fix as the desktop lockup above. */}
                      <span className="leading-none [text-box-edge:ex_alphabetic] [text-box-trim:trim-both]">
                        {brand.name}
                      </span>
                    </span>
                  ),
                })}
              </span>
            </div>
            <Separator />
            <nav className="mt-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <span key={link.label} onClickCapture={closeMobileMenu}>
                  {renderLink({
                    href: link.href,
                    className: 'block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                    children: link.label,
                  })}
                </span>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              {cta?.secondary && (
                <span onClickCapture={closeMobileMenu}>
                  {renderLink({
                    href: cta.secondary.href,
                    children: <Button variant="outline" className="w-full">{cta.secondary.label}</Button>,
                  })}
                </span>
              )}
              {cta?.primary && (
                <span onClickCapture={closeMobileMenu}>
                  {renderLink({
                    href: cta.primary.href,
                    children: <Button className="w-full">{cta.primary.label}</Button>,
                  })}
                </span>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </section>
  );
}
