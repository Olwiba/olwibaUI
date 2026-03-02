# Changelog

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
