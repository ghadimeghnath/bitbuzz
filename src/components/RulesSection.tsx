"use client";

import * as React from "react";
import {
  School,
  Users,
  CircleDollarSign,
  Building,
  ArrowRightLeft,
  FileText,
  CalendarCheck,
  Megaphone,
  UserCheck,
  MapPin,
  IdCard,
  Gamepad2,
  Trophy,
  Share2,
  Award,
  Medal,
  FileCheck,
  Ban,
  Utensils,
  Gavel,
  Globe,
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
      <p className="pt-1 text-sm leading-relaxed text-brand-white/90 font-brand-body sm:text-base">
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
      icon: School,
      color: "text-brand-orange",
      content: (
        <>
          This event is exclusively open to{" "}
          <span className="font-bold text-brand-golden-yellow">
            Higher Secondary School (HSS)
          </span>{" "}
          students.
        </>
      ),
    },
    {
      icon: Users,
      color: "text-brand-light-green",
      content: (
        <>
          Each Higher Secondary School is allowed to send{" "}
          <span className="font-bold text-brand-golden-yellow">
            only one team
          </span>{" "}
          for the event.
        </>
      ),
    },
    {
      icon: Users,
      color: "text-brand-golden-yellow",
      content: (
        <>
          Each team can consist of a{" "}
          <span className="font-bold text-brand-golden-yellow">
            maximum of 35 participants
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
          <span className="font-bold text-brand-golden-yellow">
            Registration
          </span>{" "}
          of Team is{" "}
          <span className="font-bold text-brand-golden-yellow">
            FREE
          </span>{" "}
          .
        </>
      ),
    },
    {
      icon: Building,
      color: "text-brand-golden-yellow",
      content: (
        <>
          The event will be conducted{" "}
          <span className="font-bold text-brand-golden-yellow">
            on our college campus
          </span>
          .
        </>
      ),
    },
    {
      icon: ArrowRightLeft,
      color: "text-brand-light-green",
      content: (
        <>
          To avoid scheduling conflicts, Higher Secondary Schools are advised{" "}
          <span className="font-bold text-brand-golden-yellow">
            to nominate different participants for different events, as some events may be conducted simultaneously.
          </span>
        </>
      ),
    },
    {
      icon: FileText,
      color: "text-brand-orange",
      content: (
        <>
          The {" "}
           <span className="font-bold text-brand-golden-yellow">
          Teacher-in-Charge
           </span>{" "}
           is responsible for submitting the institution's registration along with the names of participants for their respective events.
        </>
      ),
    },
    {
      icon: CalendarCheck,
      color: "text-brand-orange",
      content: (
        <>
          Kindly confirm your participation latest by{" "}
          <span className="font-bold text-brand-golden-yellow">
            4th September 2026
          </span>
          .
        </>
      ),
    },
    {
      icon: Megaphone,
      color: "text-brand-golden-yellow",
      content: (
        <>
          Important information and event-related updates will be communicated via registered email ID of the{" "}
          <span className="font-bold text-brand-golden-yellow">
            Teacher-in Charge
          </span>{" "}
          and{" "}
          <span className="font-bold text-brand-golden-yellow">
            Team Leader
          </span>{" "}
          Only.
        </>
      ),
    },
    {
      icon: UserCheck,
      color: "text-brand-light-green",
      content: (
        <>
          For specific details about each event, please get in touch with the{" "}
          <span className="font-bold text-brand-golden-yellow">
            Student Coordinator
          </span>{" "}
          of the respective event mentioned in the brochure below.
        </>
      ),
    },
    {
      icon: MapPin,
      color: "text-brand-orange",
      content: (
        <>
          <span className="font-bold text-brand-golden-yellow">
            The reporting time is 8:00 AM
          </span>{" "}
          on the day of the event.
        </>
      ),
    },
    {
      icon: IdCard,
      color: "text-brand-light-green",
      content: (
        <>
          Participants must carry their{" "}
          <span className="font-bold text-brand-golden-yellow">
            valid Higher Secondary School (HSS) ID card
          </span>{" "}
          during the registration.
        </>
      ),
    },
    {
      icon: Gamepad2,
      color: "text-brand-golden-yellow",
      content: (
        <>
          Participants will earn points based on their participation and final placement in the events.
        </>
      ),
    },
    {
      icon: Trophy,
      color: "text-brand-orange",
      content: (
        <>
          The point distribution is as follows:
          <br />
          <span className="font-bold text-brand-golden-yellow">
            Winner (1st Place):
          </span>{" "}
          50 points
          <br />
          <span className="font-bold text-brand-golden-yellow">
            Runner-up (2nd Place):
          </span>{" "}
          30 points
          <br />
          <span className="font-bold text-brand-golden-yellow">
            Participation :
          </span>{" "}
          10 points
        </>
      ),
    },
    {
      icon: Share2,
      color: "text-brand-orange",
      content: (
        <>
          The organisers may post event interactions on social media, in newspapers, and through other media for the purpose of the reach of the event..
        </>
      ),
    },
    {
      icon: Award,
      color: "text-brand-light-green",
      content: (
        <>
          <span className="font-bold text-brand-golden-yellow">
            Trophies and certificates
          </span>{" "}
          will be awarded to the{" "}
          <span className="font-bold text-brand-golden-yellow">
            Overall Winner
          </span>{" "}
          and Overall{" "}
          <span className="font-bold text-brand-golden-yellow">
            Runner-up teams
          </span>
          .
        </>
      ),
    },
    {
      icon: Medal,
      color: "text-brand-golden-yellow",
      content: (
        <>
          <span className="font-bold text-brand-golden-yellow">
            Individual trophies and certificates
          </span>{" "}
          will be awarded to the{" "}
          <span className="font-bold text-brand-golden-yellow">
            1st and 2nd place winners
          </span>{" "}
          of each event.
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
            e-certificate for their participation in Bitbuzz 8.0
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
          The use of prohibited substances or inappropriate behaviour ( {" "}
            <span className="font-bold text-brand-golden-yellow"> 
              such as cigarettes, alcohol, abusive language, or vulgar behaviour
              </span>
              {" "} ) is strictly prohibited on the college campus and will lead to disqualification of the team.
        
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
          to all registered participants and accompanying Teacher in charges.
        </>
      ),
    },
    {
      icon: Gavel,
      color: "text-brand-golden-yellow",
      content: (
        <>
          The{" "}
          <span className="font-bold text-brand-golden-yellow">
            decision of the organizers and judges shall be final and binding
          </span>{" "}
          in all matters related to the competition.
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