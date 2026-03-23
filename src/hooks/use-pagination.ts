'use client';

import * as React from 'react';

export interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalPages: number;
  offset: number;
  hasPrev: boolean;
  hasNext: boolean;
  goTo: (page: number) => void;
  next: () => void;
  prev: () => void;
}

export function usePagination(total: number, pageSize: number): UsePaginationReturn {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const offset = (page - 1) * pageSize;

  const goTo = React.useCallback(
    (p: number) => setPage(Math.min(Math.max(1, p), totalPages)),
    [totalPages],
  );

  const next = React.useCallback(() => goTo(page + 1), [page, goTo]);
  const prev = React.useCallback(() => goTo(page - 1), [page, goTo]);

  return { page, pageSize, totalPages, offset, hasPrev: page > 1, hasNext: page < totalPages, goTo, next, prev };
}
