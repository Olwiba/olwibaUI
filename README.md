# @olwiba/ui

> App-level components and UI hooks built on `@olwiba/cn`.

## What This Is

Higher-level UI components and hooks for building applications. These extend the primitives from `@olwiba/cn` into reusable patterns.

## Package Chain

```
@olwiba/cn      → Base primitives (Button, Card, Dialog, etc.)
@olwiba/docs    → Documentation components (DocsSidebar, SearchDialog, etc.)
@olwiba/ui      → App-level components (Spinner, hooks) ← YOU ARE HERE
```

## Installation

```bash
# Configure Verdaccio in bunfig.toml first
bun add @olwiba/ui @olwiba/cn
```

## Development

```bash
# Install deps
bun install

# Run docs site (port 3002)
bun run web:dev

# Build package
bun run build
```

## Components

- `Spinner` — Loading spinner with size variants
- `FullPageSpinner` — Centered full-page loading state

## Hooks

- `useMounted` — Client-side hydration detection

## Usage

```tsx
import { Spinner, useMounted } from "@olwiba/ui";
import { Button } from "@olwiba/cn";

function MyComponent() {
  const mounted = useMounted();

  if (!mounted) {
    return <Spinner />;
  }

  return <Button>Ready!</Button>;
}
```

## Related

- [@olwiba/cn](https://github.com/Olwiba/olwibaCN) — Base primitives
- [@olwiba/docs](https://github.com/Olwiba/olwibaDOCS) — Documentation components
