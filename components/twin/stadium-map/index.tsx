"use client";

import { useId } from "react";
import { useStadium } from "@/hooks/use-stadium";
import { MAP } from "@/lib/stadium-map-layout";
import { StadiumField } from "./stadium-field";
import { StadiumRing } from "./stadium-ring";
import { StadiumOverlays } from "./stadium-overlays";
import { StadiumLegend } from "./stadium-legend";

export interface StadiumMapProps {
  showIncidents?: boolean;
  showRoutes?: boolean;
  showHeatmap?: boolean;
  className?: string;
}

export function StadiumMap({
  showIncidents = true,
  showRoutes = false,
  showHeatmap = false,
  className,
}: StadiumMapProps) {
  const { snapshot, emergencies } = useStadium();
  const clipId = useId();
  const size = MAP.viewBox;

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-[#E8EEF2] shadow-sm">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="aspect-square w-full"
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
      <StadiumLegend />
    </div>
  );
}
