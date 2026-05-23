"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { useStadium } from "@/hooks/use-stadium";

const typeColors: Record<string, string> = {
  info: "border-cyan-500/30 bg-cyan-500/5",
  warning: "border-amber-500/30 bg-amber-500/5",
  ai: "border-purple-500/30 bg-purple-500/5",
  critical: "border-red-500/30 bg-red-500/5",
};

export function TimelinePanel() {
  const { timeline } = useStadium();

  return (
    <GlassCard>
      <h3 className="mb-4 text-sm font-semibold text-white">
        Match-Day Operational Timeline
      </h3>
      <div className="relative space-y-0">
        {timeline.map((item, i) => (
          <div key={i} className="flex gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
              {i < timeline.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-white/10" />
              )}
            </div>
            <div
              className={`flex-1 rounded-xl border p-4 ${typeColors[item.type] ?? typeColors.info}`}
            >
              <p className="font-mono text-xs text-cyan-400">{item.time}</p>
              <p className="mt-1 text-sm text-zinc-200">{item.event}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
