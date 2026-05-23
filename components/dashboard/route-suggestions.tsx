"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";
import { ArrowRight, Sparkles } from "lucide-react";

export function RouteSuggestions() {
  const { snapshot } = useStadium();

  return (
    <GlassCard glow>
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-white">AI Rerouting Suggestions</h3>
      </div>
      <div className="space-y-3">
        {snapshot.routes.map((route) => (
          <div
            key={route.id}
            className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4"
          >
            <div className="flex items-center gap-2 text-sm text-white">
              <span>{route.from}</span>
              <ArrowRight className="h-4 w-4 text-cyan-400" />
              <span>{route.to}</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">{route.reason}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="success">{route.impact}</Badge>
              <Badge variant="purple">{route.confidence}% AI confidence</Badge>
              <Badge variant={route.priority === "high" ? "danger" : "warning"}>
                {route.priority}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
