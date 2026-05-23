import type { Severity } from "@/types/stadium";

export type EmergencyType =
  | "stampede_risk"
  | "heat_exhaustion"
  | "medical"
  | "suspicious_activity"
  | "fire_alert";

export type EmergencyStatus =
  | "detected"
  | "dispatching"
  | "responding"
  | "resolved";

export interface EmergencyIncident {
  id: string;
  type: EmergencyType;
  title: string;
  location: string;
  severity: Severity;
  status: EmergencyStatus;
  detectedAt: string;
  etaMinutes: number;
  assignedTeam: string;
  fastestPath: string;
  evacuationImpact: number;
  summary: string;
  coordinates: { x: number; y: number };
}

export interface DispatchUnit {
  id: string;
  type: "medical" | "security" | "fire";
  name: string;
  status: "available" | "en_route" | "on_scene";
  etaMinutes: number;
  location: string;
}

export interface IncidentReport {
  id: string;
  generatedAt: string;
  incidentId: string;
  executiveSummary: string;
  recommendedActions: string[];
  riskScore: number;
}
