'use client';

import { SidebarInset, SidebarProvider, Toaster } from '@olwiba/cn';
import { AppSidebar } from './dashboard-shell/AppSidebar';
import { ChartAreaInteractive } from './dashboard-shell/ChartAreaInteractive';
import { dashboardTableData } from './dashboard-shell/data';
import { DataTable } from './dashboard-shell/DataTable';
import { SectionCards } from './dashboard-shell/SectionCards';
import { SiteHeader } from './dashboard-shell/SiteHeader';

export function DashboardShellBlock() {
  return (
    <SidebarProvider>
      <section className="w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="flex min-h-[880px] w-full overflow-hidden">
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
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
          </SidebarInset>
        </div>
      </section>
      <Toaster />
    </SidebarProvider>
  );
}
