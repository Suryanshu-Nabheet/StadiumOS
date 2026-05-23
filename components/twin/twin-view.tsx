"use client";

import { StadiumMap } from "@/components/twin/stadium-map";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";
import { siteConfig } from "@/config/site";
import { zoneToBadge } from "@/lib/status";
import { formatNumber } from "@/lib/utils";

export function TwinView() {
  const { snapshot, emergencies } = useStadium();
  const criticalGates = snapshot.gates.filter((g) => g.status === "critical").length;
  const activeIncidents = emergencies.filter((e) => e.status !== "resolved").length;

  const facilityStats = [
    { label: "Seated (est.)", value: formatNumber(snapshot.occupancy) },
    { label: "Capacity", value: formatNumber(siteConfig.match.capacity) },
    { label: "Critical gates", value: String(criticalGates) },
    { label: "Active incidents", value: String(activeIncidents) },
    {
      label: "Avg gate wait",
      value: `${(snapshot.gates.reduce((s, g) => s + g.waitMinutes, 0) / snapshot.gates.length).toFixed(1)} min`,
    },
    { label: "AI confidence", value: `${snapshot.aiConfidence.toFixed(1)}%` },
  ];

  const standRows = [...snapshot.stands].sort((a, b) => b.density - a.density);

  return (
    <div className="flex flex-col gap-5">
      <Panel padding="md" className="flex flex-col">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <PanelHeader
            className="mb-0"
            title="Narendra Modi Stadium — live twin"
            description="132,000 seats · 8 gates · Motera, Ahmedabad"
          />
          <Badge
            variant={snapshot.crowdStressScore > 70 ? "danger" : "warning"}
            className="shrink-0"
          >
            Stress {snapshot.crowdStressScore}/100
          </Badge>
        </div>
        <div className="flex justify-center">
          <StadiumMap
            showIncidents
            showRoutes
            showHeatmap
            className="w-full max-w-[min(100%,36rem)]"
          />
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {facilityStats.map((item) => (
          <Panel key={item.label} padding="sm" className="text-center">
            <p className="text-lg font-semibold tabular-nums text-sky-600 sm:text-xl">
              {item.value}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">{item.label}</p>
          </Panel>
        ))}
      </div>

      <Panel padding="md">
        <PanelHeader
          className="mb-3"
          title="Stand density"
          description="Live sector pressure"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {standRows.map((st) => (
            <div
              key={st.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5"
            >
              <span className="min-w-0 truncate text-xs font-medium text-slate-700">
                {st.name}
              </span>
              <Badge variant={zoneToBadge(st.status)} className="shrink-0 text-[10px]">
                {st.density.toFixed(0)}%
              </Badge>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
