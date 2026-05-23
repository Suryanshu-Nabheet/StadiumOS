import { Panel } from "@/components/ui/panel";
import { MotionLink } from "@/components/motion/motion-link";
import { navItems } from "@/config/site";
import {
  LayoutDashboard,
  GitBranch,
  Siren,
  Map,
  BarChart3,
  Bot,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  GitBranch,
  Siren,
  Map,
  BarChart3,
  Bot,
};

const descriptions: Record<string, string> = {
  "/dashboard":
    "Command center KPIs, live twin, emergency alerts, and traffic at a glance.",
  "/crowd-flow":
    "Heatmap, congestion charts, gate pressure, and AI reroute suggestions.",
  "/emergency":
    "Incident board, dispatch actions, evacuation paths, and sector map.",
  "/twin":
    "Full-fidelity circular stadium schematic with facility stats.",
  "/analytics":
    "Density trends, throughput, evacuation readiness, and AI confidence.",
  "/assistant":
    "Gemini operator copilot with full live database context.",
};

export function LandingModulesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {navItems.map((item) => {
        const Icon = iconMap[item.icon] ?? LayoutDashboard;
        return (
          <MotionLink key={item.href} href={item.href}>
            <Panel
              padding="sm"
              className="group h-full transition-all hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-500" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                {item.label}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                {descriptions[item.href]}
              </p>
            </Panel>
          </MotionLink>
        );
      })}
    </div>
  );
}
