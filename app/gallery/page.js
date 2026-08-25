"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesText } from "@/components/ui/sparkles-text";
import {
  Sparkles,
  Camera,
  Layers,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Heart,
  Share2,
  Download,
  Eye,
  Filter,
} from "lucide-react";

// Real Historical Gallery Photos from /public/Raw Images
const GALLERY_ITEMS = [
  // Hackathon
  {
    id: "h1",
    src: "/Raw Images/Hackathon/20260418_095451.jpg",
    title: "Opening Sprint: Brainstorming Solutions",
    category: "HackSprint",
    year: "NIRVAN '25",
    caption: "Teams locking in their project architecture within the first hour of HackSprint.",
    location: "Innovation Hub, GEHU",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "h2",
    src: "/Raw Images/Hackathon/20260418_101029.jpg",
    title: "Deep in the Codebase",
    category: "HackSprint",
    year: "NIRVAN '25",
    caption: "Frontend developers testing reactive state machines and 3D web canvases.",
    location: "Computer Lab 1",
    span: "col-span-1",
  },
  {
    id: "h3",
    src: "/Raw Images/Hackathon/20260418_110744.jpg",
    title: "Mid-Sprint Mentor Consultation",
    category: "HackSprint",
    year: "NIRVAN '25",
    caption: "Industry mentors reviewing cloud infrastructure and backend endpoints.",
    location: "Innovation Hub Lounge",
    span: "col-span-1",
  },
  {
    id: "h4",
    src: "/Raw Images/Hackathon/20260418_111730.jpg",
    title: "Midnight Collaboration Chaos",
    category: "HackSprint",
    year: "NIRVAN '24",
    caption: "When the energy drinks kick in and the breakthrough commit is merged.",
    location: "Innovation Hub",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "h5",
    src: "/Raw Images/Hackathon/20260418_121550.jpg",
    title: "Final Git Push & Polish",
    category: "HackSprint",
    year: "NIRVAN '25",
    caption: "T-minus 15 minutes before the submission portal closes.",
    location: "Computer Lab 1",
    span: "col-span-1",
  },

  // Cyber CTF
  {
    id: "c1",
    src: "/Raw Images/ctf/img1 (1).jpg",
    title: "CTF CyberQuest: Terminal Warriors",
    category: "Cyber CTF",
    year: "NIRVAN '25",
    caption: "Cracking binary exploitation problems and analyzing encrypted packet traces.",
    location: "Seminar Hall A",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "c2",
    src: "/Raw Images/ctf/img2.jpg",
    title: "Reverse Engineering Challenge",
    category: "Cyber CTF",
    year: "NIRVAN '25",
    caption: "Decompiling binaries to recover the secret flag string.",
    location: "Seminar Hall A",
    span: "col-span-1",
  },
  {
    id: "c3",
    src: "/Raw Images/ctf/img3.jpg",
    title: "Flag Captured: Scoreboard Surge",
    category: "Cyber CTF",
    year: "NIRVAN '24",
    caption: "The thrill of capturing a 500-point hard cryptography flag.",
    location: "Seminar Hall A",
    span: "col-span-1",
  },
  {
    id: "c4",
    src: "/Raw Images/ctf/img4.jpg",
    title: "Security Defense in Full Swing",
    category: "Cyber CTF",
    year: "NIRVAN '25",
    caption: "Focused cybersecurity enthusiasts racing against the live ticking clock.",
    location: "Seminar Hall A",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "c5",
    src: "/Raw Images/ctf/img5.jpg",
    title: "Post-CTF Flag Walkthrough",
    category: "Cyber CTF",
    year: "NIRVAN '25",
    caption: "Author breakdown of challenge vulnerabilities and zero-day mechanisms.",
    location: "Seminar Hall A",
    span: "col-span-1",
  },
  {
    id: "c6",
    src: "/Raw Images/ctf/img6.jpg",
    title: "White-Hat Hacker Squads",
    category: "Cyber CTF",
    year: "NIRVAN '24",
    caption: "Team coordination and strategy during the live attack/defense rounds.",
    location: "Seminar Hall A",
    span: "col-span-1",
  },

  // E-Sports
  {
    id: "e1",
    src: "/Raw Images/esport/DSC08158.jpg",
    title: "E-Sports Main Stage Arena",
    category: "E-Sports",
    year: "NIRVAN '25",
    caption: "High-intensity finals under tournament lights with live stage shoutcasters.",
    location: "Main Auditorium",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "e2",
    src: "/Raw Images/esport/DSC08175.jpg",
    title: "Crowd Roar at Clutch Moment",
    category: "E-Sports",
    year: "NIRVAN '25",
    caption: "Audience reacting to a 1v4 match-point defusal on the giant LED wall.",
    location: "Main Auditorium",
    span: "col-span-1",
  },
  {
    id: "e3",
    src: "/Raw Images/esport/DSC_9816.jpg",
    title: "Tactical Clan Huddle",
    category: "E-Sports",
    year: "NIRVAN '24",
    caption: "Gamers analyzing rival economy and map control during tactical timeout.",
    location: "Gaming Bay 3",
    span: "col-span-1",
  },
  {
    id: "e4",
    src: "/Raw Images/esport/DSC_9819.jpg",
    title: "Precision Reflexes",
    category: "E-Sports",
    year: "NIRVAN '25",
    caption: "Competitive reflexes tested to the millisecond.",
    location: "Gaming Bay 3",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "e5",
    src: "/Raw Images/esport/DSC_9824.jpg",
    title: "Championship Victory Moment",
    category: "E-Sports",
    year: "NIRVAN '25",
    caption: "The winning squad hoisting the NIRVAN Gaming Shield.",
    location: "Main Stage",
    span: "col-span-1",
  },
  {
    id: "e6",
    src: "/Raw Images/esport/IMG_7419.jpg",
    title: "Audience Excitement",
    category: "E-Sports",
    year: "NIRVAN '24",
    caption: "Hundreds of students cheering for their university representatives.",
    location: "Main Auditorium",
    span: "col-span-1",
  },

  // Tech Treasure Hunt
  {
    id: "t1",
    src: "/Raw Images/tech treasyre hunt/DSC_0090.jpg",
    title: "Unlocking Campus Clue #1",
    category: "Treasure Hunt",
    year: "NIRVAN '25",
    caption: "Teams scanning encrypted beacons hidden near the university clocktower.",
    location: "Central Campus Quad",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "t2",
    src: "/Raw Images/tech treasyre hunt/DSC_0100.jpg",
    title: "The Sprint Across Blocks",
    category: "Treasure Hunt",
    year: "NIRVAN '25",
    caption: "Racing between science labs to piece together the cipher coordinates.",
    location: "Academic Block B",
    span: "col-span-1",
  },
  {
    id: "t3",
    src: "/Raw Images/tech treasyre hunt/DSC_0111.jpg",
    title: "Team Decryption Huddle",
    category: "Treasure Hunt",
    year: "NIRVAN '24",
    caption: "Combining logic puzzles and map vectors on the campus lawns.",
    location: "Amphitheatre",
    span: "col-span-1",
  },
  {
    id: "t4",
    src: "/Raw Images/tech treasyre hunt/DSC_0119.jpg",
    title: "Solving the Final Riddle",
    category: "Treasure Hunt",
    year: "NIRVAN '25",
    caption: "The top teams racing to unlock the grand mystery box.",
    location: "Central Lawn",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: "t5",
    src: "/Raw Images/tech treasyre hunt/DSC_0130.jpg",
    title: "Relic Discovered",
    category: "Treasure Hunt",
    year: "NIRVAN '25",
    caption: "First team to submit the complete decrypted passphrase.",
    location: "Main Fountain",
    span: "col-span-1",
  },
  {
    id: "t6",
    src: "/Raw Images/tech treasyre hunt/DSC_0135.jpg",
    title: "Treasure Hunt Finalists",
    category: "Treasure Hunt",
    year: "NIRVAN '24",
    caption: "Victorious solvers celebrating at the festival stage.",
    location: "Main Stage",
    span: "col-span-1",
  },
];

const CATEGORIES = [
  "All Moments",
  "HackSprint",
  "Cyber CTF",
  "E-Sports",
  "Treasure Hunt",
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Moments");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'polaroid'
  const [likedIds, setLikedIds] = useState([]);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === "All Moments") return true;
    return item.category === selectedCategory;
  });

  const toggleLike = (id, e) => {
    e.stopPropagation();
    if (likedIds.includes(id)) {
      setLikedIds(likedIds.filter((l) => l !== id));
    } else {
      setLikedIds([...likedIds, id]);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const currentLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="relative z-10 max-w-7xl mx-auto space-y-10 sm:space-y-14">
        
        {/* =========================================================
            HEADER & HERO (Flow 7 from PRD)
           ========================================================= */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-[#15231c]/80 backdrop-blur-md border border-white/60 dark:border-[#84a98c]/25 text-xs font-mono font-semibold text-[#2f3e46] dark:text-[#cad2c5] shadow-sm">
            <Camera className="w-3.5 h-3.5 text-[#52796f] dark:text-[#84a98c]" />
            <span>VISUAL MEMORY ARCHIVE • 2024 - 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            NIRVAN Through <SparklesText className="text-zinc-900 dark:text-white">The Years</SparklesText>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A retrospective view of previous iterations of the technical fest, capturing moments of innovation, collaboration, late-night breakthroughs, and structural ingenuity.
          </p>

          {/* View Mode & Category Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/10 dark:border-white/10">
            
            {/* Category Filter Pills */}
            <div className="flex items-center flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-[#52796f] text-white shadow-sm font-semibold"
                        : "bg-white/60 dark:bg-[#15231c]/70 text-[#2f3e46] dark:text-[#cad2c5] border border-black/5 dark:border-white/5 hover:border-[#84a98c]/40"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher: Clean Grid vs Scrapbook Polaroid */}
            <div className="flex p-1 bg-black/5 dark:bg-black/40 rounded-2xl border border-black/5 dark:border-white/5">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-[#52796f] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Gallery Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("polaroid")}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === "polaroid"
                    ? "bg-[#52796f] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Polaroid Storybook
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            PHOTO GALLERY GRID / MASONRY
           ========================================================= */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const isLiked = likedIds.includes(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  onClick={() => setActiveLightboxIndex(index)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer backdrop-blur-2xl bg-white/70 dark:bg-[#15231c]/80 border border-white/60 dark:border-[#84a98c]/25 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/10 dark:bg-black/40">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {item.year}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleLike(item.id, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto ${
                          isLiked
                            ? "bg-rose-500 text-white shadow-md"
                            : "bg-black/50 text-white/80 hover:bg-black/70 hover:text-white"
                        }`}
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    {/* Hover Inspect Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <span className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
                        <Maximize2 className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* Caption Card Body */}
                  <div className="p-4 sm:p-5 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#52796f] dark:text-[#84a98c]">
                      <span>{item.category}</span>
                      <span>{item.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#2f3e46] dark:text-white group-hover:text-[#52796f] dark:group-hover:text-[#84a98c] transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* =========================================================
              POLAROID / SCRAPBOOK STORYBOOK MODE
             ========================================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredItems.map((item, index) => {
              const rotation = (index % 5 - 2) * 2; // Subtle natural tilt: -4, -2, 0, 2, 4 deg

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveLightboxIndex(index)}
                  style={{ transform: `rotate(${rotation}deg)` }}
                  className="group bg-white dark:bg-[#1a2e1a] p-4 sm:p-5 rounded-2xl shadow-lg border border-black/10 dark:border-white/10 hover:rotate-0 hover:scale-105 hover:z-20 transition-all duration-300 cursor-pointer space-y-3"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-black/10 dark:bg-black/40">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 px-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#52796f] dark:text-[#84a98c]">
                      <span>📌 {item.year}</span>
                      <span>{item.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#2f3e46] dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs italic text-muted-foreground leading-snug">
                      "{item.caption}"
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* =========================================================
            FULLSCREEN LIGHTBOX MODAL
           ========================================================= */}
        <AnimatePresence>
          {activeLightboxIndex !== null && currentLightboxItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(null)}
                className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) => (prev + 1) % filteredItems.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Card Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-4xl w-full max-h-[90vh] bg-[#15231c] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
              >
                <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-hidden">
                  <img
                    src={currentLightboxItem.src}
                    alt={currentLightboxItem.title}
                    className="w-full h-full object-contain max-h-[65vh]"
                  />
                </div>

                <div className="p-6 bg-[#15231c] text-white space-y-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#84a98c]">
                    <span>{currentLightboxItem.year} • {currentLightboxItem.category}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {currentLightboxItem.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-sans">
                    {currentLightboxItem.title}
                  </h3>

                  <p className="text-xs text-white/80 leading-relaxed">
                    {currentLightboxItem.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-white/60">
                    <span>Photo {activeLightboxIndex + 1} of {filteredItems.length} (Use ← / → keys)</span>
                    <a
                      href={currentLightboxItem.src}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#84a98c] hover:underline flex items-center gap-1"
                    >
                      <span>View Full Resolution</span>
                      <Maximize2 className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
