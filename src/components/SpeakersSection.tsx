"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// ==========================================
// 1. Reusable Styled Components
// ==========================================

const CentralLogo = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => (
    <div className="relative group">
      {/* Ambient Glow behind central node */}
      <div className="absolute -inset-2 rounded-full bg-neon-green/20 blur-xl transition-all duration-500 group-hover:bg-neon-green/30" />
      <div
        ref={ref}
        className={cn(
          "relative z-20 size-24 md:size-28 rounded-full border-2 border-neon-green bg-charcoal flex items-center justify-center shadow-[0_0_30px_rgba(124,255,79,0.4)] transition-transform duration-300 hover:scale-105",
          className
        )}
      >
        <span className="text-neon-green font-heading text-5xl md:text-6xl font-extrabold select-none">
          B
        </span>
      </div>
    </div>
  )
);
CentralLogo.displayName = "CentralLogo";

const HubBadge = forwardRef<
  HTMLDivElement,
  { title: string; className?: string }
>(({ title, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 w-full px-4 py-3 rounded-xl bg-charcoal/90 border border-neon-green/60 text-neon-green font-mono font-bold text-xs uppercase tracking-widest text-center shadow-[0_0_15px_rgba(124,255,79,0.15)] backdrop-blur-md transition-all duration-300 hover:border-neon-green hover:shadow-[0_0_20px_rgba(124,255,79,0.3)]",
      className
    )}
  >
    {title}
  </div>
));
HubBadge.displayName = "HubBadge";

const MemberCard = forwardRef<
  HTMLDivElement,
  { name: string; role: string; className?: string }
>(({ name, role, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 w-full flex flex-col items-center justify-center p-4 rounded-xl border border-emerald/30 bg-stone/80 backdrop-blur-md shadow-md transition-all duration-300 hover:border-neon-green hover:bg-stone/95 hover:shadow-[0_0_15px_rgba(124,255,79,0.25)] hover:-translate-y-0.5",
      className
    )}
  >
    <div className="w-12 h-12 md:w-14 md:h-14 mb-2.5 rounded-full border border-emerald/50 bg-charcoal flex items-center justify-center shadow-inner">
      <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center text-emerald font-mono text-xs font-bold">
        {name.charAt(0)}
      </div>
    </div>
    <h3 className="text-xs font-bold text-white uppercase tracking-wider text-center">
      {name}
    </h3>
    <p className="text-emerald/70 text-[10px] font-mono text-center mt-1">
      {role}
    </p>
  </div>
));
MemberCard.displayName = "MemberCard";

// ==========================================
// 2. Main Network Section
// ==========================================

export default function SpeakersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Central Source Node
  const logoRef = useRef<HTMLDivElement>(null);

  // Category Hub Refs
  const facultyHubRef = useRef<HTMLDivElement>(null);
  const inchargeHubRef = useRef<HTMLDivElement>(null);
  const designHubRef = useRef<HTMLDivElement>(null);
  const coordHubRef = useRef<HTMLDivElement>(null);

  // Member Refs
  const fac1Ref = useRef<HTMLDivElement>(null);
  const fac2Ref = useRef<HTMLDivElement>(null);

  const studentInchargeRef = useRef<HTMLDivElement>(null);
  const teacherCoordRef = useRef<HTMLDivElement>(null);

  const design1Ref = useRef<HTMLDivElement>(null);
  const design2Ref = useRef<HTMLDivElement>(null);
  const design3Ref = useRef<HTMLDivElement>(null);
  const design4Ref = useRef<HTMLDivElement>(null);
  const design5Ref = useRef<HTMLDivElement>(null);

  const studentCoord1Ref = useRef<HTMLDivElement>(null);
  const studentCoord2Ref = useRef<HTMLDivElement>(null);

  // All targets receiving simultaneous outward beams from the logo
  const allTargets = [
    facultyHubRef,
    inchargeHubRef,
    designHubRef,
    coordHubRef,
    fac1Ref,
    fac2Ref,
    studentInchargeRef,
    teacherCoordRef,
    design1Ref,
    design2Ref,
    design3Ref,
    design4Ref,
    design5Ref,
    studentCoord1Ref,
    studentCoord2Ref,
  ];

  return (
    <section
      id="team"
      className="relative w-full bg-charcoal py-16 md:py-24 px-4 sm:px-6 lg:px-12 border-t border-stone/50 overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
      </div>

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto relative z-10 flex flex-col items-center"
      >
        {/* TOP LEVEL: CENTRAL LOGO SOURCE */}
        <div className="mb-16 md:mb-20">
          <CentralLogo ref={logoRef} />
        </div>

        {/* RESPONSIVE COLUMNS (1 col Mobile, 2 col Tablet, 4 col Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 w-full items-start">
          
          {/* Column 1: Faculty */}
          <div className="flex flex-col items-center gap-4 w-full">
            <HubBadge ref={facultyHubRef} title="FACULTY COORDINATORS" />
            <div className="flex flex-col gap-3.5 w-full">
              <MemberCard ref={fac1Ref} name="Mr. Anil Kumar K." role="Asst. Professor" />
              <MemberCard ref={fac2Ref} name="Ms. Neertha P." role="Asst. Professor" />
            </div>
          </div>

          {/* Column 2: Incharge & Leads */}
          <div className="flex flex-col items-center gap-4 w-full">
            <HubBadge ref={inchargeHubRef} title="STUDENT INCHARGE" />
            <div className="flex flex-col gap-3.5 w-full">
              <MemberCard ref={studentInchargeRef} name="Student Lead" role="Incharge" />
              <MemberCard ref={teacherCoordRef} name="Teacher Lead" role="Coordinator" />
            </div>
          </div>

          {/* Column 3: Designing Team */}
          <div className="flex flex-col items-center gap-4 w-full">
            <HubBadge ref={designHubRef} title="DESIGNING TEAM" />
            <div className="flex flex-col gap-3.5 w-full">
              <MemberCard ref={design1Ref} name="Rafia" role="Brochure Designer" />
              <MemberCard ref={design2Ref} name="Tanuuh" role="Brochure Designer" />
              <MemberCard ref={design3Ref} name="Sumit" role="Logo & Brochure" />
              <MemberCard ref={design4Ref} name="Meghnath" role="Website Designer" />
              <MemberCard ref={design5Ref} name="Suraj" role="Website Designer" />
            </div>
          </div>

          {/* Column 4: Student Coordinators */}
          <div className="flex flex-col items-center gap-4 w-full">
            <HubBadge ref={coordHubRef} title="STUDENT COORDINATORS" />
            <div className="flex flex-col gap-3.5 w-full">
              <MemberCard ref={studentCoord1Ref} name="Coordinator 1" role="Student Lead" />
              <MemberCard ref={studentCoord2Ref} name="Coordinator 2" role="Student Lead" />
            </div>
          </div>

        </div>

        {/* =========================================================
            SIMULTANEOUS OUTWARD BEAMS FROM CENTRAL LOGO
           ========================================================= */}
        {allTargets.map((targetRef, index) => (
          <AnimatedBeam
            key={index}
            containerRef={containerRef}
            fromRef={logoRef}
            toRef={targetRef}
            pathType="orthogonal"
            borderRadius={20}
            duration={3}
            delay={0}
            reverse={false}
            pathOpacity={0.25}
            gradientStartColor="#7cff4f"
            gradientStopColor="#00f2fe"
          />
        ))}

      </div>
    </section>
  );
}