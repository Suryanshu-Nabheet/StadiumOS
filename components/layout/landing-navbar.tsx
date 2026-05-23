"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo, GdgLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#platform", label: "Platform" },
];

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className={cn(
          "pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 md:px-5 md:py-3",
          "glass-surface-strong",
          scrolled && "shadow-lg shadow-sky-500/10",
        )}
        aria-label="Primary"
      >
        <Logo size="sm" href="/" />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white/50 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <GdgLogo className="hidden sm:block h-7" />
          <Link href="/dashboard">
            <Button size="sm" className="shadow-sm">
              Command center
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
