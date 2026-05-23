"use client";

import { Badge } from "@/components/ui/badge";
import { Panel, PanelHeader } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";

export function AgentFeed() {
  const { snapshot } = useStadium();

  return (
    <Panel>
      <PanelHeader title="AI agents" description="Autonomous activity feed" />
      <div className="space-y-2">
        {snapshot.agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-sky-700">{agent.agent}</p>
              <Badge
                variant={
                  agent.status === "active"
                    ? "success"
                    : agent.status === "queued"
                      ? "warning"
                      : "neutral"
                }
              >
                {agent.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-700">{agent.action}</p>
            <p className="mt-1 text-xs text-slate-500">
              {agent.target} · {agent.confidence}% confidence
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
