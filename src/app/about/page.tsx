"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Cyber Aesthetic)                                    */
/* -------------------------------------------------------------------------- */
const CONTAINER_OUTER = `polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)`;
const CONTAINER_INNER = `polygon(23px 0, calc(100% - 23px) 0, 100% 23px, 100% calc(100% - 23px), calc(100% - 23px) 100%, 23px 100%, 0 calc(100% - 23px), 0 23px)`;

const BTN_OUTER_CLIP = `polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)`;
const BTN_INNER_CLIP = `polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)`;

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-navy pb-24 pt-32 selection:bg-brand-golden-yellow/30 selection:text-brand-golden-yellow">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[10%] h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-brand-golden-yellow/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] h-[300px] w-[500px] rounded-full bg-brand-orange/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-brand-heading text-sm font-bold uppercase tracking-widest text-brand-white/60 transition-colors hover:text-brand-golden-yellow"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-golden-yellow/60 md:w-20" />
            <span className="font-brand-heading text-[10px] font-bold uppercase tracking-[0.3em] text-brand-golden-yellow/70 md:text-xs">
              Discover Our Story
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-golden-yellow/60 md:w-20" />
          </div>

          <h1 className="font-brand-event-title text-4xl font-black uppercase tracking-tight text-brand-white sm:text-5xl md:text-6xl lg:text-7xl">
            About <span className="bg-gradient-to-br from-brand-golden-yellow via-brand-orange to-brand-golden-yellow bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(243,202,32,0.3)]">BitBuzz</span>
          </h1>
        </motion.div>

        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative bg-gradient-to-br from-brand-golden-yellow/40 via-brand-orange/20 to-brand-golden-yellow/40 p-[2px] drop-shadow-[0_0_20px_rgba(243,202,32,0.1)]"
          style={{ clipPath: CONTAINER_OUTER }}
        >
          {/* Cyber accents for outer container */}
          <div className="absolute -left-1 -top-1 h-3 w-3 bg-brand-golden-yellow" />
          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-brand-orange" />

          <div
            className="relative bg-brand-navy/95 px-6 py-10 backdrop-blur-xl sm:px-10 sm:py-14 md:px-16 md:py-16"
            style={{ clipPath: CONTAINER_INNER }}
          >
            <div className="space-y-12 font-brand-body text-brand-cream/90 md:text-lg md:leading-relaxed">
              
              {/* Introduction Section */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p>
                  <strong className="text-brand-golden-yellow font-brand-heading text-xl md:text-2xl drop-shadow-[0_0_5px_rgba(243,202,32,0.4)]">BitBuzz 8.0</strong> is the eighth edition of the state-level Information Technology Fest organized by the Department of Computer Science of VVM’s Shree Damodar College of Commerce and Economics, Margao. Over the years, BitBuzz has evolved into a vibrant platform that brings together students from different higher secondary schools to showcase their technical knowledge, creativity, problem-solving abilities, teamwork, and competitive spirit.
                </p>
                <p>
                  This IT fest is built around a simple idea — technology is not limited to textbooks, classrooms, or examinations. It is a space to explore ideas, experiment with possibilities, solve real-world problems, and create something meaningful. BitBuzz provides students with an environment where they can put their knowledge into practice while interacting and competing with like-minded students from across the state.
                </p>
                <p>
                  The primary purpose of organizing BitBuzz is to provide students with a platform to explore and experience Information Technology beyond the conventional classroom environment. Through a combination of technical competitions, problem-solving challenges, interactive activities, gaming, and creative events, the fest encourages participants to discover their strengths and develop skills that are essential for their academic, professional, and personal growth.
                </p>
              </motion.section>

              {/* The Journey Section */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="font-brand-heading text-2xl font-bold uppercase tracking-wide text-brand-white md:text-3xl">
                  The Journey to BitBuzz 8.0
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-brand-orange to-transparent" />
                <p>
                  With every edition, BitBuzz strives to introduce something new while retaining the core spirit of technology, creativity, and collaboration. The journey from its earlier editions to BitBuzz 8.0 reflects the continuous efforts of the organizers and students to make the fest more engaging, relevant, and exciting.
                </p>
                <p>
                  Each edition provides an opportunity to learn from the previous one, understand changing student interests, explore emerging technologies, and introduce activities that encourage participation across different skill levels.
                </p>
                <p>
                  BitBuzz 8.0 carries this legacy forward with a renewed focus on creating an experience that is not only competitive but also enjoyable, interactive, and memorable for every participant.
                </p>
              </motion.section>

              {/* Core Values Section */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <h2 className="font-brand-heading text-2xl font-bold uppercase tracking-wide text-brand-white md:text-3xl">
                  What BitBuzz 8.0 Stands For
                </h2>
                <div className="h-px w-24 bg-gradient-to-r from-brand-orange to-transparent" />
                
                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    { title: "Think", desc: "Encourage curiosity, critical thinking, and innovative ideas.", color: "from-brand-golden-yellow to-brand-orange" },
                    { title: "Create", desc: "Turn ideas into solutions through technology, creativity, and teamwork.", color: "from-brand-light-green to-brand-golden-yellow" },
                    { title: "Transform", desc: "Use knowledge and innovation to create meaningful change and new possibilities.", color: "from-brand-coral to-brand-bright-orange" }
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      whileHover={{ y: -5 }}
                      className="group relative overflow-hidden bg-brand-white/5 p-6 border border-brand-white/10 transition-colors hover:border-brand-golden-yellow/50"
                      style={{ clipPath: BTN_OUTER_CLIP }}
                    >
                      <div className={`mb-3 inline-block bg-gradient-to-br ${item.color} bg-clip-text font-brand-heading text-2xl font-black uppercase tracking-widest text-transparent`}>
                        {item.title}.
                      </div>
                      <p className="text-sm font-medium leading-relaxed text-brand-cream/80 group-hover:text-brand-white">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Conclusion Section */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-sm bg-gradient-to-r from-brand-golden-yellow/10 to-transparent p-6 sm:p-8 border-l-4 border-brand-golden-yellow space-y-6"
              >
                <p className="text-lg font-medium text-brand-white">
                  We look forward to welcoming students from across Goa to <strong className="text-brand-golden-yellow font-brand-heading tracking-wider">BitBuzz 8.0</strong>, where knowledge meets creativity, technology meets innovation, and competition meets collaboration.
                </p>
                <div className="space-y-2 font-brand-heading text-xl font-bold uppercase tracking-wide text-brand-golden-yellow/90">
                  <p>Come with an idea.</p>
                  <p>Come with a skill.</p>
                  <p>Come with a team.</p>
                  <p>Come ready to challenge yourself.</p>
                </div>
                <p className="font-brand-event-title text-2xl font-black uppercase tracking-widest text-brand-white pt-4">
                  BitBuzz 8.0 — <span className="text-brand-golden-yellow">Think. Create. Compete. Connect.</span>
                </p>
              </motion.section>

            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
