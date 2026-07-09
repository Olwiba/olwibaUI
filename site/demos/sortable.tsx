'use client';
import * as React from 'react';
import { Sortable } from '@olwiba/ui';
import { GripVertical } from 'lucide-react';

const initialTasks = [
  { id: 'design', title: 'Design the billing page', tag: 'Design' },
  { id: 'api', title: 'Wire up usage metering API', tag: 'Backend' },
  { id: 'emails', title: 'Dunning email sequence', tag: 'Growth' },
  { id: 'qa', title: 'QA pass on checkout flow', tag: 'QA' },
];

export default function Demo() {
  const [order, setOrder] = React.useState(initialTasks.map((t) => t.id));
  const tasks = order.map((id) => initialTasks.find((t) => t.id === id)!);

  return (
    <div className="mx-auto max-w-md p-8">
      <Sortable items={order} onReorder={setOrder}>
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5">
            <GripVertical className="size-4 shrink-0 text-muted-foreground" />
            <p className="flex-1 text-sm font-medium">{task.title}</p>
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{task.tag}</span>
          </div>
        ))}
      </Sortable>
    </div>
  );
}
