'use client';

import * as React from 'react';
import { Button, cn } from '@olwiba/cn';

const monitorThemeVars = {
  '--rmbot-font-display': '"Space Grotesk", sans-serif',
  '--rmbot-font-ui': 'Geist, sans-serif',
  '--rmbot-font-mono': '"IBM Plex Mono", monospace',
  '--rmbot-bg-base': 'var(--bg-base, #080808)',
  '--rmbot-bg-surface': 'var(--bg-surface, #0D1110)',
  '--rmbot-bg-raised': 'var(--bg-raised, #171D1C)',
  '--rmbot-bg-input': 'var(--bg-input, #111614)',
  '--rmbot-border': 'var(--border, #24302C)',
  '--rmbot-border-muted': 'var(--border-muted, #1a2420)',
  '--rmbot-text-1': 'var(--text-1, #F5F7F6)',
  '--rmbot-text-2': 'var(--text-2, #A3A3A3)',
  '--rmbot-text-muted': 'var(--text-muted, #525252)',
  '--rmbot-emerald-400': 'var(--emerald-400, #34d399)',
  '--rmbot-emerald-500': 'var(--emerald-500, #10b981)',
  '--rmbot-emerald-600': 'var(--emerald-600, #059669)',
  '--rmbot-color-error': 'var(--color-error, #ef4444)',
  '--rmbot-radius-xs': 'var(--radius-xs, 4px)',
  '--rmbot-radius-sm': 'var(--radius-sm, 8px)',
  '--rmbot-radius-md': 'var(--radius-md, 12px)',
  '--rmbot-radius-lg': 'var(--radius-lg, 16px)',
  '--rmbot-shadow-raised': '0 24px 80px rgba(0, 0, 0, 0.32)',
} as React.CSSProperties;

const MONITOR_STYLE_ID = 'rmbot-monitor-block-css';
const monitorBlockCss = `
  @keyframes rmbot-property-border-flash {
    0% { box-shadow: inset 3px 0 0 var(--rmbot-emerald-400); }
    100% { box-shadow: inset 0 0 0 transparent; }
  }
  .rmbot-feed-card {
    transition: border-color 150ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms cubic-bezier(0.4,0,0.2,1);
  }
  .rmbot-feed-card:hover { border-color: var(--rmbot-emerald-500); }
  .rmbot-feed-card[data-new='true'] { animation: rmbot-property-border-flash 120ms ease-out; }
`;

function MonitorBlockStyles() {
  if (typeof document !== 'undefined' && !document.getElementById(MONITOR_STYLE_ID)) {
    const el = document.createElement('style');
    el.id = MONITOR_STYLE_ID;
    el.textContent = monitorBlockCss;
    document.head.appendChild(el);
  }
  return null;
}

export interface PropertyItem {
  address: string;
  price: string;
  beds: string;
  source: string;
  foundMinutesAgo: number;
}

export interface NotificationFeedCardProps {
  title: string;
  meta?: string;
  badge?: string;
  timestamp?: string;
  isNewArrival?: boolean;
  className?: string;
}

export interface MonitorCardBlockProps {
  title: string;
  sources: string[];
  isActive: boolean;
  lastCheckedMinutesAgo: number;
  foundToday: number;
  foundTotal: number;
  pollRateMinutes: number;
  recentProperties?: PropertyItem[];
  onViewAll?: () => void;
  onEdit?: () => void;
  onStop?: () => void;
  className?: string;
}

function formatSourceLabel(source: string) {
  return source.trim().toUpperCase();
}

function formatMinutesAgo(minutes: number) {
  if (minutes <= 0) return 'just now';
  if (minutes === 1) return '1 min ago';
  return `${minutes} min ago`;
}

function maskMonitorSources(sources: string[]) {
  return sources.map((source) => source.toUpperCase()).join(' + ');
}

export function NotificationFeedCard({
  title,
  meta,
  badge,
  timestamp,
  isNewArrival = false,
  className,
}: NotificationFeedCardProps) {
  return (
    <article
      className={cn(
        'rmbot-feed-card relative overflow-hidden border px-4 py-3',
        className,
      )}
      data-new={isNewArrival}
      style={{
        ...monitorThemeVars,
        backgroundColor: 'var(--rmbot-bg-surface)',
        borderColor: 'var(--rmbot-border)',
        borderRadius: 'var(--rmbot-radius-md)',
      }}
    >
      <MonitorBlockStyles />
      <div className="flex items-start justify-between gap-3">
        <p
          className="min-w-0 flex-1 text-sm leading-5"
          style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-ui)' }}
        >
          {title}
        </p>
        {badge ? (
          <span
            className="shrink-0 rounded px-2 py-1 text-[11px] uppercase tracking-[0.08em]"
            style={{
              border: '1px solid color-mix(in oklab, var(--rmbot-emerald-500) 40%, transparent)',
              borderRadius: 'var(--rmbot-radius-xs)',
              color: 'var(--rmbot-emerald-500)',
              fontFamily: 'var(--rmbot-font-mono)',
            }}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div
          className="text-xs sm:text-sm"
          style={{ color: meta ? 'var(--rmbot-text-1)' : 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
        >
          {meta ?? 'No additional metadata'}
        </div>
        {timestamp ? (
          <div
            className="shrink-0 text-right text-[11px] sm:text-xs"
            style={{ color: 'var(--rmbot-emerald-400)', fontFamily: 'var(--rmbot-font-mono)' }}
          >
            {timestamp}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function MonitorCardBlock({
  title,
  sources,
  isActive,
  lastCheckedMinutesAgo,
  foundToday,
  foundTotal,
  pollRateMinutes,
  recentProperties = [],
  onViewAll,
  onEdit,
  onStop,
  className,
}: MonitorCardBlockProps) {
  const recentListings = recentProperties.slice(0, 3);

  return (
    <section
      className={cn('overflow-hidden border p-5 sm:p-6', className)}
      style={{
        ...monitorThemeVars,
        backgroundColor: 'var(--rmbot-bg-surface)',
        borderColor: 'var(--rmbot-border)',
        borderRadius: 'var(--rmbot-radius-md)',
      }}
    >
      <MonitorBlockStyles />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3
              className="text-base leading-6 sm:text-lg"
              style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-ui)', fontWeight: 500 }}
            >
              {title}
            </h3>
            <p
              className="mt-2 text-[11px] uppercase tracking-[0.08em] sm:text-xs"
              style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
            >
              {maskMonitorSources(sources)}
            </p>
          </div>

          <div
            className="inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.1em]"
            style={{
              backgroundColor: 'var(--rmbot-bg-base)',
              borderColor: isActive
                ? 'color-mix(in oklab, var(--rmbot-emerald-500) 45%, transparent)'
                : 'var(--rmbot-border)',
              color: isActive ? 'var(--rmbot-emerald-500)' : 'var(--rmbot-text-2)',
              fontFamily: 'var(--rmbot-font-mono)',
            }}
          >
            <span className="relative flex size-2">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full opacity-70',
                  isActive ? 'animate-ping' : '',
                )}
                style={{
                  backgroundColor: isActive ? 'var(--rmbot-emerald-400)' : 'var(--rmbot-text-muted)',
                }}
              />
              <span
                className="relative inline-flex size-2 rounded-full"
                style={{
                  backgroundColor: isActive ? 'var(--rmbot-emerald-400)' : 'var(--rmbot-text-muted)',
                }}
              />
            </span>
            {isActive ? 'WATCHING' : 'PAUSED'}
          </div>
        </div>

        <div
          className="grid gap-3 border-y py-4 sm:grid-cols-2 xl:grid-cols-4"
          style={{ borderColor: 'var(--rmbot-border-muted)' }}
        >
          {[
            {
              label: 'Last checked',
              value: formatMinutesAgo(lastCheckedMinutesAgo),
              valueColor: 'var(--rmbot-emerald-400)',
            },
            { label: 'Found today', value: String(foundToday), valueColor: 'var(--rmbot-text-1)' },
            { label: 'Total found', value: String(foundTotal), valueColor: 'var(--rmbot-text-1)' },
            { label: 'Poll rate', value: `${pollRateMinutes} min`, valueColor: 'var(--rmbot-text-1)' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="text-[11px] uppercase tracking-[0.08em]"
                style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
              >
                {stat.label}
              </div>
              <div
                className="mt-2 text-sm sm:text-[15px]"
                style={{ color: stat.valueColor, fontFamily: 'var(--rmbot-font-mono)' }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div
            className="text-[11px] uppercase tracking-[0.08em]"
            style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
          >
            Recent listings
          </div>

          {recentListings.length > 0 ? (
            <div className="space-y-2">
              {recentListings.map((property, index) => (
                <div
                  key={`${property.address}-${property.price}-${index}`}
                  className="flex flex-col gap-2 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  style={{
                    backgroundColor: 'var(--rmbot-bg-base)',
                    borderColor: 'var(--rmbot-border)',
                    borderRadius: 'var(--rmbot-radius-sm)',
                  }}
                >
                  <div className="min-w-0">
                    <div
                      className="truncate text-sm"
                      style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-ui)' }}
                    >
                      {property.address}
                    </div>
                    <div
                      className="mt-1 text-[11px] uppercase tracking-[0.08em]"
                      style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
                    >
                      {formatSourceLabel(property.source)}
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-4 sm:block sm:text-right">
                    <div
                      className="text-sm"
                      style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-mono)' }}
                    >
                      {property.price}
                    </div>
                    <div
                      className="mt-1 text-[11px]"
                      style={{ color: 'var(--rmbot-emerald-400)', fontFamily: 'var(--rmbot-font-mono)' }}
                    >
                      Found {formatMinutesAgo(property.foundMinutesAgo)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-lg border border-dashed px-4 py-5 text-sm"
              style={{
                backgroundColor: 'var(--rmbot-bg-base)',
                borderColor: 'var(--rmbot-border)',
                borderRadius: 'var(--rmbot-radius-sm)',
                color: 'var(--rmbot-text-2)',
                fontFamily: 'var(--rmbot-font-ui)',
              }}
            >
              New matches will land here as the monitor runs.
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            type="button"
            variant="ghost"
            onClick={onViewAll}
            className="border"
            style={{
              borderColor: 'var(--rmbot-border)',
              borderRadius: 'var(--rmbot-radius-sm)',
              color: 'var(--rmbot-text-2)',
              fontFamily: 'var(--rmbot-font-ui)',
            }}
          >
            View all
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onEdit}
            className="border"
            style={{
              borderColor: 'var(--rmbot-border)',
              borderRadius: 'var(--rmbot-radius-sm)',
              color: 'var(--rmbot-text-2)',
              fontFamily: 'var(--rmbot-font-ui)',
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onStop}
            className="border"
            style={{
              backgroundColor: 'color-mix(in oklab, var(--rmbot-color-error) 10%, transparent)',
              borderColor: 'color-mix(in oklab, var(--rmbot-color-error) 40%, transparent)',
              borderRadius: 'var(--rmbot-radius-sm)',
              color: 'var(--rmbot-color-error)',
              fontFamily: 'var(--rmbot-font-ui)',
            }}
          >
            Stop
          </Button>
        </div>
      </div>
    </section>
  );
}

export default MonitorCardBlock;
