// @olwiba/ui - App-level components and hooks
// Built on @olwiba/cn primitives

export { cn } from './lib/utils';

// Components
export { Spinner, FullPageSpinner } from './components/Spinner';
export { PageHeader } from './components/PageHeader';
export { Suspensed } from './components/Suspensed';
export { ThemeSwitchMinimal } from './components/ThemeSwitchMinimal';
export { ThemeColorUpdater } from './components/ThemeColorUpdater';
export { VersionBanner } from './components/VersionBanner';
export { RegisterHotkeys, type Hotkey } from './components/RegisterHotkeys';
export { RootErrorFallback } from './components/RootErrorFallback';

// Context
export { OlwibaUIProvider, useOlwibaUI, type OlwibaUIProviderProps } from './context/OlwibaUIContext';

// Hooks
export { useMounted } from './hooks/use-mounted';
export { useConfirm, type ConfirmOptions, type UseConfirmReturn } from './hooks/use-confirm';
export { useControlledOpen, type UseControlledOpenReturn } from './hooks/use-controlled-open';
export { useScrolledPast } from './hooks/use-scrolled-past';

// Blocks
export {
  AuthSplitBlock,
  DashboardOverviewBlock,
  DashboardShellBlock,
  MarketingHeroBlock,
  ApplicationSidebarBlock,
  DocumentSidebarBlock,
  LoginBlock,
} from './blocks';

