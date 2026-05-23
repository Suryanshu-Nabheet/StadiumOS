export type QueryIntent =
  | "greeting"
  | "thanks"
  | "help"
  | "status"
  | "gate"
  | "crowd"
  | "evacuation"
  | "security"
  | "incident"
  | "agents"
  | "traffic"
  | "general";

const GREETING =
  /^(hi|hello|hey|hola|namaste|yo|sup|gm|gn|good\s*(morning|evening|afternoon|night))$/;
const THANKS = /^(thanks|thank\s*you|thx|ty|ok|okay|cool|got\s*it|cheers)$/;
const HELP =
  /^(help|\?|menu|commands)$|what\s+can\s+you(\s+do)?|how\s+do\s+i\s+use/;

export function classifyQuery(raw: string): QueryIntent {
  const q = raw.trim().toLowerCase();
  const normalized = q.replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  const words = normalized.split(" ").filter(Boolean);

  if (words.length <= 3 && GREETING.test(normalized)) return "greeting";
  if (words.length <= 2 && /^(hi|hello|hey|yo|sup)$/.test(words[0] ?? "")) {
    return "greeting";
  }
  if (THANKS.test(normalized) || (words.length <= 2 && THANKS.test(words.join(" ")))) {
    return "thanks";
  }
  if (HELP.test(normalized)) return "help";

  if (
    words.length <= 6 &&
    /\b(status|situation|overview|summary|brief)\b/.test(normalized) &&
    !/\b(gate|incident|evac|crowd)\b/.test(normalized)
  ) {
    return "status";
  }

  if (/\b(gate|ingress|overload|entry)\b/.test(normalized)) return "gate";
  if (/\b(crowd|congestion|density|heatmap|flow|predict)\b/.test(normalized)) {
    return "crowd";
  }
  if (/\b(evac|evacuation|exit|safest\s+path)\b/.test(normalized)) return "evacuation";
  if (/\b(security|k9|guard|reposition)\b/.test(normalized)) return "security";
  if (/\b(incident|report|emergency|medical|dispatch)\b/.test(normalized)) {
    return "incident";
  }
  if (/\b(agent|agents|feed|autonomous)\b/.test(normalized)) return "agents";
  if (/\b(traffic|parking|metro|shuttle|vehicle)\b/.test(normalized)) {
    return "traffic";
  }

  return "general";
}

/** Whether the model needs the full telemetry dump. */
export function needsFullContext(intent: QueryIntent): boolean {
  return !["greeting", "thanks", "help"].includes(intent);
}

export function maxOutputTokens(intent: QueryIntent): number {
  switch (intent) {
    case "greeting":
      return 100;
    case "thanks":
      return 60;
    case "help":
      return 220;
    case "status":
      return 180;
    case "gate":
    case "crowd":
    case "evacuation":
    case "security":
    case "incident":
      return 480;
    case "agents":
    case "traffic":
      return 360;
    case "general":
      return 320;
  }
}
