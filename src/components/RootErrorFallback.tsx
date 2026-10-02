'use client';

import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@olwiba/cn';

interface RootErrorFallbackProps {
  error: unknown;
  reset?: () => void;
  resetErrorBoundary?: () => void;
}

export function RootErrorFallback({ error, reset, resetErrorBoundary }: RootErrorFallbackProps) {
  const message =
    error instanceof Error
      ? error.message
        : typeof error === 'string'
        ? error
        : 'An unexpected error occurred.';
  const handleReset = reset ?? resetErrorBoundary;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <AlertTriangle className="size-12 text-destructive" />
        <h2 className="text-xl font-semibold">Something went wrong</h2>
        <p className="max-w-md text-sm text-muted-foreground">{message}</p>
      </div>
      <Button disabled={!handleReset} onClick={handleReset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
