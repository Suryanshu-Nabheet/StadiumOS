"use client";

import type { CSSProperties } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MatchHeader } from "@/components/layout/match-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const sidebarVars = {
  "--sidebar-width-icon": "3.75rem",
} as CSSProperties;

export function PlatformShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen style={sidebarVars}>
      <AppSidebar />
      <SidebarInset className="flex min-h-svh flex-col overflow-hidden bg-background">
        <MatchHeader />
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
