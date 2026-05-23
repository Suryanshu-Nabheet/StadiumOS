"use client";

import { siteConfig } from "@/config/site";
import { useStadiumStore } from "@/store/stadium-store";
import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function SidebarStatus() {
  const simulationRunning = useStadiumStore((s) => s.simulationRunning);
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === "collapsed";
  const { author, event } = siteConfig;

  const statusLabel = simulationRunning
    ? "Telemetry live"
    : "Simulation paused";

  if (collapsed) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            tooltip={`${statusLabel} · ${author.name}`}
            className="cursor-default hover:bg-transparent active:bg-transparent"
          >
            <span
              className={cn(
                "size-2.5 shrink-0 rounded-full ring-2 ring-sidebar",
                simulationRunning
                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  : "bg-slate-300",
              )}
              aria-hidden
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2.5">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "size-2 shrink-0 rounded-full",
            simulationRunning ? "bg-emerald-500" : "bg-slate-300",
          )}
          aria-hidden
        />
        <span className="text-xs font-medium text-sidebar-foreground">
          {statusLabel}
        </span>
      </div>
      <p className="mt-1.5 truncate text-[11px] text-muted-foreground">
        {author.name} · {event.name}
      </p>
    </div>
  );
}
