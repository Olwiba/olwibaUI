export type LinkIntent =
  | 'internal'
  | 'hash'
  | 'external'
  | 'download'
  | 'email'
  | 'telephone'
  | 'unsafe';

export type ClassifiedLink = {
  href: string;
  intent: LinkIntent;
};

const EXTERNAL_PROTOCOL = /^(?:https?:)?\/\//i;
const SCHEME = /^([a-z][a-z\d+.-]*):/i;

/**
 * Classifies navigation without reading browser globals, so server and client
 * render the same element before hydration.
 */
export function classifyLink(href: string, download = false): ClassifiedLink {
  const normalized = href.trim();

  if (download) return { href: normalized, intent: 'download' };
  if (normalized.startsWith('#')) return { href: normalized, intent: 'hash' };
  if (/^mailto:/i.test(normalized)) return { href: normalized, intent: 'email' };
  if (/^tel:/i.test(normalized)) return { href: normalized, intent: 'telephone' };
  if (EXTERNAL_PROTOCOL.test(normalized)) return { href: normalized, intent: 'external' };

  const scheme = normalized.match(SCHEME);
  if (scheme) return { href: normalized, intent: 'unsafe' };

  return { href: normalized || '/', intent: 'internal' };
}

export function externalLinkLabel(label: string): string {
  return `${label} (opens in a new tab)`;
}
