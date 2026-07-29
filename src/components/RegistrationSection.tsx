"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function RegistrationSection() {
  return (
    <section id="register" className="relative w-full py-48 px-6 md:px-12 flex items-center justify-center bg-brand-navy">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/registration_bg.png" 
          alt="Registration Background" 
          fill
          className="object-cover opacity-20 mix-blend-screen grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-brand-navy" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-xl w-full mx-auto relative z-10 text-center bg-brand-navy/80 backdrop-blur-xl border border-brand-golden-yellow/50 p-12 md:p-16 shadow-brand-soft rounded"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent" />
        
        <div className="w-16 h-16 mx-auto mb-6 border-2 border-brand-golden-yellow rounded flex items-center justify-center bg-brand-navy/80 shadow-brand-soft">
           <svg className="w-8 h-8 text-brand-golden-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
           </svg>
        </div>

        <h2 className="text-3xl md:text-5xl font-brand-heading font-bold uppercase tracking-widest text-brand-white mb-4">
          SECURE YOUR <span className="text-brand-golden-yellow">SPOT</span>
        </h2>
        <p className="text-brand-cream font-brand-body mb-10 max-w-sm mx-auto text-xs md:text-sm leading-relaxed tracking-wide uppercase">
          Next iteration begins soon. Secure your place in the ultimate IT festival before slots run out.
        </p>

        <button className="relative w-full py-4 bg-brand-golden-yellow text-brand-navy font-bold text-lg hover:bg-brand-white hover:text-brand-navy transition-all duration-300 rounded group uppercase tracking-widest font-brand-heading shadow-brand-yellow">
          <a
          href="https://forms.gle/XtWS4UM4BQ7qDw9m8" className="relative px-10 py-1  flex justify-center items-center bg-brand-golden-yellow text-brand-navy font-brand-heading font-bold text-lg hover:bg-brand-white transition-colors duration-300 rounded shadow-brand-yellow tracking-widest uppercase"
          target="_blank">  
           
            Register Now
          
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </a>
        </button>
      </motion.div>
    </section>
  );
}
