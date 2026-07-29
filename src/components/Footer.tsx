"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full bg-brand-navy border-t border-brand-golden-yellow/20 overflow-hidden py-24">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/footer_bg_1785160699650" 
          alt="Footer Background" 
          fill
          className="object-cover opacity-20 mix-blend-screen grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-brand-heading font-bold tracking-widest text-brand-white mb-2">
            BITBUZZ <span className="text-brand-golden-yellow">8.0</span>
          </h3>
          <p className="text-brand-white/80 font-brand-small text-xs uppercase tracking-widest">
            A premium technology convergence.
          </p>
        </div>
        
        <div className="flex items-center gap-6 font-brand-small font-bold text-sm uppercase tracking-widest">
          <a href="#" className="text-brand-golden-yellow hover:text-brand-white transition-all">Twitter</a>
          <a href="#" className="text-brand-golden-yellow hover:text-brand-white transition-all">Discord</a>
          <a href="#" className="text-brand-golden-yellow hover:text-brand-white transition-all">Instagram</a>
        </div>
      </div>
      
      <div className="relative z-10 mt-16 pt-8 border-t border-brand-golden-yellow/20 text-center text-brand-white/50 font-brand-small text-xs tracking-widest">
        &copy; {new Date().getFullYear()} BITBUZZ 8.0. All rights reserved. System initialized.
      </div>
    </footer>
  );
}
