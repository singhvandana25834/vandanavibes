
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, rotateY: 15, scale: 0.95 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        exit={{ opacity: 0, rotateY: -15, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full h-full"
        style={{ perspective: "1000px" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

