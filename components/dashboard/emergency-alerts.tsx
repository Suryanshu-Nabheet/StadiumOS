"use client";

import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel, PanelHeader, PanelBody } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
import { severityToBadge } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { EmergencyType } from "@/types/emergency";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const typeLabel: Record<EmergencyType, string> = {
  stampede_risk: "Stampede risk",
  heat_exhaustion: "Heat exhaustion",
  medical: "Medical",
  suspicious_activity: "Security",
  fire_alert: "Fire",
};

export function EmergencyAlerts({ className }: { className?: string }) {
  const { emergencies } = useStadium();

  return (
    <Panel layout="stack" className={cn("min-h-0", className)}>
      <PanelHeader
        title="Emergency alerts"
        description={`${emergencies.length} active`}
        action={
          emergencies.length > 0 ? (
            <Badge variant="danger">{emergencies.length}</Badge>
          ) : null
        }
      />
      <PanelBody className="pr-0.5">
        {emergencies.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="No active emergencies"
            description="All sectors within normal parameters."
          />
        ) : (
          <div className="space-y-2.5">
            {emergencies.map((inc) => (
              <div
                key={inc.id}
                className="rounded-lg border border-slate-100 bg-slate-50/90 p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-snug text-slate-900">
                        {inc.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {inc.location}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={severityToBadge(inc.severity)}
                    className="shrink-0 text-[10px]"
                  >
                    {inc.severity}
                  </Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {inc.summary}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
                  <span>ETA {inc.etaMinutes}m</span>
                  <span>{typeLabel[inc.type]}</span>
                  <span className="capitalize">{inc.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PanelBody>
    </Panel>
  );
}
