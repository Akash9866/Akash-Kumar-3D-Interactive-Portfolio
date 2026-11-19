import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { MetricSeriesConfig, PerformanceMetricPoint } from '../types';

export interface PerformanceMetricsChartProps {
  title?: string;
  subtitle?: string;
  dataStatus?: 'verified' | 'reported' | 'illustrative_template';
  dataStatusNote?: string;
  primarySeries?: MetricSeriesConfig;
  secondarySeries?: MetricSeriesConfig;
  data?: PerformanceMetricPoint[];
}

const DEFAULT_PRIMARY_SERIES: MetricSeriesConfig = {
  label: 'Click-Through Rate (CTR)',
  unit: '%',
  color: '#2563EB',
  description: 'Ad & content click-through rate progression',
};

const DEFAULT_SECONDARY_SERIES: MetricSeriesConfig = {
  label: 'Campaign ROI Growth',
  unit: '%',
  color: '#0F1A33',
  description: 'Return on investment index progression',
};

const DEFAULT_ILLUSTRATIVE_DATA: PerformanceMetricPoint[] = [
  { period: 'Month 1', primary: 1.4, secondary: 112 },
  { period: 'Month 2', primary: 1.9, secondary: 138 },
  { period: 'Month 3', primary: 2.3, secondary: 164 },
  { period: 'Month 4', primary: 2.8, secondary: 195 },
  { period: 'Month 5', primary: 3.2, secondary: 228 },
  { period: 'Month 6', primary: 3.7, secondary: 262 },
];

type MetricFilter = 'both' | 'primary' | 'secondary';
type ChartMode = 'area' | 'bar';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey?: string;
    name?: string;
    value?: number;
    color?: string;
  }>;
  label?: string;
  primarySeries: MetricSeriesConfig;
  secondarySeries: MetricSeriesConfig;
}

const ChartTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  primarySeries,
  secondarySeries,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-zinc-900 text-white px-3.5 py-2.5 rounded-lg shadow-lg border border-zinc-700 text-xs space-y-1.5">
      <p className="font-semibold text-zinc-200 border-b border-zinc-700 pb-1">
        {label}
      </p>
      {payload.map((entry) => {
        const isPrimary = entry.dataKey === 'primary';
        const series = isPrimary ? primarySeries : secondarySeries;
        return (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-zinc-300">{series.label}</span>
            <span className="font-mono tabular-nums font-semibold text-white">
              {entry.value}
              {series.unit}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const PerformanceMetricsChart: React.FC<PerformanceMetricsChartProps> = ({
  title = 'Performance Marketing Metrics — CTR & ROI Growth',
  subtitle = 'Time-series visualization tracking click-through efficiency and return on investment over sequential optimization cycles.',
  dataStatus = 'illustrative_template',
  dataStatusNote = 'CTR & ROI progression benchmark model.',
  primarySeries = DEFAULT_PRIMARY_SERIES,
  secondarySeries = DEFAULT_SECONDARY_SERIES,
  data = DEFAULT_ILLUSTRATIVE_DATA,
}) => {
  const [metricFilter, setMetricFilter] = useState<MetricFilter>('both');
  const [chartMode, setChartMode] = useState<ChartMode>('area');

  const summaryStats = useMemo(() => {
    if (!data || data.length === 0) {
      return null;
    }
    const first = data[0];
    const latest = data[data.length - 1];
    const primaryDelta = Number((latest.primary - first.primary).toFixed(2));
    const secondaryDelta = Number((latest.secondary - first.secondary).toFixed(2));

    return {
      firstPeriod: first.period,
      latestPeriod: latest.period,
      latestPrimary: latest.primary,
      latestSecondary: latest.secondary,
      primaryDelta,
      secondaryDelta,
    };
  }, [data]);

  const statusText =
    dataStatus === 'verified'
      ? 'Project Metrics'
      : dataStatus === 'reported'
        ? 'Field Observation Data'
        : 'Performance Benchmark Model';

  const showPrimary = metricFilter === 'both' || metricFilter === 'primary';
  const showSecondary = metricFilter === 'both' || metricFilter === 'secondary';

  return (
    <section
      aria-label={title}
      className="bg-white border border-zinc-200 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5"
    >
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1 max-w-lg">
          <p className="text-xs text-zinc-500">
            <span>Analytics Visualization</span>
            <span aria-hidden="true"> · </span>
            <span className="text-zinc-700 font-medium">{statusText}</span>
          </p>
          <h3 className="text-[15px] sm:text-lg font-semibold text-zinc-900 leading-snug">
            {title}
          </h3>
          <p className="text-[13px] sm:text-xs text-zinc-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Interactive Filter & Chart Type Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div
            role="group"
            aria-label="Select metrics to display"
            className="inline-flex items-center p-1 bg-zinc-100 rounded-lg max-w-full overflow-x-auto no-scrollbar"
          >
            <button
              type="button"
              onClick={() => setMetricFilter('both')}
              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                metricFilter === 'both'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Both
            </button>
            <button
              type="button"
              onClick={() => setMetricFilter('primary')}
              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                metricFilter === 'primary'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {primarySeries.label.split(' (')[0]}
            </button>
            <button
              type="button"
              onClick={() => setMetricFilter('secondary')}
              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                metricFilter === 'secondary'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              {secondarySeries.label.split(' (')[0]}
            </button>
          </div>

          <div
            role="group"
            aria-label="Select chart visualization style"
            className="inline-flex items-center p-1 bg-zinc-100 rounded-lg"
          >
            <button
              type="button"
              onClick={() => setChartMode('area')}
              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                chartMode === 'area'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Trend
            </button>
            <button
              type="button"
              onClick={() => setChartMode('bar')}
              className={`px-3 py-1.5 sm:px-2.5 sm:py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                chartMode === 'bar'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Bars
            </button>
          </div>
        </div>
      </div>

      {/* Unboxed Key Summary Strip */}
      {summaryStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-3 border-y border-zinc-200/80">
          <div>
            <p className="text-xs text-zinc-500">{primarySeries.label}</p>
            <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
              <span className="text-lg sm:text-xl font-semibold text-zinc-900 font-mono tabular-nums">
                {summaryStats.latestPrimary}
                {primarySeries.unit}
              </span>
              <span className="text-xs font-mono tabular-nums text-blue-700">
                {summaryStats.primaryDelta >= 0 ? '+' : ''}
                {summaryStats.primaryDelta}
                {primarySeries.unit} ({summaryStats.firstPeriod} →{' '}
                {summaryStats.latestPeriod})
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-zinc-500">{secondarySeries.label}</p>
            <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
              <span className="text-lg sm:text-xl font-semibold text-zinc-900 font-mono tabular-nums">
                {summaryStats.latestSecondary}
                {secondarySeries.unit}
              </span>
              <span className="text-xs font-mono tabular-nums text-zinc-700">
                {summaryStats.secondaryDelta >= 0 ? '+' : ''}
                {summaryStats.secondaryDelta}
                {secondarySeries.unit} ({summaryStats.firstPeriod} →{' '}
                {summaryStats.latestPeriod})
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recharts Visualization Canvas */}
      {data && data.length > 0 ? (
        <div className="w-full h-56 sm:h-72 pt-1">
          <ResponsiveContainer width="100%" height="100%">
            {chartMode === 'area' ? (
              <AreaChart
                data={data}
                margin={{ top: 8, right: 6, left: -16, bottom: 4 }}
              >
                <defs>
                  <linearGradient id="pmPrimaryFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={primarySeries.color}
                      stopOpacity={0.22}
                    />
                    <stop
                      offset="95%"
                      stopColor={primarySeries.color}
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                  <linearGradient id="pmSecondaryFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={secondarySeries.color}
                      stopOpacity={0.16}
                    />
                    <stop
                      offset="95%"
                      stopColor={secondarySeries.color}
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E4E4E7"
                />
                <XAxis
                  dataKey="period"
                  tick={{ fill: '#71717A', fontSize: 10 }}
                  axisLine={{ stroke: '#E4E4E7' }}
                  tickLine={false}
                />
                {showPrimary && (
                  <YAxis
                    yAxisId="left"
                    width={46}
                    tick={{ fill: '#71717A', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${val}${primarySeries.unit}`}
                  />
                )}
                {showSecondary && (
                  <YAxis
                    yAxisId="right"
                    width={46}
                    orientation={showPrimary ? 'right' : 'left'}
                    tick={{ fill: '#71717A', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${val}${secondarySeries.unit}`}
                  />
                )}
                <Tooltip
                  content={
                    <ChartTooltip
                      primarySeries={primarySeries}
                      secondarySeries={secondarySeries}
                    />
                  }
                />
                {showPrimary && (
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="primary"
                    name={primarySeries.label}
                    stroke={primarySeries.color}
                    strokeWidth={2.25}
                    fillOpacity={1}
                    fill="url(#pmPrimaryFill)"
                    activeDot={{ r: 5 }}
                  />
                )}
                {showSecondary && (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="secondary"
                    name={secondarySeries.label}
                    stroke={secondarySeries.color}
                    strokeWidth={2.25}
                    fillOpacity={1}
                    fill="url(#pmSecondaryFill)"
                    activeDot={{ r: 5 }}
                  />
                )}
              </AreaChart>
            ) : (
              <BarChart
                data={data}
                margin={{ top: 8, right: 6, left: -16, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E4E4E7"
                />
                <XAxis
                  dataKey="period"
                  tick={{ fill: '#71717A', fontSize: 10 }}
                  axisLine={{ stroke: '#E4E4E7' }}
                  tickLine={false}
                />
                {showPrimary && (
                  <YAxis
                    yAxisId="left"
                    width={46}
                    tick={{ fill: '#71717A', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${val}${primarySeries.unit}`}
                  />
                )}
                {showSecondary && (
                  <YAxis
                    yAxisId="right"
                    width={46}
                    orientation={showPrimary ? 'right' : 'left'}
                    tick={{ fill: '#71717A', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(val) => `${val}${secondarySeries.unit}`}
                  />
                )}
                <Tooltip
                  content={
                    <ChartTooltip
                      primarySeries={primarySeries}
                      secondarySeries={secondarySeries}
                    />
                  }
                />
                {showPrimary && (
                  <Bar
                    yAxisId="left"
                    dataKey="primary"
                    name={primarySeries.label}
                    fill={primarySeries.color}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                )}
                {showSecondary && (
                  <Bar
                    yAxisId="right"
                    dataKey="secondary"
                    name={secondarySeries.label}
                    fill={secondarySeries.color}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center text-xs text-zinc-500">
          No metric points available for this view.
        </div>
      )}

      {/* Legend & Verification Disclosure Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-zinc-200/80 text-xs text-zinc-500">
        <div className="flex flex-wrap items-center gap-4">
          {showPrimary && (
            <span className="inline-flex items-center gap-1.5 text-zinc-700">
              <span
                className="w-2.5 h-2.5 rounded-xs shrink-0"
                style={{ backgroundColor: primarySeries.color }}
              />
              <span>{primarySeries.label}</span>
            </span>
          )}
          {showSecondary && (
            <span className="inline-flex items-center gap-1.5 text-zinc-700">
              <span
                className="w-2.5 h-2.5 rounded-xs shrink-0"
                style={{ backgroundColor: secondarySeries.color }}
              />
              <span>{secondarySeries.label}</span>
            </span>
          )}
        </div>
        <span className="text-[11px] text-zinc-500">{dataStatusNote}</span>
      </div>
    </section>
  );
};
