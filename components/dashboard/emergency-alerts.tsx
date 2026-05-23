"use client";

import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useStadium } from "@/hooks/use-stadium";
import { AlertTriangle, Flame, Heart, Shield, Users } from "lucide-react";
import type { EmergencyType } from "@/types/emergency";

const typeIcons: Record<EmergencyType, React.ElementType> = {
  stampede_risk: Users,
  heat_exhaustion: Heart,
  medical: Heart,
  suspicious_activity: Shield,
  fire_alert: Flame,
};

const severityVariant = {
  low: "default" as const,
  medium: "warning" as const,
  high: "danger" as const,
  critical: "danger" as const,
};

export function EmergencyAlerts() {
  const { emergencies } = useStadium();

  return (
    <GlassCard className="h-full">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h3 className="text-sm font-semibold text-white">Emergency Alerts</h3>
        <Badge variant="danger">{emergencies.length} active</Badge>
      </div>
      <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
        {emergencies.map((inc) => {
          const Icon = typeIcons[inc.type];
          return (
            <div
              key={inc.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <div>
                    <p className="text-xs font-medium text-white">{inc.title}</p>
                    <p className="text-[10px] text-zinc-500">{inc.location}</p>
                  </div>
                </div>
                <Badge variant={severityVariant[inc.severity]}>
                  {inc.severity}
                </Badge>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-zinc-400">
                {inc.summary.slice(0, 120)}…
              </p>
              <div className="mt-2 flex gap-3 text-[10px] text-cyan-400">
                <span>ETA {inc.etaMinutes}m</span>
                <span>{inc.assignedTeam}</span>
                <span className="capitalize">{inc.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
