import { cn } from "@/lib/utils";

/** Consistent max-width and vertical rhythm for platform modules. */
export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1680px] flex-col gap-5 pb-2",
        className,
      )}
    >
      {children}
    </div>
  );
}
