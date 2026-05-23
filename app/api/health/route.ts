import { getServerEnv, isGeminiConfigured } from "@/server/config/env";
import { jsonOk } from "@/server/lib/response";

export async function GET() {
  const env = getServerEnv();
  return jsonOk({
    status: "ok",
    service: "stadiumos-ai",
    timestamp: new Date().toISOString(),
    environment: env.nodeEnv,
    features: {
      gemini: isGeminiConfigured(),
      simulation: true,
    },
  });
}
