import { Fragment } from 'react';
import { EmailText, type EmailTextProps } from '@olwiba/cn/email';

export interface EmailParagraphsProps {
  /** Plain text. A blank line starts a new paragraph; a single newline is a line break. */
  text: string;
  variant?: EmailTextProps['variant'];
  /** Space after each paragraph but the last. @default '0 0 16px' */
  gap?: string;
  /** Space after the last paragraph, before whatever follows. @default '0' */
  trailingGap?: string;
}

/**
 * Plain text as email paragraphs.
 *
 * Email HTML collapses newlines like any other HTML, so copy written as
 * "First line.\n\nSecond line." arrived as one run-on paragraph. `white-space:
 * pre-wrap` would preserve them in a browser, but Outlook ignores it; separate
 * paragraphs and `<br>` elements survive every client.
 */
export function EmailParagraphs({
  text,
  variant = 'muted',
  gap = '0 0 16px',
  trailingGap = '0',
}: EmailParagraphsProps) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <EmailText
          key={index}
          variant={variant}
          style={{ margin: index === paragraphs.length - 1 ? trailingGap : gap }}
        >
          {paragraph.split('\n').map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {lineIndex > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </EmailText>
      ))}
    </>
  );
}
