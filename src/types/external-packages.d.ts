declare module '@olwiba/cn/email' {
  export const emailTheme: {
    pageBackground: string;
    cardBackground: string;
    cardBorder: string;
    mutedBackground: string;
    text: string;
    mutedText: string;
    link: string;
    buttonText: string;
    defaultBrandColor: string;
    fontFamily: string;
  };

  export type EmailTheme = typeof emailTheme;

  export function EmailRoot(props: { children?: React.ReactNode }): JSX.Element;
  export function EmailHead(props: { children?: React.ReactNode }): JSX.Element;
  export function EmailBody(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
  export function EmailPreview(props: { children?: string }): JSX.Element;
  export function EmailContainer(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
  export function EmailSection(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
  export function EmailText(props: {
    children?: React.ReactNode;
    variant?: 'default' | 'muted' | 'caption';
    style?: React.CSSProperties;
  }): JSX.Element;
  export function EmailHeading(props: { children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
  export function EmailLink(props: { href: string; children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element;
  export function EmailButton(props: { href: string; label: string; brandColor?: string }): JSX.Element;
}
