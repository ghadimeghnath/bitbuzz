"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen bg-brand-navy py-24 px-6 md:px-12 flex items-center justify-center">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/about_bg.png" 
          alt="About Background" 
          fill
          className="object-cover opacity-20 mix-blend-screen grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-brand-navy" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl mx-auto relative z-10"
      >
        <div className="relative bg-brand-navy text-brand-white p-8 md:p-16 border border-brand-golden-yellow/30 rounded shadow-brand-soft">
          
          {/* Decorative Interface Graphics */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-50 hidden md:block">
            <svg viewBox="0 0 100 100" className="stroke-brand-golden-yellow fill-none stroke-2">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" strokeDasharray="5,5" />
              <circle cx="50" cy="50" r="10" className="fill-brand-golden-yellow" />
              <path d="M50,10 L50,40 M50,60 L50,90 M10,50 L40,50 M60,50 L90,50" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 text-brand-golden-yellow font-brand-small font-bold tracking-widest">
            SYS.INFO // 8.0.0
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-brand-heading font-bold uppercase tracking-tight">
                Welcome to <br />
                <span className="text-brand-golden-yellow">The Future.</span>
              </h2>
              <p className="text-lg text-brand-white/80 font-brand-body leading-relaxed">
                BITBUZZ 8.0 is not just an event; it's a digital ecosystem. 
                Step into a premium environment where technology meets limitless creativity. 
                Designed for the next generation of innovators, this state-level IT festival 
                pushes the boundaries of what is possible in the modern web era.
              </p>
              
              <div className="pt-4 flex gap-8 font-brand-small text-sm uppercase tracking-widest text-brand-light-green font-bold">
                <div>
                  <span className="block text-3xl font-brand-heading text-brand-golden-yellow">24+</span>
                  Hours
                </div>
                <div>
                  <span className="block text-3xl font-brand-heading text-brand-golden-yellow">10</span>
                  Events
                </div>
                <div>
                  <span className="block text-3xl font-brand-heading text-brand-golden-yellow">1K+</span>
                  Builders
                </div>
              </div>
            </div>

            <div className="relative h-full min-h-[300px] bg-brand-navy/50 p-1 border border-brand-golden-yellow/20 rounded flex items-center justify-center overflow-hidden">
              {/* Abstract visual */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-golden-yellow/20 via-brand-navy to-brand-navy" />
              <svg className="w-full h-full absolute inset-0 opacity-20" viewBox="0 0 100 100">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#F3CA20" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
              
              <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 border-2 border-brand-golden-yellow flex items-center justify-center shadow-brand-yellow rotate-45">
                 <div className="w-16 h-16 md:w-24 md:h-24 bg-brand-golden-yellow -rotate-45 rounded flex items-center justify-center">
                   <div className="w-8 h-8 bg-brand-navy rounded"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
