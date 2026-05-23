"use server";

import {
  advanceSimulation,
  getSimulationBootstrap,
} from "@/server/services/simulation.service";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";

export async function getSimulationBootstrapAction() {
  return getSimulationBootstrap();
}

export async function tickSimulationAction(
  snapshot: StadiumSnapshot,
  emergencies: EmergencyIncident[],
) {
  return advanceSimulation(snapshot, emergencies);
}
