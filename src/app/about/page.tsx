"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Cyber Aesthetic)                                    */
/* -------------------------------------------------------------------------- */
const CONTAINER_OUTER = `polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)`;
const CONTAINER_INNER = `polygon(23px 0, calc(100% - 23px) 0, 100% 23px, 100% calc(100% - 23px), calc(100% - 23px) 100%, 23px 100%, 0 calc(100% - 23px), 0 23px)`;

const IMAGE_OUTER_CLIP = `polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)`;
const IMAGE_INNER_CLIP = `polygon(29px 0, 100% 0, 100% calc(100% - 29px), calc(100% - 29px) 100%, 0 100%, 0 29px)`;

const BTN_OUTER_CLIP = `polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)`;
const BTN_INNER_CLIP = `polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)`;

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-brand-navy pb-32 pt-32 selection:bg-brand-golden-yellow/30 selection:text-brand-golden-yellow"
    >
      <FloatingParticles />
      {/* Background Glows & Accents */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[5%] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-golden-yellow/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] h-[400px] w-[600px] rounded-full bg-brand-orange/5 blur-[120px]" />
        
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-16"
        >
          <Link
            href="/"
            className="group relative inline-block bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1px] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(255,184,0,0.5)] z-10"
            style={{ clipPath: BTN_OUTER_CLIP }}
          >
            <div
              className="flex items-center gap-2 bg-brand-navy px-5 py-2 font-brand-heading text-sm font-bold tracking-widest uppercase text-brand-white transition-colors duration-300 group-hover:bg-brand-golden-yellow group-hover:text-brand-navy"
              style={{ clipPath: BTN_INNER_CLIP }}
            >
              &lt; BACK TO HOME
            </div>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-center lg:mb-24"
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-golden-yellow/60 md:w-32" />
            <span className="font-brand-heading text-xs font-bold uppercase tracking-[0.3em] text-brand-golden-yellow/80 md:text-sm">
              Discover Our Story
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-golden-yellow/60 md:w-32" />
          </div>

          <h1 className="font-brand-event-title text-5xl font-black uppercase tracking-tight text-brand-white sm:text-6xl md:text-7xl lg:text-8xl">
            About <br className="md:hidden" />
            <span className="bg-gradient-to-br from-brand-golden-yellow via-brand-orange to-brand-golden-yellow bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(243,202,32,0.4)]">
              BitBuzz
            </span>
          </h1>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {/* Section 1: Introduction */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 space-y-6 font-brand-body text-lg text-brand-cream/90 lg:order-1"
            >
              <h2 className="font-brand-heading text-2xl font-bold uppercase tracking-wide text-brand-white md:text-3xl">
                The IT Fest of Tomorrow
              </h2>
              <div className="h-px w-24 bg-gradient-to-r from-brand-golden-yellow to-transparent" />
              <p>
                <strong className="font-brand-heading text-xl text-brand-golden-yellow drop-shadow-[0_0_5px_rgba(243,202,32,0.4)] md:text-2xl">
                  BitBuzz 8.0
                </strong>{" "}
                is the eighth edition of the state-level Information Technology Fest organized by the Department of Computer Science of VVM’s Shree Damodar College of Commerce and Economics, Margao.
              </p>
              <p>
                Over the years, BitBuzz has evolved into a vibrant platform that brings together students from different higher secondary schools to showcase their technical knowledge, creativity, problem-solving abilities, teamwork, and competitive spirit.
              </p>
              <p>
                This IT fest is built around a simple idea — technology is not limited to textbooks, classrooms, or examinations. It is a space to explore ideas, experiment with possibilities, solve real-world problems, and create something meaningful.
              </p>
            </motion.div>

            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div
                className="relative bg-gradient-to-br from-brand-golden-yellow/50 to-brand-orange/20 p-[2px] drop-shadow-[0_0_25px_rgba(243,202,32,0.2)]"
                style={{ clipPath: IMAGE_OUTER_CLIP }}
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy"
                  style={{ clipPath: IMAGE_INNER_CLIP }}
                >
                  <Image
                    src="/gallery_4.jpg"
                    alt="Shree Damodar College"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 font-brand-heading text-sm font-bold tracking-widest text-brand-golden-yellow uppercase">
                    The Venue
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 2: The Journey */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="relative bg-gradient-to-bl from-brand-orange/50 to-brand-coral/20 p-[2px] drop-shadow-[0_0_25px_rgba(239,157,16,0.2)]"
                style={{ clipPath: IMAGE_OUTER_CLIP }}
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden bg-brand-navy"
                  style={{ clipPath: IMAGE_INNER_CLIP }}
                >
                  <Image
                    src="/gallery_1.jpg"
                    alt="Students debating"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 font-brand-heading text-sm font-bold tracking-widest text-brand-orange uppercase">
                    The Legacy
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 font-brand-body text-lg text-brand-cream/90"
            >
              <h2 className="font-brand-heading text-2xl font-bold uppercase tracking-wide text-brand-white md:text-3xl">
                The Journey to 8.0
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
            </motion.div>
          </section>

          {/* Section 3: Core Values (Full Width) */}
          <section className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="font-brand-heading text-3xl font-bold uppercase tracking-wide text-brand-white md:text-4xl">
                What BitBuzz 8.0 Stands For
              </h2>
              <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent" />
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Think",
                  desc: "Encourage curiosity, critical thinking, and innovative ideas.",
                  color: "from-brand-golden-yellow to-brand-orange",
                  image: "/gallery_2.jpg",
                },
                {
                  title: "Create",
                  desc: "Turn ideas into solutions through technology, creativity, and teamwork.",
                  color: "from-brand-light-green to-brand-golden-yellow",
                  image: "/gallery_3.jpg",
                },
                {
                  title: "Transform",
                  desc: "Use knowledge and innovation to create meaningful change and new possibilities.",
                  color: "from-brand-coral to-brand-bright-orange",
                  image: "/gallery_5.jpg",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col overflow-hidden bg-brand-white/5 p-[1px] transition-all hover:drop-shadow-[0_0_15px_rgba(243,202,32,0.3)]"
                  style={{ clipPath: BTN_OUTER_CLIP }}
                >
                  <div
                    className="absolute inset-0 z-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-100"
                    style={{ backgroundImage: `var(--tw-gradient-stops)` }}
                  />
                  <div
                    className="relative flex h-full flex-col bg-brand-navy/95"
                    style={{ clipPath: `polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)` }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/50 to-transparent" />
                    </div>
                    
                    <div className="flex flex-1 flex-col p-6 pt-0 text-center">
                      <div className={`mb-4 inline-block bg-gradient-to-br ${item.color} bg-clip-text font-brand-heading text-3xl font-black uppercase tracking-widest text-transparent group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`}>
                        {item.title}.
                      </div>
                      <p className="text-base font-medium leading-relaxed text-brand-cream/80 group-hover:text-brand-white">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Section 4: Conclusion Box */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-r from-brand-golden-yellow/40 via-brand-orange/20 to-brand-golden-yellow/40 p-[2px] drop-shadow-[0_0_20px_rgba(243,202,32,0.15)]"
            style={{ clipPath: CONTAINER_OUTER }}
          >
            <div
              className="relative bg-brand-navy/95 px-6 py-12 text-center backdrop-blur-xl sm:px-10 sm:py-16 md:px-20 md:py-24"
              style={{ clipPath: CONTAINER_INNER }}
            >
              <div className="mx-auto max-w-3xl space-y-10">
                <p className="text-xl font-medium leading-relaxed text-brand-white md:text-2xl">
                  We look forward to welcoming students from across Goa to <strong className="text-brand-golden-yellow font-brand-heading tracking-wider">BitBuzz 8.0</strong>, where knowledge meets creativity, technology meets innovation, and competition meets collaboration.
                </p>
                
                <div className="grid grid-cols-2 gap-4 font-brand-heading text-sm font-bold uppercase tracking-widest text-brand-golden-yellow/90 sm:grid-cols-4 md:text-base">
                  <div className="rounded border border-brand-golden-yellow/20 bg-brand-golden-yellow/5 p-4 transition-colors hover:bg-brand-golden-yellow/10">Come with an idea</div>
                  <div className="rounded border border-brand-golden-yellow/20 bg-brand-golden-yellow/5 p-4 transition-colors hover:bg-brand-golden-yellow/10">Come with a skill</div>
                  <div className="rounded border border-brand-golden-yellow/20 bg-brand-golden-yellow/5 p-4 transition-colors hover:bg-brand-golden-yellow/10">Come with a team</div>
                  <div className="rounded border border-brand-golden-yellow/20 bg-brand-golden-yellow/5 p-4 transition-colors hover:bg-brand-golden-yellow/10">Challenge yourself</div>
                </div>

                <div className="pt-6">
                  <div className="mx-auto mb-6 h-px w-32 bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent" />
                  <p className="font-brand-event-title text-3xl font-black uppercase tracking-widest text-brand-white sm:text-4xl">
                    BitBuzz 8.0 <br className="sm:hidden" />
                    <span className="bg-gradient-to-r from-brand-golden-yellow to-brand-orange bg-clip-text text-transparent">
                      Think. Create. Compete. Connect.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
