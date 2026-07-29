"use client";

import { motion } from "framer-motion";

export default function GallerySection() {
  return (
    <section className="relative w-full bg-background py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex items-center justify-between"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">
            ARCHIVE <span className="text-neon-green">FILES</span>
          </h2>
          <div className="h-px bg-emerald/30 flex-1 ml-8 hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Item 1 - Large */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-2 row-span-2 relative group overflow-hidden border border-stone clip-corner bg-charcoal"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald/20 via-charcoal to-charcoal group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-green transition-colors duration-300 z-10" />
            <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-background text-neon-green font-mono px-2 py-1 text-xs border border-neon-green">IMG_001.DAT</span>
            </div>
          </motion.div>
          
          {/* Items 2 to 5 */}
          {[2, 3, 4, 5].map((i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden border border-stone clip-corner bg-charcoal"
            >
              <div className="absolute inset-0 bg-stone group-hover:scale-110 transition-transform duration-700 opacity-50" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-green transition-colors duration-300 z-10" />
              {/* Fake image content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300 z-10 text-emerald">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
