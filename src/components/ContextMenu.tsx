'use client';

import * as React from 'react';
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  ContextMenu as RadixContextMenu,
} from '@olwiba/cn';

export interface ContextMenuAction {
  type: 'item';
  label: string;
  shortcut?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface ContextMenuSeparatorDef {
  type: 'separator';
}

export interface ContextMenuLabelDef {
  type: 'label';
  label: string;
}

export interface ContextMenuSubDef {
  type: 'sub';
  label: string;
  items: ContextMenuDef[];
}

export type ContextMenuDef = ContextMenuAction | ContextMenuSeparatorDef | ContextMenuLabelDef | ContextMenuSubDef;

export interface ContextMenuProps {
  items: ContextMenuDef[];
  children: React.ReactNode;
}

function renderItems(items: ContextMenuDef[]) {
  return items.map((item, i) => {
    if (item.type === 'separator') return <ContextMenuSeparator key={i} />;
    if (item.type === 'label') return <ContextMenuLabel key={i}>{item.label}</ContextMenuLabel>;
    if (item.type === 'sub') {
      return (
        <ContextMenuSub key={i}>
          <ContextMenuSubTrigger>{item.label}</ContextMenuSubTrigger>
          <ContextMenuSubContent>{renderItems(item.items)}</ContextMenuSubContent>
        </ContextMenuSub>
      );
    }
    return (
      <ContextMenuItem key={i} disabled={item.disabled} onSelect={item.onSelect}>
        {item.label}
        {item.shortcut && <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>}
      </ContextMenuItem>
    );
  });
}

export function ContextMenu({ items, children }: ContextMenuProps) {
  return (
    <RadixContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {renderItems(items)}
      </ContextMenuContent>
    </RadixContextMenu>
  );
}

export {
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
};
