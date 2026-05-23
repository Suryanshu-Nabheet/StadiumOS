import { gates, stands, STADIUM_CENTER } from "@/config/stadium";
import { polar } from "@/lib/stadium-map-layout";
import { siteConfig } from "@/config/site";
import type { EmergencyIncident } from "@/types/emergency";
import type { AgentActivity, StadiumSnapshot, TrafficIndicator, WeatherAlert } from "@/types/stadium";
import { randomBetween } from "@/lib/utils";
import {
  avgGateWait,
  buildGateMetrics,
  buildHeatmapFromStands,
  buildStandMetrics,
  computeAiConfidence,
  computeCrowdStress,
  computeOccupancy,
  createRouteSuggestions,
  totalGateThroughput,
} from "@/lib/stadium-physics";

export function createInitialSnapshot(): StadiumSnapshot {
  const gateMetrics = gates.map((g, i) =>
    buildGateMetrics(g, 48 + i * 4 + randomBetween(0, 18)),
  );
  const standMetrics = stands.map((s, i) =>
    buildStandMetrics(s, 52 + i * 3 + randomBetween(0, 14)),
  );
  const occupancy = computeOccupancy(standMetrics);
  const emergencies = createInitialEmergencies();
  const crowdStressScore = computeCrowdStress(gateMetrics, standMetrics, emergencies);
  const aiConfidence = computeAiConfidence(crowdStressScore, gateMetrics);
  const throughput = totalGateThroughput(gateMetrics);

  return {
    timestamp: new Date().toISOString(),
    occupancy,
    occupancyPercent: (occupancy / siteConfig.match.capacity) * 100,
    crowdStressScore,
    aiConfidence,
    gates: gateMetrics,
    stands: standMetrics,
    heatmap: buildHeatmapFromStands(standMetrics),
    routes: createRouteSuggestions(gateMetrics),
    weather: createWeatherAlerts(),
    kpis: [
      {
        label: "Live Occupancy",
        value: occupancy,
        unit: "fans",
        status: occupancy / siteConfig.match.capacity > 0.85 ? "elevated" : "normal",
      },
      {
        label: "Avg Gate Wait",
        value: avgGateWait(gateMetrics).toFixed(1),
        unit: "min",
        delta: 1.8,
      },
      {
        label: "Active Incidents",
        value: emergencies.filter((e) => e.status !== "resolved").length,
        status: "congested",
      },
      { label: "AI Agents Online", value: 6, status: "normal" },
      { label: "Evac Readiness", value: "94%", status: "normal" },
      {
        label: "Throughput / min",
        value: throughput.toLocaleString("en-IN"),
        delta: -2.4,
      },
    ],
    agents: createAgentFeed(gateMetrics, standMetrics),
    traffic: createTrafficIndicators(),
  };
}

function createWeatherAlerts(): WeatherAlert[] {
  const { conditions } = siteConfig.match;
  return [
    {
      id: "w1",
      type: "Humidity & heat stress",
      message: `${conditions.humidityPct}% humidity at ${conditions.temperatureC}°C — elevated heat exhaustion risk in Reliance End (South) and lower bowl`,
      severity: "medium",
      timestamp: new Date().toISOString(),
    },
    {
      id: "w2",
      type: "Dew point advisory",
      message: `${conditions.dewRisk} — grip & outfield monitoring for night session`,
      severity: "low",
      timestamp: new Date().toISOString(),
    },
  ];
}

function createTrafficIndicators(): TrafficIndicator[] {
  return [
    {
      zone: "Sardar Patel Ring Road (North)",
      severity: "high",
      vehiclesPerMin: 128,
      etaMinutes: 24,
    },
    {
      zone: "Motera Metro Shuttle — Gate 3",
      severity: "medium",
      vehiclesPerMin: 76,
      etaMinutes: 16,
    },
    {
      zone: "VIP Plaza — Gate 8",
      severity: "low",
      vehiclesPerMin: 18,
      etaMinutes: 5,
    },
    {
      zone: "South Service Road post-match",
      severity: "medium",
      vehiclesPerMin: 94,
      etaMinutes: 19,
    },
  ];
}

export function createAgentFeed(
  gateMetrics: StadiumSnapshot["gates"],
  standMetrics: StadiumSnapshot["stands"],
): AgentActivity[] {
  const now = Date.now();
  const busiest = [...gateMetrics].sort((a, b) => b.density - a.density)[0];
  const lightest = [...gateMetrics].sort((a, b) => a.density - b.density)[0];
  const hotStand = [...standMetrics].sort((a, b) => b.density - a.density)[0];

  return [
    {
      id: "a1",
      agent: "CrowdFlow-α",
      action: `Diverting ~${Math.round((busiest?.throughput ?? 400) * 0.35)} fans/min from ${busiest?.name ?? "Gate 5"} → ${lightest?.name ?? "Gate 7"}`,
      target: busiest?.name ?? "Gate 5 — South Bowl",
      confidence: 91,
      timestamp: new Date(now - 12000).toISOString(),
      status: "active",
    },
    {
      id: "a2",
      agent: "Emergency-β",
      action: `Staging ambulance at Trauma Bay — ${hotStand?.name ?? "South stand"} heat cluster`,
      target: "Trauma Bay — South",
      confidence: 88,
      timestamp: new Date(now - 45000).toISOString(),
      status: "active",
    },
    {
      id: "a3",
      agent: "Security-γ",
      action: "Baggage scan anomaly cleared — East Pavilion Zone C",
      target: "Screening — East",
      confidence: 95,
      timestamp: new Date(now - 90000).toISOString(),
      status: "completed",
    },
    {
      id: "a4",
      agent: "Traffic-δ",
      action: "Metro shuttle pulse dispatch — Motera station surge",
      target: "P2 — Motera Metro Shuttle",
      confidence: 82,
      timestamp: new Date(now - 180000).toISOString(),
      status: "queued",
    },
    {
      id: "a5",
      agent: "Weather-ε",
      action: `Dew monitoring — ${siteConfig.match.conditions.dewRisk}`,
      target: "Pitch & outfield sensors",
      confidence: 86,
      timestamp: new Date(now - 240000).toISOString(),
      status: "active",
    },
  ];
}

export function createInitialEmergencies(): EmergencyIncident[] {
  return [
    {
      id: "inc-001",
      type: "heat_exhaustion",
      title: "Heat exhaustion — Reliance End Block C",
      location: "Reliance End (South) — Tier 2, Block C12",
      severity: "high",
      status: "responding",
      detectedAt: new Date(Date.now() - 180000).toISOString(),
      etaMinutes: 4,
      assignedTeam: "Gujarat EMS Unit 12",
      fastestPath: "Trauma Bay — South → Block C12 via concourse (280m, ~3.5 min)",
      evacuationImpact: 6,
      summary:
        "Wearable + CCTV fusion flagged 3 patrons with elevated heat stress. Hydration team en route; no stand evacuation required.",
      coordinates: polar(STADIUM_CENTER.x, STADIUM_CENTER.y, 275, 168),
    },
    {
      id: "inc-002",
      type: "stampede_risk",
      title: "Ingress surge — Gate 5 South Bowl",
      location: "Gate 5 — South Bowl screening",
      severity: "critical",
      status: "dispatching",
      detectedAt: new Date(Date.now() - 60000).toISOString(),
      etaMinutes: 2,
      assignedTeam: "Rapid Response Squad 7",
      fastestPath: "Screening — South → Gate 5 choke (95m)",
      evacuationImpact: 28,
      summary:
        "Density >90% with reverse flow detected post-innings break. AI reroute to Gate 6 & Gate 7 active; retractable belt deployment recommended.",
      coordinates: polar(STADIUM_CENTER.x, STADIUM_CENTER.y, 355, 178),
    },
    {
      id: "inc-003",
      type: "suspicious_activity",
      title: "Unattended bag — East Pavilion L1",
      location: "East Pavilion — Zone C, Row 8",
      severity: "medium",
      status: "detected",
      detectedAt: new Date(Date.now() - 30000).toISOString(),
      etaMinutes: 6,
      assignedTeam: "K9 & EOD Cell 2",
      fastestPath: "Screening — East → Zone C (220m)",
      evacuationImpact: 11,
      summary:
        "CV model flagged stationary object >90s. 15m cordon suggested; adjacent rows partial hold.",
      coordinates: polar(STADIUM_CENTER.x, STADIUM_CENTER.y, 268, 88),
    },
  ];
}

export function createTimelineEvents() {
  return [
    { time: "19:15", event: "Gates open — 132,000 capacity venue, phased ingress", type: "info" as const },
    { time: "19:48", event: "Peak ingress — Gate 5 South Bowl at 89% pressure", type: "warning" as const },
    { time: "20:05", event: "AI reroute — Gate 5 → Gate 7 West Lower", type: "ai" as const },
    { time: "20:15", event: "Match LIVE — 87% seated occupancy", type: "info" as const },
    { time: "21:02", event: "Humidity alert — Reliance End heat stress monitoring", type: "warning" as const },
    { time: "21:08", event: "EMS dispatch — Gujarat EMS Unit 12", type: "critical" as const },
  ];
}

export { createRouteSuggestions };
