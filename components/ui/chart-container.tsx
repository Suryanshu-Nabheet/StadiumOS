"use client";

import { cn } from "@/lib/utils";

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  height?: number;
}

/** Wraps Recharts — requires explicit height to avoid SSR/layout warnings */
export function ChartContainer({
  children,
  className,
  height = 256,
}: ChartContainerProps) {
  return (
    <div
      className={cn("w-full min-w-0", className)}
      style={{ height, minHeight: height }}
    >
      {children}
    </div>
  );
}
