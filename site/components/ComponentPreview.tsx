'use client';

import * as React from 'react';

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
};

interface ComponentPreviewProps {
  name: string;
  title?: string;
}

export function ComponentPreview({ name, title }: ComponentPreviewProps) {
  const Demo = demos[name];

  return (
    <div className="border border-dashed border-border rounded-lg overflow-hidden not-prose my-6">
      {title && (
        <div className="px-4 py-2 border-b border-border bg-muted/50">
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
      )}
      <div className="p-8 flex items-center justify-center min-h-[200px]">
        {Demo ? (
          <React.Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
            <Demo />
          </React.Suspense>
        ) : (
          <p className="text-muted-foreground text-sm">Demo not found: {name}</p>
        )}
      </div>
    </div>
  );
}
