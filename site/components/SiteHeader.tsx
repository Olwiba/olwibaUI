'use client';

import { DocsHeader } from '@olwiba/docs';

const navItems = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Hooks', href: '/docs/hooks' },
];

export function SiteHeader() {
  return (
    <DocsHeader
      logo={<>olwiba<span className="text-primary">UI</span></>}
      navItems={navItems}
      githubUrl="https://github.com/olwiba/olwibaUI"
      githubBadge="soon"
    />
  );
}
