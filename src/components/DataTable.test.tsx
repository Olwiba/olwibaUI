import { describe, expect, test } from 'bun:test';
import type { ColumnDef } from '@tanstack/react-table';
import { renderToStaticMarkup } from 'react-dom/server';
import { DataTable } from './DataTable';

interface Row {
  name: string;
  status: string;
}

const data: Row[] = [
  { name: 'alpha', status: 'live' },
  { name: 'beta', status: 'failed' },
  { name: 'gamma', status: 'live' },
];

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name', meta: { filter: { kind: 'text' } } },
  { accessorKey: 'status', header: 'Status', meta: { filter: { kind: 'enum' } } },
];

describe('DataTable filters', () => {
  test('filterable shows the filter bar built from the columns', () => {
    const html = renderToStaticMarkup(<DataTable columns={columns} data={data} filterable />);
    expect(html).toContain('aria-label="Filters"');
  });

  test('applied filters narrow the rows, through the column schema', () => {
    const html = renderToStaticMarkup(
      <DataTable
        columns={columns}
        data={data}
        filterable
        filters={[{ field: 'status', operator: 'is', values: [{ value: 'live', label: 'live' }] }]}
      />,
    );
    expect(html).toContain('alpha');
    expect(html).toContain('gamma');
    expect(html).not.toContain('>beta<');
  });

  test('several filters on one column all apply', () => {
    const html = renderToStaticMarkup(
      <DataTable
        columns={columns}
        data={data}
        filterable
        filters={[
          { field: 'name', operator: 'contains', values: [{ value: 'a', label: 'a' }] },
          { field: 'name', operator: 'does_not_contain', values: [{ value: 'gam', label: 'gam' }] },
        ]}
      />,
    );
    expect(html).toContain('alpha');
    expect(html).toContain('beta');
    expect(html).not.toContain('gamma');
  });

  test('defaultFilters start the table filtered without taking control of it', () => {
    const html = renderToStaticMarkup(
      <DataTable
        columns={columns}
        data={data}
        filterable
        defaultFilters={[{ field: 'status', operator: 'is', values: [{ value: 'failed', label: 'failed' }] }]}
      />,
    );
    expect(html).toContain('beta');
    expect(html).not.toContain('alpha');
  });

  test('filtersDisabled shows the filters but locks them', () => {
    const html = renderToStaticMarkup(
      <DataTable
        columns={columns}
        data={data}
        filterable
        filtersDisabled
        defaultFilters={[{ field: 'status', operator: 'is', values: [{ value: 'live', label: 'live' }] }]}
      />,
    );
    expect(html).toContain('aria-label="Edit Status filter"');
    expect(html).toMatch(/<button[^>]*disabled=""[^>]*aria-label="Remove Status filter"|<button[^>]*aria-label="Remove Status filter"[^>]*disabled=""/);
  });

  test('without filterable there is no filter bar', () => {
    expect(renderToStaticMarkup(<DataTable columns={columns} data={data} />)).not.toContain('aria-label="Filters"');
  });
});
