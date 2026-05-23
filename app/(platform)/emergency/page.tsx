import { EmergencyBoard } from "@/components/emergency/emergency-board";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";

export const metadata = { title: "Emergency Agents" };

export default function EmergencyPage() {
  return (
    <PageShell>
      <PageHeader
        className="mb-0 border-b border-border/60 pb-4"
        title="Emergency response"
        description="Incident detection, dispatch, and evacuation modeling"
      />
      <EmergencyBoard />
    </PageShell>
  );
}
