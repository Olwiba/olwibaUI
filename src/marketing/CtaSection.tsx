'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@olwiba/cn';
import { FadeIn } from '../motion/FadeIn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface CtaSectionProps {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  footnote?: string;
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function CtaSection({
  heading,
  description,
  primaryCta,
  secondaryCta,
  footnote,
  renderLink = defaultRenderLink,
}: CtaSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="relative px-6 py-16 sm:px-10 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />
        <FadeIn direction="up">
          <div className="relative mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {heading}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
            {footnote && (
              <p className="mt-4 text-sm text-muted-foreground">
                {footnote}
              </p>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
