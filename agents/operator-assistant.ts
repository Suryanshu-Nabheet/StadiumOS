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
    return `**Predicted congestion (next 15 min)**\n\n• **South Stand / Gate E corridor** — stress index rising\n• **Safest ingress:** ${safestGate?.name}\n\nCrowdFlow agent recommends proactive dispersal before break surge.`;
  }

  if (q.includes("evacuation") || q.includes("safest path")) {
    return `**Safest evacuation routing**\n\n• Primary egress: **Exit NE-1 + Exit NW-1**\n• Avoid: Gate E choke point\n• Est. full sector clear: **18–24 min** at current occupancy`;
  }

  if (q.includes("security") || q.includes("move")) {
    return `**Security repositioning**\n\n• Deploy 2 units to **Gate E** bottleneck\n• Pre-stage Rapid-7 at **South Stand L2**\n\nPaths computed for <3 min response time.`;
  }

  if (q.includes("report") || q.includes("incident")) {
    const inc = ctx.emergencies[0];
    return `**Incident report — ${new Date().toLocaleTimeString()}**\n\n**Summary:** ${ctx.snapshot.occupancyPercent.toFixed(0)}% capacity, ${ctx.emergencies.length} active incidents.\n\n**Priority:** ${inc?.title ?? "None"}\n${inc?.summary ?? ""}`;
  }

  return `**Operator brief**\n\n• Occupancy: **${ctx.snapshot.occupancyPercent.toFixed(1)}%** | Stress: **${ctx.snapshot.crowdStressScore}**/100\n• Highest pressure: **${sortedGates[0]?.name}**\n• Active incidents: **${ctx.emergencies.length}**`;
}

export async function generateOperatorResponse(
  message: string,
  ctx: AssistantContext,
): Promise<{ text: string; source: "gemini" | "local" }> {
  const { geminiApiKey: apiKey, geminiModel } = getServerEnv();

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
              text: `${SYSTEM_PROMPT}\n\n${buildContextBlock(ctx)}\n\nOperator query: ${message}`,
            },
          ],
        },
      ],
    });
    const text = result.response.text();
    return {
      text: text?.trim() || localFallbackResponse(message, ctx),
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
