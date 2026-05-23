"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function PlatformTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
