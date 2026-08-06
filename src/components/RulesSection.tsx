"use client";

import * as React from "react";
import {
  GraduationCap,
  UserCheck,
  Users,
  CircleDollarSign,
  School,
  CalendarSync,
  Briefcase,
  CalendarCheck,
  MailCheck,
  PhoneCall,
  AlarmClock,
  IdCard,
  Trophy,
  Share2,
  Award,
  Medal,
  FileCheck,
  ShieldAlert,
  Utensils,
  Gavel,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Clip-Path Definitions (Chamfered Cyber Angles)                    */
/* ------------------------------------------------------------------ */

// Outer Cut: 24px chamfered corners
const MAIN_CARD_OUTER_CLIP = `polygon(
  24px 0, calc(100% - 24px) 0,
  100% 24px, 100% calc(100% - 24px),
  calc(100% - 24px) 100%, 24px 100%,
  0 calc(100% - 24px), 0 24px
)`;

// Inner Cut: 23px (1px padding gap offset for border effect)
const MAIN_CARD_INNER_CLIP = `polygon(
  23px 0, calc(100% - 23px) 0,
  100% 23px, 100% calc(100% - 23px),
  calc(100% - 23px) 100%, 23px 100%,
  0 calc(100% - 23px), 0 23px
)`;

// Floating Header Badge Cut
const BADGE_OUTER_CLIP = `polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)`;
const BADGE_INNER_CLIP = `polygon(15px 0, calc(100% - 15px) 0, 100% 100%, 0 100%)`;

// Icon Container Cut
const ICON_BOX_OUTER = `polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)`;
const ICON_BOX_INNER = `polygon(7px 0, calc(100% - 7px) 0, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 0 calc(100% - 7px), 0 7px)`;

/* ------------------------------------------------------------------ */
/*  Poster Shell Component                                            */
/* ------------------------------------------------------------------ */

function PosterShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="rules"
      className="relative z-10 mx-auto w-full max-w-4xl bg-brand-navy px-3 py-6 font-brand-body text-brand-white sm:px-8 sm:py-10"
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rule Item Component with HUD Badge Icon                           */
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
      {/* Sci-Fi Icon Outer Container */}
      <div
        className="shrink-0 bg-gradient-to-br from-brand-golden-yellow/80 via-brand-orange/40 to-brand-golden-yellow/20 p-[1.5px] drop-shadow-[0_0_8px_rgba(243,202,32,0.2)]"
        style={{ clipPath: ICON_BOX_OUTER }}
      >
        {/* Sci-Fi Icon Inner Dark Box */}
        <div
          className="flex h-10 w-10 items-center justify-center bg-brand-navy p-2 sm:h-12 sm:w-12"
          style={{ clipPath: ICON_BOX_INNER }}
        >
          <Icon
            className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColorClass}`}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* Text Content */}
      <p className="pt-1 text-xs leading-relaxed text-brand-white/90 font-brand-body sm:text-sm">
        {children}
      </p>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  General Rules Poster                                              */
/* ------------------------------------------------------------------ */

export function GeneralRulesPoster() {
  const generalRules = [
    {
      icon: GraduationCap,
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
      icon: UserCheck,
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
      icon: CircleDollarSign,
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
      icon: School,
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
      icon: CalendarSync,
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
      icon: Briefcase,
      color: "text-brand-orange",
      content: (
        <>
          The{" "}
          <span className="font-bold text-brand-golden-yellow">
            Teacher-in-Charge
          </span>{" "}
          is responsible for submitting the institution's registration along
          with the names of participants for their respective events.
        </>
      ),
    },
    {
      icon: CalendarCheck,
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
      icon: MailCheck,
      color: "text-brand-golden-yellow",
      content: (
        <>
          Important information and event-related updates will be communicated
          via{" "}
          <span className="font-bold text-brand-golden-yellow">
            email
          </span>{" "}
          to the registered Teacher-in-Charge and participants.
        </>
      ),
    },
    {
      icon: PhoneCall,
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
      icon: AlarmClock,
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
      icon: IdCard,
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
      icon: Trophy,
      color: "text-brand-golden-yellow",
      content: (
        <>
          Points will be awarded based on participation and final placement in
          each event.
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
      icon: Share2,
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
      icon: Award,
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
      icon: Medal,
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
      icon: FileCheck,
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
      icon: ShieldAlert,
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
      icon: Utensils,
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
      icon: Gavel,
      color: "text-brand-golden-yellow",
      content: (
        <>
          The decisions of the{" "}
          <span className="font-bold text-brand-golden-yellow">
            organizers and judges
          </span>{" "}
          shall be final and binding in all matters related to the competition.
        </>
      ),
    },
  ];

  return (
    <PosterShell>
      <div className="relative mt-6 sm:mt-8">
        {/* Floating Header Badge sitting on top border */}
        <div
          className="absolute -top-4 left-1/2 z-20 -translate-x-1/2 bg-gradient-to-r from-brand-orange via-brand-golden-yellow to-brand-orange p-[1.5px] drop-shadow-[0_0_12px_rgba(243,202,32,0.4)]"
          style={{ clipPath: BADGE_OUTER_CLIP }}
        >
          <div
            className="bg-brand-navy px-6 py-1.5 text-center sm:px-10 sm:py-2"
            style={{ clipPath: BADGE_INNER_CLIP }}
          >
            <h2 className="font-brand-heading text-sm font-extrabold italic uppercase tracking-widest text-brand-white sm:text-xl">
              General Rules
            </h2>
          </div>
        </div>

        {/* Main Card Container */}
        <div
          className="bg-gradient-to-b from-brand-golden-yellow via-brand-orange/40 to-brand-golden-yellow/80 p-[2px] transition-all duration-300 hover:drop-shadow-[0_0_16px_rgba(243,202,32,0.25)]"
          style={{ clipPath: MAIN_CARD_OUTER_CLIP }}
        >
          <div
            className="bg-brand-navy px-4 pt-10 pb-6 sm:px-8 sm:pt-12 sm:pb-8"
            style={{ clipPath: MAIN_CARD_INNER_CLIP }}
          >
            <ul className="divide-y divide-brand-golden-yellow/15">
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
          </div>
        </div>
      </div>
    </PosterShell>
  );
}

export default function RulesSection() {
  return (
    <div className="flex flex-col gap-10 bg-brand-navy py-10">
      <GeneralRulesPoster />
    </div>
  );
}