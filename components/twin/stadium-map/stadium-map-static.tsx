import { stands } from "@/config/stadium";
import { MAP } from "@/lib/stadium-map-layout";
import type { ZoneMetrics } from "@/types/stadium";
import { StadiumField } from "./stadium-field";
import { StadiumRing } from "./stadium-ring";

const previewStands: ZoneMetrics[] = stands.map((s, i) => ({
  id: s.id,
  name: s.name,
  density: 58 + i * 8,
  throughput: 400,
  waitMinutes: 8,
  status: i === 2 ? "congested" : i === 0 ? "elevated" : "normal",
  pressure: 60,
  trend: "stable",
}));

/** Static twin for marketing / landing (no live store). */
export function StadiumMapStatic({ className }: { className?: string }) {
  const size = MAP.viewBox;
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-[#E8EEF2] shadow-lg shadow-sky-100/50">
        <svg viewBox={`0 0 ${size} ${size}`} className="aspect-square w-full" aria-hidden>
          <rect width={size} height={size} fill="#E8EEF2" />
          <StadiumRing standMetrics={previewStands} />
          <StadiumField />
        </svg>
      </div>
    </div>
  );
}
