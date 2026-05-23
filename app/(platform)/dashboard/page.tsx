import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { CrowdHeatmap } from "@/components/dashboard/crowd-heatmap";
import { EmergencyAlerts } from "@/components/dashboard/emergency-alerts";
import { AgentFeed } from "@/components/dashboard/agent-feed";
import { CongestionChart } from "@/components/dashboard/congestion-chart";
import { GatePressure } from "@/components/dashboard/gate-pressure";
import { RouteSuggestions } from "@/components/dashboard/route-suggestions";
import { StadiumMap } from "@/components/twin/stadium-map";
import { TrafficPanel } from "@/components/dashboard/traffic-panel";

export const metadata = {
  title: "Command Center",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Command Center
        </h2>
        <p className="text-sm text-zinc-500">
          Real-time stadium intelligence · AI agents active
        </p>
      </div>

      <KpiGrid />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <h3 className="mb-3 text-sm font-semibold text-white">
              Live Stadium Digital Twin
            </h3>
            <StadiumMap showIncidents showRoutes className="w-full" />
          </div>
        </div>
        <div className="space-y-6 xl:col-span-4">
          <EmergencyAlerts />
          <TrafficPanel />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <CrowdHeatmap />
        <CongestionChart />
        <GatePressure />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RouteSuggestions />
        <AgentFeed />
      </div>
    </div>
  );
}
