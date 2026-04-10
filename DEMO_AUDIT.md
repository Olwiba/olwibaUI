# olwibaUI — Demo Audit

## Goal

Every docs page should have a working, real demo. Simple self-contained components use `ComponentPreview` with interactive controls (matching the olwibaCN pattern). Complex multi-file / large layout components use `Sandbox` (the `DocsSandbox` from olwibaDOCS).

## Demo Mechanisms

| Mechanism | When to use | Configured in |
|---|---|---|
| `<ComponentPreview name="x">` | Single component, self-contained | `site/components/ComponentPreview.tsx` (names registered inline) |
| `<Sandbox id="x">` | Multi-file, large layout, or section-level component | `site/lib/sandboxes.ts` via `registerSandboxes()` |

The olwibaCN `ComponentPreview` pattern includes `DemoControls`, `useUsageCode`, and `LiveUsageCode` — interactive prop controls that portal below the preview and update a live code snippet. The olwibaUI `ComponentPreview` does not have this yet.

---

## Status Key

- ✅ Working
- 🔴 Broken (Sandbox ID unregistered)
- 🟡 Stub (demo file is "coming soon" placeholder)
- ⬜ No demo at all
- 🗑️ Orphaned (exists but nothing references it)

---

## Components

| Page | Current | Demo File | Status | Action |
|---|---|---|---|---|
| confirm-dialog | `<Sandbox id="confirm-dialog">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| context-menu | `<Sandbox id="context-menu">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| dock | `<Sandbox id="dock">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| feature-card | `<Sandbox id="feature-card">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| full-page-spinner | `<ComponentPreview>` | real | ✅ | Add controls |
| glass-card | `<Sandbox id="glass-card">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| image-card | `<Sandbox id="image-card">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| ~~kbd~~ | — | — | 🗑️ Removed — use `@olwiba/cn` `Kbd`/`KbdGroup` directly |
| olwiba-ui-context | `<ComponentPreview>` | real | ✅ | Add controls |
| page-header | `<ComponentPreview>` | real | ✅ | Add controls |
| pricing-card | `<Sandbox id="pricing-card">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| register-hotkeys | `<ComponentPreview>` | real | ✅ | Add controls |
| root-error-fallback | `<ComponentPreview>` | real | ✅ | Add controls |
| ~~spinner~~ | — | — | 🗑️ Removed — use `@olwiba/cn` `Spinner` directly |
| spotlight | `<Sandbox id="spotlight">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| stat-card | `<Sandbox id="stat-card">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| suspensed | `<ComponentPreview>` | real | ✅ | Add controls |
| testimonial-card | `<Sandbox id="testimonial-card">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| theme-color-updater | `<ComponentPreview>` | real | ✅ | Add controls |
| theme-switch-minimal | `<ComponentPreview>` | real | ✅ | Add controls |
| version-banner | `<ComponentPreview>` | real | ✅ | Add controls |

---

## App UI

| Page | Current | Demo File | Status | Action |
|---|---|---|---|---|
| app-shell | `<Sandbox id="app-shell" shellPreview>` | — | 🔴 | Register sandbox, build real demo |
| auth-section | `<Sandbox id="auth-section">` | stub | 🔴🟡 | Register sandbox, build real demo |
| empty-state | `<Sandbox id="empty-state">` | stub | 🔴🟡 | Register sandbox, build real demo |
| error-page | `<Sandbox id="error-page">` | stub | 🔴🟡 | Register sandbox, build real demo |

---

## Marketing

All marketing section pages are broken — they reference Sandbox IDs that aren't registered. Corresponding demo files in `site/demos/` are all stubs.

| Page | MDX Sandbox ID | Status | Action |
|---|---|---|---|
| contact-section | `contact-section` | 🔴🟡 | Register sandbox, build real demo |
| cta-section | `cta-section` | 🔴🟡 | Register sandbox, build real demo |
| faq-section | `faq-section` | 🔴🟡 | Register sandbox, build real demo |
| features-section | `features-section` | 🔴🟡 | Register sandbox, build real demo |
| footer | `footer` | 🔴🟡 | Register sandbox, build real demo |
| hero-section | `hero-section` | 🔴🟡 | Register sandbox, build real demo |
| navbar | `navbar` | 🔴🟡 | Register sandbox, build real demo |
| newsletter-section | `newsletter-section` | 🔴🟡 | Register sandbox, build real demo |
| pricing-section | `pricing-section` | 🔴🟡 | Register sandbox, build real demo |
| stats-section | `stats-section` | 🔴🟡 | Register sandbox, build real demo |
| team-section | `team-section` | 🔴🟡 | Register sandbox, build real demo |
| testimonials-section | `testimonials-section` | 🔴🟡 | Register sandbox, build real demo |

---

## Motion

| Page | Current | Demo File | Status | Action |
|---|---|---|---|---|
| count-up | `<Sandbox id="count-up">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| fade-in | `<Sandbox id="fade-in">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| page-transition | `<Sandbox id="page-transition">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| stagger-children | `<Sandbox id="stagger-children">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |

---

## Overlays

| Page | Current | Demo File | Status | Action |
|---|---|---|---|---|
| backdrop | `<Sandbox id="backdrop">` | — | 🔴 | Switch to ComponentPreview, build real demo |

---

## Hooks

| Page | Current | Demo File | Status | Action |
|---|---|---|---|---|
| use-confirm | none | — | ⬜ | Add ComponentPreview, build real demo |
| use-controlled-open | none | — | ⬜ | Add ComponentPreview, build real demo |
| use-copy-to-clipboard | `<Sandbox id="use-copy-to-clipboard">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| use-debounce | `<Sandbox id="use-debounce">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| use-intersection-observer | `<Sandbox id="use-intersection-observer">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| use-local-storage | `<Sandbox id="use-local-storage">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| use-media-query | `<Sandbox id="use-media-query">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| use-mounted | none | — | ⬜ | Add ComponentPreview, build real demo |
| use-pagination | `<Sandbox id="use-pagination">` | stub | 🔴🟡 | Switch to ComponentPreview, build real demo |
| use-scrolled-past | none | — | ⬜ | Add ComponentPreview, build real demo |

---

## Orphaned (to clean up)

### Sandboxes registered in `site/lib/sandboxes.ts` but not referenced by any MDX page

These were probably built for an older block-showcase structure. Either wire them up or remove them.

| Sandbox ID | Demo file |
|---|---|
| auth-split-block | site/demos/auth-split-block.tsx |
| dashboard-overview-block | site/demos/dashboard-overview-block.tsx |
| dashboard-shell-block | site/demos/dashboard-shell-block.tsx |
| marketing-hero-block | site/demos/marketing-hero-block.tsx |
| application-sidebar-block | site/demos/application-sidebar-block.tsx |
| document-sidebar-block | site/demos/document-sidebar-block.tsx |
| login-block | site/demos/login-block.tsx |
| marketing-page | site/demos/marketing-page.tsx |
| billing-page | site/demos/billing-page.tsx |
| sign-in-page | site/demos/sign-in-page.tsx |
| app-ui-page | site/demos/app-ui-page.tsx |

### Demo stub files with no corresponding MDX page

| File | Notes |
|---|---|
| site/demos/contact-form-block.tsx | no MDX page |
| site/demos/empty-state-block.tsx | no MDX page |
| site/demos/glow-effect.tsx | no MDX page |
| site/demos/gradient-background.tsx | no MDX page |
| site/demos/grid-pattern.tsx | no MDX page |
| site/demos/marketing-cta-block.tsx | no MDX page |
| site/demos/marketing-faq-block.tsx | no MDX page |
| site/demos/marketing-features-block.tsx | no MDX page |
| site/demos/marketing-footer-block.tsx | no MDX page |
| site/demos/marketing-nav-block.tsx | no MDX page |
| site/demos/marketing-newsletter-block.tsx | no MDX page |
| site/demos/marketing-pricing-block.tsx | no MDX page |
| site/demos/marketing-stats-block.tsx | no MDX page |
| site/demos/marketing-team-block.tsx | no MDX page |
| site/demos/marketing-testimonials-block.tsx | no MDX page |
| site/demos/noise-overlay.tsx | no MDX page |
| site/demos/not-found-block.tsx | no MDX page |
| site/demos/onboarding-block.tsx | no MDX page |
| site/demos/settings-layout-block.tsx | no MDX page |
| site/demos/user-profile-block.tsx | no MDX page |

---

## Work Plan

### Step 1 — Upgrade ComponentPreview

Bring the olwibaCN controls pattern into olwibaUI:

- Copy `usage-code-store.ts` from `olwibaCN/src/lib/` → `olwibaUI/site/lib/usage-code-store.ts`
- Upgrade `site/components/ComponentPreview.tsx` to add `DemoControls`, `useUsageCode`, `LiveUsageCode`
- No MDX changes needed — purely infra

### Step 2 — Components (switch broken Sandbox → ComponentPreview + real demos)

For each of the 11 broken component pages: confirm-dialog, context-menu, dock, feature-card, glass-card, image-card, kbd, pricing-card, spotlight, stat-card, testimonial-card:

- Update MDX: replace `<Sandbox id="x">` with `<ComponentPreview name="x">`
- Register the name in `ComponentPreview.tsx`
- Build a real demo in `site/demos/x.tsx` with controls where props are interesting

### Step 3 — Motion + Overlays (same pattern as Step 2)

count-up, fade-in, page-transition, stagger-children, backdrop

### Step 4 — Hooks (ComponentPreview + interactive demo)

Build interactive demos for all 10 hooks. For the 4 with no demo at all, also add `<ComponentPreview name="x">` to the MDX.

### Step 5 — App + Marketing sections (register Sandboxes + build demos)

For app-shell, auth-section, empty-state, error-page and all 12 marketing sections:

- Build real demo components in `site/demos/`
- Register each in `sandboxes.ts` with proper IDs matching the MDX
- Keep `shellPreview` on app-shell

### Step 6 — Clean up orphans

- Delete the 11 stale sandbox entries from `sandboxes.ts`
- Delete the 20 orphaned demo stub files
- Keep the corresponding `site/demos/` files only if their sandbox entry is also being kept
