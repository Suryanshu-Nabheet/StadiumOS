import { gates, stands } from "@/config/stadium";
import { siteConfig } from "@/config/site";
import type { EmergencyIncident } from "@/types/emergency";
import type {
  AgentActivity,
  CrowdHeatCell,
  MatchKPI,
  RouteSuggestion,
  StadiumSnapshot,
  TrafficIndicator,
  WeatherAlert,
  ZoneMetrics,
  ZoneStatus,
} from "@/types/stadium";
import { clamp, randomBetween } from "@/lib/utils";

function statusFromDensity(density: number): ZoneStatus {
  if (density >= 88) return "critical";
  if (density >= 72) return "congested";
  if (density >= 55) return "elevated";
  return "normal";
}

function buildZone(
  id: string,
  name: string,
  baseDensity: number,
): ZoneMetrics {
  const density = clamp(baseDensity + randomBetween(-8, 8), 20, 98);
  return {
    id,
    name,
    density,
    throughput: Math.round(randomBetween(180, 920)),
    waitMinutes: Math.round(randomBetween(2, 28)),
    status: statusFromDensity(density),
    pressure: clamp(density * 0.92 + randomBetween(-5, 10), 0, 100),
    trend: ["up", "down", "stable"][Math.floor(Math.random() * 3)] as
      | "up"
      | "down"
      | "stable",
  };
}

function buildHeatmap(): CrowdHeatCell[] {
  const cells: CrowdHeatCell[] = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 16; col++) {
      const dist = Math.hypot(col - 8, row - 6);
      const base = Math.max(0, 1 - dist / 10);
      cells.push({
        x: col,
        y: row,
        intensity: clamp(base + randomBetween(-0.15, 0.35), 0, 1),
      });
    }
  }
  return cells;
}

export function createInitialSnapshot(): StadiumSnapshot {
  const gateMetrics = gates.map((g, i) =>
    buildZone(g.id, g.name, 45 + i * 5 + randomBetween(0, 15)),
  );
  const standMetrics = stands.map((s, i) =>
    buildZone(s.id, s.name, 50 + i * 4 + randomBetween(0, 12)),
  );
  const occupancy = Math.round(siteConfig.match.capacity * 0.87);

  return {
    timestamp: new Date().toISOString(),
    occupancy,
    occupancyPercent: (occupancy / siteConfig.match.capacity) * 100,
    crowdStressScore: 62,
    aiConfidence: 91.4,
    gates: gateMetrics,
    stands: standMetrics,
    heatmap: buildHeatmap(),
    routes: createRouteSuggestions(gateMetrics),
    weather: [
      {
        id: "w1",
        type: "Humidity Spike",
        message: "Humidity rising to 78% — heat exhaustion risk elevated in South Stand",
        severity: "medium",
        timestamp: new Date().toISOString(),
      },
    ],
    kpis: [
      { label: "Live Occupancy", value: occupancy, unit: "fans", status: "elevated" },
      { label: "Avg Gate Wait", value: "11.2", unit: "min", delta: 2.1 },
      { label: "Active Incidents", value: 2, status: "congested" },
      { label: "AI Agents Online", value: 6, status: "normal" },
      { label: "Evac Readiness", value: "94%", status: "normal" },
      { label: "Throughput / min", value: "4,820", delta: -3.2 },
    ],
    agents: createAgentFeed(),
    traffic: [
      { zone: "Ring Road North", severity: "high", vehiclesPerMin: 142, etaMinutes: 22 },
      { zone: "Metro Shuttle Hub", severity: "medium", vehiclesPerMin: 88, etaMinutes: 14 },
      { zone: "VIP Convoy Lane", severity: "low", vehiclesPerMin: 24, etaMinutes: 6 },
    ],
  };
}

function createRouteSuggestions(gates: ZoneMetrics[]): RouteSuggestion[] {
  const overloaded = [...gates].sort((a, b) => b.density - a.density)[0];
  const alternate = [...gates].sort((a, b) => a.density - b.density)[0];
  return [
    {
      id: "r1",
      from: overloaded?.name ?? "Gate E",
      to: alternate?.name ?? "Gate G",
      reason: "Gate pressure exceeds safe threshold — AI rerouting inbound flow",
      impact: "Est. -18% congestion in 8 min",
      confidence: 89,
      priority: "high",
    },
    {
      id: "r2",
      from: "South Stand Concourse",
      to: "East Pavilion Route B",
      reason: "Panic-risk zone detected — proactive dispersal",
      impact: "Crowd stress -12%",
      confidence: 84,
      priority: "medium",
    },
  ];
}

export function createAgentFeed(): AgentActivity[] {
  const now = Date.now();
  return [
    {
      id: "a1",
      agent: "CrowdFlow-α",
      action: "Rerouting 2,400 fans from Gate E → Gate G",
      target: "Gate E — South",
      confidence: 91,
      timestamp: new Date(now - 12000).toISOString(),
      status: "active",
    },
    {
      id: "a2",
      agent: "Emergency-β",
      action: "Pre-positioning medical unit near South Stand",
      target: "Medical Bay 2",
      confidence: 88,
      timestamp: new Date(now - 45000).toISOString(),
      status: "active",
    },
    {
      id: "a3",
      agent: "Security-γ",
      action: "Anomaly scan complete — no threat escalation",
      target: "East Pavilion",
      confidence: 95,
      timestamp: new Date(now - 90000).toISOString(),
      status: "completed",
    },
    {
      id: "a4",
      agent: "Traffic-δ",
      action: "Signaling rideshare surge pricing zone",
      target: "Parking North",
      confidence: 82,
      timestamp: new Date(now - 180000).toISOString(),
      status: "queued",
    },
  ];
}

export function createInitialEmergencies(): EmergencyIncident[] {
  return [
    {
      id: "inc-001",
      type: "heat_exhaustion",
      title: "Heat exhaustion — Section S3 Row 12",
      location: "South Stand — Level 2",
      severity: "high",
      status: "responding",
      detectedAt: new Date(Date.now() - 180000).toISOString(),
      etaMinutes: 4,
      assignedTeam: "Med-Alpha-3",
      fastestPath: "Medical Bay 2 → South Stand L2 (340m)",
      evacuationImpact: 8,
      summary:
        "AI detected elevated biometric stress signatures. Ambulance unit dispatched via optimal concourse path.",
      coordinates: { x: 420, y: 470 },
    },
    {
      id: "inc-002",
      type: "stampede_risk",
      title: "Stampede risk — Gate E bottleneck",
      location: "Gate E — South Entry",
      severity: "critical",
      status: "dispatching",
      detectedAt: new Date(Date.now() - 60000).toISOString(),
      etaMinutes: 2,
      assignedTeam: "Security Rapid-7",
      fastestPath: "CP-3 → Gate E choke point (120m)",
      evacuationImpact: 34,
      summary:
        "Crowd density spike + reverse flow detected. Autonomous reroute and barrier deployment recommended.",
      coordinates: { x: 400, y: 540 },
    },
    {
      id: "inc-003",
      type: "suspicious_activity",
      title: "Unattended bag — East Pavilion",
      location: "East Pavilion — Zone C",
      severity: "medium",
      status: "detected",
      detectedAt: new Date(Date.now() - 30000).toISOString(),
      etaMinutes: 6,
      assignedTeam: "K9 Unit-2",
      fastestPath: "Security CP-1 → Zone C (280m)",
      evacuationImpact: 12,
      summary: "Computer vision flagged stationary object. Perimeter cordon suggested pending verification.",
      coordinates: { x: 580, y: 300 },
    },
  ];
}

export function createTimelineEvents() {
  return [
    { time: "19:42", event: "Gates opened — pre-match ingress", type: "info" },
    { time: "20:15", event: "Peak ingress — Gate E at 91% capacity", type: "warning" },
    { time: "20:28", event: "AI reroute activated — Gate E → G", type: "ai" },
    { time: "20:45", event: "Match LIVE — occupancy 87%", type: "info" },
    { time: "21:02", event: "Heat alert — South Stand humidity risk", type: "warning" },
    { time: "21:08", event: "Medical dispatch — Med-Alpha-3", type: "critical" },
  ];
}
