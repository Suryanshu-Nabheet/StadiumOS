import { CrowdHeatmap } from "@/components/dashboard/crowd-heatmap";
import { RouteSuggestions } from "@/components/dashboard/route-suggestions";
import { GatePressure } from "@/components/dashboard/gate-pressure";
import { CongestionChart } from "@/components/dashboard/congestion-chart";
import { StadiumMap } from "@/components/twin/stadium-map";

export const metadata = { title: "Crowd Flow AI" };

export default function CrowdFlowPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">AI Crowd Flow Engine</h2>
        <p className="text-sm text-zinc-500">
          Predictive overcrowding · dynamic rerouting · panic-risk detection
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 lg:col-span-2">
          <StadiumMap showRoutes className="w-full max-h-[420px]" />
        </div>
        <CrowdHeatmap />
        <CongestionChart />
        <RouteSuggestions />
        <GatePressure />
      </div>
    </div>
  );
}
