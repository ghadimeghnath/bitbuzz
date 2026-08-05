"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Hand } from "lucide-react";
import GlowingLogo from "./GlowingLogo";
import { useLenis } from "lenis/react";

// Arced Category Pill Chamfered Cuts
const PILL_OUTER_CLIP = `polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)`;
const PILL_INNER_CLIP = `polygon(9px 0, calc(100% - 9px) 0, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%, 0 calc(100% - 9px), 0 9px)`;

export default function HeroSection() {
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll handler for the indicator
  const handleScrollDown = () => {
    if (lenis) {
      lenis.scrollTo(window.innerHeight);
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="
relative

min-h-dvh
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
        <div className="absolute inset-0 bg-brand-navy/70" />

        {/* Bottom Fade */}
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
          <div className="relative group flex flex-col items-center">
            <GlowingLogo className=" w-60 sm:w-72 md:w-80 lg:w-[380px] xl:w-[440px] p-0 m-0 transition-all duration-300" />
            
            {/* Tagline Frame */}
            <div className="mt-4 sm:mt-6 transition-transform duration-300 hover:scale-105">
              <div
                className="p-[1.5px] bg-brand-golden-yellow/50 transition-all duration-300 group-hover:bg-brand-golden-yellow"
                style={{ clipPath: PILL_OUTER_CLIP }}
              >
                <div
                  className="px-6 py-2 sm:px-8 sm:py-2.5 bg-brand-navy backdrop-blur-md"
                  style={{ clipPath: PILL_INNER_CLIP }}
                >
                  <p className="text-white bg-transparent font-bold italic uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10 m-0">
                    Think : Create : Transform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subtitle with Gradient Divider Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 sm:gap-5 text-brand-golden-yellow my-6 max-w-2xl sm:mt-12"
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
        className="absolute bottom-15 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
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