"use client";

import { Badge } from "@/components/ui/badge";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
import type { EmergencyType } from "@/types/emergency";
import { AlertTriangle } from "lucide-react";

const severityVariant = {
  low: "neutral" as const,
  medium: "warning" as const,
  high: "danger" as const,
  critical: "danger" as const,
};

const typeLabel: Record<EmergencyType, string> = {
  stampede_risk: "Stampede risk",
  heat_exhaustion: "Heat exhaustion",
  medical: "Medical",
  suspicious_activity: "Security",
  fire_alert: "Fire",
};

export function EmergencyAlerts() {
  const { emergencies } = useStadium();

  return (
    <Panel className="h-full">
      <PanelHeader
        title="Emergency alerts"
        description={`${emergencies.length} active`}
        action={<Badge variant="danger">{emergencies.length}</Badge>}
      />
      <div className="max-h-72 space-y-2 overflow-y-auto">
        {emergencies.map((inc) => (
          <div
            key={inc.id}
            className="rounded-lg border border-slate-100 bg-slate-50/80 p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{inc.title}</p>
                  <p className="text-xs text-slate-500">{inc.location}</p>
                </div>
              </div>
              <Badge variant={severityVariant[inc.severity]}>
                {inc.severity}
              </Badge>
            </div>
            <p className="mt-2 line-clamp-2 text-xs text-slate-600">
              {inc.summary}
            </p>
            <div className="mt-2 flex gap-3 text-xs text-slate-500">
              <span>ETA {inc.etaMinutes}m</span>
              <span>{typeLabel[inc.type]}</span>
              <span className="capitalize">{inc.status}</span>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
