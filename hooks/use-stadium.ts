"use client";

import { useStadiumStore } from "@/store/stadium-store";

export function useStadium() {
  const snapshot = useStadiumStore((s) => s.snapshot);
  const emergencies = useStadiumStore((s) => s.emergencies);
  const timeline = useStadiumStore((s) => s.timeline);
  const simulationRunning = useStadiumStore((s) => s.simulationRunning);
  const dispatchIncident = useStadiumStore((s) => s.dispatchIncident);
  const appendTimeline = useStadiumStore((s) => s.appendTimeline);

  return {
    snapshot,
    emergencies,
    timeline,
    simulationRunning,
    dispatchIncident,
    appendTimeline,
  };
}
