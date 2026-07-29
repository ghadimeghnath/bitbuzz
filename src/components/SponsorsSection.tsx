"use client";

import { motion } from "framer-motion";

const sponsorColors = [
  { border: "border-brand-golden-yellow", text: "text-brand-golden-yellow", hoverBorder: "group-hover:border-brand-golden-yellow", hoverText: "group-hover:text-brand-golden-yellow" },
  { border: "border-brand-light-green", text: "text-brand-light-green", hoverBorder: "group-hover:border-brand-light-green", hoverText: "group-hover:text-brand-light-green" },
  { border: "border-brand-coral", text: "text-brand-coral", hoverBorder: "group-hover:border-brand-coral", hoverText: "group-hover:text-brand-coral" },
  { border: "border-brand-bright-orange", text: "text-brand-bright-orange", hoverBorder: "group-hover:border-brand-bright-orange", hoverText: "group-hover:text-brand-bright-orange" },
  { border: "border-brand-lime-yellow", text: "text-brand-lime-yellow", hoverBorder: "group-hover:border-brand-lime-yellow", hoverText: "group-hover:text-brand-lime-yellow" },
];

export default function SponsorsSection() {
  return (
    <section className="relative w-full bg-brand-navy py-24 px-6 md:px-12 border-y border-brand-golden-yellow/20">
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-brand-golden-yellow font-brand-small text-sm tracking-[0.3em] uppercase mb-2 font-bold">Supported By</p>
          <h2 className="text-3xl font-brand-heading font-bold text-brand-white uppercase tracking-wider">Alliance Network</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[1, 2, 3, 4, 5].map((i) => {
            const color = sponsorColors[(i - 1) % sponsorColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group w-32 h-16 md:w-48 md:h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500"
              >
                {/* Background circuitry (hidden until hover) */}
                <svg className={`absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 stroke-[0.5] fill-none stroke-brand-white`}>
                   <path d={`M10,${10+i*5} L40,${10+i*5} L50,${20+i*5} L90,${20+i*5}`} />
                </svg>
                
                {/* Animated Outline */}
                <div className={`absolute inset-0 border border-brand-white/20 ${color.hoverBorder} transition-colors duration-300 rounded shadow-sm group-hover:shadow-brand-soft`}>
                  <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent ${color.hoverBorder} transition-colors duration-500 delay-100 rounded-tl`} />
                  <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent ${color.hoverBorder} transition-colors duration-500 delay-100 rounded-br`} />
                </div>

                <span className={`font-brand-heading font-bold text-xl md:text-2xl text-brand-cream/40 ${color.hoverText} transition-colors duration-300 z-10`}>
                  SPONSOR {i}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
