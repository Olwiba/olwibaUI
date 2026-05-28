import {
  EmailHeading,
  EmailText,
  emailTheme,
} from '@olwiba/cn/email';
import { EmailLayout } from './EmailLayout';

export interface NoticeEmailProps {
  appName: string;
  preview: string;
  heading: string;
  body: string;
  brandColor?: string;
}

export function NoticeEmail({
  appName,
  preview,
  heading,
  body,
  brandColor = emailTheme.defaultBrandColor,
}: NoticeEmailProps) {
  return (
    <EmailLayout preview={preview} appName={appName} brandColor={brandColor}>
      <EmailHeading>{heading}</EmailHeading>
      <EmailText variant="muted" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        {body}
      </EmailText>
    </EmailLayout>
  );
}
