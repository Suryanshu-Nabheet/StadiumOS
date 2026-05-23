"use client";

import { create } from "zustand";
import { simulation } from "@/config/theme";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";
import { bootstrapSimulation, tickSimulation } from "@/services/simulation-engine";
import { createTimelineEvents } from "@/services/mock-data";

export type TimelineEvent = {
  time: string;
  event: string;
  type: "info" | "warning" | "ai" | "critical";
};

interface StadiumState {
  snapshot: StadiumSnapshot;
  emergencies: EmergencyIncident[];
  timeline: TimelineEvent[];
  simulationRunning: boolean;
  tick: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  hydrate: (snapshot: StadiumSnapshot, emergencies: EmergencyIncident[]) => void;
  dispatchIncident: (id: string) => void;
  appendTimeline: (event: string, type?: TimelineEvent["type"]) => void;
}

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const initial = bootstrapSimulation();

export const useStadiumStore = create<StadiumState>((set, get) => ({
  snapshot: initial.snapshot,
  emergencies: initial.emergencies,
  timeline: createTimelineEvents() as TimelineEvent[],
  simulationRunning: false,
  tick: () => {
    const prev = get();
    const next = tickSimulation(prev.snapshot, prev.emergencies);
    const timeline = [...prev.timeline];
    const topGate = [...next.snapshot.gates].sort(
      (a, b) => b.density - a.density,
    )[0];
    if (topGate && topGate.density >= 85 && Math.random() > 0.85) {
      timeline.push({
        time: nowTime(),
        event: `Gate pressure alert — ${topGate.name} at ${topGate.density.toFixed(0)}%`,
        type: "warning",
      });
    }
    if (next.emergencies.length > prev.emergencies.length) {
      const newest = next.emergencies[0];
      timeline.push({
        time: nowTime(),
        event: `New incident: ${newest?.title ?? "Unknown"}`,
        type: "critical",
      });
    }
    set({
      snapshot: next.snapshot,
      emergencies: next.emergencies,
      timeline: timeline.slice(-12),
    });
  },
  startSimulation: () => set({ simulationRunning: true }),
  stopSimulation: () => set({ simulationRunning: false }),
  hydrate: (snapshot, emergencies) =>
    set({
      snapshot,
      emergencies,
      timeline: get().timeline,
    }),
  dispatchIncident: (id) => {
    set({
      emergencies: get().emergencies.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status:
                inc.status === "detected"
                  ? "dispatching"
                  : inc.status === "dispatching"
                    ? "responding"
                    : inc.status,
              etaMinutes: Math.max(1, inc.etaMinutes - 1),
            }
          : inc,
      ),
    });
    get().appendTimeline(`Dispatch confirmed — incident ${id}`, "ai");
  },
  appendTimeline: (event, type = "info") => {
    set({
      timeline: [
        ...get().timeline,
        { time: nowTime(), event, type },
      ].slice(-12),
    });
  },
}));

let intervalId: ReturnType<typeof setInterval> | null = null;

export function ensureSimulationLoop() {
  if (typeof window === "undefined") return;
  if (intervalId) return;

  intervalId = setInterval(() => {
    const state = useStadiumStore.getState();
    if (state.simulationRunning) {
      state.tick();
    }
  }, simulation.tickMs);

  useStadiumStore.getState().startSimulation();
}
