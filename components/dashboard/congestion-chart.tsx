"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
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
  }));

  return (
    <Panel className="h-full">
      <PanelHeader
        title="Congestion index"
        description="Gate and stand pressure"
      />
      <div className="h-52 min-h-[208px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minHeight={208}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }} />
            <YAxis tick={{ fill: "#64748b", fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="density"
              stroke="#0ea5e9"
              fill="#e0f2fe"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
