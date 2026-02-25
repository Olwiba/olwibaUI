import { OlwibaUIProvider, useOlwibaUI } from '@olwiba/ui';
import * as React from 'react';

function DeviceInfo() {
  const { isMobile } = useOlwibaUI();

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="rounded-lg bg-muted px-4 py-2 font-mono text-sm">
        isMobile = <span className="text-primary">{String(isMobile)}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        {isMobile ? 'Rendering mobile layout' : 'Rendering desktop layout'}
      </p>
    </div>
  );
}

export default function OlwibaUIContextDemo() {
  const [isMobile, setIsMobile] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <OlwibaUIProvider isMobile={isMobile}>
        <DeviceInfo />
      </OlwibaUIProvider>
      <div className="flex gap-2">
        <button
          onClick={() => setIsMobile(false)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            !isMobile
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Desktop
        </button>
        <button
          onClick={() => setIsMobile(true)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            isMobile
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Mobile
        </button>
      </div>
    </div>
  );
}
