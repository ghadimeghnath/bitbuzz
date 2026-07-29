"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Shree+Damodar+College+of+Commerce+and+Economics,+Margao,+Goa&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Shree+Damodar+College+of+Commerce+and+Economics,+Margao,+Goa";

  return (
    <section
      id="map"
      className="relative w-full bg-charcoal py-24 px-6 md:px-12 border-y border-emerald/20"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left Column: Details */}
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-widest mb-4">
            LOCATE // <span className="text-emerald">NEXUS</span>
          </h2>
          <p className="text-emerald/80 font-mono text-sm leading-relaxed mb-8">
            The event will be hosted at Shree Damodar College of Commerce &amp;
            Economics, Margao. Ensure your connection stability before
            initiating travel.
          </p>

          <div className="space-y-4 font-mono text-xs text-white uppercase tracking-widest">
            <div className="flex items-start gap-4 bg-stone/50 p-4 border border-emerald/30 clip-corner">
              <svg
                className="w-6 h-6 text-neon-green shrink-0 mt-1"
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
                <span className="block text-emerald mb-1">
                  GPS Coordinates:
                </span>
                <span className="text-white font-semibold">
                  15.2831° N, 73.9686° E
                </span>
                <span className="block text-emerald/60 text-[10px] mt-1 normal-case">
                  Comba, Margao, Goa
                </span>
              </div>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald hover:text-neon-green transition-colors duration-200 text-xs font-mono tracking-wider pt-2"
            >
              <span>[ INITIATE_NAVIGATION ]</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Google Map Embed */}
        <div className="w-full md:w-2/3">
          <div className="relative w-full aspect-video bg-black border-2 border-emerald/50 p-2 clip-corner box-glow group overflow-hidden">
            <iframe
              title="Damodar College Margao Map"
              src={mapEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Pointer Overlay Effects */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

          
          </div>
        </div>
      </div>
    </section>
  );
}