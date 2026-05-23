"use client";

import { Badge } from "@/components/ui/badge";
import { Panel, PanelHeader, PanelBody } from "@/components/ui/panel";
import { useStadium } from "@/hooks/use-stadium";
import { cn } from "@/lib/utils";

export function AgentFeed({ className }: { className?: string }) {
  const { snapshot } = useStadium();

  return (
    <Panel layout="stack" className={cn("h-full", className)}>
      <PanelHeader title="AI agents" description="Autonomous activity feed" />
      <PanelBody className="pr-0.5">
        <div className="space-y-2.5">
          {snapshot.agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-lg border border-slate-100 bg-slate-50/90 px-3 py-2.5"
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
                  className="shrink-0 text-[10px]"
                >
                  {agent.status}
                </Badge>
              </div>
              <p className="mt-1.5 text-sm leading-snug text-slate-700">
                {agent.action}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                {agent.target} · {agent.confidence}% confidence
              </p>
            </div>
          ))}
        </div>
      </PanelBody>
    </Panel>
  );
}
