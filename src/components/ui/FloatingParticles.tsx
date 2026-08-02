"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-calculate particle properties to prevent regeneration on re-renders
  // and use CSS percentages for position so they scale flawlessly on window resize.
  const particles = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 1 + 8, // Random size between 1px and 4px
      duration: Math.random() * 8 + 4, // 4s to 12s duration
      yOffset: Math.random() * -150 - 50, // Float upwards between 50px and 200px
      opacity: Math.random() * 100, // 0.1 to 0.5 opacity
    }));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-brand-golden-yellow/50 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          initial={{
            opacity: 0, // start invisible to fade in smoothly
            y: 0,
          }}
          animate={{
            y: [0, p.yOffset],
            opacity: [0, p.opacity, 0], // fade in, then fade out as they float up
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5, // Stagger starts so they don't all spawn at once
          }}
        />
      ))}
    </div>
  );
}
