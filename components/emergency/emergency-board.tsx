"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStadium } from "@/hooks/use-stadium";
import { StadiumMap } from "@/components/twin/stadium-map";
import { FileText, Navigation } from "lucide-react";

export function EmergencyBoard() {
  const { emergencies } = useStadium();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {emergencies.map((inc) => (
          <GlassCard key={inc.id} glow={inc.severity === "critical"}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={inc.severity === "critical" ? "danger" : "warning"}>
                    {inc.type.replace("_", " ")}
                  </Badge>
                  <Badge variant="purple">{inc.status}</Badge>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">{inc.title}</h3>
                <p className="text-sm text-zinc-400">{inc.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-cyan-400">{inc.etaMinutes}m</p>
                <p className="text-xs text-zinc-500">ETA</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">{inc.summary}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase text-zinc-500">Fastest path</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-cyan-300">
                  <Navigation className="h-3 w-3" />
                  {inc.fastestPath}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase text-zinc-500">Evacuation impact</p>
                <p className="mt-1 text-xs text-amber-300">{inc.evacuationImpact}% sector load</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <FileText className="h-3 w-3" />
                AI Incident Report
              </Button>
              <Button size="sm">Dispatch {inc.assignedTeam}</Button>
            </div>
          </GlassCard>
        ))}
      </div>
      <GlassCard className="lg:col-span-1">
        <h3 className="mb-4 text-sm font-semibold text-white">Incident Map</h3>
        <StadiumMap showIncidents className="w-full rounded-xl" />
      </GlassCard>
    </div>
  );
}
