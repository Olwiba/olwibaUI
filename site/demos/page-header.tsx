import { PageHeader } from '@olwiba/ui';
import { Button } from '@olwiba/cn';

export default function PageHeaderDemo() {
  return (
    <div className="w-full max-w-lg rounded-lg border border-dashed p-6">
      <PageHeader
        title="Dashboard"
        description="Manage your projects and settings."
      >
        <Button size="sm">New Project</Button>
      </PageHeader>
      <div className="h-8 rounded bg-muted" />
    </div>
  );
}
