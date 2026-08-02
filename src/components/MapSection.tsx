"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MapSection() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Shree+Damodar+College+of+Commerce+and+Economics,+Margao,+Goa&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const googleMapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Shree+Damodar+College+of+Commerce+and+Economics,+Margao,+Goa";

  return (
    <section
      id="map"
      className="relative w-full py-24 px-6 md:px-12 border-y border-brand-golden-yellow/20 bg-brand-navy overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center z-10">
        {/* Left Column: Details */}
        <div className="w-full md:w-1/3 bg-brand-navy z-10">
          <h2 className="text-3xl md:text-5xl font-brand-heading font-bold text-brand-white uppercase tracking-widest mb-4 ">
            LOCATE // <span className="text-brand-golden-yellow">VENUE</span>
          </h2>
          <p className="text-brand-white/80 font-brand-body text-sm leading-relaxed mb-8">
            The event will be hosted at Shree Damodar College of Commerce &amp;
            Economics, Margao. Plan your route and join us at the venue.
          </p>
     

          <div className="space-y-4 font-brand-small text-xs text-brand-white uppercase tracking-widest">
            <div className="flex items-start gap-4 bg-brand-navy/50 p-4 border border-brand-golden-yellow/30 rounded shadow-sm">
              <svg
                className="w-6 h-6 text-brand-golden-yellow shrink-0 mt-1"
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
                <span className="text-brand-white font-bold">
                  15.2831° N, 73.9686° E
                </span>
                <span className="block text-brand-cream/60 text-[10px] mt-1 normal-case">
                  Comba, Margao, Goa
                </span>
              </div>
            </div>

            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-golden-yellow hover:text-brand-light-green transition-colors duration-200 text-xs font-brand-small font-bold tracking-wider pt-2"
            >
              <span>[ GET DIRECTIONS ]</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Google Map Embed */}
        <div className="w-full md:w-2/3">
          <div className="relative w-full aspect-video bg-brand-navy border border-brand-golden-yellow/50 p-2 rounded shadow-brand-soft group overflow-hidden">
            <iframe
              title="Damodar College Margao Map"
              src={mapEmbedUrl}
              className="w-full h-full border-0 rounded-sm"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}