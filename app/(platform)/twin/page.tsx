import { PageHeader } from "@/components/layout/page-header";
import { TwinView } from "@/components/twin/twin-view";

export const metadata = { title: "Digital Twin" };

export default function TwinPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital twin"
        description="Live congestion, incidents, and facility layout"
      />
      <TwinView />
    </div>
  );
}
