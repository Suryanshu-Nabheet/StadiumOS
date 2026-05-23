import { CrowdHeatmap } from "@/components/dashboard/crowd-heatmap";
import { RouteSuggestions } from "@/components/dashboard/route-suggestions";
import { GatePressure } from "@/components/dashboard/gate-pressure";
import { CongestionChart } from "@/components/dashboard/congestion-chart";
import { StadiumMap } from "@/components/twin/stadium-map";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Panel, PanelHeader } from "@/components/ui/panel";

export const metadata = { title: "Crowd Flow" };

export default function CrowdFlowPage() {
  return (
    <PageShell>
      <PageHeader
        className="mb-0 border-b border-border/60 pb-4"
        title="Crowd flow"
        description="Overcrowding prediction, rerouting, and panic-risk zones"
      />

      <Panel padding="md" className="flex flex-col">
        <PanelHeader
          title="Live bowl map"
          description="Heatmap overlay · AI reroute paths"
        />
        <div className="flex justify-center py-1">
          <StadiumMap
            showRoutes
            showHeatmap
            className="w-full max-w-[min(100%,32rem)]"
          />
        </div>
      </Panel>

      <section className="grid gap-5 md:grid-cols-2">
        <CrowdHeatmap className="min-h-[360px]" />
        <CongestionChart className="min-h-[360px]" />
        <RouteSuggestions className="min-h-[260px]" />
        <GatePressure className="min-h-[360px]" />
      </section>
    </PageShell>
  );
}
