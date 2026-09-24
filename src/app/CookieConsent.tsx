"use client";

import * as React from "react";
import { Cookie } from "lucide-react";
import { cn } from "@olwiba/cn";
import { Button } from "../primitives/Button";
import type { AppShellRenderLink } from "./AppShell";

export type CookieConsentValue = "granted" | "denied";

/** Default cookie the choice is stored in. */
export const COOKIE_CONSENT_COOKIE = "cookie_consent";

/**
 * Reads a stored choice from a Cookie header (server) or `document.cookie`
 * (browser).
 *
 * Stored as `<version>.<choice>`. A version that does not match is treated as
 * no choice at all, so bumping `version` when the policy materially changes
 * asks everyone again rather than carrying consent to something they were
 * never shown.
 */
export function readCookieConsent(
  cookieHeader: string | null | undefined,
  { cookieName = COOKIE_CONSENT_COOKIE, version = 1 }: { cookieName?: string; version?: number } = {},
): CookieConsentValue | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name !== cookieName) continue;
    const [storedVersion, choice] = decodeURIComponent(rest.join("=")).split(".");
    if (Number(storedVersion) !== version) return null;
    return choice === "granted" || choice === "denied" ? choice : null;
  }
  return null;
}

interface CookieConsentContextValue {
  /** Whether anything on this site needs consent. False = no banner, tracking allowed. */
  required: boolean;
  /** The stored choice, or null when none has been made yet. */
  consent: CookieConsentValue | null;
  /** True once the choice is known — immediately with `initialConsent`, else after mount. */
  ready: boolean;
  /** Whether non-essential cookies may be set right now. */
  allowed: boolean;
  grant: () => void;
  deny: () => void;
  /** Reopens the banner so the choice can be changed, e.g. from a footer link. */
  openSettings: () => void;
  settingsOpen: boolean;
}

const CookieConsentContext = React.createContext<CookieConsentContextValue | null>(null);

export interface CookieConsentProviderProps {
  /**
   * Whether the site sets any cookie that needs consent. Pass false when no
   * tracker is configured: the banner never renders and `allowed` is true,
   * because there is nothing to ask about.
   */
  required: boolean;
  /**
   * The choice read on the server with `readCookieConsent`. Supplying it lets
   * the first render already know the answer, so the banner neither flashes
   * for someone who has chosen nor pops in late for someone who has not.
   * Leave undefined to read `document.cookie` after mount instead.
   */
  initialConsent?: CookieConsentValue | null;
  cookieName?: string;
  /** Bump to ask everyone again. @default 1 */
  version?: number;
  /** How long a choice is remembered. @default 365 */
  maxAgeDays?: number;
  /** Called after the choice changes — e.g. to unload trackers on withdrawal. */
  onChange?: (consent: CookieConsentValue, previous: CookieConsentValue | null) => void;
  children: React.ReactNode;
}

/**
 * Holds the visitor's cookie choice in a first-party cookie.
 *
 * A cookie rather than localStorage because the server can read it, so the
 * page can be rendered knowing the answer. Not the database: most people who
 * see the banner have no account for it to belong to.
 */
export function CookieConsentProvider({
  required,
  initialConsent,
  cookieName = COOKIE_CONSENT_COOKIE,
  version = 1,
  maxAgeDays = 365,
  onChange,
  children,
}: CookieConsentProviderProps) {
  const [consent, setConsent] = React.useState<CookieConsentValue | null>(initialConsent ?? null);
  const [ready, setReady] = React.useState(initialConsent !== undefined);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  React.useEffect(() => {
    if (initialConsent !== undefined) return;
    setConsent(readCookieConsent(document.cookie, { cookieName, version }));
    setReady(true);
  }, [cookieName, initialConsent, version]);

  const choose = React.useCallback(
    (next: CookieConsentValue) => {
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      document.cookie = `${cookieName}=${version}.${next}; Path=/; Max-Age=${
        maxAgeDays * 86_400
      }; SameSite=Lax${secure}`;
      setSettingsOpen(false);
      setConsent((previous) => {
        if (previous !== next) onChange?.(next, previous);
        return next;
      });
    },
    [cookieName, maxAgeDays, onChange, version],
  );

  const value = React.useMemo<CookieConsentContextValue>(
    () => ({
      required,
      consent,
      ready,
      allowed: !required || consent === "granted",
      grant: () => choose("granted"),
      deny: () => choose("denied"),
      openSettings: () => setSettingsOpen(true),
      settingsOpen,
    }),
    [choose, consent, ready, required, settingsOpen],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

/** The visitor's cookie choice. Outside a provider, reports "not required". */
export function useCookieConsent(): CookieConsentContextValue {
  const context = React.useContext(CookieConsentContext);
  return (
    context ?? {
      required: false,
      consent: null,
      ready: true,
      allowed: true,
      grant: () => {},
      deny: () => {},
      openSettings: () => {},
      settingsOpen: false,
    }
  );
}

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export interface CookieConsentBannerProps {
  /** Link to the privacy or cookie policy. Omit to leave the link out. */
  policyHref?: string;
  renderLink?: AppShellRenderLink;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @default "Accept" */
  acceptLabel?: string;
  /** @default "Reject" */
  rejectLabel?: string;
  className?: string;
}

/**
 * The consent prompt. Renders only when consent is required and either no
 * choice has been made or settings were reopened.
 *
 * Accept and reject are the same size and weight, and rejecting is one click:
 * UK and EU guidance treats a harder-to-find "no" as not a real choice.
 */
export function CookieConsentBanner({
  policyHref,
  renderLink = defaultRenderLink,
  title = "Cookies",
  description = "We use analytics cookies to understand how the site is used and improve it. They are only set if you accept.",
  acceptLabel = "Accept",
  rejectLabel = "Reject",
  className,
}: CookieConsentBannerProps) {
  const { required, ready, consent, settingsOpen, grant, deny } = useCookieConsent();
  if (!required || !ready || (consent !== null && !settingsOpen)) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 p-4 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-sm sm:p-0",
        className,
      )}
    >
      <div className="rounded-2xl border bg-background p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <Cookie className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">
              {description}
              {policyHref && (
                <>
                  {" "}
                  {renderLink({
                    href: policyHref,
                    className: "text-foreground underline underline-offset-4",
                    children: "Learn more",
                  })}
                </>
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={deny}>
            {rejectLabel}
          </Button>
          <Button variant="outline" onClick={grant}>
            {acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
