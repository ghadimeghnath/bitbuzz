"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RegistrationSection() {
  return (
    <section id="register" className="relative w-full bg-charcoal py-48 px-6 md:px-12 flex items-center justify-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/registration_bg_1785160635818.png" 
          alt="Nether Portal Gateway" 
          fill
          className="object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-xl w-full mx-auto relative z-10 text-center bg-white/5 backdrop-blur-xl border-2 border-neon-green/50 p-12 md:p-16 box-glow clip-corner"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
        
        <div className="w-16 h-16 mx-auto mb-6 border-2 border-neon-green rotate-45 flex items-center justify-center bg-charcoal/80 box-glow">
           <svg className="w-8 h-8 -rotate-45 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
           </svg>
        </div>

        <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-widest text-white mb-4">
          SECURE YOUR <span className="text-neon-green text-glow">SPOT</span>
        </h2>
        <p className="text-emerald font-mono mb-10 max-w-sm mx-auto text-xs md:text-sm leading-relaxed tracking-wide uppercase">
          Next iteration begins soon. Whitelist yourself before the server capacity is reached.
        </p>

        <button className="relative w-full py-4 bg-neon-green text-charcoal font-bold text-lg hover:bg-white hover:text-charcoal transition-all duration-300 clip-corner group uppercase tracking-widest font-heading shadow-[0_0_20px_rgba(124,255,79,0.5)]">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Register Now 
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
        </button>
      </motion.div>
    </section>
  );
}
