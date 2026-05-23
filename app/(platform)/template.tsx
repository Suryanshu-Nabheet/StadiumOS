"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export default function PlatformTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAssistant = pathname === "/assistant";
  const reduce = useReducedMotion();

  if (isAssistant || reduce) {
    return <div className="flex h-full min-h-0 flex-1 flex-col">{children}</div>;
  }

  return (
    <motion.div
      className="h-full min-h-0"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
