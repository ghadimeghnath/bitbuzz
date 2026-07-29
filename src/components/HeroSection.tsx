"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-background flex flex-col items-center justify-center pt-20">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/bg-img.png" 
          alt="Minecraft Research Facility" 
          fill
          priority
          className="object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 scanlines opacity-50" />
      </div>

      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neon-green/40"
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-9xl lg:text-[7rem] font-pixel-title font-bold tracking-tight text-white text-glow font-heading leading-none">
            BITBUZZ <span className="text-neon-green">8.0</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-4 text-neon-green mb-12 font-mono text-sm md:text-lg tracking-[0.3em] uppercase font-bold"
        >
          <span>Think</span>
          <span className="w-2 h-2 bg-neon-green rounded-full box-glow"></span>
          <span>Create</span>
          <span className="w-2 h-2 bg-neon-green rounded-full box-glow"></span>
          <span>Transform</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a href="#register" className="relative px-10 py-5 bg-neon-green text-charcoal font-bold text-lg hover:bg-white transition-colors duration-300 clip-corner font-mono tracking-widest uppercase">
            Register Now
          </a>
          <a href="#events" className="relative px-10 py-5 border-2 border-neon-green text-neon-green font-bold text-lg hover:bg-neon-green/10 transition-colors duration-300 clip-corner-reverse text-glow font-mono tracking-widest uppercase bg-charcoal/50 backdrop-blur-sm">
            Explore Events
          </a>
        </motion.div>
      </div>
    </section>
  );
}
