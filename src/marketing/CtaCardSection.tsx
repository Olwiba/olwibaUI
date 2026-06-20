'use client';

import * as React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';
import { cn } from '@olwiba/cn';
import type { AppShellRenderLink } from '../app/AppShell';

export interface CtaCardSectionProps {
  heading: string;
  description?: string;
  primaryCta: { label: string; href: string };
  footnote?: string;
  icon?: React.ReactNode;
  renderLink?: AppShellRenderLink;
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

export function CtaCardSection({
  heading,
  description,
  primaryCta,
  footnote,
  icon,
  renderLink = defaultRenderLink,
}: CtaCardSectionProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-gray-200 shadow-sm dark:border-border',
        'bg-[#E0DFDB] dark:bg-card',
        'transition-[opacity,transform] duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      )}
    >
      {/* Decorative icon */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          opacity: visible ? 0.12 : 0,
          transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(-5deg)',
          transition: 'opacity 700ms ease 200ms, transform 700ms ease 200ms',
        }}
      >
        {icon ?? <Rocket className="size-72 text-foreground dark:text-foreground" strokeWidth={0.75} />}
      </div>

      {/* Content */}
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
              <span className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80">
                {primaryCta.label}
                <ArrowRight className="size-4" />
              </span>
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
