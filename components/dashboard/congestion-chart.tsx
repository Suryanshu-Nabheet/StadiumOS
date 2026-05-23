"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useStadium } from "@/hooks/use-stadium";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function CongestionChart() {
  const { snapshot } = useStadium();
  const data = [...snapshot.gates, ...snapshot.stands.slice(0, 4)].map((z) => ({
    name: z.name.split("—")[0]?.trim().slice(0, 8) ?? z.id,
    density: Math.round(z.density),
    wait: z.waitMinutes,
  }));

  return (
    <GlassCard className="h-full">
      <h3 className="mb-1 text-sm font-semibold text-white">Route Congestion</h3>
      <p className="mb-4 text-xs text-zinc-500">Gate & stand pressure index</p>
      <div className="h-52 min-h-[208px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minHeight={208}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="densityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 10 }} />
            <YAxis tick={{ fill: "#71717a", fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                background: "#09090b",
                border: "1px solid #ffffff20",
                borderRadius: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="density"
              stroke="#22d3ee"
              fill="url(#densityGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
