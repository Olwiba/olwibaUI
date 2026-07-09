'use client';
import * as React from 'react';
import { OnboardingWizard } from '@olwiba/ui';
import { Input } from '@olwiba/cn';

export default function Demo() {
  const [workspaceName, setWorkspaceName] = React.useState('');
  const [done, setDone] = React.useState(false);

  if (done) {
    return <p className="p-8 text-center text-sm text-muted-foreground">Workspace <strong>{workspaceName || 'Untitled'}</strong> is ready.</p>;
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <OnboardingWizard
        onComplete={() => setDone(true)}
        steps={[
          {
            id: 'welcome',
            title: 'Welcome to Nexus',
            description: 'Let’s get your workspace set up in a couple of steps.',
            content: <p className="text-sm text-muted-foreground">This will only take a minute.</p>,
          },
          {
            id: 'workspace',
            title: 'Name your workspace',
            content: (
              <Input value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} placeholder="Acme Inc." />
            ),
            onNext: () => (workspaceName.trim() ? true : 'Give your workspace a name to continue.'),
          },
          {
            id: 'invite',
            title: 'Invite your team',
            description: 'Optional — you can always invite people later.',
            content: <Input placeholder="teammate@company.com" />,
          },
        ]}
      />
    </div>
  );
}
