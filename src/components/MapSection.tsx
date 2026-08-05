"use client";

import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Cyber Cut Corners)                                 */
/* -------------------------------------------------------------------------- */

const CARD_OUTER_CLIP = `polygon(
  16px 0, calc(100% - 16px) 0,
  100% 16px, 100% calc(100% - 16px),
  calc(100% - 16px) 100%, 16px 100%,
  0 calc(100% - 16px), 0 16px
)`;

const CARD_INNER_CLIP = `polygon(
  15px 0, calc(100% - 15px) 0,
  100% 15px, 100% calc(100% - 15px),
  calc(100% - 15px) 100%, 15px 100%,
  0 calc(100% - 15px), 0 15px
)`;

const BTN_OUTER_CLIP = `polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)`;
const BTN_INNER_CLIP = `polygon(7px 0, calc(100% - 7px) 0, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 0 calc(100% - 7px), 0 7px)`;

export default function MapSection() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Shree+Damodar+College+of+Commerce+and+Economics,+Margao,+Goa&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Shree+Damodar+College+of+Commerce+and+Economics,+Margao,+Goa";

  return (
    <section
      id="map"
      className="relative w-full py-20 md:py-28 px-6 md:px-12 border-y border-brand-golden-yellow/20 bg-brand-navy overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 184, 0, 0.08), transparent)`,
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-stretch z-10 relative">
        
        {/* Left Column: Venue Details */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-5/12 flex flex-col justify-between space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-brand-golden-yellow animate-pulse" />
              <span className="font-brand-small text-xs uppercase tracking-widest text-brand-golden-yellow font-bold">
                Navigation Protocol
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-brand-heading font-black text-brand-white uppercase tracking-wider mb-4 leading-tight">
              LOCATE // <span className="text-brand-golden-yellow">VENUE</span>
            </h2>

            <p className="text-brand-white/80 font-brand-body text-sm md:text-base leading-relaxed mb-6">
              The event will be hosted at Shree Damodar College of Commerce &amp;
              Economics, Margao. Plan your route and join us at the venue.
            </p>
          </div>

          <div className="space-y-4 font-brand-small text-xs text-brand-white uppercase tracking-widest">
            
            {/* Coordinate Card with Chamfered Design */}
            <div 
              className="bg-gradient-to-r from-brand-golden-yellow/40 via-brand-orange/20 to-brand-golden-yellow/40 p-[1px] transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,184,0,0.2)]"
              style={{ clipPath: CARD_OUTER_CLIP }}
            >
              <div 
                className="flex items-start gap-4 bg-brand-navy/95 backdrop-blur-md p-4"
                style={{ clipPath: CARD_INNER_CLIP }}
              >
                <svg
                  className="w-6 h-6 text-brand-golden-yellow shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <span className="block text-brand-golden-yellow mb-1 font-bold">
                    Coordinates:
                  </span>
                  <span className="text-brand-white font-bold text-sm">
                    15.2831° N, 73.9686° E
                  </span>
                  <span className="block text-brand-white/60 text-[11px] mt-1 normal-case tracking-normal">
                    Comba, Margao, Goa
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Directions Button */}
            <div className="pt-2">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1px] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(255,184,0,0.5)]"
                style={{ clipPath: BTN_OUTER_CLIP }}
              >
                <div
                  className="flex items-center gap-2 bg-brand-golden-yellow px-5 py-2.5 font-brand-heading text-xs font-bold tracking-widest uppercase text-brand-navy transition-colors duration-300 group-hover:bg-brand-navy group-hover:text-brand-golden-yellow"
                  style={{ clipPath: BTN_INNER_CLIP }}
                >
                  <span>[ GET DIRECTIONS ]</span>
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </a>
            </div>

          </div>
        </motion.div>

        {/* Right Column: Google Map Embed Frame */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-full md:w-7/12"
        >
          <div 
            className="relative w-full h-[320px] sm:h-[400px] md:h-full min-h-[320px] bg-gradient-to-r from-brand-golden-yellow/40 via-brand-orange/30 to-brand-golden-yellow/40 p-[1px] transition-all duration-300 hover:drop-shadow-[0_0_25px_rgba(255,184,0,0.25)]"
            style={{ clipPath: CARD_OUTER_CLIP }}
          >
            <div 
              className="relative w-full h-full bg-brand-navy p-2 overflow-hidden group"
              style={{ clipPath: CARD_INNER_CLIP }}
            >
              {/* Overlay HUD Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-brand-golden-yellow pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-brand-golden-yellow pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-brand-golden-yellow pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-brand-golden-yellow pointer-events-none z-10" />

              <iframe
                title="Damodar College Margao Map"
                src={mapEmbedUrl}
                className="w-full h-full border-0 rounded-sm filter brightness-95 contrast-105 transition-all duration-300 group-hover:brightness-100"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}