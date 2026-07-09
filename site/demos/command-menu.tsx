'use client';
import * as React from 'react';
import { CommandMenu } from '@olwiba/ui';
import { Button } from '@olwiba/cn';
import { CreditCard, LayoutDashboard, Settings, UserPlus } from 'lucide-react';

export default function Demo() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Search… <span className="ml-2 text-xs text-muted-foreground">⌘K</span>
      </Button>
      {selected && <p className="text-sm text-muted-foreground">Selected: <strong>{selected}</strong></p>}
      <CommandMenu
        open={open}
        onOpenChange={setOpen}
        groups={[
          {
            heading: 'Navigate',
            items: [
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, onSelect: () => setSelected('Dashboard') },
              { id: 'billing', label: 'Billing', icon: CreditCard, onSelect: () => setSelected('Billing') },
              { id: 'settings', label: 'Settings', icon: Settings, onSelect: () => setSelected('Settings') },
            ],
          },
          {
            heading: 'Actions',
            items: [
              { id: 'invite', label: 'Invite teammate', icon: UserPlus, shortcut: '⌘I', onSelect: () => setSelected('Invite teammate') },
            ],
          },
        ]}
      />
    </div>
  );
}
