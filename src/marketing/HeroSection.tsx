'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, cn, useUIVariant } from '@olwiba/cn';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { FadeIn } from '../motion/FadeIn';
import { PhoneFrame } from '../components/PhoneFrame';
import type { AppShellRenderLink } from '../app/AppShell';
import { marketingSectionSpacing } from './section-spacing';

export interface HeroSectionProps {
  heading: string;
  badge?: string;
  description: string;
  /** Ignored when `primarySlot` is given. */
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /**
   * Replaces the primary button with your own control — a search field, a
   * short form, an email capture.
   *
   * A hero whose first action *is* the product converts better than one that
   * links to a page where the product starts. `secondaryCta` still renders
   * beside it, so "…or see pricing" survives.
   *
   * Rendered full-width above the secondary CTA on small screens, since a
   * field sharing a row with a button gets squeezed to nothing on a phone.
   */
  primarySlot?: React.ReactNode;
  heroImage?: React.ReactNode;
  media?: 'image' | 'phone' | 'none';
  phoneSize?: 'sm' | 'md' | 'lg';
  avatarUrls?: string[];
  socialProofText?: string;
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function HeroSection({
  heading,
  badge,
  description,
  primaryCta,
  secondaryCta,
  primarySlot,
  heroImage,
  media = 'image',
  phoneSize = 'lg',
  avatarUrls,
  socialProofText,
  renderLink = defaultRenderLink,
}: HeroSectionProps) {
  const mode = useUIVariant();
  return (
    <section className="overflow-hidden">
      <div className={marketingSectionSpacing.hero}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left - text content */}
          <FadeIn direction="left">
            <div className="flex flex-col gap-6">
              {badge && (
                <div>
                  <Badge variant="secondary">{badge}</Badge>
                </div>
              )}
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {heading}
              </h1>
              <p className="max-w-lg text-pretty text-lg text-muted-foreground">
                {description}
              </p>
              <div
                className={cn(
                  'flex gap-3',
                  primarySlot
                    ? 'flex-col items-stretch sm:flex-row sm:items-center'
                    : 'flex-wrap items-center',
                )}
              >
                {primarySlot ?? (
                  primaryCta &&
                  renderLink({
                    href: primaryCta.href,
                    children: (
                      <Button size="lg">
                        {primaryCta.label}
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                    ),
                  })
                )}
                {secondaryCta &&
                  renderLink({
                    href: secondaryCta.href,
                    children: (
                      <Button size="lg" variant="outline">
                        {secondaryCta.label}
                      </Button>
                    ),
                  })}
              </div>
            </div>
          </FadeIn>

          {/* Right - media */}
          {media !== 'none' && (
            <FadeIn direction="right" delay={200}>
              {media === 'phone' ? (
                <div className="flex justify-center">
                  <PhoneFrame size={phoneSize}>
                    {heroImage}
                  </PhoneFrame>
                </div>
              ) : (
                <div className={cn('overflow-hidden', mode === 'smooth' ? 'rounded-3xl' : 'rounded-2xl')}>
                  {heroImage}
                </div>
              )}
            </FadeIn>
          )}
        </div>

        {/* Avatar social proof row */}
        {(avatarUrls?.length || socialProofText) && (
          <FadeIn direction="up" delay={400}>
            <div className="mx-auto mt-12 flex max-w-6xl items-center gap-4">
              {avatarUrls && avatarUrls.length > 0 && (
                <div className="flex -space-x-3">
                  {avatarUrls.map((url, i) => (
                    <Avatar key={i} className="size-9 border-2 border-background">
                      <AvatarImage src={url} alt="" />
                      <AvatarFallback className="text-xs">
                        {String.fromCharCode(65 + (i % 26))}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              )}
              {socialProofText && (
                <p className="text-sm font-medium text-muted-foreground">
                  {socialProofText}
                </p>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
