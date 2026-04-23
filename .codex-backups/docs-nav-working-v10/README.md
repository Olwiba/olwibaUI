Backup of the current working `olwibaUI` docs navigation experiment.

Captured on: 2026-04-22

Intent:
- preserve the known-good local working state before trimming changes
- keep an exact copy of the files that currently produce SPA-style docs navigation

Key behavior in this backup:
- docs sidebar uses explicit `router.navigate(...)` calls instead of `SidebarMenuButton asChild` wrapping TanStack `Link`
- `/docs/$` loader derives slugs from `location.pathname`
- `@olwiba/docs` is excluded from Vite optimizeDeps so local package edits are not hidden behind `.vite` prebundle cache

Primary files to restore if needed:
- `node_modules/@olwiba/docs/src/components/DocsSidebar.tsx`
- `node_modules/@olwiba/docs/dist/index.js`
- `site/routes/docs/$.tsx`
- `vite.config.ts`
