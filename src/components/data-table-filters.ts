import type * as React from 'react';
import type { ColumnDef, FilterFn, RowData } from '@tanstack/react-table';
import type { FilterField, FilterOperator, FilterOption, FilterValue } from './FilterBar';

/**
 * Filtering declared on the columns.
 *
 * A `DataTable` column says how it filters in `meta.filter`, the same way it
 * already says how it sorts and renders. The table turns those declarations
 * into the FilterBar's fields and filters its rows with them, so a caller
 * writes no matching code: the kind decides the conditions, the value input
 * and what "matches" means.
 */
export type ColumnFilterKind = 'enum' | 'text' | 'number' | 'date' | 'boolean';

export interface ColumnFilterSchema {
  kind: ColumnFilterKind;
  /** Shown in the bar. Defaults to the column's header when that is a string, then its id. */
  label?: string;
  icon?: React.ReactNode;
  /**
   * `enum` values. Plain strings label themselves. Omit to offer the distinct
   * values found in the table's data.
   */
  options?: Array<string | FilterOption>;
  /** `enum` values fetched as the user types, for sets too large to list. */
  loadOptions?: FilterField['loadOptions'];
}

declare module '@tanstack/react-table' {
  // Merged into TanStack's own interface, so `meta.filter` is typed on every ColumnDef.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filter?: ColumnFilterSchema;
  }
}

const DAY = 24 * 60 * 60 * 1000;

/** Rolling windows for dates, recomputed from "now" on every match. */
const DATE_WINDOWS: Array<FilterOption & { days: number }> = [
  { value: '1d', label: 'the last 24 hours', days: 1 },
  { value: '7d', label: 'the last 7 days', days: 7 },
  { value: '30d', label: 'the last 30 days', days: 30 },
  { value: '90d', label: 'the last 90 days', days: 90 },
  { value: '365d', label: 'the last 12 months', days: 365 },
];

export const COLUMN_FILTER_OPERATORS: Record<ColumnFilterKind, FilterOperator[]> = {
  enum: [
    { id: 'is', label: 'is', multiple: true },
    { id: 'is_not', label: 'is not', multiple: true },
  ],
  text: [
    { id: 'contains', label: 'contains', freeText: true },
    { id: 'does_not_contain', label: 'does not contain', freeText: true },
    { id: 'equals', label: 'is exactly', freeText: true },
  ],
  number: [
    { id: 'eq', label: '=', freeText: true },
    { id: 'gt', label: '>', freeText: true },
    { id: 'lt', label: '<', freeText: true },
  ],
  date: [
    { id: 'within', label: 'is within', options: DATE_WINDOWS.map(({ value, label }) => ({ value, label })) },
    { id: 'after', label: 'is after', freeText: true },
    { id: 'before', label: 'is before', freeText: true },
  ],
  boolean: [
    {
      id: 'is',
      label: 'is',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
  ],
};

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value !== 'string' && typeof value !== 'number') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Whether one cell satisfies one condition. Several `values` read as "any of". */
export function matchesColumnFilter(
  kind: ColumnFilterKind,
  cell: unknown,
  operator: string,
  values: FilterOption[],
  now: Date = new Date(),
): boolean {
  const wanted = values.map((v) => v.value);
  const missing = cell === null || cell === undefined || cell === '';

  switch (kind) {
    case 'enum': {
      const has = !missing && wanted.includes(String(cell));
      return operator === 'is_not' ? !has : has;
    }
    case 'text': {
      if (missing) return operator === 'does_not_contain';
      const text = String(cell).toLowerCase();
      const needles = wanted.map((w) => w.toLowerCase());
      if (operator === 'equals') return needles.includes(text);
      const contains = needles.some((n) => text.includes(n));
      return operator === 'does_not_contain' ? !contains : contains;
    }
    case 'number': {
      const n = Number(cell);
      if (missing || Number.isNaN(n)) return false;
      return wanted.some((w) => {
        const target = Number(w);
        if (w.trim() === '' || Number.isNaN(target)) return false;
        return operator === 'gt' ? n > target : operator === 'lt' ? n < target : n === target;
      });
    }
    case 'date': {
      const date = toDate(cell);
      if (!date) return false;
      if (operator === 'within') {
        const window = DATE_WINDOWS.find((w) => wanted.includes(w.value));
        return window ? date.getTime() >= now.getTime() - window.days * DAY && date.getTime() <= now.getTime() : false;
      }
      return wanted.some((w) => {
        const bound = toDate(w);
        if (!bound) return false;
        return operator === 'before' ? date < bound : date > bound;
      });
    }
    case 'boolean':
      return wanted.includes(String(Boolean(cell)));
  }
}

/** A column's id as TanStack resolves it: `id`, then `accessorKey`. */
export function columnId<TData>(column: ColumnDef<TData>): string | undefined {
  if (column.id) return column.id;
  const key = (column as { accessorKey?: unknown }).accessorKey;
  return typeof key === 'string' ? key : undefined;
}

function cellValue<TData>(column: ColumnDef<TData>, row: TData, index: number): unknown {
  const accessorFn = (column as { accessorFn?: (row: TData, index: number) => unknown }).accessorFn;
  if (accessorFn) return accessorFn(row, index);
  const key = (column as { accessorKey?: unknown }).accessorKey;
  if (typeof key !== 'string') return undefined;
  return key.split('.').reduce<unknown>((value, part) => (value as Record<string, unknown> | undefined)?.[part], row);
}

function toOption(option: string | FilterOption): FilterOption {
  return typeof option === 'string' ? { value: option, label: option } : option;
}

/** The FilterBar fields declared by `columns`, in column order. */
export function columnFilterFields<TData>(columns: ColumnDef<TData>[], data: TData[]): FilterField[] {
  const fields: FilterField[] = [];
  for (const column of columns) {
    const schema = column.meta?.filter;
    const id = columnId(column);
    if (!schema || !id) continue;

    let options: FilterOption[] | undefined;
    if (schema.kind === 'enum' && !schema.loadOptions) {
      if (schema.options) {
        options = schema.options.map(toOption);
      } else {
        const seen = new Set<string>();
        data.forEach((row, index) => {
          const value = cellValue(column, row, index);
          if (value !== null && value !== undefined && value !== '') seen.add(String(value));
        });
        options = [...seen].map((value) => ({ value, label: value }));
      }
    }

    fields.push({
      id,
      label: schema.label ?? (typeof column.header === 'string' ? column.header : id),
      icon: schema.icon,
      operators: COLUMN_FILTER_OPERATORS[schema.kind],
      options,
      loadOptions: schema.kind === 'enum' ? schema.loadOptions : undefined,
    });
  }
  return fields;
}

type ColumnFilterValue = { kind: ColumnFilterKind; conditions: Array<Pick<FilterValue, 'operator' | 'values'>> };

/** TanStack `filterFn` for schema columns: every condition on the column must hold. */
export const schemaFilterFn: FilterFn<unknown> = (row, id, filterValue: ColumnFilterValue) =>
  filterValue.conditions.every((condition) =>
    matchesColumnFilter(filterValue.kind, row.getValue(id), condition.operator, condition.values),
  );

/**
 * FilterBar values as TanStack column filters: one entry per column, carrying
 * the column's kind and every condition on it, since a column can be filtered
 * more than once ("contains a" and "does not contain b").
 */
export function toColumnFilters<TData>(columns: ColumnDef<TData>[], filters: FilterValue[]) {
  const kinds = new Map<string, ColumnFilterKind>();
  for (const column of columns) {
    const id = columnId(column);
    const kind = column.meta?.filter?.kind;
    if (id && kind) kinds.set(id, kind);
  }

  const byColumn = new Map<string, ColumnFilterValue>();
  for (const filter of filters) {
    const kind = kinds.get(filter.field);
    if (!kind) continue;
    const entry = byColumn.get(filter.field) ?? { kind, conditions: [] };
    entry.conditions.push({ operator: filter.operator, values: filter.values });
    byColumn.set(filter.field, entry);
  }
  return [...byColumn].map(([id, value]) => ({ id, value }));
}
