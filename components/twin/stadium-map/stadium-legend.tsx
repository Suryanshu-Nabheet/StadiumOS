import { mapColors } from "@/lib/stadium-map-layout";

const densityLegend = [
  { label: "Normal", color: "#0ea5e9" },
  { label: "Elevated", color: "#38bdf8" },
  { label: "Congested", color: "#f59e0b" },
  { label: "Critical", color: "#ef4444" },
] as const;

const infraLegend = [
  { swatch: mapColors.grassDark, label: "Outfield" },
  { swatch: mapColors.pitch, label: "Pitch" },
  { swatch: mapColors.ring, label: "Bowl ring" },
  { swatch: "#22C55E", label: "Exit" },
  { swatch: "#DB2777", label: "Medical" },
] as const;

export function StadiumLegend() {
  return (
    <div className="mt-3 flex flex-col gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {densityLegend.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600"
          >
            <span
              className="h-2.5 w-2.5 rounded-full ring-1 ring-white"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-slate-200/80 pt-2 sm:border-t-0 sm:pt-0">
        {infraLegend.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-1 text-[10px] text-slate-500"
          >
            <span
              className="h-2 w-3 rounded-sm"
              style={{ backgroundColor: item.swatch }}
            />
            {item.label}
          </span>
        ))}
        <span className="text-[10px] text-slate-400">· Motera digital twin</span>
      </div>
    </div>
  );
}
