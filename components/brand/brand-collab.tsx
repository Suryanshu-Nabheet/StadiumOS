import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CollabSize = "xs" | "sm" | "md";

const config: Record<
  CollabSize,
  { icon: number; title: string; ai: string; gdg: string; gap: string; times: string }
> = {
  xs: {
    icon: 22,
    title: "text-[13px]",
    ai: "text-[13px]",
    gdg: "h-5",
    gap: "gap-1.5",
    times: "text-xs",
  },
  sm: {
    icon: 26,
    title: "text-sm",
    ai: "text-sm",
    gdg: "h-6",
    gap: "gap-2",
    times: "text-sm",
  },
  md: {
    icon: 30,
    title: "text-sm",
    ai: "text-sm",
    gdg: "h-7",
    gap: "gap-2",
    times: "text-sm",
  },
};

interface BrandCollabProps {
  size?: CollabSize;
  href?: string | null;
  className?: string;
  showDivider?: boolean;
}

export function BrandCollab({
  size = "sm",
  href = "/",
  className,
  showDivider = true,
}: BrandCollabProps) {
  const s = config[size];

  const content = (
    <div
      className={cn("flex items-center", s.gap, className)}
      aria-label="StadiumOS AI in collaboration with Google Developer Groups"
    >
      <Image
        src="/favicon.svg"
        alt=""
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        priority={size !== "xs"}
      />
      <span className={cn("font-semibold leading-none text-slate-900", s.title)}>
        StadiumOS
        <span className={cn("font-semibold text-sky-600", s.ai)}> AI</span>
      </span>
      {showDivider && (
        <span
          className={cn(
            "select-none font-light leading-none text-slate-300",
            s.times,
          )}
          aria-hidden
        >
          ×
        </span>
      )}
      <Image
        src="/gdg.svg"
        alt="Google Developer Groups"
        width={48}
        height={48}
        className={cn("w-auto shrink-0 opacity-95", s.gdg)}
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-sky-500/40"
      >
        {content}
      </Link>
    );
  }

  return content;
}
