import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: "text-sm" },
  md: { icon: 36, text: "text-base" },
  lg: { icon: 44, text: "text-lg" },
};

export function Logo({
  showText = true,
  size = "md",
  href = "/",
  className,
}: LogoProps) {
  const s = sizes[size];
  const content = (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/favicon.svg"
        alt="StadiumOS"
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        priority={size !== "sm"}
      />
      {showText && (
        <div className="leading-tight">
          <span className={cn("font-semibold text-slate-900", s.text)}>
            StadiumOS
          </span>
          <span className={cn("ml-1 font-semibold text-sky-600", s.text)}>
            AI
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export function GdgLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/gdg.svg"
      alt="Google Developer Groups"
      width={72}
      height={72}
      className={cn("h-8 w-auto opacity-90", className)}
    />
  );
}
