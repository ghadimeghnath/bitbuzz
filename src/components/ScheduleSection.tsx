"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  HelpCircle,
  ImageIcon,
  FileText,
  ShieldCheck,
  Keyboard,
  Gamepad2,
  Clapperboard,
  Mic2,
  Drama,
  Rocket,
  Search,
  BrainCircuit,
  Users,
  Lock,
  Dumbbell,
  Award,
  MapPin,
  ArrowRight,
  Hand,
  Gift,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data Structure (Mapped to a 16-Column Logical Grid)                       */
/* -------------------------------------------------------------------------- */

const HEADER_BADGE_OUTER = `polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)`;
const HEADER_BADGE_INNER = `polygon(15px 0, calc(100% - 15px) 0, 100% 100%, 0 100%)`;

const timeHeaders = [
  { label: "9:00 - 10:00 AM", span: 2 },
  { label: "10:00 - 11:00 AM", span: 2 },
  { label: "11:00 - 12:00 PM", span: 2 },
  { label: "12:00 - 1:00 PM", span: 2 },
  { label: "1:00 - 2:00 PM", span: 2 },
  { label: "2:00 - 3:00 PM", span: 2 },
  { label: "3:00 - 4:00 PM", span: 2 },
  { label: "4:00 - 5:00 PM", span: 2 },
];

const scheduleRows = [
  {
    title: "INAUGURAL",
    icon: Trophy,
    items: [
      { title: "INAUGURAL FUNCTION", location: "HALL 1", start: 1, span: 2, bg: "bg-[#2ea043]" },
    ],
  },
  {
    title: "SURPRISE EVENT",
    icon: Gift,
    items: [
      { title: "SURPRISE EVENT", location: "TBA", start: 3, span: 10, bg: "bg-[#f59e0b]" },
    ],
  },
  {
    title: "QUIZ",
    icon: HelpCircle,
    items: [
      { title: "IQ BUSTER", location: "CLASSROOM", start: 3, span: 6, bg: "bg-[#2563eb]" },
    ],
  },
  {
    title: "PAPER PRESENTATION",
    icon: FileText,
    items: [
      { title: "TECHFLUENCE", location: "CLASSROOM", start: 5, span: 10, bg: "bg-[#2563eb]" },
    ],
  },
  {
    title: "CRISIS CHALLENGE",
    icon: ShieldCheck,
    items: [
      { title: "BIT RESCUE", location: "CLASSROOM", start: 11, span: 4, bg: "bg-[#2563eb]" },
    ],
  },
  {
    title: "DEBATE",
    icon: Mic2,
    items: [
      { title: "ARGUEMENT ARENA", location: "HALL 1", start: 3, span: 10, bg: "bg-[#2563eb]" },
    ],
  },
  {
    title: "ROLE PLAY",
    icon: Drama,
    items: [
      { title: "DECODE & ACT", location: "CLASSROOM", start: 11, span: 4, bg: "bg-[#2563eb]" },
    ],
  },
  {
    title: "STARTUP PITCH",
    icon: Rocket,
    items: [
      { title: "INNO PITCH", location: "HALL 2", start: 3, span: 6, bg: "bg-[#2563eb]" },
    ],
  },
  {
    title: "TECHNICAL SKIT",
    icon: Clapperboard,
    items: [
      { title: "NAUTANKI", location: "HALL 2", start: 11, span: 4, bg: "bg-[#2563eb]" },
    ],
  },
  {
    title: "LUNCH BREAK",
    icon: Users,
    items: [
      { title: "LUNCH BREAK", location: "CLASSROOM", start: 9, span: 2, bg: "bg-[#2ea043]" },
    ],
  },
  {
    title: "E-POSTER",
    icon: ImageIcon,
    items: [
      { title: "ARTCLUSIVE", location: "LAB 1", start: 3, span: 3, bg: "bg-[#9333ea]" },
    ],
  },
  {
    title: "SPEED TYPING",
    icon: Keyboard,
    items: [
      { title: "TYPING TITANS", location: "LAB 4", start: 3, span: 3, bg: "bg-[#9333ea]" },
    ],
  },
  {
    title: "GAMING",
    icon: Gamepad2,
    items: [
      { title: "BATTLE ARENA", location: "CLASSROOM", start: 3, span: 6, bg: "bg-[#9333ea]" },
    ],
  },
  {
    title: "REEL MAKING",
    icon: Clapperboard,
    items: [
      { title: "EUREKA", location: "CAMPUS", start: 3, span: 12, bg: "bg-[#9333ea]" },
    ],
  },
  {
    title: "TREASURE HUNT",
    icon: Search,
    items: [
      { title: "TECH TRAIL HUNT", location: "LAB 3", start: 3, span: 6, bg: "bg-[#9333ea]" },
    ],
  },
  {
    title: "MEMORY MANIA",
    icon: BrainCircuit,
    items: [
      { title: "MIND SYNC", location: "LAB 2", start: 5, span: 4, bg: "bg-[#9333ea]" },
    ],
  },
  {
    title: "ESCAPE ROOM",
    icon: Lock,
    items: [
      { title: "ENCRYPTED ESCAPE", location: "CLASSROOM", start: 11, span: 5, bg: "bg-[#9333ea]" },
    ],
  },
  {
    title: "TIC TAC TOE",
    icon: Gamepad2,
    items: [
      { title: "GRID RUSH", location: "MULTIPURPOSE HALL", start: 5, span: 4, bg: "bg-[#dc2626]" },
    ],
  },
  {
    title: "RUBIKS CUBE",
    icon: Gamepad2,
    items: [
      { title: "CUBE CRAZE", location: "CLASSROOM", start: 5, span: 4, bg: "bg-[#dc2626]" },
    ],
  },
  {
    title: "LUDO",
    icon: Users,
    items: [
      { title: "ROLL ROYAL", location: "CLASSROOM", start: 11, span: 2, bg: "bg-[#dc2626]" },
    ],
  },
  {
    title: "JENGA",
    icon: Users,
    items: [
      { title: "TOWER TUMBLE", location: "CLASSROOM", start: 11, span: 2, bg: "bg-[#dc2626]" },
    ],
  },
  {
    title: "VALEDICTORY",
    icon: Award,
    items: [
      { title: "VALEDICTORY FUNCTION", location: "HALL 1", start: 15, span: 2, bg: "bg-[#2ea043]" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function ScheduleGrid() {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!hasScrolled && e.currentTarget.scrollLeft > 10) {
      setHasScrolled(true);
    }
  };

  return (
    <section id="schedule" className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-brand-navy px-2 py-10 sm:px-4 md:px-6 lg:py-24">
      {/* Header Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center md:mb-10"
      >
        <div
          className="bg-gradient-to-r from-brand-orange via-brand-golden-yellow to-brand-orange p-[1.5px] drop-shadow-[0_0_15px_rgba(243,202,32,0.35)]"
          style={{ clipPath: HEADER_BADGE_OUTER }}
        >
          <div
            className="bg-brand-navy px-6 py-3.5 sm:px-10 sm:py-4"
            style={{ clipPath: HEADER_BADGE_INNER }}
          >
            <h2 className="font-brand-heading text-2xl font-extrabold uppercase tracking-widest text-brand-white sm:text-4xl md:text-5xl">
              SCHEDULE
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Grid Container */}
      <div className="relative w-full max-w-[1400px]">
        {/* MOBILE VIEW: Swipe Left Hint Animation */}
        {!hasScrolled && (
        <div className="sm:hidden absolute top-1/4 left-16 -translate-y-1/2 z-50 pointer-events-none flex items-center gap-1.5">
          
          {/* Swipe Left Text Message */}
          <motion.span
            animate={{
              x: [10, 10, -15, -15, 10],       // Moves left in tandem with the hand
              opacity: [0, 0.9, 0.9, 0, 0],     // Fades in and out with the gesture
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 0.6,
              times: [0, 0.2, 0.65, 0.85, 1],
              ease: "easeInOut",
            }}
            className="text-[11px] font-medium tracking-wide uppercase text-brand-golden-yellow/90 drop-shadow-[0_0_6px_rgba(255,215,0,0.3)] whitespace-nowrap select-none"
          >
            Hold and swipe left
          </motion.span>

          {/* Hand & Ripple Container */}
          <div className="relative flex items-center justify-center">
            {/* Touch Point Ripple Effect */}
            <motion.div
              animate={{
                scale: [0.6, 1.5, 0.6],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 0.6,
                times: [0, 0.25, 0.5],
                ease: "easeOut",
              }}
              className="absolute right-0 w-8 h-8 rounded-full bg-brand-golden-yellow/20 border border-brand-golden-yellow/50"
            />

            {/* Hand Gesture Animation */}
            <motion.div
              animate={{
                x: [16, 16, -20, -20, 16],
                scale: [1, 0.85, 0.85, 1, 1],
                opacity: [0, 1, 1, 0, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 0.6,
                times: [0, 0.2, 0.65, 0.85, 1],
                ease: "easeInOut",
              }}
              className="relative text-brand-golden-yellow drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]"
            >
              <Hand className="w-6 h-6" />
            </motion.div>
          </div>

        </div>
        )}

        <div 
          className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-[#0f172a] shadow-2xl custom-scrollbar"
          onScroll={handleScroll}
        >
        {/* Adjusted min-width to ensure it doesn't squash too much on tablet/mobile while keeping it scrollable */}
        <div className="flex min-w-[850px] flex-col font-sans lg:min-w-[1100px]">
          
          {/* --- TOP TIME HEADER ROW --- */}
          <div className="sticky top-0 z-30 flex border-b border-slate-800 bg-[#0f172a]/95">
            {/* Sticky Left Column Header - Scales depending on breakpoint */}
            <div className="sticky left-0 z-40 flex w-[120px] shrink-0 items-center border-r border-slate-800 bg-[#0f172a]/95 p-2 text-xs font-bold text-slate-300 backdrop-blur-md md:w-[180px] md:p-4 md:text-sm lg:w-[240px]">
              EVENTS
            </div>
            
            {/* Time Columns Wrapper */}
            <div className="grid flex-1 grid-cols-[repeat(16,_minmax(0,_1fr))]">
              {timeHeaders.map((th, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center border-r border-slate-800 p-1.5 text-center last:border-r-0 md:p-2"
                  style={{ gridColumn: `span ${th.span}` }}
                >
                  <span className="text-[10px] font-bold text-slate-200 md:text-xs">
                    {th.label.split("-")[0].trim()}
                  </span>
                  <span className="text-[9px] text-slate-400 md:text-[10px]">
                    - {th.label.split("-")[1].trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- EVENT ROWS --- */}
          {scheduleRows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex border-b border-slate-800/60 transition-colors hover:bg-slate-800/30 last:border-b-0"
            >
              {/* Sticky Left Column (Event Name & Icon) */}
              <div className="sticky left-0 z-20 flex w-[120px] shrink-0 items-center gap-1.5 border-r border-slate-800 bg-[#0f172a] p-2 transition-colors group-hover:bg-[#162035] md:w-[180px] md:gap-3 md:p-3 lg:w-[240px]">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-800/50 transition-colors group-hover:bg-blue-500/20 md:h-7 md:w-7">
                  <row.icon className="h-3 w-3 text-blue-400 md:h-4 md:w-4" />
                </div>
                {/* line-clamp prevents massive text overflows on small screens */}
                <span className="line-clamp-2 text-[9px] font-bold uppercase leading-tight tracking-wider text-slate-200 md:text-xs">
                  {row.items[0]?.title || row.title}
                </span>
              </div>

              {/* Matrix Area for the Blocks */}
              <div className="relative grid flex-1 grid-cols-[repeat(16,_minmax(0,_1fr))] gap-1 p-1 md:gap-1.5 md:p-1.5">
                
                {/* Subtle vertical grid lines for the background */}
                <div className="pointer-events-none absolute inset-0 grid grid-cols-[repeat(16,_minmax(0,_1fr))]">
                  {Array.from({ length: 16 }).map((_, colIndex) => (
                    <div
                      key={colIndex}
                      className="h-full border-r border-slate-800/30 last:border-r-0"
                    />
                  ))}
                </div>

                {/* Render the actual schedule blocks */}
                {row.items.map((item, j) => (
                  <div
                    key={j}
                    className={`relative z-10 flex flex-col items-center justify-center rounded text-white shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg p-1.5 md:p-2 md:rounded-md ${item.bg}`}
                    style={{
                      gridColumnStart: item.start,
                      gridColumnEnd: `span ${item.span}`,
                    }}
                  >
                    {/* Time snippet - Sticky left so it slides */}
                    {'time' in item && typeof item.time === 'string' && (
                      <div className="absolute top-1 bottom-1 left-0 right-0 pointer-events-none">
                        <div className="sticky left-1 md:left-2 top-0 flex h-full w-max items-start">
                          <span className="rounded bg-black/25 px-1.5 py-0.5 text-[7px] font-bold text-white/90 backdrop-blur-sm md:text-[9px]">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Location snippet - prominent typography */}
                    {'location' in item && item.location && (
                      <span className="flex items-center justify-center gap-1 text-center text-[9px] font-extrabold tracking-widest text-white md:gap-1.5 md:text-xs">
                        <MapPin className="h-3 w-3 shrink-0 md:h-3.5 md:w-3.5" />
                        <span className="truncate">{item.location}</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
      
      {/* Scrollbar styling for webkit browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
      `}} />
    </section>
  );
}