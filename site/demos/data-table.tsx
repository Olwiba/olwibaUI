'use client';
import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@olwiba/ui';
import { Badge, Button } from '@olwiba/cn';

interface Project {
  id: string;
  name: string;
  status: 'live' | 'building' | 'paused';
  updatedAt: string;
}

const projects: Project[] = [
  { id: '1', name: 'nexus-genesis', status: 'live', updatedAt: '2h ago' },
  { id: '2', name: 'kiwiana-storefront', status: 'building', updatedAt: '5h ago' },
  { id: '3', name: 'olwiba-docs', status: 'live', updatedAt: '1d ago' },
  { id: '4', name: 'genesis-render', status: 'paused', updatedAt: '3d ago' },
  { id: '5', name: 'nexus-sync', status: 'live', updatedAt: '4d ago' },
];

const statusVariant = { live: 'secondary', building: 'outline', paused: 'destructive' } as const;

const columns: ColumnDef<Project>[] = [
  { accessorKey: 'name', header: 'Project' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge variant={statusVariant[row.original.status]} className="capitalize">{row.original.status}</Badge>,
  },
  { accessorKey: 'updatedAt', header: 'Updated' },
];

export default function Demo() {
  return (
    <div className="p-8">
      <DataTable
        columns={columns}
        data={projects}
        searchKey="name"
        searchPlaceholder="Search projects…"
        toolbar={<Button size="sm">New project</Button>}
        pageSize={3}
      />
    </div>
  );
}
