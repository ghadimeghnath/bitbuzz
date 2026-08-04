"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";

export default function BackToTop() {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded hover:bg-brand-navy/90 border border-brand-golden-yellow/60 hover:text-brand-golden-yellow text-brand-navy shadow-brand-yellow backdrop-blur-sm transition-all duration-300 bg-brand-golden-yellow focus:outline-none sm:bottom-10 sm:right-10 overflow-hidden group"
          aria-label="Back to top"
        >
          {/* Corner accents for sci-fi look */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-brand-golden-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-brand-golden-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-brand-golden-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-brand-golden-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <ArrowUp className="h-5 w-5 " strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
