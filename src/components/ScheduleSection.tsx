"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  HelpCircle,
  ImageIcon,
  FileText,
  ShieldCheck,
  Gamepad2,
  Clapperboard,
  Mic2,
  Drama,
  Users,
  Rocket,
  Lock,
  BrainCircuit,
  Dumbbell,
  Puzzle,
  Award,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Chamfered Cyber Angles)                            */
/* -------------------------------------------------------------------------- */

// Main Schedule Box Clips
const MAIN_CARD_OUTER_CLIP = `polygon(
  24px 0, calc(100% - 24px) 0,
  100% 24px, 100% calc(100% - 24px),
  calc(100% - 24px) 100%, 24px 100%,
  0 calc(100% - 24px), 0 24px
)`;
const MAIN_CARD_INNER_CLIP = `polygon(
  23px 0, calc(100% - 23px) 0,
  100% 23px, 100% calc(100% - 23px),
  calc(100% - 23px) 100%, 23px 100%,
  0 calc(100% - 23px), 0 23px
)`;

// Header Badge Cut
const HEADER_BADGE_OUTER = `polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)`;
const HEADER_BADGE_INNER = `polygon(15px 0, calc(100% - 15px) 0, 100% 100%, 0 100%)`;

// Info Meta Badges (Date / Location)
const META_BADGE_OUTER = `polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)`;
const META_BADGE_INNER = `polygon(9px 0, calc(100% - 9px) 0, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%, 0 calc(100% - 9px), 0 9px)`;

// Individual Event Slot Box Cuts
const EVENT_CARD_OUTER = `polygon(
  14px 0, calc(100% - 14px) 0,
  100% 14px, 100% calc(100% - 14px),
  calc(100% - 14px) 100%, 14px 100%,
  0 calc(100% - 14px), 0 14px
)`;
const EVENT_CARD_INNER = `polygon(
  13px 0, calc(100% - 13px) 0,
  100% 13px, 100% calc(100% - 13px),
  calc(100% - 13px) 100%, 13px 100%,
  0 calc(100% - 13px), 0 13px
)`;

// HUD Icon Frame Cuts
const HUD_ICON_OUTER = `polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)`;
const HUD_ICON_INNER = `polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px)`;

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type Category =
  | "ceremony"
  | "competitions"
  | "technical"
  | "creative"
  | "gaming"
  | "sports";

interface ScheduleEvent {
  title: string;
  location: string;
  category: Category;
  icon: LucideIcon;
  startTime: string;
  endTime: string;
}

interface ScheduleSlot {
  timeSlot: string;
  events: ScheduleEvent[];
}

const categoryStyles: Record<
  Category,
  { dot: string; badge: string; icon: string; borderGradient: string }
> = {
  ceremony: {
    dot: "bg-brand-light-green border-brand-light-green",
    badge:
      "bg-brand-light-green/10 text-brand-light-green border-brand-light-green/30",
    icon: "text-brand-light-green",
    borderGradient: "from-brand-light-green/60 to-brand-light-green/20",
  },
  competitions: {
    dot: "bg-brand-golden-yellow border-brand-golden-yellow",
    badge:
      "bg-brand-golden-yellow/10 text-brand-golden-yellow border-brand-golden-yellow/30",
    icon: "text-brand-golden-yellow",
    borderGradient: "from-brand-golden-yellow/60 to-brand-golden-yellow/20",
  },
  technical: {
    dot: "bg-brand-coral border-brand-coral",
    badge: "bg-brand-coral/10 text-brand-coral border-brand-coral/30",
    icon: "text-brand-coral",
    borderGradient: "from-brand-coral/60 to-brand-coral/20",
  },
  creative: {
    dot: "bg-brand-mustard-yellow border-brand-mustard-yellow",
    badge:
      "bg-brand-mustard-yellow/10 text-brand-mustard-yellow border-brand-mustard-yellow/30",
    icon: "text-brand-mustard-yellow",
    borderGradient: "from-brand-mustard-yellow/60 to-brand-mustard-yellow/20",
  },
  gaming: {
    dot: "bg-brand-bright-orange border-brand-bright-orange",
    badge:
      "bg-brand-bright-orange/10 text-brand-bright-orange border-brand-bright-orange/30",
    icon: "text-brand-bright-orange",
    borderGradient: "from-brand-bright-orange/60 to-brand-bright-orange/20",
  },
  sports: {
    dot: "bg-brand-orange border-brand-orange",
    badge: "bg-brand-orange/10 text-brand-orange border-brand-orange/30",
    icon: "text-brand-orange",
    borderGradient: "from-brand-orange/60 to-brand-orange/20",
  },
};

const categoryLegend: { label: string; category: Category }[] = [
  { label: "Ceremony", category: "ceremony" },
  { label: "Competitions", category: "competitions" },
  { label: "Technical", category: "technical" },
  { label: "Creative", category: "creative" },
  { label: "Gaming", category: "gaming" },
  { label: "Sports", category: "sports" },
];

const schedule: ScheduleSlot[] = [
  {
    timeSlot: "9:00 AM",
    events: [
      {
        title: "Inaugural Function",
        location: "Hall 1",
        category: "ceremony",
        icon: Trophy,
        startTime: "9:00 AM",
        endTime: "9:30 AM",
      },
    ],
  },
  {
    timeSlot: "10:00 AM",
    events: [
      {
        title: "Quiz - Round 1",
        location: "Classroom",
        category: "competitions",
        icon: HelpCircle,
        startTime: "10:00 AM",
        endTime: "11:00 AM",
      },
      {
        title: "E-Poster",
        location: "Lab 1",
        category: "creative",
        icon: ImageIcon,
        startTime: "10:00 AM",
        endTime: "11:30 AM",
      },
      {
        title: "Typing Titan",
        location: "Lab 4",
        category: "technical",
        icon: Lock,
        startTime: "10:00 AM",
        endTime: "11:30 AM",
      },
      {
        title: "Gaming (FIFA / Free Fire)",
        location: "Classroom",
        category: "gaming",
        icon: Gamepad2,
        startTime: "10:00 AM",
        endTime: "1:00 PM",
      },
      {
        title: "Reel Making - Pre Event",
        location: "Venue",
        category: "creative",
        icon: Clapperboard,
        startTime: "10:00 AM",
        endTime: "11:00 AM",
      },
      {
        title: "Debate",
        location: "Hall 1",
        category: "creative",
        icon: Mic2,
        startTime: "10:00 AM",
        endTime: "2:30 PM",
      },
      {
        title: "Tech Startup",
        location: "Hall 2",
        category: "technical",
        icon: Rocket,
        startTime: "10:00 AM",
        endTime: "1:00 PM",
      },
      {
        title: "E-Treasure Hunt",
        location: "Lab 3",
        category: "technical",
        icon: Lock,
        startTime: "10:00 AM",
        endTime: "1:00 PM",
      },
    ],
  },
  {
    timeSlot: "11:00 AM",
    events: [
      {
        title: "Quiz - Round 2",
        location: "Classroom",
        category: "competitions",
        icon: HelpCircle,
        startTime: "11:00 AM",
        endTime: "1:00 PM",
      },
      {
        title: "Paper Presentation",
        location: "Classroom",
        category: "competitions",
        icon: FileText,
        startTime: "11:00 AM",
        endTime: "4:00 PM",
      },
      {
        title: "Reel Making - Event",
        location: "Venue",
        category: "creative",
        icon: Clapperboard,
        startTime: "11:00 AM",
        endTime: "4:00 PM",
      },
      {
        title: "Memory Mania",
        location: "Lab 2",
        category: "technical",
        icon: BrainCircuit,
        startTime: "11:00 AM",
        endTime: "1:00 PM",
      },
      {
        title: "Sports (Rubik's Cube / Tic Tac Toe)",
        location: "Classroom / Multipurpose Hall",
        category: "sports",
        icon: Dumbbell,
        startTime: "11:00 AM",
        endTime: "1:00 PM",
      },
    ],
  },
  {
    timeSlot: "2:00 PM",
    events: [
      {
        title: "Digital Crisis Challenge",
        location: "Classroom",
        category: "technical",
        icon: ShieldCheck,
        startTime: "2:00 PM",
        endTime: "4:00 PM",
      },
      {
        title: "Role Play",
        location: "Classroom",
        category: "creative",
        icon: Drama,
        startTime: "2:00 PM",
        endTime: "4:00 PM",
      },
      {
        title: "Technical Skit",
        location: "Hall 2",
        category: "technical",
        icon: Users,
        startTime: "2:00 PM",
        endTime: "4:00 PM",
      },
      {
        title: "Tech Escape Room",
        location: "Classroom",
        category: "technical",
        icon: Lock,
        startTime: "2:00 PM",
        endTime: "3:30 PM",
      },
      {
        title: "Sports (Jenga / Ludo)",
        location: "Classroom",
        category: "sports",
        icon: Puzzle,
        startTime: "2:00 PM",
        endTime: "4:00 PM",
      },
    ],
  },
  {
    timeSlot: "4:00 PM",
    events: [
      {
        title: "Valedictory Function",
        location: "Hall 1",
        category: "ceremony",
        icon: Award,
        startTime: "4:00 PM",
        endTime: "5:00 PM",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="relative flex w-full items-center justify-center overflow-hidden bg-brand-navy px-4 py-20 sm:px-6 sm:py-28 lg:px-12 lg:py-32"
    >
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/schedule_bg_1785160513858"
          alt="Schedule Background"
          fill
          className="object-cover opacity-20 mix-blend-screen grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/80 to-brand-navy" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          {/* Cyber Chamfered Header Box */}
          <div className="flex justify-center">
            <div
              className="bg-gradient-to-r from-brand-orange via-brand-golden-yellow to-brand-orange p-[1.5px] drop-shadow-[0_0_15px_rgba(243,202,32,0.35)]"
              style={{ clipPath: HEADER_BADGE_OUTER }}
            >
              <div
                className="bg-brand-navy px-6 py-3.5 sm:px-10 sm:py-4"
                style={{ clipPath: HEADER_BADGE_INNER }}
              >
                <h2 className="font-brand-heading text-2xl font-extrabold uppercase tracking-widest text-brand-white sm:text-4xl md:text-5xl">
                  TIMETABLE //{" "}
                  <span className="text-brand-golden-yellow drop-shadow-[0_0_8px_rgba(243,202,32,0.6)]">
                    SYNC
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {/* Meta Info Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">
            {/* Date Badge */}
            <div
              className="bg-gradient-to-r from-brand-golden-yellow/60 via-brand-orange/40 to-brand-golden-yellow/60 p-[1px] drop-shadow-[0_0_8px_rgba(243,202,32,0.2)]"
              style={{ clipPath: META_BADGE_OUTER }}
            >
              <div
                className="flex items-center gap-2 bg-brand-navy/90 px-4 py-2 font-brand-small text-xs font-bold uppercase tracking-widest text-brand-white backdrop-blur-md sm:text-sm"
                style={{ clipPath: META_BADGE_INNER }}
              >
                <Calendar className="h-4 w-4 shrink-0 text-brand-golden-yellow" />
                12 September 2026
              </div>
            </div>

            {/* Location Badge */}
            <div
              className="bg-gradient-to-r from-brand-golden-yellow/60 via-brand-orange/40 to-brand-golden-yellow/60 p-[1px] drop-shadow-[0_0_8px_rgba(243,202,32,0.2)]"
              style={{ clipPath: META_BADGE_OUTER }}
            >
              <div
                className="flex items-center gap-2 bg-brand-navy/90 px-4 py-2 font-brand-small text-xs font-bold uppercase tracking-widest text-brand-white backdrop-blur-md sm:text-sm"
                style={{ clipPath: META_BADGE_INNER }}
              >
                <MapPin className="h-4 w-4 shrink-0 text-brand-golden-yellow" />
                VVM&apos;s Shree Damodar College, Margao
              </div>
            </div>
          </div>
        </motion.div>

        {/* Outer Main Cyber Timeline Container Card */}
        <div
          className="bg-gradient-to-b from-brand-golden-yellow via-brand-orange/40 to-brand-golden-yellow/80 p-[2px] transition-all duration-300 drop-shadow-[0_0_18px_rgba(243,202,32,0.2)]"
          style={{ clipPath: MAIN_CARD_OUTER_CLIP }}
        >
          {/* Inner Navy Background Box */}
          <div
            className="relative bg-brand-navy p-4 backdrop-blur-md sm:p-8 md:p-12"
            style={{ clipPath: MAIN_CARD_INNER_CLIP }}
          >
            {/* Top Glowing Beam Strip */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent opacity-80" />

            {/* Timeline Loop */}
            <div className="pt-2">
              {schedule.map((slot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative flex items-start gap-3 sm:gap-6"
                >
                  {/* Time Rail */}
                  <div className="w-16 shrink-0 pt-1 text-right sm:w-28 sm:pt-3 md:w-32">
                    <div className="font-brand-date text-xs font-bold tracking-wide text-brand-golden-yellow leading-tight drop-shadow-[0_0_6px_rgba(243,202,32,0.3)] sm:text-base">
                      {slot.timeSlot}
                    </div>
                    <div className="font-brand-date text-[10px] text-brand-white/50 leading-tight sm:text-xs">
                      Onwards
                    </div>
                  </div>

                  {/* Cyber Timeline Trace / Node */}
                  <div className="relative flex shrink-0 flex-col items-center pt-2 sm:pt-4">
                    {/* Glowing HUD Diamond Marker */}
                    <div className="relative flex h-3 w-3 items-center justify-center rotate-45 border border-brand-golden-yellow bg-brand-navy transition-all duration-300 group-hover:bg-brand-golden-yellow group-hover:drop-shadow-[0_0_8px_rgba(243,202,32,0.8)] sm:h-3.5 sm:w-3.5">
                      <div className="h-1 w-1 bg-brand-golden-yellow group-hover:bg-brand-navy" />
                    </div>

                    {/* Connecting Vertical Beam Line */}
                    {index !== schedule.length - 1 && (
                      <div className="min-h-[3.5rem] w-[1px] flex-1 bg-gradient-to-b from-brand-golden-yellow/50 via-brand-golden-yellow/20 to-brand-golden-yellow/5 transition-colors group-hover:from-brand-golden-yellow sm:min-h-[4.5rem]" />
                    )}
                  </div>

                  {/* Event Group Shell Container */}
                  <div className="min-w-0 flex-1 pb-8 sm:pb-10">
                    <div
                      className="bg-gradient-to-r from-brand-golden-yellow/30 via-brand-orange/20 to-brand-golden-yellow/10 p-[1.5px] transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(243,202,32,0.25)]"
                      style={{ clipPath: EVENT_CARD_OUTER }}
                    >
                      <div
                        className="divide-y divide-brand-golden-yellow/15 bg-brand-navy/90 backdrop-blur-md"
                        style={{ clipPath: EVENT_CARD_INNER }}
                      >
                        {slot.events.map((evt, evtIndex) => {
                          const styles = categoryStyles[evt.category];
                          const Icon = evt.icon;
                          return (
                            <div
                              key={evtIndex}
                              className="flex flex-col justify-between gap-2 p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4 transition-colors hover:bg-brand-golden-yellow/[0.03]"
                            >
                              {/* Left Info (Dot + HUD Icon + Title) */}
                              <div className="flex min-w-0 items-center gap-3">
                                <span
                                  className={`h-2 w-2 shrink-0 rounded-full border ${styles.dot}`}
                                />

                                {/* Mini HUD Icon Frame */}
                                <div
                                  className={`shrink-0 bg-gradient-to-br ${styles.borderGradient} p-[1px]`}
                                  style={{ clipPath: HUD_ICON_OUTER }}
                                >
                                  <div
                                    className="flex h-7 w-7 items-center justify-center bg-brand-navy p-1 sm:h-8 sm:w-8"
                                    style={{ clipPath: HUD_ICON_INNER }}
                                  >
                                    <Icon
                                      className={`h-3.5 w-3.5 shrink-0 ${styles.icon} sm:h-4 sm:w-4`}
                                    />
                                  </div>
                                </div>

                                <h4 className="truncate font-brand-heading text-sm font-bold uppercase tracking-wide text-brand-white sm:text-base md:text-lg">
                                  {evt.title}
                                </h4>
                              </div>

                              {/* Right Badges (Time Slot + Location) */}
                              <div className="flex flex-wrap items-center gap-2 self-start shrink-0 sm:self-auto">
                                {/* Duration Badge */}
                                <span className="inline-flex items-center gap-1 border border-brand-golden-yellow/30 bg-brand-golden-yellow/10 px-2.5 py-1 font-brand-date text-[10px] font-semibold text-brand-golden-yellow/90 sm:text-xs">
                                  <Clock className="h-3 w-3" />
                                  {evt.startTime} – {evt.endTime}
                                </span>

                                {/* Location Badge */}
                                <span
                                  className={`inline-flex items-center gap-1 border px-2.5 py-1 font-brand-small text-[10px] font-bold uppercase tracking-widest sm:text-xs ${styles.badge}`}
                                >
                                  <MapPin className="h-3 w-3" />
                                  {evt.location}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Category Legend */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3.5 border-t border-brand-golden-yellow/20 pt-6 sm:pt-8">
              {categoryLegend.map(({ label, category }) => (
                <span
                  key={category}
                  className="flex items-center gap-2 font-brand-small text-[10px] font-bold uppercase tracking-widest text-brand-white/80 sm:text-xs"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full border ${categoryStyles[category].dot}`}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}