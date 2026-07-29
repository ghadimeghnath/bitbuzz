"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// ==========================================
// 1. Reusable Styled Components
// ==========================================

const MainHeaderBox = forwardRef<HTMLDivElement, { title: string; className?: string }>(
  ({ title, className }, ref) => (
    <div className="relative group">
      <div className="absolute -inset-2 rounded-xl bg-brand-golden-yellow/20 blur-xl transition-all duration-500 group-hover:bg-brand-golden-yellow/30" />
      <div
        ref={ref}
        className={cn(
          "relative z-20 px-6 py-3 md:px-8 md:py-4 rounded-xl border-2 border-brand-golden-yellow bg-brand-navy flex items-center justify-center shadow-brand-yellow transition-transform duration-300 hover:scale-105",
          className
        )}
      >
        <span className="text-brand-golden-yellow font-brand-heading text-xl md:text-3xl font-extrabold tracking-wider select-none">
          {title}
        </span>
      </div>
    </div>
  )
);
MainHeaderBox.displayName = "MainHeaderBox";

const HubBadge = forwardRef<HTMLDivElement, { title: string; className?: string }>(
  ({ title, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-10 px-6 py-2.5 md:px-8 md:py-3 rounded-xl bg-brand-navy/90 border border-brand-golden-yellow/60 text-brand-golden-yellow font-brand-heading font-bold text-xs md:text-base uppercase tracking-widest text-center shadow-brand-soft backdrop-blur-md transition-all duration-300 hover:border-brand-golden-yellow hover:shadow-brand-yellow",
        className
      )}
    >
      {title}
    </div>
  )
);
HubBadge.displayName = "HubBadge";

const MemberCard = forwardRef<HTMLDivElement, { name: string; role?: string; className?: string }>(
  ({ name, role, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative z-10 w-full flex flex-col items-center justify-center p-3 md:p-4 rounded-xl border border-brand-golden-yellow/30 bg-brand-navy/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-brand-golden-yellow hover:bg-brand-navy/95 hover:shadow-brand-soft hover:-translate-y-0.5",
        className
      )}
    >
      <div className="w-10 h-10 md:w-14 md:h-14 mb-2 rounded-full border border-brand-golden-yellow/50 bg-brand-navy flex items-center justify-center shadow-inner">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-golden-yellow/20 flex items-center justify-center text-brand-golden-yellow font-brand-heading text-xs font-bold">
          {name.charAt(0)}
        </div>
      </div>
      <h3 className="text-xs md:text-sm font-bold font-brand-small text-brand-white uppercase tracking-wider text-center">
        {name}
      </h3>
      {role && (
        <p className="text-brand-golden-yellow/70 text-[10px] md:text-xs font-brand-small text-center mt-0.5">
          {role}
        </p>
      )}
    </div>
  )
);
MemberCard.displayName = "MemberCard";

// ==========================================
// 2. Main Network Section
// ==========================================

export default function SpeakersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Level 1: Root Node
  const topLogoRef = useRef<HTMLDivElement>(null);

  // Level 2: Core Team
  const coreHubRef = useRef<HTMLDivElement>(null);
  const amoghRef = useRef<HTMLDivElement>(null);
  const simranRef = useRef<HTMLDivElement>(null);
  const saniyaRef = useRef<HTMLDivElement>(null);
  const samuelRef = useRef<HTMLDivElement>(null);

  // Level 3: Designing Team
  const designHubRef = useRef<HTMLDivElement>(null);
  const sumitRef = useRef<HTMLDivElement>(null);
  const rafiaRef = useRef<HTMLDivElement>(null);
  const thanushRef = useRef<HTMLDivElement>(null);
  const rehaanRef = useRef<HTMLDivElement>(null);
  const meghnathRef = useRef<HTMLDivElement>(null);
  const surajRef = useRef<HTMLDivElement>(null);

  const connections = [
    // Top -> Core Hub
    { from: topLogoRef, to: coreHubRef },

    // Core Hub -> Core Members
    { from: coreHubRef, to: amoghRef },
    { from: coreHubRef, to: simranRef },
    { from: coreHubRef, to: saniyaRef },
    { from: coreHubRef, to: samuelRef },

    // Core Hub -> Designing Hub
    { from: coreHubRef, to: designHubRef },

    // Designing Hub -> Design Members
    { from: designHubRef, to: sumitRef },
    { from: designHubRef, to: rafiaRef },
    { from: designHubRef, to: thanushRef },
    { from: designHubRef, to: rehaanRef },
    { from: designHubRef, to: meghnathRef },
    { from: designHubRef, to: surajRef },
  ];

  return (
    <section
      id="team"
      className="relative w-full py-12 md:py-24 px-3 sm:px-6 lg:px-12 border-t border-brand-golden-yellow/20 bg-brand-navy overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/speaker_bg.png" 
          alt="Speakers Background" 
          fill
          className="object-cover opacity-20 mix-blend-screen grayscale"
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-golden-yellow/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/50 to-brand-navy" />
      </div>

      <div
        ref={containerRef}
        className="max-w-6xl mx-auto relative z-10 flex flex-col items-center gap-12 md:gap-20"
      >
        {/* LEVEL 1: BITBUZZ 8.0 */}
        <div className="flex justify-center w-full">
          <MainHeaderBox ref={topLogoRef} title="BITBUZZ 8.0" />
        </div>

        {/* LEVEL 2: CORE TEAM */}
        <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
          <HubBadge ref={coreHubRef} title="CORE TEAM" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 md:gap-6 w-full max-w-4xl px-2">
            <MemberCard ref={amoghRef} name="Amogh Sir" role="Faculty Lead" />
            <MemberCard ref={samuelRef} name="Samuel Sir" role="Faculty Lead" />
            <MemberCard ref={simranRef} name="Simran" role="Student Co-Incharge" />
            <MemberCard ref={saniyaRef} name="Saniya" role="Student Incharge" />
          </div>
        </div>

        {/* LEVEL 3: DESIGNING TEAM */}
        <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
          <HubBadge ref={designHubRef} title="DESIGNING TEAM" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-6 md:gap-6 w-full px-2">
            <MemberCard ref={sumitRef} name="Sumit" role="Designer" />
            <MemberCard ref={rafiaRef} name="Rafia" role="Designer" />
            <MemberCard ref={thanushRef} name="Thanush" role="Designer" />
            <MemberCard ref={rehaanRef} name="Rehaan" role="Designer" />
            <MemberCard ref={surajRef} name="Suraj" role="Web Developer" />
            <MemberCard ref={meghnathRef} name="Meghnath Don" role="Web Developer" />
          </div>
        </div>

        {/* SHARP 90-DEGREE ANGLED BEAMS */}
        {connections.map((conn, index) => (
          <AnimatedBeam
            key={index}
            containerRef={containerRef}
            fromRef={conn.from}
            toRef={conn.to}
            duration={7}
            delay={0}
            repeatDelay={0}
            pathOpacity={0.25}
            gradientStartColor="#F3CA20"
            gradientStopColor="#EF9D10"
          />
        ))}
      </div>
    </section>
  );
}