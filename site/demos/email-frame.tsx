'use client';

import * as React from 'react';
import { emailPreviews } from './email-previews.generated';

/**
 * Shows a rendered email the way a mail client would.
 *
 * The iframe is not decoration. Email HTML carries its own `<html>`, `<body>`
 * and inline styles, so dropping it into the page would both produce invalid
 * markup and let the documentation site's stylesheet reach into a message that
 * will never see it. A separate document is the only honest frame.
 *
 * `sandbox` is set without `allow-scripts`: this is untrusted-shaped content
 * being displayed, and nothing in an email should be executing anyway.
 */
export function EmailFrame({ id }: { id: string }) {
  const html = emailPreviews[id];
  const ref = React.useRef<HTMLIFrameElement | null>(null);
  const [height, setHeight] = React.useState(420);

  // Emails size themselves, so the frame follows the content rather than
  // imposing a height that would either clip the message or pad it.
  const measure = React.useCallback(() => {
    const doc = ref.current?.contentDocument;
    if (!doc?.body) return;
    const next = Math.ceil(doc.documentElement.scrollHeight || doc.body.scrollHeight);
    if (next > 0) setHeight(next);
  }, []);

  if (!html) {
    return (
      <div className="text-muted-foreground p-6 text-sm">
        No rendered preview for <code>{id}</code>. Run <code>bun run email:generate</code>.
      </div>
    );
  }

  return (
    <iframe
      ref={ref}
      title={`${id} email preview`}
      srcDoc={html}
      onLoad={measure}
      sandbox="allow-same-origin"
      className="w-full border-0 bg-white"
      style={{ height }}
    />
  );
}
