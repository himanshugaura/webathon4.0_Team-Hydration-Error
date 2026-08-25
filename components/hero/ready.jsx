"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { data } from "@/lib/data";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowRight, ArrowUp, Sparkles } from "lucide-react";

// -------------------------------------------------------------------------
// 1. INLINE STYLES & ANIMATIONS
// -------------------------------------------------------------------------
const STYLES = `
.cinematic-ready-wrapper {
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 12%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 10%, transparent);
  
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 22%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 25%, transparent);
}

@keyframes ready-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.9; }
}

@keyframes ready-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes ready-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(235, 125, 0, 0.4)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(235, 125, 0, 0.8)); }
  30% { transform: scale(1); }
}

.animate-ready-scroll-marquee {
  animation: ready-scroll-marquee 35s linear infinite;
}

.animate-ready-heartbeat {
  animation: ready-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Glass Pill Theming */
.ready-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ready-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

/* Giant Background Text */
.ready-giant-bg-text {
  font-size: 23vw;
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 7%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 12%, transparent) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Glow Heading */
.ready-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 50%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 25px color-mix(in oklch, var(--foreground) 10%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON (Pure Framer-Motion)
// -------------------------------------------------------------------------
function MagneticButton({ className, children, onClick, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn("cursor-pointer select-none", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// -------------------------------------------------------------------------
// 3. MARQUEE HIGHLIGHTS
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span className="text-[#2C5745] dark:text-[#EB7D00] font-bold">HackSprint Marathon</span> 
    <span className="text-[#EB7D00]">✦</span>
    <span>CodeRush Contest</span> 
    <span className="text-[#7C3AED]">✦</span>
    <span className="text-[#AE2448] font-bold">RoboWar Arena</span> 
    <span className="text-[#EB7D00]">✦</span>
    <span>CTF CyberQuest</span> 
    <span className="text-[#2C5745]">✦</span>
    <span className="text-[#EB7D00] font-bold">₹1,00,000+ Prize Pool</span> 
    <span className="text-[#7C3AED]">✦</span>
    <span>E-Sports Championship</span> 
    <span className="text-[#2C5745]">✦</span>
    <span>500+ Innovators</span>
    <span className="text-[#EB7D00]">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN READY COMPONENT
// -------------------------------------------------------------------------
export function ReadyForEvent() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const giantY = useTransform(scrollYProgress, [0, 1], ["15vh", "0vh"]);
  const giantScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const giantOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      <div
        ref={containerRef}
        className="relative min-h-[90vh] sm:min-h-screen w-full overflow-hidden"
      >
        <footer className="relative flex min-h-[90vh] sm:min-h-screen w-full flex-col justify-between overflow-hidden bg-transparent text-foreground cinematic-ready-wrapper pt-16 pb-8">
          
          {/* Giant background text with framer-motion parallax */}
          <motion.div
            style={{
              y: giantY,
              scale: giantScale,
              opacity: giantOpacity,
            }}
            className="ready-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            NIRVAN '26
          </motion.div>

          {/* 1. Diagonal Sleek Marquee (Top of section) */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-black/10 dark:border-white/10 bg-background/70 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-md">
            <div className="flex w-max animate-ready-scroll-marquee text-xs md:text-sm font-black tracking-[0.25em] text-muted-foreground uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 sm:px-6 mt-24 mb-12 w-full max-w-5xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 mb-10"
            >
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight ready-text-glow leading-tight">
                Ready for <SparklesText className="text-[#2C5745] dark:text-[#EB7D00]">NIRVAN &apos;26?</SparklesText>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {data.fest.dates.display} • {data.fest.venue}
                <br className="hidden sm:inline" />
                Join 500+ student innovators, builders, and hackers in Uttarakhand&apos;s largest technical symposium.
              </p>
            </motion.div>

            {/* Interactive Magnetic Actions & Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center gap-6 w-full max-w-3xl"
            >
              
              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                <Link href="/events">
                  <ShimmerButton className="px-8 py-4 text-sm sm:text-base font-bold shadow-xl hover:-translate-y-1 transition-transform flex items-center gap-2">
                    <span>Explore All Events</span>
                    <ArrowRight className="w-4 h-4" />
                  </ShimmerButton>
                </Link>

                <Link href="/register">
                  <MagneticButton className="ready-glass-pill px-8 py-4 rounded-full text-foreground font-bold text-sm sm:text-base flex items-center gap-2 group hover:border-[#EB7D00]">
                    <span>Register Now</span>
                    <Sparkles className="w-4 h-4 text-[#EB7D00] transition-transform group-hover:rotate-12" />
                  </MagneticButton>
                </Link>
              </div>

            </motion.div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 dark:border-white/10">
            
            {/* Copyright */}
            <div className="text-zinc-500 dark:text-zinc-400 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-center sm:text-left">
              © 2026 {data.fest.name} • Graphic Era Hill University. All rights reserved.
            </div>

            {/* Back to top Button */}
            <MagneticButton
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full ready-glass-pill flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white group"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>

          </div>

        </footer>
      </div>
    </>
  );
}

export default ReadyForEvent;