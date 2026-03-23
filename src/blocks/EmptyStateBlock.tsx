'use client';

import { FolderOpen, Plus } from 'lucide-react';
import { Button } from '@olwiba/cn';

export function EmptyStateBlock() {
  return (
    <section className="overflow-hidden rounded-2xl border bg-card">
      <div className="flex min-h-[480px] flex-col">
        {/* Simulated list header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="font-semibold">Projects</h2>
            <p className="text-sm text-muted-foreground">Manage your active projects</p>
          </div>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            New project
          </Button>
        </div>

        {/* Empty state */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted">
            <FolderOpen className="size-7 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">No projects yet</h3>
            <p className="max-w-xs text-sm text-muted-foreground">
              Create your first project to get started. Projects help you organise work across your team.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 size-4" />
            Create a project
          </Button>
        </div>
      </div>
    </section>
  );
}
