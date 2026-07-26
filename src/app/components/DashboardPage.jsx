import PixelFrame, {
  PixelSectionTitle,
  PixelBullet,
  PixelButton,
  PixelDivider,
} from "./PixelFrame";

export default function DashboardPage() {
  const schedule = [
    { time: "09:00 AM", event: "REGISTRATION", venue: "MAIN BLOCK" },
    { time: "09:30 AM", event: "INAUGURATION", venue: "CHEST ROOM" },
    { time: "10:00 AM", event: "CODE CRAFTERS", venue: "LAB 1" },
    { time: "11:30 AM", event: "WEB WARRIORS", venue: "LAB 2" },
    { time: "01:00 PM", event: "TECH TRIVIA", venue: "STEMUM HALL" },
    { time: "04:00 PM", event: "QUIZ QUEST", venue: "CHEST ROOM" },
    { time: "06:30 PM", event: "PIXEL PURSUIT", venue: "LAB 3" },
    { time: "09:30 PM", event: "VALLOCKSPEY", venue: "NETHERDECK" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0809] px-4 py-8 sm:px-6 lg:px-8">
      {/* ONE COLUMN GRID */}
      <div className="mx-auto grid grid-cols-1 gap-10 w-full  place-items-center">
        {/* ================= CLASSIFIED ================= */}
        <div className="w-full max-w-[900px] ">
          <PixelFrame title="CLASSIFIED" variant="red" showVines>
            <PixelSectionTitle>GENERAL PROTOCOLS</PixelSectionTitle>

            <ul className="space-y-2 mb-4">
              <PixelBullet>
                Participants must carry photo and valid ID card.
              </PixelBullet>

              <PixelBullet>
                Registration will be fully screened through physical
                verification.
              </PixelBullet>

              <PixelBullet>
                Disclosures of the registered coordinates will be final and
                binding.
              </PixelBullet>

              <PixelBullet>
                The final event schedule is not liable to revisions or
                postponements.
              </PixelBullet>

              <PixelBullet>
                Participants should report 30 minutes before the event.
              </PixelBullet>

              <PixelBullet>
                Entry per event is strictly restricted to the time notified.
              </PixelBullet>
            </ul>

            <PixelDivider />

            <PixelSectionTitle>SPECIAL INSTRUCTIONS</PixelSectionTitle>

            <ul className="space-y-2 mt-3">
              <PixelBullet>
                Use of illicit or disguised gadgets and any misguiding activity
                is prohibited.
              </PixelBullet>

              <PixelBullet>
                Dress must conform to the rules laid out at events.
              </PixelBullet>

              <PixelBullet>
                Behavior of all participants at the venue needs to be
                event-specific.
              </PixelBullet>

              <PixelBullet>
                Data uploaded through the registrant will be used for events.
              </PixelBullet>

              <PixelBullet>
                Stay cooperative to enjoy the entire experience and
                announcements.
              </PixelBullet>

              <PixelBullet>
                Rule violations will attract penalties for all participants.
              </PixelBullet>
            </ul>
          </PixelFrame>
        </div>

{/* ================= EVENT SCHEDULE ================= */}
<div className="w-full">
  <PixelFrame
    title="EVENT SCHEDULE"
    variant="blue"
    showVines={false}
  >
    <div className="overflow-x-auto mt-2">
      <div className="min-w-[1050px]">

        {/* ================= TIME HEADER ================= */}
        <div className="grid grid-cols-7 overflow-hidden rounded-t-md border border-cyan-700">
          {[
            "9:00-10:30",
            "10:30-10:45",
            "10:45-11:45",
            "11:45-1:00",
            "1:00-2:00",
            "2:00-4:00",
            "4:00-4:30",
          ].map((time) => (
            <div
              key={time}
              className="bg-cyan-950 border-r border-cyan-700 py-3 text-center font-pixel-header text-xs text-amber-300 last:border-r-0"
            >
              {time}
            </div>
          ))}
        </div>

        {/* ================= SCHEDULE GRID ================= */}
        <div
          className="grid overflow-hidden rounded-b-md border-x border-b border-cyan-700"
          style={{
            gridTemplateColumns: "repeat(7,1fr)",
            gridTemplateRows: "64px 64px 64px 84px 84px",
          }}
        >
          {/* ================= INAUGURAL ================= */}
          <div
            className="bg-[#111a25] border-r border-cyan-700 flex items-center justify-center"
            style={{
              gridColumn: 1,
              gridRow: "1 / 6",
            }}
          >
            <span
              className="font-pixel-header text-lg tracking-wider text-amber-300"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              INAUGURAL
            </span>
          </div>

          {/* ================= TEA BREAK ================= */}
          <div
            className="bg-[#111a25] border-r border-cyan-700 flex items-center justify-center"
            style={{
              gridColumn: 2,
              gridRow: "1 / 6",
            }}
          >
            <span
              className="font-pixel-header text-lg tracking-wider text-amber-300"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              TEA BREAK
            </span>
          </div>

          {/* ================= CODING R1 ================= */}
          <div className="bg-[#0c1621] border-r border-b border-cyan-800 flex items-center justify-center hover:bg-[#142435] transition-colors">
            <div className="font-pixel-header text-[11px] leading-4 text-center text-amber-300">
              CODING
              <br />
              ROUND 1
            </div>
          </div>

          {/* ================= CODING R2 ================= */}
          <div className="bg-[#0c1621] border-r border-b border-cyan-800 flex items-center justify-center hover:bg-[#142435] transition-colors">
            <div className="font-pixel-header text-[11px] leading-4 text-center text-amber-300">
              CODING
              <br />
              ROUND 2
            </div>
          </div>

          {/* ================= WEB R1 ================= */}
          <div className="bg-[#0c1621] border-r border-b border-cyan-800 flex items-center justify-center hover:bg-[#142435] transition-colors">
            <div className="font-pixel-header text-[11px] leading-4 text-center text-amber-300">
              WEB DESIGNING
              <br />
              ROUND 1
            </div>
          </div>

          {/* ================= WEB R2 ================= */}
          <div className="bg-[#0c1621] border-r border-b border-cyan-800 flex items-center justify-center hover:bg-[#142435] transition-colors">
            <div className="font-pixel-header text-[11px] leading-4 text-center text-amber-300">
              WEB DESIGNING
              <br />
              ROUND 2
            </div>
          </div>

          {/* ================= QUIZ R1 ================= */}
          <div className="bg-[#0c1621] border-r border-cyan-800 flex items-center justify-center hover:bg-[#142435] transition-colors">
            <div className="font-pixel-header text-[11px] leading-4 text-center text-amber-300">
              QUIZ
              <br />
              ROUND 1
            </div>
          </div>

          {/* ================= QUIZ R2 ================= */}
          <div className="bg-[#0c1621] border-r border-cyan-800 flex items-center justify-center hover:bg-[#142435] transition-colors">
            <div className="font-pixel-header text-[11px] leading-4 text-center text-amber-300">
              QUIZ
              <br />
              ROUND 2
            </div>
          </div>

          {/* ================= LUNCH ================= */}
          <div
            className="bg-[#111a25] border-r border-cyan-700 flex items-center justify-center"
            style={{
              gridColumn: 5,
              gridRow: "1 / 4",
            }}
          >
            <span
              className="font-pixel-header text-lg tracking-wider text-amber-300"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              LUNCH
            </span>
          </div>

          {/* ================= CULTURAL ================= */}
          <div
            className="bg-[#111a25] border-r border-cyan-700 flex items-center justify-center"
            style={{
              gridColumn: 6,
              gridRow: "1 / 4",
            }}
          >
            <span
              className="font-pixel-header text-lg tracking-wider text-amber-300"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              CULTURAL
            </span>
          </div>

          {/* ================= VALEDICTORY ================= */}
          <div
            className="bg-[#111a25] flex items-center justify-center"
            style={{
              gridColumn: 7,
              gridRow: "1 / 6",
            }}
          >
            <span
              className="font-pixel-header text-lg tracking-wider text-amber-300"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              VALEDICTORY
            </span>
          </div>

          {/* ================= EMPTY BLOCK ================= */}
          <div
            className="bg-[#070b11] border-r border-t border-cyan-800"
            style={{
              gridColumn: 3,
              gridRow: 4,
            }}
          />

          {/* ================= SURPRISE EVENT ================= */}
          <div
            className="bg-cyan-900/30 border-r border-t border-cyan-700 flex items-center justify-center"
            style={{
              gridColumn: "4 / 7",
              gridRow: 4,
            }}
          >
            <span className="font-pixel-header text-xl text-amber-300 tracking-wide">
              SURPRISE EVENT
            </span>
          </div>

          {/* ================= GAMING ================= */}
          <div
            className="bg-cyan-950/60 border-t border-cyan-700 flex items-center justify-center"
            style={{
              gridColumn: "3 / 7",
              gridRow: 5,
            }}
          >
            <span className="font-pixel-header text-2xl text-amber-300 tracking-wider">
              GAMING
            </span>
          </div>
        </div>
      </div>
    </div>
  </PixelFrame>
</div>

       {/* ================= LOCATION ================= */}
<div className="w-full max-w-[900px] mx-auto">
  <PixelFrame title="LOCATION" variant="gold" showVines>
    <div className="flex flex-col gap-6">

      {/* Subtitle */}
      <p className="text-center text-stone-400 font-pixel-body text-sm sm:text-base">
        Find Us in the Real World
      </p>

      {/* Google Map */}
      <div className="overflow-hidden rounded-md border-2 border-stone-700">
        <div className="aspect-[16/9] w-full">
          <iframe
            title="Event Location"
            src="https://www.google.com/maps?q=St+Aloysius+Institute+of+Management+and+Information+Technology,+Beeri,+Mangaluru&output=embed"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>

      {/* Address Card */}
      <div className="border border-stone-700 rounded-md bg-black/20 p-5 space-y-6">

        {/* Venue */}
        <div>
          <h3 className="font-pixel-header text-amber-300 text-lg mb-4">
            Venue Address
          </h3>

          <div className="space-y-2 text-stone-200 font-pixel-body text-sm sm:text-base leading-relaxed">
            <p>
              St Aloysius Institute of Management
              <br />
              and Information Technology
            </p>

            <p className="font-semibold">
              Beeri, Mangaluru
            </p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-pixel-header text-amber-300 text-lg mb-4">
            Contact Information
          </h3>

          <div className="space-y-2 text-stone-200 font-pixel-body text-sm sm:text-base">
            <p>
              <span className="font-semibold text-stone-100">
                Email:
              </span>{" "}
              epitome@staloysius.ac.in
            </p>

            <p>
              <span className="font-semibold text-stone-100">
                Hours:
              </span>{" "}
              9:00 AM – 6:00 PM
            </p>
          </div>
        </div>

      </div>

      {/* Optional Button */}
      <div className="mt-2">
        <PixelButton>
          OPEN IN GOOGLE MAPS
        </PixelButton>
      </div>

    </div>
  </PixelFrame>
</div>
      </div>
    </div>
  );
}