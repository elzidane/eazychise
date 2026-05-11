"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ScrollProgressLine } from "@/components/effects/ScrollMotion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show scroll progress on auth pages
  const hideProgress = pathname === "/masuk" || pathname === "/daftar";

  return (
    <>
      {/* Global scroll progress bar */}
      {!hideProgress && <ScrollProgressLine />}

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
