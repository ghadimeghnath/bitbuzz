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
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-brand-navy bg-brand-grid flex flex-col items-center justify-center pt-20">


      {/* Floating Particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-golden-yellow/40 rounded-full"
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
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/bg-img2.png"
                  alt="Background Event Image"
                  fill
                  priority
                  className="object-cover opacity-20 mix-blend-screen grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />
              </div>

      {/* Main Content */}
      <div className="relative z-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <h1 className="text-5xl md:text-9xl lg:text-[7rem] font-brand-event-title tracking-tight text-brand-white shadow-brand-soft leading-none">
            BITBUZZ <span className="text-brand-golden-yellow">8.0</span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-3 text-brand-golden-yellow/60 my-5"
        >

          <span className="h-px w-8 bg-current sm:w-16" />
          <p className="text-center font-brand-heading text-[10px] font-bold uppercase tracking-widest text-brand-white sm:text-sm">
            State Level IT Fest for{" "}
            <span className="text-brand-golden-yellow">Higher Secondary Students</span>
          </p>
          <span className="h-px w-8 bg-current sm:w-16" />
    </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a href="https://forms.gle/XtWS4UM4BQ7qDw9m8" className="relative px-10 py-3 bg-brand-golden-yellow text-brand-navy font-brand-heading font-bold text-lg hover:bg-brand-white transition-colors duration-300 rounded shadow-brand-yellow tracking-widest uppercase">
            Register Now
          </a>
          <a href="/BITBUZZ 8.0.pdf" download className="relative px-10 py-2 border-2 border-brand-golden-yellow text-brand-golden-yellow font-brand-heading font-bold text-lg hover:bg-brand-golden-yellow/10 transition-colors duration-300 rounded shadow-brand-yellow tracking-widest uppercase bg-brand-navy/50 backdrop-blur-sm">
            Brochure
          </a>
        </motion.div>
      </div>

    </section >
  );
}
