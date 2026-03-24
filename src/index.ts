// @olwiba/ui - App-level components and hooks
// Built on @olwiba/cn primitives

export { cn } from './lib/utils';

// Components — App shell
export { Spinner, FullPageSpinner } from './components/Spinner';
export { PageHeader } from './components/PageHeader';
export { Suspensed } from './components/Suspensed';
export { ThemeSwitchMinimal } from './components/ThemeSwitchMinimal';
export { ThemeColorUpdater } from './components/ThemeColorUpdater';
export { VersionBanner } from './components/VersionBanner';
export { RegisterHotkeys, type Hotkey } from './components/RegisterHotkeys';
export { RootErrorFallback } from './components/RootErrorFallback';

// Components — Cards
export { GlassCard, type GlassCardProps } from './components/GlassCard';
export { FeatureCard, type FeatureCardProps } from './components/FeatureCard';
export { StatCard, type StatCardProps } from './components/StatCard';
export { TestimonialCard, type TestimonialCardProps } from './components/TestimonialCard';
export { PricingCard, type PricingCardProps, type PricingFeature } from './components/PricingCard';
export { ImageCard, type ImageCardProps } from './components/ImageCard';

// Components — Motion
export { FadeIn, type FadeInProps } from './components/FadeIn';
export { StaggerChildren, type StaggerChildrenProps } from './components/StaggerChildren';
export { CountUp, type CountUpProps } from './components/CountUp';
export { PageTransition, type PageTransitionProps } from './components/PageTransition';

// Components — Native
export { Spotlight, type SpotlightProps, type SpotlightGroup, type SpotlightItem } from './components/Spotlight';
export { Dock, type DockProps, type DockItem } from './components/Dock';
export { ContextMenu, type ContextMenuProps, type ContextMenuDef } from './components/ContextMenu';

// Components — Decorative
export { GradientBackground, type GradientBackgroundProps } from './components/GradientBackground';
export { GridPattern, type GridPatternProps } from './components/GridPattern';
export { NoiseOverlay, type NoiseOverlayProps } from './components/NoiseOverlay';
export { GlowEffect, type GlowEffectProps } from './components/GlowEffect';

// Components — Utility
export { EmptyState, type EmptyStateProps } from './components/EmptyState';
export { ConfirmDialog, type ConfirmDialogProps } from './components/ConfirmDialog';
export { Kbd, type KbdProps } from './components/Kbd';

// Context
export { OlwibaUIProvider, useOlwibaUI, useUIMode, type OlwibaUIProviderProps, type UIMode } from './context/OlwibaUIContext';

// Primitives — mode-aware re-exports of @olwiba/cn components
export * from './primitives';

// Hooks
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

// Blocks
export * from './blocks';
