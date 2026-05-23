"use client";

import { LiveIndicator } from "@/components/ui/live-indicator";
import { StatBlock } from "@/components/ui/stat-block";
import { siteConfig } from "@/config/site";
import { useStadium } from "@/hooks/use-stadium";
import { formatNumber } from "@/lib/utils";
import { Activity, Users, AlertTriangle } from "lucide-react";

export function MatchHeader() {
  const { snapshot } = useStadium();
  const { match } = siteConfig;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-3">
      <div>
        <div className="flex items-center gap-2">
          <LiveIndicator />
          <span className="text-xs text-slate-500">{match.inning}</span>
        </div>
        <h1 className="mt-0.5 text-base font-semibold text-slate-900">
          {match.title}
        </h1>
        <p className="text-sm text-slate-500">
          {match.teams} · {match.venue}
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <StatBlock
          icon={Users}
          label="Occupancy"
          value={`${formatNumber(snapshot.occupancy)} (${snapshot.occupancyPercent.toFixed(1)}%)`}
        />
        <StatBlock
          icon={Activity}
          label="AI confidence"
          value={`${snapshot.aiConfidence.toFixed(1)}%`}
          valueClassName="text-sky-600"
        />
        <StatBlock
          icon={AlertTriangle}
          label="Crowd stress"
          value={`${snapshot.crowdStressScore}/100`}
          valueClassName={
            snapshot.crowdStressScore > 70 ? "text-red-600" : "text-amber-600"
          }
        />
      </div>
    </header>
  );
}
