import { RootErrorFallback } from '@olwiba/ui';
import * as React from 'react';

export default function RootErrorFallbackDemo() {
  const [triggered, setTriggered] = React.useState(false);

  const error = new Error('Something went wrong while loading the page.');

  return (
    <div className="w-full max-w-lg rounded-lg border overflow-hidden">
      {triggered ? (
        <RootErrorFallback
          error={error}
          resetErrorBoundary={() => setTriggered(false)}
        />
      ) : (
        <div className="flex items-center justify-center py-8">
          <button
            onClick={() => setTriggered(true)}
            className="rounded-md bg-destructive px-4 py-2 text-sm text-destructive-foreground"
          >
            Simulate error
          </button>
        </div>
      )}
    </div>
  );
}
