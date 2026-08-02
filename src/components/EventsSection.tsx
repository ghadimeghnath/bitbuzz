"use client";

import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  animate,
  PanInfo,
} from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
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
  progress: MotionValue<number>;
  totalCards: number;
}

export default function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panStartIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeProgress = useMotionValue(0);

  // Sync scrollYProgress to activeProgress on Desktop only
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      activeProgress.set(latest);
    }
  });

  // Dynamically update active index on progress change
  useMotionValueEvent(activeProgress, "change", (latest) => {
    const idx = Math.min(
      events.length - 1,
      Math.max(0, Math.round(latest * (events.length - 1)))
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  // Capture starting card index when touch drag starts
  const handlePanStart = () => {
    if (!isMobile) return;
    panStartIndexRef.current = activeIndex;
  };

  // Limit live touch drag visual preview to max +/- 1 card offset
  const handlePan = (_: any, info: PanInfo) => {
    if (!isMobile || events.length <= 1) return;

    const total = events.length - 1;
    if (total <= 0) return;

    // Convert screen pixel delta to step normalized to 1 card width
    const stepDelta = -info.offset.x / (window.innerWidth * 0.45);
    // Clamp preview movement between -1 and +1 card step
    const clampedStepDelta = Math.min(1, Math.max(-1, stepDelta));

    const startProgress = panStartIndexRef.current / total;
    const targetProgress = Math.min(
      1,
      Math.max(0, startProgress + clampedStepDelta / total)
    );

    activeProgress.set(targetProgress);
  };

  // Force snap movement to move strictly ONE card forward or backward
  const handlePanEnd = (_: any, info: PanInfo) => {
    if (!isMobile || events.length <= 1) return;

    const total = events.length - 1;
    if (total <= 0) return;

    const distanceThreshold = 35; // Min pixels moved to trigger swipe
    const velocityThreshold = 150; // Min swipe speed to trigger swipe
    const startIdx = panStartIndexRef.current;
    let targetIdx = startIdx;

    if (
      info.offset.x < -distanceThreshold ||
      info.velocity.x < -velocityThreshold
    ) {
      targetIdx = Math.min(total, startIdx + 1); // Move exactly 1 card forward
    } else if (
      info.offset.x > distanceThreshold ||
      info.velocity.x > velocityThreshold
    ) {
      targetIdx = Math.max(0, startIdx - 1); // Move exactly 1 card backward
    }

    const targetProgress = targetIdx / total;
    animate(activeProgress, targetProgress, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  // Extract unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.category)));
  }, []);

  const activeCategory = events[activeIndex]?.category;

  const handleCategoryClick = (category: string) => {
    const targetIndex = events.findIndex((e) => e.category === category);
    if (targetIndex === -1) return;

    const targetProgress = targetIndex / Math.max(1, events.length - 1);

    if (isMobile) {
      animate(activeProgress, targetProgress, {
        type: "spring",
        stiffness: 220,
        damping: 25,
      });
    } else {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerStart = rect.top + scrollTop;
      const totalScrollableHeight = container.offsetHeight - window.innerHeight;

      const targetScrollY = containerStart + totalScrollableHeight * targetProgress;

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }
  };

  const trackHeight = `${Math.min(500, Math.max(250, events.length * 45))}vh`;

  return (
    <section
      ref={containerRef}
      id="events"
      style={{ height: isMobile ? "100dvh" : trackHeight }}
      className="relative w-full bg-brand-navy"
    >
      <div className="sticky top-0 h-[70%] w-full overflow-hidden flex flex-col md:flex-row items-center justify-between p-2 sm:p-4 md:p-8 lg:p-12">
        
        {/* LOGO & CATEGORY ARC HUB */}
        <LogoCategoryHub
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryClick}
        />

        {/* CAROUSEL WHEEL STAGE */}
        <motion.div
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          className="relative w-full h-full flex items-center justify-center z-20 touch-pan-y"
        >
          {events.map((event, index) => (
            <WheelCard
              key={event.id || index}
              event={event}
              index={index}
              progress={activeProgress}
              totalCards={events.length}
            />
          ))}
        </motion.div>
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
      bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 
      /* Desktop Positioning: Anchored at Left Center */
      md:bottom-auto md:top-1/2 md:left-6 lg:left-12 xl:left-16 2xl:left-20 md:translate-x-0 md:-translate-y-1/2"
    >
      <div className="relative flex items-center justify-center">
        
        {/* Central Circular Logo */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-brand-navy border-2 border-brand-golden-yellow/70 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.25)] z-20 transition-all">
          <Image src={'/final-logo.png'} height={80} width={80} alt="Logo"/>
        </div>

        {/* Arced Category Pills Orbiting Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {categories.map((cat, idx) => {
            const total = categories.length;
            
            const spread = total > 1 ? (total > 4 ? 110 : 90) : 0;
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
                    /* Mobile Orbit: Arcs around TOP of Logo (-90deg offset) */
                    [transform:rotate(calc(var(--arc-angle)-90deg))_translate(54px)_rotate(calc(-1*(var(--arc-angle)-90deg)))]
                    sm:[transform:rotate(calc(var(--arc-angle)-90deg))_translate(68px)_rotate(calc(-1*(var(--arc-angle)-90deg)))]
                    /* Desktop Orbit: Arcs around RIGHT of Logo (0deg offset) */
                    md:[transform:rotate(var(--arc-angle))_translate(95px)_rotate(calc(-1*var(--arc-angle)))]
                    lg:[transform:rotate(var(--arc-angle))_translate(120px)_rotate(calc(-1*var(--arc-angle)))]
                    xl:[transform:rotate(var(--arc-angle))_translate(135px)_rotate(calc(-1*var(--arc-angle)))]
                  "
                >
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 backdrop-blur-md border font-brand-heading text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-bold tracking-widest uppercase rounded-full shadow-md transition-all duration-300 whitespace-nowrap cursor-pointer ${
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
function WheelCard({ event, index, progress, totalCards }: WheelCardProps) {
  const theta = 360 / totalCards;
  const baseAngle = index * theta;

  const globalRotation = useTransform(
    progress,
    [0, 1],
    [0, (totalCards - 1) * theta]
  );

  const rotate = useTransform(globalRotation, (v) => baseAngle - v);

  const opacity = useTransform(rotate, (angle) => {
    const threshold = 26;
    return Math.abs(angle) < threshold ? 1 - Math.abs(angle) / threshold : 0;
  });

  const scale = useTransform(rotate, (angle) => {
    const threshold = 26;
    const abs = Math.abs(angle);
    return abs < threshold ? 1 - (abs / threshold) * 0.15 : 0.85;
  });

  const zIndex = useTransform(rotate, (angle) => 100 - Math.round(Math.abs(angle)));
  const pointerEvents = useTransform(opacity, (v) => (v > 0.6 ? "auto" : "none"));

  return (
    <div className="absolute 
      /* Mobile Placement */
      top-[26%] sm:top-[30%] -translate-y-1/2 left-1/2 -translate-x-1/2 
      /* Desktop Placement with Safety Gap */
      md:top-1/2 md:translate-x-0 md:left-[54%] lg:left-[56%] xl:left-[58%] 2xl:left-[60%] 
      /* Responsive Width Constraints */
      w-full max-w-[92%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl 
      pointer-events-none flex justify-center"
    >
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
          [--wheel-pivot:50%_750px] 
          sm:[--wheel-pivot:50%_850px] 
          md:[--wheel-pivot:clamp(-750px,-40vw,-400px)_50%]
          lg:[--wheel-pivot:clamp(-950px,-45vw,-550px)_50%]
          xl:[--wheel-pivot:clamp(-1150px,-50vw,-700px)_50%]"
      >
        <div className="group relative bg-brand-navy/95 backdrop-blur-md border border-brand-golden-yellow/30 hover:border-brand-golden-yellow transition-all duration-300 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row shadow-2xl w-full h-auto overflow-hidden">
          
          {/* Subtle Glow Border */}
          <div className="absolute inset-0 border border-brand-golden-yellow/20 scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 rounded-xl lg:rounded-2xl" />

          {/* Card Media Section */}
          <div className="relative w-full sm:w-2/5 lg:w-[42%] h-28 sm:h-auto min-h-[100px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[280px] border-b sm:border-b-0 sm:border-r border-brand-golden-yellow/30 overflow-hidden bg-black shrink-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 42vw"
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
            />
          </div>

          {/* Card Details Section */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6 2xl:p-8 flex flex-col justify-between flex-grow bg-brand-navy relative z-20 gap-1.5 sm:gap-2.5 md:gap-3">
            
            {/* Header: Title & Event ID */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-0.5 sm:mb-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full shrink-0 ${event.colorCls.bg}`} />
                  <h3 className="font-brand-competition text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-bold text-brand-white tracking-wider line-clamp-1">
                    {event.title}
                  </h3>
                </div>
                <span className={`font-brand-heading font-bold text-xs sm:text-base md:text-lg lg:text-xl 2xl:text-2xl shrink-0 ${event.colorCls.text}`}>
                  #{event.id}
                </span>
              </div>

              {/* Category Tag */}
              <span className={`block font-brand-heading font-bold text-[8px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-widest ${event.colorCls.text}`}>
                {event.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-brand-white/70 font-brand-body text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
              Initiate protocol {event.id}. Prepare your systems for the {event.title} challenge within the arena. Success requires strategy.
            </p>

            {/* Action Link */}
            <Link
              href={`/event/${event.slug}`}
              className={`relative z-30 block text-center w-full py-1.5 sm:py-2 md:py-2.5 lg:py-3 border ${event.colorCls.border} ${event.colorCls.text} font-brand-heading text-[9px] sm:text-xs md:text-sm lg:text-base font-bold tracking-widest uppercase ${event.colorCls.hoverBg} hover:text-brand-navy transition-colors rounded-md lg:rounded-lg cursor-pointer mt-1`}
            >
              [ View Details ]
            </Link>
          </div>

        </div>
      </motion.div>
    </div>
  );
}