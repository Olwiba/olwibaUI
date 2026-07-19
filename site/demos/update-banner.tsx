import { UpdateBanner } from '@olwiba/ui';
import * as React from 'react';

export default function UpdateBannerDemo() {
  const [show, setShow] = React.useState(true);

  return (
    <div className="relative min-h-[260px] overflow-hidden rounded-2xl border bg-background p-6">
      <p className="text-sm text-muted-foreground">
        The banner polls a version endpoint and slides in when the deployed version no longer matches
        the running bundle. This demo forces it visible.
      </p>
      <button
        className="mt-4 rounded-md border px-3 py-1.5 text-sm"
        onClick={() => setShow((value) => !value)}
      >
        Toggle banner
      </button>

      {/* Demo container overrides the fixed positioning context */}
      <div className="absolute inset-0 [&>div]:absolute [&>div]:top-4">
        <UpdateBanner
          forceShow={show}
          currentVersion="dev-local"
          fetchVersion={async () => ({ version: 'dev-local' })}
          onRefresh={() => setShow(false)}
        />
      </div>
    </div>
  );
}
