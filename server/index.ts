/**
 * Server layer public API.
 * Import from `@/server` in API routes, Server Actions, and RSC.
 */

export { getServerEnv, isGeminiConfigured } from "@/server/config/env";
export { ApiError, toErrorMessage } from "@/server/lib/errors";
export { jsonOk, jsonError } from "@/server/lib/response";
export {
  getSimulationBootstrap,
  advanceSimulation,
  type SimulationBootstrap,
} from "@/server/services/simulation.service";
export {
  runAssistantQuery,
  type AssistantRequest,
  type AssistantResult,
} from "@/server/services/assistant.service";
export { askAssistantAction } from "@/server/actions/assistant";
export {
  getSimulationBootstrapAction,
  tickSimulationAction,
} from "@/server/actions/simulation";
