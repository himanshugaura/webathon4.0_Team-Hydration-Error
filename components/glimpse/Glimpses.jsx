"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ImageStreamHero } from "./carousel";
import ShiftingCountdown from "@/components/ui/countdown";
import { data } from "@/lib/data";

// All real images from /public/Raw Images
const images = [
  { src: "/Raw Images/Hackathon/20260418_095451.jpg", alt: "Hackathon at NIRVAN – teams building live" },
  { src: "/Raw Images/Hackathon/20260418_110744.jpg", alt: "Collaboration and chaos — the hackathon spirit" },
  { src: "/Raw Images/Hackathon/20260418_121550.jpg", alt: "Final hours of the overnight marathon" },
  { src: "/Raw Images/ctf/DSC_9762.JPG",              alt: "CTF CyberQuest — cracking the code" },
  { src: "/Raw Images/ctf/DSC_9778.JPG",              alt: "Flags captured, glory earned" },
  { src: "/Raw Images/ctf/DSC_9802.JPG",              alt: "NIRVAN CTF — proving your skills" },
  { src: "/Raw Images/esport/DSC08158.JPG",           alt: "E-Sports Arena — game on" },
  { src: "/Raw Images/esport/DSC_9816.JPG",           alt: "The crowd roars at E-Sports Arena" },
  { src: "/Raw Images/esport/IMG_7419.JPG",           alt: "Championship moments at E-Sports Arena" },
  { src: "/Raw Images/tech treasure hunt/DSC_0090.JPG", alt: "Treasure Hunt — follow the clues" },
  { src: "/Raw Images/tech treasure hunt/DSC_0111.JPG", alt: "Team coordination at Treasure Hunt" },
  { src: "/Raw Images/tech treasure hunt/DSC_0130.JPG", alt: "The thrill of the hunt — NIRVAN style" },
];

const stats = [
  { value: "500+", label: "Participants" },
  { value: "9",    label: "Events" },
  { value: "₹1L+", label: "Prize Pool" },
  { value: "3",    label: "Days of Glory" },
];

export function Glimpses() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section className="relative w-full overflow-hidden transition-colors duration-500">

      {/* ── Countdown ── */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-6">
        <div className="flex flex-col items-center text-center mb-8 space-y-3">
          <span className="inline-block rounded-full border border-[#00a896]/60 bg-[#00ffc6]/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#007a70] dark:text-[#00ffc6]">
            Mark Your Calendar
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white">
            {data.fest.name} <span className="text-[#007a70] dark:text-[#00ffc6]">Starts In</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            {data.fest.dates.display} · {data.fest.venue}
          </p>
        </div>
        <ShiftingCountdown />
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 pb-10 flex items-center gap-4">
        <div className="flex-1 h-px bg-zinc-400/30 dark:bg-zinc-700" />
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 px-2">
          Glimpses
        </span>
        <div className="flex-1 h-px bg-zinc-400/30 dark:bg-zinc-700" />
      </div>

      {/* ── Heading above carousel ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pb-8">
        <span className="mb-4 inline-block rounded-full border border-[#00a896]/60 bg-[#00ffc6]/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#007a70] dark:text-[#00ffc6]">
          You had to be there
        </span>
        <h2 className="max-w-4xl text-4xl font-black leading-tight text-zinc-800 dark:text-white sm:text-5xl">
          The Legacy of{" "}
          <span className="bg-gradient-to-r from-[#007a70] to-teal-600 dark:from-[#00ffc6] dark:to-teal-300 bg-clip-text text-transparent">
            Previous NIRVANs
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-base font-medium text-zinc-600 dark:text-zinc-400">
          From overnight hackathons to robot battles — every edition of NIRVAN
          has been a story worth telling.
        </p>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap justify-center gap-10 sm:gap-14">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-3xl font-black text-[#007a70] dark:text-[#00ffc6] sm:text-4xl">
                {value}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Carousel — 6 cards, no gradient overlays ── */}
      <ImageStreamHero
        images={images}
        cards={6}
        speed={20}
        axis={52}
        className="h-[60vh] min-h-[400px] w-full"
      />

    </section>
  );
}

export default Glimpses;
