"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ImageStreamHero } from "./carousel";

// All real images from /public/Raw Images
const images = [
  // Hackathon
  { src: "/Raw Images/Hackathon/20260418_095451.jpg", alt: "Hackathon at NIRVAN – teams building live" },
  { src: "/Raw Images/Hackathon/20260418_101029.jpg", alt: "Participants deep in code at HackSprint" },
  { src: "/Raw Images/Hackathon/20260418_110744.jpg", alt: "Collaboration and chaos — the hackathon spirit" },
  { src: "/Raw Images/Hackathon/20260418_111730.jpg", alt: "Midnight hustle at NIRVAN HackSprint" },
  { src: "/Raw Images/Hackathon/20260418_121550.jpg", alt: "Final hours of the overnight marathon" },
  // CTF
  { src: "/Raw Images/ctf/DSC_9762.JPG",              alt: "CTF CyberQuest — cracking the code" },
  { src: "/Raw Images/ctf/DSC_9766.JPG",              alt: "CyberQuest in full swing" },
  { src: "/Raw Images/ctf/DSC_9778.JPG",              alt: "Flags captured, glory earned" },
  { src: "/Raw Images/ctf/DSC_9791.JPG",              alt: "Security challenges at NIRVAN CTF" },
  { src: "/Raw Images/ctf/DSC_9795.JPG",              alt: "Keyboard warriors at CyberQuest" },
  { src: "/Raw Images/ctf/DSC_9802.JPG",              alt: "NIRVAN CTF — proving your skills" },
  // E-Sports
  { src: "/Raw Images/esport/DSC08158.JPG",           alt: "E-Sports Arena — game on" },
  { src: "/Raw Images/esport/DSC08175.JPG",           alt: "High stakes gaming at NIRVAN" },
  { src: "/Raw Images/esport/DSC_9816.JPG",           alt: "The crowd roars at E-Sports Arena" },
  { src: "/Raw Images/esport/DSC_9819.JPG",           alt: "NIRVAN E-Sports — compete and conquer" },
  { src: "/Raw Images/esport/DSC_9824.JPG",           alt: "Gamers unite at NIRVAN '25" },
  { src: "/Raw Images/esport/IMG_7419.JPG",           alt: "Championship moments at E-Sports Arena" },
  // Tech Treasure Hunt
  { src: "/Raw Images/tech treasure hunt/DSC_0090.JPG", alt: "Treasure Hunt — follow the clues" },
  { src: "/Raw Images/tech treasure hunt/DSC_0100.JPG", alt: "Racing across campus at NIRVAN" },
  { src: "/Raw Images/tech treasure hunt/DSC_0111.JPG", alt: "Team coordination at Treasure Hunt" },
  { src: "/Raw Images/tech treasure hunt/DSC_0119.JPG", alt: "Solving clues at NIRVAN Tech Fest" },
  { src: "/Raw Images/tech treasure hunt/DSC_0130.JPG", alt: "The thrill of the hunt — NIRVAN style" },
  { src: "/Raw Images/tech treasure hunt/DSC_0135.JPG", alt: "Treasure Hunt finalists at NIRVAN" },
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

  const bg       = isDark ? "#0a0a0a" : "#bebebe";
  const fadeFrom = isDark ? "#0a0a0a" : "#bebebe";

  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: bg }}
    >
      {/* ── Heading — sits ABOVE the carousel ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-16 pb-10">

        {/* Pill badge */}
        <span className="mb-4 inline-block rounded-full border border-[#00a896]/60 bg-[#00ffc6]/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#007a70] dark:text-[#00ffc6] backdrop-blur-sm">
          You had to be there
        </span>

        {/* Main heading */}
        <h2 className="max-w-4xl text-4xl font-black leading-tight text-zinc-800 dark:text-white sm:text-5xl md:text-6xl">
          The Legacy of{" "}
          <span className="bg-gradient-to-r from-[#007a70] to-teal-600 dark:from-[#00ffc6] dark:to-teal-300 bg-clip-text text-transparent">
            Previous NIRVANs
          </span>
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-base font-medium text-zinc-600 dark:text-zinc-400 sm:text-lg">
          From overnight hackathons to robot battles — every edition of NIRVAN
          has been a story worth telling. Here&apos;s a look back at the moments that made it legendary.
        </p>

        {/* Stats row */}
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

      {/* ── Carousel — no text overlay ── */}
      <div className="relative">
        {/* Top fade into bg */}
        <div
          className="absolute top-0 inset-x-0 h-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${fadeFrom}, transparent)` }}
        />
        {/* Bottom fade into bg */}
        <div
          className="absolute bottom-0 inset-x-0 h-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${fadeFrom}, transparent)` }}
        />

        <ImageStreamHero
          images={images}
          cards={10}
          speed={22}
          axis={52}
          className="h-[65vh] min-h-[440px] w-full"
        />
      </div>
    </section>
  );
}

export default Glimpses;
