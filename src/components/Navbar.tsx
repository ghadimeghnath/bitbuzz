"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Chamfered Cyber Angles)                            */
/* -------------------------------------------------------------------------- */

// Navigation Bar Shell Clips
const NAV_OUTER_CLIP = `polygon(
  16px 0, calc(100% - 16px) 0,
  100% 16px, 100% calc(100% - 16px),
  calc(100% - 16px) 100%, 16px 100%,
  0 calc(100% - 16px), 0 16px
)`;

const NAV_INNER_CLIP = `polygon(
  15px 0, calc(100% - 15px) 0,
  100% 15px, 100% calc(100% - 15px),
  calc(100% - 15px) 100%, 15px 100%,
  0 calc(100% - 15px), 0 15px
)`;

// Mobile Menu Container Clips
const MOBILE_MENU_OUTER = `polygon(
  14px 0, calc(100% - 14px) 0,
  100% 14px, 100% calc(100% - 14px),
  calc(100% - 14px) 100%, 14px 100%,
  0 calc(100% - 14px), 0 14px
)`;

const MOBILE_MENU_INNER = `polygon(
  13px 0, calc(100% - 13px) 0,
  100% 13px, 100% calc(100% - 13px),
  calc(100% - 13px) 100%, 13px 100%,
  0 calc(100% - 13px), 0 13px
)`;

// Button Clips
const BTN_OUTER_CLIP = `polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)`;
const BTN_INNER_CLIP = `polygon(7px 0, calc(100% - 7px) 0, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 0 calc(100% - 7px), 0 7px)`;

/* -------------------------------------------------------------------------- */
/*  Navbar Component                                                          */
/* -------------------------------------------------------------------------- */

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
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Outer Dual-Layer Cyber Shell (Permanent Gradient Border) */}
        <div
          className="bg-gradient-to-r from-brand-golden-yellow/60 via-brand-orange/40 to-brand-golden-yellow/60 p-[1px] transition-all duration-300 drop-shadow-[0_0_15px_rgba(243,202,32,0.25)]"
          style={{ clipPath: NAV_OUTER_CLIP }}
        >
          {/* Inner Navy Navigation Bar (Always Navy Background) */}
          <div
            className="flex items-center justify-between bg-brand-navy/95 px-4 py-3 backdrop-blur-md transition-all duration-300 sm:px-6"
            style={{ clipPath: NAV_INNER_CLIP }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3 cursor-pointer"
            >
              <Image
                src="/final-logo.png"
                alt="BITBUZZ Logo"
                width={80}
                height={80}
                priority
                className="h-8 w-8 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.2)] transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10 md:h-12 md:w-12"
              />
              <span className="font-brand-event-title text-lg tracking-widest text-brand-white sm:text-xl">
                BITBUZZ{" "}
                <span className="text-brand-golden-yellow drop-shadow-[0_0_6px_rgba(243,202,32,0.5)]">
                  8.0
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 font-brand-heading text-xs font-bold uppercase tracking-widest md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-brand-cream transition-all hover:text-brand-golden-yellow hover:drop-shadow-[0_0_6px_rgba(243,202,32,0.5)]"
                >
                  {link.name}
                </a>
              ))}

              {/* Cyber Desktop CTA Button */}
              <a
                href="#register"
                className="group relative inline-block bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1px] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(243,202,32,0.6)]"
                style={{ clipPath: BTN_OUTER_CLIP }}
              >
                <div
                  className="bg-brand-golden-yellow px-5 py-2 font-brand-heading text-xs font-black uppercase tracking-widest text-brand-navy transition-colors duration-300 group-hover:bg-brand-white"
                  style={{ clipPath: BTN_INNER_CLIP }}
                >
                  Register
                </div>
              </a>
            </div>

            {/* Hamburger Toggle Button (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="z-50 flex h-8 w-8 flex-col items-center justify-center space-y-1.5 focus:outline-none md:hidden"
              aria-label="Toggle navigation"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-brand-golden-yellow transition-all"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-6 bg-brand-golden-yellow transition-all"
              />
              <motion.span
                animate={
                  isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
                }
                className="block h-0.5 w-6 bg-brand-golden-yellow transition-all"
              />
            </button>
          </div>
        </div>

        {/* Mobile Animated Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mt-2 overflow-hidden md:hidden"
            >
              {/* Outer Mobile Cyber Frame */}
              <div
                className="bg-gradient-to-b from-brand-golden-yellow/60 via-brand-orange/40 to-brand-golden-yellow/60 p-[1px] drop-shadow-[0_0_15px_rgba(243,202,32,0.3)]"
                style={{ clipPath: MOBILE_MENU_OUTER }}
              >
                {/* Inner Mobile Card Container */}
                <div
                  className="bg-brand-navy/95 p-6 backdrop-blur-lg"
                  style={{ clipPath: MOBILE_MENU_INNER }}
                >
                  <div className="flex flex-col gap-5 text-center font-brand-heading text-sm font-bold uppercase tracking-widest">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="py-1 text-brand-cream transition-all hover:text-brand-golden-yellow"
                      >
                        {link.name}
                      </a>
                    ))}

                    {/* Cyber Mobile CTA Button */}
                    <a
                      href="#register"
                      onClick={() => setIsOpen(false)}
                      className="group relative mt-2 block w-full bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1px] transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(243,202,32,0.6)]"
                      style={{ clipPath: BTN_OUTER_CLIP }}
                    >
                      <div
                        className="w-full bg-brand-golden-yellow py-3 text-center font-brand-heading text-xs font-black uppercase tracking-widest text-brand-navy transition-colors duration-300 group-hover:bg-brand-white"
                        style={{ clipPath: BTN_INNER_CLIP }}
                      >
                        Register
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}