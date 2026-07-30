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
        
        {/* Prominent Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center mb-2"
        >
          <div className="relative group">
            <Image
              src="/logo.png"
              alt="BITBUZZ Logo"
              width={500}
              height={500}
              priority
              className="
w-48 h-48
sm:w-64 sm:h-64
md:w-80 md:h-80
lg:w-[28rem] lg:h-[28rem]
xl:w-[32rem] xl:h-[32rem]
object-contain
drop-shadow-[0_0_40px_rgba(255,255,255,0.18)]
"
            />
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

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-2 w-full max-w-md sm:max-w-none"
        >
          <a
            href="https://forms.gle/XtWS4UM4BQ7qDw9m8"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-brand-golden-yellow text-brand-navy font-brand-heading font-bold text-base sm:text-lg hover:bg-brand-white hover:scale-105 active:scale-95 transition-all duration-300 rounded shadow-brand-yellow tracking-widest uppercase text-center"
          >
            Register Now
          </a>

          <a
            href="/BITBUZZ 8.0.pdf"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-golden-yellow/80 text-brand-golden-yellow font-brand-heading font-bold text-base sm:text-lg hover:bg-brand-golden-yellow/15 hover:border-brand-golden-yellow hover:scale-105 active:scale-95 transition-all duration-300 rounded shadow-brand-yellow tracking-widest uppercase bg-brand-navy/60 backdrop-blur-md text-center"
          >
            Brochure
          </a>
        </motion.div>

      </div>
    </section>
  );
}