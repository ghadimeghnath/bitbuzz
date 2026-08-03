"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
          <p className="mx-auto mb-10 max-w-sm font-brand-body text-xs leading-relaxed tracking-wide uppercase text-brand-cream md:text-sm">
            Next iteration begins soon. Secure your place in the ultimate IT
            festival before slots run out.
          </p>

          {/* High-Tech Cyber CTA Link Button */}
          <a
            href="https://forms.gle/XtWS4UM4BQ7qDw9m8"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-full bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[2px] transition-all duration-300 hover:scale-[1.02] hover:drop-shadow-[0_0_18px_rgba(243,202,32,0.6)]"
            style={{ clipPath: BUTTON_OUTER_CLIP }}
          >
            <div
              className="flex w-full items-center justify-center gap-2 bg-brand-golden-yellow px-8 py-4 font-brand-heading text-base font-bold uppercase tracking-widest text-brand-navy transition-colors duration-300 group-hover:bg-brand-white sm:text-lg"
              style={{ clipPath: BUTTON_INNER_CLIP }}
            >
              <span>Register Now</span>
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}