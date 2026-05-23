"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { ChartContainer } from "@/components/ui/chart-container";
import { useStadium } from "@/hooks/use-stadium";
import {
  chartGridStroke,
  chartPrimary,
  chartPrimaryFill,
  chartTickFill,
  chartTooltipStyle,
} from "@/lib/chart-styles";
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
      <ChartContainer height={208}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
            <XAxis dataKey="name" tick={{ fill: chartTickFill, fontSize: 10 }} />
            <YAxis tick={{ fill: chartTickFill, fontSize: 10 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Area
              type="monotone"
              dataKey="density"
              stroke={chartPrimary}
              fill={chartPrimaryFill}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Panel>
  );
}
