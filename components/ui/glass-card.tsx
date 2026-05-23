"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  delay?: number;
}

export function GlassCard({
  children,
  className,
  glow = false,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-xl",
        glow &&
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-cyan-500/10 before:via-transparent before:to-purple-500/10 before:pointer-events-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
