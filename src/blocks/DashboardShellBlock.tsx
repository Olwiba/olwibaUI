'use client';

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  BellIcon,
  CreditCardIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  LogOutIcon,
  MoreVerticalIcon,
  PlusCircleIcon,
  UsersIcon,
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
import { ChartAreaInteractive } from './dashboard-shell/ChartAreaInteractive';
import { dashboardTableData } from './dashboard-shell/data';
import { DataTable } from './dashboard-shell/DataTable';
import { SectionCards } from './dashboard-shell/SectionCards';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface DashboardNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface DashboardShellAction {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DashboardShellUser {
  email: string;
  name?: string;
  avatar?: string;
  /** Displayed below email. e.g. "free", "pro" */
  plan?: string;
  onSignOut?: () => void;
  onBilling?: () => void;
}

export interface DashboardShellBrand {
  /** Text or ReactNode shown as the app name */
  name: ReactNode;
  /** Icon/logo rendered before the name */
  logo?: ReactNode;
  /** href the brand header links to */
  href?: string;
}

/**
 * Render a link. Receives href + children — return any element.
 * Default: native <a>. Override to use your router's Link component.
 */
export type DashboardRenderLink = (props: {
  href: string;
  children: ReactNode;
  className?: string;
}) => ReactNode;

export interface DashboardShellBlockProps {
  brand?: DashboardShellBrand;
  navItems?: DashboardNavItem[];
  /** Primary CTA shown above nav items (e.g. "Add monitor", "Quick Create") */
  action?: DashboardShellAction;
  user?: DashboardShellUser;
  /** Page title shown in the top header bar */
  pageTitle?: string;
  /**
   * Override link rendering for SPA navigation.
   * @example renderLink={({ href, children }) => <Link to={href}>{children}</Link>}
   */
  renderLink?: DashboardRenderLink;
  children?: ReactNode;
  /**
   * Wrap in a rounded demo card — use in docs sandboxes.
   * @default false
   */
  demo?: boolean;
}

// ─── Demo defaults (shown when props are omitted — keeps docs working) ─────────

const defaultBrand: DashboardShellBrand = {
  name: 'Acme Inc.',
  logo: <ArrowUpCircleIcon className="h-5 w-5" />,
  href: '#',
};

const defaultNavItems: DashboardNavItem[] = [
  { icon: LayoutDashboardIcon, label: 'Dashboard', href: '#', isActive: true },
  { icon: ListIcon, label: 'Lifecycle', href: '#' },
  { icon: BarChartIcon, label: 'Analytics', href: '#' },
  { icon: FolderIcon, label: 'Projects', href: '#' },
  { icon: UsersIcon, label: 'Team', href: '#' },
];

const defaultAction: DashboardShellAction = {
  icon: PlusCircleIcon,
  label: 'Quick Create',
  href: '#',
};

const defaultUser: DashboardShellUser = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
  plan: 'pro',
};

const defaultRenderLink: DashboardRenderLink = ({ href, children, className }) => (
  <a href={href} className={className}>{children}</a>
);

// ─── Internal sub-components ──────────────────────────────────────────────────

function ShellNavUser({ user }: { user: DashboardShellUser }) {
  const { isMobile } = useSidebar();
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
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
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
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
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
}: {
  brand: DashboardShellBrand;
  navItems: DashboardNavItem[];
  action?: DashboardShellAction;
  user: DashboardShellUser;
  renderLink: DashboardRenderLink;
}) {
  return (
    <Sidebar collapsible="offcanvas">
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
                            <action.icon />
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
                      <action.icon />
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
        <ShellNavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

function ShellHeader({ pageTitle }: { pageTitle: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  );
}

function DemoContent() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={[...dashboardTableData]} />
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DashboardShellBlock({
  brand = defaultBrand,
  navItems = defaultNavItems,
  action = defaultAction,
  user = defaultUser,
  pageTitle = 'Dashboard',
  renderLink = defaultRenderLink,
  children,
  demo = false,
}: DashboardShellBlockProps = {}) {
  const content = children ?? <DemoContent />;

  const inner = (
    <SidebarProvider className={demo ? undefined : 'h-svh overflow-hidden'}>
      <ShellSidebar
        brand={brand}
        navItems={navItems}
        action={action}
        user={user}
        renderLink={renderLink}
      />
      <SidebarInset className={demo ? undefined : 'overflow-y-auto'}>
        <ShellHeader pageTitle={pageTitle} />
        {content}
      </SidebarInset>
    </SidebarProvider>
  );

  if (demo) {
    return (
      <section className="w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="flex min-h-[880px] w-full overflow-hidden">
          {inner}
        </div>
      </section>
    );
  }

  return inner;
}
