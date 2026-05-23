/** Brand palette — matches public/favicon.svg */
export const brand = {
  sky: "#0ea5e9",
  skyLight: "#7dd3fc",
  skyMuted: "#e0f2fe",
  blue: "#2563eb",
  background: "#f4f9fc",
  surface: "#ffffff",
  text: "#0f172a",
  textMuted: "#64748b",
  border: "#e2e8f0",
} as const;

export const simulation = {
  tickMs: Number(process.env.NEXT_PUBLIC_SIMULATION_TICK_MS) || 3500,
} as const;
