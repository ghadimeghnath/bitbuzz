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

/** Small decorative dots + traces used in the header
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
 *  chamfered border */
function CornerMarks({
  colorClass = "border-brand-golden-yellow",
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
        className={`${base} left-0 top-0 border-l-2 border-t-2 rounded-tl`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} right-0 top-0 border-r-2 border-t-2 rounded-tr`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} left-0 bottom-0 border-l-2 border-b-2 rounded-bl`}
        style={{ width: s, height: s }}
      />
      <span
        className={`${base} right-0 bottom-0 border-r-2 border-b-2 rounded-br`}
        style={{ width: s, height: s }}
      />
    </>
  );
}

/** Outer page shell shared by both posters. */
function PosterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand-grid relative mx-auto w-full max-w-4xl overflow-hidden bg-brand-navy px-4 py-8 font-brand-body text-brand-white sm:px-10 sm:py-10">
      {children}
    </div>
  );
}

function FestTagline() {
  return (
    <div className="flex items-center justify-center gap-3 text-brand-golden-yellow/60">
      <span className="h-px w-8 bg-current sm:w-16" />
      <p className="text-center font-brand-heading text-[10px] font-bold uppercase tracking-widest text-brand-white sm:text-sm">
        State Level IT Fest for{" "}
        <span className="text-brand-golden-yellow">Higher Secondary Students</span>
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
      <p className="text-xs leading-relaxed sm:text-sm font-brand-body text-brand-white/90">{children}</p>
    </li>
  );
}

export function GeneralRulesPoster() {
  return (
    <PosterShell>
      {/* Title chip */}
      <div className="relative mt-8 sm:mt-10">
        <CircuitDots className="pointer-events-none absolute -right-4 -top-10 hidden h-24 w-40 text-brand-golden-yellow/25 sm:block" />
        <div className="rounded shadow-brand-yellow relative border border-brand-golden-yellow/40 bg-brand-navy/90 px-5 py-5 sm:py-6">
          <CornerMarks />
          <h2 className="text-center font-brand-heading text-xl italic font-black uppercase text-brand-white sm:text-4xl">
            General Rules
          </h2>
        </div>
      </div>

      {/* Rule list */}
      <div className="mt-8 border-t-2 border-r-2 border-brand-golden-yellow/50 rounded-tr-xl bg-brand-navy/30 px-5 sm:mt-10 sm:px-8">
        <ul className="divide-y divide-brand-white/[0.06]">
          <RuleItem icon={Users} iconColorClass="text-brand-orange">
            This competition is exclusively open to{" "}
            <span className="font-bold text-brand-golden-yellow">
              Higher Secondary School (HSS)
            </span>{" "}
            students.
          </RuleItem>
          <RuleItem icon={Users} iconColorClass="text-brand-light-green">
            Each team can consist of a maximum of{" "}
            <span className="font-bold text-brand-golden-yellow">
              30 participants
            </span>
            .
          </RuleItem>
          <RuleItem icon={Ban} iconColorClass="text-brand-orange">
            There are{" "}
            <span className="font-bold text-brand-golden-yellow">
              NO registration charges
            </span>{" "}
            for participation.
          </RuleItem>
          <RuleItem icon={Building2} iconColorClass="text-brand-golden-yellow">
            The event will be conducted on{" "}
            <span className="font-bold text-brand-golden-yellow">
              the college campus
            </span>
            .
          </RuleItem>
          <RuleItem icon={UserRound} iconColorClass="text-brand-orange">
            Each Higher Secondary School is allowed to send{" "}
            <span className="font-bold text-brand-golden-yellow">
              only one team
            </span>{" "}
            per competition.
          </RuleItem>
          <RuleItem icon={CalendarDays} iconColorClass="text-brand-light-green">
            To avoid scheduling conflicts, we recommend having{" "}
            <span className="font-bold text-brand-golden-yellow">
              different participants
            </span>{" "}
            for each event so that they do not overlap in case the events
            are scheduled simultaneously.
          </RuleItem>
          <RuleItem icon={Mail} iconColorClass="text-brand-golden-yellow">
            Important information related to individual competitions will
            be{" "}
            <span className="font-bold text-brand-golden-yellow">
              communicated via email
            </span>{" "}
            to both the registered teacher and the participants.
          </RuleItem>
          <RuleItem icon={CalendarDays} iconColorClass="text-brand-orange">
            Please confirm your participation latest by{" "}
            <span className="font-bold text-brand-golden-yellow">
              6th September 2025
            </span>
            .
          </RuleItem>
          <RuleItem icon={Headphones} iconColorClass="text-brand-light-green">
            For specific details about each event, please get in touch
            with the{" "}
            <span className="font-bold text-brand-golden-yellow">
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

export default function RulesSection() {
  return (
    <div className="flex flex-col gap-10 py-10">
      <GeneralRulesPoster />
    </div>
  );
}