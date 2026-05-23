import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { TimelinePanel } from "@/components/analytics/timeline-panel";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Density trends, throughput, evacuation readiness, and AI metrics"
      />
      <AnalyticsCharts />
      <TimelinePanel />
    </div>
  );
}
