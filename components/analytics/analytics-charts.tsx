"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { ChartContainer } from "@/components/ui/chart-container";
import { useStadium } from "@/hooks/use-stadium";
import {
  chartGridStroke,
  chartPrimary,
  chartSuccess,
  chartTickFill,
  chartTooltipStyle,
} from "@/lib/chart-styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const hourlyData = [
  { hour: "18:00", density: 42 },
  { hour: "19:00", density: 68 },
  { hour: "20:00", density: 85 },
  { hour: "21:00", density: 78 },
  { hour: "22:00", density: 55 },
];

const evacData = [
  { sector: "North", probability: 96 },
  { sector: "East", probability: 88 },
  { sector: "South", probability: 72 },
  { sector: "West", probability: 91 },
];

export function AnalyticsCharts() {
  const { snapshot } = useStadium();
  const throughput = snapshot.gates.map((g) => ({
    gate: g.name.split("—")[0]?.trim().slice(0, 6) ?? g.id,
    throughput: g.throughput,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Panel>
        <PanelHeader title="Density trend" description="Match-day hourly" />
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
              <XAxis dataKey="hour" tick={{ fill: chartTickFill, fontSize: 11 }} />
              <YAxis tick={{ fill: chartTickFill, fontSize: 11 }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line
                type="monotone"
                dataKey="density"
                stroke={chartPrimary}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Panel>

      <Panel>
        <PanelHeader title="Gate throughput" description="Fans per minute" />
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={throughput}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
              <XAxis dataKey="gate" tick={{ fill: chartTickFill, fontSize: 10 }} />
              <YAxis tick={{ fill: chartTickFill, fontSize: 11 }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="throughput" fill={chartPrimary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Panel>

      <Panel>
        <PanelHeader
          title="Evacuation readiness"
          description="Success probability by sector"
        />
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evacData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: chartTickFill, fontSize: 11 }}
              />
              <YAxis
                dataKey="sector"
                type="category"
                tick={{ fill: chartTickFill, fontSize: 11 }}
                width={56}
              />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="probability" fill={chartSuccess} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Panel>

      <Panel>
        <PanelHeader title="AI metrics" description="Live scores" />
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-sky-100 bg-sky-50 p-6 text-center">
            <p className="text-3xl font-semibold tabular-nums text-sky-600">
              {snapshot.aiConfidence.toFixed(1)}%
            </p>
            <p className="mt-1 text-xs text-slate-500">AI confidence</p>
          </div>
          <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-center">
            <p className="text-3xl font-semibold tabular-nums text-red-600">
              {snapshot.crowdStressScore}
            </p>
            <p className="mt-1 text-xs text-slate-500">Crowd stress</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
