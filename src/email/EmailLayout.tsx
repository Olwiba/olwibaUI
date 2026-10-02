import type { CSSProperties, ReactNode } from 'react';
import {
  EmailBody,
  EmailColumn,
  EmailContainer,
  EmailHead,
  EmailImage,
  EmailPreview,
  EmailRoot,
  EmailRow,
  EmailSection,
  EmailText,
  emailClass,
  emailTheme,
} from '@olwiba/cn/email';

export interface EmailLayoutProps {
  preview?: string;
  appName: string;
  brandColor?: string;
  /**
   * Absolute https URL of a square logo (PNG, JPEG or GIF; not SVG, which Gmail
   * and Outlook do not render). Shown beside the app name in the header.
   */
  logoUrl?: string;
  /**
   * A version of the logo for dark mode, for a `logoUrl` that only works on
   * white. Swapped in by clients that switch to dark; everywhere else the
   * light one shows.
   */
  logoDarkUrl?: string;
  /** Rendered size of the logo in pixels. @default 28 */
  logoSize?: number;
  /** Where the logo and name sit in the header. The message stays left-aligned. @default 'left' */
  logoAlign?: 'left' | 'center';
  children: ReactNode;
  footer?: ReactNode;
  /**
   * Microtext under the card, in the grey margin. For the line a recipient
   * expects at the foot of an email ("You're getting this because..."), and it
   * gives anything a delivery provider appends below the message (Plunk's free
   * tier adds a "Send emails with Plunk" badge) a footer to sit in.
   */
  footnote?: ReactNode;
  /**
   * `light dark` follows the reader's mail client; `light` pins the message to
   * light. @default 'light dark'
   */
  colorScheme?: 'light dark' | 'light';
}

/** Side padding of the card. Narrows to 24px on a phone through `emailClass.gutter`. */
const GUTTER = 40;

const logoStyle: CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'middle',
  borderRadius: '6px',
  marginRight: '10px',
};

/**
 * Branded email shell — UI block composed from CN primitives.
 *
 * A flat card on a grey page: logo and name, a hairline with a short stroke of
 * the brand colour under it, the message, and a quiet footer. Colours are
 * inlined light and switch to dark through the classes CN's stylesheet
 * targets, so the reader's client decides the theme.
 */
export function EmailLayout({
  preview,
  appName,
  brandColor = emailTheme.defaultBrandColor,
  logoUrl,
  logoDarkUrl,
  logoSize = 28,
  logoAlign = 'left',
  children,
  footer,
  footnote,
  colorScheme = 'light dark',
}: EmailLayoutProps) {
  const year = new Date().getFullYear();
  // A message pinned to light never switches, so it never needs the dark logo.
  const darkLogoUrl = colorScheme === 'light dark' ? logoDarkUrl : undefined;
  const centered = logoAlign === 'center';

  return (
    <EmailRoot>
      <EmailHead colorScheme={colorScheme} />
      {preview ? <EmailPreview>{preview}</EmailPreview> : null}
      <EmailBody
        style={{
          backgroundColor: emailTheme.pageBackground,
          fontFamily: emailTheme.fontFamily,
          margin: 0,
          // Side padding so the card never meets the screen edge on a phone.
          padding: '32px 12px',
        }}
      >
        <EmailContainer
          className={`${emailClass.card} ${emailClass.border}`}
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: emailTheme.cardBackground,
            border: `1px solid ${emailTheme.cardBorder}`,
          }}
        >
          {/*
            Header and divider are one row, so the brand stroke is exactly as
            wide as the logo and name above it: the middle cell is sized to its
            content, the cells either side take the rest of the card, and the
            cells' bottom borders together draw the divider. No text measuring,
            which email could not do anyway. Left-aligned, the first cell is a
            gutter-wide spacer; centred, both sides are fillers at half each.
          */}
          <EmailSection>
            <EmailRow>
              <EmailColumn
                className={
                  centered ? emailClass.border : `${emailClass.gutterCell} ${emailClass.border}`
                }
                style={{
                  width: centered ? '50%' : `${GUTTER}px`,
                  borderBottom: `1px solid ${emailTheme.cardBorder}`,
                  fontSize: 0,
                  lineHeight: 0,
                }}
              />
              <EmailColumn
                style={{
                  // The email way to size a cell to its content: ask for 1px and
                  // forbid wrapping, so it grows to exactly the logo and name.
                  // A width on the filler instead squeezed the gutter cell to 0.
                  width: '1px',
                  whiteSpace: 'nowrap',
                  padding: '28px 0 20px',
                  borderBottom: `2px solid ${brandColor}`,
                }}
              >
                {/*
                  The name is live text even with a logo. Outlook and some
                  corporate clients block images until the reader allows them,
                  so an image-only header would arrive as an empty box with alt
                  text; this way the brand is always there and the logo adds to it.
                */}
                <EmailText
                  style={{
                    margin: 0,
                    fontSize: '16px',
                    lineHeight: `${Math.max(logoSize, 24)}px`,
                    fontWeight: 600,
                  }}
                >
                  {logoUrl ? (
                    <>
                      <EmailImage
                        src={logoUrl}
                        alt=""
                        width={logoSize}
                        height={logoSize}
                        className={darkLogoUrl ? emailClass.lightOnly : undefined}
                        style={logoStyle}
                      />
                      {darkLogoUrl ? (
                        <EmailImage
                          src={darkLogoUrl}
                          alt=""
                          width={logoSize}
                          height={logoSize}
                          className={emailClass.darkOnly}
                          style={{ ...logoStyle, display: 'none', maxHeight: 0, overflow: 'hidden' }}
                        />
                      ) : null}
                      <span style={{ verticalAlign: 'middle' }}>{appName}</span>
                    </>
                  ) : (
                    appName
                  )}
                </EmailText>
              </EmailColumn>
              <EmailColumn
                className={emailClass.border}
                style={{
                  width: centered ? '50%' : undefined,
                  borderBottom: `1px solid ${emailTheme.cardBorder}`,
                  fontSize: 0,
                  lineHeight: 0,
                }}
              />
            </EmailRow>
          </EmailSection>

          <EmailSection className={emailClass.gutter} style={{ padding: `40px ${GUTTER}px 44px` }}>
            {children}
          </EmailSection>

          {footer ?? (
            <EmailSection
              className={`${emailClass.gutter} ${emailClass.border}`}
              style={{
                padding: `22px ${GUTTER}px`,
                borderTop: `1px solid ${emailTheme.cardBorder}`,
              }}
            >
              <EmailText variant="caption" style={{ margin: 0 }}>
                © {year} {appName}. All rights reserved.
              </EmailText>
            </EmailSection>
          )}
        </EmailContainer>

        {footnote ? (
          <EmailContainer style={{ maxWidth: '560px', margin: '0 auto' }}>
            <EmailSection className={emailClass.gutter} style={{ padding: `20px ${GUTTER}px 0` }}>
              <EmailText
                variant="caption"
                style={{ margin: 0, textAlign: 'center', fontSize: '12px', lineHeight: '18px' }}
              >
                {footnote}
              </EmailText>
            </EmailSection>
          </EmailContainer>
        ) : null}
      </EmailBody>
    </EmailRoot>
  );
}
