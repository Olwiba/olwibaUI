import { Suspensed, Spinner } from '@olwiba/ui';
import * as React from 'react';

const DelayedContent = React.lazy(
  () =>
    new Promise<{ default: React.FC }>((resolve) => {
      setTimeout(
        () => resolve({ default: () => <p className="text-sm text-muted-foreground">Content loaded!</p> }),
        1500
      );
    })
);

export default function SuspensedDemo() {
  const [key, setKey] = React.useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <Suspensed key={key} fallback={<Spinner size="sm" />}>
        <DelayedContent />
      </Suspensed>
      <button
        onClick={() => setKey((k) => k + 1)}
        className="text-xs text-muted-foreground underline"
      >
        Replay
      </button>
    </div>
  );
}
