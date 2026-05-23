import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  size?: "xs" | "sm" | "md";
  href?: string | null;
  className?: string;
}

const sizes = {
  xs: { icon: 22, text: "text-[13px]", ai: "text-[13px]" },
  sm: { icon: 26, text: "text-sm", ai: "text-sm" },
  md: { icon: 30, text: "text-sm", ai: "text-sm" },
};

/** StadiumOS mark only (no GDG). Prefer BrandCollab for co-branding. */
export function Logo({
  showText = true,
  size = "sm",
  href = "/",
  className,
}: LogoProps) {
  const s = sizes[size];
  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/favicon.svg"
        alt="StadiumOS"
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        priority={size === "md"}
      />
      {showText && (
        <span className={cn("font-semibold leading-none text-slate-900", s.text)}>
          StadiumOS
          <span className={cn("font-semibold text-sky-600", s.text)}> AI</span>
        </span>
      )}
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

/** @deprecated Use BrandCollab for × GDG co-brand */
export function GdgLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/gdg.svg"
      alt="Google Developer Groups"
      width={48}
      height={48}
      className={cn("h-6 w-auto opacity-90", className)}
    />
  );
}
