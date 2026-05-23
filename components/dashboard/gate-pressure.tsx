"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { useStadium } from "@/hooks/use-stadium";
import { Badge } from "@/components/ui/badge";

export function GatePressure() {
  const { snapshot } = useStadium();
  const sorted = [...snapshot.gates].sort((a, b) => b.density - a.density);

  return (
    <GlassCard>
      <h3 className="mb-4 text-sm font-semibold text-white">Gate Pressure Analytics</h3>
      <div className="space-y-4">
        {sorted.slice(0, 6).map((gate) => (
          <div key={gate.id}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-zinc-300">{gate.name}</span>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    gate.status === "critical"
                      ? "danger"
                      : gate.status === "congested"
                        ? "warning"
                        : "default"
                  }
                >
                  {gate.status}
                </Badge>
                <span className="text-xs font-mono text-cyan-400">
                  {gate.density.toFixed(0)}%
                </span>
              </div>
            </div>
            <Progress
              value={gate.density}
              indicatorClassName={
                gate.density > 80
                  ? "bg-gradient-to-r from-red-500 to-orange-500"
                  : undefined
              }
            />
            <p className="mt-1 text-[10px] text-zinc-500">
              {gate.waitMinutes} min wait · {gate.throughput}/min throughput · trend{" "}
              {gate.trend}
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
