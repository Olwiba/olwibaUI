import { EmailLink, EmailSection, EmailText, emailClass, emailTheme } from '@olwiba/cn/email';

export interface EmailItem {
  title: string;
  /** Where the title links to. Without it the title is plain text. */
  href?: string;
  /** One short line under the title: a price, a date, a status. */
  meta?: string;
}

export interface EmailItemListProps {
  items: EmailItem[];
  /** Show at most this many; the rest are summarised in a closing line. @default 5 */
  max?: number;
  /** The closing line for the rest, given how many were left out. */
  moreLabel?: (remaining: number) => string;
  brandColor?: string;
}

/**
 * A short list of linked rows for a digest: new listings, recent activity,
 * the items a notification is about.
 *
 * Deliberately plain: a title and one line of detail per row, separated by a
 * hairline, no images and no columns. That is what renders the same in every
 * client and on a phone, and a digest that needs more than this wants a link
 * to the product, not a bigger email.
 */
export function EmailItemList({
  items,
  max = 5,
  moreLabel = (remaining) => `And ${remaining} more`,
  brandColor = emailTheme.defaultBrandColor,
}: EmailItemListProps) {
  const shown = items.slice(0, max);
  const remaining = items.length - shown.length;

  return (
    <EmailSection style={{ margin: '0 0 24px' }}>
      {shown.map((item, index) => (
        <EmailSection
          key={index}
          className={index === 0 ? undefined : emailClass.border}
          style={{
            padding: '12px 0',
            borderTop: index === 0 ? undefined : `1px solid ${emailTheme.cardBorder}`,
          }}
        >
          <EmailText style={{ margin: 0, fontWeight: 600 }}>
            {item.href ? (
              <EmailLink
                href={item.href}
                style={{ color: brandColor, textDecoration: 'none', wordBreak: 'normal' }}
              >
                {item.title}
              </EmailLink>
            ) : (
              item.title
            )}
          </EmailText>
          {item.meta ? (
            <EmailText variant="caption" style={{ margin: '2px 0 0' }}>
              {item.meta}
            </EmailText>
          ) : null}
        </EmailSection>
      ))}
      {remaining > 0 ? (
        <EmailText
          variant="caption"
          className={emailClass.border}
          style={{
            margin: 0,
            paddingTop: '12px',
            borderTop: `1px solid ${emailTheme.cardBorder}`,
          }}
        >
          {moreLabel(remaining)}
        </EmailText>
      ) : null}
    </EmailSection>
  );
}
