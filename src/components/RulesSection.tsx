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

const generalRules = [
  {
    icon: Users,
    color: "text-brand-orange",
    content: (
      <>
        This competition is exclusively open to{" "}
        <span className="font-bold text-brand-golden-yellow">
          Higher Secondary School (HSS)
        </span>{" "}
        students.
      </>
    ),
  },
  {
    icon: UserRound,
    color: "text-brand-light-green",
    content: (
      <>
        Each{" "}
        <span className="font-bold text-brand-golden-yellow">
          Higher Secondary School
        </span>{" "}
        is permitted to register{" "}
        <span className="font-bold text-brand-golden-yellow">
          only one team
        </span>{" "}
        per competition.
      </>
    ),
  },
  {
    icon: Users,
    color: "text-brand-golden-yellow",
    content: (
      <>
        Each team may consist of a maximum of{" "}
        <span className="font-bold text-brand-golden-yellow">
          35 participants
        </span>
        .
      </>
    ),
  },
  {
    icon: Ban,
    color: "text-brand-orange",
    content: (
      <>
        There are{" "}
        <span className="font-bold text-brand-golden-yellow">
          no registration charges
        </span>{" "}
        for participation.
      </>
    ),
  },
  {
    icon: Building2,
    color: "text-brand-golden-yellow",
    content: (
      <>
        The competition will be conducted on the{" "}
        <span className="font-bold text-brand-golden-yellow">
          college campus
        </span>
        .
      </>
    ),
  },
  {
    icon: CalendarDays,
    color: "text-brand-light-green",
    content: (
      <>
        To avoid scheduling conflicts, Higher Secondary Schools are advised
        to nominate{" "}
        <span className="font-bold text-brand-golden-yellow">
          different participants
        </span>{" "}
        for different events, as some events may be conducted
        simultaneously.
      </>
    ),
  },
  {
    icon: UserRound,
    color: "text-brand-orange",
    content: (
      <>
        The{" "}
        <span className="font-bold text-brand-golden-yellow">
          Teacher-in-Charge
        </span>{" "}
        must register the institution through the official BitBuzz website.
        The registration link (Google Form) will be available on the
        website. The Teacher-in-Charge is responsible for submitting the
        institution's registration along with the names of participants for
        their respective events.
      </>
    ),
  },
  {
    icon: CalendarDays,
    color: "text-brand-orange",
    content: (
      <>
        Kindly confirm your participation on or before{" "}
        <span className="font-bold text-brand-golden-yellow">
          4th September 2026
        </span>
        .
      </>
    ),
  },
  {
    icon: Mail,
    color: "text-brand-golden-yellow",
    content: (
      <>
        Important information and event-related updates will be
        communicated via{" "}
        <span className="font-bold text-brand-golden-yellow">
          email
        </span>{" "}
        to the registered Teacher-in-Charge and participants.
      </>
    ),
  },
  {
    icon: Headphones,
    color: "text-brand-light-green",
    content: (
      <>
        For event-specific rules and further details, please contact the{" "}
        <span className="font-bold text-brand-golden-yellow">
          Student Coordinator
        </span>{" "}
        of the respective event mentioned in the brochure.
      </>
    ),
  },
  {
    icon: CalendarDays,
    color: "text-brand-orange",
    content: (
      <>
        Participants are required to report to the venue on time. The
        reporting time is{" "}
        <span className="font-bold text-brand-golden-yellow">
          8:00 AM
        </span>
        .
      </>
    ),
  },
  {
    icon: UserRound,
    color: "text-brand-light-green",
    content: (
      <>
        Participants must carry their valid{" "}
        <span className="font-bold text-brand-golden-yellow">
          Higher Secondary School (HSS) ID Card
        </span>{" "}
        throughout the competition.
      </>
    ),
  },
  {
    icon: Users,
    color: "text-brand-golden-yellow",
    content: (
      <>
        Points will be awarded based on participation and final placement
        in each event.
        <br />
        <br />
        <span className="font-bold text-brand-golden-yellow">
          Winner (1st Place):
        </span>{" "}
        50 Points
        <br />
        <span className="font-bold text-brand-golden-yellow">
          Runner-up (2nd Place):
        </span>{" "}
        30 Points
        <br />
        <span className="font-bold text-brand-golden-yellow">
          Participation:
        </span>{" "}
        10 Points
      </>
    ),
  },
  {
    icon: Users,
    color: "text-brand-orange",
    content: (
      <>
        Winning entries may be featured on the{" "}
        <span className="font-bold text-brand-golden-yellow">
          College's official social media platforms
        </span>
        .
      </>
    ),
  },
  {
    icon: Users,
    color: "text-brand-light-green",
    content: (
      <>
        Trophies and certificates will be awarded to the{" "}
        <span className="font-bold text-brand-golden-yellow">
          Overall Winner
        </span>{" "}
        and{" "}
        <span className="font-bold text-brand-golden-yellow">
          Overall Runner-up
        </span>{" "}
        teams.
      </>
    ),
  },
  {
    icon: Users,
    color: "text-brand-golden-yellow",
    content: (
      <>
        Individual trophies and certificates will be awarded to the{" "}
        <span className="font-bold text-brand-golden-yellow">
          1st
        </span>{" "}
        and{" "}
        <span className="font-bold text-brand-golden-yellow">
          2nd
        </span>{" "}
        place winners of each event.
      </>
    ),
  },
  {
    icon: Mail,
    color: "text-brand-orange",
    content: (
      <>
        All participants will receive an{" "}
        <span className="font-bold text-brand-golden-yellow">
          e-certificate
        </span>{" "}
        of participation.
      </>
    ),
  },
  {
    icon: Ban,
    color: "text-brand-orange",
    content: (
      <>
        The use of cigarettes, alcohol, abusive language, or any form of
        inappropriate or vulgar behaviour is{" "}
        <span className="font-bold text-brand-golden-yellow">
          strictly prohibited
        </span>{" "}
        and will result in immediate disqualification.
      </>
    ),
  },
  {
    icon: Users,
    color: "text-brand-light-green",
    content: (
      <>
        The organizers will provide{" "}
        <span className="font-bold text-brand-golden-yellow">
          snacks and a working lunch
        </span>{" "}
        to all registered participants and accompanying faculty members.
      </>
    ),
  },
  {
    icon: Headphones,
    color: "text-brand-golden-yellow",
    content: (
      <>
        The decisions of the{" "}
        <span className="font-bold text-brand-golden-yellow">
          organizers and judges
        </span>{" "}
        shall be final and binding in all matters related to the
        competition.
      </>
    ),
  },
  
];


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
          <ul className="divide-y divide-brand-white/[0.06]">
  {generalRules.map((rule, index) => (
    <RuleItem
      key={index}
      icon={rule.icon}
      iconColorClass={rule.color}
    >
      {rule.content}
    </RuleItem>
  ))}
</ul>
        </ul>
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