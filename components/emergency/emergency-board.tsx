"use client";

import { Panel } from "@/components/ui/panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStadium } from "@/hooks/use-stadium";
import { severityToBadge } from "@/lib/status";
import { StadiumMap } from "@/components/twin/stadium-map";
import { FileText } from "lucide-react";

export function EmergencyBoard() {
  const { emergencies } = useStadium();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {emergencies.map((inc) => (
          <Panel key={inc.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={severityToBadge(inc.severity)}>
                    {inc.type.replace("_", " ")}
                  </Badge>
                  <Badge variant="neutral">{inc.status}</Badge>
                </div>
                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {inc.title}
                </h3>
                <p className="text-sm text-slate-500">{inc.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold tabular-nums text-sky-600">
                  {inc.etaMinutes}m
                </p>
                <p className="text-xs text-slate-500">ETA</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {inc.summary}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-[11px] font-medium uppercase text-slate-400">
                  Fastest path
                </p>
                <p className="mt-1 text-sm text-slate-700">{inc.fastestPath}</p>
              </div>
              <div className="rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-[11px] font-medium uppercase text-slate-400">
                  Evacuation impact
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {inc.evacuationImpact}% load
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <FileText className="h-3.5 w-3.5" />
                Incident report
              </Button>
              <Button size="sm">Dispatch {inc.assignedTeam}</Button>
            </div>
          </Panel>
        ))}
      </div>
      <Panel>
        <h3 className="mb-4 text-sm font-semibold text-slate-900">Incident map</h3>
        <StadiumMap showIncidents className="w-full rounded-lg" />
      </Panel>
    </div>
  );
}
