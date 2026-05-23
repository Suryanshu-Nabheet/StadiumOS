"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  height?: number;
}

/** Wraps Recharts — defers render until mounted to avoid SSR dimension warnings. */
export function ChartContainer({
  children,
  className,
  height = 256,
}: ChartContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn("w-full min-w-0 animate-pulse rounded-lg bg-muted/40", className)}
        style={{ height, minHeight: height }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn("w-full min-w-0", className)}
      style={{ height, minHeight: height }}
    >
      {children}
    </div>
  );
}
