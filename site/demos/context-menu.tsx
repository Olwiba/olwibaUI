'use client';
import { ContextMenu } from '@olwiba/ui';
import type { ContextMenuDef } from '@olwiba/ui';

const items: ContextMenuDef[] = [
  { type: 'item', label: 'Open', shortcut: '↵' },
  { type: 'item', label: 'Open in new tab', shortcut: '⌘↵' },
  { type: 'separator' },
  { type: 'item', label: 'Rename', shortcut: 'F2' },
  { type: 'item', label: 'Duplicate', shortcut: '⌘D' },
  { type: 'separator' },
  { type: 'sub', label: 'Share', items: [
    { type: 'item', label: 'Copy link' },
    { type: 'item', label: 'Email...' },
  ]},
  { type: 'separator' },
  { type: 'item', label: 'Delete', shortcut: '⌫' },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <ContextMenu items={items}>
        <div className="flex h-32 w-64 cursor-context-menu select-none items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
          Right-click here
        </div>
      </ContextMenu>
    </div>
  );
}
