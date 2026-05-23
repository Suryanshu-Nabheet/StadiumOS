import { cn } from "@/lib/utils";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md";
  /** Flex column layout for header + scrollable body */
  layout?: "default" | "stack";
}

export function Panel({
  className,
  padding = "md",
  layout = "default",
  children,
  ...props
}: PanelProps) {
  const pad =
    padding === "none" ? "" : padding === "sm" ? "p-3.5 sm:p-4" : "p-4 sm:p-5";

  return (
    <div
      className={cn(
        "surface-card bg-card text-card-foreground",
        pad,
        layout === "stack" && "flex min-h-0 flex-col",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex shrink-0 items-start justify-between gap-4",
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Scrollable region inside a stack Panel — use with flex-1 */
export function PanelBody({
  className,
  children,
  maxHeight,
}: {
  className?: string;
  children: React.ReactNode;
  maxHeight?: string;
}) {
  return (
    <div
      className={cn("scroll-panel-body flex-1", className)}
      style={maxHeight ? { maxHeight } : undefined}
    >
      {children}
    </div>
  );
}
