import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// Interfaces for Event Data
interface Coordinator {
  name: string;
  phone?: string;
}

interface EventData {
  slug: string;
  title: string;
  category: string;
  about: string;
  date: string;
  teamSize: string;
  rules: string[];
  studentCoordinators: Coordinator[];
  staffCoordinators: Coordinator[];
}

interface PageProps {
  params: Promise<{
    eventName: string;
  }>;
}

const eventsDir = path.join(process.cwd(), 'src/data/events');

function getEvent(slug: string): EventData | null {
  const filePath = path.join(eventsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function generateStaticParams() {
  const files = fs.readdirSync(eventsDir);
  return files.filter(f => f.endsWith('.json')).map((file) => ({
    eventName: file.replace('.json', ''),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { eventName } = await params;
  const event = getEvent(eventName);
  
  if (!event) return { title: 'Event Not Found' };
  return { title: `${event.title} - Epitome Fest` };
}

export default async function EventPage({ params }: PageProps) {
  const { eventName } = await params;

  // Find event matching the dynamic dynamic route param
  const event = getEvent(eventName);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-grid relative bg-brand-navy font-brand-body text-brand-white selection:bg-brand-golden-yellow selection:text-brand-navy overflow-x-hidden">
      {/* Enhanced glowing top banner */}
      <div 
        className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-golden-yellow/10 via-brand-navy/5 to-transparent pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 50% -10%, rgba(255, 184, 0, 0.15), transparent)`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 py-8 space-y-8 sm:px-10 sm:py-12">
        
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded border border-brand-golden-yellow/40 bg-brand-navy/80 backdrop-blur-sm text-brand-white hover:bg-brand-golden-yellow hover:text-brand-navy text-xs font-brand-heading font-bold tracking-widest uppercase transition-all shadow-brand-soft hover:shadow-brand-yellow"
          >
            &lt; BACK TO EVENTS
          </Link>
        </div>

        {/* Title & Category Header */}
        <div className="relative mt-8 sm:mt-12">
          {/* Decorative corner marks for the title */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-golden-yellow opacity-70" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-golden-yellow opacity-70" />
          
          <div className="rounded shadow-[0_0_30px_rgba(255,184,0,0.1)] relative border border-brand-golden-yellow/40 bg-brand-navy/70 backdrop-blur-md px-6 py-10 sm:py-12 text-center space-y-6 overflow-hidden">
            {/* Subtle animated glow inside */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-golden-yellow/5 to-transparent opacity-50" />
            
            <h1 className="relative font-brand-heading text-3xl italic font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-brand-golden-yellow to-brand-orange sm:text-6xl drop-shadow-lg tracking-wide">
              {event.title}
            </h1>
            <div className="relative inline-block">
              <span className="inline-block border-2 border-brand-orange bg-brand-orange/10 text-brand-orange text-xs sm:text-sm px-4 py-1.5 rounded font-brand-body tracking-widest uppercase font-bold shadow-[0_0_10px_rgba(255,107,0,0.2)]">
                {event.category}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: About This Event */}
        <section className="group relative mt-12 border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-5 transition-all duration-300 hover:border-brand-golden-yellow/60 hover:shadow-[0_0_25px_rgba(255,184,0,0.15)] hover:bg-brand-navy/60">
          <div className="absolute top-6 left-0 w-1 h-8 bg-brand-golden-yellow rounded-r shadow-[0_0_10px_rgba(255,184,0,0.8)]" />
          
          <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider">
            About This Event
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-brand-white/80 font-brand-body">
            {event.about}
          </p>
        </section>

        {/* Section 2: Event Details */}
        <section className="group relative mt-10 border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-5 transition-all duration-300 hover:border-brand-light-green/60 hover:shadow-[0_0_25px_rgba(9,209,199,0.15)] hover:bg-brand-navy/60">
          <div className="absolute top-6 right-0 w-1 h-8 bg-brand-light-green rounded-l shadow-[0_0_10px_rgba(9,209,199,0.8)]" />
          
          <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-light-green tracking-wider">
            Event Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-sm md:text-base font-brand-body text-brand-white/90">
            <div className="bg-brand-navy/60 border border-brand-light-green/20 p-4 rounded-sm flex flex-col justify-center">
              <strong className="block text-brand-light-green/60 uppercase text-xs tracking-widest mb-1">Date</strong> 
              <span className="font-bold text-brand-white text-lg">{event.date}</span>
            </div>
            <div className="bg-brand-navy/60 border border-brand-light-green/20 p-4 rounded-sm flex flex-col justify-center">
              <strong className="block text-brand-light-green/60 uppercase text-xs tracking-widest mb-1">Team Size</strong> 
              <span className="font-bold text-brand-white text-lg">{event.teamSize}</span>
            </div>
            <div className="bg-brand-navy/60 border border-brand-light-green/20 p-4 rounded-sm flex flex-col justify-center md:col-span-1">
              <strong className="block text-brand-light-green/60 uppercase text-xs tracking-widest mb-1">Category</strong> 
              <span className="font-bold text-brand-white text-lg">{event.category}</span>
            </div>
          </div>
        </section>

        {/* Section 3: Event Rules */}
        <section className="group relative mt-10 border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-5 transition-all duration-300 hover:border-brand-orange/60 hover:shadow-[0_0_25px_rgba(255,107,0,0.15)] hover:bg-brand-navy/60">
          <div className="absolute top-6 left-0 w-1 h-8 bg-brand-orange rounded-r shadow-[0_0_10px_rgba(255,107,0,0.8)]" />
          
          <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-orange tracking-wider">
            Event Rules
          </h2>
          <ul className="space-y-4 text-sm md:text-base text-brand-white/80 font-brand-body leading-relaxed">
            {event.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.8)]" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Section 4: Student Coordinators */}
          <section className="group relative border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-5 transition-all duration-300 hover:border-brand-golden-yellow/60 hover:shadow-[0_0_25px_rgba(255,184,0,0.15)] hover:bg-brand-navy/60">
            <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider">
              Student Coordinators
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {event.studentCoordinators.map((coordinator, idx) => (
                <div
                  key={idx}
                  className="group/card flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-brand-navy/60 border border-brand-golden-yellow/20 rounded-lg p-4 font-brand-body text-sm transition-all hover:bg-brand-golden-yellow/10 hover:border-brand-golden-yellow/50"
                >
                  <div className="text-brand-white font-bold group-hover/card:text-brand-golden-yellow transition-colors">{coordinator.name}</div>
                  {coordinator.phone && (
                    <div className="text-brand-white/50 text-xs tracking-wider">
                      {coordinator.phone}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Staff Coordinators */}
          <section className="group relative border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-5 transition-all duration-300 hover:border-brand-golden-yellow/60 hover:shadow-[0_0_25px_rgba(255,184,0,0.15)] hover:bg-brand-navy/60">
            <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider">
              Staff Coordinators
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {event.staffCoordinators.map((coordinator, idx) => (
                <div
                  key={idx}
                  className="group/card flex items-center justify-between bg-brand-navy/60 border border-brand-golden-yellow/20 rounded-lg p-4 font-brand-body text-sm transition-all hover:bg-brand-golden-yellow/10 hover:border-brand-golden-yellow/50"
                >
                  <div className="text-brand-white font-bold group-hover/card:text-brand-golden-yellow transition-colors">{coordinator.name}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}