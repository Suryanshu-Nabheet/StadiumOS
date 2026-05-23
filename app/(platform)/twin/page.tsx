"use client";

import { StadiumMap } from "@/components/twin/stadium-map";
import { GlassCard } from "@/components/ui/glass-card";
import { useStadium } from "@/hooks/use-stadium";
import { gates, stands, emergencyExits, medicalZones, parkingZones } from "@/config/stadium";

export default function TwinPage() {
  const { snapshot } = useStadium();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Digital Twin Stadium</h2>
        <p className="text-sm text-zinc-500">
          Live movement · congestion · incidents · evacuation paths
        </p>
      </div>
      <GlassCard glow className="!p-6">
        <StadiumMap showIncidents showRoutes className="w-full" />
      </GlassCard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Gates", count: gates.length, color: "text-cyan-400" },
          { label: "Stands", count: stands.length, color: "text-blue-400" },
          { label: "Exits", count: emergencyExits.length, color: "text-emerald-400" },
          { label: "Medical", count: medicalZones.length, color: "text-pink-400" },
          { label: "Parking", count: parkingZones.length, color: "text-amber-400" },
        ].map((item) => (
          <GlassCard key={item.label} className="!p-4 text-center">
            <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
            <p className="text-xs text-zinc-500">{item.label} monitored</p>
          </GlassCard>
        ))}
        <GlassCard className="!p-4 text-center">
          <p className="text-3xl font-bold text-purple-400">
            {snapshot.heatmap.length}
          </p>
          <p className="text-xs text-zinc-500">Heatmap cells live</p>
        </GlassCard>
      </div>
    </div>
  );
}
