"use client";

import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { useStadium } from "@/hooks/use-stadium";
import { cn, formatNumber } from "@/lib/utils";
import { Activity, Users, AlertTriangle } from "lucide-react";

export function MatchHeader() {
  const { snapshot } = useStadium();
  const { match } = siteConfig;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-3">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="live">Live</Badge>
          <span className="text-xs text-slate-500">{match.inning}</span>
        </div>
        <h1 className="mt-0.5 text-base font-semibold text-slate-900">
          {match.title}
        </h1>
        <p className="text-sm text-slate-500">
          {match.teams} · {match.venue}
        </p>
      </div>
      <div className="flex flex-wrap gap-8">
        <Stat
          icon={Users}
          label="Occupancy"
          value={`${formatNumber(snapshot.occupancy)} (${snapshot.occupancyPercent.toFixed(1)}%)`}
        />
        <Stat
          icon={Activity}
          label="AI confidence"
          value={`${snapshot.aiConfidence.toFixed(1)}%`}
          valueClassName="text-sky-600"
        />
        <Stat
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

function Stat({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" />
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className={cn("text-sm font-semibold text-slate-900", valueClassName)}>
          {value}
        </p>
      </div>
    </div>
  );
}
