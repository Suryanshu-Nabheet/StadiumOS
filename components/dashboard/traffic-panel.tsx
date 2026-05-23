"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";
import { cn } from "@/lib/utils";

export function TrafficPanel({ className }: { className?: string }) {
  const { snapshot } = useStadium();

  return (
    <Panel className={cn(className)}>
      <PanelHeader
        title="External traffic"
        description="Approach roads · vehicles/min"
      />
      <ul className="space-y-2">
        {snapshot.traffic.map((t) => (
          <li
            key={t.zone}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5"
          >
            <span className="min-w-0 flex-1 text-xs font-medium leading-snug text-slate-700 sm:text-sm">
              {t.zone}
            </span>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-[11px] tabular-nums text-slate-500">
                {t.vehiclesPerMin}/min
              </span>
              <Badge
                variant={
                  t.severity === "high"
                    ? "danger"
                    : t.severity === "medium"
                      ? "warning"
                      : "success"
                }
                className="text-[10px]"
              >
                {t.severity}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
