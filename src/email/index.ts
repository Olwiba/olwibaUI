export { ActionEmail, type ActionEmailProps } from './ActionEmail';
export { NoticeEmail, type NoticeEmailProps } from './NoticeEmail';
export { EmailLayout, type EmailLayoutProps } from './EmailLayout';
// Used internally by ActionEmail and useful on its own: any email with a button
// wants a copyable link for the clients that strip them.
export { EmailLinkFallback, type EmailLinkFallbackProps } from './EmailLinkFallback';
