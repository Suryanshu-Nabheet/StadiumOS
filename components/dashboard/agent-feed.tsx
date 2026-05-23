"use client";

import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { useStadium } from "@/hooks/use-stadium";
import { Bot } from "lucide-react";

export function AgentFeed() {
  const { snapshot } = useStadium();

  return (
    <GlassCard>
      <div className="mb-4 flex items-center gap-2">
        <Bot className="h-4 w-4 text-purple-400" />
        <h3 className="text-sm font-semibold text-white">Autonomous Agent Feed</h3>
      </div>
      <div className="space-y-3">
        {snapshot.agents.map((agent) => (
          <div
            key={agent.id}
            className="flex gap-3 rounded-xl border border-white/5 bg-black/30 p-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-xs font-bold text-purple-300">
              AI
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-cyan-300">{agent.agent}</p>
                <Badge
                  variant={
                    agent.status === "active"
                      ? "success"
                      : agent.status === "queued"
                        ? "warning"
                        : "default"
                  }
                >
                  {agent.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-300">{agent.action}</p>
              <p className="mt-1 text-[10px] text-zinc-500">
                {agent.target} · {agent.confidence}% confidence
              </p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
