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

## Release Flow

`@olwiba/ui` releases are tag-driven.

1. Finish and verify the local change, using linked upstream packages where needed.
2. Bump `package.json` when the release contents are final.
3. Commit and push `master`.
4. Create a matching version tag, for example `v0.0.4`.
5. Push the tag: `git push origin v0.0.4`.

The `publish-package` GitHub Actions workflow runs automatically on `v*` tags and checks that the tag matches the package version before publishing. `workflow_dispatch` remains available as a manual fallback.

If the `DISCORD_WEBHOOK_URL` GitHub Actions secret is configured, the publish workflow also sends a Discord notification on both success and failure.

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


## Blocks

- AuthSplitBlock - Split auth section
- DashboardOverviewBlock - Dashboard overview section
- DashboardShellBlock - Full dashboard shell with sidebar, chart, and table
- MarketingHeroBlock - Hero + features section
- ApplicationSidebarBlock - Full application sidebar shell
- DocumentSidebarBlock - Collapsible docs sidebar shell
- LoginBlock - Centered login shell

