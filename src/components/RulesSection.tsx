"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RulesSection() {
  return (
    <section id="rules" className="relative w-full min-h-screen bg-charcoal py-32 px-6 md:px-12 flex items-center justify-center border-y-2 border-stone">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/rules_bg_1785160481738.png" 
          alt="Ancient Archive Room" 
          fill
          className="object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 scanlines opacity-60" />
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-6 py-2 bg-stone/80 border-2 border-charcoal shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] backdrop-blur-sm">
            <h2 className="text-xl md:text-3xl font-pixel-title font-bold text-emerald uppercase tracking-widest" style={{ textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>
              CLASSIFIED // DIRECTIVES
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Rules Tablet */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-stone/90 border-2 border-neon-green/50 p-8 clip-corner relative box-glow"
          >
            <div className="absolute top-0 right-0 p-4 opacity-50">
               <svg className="w-12 h-12 stroke-neon-green fill-none" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="40" strokeWidth="2" strokeDasharray="5,5" />
                 <path d="M50,10 L50,30 M50,70 L50,90 M10,50 L30,50 M70,50 L90,50" strokeWidth="2" />
               </svg>
            </div>

            <h3 className="text-2xl font-pixel-subheading text-white uppercase tracking-widest mb-6 border-b border-emerald/30 pb-4">
              Server Regulations
            </h3>
            
            <ul className="space-y-4 text-emerald/90 font-mono text-sm tracking-wide">
              <li className="flex gap-4">
                 <span className="text-neon-green">▶</span> 
                 <p><strong className="text-white font-pixel-body">Rule 01:</strong> Griefing in protected zones will result in immediate banishment from the server cluster.</p>
              </li>
              <li className="flex gap-4">
                 <span className="text-neon-green">▶</span> 
                 <p><strong className="text-white">Rule 02:</strong> Unapproved redstone clocks that cause server latency are strictly prohibited.</p>
              </li>
              <li className="flex gap-4">
                 <span className="text-neon-green">▶</span> 
                 <p><strong className="text-white">Rule 03:</strong> Respect the builders. Constructive feedback is permitted; sabotage is an offense.</p>
              </li>
              <li className="flex gap-4">
                 <span className="text-neon-green">▶</span> 
                 <p><strong className="text-white">Rule 04:</strong> Exploitation of digital anomalies (bugs/glitches) will lead to point deduction in tournaments.</p>
              </li>
            </ul>
          </motion.div>

      

        </div>
      </div>
    </section>
  );
}
