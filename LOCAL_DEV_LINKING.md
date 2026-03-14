# Local Dev Linking

Decision: use `bun link` for local cross-repo development across the current package ecosystem, while keeping committed dependencies on published versions.

Why:
- lets local changes flow between repos without publishing every intermediate fix
- keeps the normal published-package setup intact for CI, build servers, and releases
- avoids committing `link:`, `file:`, or workspace-only dependency paths that would break on remote machines

Rules:
- keep committed `package.json` dependencies on normal published versions
- use `bun link` only as a local machine override during development
- do not commit local linking changes as dependency manifest changes
- when a fix is ready, release the upstream package normally and then consume the published version

Intended use:
- `olwibaDOCS` can locally link to `olwibaCN`
- `olwibaUI` can locally link to `olwibaCN` and `olwibaDOCS`
- `genesis-render` can locally link to `olwibaCN`, `olwibaDOCS`, and `olwibaUI`

Current package roots:
- `C:\Workspace\olwibaCN`
- `C:\Workspace\olwibaDOCS`
- `C:\Workspace\olwibaUI`
- `C:\Workspace\genesis-render`

Current non-package directories:
- `C:\Workspace\genesis`
- `C:\Workspace\genesis-start`
- `C:\Workspace\genesis-sync`

Usage from `olwibaUI`:
- `bun run dev:link:ecosystem:check`
- `bun run dev:link:ecosystem`

What the command does:
- registers each current local package with `bun link`
- links internal ecosystem packages into their consuming repos
- leaves committed dependency versions untouched, so remote builds still install from the registry

Build server behavior:
- local Bun links are machine-specific and are not committed to `package.json`
- CI, preview, and production builds continue to resolve the published package versions
- after an upstream fix is ready, release the package normally and let downstream repos consume the published version

Future packages:
- when `genesis`, `genesis-start`, or `genesis-sync` become real package roots, append them to the same linking flow
- the committed dependency strategy stays the same: published versions in git, local Bun links only on development machines

This is the preferred local development workflow unless the repos are later moved into a single workspace that CI also checks out together.
