import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  label?: string;
  className?: string;
}

export function LiveIndicator({ label = "Live", className }: LiveIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-600" />
      </span>
      {label}
    </span>
  );
}
