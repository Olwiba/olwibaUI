import { DocsFooter } from '@olwiba/docs';
// Named import so only this key is bundled, not the whole manifest.
import { version } from '../../package.json';

export function SiteFooter() {
  return (
    <DocsFooter
      versions={[
        { version, href: 'https://github.com/Olwiba/olwibaUI/blob/master/CHANGELOG.md' },
      ]}
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
