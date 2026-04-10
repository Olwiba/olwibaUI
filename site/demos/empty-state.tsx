import { EmptyState, Button } from '@olwiba/ui';
import { FolderOpen } from 'lucide-react';

export default function EmptyStateDemo() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-dashed p-8">
      <EmptyState
        icon={FolderOpen}
        title="No projects yet"
        description="Create your first project to get started."
        action={<Button size="sm">New project</Button>}
      />
    </div>
  );
}
