import { generateOperatorResponse } from "@/agents/operator-assistant";
import { getSimulationBootstrap } from "@/server/services/simulation.service";
import { ApiError } from "@/server/lib/errors";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";

export interface AssistantRequest {
  message: string;
  snapshot?: StadiumSnapshot;
  emergencies?: EmergencyIncident[];
}

export interface AssistantResult {
  text: string;
  source: "gemini" | "local";
}

export async function runAssistantQuery(
  input: AssistantRequest,
): Promise<AssistantResult> {
  const message = input.message.trim();
  if (!message) {
    throw new ApiError("Message is required", 400, "MESSAGE_REQUIRED");
  }
  if (message.length > 4000) {
    throw new ApiError("Message too long (max 4000 characters)", 400, "MESSAGE_TOO_LONG");
  }

  const bootstrap = getSimulationBootstrap();
  const snapshot = input.snapshot ?? bootstrap.snapshot;
  const emergencies = input.emergencies ?? bootstrap.emergencies;

  return generateOperatorResponse(message, { snapshot, emergencies });
}
