"use client";

import { Panel, PanelHeader } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";
import { ArrowRight } from "lucide-react";

export function RouteSuggestions() {
  const { snapshot } = useStadium();

  return (
    <Panel>
      <PanelHeader title="Rerouting" description="AI-suggested crowd paths" />
      <div className="space-y-3">
        {snapshot.routes.length === 0 && (
          <p className="text-sm text-slate-500">No active reroutes — all gates within threshold.</p>
        )}
        {snapshot.routes.map((route) => (
          <div
            key={route.id}
            className="rounded-lg border border-sky-100 bg-sky-50/50 p-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <span>{route.from}</span>
              <ArrowRight className="h-4 w-4 text-sky-500" />
              <span>{route.to}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{route.reason}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="success">{route.impact}</Badge>
              <Badge variant="default">{route.confidence}% confidence</Badge>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
