'use client';
import * as React from 'react';
import { NotificationsPopover, type NotificationItem } from '@olwiba/ui';
import { GitPullRequest, Rocket, UserPlus } from 'lucide-react';

const initial: NotificationItem[] = [
  { id: '1', title: 'Deploy complete', description: 'v0.1.16 is live on production.', timestamp: '2m ago', icon: <Rocket className="size-4" /> },
  { id: '2', title: 'Ana Sousa requested a review', description: 'feat: billing usage alerts (#482)', timestamp: '1h ago', avatar: 'https://ui.shadcn.com/avatars/01.png' },
  { id: '3', title: 'New team member', description: 'Marcus Webb accepted your invite.', timestamp: 'Yesterday', icon: <UserPlus className="size-4" />, read: true },
  { id: '4', title: 'PR merged', description: 'fix: onboarding wizard pending state (#479)', timestamp: '2d ago', icon: <GitPullRequest className="size-4" />, read: true },
];

export default function Demo() {
  const [notifications, setNotifications] = React.useState(initial);

  return (
    <div className="flex min-h-[420px] items-start justify-end p-8">
      <NotificationsPopover
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onNotificationClick={(clicked) =>
          setNotifications((prev) => prev.map((n) => (n.id === clicked.id ? { ...n, read: true } : n)))
        }
      />
    </div>
  );
}
