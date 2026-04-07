'use client';

import * as React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Badge, Button, Input } from '@olwiba/cn';

export function NewsletterSection() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative px-6 py-14 sm:px-10 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.1),transparent_60%)]" />
        <div className="relative mx-auto max-w-xl text-center">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail className="size-5" />
          </div>

          <Badge variant="secondary" className="mb-3">Newsletter</Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-pretty text-muted-foreground">
            New components, release notes, and product tips — straight to your inbox. No spam, unsubscribe any time.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-2xl border bg-muted/50 px-6 py-5 text-sm">
              <span className="font-medium">You're on the list.</span>{' '}
              <span className="text-muted-foreground">We'll be in touch soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">
                Subscribe
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing you agree to our{' '}
            <a href="#" className="underline underline-offset-4 hover:text-foreground">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
