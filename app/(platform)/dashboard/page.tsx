import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { CrowdHeatmap } from "@/components/dashboard/crowd-heatmap";
import { EmergencyAlerts } from "@/components/dashboard/emergency-alerts";
import { AgentFeed } from "@/components/dashboard/agent-feed";
import { CongestionChart } from "@/components/dashboard/congestion-chart";
import { GatePressure } from "@/components/dashboard/gate-pressure";
import { RouteSuggestions } from "@/components/dashboard/route-suggestions";
import { StadiumMap } from "@/components/twin/stadium-map";
import { TrafficPanel } from "@/components/dashboard/traffic-panel";
import { PageHeader } from "@/components/layout/page-header";
import { Panel } from "@/components/ui/panel";

export const metadata = { title: "Command Center" };

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Command center"
        description="Live stadium intelligence and AI agent activity"
      />

      <KpiGrid />

      <div className="grid gap-6 xl:grid-cols-12 xl:items-start">
        <Panel padding="md" className="xl:col-span-8">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            Stadium map
          </h3>
          <StadiumMap showIncidents showRoutes showHeatmap className="w-full" />
        </Panel>
        <div className="flex flex-col gap-6 xl:col-span-4">
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
