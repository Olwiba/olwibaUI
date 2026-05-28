import {
  EmailButton,
  EmailHeading,
  EmailText,
  emailTheme,
} from '@olwiba/cn/email';
import { EmailLayout } from './EmailLayout';
import { EmailLinkFallback } from './EmailLinkFallback';

export interface ActionEmailProps {
  appName: string;
  preview: string;
  heading: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
  brandColor?: string;
  showLinkFallback?: boolean;
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
}: ActionEmailProps) {
  return (
    <EmailLayout preview={preview} appName={appName} brandColor={brandColor}>
      <EmailHeading>{heading}</EmailHeading>
      <EmailText variant="muted" style={{ margin: '0 0 24px' }}>
        {description}
      </EmailText>
      <EmailButton href={actionUrl} label={actionLabel} brandColor={brandColor} />
      {showLinkFallback ? (
        <EmailLinkFallback actionUrl={actionUrl} brandColor={brandColor} />
      ) : null}
    </EmailLayout>
  );
}
