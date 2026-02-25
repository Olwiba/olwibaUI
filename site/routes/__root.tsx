import { createDocsRoot, Theme } from '@olwiba/docs';
import { SiteHeader } from '~/components/SiteHeader';
import { SiteFooter } from '~/components/SiteFooter';
import appCss from '~/styles/app.css?url';

export const Route = createDocsRoot({
  meta: {
    title: 'olwibaUI - App-level Components for TanStack Start',
    description: 'Higher-level UI components and hooks built on @olwiba/cn primitives.',
  },
  header: SiteHeader,
  footer: SiteFooter,
  initialTheme: Theme.Purple,
  cssUrl: appCss,
});
