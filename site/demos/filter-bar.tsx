'use client';
import * as React from 'react';
import { DataTable, type DataTableColumn, type FilterValue } from '@olwiba/ui';
import { Badge, Button, Switch } from '@olwiba/cn';
import { SandboxControls } from '@olwiba/docs';

interface Deploy {
  id: string;
  project: string;
  status: 'live' | 'building' | 'failed';
  region: string;
  author: string;
  builds: number;
  deployedAt: string;
}

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

const deploys: Deploy[] = [
  { id: '1', project: 'storefront', status: 'live', region: 'eu-west', author: 'Ana', builds: 42, deployedAt: daysAgo(1) },
  { id: '2', project: 'storefront', status: 'failed', region: 'us-east', author: 'Kai', builds: 43, deployedAt: daysAgo(3) },
  { id: '3', project: 'docs', status: 'live', region: 'eu-west', author: 'Mere', builds: 7, deployedAt: daysAgo(12) },
  { id: '4', project: 'billing-api', status: 'building', region: 'ap-south', author: 'Ana', builds: 118, deployedAt: daysAgo(0) },
  { id: '5', project: 'billing-api', status: 'live', region: 'us-east', author: 'Tomas', builds: 117, deployedAt: daysAgo(45) },
  { id: '6', project: 'search', status: 'failed', region: 'ap-south', author: 'Kai', builds: 19, deployedAt: daysAgo(200) },
];

const statusVariant = { live: 'secondary', building: 'outline', failed: 'destructive' } as const;

// The schema lives on the columns: each `meta.filter` says how that column filters.
const columns: DataTableColumn<Deploy>[] = [
  { accessorKey: 'project', header: 'Project', meta: { filter: { kind: 'text' } } },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
    meta: {
      filter: {
        kind: 'enum',
        options: [
          { value: 'live', label: 'Live' },
          { value: 'building', label: 'Building' },
          { value: 'failed', label: 'Failed' },
        ],
      },
    },
  },
  // No options given: the distinct regions in the data are offered.
  { accessorKey: 'region', header: 'Region', meta: { filter: { kind: 'enum' } } },
  { accessorKey: 'author', header: 'Author', meta: { filter: { kind: 'enum' } } },
  { accessorKey: 'builds', header: 'Builds', meta: { filter: { kind: 'number' } } },
  { accessorKey: 'deployedAt', header: 'Deployed', meta: { filter: { kind: 'date' } } },
];

// Starts filtered, so the chips are there to click from the first look.
const initialFilters: FilterValue[] = [
  {
    field: 'status',
    operator: 'is',
    values: [
      { value: 'live', label: 'Live' },
      { value: 'building', label: 'Building' },
    ],
  },
  { field: 'deployedAt', operator: 'within', values: [{ value: '30d', label: 'the last 30 days' }] },
];

export default function Demo() {
  const [filters, setFilters] = React.useState<FilterValue[]>(initialFilters);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div className="p-8">
      <DataTable
        columns={columns}
        data={deploys}
        filterable
        filters={filters}
        onFiltersChange={setFilters}
        filtersDisabled={disabled}
        pageSize={0}
      />

      <SandboxControls>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <label className="flex items-center gap-2 text-xs font-medium">
            <Switch checked={disabled} onCheckedChange={setDisabled} />
            Disabled
          </label>
          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="outline" onClick={() => setFilters(initialFilters)}>
              Reset filters
            </Button>
            <Button size="sm" variant="outline" onClick={() => setFilters([])}>
              Clear all
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            {filters.length} filter{filters.length === 1 ? '' : 's'} applied
          </span>
        </div>
      </SandboxControls>
    </div>
  );
}
