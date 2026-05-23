import { AnalyticsCharts } from "@/components/analytics/analytics-charts";
import { TimelinePanel } from "@/components/analytics/timeline-panel";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <PageShell>
      <PageHeader
        className="mb-0 border-b border-border/60 pb-4"
        title="Analytics"
        description="Density trends, throughput, evacuation readiness, and AI metrics"
      />
      <AnalyticsCharts />
      <TimelinePanel />
    </PageShell>
  );
}
