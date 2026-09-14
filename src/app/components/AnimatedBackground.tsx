"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    setBubbles(
      Array.from({ length: 15 }).map(() => ({
        width: Math.random() * 200 + 50 + "px",
        height: Math.random() * 200 + 50 + "px",
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/5 blur-xl"
          style={{
            width: b.width,
            height: b.height,
            left: b.left,
            top: b.top,
          }}
          animate={{
            x: [0, b.x, 0],
            y: [0, b.y, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
