import { siteConfig } from "@/config/site";
import { formatNumber } from "@/lib/utils";

const stats = [
  {
    label: "Stadium capacity",
    value: formatNumber(siteConfig.match.capacity),
    sub: "seats · Motera",
  },
  { label: "Ingress gates", value: "8", sub: "live pressure" },
  { label: "Stand sectors", value: "4", sub: "density synced" },
  { label: "AI agents", value: "6", sub: "autonomous feed" },
  { label: "Simulation tick", value: "3.5s", sub: "live telemetry" },
] as const;

export function LandingStatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-slate-100/90 bg-white/80 px-4 py-3.5 text-center shadow-sm backdrop-blur-sm"
        >
          <p className="text-lg font-semibold tabular-nums text-sky-600 sm:text-xl">
            {s.value}
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-800">{s.label}</p>
          <p className="text-[10px] text-slate-500">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
