import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";

export type AssistantSource = "gemini" | "local";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  source?: AssistantSource;
}

export interface AssistantApiSuccess {
  text: string;
  source: AssistantSource;
}

interface AssistantApiErrorBody {
  error?: string;
  code?: string;
}

export async function postAssistantMessage(
  message: string,
  context: {
    snapshot: StadiumSnapshot;
    emergencies: EmergencyIncident[];
  },
): Promise<AssistantApiSuccess> {
  const res = await fetch("/api/assistant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, context }),
  });

  const data = (await res.json()) as AssistantApiSuccess & AssistantApiErrorBody;

  if (!res.ok) {
    throw new Error(data.error ?? "Assistant request failed");
  }

  if (!data.text) {
    throw new Error("Empty response from assistant");
  }

  return { text: data.text, source: data.source ?? "local" };
}
