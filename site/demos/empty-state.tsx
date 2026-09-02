import { EmptyState, Button } from '@olwiba/ui';
import { FolderOpen } from 'lucide-react';

export default function EmptyStateDemo() {
  return (
    <div className="w-full max-w-lg">
      <EmptyState
        icon={FolderOpen}
        title="No projects yet"
        description="Create your first project to get started."
        eyebrow="Your workspace"
        variant="card"
        compact
        action={<Button size="sm">New project</Button>}
        secondaryAction={
          <Button size="sm" variant="ghost">
            Learn more
          </Button>
        }
      />
    </div>
  );
}
