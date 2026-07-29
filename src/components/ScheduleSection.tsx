"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const schedule = [
  { time: "09:00 AM", title: "System Initialization", type: "Registration" },
  { time: "10:30 AM", title: "Keynote: The Digital Frontier", type: "Main Stage" },
  { time: "12:00 PM", title: "Block Battle Royale", type: "Arena", current: true },
  { time: "02:00 PM", title: "Creative Build Blitz", type: "Workshop" },
  { time: "05:00 PM", title: "Final Showdown & Awards", type: "Main Stage" },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative w-full min-h-[800px] bg-charcoal py-32 px-6 md:px-12 flex items-center justify-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/schedule_bg_1785160513858.png" 
          alt="Command Center" 
          fill
          className="object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
        <div className="absolute inset-0 scanlines opacity-50" />
      </div>
      
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block border border-neon-green/30 bg-charcoal/80 p-4 backdrop-blur-sm clip-corner box-glow">
             <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-widest text-white">
               TIMETABLE // <span className="text-neon-green">SYNC</span>
             </h2>
          </div>
        </motion.div>

        <div className="bg-charcoal/90 border border-emerald/40 backdrop-blur-md p-8 md:p-12 clip-corner relative max-w-4xl mx-auto shadow-[0_0_50px_rgba(124,255,79,0.1)]">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50" />
           
           <div className="space-y-8">
             {schedule.map((item, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
                 viewport={{ once: true, margin: "-50px" }}
                 className={`relative flex items-center gap-6 group ${item.current ? 'opacity-100' : 'opacity-70 hover:opacity-100 transition-opacity'}`}
               >
                 {/* Timeline Circuit Trace */}
                 <div className="relative flex flex-col items-center">
                    <div className={`w-3 h-3 rotate-45 border-2 ${item.current ? 'border-neon-green bg-neon-green box-glow' : 'border-emerald bg-charcoal group-hover:border-neon-green'}`} />
                    {index !== schedule.length - 1 && (
                      <div className={`absolute top-3 w-px h-16 ${item.current ? 'bg-neon-green' : 'bg-emerald/30 group-hover:bg-emerald'}`} />
                    )}
                 </div>

                 <div className="flex-1 bg-stone/50 border border-emerald/20 p-4 clip-corner flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:border-neon-green/50 transition-colors">
                    <div>
                      <h4 className={`text-lg md:text-xl font-heading font-bold uppercase tracking-wide ${item.current ? 'text-neon-green text-glow' : 'text-white'}`}>
                        {item.title}
                      </h4>
                      <div className="text-emerald font-mono text-xs uppercase tracking-widest mt-1">
                        LOC: {item.type}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       <span className="font-mono text-sm font-bold text-white tracking-widest bg-charcoal px-3 py-1 border border-emerald/30">
                         {item.time}
                       </span>
                       {item.current && (
                         <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse box-glow" />
                       )}
                    </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
}
