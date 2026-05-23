"use server";

import {
  runAssistantQuery,
  type AssistantRequest,
  type AssistantResult,
} from "@/server/services/assistant.service";
import { toErrorMessage } from "@/server/lib/errors";

export async function askAssistantAction(
  input: AssistantRequest,
): Promise<{ ok: true; data: AssistantResult } | { ok: false; error: string }> {
  try {
    const data = await runAssistantQuery(input);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: toErrorMessage(error) };
  }
}
