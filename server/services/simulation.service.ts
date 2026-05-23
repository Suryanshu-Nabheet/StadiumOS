import { bootstrapSimulation, tickSimulation } from "@/services/simulation-engine";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";

export interface SimulationBootstrap {
  snapshot: StadiumSnapshot;
  emergencies: EmergencyIncident[];
}

export function getSimulationBootstrap(): SimulationBootstrap {
  return bootstrapSimulation();
}

export function advanceSimulation(
  snapshot: StadiumSnapshot,
  emergencies: EmergencyIncident[],
): SimulationBootstrap {
  return tickSimulation(snapshot, emergencies);
}
