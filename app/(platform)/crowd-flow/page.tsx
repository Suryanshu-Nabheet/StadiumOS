import { CrowdHeatmap } from "@/components/dashboard/crowd-heatmap";
import { RouteSuggestions } from "@/components/dashboard/route-suggestions";
import { GatePressure } from "@/components/dashboard/gate-pressure";
import { CongestionChart } from "@/components/dashboard/congestion-chart";
import { StadiumMap } from "@/components/twin/stadium-map";
import { PageHeader } from "@/components/layout/page-header";
import { Panel } from "@/components/ui/panel";

export const metadata = { title: "Crowd Flow AI" };

export default function CrowdFlowPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Crowd flow"
        description="Overcrowding prediction, rerouting, and panic-risk zones"
      />
      <Panel padding="md">
        <StadiumMap showRoutes className="w-full max-h-[420px]" />
      </Panel>
      <div className="grid gap-6 lg:grid-cols-2">
        <CrowdHeatmap />
        <CongestionChart />
        <RouteSuggestions />
        <GatePressure />
      </div>
    </div>
  );
}
