'use client';

import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button, Input, cn } from '@olwiba/cn';
import { NotificationFeedCard, type PropertyItem } from './MonitorCardBlock';

const heroThemeVars = {
  '--rmbot-font-display': '"Space Grotesk", sans-serif',
  '--rmbot-font-ui': 'Geist, sans-serif',
  '--rmbot-font-mono': '"IBM Plex Mono", monospace',
  '--rmbot-bg-base': 'var(--bg-base, #080808)',
  '--rmbot-bg-surface': 'var(--bg-surface, #0D1110)',
  '--rmbot-bg-input': 'var(--bg-input, #111614)',
  '--rmbot-border': 'var(--border, #24302C)',
  '--rmbot-text-1': 'var(--text-1, #F5F7F6)',
  '--rmbot-text-2': 'var(--text-2, #A3A3A3)',
  '--rmbot-text-muted': 'var(--text-muted, #525252)',
  '--rmbot-emerald-400': 'var(--emerald-400, #34d399)',
  '--rmbot-emerald-500': 'var(--emerald-500, #10b981)',
  '--rmbot-emerald-600': 'var(--emerald-600, #059669)',
  '--rmbot-radius-xs': 'var(--radius-xs, 4px)',
  '--rmbot-radius-sm': 'var(--radius-sm, 8px)',
  '--rmbot-radius-md': 'var(--radius-md, 12px)',
  '--rmbot-radius-xl': 'var(--radius-xl, 24px)',
} as React.CSSProperties;

const defaultRotatingMessages = [
  'instant alerts.',
  'never miss out.',
  'your dream home awaits.',
];

const defaultSources = ['rightmove', 'spareroom', 'zoopla'];

export interface MarketingHeroSpeedBlockProps {
  rotatingMessages?: string[];
  onEmailSubmit?: (email: string) => void;
  sources?: string[];
  properties: PropertyItem[];
  howItWorksHref?: string;
  className?: string;
}

interface FeedColumnProps {
  items: PropertyItem[];
  direction: 'up' | 'down';
  speed: number;
}

function splitProperties(properties: PropertyItem[]) {
  const left = properties.filter((_, index) => index % 2 === 0);
  const right = properties.filter((_, index) => index % 2 === 1);

  return {
    left: left.length > 0 ? left : properties,
    right: right.length > 0 ? right : left.length > 0 ? left : properties,
  };
}

function FeedColumn({ items, direction, speed }: FeedColumnProps) {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const firstListRef = React.useRef<HTMLDivElement | null>(null);
  const offsetRef = React.useRef(0);
  const frameRef = React.useRef<number | null>(null);
  const singleHeightRef = React.useRef(0);

  React.useEffect(() => {
    const content = contentRef.current;
    const firstList = firstListRef.current;
    if (!content || !firstList || items.length === 0) return;

    const updateHeight = () => {
      singleHeightRef.current = firstList.getBoundingClientRect().height + 12;
    };

    updateHeight();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateHeight) : null;

    resizeObserver?.observe(content);
    resizeObserver?.observe(firstList);

    const animate = () => {
      const singleHeight = singleHeightRef.current;

      if (singleHeight > 0) {
        offsetRef.current = (offsetRef.current + speed) % singleHeight;
        const translateY =
          direction === 'up'
            ? -offsetRef.current
            : -singleHeight + offsetRef.current;
        content.style.transform = `translateY(${translateY}px)`;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      resizeObserver?.disconnect();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [direction, items, speed]);

  return (
    <div className="relative h-[420px] overflow-hidden sm:h-[520px]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20"
        style={{ background: 'linear-gradient(to bottom, var(--rmbot-bg-base), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
        style={{ background: 'linear-gradient(to top, var(--rmbot-bg-base), transparent)' }}
      />

      <div ref={contentRef} className="flex flex-col gap-3 will-change-transform">
        <div ref={firstListRef} className="space-y-3">
          {items.map((property, index) => (
            <NotificationFeedCard
              key={`${property.address}-${property.price}-${property.source}-primary-${index}`}
              title={property.address}
              meta={`${property.price} · ${property.beds}`}
              badge={property.source.toUpperCase()}
              timestamp={`Found ${property.foundMinutesAgo <= 0 ? 'just now' : `${property.foundMinutesAgo} min ago`}`}
              isNewArrival={property.foundMinutesAgo <= 3}
            />
          ))}
        </div>
        <div aria-hidden="true" className="space-y-3">
          {items.map((property, index) => (
            <NotificationFeedCard
              key={`${property.address}-${property.price}-${property.source}-duplicate-${index}`}
              title={property.address}
              meta={`${property.price} · ${property.beds}`}
              badge={property.source.toUpperCase()}
              timestamp={`Found ${property.foundMinutesAgo <= 0 ? 'just now' : `${property.foundMinutesAgo} min ago`}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MarketingHeroSpeedBlock({
  rotatingMessages = defaultRotatingMessages,
  onEmailSubmit,
  sources = defaultSources,
  properties,
  howItWorksHref = '#how-it-works',
  className,
}: MarketingHeroSpeedBlockProps) {
  const [email, setEmail] = React.useState('');
  const [messageIndex, setMessageIndex] = React.useState(0);
  const [messagePhase, setMessagePhase] = React.useState<'enter' | 'steady' | 'exit'>('enter');

  const safeMessages = rotatingMessages.length > 0 ? rotatingMessages : defaultRotatingMessages;
  const { left, right } = splitProperties(properties);

  React.useEffect(() => {
    if (safeMessages.length <= 1) return;

    let enterTimer: number | undefined;
    let exitTimer: number | undefined;
    let intervalId: number | undefined;

    const markEntered = () => {
      enterTimer = window.setTimeout(() => {
        setMessagePhase('steady');
      }, 320);
    };

    setMessagePhase('enter');
    markEntered();

    intervalId = window.setInterval(() => {
      setMessagePhase('exit');

      exitTimer = window.setTimeout(() => {
        setMessageIndex((currentIndex) => (currentIndex + 1) % safeMessages.length);
        setMessagePhase('enter');
        markEntered();
      }, 300);
    }, 15000);

    return () => {
      if (enterTimer !== undefined) window.clearTimeout(enterTimer);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [safeMessages]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;

    onEmailSubmit?.(trimmedEmail);
  }

  return (
    <section
      className={cn('overflow-hidden px-6 py-10 sm:px-8 sm:py-14 lg:px-10', className)}
      style={{
        ...heroThemeVars,
        backgroundColor: 'var(--rmbot-bg-base)',
        border: '1px solid var(--rmbot-border)',
        borderRadius: 'var(--rmbot-radius-xl)',
      }}
    >
      <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center">
        <div className="max-w-xl">
          <h1
            className="flex flex-wrap items-center gap-3 text-[clamp(2.5rem,5vw+1rem,4rem)] leading-[0.95] tracking-[-0.03em]"
            style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-display)', fontWeight: 700 }}
          >
            <span>Property monitoring</span>
            <span className="relative flex size-[10px] shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: 'var(--rmbot-emerald-400)' }}
              />
              <span
                className="relative inline-flex size-[10px] rounded-full"
                style={{ backgroundColor: 'var(--rmbot-emerald-400)' }}
              />
            </span>
          </h1>

          <div
            className="mt-5 flex min-h-7 items-center gap-2 text-base sm:text-lg"
            style={{ color: 'var(--rmbot-emerald-400)', fontFamily: 'var(--rmbot-font-ui)' }}
          >
            <ArrowRight className="size-4 shrink-0" />
            <div className="relative h-7 overflow-hidden">
              <span
                className={cn(
                  'block transition-all duration-300',
                  messagePhase === 'exit' ? '-translate-y-5 opacity-0' : 'translate-y-0 opacity-100',
                  messagePhase === 'enter' ? 'animate-in slide-in-from-bottom-3 fade-in' : '',
                )}
              >
                {safeMessages[messageIndex]}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 max-w-[420px]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="you@londonflat.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 border text-sm shadow-none"
                style={{
                  backgroundColor: 'var(--rmbot-bg-input)',
                  borderColor: 'var(--rmbot-border)',
                  borderRadius: 'var(--rmbot-radius-sm)',
                  color: 'var(--rmbot-text-1)',
                  fontFamily: 'var(--rmbot-font-ui)',
                }}
              />
              <Button
                type="submit"
                className="h-12 px-5 text-[13px] font-semibold shadow-none"
                style={{
                  backgroundColor: 'var(--rmbot-emerald-500)',
                  borderRadius: 'var(--rmbot-radius-sm)',
                  color: 'var(--rmbot-bg-base)',
                  fontFamily: 'var(--rmbot-font-display)',
                }}
              >
                Get alerts
              </Button>
            </div>
          </form>

          <p
            className="mt-4 max-w-md text-sm leading-6 sm:text-base"
            style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-ui)' }}
          >
            rmBot watches the fastest rental sources for you, then pushes WhatsApp and email alerts
            before the listing gets buried.
          </p>

          <a
            href={howItWorksHref}
            className="mt-4 inline-flex text-sm underline underline-offset-4"
            style={{ color: 'var(--rmbot-emerald-500)', fontFamily: 'var(--rmbot-font-ui)' }}
          >
            how does it work?
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
            >
              Monitors
            </span>
            {sources.map((source) => (
              <span
                key={source}
                className="rounded px-2 py-1 text-[10px] uppercase tracking-[0.08em]"
                style={{
                  border: '1px solid color-mix(in oklab, var(--rmbot-emerald-500) 40%, transparent)',
                  borderRadius: 'var(--rmbot-radius-xs)',
                  color: 'var(--rmbot-emerald-500)',
                  fontFamily: 'var(--rmbot-font-mono)',
                }}
              >
                {source}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative overflow-hidden border p-4 sm:p-5"
          style={{
            backgroundColor: 'color-mix(in oklab, var(--rmbot-bg-surface) 92%, black)',
            borderColor: 'var(--rmbot-border)',
            borderRadius: 'var(--rmbot-radius-xl)',
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <FeedColumn items={left} direction="up" speed={0.2} />
            <FeedColumn items={right} direction="down" speed={0.4} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarketingHeroSpeedBlock;
