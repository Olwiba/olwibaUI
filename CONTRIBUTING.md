# Contributing

Thanks for your interest in contributing to `@olwiba/ui`. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@Olwiba](https://github.com/Olwiba).

## About this repository

This repository ships a single npm package: `@olwiba/ui`. It contains app shells, marketing sections, interactive components, and hooks built on top of `@olwiba/cn`.

- We use [Bun](https://bun.sh) for package management and scripts.
- We use [tsup](https://tsup.egoist.dev) to build the package.
- We use [Vite](https://vite.dev) + [TanStack Start](https://tanstack.com/start) for the docs site.
- We use tag-driven GitHub Actions workflows for releases.

## Structure

This repository is structured as follows:

```
src
├── app
├── blog
├── components
├── context
├── hooks
├── lib
├── marketing
├── motion
├── overlays
├── primitives
└── types
```

| Path                | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `src/app/`          | App shell blocks (sidebars, headers, layouts).                       |
| `src/marketing/`    | Marketing-style sections (hero, pricing, features).                  |
| `src/blog/`         | Blog-style components and layouts.                                   |
| `src/overlays/`     | Modals, drawers, sheets, and other overlay patterns.                 |
| `src/motion/`       | Motion primitives and animation helpers.                             |
| `src/primitives/`   | Higher-level composed primitives that build on `@olwiba/cn`.         |
| `src/components/`   | Other reusable composed components.                                  |
| `src/context/`      | Shared React context providers.                                      |
| `src/hooks/`        | Shared React hooks.                                                  |
| `src/lib/`          | Utilities and helpers.                                               |

## Upstream Dependency

`@olwiba/ui` builds on [`@olwiba/cn`](https://github.com/Olwiba/olwibaCN) and [`@olwiba/docs`](https://github.com/Olwiba/olwibaDOCS).

If you find a bug in a primitive, please consider whether the fix belongs in `olwibaCN` first. Add a block to this repo only when it is a higher-level composition that doesn't fit as a generic primitive.

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/olwibaUI.git
```

### Navigate to project directory

```bash
cd olwibaUI
```

### Create a new branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
bun install
```

### Run the docs site

```bash
bun run web:dev
```

### Build the package

```bash
bun run build
```

### Type-check

```bash
bun run types:check
```

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(marketing): add pricing section variant`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new blocks

If you have a request for a new block, please open a discussion or issue on GitHub. We'll be happy to help you out.

## Releases

Releases are tag-driven. The publish workflow runs automatically when a `v*` tag matching the `package.json` version is pushed.
