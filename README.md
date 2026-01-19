# @olwiba/ui

> App-level components and UI hooks built on `@olwiba/cn`.

## What This Is

Higher-level UI components and hooks for building applications. These extend the primitives from `@olwiba/cn` into reusable patterns.

## Package

```
npm: @olwiba/ui
registry: private (Verdaccio)
peer: @olwiba/cn
```

## Installation

```bash
# Configure Verdaccio in bunfig.toml first
bun add @olwiba/ui @olwiba/cn
```

## Components

- Spinner
- FullPageSpinner
- PageHeader
- Suspensed
- ThemeSwitchMinimal
- ThemeColorUpdater
- VersionBanner
- RegisterHotkeys
- RootErrorFallback
- confetti (canvas-confetti utility)

## Hooks

- `useConfirm` — Confirmation dialogs
- `useControlledOpen` — Dialog/popover state management
- `useMounted` — Client-side hydration detection
- `useScrolledPast` — Scroll position tracking

## Context

- `OlwibaUIContext` — Mobile detection, shared UI state

## Usage

```tsx
import { Spinner, useConfirm } from "@olwiba/ui";

function MyComponent() {
  const confirm = useConfirm();

  const handleDelete = async () => {
    if (await confirm("Delete this item?")) {
      // delete
    }
  };

  return <Spinner />;
}
```

## Related

- [@olwiba/cn](https://github.com/Olwiba/olwibaCN) — Base primitives
- [@genesis/renderer](https://github.com/Olwiba/genesis-renderer) — JSON-to-UI engine
