'use client';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  PlusCircleIcon,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@olwiba/cn';
import { useUIMode } from '../context/OlwibaUIContext';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface AppNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface AppShellAction {
  icon?: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface AppShellUser {
  email: string;
  name?: string;
  avatar?: string;
  /** Displayed as a sub-label (e.g. plan tier). */
  plan?: string;
  onSignOut?: () => void;
  onBilling?: () => void;
  onNotifications?: () => void;
}

export interface AppShellBrand {
  name: ReactNode;
  logo?: ReactNode;
  href?: string;
}

/**
 * Render a navigation link. Override to integrate your router's Link component.
 * @example renderLink={({ href, children }) => <Link to={href}>{children}</Link>}
 */
export type AppShellRenderLink = (props: {
  href: string;
  children: ReactNode;
  className?: string;
}) => ReactNode;

export interface AppShellProps {
  brand?: AppShellBrand;
  navItems?: AppNavItem[];
  /** Primary CTA rendered above nav (e.g. "New project", "Quick create") */
  action?: AppShellAction;
  user?: AppShellUser;
  /** Text shown in the top header bar */
  pageTitle?: string;
  /** Slot rendered at the start of the top header bar, after the sidebar trigger. */
  headerStart?: ReactNode;
  /** Slot rendered at the end of the top header bar. */
  headerEnd?: ReactNode;
  /** Override link rendering for SPA navigation. Defaults to a native <a>. */
  renderLink?: AppShellRenderLink;
  children?: ReactNode;
  /**
   * Sidebar collapse behaviour.
   * - `"icon"` — collapses to a narrow icon rail (default, recommended for desktop)
   * - `"offcanvas"` — slides off-screen as a drawer overlay
   * - `"none"` — always fully visible
   */
  collapsible?: 'icon' | 'offcanvas' | 'none';
  /**
   * Layout scope.
   * - `"viewport"` (default) — fills the full browser viewport; use for top-level app shells.
   * - `"contained"` — fills its parent container; use in docs sandboxes, modals, or embedded previews.
   */
  sidebarPosition?: 'viewport' | 'contained';
  /** Which side the sidebar sits on. @default "left" */
  side?: 'left' | 'right';
  /**
   * Class applied to the content wrapper around `children`, between the
   * header and the page content. Every consuming page otherwise has to
   * remember its own padding — some do, some don't, and the ones that don't
   * end up flush against the sidebar/header chrome. Override to `''` for a
   * genuinely edge-to-edge page (a full-width table, a map/canvas).
   * @default "p-6"
   */
  contentClassName?: string;
}

// ─── Internal sub-components ──────────────────────────────────────────────────

/**
 * Shared by the two `size="lg"` buttons that bookend the sidebar (brand, user).
 * Both hold a 32px square — a logo badge, an avatar — so in the collapsed rail
 * they shrink to exactly that instead of the size's default 48px.
 *
 * `transition-[width,height]` drops `padding` from the transition while
 * collapsed, and is load-bearing: the base variant animates padding, but
 * `!max-w-8` clamps the button to 32px instantly (max-width isn't
 * transitionable), so a padding still animating 16px→0 leaves a 0px-wide
 * content box on the first frame and `overflow-hidden` clips the corner off
 * the 32px badge for the whole 150ms. Snapping padding makes it fit from frame
 * one. Expanding is deliberately left on the base transition — there width and
 * padding animate together and the content box never drops below 32px.
 */
const RAIL_SQUARE =
  'group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!min-w-8 group-data-[collapsible=icon]:!max-w-8 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:transition-[width,height]';

function NavUser({ user }: { user: AppShellUser }) {
  const { isMobile } = useSidebar();
  const uiMode = useUIMode();
  const avatarMode = uiMode !== 'default' ? (uiMode as 'playful' | 'smooth') : undefined;
  const initials = (user.name ?? user.email).slice(0, 2).toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              // Collapsed, this is a bare avatar with no affordance saying it
              // opens anything — every other item in the rail has a tooltip,
              // so its absence reads as "not a button".
              tooltip={user.name ?? user.email}
              className={cn(
                'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
                RAIL_SQUARE,
              )}
            >
              <Avatar mode={avatarMode} size="sm" className="grayscale">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name ?? user.email}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.plan ? `${user.plan} plan` : user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar mode={avatarMode} size="sm">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name ?? user.email}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {(user.onBilling || user.onNotifications) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {user.onBilling && (
                    <DropdownMenuItem onClick={user.onBilling}>
                      <CreditCardIcon />
                      Billing
                    </DropdownMenuItem>
                  )}
                  {user.onNotifications && (
                    <DropdownMenuItem onClick={user.onNotifications}>
                      <BellIcon />
                      Notifications
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </>
            )}
            {user.onSignOut && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={user.onSignOut}>
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ShellSidebar({
  brand,
  navItems,
  action,
  user,
  renderLink,
  collapsible,
  side,
  sidebarPosition,
}: {
  brand: AppShellBrand;
  navItems: AppNavItem[];
  action?: AppShellAction;
  user: AppShellUser;
  renderLink: AppShellRenderLink;
  collapsible: 'icon' | 'offcanvas' | 'none';
  side: 'left' | 'right';
  sidebarPosition: 'viewport' | 'contained';
}) {
  const fallbackLogo = typeof brand.name === 'string' ? brand.name.slice(0, 1).toUpperCase() : null;

  return (
    <Sidebar side={side} collapsible={collapsible} sidebarPosition={sidebarPosition}>
      <SidebarHeader className="py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              // No tooltip: unlike a nav item, the collapsed rail's logo is
              // still the logo — a hover label repeating the app's own name
              // is noise. Nav items keep theirs because a bare icon doesn't
              // say where it goes.
              className={RAIL_SQUARE}
            >
              {renderLink({
                href: brand.href ?? '#',
                children: (
                  <>
                    {brand.logo ? (
                      // Neutral slot: the consumer's logo owns its own chrome
                      // (background, radius). Sized to fill the collapsed icon rail.
                      <span className="flex size-8 shrink-0 items-center justify-center [&>svg]:size-5">
                        {brand.logo}
                      </span>
                    ) : (
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                        {fallbackLogo}
                      </span>
                    )}
                    <span className="min-w-0 truncate text-base font-semibold group-data-[collapsible=icon]:hidden">
                      {brand.name}
                    </span>
                  </>
                ),
              })}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            {action && (
              <SidebarMenu>
                <SidebarMenuItem>
                  {action.href ? (
                    <SidebarMenuButton
                      asChild
                      tooltip={action.label}
                      className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                    >
                      {renderLink({
                        href: action.href,
                        children: (
                          <>
                            {action.icon && <action.icon />}
                            <span>{action.label}</span>
                          </>
                        ),
                      })}
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      tooltip={action.label}
                      onClick={action.onClick}
                      className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                    >
                      {action.icon && <action.icon />}
                      <span>{action.label}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </SidebarMenu>
            )}

            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild tooltip={item.label} isActive={item.isActive}>
                    {renderLink({
                      href: item.href,
                      children: (
                        <>
                          <item.icon />
                          <span>{item.label}</span>
                        </>
                      ),
                    })}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

function ShellHeader({
  pageTitle,
  headerStart,
  headerEnd,
}: {
  pageTitle: string;
  headerStart?: ReactNode;
  headerEnd?: ReactNode;
}) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {headerStart && (
          <div className="flex items-center gap-1">
            {headerStart}
          </div>
        )}
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{pageTitle}</h1>
        {headerEnd && (
          <div className="ml-auto flex items-center gap-1">
            {headerEnd}
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Default placeholder values (keeps the shell renderable without required props) ─

const defaultBrand: AppShellBrand = {
  name: 'App',
  href: '#',
};

const defaultUser: AppShellUser = {
  name: 'User',
  email: 'user@example.com',
};

const defaultRenderLink: AppShellRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

// ─── Main export ──────────────────────────────────────────────────────────────

export function AppShell({
  brand = defaultBrand,
  navItems = [],
  action,
  user = defaultUser,
  pageTitle = 'Dashboard',
  headerStart,
  headerEnd,
  renderLink = defaultRenderLink,
  collapsible = 'icon',
  sidebarPosition = 'viewport',
  side = 'left',
  contentClassName = 'p-6',
  children,
}: AppShellProps = {}) {
  const isContained = sidebarPosition === 'contained';

  const inner = (
    <SidebarProvider
      layout={isContained ? 'embedded' : 'viewport'}
      className={isContained ? 'overflow-hidden' : 'h-svh overflow-hidden'}
    >
      <ShellSidebar
        brand={brand}
        navItems={navItems}
        action={action}
        user={user}
        renderLink={renderLink}
        collapsible={collapsible}
        side={side}
        sidebarPosition={sidebarPosition}
      />
      <SidebarInset className={isContained ? undefined : 'overflow-y-auto'}>
        <ShellHeader pageTitle={pageTitle} headerStart={headerStart} headerEnd={headerEnd} />
        <div className={contentClassName}>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );

  if (isContained) {
    return (
      <div className="relative flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden">
        {inner}
      </div>
    );
  }

  return inner;
}
