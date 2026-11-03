import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  FilterBar,
  operatorsFor,
  removeFilter,
  summariseFilterValues,
  upsertFilter,
  type FilterField,
  type FilterValue,
} from './FilterBar';

const fields: FilterField[] = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { value: 'live', label: 'Live' },
      { value: 'building', label: 'Building' },
      { value: 'paused', label: 'Paused' },
    ],
  },
  {
    id: 'name',
    label: 'Name',
    operators: [{ id: 'contains', label: 'contains', freeText: true }],
  },
];

const statusFilter: FilterValue = {
  field: 'status',
  operator: 'is',
  values: [
    { value: 'live', label: 'Live' },
    { value: 'paused', label: 'Paused' },
  ],
};

describe('summariseFilterValues', () => {
  test('names one or two values and counts the rest', () => {
    expect(summariseFilterValues([{ value: 'a', label: 'Alpha' }])).toBe('Alpha');
    expect(summariseFilterValues([{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }])).toBe('Alpha, Beta');
    expect(
      summariseFilterValues([
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
        { value: 'c', label: 'Gamma' },
      ]),
    ).toBe('Alpha +2');
    expect(summariseFilterValues([])).toBe('');
  });
});

describe('operatorsFor', () => {
  test('defaults to is / is not, both multi-value', () => {
    const operators = operatorsFor(fields[0]);
    expect(operators.map((o) => o.id)).toEqual(['is', 'is_not']);
    expect(operators.every((o) => o.multiple)).toBe(true);
  });

  test('uses the field operators when given', () => {
    expect(operatorsFor(fields[1]).map((o) => o.id)).toEqual(['contains']);
  });
});

describe('upsertFilter / removeFilter', () => {
  test('appends a new filter and replaces one being edited, without mutating', () => {
    const start: FilterValue[] = [statusFilter];
    const added = upsertFilter(start, { field: 'name', operator: 'contains', values: [{ value: 'nexus', label: 'nexus' }] });
    expect(added).toHaveLength(2);
    expect(start).toHaveLength(1);

    const edited = upsertFilter(added, { ...statusFilter, operator: 'is_not' }, 0);
    expect(edited[0].operator).toBe('is_not');
    expect(edited[1].field).toBe('name');
  });

  test('drops a filter whose values were all removed', () => {
    expect(upsertFilter([statusFilter], { ...statusFilter, values: [] }, 0)).toEqual([]);
  });

  test('removes by index', () => {
    expect(removeFilter([statusFilter], 0)).toEqual([]);
  });
});

describe('FilterBar', () => {
  test('renders each filter as a readable chip with its own remove button', () => {
    const html = renderToStaticMarkup(<FilterBar fields={fields} value={[statusFilter]} onValueChange={() => {}} />);

    expect(html).toContain('Status');
    expect(html).toContain('is');
    expect(html).toContain('Live, Paused');
    expect(html).toContain('aria-label="Remove Status filter"');
    expect(html).toContain('Clear');
  });

  test('shows only the add button when empty', () => {
    const html = renderToStaticMarkup(<FilterBar fields={fields} value={[]} onValueChange={() => {}} />);

    expect(html).toContain('Filter');
    expect(html).not.toContain('Remove');
    expect(html).not.toContain('Clear');
  });

  test('disabled keeps the chips visible but every control inert', () => {
    const html = renderToStaticMarkup(<FilterBar fields={fields} value={[statusFilter]} onValueChange={() => {}} disabled />);
    expect(html).toContain('Live, Paused');
    // edit, remove, add and clear
    expect(html.match(/<button[^>]*disabled=""/g)?.length).toBe(4);
  });

  test('never nests a button inside a button', () => {
    const html = renderToStaticMarkup(<FilterBar fields={fields} value={[statusFilter]} onValueChange={() => {}} />);
    expect(html).not.toMatch(/<button[^>]*>(?:(?!<\/button>).)*<button/s);
  });
});
