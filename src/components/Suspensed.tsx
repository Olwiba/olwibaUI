'use client';

import * as React from 'react';
import { Spinner } from './Spinner';

interface SuspensedProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Suspensed({ children, fallback }: SuspensedProps) {
  return (
    <React.Suspense fallback={fallback ?? <Spinner />}>
      {children}
    </React.Suspense>
  );
}
