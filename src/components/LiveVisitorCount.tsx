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
      <div className="bg-brand-navy/90 backdrop-blur-md border-y border-l border-brand-golden-yellow/20 p-3 rounded-l-2xl shadow-brand-soft shadow-brand-yellow/10 flex flex-col items-center gap-2 group hover:pr-4 transition-all duration-300">
        <div className="relative flex items-center justify-center">
          <Users className="w-5 h-5 text-brand-golden-yellow group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></span>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-brand-small text-brand-cream/70 uppercase tracking-widest leading-none mb-1 text-center whitespace-nowrap">
            Total Views
          </span>
          <div className="overflow-hidden h-5">
            <motion.div 
              key={loading ? 'loading' : (count ?? 'empty')}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="font-brand-competition text-base text-brand-white font-bold leading-none"
            >
              {!loading && typeof count === 'number' ? (count as number).toLocaleString() : '...'}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
