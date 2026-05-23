import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  buildOperatorContextBlock,
  type OperatorContext,
} from "@/lib/operator-context";
import { getServerEnv } from "@/server/config/env";
import { siteConfig } from "@/config/site";

const SYSTEM_PROMPT = `You are StadiumOS AI — the unified stadium operations copilot for ${siteConfig.match.venue} Developed by Suryanshu Nabheet.
You have FULL read access to the live operations database (same Zustand telemetry stream as the Command Center dashboard).

Your answers must reference REAL numbers from the LIVE CONTEXT below. Align recommendations with these modules:
• Command Center KPIs and stadium map
• Crowd Flow / gate pressure / heatmap
• Emergency response board and incident map
• Digital twin zones
• Analytics (throughput, stress, AI confidence)
• Autonomous agent feed actions already in progress

Be concise, actionable, and operator-focused. Use bullet points. Never invent gates, incidents, or metrics not in context.`;

export type { OperatorContext };

function localFallbackResponse(message: string, ctx: OperatorContext): string {
  const q = message.toLowerCase();
  const s = ctx.snapshot;
  const gates = [...s.gates].sort((a, b) => b.density - a.density);
  const safestGate = [...s.gates].sort((a, b) => a.density - b.density)[0];
  const active = ctx.emergencies.filter((e) => e.status !== "resolved");

  if (q.includes("overload") || q.includes("which gate") || q.includes("gate")) {
    const g = gates[0];
    return `**Gate overload — live DB**\n\n• Critical: **${g?.name}** — **${g?.density.toFixed(0)}%** density, **${g?.waitMinutes} min** wait, **${g?.throughput}**/min\n• Alternate ingress: **${safestGate?.name}** (${safestGate?.density.toFixed(0)}%)\n• AI confidence: **${s.aiConfidence.toFixed(0)}%** | Crowd stress: **${s.crowdStressScore}/100**\n\n**Action:** Activate signage per route **${s.routes[0]?.from} → ${s.routes[0]?.to}** (${s.routes[0]?.impact ?? "see dashboard"}).`;
  }

  if (q.includes("congestion") || q.includes("predict") || q.includes("crowd")) {
    const hotStand = [...s.stands].sort((a, b) => b.density - a.density)[0];
    return `**Crowd flow forecast**\n\n• Highest stand pressure: **${hotStand?.name}** (${hotStand?.density.toFixed(0)}%)\n• Occupancy: **${s.occupancyPercent.toFixed(1)}%** of capacity\n• Stress index: **${s.crowdStressScore}/100** (rising risk if >70)\n\n**Agent feed:** ${s.agents[0]?.agent ?? "CrowdFlow"} — ${s.agents[0]?.action ?? "monitoring"}\n\n**Recommend:** Execute top AI route suggestion and monitor heatmap hotspot sector.`;
  }

  if (q.includes("evacuation") || q.includes("safest path") || q.includes("evac")) {
    return `**Evacuation routing**\n\n• Occupancy: **${s.occupancy.toLocaleString()}** fans\n• Active incidents: **${active.length}** (highest impact: ${active[0]?.evacuationImpact ?? 0}%)\n• Prefer exits with lowest stand density; avoid **${gates[0]?.name}** choke point\n\n**Fastest paths from DB:**\n${active.map((e) => `• ${e.title}: ${e.fastestPath}`).join("\n") || "• No active paths"}`;
  }

  if (q.includes("security") || q.includes("move")) {
    return `**Security repositioning**\n\n• Deploy to **${gates[0]?.name}** (${gates[0]?.status})\n• K9/medical priorities from incidents:\n${active.slice(0, 2).map((e) => `• ${e.assignedTeam} → ${e.location}`).join("\n")}\n\n**In progress:** ${s.agents.find((a) => a.agent.includes("Security"))?.action ?? s.agents[1]?.action ?? "See agent feed"}`;
  }

  if (q.includes("report") || q.includes("incident") || q.includes("brief")) {
    return `**Operator brief — ${new Date().toLocaleTimeString()}**\n\n• **${siteConfig.match.title}** — ${s.occupancyPercent.toFixed(0)}% capacity\n• Crowd stress: **${s.crowdStressScore}/100** | AI confidence: **${s.aiConfidence.toFixed(1)}%**\n• Active incidents: **${active.length}**\n• Top gate: **${gates[0]?.name}** (${gates[0]?.density.toFixed(0)}%)\n\n**Priority:** ${active[0]?.title ?? "None"}\n${active[0]?.summary ?? ""}`;
  }

  if (q.includes("agent") || q.includes("feed")) {
    return `**Autonomous agent feed**\n\n${s.agents.map((a) => `• **${a.agent}** (${a.status}): ${a.action}`).join("\n")}`;
  }

  if (q.includes("traffic") || q.includes("parking")) {
    return `**External traffic**\n\n${s.traffic.map((t) => `• **${t.zone}**: ${t.vehiclesPerMin} veh/min, ETA ${t.etaMinutes}m (${t.severity})`).join("\n")}`;
  }

  return `**StadiumOS live summary**\n\n• Occupancy **${s.occupancyPercent.toFixed(1)}%** | Stress **${s.crowdStressScore}/100**\n• Busiest gate: **${gates[0]?.name}**\n• Incidents: **${active.length}** | Routes: **${s.routes.length}** active suggestions\n\nAsk about gates, congestion, evacuation, security, incidents, agents, or traffic.`;
}

export async function generateOperatorResponse(
  message: string,
  ctx: OperatorContext,
): Promise<{ text: string; source: "gemini" | "local" }> {
  const { geminiApiKey: apiKey, geminiModel } = getServerEnv();
  const contextBlock = buildOperatorContextBlock(ctx);

  if (!apiKey) {
    return {
      text: localFallbackResponse(message, ctx),
      source: "local",
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: geminiModel });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\n--- LIVE OPERATIONS DATABASE ---\n${contextBlock}\n\n--- OPERATOR QUERY ---\n${message}`,
            },
          ],
        },
      ],
    });
    const text = result.response.text()?.trim();
    return {
      text: text || localFallbackResponse(message, ctx),
      source: "gemini",
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[assistant] Gemini error:", error);
    }
    return {
      text: localFallbackResponse(message, ctx),
      source: "local",
    };
  }
}
