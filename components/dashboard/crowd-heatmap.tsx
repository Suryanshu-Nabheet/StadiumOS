"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
import { cn } from "@/lib/utils";

export function CrowdHeatmap({ className }: { className?: string }) {
  const { snapshot } = useStadium();
  const maxIntensity = Math.max(...snapshot.heatmap.map((c) => c.intensity), 0.01);

  return (
    <Panel className={cn("flex h-full flex-col", className)}>
      <PanelHeader
        title="Bowl density heatmap"
        description="16×12 sensor grid · stand-synced"
        className="mb-3"
      />
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div
          className="grid w-full gap-0.5 rounded-lg border border-slate-100 bg-slate-50 p-2"
          style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
        >
          {snapshot.heatmap.map((cell) => {
            const normalized = cell.intensity / maxIntensity;
            const opacity = 0.12 + normalized * 0.82;
            const hue =
              normalized > 0.75
                ? "239, 68, 68"
                : normalized > 0.5
                  ? "249, 115, 22"
                  : "14, 165, 233";
            return (
              <div
                key={`${cell.x}-${cell.y}`}
                className="aspect-square rounded-sm transition-colors duration-700"
                style={{
                  backgroundColor: `rgba(${hue}, ${opacity})`,
                }}
                title={`Sector ${cell.x},${cell.y}: ${(cell.intensity * 100).toFixed(0)}%`}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
        <span>Low</span>
        <span className="text-sky-400">■</span>
        <span>Moderate</span>
        <span className="text-orange-400">■</span>
        <span>Critical</span>
        <span className="text-red-500">■</span>
      </div>
    </Panel>
  );
}
