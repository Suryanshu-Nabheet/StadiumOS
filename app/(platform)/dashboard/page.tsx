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
import { PageShell } from "@/components/layout/page-shell";
import { Panel, PanelHeader } from "@/components/ui/panel";

export const metadata = { title: "Command Center" };

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHeader
        className="mb-0 shrink-0 border-b border-border/60 pb-4"
        title="Command center"
        description="Live stadium intelligence and AI agent activity"
      />

      <KpiGrid />

      {/* Hero: large twin + operational sidebar */}
      <section
        className="grid gap-5 lg:grid-cols-1 xl:grid-cols-12 xl:items-stretch"
        aria-label="Stadium overview"
      >
        <Panel
          padding="md"
          className="flex min-h-0 flex-col xl:col-span-8 2xl:col-span-9"
        >
          <PanelHeader
            title="Stadium map"
            description="Live digital twin · gates, routes, incidents"
            className="mb-3 shrink-0"
          />
          <StadiumMap
            variant="hero"
            compactLegend
            showIncidents
            showRoutes
            showHeatmap
            className="min-h-0 flex-1"
          />
        </Panel>

        <aside className="flex min-h-0 flex-col gap-4 xl:col-span-4 2xl:col-span-3">
          <EmergencyAlerts className="min-h-[240px] flex-1 xl:max-h-none" />
          <TrafficPanel className="shrink-0" />
        </aside>
      </section>

      <section
        className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        aria-label="Crowd analytics"
      >
        <CrowdHeatmap className="min-h-[360px] md:min-h-[380px]" />
        <CongestionChart className="min-h-[360px] md:min-h-[380px]" />
        <GatePressure className="min-h-[360px] md:col-span-2 xl:col-span-1 xl:min-h-[380px]" />
      </section>

      <section
        className="grid gap-5 lg:grid-cols-2 lg:items-stretch"
        aria-label="AI operations"
      >
        <RouteSuggestions className="min-h-[280px]" />
        <AgentFeed className="min-h-[280px]" />
      </section>
    </PageShell>
  );
}
