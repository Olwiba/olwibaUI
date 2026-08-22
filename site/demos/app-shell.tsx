'use client';

import { AppShell } from '@olwiba/ui';
import { LayoutDashboard, Users, FileText, Settings, Plus } from 'lucide-react';
import { demoBrandLogo, demoBrandName } from '~/lib/demo-brand';

export default function AppShellDemo() {
  return (
    <AppShell
      sidebarPosition="contained"
      // Same lockup as the Navbar demo, from one definition — the point of
      // showing it in both is that they agree. Lowercase on purpose: a name
      // with no caps and no descenders is the least forgiving case for the
      // brand text's vertical alignment against the badge beside it.
      brand={{ name: demoBrandName, logo: demoBrandLogo, href: '#' }}
      navItems={[
        { icon: LayoutDashboard, label: 'Dashboard', href: '#', isActive: true },
        { icon: Users, label: 'Team', href: '#' },
        { icon: FileText, label: 'Documents', href: '#' },
        { icon: Settings, label: 'Settings', href: '#' },
      ]}
      action={{ icon: Plus, label: 'New project', href: '#' }}
      user={{
        name: 'Ollie Bannister',
        email: 'ollie@nexus.dev',
        plan: 'pro',
        onSignOut: () => {},
        onBilling: () => {},
      }}
      pageTitle="Dashboard"
    >
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid grid-cols-3 gap-4">
          {['Revenue', 'Users', 'Active'].map((label) => (
            <div key={label} className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-2xl font-semibold">—</p>
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-lg border bg-card p-4">
          <p className="text-sm text-muted-foreground">Page content goes here.</p>
        </div>
      </div>
    </AppShell>
  );
}
