import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** xs = sidebar · nav = landing navbar · sm = footer · md = marketing */
type CollabSize = "xs" | "nav" | "sm" | "md";

const config: Record<
  CollabSize,
  {
    icon: number;
    title: string;
    ai: string;
    gdg: string;
    gap: string;
    times: string;
    weight: string;
  }
> = {
  xs: {
    icon: 24,
    title: "text-sm",
    ai: "text-sm",
    gdg: "h-6",
    gap: "gap-2",
    times: "text-sm",
    weight: "font-semibold",
  },
  nav: {
    icon: 34,
    title: "text-base",
    ai: "text-base",
    gdg: "h-8",
    gap: "gap-2.5",
    times: "text-lg",
    weight: "font-semibold",
  },
  sm: {
    icon: 28,
    title: "text-sm",
    ai: "text-sm",
    gdg: "h-7",
    gap: "gap-2",
    times: "text-base",
    weight: "font-semibold",
  },
  md: {
    icon: 36,
    title: "text-lg",
    ai: "text-lg",
    gdg: "h-9",
    gap: "gap-3",
    times: "text-lg",
    weight: "font-semibold",
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
        priority={size === "nav" || size === "md"}
      />
      <span
        className={cn(
          "whitespace-nowrap leading-none tracking-tight text-slate-900",
          s.title,
          s.weight,
        )}
      >
        StadiumOS
        <span className={cn("font-semibold text-sky-600", s.title, s.weight)}>
          {" "}
          AI
        </span>
      </span>
      {showDivider && (
        <span
          className={cn(
            "select-none px-0.5 font-normal leading-none text-slate-400",
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
        width={56}
        height={56}
        className={cn("w-auto shrink-0", s.gdg)}
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
