"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NavbarBrand } from "@/components/brand/navbar-brand";
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
          "pointer-events-auto mx-auto w-full max-w-6xl rounded-2xl px-4 py-2.5 md:px-5 md:py-2.5",
          "glass-surface-strong transition-shadow duration-300",
          scrolled && "shadow-lg shadow-sky-500/10",
        )}
        aria-label="Primary"
      >
        <div className="flex h-11 items-center justify-between gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4">
          <div className="min-w-0 justify-self-start">
            <NavbarBrand />
          </div>

          <div className="hidden items-center justify-center gap-0.5 justify-self-center md:flex">
            {links.map((link) => (
              <SmoothScrollLink
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-white/70 hover:text-slate-900"
              >
                {link.label}
              </SmoothScrollLink>
            ))}
          </div>

          <div className="flex shrink-0 items-center justify-end justify-self-end">
            <MotionLink href="/dashboard">
              <Button size="lg" className="shrink-0 shadow-sm">
                Command center
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MotionLink>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
