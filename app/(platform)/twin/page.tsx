"use client";

import { StadiumMap } from "@/components/twin/stadium-map";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/layout/page-header";
import { useStadium } from "@/hooks/use-stadium";
import {
  gates,
  stands,
  emergencyExits,
  medicalZones,
  parkingZones,
} from "@/config/stadium";

export default function TwinPage() {
  const { snapshot } = useStadium();

  const stats = [
    { label: "Gates", count: gates.length },
    { label: "Stands", count: stands.length },
    { label: "Exits", count: emergencyExits.length },
    { label: "Medical", count: medicalZones.length },
    { label: "Parking", count: parkingZones.length },
    { label: "Heatmap cells", count: snapshot.heatmap.length },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital twin"
        description="Live congestion, incidents, and facility layout"
      />
      <Panel padding="md">
        <StadiumMap showIncidents showRoutes className="w-full" />
      </Panel>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((item) => (
          <Panel key={item.label} padding="sm" className="text-center">
            <p className="text-2xl font-semibold tabular-nums text-sky-600">
              {item.count}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.label}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
