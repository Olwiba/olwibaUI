import type { ReactElement } from 'react';
import {
  ActionEmail,
  EmailLayout,
  EmailLinkFallback,
  NoticeEmail,
} from '@olwiba/ui/email';

/**
 * The examples shown on the email documentation pages.
 *
 * Kept in one module because they are rendered twice from different runtimes:
 * `scripts/generate-email-previews.ts` renders them to HTML in Node, and the
 * pages display that HTML. Defining them beside the demo that shows them would
 * mean the generator importing a component that renders an iframe of itself.
 *
 * Emails cannot be previewed the way other blocks are. `EmailLayout` renders
 * `<html>`, `<head>` and `<body>`, so mounting one inside the sandbox's iframe
 * root nests a document inside a `div` — React tolerates it on the server and
 * hydration dies on the client. Rendering to HTML sidesteps that and is more
 * honest anyway: the page shows the markup that actually gets sent.
 */
export const emailExamples: Record<string, ReactElement> = {
  'action-email': (
    <ActionEmail
      appName="Nexus Inc"
      preview="Sign in to Nexus Inc"
      heading="Sign in with one click"
      description="You asked to sign in to Nexus Inc. This link expires in 15 minutes and can only be used once."
      actionLabel="Sign in"
      actionUrl="https://nexus.example/auth/magic?token=kowhai"
    />
  ),

  'notice-email': (
    <NoticeEmail
      appName="Nexus Inc"
      preview="Your export is ready"
      heading="Your export is ready"
      body="The Pōhutukawa workspace export you requested has finished. It stays available for seven days, then it is deleted."
    />
  ),

  'email-layout': (
    <EmailLayout appName="Nexus Inc" preview="A message from Nexus Inc">
      <EmailLinkFallback
        actionUrl="https://nexus.example/workspaces/paua"
        label="Everything inside the shell is yours. This is one block placed in it:"
      />
    </EmailLayout>
  ),

  'email-link-fallback': (
    <EmailLayout appName="Nexus Inc" preview="Sign in to Nexus Inc">
      <EmailLinkFallback actionUrl="https://nexus.example/auth/magic?token=kowhai" />
    </EmailLayout>
  ),
};
