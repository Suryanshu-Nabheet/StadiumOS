"use client";

import { useId } from "react";
import { useStadium } from "@/hooks/use-stadium";
import { MAP } from "@/lib/stadium-map-layout";
import { cn } from "@/lib/utils";
import { StadiumField } from "./stadium-field";
import { StadiumRing } from "./stadium-ring";
import { StadiumOverlays } from "./stadium-overlays";
import { StadiumLegend } from "./stadium-legend";

export interface StadiumMapProps {
  showIncidents?: boolean;
  showRoutes?: boolean;
  showHeatmap?: boolean;
  /** Fills parent — use on Command Center hero panel */
  variant?: "default" | "hero";
  compactLegend?: boolean;
  className?: string;
}

export function StadiumMap({
  showIncidents = true,
  showRoutes = false,
  showHeatmap = false,
  variant = "default",
  compactLegend = false,
  className,
}: StadiumMapProps) {
  const { snapshot, emergencies } = useStadium();
  const clipId = useId();
  const size = MAP.viewBox;
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        className,
        isHero && "flex h-full min-h-0 w-full flex-col",
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-slate-200/80 bg-[#E8EEF2] shadow-sm",
          isHero
            ? "grid w-full flex-1 place-items-center p-2 sm:p-3"
            : "w-full",
        )}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className={cn(
            "aspect-square w-full",
            isHero
              ? "max-h-[min(56vh,600px)] max-w-full lg:max-h-[min(60vh,640px)] xl:max-h-[min(64vh,680px)]"
              : "",
          )}
          role="img"
          aria-label="Narendra Modi Stadium circular digital twin"
        >
          <rect width={size} height={size} fill="#E8EEF2" />
          <StadiumRing standMetrics={snapshot.stands} />
          <StadiumField clipId={clipId} />
          <StadiumOverlays
            snapshot={snapshot}
            emergencies={emergencies}
            showIncidents={showIncidents}
            showRoutes={showRoutes}
            showHeatmap={showHeatmap}
            fieldClipId={clipId}
          />
        </svg>
      </div>
      <StadiumLegend compact={compactLegend} />
    </div>
  );
}
