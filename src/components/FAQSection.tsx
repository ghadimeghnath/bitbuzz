"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqColors = [
  { text: "text-brand-golden-yellow", border: "border-brand-golden-yellow", borderOp: "border-brand-golden-yellow/30", bg: "bg-brand-golden-yellow", bgOp: "bg-brand-golden-yellow/70", shadow: "shadow-lg shadow-brand-golden-yellow/20" },
  { text: "text-brand-light-green", border: "border-brand-light-green", borderOp: "border-brand-light-green/30", bg: "bg-brand-light-green", bgOp: "bg-brand-light-green/70", shadow: "shadow-lg shadow-brand-light-green/20" },
  { text: "text-brand-coral", border: "border-brand-coral", borderOp: "border-brand-coral/30", bg: "bg-brand-coral", bgOp: "bg-brand-coral/70", shadow: "shadow-lg shadow-brand-coral/20" },
  { text: "text-brand-bright-orange", border: "border-brand-bright-orange", borderOp: "border-brand-bright-orange/30", bg: "bg-brand-bright-orange", bgOp: "bg-brand-bright-orange/70", shadow: "shadow-lg shadow-brand-bright-orange/20" },
];

const faqs = [
  {
    question: "What is BITBUZZ 8.0?",
    answer: "BITBUZZ 8.0 is a state-level IT festival designed for higher secondary students, merging modern aesthetics with cutting edge technology to create a unique digital experience.",
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
    question: "Do I need special accounts to participate?",
    answer: "Some events might have specific prerequisites which will be mentioned in their respective guidelines. Ensure you read the instructions carefully before registering.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full bg-brand-navy py-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-brand-heading font-bold uppercase tracking-widest text-brand-white">
            DATA <span className="text-brand-golden-yellow">LOGS</span> // FAQ
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const color = faqColors[index % faqColors.length];
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border ${isOpen ? `${color.border} bg-brand-navy/80 ${color.shadow}` : `${color.borderOp} bg-brand-navy shadow-brand-soft`} transition-all duration-300 rounded`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`text-lg font-brand-heading font-bold tracking-wider ${isOpen ? color.text : "text-brand-white"}`}>
                    {faq.question}
                  </span>
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <div className={`absolute w-full h-0.5 transition-transform duration-300 ${isOpen ? `rotate-180 ${color.bg}` : color.bgOp}`} />
                    <div className={`absolute w-full h-0.5 transition-transform duration-300 ${isOpen ? `rotate-0 opacity-0 ${color.bg}` : `rotate-90 ${color.bgOp}`}`} />
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
                      <div className={`p-6 pt-0 text-brand-white/80 font-brand-body leading-relaxed border-t ${color.borderOp} mt-2`}>
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
