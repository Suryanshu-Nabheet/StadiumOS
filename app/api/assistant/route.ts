import { runAssistantQuery } from "@/server/services/assistant.service";
import { jsonError, jsonOk } from "@/server/lib/response";
import type { EmergencyIncident } from "@/types/emergency";
import type { StadiumSnapshot } from "@/types/stadium";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const snapshot = body.context?.snapshot ?? body.snapshot;
    const emergencies = body.context?.emergencies ?? body.emergencies;

    const result = await runAssistantQuery({
      message: String(body.message ?? ""),
      snapshot: snapshot as StadiumSnapshot | undefined,
      emergencies: emergencies as EmergencyIncident[] | undefined,
    });

    return jsonOk(result);
  } catch (error) {
    return jsonError(error);
  }
}
