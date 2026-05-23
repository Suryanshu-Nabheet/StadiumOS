import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarBrandProps {
  href?: string;
  className?: string;
}

/** Landing navbar lockup — wordmark dominates; GDG is secondary. */
export function NavbarBrand({ href = "/", className }: NavbarBrandProps) {
  const content = (
    <div
      className={cn("flex min-w-0 items-center gap-2.5", className)}
      aria-label="StadiumOS AI, GDG Hackathon project"
    >
      <Image
        src="/favicon.svg"
        alt=""
        width={34}
        height={34}
        className="size-[34px] shrink-0"
        priority
      />
      <span className="min-w-0 truncate text-base font-semibold leading-none tracking-tight text-slate-900">
        StadiumOS
        <span className="font-semibold text-sky-600"> AI</span>
      </span>
      <span
        className="hidden h-4 w-px shrink-0 bg-slate-200/90 sm:block"
        aria-hidden
      />
      <Image
        src="/gdg.svg"
        alt="Google Developer Groups"
        width={44}
        height={44}
        className="hidden h-6 w-auto shrink-0 sm:block"
      />
    </div>
  );

  return (
    <Link
      href={href}
      className="inline-flex max-w-full rounded-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-sky-500/40"
    >
      {content}
    </Link>
  );
}
