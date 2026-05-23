import { gates as gateZones, stands as standZones } from "@/config/stadium";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";
import { clamp, randomBetween } from "@/lib/utils";
import {
  CAPACITY,
  avgGateWait,
  computeAiConfidence,
  computeCrowdStress,
  computeOccupancy,
  createRouteSuggestions,
  gateZoneById,
  mutateGateZone,
  mutateStandZone,
  syncHeatmap,
  totalGateThroughput,
} from "@/lib/stadium-physics";
import {
  createAgentFeed,
  createInitialEmergencies,
  createInitialSnapshot,
} from "@/services/mock-data";

function syncKpis(
  snapshot: StadiumSnapshot,
  emergencies: EmergencyIncident[],
): StadiumSnapshot["kpis"] {
  const activeCount = emergencies.filter((e) => e.status !== "resolved").length;
  const avgWait = avgGateWait(snapshot.gates);
  const throughput = totalGateThroughput(snapshot.gates);

  return snapshot.kpis.map((kpi) => {
    if (kpi.label === "Live Occupancy") {
      return { ...kpi, value: snapshot.occupancy };
    }
    if (kpi.label === "Active Incidents") {
      return {
        ...kpi,
        value: activeCount,
        status: activeCount > 2 ? "congested" : activeCount > 0 ? "elevated" : "normal",
      };
    }
    if (kpi.label === "Avg Gate Wait") {
      return { ...kpi, value: avgWait.toFixed(1), unit: "min" };
    }
    if (kpi.label === "Throughput / min") {
      return { ...kpi, value: throughput.toLocaleString("en-IN") };
    }
    return kpi;
  });
}

const INCIDENT_TEMPLATES: Pick<
  EmergencyIncident,
  "type" | "title" | "location" | "summary" | "assignedTeam"
>[] = [
  {
    type: "medical",
    title: "Medical assist — East Pavilion",
    location: "East Pavilion — Block B",
    summary: "Patron collapse reported; nearest first aid team alerted via sensor mesh.",
    assignedTeam: "Gujarat EMS Unit 8",
  },
  {
    type: "fire_alert",
    title: "Smoke trace — West Gallery concessions",
    location: "West Gallery — Concourse L2",
    summary: "Low-level smoke signature in kitchen zone; fire panel cross-check in progress.",
    assignedTeam: "Fire Watch 3",
  },
  {
    type: "suspicious_activity",
    title: "Perimeter breach scan — NW Media",
    location: "Gate 8 — NW Media",
    summary: "Secondary screening triggered on RFID mismatch; K9 unit requested.",
    assignedTeam: "Security Cell 5",
  },
];

function maybeAddEmergency(
  incidents: EmergencyIncident[],
): EmergencyIncident[] {
  if (Math.random() > 0.1 || incidents.length >= 5) return incidents;

  const template =
    INCIDENT_TEMPLATES[Math.floor(Math.random() * INCIDENT_TEMPLATES.length)];
  const gate = gateZones[Math.floor(Math.random() * gateZones.length)];
  const stand = standZones[Math.floor(Math.random() * standZones.length)];
  const useGate = Math.random() > 0.4;

  const newIncident: EmergencyIncident = {
    id: `inc-${Date.now()}`,
    type: template.type,
    title: template.title,
    location: template.location,
    severity: randomBetween(0, 1) > 0.55 ? "high" : "medium",
    status: "detected",
    detectedAt: new Date().toISOString(),
    etaMinutes: Math.round(randomBetween(4, 12)),
    assignedTeam: template.assignedTeam,
    fastestPath: useGate
      ? `Screening → ${gate.name} (${Math.round(randomBetween(80, 200))}m)`
      : `${stand.name} concourse → incident point`,
    evacuationImpact: Math.round(randomBetween(4, 18)),
    summary: template.summary,
    coordinates: useGate
      ? { x: gate.x, y: gate.y }
      : { x: stand.x, y: stand.y },
  };

  return [newIncident, ...incidents].slice(0, 5);
}

export function tickSimulation(
  snapshot: StadiumSnapshot,
  emergencies: EmergencyIncident[],
): { snapshot: StadiumSnapshot; emergencies: EmergencyIncident[] } {
  const gates = snapshot.gates.map((m) => {
    const zone = gateZoneById(m.id);
    return zone ? mutateGateZone(m, zone) : m;
  });
  const stands = snapshot.stands.map((m) => mutateStandZone(m));
  const occupancy = computeOccupancy(stands);
  const heatmap = syncHeatmap(snapshot.heatmap, stands);
  const routes = createRouteSuggestions(gates);

  const updatedEmergencies = emergencies.map((inc) => {
    if (inc.status === "detected" && Math.random() > 0.72) {
      return { ...inc, status: "dispatching" as const };
    }
    if (inc.status === "dispatching" && Math.random() > 0.58) {
      return {
        ...inc,
        status: "responding" as const,
        etaMinutes: Math.max(1, inc.etaMinutes - 1),
      };
    }
    return inc;
  });

  const finalEmergencies = maybeAddEmergency(updatedEmergencies);
  const crowdStressScore = computeCrowdStress(gates, stands, finalEmergencies);
  const aiConfidence = computeAiConfidence(crowdStressScore, gates);

  let updatedSnapshot: StadiumSnapshot = {
    ...snapshot,
    timestamp: new Date().toISOString(),
    gates,
    stands,
    heatmap,
    routes,
    occupancy,
    occupancyPercent: (occupancy / CAPACITY) * 100,
    crowdStressScore,
    aiConfidence,
    agents: createAgentFeed(gates, stands),
  };

  updatedSnapshot = {
    ...updatedSnapshot,
    kpis: syncKpis(updatedSnapshot, finalEmergencies),
  };

  return {
    snapshot: updatedSnapshot,
    emergencies: finalEmergencies,
  };
}

export function bootstrapSimulation() {
  return {
    snapshot: createInitialSnapshot(),
    emergencies: createInitialEmergencies(),
  };
}
