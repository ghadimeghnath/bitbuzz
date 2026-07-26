import Image from "next/image";

const generalProtocols = [
  "Participants must carry photo and valid ID card.",
  "Registration will be verified physically.",
  "Registered information cannot be modified.",
  "Schedule changes are subject to organizers.",
  "Report 30 minutes before the event.",
  "Entry is restricted to registered participants.",
];

const specialInstructions = [
  "Electronic gadgets are prohibited.",
  "Follow the official dress code.",
  "Respect volunteers and coordinators.",
  "Photography may be restricted.",
  "Maintain discipline throughout the event.",
  "Violation of rules leads to disqualification.",
];

export default function ClassifiedPanel() {
  return (
    <section className="relative w-full max-w-[520px] mx-auto">

      {/* ================= Background ================= */}

      <div className="absolute inset-0 rounded-md overflow-hidden">

        <Image
          src="/ui/noise.png"
          alt=""
          fill
          className="object-cover opacity-15"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#151515] via-[#101010] to-[#090909]" />

      </div>

      {/* ================= Frame ================= */}

      <Image
        src="/frames/frame-red.png"
        alt=""
        fill
        className="pointer-events-none z-20 object-fill"
      />

      {/* ================= Decorative Vines ================= */}

      <Image
        src="/ui/vine-left.png"
        alt=""
        width={120}
        height={90}
        className="absolute left-2 -top-4 z-30"
      />

      <Image
        src="/ui/vine-right.png"
        alt=""
        width={120}
        height={90}
        className="absolute right-2 -top-4 z-30 scale-x-[-1]"
      />

      {/* ================= Content ================= */}

      <div className="relative z-10 px-10 py-24">

        {/* Header */}

        <div className="absolute top-0 left-1/2 -translate-x-1/2">

          <div className="relative w-[290px] h-[74px]">

            <Image
              src="/ui/header-red.png"
              alt=""
              fill
            />

            <div className="absolute inset-0 flex items-center justify-center">

              <h2
                className="
                uppercase
                tracking-[5px]
                text-[#ff5933]
                text-3xl
                font-black
                drop-shadow-[0_2px_4px_rgba(0,0,0,.9)]
                "
              >
                Classified
              </h2>

            </div>

          </div>

        </div>

        {/* General */}

        <Section
          title="GENERAL PROTOCOLS"
          items={generalProtocols}
        />

        <Divider />

        {/* Special */}

        <Section
          title="SPECIAL INSTRUCTIONS"
          items={specialInstructions}
        />

      </div>

    </section>
  );
}

function Divider() {

  return (

    <div className="flex items-center gap-4 my-10">

      <div className="h-px flex-1 bg-[#b6472a]" />

      <div className="w-2 h-2 rounded-full bg-[#d06a43]" />

      <div className="h-px flex-1 bg-[#b6472a]" />

    </div>

  );

}

function Section({
  title,
  items,
}) {

  return (

    <div>

      <h3
        className="
        text-center
        text-[#f1c17a]
        text-2xl
        tracking-[2px]
        uppercase
        mb-7
        "
      >
        {title}
      </h3>

      <ul className="space-y-5">

        {items.map((item) => (

          <li
            key={item}
            className="flex items-start gap-4"
          >

            <span
              className="
              mt-[9px]
              h-[7px]
              w-[7px]
              bg-[#d64a2e]
              shadow-[0_0_6px_#ff5c39]
              shrink-0
              "
            />

            <span
              className="
              text-[#ded6cc]
              text-[17px]
              leading-8
              "
            >
              {item}
            </span>

          </li>

        ))}

      </ul>

    </div>

  );

}