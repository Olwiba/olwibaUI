'use client';

import * as React from 'react';
import { CheckCircle2, Copy, RefreshCcw } from 'lucide-react';
import { Button, cn } from '@olwiba/cn';

const whatsAppThemeVars = {
  '--rmbot-font-display': '"Space Grotesk", sans-serif',
  '--rmbot-font-ui': 'Geist, sans-serif',
  '--rmbot-font-mono': '"IBM Plex Mono", monospace',
  '--rmbot-bg-base': 'var(--bg-base, #080808)',
  '--rmbot-bg-surface': 'var(--bg-surface, #0D1110)',
  '--rmbot-bg-input': 'var(--bg-input, #111614)',
  '--rmbot-border': 'var(--border, #24302C)',
  '--rmbot-text-1': 'var(--text-1, #F5F7F6)',
  '--rmbot-text-2': 'var(--text-2, #A3A3A3)',
  '--rmbot-emerald-400': 'var(--emerald-400, #34d399)',
  '--rmbot-emerald-500': 'var(--emerald-500, #10b981)',
  '--rmbot-color-error': 'var(--color-error, #ef4444)',
  '--rmbot-radius-sm': 'var(--radius-sm, 8px)',
  '--rmbot-radius-md': 'var(--radius-md, 12px)',
  '--rmbot-radius-lg': 'var(--radius-lg, 16px)',
} as React.CSSProperties;

export interface WhatsAppLinkBlockProps {
  state?: 'unlinked' | 'pending' | 'connected';
  pairingCode?: string;
  expiresAt?: Date;
  linkedNumber?: string;
  botNumber?: string;
  onCopyCode?: () => void;
  onRegenerate?: () => void;
  onDisconnect?: () => void;
  className?: string;
}

function formatCountdown(expiresAt: Date, now: number) {
  const remainingMs = Math.max(expiresAt.getTime() - now, 0);
  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function maskLinkedNumber(linkedNumber?: string) {
  if (!linkedNumber) {
    return '+44 •••• ••• 1234';
  }

  const digits = linkedNumber.replace(/\D/g, '');
  const lastFour = digits.slice(-4).padStart(4, '•');

  if (digits.startsWith('44')) {
    return `+44 •••• ••• ${lastFour}`;
  }

  return `+•• •••• ••• ${lastFour}`;
}

export function WhatsAppLinkBlock({
  state = 'unlinked',
  pairingCode,
  expiresAt,
  linkedNumber,
  botNumber = '@rmBot',
  onCopyCode,
  onRegenerate,
  onDisconnect,
  className,
}: WhatsAppLinkBlockProps) {
  const codeSeed = React.useId().replace(/[^a-zA-Z0-9]/g, '').slice(-6).toUpperCase().padStart(6, '0');
  const [defaultExpiry] = React.useState(() => new Date(Date.now() + 5 * 60 * 1000));
  const [now, setNow] = React.useState(() => Date.now());
  const [copied, setCopied] = React.useState(false);

  const resolvedCode = pairingCode ?? `RM-${codeSeed}`;
  const resolvedExpiry = expiresAt ?? defaultExpiry;

  React.useEffect(() => {
    if (state === 'connected') return;

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [state]);

  React.useEffect(() => {
    if (!copied) return;

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(resolvedCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }

    onCopyCode?.();
  }

  return (
    <section
      className={cn('border p-5 sm:p-6', className)}
      style={{
        ...whatsAppThemeVars,
        backgroundColor: 'var(--rmbot-bg-surface)',
        borderColor: 'var(--rmbot-border)',
        borderRadius: 'var(--rmbot-radius-lg)',
      }}
    >
      {state === 'connected' ? (
        <div>
          <div className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 size-6"
              style={{ color: 'var(--rmbot-emerald-500)' }}
            />
            <div>
              <h3
                className="text-2xl"
                style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-display)', fontWeight: 700 }}
              >
                WhatsApp connected
              </h3>
              <p
                className="mt-2 text-sm"
                style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-ui)' }}
              >
                Alerts are now flowing to {maskLinkedNumber(linkedNumber)}.
              </p>
            </div>
          </div>

          <div
            className="mt-6 rounded-lg border px-4 py-4"
            style={{
              backgroundColor: 'var(--rmbot-bg-base)',
              borderColor: 'var(--rmbot-border)',
              borderRadius: 'var(--rmbot-radius-md)',
            }}
          >
            <div
              className="text-[11px] uppercase tracking-[0.08em]"
              style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
            >
              Linked number
            </div>
            <div
              className="mt-2 text-base"
              style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-mono)' }}
            >
              {maskLinkedNumber(linkedNumber)}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={onDisconnect}
            className="mt-5 border"
            style={{
              backgroundColor: 'color-mix(in oklab, var(--rmbot-color-error) 10%, transparent)',
              borderColor: 'color-mix(in oklab, var(--rmbot-color-error) 40%, transparent)',
              borderRadius: 'var(--rmbot-radius-sm)',
              color: 'var(--rmbot-color-error)',
              fontFamily: 'var(--rmbot-font-ui)',
            }}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3
                className="text-2xl"
                style={{ color: 'var(--rmbot-text-1)', fontFamily: 'var(--rmbot-font-display)', fontWeight: 700 }}
              >
                {state === 'pending' ? 'Waiting for WhatsApp...' : 'Connect WhatsApp'}
              </h3>
              {state === 'pending' ? (
                <span className="relative flex size-[10px]">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: 'var(--rmbot-emerald-400)' }}
                  />
                  <span
                    className="relative inline-flex size-[10px] rounded-full"
                    style={{ backgroundColor: 'var(--rmbot-emerald-400)' }}
                  />
                </span>
              ) : null}
            </div>

            <ol className="mt-4 space-y-2">
              {[
                'Open WhatsApp',
                `Send this code to ${botNumber}`,
                'Done',
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-ui)' }}
                >
                  <span
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full border text-[11px]"
                    style={{
                      borderColor: 'var(--rmbot-border)',
                      color: 'var(--rmbot-emerald-500)',
                      fontFamily: 'var(--rmbot-font-mono)',
                    }}
                  >
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div
            className="rounded-lg border p-4 sm:p-5"
            style={{
              backgroundColor: 'var(--rmbot-bg-base)',
              borderColor: 'var(--rmbot-border)',
              borderRadius: 'var(--rmbot-radius-md)',
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div
                  className="text-[11px] uppercase tracking-[0.08em]"
                  style={{ color: 'var(--rmbot-text-2)', fontFamily: 'var(--rmbot-font-mono)' }}
                >
                  Pairing code
                </div>
                <div
                  className="mt-3 text-[2.5rem] leading-none tracking-[-0.04em]"
                  style={{ color: 'var(--rmbot-emerald-500)', fontFamily: 'var(--rmbot-font-mono)', fontWeight: 700 }}
                >
                  {resolvedCode}
                </div>
                <div
                  className="mt-3 text-xs"
                  style={{ color: 'var(--rmbot-emerald-400)', fontFamily: 'var(--rmbot-font-mono)' }}
                >
                  expires in {formatCountdown(resolvedExpiry, now)}
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={handleCopy}
                className="border"
                style={{
                  backgroundColor: 'var(--rmbot-bg-input)',
                  borderColor: 'var(--rmbot-border)',
                  borderRadius: 'var(--rmbot-radius-sm)',
                  color: copied ? 'var(--rmbot-emerald-500)' : 'var(--rmbot-text-1)',
                  fontFamily: 'var(--rmbot-font-ui)',
                }}
              >
                <Copy className="size-4" />
                {copied ? 'Copied' : 'Copy code'}
              </Button>
            </div>
          </div>

          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 text-sm underline underline-offset-4"
            style={{ color: 'var(--rmbot-emerald-500)', fontFamily: 'var(--rmbot-font-ui)' }}
          >
            <RefreshCcw className="size-4" />
            Regenerate code
          </button>
        </div>
      )}
    </section>
  );
}

export default WhatsAppLinkBlock;
