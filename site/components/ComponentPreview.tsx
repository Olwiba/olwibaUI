'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { CodeFence } from '@olwiba/docs';
import { setUsageCode, subscribeUsageCode, getUsageCode } from '~/lib/usage-code-store';

const demos: Record<string, React.LazyExoticComponent<React.FC>> = {
  'full-page-spinner': React.lazy(() => import('~/demos/full-page-spinner')),
  'page-header': React.lazy(() => import('~/demos/page-header')),
  'suspensed': React.lazy(() => import('~/demos/suspensed')),
  'theme-switch-minimal': React.lazy(() => import('~/demos/theme-switch-minimal')),
  'theme-color-updater': React.lazy(() => import('~/demos/theme-color-updater')),
  'version-banner': React.lazy(() => import('~/demos/version-banner')),
  'register-hotkeys': React.lazy(() => import('~/demos/register-hotkeys')),
  'root-error-fallback': React.lazy(() => import('~/demos/root-error-fallback')),
  'olwiba-ui-context': React.lazy(() => import('~/demos/olwiba-ui-context')),
  'empty-state': React.lazy(() => import('~/demos/empty-state')),
  'error-page': React.lazy(() => import('~/demos/error-page')),
  'auth-split-block': React.lazy(() => import('~/demos/auth-split-block')),
  'dashboard-overview-block': React.lazy(() => import('~/demos/dashboard-overview-block')),
  'dashboard-shell-block': React.lazy(() => import('~/demos/dashboard-shell-block')),
  'marketing-hero-block': React.lazy(() => import('~/demos/marketing-hero-block')),
  'application-sidebar-block': React.lazy(() => import('~/demos/application-sidebar-block')),
  'document-sidebar-block': React.lazy(() => import('~/demos/document-sidebar-block')),
  'login-block': React.lazy(() => import('~/demos/login-block')),
  'underlay': React.lazy(() => import('~/demos/underlay')),
  'overlay': React.lazy(() => import('~/demos/overlay')),
};

// Portal context — demos render <DemoControls> in their tree,
// but the DOM gets portaled below the preview area.
const ControlsPortalContext = React.createContext<HTMLDivElement | null>(null);

// Component name context — lets useUsageCode know which store key to write to.
const ComponentNameContext = React.createContext<string>('');

export function useUsageCode(code: string) {
  const name = React.useContext(ComponentNameContext);
  React.useEffect(() => {
    if (!name) return;
    setUsageCode(name, code);
    return () => setUsageCode(name, null);
  }, [name, code]);
}

export function LiveUsageCode({ name, defaultCode }: { name: string; defaultCode: string }) {
  const [code, setCode] = React.useState<string>(() => getUsageCode(name) ?? defaultCode);
  React.useEffect(() => subscribeUsageCode(name, (c) => setCode(c ?? defaultCode)), [name, defaultCode]);
  return <CodeFence code={code} language="tsx" />;
}

export function DemoControls({ children }: { children: React.ReactNode }) {
  const target = React.useContext(ControlsPortalContext);
  if (!target) return null;
  return createPortal(
    <div className="border-t border-border px-6 py-4">
      {children}
    </div>,
    target,
  );
}

interface ComponentPreviewProps {
  name: string;
  title?: string;
  noPadding?: boolean;
}

export function ComponentPreview({ name, title, noPadding }: ComponentPreviewProps) {
  const Demo = demos[name];
  const [portalTarget, setPortalTarget] = React.useState<HTMLDivElement | null>(null);

  return (
    <ControlsPortalContext.Provider value={portalTarget}>
      <ComponentNameContext.Provider value={name}>
        <div className="border border-dashed border-border rounded-lg overflow-hidden not-prose my-6">
          {title && (
            <div className="px-4 py-2 border-b border-border bg-muted/50">
              <span className="text-sm text-muted-foreground">{title}</span>
            </div>
          )}
          <div data-slot="component-preview-canvas" className={noPadding ? 'min-h-[200px]' : 'p-8 flex items-center justify-center min-h-[200px]'}>
            {Demo ? (
              <React.Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
                <Demo />
              </React.Suspense>
            ) : (
              <p className="text-muted-foreground text-sm">Demo not found: {name}</p>
            )}
          </div>
          <div ref={setPortalTarget} />
        </div>
      </ComponentNameContext.Provider>
    </ControlsPortalContext.Provider>
  );
}
