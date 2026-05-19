'use client';
import * as React from 'react';
import { Spotlight } from '@olwiba/ui';
import { FileText, LayoutDashboard, Settings, Users } from 'lucide-react';

const groups = [
  {
    heading: 'Pages',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="size-4" />, onSelect: () => {} },
      { id: 'team', label: 'Team', icon: <Users className="size-4" />, onSelect: () => {} },
      { id: 'docs', label: 'Documents', icon: <FileText className="size-4" />, onSelect: () => {} },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { id: 'settings', label: 'Settings', icon: <Settings className="size-4" />, description: 'Manage your account', onSelect: () => {} },
    ],
  },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Spotlight groups={groups} placeholder="Search pages..." />
    </div>
  );
}
