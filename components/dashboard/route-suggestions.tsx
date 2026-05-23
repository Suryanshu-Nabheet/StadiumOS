"use client";

import { Panel, PanelHeader, PanelBody } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { useStadium } from "@/hooks/use-stadium";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function RouteSuggestions({ className }: { className?: string }) {
  const { snapshot } = useStadium();

  return (
    <Panel layout="stack" className={cn("h-full", className)}>
      <PanelHeader title="Rerouting" description="AI-suggested crowd paths" />
      <PanelBody className="pr-0.5">
        <div className="space-y-3">
          {snapshot.routes.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center text-sm text-slate-500">
              No active reroutes — all gates within threshold.
            </p>
          )}
          {snapshot.routes.map((route) => (
            <div
              key={route.id}
              className="rounded-lg border border-sky-100 bg-sky-50/60 p-4"
            >
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-slate-900">
                <span className="min-w-0 truncate">{route.from}</span>
                <ArrowRight className="h-4 w-4 shrink-0 text-sky-500" />
                <span className="min-w-0 truncate">{route.to}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {route.reason}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="success" className="text-[10px]">
                  {route.impact}
                </Badge>
                <Badge variant="default" className="text-[10px]">
                  {route.confidence}% confidence
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </PanelBody>
    </Panel>
  );
}
