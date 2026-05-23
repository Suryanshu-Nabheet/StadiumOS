"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";

export function CrowdHeatmap() {
  const { snapshot } = useStadium();

  return (
    <Panel className="h-full">
      <PanelHeader
        title="Crowd density"
        description="Live heatmap · updates every few seconds"
      />
      <div
        className="grid gap-0.5 rounded-lg border border-slate-100 bg-slate-50 p-2"
        style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
      >
        {snapshot.heatmap.map((cell) => {
          const opacity = 0.15 + cell.intensity * 0.75;
          return (
            <div
              key={`${cell.x}-${cell.y}`}
              className="aspect-square rounded-sm transition-colors duration-700"
              style={{
                backgroundColor: `rgba(14, 165, 233, ${opacity})`,
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex gap-4 text-[11px] text-slate-500">
        <span>Low</span>
        <span className="text-sky-300">■</span>
        <span>High</span>
        <span className="text-sky-600">■</span>
      </div>
    </Panel>
  );
}
