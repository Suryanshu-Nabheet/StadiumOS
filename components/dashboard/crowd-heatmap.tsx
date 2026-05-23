"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useStadium } from "@/hooks/use-stadium";
import { motion } from "framer-motion";

export function CrowdHeatmap() {
  const { snapshot } = useStadium();

  return (
    <GlassCard glow className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">AI Crowd Heatmap</h3>
          <p className="text-xs text-zinc-500">Live density fusion · 3s refresh</p>
        </div>
        <div className="flex gap-2 text-[10px] text-zinc-500">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Low
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" /> Med
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" /> Critical
          </span>
        </div>
      </div>
      <div
        className="grid gap-0.5 rounded-xl border border-white/5 bg-black/40 p-2"
        style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}
      >
        {snapshot.heatmap.map((cell) => {
          const hue =
            cell.intensity > 0.75
              ? "rgba(239,68,68,"
              : cell.intensity > 0.5
                ? "rgba(245,158,11,"
                : cell.intensity > 0.3
                  ? "rgba(34,211,238,"
                  : "rgba(59,130,246,";
          return (
            <motion.div
              key={`${cell.x}-${cell.y}`}
              animate={{
                backgroundColor: `${hue}${0.2 + cell.intensity * 0.7})`,
              }}
              transition={{ duration: 0.8 }}
              className="aspect-square rounded-sm"
            />
          );
        })}
      </div>
    </GlassCard>
  );
}
