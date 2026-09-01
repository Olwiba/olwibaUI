'use client';

import type { LucideIcon } from 'lucide-react';
import { useCallback, type CSSProperties, type ReactNode } from 'react';
import {
  BellIcon,
  BirdIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  PlusCircleIcon,
  SettingsIcon,
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
  /** Product-owned artwork shown when no avatar image exists. Defaults to the Olwiba bird. */
  avatarFallback?: ReactNode;
  /** Displayed as a sub-label (e.g. plan tier). */
  plan?: string;
  onSignOut?: () => void;
  onBilling?: () => void;
  onNotifications?: () => void;
  onSettings?: () => void;
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

/**
 * One step in the header location trail. A bare string is a plain label; give
 * it an `href` to make it walkable. The final crumb is the current route and is
 * never rendered as a link.
 */
export type AppShellBreadcrumb = string | { label: string; href?: string };

export interface AppShellProps {
  brand?: AppShellBrand;
  navItems?: AppNavItem[];
  /** Primary CTA rendered above nav (e.g. "New project", "Quick create") */
  action?: AppShellAction;
  user?: AppShellUser;
  /**
   * Location context shown in the top header bar. This is app chrome, not the
   * page address — the page (or its page pattern) owns the `<h1>`. Repeating
   * the page title here prints the same words twice on every route.
   */
  pageTitle?: string;
  /**
   * Where the current route sits in the app, e.g.
   * `[{ label: "Admin", href: "/admin" }, "Users"]`. Rendered as a muted trail
   * and preferred over `pageTitle` when supplied.
   */
  breadcrumbs?: AppShellBreadcrumb[];
  /** Slot rendered at the start of the top header bar, after the sidebar trigger. */
  headerStart?: ReactNode;
  /** Slot rendered at the end of the top header bar. */
  headerEnd?: ReactNode;
  /**
   * App chrome rendered after the page outlet — normally an `AppFooter`. This
   * belongs to the shell, not to a page pattern: otherwise every route
   * re-declares it and height-filling pages fight it for the remaining space.
   */
  footer?: ReactNode;
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

/**
 * A stable miniature identity artwork, instead of one grey square or a pair
 * of initials for everybody.
 *
 * FNV-1a gives the same unsigned hash for the same name/email on every device.
 * Different byte ranges choose three hues and the gradient angle, so nearby
 * names do not merely receive nearby shades of the same two-colour gradient.
 *
 * Lightness stays in a bounded range so the white bird remains legible. The
 * radial highlight supplies depth without adding a fourth random colour.
 */
function identityGradient(seed: string): CSSProperties {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  hash >>>= 0;

  const firstHue = hash % 360;
  const secondHue = (firstHue + 55 + ((hash >>> 8) % 70)) % 360;
  const thirdHue = (firstHue + 190 + ((hash >>> 16) % 110)) % 360;
  const angleHash = Math.imul(hash ^ (hash >>> 15), 2246822519) >>> 0;
  const angle = angleHash % 360;

  return {
    backgroundImage: [
      `radial-gradient(circle at 28% 18%, oklch(0.94 0.06 ${thirdHue} / 0.78), transparent 34%)`,
      `linear-gradient(${angle}deg, oklch(0.68 0.18 ${firstHue}), oklch(0.55 0.2 ${secondHue}) 52%, oklch(0.62 0.18 ${thirdHue}))`,
    ].join(', '),
    color: 'oklch(0.98 0 0)',
  };
}

function NavUser({ user }: { user: AppShellUser }) {
  const { isMobile } = useSidebar();
  const uiMode = useUIMode();
  const avatarMode = uiMode !== 'default' ? (uiMode as 'playful' | 'smooth') : undefined;
  const identitySeed = `${user.name?.trim().toLocaleLowerCase() ?? ''}|${user.email.toLocaleLowerCase()}`;
  const identityTint = identityGradient(identitySeed);

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
              <Avatar mode={avatarMode} size="sm">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                <AvatarFallback className="text-white" style={identityTint}>
                  {user.avatarFallback ?? (
                    <BirdIcon
                      aria-hidden
                      className="size-5 drop-shadow-[0_1px_1px_rgb(0_0_0/0.3)]"
                    />
                  )}
                </AvatarFallback>
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
                  <AvatarFallback className="text-white" style={identityTint}>
                    {user.avatarFallback ?? (
                      <BirdIcon
                        aria-hidden
                        className="size-5 drop-shadow-[0_1px_1px_rgb(0_0_0/0.3)]"
                      />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name ?? user.email}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            {(user.onBilling || user.onNotifications || user.onSettings) && (
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
                  {user.onSettings && (
                    <DropdownMenuItem onClick={user.onSettings}>
                      <SettingsIcon />
                      Settings
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
  const { isMobile, setOpenMobile } = useSidebar();
  const closeMobileMenu = useCallback(() => {
    if (isMobile) setOpenMobile(false);
  }, [isMobile, setOpenMobile]);

  return (
    <Sidebar side={side} collapsible={collapsible} sidebarPosition={sidebarPosition}>
      <SidebarHeader className="py-3">
        <SidebarMenu>
          <SidebarMenuItem onClickCapture={closeMobileMenu}>
            {/* Not a link, and not a button.

                It used to navigate to `brand.href`, which duplicated the
                Dashboard nav item sitting directly beneath it — and because it
                was a SidebarMenuButton it also lit up on hover, advertising an
                interaction whose only outcome was a destination already on
                screen. A masthead identifies; the nav navigates.

                `brand.href` is kept on the type and still used by Navbar and
                Footer, where the lockup is genuinely the way home. */}
            <div
              className={cn(
                'flex items-center gap-2 overflow-hidden rounded-md p-2 text-left',
                RAIL_SQUARE,
              )}
            >
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
              {/* Exactly the trim Navbar's lockup uses — `ex alphabetic`, both
                  edges — because anything else is not centred. An `ex text`
                  under edge keeps the font's descender space below the baseline,
                  so the ink sits in the top of the box and centring the box puts
                  the name high.

                  What that costs is descender clipping, since an alphabetic
                  under edge puts the box bottom on the baseline and this span
                  used to carry `truncate` (`overflow: hidden`). So the clipping
                  moves off this element: the parent already has
                  `overflow-hidden` and is 32px tall — sized by the badge — so a
                  long name is cut there, where there is room to spare below the
                  baseline, instead of here where there is none.

                  The trade is the ellipsis. A name too long for the sidebar now
                  ends at the edge rather than in "…". Worth it: every name is
                  aligned, and only an overlong one loses the affordance. */}
              <span className="min-w-0 whitespace-nowrap text-base font-semibold leading-none [text-box-edge:ex_alphabetic] [text-box-trim:trim-both] group-data-[collapsible=icon]:hidden">
                {brand.name}
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            {action && (
              <SidebarMenu>
                <SidebarMenuItem onClickCapture={closeMobileMenu}>
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
                <SidebarMenuItem key={item.label} onClickCapture={closeMobileMenu}>
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
  breadcrumbs,
  headerStart,
  headerEnd,
  renderLink,
}: {
  pageTitle?: string;
  breadcrumbs?: AppShellBreadcrumb[];
  headerStart?: ReactNode;
  headerEnd?: ReactNode;
  renderLink: AppShellRenderLink;
}) {
  // App chrome states location, the page states its own name. This used to be
  // an <h1>, which meant every page rendering its own heading shipped two of
  // them and printed the same words twice.
  const source: AppShellBreadcrumb[] = breadcrumbs?.length
    ? breadcrumbs
    : pageTitle
      ? [pageTitle]
      : [];
  const trail = source.map((crumb) =>
    typeof crumb === 'string' ? { label: crumb, href: undefined } : crumb,
  );

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {headerStart && (
          <div className="flex items-center gap-1">
            {headerStart}
          </div>
        )}
        {trail.length > 0 && (
          <>
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
              {trail.map((crumb, index) => {
                const isCurrent = index === trail.length - 1;
                // The last crumb is where you already are, so it stays inert
                // even when the consumer hands it an href.
                const isLink = !isCurrent && Boolean(crumb.href);

                return (
                  <span
                    className="flex min-w-0 items-center gap-1.5"
                    key={`${crumb.label}-${index}`}
                  >
                    {index > 0 && (
                      <span aria-hidden="true" className="text-muted-foreground/60">
                        /
                      </span>
                    )}
                    {isLink ? (
                      renderLink({
                        href: crumb.href as string,
                        className:
                          'truncate rounded-sm text-muted-foreground transition-colors hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        children: crumb.label,
                      })
                    ) : (
                      <span
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(
                          'truncate',
                          isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </span>
                );
              })}
            </nav>
          </>
        )}
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
  pageTitle,
  breadcrumbs,
  footer,
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
      <SidebarInset className="overflow-y-auto">
        <ShellHeader
          pageTitle={pageTitle}
          breadcrumbs={breadcrumbs}
          headerStart={headerStart}
          headerEnd={headerEnd}
          renderLink={renderLink}
        />
        {/* The shell owns the height chain so routes never have to reconstruct
            it. `grow` fills the shell on a short page, which settles the footer
            at the bottom; `shrink-0` with an auto basis means a long page keeps
            its intrinsic height and scrolls instead of spilling over the
            footer. `flex flex-col` + `min-h-0` is what lets a route opt into
            filling the leftover height with `flex-1` on its own root.

            This cannot be left to the consumer: a route passing `flex-1` here
            gets basis 0, which ignores content height entirely. */}
        <div className={cn('flex min-h-0 grow shrink-0 flex-col', contentClassName)}>
          {children}
        </div>
        {footer && <div className="shrink-0">{footer}</div>}
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
