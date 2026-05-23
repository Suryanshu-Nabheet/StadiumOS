import { MatchHeader } from "@/components/layout/match-header";
import { PlatformSidebar } from "@/components/layout/platform-sidebar";
import { SimulationBoot } from "@/components/layout/simulation-boot";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <SimulationBoot />
      <PlatformSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <MatchHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[var(--background)] p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
