"use client";

import * as React from "react";
import {
  Users,
  Ban,
  Building2,
  UserRound,
  CalendarDays,
  Mail,
  Headphones,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared building blocks                                            */
/* ------------------------------------------------------------------ */

/** Small decorative circuit-board dots + traces used in the header
 *  corners and around the footer tagline. Purely ornamental, colored
 *  via `currentColor` so it inherits the wrapping element's text color. */
function CircuitDots({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.7">
        <path d="M4 8 H36 V26" />
        <path d="M60 4 V22 H90" />
        <path d="M96 30 H130 V10" />
        <path d="M10 50 H30" />
        <path d="M150 8 V30 H180 V50" />
        <path d="M170 60 H200" />
        <path d="M40 70 V96 H70" />
        <path d="M100 90 H140" />
      </g>
      <g fill="currentColor">
        <circle cx="4" cy="8" r="2.5" />
        <circle cx="36" cy="26" r="2.5" />
        <circle cx="60" cy="4" r="2.5" />
        <circle cx="90" cy="22" r="2.5" />
        <circle cx="130" cy="10" r="2.5" />
        <circle cx="10" cy="50" r="2.5" />
        <circle cx="30" cy="50" r="2.5" />
        <circle cx="150" cy="8" r="2.5" />
        <circle cx="180" cy="50" r="2.5" />
        <circle cx="200" cy="60" r="2.5" />
        <circle cx="40" cy="70" r="2.5" />
        <circle cx="70" cy="96" r="2.5" />
        <circle cx="140" cy="90" r="2.5" />
      </g>
    </svg>
  );
}

/** Four small bright "HUD" corner brackets that sit on top of a dimmer
 *  chamfered border — this is the accent detail visible around the
 *  "RULES & REGULATIONS" / "GENERAL RULES" title chip in the reference
 *  flyer, distinct from the box's own border. */
function CornerMarks({
  colorClass = "border-circuit-cyan",
  size = 12,
}: {
  colorClass?: string;
  size?: number;
}) {
  const base = `absolute ${colorClass}`;
  const s = `${size}px`;
  return (
    <>
      <span
        className={`${base} left-0 top-0 border-l-2 border-t-2`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} right-0 top-0 border-r-2 border-t-2`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} left-0 bottom-0 border-l-2 border-b-2`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} right-0 bottom-0 border-r-2 border-b-2`}
        style={{ width: s, height: s }}
      />
    </>
  );
}

/** Outer page shell: black background + faint cyan grid, shared by both posters. */
function PosterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-cyber-grid relative mx-auto w-full max-w-4xl overflow-hidden bg-circuit-bg px-4 py-8 font-sans text-circuit-slate sm:px-10 sm:py-10">
      {children}
    </div>
  );
}

function FestTagline() {
  return (
    <div className="flex items-center justify-center gap-3 text-circuit-cyan/60">
      <span className="h-px w-8 bg-current sm:w-16" />
      <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-circuit-slate sm:text-sm">
        State Level IT Fest for{" "}
        <span className="text-circuit-yellow">Higher Secondary Students</span>
      </p>
      <span className="h-px w-8 bg-current sm:w-16" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Poster 2 — General Rules                                          */
/* ------------------------------------------------------------------ */

function RuleItem({
  icon: Icon,
  iconColorClass,
  children,
}: {
  icon: React.ElementType;
  iconColorClass: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4 py-4 sm:gap-5 sm:py-5">
      <Icon
        className={`mt-0.5 h-7 w-7 shrink-0 sm:h-8 sm:w-8 ${iconColorClass}`}
        strokeWidth={1.5}
      />
      <p className="text-xs leading-relaxed sm:text-sm">{children}</p>
    </li>
  );
}

export function GeneralRulesPoster() {
  return (
    <PosterShell>
      {/* Title chip — full chamfered border + bright corner-bracket accents */}
      <div className="relative mt-8 sm:mt-10">
        <CircuitDots className="pointer-events-none absolute -right-4 -top-10 hidden h-24 w-40 text-circuit-cyan/25 sm:block" />
        <div className="clip-chamfer-lg box-glow-circuit-cyan relative border border-circuit-cyan/40 bg-circuit-panel px-5 py-5 sm:py-6">
          <CornerMarks />
          <h2 className="text-center font-pixel-title text-xl italic font-black uppercase text-white sm:text-4xl">
            General Rules
          </h2>
        </div>
      </div>

      {/* Rule list — partial "circuit trace" frame: bright chamfered line
          across the top + thin line down the right edge only, matching
          the reference (no left/bottom border, faint row dividers). */}
      <div className="frame-trace-cyan mt-8 bg-circuit-panel-light/30 px-5 sm:mt-10 sm:px-8">
        <ul className="divide-y divide-white/[0.06]">
          <RuleItem icon={Users} iconColorClass="text-circuit-orange">
            This competition is exclusively open to{" "}
            <span className="font-bold text-circuit-yellow">
              Higher Secondary School (HSS)
            </span>{" "}
            students.
          </RuleItem>
          <RuleItem icon={Users} iconColorClass="text-circuit-emerald">
            Each team can consist of a maximum of{" "}
            <span className="font-bold text-circuit-yellow">
              30 participants
            </span>
            .
          </RuleItem>
          <RuleItem icon={Ban} iconColorClass="text-circuit-orange">
            There are{" "}
            <span className="font-bold text-circuit-yellow">
              NO registration charges
            </span>{" "}
            for participation.
          </RuleItem>
          <RuleItem icon={Building2} iconColorClass="text-circuit-cyan">
            The event will be conducted on{" "}
            <span className="font-bold text-circuit-yellow">
              the college campus
            </span>
            .
          </RuleItem>
          <RuleItem icon={UserRound} iconColorClass="text-circuit-orange">
            Each Higher Secondary School is allowed to send{" "}
            <span className="font-bold text-circuit-yellow">
              only one team
            </span>{" "}
            per competition.
          </RuleItem>
          <RuleItem icon={CalendarDays} iconColorClass="text-circuit-emerald">
            To avoid scheduling conflicts, we recommend having{" "}
            <span className="font-bold text-circuit-yellow">
              different participants
            </span>{" "}
            for each event so that they do not overlap in case the events
            are scheduled simultaneously.
          </RuleItem>
          <RuleItem icon={Mail} iconColorClass="text-circuit-cyan">
            Important information related to individual competitions will
            be{" "}
            <span className="font-bold text-circuit-yellow">
              communicated via email
            </span>{" "}
            to both the registered teacher and the participants.
          </RuleItem>
          <RuleItem icon={CalendarDays} iconColorClass="text-circuit-orange">
            Please confirm your participation latest by{" "}
            <span className="font-bold text-circuit-yellow">
              6th September 2025
            </span>
            .
          </RuleItem>
          <RuleItem icon={Headphones} iconColorClass="text-circuit-emerald">
            For specific details about each event, please get in touch
            with the{" "}
            <span className="font-bold text-circuit-yellow">
              Student Coordinator
            </span>{" "}
            of the respective event mentioned in the brochure below.
          </RuleItem>
        </ul>
      </div>

      <div className="mt-8 sm:mt-10">
        <FestTagline />
      </div>
    </PosterShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Default export — quick preview                                    */
/* ------------------------------------------------------------------ */

export default function BitBuzzPosters() {
  return (
    <div className="flex flex-col gap-10 bg-circuit-bg py-10">
      <GeneralRulesPoster />
    </div>
  );
}