# Changelog

## 0.2.6

### Fixed

- `AppShell` — content wrapper (`children`, between header and page) had no padding at all, so every consuming page had to remember its own `p-6` or content ran flush against the sidebar/header chrome. Some did, some didn't. Now defaults to `p-6` via new `contentClassName` prop; override to `''` for a genuinely edge-to-edge page.

## 0.2.5

### Added

- `UpdateBanner` (app) — slide-in "new deploy shipped, refresh this tab" banner: polls an app-provided version endpoint, compares against the build-time version baked into the running bundle, one-click refresh with optional `onRefresh` hook. Harvested from rmBot. Distinct from the existing `VersionBanner` (release-announcement strip), which is unchanged.

## 0.2.4

### Added

- `StepsSection` — new `variant="timeline"`: numbered circles on a vertical accent line whose ends fade via gradient; step groups chain through a new `groups` prop with interstitial `after` content (the line fades out after a group and fades back in before the next), numbering continues across groups. Harvested from the rmBot how-it-works page.
- `StepItem.description` widened from `string` to `ReactNode` (non-breaking) — code chips, forms, and demo cards work inside steps.
- New `StepGroup` type exported.

## 0.2.3

### Fixed

- `PricingSection` — price no longer hardcodes a `$` prefix; new `currency` prop (default `'$'`, unchanged for existing consumers) lets non-USD products set their own symbol.
- `PricingSection` — a `highlighted` plan with no active `foundingDeadline` no longer unconditionally shows a "Founding member" badge. New `highlightedBadgeLabel` prop controls the fallback text (defaults to `'Founding member'` for backward compatibility — pass `''` to show no badge, same pattern as the existing `saveBadge` prop).

## 0.2.2

### Fixed

- `AppShell` — sidebar brand header no longer clips the logo: the padding override targeted a `data-slot` attribute the Sidebar primitives never emit, so it silently never applied. The brand row now uses the `lg` button size and collapses to a clean 32px square on the icon rail, with the brand text hidden
- `AppShell` — the logo slot is now neutral: it centers your logo in a 32px box without painting its own primary background, so logos that bring their own chrome are no longer double-boxed. Name-only brands keep the primary-colored fallback tile
- `AppShell` — footer user button gets the same collapsed-rail sizing, so the avatar no longer clips on the icon rail; the sidebar header gains vertical padding to separate the brand from the nav

### Changed

- Ecosystem package updates

## 0.2.1

### Added

- `Chart` — theme-aware line, area, bar, and donut charts in one component; `type` switches the form. Colors come from the `--chart-1..5` theme tokens in fixed order (overridable per series), legends render automatically for multiple series, tooltips are always on
- `Sortable` — new mechanic: wraps any children in drag-to-reorder behavior, controlled via `items`/`onReorder`. Supports `vertical`, `horizontal`, and `grid` directions, with keyboard reordering out of the box (space to lift, arrows to move, space to drop)

Each new piece ships with a docs page, live demo, and sandbox.

## 0.2.0

### Breaking

- `CarouselSection` removed — use `FeaturesSection` with `layout="carousel"` instead
- `CtaCardSection` removed — use `CtaSection` with `variant="showcase"` instead

### Added

- **Mechanics** — new component group for behavior wrappers: components you put other components inside to gain an interaction pattern, with its own docs section
- `Carousel` — the first mechanic: wraps any children in a horizontal scroll-snap track with prev/next controls
- `FeaturesSection` — new `layout` prop (`"grid"` | `"carousel"`), powered by `Carousel`
- `CtaSection` — new `variant="showcase"`, a theme-token rebuild of the old `CtaCardSection` with a mode-aware shell
- `NotificationsPopover` — bell with unread badge and a persistent inbox popover; complements `notify()` toasts (the toast announces, the popover holds history)
- `ActivityFeed` — vertical timeline with avatar/icon markers and a connecting rail
- `notify()` — new `error` and `warning` toast variants

Each new piece ships with a docs page, live demo, and sandbox.

### Changed

- `ContactSection`, `NewsletterSection`, `TeamSection`, and `HeroSection` are now mode-aware and use mode-aware primitives (`Button`, `Input`, `Textarea`, `Badge`)

### Fixed

- `CommandMenu` — palette now opens when used with `onOpenChange` but no `open` prop
- `BillingPanel` — usage progress clamps to 100 and guards against `limit=0`; over-limit metrics render destructive; invoice sorting disabled (display strings sorted incorrectly)
- `OnboardingWizard` — a rejected `onNext` no longer leaves the wizard stuck in a pending state; the error message is surfaced instead; stepper `aria-current`, screen-reader step titles, loading spinner
- `FileUpload` — single mode with `maxFiles=1` replaces the queued file instead of erroring; drag highlight no longer flickers over child elements; Space on the drop zone no longer scrolls
- `TeamMembersPanel` — actions column and invite button hide when their handlers are omitted; invite dialog is a real form (Enter submits, native email validation, fields reset per open)
- `DataTable` — selected-row count shows on single-page tables; `aria-sort` on sortable headers; `onRowClick` rows are keyboard-reachable
- `AuthSection` — SSO button on signup, loading spinner, and error/success states announced via `role="alert"`/`role="status"`

## 0.1.15

### Added

- `AuthSection` — new `forgot-password`, `reset-password`, and `verify` (OTP) modes on the existing form
- `DataTable` — sortable, filterable, paginated table built on TanStack Table
- `FileUpload` — drag-and-drop file picker with validated queue
- `CommandMenu` — global Cmd+K / Ctrl+K command palette
- `notify()` / `NotificationToast` — rich toast notifications via sonner
- `SettingsSection` — reusable settings-page row block
- `TeamMembersPanel` — member list with role management and invite dialog
- `BillingPanel` — in-app plan, usage, payment method, and invoice history view
- `OnboardingWizard` — stateful multi-step onboarding flow

Each new block ships with a docs page, live demo, and sandbox.

## 0.1.14

### Fixed

- Export Enchanted

## 0.1.13

### Added

- Bug report + feature request links in footer and docs
- Share-feedback sidebar dialog + client bundle leak fix
- Share hero section spacing

## 0.1.12

### Fixed

- `AuthSection` prefill glow now renders with `color-mix` for correct theming.
- Mobile fixes for the `Navbar` drawer and diagram components (`FlowBracket`, `BrandColorSwitchMinimal`).

## 0.1.11

No user-facing changes.

## 0.1.10

No user-facing changes.

## 0.1.9

No user-facing changes.

## 0.1.8

### Fixed

- Move docs to dev dependency
- Authenticate GitHub Packages publish

## 0.1.7

No user-facing changes.

## 0.1.6

### Added

- Emoji steps, configurable TeamSection, FlowBracket/Connector animation
- Update ChangelogCard, barrel exports, add marketing section components
- Add ComparisonSection, QualificationSection, AnimatedPill, CountdownTimer

### Changed

- Ignore *.stackdump files
- Tidy CHANGELOG and add missing 0.1.3 entry
- Rewrite 0.1.4 and 0.1.5 changelog entries

### Fixed

- Use bg-card to match other marketing block sections

## 0.1.5

### Changed

- Updated ecosystem packages: `@olwiba/docs` 0.1.27 → 0.1.29.

## 0.1.4

### Changed

- Updated ecosystem packages: `@olwiba/dx` 0.0.10 → 0.0.18, `@olwiba/cn` 0.1.17 → 0.1.20, `@olwiba/docs` 0.1.25 → 0.1.27.
- Publish workflow now accepts a `tag` input via `workflow_dispatch` for manual republishing of a specific release tag.

## 0.1.3

### Added

- Mode support for `FeatureCard`, `TestimonialCard`, and `PricingCard`.
- Mode awareness for marketing section containers.

## 0.1.2

No user-facing changes.

## 0.1.1

No user-facing changes.

## 0.1.0

No user-facing changes.

## 0.0.46

No user-facing changes.

## 0.0.45

No user-facing changes.

## 0.0.44

No user-facing changes.

## 0.0.43

No user-facing changes.

## 0.0.42

No user-facing changes.

## 0.0.41

### Changed

- Updated ecosystem package dependencies

## 0.0.38

### Added

- `ChangelogCard` and `ChangelogList` for product and package changelog pages.

## 0.0.37

### Changed

- `ContactSection` and `NewsletterSection` accept optional copy and contact-info props for template consumers.

## 0.0.35

No user-facing changes.

## 0.0.34

No user-facing changes.

## 0.0.33

No user-facing changes.

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
