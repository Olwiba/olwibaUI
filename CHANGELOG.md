# Changelog






## 0.0.35

### Changed

- No notable changes.

## 0.0.34

### Changed

- No notable changes.

## 0.0.33

### Changed

- No notable changes.

## 0.0.29

### Fixed

- `Switch`: removed invalid `mode` prop pass-through — CN Switch has no `mode` prop

## 0.0.27

### Added

- `IsometricPlane` component and `iso:generate` pipeline now wired up and available for use

## 0.0.20

### Added

- `UpgradePrompt` as a reusable app-level upgrade/paywall block in `@olwiba/ui`, with `banner` and `comparison` variants.

### Changed

- Generalized the upgrade block API so products provide their own copy, pricing, plan labels, limits, and comparison rows instead of inheriting rmBot-specific assumptions.
- Documented the new block in the package README with a downstream-configurable example.

## 0.0.14

### Fixed

- Synced `bun.lock` with the `@olwiba/docs` dependency update so CI `bun install --frozen-lockfile` succeeds during release workflows.

## 0.0.13

### Changed

- Docs routing now consumes `DocsLayout` directly from `@olwiba/docs` and removes local `DocsLayout` / `DocsSidebar` forks, aligning UI with the shared docs-shell source-of-truth pipeline.
- Updated docs package dependency to `0.1.12`.
- UI dev banner config now uses the shared segmented banner API and responsive fallback behavior synced from upstream docs/CN tooling.

## 0.0.11

### Fixed

- **`DashboardShellBlock`** — `SidebarProvider` uses `h-full min-h-0` when `sidebarPosition="contained"` (or `demo`) so docs sandboxes size to the preview frame instead of `100svh`.
- **`DocumentSidebarBlock` / `ApplicationSidebarBlock`** — provider + contained sidebar for docs-style shell demos.
- **`DocsSandbox`** — shell preview frame matches `@olwiba/docs` `Sandbox`: no padding, flex column + `min-h-0` for embedded chrome.

## 0.0.6

### Fixed

- Updated `@olwiba/cn` to `0.1.5` — picks up the correct `mode?: "playful" | "smooth"` types for Card, Input, Textarea, Checkbox, and Switch (0.1.4 shipped stale compiled output for these components).

## 0.0.5

### Fixed

- Updated `@olwiba/cn` dependency to `0.1.4` to pick up the `mode?: "playful" | "smooth"` Button API — the published `0.1.3` only had `playful?: boolean`, causing a DTS build failure in CI.

## 0.0.4

### Added

- `MarketingHeroSpeedBlock` — asymmetric speed-forward hero with dual-column opposing-scroll live property notification feed (preserves v1 rAF scroll pattern).
- `MonitorCardBlock` — active-state monitor card with live/paused status badge, last checked, found today/total counts, poll rate, and recent listings list.
- `NotificationFeedCard` — compact property card with title, meta, source badge, and found timestamp; used inside `MonitorCardBlock` and `MarketingHeroSpeedBlock`.
- `UpgradePromptBlock` — freemium gate component in two variants: `inline` (dashed-border card in monitor list) and `modal` (tier comparison table + upgrade CTA).
- `WhatsAppLinkBlock` — pairing code display with live 5-minute countdown, copy-to-clipboard, regenerate link, and connected state with masked phone number.
- All new block types exported from the package root (`MarketingHeroSpeedBlockProps`, `MonitorCardBlockProps`, `NotificationFeedCardProps`, `PropertyItem`, `UpgradePromptBlockProps`, `WhatsAppLinkBlockProps`).

## 0.0.3

### Changed

- Updated `@olwiba/docs` dependency to `^0.1.5` — picks up search ESC fix, primary-color copy tick icons, consistent `DocsCopyPage` dropdown, mobile layout improvements, and clickable sidebar/mobile-nav category headings.

### Removed

- `confetti` removed from public API — `fireConfetti` and `src/lib/confetti.ts` are no longer exported. The confetti effect on `CopyCommandButton` is handled internally via the CN site; it is not part of the `@olwiba/ui` package surface.

## 0.0.2

### Added

- GitHub publish workflow (`.github/workflows/publish-package.yml`) to publish to GitHub Packages and attach `.tgz` package artifacts to workflow runs/releases.

### Changed

- Release and publish configuration now targets GitHub Packages instead of the previous private registry.
- Docker dependency install now resolves `@olwiba/*` and `@genesis/*` scopes from `https://npm.pkg.github.com/`.
- Updated `@olwiba/cn` and `@olwiba/docs` dependency ranges to `^0.1.2`.

### Fixed

- TypeScript local package resolution now maps `@olwiba/ui` imports to source via tsconfig path aliases.
