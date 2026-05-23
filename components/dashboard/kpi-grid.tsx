"use client";

import { Panel } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
import { formatNumber } from "@/lib/utils";

export function KpiGrid() {
  const { snapshot } = useStadium();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {snapshot.kpis.map((kpi) => (
        <Panel key={kpi.label} padding="sm">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            {kpi.label}
          </p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-slate-900">
            {typeof kpi.value === "number"
              ? formatNumber(kpi.value)
              : kpi.value}
            {kpi.unit && (
              <span className="ml-1 text-xs font-normal text-slate-500">
                {kpi.unit}
              </span>
            )}
          </p>
          {kpi.delta !== undefined && (
            <p
              className={`mt-1 text-xs font-medium ${
                kpi.delta < 0 ? "text-red-600" : "text-emerald-600"
              }`}
            >
              {kpi.delta > 0 ? "+" : ""}
              {kpi.delta}%
            </p>
          )}
        </Panel>
      ))}
    </div>
  );
}
