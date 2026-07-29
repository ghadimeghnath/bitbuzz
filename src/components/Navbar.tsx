"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Events", href: "#events" },
    { name: "Rules", href: "#rules" },
    { name: "Schedule", href: "#schedule" },
    { name: "Team", href: "#team" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between px-6 py-4 rounded-xl border transition-all duration-300 ${
            scrolled || isOpen
              ? "bg-background/90 backdrop-blur-md border-neon-green/30 box-glow"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 bg-neon-green clip-corner flex items-center justify-center">
              <div className="w-3 h-3 bg-charcoal clip-corner-reverse" />
            </div>
            <span className="text-xl font-heading font-bold tracking-widest text-white">
              BITBUZZ <span className="text-neon-green">8.0</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-widest uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-emerald hover:text-neon-green hover:text-glow transition-all"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#register"
              className="px-4 py-2 border border-neon-green text-neon-green hover:bg-neon-green hover:text-charcoal transition-all clip-corner box-glow"
            >
              Register
            </a>
          </div>

          {/* Hamburger Toggle Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50"
            aria-label="Toggle navigation"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-neon-green block transition-all"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-neon-green block transition-all"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-neon-green block transition-all"
            />
          </button>
        </div>

        {/* Mobile Animated Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-2 overflow-hidden rounded-xl border border-neon-green/30 bg-background/95 backdrop-blur-lg box-glow p-6"
            >
              <div className="flex flex-col gap-5 font-mono text-sm font-bold tracking-widest uppercase text-center">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-emerald hover:text-neon-green hover:text-glow transition-all py-1"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#register"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 block w-full py-3 border border-neon-green text-neon-green hover:bg-neon-green hover:text-charcoal transition-all clip-corner box-glow text-center"
                >
                  Register
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}