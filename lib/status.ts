import type { Severity, ZoneStatus } from "@/types/stadium";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "live";

export function severityToBadge(severity: Severity): BadgeVariant {
  switch (severity) {
    case "critical":
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "neutral";
  }
}

export function zoneToBadge(status: ZoneStatus): BadgeVariant {
  switch (status) {
    case "critical":
    case "congested":
      return "danger";
    case "elevated":
      return "warning";
    default:
      return "neutral";
  }
}

export const zoneColors: Record<ZoneStatus, string> = {
  normal: "#0ea5e9",
  elevated: "#38bdf8",
  congested: "#f59e0b",
  critical: "#ef4444",
};
