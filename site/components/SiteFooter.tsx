import { DocsFooter } from '@olwiba/docs';

export function SiteFooter() {
  return (
    <DocsFooter
      changelogUrl="https://github.com/Olwiba/olwibaUI/blob/master/CHANGELOG.md"
      links={[
        {
          label: '🪲 Report a bug',
          href: 'https://github.com/Olwiba/olwibaUI/issues/new?template=bug_report.md',
        },
        {
          label: '✨ Feature request',
          href: 'https://github.com/Olwiba/olwibaUI/issues/new?template=feature_request.md',
        },
      ]}
    />
  );
}
