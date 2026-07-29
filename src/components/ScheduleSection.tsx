"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  MapPin,
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
}

interface ScheduleSlot {
  start: string;
  end: string;
  events: ScheduleEvent[];
}

const categoryStyles: Record<
  Category,
  { dot: string; badge: string; icon: string }
> = {
  ceremony: {
    dot: "bg-brand-light-green border-brand-light-green",
    badge: "bg-brand-light-green/10 text-brand-light-green border-brand-light-green/30",
    icon: "text-brand-light-green",
  },
  competitions: {
    dot: "bg-brand-golden-yellow border-brand-golden-yellow",
    badge: "bg-brand-golden-yellow/10 text-brand-golden-yellow border-brand-golden-yellow/30",
    icon: "text-brand-golden-yellow",
  },
  technical: {
    dot: "bg-brand-coral border-brand-coral",
    badge: "bg-brand-coral/10 text-brand-coral border-brand-coral/30",
    icon: "text-brand-coral",
  },
  creative: {
    dot: "bg-brand-mustard-yellow border-brand-mustard-yellow",
    badge:
      "bg-brand-mustard-yellow/10 text-brand-mustard-yellow border-brand-mustard-yellow/30",
    icon: "text-brand-mustard-yellow",
  },
  gaming: {
    dot: "bg-brand-bright-orange border-brand-bright-orange",
    badge: "bg-brand-bright-orange/10 text-brand-bright-orange border-brand-bright-orange/30",
    icon: "text-brand-bright-orange",
  },
  sports: {
    dot: "bg-brand-orange border-brand-orange",
    badge: "bg-brand-orange/10 text-brand-orange border-brand-orange/30",
    icon: "text-brand-orange",
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
    start: "9:00 AM",
    end: "9:30 AM",
    events: [
      {
        title: "Inaugural Function",
        location: "Hall 1",
        category: "ceremony",
        icon: Trophy,
      },
    ],
  },
  {
    start: "10:00 AM",
    end: "11:00 AM",
    events: [
      {
        title: "Quiz",
        location: "Classroom",
        category: "competitions",
        icon: HelpCircle,
      },
      {
        title: "E-Poster",
        location: "Lab 1",
        category: "creative",
        icon: ImageIcon,
      },
    ],
  },
  {
    start: "11:00 AM",
    end: "12:00 PM",
    events: [
      {
        title: "Paper Presentations",
        location: "Classroom",
        category: "competitions",
        icon: FileText,
      },
    ],
  },
  {
    start: "12:00 PM",
    end: "1:00 PM",
    events: [
      {
        title: "Digital Crisis Challenge",
        location: "Classroom",
        category: "technical",
        icon: ShieldCheck,
      },
    ],
  },
  {
    start: "2:00 PM",
    end: "3:00 PM",
    events: [
      {
        title: "Gaming — FIFA / Free Fire",
        location: "Classroom",
        category: "gaming",
        icon: Gamepad2,
      },
    ],
  },
  {
    start: "2:00 PM",
    end: "4:00 PM",
    events: [
      {
        title: "Reel Making",
        location: "Hall 1 / Venue",
        category: "creative",
        icon: Clapperboard,
      },
      {
        title: "Debate",
        location: "Hall 1",
        category: "creative",
        icon: Mic2,
      },
      {
        title: "Role Play",
        location: "Classroom",
        category: "creative",
        icon: Drama,
      },
    ],
  },
  {
    start: "3:00 PM",
    end: "4:00 PM",
    events: [
      {
        title: "Technical Skit",
        location: "Hall 2",
        category: "technical",
        icon: Users,
      },
      {
        title: "Tech Startup",
        location: "Hall 2",
        category: "technical",
        icon: Rocket,
      },
      {
        title: "Tech Escape Room",
        location: "Classroom",
        category: "technical",
        icon: Lock,
      },
      {
        title: "Memory Mania",
        location: "Lab 3 / Class",
        category: "technical",
        icon: BrainCircuit,
      },
    ],
  },
  {
    start: "4:00 PM",
    end: "5:00 PM",
    events: [
      {
        title: "Sports — Tic Tac Toe / Rubik's Cube",
        location: "Classroom",
        category: "sports",
        icon: Dumbbell,
      },
      {
        title: "Jenga / Ludo",
        location: "Classroom",
        category: "creative",
        icon: Puzzle,
      },
    ],
  },
  {
    start: "4:00 PM",
    end: "5:00 PM",
    events: [
      {
        title: "Valedictory Function",
        location: "Hall 1",
        category: "ceremony",
        icon: Award,
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
      className="relative w-full py-20 sm:py-28 lg:py-32 px-4 sm:px-6 md:px-12 flex items-center justify-center bg-brand-navy"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/schedule_bg_1785160513858"
          alt="Schedule Background"
          fill
          className="object-cover opacity-20 mix-blend-screen grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/80 to-brand-navy" />
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 text-center"
        >
          <div className="inline-block border border-brand-golden-yellow/30 bg-brand-navy/80 px-4 py-3 sm:p-4 backdrop-blur-sm rounded shadow-brand-soft">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-brand-heading font-bold uppercase tracking-widest text-brand-white">
              TIMETABLE // <span className="text-brand-golden-yellow">SYNC</span>
            </h2>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-2 text-xs sm:text-sm font-brand-small font-bold uppercase tracking-widest text-brand-white bg-brand-navy/80 border border-brand-golden-yellow/30 rounded-full px-4 py-2">
              <Calendar className="w-4 h-4 text-brand-golden-yellow shrink-0" />
              12 September 2026
            </span>
            <span className="flex items-center gap-2 text-xs sm:text-sm font-brand-small font-bold uppercase tracking-widest text-brand-white bg-brand-navy/80 border border-brand-golden-yellow/30 rounded-full px-4 py-2 text-center">
              <MapPin className="w-4 h-4 text-brand-golden-yellow shrink-0" />
              VVM&apos;s Shree Damodar College, Margao
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="bg-brand-navy/90 border border-brand-golden-yellow/40 backdrop-blur-md p-4 sm:p-8 md:p-12 rounded relative shadow-brand-soft">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent opacity-50" />

          <div>
            {schedule.map((slot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative flex items-start gap-3 sm:gap-6 group"
              >
                {/* Time rail */}
                <div className="w-16 sm:w-28 md:w-32 shrink-0 pt-1 sm:pt-3 text-right">
                  <div className="font-brand-date text-[11px] sm:text-sm font-bold tracking-wide text-brand-white leading-tight">
                    {slot.start}
                  </div>
                  <div className="font-brand-date text-[10px] sm:text-xs text-brand-white/50 leading-tight">
                    – {slot.end}
                  </div>
                </div>

                {/* Timeline trace */}
                <div className="relative flex flex-col items-center shrink-0 pt-2 sm:pt-4">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rotate-45 border-2 border-brand-golden-yellow/60 bg-brand-navy group-hover:border-brand-golden-yellow transition-colors" />
                  {index !== schedule.length - 1 && (
                    <div className="absolute top-2.5 sm:top-3 w-px flex-1 min-h-[3.5rem] sm:min-h-[4.5rem] bg-brand-golden-yellow/30 group-hover:bg-brand-golden-yellow/60 transition-colors" />
                  )}
                </div>

                {/* Event card(s) */}
                <div className="flex-1 min-w-0 pb-8 sm:pb-10">
                  <div className="bg-brand-navy/50 border border-brand-golden-yellow/20 rounded divide-y divide-brand-golden-yellow/10 group-hover:border-brand-golden-yellow/50 transition-colors shadow-sm overflow-hidden">
                    {slot.events.map((evt, evtIndex) => {
                      const styles = categoryStyles[evt.category];
                      const Icon = evt.icon;
                      return (
                        <div
                          key={evtIndex}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`shrink-0 w-2 h-2 rounded-full border ${styles.dot}`}
                            />
                            <Icon
                              className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${styles.icon}`}
                            />
                            <h4 className="text-sm sm:text-base md:text-lg font-brand-heading font-bold uppercase tracking-wide text-brand-white truncate">
                              {evt.title}
                            </h4>
                          </div>

                          <span
                            className={`inline-flex items-center gap-1 self-start sm:self-auto shrink-0 text-[10px] sm:text-xs font-brand-small font-bold uppercase tracking-widest border rounded px-2 py-1 ${styles.badge}`}
                          >
                            <MapPin className="w-3 h-3" />
                            {evt.location}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Category legend */}
          <div className="mt-2 pt-6 sm:pt-8 border-t border-brand-golden-yellow/20 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {categoryLegend.map(({ label, category }) => (
              <span
                key={category}
                className="flex items-center gap-2 text-[10px] sm:text-xs font-brand-small font-bold uppercase tracking-widest text-brand-white/70"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full border ${categoryStyles[category].dot}`}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}