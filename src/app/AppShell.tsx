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
}

// ─── Internal sub-components ──────────────────────────────────────────────────

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
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
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
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user.onBilling && (
                <DropdownMenuItem onClick={user.onBilling}>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
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
  return (
    <Sidebar side={side} collapsible={collapsible} sidebarPosition={sidebarPosition}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              {renderLink({
                href: brand.href ?? '#',
                children: (
                  <>
                    {brand.logo}
                    <span className="text-base font-semibold">{brand.name}</span>
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

function ShellHeader({ pageTitle, headerStart }: { pageTitle: string; headerStart?: ReactNode }) {
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
  renderLink = defaultRenderLink,
  collapsible = 'icon',
  sidebarPosition = 'viewport',
  side = 'left',
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
        <ShellHeader pageTitle={pageTitle} headerStart={headerStart} />
        {children}
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
