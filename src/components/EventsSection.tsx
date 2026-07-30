"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const baseEvents = [
  { title: "AI Lab", category: "Machine Learning", difficulty: "Hard", image: "/event_ai_1785160115853.png", colorCls: { text: "text-brand-light-green", bg: "bg-brand-light-green", border: "border-brand-light-green", hoverBg: "hover:bg-brand-light-green" } },
  { title: "Code Arena", category: "Algorithm", difficulty: "Medium", image: "/event_coding_1785160138095.png", colorCls: { text: "text-brand-coral", bg: "bg-brand-coral", border: "border-brand-coral", hoverBg: "hover:bg-brand-coral" } },
  { title: "Cyber Vault", category: "Security", difficulty: "Hard", image: "/event_cyber_1785160263055.png", colorCls: { text: "text-brand-mustard-yellow", bg: "bg-brand-mustard-yellow", border: "border-brand-mustard-yellow", hoverBg: "hover:bg-brand-mustard-yellow" } },
  { title: "Robotics Factory", category: "Hardware", difficulty: "Expert", image: "/event_robotics_1785160294163.png", colorCls: { text: "text-brand-orange", bg: "bg-brand-orange", border: "border-brand-orange", hoverBg: "hover:bg-brand-orange" } },
  { title: "Gaming Arena", category: "E-Sports", difficulty: "Medium", image: "/event_gaming_1785160312866.png", colorCls: { text: "text-brand-bright-orange", bg: "bg-brand-bright-orange", border: "border-brand-bright-orange", hoverBg: "hover:bg-brand-bright-orange" } },
  { title: "Enchanted Quiz", category: "Knowledge", difficulty: "Easy", image: "/event_quiz_1785160445597.png", colorCls: { text: "text-brand-lime-yellow", bg: "bg-brand-lime-yellow", border: "border-brand-lime-yellow", hoverBg: "hover:bg-brand-lime-yellow" } },
];

// Duplicate to create 18 cards for the wheel
const events = [...baseEvents, ...baseEvents, ...baseEvents].map((e, i) => ({
  ...e,
  id: `0${i + 1}`.slice(-2),
}));

export default function EventsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="events" className="relative w-full h-[600vh] bg-brand-navy">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block">
          <h2 className="text-6xl lg:text-8xl font-brand-heading font-bold text-brand-white tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 opacity-20">
            MC <span className="text-brand-golden-yellow">Events</span>
          </h2>
        </div>

        <div className="relative w-full h-full flex items-center justify-center z-20">
          {events.map((event, index) => (
            <WheelCard
              key={index}
              event={event}
              index={index}
              scrollYProgress={scrollYProgress}
              totalCards={events.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function WheelCard({ event, index, scrollYProgress, totalCards }: { event: any, index: number, scrollYProgress: any, totalCards: number }) {
  const theta = 360 / totalCards;
  const baseAngle = index * theta;

  // Sweep matches the deck's actual angular span (not a full 360)
  const globalRotation = useTransform(scrollYProgress, [0, 1], [0, (totalCards - 1) * theta]);

  const rotate = useTransform(globalRotation, (v) => baseAngle - v);

  // NOTE: no modulo/wrap here anymore — "rotate" itself is used directly below.
  // Each card's angle crosses 0 exactly once across the whole scroll, in order,
  // so there's no way for card 18 to appear before card 1 or vice versa.

  const opacity = useTransform(rotate, (angle) => {
    const threshold = 35;
    if (Math.abs(angle) < threshold) {
      return 1 - (Math.abs(angle) / threshold);
    }
    return 0;
  });

  const zIndex = useTransform(rotate, (angle) => 100 - Math.round(Math.abs(angle)));
  const pointerEvents = useTransform(opacity, (v) => v > 0.5 ? "auto" : "none") as any;

  return (
    <>

    <div className="absolute top-1/2 left-1/2 w-full max-w-[92%] sm:max-w-xl md:max-w-2xl lg:max-w-4xl -translate-x-1/2 -translate-y-1/2 pointer-events-none flex justify-center md:pl-24">
      <motion.div
        style={{ 
          rotate, 
          opacity, 
          zIndex, 
          pointerEvents,
          transformOrigin: "clamp(-1250px, calc(-1400px + 40vw), -900px) 50%" 
        }}
        className="will-change-transform pointer-events-auto w-full"
      >
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
                <div className="group relative bg-brand-navy/90 backdrop-blur-md border border-brand-golden-yellow/30 hover:border-brand-golden-yellow transition-all duration-500 overflow-hidden rounded flex flex-col sm:flex-row shadow-brand-soft hover:shadow-brand-yellow w-full">
          <div className="absolute inset-0 border border-brand-golden-yellow/20 scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto border-b sm:border-b-0 sm:border-r border-brand-golden-yellow/30 overflow-hidden bg-black shrink-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
            />
          </div>

          <div className="p-5 md:p-8 flex flex-col flex-grow bg-brand-navy relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded shrink-0 ${event.colorCls.bg}`} />
                <span className="font-brand-competition text-lg md:text-2xl font-bold text-brand-white tracking-widest">
                  {event.title}
                </span>
              </div>
              <span className={`font-brand-heading font-bold opacity-80 text-xl md:text-2xl ${event.colorCls.text}`}>
                #{event.id}
              </span>
            </div>

            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className={`font-brand-heading font-bold text-[10px] md:text-xs uppercase tracking-widest shrink-0 ${event.colorCls.text}`}>
                {event.category}
              </span>
            </div>

            <p className="text-brand-white/70 font-brand-body text-[10px] md:text-xs mb-6 line-clamp-2 md:line-clamp-3">
              Initiate protocol {event.id}. Prepare your systems for the {event.title} challenge within the arena.
              Success requires strategy.
            </p>

            <button className={`mt-auto w-full py-2 md:py-3 border ${event.colorCls.border} ${event.colorCls.text} font-brand-heading text-xs md:text-sm font-bold tracking-widest uppercase ${event.colorCls.hoverBg} hover:text-brand-navy transition-colors rounded`}>
              [ View More ]
            </button>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
}