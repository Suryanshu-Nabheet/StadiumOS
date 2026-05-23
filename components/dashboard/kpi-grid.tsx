"use client";

import { Panel } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
import { cn, formatNumber } from "@/lib/utils";

export function KpiGrid({ className }: { className?: string }) {
  const { snapshot } = useStadium();

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {snapshot.kpis.map((kpi) => (
        <Panel
          key={kpi.label}
          padding="sm"
          className="flex min-h-[5.5rem] flex-col justify-center"
        >
          <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {kpi.label}
          </p>
          <p className="mt-1.5 text-lg font-semibold leading-tight tabular-nums text-slate-900 sm:text-xl">
            {typeof kpi.value === "number"
              ? formatNumber(kpi.value)
              : kpi.value}
            {kpi.unit && (
              <span className="ml-0.5 text-xs font-normal text-slate-500">
                {kpi.unit}
              </span>
            )}
          </p>
          {kpi.delta !== undefined && (
            <p
              className={cn(
                "mt-1 text-[11px] font-medium",
                kpi.delta < 0 ? "text-red-600" : "text-emerald-600",
              )}
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
