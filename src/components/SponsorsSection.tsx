"use client";

import { motion } from "framer-motion";

export default function SponsorsSection() {
  return (
    <section className="relative w-full bg-charcoal py-24 px-6 md:px-12 border-y border-stone">
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-neon-green font-mono text-sm tracking-[0.3em] uppercase mb-2">Supported By</p>
          <h2 className="text-3xl font-bold text-white uppercase tracking-wider">Alliance Network</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group w-32 h-16 md:w-48 md:h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500"
            >
              {/* Background circuitry (hidden until hover) */}
              <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 stroke-neon-green stroke-[0.5] fill-none">
                 <path d={`M10,${10+i*5} L40,${10+i*5} L50,${20+i*5} L90,${20+i*5}`} />
              </svg>
              
              {/* Animated Outline */}
              <div className="absolute inset-0 border border-emerald/20 group-hover:border-neon-green transition-colors duration-300 clip-corner">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-neon-green transition-colors duration-500 delay-100" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-neon-green transition-colors duration-500 delay-100" />
              </div>

              <span className="font-heading text-2xl text-stone group-hover:text-white transition-colors duration-300 z-10 text-glow">
                SPONSOR {i}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
