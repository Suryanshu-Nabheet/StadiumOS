import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { TimelinePanel } from "@/components/analytics/timeline-panel";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics Engine</h2>
        <p className="text-sm text-zinc-500">
          Density trends · throughput · evacuation probability · AI confidence
        </p>
      </div>
      <AnalyticsCharts />
      <TimelinePanel />
    </div>
  );
}
