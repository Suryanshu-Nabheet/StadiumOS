import { gates as gateZones, stands as standZones } from "@/config/stadium";
import { siteConfig } from "@/config/site";
import type { EmergencyIncident } from "@/types/emergency";
import type {
  CrowdHeatCell,
  GateZone,
  RouteSuggestion,
  StandZone,
  ZoneMetrics,
  ZoneStatus,
} from "@/types/stadium";
import { clamp, randomBetween } from "@/lib/utils";

const CAPACITY = siteConfig.match.capacity;

export function statusFromDensity(density: number): ZoneStatus {
  if (density >= 88) return "critical";
  if (density >= 72) return "congested";
  if (density >= 55) return "elevated";
  return "normal";
}

/** Wait time rises non-linearly once density crosses ~65%. */
export function waitMinutesFromDensity(density: number, base = 4): number {
  const factor = density < 55 ? 0.35 : density < 72 ? 0.65 : density < 88 ? 1 : 1.45;
  return Math.round(clamp(base + (density / 100) * 22 * factor, 2, 38));
}

/** Throughput falls as gates saturate (queueing theory approximation). */
export function throughputFromDensity(density: number, hourlyCapacity: number): number {
  const peakPerMin = hourlyCapacity / 60;
  const efficiency = clamp(1.15 - density / 95, 0.22, 1);
  return Math.round(peakPerMin * efficiency);
}

export function pressureFromDensity(density: number): number {
  return clamp(Math.round(density * 0.94 + randomBetween(-3, 5)), 0, 100);
}

export function buildGateMetrics(
  zone: GateZone,
  baseDensity: number,
): ZoneMetrics {
  const density = clamp(baseDensity + randomBetween(-5, 5), 18, 97);
  const throughput = throughputFromDensity(density, zone.capacity);
  return {
    id: zone.id,
    name: zone.name,
    density,
    throughput,
    waitMinutes: waitMinutesFromDensity(density),
    status: statusFromDensity(density),
    pressure: pressureFromDensity(density),
    trend: "stable",
  };
}

export function buildStandMetrics(
  zone: StandZone,
  baseDensity: number,
): ZoneMetrics {
  const density = clamp(baseDensity + randomBetween(-4, 4), 25, 96);
  return {
    id: zone.id,
    name: zone.name,
    density,
    throughput: Math.round(zone.seats * 0.002 * (density / 100)),
    waitMinutes: waitMinutesFromDensity(density, 2),
    status: statusFromDensity(density),
    pressure: pressureFromDensity(density),
    trend: "stable",
  };
}

export function computeOccupancy(standMetrics: ZoneMetrics[]): number {
  return standZones.reduce((sum, zone) => {
    const m = standMetrics.find((s) => s.id === zone.id);
    const density = m?.density ?? 50;
    return sum + Math.round(zone.seats * (density / 100));
  }, 0);
}

export function computeCrowdStress(
  gateMetrics: ZoneMetrics[],
  standMetrics: ZoneMetrics[],
  emergencies: EmergencyIncident[],
): number {
  const gateAvg =
    gateMetrics.reduce((s, g) => s + g.density, 0) / Math.max(gateMetrics.length, 1);
  const standAvg =
    standMetrics.reduce((s, g) => s + g.density, 0) / Math.max(standMetrics.length, 1);
  const criticalGates = gateMetrics.filter((g) => g.status === "critical").length;
  const activeIncidents = emergencies.filter((e) => e.status !== "resolved").length;
  const raw =
    gateAvg * 0.45 +
    standAvg * 0.35 +
    criticalGates * 6 +
    activeIncidents * 4;
  return Math.round(clamp(raw, 18, 98));
}

export function computeAiConfidence(
  crowdStress: number,
  gateMetrics: ZoneMetrics[],
): number {
  const sensorCoverage = gateMetrics.filter((g) => g.density > 0).length / gateMetrics.length;
  const base = 96 - crowdStress * 0.12 + sensorCoverage * 3;
  return clamp(Number(base.toFixed(1)), 76, 99.2);
}

export function buildHeatmapFromStands(standMetrics: ZoneMetrics[]): CrowdHeatCell[] {
  const cells: CrowdHeatCell[] = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 16; col++) {
      let intensity = 0.08;
      for (const zone of standZones) {
        const m = standMetrics.find((s) => s.id === zone.id);
        if (!m) continue;
        const standCol = Math.round((zone.x / 800) * 15);
        const standRow = Math.round((zone.y / 800) * 11);
        const dist = Math.hypot(col - standCol, row - standRow);
        if (dist < 4.5) {
          intensity += (m.density / 100) * (1 - dist / 4.5) * 0.55;
        }
      }
      const pitchDist = Math.hypot(col - 8, row - 6);
      intensity += Math.max(0, 0.35 - pitchDist / 14) * 0.25;
      cells.push({
        x: col,
        y: row,
        intensity: clamp(intensity + randomBetween(-0.04, 0.06), 0.05, 1),
      });
    }
  }
  return cells;
}

export function syncHeatmap(
  heatmap: CrowdHeatCell[],
  standMetrics: ZoneMetrics[],
): CrowdHeatCell[] {
  const target = buildHeatmapFromStands(standMetrics);
  return heatmap.map((cell, i) => ({
    ...cell,
    intensity: clamp(
      cell.intensity * 0.55 + (target[i]?.intensity ?? cell.intensity) * 0.45,
      0.05,
      1,
    ),
  }));
}

export function createRouteSuggestions(gateMetrics: ZoneMetrics[]): RouteSuggestion[] {
  const overloaded = [...gateMetrics].sort((a, b) => b.density - a.density)[0];
  const alternate = [...gateMetrics].sort((a, b) => a.density - b.density)[0];
  const secondHot = [...gateMetrics].sort((a, b) => b.density - a.density)[1];

  if (!overloaded || !alternate) return [];

  const delta = overloaded.density - alternate.density;
  const routes: RouteSuggestion[] = [
    {
      id: "r1",
      from: overloaded.name,
      to: alternate.name,
      fromGateId: overloaded.id,
      toGateId: alternate.id,
      reason: `Ingress queue exceeds ${Math.round(overloaded.density)}% — divert to lower-pressure gate`,
      impact: `Est. −${Math.min(22, Math.round(delta * 0.35))}% wait in 6–10 min`,
      confidence: clamp(Math.round(82 + delta * 0.15), 75, 96),
      priority: overloaded.density >= 88 ? "critical" : "high",
    },
  ];

  if (secondHot && secondHot.density >= 72) {
    routes.push({
      id: "r2",
      from: `${secondHot.name} concourse`,
      to: "East Pavilion upper walkway",
      reason: "Stand-level density spike — proactive dispersal before stress cascade",
      impact: "Crowd stress −8–14%",
      confidence: 84,
      priority: "medium",
    });
  }

  return routes;
}

export function mutateGateZone(
  metrics: ZoneMetrics,
  zone: GateZone,
): ZoneMetrics {
  const delta = randomBetween(-4, 5);
  const density = clamp(metrics.density + delta, 15, 98);
  const throughput = throughputFromDensity(density, zone.capacity);
  return {
    ...metrics,
    density,
    throughput,
    waitMinutes: waitMinutesFromDensity(density),
    status: statusFromDensity(density),
    pressure: pressureFromDensity(density),
    trend: delta > 2 ? "up" : delta < -2 ? "down" : metrics.trend,
  };
}

export function mutateStandZone(metrics: ZoneMetrics): ZoneMetrics {
  const delta = randomBetween(-3, 4);
  const density = clamp(metrics.density + delta, 22, 97);
  const zone = standZones.find((z) => z.id === metrics.id);
  return {
    ...metrics,
    density,
    throughput: zone
      ? Math.round(zone.seats * 0.002 * (density / 100))
      : metrics.throughput,
    waitMinutes: waitMinutesFromDensity(density, 2),
    status: statusFromDensity(density),
    pressure: pressureFromDensity(density),
    trend: delta > 1.5 ? "up" : delta < -1.5 ? "down" : metrics.trend,
  };
}

export function totalGateThroughput(gateMetrics: ZoneMetrics[]): number {
  return gateMetrics.reduce((s, g) => s + g.throughput, 0);
}

export function avgGateWait(gateMetrics: ZoneMetrics[]): number {
  return (
    gateMetrics.reduce((sum, g) => sum + g.waitMinutes, 0) /
    Math.max(gateMetrics.length, 1)
  );
}

export function gateZoneById(id: string): GateZone | undefined {
  return gateZones.find((g) => g.id === id);
}

export function standZoneById(id: string): StandZone | undefined {
  return standZones.find((s) => s.id === id);
}

export { CAPACITY };
