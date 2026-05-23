"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
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
  { hour: "18:00", density: 42, incidents: 0 },
  { hour: "19:00", density: 68, incidents: 1 },
  { hour: "20:00", density: 85, incidents: 2 },
  { hour: "21:00", density: 78, incidents: 3 },
  { hour: "22:00", density: 55, incidents: 1 },
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
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                }}
              />
              <Line
                type="monotone"
                dataKey="density"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={false}
                name="Density %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Gate throughput" description="Fans per minute" />
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={throughput}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="gate" tick={{ fill: "#64748b", fontSize: 10 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="throughput" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Evacuation readiness" description="Success probability by sector" />
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={evacData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis dataKey="sector" type="category" tick={{ fill: "#64748b", fontSize: 11 }} width={56} />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="probability" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
