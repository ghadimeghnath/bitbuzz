"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// ==========================================
// 1. Reusable Styled Components
// ==========================================

const LOGO_OCTAGON_OUTER = `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`;
const LOGO_OCTAGON_INNER = `polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)`;

const MainHeaderBox = forwardRef<
  HTMLDivElement,
  { src: string; alt?: string; className?: string; imageClassName?: string }
>(({ src, alt = "Logo", className, imageClassName }, ref) => (
  <div className="relative group">
    <div className="absolute -inset-2 rounded-xl bg-brand-golden-yellow/20 blur-xl transition-all duration-500 group-hover:bg-brand-golden-yellow/30" />
    <div
      ref={ref}
      className={cn(
        "relative z-20 px-6 py-3 md:px-8 md:py-4 rounded-xl border-2 border-brand-golden-yellow bg-brand-navy flex items-center justify-center shadow-brand-yellow transition-transform duration-300 hover:scale-105",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={200}
        height={60}
        className={cn("h-8 md:h-12 w-auto object-contain select-none pointer-events-none", imageClassName)}
      />
    </div>
  </div>
));
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

const MemberCard = forwardRef<HTMLDivElement, { name: string; role?: string; email?: string; phone?: string; image?: string; className?: string }>(
  ({ name, role, email, phone, image, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative z-10 w-full aspect-[3/4] max-w-[240px] mx-auto px-4 pb-4 group transition-transform duration-300 hover:-translate-y-2",
        className
      )}
    >
      {/* Outer Glow / Frame */}
      <div
        className="w-full h-full bg-gradient-to-br from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1px] transition-all duration-300 drop-shadow-[0_0_10px_rgba(243,202,32,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(243,202,32,0.8)]"
        style={{ clipPath: CARD_OUTER_CLIP }}
      >
        {/* Inner Card */}
        <div
          className="relative w-full h-full bg-brand-navy overflow-hidden flex flex-col justify-end"
          style={{ clipPath: CARD_INNER_CLIP }}
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 w-full h-full bg-brand-navy flex items-center justify-center">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="text-brand-golden-yellow/10 font-brand-heading text-6xl md:text-8xl font-bold select-none">
                {name.charAt(0)}
              </div>
            )}
          </div>

          {/* Details Container with gradient fade */}
          <div className="absolute bottom-0 left-0 w-full h-[60%] p-2 sm:p-3 bg-gradient-to-t from-brand-navy/90 via-brand-navy to-transparent flex flex-col items-center justify-end z-10 transition-all duration-300 group-hover:h-[65%]">
            <h3 className="w-full text-[9px] sm:text-xs md:text-sm font-bold font-brand-heading text-brand-white uppercase tracking-wide text-center drop-shadow-md line-clamp-2 leading-tight">
              {name}
            </h3>
            {role && (
              <p className="w-full text-brand-golden-yellow text-[9px] sm:text-[10px] md:text-[11px] font-brand-small text-center mt-0.5 drop-shadow-md leading-tight">
                {role}
              </p>
            )}
            {email && (
              <p className="w-full text-brand-white/90 text-[8px] sm:text-[9px] md:text-[10px] font-brand-small text-center mt-0.5 break-all drop-shadow-md leading-tight">
                {email}
              </p>
            )}
            {phone && (
              <p className="w-full text-brand-white/90 text-[8px] sm:text-[9px] md:text-[10px] font-brand-small text-center mt-0.5 drop-shadow-md leading-tight">
                {phone}
              </p>
            )}
          </div>
        </div>
      </div>
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
        {/* LEVEL 1: BITBUZZ 8.0 IMAGE */}
        <div className="flex justify-center w-full">
          {/* Central Cyber Octagon HUD Logo Hub */}
          <div ref={topLogoRef} className="relative z-20 flex items-center justify-center">
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
        </div>

        {/* LEVEL 2: CORE TEAM */}
        <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
          <HubBadge ref={coreHubRef} title="CORE TEAM" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8 md:gap-6 w-full max-w-4xl px-2">
            <MemberCard ref={amoghRef} name="Amogh Pai Raiturkar" role="Convenor, Assistant Professor" image="/amogh.jpeg" email="amogh.pairaiturkar@vvm.edu.in" phone="+91 9765856958" />
            <MemberCard ref={samuelRef} name="Samuel Godinho" role="Co-Convenor, Assistant Professor" image="/samuel.jpeg" email="samuel.godinho@vvm.edu.in" phone="+91 8975868065" />
            <MemberCard ref={simranRef} name="Simran Ghadi" role="Student Incharge" email="2411020.simran.sdcce@vvm.edu.in" phone="+91 9270193714" image="/simran-1.png" />
            <MemberCard ref={saniyaRef} name="Saniya Idrisi" role="Student Co-Incharge" email="2508061.saniya.sdcce@vvm.edu.in" phone="+91 9634443009" image="/saniya-1.png" />
          </div>
        </div>

        {/* LEVEL 3: DESIGNING TEAM */}
        <div className="flex flex-col items-center gap-6 md:gap-8 w-full">
          <HubBadge ref={designHubRef} title="DESIGNING TEAM" />

          <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 md:gap-6 w-full px-2">
            <MemberCard ref={rafiaRef} name="Rafia Hinikeri" role="Graphic Designer" email="2411016.rafia.sdcce@vvm.edu.in" phone="+91 7249007174" image="/rafia-1.png" />
            <MemberCard ref={sumitRef} name="Sumit Sawant" role="Graphic Designer" email="2411021.sumit.sdcce@vvm.edu.in" phone="+91 9359391148" image="/Sumit.png" />
            <MemberCard ref={meghnathRef} name="Meghnath Ghadi" email="2411011.meghnath.sdcce@vvm.edu.in" phone="+91 7507519540" role="Web Developer" image="/meghnath-1.png" />
            <MemberCard ref={surajRef} name="Suraj Maurya" role="Web Developer" email="2411022.suraj.sdcce@vvm.edu.in" phone="+91 9309288086" image="/suraj-1.png" />

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