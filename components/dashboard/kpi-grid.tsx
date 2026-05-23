"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useStadium } from "@/hooks/use-stadium";
import { formatNumber } from "@/lib/utils";
import { motion } from "framer-motion";

export function KpiGrid() {
  const { snapshot } = useStadium();

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {snapshot.kpis.map((kpi, i) => (
        <GlassCard key={kpi.label} delay={i * 0.05} className="!p-4">
          <p className="text-[10px] uppercase tracking-wider text-zinc-500">
            {kpi.label}
          </p>
          <motion.p
            key={String(kpi.value)}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-xl font-bold text-white"
          >
            {typeof kpi.value === "number"
              ? formatNumber(kpi.value)
              : kpi.value}
            {kpi.unit && (
              <span className="ml-1 text-xs font-normal text-zinc-500">
                {kpi.unit}
              </span>
            )}
          </motion.p>
          {kpi.delta !== undefined && (
            <p
              className={`mt-1 text-xs ${kpi.delta < 0 ? "text-red-400" : "text-emerald-400"}`}
            >
              {kpi.delta > 0 ? "+" : ""}
              {kpi.delta}%
            </p>
          )}
        </GlassCard>
      ))}
    </div>
  );
}
