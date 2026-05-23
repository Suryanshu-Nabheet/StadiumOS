"use client";

import { cn } from "@/lib/utils";
import type { MouseEvent } from "react";

interface SmoothScrollLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function SmoothScrollLink({
  href,
  className,
  children,
}: SmoothScrollLinkProps) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
    history.pushState(null, "", href);
  }

  return (
    <a href={href} onClick={handleClick} className={cn(className)}>
      {children}
    </a>
  );
}
