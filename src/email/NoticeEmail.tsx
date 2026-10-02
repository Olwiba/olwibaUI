import type { ReactNode } from 'react';
import { EmailHeading, emailTheme } from '@olwiba/cn/email';
import { EmailLayout } from './EmailLayout';
import { EmailParagraphs } from './EmailParagraphs';

export interface NoticeEmailProps {
  appName: string;
  preview: string;
  heading: string;
  /** Plain text; a blank line starts a new paragraph. */
  body: string;
  brandColor?: string;
  /** Header logo; see EmailLayout. */
  logoUrl?: string;
  /** Dark-mode header logo; see EmailLayout. */
  logoDarkUrl?: string;
  /** Header logo position; see EmailLayout. */
  logoAlign?: 'left' | 'center';
  /** Microtext under the card; see EmailLayout. */
  footnote?: ReactNode;
  /** Follow the reader's client (`light dark`) or pin to light; see EmailLayout. */
  colorScheme?: 'light dark' | 'light';
}

export function NoticeEmail({
  appName,
  preview,
  heading,
  body,
  brandColor = emailTheme.defaultBrandColor,
  logoUrl,
  logoDarkUrl,
  logoAlign,
  footnote,
  colorScheme,
}: NoticeEmailProps) {
  return (
    <EmailLayout
      preview={preview}
      appName={appName}
      brandColor={brandColor}
      logoUrl={logoUrl}
      logoDarkUrl={logoDarkUrl}
      logoAlign={logoAlign}
      footnote={footnote}
      colorScheme={colorScheme}
    >
      <EmailHeading>{heading}</EmailHeading>
      <EmailParagraphs text={body} />
    </EmailLayout>
  );
}
