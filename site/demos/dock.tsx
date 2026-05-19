'use client';
import { Dock } from '@olwiba/ui';
import { Bell, Home, Layers, Search, Settings, User } from 'lucide-react';

const items = [
  { icon: Home, label: 'Home', onClick: () => {} },
  { icon: Search, label: 'Search', onClick: () => {} },
  { icon: Layers, label: 'Projects', onClick: () => {} },
  { icon: Bell, label: 'Notifications', onClick: () => {} },
  { icon: User, label: 'Profile', onClick: () => {} },
  { icon: Settings, label: 'Settings', onClick: () => {} },
];

export default function Demo() {
  return (
    <div className="flex min-h-64 items-end justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 pb-8">
      <Dock items={items} />
    </div>
  );
}
