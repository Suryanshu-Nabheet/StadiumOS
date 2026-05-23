"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  GitBranch,
  LayoutDashboard,
  Map,
  Siren,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/site";
import { BrandCollab } from "@/components/brand/brand-collab";
import { useStadiumStore } from "@/store/stadium-store";

const iconMap = {
  LayoutDashboard,
  GitBranch,
  Siren,
  Map,
  BarChart3,
  Bot,
} as const;

export function PlatformSidebar() {
  const pathname = usePathname();
  const simulationRunning = useStadiumStore((s) => s.simulationRunning);

  return (
    <aside className="flex h-full w-60 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-3 py-3.5">
        <BrandCollab size="xs" href="/" />
        <p className="mt-2.5 pl-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Operations
        </p>
      </div>
      <nav className="flex-1 space-y-0.5 p-3" aria-label="Main">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="block">
              <motion.span
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                  active ? "link-nav-active" : "link-nav",
                )}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    active ? "text-sky-600" : "text-slate-400",
                  )}
                />
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </nav>
      <div className="space-y-2 border-t border-slate-100 p-3">
        <p className="text-[10px] text-slate-400">In collaboration with GDG</p>
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-colors",
              simulationRunning ? "bg-emerald-500" : "bg-slate-300",
            )}
          />
          {simulationRunning ? "Telemetry live" : "Simulation paused"}
        </div>
      </div>
    </aside>
  );
}
