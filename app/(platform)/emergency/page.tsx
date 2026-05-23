import { EmergencyBoard } from "@/components/emergency/emergency-board";

export const metadata = { title: "Emergency Agents" };

export default function EmergencyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Emergency Response Agents</h2>
        <p className="text-sm text-zinc-500">
          Autonomous detection · dispatch · evacuation intelligence
        </p>
      </div>
      <EmergencyBoard />
    </div>
  );
}
