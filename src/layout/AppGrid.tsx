import React from 'react'
import { cn } from '../lib/utils'

/**
 * Responsive ramps per column count. Every ramp starts at a single column —
 * a card grid that stays multi-column on a phone is unreadable — and adds
 * columns at breakpoints wide enough to keep each card legible.
 *
 * Written out in full rather than composed, because Tailwind scans source for
 * complete class strings; a template literal like `xl:grid-cols-${n}` produces
 * nothing at build time.
 */
const columnsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
}

const gapMap = {
  none: 'gap-0',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
}

const spanMap = {
  1: 'sm:col-span-1',
  2: 'sm:col-span-2',
  3: 'lg:col-span-3',
  4: 'xl:col-span-4',
  full: 'col-span-full',
}

export type AppGridColumns = keyof typeof columnsMap

export interface AppGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Columns at the widest breakpoint. Narrower screens step down through the
   * ramp automatically, so this is "how dense at full width", not a fixed
   * count. Default 3.
   */
  columns?: AppGridColumns
  gap?: keyof typeof gapMap
}

export function AppGrid({ columns = 3, gap = 'md', className, children, ...props }: AppGridProps) {
  return (
    <div className={cn('grid', columnsMap[columns], gapMap[gap], className)} {...props}>
      {children}
    </div>
  )
}

export interface AppGridCellProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: keyof typeof spanMap
}

export function AppGridCell({ span = 1, className, children, ...props }: AppGridCellProps) {
  return (
    <div className={cn(spanMap[span], className)} {...props}>
      {children}
    </div>
  )
}
