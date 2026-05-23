"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { ChartContainer } from "@/components/ui/chart-container";
import { useStadium } from "@/hooks/use-stadium";
import { cn } from "@/lib/utils";
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

const CHART_H = 220;

export function CongestionChart({ className }: { className?: string }) {
  const { snapshot } = useStadium();
  const data = [...snapshot.gates, ...snapshot.stands].map((z) => ({
    name: z.name.split("—")[0]?.trim().slice(0, 7) ?? z.id,
    density: Math.round(z.density),
  }));

  return (
    <Panel className={cn("flex h-full flex-col", className)}>
      <PanelHeader
        title="Congestion index"
        description="All gates & stands"
        className="mb-3"
      />
      <div className="min-h-0 flex-1">
        <ChartContainer height={CHART_H} className="h-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
              <XAxis
                dataKey="name"
                tick={{ fill: chartTickFill, fontSize: 9 }}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={52}
              />
              <YAxis
                tick={{ fill: chartTickFill, fontSize: 10 }}
                domain={[0, 100]}
                width={32}
              />
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
      </div>
    </Panel>
  );
}
