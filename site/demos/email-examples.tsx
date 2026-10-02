import type { ReactElement } from 'react';
// Relative rather than `@olwiba/ui/email`: the site aliases `@olwiba/ui` to the
// package's root entry, which swallows the subpath once this runs in the browser.
import {
  ActionEmail,
  EmailItemList,
  EmailLayout,
  EmailLinkFallback,
  NoticeEmail,
} from '../../src/email';
import type { EmailExampleOptions } from './email-options';

/**
 * Served from this site's own public folder so the preview loads offline.
 * In a real email it must be an absolute https URL: an inbox has no origin
 * for a relative path to resolve against.
 */
const LOGO = '/email/nexus-logo.png';

/** The layout props every example takes from the demo controls. */
function shell(options: EmailExampleOptions) {
  return {
    appName: 'Nexus Inc',
    brandColor: options.brandColor,
    logoUrl: options.logo ? LOGO : undefined,
    logoAlign: options.logoAlign,
    footnote: options.footnote.trim() || undefined,
  };
}

/**
 * The examples shown on the email documentation pages.
 *
 * Kept in one module because they are rendered from two runtimes:
 * `scripts/generate-email-previews.ts` renders each with the default options
 * to HTML in Node, which is what a page shows first, and the preview frame
 * renders again in the browser once a demo control changes an option.
 *
 * Emails cannot be previewed the way other blocks are. `EmailLayout` renders
 * `<html>`, `<head>` and `<body>`, so mounting one inside the sandbox's iframe
 * root nests a document inside a `div` — React tolerates it on the server and
 * hydration dies on the client. Rendering to HTML sidesteps that and is more
 * honest anyway: the page shows the markup that actually gets sent.
 */
export const emailExamples: Record<string, (options: EmailExampleOptions) => ReactElement> = {
  'action-email': (options) => (
    <ActionEmail
      {...shell(options)}
      preview="Sign in to Nexus Inc"
      heading="Sign in with one click"
      description={
        'You asked to sign in to Nexus Inc. This link expires in 15 minutes and can only be used once.\n\n' +
        "If that wasn't you, you can ignore this email."
      }
      actionLabel="Sign in"
      actionUrl="https://nexus.example/auth/magic?token=kowhai"
    />
  ),

  'action-email-digest': (options) => (
    <ActionEmail
      {...shell(options)}
      preview="3 new reports are ready"
      heading="3 new reports are ready"
      description="These finished overnight. Open one to read it, or see them all in Reports."
      items={[
        { title: 'Kauri quarterly review', href: 'https://nexus.example/r/kauri', meta: 'Finance · 12 pages' },
        { title: 'Tōtara churn analysis', href: 'https://nexus.example/r/totara', meta: 'Growth · 8 pages' },
        { title: 'Rimu onboarding funnel', href: 'https://nexus.example/r/rimu', meta: 'Product · 5 pages' },
      ]}
      actionLabel="Open Reports"
      actionUrl="https://nexus.example/reports"
      showLinkFallback={false}
    />
  ),

  'notice-email': (options) => (
    <NoticeEmail
      {...shell(options)}
      preview="Your export is ready"
      heading="Your export is ready"
      body="The Pōhutukawa workspace export you requested has finished. It stays available for seven days, then it is deleted."
    />
  ),

  'email-layout': (options) => (
    <EmailLayout {...shell(options)} preview="A message from Nexus Inc">
      <EmailLinkFallback
        actionUrl="https://nexus.example/workspaces/paua"
        label="Everything inside the shell is yours. This is one block placed in it:"
        brandColor={options.brandColor}
      />
    </EmailLayout>
  ),

  'email-item-list': (options) => (
    <EmailLayout {...shell(options)} preview="Your week in Nexus Inc">
      <EmailItemList
        max={3}
        brandColor={options.brandColor}
        items={[
          { title: 'Kauri quarterly review', href: 'https://nexus.example/r/kauri', meta: 'Finance · 12 pages' },
          { title: 'Tōtara churn analysis', href: 'https://nexus.example/r/totara', meta: 'Growth · 8 pages' },
          { title: 'Rimu onboarding funnel', href: 'https://nexus.example/r/rimu', meta: 'Product · 5 pages' },
          { title: 'Mataī pricing test', href: 'https://nexus.example/r/matai', meta: 'Growth · 3 pages' },
        ]}
      />
    </EmailLayout>
  ),

  'email-link-fallback': (options) => (
    <EmailLayout {...shell(options)} preview="Sign in to Nexus Inc">
      <EmailLinkFallback
        actionUrl="https://nexus.example/auth/magic?token=kowhai"
        brandColor={options.brandColor}
      />
    </EmailLayout>
  ),
};
