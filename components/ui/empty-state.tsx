import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/50 px-6 py-10 text-center">
      <Icon className="h-8 w-8 text-slate-300" />
      <p className="mt-3 text-sm font-medium text-slate-700">{title}</p>
      {description && (
        <p className="mt-1 max-w-xs text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
}
