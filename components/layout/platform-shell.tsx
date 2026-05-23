"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MatchHeader } from "@/components/layout/match-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const sidebarVars = {
  "--sidebar-width-icon": "3.75rem",
} as CSSProperties;

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAssistant = pathname === "/assistant";

  return (
    <SidebarProvider defaultOpen style={sidebarVars}>
      <AppSidebar />
      <SidebarInset className="flex h-svh max-h-svh flex-col overflow-hidden bg-background">
        {!isAssistant && <MatchHeader />}
        <main
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-hidden",
            !isAssistant && "overflow-y-auto p-4 md:p-6",
          )}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
