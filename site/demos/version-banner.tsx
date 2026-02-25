import { VersionBanner } from '@olwiba/ui';
import * as React from 'react';

export default function VersionBannerDemo() {
  const [show, setShow] = React.useState(true);

  return (
    <div className="w-full max-w-lg rounded-lg border overflow-hidden">
      {show ? (
        <VersionBanner
          version="2.1.0"
          message="New components available — see what's changed."
          onDismiss={() => setShow(false)}
        />
      ) : (
        <div className="flex items-center justify-center py-4">
          <button
            onClick={() => setShow(true)}
            className="text-sm text-muted-foreground underline"
          >
            Reset demo
          </button>
        </div>
      )}
    </div>
  );
}
