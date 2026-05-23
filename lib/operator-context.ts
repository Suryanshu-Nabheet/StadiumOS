import { siteConfig } from "@/config/site";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";

export interface OperatorContext {
  snapshot: StadiumSnapshot;
  emergencies: EmergencyIncident[];
}

/** Full live-state block for Gemini + local fallback — mirrors all dashboard panels. */
export function buildOperatorContextBlock(ctx: OperatorContext): string {
  const { snapshot: s, emergencies } = ctx;
  const { match } = siteConfig;

  const activeIncidents = emergencies.filter((e) => e.status !== "resolved");
  const gates = [...s.gates].sort((a, b) => b.density - a.density);
  const stands = [...s.stands].sort((a, b) => b.density - a.density);
  const hotCells = [...s.heatmap]
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 5);

  const gateLines = gates
    .map(
      (g) =>
        `  • ${g.name}: ${g.density.toFixed(0)}% density, ${g.waitMinutes}min wait, ${g.throughput}/min throughput, status=${g.status}, trend=${g.trend}`,
    )
    .join("\n");

  const standLines = stands
    .map((st) => `  • ${st.name}: ${st.density.toFixed(0)}% (${st.status})`)
    .join("\n");

  const routeLines =
    s.routes.length > 0
      ? s.routes
          .map(
            (r) =>
              `  • ${r.from} → ${r.to}: ${r.reason} | impact: ${r.impact} | confidence ${r.confidence}%`,
          )
          .join("\n")
      : "  • None";

  const incidentLines =
    activeIncidents.length > 0
      ? activeIncidents
          .map(
            (e) =>
              `  • [${e.severity}/${e.status}] ${e.title} @ ${e.location} — team ${e.assignedTeam}, ETA ${e.etaMinutes}m, evac impact ${e.evacuationImpact}%`,
          )
          .join("\n")
      : "  • None active";

  const agentLines = s.agents
    .map(
      (a) =>
        `  • ${a.agent} (${a.status}): ${a.action} → ${a.target} [${a.confidence}%]`,
    )
    .join("\n");

  const trafficLines = s.traffic
    .map(
      (t) =>
        `  • ${t.zone}: ${t.severity} — ${t.vehiclesPerMin} veh/min, ETA ${t.etaMinutes}m`,
    )
    .join("\n");

  const weatherLines = s.weather
    .map((w) => `  • [${w.severity}] ${w.type}: ${w.message}`)
    .join("\n");

  const kpiLines = s.kpis
    .map((k) => `  • ${k.label}: ${k.value}${k.unit ? ` ${k.unit}` : ""}`)
    .join("\n");

  const heatLines = hotCells
    .map((c) => `  • cell(${c.x},${c.y}) intensity ${(c.intensity * 100).toFixed(0)}%`)
    .join("\n");

  return `
MATCH: ${match.title} | ${match.teams}
VENUE: ${match.venue} | Capacity ${match.capacity.toLocaleString()}
SNAPSHOT TIME: ${s.timestamp}

=== COMMAND CENTER KPIs ===
${kpiLines}

=== LIVE METRICS ===
Occupancy: ${s.occupancy.toLocaleString()} (${s.occupancyPercent.toFixed(1)}%)
Crowd stress index: ${s.crowdStressScore}/100
AI fusion confidence: ${s.aiConfidence.toFixed(1)}%

=== GATES (Crowd Flow / Gate Pressure panels) ===
${gateLines}

=== STANDS (Digital Twin / Heatmap) ===
${standLines}

=== HEATMAP HOTSPOTS ===
${heatLines}

=== AI ROUTE SUGGESTIONS ===
${routeLines}

=== ACTIVE INCIDENTS (Emergency board / alerts) ===
${incidentLines}

=== AI AGENT FEED (autonomous actions) ===
${agentLines}

=== EXTERNAL TRAFFIC ===
${trafficLines}

=== WEATHER ===
${weatherLines}
`.trim();
}
