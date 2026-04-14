# @olwiba/ui

> App shells, marketing sections, interactive components, and hooks built on `@olwiba/cn`.

## What This Is

`@olwiba/ui` is the app-level package in the Olwiba ecosystem.

Use it for:
- application shells and auth surfaces
- empty, loading, and error states
- reusable marketing page sections
- interactive helpers such as spotlights, docks, and confirm dialogs
- motion, overlay, and mode-aware primitive composition

Use `@olwiba/docs` for documentation layout and navigation primitives such as `DocsLayout`, `DocsSidebar`, and docs search.

## Package Chain

```text
@olwiba/cn      -> Base primitives, styling foundations, and low-level interactions
@olwiba/docs    -> Documentation layouts, navigation, and MDX-facing docs UI
@olwiba/ui      -> App-level shells, marketing sections, interactive components, and hooks
```

## Installation

```bash
bun add @olwiba/ui @olwiba/cn
```

Peer dependencies:
- `react`
- `react-dom`
- `@olwiba/cn`

## Quick Start

Wrap your app in `OlwibaUIProvider` if you want a shared UI mode for the package's mode-aware primitives and components.

```tsx
import {
  AppShell,
  EmptyState,
  OlwibaUIProvider,
} from "@olwiba/ui";

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

## Export Surface

### Context and mode helpers

- `OlwibaUIProvider`
- `useOlwibaUI`
- `useUIMode`
- `cn`

### App surfaces

- `AppShell`
- `AuthSection`
- `EmptyState`
- `ErrorPage`
- `UpgradePrompt`

### Marketing sections

- `HeroSection`
- `FeaturesSection`
- `CtaSection`
- `PricingSection`
- `TestimonialsSection`
- `TeamSection`
- `FaqSection`
- `StatsSection`
- `NewsletterSection`
- `ContactSection`
- `Navbar`
- `Footer`

### Overlays and motion

- `Underlay`
- `Overlay`
- `FadeIn`
- `StaggerChildren`
- `CountUp`
- `PageTransition`

### Interactive components

- `Spotlight`
- `Dock`
- `ContextMenu`
- `ConfirmDialog`

### Cards and utility components

- `GlassCard`
- `FeatureCard`
- `StatCard`
- `TestimonialCard`
- `PricingCard`
- `ImageCard`
- `FullPageSpinner`
- `PageHeader`
- `Suspensed`
- `ThemeSwitchMinimal`
- `ThemeColorUpdater`
- `VersionBanner`
- `RegisterHotkeys`
- `RootErrorFallback`

If you need the primitive `Spinner`, import it from `@olwiba/cn`. `@olwiba/ui` exports `FullPageSpinner`.

### Hooks

- `useMounted`
- `useConfirm`
- `useControlledOpen`
- `useScrolledPast`
- `useCopyToClipboard`
- `useDebounce`
- `useIntersectionObserver`
- `useLocalStorage`
- `useMediaQuery`
- `usePagination`

### Mode-aware primitive re-exports

- `Button`
- `Card`
- `CardHeader`
- `CardTitle`
- `CardDescription`
- `CardContent`
- `CardFooter`
- `Badge`
- `Input`
- `Textarea`
- `Checkbox`
- `Switch`

## Example: Auth Surface

```tsx
import { AuthSection } from "@olwiba/ui";

export function LoginPage() {
  return (
    <AuthSection
      layout="split"
      signUpHref="/signup"
      forgotPasswordHref="/forgot-password"
    />
  );
}
```

## Example: Upgrade Prompt

```tsx
import { UpgradePrompt } from "@olwiba/ui";

const rows = [
  { label: "Projects", currentValue: "1", upgradedValue: "10" },
  { label: "Sync rate", currentValue: "15 min", upgradedValue: "1 min" },
];

export function BillingGate() {
  return (
    <UpgradePrompt
      variant="comparison"
      eyebrow="Pro plan"
      title="Unlock faster monitoring"
      description="Keep the structure shared while leaving copy, pricing, and limits in the product."
      currentPlanLabel="Starter"
      upgradedPlanLabel="Pro"
      rows={rows}
      footer="Upgrade when the starter cap begins slowing the workflow down."
      secondaryActionLabel="Maybe later"
      onSecondaryAction={() => {}}
      onClose={() => {}}
      primaryActionLabel="Upgrade - £15/mo"
      onPrimaryAction={() => {}}
    />
  );
}
```

## Example: Marketing Page

```tsx
import {
  CtaSection,
  FeaturesSection,
  HeroSection,
  Navbar,
  Footer,
} from "@olwiba/ui";

export function LandingPage() {
  return (
    <main className="space-y-8">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
```

## Development

```bash
bun install
bun run web:dev
bun run build
```

`web:dev` starts the local package site on port `3002`.

## Release Flow

`@olwiba/ui` releases are tag-driven.

1. Finish and verify the local change, using linked upstream packages where needed.
2. Bump `package.json` when the release contents are final.
3. Commit and push `master`.
4. Create a matching version tag, for example `v0.0.4`.
5. Push the tag: `git push origin v0.0.4`.

The `publish-package` GitHub Actions workflow runs automatically on `v*` tags and checks that the tag matches the package version before publishing. `workflow_dispatch` remains available as a manual fallback.

If the `DISCORD_WEBHOOK_URL` GitHub Actions secret is configured, the publish workflow also sends a Discord notification on both success and failure.

## Related

- [@olwiba/cn](https://github.com/Olwiba/olwibaCN) - Base primitives
- [@olwiba/docs](https://github.com/Olwiba/olwibaDOCS) - Documentation framework and docs shell components

