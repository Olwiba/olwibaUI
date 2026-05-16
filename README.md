<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="./public/olwibaUI--light.gif" />
    <source media="(prefers-color-scheme: dark)" srcset="./public/olwibaUI.gif" />
    <img src="./public/olwibaUI.gif" alt="olwibaUI" style="width: 100%;" />
  </picture>
</p>

<p align="center">
  <strong>Olwiba's app-level package. Shells, sections, interactive blocks, and hooks.</strong>
</p>

<p align="center">
  <a href="https://ui.olwiba.com">Documentation</a>
</p>

<p align="center">
  <a href="https://github.com/Olwiba/olwibaUI/issues/new?template=bug_report.md">🪲 Report a bug</a> ·
  <a href="https://github.com/Olwiba/olwibaUI/issues/new?template=feature_request.md">✨ Feature request</a>
</p>

<p align="center">
  <a href="https://github.com/sponsors/Olwiba"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=22c55e" alt="Sponsor" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/Olwiba/olwibaUI?label=license&logo=github" alt="License" /></a>
  <a href="https://github.com/Olwiba/olwibaUI/issues"><img src="https://img.shields.io/github/issues/Olwiba/olwibaUI" alt="Issues" /></a>
</p>

## What This Is

`@olwiba/ui` is the app-level package in the Nexus ecosystem.

It provides application shells, auth surfaces, marketing sections, interactive components, motion primitives, and utility hooks — all built on `@olwiba/cn`.

Use `@olwiba/docs` for documentation layout and navigation primitives such as `DocsLayout` and `DocsSidebar`.

## Package Chain

```text
@olwiba/cn   -> base primitives and styling foundations
@olwiba/docs -> documentation layouts and docs shell components
@olwiba/ui   -> app shells, marketing sections, interactive blocks, and hooks
```

## Installation

```bash
bun add @olwiba/ui @olwiba/cn
```

Peer dependencies: `@olwiba/cn`, `react`, `react-dom`

```tsx
import { AppShell, EmptyState, OlwibaUIProvider } from "@olwiba/ui";

function App() {
  return (
    <OlwibaUIProvider mode="smooth">
      <AppShell pageTitle="Dashboard">
        <EmptyState
          title="No projects yet"
          description="Create your first project to get started."
        />
      </AppShell>
    </OlwibaUIProvider>
  );
}
```

## What's Included

**App Surfaces** AppShell, AuthSection, EmptyState, ErrorPage, UpgradePrompt  
**Marketing** HeroSection, FeaturesSection, CtaSection, PricingSection, Navbar, Footer, and more  
**Interactive** Spotlight, Dock, ContextMenu, ConfirmDialog  
**Cards** GlassCard, FeatureCard, StatCard, TestimonialCard, PricingCard, ImageCard  
**Motion** FadeIn, StaggerChildren, CountUp, PageTransition  
**Layering** Underlay, Overlay  
**Hooks** useMounted, useConfirm, useControlledOpen, useScrolledPast, and more  

## Ecosystem

- [@olwiba/cn](https://github.com/Olwiba/olwibaCN) — base primitives
- [@olwiba/docs](https://github.com/Olwiba/olwibaDOCS) — documentation framework

## Contributing

Bug reports, pull requests & feature requests are welcome.
Open an issue first for anything beyond a small fix.

<br/>
<br/>

<p align="center">
  Built with 💖 by <a href="https://github.com/Olwiba">Olwiba</a>
</p>

<p align="center">
  <a href="https://buymeacoffee.com/olwiba"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black" alt="Buy Me A Coffee" /></a>
</p>
