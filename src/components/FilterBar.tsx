'use client';

import * as React from 'react';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
  cn,
  useUIVariant,
} from '@olwiba/cn';
import { Check, ChevronLeft, ListFilter, Loader2, X } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterOperator {
  id: string;
  label: string;
  /** Several values may be picked, read as "any of". */
  multiple?: boolean;
  /** The value is typed rather than picked, e.g. "contains". */
  freeText?: boolean;
  /** Values for this condition only, overriding the field's, e.g. "within" offering rolling windows. */
  options?: FilterOption[];
}

export interface FilterField {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Defaults to `is` / `is not`, both multi-value. */
  operators?: FilterOperator[];
  options?: FilterOption[];
  /** Fetches values as the user types. Aborted when the query changes. */
  loadOptions?: (query: string, signal: AbortSignal) => Promise<FilterOption[]>;
}

/** One applied filter. Values keep their labels so chips render without a lookup. */
export interface FilterValue {
  field: string;
  operator: string;
  values: FilterOption[];
}

export interface FilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  fields: FilterField[];
  value: FilterValue[];
  onValueChange: (value: FilterValue[]) => void;
  addLabel?: string;
  clearLabel?: string;
  /** Shows the filters but stops them being added, edited or removed. */
  disabled?: boolean;
}

const defaultOperators: FilterOperator[] = [
  { id: 'is', label: 'is', multiple: true },
  { id: 'is_not', label: 'is not', multiple: true },
];

export function operatorsFor(field: FilterField): FilterOperator[] {
  return field.operators?.length ? field.operators : defaultOperators;
}

export function summariseFilterValues(values: FilterOption[]): string {
  if (values.length <= 2) return values.map((v) => v.label).join(', ');
  return `${values[0].label} +${values.length - 1}`;
}

/** Adds `filter`, or replaces the one at `index`. A filter left with no values is dropped. */
export function upsertFilter(filters: FilterValue[], filter: FilterValue, index?: number): FilterValue[] {
  const next = [...filters];
  if (index === undefined) {
    if (filter.values.length) next.push(filter);
    return next;
  }
  if (filter.values.length) next[index] = filter;
  else next.splice(index, 1);
  return next;
}

export function removeFilter(filters: FilterValue[], index: number): FilterValue[] {
  return filters.filter((_, i) => i !== index);
}

type Stage = 'field' | 'operator' | 'value';

interface Draft {
  index?: number;
  /** The chip being edited; the add button anchors new filters. */
  anchor?: HTMLElement | null;
  stage: Stage;
  field?: FilterField;
  operator?: FilterOperator;
  values: FilterOption[];
}

const closedDraft: Draft = { stage: 'field', values: [] };

function useOptions(field: FilterField | undefined, operator: FilterOperator | undefined, query: string, active: boolean) {
  const [loaded, setLoaded] = React.useState<FilterOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  // A condition with its own values never searches; it offers exactly those.
  const loadOptions = active && !operator?.options ? field?.loadOptions : undefined;

  React.useEffect(() => {
    if (!loadOptions) return;
    const controller = new AbortController();
    setLoading(true);
    const timer = window.setTimeout(() => {
      loadOptions(query, controller.signal)
        .then((options) => {
          if (!controller.signal.aborted) setLoaded(options);
        })
        .catch(() => {
          if (!controller.signal.aborted) setLoaded([]);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 200);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [loadOptions, query]);

  return loadOptions
    ? { options: loaded, loading }
    : { options: operator?.options ?? field?.options ?? [], loading: false };
}

/**
 * A row of structured filters built in three steps: field, then operator,
 * then value. Each applied filter is a chip that reopens the value step when
 * clicked. Controlled; the caller decides what a filter means for its data.
 */
export function FilterBar({
  fields,
  value,
  onValueChange,
  addLabel = 'Filter',
  clearLabel = 'Clear',
  disabled = false,
  className,
  ...props
}: FilterBarProps) {
  const mode = useUIVariant();
  const [draft, setDraft] = React.useState<Draft | null>(null);
  const [query, setQuery] = React.useState('');

  const fieldById = React.useMemo(() => new Map(fields.map((f) => [f.id, f])), [fields]);
  const { options, loading } = useOptions(draft?.field, draft?.operator, query, draft?.stage === 'value');

  const go = (next: Draft) => {
    setQuery('');
    setDraft(next);
  };

  const close = () => {
    setDraft(null);
    setQuery('');
  };

  const commit = (values: FilterOption[]) => {
    if (!draft?.field || !draft.operator) return;
    onValueChange(upsertFilter(value, { field: draft.field.id, operator: draft.operator.id, values }, draft.index));
    close();
  };

  // Any change to the chips closes the popover first: a removal shifts every later chip's index, and
  // a removed chip takes the popover's anchor with it, which left it open in the top-left corner.
  const change = (next: FilterValue[]) => {
    close();
    onValueChange(next);
  };



  const pickField = (field: FilterField) => {
    const operators = operatorsFor(field);
    if (operators.length === 1) go({ ...(draft ?? closedDraft), stage: 'value', field, operator: operators[0], values: [] });
    else go({ ...(draft ?? closedDraft), stage: 'operator', field, values: [] });
  };

  const canGoBack = (d: Draft | null) => {
    if (!d || d.stage === 'field') return false;
    if (d.stage === 'value' && d.field && operatorsFor(d.field).length > 1) return true;
    // A chip being edited has no field step to return to.
    return d.index === undefined;
  };

  const back = () => {
    if (!draft || !canGoBack(draft)) return;
    if (draft.stage === 'value' && draft.field && operatorsFor(draft.field).length > 1) go({ ...draft, stage: 'operator' });
    else go({ ...closedDraft });
  };

  const editChip = (index: number, anchor: HTMLElement | null) => {
    const filter = value[index];
    const field = fieldById.get(filter.field);
    if (!field) return;
    const operator = operatorsFor(field).find((o) => o.id === filter.operator) ?? operatorsFor(field)[0];
    go({ index, anchor, stage: 'value', field, operator, values: filter.values });
    if (operator.freeText) setQuery(filter.values[0]?.label ?? '');
  };

  const toggleValue = (option: FilterOption) => {
    if (!draft) return;
    const has = draft.values.some((v) => v.value === option.value);
    setDraft({ ...draft, values: has ? draft.values.filter((v) => v.value !== option.value) : [...draft.values, option] });
  };

  const chipClass = cn(
    'inline-flex h-8 items-stretch overflow-hidden border bg-background text-xs shadow-sm',
    !mode && 'rounded-md',
    mode === 'smooth' && 'rounded-full',
    mode === 'playful' && 'rounded-lg border-2',
    mode === 'glass' && 'rounded-lg bg-background/40 backdrop-blur-md',
  );

  // Never open against a chip that is gone or detached; Radix would pin the popover to the corner.
  const editingLost = draft?.index !== undefined && (draft.index >= value.length || !draft.anchor?.isConnected);
  const open = draft !== null && !editingLost && !disabled;
  const showBack = canGoBack(draft);
  const trimmed = query.trim();

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)} role="group" aria-label="Filters" {...props}>
      <Popover open={open} onOpenChange={(next) => (next ? go({ ...closedDraft }) : close())}>
        {draft?.anchor ? <PopoverAnchor virtualRef={{ current: draft.anchor }} /> : null}

        {value.map((filter, index) => {
          const field = fieldById.get(filter.field);
          const operator = field ? operatorsFor(field).find((o) => o.id === filter.operator) : undefined;
          const label = field?.label ?? filter.field;
          return (
            <span key={`${filter.field}-${index}`} className={cn(chipClass, disabled && 'opacity-60')}>
              <button
                type="button"
                disabled={disabled}
                className="inline-flex items-center gap-1 px-2.5 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none disabled:pointer-events-none"
                aria-label={`Edit ${label} filter`}
                onClick={(e) => editChip(index, e.currentTarget.parentElement)}
              >
                {field?.icon}
                <span className="font-medium">{label}</span>
                <span className="text-muted-foreground">{operator?.label ?? filter.operator}</span>
                <span className="max-w-[12rem] truncate font-medium">{summariseFilterValues(filter.values)}</span>
              </button>
              <button
                type="button"
                disabled={disabled}
                className="inline-flex items-center border-l px-1.5 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:outline-none disabled:pointer-events-none"
                aria-label={`Remove ${label} filter`}
                onClick={() => change(removeFilter(value, index))}
              >
                <X className="size-3.5" />
              </button>
            </span>
          );
        })}

        <PopoverTrigger asChild>
          <Button type="button" size="sm" variant="outline" disabled={disabled} className="h-8 gap-1.5 border-dashed px-2.5 text-xs">
            <ListFilter className="size-3.5" />
            {addLabel}
          </Button>
        </PopoverTrigger>

        {value.length > 0 ? (
          <Button type="button" size="sm" variant="ghost" disabled={disabled} className="h-8 px-2 text-xs" onClick={() => change([])}>
            {clearLabel}
          </Button>
        ) : null}

        <PopoverContent align="start" className="w-64 p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
          {draft ? (
            <Command
              className="bg-transparent"
              shouldFilter={!draft.field?.loadOptions || draft.stage !== 'value' || Boolean(draft.operator?.options)}
            >
              {showBack || draft.field ? (
                <div className="flex items-center gap-1 border-b px-1 py-1 text-xs text-muted-foreground">
                  {showBack ? (
                    <button
                      type="button"
                      aria-label="Back"
                      className="rounded-sm p-1 hover:bg-accent hover:text-foreground"
                      onClick={back}
                    >
                      <ChevronLeft className="size-3.5" />
                    </button>
                  ) : null}
                  <span className="truncate px-1">
                    {draft.field?.label}
                    {draft.operator ? ` ${draft.operator.label}` : ''}
                  </span>
                </div>
              ) : null}

              <CommandInput
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder={
                    draft.stage === 'field'
                      ? 'Filter by...'
                      : draft.stage === 'operator'
                        ? 'Choose a condition...'
                        : draft.operator?.freeText
                          ? 'Type a value...'
                          : 'Search values...'
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && query === '') back();
                    if (e.key === 'Enter' && draft.stage === 'value' && draft.operator?.freeText && trimmed) {
                      e.preventDefault();
                      commit([{ value: trimmed, label: trimmed }]);
                    }
                  }}
                />

              <CommandList>
                {draft.stage === 'field' ? (
                  <>
                    <CommandEmpty>No matching fields.</CommandEmpty>
                    <CommandGroup>
                      {fields.map((field) => (
                        <CommandItem key={field.id} value={field.id} keywords={[field.label]} onSelect={() => pickField(field)}>
                          {field.icon}
                          {field.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                ) : null}

                {draft.stage === 'operator' && draft.field ? (
                  <CommandGroup>
                    {operatorsFor(draft.field).map((operator) => (
                      <CommandItem
                        key={operator.id}
                        value={operator.id}
                        onSelect={() => go({ ...draft, stage: 'value', operator, values: draft.values })}
                      >
                        {operator.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : null}

                {draft.stage === 'value' && draft.operator?.freeText ? (
                  <CommandGroup>
                    {trimmed ? (
                      <CommandItem value={`__free:${trimmed}`} onSelect={() => commit([{ value: trimmed, label: trimmed }])}>
                        Use "{trimmed}"
                      </CommandItem>
                    ) : (
                      <div className="px-2 py-3 text-xs text-muted-foreground">Type, then press Enter.</div>
                    )}
                  </CommandGroup>
                ) : null}

                {draft.stage === 'value' && !draft.operator?.freeText ? (
                  <>
                    {loading ? (
                      <div className="flex items-center gap-2 px-3 py-3 text-xs text-muted-foreground" aria-live="polite">
                        <Loader2 className="size-3.5 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      <CommandEmpty>No matching values.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {options.map((option) => {
                        const selected = draft.values.some((v) => v.value === option.value);
                        return (
                          <CommandItem
                            key={option.value}
                            value={option.value}
                            keywords={[option.label]}
                            onSelect={() => (draft.operator?.multiple ? toggleValue(option) : commit([option]))}
                          >
                            {draft.operator?.multiple ? (
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-primary/60',
                                  selected ? 'bg-primary text-primary-foreground' : '[&_svg]:invisible',
                                )}
                              >
                                <Check className="size-3" />
                              </span>
                            ) : null}
                            <span className="truncate">{option.label}</span>
                            <span className="sr-only">{selected ? ', selected' : ''}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </>
                ) : null}
              </CommandList>

              {draft.stage === 'value' && draft.operator?.multiple && !draft.operator.freeText ? (
                <div className="flex items-center justify-between gap-2 border-t p-1.5">
                  <span className="px-1 text-xs text-muted-foreground" aria-live="polite">
                    {draft.values.length} selected
                  </span>
                  <Button type="button" size="sm" className="h-7 px-2.5 text-xs" onClick={() => commit(draft.values)}>
                    {draft.index === undefined ? 'Apply' : draft.values.length ? 'Update' : 'Remove'}
                  </Button>
                </div>
              ) : null}
            </Command>
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
}
