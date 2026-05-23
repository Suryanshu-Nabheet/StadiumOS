"use client";

import { StadiumMap } from "@/components/twin/stadium-map";
import { Panel } from "@/components/ui/panel";
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
    <>
      <Panel padding="md">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Narendra Modi Stadium — live twin
            </h3>
            <p className="text-xs text-slate-500">
              132,000 seats · 8 ingress gates · 5 emergency exits · Motera, Ahmedabad
            </p>
          </div>
          <Badge variant={snapshot.crowdStressScore > 70 ? "danger" : "warning"}>
            Stress {snapshot.crowdStressScore}/100
          </Badge>
        </div>
        <StadiumMap showIncidents showRoutes showHeatmap className="w-full" />
      </Panel>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {facilityStats.map((item) => (
          <Panel key={item.label} padding="sm" className="text-center">
            <p className="text-lg font-semibold tabular-nums text-sky-600 sm:text-2xl">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.label}</p>
          </Panel>
        ))}
      </div>

      <Panel className="mt-6" padding="md">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Stand density</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {standRows.map((st) => (
            <div
              key={st.id}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2"
            >
              <span className="text-xs font-medium text-slate-700">{st.name}</span>
              <Badge variant={zoneToBadge(st.status)}>{st.density.toFixed(0)}%</Badge>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
