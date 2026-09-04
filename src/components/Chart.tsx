'use client';

import * as React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@olwiba/cn';

export interface ChartSeries {
  /** Data key to plot. */
  key: string;
  /** Legend and tooltip label. @default key */
  label?: string;
  /** CSS color. @default theme tokens --chart-1..5 in fixed order */
  color?: string;
}

export interface ChartProps {
  /** Chart form. @default 'line' */
  type?: 'line' | 'area' | 'bar' | 'donut';
  data: Array<Record<string, string | number>>;
  /** Key for x-axis categories (line/area/bar) or slice labels (donut). */
  xKey: string;
  /** Series to plot. Donut uses `series[0].key` as the slice value. */
  series: ChartSeries[];
  /** Chart height in px. @default 300 */
  height?: number;
  /** Horizontal grid lines. @default true (ignored for donut) */
  grid?: boolean;
  /** Legend. @default true for multiple series or donut, false for one series */
  legend?: boolean;
  /**
   * Stack series instead of overlaying them. Area and bar only — a stacked
   * line is a shape people misread as absolute values.
   *
   * Off by default: stacking answers "what does the total split into", and
   * silently switching a two-series comparison to it would change what an
   * existing chart claims.
   */
  stacked?: boolean;
  /**
   * Formats x-axis ticks. Separate from `valueFormatter`, which formats the
   * measured value — an axis of ISO dates wants shortening without changing
   * what the tooltip reports.
   */
  xTickFormatter?: (value: string) => string;
  /**
   * Fixes the y-axis range. Without it recharts scales to the data, which for
   * a percentage series makes a 98-100%% band fill the plot and read as
   * volatility.
   */
  yDomain?: [number, number];
  /** Formats values in tooltips and the y-axis, e.g. `(v) => \`$${v}\``. */
  valueFormatter?: (value: number) => string;
  className?: string;
}

// Fixed categorical order — series N always gets token N, never cycled.
const TOKEN_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

const seriesColor = (s: ChartSeries, i: number) => s.color ?? TOKEN_COLORS[i % TOKEN_COLORS.length];

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string; color?: string; payload?: { fill?: string } }>;
  label?: string | number;
  valueFormatter: (value: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md">
      {label !== undefined && <p className="mb-1 font-medium">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              aria-hidden
              className="size-2 shrink-0 rounded-full"
              style={{ background: entry.color ?? entry.payload?.fill }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto pl-3 font-medium tabular-nums">
              {typeof entry.value === 'number' ? valueFormatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartLegend({ entries }: { entries: Array<{ label: string; color: string }> }) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
      {entries.map((entry) => (
        <div key={entry.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span aria-hidden className="size-2 rounded-full" style={{ background: entry.color }} />
          {entry.label}
        </div>
      ))}
    </div>
  );
}

const axisProps = {
  tickLine: false,
  axisLine: false,
  tick: { fill: 'var(--muted-foreground)', fontSize: 12 },
  tickMargin: 8,
} as const;

/**
 * Theme-aware chart — one component, `type` switches the form. Colors come
 * from the `--chart-1..5` theme tokens in fixed order (override per series
 * via `color`). Line and area for change-over-time, bar for magnitude
 * comparison, donut for part-of-whole identity. More than 5 donut slices:
 * fold the tail into an "Other" slice in your data instead of adding hues.
 */
export function Chart({
  type = 'line',
  data,
  xKey,
  series,
  height = 300,
  grid = true,
  legend,
  stacked = false,
  xTickFormatter,
  yDomain,
  valueFormatter = (v) => String(v),
  className,
}: ChartProps) {
  const showLegend = legend ?? (type === 'donut' || series.length > 1);
  const tooltip = (
    <Tooltip
      cursor={type === 'bar' ? { fill: 'var(--muted)', opacity: 0.4 } : { stroke: 'var(--border)' }}
      content={<ChartTooltip valueFormatter={valueFormatter} />}
    />
  );
  const gridEl = grid ? (
    <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.6} />
  ) : null;

  let chart: React.ReactElement;
  let legendEntries: Array<{ label: string; color: string }>;

  if (type === 'donut') {
    const valueKey = series[0]?.key;
    legendEntries = data.map((row, i) => ({
      label: String(row[xKey]),
      color: TOKEN_COLORS[i % TOKEN_COLORS.length],
    }));
    chart = (
      <PieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={xKey}
          innerRadius="60%"
          outerRadius="85%"
          paddingAngle={2}
          stroke="var(--card)"
          strokeWidth={2}
        >
          {data.map((row, i) => (
            <Cell key={String(row[xKey])} fill={TOKEN_COLORS[i % TOKEN_COLORS.length]} />
          ))}
        </Pie>
        {tooltip}
      </PieChart>
    );
  } else {
    legendEntries = series.map((s, i) => ({ label: s.label ?? s.key, color: seriesColor(s, i) }));

    if (type === 'bar') {
      chart = (
        <BarChart data={data} barCategoryGap="25%">
          {gridEl}
          <XAxis dataKey={xKey} {...axisProps} tickFormatter={xTickFormatter} />
          <YAxis {...axisProps} width={48} domain={yDomain} tickFormatter={valueFormatter} />
          {tooltip}
          {series.map((s, i) => (
            <Bar
              stackId={stacked ? 'stack' : undefined}
              key={s.key}
              dataKey={s.key}
              name={s.label ?? s.key}
              fill={seriesColor(s, i)}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          ))}
        </BarChart>
      );
    } else if (type === 'area') {
      chart = (
        <AreaChart data={data}>
          {gridEl}
          <XAxis dataKey={xKey} {...axisProps} tickFormatter={xTickFormatter} />
          <YAxis {...axisProps} width={48} domain={yDomain} tickFormatter={valueFormatter} />
          {tooltip}
          {series.map((s, i) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              // One shared id is what makes recharts stack rather than
              // overlay; undefined leaves the existing behaviour untouched.
              stackId={stacked ? 'stack' : undefined}
              stroke={seriesColor(s, i)}
              strokeWidth={2}
              fill={seriesColor(s, i)}
              // Overlaid areas must stay translucent so the ones behind show
              // through. Stacked bands never overlap, and at 0.12 they are too
              // faint to tell apart.
              fillOpacity={stacked ? 0.35 : 0.12}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </AreaChart>
      );
    } else {
      chart = (
        <LineChart data={data}>
          {gridEl}
          <XAxis dataKey={xKey} {...axisProps} tickFormatter={xTickFormatter} />
          <YAxis {...axisProps} width={48} domain={yDomain} tickFormatter={valueFormatter} />
          {tooltip}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={seriesColor(s, i)}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      );
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {chart}
        </ResponsiveContainer>
      </div>
      {showLegend && <ChartLegend entries={legendEntries} />}
    </div>
  );
}
