'use client';

import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { cn } from '@olwiba/cn';
import { AppGrid, type AppGridColumns } from '../layout/AppGrid';
import { DataTable } from '../components/DataTable';
import type { ViewMode } from '../hooks/use-view-mode';

export interface DataViewProps<TData> {
  items: TData[];
  /** Stable key per item. */
  getRowId: (item: TData) => string;
  /** Card renderer for the grid view. */
  renderCard: (item: TData) => React.ReactNode;
  /** Columns for the list view. */
  columns: ColumnDef<TData>[];
  view: ViewMode;
  /**
   * False while a persisted preference is still being read. The whole view is
   * withheld until true — see the note on the component.
   */
  ready?: boolean;
  /** Grid density at the widest breakpoint. Default 3. */
  gridColumns?: AppGridColumns;
  /** Fluid grid: the narrowest a card may be. See AppGrid's `minItemWidth`. */
  gridMinItemWidth?: number | string;
  /** With `gridMinItemWidth`, the most columns at any width. */
  gridMaxColumns?: number;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * One extra card after the items in the grid view, shown only while the
   * last row has room for it: a prompt to add more, a note that more is on
   * the way. Fills the white space a short list leaves beside its cards
   * without ever starting a row of its own. Give it `h-full` to match the
   * row's height.
   */
  gridFiller?: React.ReactNode;
  /** Rendered instead of either view when there is nothing to show. */
  empty?: React.ReactNode;
  /** Shown while `ready` is false. Defaults to nothing. */
  placeholder?: React.ReactNode;
  searchKey?: string;
  searchPlaceholder?: string;
  pageSize?: number;
  emptyMessage?: string;
  onRowClick?: (row: TData) => void;
  className?: string;
}

/**
 * A collection rendered either as a grid of cards or as a table, from one set
 * of data.
 *
 * Knows nothing about what it is listing: callers supply a card renderer and
 * table columns. Cards are for "what arrived recently", the table for
 * comparing many rows at once, and switching between them should not mean two
 * page implementations that drift apart.
 *
 * The `ready` gate is the subtle part, and the reason this is a component
 * rather than a snippet to copy. A persisted preference cannot be read during
 * SSR or the first client render, so a page that renders its default
 * immediately will either mismatch on hydration or visibly flash the wrong
 * view at anyone who chose the other one. Holding the section until the
 * preference resolves avoids both, and putting that here means no consumer
 * has to work it out again.
 */
export function DataView<TData>({
  items,
  getRowId,
  renderCard,
  columns,
  view,
  ready = true,
  gridColumns = 3,
  gridMinItemWidth,
  gridMaxColumns,
  gap = 'sm',
  gridFiller,
  empty,
  placeholder = null,
  searchKey,
  searchPlaceholder,
  pageSize = 25,
  emptyMessage,
  onRowClick,
  className,
}: DataViewProps<TData>) {
  if (!ready) return <>{placeholder}</>;
  if (items.length === 0 && empty) return <>{empty}</>;

  if (view === 'list') {
    return (
      <DataTable
        columns={columns}
        data={items}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        pageSize={pageSize}
        emptyMessage={emptyMessage}
        onRowClick={onRowClick}
        className={className}
      />
    );
  }

  return (
    <AppGrid
      columns={gridColumns}
      minItemWidth={gridMinItemWidth}
      maxColumns={gridMaxColumns}
      gap={gap}
      className={cn(className)}
    >
      {items.map((item) => (
        <React.Fragment key={getRowId(item)}>{renderCard(item)}</React.Fragment>
      ))}
      {gridFiller && items.length > 0 && <GridFiller count={items.length}>{gridFiller}</GridFiller>}
    </AppGrid>
  );
}

/**
 * The filler cell, shown only when the last row of `count` items has a gap.
 *
 * A fluid grid's column count is decided by the browser from its width, so
 * the cell reads it back from the grid's computed tracks rather than being
 * told: `grid-template-columns` resolves to one length per track, filled or
 * not. Hidden until measured, so it never flashes in on a full row first.
 */
function GridFiller({ count, children }: { count: number; children: React.ReactNode }) {
  const cell = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const grid = cell.current?.parentElement;
    if (!grid) return;
    const measure = () => {
      const tracks = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
      setShow(tracks > 1 && count % tracks !== 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [count]);

  return (
    <div ref={cell} className={cn('min-w-0', !show && 'hidden')} aria-hidden={!show || undefined}>
      {children}
    </div>
  );
}
