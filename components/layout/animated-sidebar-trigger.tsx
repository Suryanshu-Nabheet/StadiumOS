"use client";

import { PanelLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AnimatedSidebarTrigger({
  className,
}: {
  className?: string;
}) {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === "collapsed";

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      type="button"
      variant="ghost"
      size="icon-sm"
      className={cn(
        "text-muted-foreground hover:text-foreground",
        className,
      )}
      onClick={toggleSidebar}
    >
      <PanelLeftIcon
        className={cn(
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          collapsed && "rotate-180",
        )}
      />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}
