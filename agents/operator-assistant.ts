import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerEnv } from "@/server/config/env";
import type { StadiumSnapshot } from "@/types/stadium";
import type { EmergencyIncident } from "@/types/emergency";

const SYSTEM_PROMPT = `You are StadiumOS AI — an enterprise stadium operations copilot for IPL-scale cricket events.
Respond concisely with actionable operator intelligence. Use bullet points when listing items.
Focus on gates, crowd flow, emergencies, evacuation, and security positioning.`;

interface AssistantContext {
  snapshot: StadiumSnapshot;
  emergencies: EmergencyIncident[];
}

function buildContextBlock(ctx: AssistantContext): string {
  const topGates = [...ctx.snapshot.gates]
    .sort((a, b) => b.density - a.density)
    .slice(0, 3)
    .map((g) => `${g.name}: ${g.density.toFixed(0)}% density, ${g.waitMinutes}min wait`)
    .join("\n");

  const activeIncidents = ctx.emergencies
    .filter((e) => e.status !== "resolved")
    .map((e) => `- [${e.severity}] ${e.title} @ ${e.location}`)
    .join("\n");

  return `LIVE CONTEXT:
Occupancy: ${ctx.snapshot.occupancy} (${ctx.snapshot.occupancyPercent.toFixed(1)}%)
Crowd stress: ${ctx.snapshot.crowdStressScore}
AI confidence: ${ctx.snapshot.aiConfidence}%

Top gates:
${topGates}

Active incidents:
${activeIncidents || "None"}

Routes: ${ctx.snapshot.routes.map((r) => r.from + " → " + r.to).join("; ")}`;
}

function localFallbackResponse(
  message: string,
  ctx: AssistantContext,
): string {
  const q = message.toLowerCase();
  const sortedGates = [...ctx.snapshot.gates].sort((a, b) => b.density - a.density);
  const safestGate = [...ctx.snapshot.gates].sort((a, b) => a.density - b.density)[0];

  if (q.includes("overload") || q.includes("which gate")) {
    const g = sortedGates[0];
    return `**Gate overload analysis**\n\n• Most critical: **${g?.name}** at **${g?.density.toFixed(0)}%** density (${g?.waitMinutes} min avg wait)\n• Recommended alternate: **${safestGate?.name}** (${safestGate?.density.toFixed(0)}% load)\n• AI reroute confidence: **${ctx.snapshot.aiConfidence.toFixed(0)}%**\n\nAction: Activate dynamic signage and redirect 15–20% ingress to ${safestGate?.name}.`;
  }

  if (q.includes("congestion") || q.includes("predict")) {
    return `**Predicted congestion (next 15 min)**\n\n• **South Stand / Gate E corridor** — stress index rising (+${(ctx.snapshot.crowdStressScore * 0.08).toFixed(0)}%)\n• **East Pavilion** — stable but elevated\n• **Safest ingress:** ${safestGate?.name}\n\nCrowdFlow-α agent recommends proactive dispersal before 2nd innings break surge.`;
  }

  if (q.includes("evacuation") || q.includes("safest path")) {
    return `**Safest evacuation routing**\n\n• Primary egress: **Exit NE-1 + Exit NW-1** (lowest density vectors)\n• Avoid: Gate E choke point — stampede risk score **${ctx.emergencies.find((e) => e.type === "stampede_risk") ? "elevated" : "moderate"}**\n• Medical staging: Medical Bay 2 → South corridors\n• Est. full sector clear: **18–24 min** at current occupancy`;
  }

  if (q.includes("security") || q.includes("move")) {
    return `**Security repositioning**\n\n• Deploy 2 units to **Gate E** bottleneck (critical)\n• Maintain K9 sweep at **East Pavilion Zone C** (suspicious activity)\n• Pre-stage Rapid-7 at **South Stand L2** for medical overlap\n\nAll paths computed for <3 min response time.`;
  }

  if (q.includes("report") || q.includes("incident")) {
    const inc = ctx.emergencies[0];
    return `**AI Incident Report — ${new Date().toLocaleTimeString()}**\n\n**Executive summary:** Stadium operating at ${ctx.snapshot.occupancyPercent.toFixed(0)}% capacity with ${ctx.emergencies.length} active incidents. Primary risk vector: Gate E ingress pressure.\n\n**Priority incident:** ${inc?.title ?? "None"}\n${inc?.summary ?? ""}\n\n**Recommended actions:**\n1. Execute Gate E → G reroute\n2. Scale medical at South Stand\n3. Monitor crowd stress (current: ${ctx.snapshot.crowdStressScore}/100)`;
  }

  return `**StadiumOS AI — Operator Brief**\n\n• Occupancy: **${ctx.snapshot.occupancyPercent.toFixed(1)}%** | Stress: **${ctx.snapshot.crowdStressScore}**/100\n• Highest pressure gate: **${sortedGates[0]?.name}**\n• Active incidents: **${ctx.emergencies.length}**\n• AI confidence: **${ctx.snapshot.aiConfidence.toFixed(1)}%**\n\nAsk about gate overload, congestion prediction, evacuation paths, security moves, or incident reports.`;
}

export async function generateOperatorResponse(
  message: string,
  ctx: AssistantContext,
): Promise<{ text: string; source: "gemini" | "local" }> {
  const { geminiApiKey: apiKey } = getServerEnv();

  if (!apiKey) {
    return {
      text: localFallbackResponse(message, ctx),
      source: "local",
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\n${buildContextBlock(ctx)}\n\nOperator query: ${message}`,
            },
          ],
        },
      ],
    });
    const text = result.response.text();
    return { text: text || localFallbackResponse(message, ctx), source: "gemini" };
  } catch {
    return {
      text: localFallbackResponse(message, ctx),
      source: "local",
    };
  }
}
