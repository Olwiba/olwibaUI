'use client';

import { SidebarInset, SidebarProvider } from '@olwiba/cn';
import type { ReactNode } from 'react';

export interface DashboardLayoutProps {
  /** The sidebar component to render — typically your AppSidebar */
  sidebar: ReactNode;
  /** Page content rendered in the main area */
  children: ReactNode;
  /**
   * When true (default), the layout is constrained to the viewport height and
   * content scrolls internally. Set to false to let the page scroll naturally.
   */
  fullPage?: boolean;
}

/**
 * DashboardLayout
 *
 * Composable full-page dashboard shell. Wraps SidebarProvider + SidebarInset
 * with correct height and scroll behaviour so consumers don't need to wire
 * this up manually.
 *
 * @example
 * ```tsx
 * <DashboardLayout sidebar={<AppSidebar />}>
 *   <main>...</main>
 * </DashboardLayout>
 * ```
 */
export function DashboardLayout({
  sidebar,
  children,
  fullPage = true,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider className={fullPage ? 'h-svh overflow-hidden' : undefined}>
      {sidebar}
      <SidebarInset className={fullPage ? 'overflow-y-auto' : undefined}>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
