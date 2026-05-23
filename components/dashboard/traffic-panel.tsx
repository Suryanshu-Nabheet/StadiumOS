"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";
import { Car } from "lucide-react";

export function TrafficPanel() {
  const { snapshot } = useStadium();

  return (
    <GlassCard>
      <div className="mb-4 flex items-center gap-2">
        <Car className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-white">Traffic Severity</h3>
      </div>
      <div className="space-y-3">
        {snapshot.traffic.map((t) => (
          <div
            key={t.zone}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-black/30 px-3 py-2"
          >
            <span className="text-xs text-zinc-300">{t.zone}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500">
                {t.vehiclesPerMin} v/min
              </span>
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
    </GlassCard>
  );
}
