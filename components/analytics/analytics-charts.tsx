"use client";

import { GlassCard } from "@/components/ui/glass-card";
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
  Legend,
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
    wait: g.waitMinutes,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassCard>
        <h3 className="mb-4 text-sm font-semibold text-white">Crowd Density Trends</h3>
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="hour" tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #ffffff20", borderRadius: 12 }} />
              <Legend />
              <Line type="monotone" dataKey="density" stroke="#22d3ee" strokeWidth={2} dot={false} name="Density %" />
              <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} name="Incidents" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="mb-4 text-sm font-semibold text-white">Gate Throughput</h3>
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={throughput}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="gate" tick={{ fill: "#71717a", fontSize: 10 }} />
              <YAxis tick={{ fill: "#71717a", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #ffffff20", borderRadius: 12 }} />
              <Bar dataKey="throughput" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Fans/min" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="mb-4 text-sm font-semibold text-white">Evacuation Success Probability</h3>
        <div className="h-64 min-h-[256px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minHeight={256}>
            <BarChart data={evacData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "#71717a", fontSize: 11 }} />
              <YAxis dataKey="sector" type="category" tick={{ fill: "#71717a", fontSize: 11 }} width={60} />
              <Tooltip contentStyle={{ background: "#09090b", border: "1px solid #ffffff20", borderRadius: 12 }} />
              <Bar dataKey="probability" fill="#10b981" radius={[0, 4, 4, 0]} name="Success %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="mb-4 text-sm font-semibold text-white">AI Confidence & Stress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
            <p className="text-4xl font-bold text-cyan-400">
              {snapshot.aiConfidence.toFixed(1)}%
            </p>
            <p className="mt-2 text-xs text-zinc-500">AI Confidence Meter</p>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-4xl font-bold text-red-400">{snapshot.crowdStressScore}</p>
            <p className="mt-2 text-xs text-zinc-500">Crowd Stress Score</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
