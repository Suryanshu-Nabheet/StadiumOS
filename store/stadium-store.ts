"use client";

import { create } from "zustand";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";
import { bootstrapSimulation, tickSimulation } from "@/services/simulation-engine";
import { createTimelineEvents } from "@/services/mock-data";

interface StadiumState {
  snapshot: StadiumSnapshot;
  emergencies: EmergencyIncident[];
  timeline: ReturnType<typeof createTimelineEvents>;
  simulationRunning: boolean;
  tick: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  hydrate: (snapshot: StadiumSnapshot, emergencies: EmergencyIncident[]) => void;
}

const initial = bootstrapSimulation();

export const useStadiumStore = create<StadiumState>((set, get) => ({
  snapshot: initial.snapshot,
  emergencies: initial.emergencies,
  timeline: createTimelineEvents(),
  simulationRunning: false,
  tick: () => {
    const { snapshot, emergencies } = get();
    const next = tickSimulation(snapshot, emergencies);
    set({ snapshot: next.snapshot, emergencies: next.emergencies });
  },
  startSimulation: () => set({ simulationRunning: true }),
  stopSimulation: () => set({ simulationRunning: false }),
  hydrate: (snapshot, emergencies) => set({ snapshot, emergencies }),
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
  }, 3500);

  useStadiumStore.getState().startSimulation();
}
