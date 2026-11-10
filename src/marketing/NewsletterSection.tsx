'use client';

import * as React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { cn } from '@olwiba/cn';
import { useMarketingSurface, useSectionSurface, type MarketingSurface } from './section-surface';
import { sectionBadgeClassName } from './SectionTitle';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';

export interface NewsletterSectionProps {
  badge?: string | null;
  title?: string;
  description?: string;
  placeholder?: string;
  submitLabel?: string;
  privacyHref?: string;
  privacyLabel?: string;
  successTitle?: string;
  successDescription?: string;
  onSubscribe?: (email: string) => void | Promise<void>;
  /** Icon-free heading and signup form in two columns, stacked below lg. */
  layout?: 'centered' | 'split';
  /** How the section sits on the page. @default 'card' */
  surface?: MarketingSurface;
}

const defaults = {
  badge: 'Newsletter',
  title: 'Stay in the loop',
  description:
    'New components, release notes, and product tips — straight to your inbox. No spam, unsubscribe any time.',
  placeholder: 'you@company.com',
  submitLabel: 'Subscribe',
  privacyHref: '#',
  privacyLabel: 'Privacy Policy',
  successTitle: "You're on the list.",
  successDescription: "We'll be in touch soon.",
};

export function NewsletterSection({
  badge = defaults.badge,
  title = defaults.title,
  description = defaults.description,
  placeholder = defaults.placeholder,
  submitLabel = defaults.submitLabel,
  privacyHref = defaults.privacyHref,
  privacyLabel = defaults.privacyLabel,
  successTitle = defaults.successTitle,
  successDescription = defaults.successDescription,
  onSubscribe,
  layout = 'centered',
  surface,
}: NewsletterSectionProps = {}) {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const sectionClasses = useSectionSurface(surface);
  const split = layout === 'split';
  // Read every render, never short-circuited on the prop: hook order must not change.
  const pageSurface = useMarketingSurface();
  // A panel clips a corner glow to its own rounded edge. With no panel the same
  // gradient ends in a hard rectangle, so the open section gets one that fades
  // out before it reaches the section's bounds.
  const open = (surface ?? pageSurface ?? 'card') === 'plain';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    await onSubscribe?.(email);
    setSubmitted(true);
  }

  return (
    <section className={sectionClasses} data-newsletter-layout={layout}>
      <div className="relative px-6 py-14 sm:px-10 sm:py-20">
        {!split && (
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0',
              open
                ? 'bg-[radial-gradient(ellipse_closest-side_at_center,color-mix(in_srgb,var(--primary)_12%,transparent),transparent)]'
                : 'bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--primary)_10%,transparent),transparent_60%)]',
            )}
          />
        )}
        <div
          className={cn(
            'relative mx-auto',
            split
              ? 'grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16'
              : 'max-w-xl text-center',
          )}
        >
          <div>
            {(!split || badge) && (
              <div className={cn('mb-4 flex items-center gap-2', !split && 'justify-center')}>
                {!split && (
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </div>
                )}
                {badge && (
                  <Badge variant="secondary" className={sectionBadgeClassName}>
                    {badge}
                  </Badge>
                )}
              </div>
            )}
            <h2
              className={cn(
                'text-balance font-semibold tracking-tight',
                split ? 'max-w-lg text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl',
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                'mt-4 text-pretty',
                split
                  ? 'max-w-lg text-base leading-relaxed text-foreground/75'
                  : 'mx-auto max-w-sm text-muted-foreground',
              )}
            >
              {description}
            </p>
          </div>

          <div className={cn('min-w-0', !split && 'mt-8')}>
            {submitted ? (
              <div role="status" className="rounded-2xl border bg-muted/50 px-6 py-5 text-sm">
                <span className="font-medium">{successTitle}</span>{' '}
                <span className="text-muted-foreground">{successDescription}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  aria-label="Email address"
                  placeholder={placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn('min-w-0 flex-1', split && 'h-12 rounded-xl bg-card/80')}
                />
                <Button
                  type="submit"
                  className={split ? 'h-12 shrink-0 rounded-xl px-6' : undefined}
                >
                  {submitLabel}
                  {!split && <ArrowRight className="ml-2 size-4" />}
                </Button>
              </form>
            )}

            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing you agree to our{' '}
              <a href={privacyHref} className="underline underline-offset-4 hover:text-foreground">
                {privacyLabel}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
