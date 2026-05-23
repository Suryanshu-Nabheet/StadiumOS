import { cn } from "@/lib/utils";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md";
}

export function Panel({
  className,
  padding = "md",
  children,
  ...props
}: PanelProps) {
  const pad =
    padding === "none" ? "" : padding === "sm" ? "p-4" : "p-5";

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 bg-white shadow-sm",
        pad,
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
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
