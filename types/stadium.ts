export type Severity = "low" | "medium" | "high" | "critical";

export type ZoneStatus = "normal" | "elevated" | "congested" | "critical";

export interface GateZone {
  id: string;
  name: string;
  x: number;
  y: number;
  capacity: number;
}

export interface StandZone {
  id: string;
  name: string;
  x: number;
  y: number;
  seats: number;
}

export interface StadiumPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "exit" | "medical" | "security" | "parking";
}

export interface ZoneMetrics {
  id: string;
  name: string;
  density: number;
  throughput: number;
  waitMinutes: number;
  status: ZoneStatus;
  pressure: number;
  trend: "up" | "down" | "stable";
}

export interface CrowdHeatCell {
  x: number;
  y: number;
  intensity: number;
}

export interface RouteSuggestion {
  id: string;
  from: string;
  to: string;
  reason: string;
  impact: string;
  confidence: number;
  priority: Severity;
}

export interface WeatherAlert {
  id: string;
  type: string;
  message: string;
  severity: Severity;
  timestamp: string;
}

export interface MatchKPI {
  label: string;
  value: string | number;
  delta?: number;
  unit?: string;
  status?: ZoneStatus;
}

export interface AgentActivity {
  id: string;
  agent: string;
  action: string;
  target: string;
  confidence: number;
  timestamp: string;
  status: "active" | "completed" | "queued";
}

export interface TrafficIndicator {
  zone: string;
  severity: Severity;
  vehiclesPerMin: number;
  etaMinutes: number;
}

export interface StadiumSnapshot {
  timestamp: string;
  occupancy: number;
  occupancyPercent: number;
  crowdStressScore: number;
  aiConfidence: number;
  gates: ZoneMetrics[];
  stands: ZoneMetrics[];
  heatmap: CrowdHeatCell[];
  routes: RouteSuggestion[];
  weather: WeatherAlert[];
  kpis: MatchKPI[];
  agents: AgentActivity[];
  traffic: TrafficIndicator[];
}
