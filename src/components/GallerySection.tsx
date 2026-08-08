"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Gallery Data                                                               */
/* -------------------------------------------------------------------------- */

const galleryItems = [
  {
    src: "/gallery_1.jpg",
    alt: "Debate round in session - students in circular formation",
    caption: "Argument Arena",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery_2.jpg",
    alt: "Victory celebration with trophy at Shree Damodar College",
    caption: "Champions 🏆",
    span: "col-span-1 row-span-2",
  },
  {
    src: "/gallery_3.jpg",
    alt: "Group photo at South Goa venue",
    caption: "BitBuzz @ Goa",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery_4.jpg",
    alt: "Shree Damodar College of Commerce and Economics",
    caption: "Venue",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/gallery_5.jpg",
    alt: "Award ceremony group photo at Shree Damodar College",
    caption: "Award Ceremony",
    span: "col-span-1 row-span-1",
  },
];

/* -------------------------------------------------------------------------- */
/*  Clip-Path Token                                                            */
/* -------------------------------------------------------------------------- */

const BADGE_OUTER = `polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)`;
const BADGE_INNER = `polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)`;

/* -------------------------------------------------------------------------- */
/*  Lightbox Component                                                         */
/* -------------------------------------------------------------------------- */

function Lightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  items: typeof galleryItems;
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[activeIndex];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Border glow frame */}
        <div
          className="bg-gradient-to-br from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1.5px]"
          style={{ clipPath: BADGE_OUTER }}
        >
          <div
            className="relative bg-brand-navy overflow-hidden"
            style={{ clipPath: BADGE_INNER }}
          >
            {/* Image */}
            <div className="relative w-full aspect-video">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
              {/* Caption bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-navy/90 to-transparent px-6 py-4">
                <p className="font-brand-heading text-brand-golden-yellow text-sm md:text-base font-bold uppercase tracking-widest">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy border border-brand-golden-yellow/60 text-brand-golden-yellow hover:bg-brand-golden-yellow hover:text-brand-navy transition-colors duration-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <button
          onClick={onPrev}
          className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy border border-brand-golden-yellow/60 text-brand-golden-yellow hover:bg-brand-golden-yellow hover:text-brand-navy transition-colors duration-200"
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy border border-brand-golden-yellow/60 text-brand-golden-yellow hover:bg-brand-golden-yellow hover:text-brand-navy transition-colors duration-200"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Counter */}
        <div className="mt-4 text-center font-brand-heading text-xs font-bold tracking-widest text-brand-white/40 uppercase">
          {activeIndex + 1} / {items.length}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Gallery Section                                                       */
/* -------------------------------------------------------------------------- */

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : 0
    );
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % galleryItems.length : 0
    );



  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative w-full bg-brand-navy py-16 md:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden border-t border-brand-golden-yellow/10"
      >
        {/* Radial background glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[400px] bg-brand-golden-yellow/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-transparent to-brand-navy" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* ---- Section Header ---- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14 text-center"
          >
            {/* Top decorative label */}
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-brand-golden-yellow/60" />
              <span className="font-brand-heading text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-brand-golden-yellow/70">
                Moments
              </span>
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-brand-golden-yellow/60" />
            </div>

            <h2 className="font-brand-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-brand-white leading-tight">
              A Celebration of{" "}
              <span className="bg-gradient-to-r from-brand-golden-yellow to-brand-orange bg-clip-text text-transparent">
                Ideas, Innovation
              </span>{" "}
              and Talent!
            </h2>

            <p className="mt-4 text-sm md:text-base text-brand-white/50 font-brand-body max-w-xl mx-auto">
              Relive the best moments from BitBuzz — where creativity meets technology.
            </p>

            {/* Accent divider */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-brand-golden-yellow/40" />
              <div className="h-1.5 w-1.5 rounded-full bg-brand-golden-yellow" />
              <div className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
              <div className="h-1.5 w-1.5 rounded-full bg-brand-golden-yellow" />
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-brand-golden-yellow/40" />
            </div>
          </motion.div>

          {/* ---- Gallery Grid ---- */}
          <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-3 md:gap-4">
            {galleryItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                onClick={() => openLightbox(i)}
                className={`group relative overflow-hidden cursor-zoom-in ${
                  i === 1 ? "row-span-2" : "row-span-1"
                }`}
                style={{ minHeight: "180px" }}
              >
                {/* Outer glow border */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-brand-golden-yellow/40 to-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
                  style={{ clipPath: BADGE_OUTER }}
                />

                {/* Image */}
                <div className="relative w-full h-full min-h-[180px] md:min-h-[220px] overflow-hidden rounded-sm">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/40 transition-colors duration-300 z-10" />

                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-brand-navy/95 via-brand-navy/60 to-transparent px-3 py-3 md:px-4 md:py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-0.5 w-4 bg-brand-golden-yellow shrink-0" />
                      <span className="font-brand-heading text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-golden-yellow truncate">
                        {item.caption}
                      </span>
                    </div>
                  </div>

                  {/* Cyber corner accent top-left */}
                  <div className="absolute top-0 left-0 z-20 w-5 h-5 border-t-2 border-l-2 border-brand-golden-yellow/0 group-hover:border-brand-golden-yellow/80 transition-all duration-300" />
                  {/* Cyber corner accent bottom-right */}
                  <div className="absolute bottom-0 right-0 z-20 w-5 h-5 border-b-2 border-r-2 border-brand-golden-yellow/0 group-hover:border-brand-golden-yellow/80 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* ---- Footer Note ---- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-golden-yellow/20 to-brand-orange/20 p-[1px]"
              style={{ clipPath: BADGE_OUTER }}
            >
              <div
                className="px-6 py-2.5 bg-brand-navy/90 backdrop-blur-sm"
                style={{ clipPath: BADGE_INNER }}
              >
                <span className="font-brand-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-white/60">
                  Click any photo to view full-size
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ---- Lightbox ---- */}
      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  );
}
