"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is BITBUZZ 8.0?",
    answer: "BITBUZZ 8.0 is a state-level IT festival designed for higher secondary students, merging the aesthetics of Minecraft with modern technology to create a unique digital experience.",
  },
  {
    question: "Who can participate?",
    answer: "The event is open to all higher secondary students who have a passion for technology, coding, and creative digital building.",
  },
  {
    question: "Is there a registration fee?",
    answer: "Registration details and fee structures are available on the registration portal. Some events may be free while premium events require a nominal fee.",
  },
  {
    question: "Do I need a Minecraft account?",
    answer: "Yes, for specific events like the Creative Build Blitz and Survival Chaos, a valid Minecraft account is required. However, there are non-gaming technical events as well.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-background py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">
            DATA <span className="text-neon-green">LOGS</span> // FAQ
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border ${isOpen ? "border-neon-green bg-stone/50" : "border-stone bg-charcoal"} transition-colors duration-300 clip-corner`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-bold uppercase tracking-wider ${isOpen ? "text-neon-green text-glow" : "text-white"}`}>
                    {faq.question}
                  </span>
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className={`absolute w-full h-0.5 bg-emerald transition-transform duration-300 ${isOpen ? "rotate-180 bg-neon-green" : ""}`} />
                    <div className={`absolute w-full h-0.5 bg-emerald transition-transform duration-300 ${isOpen ? "rotate-0 opacity-0" : "rotate-90"}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-foreground/80 font-sans leading-relaxed border-t border-emerald/20 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
