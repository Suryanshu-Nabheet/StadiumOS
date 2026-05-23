import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  buildOperatorContextBlock,
  buildOperatorContextBrief,
  type OperatorContext,
} from "@/lib/operator-context";
import {
  classifyQuery,
  maxOutputTokens,
  needsFullContext,
  type QueryIntent,
} from "@/lib/assistant-query";
import { getServerEnv } from "@/server/config/env";
import { siteConfig } from "@/config/site";

const SYSTEM_PROMPT = `You are StadiumOS AI — stadium operations copilot for ${siteConfig.match.venue}.

RULES (strict):
1. Answer ONLY what the operator asked. Match their tone and length.
2. Greetings ("hi", "hello"): 1–2 short sentences. No KPI dumps, no bullet lists, no gate lists.
3. Use ONLY numbers and names from LIVE CONTEXT. If data is missing, say "not in live feed" — never invent.
4. Operational questions: concise bullets (max 4–6 bullets). One clear recommended action when relevant.
5. Do NOT repeat the entire database. Do NOT list all gates/stands unless explicitly asked.
6. No filler, no essays, no markdown headers unless the question needs structure.`;

function localFallbackResponse(message: string, ctx: OperatorContext): string {
  const intent = classifyQuery(message);
  const s = ctx.snapshot;
  const gates = [...s.gates].sort((a, b) => b.density - a.density);
  const safestGate = [...s.gates].sort((a, b) => a.density - b.density)[0];
  const active = ctx.emergencies.filter((e) => e.status !== "resolved");

  switch (intent) {
    case "greeting":
      return `Hi — StadiumOS is online. Live feed shows **${s.occupancyPercent.toFixed(0)}%** occupancy and **${active.length}** active incident(s). Ask about gates, crowd, emergencies, or say **status** for a quick brief.`;
    case "thanks":
      return "You're welcome. I'm still synced to the live operations feed if you need anything.";
    case "help":
      return `I read the same live data as Command Center. Try:\n• **Which gate is overloaded?**\n• **Crowd status**\n• **Incident brief**\n• **Evacuation paths**\n• **Agent feed**`;
    case "status":
      return `**Quick status:** ${s.occupancyPercent.toFixed(0)}% full · stress **${s.crowdStressScore}/100** · **${active.length}** incident(s) · busiest **${gates[0]?.name}** (${gates[0]?.density.toFixed(0)}%).`;
    case "gate": {
      const g = gates[0];
      return `**${g?.name}** is hottest — **${g?.density.toFixed(0)}%**, **${g?.waitMinutes} min** wait. Reroute to **${safestGate?.name}** (${safestGate?.density.toFixed(0)}%).`;
    }
    case "crowd": {
      const hotStand = [...s.stands].sort((a, b) => b.density - a.density)[0];
      return `**${hotStand?.name}** highest at **${hotStand?.density.toFixed(0)}%**. Overall stress **${s.crowdStressScore}/100**, occupancy **${s.occupancyPercent.toFixed(0)}%**.`;
    }
    case "evacuation":
      return `**${s.occupancy.toLocaleString()}** fans in venue · **${active.length}** active incidents. ${active[0] ? `Priority path: ${active[0].fastestPath}` : "No evacuation paths flagged."}`;
    case "security":
      return `Deploy to **${gates[0]?.name}**. ${active[0] ? `${active[0].assignedTeam} → ${active[0].location}` : "No security incidents in queue."}`;
    case "incident":
      if (active.length === 0) return "No active incidents in the live feed.";
      return `**Priority:** ${active[0].title} (${active[0].severity}) — ${active[0].location}, ETA **${active[0].etaMinutes}m**.`;
    case "agents":
      return s.agents
        .slice(0, 3)
        .map((a) => `• **${a.agent}:** ${a.action}`)
        .join("\n");
    case "traffic":
      return s.traffic
        .slice(0, 3)
        .map((t) => `• **${t.zone}:** ${t.vehiclesPerMin}/min (${t.severity})`)
        .join("\n");
    case "general":
      return `Occupancy **${s.occupancyPercent.toFixed(0)}%** · stress **${s.crowdStressScore}/100** · **${gates[0]?.name}** busiest. Ask something specific (gates, incidents, crowd).`;
  }
}

function intentInstruction(intent: QueryIntent, message: string): string {
  const base = `Operator message: "${message}"`;
  switch (intent) {
    case "greeting":
      return `${base}\n\nReply with 1–2 friendly sentences only. Acknowledge you're online. Optionally cite occupancy % from context. NO lists.`;
    case "thanks":
      return `${base}\n\nReply with one short sentence.`;
    case "help":
      return `${base}\n\nList 4–5 example questions they can ask (short bullets). Do not dump live data.`;
    case "status":
      return `${base}\n\nGive a 3–4 bullet operational snapshot from context only.`;
    case "gate":
      return `${base}\n\nAnswer about gate pressure only. Top overloaded gate + one alternate. Max 4 bullets.`;
    case "crowd":
      return `${base}\n\nAnswer about crowd/stands/heatmap only. Max 4 bullets.`;
    case "evacuation":
      return `${base}\n\nEvacuation-focused answer only. Max 4 bullets.`;
    case "security":
      return `${base}\n\nSecurity deployment answer only. Max 4 bullets.`;
    case "incident":
      return `${base}\n\nIncident brief only — active items from context. Max 5 bullets.`;
    case "agents":
      return `${base}\n\nSummarize agent feed only. Max 4 bullets.`;
    case "traffic":
      return `${base}\n\nExternal traffic only. Max 4 bullets.`;
    case "general":
      return `${base}\n\nAnswer the question directly. Use context only. Max 5 bullets. Do not volunteer unrelated data.`;
  }
}

function trimResponse(text: string, intent: QueryIntent): string {
  const maxChars =
    intent === "greeting" ? 280 : intent === "thanks" ? 160 : 2200;
  let out = text.trim();
  if (out.length <= maxChars) return out;
  out = out.slice(0, maxChars).trimEnd();
  const lastPeriod = out.lastIndexOf(".");
  if (lastPeriod > maxChars * 0.6) {
    out = out.slice(0, lastPeriod + 1);
  }
  return `${out}\n\n_(truncated — ask a narrower question)_`;
}

export type { OperatorContext };

export async function generateOperatorResponse(
  message: string,
  ctx: OperatorContext,
): Promise<{ text: string; source: "gemini" | "local" }> {
  const intent = classifyQuery(message);
  const { geminiApiKey: apiKey, geminiModel } = getServerEnv();

  if (!apiKey) {
    return {
      text: localFallbackResponse(message, ctx),
      source: "local",
    };
  }

  const contextBlock = needsFullContext(intent)
    ? buildOperatorContextBlock(ctx)
    : buildOperatorContextBrief(ctx);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: geminiModel,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: maxOutputTokens(intent),
        temperature: 0.25,
        topP: 0.9,
      },
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `--- LIVE CONTEXT ---\n${contextBlock}\n\n--- TASK ---\n${intentInstruction(intent, message)}`,
            },
          ],
        },
      ],
    });

    const raw = result.response.text()?.trim();
    const text = raw
      ? trimResponse(raw, intent)
      : localFallbackResponse(message, ctx);

    return { text, source: "gemini" };
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
