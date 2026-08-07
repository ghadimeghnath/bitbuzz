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
import { useRef, useMemo, useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import events from "@/data/baseEvents.json";
import { CornerMarks } from "./ui/CornerMarks";
import { Hand } from "lucide-react";
import { CircuitDots } from "./ui/CircuitDots";
import { useLenis } from "lenis/react";

interface EventItem {
  id: string | number;
  title: string;
  category: string;
  difficulty: string;
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

// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH: gap between the CAROUSEL WHEEL STAGE and the
// LOGO & CATEGORY ARC HUB. Adjust these px values per breakpoint and every
// layout that reads from them (the flex gap AND the mobile stage-height
// calculation) stays in sync automatically.
// ---------------------------------------------------------------------------
const STAGE_HUB_GAP = {
  mobile: 60, // < 640px, flex-col layout (stage stacked above hub)
  tablet: 20, // >= 640px (sm) and < 768px (md), still flex-col
  desktop: 0, // >= 768px (md+), hub is absolutely positioned so this is inert
} as const;

// Header Badge Cut
const HEADER_BADGE_OUTER = `polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)`;
const HEADER_BADGE_INNER = `polygon(15px 0, calc(100% - 15px) 0, 100% 100%, 0 100%)`;

export default function EventsSection() {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const panStartIndexRef = useRef(0);

  // Ref to hold running spring animation controls so we can stop them instantly on pan start
  const animControlsRef = useRef<any>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [stageHeight, setStageHeight] = useState<number | null>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Measure real heights and calculate card stage height for mobile
  useLayoutEffect(() => {
    if (!isMobile) {
      setStageHeight(null);
      return;
    }

    const recalc = () => {
      if (!hubRef.current || !stickyRef.current) return;
      const stickyStyles = window.getComputedStyle(stickyRef.current);
      const paddingTop = parseFloat(stickyStyles.paddingTop) || 0;
      const paddingBottom = parseFloat(stickyStyles.paddingBottom) || 0;
      const stickyContentHeight =
        stickyRef.current.clientHeight - paddingTop - paddingBottom;
      const hubHeight = hubRef.current.getBoundingClientRect().height;

      // Account for category pills arcing ~60px above the hub container box on mobile
      const PILL_ARC_OVERSHOOT = 60;
      const available =
        stickyContentHeight - hubHeight - PILL_ARC_OVERSHOOT - STAGE_HUB_GAP.mobile;

      setStageHeight(Math.max(140, available));
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    if (hubRef.current) ro.observe(hubRef.current);
    if (stickyRef.current) ro.observe(stickyRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [isMobile]);

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

    // Stop any active spring snap animation immediately so it doesn't fight drag
    if (animControlsRef.current) {
      animControlsRef.current.stop();
    }

    // Read index directly from MotionValue instead of stale React state
    const total = Math.max(1, events.length - 1);
    panStartIndexRef.current = Math.round(activeProgress.get() * total);
  };

  // Limit live touch drag visual preview to max +/- 1 card offset
  const handlePan = (_: any, info: PanInfo) => {
    if (!isMobile || events.length <= 1) return;

    const total = events.length - 1;
    if (total <= 0) return;

    // Convert screen pixel delta to step normalized to 1 card width
    const stepDelta = -info.offset.x / (window.innerWidth * 0.45);
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

    // Save animation instance so handlePanStart can interrupt it if needed
    animControlsRef.current = animate(activeProgress, targetProgress, {
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
      if (animControlsRef.current) {
        animControlsRef.current.stop();
      }
      animControlsRef.current = animate(activeProgress, targetProgress, {
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

      if (lenis) {
        lenis.scrollTo(targetScrollY);
      } else {
        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      }
    }
  };

  const trackHeight = `${Math.min(500, Math.max(250, events.length * 45))}vh`;

  return (
    <section
      ref={containerRef}
      id="events"
      style={{ height: isMobile ? "95dvh" : trackHeight }}
      className="relative w-full bg-brand-navy flex flex-col"
    >
      <div className="flex justify-center shrink-0">
            <div
              className="bg-gradient-to-r from-brand-orange via-brand-golden-yellow to-brand-orange p-[1.5px] drop-shadow-[0_0_15px_rgba(243,202,32,0.35)]"
              style={{ clipPath: HEADER_BADGE_OUTER }}
            >
              <div
                className="bg-brand-navy px-6 py-3.5 sm:px-10 sm:py-4"
                style={{ clipPath: HEADER_BADGE_INNER }}
              >
                <h2 className="font-brand-heading text-2xl font-extrabold uppercase tracking-widest text-brand-white sm:text-4xl md:text-5xl">
                  EVENTS & RULES
                </h2>
              </div>
            </div>
          </div>
      <div
        ref={stickyRef}
        style={{
          // Expose STAGE_HUB_GAP as CSS vars so the same responsive Tailwind
          // gap classes below can reference them at every breakpoint.
          ["--stage-hub-gap-mobile" as any]: `${STAGE_HUB_GAP.mobile}px`,
          ["--stage-hub-gap-tablet" as any]: `${STAGE_HUB_GAP.tablet}px`,
          ["--stage-hub-gap-desktop" as any]: `${STAGE_HUB_GAP.desktop}px`,
        }}
        className="sticky top-0 z-10 flex-1 md:flex-none h-auto md:h-dvh w-full overflow-hidden flex flex-col md:flex-row items-center justify-start md:justify-between p-2 sm:p-4 md:p-8 lg:p-12
          gap-[var(--stage-hub-gap-mobile)] sm:gap-[var(--stage-hub-gap-tablet)] md:gap-[var(--stage-hub-gap-desktop)]"
      >

        {/* CAROUSEL WHEEL STAGE */}
        <motion.div
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          style={{
            // Keeps touch gestures for Framer Motion
            touchAction: "pan-y",
            ...(isMobile && stageHeight ? { height: stageHeight } : {}),
          }}
          // 
          // 1. h-[80vh] sets a fixed height (adjust as needed) for mobile/desktop fallback.
          // 2. md:h-full keeps it full height on larger screens.
          // 3. overflow-hidden ensures the stage itself never scrolls.
          className="relative w-full h-[50dvh] md:h-full flex items-center justify-center z-20"
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

        {/* LOGO & CATEGORY ARC HUB */}
        <div
          ref={hubRef}
          className="relative z-30 shrink-0
            md:absolute md:bottom-auto md:top-1/2 md:left-6 lg:left-12 xl:left-16 2xl:left-20 md:-translate-y-1/2 md:translate-x-0"
        >
          <LogoCategoryHub
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={handleCategoryClick}
            isMobile={isMobile}
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   LOGO & CATEGORY ARC HUB COMPONENT
   ========================================================================= */


// Logo diameter (px) at each Tailwind breakpoint — matches the w-16/sm:w-20/md:w-28/lg:w-36/xl:w-40 classes below.
function getLogoDiameter(width: number) {
  if (width >= 1280) return 160; // xl
  if (width >= 1024) return 144; // lg
  if (width >= 768) return 112; // md
  if (width >= 640) return 80; // sm
  return 64; // base
}

// ---------------------------------------------------------------------------
// PILL ARC LAYOUT CONFIG
// Instead of a fixed total spread that squeezes pills closer together as more
// categories are added (which risks them overlapping each other, the logo,
// or the wheel stage), the arc grows to keep spacing consistent:
//  - minAngularGapDeg is the angle held between every adjacent pill.
//    Total spread = minAngularGapDeg * (count - 1), so the arc widens
//    automatically as categories are added — the "justify-between" of the arc.
//  - Past baselinePillCount categories, the radius itself also grows a bit
//    per extra pill, so a wider arc doesn't crowd the logo.
//  - maxRadiusRatio caps how far the arc can extend outward so it can never
//    physically reach into the wheel stage next to it, regardless of count.
// ---------------------------------------------------------------------------
const PILL_ARC = {
  minAngularGapDegDesktop: 30,
  minAngularGapDegTablet: 30,
  minAngularGapDegMobile: 67,
  baselinePillCount: 4,
  radiusGrowthPerExtraPill: 14, // px
  bufferMobile: 50, // px clearance beyond logo radius, mobile (vertical arc)
  bufferDesktop: 150, // px clearance beyond logo radius, desktop (horizontal arc)
  maxRadiusRatioMobile: 0.42, // cap: fraction of viewport height
  maxRadiusRatioDesktop: 0.28, // cap: fraction of viewport width
} as const;

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Chamfered Cyber Angles)                            */
/* -------------------------------------------------------------------------- */

// Central HUD Logo Octagon Frame
const LOGO_OCTAGON_OUTER = `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`;
const LOGO_OCTAGON_INNER = `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`;

// Arced Category Pill Chamfered Cuts
const PILL_OUTER_CLIP = `polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)`;
const PILL_INNER_CLIP = `polygon(9px 0, calc(100% - 9px) 0, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%, 0 calc(100% - 9px), 0 9px)`;

/* -------------------------------------------------------------------------- */
/*  Fallback Constants / Helpers (If not imported globally)                   */
/* -------------------------------------------------------------------------- */

const PILL_ARC_DEFAULTS = {
  minAngularGapDegDesktop:30,
  minAngularGapDegTablet: 18,
  minAngularGapDegMobile: 15,
  bufferDesktop: 40,
  bufferMobile: 25,
  baselinePillCount: 4,
  radiusGrowthPerExtraPill: 12,
  maxRadiusRatioDesktop: 0.22,
  maxRadiusRatioMobile: 0.28,
};

function defaultGetLogoDiameter(width: number): number {
  if (width < 640) return 64;
  if (width < 768) return 80;
  if (width < 1024) return 112;
  if (width < 1280) return 144;
  return 160;
}

/* -------------------------------------------------------------------------- */
/*  Component Interfaces                                                      */
/* -------------------------------------------------------------------------- */

export interface LogoCategoryHubProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  isMobile?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  LogoCategoryHub Component                                                 */
/* -------------------------------------------------------------------------- */

export function LogoCategoryHub({
  categories,
  activeCategory,
  onSelectCategory,
  isMobile = false,
}: LogoCategoryHubProps) {
  const total = categories.length;

  const [pillRadius, setPillRadius] = useState(110);
  // Safely fallback to defined defaults if global PILL_ARC is not in scope
  const arcConfig =
    typeof PILL_ARC !== "undefined" ? PILL_ARC : PILL_ARC_DEFAULTS;
  const logoDiameterFn =
    typeof getLogoDiameter !== "undefined"
      ? getLogoDiameter
      : defaultGetLogoDiameter;

  const [angularGap, setAngularGap] = useState<number>(
    arcConfig.minAngularGapDegDesktop
  );

  // Fixed angular gap between pills -> total spread grows with category count
  const spread = total > 1 ? angularGap * (total - 1) : 0;
  const step = total > 1 ? angularGap : 0;

  useEffect(() => {
    const recalc = () => {
      let currentGap: number = arcConfig.minAngularGapDegDesktop;
      if (window.innerWidth < 640) {
        currentGap = arcConfig.minAngularGapDegMobile;
      } else if (window.innerWidth < 768) {
        currentGap = arcConfig.minAngularGapDegTablet;
      }
      setAngularGap(currentGap);

      const diameter = logoDiameterFn(window.innerWidth);
      const logoR = diameter / 2;
      const buffer =
        window.innerWidth < 768
          ? arcConfig.bufferMobile
          : arcConfig.bufferDesktop;

      const extraPills = Math.max(0, total - arcConfig.baselinePillCount);
      const grownRadius =
        logoR + buffer + extraPills * arcConfig.radiusGrowthPerExtraPill;

      const maxRadius =
        window.innerWidth < 768
          ? window.innerHeight * arcConfig.maxRadiusRatioMobile
          : window.innerWidth * arcConfig.maxRadiusRatioDesktop;

      setPillRadius(Math.min(grownRadius, maxRadius));
    };

    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [total, arcConfig, logoDiameterFn]);

  return (
    <div className="relative flex items-center justify-between">
      {/* Central Cyber Octagon HUD Logo Hub */}
      <div className="relative z-20 flex items-center justify-center">
        {/* Outer Dual-Layer Glowing Cyber Frame */}
        <div
          className="bg-gradient-to-br from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[2px] transition-all duration-300 drop-shadow-[0_0_20px_rgba(243,202,32,0.35)]"
          style={{ clipPath: LOGO_OCTAGON_OUTER }}
        >
          {/* Inner Navy Container */}
          <div
            className="relative flex h-16 w-16 items-center justify-center bg-brand-navy p-2 backdrop-blur-md sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 xl:h-40 xl:w-40"
            style={{ clipPath: LOGO_OCTAGON_INNER }}
          >
            {/* Top Glowing Beam Accent */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent opacity-80" />

            <Image
              src="/final-logo.png"
              height={80}
              width={80}
              alt="Logo"
              draggable={false}
              className="h-full w-full select-none object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            />
          </div>
        </div>
      </div>

      {/* Arced Category Pills Orbiting Logo */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {categories.map((cat, idx) => {
          const angle = total > 1 ? -spread / 2 + idx * step : 0;
          const isActive = activeCategory === cat;

          // Mobile: arcs OVER the top of the logo. Desktop: arcs OUT to the right.
          const translate = isMobile
            ? `translate(0, -${pillRadius}px)`
            : `translate(${pillRadius}px, 0)`;

          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${angle}deg) ${translate}`,
              }}
              className="pointer-events-auto cursor-pointer focus:outline-none"
            >
              {/* Outer Dual-Layer Cyber Pill Outer Frame */}
              <div
                className={`p-[1.5px] transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow drop-shadow-[0_0_12px_rgba(243,202,32,0.6)] scale-105"
                    : "bg-gradient-to-r from-brand-golden-yellow/40 via-brand-orange/20 to-brand-golden-yellow/30 hover:bg-brand-golden-yellow hover:drop-shadow-[0_0_10px_rgba(243,202,32,0.35)] hover:scale-105"
                }`}
                style={{ clipPath: PILL_OUTER_CLIP }}
              >
                {/* Inner Pill Card Content */}
                <div
                  className={`px-3 py-1.5 font-brand-heading text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300 sm:px-3.5 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-2.5 sm:text-xs md:text-sm lg:text-base ${
                    isActive
                      ? "bg-brand-golden-yellow text-brand-navy"
                      : "bg-brand-navy/90 text-brand-white/80 backdrop-blur-md hover:text-brand-white"
                  }`}
                  style={{ clipPath: PILL_INNER_CLIP }}
                >
                  {cat}
                </div>
              </div>
            </button>
          );
        })}
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
    <div
     className="absolute inset-0 p-2 sm:p-0
      /* Mobile Placement: centered in the stage box */
      flex items-center justify-center
      /* Desktop Placement: revert to centered-with-offset, own bounding box */
      md:inset-auto md:items-center md:top-1/2 md:-translate-y-1/2 md:left-[40%] lg:left-[40%] xl:left-[40%] 2xl:left-[40%] 
      pointer-events-none"
    >
      <div className="w-full max-w-[92%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl flex justify-center max-h-full">
        <motion.div
          style={{
            rotate,
            scale,
            opacity,
            zIndex,
            pointerEvents,
            transformOrigin: "var(--wheel-pivot)",
          }}
          className="will-change-transform w-full max-h-full flex justify-center
            [--wheel-pivot:50%_750px] 
            sm:[--wheel-pivot:50%_850px] 
            md:[--wheel-pivot:clamp(-750px,-40vw,-400px)_50%]
            lg:[--wheel-pivot:clamp(-950px,-45vw,-550px)_50%]
            xl:[--wheel-pivot:clamp(-1150px,-50vw,-700px)_50%]"
        >
          <div className="group relative bg-brand-navy/95 backdrop-blur-md border border-brand-golden-yellow/30 hover:border-brand-golden-yellow transition-all duration-300 rounded-xl lg:rounded-2xl flex flex-col sm:flex-row shadow-2xl w-full overflow-hidden
            h-auto sm:h-[250px] md:h-[265px] lg:h-[280px] xl:h-[295px] 2xl:h-[310px]">
            
{/* MOBILE VIEW: Swipe Left Hint Animation (First two cards only) */}
{index < 2 && (
  <div className="sm:hidden absolute top-1/2 right-4 -translate-y-1/2 z-50 pointer-events-none flex items-center gap-1.5">
    
    {/* Swipe Left Text Message */}
    <motion.span
      animate={{
        x: [10, 10, -15, -15, 10],       // Moves left in tandem with the hand
        opacity: [0, 0.9, 0.9, 0, 0],     // Fades in and out with the gesture
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        repeatDelay: 0.6,
        times: [0, 0.2, 0.65, 0.85, 1],
        ease: "easeInOut",
      }}
      className="text-[11px] font-medium tracking-wide uppercase text-brand-golden-yellow/90 drop-shadow-[0_0_6px_rgba(255,215,0,0.3)] whitespace-nowrap select-none"
    >
      Swipe left
    </motion.span>

    {/* Hand & Ripple Container */}
    <div className="relative flex items-center justify-center">
      {/* Touch Point Ripple Effect */}
      <motion.div
        animate={{
          scale: [0.6, 1.5, 0.6],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          repeatDelay: 0.6,
          times: [0, 0.25, 0.5],
          ease: "easeOut",
        }}
        className="absolute right-0 w-8 h-8 rounded-full bg-brand-golden-yellow/20 border border-brand-golden-yellow/50"
      />

      {/* Hand Gesture Animation */}
      <motion.div
        animate={{
          x: [16, 16, -20, -20, 16],
          scale: [1, 0.85, 0.85, 1, 1],
          opacity: [0, 1, 1, 0, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          repeatDelay: 0.6,
          times: [0, 0.2, 0.65, 0.85, 1],
          ease: "easeInOut",
        }}
        className="relative text-brand-golden-yellow drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
      >
        <Hand className="w-6 h-6" />
      </motion.div>
    </div>

  </div>
)}

            {/* Subtle Glow Border */}
            <div className="absolute inset-0 border border-brand-golden-yellow/20 scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 rounded-xl lg:rounded-2xl" />

            {/* Card Media Section — fixed 42% width on desktop, expanded height on mobile so image fits */}
            <div className="relative w-full sm:w-[42%] shrink-0 grow-0 h-[195px] xs:h-[210px] sm:h-full border-b sm:border-b-0 sm:border-r border-brand-golden-yellow/30 overflow-hidden bg-black">
              <Image
                src={event.image}
                alt={event.title}
                fill
                draggable={false}
                priority={index < 4}
                sizes="(max-width: 640px) 100vw, 45vw"
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 select-none"
              />
            </div>

            {/* Card Details Section — fixed 58% width, content pinned top/bottom */}
            <div className="w-full sm:w-[58%] shrink-0 grow-0 p-3 sm:p-3 md:p-4
              flex flex-col justify-between
              bg-brand-navy relative z-20 overflow-hidden">

              {/* TOP: Event ID + Title + Badges */}
              <div className="flex flex-col gap-1 sm:gap-1.5 overflow-hidden">

                {/* Title row with ID pinned top-right */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 overflow-hidden">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 ${event.colorCls.bg}`} />
                    <h3 className="font-brand-competition text-[11px] sm:text-sm md:text-base lg:text-lg font-bold text-brand-white tracking-wide leading-tight line-clamp-2 overflow-hidden">
                      {event.title}
                    </h3>
                  </div>
                  <span className={`font-brand-heading font-bold text-[11px] sm:text-sm md:text-base lg:text-lg shrink-0 ${event.colorCls.text}`}>
                    #{event.id}
                  </span>
                </div>

                {/* Category badge */}
                <div className="flex flex-wrap items-center gap-1">
                  <span className={`font-brand-heading font-bold text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest px-1.5 py-0.5 border ${event.colorCls.border} ${event.colorCls.text} bg-transparent whitespace-nowrap`}>
                    {event.category}
                  </span>
                </div>

                {/* Description teaser */}
                <p className="hidden sm:block font-brand-body text-[10px] md:text-[11px] lg:text-xs text-brand-white/70 leading-snug line-clamp-2 md:line-clamp-3">
                  Initiate protocol {event.id}. Prepare your systems for the {event.title} challenge within BitBuzz and prove your mastery.
                </p>
              </div>

              {/* BOTTOM: View Details button — always pinned to bottom via mt-auto */}
              <Link
                href={`/event/${event.slug}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                className={`relative z-30 mt-auto block text-center w-full py-1.5 sm:py-2 md:py-2.5
                  border ${event.colorCls.border} ${event.colorCls.text}
                  font-brand-heading text-[9px] sm:text-[10px] md:text-xs lg:text-sm
                  font-bold tracking-wider uppercase whitespace-nowrap
                  ${event.colorCls.hoverBg} hover:text-brand-navy
                  transition-colors rounded-sm cursor-pointer`}
              >
                [ View Details ]
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}