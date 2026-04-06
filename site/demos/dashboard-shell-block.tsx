import { DashboardShellBlock } from '@/blocks';

export default function DashboardShellBlockDemo() {
  return (
    <div className="h-full min-h-0 w-full max-w-[1400px]">
      {/* contained: rail is absolute within this shell; provider uses layout=embedded + sandbox height */}
      <DashboardShellBlock sidebarPosition="contained" />
    </div>
  );
}
