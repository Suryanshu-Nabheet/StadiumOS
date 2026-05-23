"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";

export function TrafficPanel() {
  const { snapshot } = useStadium();

  return (
    <Panel>
      <PanelHeader title="External traffic" description="Approach road severity" />
      <div className="space-y-2">
        {snapshot.traffic.map((t) => (
          <div
            key={t.zone}
            className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2"
          >
            <span className="text-sm text-slate-700">{t.zone}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">{t.vehiclesPerMin}/min</span>
              <Badge
                variant={
                  t.severity === "high"
                    ? "danger"
                    : t.severity === "medium"
                      ? "warning"
                      : "success"
                }
              >
                {t.severity}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
