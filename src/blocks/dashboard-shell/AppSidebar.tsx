'use client';

import * as React from 'react';
import {
  ArrowUpCircleIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  BarChartIcon,
} from 'lucide-react';
import { NavDocuments } from './NavDocuments';
import { NavMain } from './NavMain';
import { NavSecondary } from './NavSecondary';
import { NavUser } from './NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@olwiba/cn';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    { title: 'Dashboard', url: '#', icon: LayoutDashboardIcon },
    { title: 'Lifecycle', url: '#', icon: ListIcon },
    { title: 'Analytics', url: '#', icon: BarChartIcon },
    { title: 'Projects', url: '#', icon: FolderIcon },
    { title: 'Team', url: '#', icon: UsersIcon },
  ],
  navSecondary: [
    { title: 'Settings', url: '#', icon: SettingsIcon },
    { title: 'Get Help', url: '#', icon: HelpCircleIcon },
    { title: 'Search', url: '#', icon: SearchIcon },
  ],
  documents: [
    { name: 'Data Library', url: '#', icon: DatabaseIcon },
    { name: 'Reports', url: '#', icon: ClipboardListIcon },
    { name: 'Word Assistant', url: '#', icon: FileIcon },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
