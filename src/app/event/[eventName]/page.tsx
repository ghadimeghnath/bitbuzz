import Link from 'next/link';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

import { parseDocxEvent, EventData } from '@/lib/docxParser';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

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
  return { title: `${event.title} - BitBuzz` };
}

// ─── Small reusable section wrapper ────────────────────────────────────────────
function Section({
  accentLeft,
  accentRight,
  accentColor,
  shadowColor,
  hoverBorderColor,
  children,
}: {
  accentLeft?: boolean;
  accentRight?: boolean;
  accentColor: string;
  shadowColor: string;
  hoverBorderColor: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`group relative mt-10 border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-5 transition-all duration-300 ${hoverBorderColor} ${shadowColor} hover:bg-brand-navy/60`}
    >
      {accentLeft && (
        <div className={`absolute top-6 left-0 w-1 h-8 ${accentColor} rounded-r`} />
      )}
      {accentRight && (
        <div className={`absolute top-6 right-0 w-1 h-8 ${accentColor} rounded-l`} />
      )}
      {children}
    </section>
  );
}

export default async function EventPage({ params }: PageProps) {
  const { eventName } = await params;

  const event = await parseDocxEvent(eventName);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-grid relative bg-brand-navy font-brand-body text-brand-white selection:bg-brand-golden-yellow selection:text-brand-navy overflow-x-hidden">
      <FloatingParticles />

      {/* Glowing top banner */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-brand-golden-yellow/10 via-brand-navy/5 to-transparent pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 50% -10%, rgba(255, 184, 0, 0.15), transparent)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-0 sm:px-10 sm:py-12">

        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2 rounded border border-brand-golden-yellow/40 bg-brand-navy backdrop-blur-sm text-brand-white hover:bg-brand-golden-yellow hover:text-brand-navy text-xs font-brand-heading font-bold tracking-widest uppercase transition-all shadow-brand-soft hover:shadow-brand-yellow z-10"
          >
            &#8249; BACK TO EVENTS
          </Link>
        </div>

        {/* ── Title & Category Header ───────────────────────────────────────── */}
        <div className="relative mt-8 sm:mt-12">
          {/* Decorative corner marks */}
          <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-golden-yellow opacity-70" />
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-golden-yellow opacity-70" />

          <div className="rounded shadow-[0_0_30px_rgba(255,184,0,0.1)] relative border border-brand-golden-yellow/40 bg-brand-navy/70 backdrop-blur-md px-6 py-10 sm:py-12 text-center space-y-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-golden-yellow/5 to-transparent opacity-50" />

            <h1 className="relative font-brand-heading text-3xl italic font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-brand-white via-brand-golden-yellow to-brand-orange sm:text-6xl drop-shadow-lg tracking-wide">
              {event.title}
            </h1>

            {/* Category badge */}
            {event.category && event.category !== 'GENERAL' && (
              <div className="relative inline-block">
                <span className="inline-block border-2 border-brand-orange bg-brand-orange/10 text-brand-orange text-xs sm:text-sm px-4 py-1.5 rounded font-brand-body tracking-widest uppercase font-bold shadow-[0_0_10px_rgba(255,107,0,0.2)]">
                  {event.category}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Event Details Card ────────────────────────────────────────────── */}
        <Section
          accentRight
          accentColor="bg-brand-light-green"
          shadowColor="hover:shadow-[0_0_25px_rgba(9,209,199,0.15)]"
          hoverBorderColor="hover:border-brand-light-green/60"
        >
          <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-light-green tracking-wider">
            Event Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm md:text-base font-brand-body">
            <div className="bg-brand-navy/60 border border-brand-light-green/20 p-4 rounded-sm flex flex-col justify-center">
              <span className="block text-brand-light-green/60 uppercase text-xs tracking-widest mb-1 font-bold">Type</span>
              <span className="font-bold text-brand-white text-base leading-snug">{event.category}</span>
            </div>
            <div className="bg-brand-navy/60 border border-brand-light-green/20 p-4 rounded-sm flex flex-col justify-center">
              <span className="block text-brand-light-green/60 uppercase text-xs tracking-widest mb-1 font-bold">Participants</span>
              <span className="font-bold text-brand-white text-base leading-snug">{event.teamSize}</span>
            </div>
            <div className="bg-brand-navy/60 border border-brand-light-green/20 p-4 rounded-sm flex flex-col justify-center">
              <span className="block text-brand-light-green/60 uppercase text-xs tracking-widest mb-1 font-bold">Rounds</span>
              <span className="font-bold text-brand-white text-base leading-snug">{event.rounds}</span>
            </div>
          </div>
        </Section>

        {/* ── About This Event ──────────────────────────────────────────────── */}
        {event.about && (
          <Section
            accentLeft
            accentColor="bg-brand-golden-yellow shadow-[0_0_10px_rgba(255,184,0,0.8)]"
            shadowColor="hover:shadow-[0_0_25px_rgba(255,184,0,0.15)]"
            hoverBorderColor="hover:border-brand-golden-yellow/60"
          >
            <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider">
              About This Event
            </h2>
            <div
              className="
                font-brand-body text-sm md:text-base leading-relaxed text-brand-white/80 space-y-4
                [&_h1]:text-2xl [&_h1]:sm:text-3xl [&_h1]:font-brand-heading [&_h1]:font-black [&_h1]:uppercase [&_h1]:text-brand-golden-yellow [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:tracking-wider
                [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-brand-heading [&_h2]:font-black [&_h2]:uppercase [&_h2]:text-brand-golden-yellow [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:tracking-wider
                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-brand-orange [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:mb-3 [&_p]:text-brand-white/80
                [&_strong]:text-brand-golden-yellow [&_strong]:font-bold
                [&_em]:text-brand-golden-yellow/90 [&_em]:italic
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:my-3 [&_ul]:text-brand-white/80
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_ol]:my-3 [&_ol]:text-brand-white/80
                [&_li]:pl-1
                [&_a]:text-brand-golden-yellow [&_a]:underline [&_a]:hover:text-brand-orange [&_a]:transition-colors
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                [&_th]:border [&_th]:border-brand-golden-yellow/40 [&_th]:p-3 [&_th]:bg-brand-navy/90 [&_th]:text-brand-golden-yellow [&_th]:text-left [&_th]:font-bold
                [&_td]:border [&_td]:border-brand-golden-yellow/20 [&_td]:p-3 [&_td]:bg-brand-navy/50 [&_td]:text-brand-white/80
              "
              dangerouslySetInnerHTML={{ __html: event.about }}
            />
          </Section>
        )}

        {/* ── Rules & Regulations ───────────────────────────────────────────── */}
        {event.rules.length > 0 && (
          <Section
            accentLeft
            accentColor="bg-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.8)]"
            shadowColor="hover:shadow-[0_0_25px_rgba(255,107,0,0.15)]"
            hoverBorderColor="hover:border-brand-orange/60"
          >
            <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-orange tracking-wider">
              Rules &amp; Regulations
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-brand-white/80 font-brand-body leading-relaxed">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_6px_rgba(255,107,0,0.8)]" />
                  <span
                    className="[&_strong]:text-brand-golden-yellow [&_strong]:font-bold [&_em]:italic"
                    dangerouslySetInnerHTML={{ __html: rule }}
                  />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Judging Criteria ──────────────────────────────────────────────── */}
        {event.judgingCriteria.length > 0 && (
          <Section
            accentRight
            accentColor="bg-brand-mustard-yellow shadow-[0_0_10px_rgba(255,180,0,0.8)]"
            shadowColor="hover:shadow-[0_0_25px_rgba(255,180,0,0.15)]"
            hoverBorderColor="hover:border-brand-mustard-yellow/60"
          >
            <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-mustard-yellow tracking-wider">
              Judging Criteria
            </h2>
            <div className="overflow-x-auto rounded">
              <table className="w-full border-collapse text-sm md:text-base font-brand-body">
                <thead>
                  <tr className="border-b border-brand-mustard-yellow/30">
                    <th className="text-left py-3 px-4 text-brand-mustard-yellow font-bold uppercase text-xs tracking-widest">
                      Criterion
                    </th>
                    <th className="text-right py-3 px-4 text-brand-mustard-yellow font-bold uppercase text-xs tracking-widest whitespace-nowrap">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {event.judgingCriteria.map((c, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-brand-golden-yellow/10 hover:bg-brand-golden-yellow/5 transition-colors"
                    >
                      <td className="py-3 px-4 text-brand-white/80">{c.criterion}</td>
                      <td className="py-3 px-4 text-right">
                        {c.points ? (
                          <span className="inline-block bg-brand-mustard-yellow/10 border border-brand-mustard-yellow/30 text-brand-mustard-yellow font-bold px-2 py-0.5 rounded text-xs">
                            {c.points} pts
                          </span>
                        ) : (
                          <span className="text-brand-white/30 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* ── Additional Info sections ──────────────────────────────────────── */}
        {event.additionalInfo.length > 0 &&
          event.additionalInfo.map((info, idx) => (
            <Section
              key={idx}
              accentLeft
              accentColor="bg-brand-golden-yellow shadow-[0_0_10px_rgba(255,184,0,0.8)]"
              shadowColor="hover:shadow-[0_0_25px_rgba(255,184,0,0.15)]"
              hoverBorderColor="hover:border-brand-golden-yellow/60"
            >
              <h2 className="text-xl sm:text-2xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider capitalize">
                {info.heading}
              </h2>
              <ul className="space-y-3 text-sm md:text-base text-brand-white/80 font-brand-body leading-relaxed">
                {info.content.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <span className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full bg-brand-golden-yellow shadow-[0_0_6px_rgba(255,184,0,0.8)]" />
                    <span
                      className="[&_strong]:text-brand-golden-yellow [&_strong]:font-bold"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </li>
                ))}
              </ul>
            </Section>
          ))}

        {/* ── Coordinators Grid ─────────────────────────────────────────────── */}
        {(event.staffCoordinators.length > 0 || event.studentCoordinators.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            {/* Faculty / Staff Coordinators */}
            {event.staffCoordinators.length > 0 && (
              <section className="group relative border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-4 transition-all duration-300 hover:border-brand-golden-yellow/60 hover:shadow-[0_0_25px_rgba(255,184,0,0.15)] hover:bg-brand-navy/60">
                <h2 className="text-lg sm:text-xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider">
                  Faculty Coordinator{event.staffCoordinators.length > 1 ? 's' : ''}
                </h2>
                <div className="flex flex-col gap-3">
                  {event.staffCoordinators.map((c, idx) => (
                    <CoordinatorCard key={idx} coordinator={c} accentColor="brand-golden-yellow" />
                  ))}
                </div>
              </section>
            )}

            {/* Student Coordinators */}
            {event.studentCoordinators.length > 0 && (
              <section className="group relative border border-brand-golden-yellow/30 rounded bg-brand-navy/40 backdrop-blur-sm p-6 sm:p-8 space-y-4 transition-all duration-300 hover:border-brand-golden-yellow/60 hover:shadow-[0_0_25px_rgba(255,184,0,0.15)] hover:bg-brand-navy/60">
                <h2 className="text-lg sm:text-xl font-brand-heading italic font-black uppercase text-brand-golden-yellow tracking-wider">
                  Student Coordinator{event.studentCoordinators.length > 1 ? 's' : ''}
                </h2>
                <div className="flex flex-col gap-3">
                  {event.studentCoordinators.map((c, idx) => (
                    <CoordinatorCard key={idx} coordinator={c} accentColor="brand-orange" />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Coordinator Card sub-component ────────────────────────────────────────────
function CoordinatorCard({
  coordinator,
  accentColor,
}: {
  coordinator: { name: string; phone?: string; email?: string };
  accentColor: string;
}) {
  return (
    <div className="bg-brand-navy/60 border border-brand-golden-yellow/20 rounded-lg p-4 font-brand-body text-sm transition-all hover:bg-brand-golden-yellow/5 hover:border-brand-golden-yellow/40 space-y-1">
      <div className="font-bold text-brand-white">{coordinator.name}</div>
      {coordinator.email && (
        <div className="text-brand-white/50 text-xs tracking-wide break-all">
          <a
            href={`mailto:${coordinator.email}`}
            className="hover:text-brand-golden-yellow transition-colors"
          >
            {coordinator.email}
          </a>
        </div>
      )}
      {coordinator.phone && (
        <div className="text-brand-white/50 text-xs tracking-wider">
          <a
            href={`tel:${coordinator.phone.replace(/\s/g, '')}`}
            className="hover:text-brand-golden-yellow transition-colors"
          >
            {coordinator.phone}
          </a>
        </div>
      )}
    </div>
  );
}