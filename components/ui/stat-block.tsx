import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatBlockProps {
  icon: LucideIcon;
  label: string;
  value: string;
  valueClassName?: string;
}

export function StatBlock({
  icon: Icon,
  label,
  value,
  valueClassName,
}: StatBlockProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p
          className={cn(
            "text-sm font-semibold tabular-nums text-slate-900",
            valueClassName,
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
