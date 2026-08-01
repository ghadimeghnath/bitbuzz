"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Hand } from "lucide-react";
import GlowingLogo from "./GlowingLogo";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll handler for the indicator
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="
relative
min-h-screen
w-full
overflow-hidden
bg-brand-navy
flex
items-center
justify-center
pt-20
pb-16
px-4
sm:px-8
md:px-12
lg:px-16
"
    >
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
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Desktop */}
        <Image
          src="/bg-img-3.png"
          alt="Desktop Background"
          fill
          priority
          className="hidden lg:block object-cover object-center"
        />

        {/* Tablet */}
        <Image
          src="/bg-img-tablet.png"
          alt="Tablet Background"
          fill
          priority
          className="hidden sm:block lg:hidden object-cover object-center"
        />

        {/* Mobile */}
        <Image
          src="/bg-img-mobi-1.png"
          alt="Mobile Background"
          fill
          priority
          className="block sm:hidden object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-brand-navy/50" />

        {/* Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />

        {/* Optional vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20">
        
        {/* Prominent Responsive Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-2"
        >
          <div className="relative group">
            <GlowingLogo className="w-52 sm:w-72 md:w-80 lg:w-[380px] xl:w-[440px] p-0 m-0 transition-all duration-300" />
          </div>
        </motion.div>

        {/* Subtitle with Gradient Divider Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 sm:gap-5 text-brand-golden-yellow my-6 max-w-2xl"
        >
          <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-brand-golden-yellow/60 shrink-0" />
          <p className="
text-center
font-brand-heading
text-xs
sm:text-sm
md:text-base
font-bold
uppercase
tracking-[0.22em]
text-white
drop-shadow-lg
">
            State Level IT Fest for{" "}
            <span className="text-brand-golden-yellow">Higher Secondary Students</span>
          </p>
          <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-brand-golden-yellow/60 shrink-0" />
        </motion.div>
      </div>

      {/* Animated Scroll Indicator (Mobile Hand + Desktop Mouse) */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        aria-label="Scroll down"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
      >
        {/* Contextual Label */}
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-brand-golden-yellow/80 group-hover:text-brand-golden-yellow transition-colors duration-300">
          <span className="sm:hidden">Swipe Up</span>
          <span className="hidden sm:inline">Scroll Down</span>
        </span>

        {/* MOBILE VIEW: Animated Hand Gesture */}
        <div className="sm:hidden relative flex items-center justify-center w-10 h-10">
          <motion.div
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-8 h-8 rounded-full bg-brand-golden-yellow/20 border border-brand-golden-yellow/40"
          />
          <motion.div
            animate={{
              y: [12, -8, 12],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative text-brand-golden-yellow drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
          >
            <Hand className="w-6 h-6 rotate-[-15deg]" />
          </motion.div>
        </div>

        {/* DESKTOP VIEW: Mouse Capsule Icon */}
        <div className="hidden sm:flex w-6 h-10 rounded-full border-2 border-brand-golden-yellow/50 group-hover:border-brand-golden-yellow justify-center p-1.5 transition-colors duration-300 shadow-md backdrop-blur-sm">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-2 bg-brand-golden-yellow rounded-full"
          />
        </div>
      </motion.button>
    </section>
  );
}