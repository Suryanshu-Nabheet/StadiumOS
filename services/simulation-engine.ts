import { siteConfig } from "@/config/site";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot, ZoneMetrics } from "@/types/stadium";
import { clamp, randomBetween } from "@/lib/utils";
import {
  createAgentFeed,
  createInitialEmergencies,
  createInitialSnapshot,
} from "@/services/mock-data";

const CAPACITY = siteConfig.match.capacity;

function mutateZones(zones: ZoneMetrics[]): ZoneMetrics[] {
  return zones.map((z) => {
    const delta = randomBetween(-6, 6);
    const density = clamp(z.density + delta, 15, 99);
    const status =
      density >= 88
        ? "critical"
        : density >= 72
          ? "congested"
          : density >= 55
            ? "elevated"
            : "normal";
    return {
      ...z,
      density,
      status,
      pressure: clamp(z.pressure + randomBetween(-4, 6), 0, 100),
      waitMinutes: clamp(z.waitMinutes + randomBetween(-2, 3), 1, 35),
      throughput: Math.round(
        clamp(z.throughput + randomBetween(-80, 120), 100, 1200),
      ),
      trend: delta > 2 ? "up" : delta < -2 ? "down" : "stable",
    };
  });
}

function mutateHeatmap(
  snapshot: StadiumSnapshot,
): StadiumSnapshot["heatmap"] {
  return snapshot.heatmap.map((cell) => ({
    ...cell,
    intensity: clamp(cell.intensity + randomBetween(-0.08, 0.08), 0, 1),
  }));
}

function syncKpis(
  snapshot: StadiumSnapshot,
  emergencies: EmergencyIncident[],
): StadiumSnapshot["kpis"] {
  const activeCount = emergencies.filter((e) => e.status !== "resolved").length;
  const avgWait =
    snapshot.gates.reduce((sum, g) => sum + g.waitMinutes, 0) /
    Math.max(snapshot.gates.length, 1);

  return snapshot.kpis.map((kpi) => {
    if (kpi.label === "Live Occupancy") {
      return { ...kpi, value: snapshot.occupancy };
    }
    if (kpi.label === "Active Incidents") {
      return { ...kpi, value: activeCount, status: activeCount > 2 ? "congested" : "normal" };
    }
    if (kpi.label === "Avg Gate Wait") {
      return { ...kpi, value: avgWait.toFixed(1), unit: "min" };
    }
    return kpi;
  });
}

function maybeAddEmergency(
  incidents: EmergencyIncident[],
): EmergencyIncident[] {
  if (Math.random() > 0.12 || incidents.length >= 6) return incidents;
  const types = [
    "medical",
    "fire_alert",
    "suspicious_activity",
  ] as EmergencyIncident["type"][];
  const type = types[Math.floor(Math.random() * types.length)];
  const newIncident: EmergencyIncident = {
    id: `inc-${Date.now()}`,
    type,
    title: `Auto-detected ${type.replace("_", " ")} — Sector ${Math.floor(randomBetween(1, 8))}`,
    location: `Zone ${String.fromCharCode(65 + Math.floor(randomBetween(0, 4)))}`,
    severity: randomBetween(0, 1) > 0.5 ? "high" : "medium",
    status: "detected",
    detectedAt: new Date().toISOString(),
    etaMinutes: Math.round(randomBetween(3, 10)),
    assignedTeam: `Auto-Unit-${Math.floor(randomBetween(1, 9))}`,
    fastestPath: "AI-computed optimal path",
    evacuationImpact: Math.round(randomBetween(5, 25)),
    summary:
      "Autonomous emergency agent flagged anomaly from live sensor fusion.",
    coordinates: {
      x: Math.round(randomBetween(150, 650)),
      y: Math.round(randomBetween(150, 500)),
    },
  };
  return [newIncident, ...incidents].slice(0, 6);
}

export function tickSimulation(
  snapshot: StadiumSnapshot,
  emergencies: EmergencyIncident[],
): { snapshot: StadiumSnapshot; emergencies: EmergencyIncident[] } {
  const gates = mutateZones(snapshot.gates);
  const stands = mutateZones(snapshot.stands);
  const occupancy = Math.round(
    clamp(snapshot.occupancy + randomBetween(-400, 600), 90000, CAPACITY),
  );
  const crowdStressScore = clamp(
    snapshot.crowdStressScore + randomBetween(-3, 5),
    20,
    99,
  );

  let updatedSnapshot: StadiumSnapshot = {
    ...snapshot,
    timestamp: new Date().toISOString(),
    gates,
    stands,
    heatmap: mutateHeatmap(snapshot),
    occupancy,
    occupancyPercent: (occupancy / CAPACITY) * 100,
    crowdStressScore,
    aiConfidence: clamp(snapshot.aiConfidence + randomBetween(-1.2, 0.8), 75, 99),
    agents: createAgentFeed(),
  };

  const updatedEmergencies = emergencies.map((inc) => {
    if (inc.status === "detected" && Math.random() > 0.7) {
      return { ...inc, status: "dispatching" as const };
    }
    if (inc.status === "dispatching" && Math.random() > 0.6) {
      return {
        ...inc,
        status: "responding" as const,
        etaMinutes: Math.max(1, inc.etaMinutes - 1),
      };
    }
    return inc;
  });

  const finalEmergencies = maybeAddEmergency(updatedEmergencies);
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
