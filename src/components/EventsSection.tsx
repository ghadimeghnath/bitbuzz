"use client";

import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import events from "@/data/baseEvents.json";

interface EventItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  slug: string;
  colorCls: {
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
  };
}

interface WheelCardProps {
  event: EventItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalCards: number;
}

export default function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Dynamically update active index on scroll to highlight current category pill
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      events.length - 1,
      Math.max(0, Math.round(latest * (events.length - 1)))
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.category)));
  }, []);

  const activeCategory = events[activeIndex]?.category;

  // Auto-swipe / smooth-scroll to the first event card of the clicked category
  const handleCategoryClick = (category: string) => {
    const targetIndex = events.findIndex((e) => e.category === category);
    if (targetIndex === -1 || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerStart = rect.top + scrollTop;
    const totalScrollableHeight = container.offsetHeight - window.innerHeight;

    const progress = targetIndex / Math.max(1, events.length - 1);
    const targetScrollY = containerStart + totalScrollableHeight * progress;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const trackHeight = `${Math.min(500, Math.max(250, events.length * 45))}vh`;

  return (
    <section
      ref={containerRef}
      id="events"
      style={{ height: trackHeight }}
      className="relative w-full bg-brand-navy"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-between p-4 md:p-12">
        
        {/* LOGO & CATEGORY ARC HUB */}
        <LogoCategoryHub
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryClick}
        />

        {/* CAROUSEL WHEEL STAGE */}
        <div className="relative w-full h-full flex items-center justify-center z-20 pointer-events-none">
          {events.map((event, index) => (
            <WheelCard
              key={event.id || index}
              event={event}
              index={index}
              scrollYProgress={scrollYProgress}
              totalCards={events.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LOGO & CATEGORY ARC HUB COMPONENT
   ========================================================================= */
interface LogoCategoryHubProps {
  categories: string[];
  activeCategory?: string;
  onSelectCategory: (category: string) => void;
}

function LogoCategoryHub({ categories, activeCategory, onSelectCategory }: LogoCategoryHubProps) {
  return (
    <div className="absolute z-30 pointer-events-auto flex items-center justify-center
      /* Mobile Positioning: Anchored at Bottom Center */
      bottom-8 left-1/2 -translate-x-1/2 
      /* Desktop Positioning: Anchored at Left Center */
      md:bottom-auto md:top-1/2 md:left-12 lg:left-20 md:translate-x-0 md:-translate-y-1/2"
    >
      <div className="relative flex items-center justify-center">
        
        {/* Central Circular Logo */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-brand-navy border-2 border-brand-golden-yellow/70 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.25)] z-20 transition-all">
          <div className="text-brand-golden-yellow font-brand-heading font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wider uppercase text-center">
            LOGO
          </div>
          <span className="text-[8px] md:text-[10px] lg:text-xs text-brand-white/50 tracking-widest uppercase font-mono">
            Arena
          </span>
        </div>

        {/* Arced Category Pills orbiting central Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {categories.map((cat, idx) => {
            const total = categories.length;
            const spread = total > 1 ? 90 : 0;
            const step = total > 1 ? spread / (total - 1) : 0;
            const startAngle = -spread / 2;
            const angle = startAngle + idx * step;

            const isActive = activeCategory === cat;

            return (
              <div
                key={cat}
                className="absolute pointer-events-auto transition-transform duration-300"
                style={{
                  ["--arc-angle" as string]: `${angle}deg`,
                }}
              >
                <div
                  className="
                    /* Mobile Orbit: Arcs around TOP of Logo */
                    [transform:rotate(calc(var(--arc-angle)-90deg))_translate(70px)_rotate(calc(-1*(var(--arc-angle)-90deg)))]
                    sm:[transform:rotate(calc(var(--arc-angle)-90deg))_translate(82px)_rotate(calc(-1*(var(--arc-angle)-90deg)))]
                    /* Desktop Orbit: Arcs around RIGHT of Logo */
                    md:[transform:rotate(var(--arc-angle))_translate(110px)_rotate(calc(-1*var(--arc-angle)))]
                    lg:[transform:rotate(var(--arc-angle))_translate(135px)_rotate(calc(-1*var(--arc-angle)))]
                  "
                >
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className={`px-2.5 py-1 md:px-3.5 md:py-1.5 lg:px-4 lg:py-2 backdrop-blur-md border font-brand-heading text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold tracking-widest uppercase rounded-full shadow-md transition-all duration-300 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-brand-golden-yellow text-brand-navy border-brand-golden-yellow shadow-[0_0_12px_rgba(234,179,8,0.5)] scale-105"
                        : "bg-brand-navy/90 text-brand-white/80 border-brand-golden-yellow/40 hover:border-brand-golden-yellow hover:text-brand-white hover:scale-105"
                    }`}
                  >
                    {cat}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

/* =========================================================================
   WHEEL CARD COMPONENT
   ========================================================================= */
function WheelCard({ event, index, scrollYProgress, totalCards }: WheelCardProps) {
  const theta = 360 / totalCards;
  const baseAngle = index * theta;

  const globalRotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (totalCards - 1) * theta]
  );

  const rotate = useTransform(globalRotation, (v) => baseAngle - v);

  const opacity = useTransform(rotate, (angle) => {
    const threshold = 28;
    return Math.abs(angle) < threshold ? 1 - Math.abs(angle) / threshold : 0;
  });

  const scale = useTransform(rotate, (angle) => {
    const threshold = 28;
    const abs = Math.abs(angle);
    return abs < threshold ? 1 - (abs / threshold) * 0.12 : 0.88;
  });

  const zIndex = useTransform(rotate, (angle) => 100 - Math.round(Math.abs(angle)));
  const pointerEvents = useTransform(opacity, (v) => (v > 0.6 ? "auto" : "none"));

  return (
    <div className="absolute top-[32%] sm:top-[38%] md:top-1/2 left-1/2 md:left-[58%] lg:left-[60%] w-full max-w-[90%] sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl -translate-x-1/2 -translate-y-1/2 pointer-events-none flex justify-center">
      <motion.div
        style={{
          rotate,
          scale,
          opacity,
          zIndex,
          pointerEvents,
          transformOrigin: "var(--wheel-pivot)",
        }}
        className="will-change-transform w-full 
          [--wheel-pivot:50%_850px] 
          sm:[--wheel-pivot:50%_950px] 
          md:[--wheel-pivot:clamp(-800px,-45vw,-450px)_50%]
          lg:[--wheel-pivot:clamp(-1100px,-50vw,-700px)_50%]"
      >
        <div className="group relative bg-brand-navy/95 backdrop-blur-md border border-brand-golden-yellow/30 hover:border-brand-golden-yellow transition-all duration-300 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row shadow-2xl w-full h-auto overflow-hidden">
          
          {/* Glow Highlight Overlay */}
          <div className="absolute inset-0 border border-brand-golden-yellow/20 scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 rounded-xl lg:rounded-2xl" />

          {/* Card Media Section */}
          <div className="relative w-full sm:w-2/5 lg:w-[45%] h-28 sm:h-auto min-h-[110px] sm:min-h-[220px] border-b sm:border-b-0 sm:border-r border-brand-golden-yellow/30 overflow-hidden bg-black shrink-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
            />
          </div>

          {/* Card Content Section */}
          <div className="p-3.5 sm:p-5 md:p-6 lg:p-7 flex flex-col justify-between flex-grow bg-brand-navy relative z-20 gap-2 sm:gap-3">
            
            {/* Header: Title + Event Number */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-full shrink-0 ${event.colorCls.bg}`} />
                  <h3 className="font-brand-competition text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-brand-white tracking-wider line-clamp-1">
                    {event.title}
                  </h3>
                </div>
                <span className={`font-brand-heading font-bold text-xs sm:text-base md:text-lg lg:text-2xl shrink-0 ${event.colorCls.text}`}>
                  #{event.id}
                </span>
              </div>

              {/* Category Subtitle */}
              <span className={`block font-brand-heading font-bold text-[9px] sm:text-xs lg:text-sm uppercase tracking-widest ${event.colorCls.text}`}>
                {event.category}
              </span>
            </div>

            {/* Description Paragraph */}
            <p className="text-brand-white/70 font-brand-body text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
              Initiate protocol {event.id}. Prepare your systems for the {event.title} challenge within the arena. Success requires strategy.
            </p>

            {/* CTA Button */}
            <Link
              href={`/event/${event.slug}`}
              className={`relative z-30 block text-center w-full py-2 sm:py-2.5 lg:py-3 border ${event.colorCls.border} ${event.colorCls.text} font-brand-heading text-[10px] sm:text-xs md:text-sm lg:text-base font-bold tracking-widest uppercase ${event.colorCls.hoverBg} hover:text-brand-navy transition-colors rounded-md lg:rounded-lg cursor-pointer mt-1 sm:mt-2`}
            >
              [ View Details ]
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}