/**
 * Server-side environment configuration.
 * Validates at runtime when server modules load.
 */

export type AppEnv = {
  nodeEnv: "development" | "production" | "test";
  appUrl: string;
  geminiApiKey: string | null;
  geminiModel: string;
  simulationTickMs: number;
};

function parseTickMs(): number {
  const raw = process.env.SIMULATION_TICK_MS;
  if (!raw) return 3500;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 1000 ? n : 3500;
}

export function getServerEnv(): AppEnv {
  const nodeEnv = (process.env.NODE_ENV ?? "development") as AppEnv["nodeEnv"];

  return {
    nodeEnv,
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    geminiApiKey: process.env.GEMINI_API_KEY?.trim() || null,
    geminiModel: process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash",
    simulationTickMs: parseTickMs(),
  };
}

export function isGeminiConfigured(): boolean {
  return Boolean(getServerEnv().geminiApiKey);
}
