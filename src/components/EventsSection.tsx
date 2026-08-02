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

// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH: gap between the CAROUSEL WHEEL STAGE and the
// LOGO & CATEGORY ARC HUB. Adjust these px values per breakpoint and every
// layout that reads from them (the flex gap AND the mobile stage-height
// calculation) stays in sync automatically.
// ---------------------------------------------------------------------------
const STAGE_HUB_GAP = {
  mobile: 150, // < 640px, flex-col layout (stage stacked above hub)
  tablet: 20, // >= 640px (sm) and < 768px (md), still flex-col
  desktop: 0, // >= 768px (md+), hub is absolutely positioned so this is inert
} as const;

export default function EventsSection() {
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
      <div
        ref={stickyRef}
        style={{
          // Expose STAGE_HUB_GAP as CSS vars so the same responsive Tailwind
          // gap classes below can reference them at every breakpoint.
          ["--stage-hub-gap-mobile" as any]: `${STAGE_HUB_GAP.mobile}px`,
          ["--stage-hub-gap-tablet" as any]: `${STAGE_HUB_GAP.tablet}px`,
          ["--stage-hub-gap-desktop" as any]: `${STAGE_HUB_GAP.desktop}px`,
        }}
        className="sticky top-0 h-dvh w-full overflow-hidden flex flex-col md:flex-row items-center justify-between p-2 sm:p-4 md:p-8 lg:p-12
          gap-[var(--stage-hub-gap-mobile)] sm:gap-[var(--stage-hub-gap-tablet)] md:gap-[var(--stage-hub-gap-desktop)]"
      >

        {/* Title chip */}
              <div className="relative mt-8 sm:mt-10">
                <div className="rounded shadow-brand-yellow relative border border-brand-golden-yellow/40 bg-brand-navy/90 px-5 py-5 sm:py-6">
                  <CornerMarks />
                  <h2 className="text-center font-brand-heading text-xl italic font-black uppercase text-brand-white sm:text-4xl">
                   Events & Rules 
                  </h2>
                </div>
              </div>
        {/* CAROUSEL WHEEL STAGE */}
        <motion.div
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          style={{
            // Inline (not just a Tailwind class) so the browser is guaranteed to hand
            // horizontal touch gestures to Framer Motion's pan recognizer instead of
            // treating them as an ambiguous native scroll/gesture.
            touchAction: "pan-y",
            ...(isMobile ? { height: stageHeight ?? undefined } : {}),
          }}
          className="relative w-full md:h-full flex items-center justify-center z-20"
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
          className="relative md:absolute z-30 shrink-0
            md:top-1/2 md:left-6 lg:left-12 xl:left-16 2xl:left-20 md:-translate-y-1/2"
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
interface LogoCategoryHubProps {
  categories: string[];
  activeCategory?: string;
  onSelectCategory: (category: string) => void;
  isMobile: boolean;
}

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
  minAngularGapDeg: 58,
  baselinePillCount: 4,
  radiusGrowthPerExtraPill: 14, // px
  bufferMobile: 42, // px clearance beyond logo radius, mobile (vertical arc)
  bufferDesktop: 96, // px clearance beyond logo radius, desktop (horizontal arc)
  maxRadiusRatioMobile: 0.42, // cap: fraction of viewport height
  maxRadiusRatioDesktop: 0.28, // cap: fraction of viewport width
} as const;

function LogoCategoryHub({ categories, activeCategory, onSelectCategory, isMobile }: LogoCategoryHubProps) {
  const total = categories.length;

  // Fixed angular gap between pills → total spread grows with category count
  // instead of pills being squeezed together (mirrors justify-content: space-between).
  const spread = total > 1 ? PILL_ARC.minAngularGapDeg * (total - 1) : 0;
  const step = total > 1 ? PILL_ARC.minAngularGapDeg : 0;

  // Pill orbit radius is derived from the ACTUAL logo size at the current breakpoint, not
  // guessed vw units — this guarantees pills always clear the logo, at every screen size.
  const [pillRadius, setPillRadius] = useState(110);

  useEffect(() => {
    const recalc = () => {
      const diameter = getLogoDiameter(window.innerWidth);
      const logoR = diameter / 2;
      const buffer = window.innerWidth < 768 ? PILL_ARC.bufferMobile : PILL_ARC.bufferDesktop;

      // Grow the radius as extra categories widen the arc, so pills spread
      // outward rather than crowding closer to the logo/stage.
      const extraPills = Math.max(0, total - PILL_ARC.baselinePillCount);
      const grownRadius = logoR + buffer + extraPills * PILL_ARC.radiusGrowthPerExtraPill;

      // Hard cap so the arc can never physically reach into the wheel stage,
      // however many categories exist.
      const maxRadius =
        window.innerWidth < 768
          ? window.innerHeight * PILL_ARC.maxRadiusRatioMobile
          : window.innerWidth * PILL_ARC.maxRadiusRatioDesktop;

      setPillRadius(Math.min(grownRadius, maxRadius));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [total]);

  return (
    <div className="relative flex items-center justify-between">

      {/* Central Circular Logo */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-brand-navy border-2 border-brand-golden-yellow/70 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.25)] z-20 transition-all">
        <Image
          src={'/final-logo.png'}
          height={80}
          width={80}
          alt="Logo"
          draggable={false}
          className="select-none"
        />
      </div>

      {/* Arced Category Pills Orbiting Logo — plain inline-style transforms, no Tailwind arbitrary-value chains */}
      <div className="absolute inset-0 pointer-events-none z-30">
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
                // rotate() first tilts the pill to follow the arc (fan-of-cards look),
                // then translate() pushes it outward along that rotated axis.
                transform: `translate(-50%, -50%) rotate(${angle}deg) ${translate}`,
              }}
              className={`pointer-events-auto px-2 py-3 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 backdrop-blur-md border font-brand-heading text-[7px] sm:text-[9px] md:text-xs lg:text-sm font-bold tracking-widest uppercase rounded-full shadow-md transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-brand-golden-yellow text-brand-navy border-brand-golden-yellow shadow-[0_0_12px_rgba(234,179,8,0.5)] scale-105"
                  : "bg-brand-navy/90 text-brand-white/80 border-brand-golden-yellow/40 hover:border-brand-golden-yellow hover:text-brand-white hover:scale-105"
              }`}
            >
              {cat}
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
    <div className="absolute inset-0
      /* Mobile Placement: flush against the bottom of the stage box, right above the hub */
      flex items-end justify-center
      /* Desktop Placement: revert to centered-with-offset, own bounding box */
      md:inset-auto md:items-center md:top-1/2 md:-translate-y-1/2 md:left-[40%] lg:left-[40%] xl:left-[40%] 2xl:left-[40%] 
      pointer-events-none"
    >
      <div className="w-full max-w-[92%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl flex justify-center">
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

            {/* Card Media Section — taller on mobile to fill the card height */}
            <div className="relative w-full sm:w-2/5 lg:w-[42%] h-40 sm:h-auto min-h-[160px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[280px] border-b sm:border-b-0 sm:border-r border-brand-golden-yellow/30 overflow-hidden bg-black shrink-0">
              <Image
                src={event.image}
                alt={event.title}
                fill
                draggable={false}
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 42vw"
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 select-none"
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
    </div>
  );
}