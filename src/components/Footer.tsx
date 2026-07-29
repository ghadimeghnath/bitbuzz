"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full bg-background border-t-2 border-emerald/30 overflow-hidden py-24">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/footer_bg_1785160699650.png" 
          alt="Minecraft Landscape at Night" 
          fill
          className="object-cover opacity-50 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-charcoal/80 to-charcoal" />
        <div className="absolute inset-0 scanlines opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-heading font-bold tracking-widest text-white mb-2">
            BITBUZZ <span className="text-neon-green">8.0</span>
          </h3>
          <p className="text-emerald/80 font-mono text-xs uppercase tracking-widest">
            A premium technology convergence.
          </p>
        </div>
        
        <div className="flex items-center gap-6 font-mono text-sm uppercase tracking-widest">
          <a href="#" className="text-emerald hover:text-neon-green hover:text-glow transition-all">Twitter</a>
          <a href="#" className="text-emerald hover:text-neon-green hover:text-glow transition-all">Discord</a>
          <a href="#" className="text-emerald hover:text-neon-green hover:text-glow transition-all">Instagram</a>
        </div>
      </div>
      
      <div className="relative z-10 mt-16 pt-8 border-t border-emerald/20 text-center text-emerald/50 font-mono text-xs tracking-widest">
        &copy; {new Date().getFullYear()} BITBUZZ 8.0. All rights reserved. System initialized.
      </div>
    </footer>
  );
}
