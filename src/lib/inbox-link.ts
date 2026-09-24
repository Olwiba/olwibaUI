/**
 * Where to send someone who has just been asked to check their email.
 *
 * `mailto:` is the obvious answer and the wrong one: it opens a blank message
 * to write, not the inbox the confirmation is sitting in. The only link that
 * reliably lands on the inbox is the provider's own, and on phones those URLs
 * usually hand off to the installed app.
 *
 * Matched on the address's domain, so a custom-domain mailbox hosted by one of
 * these providers is not recognised. Returning null for it is deliberate: a
 * button that opens the wrong inbox is worse than no button.
 */
export interface InboxLink {
  /** Display name, e.g. "Gmail" — for a label like "Open Gmail". */
  provider: string;
  href: string;
}

const PROVIDERS: { provider: string; href: string; domains: string[] }[] = [
  {
    provider: "Gmail",
    href: "https://mail.google.com/mail/u/0/#inbox",
    domains: ["gmail.com", "googlemail.com"],
  },
  {
    provider: "Outlook",
    href: "https://outlook.live.com/mail/0/inbox",
    domains: ["outlook.com", "hotmail.com", "hotmail.co.uk", "live.com", "live.co.uk", "msn.com"],
  },
  {
    provider: "Yahoo Mail",
    href: "https://mail.yahoo.com/",
    domains: ["yahoo.com", "yahoo.co.uk", "ymail.com"],
  },
  {
    provider: "iCloud Mail",
    href: "https://www.icloud.com/mail",
    domains: ["icloud.com", "me.com", "mac.com"],
  },
  {
    provider: "Proton Mail",
    href: "https://mail.proton.me/u/0/inbox",
    domains: ["proton.me", "protonmail.com", "pm.me"],
  },
];

/** The inbox link for an email address's provider, or null when it is not one we know. */
export function inboxLinkFor(email: string | undefined): InboxLink | null {
  const domain = email?.split("@").pop()?.trim().toLowerCase();
  if (!domain) return null;
  const match = PROVIDERS.find((entry) => entry.domains.includes(domain));
  return match ? { provider: match.provider, href: match.href } : null;
}
