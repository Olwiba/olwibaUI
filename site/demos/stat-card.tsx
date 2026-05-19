'use client';
import { StatCard } from '@olwiba/ui';

export default function Demo() {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-3">
      <StatCard label="Monthly revenue" value="£24,200" delta="+12%" trend="up" description="vs last month" />
      <StatCard label="Active users" value="3,841" delta="+4%" trend="up" description="past 30 days" />
      <StatCard label="Churn rate" value="1.8%" delta="+0.3%" trend="down" description="rolling 90 days" />
    </div>
  );
}
