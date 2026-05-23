"use client";

import { Panel, PanelHeader, PanelBody } from "@/components/ui/panel";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";
import { zoneToBadge } from "@/lib/status";
import { cn } from "@/lib/utils";

export function GatePressure({ className }: { className?: string }) {
  const { snapshot } = useStadium();
  const sorted = [...snapshot.gates].sort((a, b) => b.density - a.density);

  return (
    <Panel layout="stack" className={cn("h-full", className)}>
      <PanelHeader
        title="Gate pressure"
        description="8 ingress points · wait & throughput"
        className="mb-3"
      />
      <PanelBody className="pr-1">
        <div className="space-y-3.5">
          {sorted.map((gate) => (
            <div key={gate.id}>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-xs font-medium text-slate-700 sm:text-sm">
                  {gate.name}
                </span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <Badge variant={zoneToBadge(gate.status)} className="text-[10px]">
                    {gate.status}
                  </Badge>
                  <span className="text-xs font-semibold tabular-nums text-slate-900">
                    {gate.density.toFixed(0)}%
                  </span>
                </div>
              </div>
              <Progress
                value={gate.density}
                className="h-2"
                indicatorClassName={gate.density > 80 ? "bg-red-500" : undefined}
              />
              <p className="mt-1 text-[11px] text-slate-500">
                {gate.waitMinutes} min wait · {gate.throughput.toLocaleString()}/min
              </p>
            </div>
          ))}
        </div>
      </PanelBody>
    </Panel>
  );
}
