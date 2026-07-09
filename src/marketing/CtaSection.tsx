'use client';

import * as React from 'react';
import { ArrowRight, Rocket, Sparkles } from 'lucide-react';
import { cn, useUIVariant } from '@olwiba/cn';
import { Button } from '../primitives/Button';
import { FadeIn } from '../motion/FadeIn';
import { useIntersectionObserver } from '../hooks/use-intersection-observer';
import type { AppShellRenderLink } from '../app/AppShell';

export interface CtaSectionProps {
  heading: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  footnote?: string;
  /**
   * Visual treatment of the section.
   * - `'default'` — badge icon, radial glow, primary + secondary CTAs
   * - `'showcase'` — large watermark icon with a scroll-reveal, single pill CTA
   * @default 'default'
   */
  variant?: 'default' | 'showcase';
  /** (showcase) Watermark icon rendered behind the content. @default <Rocket /> */
  icon?: React.ReactNode;
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

function ShowcaseCta({
  heading,
  description,
  primaryCta,
  footnote,
  icon,
  renderLink = defaultRenderLink,
  sectionClasses,
}: CtaSectionProps & { sectionClasses: string }) {
  const [ref, intersecting] = useIntersectionObserver({ threshold: 0.15 });
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (intersecting) setVisible(true);
  }, [intersecting]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        sectionClasses,
        'relative transition-[opacity,transform] duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
    >
      {/* Decorative watermark icon */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          opacity: visible ? 0.1 : 0,
          transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(-5deg)',
          transition: 'opacity 700ms ease 200ms, transform 700ms ease 200ms',
        }}
      >
        {icon ?? <Rocket className="size-72 text-foreground" strokeWidth={0.75} />}
      </div>

      <div className="relative z-10 px-6 py-20 text-center sm:px-10 sm:py-28">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">{description}</p>
        )}
        <div className="mt-8">
          {renderLink({
            href: primaryCta.href,
            children: (
              <Button size="lg" className="rounded-full px-6">
                {primaryCta.label}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            ),
          })}
        </div>
        {footnote && (
          <p className="mt-5 text-sm text-muted-foreground">{footnote}</p>
        )}
      </div>
    </section>
  );
}

export function CtaSection(props: CtaSectionProps) {
  const {
    heading,
    description,
    primaryCta,
    secondaryCta,
    footnote,
    variant = 'default',
    renderLink = defaultRenderLink,
  } = props;
  const mode = useUIVariant()
  const sectionClasses = cn(
    'overflow-hidden bg-card',
    mode === 'smooth' && 'rounded-3xl border',
    mode === 'playful' && 'rounded-2xl border-primary/25 border',
    !mode && 'rounded-2xl border',
  )

  if (variant === 'showcase') {
    return <ShowcaseCta {...props} sectionClasses={sectionClasses} />;
  }

  return (
    <section className={sectionClasses}>
      <div className="relative px-6 py-16 sm:px-10 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)]" />
        <FadeIn direction="up">
          <div className="relative mx-auto max-w-2xl text-center">
            <div className={cn('mb-4 inline-flex h-10 w-10 items-center justify-center bg-primary/10 text-primary', mode === 'smooth' ? 'rounded-3xl' : 'rounded-2xl')}>
              <Sparkles className="size-5" />
            </div>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {heading}
            </h2>
            {description && (
              <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
                {description}
              </p>
            )}
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
