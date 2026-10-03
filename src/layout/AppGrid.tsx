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

/** The same gaps as lengths, for the fluid track arithmetic. */
const gapValues = {
  none: '0px',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
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
  /**
   * Switches to a fluid grid: as many columns as fit at this width, each
   * stretching to fill the row, so a wide screen gets more cards rather than
   * wider ones. A number is pixels. Overrides `columns`.
   */
  minItemWidth?: number | string
  /**
   * With `minItemWidth`, the most columns the grid will make however wide it
   * gets. Past it the cards widen instead.
   */
  maxColumns?: number
}

/**
 * The fluid track: `auto-fill` makes as many columns as the minimum allows and
 * `1fr` stretches them to fill the row exactly. Raising the minimum to a
 * fraction of the row (net of gaps) is what caps the count; the 0.1px stops
 * rounding from losing the last column. `min(100%, …)` keeps a single card
 * from overflowing a container narrower than the minimum.
 */
function fluidColumns(minItemWidth: number | string, maxColumns: number | undefined, gap: string) {
  const min = typeof minItemWidth === 'number' ? `${minItemWidth}px` : minItemWidth
  const track = maxColumns
    ? `max(${min}, calc((100% - ${maxColumns - 1} * ${gap}) / ${maxColumns} - 0.1px))`
    : min
  return `repeat(auto-fill, minmax(min(100%, ${track}), 1fr))`
}

export function AppGrid({
  columns = 3,
  gap = 'md',
  minItemWidth,
  maxColumns,
  className,
  style,
  children,
  ...props
}: AppGridProps) {
  const fluid = minItemWidth !== undefined
  return (
    <div
      className={cn('grid', !fluid && columnsMap[columns], gapMap[gap], className)}
      style={
        fluid
          ? { gridTemplateColumns: fluidColumns(minItemWidth, maxColumns, gapValues[gap]), ...style }
          : style
      }
      {...props}
    >
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
