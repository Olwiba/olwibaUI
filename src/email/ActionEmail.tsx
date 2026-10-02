import type { ReactNode } from 'react';
import { EmailButton, EmailHeading, emailTheme } from '@olwiba/cn/email';
import { EmailItemList, type EmailItem } from './EmailItemList';
import { EmailLayout } from './EmailLayout';
import { EmailLinkFallback } from './EmailLinkFallback';
import { EmailParagraphs } from './EmailParagraphs';

export interface ActionEmailProps {
  appName: string;
  preview: string;
  heading: string;
  /** Plain text; a blank line starts a new paragraph. */
  description: string;
  actionLabel: string;
  actionUrl: string;
  brandColor?: string;
  showLinkFallback?: boolean;
  /** Rows shown between the description and the button, for a digest. */
  items?: EmailItem[];
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

export function ActionEmail({
  appName,
  preview,
  heading,
  description,
  actionLabel,
  actionUrl,
  brandColor = emailTheme.defaultBrandColor,
  showLinkFallback = true,
  items,
  logoUrl,
  logoDarkUrl,
  logoAlign,
  footnote,
  colorScheme,
}: ActionEmailProps) {
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
      <EmailParagraphs text={description} trailingGap="0 0 24px" />
      {items && items.length > 0 ? <EmailItemList items={items} brandColor={brandColor} /> : null}
      <EmailButton href={actionUrl} label={actionLabel} brandColor={brandColor} />
      {showLinkFallback ? (
        <EmailLinkFallback actionUrl={actionUrl} brandColor={brandColor} />
      ) : null}
    </EmailLayout>
  );
}
