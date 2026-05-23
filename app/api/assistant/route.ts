import { runAssistantQuery } from "@/server/services/assistant.service";
import { jsonError, jsonOk } from "@/server/lib/response";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await runAssistantQuery({
      message: String(body.message ?? ""),
      snapshot: body.context?.snapshot ?? body.snapshot,
      emergencies: body.context?.emergencies ?? body.emergencies,
    });
    return jsonOk(result);
  } catch (error) {
    return jsonError(error);
  }
}
