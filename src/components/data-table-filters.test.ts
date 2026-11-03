import { describe, expect, test } from 'bun:test';
import type { ColumnDef } from '@tanstack/react-table';
import { columnFilterFields, matchesColumnFilter } from './data-table-filters';

const v = (...values: string[]) => values.map((value) => ({ value, label: value }));

interface Deploy {
  project: string;
  status: string;
  region: string;
  builds: number;
  createdAt: string;
  pinned: boolean;
}

const columns: ColumnDef<Deploy>[] = [
  { accessorKey: 'project', header: 'Project', meta: { filter: { kind: 'text' } } },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: { filter: { kind: 'enum', options: [{ value: 'live', label: 'Live' }, 'failed'] } },
  },
  { accessorKey: 'region', header: 'Region', meta: { filter: { kind: 'enum' } } },
  { accessorKey: 'builds', header: 'Builds', meta: { filter: { kind: 'number' } } },
  { accessorKey: 'createdAt', header: 'Created', meta: { filter: { kind: 'date', label: 'Created at' } } },
  { accessorKey: 'pinned', header: 'Pinned', meta: { filter: { kind: 'boolean' } } },
  { accessorKey: 'id', header: 'Id' },
];

const data: Deploy[] = [
  { project: 'storefront', status: 'live', region: 'eu-west', builds: 3, createdAt: '2026-10-01', pinned: true },
  { project: 'docs', status: 'failed', region: 'us-east', builds: 12, createdAt: '2026-06-01', pinned: false },
  { project: 'search', status: 'live', region: 'eu-west', builds: 7, createdAt: '2026-10-20', pinned: false },
];

describe('columnFilterFields', () => {
  const fields = columnFilterFields(columns, data);

  test('only columns that declare meta.filter become fields, in column order', () => {
    expect(fields.map((f) => f.id)).toEqual(['project', 'status', 'region', 'builds', 'createdAt', 'pinned']);
  });

  test('labels come from the schema, then the string header', () => {
    expect(fields.find((f) => f.id === 'createdAt')?.label).toBe('Created at');
    expect(fields.find((f) => f.id === 'project')?.label).toBe('Project');
  });

  test('enum options come from the schema, or from the distinct values in the data', () => {
    expect(fields.find((f) => f.id === 'status')?.options).toEqual([
      { value: 'live', label: 'Live' },
      { value: 'failed', label: 'failed' },
    ]);
    expect(fields.find((f) => f.id === 'region')?.options?.map((o) => o.value)).toEqual(['eu-west', 'us-east']);
  });

  test('each kind brings its own conditions', () => {
    const ops = (id: string) => fields.find((f) => f.id === id)?.operators?.map((o) => o.id);
    expect(ops('status')).toEqual(['is', 'is_not']);
    expect(ops('project')).toEqual(['contains', 'does_not_contain', 'equals']);
    expect(ops('builds')).toEqual(['eq', 'gt', 'lt']);
    expect(ops('createdAt')).toEqual(['within', 'after', 'before']);
    expect(ops('pinned')).toEqual(['is']);
  });
});

describe('matchesColumnFilter', () => {
  const now = new Date('2026-10-31T12:00:00Z');

  test('enum: is / is not, any of the values', () => {
    expect(matchesColumnFilter('enum', 'live', 'is', v('live', 'failed'))).toBe(true);
    expect(matchesColumnFilter('enum', 'live', 'is_not', v('live'))).toBe(false);
  });

  test('text: case-insensitive contains, negation and exact match', () => {
    expect(matchesColumnFilter('text', 'Storefront', 'contains', v('store'))).toBe(true);
    expect(matchesColumnFilter('text', 'Storefront', 'does_not_contain', v('store'))).toBe(false);
    expect(matchesColumnFilter('text', 'Storefront', 'equals', v('storefront'))).toBe(true);
    expect(matchesColumnFilter('text', 'Storefront', 'equals', v('store'))).toBe(false);
  });

  test('number: compares numerically, and an unparseable value matches nothing', () => {
    expect(matchesColumnFilter('number', 12, 'gt', v('7'))).toBe(true);
    expect(matchesColumnFilter('number', 3, 'lt', v('7'))).toBe(true);
    expect(matchesColumnFilter('number', 7, 'eq', v('7'))).toBe(true);
    expect(matchesColumnFilter('number', 7, 'gt', v('lots'))).toBe(false);
  });

  test('date: rolling windows from now, and before / after a day', () => {
    expect(matchesColumnFilter('date', '2026-10-20', 'within', v('30d'), now)).toBe(true);
    expect(matchesColumnFilter('date', '2026-06-01', 'within', v('30d'), now)).toBe(false);
    expect(matchesColumnFilter('date', '2026-10-20', 'after', v('2026-10-01'))).toBe(true);
    expect(matchesColumnFilter('date', '2026-06-01', 'before', v('2026-10-01'))).toBe(true);
  });

  test('boolean: yes or no', () => {
    expect(matchesColumnFilter('boolean', true, 'is', v('true'))).toBe(true);
    expect(matchesColumnFilter('boolean', false, 'is', v('true'))).toBe(false);
  });

  test('an empty or missing cell never matches a positive condition', () => {
    expect(matchesColumnFilter('text', null, 'contains', v('a'))).toBe(false);
    expect(matchesColumnFilter('enum', undefined, 'is', v('live'))).toBe(false);
  });
});
