"use client";

import Image from "next/image";
import { SocialIcon } from 'react-social-icons';

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
            Think : Create : Transform  
          </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 font-brand-small font-bold text-sm uppercase tracking-widest">
          <SocialIcon url="https://x.com/damodar_college" bgColor="transparent" fgColor="#F3CA20" className="hover:scale-110 hover:brightness-125 transition-all" style={{ height: 40, width: 40 }} />
          <SocialIcon url="https://www.facebook.com/p/VVMs-Shree-Damodar-College-100064036413651/" bgColor="transparent" fgColor="#F3CA20" className="hover:scale-110 hover:brightness-125 transition-all" style={{ height: 40, width: 40 }} />
          <SocialIcon url="https://www.instagram.com/damodar_college/" bgColor="transparent" fgColor="#F3CA20" className="hover:scale-110 hover:brightness-125 transition-all" style={{ height: 40, width: 40 }} />
        </div>
      </div>
      
      <div className="relative z-10 mt-16 pt-8 border-t border-brand-golden-yellow/20 text-center text-brand-white/50 font-brand-small text-xs tracking-widest">
        &copy; {new Date().getFullYear()} BITBUZZ 8.0. All rights reserved. System initialized.
      </div>
    </footer>
  );
}
