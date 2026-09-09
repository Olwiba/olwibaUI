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
        {/*
          Set through `style` rather than CN's `brandColor` prop, which this
          package's pinned @olwiba/cn does not have yet. CN applies that prop as
          `color` anyway, and `style` wins over its default, so the result is
          identical without coupling this file to a release.
        */}
        <EmailLink href={actionUrl} style={brandColor ? { color: brandColor } : undefined}>
          {actionUrl}
        </EmailLink>
      </EmailText>
    </>
  );
}
