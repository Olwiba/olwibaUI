'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import {
  Badge,
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  cn,
} from '@olwiba/cn';

export interface SpotlightItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  onSelect: () => void;
}

export interface SpotlightGroup {
  heading: string;
  items: SpotlightItem[];
}

export interface SpotlightProps {
  groups: SpotlightGroup[];
  placeholder?: string;
  trigger?: React.ReactNode;
  triggerClassName?: string;
  shortcut?: string;
}

export function Spotlight({
  groups,
  placeholder = 'Search anything...',
  trigger,
  triggerClassName,
  shortcut = '⌘K',
}: SpotlightProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className={cn('w-64 justify-between text-muted-foreground', triggerClassName)}
        >
          <span className="flex items-center gap-2">
            <Search className="size-4" />
            {placeholder}
          </span>
          <Badge variant="secondary" className="font-mono text-xs">{shortcut}</Badge>
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={placeholder} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group, i) => (
            <React.Fragment key={group.heading}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => { item.onSelect(); setOpen(false); }}
                  >
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    <span>{item.label}</span>
                    {item.description && (
                      <span className="ml-2 text-xs text-muted-foreground">{item.description}</span>
                    )}
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
