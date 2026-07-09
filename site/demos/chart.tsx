'use client';
import { Chart } from '@olwiba/ui';

const revenue = [
  { month: 'Jan', mrr: 4200, costs: 2800 },
  { month: 'Feb', mrr: 4900, costs: 2900 },
  { month: 'Mar', mrr: 5600, costs: 3100 },
  { month: 'Apr', mrr: 5400, costs: 3300 },
  { month: 'May', mrr: 6800, costs: 3400 },
  { month: 'Jun', mrr: 7900, costs: 3600 },
];

const signups = [
  { week: 'W1', count: 132 },
  { week: 'W2', count: 187 },
  { week: 'W3', count: 156 },
  { week: 'W4', count: 231 },
];

const plans = [
  { plan: 'Free', users: 1240 },
  { plan: 'Pro', users: 480 },
  { plan: 'Team', users: 190 },
  { plan: 'Enterprise', users: 36 },
];

export default function Demo() {
  return (
    <div className="mx-auto grid max-w-4xl gap-10 p-8">
      <div>
        <p className="mb-3 text-sm font-medium">Revenue vs costs</p>
        <Chart
          type="line"
          data={revenue}
          xKey="month"
          series={[
            { key: 'mrr', label: 'MRR' },
            { key: 'costs', label: 'Costs' },
          ]}
          valueFormatter={(v) => `$${v.toLocaleString()}`}
        />
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-medium">Weekly signups</p>
          <Chart type="bar" data={signups} xKey="week" series={[{ key: 'count', label: 'Signups' }]} height={220} />
        </div>
        <div>
          <p className="mb-3 text-sm font-medium">Users by plan</p>
          <Chart type="donut" data={plans} xKey="plan" series={[{ key: 'users' }]} height={220} />
        </div>
      </div>
    </div>
  );
}
