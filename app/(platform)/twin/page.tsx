import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { TwinView } from "@/components/twin/twin-view";

export const metadata = { title: "Digital Twin" };

export default function TwinPage() {
  return (
    <PageShell>
      <PageHeader
        className="mb-0 border-b border-border/60 pb-4"
        title="Digital twin"
        description="Live congestion, incidents, and facility layout"
      />
      <TwinView />
    </PageShell>
  );
}
