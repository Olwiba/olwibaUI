'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@olwiba/cn';
import { RegisterHotkeys } from './RegisterHotkeys';
import { useControlledOpen } from '../hooks/use-controlled-open';

export interface CommandMenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  shortcut?: string;
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandMenuGroup {
  heading: string;
  items: CommandMenuItem[];
}

export interface CommandMenuProps {
  groups: CommandMenuGroup[];
  placeholder?: string;
  emptyMessage?: string;
  /** Controlled open state — omit to let the component manage it internally. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Registers Cmd+K (mac) / Ctrl+K (win) to toggle the palette. @default true */
  hotkey?: boolean;
}

/**
 * Global search / Cmd+K command palette. One component — pass different
 * `groups` per surface rather than building a bespoke dialog each time.
 */
export function CommandMenu({
  groups,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No results found.',
  open: openProp,
  onOpenChange,
  hotkey = true,
}: CommandMenuProps) {
  const internal = useControlledOpen(false);
  const isOpen = openProp ?? internal.isOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) internal.setIsOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange, internal.setIsOpen],
  );

  const runItem = (item: CommandMenuItem) => {
    setOpen(false);
    item.onSelect();
  };

  return (
    <>
      {hotkey && (
        <RegisterHotkeys
          hotkeys={[
            { key: 'k', meta: true, handler: () => setOpen(!isOpen) },
            { key: 'k', ctrl: true, handler: () => setOpen(!isOpen) },
          ]}
        />
      )}
      <CommandDialog open={isOpen} onOpenChange={setOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          {groups.map((group, i) => (
            <React.Fragment key={group.heading}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={[item.label, ...(item.keywords ?? [])].join(' ')}
                    onSelect={() => runItem(item)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.label}</span>
                    {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                  </CommandItem>
                ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
