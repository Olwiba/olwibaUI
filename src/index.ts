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
export { Enchanted, type EnchantedProps } from '@olwiba/cn';

// ─── Layout — grid, stack, section primitives ────────────────────────────────
export * from './layout';

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
  SettingsSection,
  type SettingsSectionProps,
} from './app/SettingsSection';

export {
  TeamMembersPanel,
  type TeamMembersPanelProps,
  type TeamMemberRecord,
} from './app/TeamMembersPanel';

export {
  BillingPanel,
  type BillingPanelProps,
  type BillingUsageMetric,
  type BillingInvoice,
  type BillingPaymentMethod,
} from './app/BillingPanel';

export {
  OnboardingWizard,
  type OnboardingWizardProps,
  type OnboardingStep,
} from './app/OnboardingWizard';

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

export { UpdateBanner, type UpdateBannerProps } from './app/UpdateBanner';

// ─── Marketing — page sections ────────────────────────────────────────────────
export { SectionTitle, type SectionTitleProps } from './marketing/SectionTitle';
export { marketingSectionSpacing, type MarketingSectionSpacing } from './marketing/section-spacing';
export { HeroSection, type HeroSectionProps } from './marketing/HeroSection';
export { FeaturesSection, type FeaturesSectionProps } from './marketing/FeaturesSection';
export { GroupedFeaturesSection, type GroupedFeaturesSectionProps, type GroupedFeatureGroup } from './marketing/GroupedFeaturesSection';
export { StepsSection, type StepsSectionProps, type StepItem, type StepGroup } from './marketing/StepsSection';
export { TechStackSection, type TechStackSectionProps, type TechStackItem } from './marketing/TechStackSection';
export { FeatureMarqueeSection, type FeatureMarqueeSectionProps, type FeatureMarqueeRow, type FeatureMarqueeItem } from './marketing/FeatureMarqueeSection';
export { CtaSection, type CtaSectionProps } from './marketing/CtaSection';
export { PricingSection, type PricingSectionProps, type PricingPlan } from './marketing/PricingSection';
export { TestimonialsSection, type TestimonialsSectionProps } from './marketing/TestimonialsSection';
export { TeamSection, type TeamMember, type TeamSectionProps } from './marketing/TeamSection';
export { FaqSection, type FaqSectionProps } from './marketing/FaqSection';
export { StatsSection, type StatsSectionProps } from './marketing/StatsSection';
export { NewsletterSection, type NewsletterSectionProps } from './marketing/NewsletterSection';
export { ContactSection, type ContactSectionProps, type ContactInfoItem } from './marketing/ContactSection';
export { ComparisonSection, type ComparisonSectionProps, type ComparisonColumn } from './marketing/ComparisonSection';
export { QualificationSection, type QualificationSectionProps, type QualificationColumn } from './marketing/QualificationSection';

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
export {
  AnimatedSwap,
  type AnimatedSwapProps,
  type AnimatedSwapEffect,
  type AnimatedSwapSpec,
} from './motion/AnimatedSwap';
export { CountdownTimer, type CountdownTimerProps } from './motion/CountdownTimer';
export { AnimatedPill, type AnimatedPillProps } from './motion/AnimatedPill';
export { PageTransition, type PageTransitionProps } from './motion/PageTransition';

// ─── Mechanics — behavior wrappers that play any children ────────────────────
export { Carousel, type CarouselProps } from './mechanics/Carousel';
export { Sortable, type SortableProps } from './mechanics/Sortable';

// ─── Components — interactive ────────────────────────────────────────────────
export { Spotlight, type SpotlightProps, type SpotlightGroup, type SpotlightItem } from './components/Spotlight';
export { Dock, type DockProps, type DockItem } from './components/Dock';
export { ContextMenu, type ContextMenuProps, type ContextMenuDef } from './components/ContextMenu';
export { ConfirmDialog, type ConfirmDialogProps } from './components/ConfirmDialog';
export { CommandMenu, type CommandMenuProps, type CommandMenuGroup, type CommandMenuItem } from './components/CommandMenu';

// ─── Components — data ───────────────────────────────────────────────────────
export { DataTable, type DataTableProps, type DataTableColumn } from './components/DataTable';
export { DataView, type DataViewProps } from './app/DataView';
export { Chart, type ChartProps, type ChartSeries } from './components/Chart';
export { FileUpload, type FileUploadProps, type FileUploadEntry } from './components/FileUpload';

// ─── Components — notifications ──────────────────────────────────────────────
export { NotificationToast, type NotificationToastProps, notify, type NotifyOptions, type NotifyAction } from './components/Notify';
export { NotificationsPopover, type NotificationsPopoverProps, type NotificationItem } from './components/NotificationsPopover';
export { ActivityFeed, type ActivityFeedProps, type ActivityFeedItem } from './components/ActivityFeed';

// ─── Components — device mockups ────────────────────────────────────────────
export { PhoneFrame, type PhoneFrameProps } from './components/PhoneFrame';
export { AppScreen } from './components/AppScreen';

// ─── Components — cards ───────────────────────────────────────────────────────
export { GlassCard, type GlassCardProps } from './components/GlassCard';
export { FeatureCard, type FeatureCardProps } from './components/FeatureCard';
export { StatCard, type StatCardProps } from './components/StatCard';
export { TestimonialCard, type TestimonialCardProps } from './components/TestimonialCard';
export { PricingCard, type PricingCardProps, type PricingFeature } from './components/PricingCard';
export { ImageCard, type ImageCardProps } from './components/ImageCard';
export { MediaCard, type MediaCardProps } from './components/MediaCard';
export { ViewToggle, type ViewToggleProps } from './components/ViewToggle';

// ─── Components — diagram ────────────────────────────────────────────────────
export { FlowConnector, type FlowConnectorProps } from './components/FlowConnector';
export { FlowBracket, type FlowBracketProps } from './components/FlowBracket';

// ─── Components — utility ────────────────────────────────────────────────────
export { FullPageSpinner } from './components/Spinner';
export { PageHeader, type PageHeaderProps, type PageHeaderBreadcrumb, type PageHeaderBackButton } from './components/PageHeader';
export { Suspensed } from './components/Suspensed';
export { ThemeSwitchMinimal } from './components/ThemeSwitchMinimal';
export { ModeSwitchMinimal } from './components/ModeSwitchMinimal';
export { BrandColorSwitchMinimal } from './components/BrandColorSwitchMinimal';
export { ThemeColorUpdater } from './components/ThemeColorUpdater';
export { VersionBanner } from './components/VersionBanner';
export { DevBanner, type DevBannerProps } from './components/DevBanner';
export { RegisterHotkeys, type Hotkey } from './components/RegisterHotkeys';
export { RootErrorFallback } from './components/RootErrorFallback';

// ─── Blog ────────────────────────────────────────────────────────────────────
export { PostCard, type PostCardProps, type PostAuthor } from './blog/PostCard';
export { PostList, type PostListProps } from './blog/PostList';
export { ChangelogList, type ChangelogListProps } from './blog/ChangelogList';
export { ChangelogCard, type ChangelogCardProps, type ChangelogHighlight, type ChangelogReleaseType } from './blog/ChangelogCard';

// ─── MDX ──────────────────────────────────────────────────────────────────────
export { MdxContent, type MdxContentProps } from './blog/MdxContent';

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useMounted } from './hooks/use-mounted';
export { useConfirm, type ConfirmOptions, type UseConfirmReturn } from './hooks/use-confirm';
export { useControlledOpen, type UseControlledOpenReturn } from './hooks/use-controlled-open';
export { useScrolledPast } from './hooks/use-scrolled-past';
export { useCopyToClipboard } from './hooks/use-copy-to-clipboard';
export { useDebounce } from './hooks/use-debounce';
export { useIntersectionObserver } from './hooks/use-intersection-observer';
export { useLocalStorage } from './hooks/use-local-storage';
export { useViewMode, type ViewMode, type UseViewModeReturn } from './hooks/use-view-mode';
export { useMediaQuery } from './hooks/use-media-query';
export { usePagination, type UsePaginationReturn } from './hooks/use-pagination';
