'use client';
import { CountUp } from '@olwiba/ui';

const stats = [
  { to: 12400, prefix: '£', suffix: '', decimals: 0, label: 'Revenue' },
  { to: 98.6, prefix: '', suffix: '%', decimals: 1, label: 'Uptime' },
  { to: 3200, prefix: '', suffix: '+', decimals: 0, label: 'Users' },
];

export default function Demo() {
  return (
    <div className="grid grid-cols-3 gap-4 p-8 text-center">
      {stats.map(({ to, prefix, suffix, decimals, label }) => (
        <div key={label} className="rounded-2xl border bg-card p-6">
          <div className="text-3xl font-bold tabular-nums">
            <CountUp to={to} prefix={prefix} suffix={suffix} decimals={decimals} duration={1800} />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{label}</div>
        </div>
      ))}
    </div>
  );
}
