"use client";

import * as React from "react";
import { CheckCircle2, ExternalLink, Loader2, MailCheck } from "lucide-react";
import { CardContent, CardDescription, CardHeader, CardTitle, cn } from "@olwiba/cn";
import { Button } from "../primitives/Button";
import { Card } from "../primitives/Card";
import { inboxLinkFor } from "../lib/inbox-link";
import type { AppShellRenderLink } from "./AppShell";

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

const linkClass = "text-foreground underline underline-offset-4";

function StatusIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
      {children}
    </div>
  );
}

function formatCountdown(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

/** Seconds left on a cooldown that restarts whenever `startedAt` changes. */
function useCooldown(seconds: number, startedAt: number): number {
  const remainingAt = React.useCallback(
    () => Math.max(0, Math.ceil((startedAt + seconds * 1000 - Date.now()) / 1000)),
    [seconds, startedAt],
  );
  const [remaining, setRemaining] = React.useState(remainingAt);

  React.useEffect(() => {
    setRemaining(remainingAt());
    const timer = window.setInterval(() => {
      const next = remainingAt();
      setRemaining(next);
      if (next === 0) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [remainingAt]);

  return remaining;
}

// ─── Check your email ─────────────────────────────────────────────────────────

export interface AuthCheckEmailProps {
  /** Address the confirmation was sent to. Shown back, and used to pick the inbox link. */
  email: string;
  /**
   * Sends the confirmation again. Throw (or reject) to report a failure — the
   * cooldown only restarts on success, so a failed send can be retried at once.
   */
  onResend: () => Promise<void> | void;
  /**
   * Seconds before resending is allowed, counted from mount and again after
   * each successful resend. The first email has only just gone out, so an
   * instantly enabled resend invites a second one before the first arrives.
   * @default 60
   */
  resendCooldownSeconds?: number;
  /** Where "Back to sign in" points. Omit to leave the link out. */
  signInHref?: string;
  renderLink?: AppShellRenderLink;
  title?: React.ReactNode;
  /** Replaces the default explanation below the description. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * The screen between "account created" and "you can use it".
 *
 * The main action is getting to the inbox, because that is the only thing
 * that moves the person forward. Resending is the fallback, so it is a quiet
 * link on a cooldown rather than a competing button.
 */
export function AuthCheckEmail({
  email,
  onResend,
  resendCooldownSeconds = 60,
  signInHref,
  renderLink = defaultRenderLink,
  title = "Check your email",
  children,
  className,
}: AuthCheckEmailProps) {
  const inbox = inboxLinkFor(email);
  const [cooldownStartedAt, setCooldownStartedAt] = React.useState(() => Date.now());
  const remaining = useCooldown(resendCooldownSeconds, cooldownStartedAt);
  const [sending, setSending] = React.useState(false);
  const [sentAgain, setSentAgain] = React.useState(false);

  const resend = async () => {
    setSending(true);
    try {
      await onResend();
      setSentAgain(true);
      setCooldownStartedAt(Date.now());
    } catch {
      // The caller reports the failure; leaving the cooldown alone lets them retry.
    } finally {
      setSending(false);
    }
  };

  const resendDisabled = sending || remaining > 0;

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="items-center text-center">
        <StatusIcon>
          <MailCheck className="size-6" aria-hidden="true" />
        </StatusIcon>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          We sent a confirmation link to{" "}
          <span className="font-medium text-foreground">{email}</span>. Open it to finish setting
          up your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children ?? (
          <p className="text-sm text-muted-foreground">
            You will not be able to sign in until the address is confirmed. Check your spam folder
            if it has not arrived in a minute or two.
          </p>
        )}

        {inbox && (
          <Button className="w-full" asChild>
            <a href={inbox.href} target="_blank" rel="noopener noreferrer">
              Open {inbox.provider}
              <ExternalLink className="ml-2 size-4" aria-hidden="true" />
            </a>
          </Button>
        )}

        <p className="text-center text-sm text-muted-foreground" aria-live="polite">
          {sentAgain ? "Sent again. " : "Didn’t get it? "}
          <button
            type="button"
            className={cn(linkClass, "disabled:cursor-not-allowed disabled:no-underline disabled:opacity-60")}
            disabled={resendDisabled}
            onClick={() => void resend()}
          >
            {sending ? (
              <>
                <Loader2 className="mr-1 inline size-3 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : remaining > 0 ? (
              `Resend in ${formatCountdown(remaining)}`
            ) : (
              "Resend email"
            )}
          </button>
        </p>

        {signInHref && (
          <p className="text-center text-sm text-muted-foreground">
            {renderLink({ href: signInHref, className: linkClass, children: "Back to sign in" })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Email verified ───────────────────────────────────────────────────────────

export interface AuthEmailVerifiedProps {
  /** Where the sign-in button points, carrying any return path the caller needs. */
  signInHref: string;
  renderLink?: AppShellRenderLink;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "Sign in" */
  ctaLabel?: string;
  className?: string;
}

/**
 * Where a verification link lands.
 *
 * Deliberately does not sign the person in. The link is usually opened inside
 * the email app's own browser, and a session created there leaves them signed
 * in somewhere they will not stay while their real browser is still signed
 * out. Confirming and pointing at sign-in sends them back to the browser they
 * started in.
 */
export function AuthEmailVerified({
  signInHref,
  renderLink = defaultRenderLink,
  title = "Email verified",
  description = "Your email is confirmed and your account is ready. Sign in to get started.",
  ctaLabel = "Sign in",
  className,
}: AuthEmailVerifiedProps) {
  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="items-center text-center">
        <StatusIcon>
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </StatusIcon>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          {renderLink({ href: signInHref, children: ctaLabel })}
        </Button>
      </CardContent>
    </Card>
  );
}
