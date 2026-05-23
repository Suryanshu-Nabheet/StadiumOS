import { getSimulationBootstrap } from "@/server/services/simulation.service";
import { jsonOk } from "@/server/lib/response";

export async function GET() {
  return jsonOk(getSimulationBootstrap());
}
