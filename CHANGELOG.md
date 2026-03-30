# Changelog

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
