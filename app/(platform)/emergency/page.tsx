import { EmergencyBoard } from "@/components/emergency/emergency-board";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Emergency Agents" };

export default function EmergencyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Emergency response"
        description="Incident detection, dispatch, and evacuation modeling"
      />
      <EmergencyBoard />
    </div>
  );
}
