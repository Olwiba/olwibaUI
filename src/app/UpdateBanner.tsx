'use client';

import * as React from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { Button, Card, cn } from '@olwiba/cn';

export interface UpdateBannerProps {
  /** Version baked into the running client bundle (e.g. a git short SHA embedded at build time). */
  currentVersion: string;
  /**
   * Fetches the currently deployed version from the server. The host app wires
   * its own endpoint — the component stays app-agnostic.
   */
  fetchVersion: () => Promise<{ version: string }>;
  /** Poll interval in ms. */
  intervalMs?: number;
  /** Force the banner to show (demos/testing). */
  forceShow?: boolean;
  /** Called on refresh click; defaults to a full page reload. Use it to hook a celebration first. */
  onRefresh?: () => void;
  message?: React.ReactNode;
  buttonLabel?: string;
  className?: string;
}

export function UpdateBanner({
  currentVersion,
  fetchVersion,
  intervalMs = 5 * 60 * 1000,
  forceShow = false,
  onRefresh,
  message = (
    <>
      <span className="font-semibold">App update available!</span> Refresh to get the latest features
      and improvements.
    </>
  ),
  buttonLabel = 'Refresh now',
  className,
}: UpdateBannerProps) {
  const [show, setShow] = React.useState(forceShow);
  const [entered, setEntered] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    if (forceShow) {
      setShow(true);
      return;
    }
    setShow(false);

    let cancelled = false;

    const check = async () => {
      try {
        const server = await fetchVersion();
        if (!cancelled && server.version && server.version !== currentVersion) {
          setShow(true);
        }
      } catch {
        // Version checks are best-effort; stay quiet on failure.
      }
    };

    void check();
    const id = setInterval(check, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [currentVersion, fetchVersion, forceShow, intervalMs]);

  // Two-frame mount so the enter transition actually plays.
  React.useEffect(() => {
    if (!show) {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [show]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      if (onRefresh) {
        onRefresh();
        setRefreshing(false);
        if (forceShow) setShow(false);
      } else {
        window.location.reload();
      }
    }, 400);
  };

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        className={cn(
          'pointer-events-auto transition-all duration-500 ease-out',
          entered ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0',
        )}
      >
        <Card
          className={cn(
            'max-w-3xl border-border bg-card text-card-foreground shadow-lg',
            className,
          )}
        >
          <div className="flex items-center justify-between gap-6 p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm text-card-foreground">{message}</p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              size="sm"
              className="shrink-0"
            >
              {refreshing ? <RefreshCw className="size-4 animate-spin" /> : buttonLabel}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
