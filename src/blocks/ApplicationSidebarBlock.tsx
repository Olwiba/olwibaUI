'use client';

import {
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  FolderKanban,
  Home,
  LayoutDashboard,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from '@olwiba/cn';

const primaryItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true, badge: 'Overview' },
  { icon: FolderKanban, label: 'Projects', starred: true },
  { icon: FileText, label: 'Documents' },
  { icon: Users, label: 'People' },
];

const sections = [
  { label: 'Projects', items: ['Design engineering', 'Sales website', 'Travel app'] },
  { label: 'Workspace', items: ['Members', 'Permissions', 'Invites'] },
];

const shortcuts = [
  { icon: Home, label: 'Home' },
  { icon: LayoutDashboard, label: 'Dashboards' },
  { icon: FolderKanban, label: 'Projects' },
  { icon: FileText, label: 'Documents' },
];

const stats = [
  { label: 'Active projects', value: '12', delta: '+2' },
  { label: 'Open tasks', value: '28', delta: '+6' },
  { label: 'Completion', value: '84%', delta: '+5%' },
];

export function ApplicationSidebarBlock() {
  return (
    <SidebarProvider defaultOpen className="h-full min-h-0">
      <section className="h-full w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="flex h-full w-full overflow-hidden">
          <Sidebar collapsible="none" variant="sidebar">
            <SidebarHeader className="gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">Olwiba Workspace</div>
                    <div className="truncate text-xs text-muted-foreground">Application chrome</div>
                  </div>
                </div>
                <Button size="icon" variant="ghost" className="size-8">
                  <Bell className="size-4" />
                </Button>
              </div>
              <SidebarInput placeholder="Search projects, docs, and people..." />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Shortcuts</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {shortcuts.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton tooltip={item.label}>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupAction aria-label="Add workspace view">
                  <Plus className="size-4" />
                </SidebarGroupAction>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {primaryItems.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton isActive={item.active} tooltip={item.label}>
                          <item.icon />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                        {item.starred ? (
                          <SidebarMenuAction showOnHover aria-label="Star workspace">
                            <Star className="size-4" />
                          </SidebarMenuAction>
                        ) : null}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Sections</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sections.map((section) => (
                      <Collapsible key={section.label} defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={section.label}>
                              <BriefcaseBusiness />
                              <span>{section.label}</span>
                              <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {section.items.map((item, index) => (
                                <SidebarMenuSubItem key={item}>
                                  <SidebarMenuSubButton href="#" isActive={index === 0}>
                                    {item}
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="gap-3">
              <Button variant="ghost" className="h-auto justify-start px-2 py-2">
                <Avatar className="mr-3 size-8">
                  <AvatarImage alt="Olivia Reed" src="https://ui.shadcn.com/avatars/01.png" />
                  <AvatarFallback>OR</AvatarFallback>
                </Avatar>
                <div className="min-w-0 text-left">
                  <div className="truncate text-sm font-medium">Olivia Reed</div>
                  <div className="truncate text-xs text-muted-foreground">olivia@olwiba.com</div>
                </div>
              </Button>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className="flex h-full min-h-0 flex-col overflow-hidden">
              <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-2">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Application sidebar</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative hidden min-w-64 md:block">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Search projects, docs, and people..." />
                  </div>
                  <Separator orientation="vertical" className="hidden h-5 sm:block" />
                  <Button size="sm">New project</Button>
                </div>
              </header>
              <div className="flex-1 overflow-auto p-4 sm:p-6">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="mb-2">
                        <Badge variant="secondary">Application chrome</Badge>
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight">Sidebar shell for app navigation</h2>
                      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                        A workspace sidebar with grouped navigation, nested sections, and a structured header area.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border bg-card p-4">
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                        <div className="mt-3 flex items-end justify-between gap-3">
                          <div className="text-2xl font-semibold">{stat.value}</div>
                          <Badge variant="secondary">{stat.delta}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="space-y-4 rounded-2xl border bg-card p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">Current initiatives</h3>
                          <p className="text-sm text-muted-foreground">The main content region stays independent from the app chrome.</p>
                        </div>
                        <Button variant="outline" size="sm">View all</Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        {['Redesign navigation states', 'Ship docs block previews', 'Refine onboarding flow', 'Audit permissions model'].map((item) => (
                          <div key={item} className="rounded-xl border border-dashed bg-muted/40 p-4 text-sm">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 rounded-2xl border bg-card p-4">
                      <div>
                        <h3 className="font-semibold">Workspace notes</h3>
                        <p className="text-sm text-muted-foreground">Compact secondary panel content to the right of the main workspace area.</p>
                      </div>
                      <div className="space-y-3">
                        {['Review release checklist', 'Confirm billing contacts', 'Share latest prototype'].map((item) => (
                          <div key={item} className="rounded-xl border border-dashed bg-muted/40 p-3 text-sm">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </section>
    </SidebarProvider>
  );
}
