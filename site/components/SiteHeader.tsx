'use client';

import { DocsHeader, UIModeDropdown } from '@olwiba/docs';

const navItems = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/components' },
  { label: 'Hooks', href: '/docs/hooks' },
];

const uiModes = [
  { value: 'default', label: 'Default' },
  { value: 'playful', label: 'Playful' },
  { value: 'smooth', label: 'Smooth' },
];

export function SiteHeader() {
  return (
    <DocsHeader
      logo={<>olwiba<span className="text-primary">UI</span></>}
      navItems={navItems}
      githubUrl="https://github.com/olwiba/olwibaUI"
      githubBadge="soon"
      rightSlot={<UIModeDropdown modes={uiModes} />}
    />
  );
}
