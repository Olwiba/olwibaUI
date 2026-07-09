'use client';

import * as React from 'react';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, cn } from '@olwiba/cn';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  /** Shows a quick-filter input above the table, matching against `searchKey`. */
  searchKey?: string;
  searchPlaceholder?: string;
  /** Adds a checkbox column and reports the selected rows. */
  selectable?: boolean;
  onSelectionChange?: (rows: TData[]) => void;
  /** Rows per page. Set to `0` to disable pagination entirely. @default 10 */
  pageSize?: number;
  /** Slot rendered top-right of the toolbar — e.g. an "Add" button. */
  toolbar?: React.ReactNode;
  onRowClick?: (row: TData) => void;
  emptyMessage?: string;
  className?: string;
}

const selectColumn: ColumnDef<Record<string, unknown>> = {
  id: '__select',
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      onClick={(e) => e.stopPropagation()}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
};

/**
 * Sortable, paginated, optionally-selectable data table. One component —
 * toggle `searchKey`/`selectable`/`pageSize` rather than reaching for a
 * different table component per use case.
 */
export function DataTable<TData>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search…',
  selectable = false,
  onSelectionChange,
  pageSize = 10,
  toolbar,
  onRowClick,
  emptyMessage = 'No results.',
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const allColumns = React.useMemo(
    () => (selectable ? [selectColumn as ColumnDef<TData>, ...columns] : columns),
    [selectable, columns],
  );

  const table = useReactTable({
    data,
    columns: allColumns,
    state: { sorting, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      if (!searchKey) return true;
      const value = row.getValue(searchKey);
      return String(value ?? '').toLowerCase().includes(String(filterValue).toLowerCase());
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(pageSize > 0 ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    initialState: pageSize > 0 ? { pagination: { pageSize } } : undefined,
    enableRowSelection: selectable,
  });

  React.useEffect(() => {
    if (!onSelectionChange) return;
    onSelectionChange(table.getSelectedRowModel().rows.map((r) => r.original));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  const rows = table.getRowModel().rows;

  return (
    <div className={cn('space-y-4', className)}>
      {(searchKey || toolbar) && (
        <div className="flex items-center justify-between gap-4">
          {searchKey ? (
            <div className="relative max-w-sm flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-8"
              />
            </div>
          ) : <div />}
          {toolbar}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className="flex items-center gap-1.5 font-medium hover:text-foreground"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortDir === 'asc' ? <ArrowUp className="size-3.5" /> : sortDir === 'desc' ? <ArrowDown className="size-3.5" /> : <ArrowUpDown className="size-3.5 text-muted-foreground/50" />}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(onRowClick && 'cursor-pointer')}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={allColumns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageSize > 0 && table.getPageCount() > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectable && `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} selected · `}
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <ChevronLeft className="size-4" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export type { ColumnDef as DataTableColumn };
