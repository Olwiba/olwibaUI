import type { ReactNode } from 'react';
import {
  EmailBody,
  EmailContainer,
  EmailHead,
  EmailPreview,
  EmailRoot,
  EmailSection,
  EmailText,
  emailTheme,
} from '@olwiba/cn/email';

export interface EmailLayoutProps {
  preview?: string;
  appName: string;
  brandColor?: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** Branded email shell — UI block composed from CN primitives. */
export function EmailLayout({
  preview,
  appName,
  brandColor = emailTheme.defaultBrandColor,
  children,
  footer,
}: EmailLayoutProps) {
  const year = new Date().getFullYear();

  return (
    <EmailRoot>
      <EmailHead />
      {preview ? <EmailPreview>{preview}</EmailPreview> : null}
      <EmailBody
        style={{
          backgroundColor: emailTheme.pageBackground,
          fontFamily: emailTheme.fontFamily,
          margin: 0,
          padding: '24px 0',
        }}
      >
        <EmailContainer
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: emailTheme.cardBackground,
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${emailTheme.cardBorder}`,
          }}
        >
          <EmailSection
            style={{
              padding: '24px 32px',
              borderBottom: `1px solid ${emailTheme.cardBorder}`,
            }}
          >
            <EmailText
              style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: 600,
                color: brandColor,
              }}
            >
              {appName}
            </EmailText>
          </EmailSection>

          <EmailSection style={{ padding: '32px' }}>{children}</EmailSection>

          {footer ?? (
            <EmailSection
              style={{
                padding: '20px 32px',
                borderTop: `1px solid ${emailTheme.cardBorder}`,
                backgroundColor: emailTheme.mutedBackground,
              }}
            >
              <EmailText
                variant="caption"
                style={{
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                © {year} {appName}. All rights reserved.
              </EmailText>
            </EmailSection>
          )}
        </EmailContainer>
      </EmailBody>
    </EmailRoot>
  );
}
