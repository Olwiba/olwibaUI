'use client';
import { notify } from '@olwiba/ui';
import { Button, Toaster } from '@olwiba/cn';

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-8">
      <Button
        variant="outline"
        onClick={() => notify({ variant: 'success', title: 'Deploy complete', description: 'nexus-genesis is live on production.' })}
      >
        Success toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          notify({
            variant: 'message',
            title: 'New comment',
            description: 'Left a note on your latest deploy.',
            action: { label: 'Reply', onClick: () => {} },
          })
        }
      >
        Message toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          notify({
            variant: 'info',
            title: 'Build queued',
            description: 'Your project will start building shortly.',
            action: { label: 'Undo', onClick: () => {} },
            secondaryAction: { label: 'Dismiss', onClick: () => {} },
          })
        }
      >
        Action toast
      </Button>
      <Toaster />
    </div>
  );
}
