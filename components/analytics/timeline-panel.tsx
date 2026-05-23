"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  info: "border-l-sky-500 bg-white",
  warning: "border-l-amber-500 bg-white",
  ai: "border-l-sky-600 bg-sky-50/30",
  critical: "border-l-red-500 bg-red-50/30",
};

export function TimelinePanel() {
  const { timeline } = useStadium();

  return (
    <Panel>
      <PanelHeader title="Operations timeline" description="Match-day log" />
      <div className="space-y-3">
        {timeline.map((item, i) => (
          <div
            key={i}
            className={cn(
              "rounded-r-lg border border-slate-100 border-l-4 px-4 py-3",
              typeStyles[item.type] ?? typeStyles.info,
            )}
          >
            <p className="font-mono text-xs font-medium text-sky-700">{item.time}</p>
            <p className="mt-1 text-sm text-slate-700">{item.event}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
