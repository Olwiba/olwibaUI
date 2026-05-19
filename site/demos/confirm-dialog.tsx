'use client';
import * as React from 'react';
import { ConfirmDialog, useConfirm } from '@olwiba/ui';
import { Button } from '@olwiba/cn';

export default function Demo() {
  const { confirm, isOpen, options, handleConfirm, handleCancel } = useConfirm();
  const [result, setResult] = React.useState<string | null>(null);

  async function handleDelete() {
    const ok = await confirm({
      title: 'Delete project?',
      description: 'This action cannot be undone. All data will be permanently removed.',
      confirmLabel: 'Delete',
      cancelLabel: 'Keep it',
    });
    setResult(ok ? 'Deleted' : 'Cancelled');
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Button variant="destructive" onClick={handleDelete}>Delete project</Button>
      {result && <p className="text-sm text-muted-foreground">Result: <strong>{result}</strong></p>}
      <ConfirmDialog isOpen={isOpen} options={options} handleConfirm={handleConfirm} handleCancel={handleCancel} destructive />
    </div>
  );
}
