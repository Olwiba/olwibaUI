// @olwiba/ui — App-level components, sections, and hooks built on @olwiba/cn

export { cn } from './lib/utils';

// ─── Context ──────────────────────────────────────────────────────────────────
export {
  OlwibaUIProvider,
  useOlwibaUI,
  useUIMode,
  type OlwibaUIProviderProps,
  type UIMode,
} from './context/OlwibaUIContext';

// ─── Primitives — mode-aware re-exports of @olwiba/cn components ─────────────
export * from './primitives';

// ─── App — shells, auth, feedback ────────────────────────────────────────────
export {
  AppShell,
  type AppShellProps,
  type AppShellBrand,
  type AppShellUser,
  type AppShellAction,
  type AppShellRenderLink,
  type AppNavItem,
} from './app/AppShell';

export {
  AuthSection,
  type AuthSectionProps,
  type AuthFormProps,
} from './app/AuthSection';

export {
  EmptyState,
  type EmptyStateProps,
} from './app/EmptyState';

export {
  ErrorPage,
  type ErrorPageProps,
} from './app/ErrorPage';

export {
  UpgradePrompt,
  type UpgradePromptProps,
  type UpgradeComparisonRow,
} from './app/UpgradePrompt';

// ─── Marketing — page sections ────────────────────────────────────────────────
export { SectionTitle, type SectionTitleProps } from './marketing/SectionTitle';
export { HeroSection, type HeroSectionProps } from './marketing/HeroSection';
export { FeaturesSection, type FeaturesSectionProps } from './marketing/FeaturesSection';
export { CtaSection, type CtaSectionProps } from './marketing/CtaSection';
export { PricingSection, type PricingSectionProps, type PricingPlan } from './marketing/PricingSection';
export { TestimonialsSection, type TestimonialsSectionProps } from './marketing/TestimonialsSection';
export { TeamSection } from './marketing/TeamSection';
export { FaqSection, type FaqSectionProps } from './marketing/FaqSection';
export { StatsSection, type StatsSectionProps } from './marketing/StatsSection';
export { NewsletterSection } from './marketing/NewsletterSection';
export { ContactSection } from './marketing/ContactSection';

// ─── Marketing — elements ─────────────────────────────────────────────────────
export { Navbar, type NavbarProps } from './marketing/Navbar';
export { Footer, type FooterProps } from './marketing/Footer';
export { LogoStrip, type LogoStripProps } from './marketing/LogoStrip';

// ─── Layering ─────────────────────────────────────────────────────────────────
export { Underlay, type UnderlayProps, type UnderlayVariant } from './overlays/Underlay';
export { Overlay, type OverlayProps, type OverlayVariant } from './overlays/Overlay';

// ─── Motion ───────────────────────────────────────────────────────────────────
export { FadeIn, type FadeInProps } from './motion/FadeIn';
export { StaggerChildren, type StaggerChildrenProps } from './motion/StaggerChildren';
export { CountUp, type CountUpProps } from './motion/CountUp';
export { PageTransition, type PageTransitionProps } from './motion/PageTransition';

// ─── Components — interactive ────────────────────────────────────────────────
export { Spotlight, type SpotlightProps, type SpotlightGroup, type SpotlightItem } from './components/Spotlight';
export { Dock, type DockProps, type DockItem } from './components/Dock';
export { ContextMenu, type ContextMenuProps, type ContextMenuDef } from './components/ContextMenu';
export { ConfirmDialog, type ConfirmDialogProps } from './components/ConfirmDialog';

// ─── Components — cards ───────────────────────────────────────────────────────
export { GlassCard, type GlassCardProps } from './components/GlassCard';
export { FeatureCard, type FeatureCardProps } from './components/FeatureCard';
export { StatCard, type StatCardProps } from './components/StatCard';
export { TestimonialCard, type TestimonialCardProps } from './components/TestimonialCard';
export { PricingCard, type PricingCardProps, type PricingFeature } from './components/PricingCard';
export { ImageCard, type ImageCardProps } from './components/ImageCard';

// ─── Components — utility ────────────────────────────────────────────────────
export { FullPageSpinner } from './components/Spinner';
export { PageHeader, type PageHeaderProps, type PageHeaderBreadcrumb, type PageHeaderBackButton } from './components/PageHeader';
export { Suspensed } from './components/Suspensed';
export { ThemeSwitchMinimal } from './components/ThemeSwitchMinimal';
export { ThemeColorUpdater } from './components/ThemeColorUpdater';
export { VersionBanner } from './components/VersionBanner';
export { DevBanner, type DevBannerProps } from './components/DevBanner';
export { RegisterHotkeys, type Hotkey } from './components/RegisterHotkeys';
export { RootErrorFallback } from './components/RootErrorFallback';

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useMounted } from './hooks/use-mounted';
export { useConfirm, type ConfirmOptions, type UseConfirmReturn } from './hooks/use-confirm';
export { useControlledOpen, type UseControlledOpenReturn } from './hooks/use-controlled-open';
export { useScrolledPast } from './hooks/use-scrolled-past';
export { useCopyToClipboard } from './hooks/use-copy-to-clipboard';
export { useDebounce } from './hooks/use-debounce';
export { useIntersectionObserver } from './hooks/use-intersection-observer';
export { useLocalStorage } from './hooks/use-local-storage';
export { useMediaQuery } from './hooks/use-media-query';
export { usePagination, type UsePaginationReturn } from './hooks/use-pagination';
