'use client';

import * as React from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button, Separator, Sheet, SheetContent, SheetTrigger } from '@olwiba/cn';

const navLinks = [
  { label: 'Product', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Blog', href: '#' },
];

export function MarketingNavBlock() {
  const [open, setOpen] = React.useState(false);

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <nav className="flex h-16 items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </div>
          <span>Olwiba</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button size="sm">Get started</Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex items-center justify-between pb-4">
              <a href="#" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Zap className="size-4" />
                </div>
                <span>Olwiba</span>
              </a>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="size-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <Separator />
            <nav className="mt-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              <Button variant="outline" className="w-full">Sign in</Button>
              <Button className="w-full">Get started</Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      <Separator />
      <div className="flex items-center justify-center px-6 py-8 text-sm text-muted-foreground">
        Resize the preview pane to see the mobile menu
      </div>
    </section>
  );
}
