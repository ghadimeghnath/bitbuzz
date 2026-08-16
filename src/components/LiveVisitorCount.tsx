"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { usePageViewCounter } from "@/hooks/usePageViewCounter";

export default function LiveVisitorCount() {
  const [count, loading] = usePageViewCounter({
    customKey: "bitvisitors",
    onlyCountUniqueVisitors: false,
  });

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
    >
      <div className="bg-brand-navy/90 backdrop-blur-md border-y border-l border-brand-golden-yellow/20 p-2 md:p-2.5 xl:p-3 rounded-l-xl xl:rounded-l-2xl shadow-brand-soft shadow-brand-yellow/10 flex flex-col items-center gap-1 md:gap-1.5 xl:gap-2 group hover:pr-3 md:hover:pr-3.5 xl:hover:pr-4 transition-all duration-300">
        <div className="relative flex items-center justify-center">
          <Users className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-5 xl:h-5 text-brand-golden-yellow group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 md:w-2 md:h-2 xl:w-2.5 xl:h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></span>
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 md:w-2 md:h-2 xl:w-2.5 xl:h-2.5 bg-green-500 rounded-full"></span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="hidden sm:block text-[7px] md:text-[8px] xl:text-[10px] font-brand-small text-brand-cream/70 uppercase tracking-widest leading-none mb-0.5 xl:mb-1 text-center whitespace-nowrap">
            Total Views
          </span>
          <div className="overflow-hidden h-3 md:h-4 xl:h-5">
            <motion.div 
              key={loading ? 'loading' : (count ?? 'empty')}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="font-brand-competition text-[10px] md:text-sm xl:text-base text-brand-white font-bold leading-none"
            >
              {!loading && typeof count === 'number' ? (count as number).toLocaleString() : '...'}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
