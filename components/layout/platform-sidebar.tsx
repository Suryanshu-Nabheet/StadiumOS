"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  GitBranch,
  LayoutDashboard,
  Map,
  Radio,
  Siren,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/site";

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

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="border-b border-white/10 p-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
            <Radio className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-white">
              StadiumOS <span className="text-cyan-400">AI</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Command Platform
            </p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                active
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 shadow-inner shadow-cyan-500/10"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
          <p className="text-[10px] uppercase tracking-wider text-emerald-400">
            Simulation Engine
          </p>
          <p className="mt-1 text-xs text-zinc-400">Live mock telemetry active</p>
        </div>
      </div>
    </aside>
  );
}
