"use client";

import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { useStadium } from "@/hooks/use-stadium";
import { formatNumber } from "@/lib/utils";
import { Activity, Users } from "lucide-react";

export function MatchHeader() {
  const { snapshot } = useStadium();
  const { match } = siteConfig;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur-xl">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="live">LIVE</Badge>
          <span className="text-xs text-zinc-500">{match.inning}</span>
        </div>
        <h1 className="mt-1 text-lg font-semibold text-white">{match.title}</h1>
        <p className="text-sm text-zinc-400">
          {match.teams} · {match.venue}
        </p>
      </div>
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-cyan-400" />
          <div>
            <p className="text-[10px] uppercase text-zinc-500">Occupancy</p>
            <p className="text-sm font-semibold text-white">
              {formatNumber(snapshot.occupancy)}{" "}
              <span className="text-zinc-500">
                ({snapshot.occupancyPercent.toFixed(1)}%)
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-purple-400" />
          <div>
            <p className="text-[10px] uppercase text-zinc-500">AI Confidence</p>
            <p className="text-sm font-semibold text-cyan-300">
              {snapshot.aiConfidence.toFixed(1)}%
            </p>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase text-zinc-500">Crowd Stress</p>
          <p
            className={`text-sm font-semibold ${
              snapshot.crowdStressScore > 70 ? "text-red-400" : "text-amber-300"
            }`}
          >
            {snapshot.crowdStressScore}/100
          </p>
        </div>
      </div>
    </header>
  );
}
