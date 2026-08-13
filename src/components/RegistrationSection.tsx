"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CyberButton } from "./ui/CyberButton";

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Chamfered Cyber Angles)                            */
/* -------------------------------------------------------------------------- */

// Main Card Dual-Layer Clips
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

// Icon Box HUD Frame Clips
const ICON_BOX_OUTER = `polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)`;
const ICON_BOX_INNER = `polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)`;

// Cyber Button Clips
const BUTTON_OUTER_CLIP = `polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)`;
const BUTTON_INNER_CLIP = `polygon(13px 0, calc(100% - 13px) 0, 100% 13px, 100% calc(100% - 13px), calc(100% - 13px) 100%, 13px 100%, 0 calc(100% - 13px), 0 13px)`;

/* -------------------------------------------------------------------------- */
/*  Registration Section Component                                           */
/* -------------------------------------------------------------------------- */

export default function RegistrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  return (
    <section
      id="register"
      className="relative flex w-full items-center justify-center overflow-hidden bg-brand-navy px-6 py-28 md:py-48"
    >
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/registration_bg.png"
          alt="Registration Background"
          fill
          className="object-cover opacity-20 mix-blend-screen grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-brand-navy" />
      </div>

      {/* Main Outer Cyber Card Container with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto w-full max-w-xl bg-gradient-to-b from-brand-golden-yellow via-brand-orange/50 to-brand-golden-yellow/80 p-[2px] transition-all duration-300 drop-shadow-[0_0_20px_rgba(243,202,32,0.25)] hover:drop-shadow-[0_0_30px_rgba(243,202,32,0.4)]"
        style={{ clipPath: CARD_OUTER_CLIP }}
      >
        {/* Inner Dark Navy Card Box */}
        <div
          className="relative bg-brand-navy/95 p-8 text-center backdrop-blur-xl sm:p-12 md:p-16"
          style={{ clipPath: CARD_INNER_CLIP }}
        >
          {/* Top Glowing Accent Line */}
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent opacity-80" />

          {/* Sci-Fi HUD Icon Frame */}
          <div className="mx-auto mb-6 flex justify-center">
            <div
              className="bg-gradient-to-br from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1.5px] drop-shadow-[0_0_10px_rgba(243,202,32,0.3)]"
              style={{ clipPath: ICON_BOX_OUTER }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center bg-brand-navy p-3 sm:h-16 sm:w-16"
                style={{ clipPath: ICON_BOX_INNER }}
              >
                <svg
                  className="h-7 w-7 text-brand-golden-yellow drop-shadow-[0_0_6px_rgba(243,202,32,0.5)] sm:h-8 sm:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="mb-4 font-brand-heading text-2xl font-bold uppercase tracking-widest text-brand-white sm:text-3xl md:text-5xl">
            SECURE YOUR{" "}
            <span className="text-brand-golden-yellow drop-shadow-[0_0_8px_rgba(243,202,32,0.5)]">
              SPOT
            </span>
          </h2>

          {/* Subheading Text */}
          <p className="mx-auto mb-10 max-w-sm font-brand-body text-sm leading-relaxed tracking-wide uppercase text-brand-cream md:text-base">
            Next iteration begins soon. Secure your place in the ultimate IT
            festival before slots run out.
          </p>

          {/* Action Buttons Container */}
          <div className="flex w-full flex-col items-center justify-center gap-4">
            {/* High-Tech Cyber CTA Link Button */}
            <CyberButton
              onClick={() => setIsModalOpen(true)}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              Register Now
            </CyberButton>

            {/* Download Brochure Button */}
            <CyberButton
              variant="secondary"
              onClick={() => {
                window.open("https://drive.google.com/uc?export=download&id=12AiWHQT6uwuELOrj2NqEvL7ClLealigr", "_blank");
              }}
              icon={
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              }
            >
              Brochure
            </CyberButton>
          </div>
        </div>
      </motion.div>

      {/* Registration Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
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
    </section>
  );
}