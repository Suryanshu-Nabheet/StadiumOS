"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";

const tap = { scale: 0.98 };
const hover = { scale: 1.01 };

type MotionLinkProps = ComponentProps<typeof Link>;

/** Next.js Link with subtle press/hover motion */
export function MotionLink({ children, className, ...props }: MotionLinkProps) {
  return (
    <motion.div
      whileHover={hover}
      whileTap={tap}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="inline-flex"
    >
      <Link className={className} {...props}>
        {children}
      </Link>
    </motion.div>
  );
}
