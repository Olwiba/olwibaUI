'use client';
import { ActivityFeed } from '@olwiba/ui';
import { CreditCard, GitCommit, Rocket } from 'lucide-react';

export default function Demo() {
  return (
    <div className="mx-auto max-w-md p-8">
      <ActivityFeed
        items={[
          {
            id: '1',
            title: <><span className="font-medium">Ana Sousa</span> deployed to production</>,
            description: 'v0.1.16 · 12 commits',
            timestamp: '2h ago',
            avatar: 'https://ui.shadcn.com/avatars/01.png',
            initials: 'AS',
          },
          {
            id: '2',
            title: <><span className="font-medium">Marcus Webb</span> pushed 3 commits</>,
            description: 'feat: billing usage alerts',
            timestamp: '5h ago',
            icon: <GitCommit />,
          },
          {
            id: '3',
            title: 'Subscription renewed',
            description: 'Pro plan · $29/month',
            timestamp: 'Yesterday',
            icon: <CreditCard />,
          },
          {
            id: '4',
            title: 'Project created',
            timestamp: 'Mar 2',
            icon: <Rocket />,
          },
        ]}
      />
    </div>
  );
}
