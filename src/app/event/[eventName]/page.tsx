import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

import { parseDocxEvent, EventData } from '@/lib/docxParser';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

/* -------------------------------------------------------------------------- */
/*  Clip-Path Definitions (Chamfered Cyber Angles)                            */
/* -------------------------------------------------------------------------- */

const CARD_OUTER_CLIP = `polygon(
  16px 0, calc(100% - 16px) 0,
  100% 16px, 100% calc(100% - 16px),
  calc(100% - 16px) 100%, 16px 100%,
  0 calc(100% - 16px), 0 16px
)`;

const CARD_INNER_CLIP = `polygon(
  15px 0, calc(100% - 15px) 0,
  100% 15px, 100% calc(100% - 15px),
  calc(100% - 15px) 100%, 15px 100%,
  0 calc(100% - 15px), 0 15px
)`;

const BTN_OUTER_CLIP = `polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)`;
const BTN_INNER_CLIP = `polygon(7px 0, calc(100% - 7px) 0, 100% 7px, 100% calc(100% - 7px), calc(100% - 7px) 100%, 7px 100%, 0 calc(100% - 7px), 0 7px)`;

/* -------------------------------------------------------------------------- */
/*  Next.js Server Page & Metadata                                            */
/* -------------------------------------------------------------------------- */

interface PageProps {
  params: Promise<{
    eventName: string;
  }>;
}

const eventsDir = path.join(process.cwd(), 'public/events');

export async function generateStaticParams() {
  if (!fs.existsSync(eventsDir)) return [];
  const files = fs.readdirSync(eventsDir);
  return files.filter(f => f.endsWith('.docx')).map((file) => ({
    eventName: file.replace('.docx', ''),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { eventName } = await params;
  const event = await parseDocxEvent(eventName);
  
  if (!event) return { title: 'Event Not Found' };
  return { title: `${event.title} - Epitome Fest` };
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export default async function EventPage({ params }: PageProps) {
  const { eventName } = await params;

  // Find event matching the dynamic route param via DOCX
  const event = await parseDocxEvent(eventName);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-grid relative bg-brand-navy font-brand-body text-brand-white selection:bg-brand-golden-yellow selection:text-brand-navy overflow-x-hidden">
      <FloatingParticles />

      {/* Glowing top banner background */}
      <div 
        className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-golden-yellow/10 via-brand-navy/5 to-transparent pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 50% -10%, rgba(243, 202, 32, 0.15), transparent)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-8 sm:px-10 sm:py-12">
        
        {/* Cyber Back Button */}
        <div className="mb-4">
          <Link
            href="/"
            className="group relative inline-block bg-gradient-to-r from-brand-golden-yellow via-brand-orange to-brand-golden-yellow p-[1px] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(243,202,32,0.5)] z-10"
            style={{ clipPath: BTN_OUTER_CLIP }}
          >
            <div
              className="flex items-center gap-2 bg-brand-navy px-5 py-2 font-brand-heading text-xs font-bold tracking-widest uppercase text-brand-white transition-colors duration-300 group-hover:bg-brand-golden-yellow group-hover:text-brand-navy"
              style={{ clipPath: BTN_INNER_CLIP }}
            >
              &lt; BACK TO EVENTS
            </div>
          </Link>
        </div>

        {/* Title & Category Header */}
        <div className="relative mt-8 sm:mt-12">
          {/* Dual-Layer Cyber Header Shell */}
          <div
            className="bg-gradient-to-r from-brand-golden-yellow/60 via-brand-orange/40 to-brand-golden-yellow/60 p-[1px] drop-shadow-[0_0_25px_rgba(243,202,32,0.2)]"
            style={{ clipPath: CARD_OUTER_CLIP }}
          >
            <div
              className="relative bg-brand-navy/90 backdrop-blur-md px-6 py-10 sm:py-12 text-center space-y-6 overflow-hidden"
              style={{ clipPath: CARD_INNER_CLIP }}
            >
              {/* Subtle top/bottom glowing beam accents */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-golden-yellow to-transparent opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-golden-yellow/5 via-transparent to-brand-orange/5 opacity-50 pointer-events-none" />

              <h1 className="relative font-brand-heading text-3xl italic font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-brand-golden-yellow to-brand-orange sm:text-6xl drop-shadow-lg tracking-wide">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Section 1: Full DOCX Content Rendering */}
        <section className="relative mt-12">
          {/* Dual-Layer Cyber Container */}
          <div
            className="bg-gradient-to-r from-brand-golden-yellow/40 via-brand-orange/30 to-brand-golden-yellow/40 p-[1px] transition-all duration-300 hover:drop-shadow-[0_0_25px_rgba(243,202,32,0.25)]"
            style={{ clipPath: CARD_OUTER_CLIP }}
          >
            <div
              className="relative bg-brand-navy/90 backdrop-blur-md p-6 sm:p-8 space-y-5"
              style={{ clipPath: CARD_INNER_CLIP }}
            >
              {/* Cyber Indicator Beam */}
              <div className="absolute top-6 left-0 w-1 h-8 bg-brand-golden-yellow shadow-[0_0_10px_rgba(243,202,32,0.8)]" />

              <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider pl-2">
                About This Event
              </h2>

<div 
  className="
    p-3 sm:p-5 space-y-5 font-brand-body text-sm md:text-base leading-relaxed text-brand-white/80
    [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-brand-heading [&_h1]:font-black [&_h1]:uppercase [&_h1]:text-brand-golden-yellow [&_h1]:mt-8 [&_h1]:mb-6 [&_h1]:tracking-wider
    [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-brand-heading [&_h2]:font-black [&_h2]:uppercase [&_h2]:text-brand-golden-yellow [&_h2]:mt-8 [&_h2]:mb-6 [&_h2]:tracking-wider
    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-brand-orange [&_h3]:mt-6 [&_h3]:mb-4
    [&_p]:mb-5 [&_p]:text-brand-white/85 [&_p]:leading-relaxed
    [&_strong]:text-brand-golden-yellow [&_strong]:font-bold
    [&_em]:text-brand-golden-yellow/90 [&_em]:italic
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2.5 [&_ul]:my-5 [&_ul]:text-brand-white/85
    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2.5 [&_ol]:my-5 [&_ol]:text-brand-white/85
    [&_li]:pl-2 [&_li]:py-0.5
    [&_a]:text-brand-golden-yellow [&_a]:underline [&_a]:hover:text-brand-orange [&_a]:transition-colors
    [&_table]:w-full [&_table]:border-collapse [&_table]:my-8 [&_table]:overflow-x-auto [&_table]:block sm:[&_table]:table
    [&_th]:border [&_th]:border-brand-golden-yellow/40 [&_th]:p-3.5 [&_th]:bg-brand-navy/90 [&_th]:text-brand-golden-yellow [&_th]:text-left [&_th]:font-bold
    [&_td]:border [&_td]:border-brand-golden-yellow/20 [&_td]:p-3.5 [&_td]:bg-brand-navy/50 [&_td]:text-brand-white/85
    [&_blockquote]:border-l-4 [&_blockquote]:border-brand-golden-yellow [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-brand-white/75
    [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded [&_img]:border [&_img]:border-brand-golden-yellow/30 [&_img]:my-6
  "
  dangerouslySetInnerHTML={{ __html: event.about }}
/>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}