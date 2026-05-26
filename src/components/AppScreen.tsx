import * as React from 'react';
import { cn } from '../lib/utils';

function AppScreenRoot({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      {children}
    </div>
  );
}

function AppScreenHeader({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2 border-b border-border px-4 py-3 shrink-0', className)}>
      {children}
    </div>
  );
}

function AppScreenBody({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex-1 overflow-auto px-4 py-3', className)}>
      {children}
    </div>
  );
}

export const AppScreen = Object.assign(AppScreenRoot, {
  Header: AppScreenHeader,
  Body: AppScreenBody,
});

export type { };
