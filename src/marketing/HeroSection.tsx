'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from '@olwiba/cn';
import { FadeIn } from '../motion/FadeIn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface HeroSectionProps {
  heading: string;
  badge?: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  heroImage: React.ReactNode;
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
  heroImage,
  avatarUrls,
  socialProofText,
  renderLink = defaultRenderLink,
}: HeroSectionProps) {
  return (
    <section className="overflow-hidden">
      <div className="px-6 py-14 sm:px-10 sm:py-20">
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
              <div className="flex flex-wrap items-center gap-3">
                {renderLink({
                  href: primaryCta.href,
                  children: (
                    <Button size="lg">
                      {primaryCta.label}
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  ),
                })}
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

          {/* Right - hero image */}
          <FadeIn direction="right" delay={200}>
            <div className="overflow-hidden rounded-2xl">
              {heroImage}
            </div>
          </FadeIn>
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
