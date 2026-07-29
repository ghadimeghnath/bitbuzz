"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen bg-background py-24 px-6 md:px-12 flex items-center justify-center">
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl mx-auto relative z-10"
      >
        <div className="relative bg-light-gray text-charcoal p-8 md:p-16 border-pixel clip-corner">
          
          {/* Decorative Interface Graphics */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-50 hidden md:block">
            <svg viewBox="0 0 100 100" className="stroke-neon-green fill-none stroke-2">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" strokeDasharray="5,5" />
              <circle cx="50" cy="50" r="10" className="fill-neon-green" />
              <path d="M50,10 L50,40 M50,60 L50,90 M10,50 L40,50 M60,50 L90,50" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 text-neon-green font-mono text-xs font-bold tracking-widest">
            SYS.INFO // 8.0.0
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
                Welcome to <br />
                <span className="text-emerald">The Matrix.</span>
              </h2>
              <p className="text-lg text-stone font-sans leading-relaxed">
                BITBUZZ 8.0 is not just an event; it's a digital ecosystem. 
                Step into a highly-crafted simulation where technology meets limitless creativity. 
                Designed for the next generation of innovators, this state-level IT festival 
                pushes the boundaries of what is possible in the modern web era.
              </p>
              
              <div className="pt-4 flex gap-8 font-mono text-sm uppercase tracking-widest text-emerald font-bold">
                <div>
                  <span className="block text-3xl font-heading text-charcoal">24+</span>
                  Hours
                </div>
                <div>
                  <span className="block text-3xl font-heading text-charcoal">10</span>
                  Events
                </div>
                <div>
                  <span className="block text-3xl font-heading text-charcoal">1K+</span>
                  Builders
                </div>
              </div>
            </div>

            <div className="relative h-full min-h-[300px] bg-stone p-1 border-pixel clip-corner-reverse flex items-center justify-center overflow-hidden">
              {/* Abstract Minecraft x Cyberpunk visual */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald/20 via-stone to-stone" />
              <svg className="w-full h-full absolute inset-0 opacity-20" viewBox="0 0 100 100">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#7CFF4F" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
              
              <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 border-2 border-neon-green flex items-center justify-center box-glow rotate-45">
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-neon-green -rotate-45 clip-corner flex items-center justify-center">
                   <div className="w-8 h-8 bg-charcoal clip-corner-reverse"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
