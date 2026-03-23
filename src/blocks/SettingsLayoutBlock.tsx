'use client';

import * as React from 'react';
import { Bell, CreditCard, KeyRound, LayoutGrid, Palette, Shield, User } from 'lucide-react';
import { Badge, Button, cn, Input, Label, Separator, Switch } from '@olwiba/cn';

const navItems = [
  { id: 'profile', label: 'Profile', Icon: User },
  { id: 'appearance', label: 'Appearance', Icon: Palette },
  { id: 'notifications', label: 'Notifications', Icon: Bell },
  { id: 'security', label: 'Security', Icon: Shield },
  { id: 'integrations', label: 'Integrations', Icon: LayoutGrid },
  { id: 'billing', label: 'Billing', Icon: CreditCard },
  { id: 'api', label: 'API keys', Icon: KeyRound },
];

function ProfilePanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">Manage your personal information and public profile.</p>
      </div>
      <Separator />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" defaultValue="Olivia" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" defaultValue="Reed" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="olivia@olwiba.com" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" placeholder="A short bio visible on your public profile" />
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Choose when and how you want to be notified.</p>
      </div>
      <Separator />
      <div className="space-y-4">
        {[
          { label: 'New comments', description: 'When someone comments on your work' },
          { label: 'Mentions', description: 'When you are mentioned in a comment or document' },
          { label: 'Team updates', description: 'Changes to workspace membership or roles' },
          { label: 'Product announcements', description: 'New features and release notes from Olwiba' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl border p-4">
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.description}</div>
            </div>
            <Switch defaultChecked={item.label !== 'Product announcements'} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderPanel({ id }: { id: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold capitalize">{id}</h2>
        <p className="text-sm text-muted-foreground">Settings for {id}.</p>
      </div>
      <Separator />
      <div className="rounded-xl border border-dashed bg-muted/40 p-8 text-center text-sm text-muted-foreground">
        {id} panel content goes here
      </div>
    </div>
  );
}

export function SettingsLayoutBlock() {
  const [active, setActive] = React.useState('profile');

  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h1 className="font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account and workspace preferences</p>
        </div>
        <Badge variant="secondary">Workspace</Badge>
      </div>

      <div className="grid min-h-[560px] lg:grid-cols-[220px_1fr]">
        {/* Sidebar nav */}
        <nav className="space-y-1 border-b p-4 lg:border-b-0 lg:border-r">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                active === id
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <div className="p-6 lg:p-8">
          {active === 'profile' && <ProfilePanel />}
          {active === 'notifications' && <NotificationsPanel />}
          {active !== 'profile' && active !== 'notifications' && <PlaceholderPanel id={active} />}
        </div>
      </div>
    </section>
  );
}
