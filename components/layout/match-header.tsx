"use client";

import { LiveIndicator } from "@/components/ui/live-indicator";
import { StatBlock } from "@/components/ui/stat-block";
import { AnimatedSidebarTrigger } from "@/components/layout/animated-sidebar-trigger";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { useStadium } from "@/hooks/use-stadium";
import { formatNumber } from "@/lib/utils";
import { Activity, Users, AlertTriangle, Thermometer } from "lucide-react";

export function MatchHeader() {
  const { snapshot } = useStadium();
  const { match } = siteConfig;
  const { scoreboard, conditions } = match;

  return (
    <header className="sticky top-0 z-20 shrink-0 border-b border-sidebar-border bg-white/90 backdrop-blur-md">
      <div className="flex flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <div className="flex min-w-0 items-start gap-2.5 md:items-center md:gap-3">
          <AnimatedSidebarTrigger className="mt-0.5 shrink-0 md:mt-0" />
          <Separator
            orientation="vertical"
            className="mt-1 hidden h-10 md:block"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <LiveIndicator />
              <span className="text-xs text-muted-foreground">
                {match.inning}
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-600">
                {scoreboard.batting.team} {scoreboard.batting.runs}/{scoreboard.batting.wickets}{" "}
                · {scoreboard.chasing.team} {scoreboard.chasing.runs}/{scoreboard.chasing.wickets}
              </span>
            </div>
            <h1 className="mt-0.5 truncate text-base font-semibold text-foreground">
              {match.title}
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              {match.teams} · {match.venue}
            </p>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden">
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
          <StatBlock
            icon={Thermometer}
            label="Conditions"
            value={`${conditions.temperatureC}°C · ${conditions.humidityPct}% RH`}
            valueClassName="text-slate-700"
          />
        </div>
      </div>
    </header>
  );
}
