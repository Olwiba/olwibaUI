'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { LoaderCircle, X } from 'lucide-react';
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
  description?: string;
  metadata?: string[];
  status?: React.ReactNode;
  scopes?: string[];
  disabled?: boolean;
  onSelect: () => void;
}

export interface CommandMenuGroup {
  heading: string;
  items: CommandMenuItem[];
  /** Caps a long result group after filtering. */
  limit?: number;
}

export interface CommandMenuScope {
  id: string;
  label: string;
  count?: number;
}

export interface CommandMenuProps {
  groups: CommandMenuGroup[];
  placeholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  loadingMessage?: string;
  scopes?: CommandMenuScope[];
  activeScopes?: string[];
  onScopeRemove?: (scope: string) => void;
  onScopeClear?: () => void;
  query?: string;
  onQueryChange?: (query: string) => void;
  /** Controlled open state — omit to let the component manage it internally. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Registers Cmd+K (mac) / Ctrl+K (win) to toggle the palette. @default true */
  hotkey?: boolean;
}

function normalizeSearch(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase()
    .trim();
}

/** Multi-token matching shared by the palette and consumer-side result tests. */
export function matchesCommandQuery(item: CommandMenuItem, query: string): boolean {
  const tokens = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = normalizeSearch(
    [item.label, item.description, ...(item.keywords ?? []), ...(item.metadata ?? [])]
      .filter(Boolean)
      .join(' '),
  );
  return tokens.every((token) => haystack.includes(token));
}

/**
 * Global search / Cmd+K command palette with optional facets and rich result
 * context. The original label/icon/shortcut API remains the minimal path.
 */
export function CommandMenu({
  groups,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No results found.',
  loading = false,
  loadingMessage = 'Searching…',
  scopes = [],
  activeScopes = [],
  onScopeRemove,
  onScopeClear,
  query: queryProp,
  onQueryChange,
  open: openProp,
  onOpenChange,
  hotkey = true,
}: CommandMenuProps) {
  const internal = useControlledOpen(false);
  const [internalQuery, setInternalQuery] = React.useState('');
  const query = queryProp ?? internalQuery;
  const isOpen = openProp ?? internal.isOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) internal.setIsOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange, internal.setIsOpen],
  );
  const setQuery = React.useCallback(
    (next: string) => {
      if (queryProp === undefined) setInternalQuery(next);
      onQueryChange?.(next);
    },
    [queryProp, onQueryChange],
  );

  const filteredGroups = React.useMemo(
    () =>
      groups
        .map((group) => {
          const items = group.items.filter(
            (item) =>
              matchesCommandQuery(item, query) &&
              (activeScopes.length === 0 ||
                item.scopes?.some((scope) => activeScopes.includes(scope))),
          );
          return { ...group, items: group.limit ? items.slice(0, group.limit) : items };
        })
        .filter((group) => group.items.length > 0),
    [activeScopes, groups, query],
  );

  const runItem = (item: CommandMenuItem) => {
    if (item.disabled) return;
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
        {activeScopes.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 border-b px-3 py-2" aria-label="Active filters">
            {activeScopes.map((scopeId) => {
              const scope = scopes.find((entry) => entry.id === scopeId);
              return (
                <button
                  key={scopeId}
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full border bg-muted px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => onScopeRemove?.(scopeId)}
                  disabled={!onScopeRemove}
                  aria-label={`Remove ${scope?.label ?? scopeId} filter`}
                >
                  {scope?.label ?? scopeId}
                  {scope?.count != null && <span aria-hidden>({scope.count})</span>}
                  {onScopeRemove && <X className="size-3" aria-hidden />}
                </button>
              );
            })}
            {activeScopes.length > 1 && onScopeClear && (
              <button
                type="button"
                className="ml-auto text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                onClick={onScopeClear}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
        <CommandInput placeholder={placeholder} value={query} onValueChange={setQuery} />
        <CommandList>
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground" role="status">
              <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />
              {loadingMessage}
            </div>
          ) : (
            <>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {filteredGroups.map((group, groupIndex) => (
                <React.Fragment key={group.heading}>
                  {groupIndex > 0 && <CommandSeparator />}
                  <CommandGroup heading={group.heading}>
                    {group.items.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={[
                          item.label,
                          item.description,
                          ...(item.keywords ?? []),
                          ...(item.metadata ?? []),
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        disabled={item.disabled}
                        onSelect={() => runItem(item)}
                      >
                        {item.icon && <item.icon />}
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{item.label}</span>
                          {item.description && (
                            <span className="block truncate text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          )}
                          {item.metadata && item.metadata.length > 0 && (
                            <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                              {item.metadata.join(' · ')}
                            </span>
                          )}
                        </span>
                        {(item.status || item.shortcut) && (
                          <span className="ml-auto flex shrink-0 items-center gap-2">
                            {item.status}
                            {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </React.Fragment>
              ))}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
