"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";

export function GatePressure() {
  const { snapshot } = useStadium();
  const sorted = [...snapshot.gates].sort((a, b) => b.density - a.density);

  return (
    <Panel>
      <PanelHeader title="Gate pressure" description="Throughput and wait times" />
      <div className="space-y-4">
        {sorted.slice(0, 6).map((gate) => (
          <div key={gate.id}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-slate-700">{gate.name}</span>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    gate.status === "critical" || gate.status === "congested"
                      ? "danger"
                      : gate.status === "elevated"
                        ? "warning"
                        : "neutral"
                  }
                >
                  {gate.status}
                </Badge>
                <span className="text-xs font-medium tabular-nums text-slate-900">
                  {gate.density.toFixed(0)}%
                </span>
              </div>
            </div>
            <Progress
              value={gate.density}
              indicatorClassName={
                gate.density > 80 ? "bg-red-500" : undefined
              }
            />
            <p className="mt-1 text-xs text-slate-500">
              {gate.waitMinutes} min wait · {gate.throughput}/min
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
