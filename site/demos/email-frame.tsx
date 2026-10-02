'use client';

import * as React from 'react';
import { Button, Input, Switch, useResolvedTheme } from '@olwiba/cn';
import { SandboxControls, useSandboxTheme, useThemeConfig } from '@olwiba/docs';
import { emailPreviews } from './email-previews.generated';
import {
  defaultEmailOptions,
  emailBrandFor,
  isDefaultEmailOptions,
  type EmailExampleOptions,
} from './email-options';

const DARK_QUERY = /@media\s*\(\s*prefers-color-scheme:\s*dark\s*\)/g;

/** What `@react-email/render` puts before the markup, so both paths match. */
const DOCTYPE =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

/**
 * Pins the email's dark-mode rules to the theme being previewed.
 *
 * The email follows its reader's colour scheme through a media query, which in
 * an iframe answers for the visitor's operating system, not for the theme
 * shown around it. Rewriting the query to always or never match makes the
 * preview show what a client in that mode renders.
 */
function withScheme(html: string, scheme: 'light' | 'dark') {
  return html.replace(DARK_QUERY, scheme === 'dark' ? '@media all' : '@media not all');
}

/**
 * Renders an example with changed options, in the browser.
 *
 * Loaded on demand: the default options are already rendered to HTML at build
 * time, so React's static renderer and the email components cost nothing
 * until something changes. `renderToStaticMarkup` rather than
 * `@react-email/render`, which would bring its prettier dependency with it.
 */
async function renderExample(id: string, options: EmailExampleOptions) {
  const [{ renderToStaticMarkup }, { emailExamples }] = await Promise.all([
    import('react-dom/server'),
    import('./email-examples'),
  ]);
  const example = emailExamples[id];
  return example ? DOCTYPE + renderToStaticMarkup(example(options)) : undefined;
}

type Controls = Omit<EmailExampleOptions, 'brandColor'>;

/**
 * Shows a rendered email the way a mail client would, with controls for the
 * options every email shares.
 *
 * Light and dark come from the sandbox (the site's theme, or the toolbar's
 * toggle), and the brand colour from the site header's picker; the controls
 * here are only what belongs to the email itself.
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
  const siteScheme = useResolvedTheme();
  const scheme = useSandboxTheme() ?? siteScheme;
  const { activeTheme } = useThemeConfig();

  const [controls, setControls] = React.useState<Controls>({
    logo: defaultEmailOptions.logo,
    logoAlign: defaultEmailOptions.logoAlign,
    footnote: defaultEmailOptions.footnote,
  });
  // Typing in the footnote re-renders the email; deferring keeps the field
  // responsive while the frame catches up.
  const deferredControls = React.useDeferredValue(controls);
  const brandColor = emailBrandFor(activeTheme);
  const options = React.useMemo<EmailExampleOptions>(
    () => ({ ...deferredControls, brandColor }),
    [deferredControls, brandColor],
  );
  const isDefault = isDefaultEmailOptions(options);

  const [rendered, setRendered] = React.useState<string>();
  React.useEffect(() => {
    if (isDefault) return;
    let cancelled = false;
    void renderExample(id, options).then((html) => {
      if (!cancelled) setRendered(html);
    });
    return () => {
      cancelled = true;
    };
  }, [id, options, isDefault]);

  // While a new render is on its way the previous one stays up, so the frame
  // does not flash back to the defaults between two changes.
  const source = isDefault ? emailPreviews[id] : (rendered ?? emailPreviews[id]);
  const html = React.useMemo(() => (source ? withScheme(source, scheme) : undefined), [source, scheme]);

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

  const set = <K extends keyof Controls>(key: K, value: Controls[K]) =>
    setControls((current) => ({ ...current, [key]: value }));

  if (!html) {
    return (
      <div className="text-muted-foreground p-6 text-sm">
        No rendered preview for <code>{id}</code>. Run <code>bun run email:generate</code>.
      </div>
    );
  }

  return (
    <>
      <iframe
        ref={ref}
        title={`${id} email preview`}
        srcDoc={html}
        onLoad={measure}
        sandbox="allow-same-origin"
        className="w-full border-0"
        style={{ height }}
      />
      <SandboxControls>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <label className="flex items-center gap-2 text-xs font-medium">
            <Switch checked={controls.logo} onCheckedChange={(on) => set('logo', on)} />
            Logo
          </label>

          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground mr-1 text-xs font-medium">Position</span>
            {(['left', 'center'] as const).map((align) => (
              <Button
                key={align}
                size="sm"
                variant={controls.logoAlign === align ? 'secondary' : 'outline'}
                aria-pressed={controls.logoAlign === align}
                onClick={() => set('logoAlign', align)}
              >
                {align === 'left' ? 'Left' : 'Center'}
              </Button>
            ))}
          </div>

          <label className="flex min-w-[16rem] flex-1 items-center gap-2 text-xs font-medium">
            <span className="text-muted-foreground shrink-0">Footnote</span>
            <Input
              value={controls.footnote}
              onChange={(event) => set('footnote', event.target.value)}
              placeholder="Empty removes it"
              className="h-8 text-xs"
            />
          </label>
        </div>
      </SandboxControls>
    </>
  );
}
