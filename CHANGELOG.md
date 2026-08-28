# Changelog


## 0.2.20

### Added

- `surface` on every marketing section: `'card'` (the existing opaque island), `'soft'` (translucent and blurred, so an ambient page background shows through), or `'plain'` (no panel at all). Defaults to `'card'`, so a page that never sets it renders exactly as before. A page with an aura or gradient behind it previously had no way to stop its sections stacking up as a run of opaque slabs over the top of it
- `MarketingSurfaceProvider` sets the default surface for a whole page. "This page has an ambient background, so its sections should not be opaque" is one decision, and making it once beats repeating it per section and having a newly added section silently default back to an island
- `useSectionSurface(override?)` is exported for consumers rendering their own sections alongside the packaged ones, so a locally-built section can match the page's surface instead of hard-coding the island classes

### Changed

- The panel classes were copy-pasted inline into all 15 marketing sections. They now come from one place. `overflow-hidden` is kept on every surface including `'plain'` — the marquee and carousel sections clip their own content against it

## 0.2.19

### Added

- PrimarySlot, for a hero whose first action is the product

### Fixed

- Supply props for marketing demos

## 0.2.18

### Changed

- `AppShell`: the sidebar brand is no longer a link or a button. It navigated to `brand.href`, duplicating the Dashboard nav item directly beneath it, and as a `SidebarMenuButton` it lit up on hover — advertising an interaction whose only outcome was a destination already on screen. A masthead identifies; the nav navigates. `brand.href` stays on the type and is still used by `Navbar` and `Footer`, where the lockup genuinely is the way home
- `AppShell`: avatar fallbacks get a colour derived from a hash of the user's email, replacing one grey square for everybody. Stable per account across devices and sessions with nothing stored, so a face is recognisable at a glance in a list. Lightness and chroma are fixed so the whole set sits at one weight and white text clears contrast on every hue; only the hue moves. Deliberately not the brand colour — every user wearing `--primary` reads as app chrome rather than as a person. The collapsed-rail avatar also had a literal `grayscale` class, now removed

### Fixed

- `AppShell`: the sidebar brand name sat low against the logo beside it, the same defect fixed in `Navbar` and `Footer` in 0.2.17, and now with the same `text-box-trim: trim-both` / `text-box-edge: ex alphabetic`. That span previously carried `truncate`, and an `alphabetic` under edge puts the box bottom on the baseline — which would shear the descenders off a name containing g, y or p. Clipping therefore moves to the parent, which already has `overflow-hidden` and is 32px tall, so a long name is cut where there is room below the baseline. The cost is the ellipsis: an overlong name now ends at the sidebar edge rather than in "…"
- `AppShell`: initials are taken from a name's words, or from the local part of an email. `ollie@nestrrr.com` produced `OL@` from a raw two-character slice, and every address at a shared domain collided; `Ollie Bannister` now gives `OB`

### Docs

- The Navbar preview rendered nothing — its demo was `<Navbar />` with no props and threw on `brand.href`, since `brand` and `navLinks` are both required
- Navbar and AppShell demos share one brand lockup (`site/lib/demo-brand.tsx`) rather than two copies, since the point of showing it in both places is that they agree

## 0.2.17

### Fixed

- `Navbar` and `Footer`: the brand name sat low against the logo beside it. `items-center` centres the text's *box*, and that box reserves room for ascenders and descenders a wordmark may not use — so an all-lowercase name (nestrrr) rendered with dead air above it. Now trimmed to the glyphs with `text-box-trim: trim-both` / `text-box-edge: ex alphabetic`. `ex` rather than `cap` because these wordmarks are lowercase; a capitalised name wants `cap`, or its capitals overflow the trimmed box and read high. `leading-none` is kept as the fallback for browsers without `text-box-trim` (no Firefox yet), where it degrades to the previous behaviour instead of breaking
- Docs: the Navbar preview rendered nothing. Its demo was `<Navbar />` with no props, which threw on `brand.href` before painting — `brand` and `navLinks` are both required

### Note

- `AppShell`'s sidebar brand has the same low-sitting name but is deliberately untouched: that span carries `truncate`, and an `alphabetic` under-edge combined with `overflow: hidden` would shear the descenders off a name containing g, y or p











## 0.2.16

### Changed

- Add reusable app page hero

## 0.2.15

No user-facing changes.

## 0.2.14

### Added

- `AuthSection` — new `framed` prop for the centered layout, for an auth screen rendered inside a page that already has a navbar, a footer and its own background. Standalone, the section owns the viewport: it paints the background, applies its own horizontal padding and stretches to `min-h-dvh`. That is right when the sign-in card is the only thing on the page, and wrong as soon as there is chrome around it — the padding lands on top of the frame's, so the card sits in a double gutter, and a full-viewport section guarantees the footer starts below the fold on every auth route. `framed` drops all three. The card then fills the content column on a phone, the way `ContactSection` does, and only takes its `max-w-md` reading width from `sm` up, where there is room for the page to centre it. Default is unchanged, so existing standalone auth pages need no edit.

## 0.2.13

### Added

- `PricingCard` / `PricingSection` — new `priceEffect` prop, choosing how the price transitions when a cadence toggle swaps it. Takes the same `AnimatedSwapEffect` names or a full spec. Omit it and nothing changes: the effect still comes from the current UI mode (`fade` in default, `roll` in playful, `slide` in smooth), which is what a product that has committed to a mode wants. Set it when the price alone should read as an odometer — it is the one number a visitor is asked to compare across cadences — without moving the whole app to playful.

## 0.2.12

### Fixed

- `AuthSection` — the centred layout no longer traps its own content on mobile. It used `min-h-screen` with `justify-center`: `100vh` is the viewport measured with the browser chrome retracted, so the box was taller than the visible area and resized underneath the content as the URL bar hid and showed; and a flex item centred with `justify-center` that outgrows its container overflows in *both* directions, with the overflow above the top edge unreachable by scrolling. On a sign-up form — name, email, password, social buttons, keyboard covering half the viewport — that put the card's own title out of reach. Now `min-h-dvh` with auto margins, which collapse when free space runs out, so the card stays reachable. Vertical centring starts at `sm`; below that the form flows from the top with padding, matching how `ContactSection` reads on mobile. The brand slot now sits inside the centred column rather than above it, so it scrolls with the card instead of pinning to the top.

## 0.2.11

### Added

- `AnimatedSwap` — animates the replacement of any content when its swap key changes, with `roll`, `fade` and `slide` effects, a custom effect spec escape hatch, and a default chosen by the current UI mode

### Fixed

- The sidebar logo no longer clips its corner while the rail collapses

## 0.2.10

No user-facing changes.

## 0.2.9

### Added

- Make the plan CTA actually do something

## 0.2.8

### Added

- Arbitrary billing cadences and a count-aware grid

## 0.2.7

### Added

- `DataView` (app) — one collection rendered either as a grid of cards or as a table, from a single set of data: you supply a card renderer and table columns, it picks the view. Cards are for "what arrived recently", the table for comparing many rows; switching between them shouldn't mean two page implementations that drift apart. The `ready` gate is the reason this is a component and not a snippet — a persisted preference can't be read during SSR or the first client render, so rendering the default immediately either mismatches on hydration or flashes the wrong view at anyone who chose the other one.
- `useViewMode` — remembered cards/list preference on top of `useLocalStorage`. Returns the fallback on the server and the first client render, then settles to the stored value, with `ready` telling callers when the real answer has arrived. The key (`'view-mode'`) is shared by default so the choice reads as one product-wide preference; pass a distinct key where a page wants its own.
- `ViewToggle` — controlled two-state segmented control for cards vs. list, with `aria-pressed` and overridable labels. Pair with `useViewMode`.
- `MediaCard` — a `Card` with an optional banner (`wide` 3:1, `video`, or `square`) and a bottom-pinned footer, so the primary action sits on a shared baseline across a row however unevenly the titles above it wrap. The banner is a `ReactNode` rather than a URL — that's the difference from `ImageCard`, which stays the right choice when you actually have a src. `h-full` is on the card itself, so a bare `<MediaCard>` fills its grid cell without every caller asking.
- New `ViewMode`, `UseViewModeReturn`, `DataViewProps`, `MediaCardProps`, `ViewToggleProps`, and `AppGridColumns` types exported.

### Changed

- `AppGrid` — `columns` now accepts `5` and `6`, and `gap` accepts `none`. Existing breakpoint ramps were retuned: multi-column layouts now split at `sm` instead of `md`, and `columns={4}` gains an intermediate 3-column step at `lg` rather than jumping from 2 to 4. `AppGridCell` spans move with them (`span={1}`/`span={2}` are now `sm:`-prefixed, `span={3}` is `lg:`). Existing grids will break to multiple columns earlier than before; no API change is needed, but the layout shifts on small tablets.

### Fixed

- `Navbar` — mobile drawer now closes on every link, including the primary and secondary CTAs, which previously had no close handler at all and left the sheet open over the new page. Handlers moved to `onClickCapture` so they fire even when a custom `renderLink` stops propagation on its own anchor.

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
