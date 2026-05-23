import { PlatformShell } from "@/components/layout/platform-shell";
import { SimulationBoot } from "@/components/layout/simulation-boot";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SimulationBoot />
      <PlatformShell>{children}</PlatformShell>
    </>
  );
}
