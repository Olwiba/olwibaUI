# Changelog

## 0.0.2

### Added

- GitHub publish workflow (`.github/workflows/publish-package.yml`) to publish to GitHub Packages and attach `.tgz` package artifacts to workflow runs/releases.

### Changed

- Release and publish configuration now targets GitHub Packages instead of the previous private registry.
- Docker dependency install now resolves `@olwiba/*` and `@genesis/*` scopes from `https://npm.pkg.github.com/`.
- Updated `@olwiba/cn` and `@olwiba/docs` dependency ranges to `^0.1.2`.

### Fixed

- TypeScript local package resolution now maps `@olwiba/ui` imports to source via tsconfig path aliases.
