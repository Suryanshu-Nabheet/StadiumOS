"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandCollab } from "@/components/brand/brand-collab";
import { MotionLink } from "@/components/motion/motion-link";
import { SmoothScrollLink } from "@/components/motion/smooth-scroll-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#platform", label: "Platform" },
];

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6 md:pt-4">
      <motion.nav
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl px-3 py-2 md:gap-4 md:px-4 md:py-2.5",
          "glass-surface-strong transition-shadow duration-300",
          scrolled && "shadow-lg shadow-sky-500/10",
        )}
        aria-label="Primary"
      >
        <BrandCollab size="xs" href="/" className="min-w-0 shrink" />

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <SmoothScrollLink
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-slate-600 transition-colors duration-200 hover:bg-white/50 hover:text-slate-900"
            >
              {link.label}
            </SmoothScrollLink>
          ))}
        </div>

        <MotionLink href="/dashboard">
          <Button size="sm" className="h-8 shrink-0 px-3 text-xs shadow-sm">
            Command center
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </MotionLink>
      </motion.nav>
    </header>
  );
}
