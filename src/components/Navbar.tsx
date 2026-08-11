"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CyberButton } from "@/components/ui/CyberButton";

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

// Card Clips (For Modal)
const CARD_OUTER_CLIP = `polygon(
  24px 0, calc(100% - 24px) 0,
  100% 24px, 100% calc(100% - 24px),
  calc(100% - 24px) 100%, 24px 100%,
  0 calc(100% - 24px), 0 24px
)`;
const CARD_INNER_CLIP = `polygon(
  23px 0, calc(100% - 23px) 0,
  100% 23px, 100% calc(100% - 23px),
  calc(100% - 23px) 100%, 23px 100%,
  0 calc(100% - 23px), 0 23px
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
const BTN_OUTER_CLIP = `polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)`;
const BTN_INNER_CLIP = `polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)`;

/* -------------------------------------------------------------------------- */
/*  Navbar Component                                                          */
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

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
    { name: "About", href: "/about" },
    { name: "Events", href: "/#events" },
    { name: "Rules", href: "/#rules" },
    { name: "Schedule", href: "/#schedule" },
    { name: "Team", href: "/#team" },
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
              <span className="font-brand-event-title text-lg sm:text-xl md:text-2xl tracking-widest text-brand-white">
                BITBUZZ{" "}
                <span className="text-brand-golden-yellow drop-shadow-[0_0_6px_rgba(243,202,32,0.5)]">
                  8.0
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-4 lg:gap-8 font-brand-heading text-xs lg:text-sm font-bold uppercase tracking-widest md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-brand-cream transition-all hover:text-brand-golden-yellow hover:drop-shadow-[0_0_6px_rgba(243,202,32,0.5)]"
                >
                  {link.name}
                </Link>
              ))}

              {/* Cyber Desktop CTA Button */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ["0% 50%", "200% 50%"],
                  boxShadow: [
                    "0px 0px 6px 2px rgba(243,202,32,0.4)",
                    "0px 0px 18px 5px rgba(243,202,32,0.8)",
                    "0px 0px 6px 2px rgba(243,202,32,0.4)",
                  ],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="group relative inline-block bg-[linear-gradient(90deg,#F3CA20,#FFFFFF,#FF8C00,#F3CA20)] bg-[length:300%_100%] p-[3px]"
                style={{ clipPath: BTN_OUTER_CLIP }}
              >
                <div
                  className="bg-brand-golden-yellow px-4 lg:px-5 py-2 font-brand-heading text-xs lg:text-sm font-black uppercase tracking-widest text-brand-navy transition-colors duration-300 group-hover:bg-brand-white"
                  style={{ clipPath: BTN_INNER_CLIP }}
                >
                  Register
                </div>
              </motion.button>
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
                  <div className="flex flex-col gap-5 text-center font-brand-heading text-base font-bold uppercase tracking-widest">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="py-1 text-brand-cream transition-all hover:text-brand-golden-yellow"
                      >
                        {link.name}
                      </Link>
                    ))}

                    {/* Cyber Mobile CTA Button */}
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        setIsModalOpen(true);
                      }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        backgroundPosition: ["0% 50%", "200% 50%"],
                        boxShadow: [
                          "0px 0px 6px 2px rgba(243,202,32,0.4)",
                          "0px 0px 18px 5px rgba(243,202,32,0.8)",
                          "0px 0px 6px 2px rgba(243,202,32,0.4)",
                        ],
                      }}
                      transition={{
                        backgroundPosition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        boxShadow: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      className="group relative mt-2 block w-full bg-[linear-gradient(90deg,#F3CA20,#FFFFFF,#FF8C00,#F3CA20)] bg-[length:300%_100%] p-[3px]"
                      style={{ clipPath: BTN_OUTER_CLIP }}
                    >
                      <div
                        className="w-full bg-brand-golden-yellow py-3 text-center font-brand-heading text-sm font-black uppercase tracking-widest text-brand-navy transition-colors duration-300 group-hover:bg-brand-white"
                        style={{ clipPath: BTN_INNER_CLIP }}
                      >
                        Register
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Registration Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[2px] drop-shadow-[0_0_20px_rgba(243,202,32,0.25)]"
              style={{ clipPath: CARD_OUTER_CLIP }}
            >
              <div
                className="relative flex flex-col items-center bg-brand-navy p-8 text-center sm:p-12"
                style={{ clipPath: CARD_INNER_CLIP }}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-brand-cream transition-colors hover:text-brand-white"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="mb-4 text-brand-golden-yellow drop-shadow-[0_0_6px_rgba(243,202,32,0.5)]">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="mb-4 font-brand-heading text-2xl font-bold uppercase tracking-wide text-brand-white">
                  Important Note
                </h3>
                
                <p className="mb-8 font-brand-body text-base leading-relaxed text-brand-cream md:text-lg">
                  After submitting this form, you will be given a link to download an Excel sheet. This sheet must be filled and emailed to <a href="mailto:amogh.pairaiturkar@vvm.edu.in" className="text-brand-golden-yellow font-semibold hover:underline hover:decoration-brand-golden-yellow/50 hover:underline-offset-4">amogh.pairaiturkar@vvm.edu.in</a> to complete your registration.
                </p>
                
                <CyberButton
                  isLoading={isFormLoading}
                  onClick={() => {
                    setIsFormLoading(true);
                    // Simulate loading for 1.5 seconds before redirecting
                    setTimeout(() => {
                      setIsFormLoading(false);
                      setIsModalOpen(false);
                      window.open("https://forms.gle/XtWS4UM4BQ7qDw9m8", "_blank", "noopener,noreferrer");
                    }, 1500);
                  }}
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                >
                  Get the Form
                </CyberButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}