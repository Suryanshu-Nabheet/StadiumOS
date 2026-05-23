import { MatchHeader } from "@/components/layout/match-header";
import { PlatformSidebar } from "@/components/layout/platform-sidebar";
import { SimulationBoot } from "@/components/layout/simulation-boot";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid-overlay flex h-screen overflow-hidden bg-[#030308]">
      <SimulationBoot />
      <PlatformSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <MatchHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
