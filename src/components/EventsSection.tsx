"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const baseEvents = [
  {
    title: "AI Lab",
    category: "Machine Learning",
    difficulty: "Hard",
    image: "/event_ai_1785160115853.png",
  },
  {
    title: "Code Arena",
    category: "Algorithm",
    difficulty: "Medium",
    image: "/event_coding_1785160138095.png",
  },
  {
    title: "Cyber Vault",
    category: "Security",
    difficulty: "Hard",
    image: "/event_cyber_1785160263055.png",
  },
  {
    title: "Robotics Factory",
    category: "Hardware",
    difficulty: "Expert",
    image: "/event_robotics_1785160294163.png",
  },
  {
    title: "Gaming Arena",
    category: "E-Sports",
    difficulty: "Medium",
    image: "/event_gaming_1785160312866.png",
  },
  {
    title: "Enchanted Quiz",
    category: "Knowledge",
    difficulty: "Easy",
    image: "/event_quiz_1785160445597.png",
  }
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
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="events" className="relative w-full h-[600vh] bg-background">
      {/* Pinned Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
      
        {/* Section Title */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden md:block">
           <h2 className="text-6xl lg:text-8xl font-heading font-bold text-white tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 opacity-20">
            MC <span className="text-neon-green text-glow">Events</span>
          </h2>
        </div>

        {/* The Wheel */}
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
  // 1. Calculate base angles
  const theta = 360 / totalCards;
  const baseAngle = index * theta;

  // 2. Map scroll progress (0 to 1) to global rotation (0 to 360 minus one step)
  const globalRotation = useTransform(scrollYProgress, [0, 1], [0, 360 - theta]);

  // 3. Current rotation for this specific card (Smooth, no snap)
  const rotate = useTransform(globalRotation, (v) => baseAngle - v);

  // 4. Normalize the angle between -180 and 180 degrees to handle visibility
  const normalizedAngle = useTransform(rotate, (angle) => {
    let norm = ((angle % 360) + 360) % 360;
    if (norm > 180) norm -= 360;
    return norm;
  });

  // 5. Visibility logic
  const opacity = useTransform(normalizedAngle, (angle) => {
    const threshold = 35;
    if (Math.abs(angle) < threshold) {
      return 1 - (Math.abs(angle) / threshold);
    }
    return 0;
  });

  // Keep cards closest to the center on top of the z-index stack
  const zIndex = useTransform(normalizedAngle, (angle) => 100 - Math.round(Math.abs(angle)));
  
  // Disable interactions for invisible cards
  const pointerEvents = useTransform(opacity, (v) => v > 0.5 ? "auto" : "none") as any;

  return (
    <div className="absolute top-1/2 left-1/2 w-full max-w-[92%] sm:max-w-xl md:max-w-2xl lg:max-w-4xl -translate-x-1/2 -translate-y-1/2 pointer-events-none flex justify-center md:pl-24">
      <motion.div
        style={{ 
          rotate, 
          opacity, 
          zIndex, 
          pointerEvents,
          // THE FIX: Inverse scaling math. 
          // Evaluates to ~ -1250px on Mobile (creates enough space for tall flex-col cards).
          // Evaluates to ~ -900px on Desktop (tightens the gap for shorter flex-row cards).
          transformOrigin: "clamp(-1250px, calc(-1400px + 40vw), -900px) 50%" 
        }}
        className="will-change-transform pointer-events-auto w-full"
      >
        <div className="group relative bg-stone/90 backdrop-blur-md border-2 border-emerald/30 hover:border-neon-green transition-all duration-500 overflow-hidden clip-corner flex flex-col sm:flex-row box-glow w-full shadow-2xl">
          {/* Circuit overlay */}
          <div className="absolute inset-0 border border-neon-green/20 scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Artwork */}
          <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto border-b-2 sm:border-b-0 sm:border-r-2 border-charcoal overflow-hidden bg-black shrink-0">
            <Image 
              src={event.image}
              alt={event.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-5 md:p-8 flex flex-col flex-grow bg-charcoal relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 md:w-5 md:h-5 bg-neon-green clip-corner-reverse shrink-0" />
                <span className="font-heading font-pixel-title text-lg md:text-2xl font-bold text-white tracking-widest">{event.title}</span>
              </div>
              <span className="text-emerald font-heading font-bold opacity-30 text-xl md:text-2xl">#{event.id}</span>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <span className="text-emerald font-mono text-[10px] md:text-xs uppercase tracking-widest shrink-0">{event.category}</span>
            </div>
            
            <p className="text-white/60 font-pixel-body text-[10px] md:text-xs mb-6 line-clamp-2 md:line-clamp-3">
              Initiate protocol {event.id}. Prepare your systems for the {event.title} challenge within the voxel arena. Survival is not guaranteed.
            </p>

            <button className="mt-auto w-full py-2 md:py-3 border border-neon-green text-neon-green font-mono text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-neon-green hover:text-charcoal transition-colors clip-corner group-hover:box-glow">
              [ View More ]
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}