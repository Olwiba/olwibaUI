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
  /**
   * Show at most this many rows, whatever the column count: pass enough
   * children for the widest layout and the rest are hidden. For skeletons,
   * which should fill the same rows at every width. Fluid grids only (a
   * numeric `minItemWidth` and a `maxColumns`).
   */
  maxRows?: number
  /**
   * Hide a trailing partial row, so the grid always ends flush. For a feed
   * that is still loading pages: the held-back items appear once the next
   * page completes their row. Turn it off for the last page, or the final
   * items never show. Fluid grids only, as `maxRows`.
   */
  completeRows?: boolean
}

/** `gapMap` as pixels, for the container-query thresholds. */
const gapPixels = { none: 0, sm: 12, md: 16, lg: 24 }

/**
 * Container queries hiding children past what the rows allow, one rule per
 * column count the fluid track can produce.
 *
 * CSS rather than a measured column count, so the right number shows on the
 * first paint, server render included, and stays right through a resize. The
 * thresholds are the track's own arithmetic: `c` columns fit once the grid is
 * `c * min + (c - 1) * gap` wide, and `maxColumns` caps it.
 */
export function rowLimitCss(
  scope: string,
  { min, gap, maxColumns, count, maxRows, completeRows }: {
    min: number
    gap: number
    maxColumns: number
    count: number
    maxRows?: number
    completeRows?: boolean
  },
) {
  const rules: string[] = []
  for (let columns = 1; columns <= maxColumns; columns++) {
    let visible = count
    // Fewer items than one row is a short list, not a partial row.
    if (completeRows && count >= columns) visible = Math.floor(count / columns) * columns
    if (maxRows) visible = Math.min(visible, maxRows * columns)
    if (visible >= count) continue

    const from = columns === 1 ? null : columns * min + (columns - 1) * gap
    const to = columns === maxColumns ? null : (columns + 1) * min + columns * gap - 0.02
    const query = [from !== null && `(min-width: ${from}px)`, to !== null && `(max-width: ${to}px)`]
      .filter(Boolean)
      .join(' and ')
    const rule = `.${scope} > :nth-child(n + ${visible + 1}) { display: none; }`
    rules.push(query ? `@container ${query} { ${rule} }` : rule)
  }
  return rules.join('\n')
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
  maxRows,
  completeRows,
  className,
  style,
  children,
  ...props
}: AppGridProps) {
  const fluid = minItemWidth !== undefined
  const scope = `app-grid-${React.useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const rowCss =
    (maxRows || completeRows) && typeof minItemWidth === 'number' && maxColumns
      ? rowLimitCss(scope, {
          min: minItemWidth,
          gap: gapPixels[gap],
          maxColumns,
          count: React.Children.toArray(children).length,
          maxRows,
          completeRows,
        })
      : ''
  const grid = (
    <div
      className={cn('grid', !fluid && columnsMap[columns], gapMap[gap], rowCss && scope, className)}
      style={
        fluid
          ? {
              gridTemplateColumns: fluidColumns(minItemWidth, maxColumns, gapValues[gap]),
              // The rules above query the grid's own width.
              ...(rowCss ? { containerType: 'inline-size' } : {}),
              ...style,
            }
          : style
      }
      {...props}
    >
      {children}
    </div>
  )
  if (!rowCss) return grid
  return (
    <>
      {/* A sibling, not a child: inside the grid it would count in nth-child. */}
      <style>{rowCss}</style>
      {grid}
    </>
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
