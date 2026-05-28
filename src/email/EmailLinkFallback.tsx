import { EmailLink, EmailText } from '@olwiba/cn/email';

export interface EmailLinkFallbackProps {
  actionUrl: string;
  label?: string;
  brandColor?: string;
}

export function EmailLinkFallback({
  actionUrl,
  label = 'Or copy and paste this link into your browser:',
  brandColor,
}: EmailLinkFallbackProps) {
  return (
    <>
      <EmailText variant="caption" style={{ margin: '24px 0 8px' }}>
        {label}
      </EmailText>
      <EmailText style={{ margin: 0 }}>
        <EmailLink href={actionUrl} brandColor={brandColor}>
          {actionUrl}
        </EmailLink>
      </EmailText>
    </>
  );
}
