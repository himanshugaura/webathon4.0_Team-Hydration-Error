"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Sparkles, QrCode, Wifi, CheckCircle2, UserCheck } from "lucide-react";

export function HoloPass({
  formData = { identifier: "", role: "participant", isSignUp: false, fullName: "" },
  activeRole = "participant"
}) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -12;
    const rY = ((x - centerX) / centerX) * 12;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Derive participant details for dynamic visual feedback
  const roleDisplay = {
    participant: {
      label: "HACKER / PARTICIPANT",
      color: "from-[#52796f] to-[#354f52]",
      badge: "bg-[#84a98c]/20 text-[#2f3e46] dark:text-[#cad2c5] border-[#84a98c]/40",
      tier: "LEVEL 01 ACCESS",
    },
    judge: {
      label: "JUDGE / JURY PANEL",
      color: "from-amber-500/80 to-amber-700/80",
      badge: "bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-500/40",
      tier: "EVALUATOR CLEARANCE",
    },
    team_lead: {
      label: "TEAM LEAD / SQUAD CAPTAIN",
      color: "from-emerald-500 to-teal-700",
      badge: "bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border-emerald-500/40",
      tier: "CAPTAIN ACCESS",
    },
  }[activeRole] || {
    label: "PARTICIPANT",
    color: "from-[#52796f] to-[#354f52]",
    badge: "bg-[#84a98c]/20 text-[#cad2c5] border-[#84a98c]/40",
    tier: "LEVEL 01 ACCESS",
  };

  const displayName = formData.fullName || (formData.identifier ? formData.identifier.split("@")[0] : "NIRVAN ATTENDEE");
  const displayId = formData.identifier 
    ? (formData.identifier.includes("@") ? "NIRV-" + Math.abs(formData.identifier.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)).toString(16).toUpperCase().padStart(6, "0").slice(0, 8) : formData.identifier.toUpperCase())
    : "GEHU-2026-X94";

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* 3D Container with perspective */}
      <div 
        className="w-full max-w-md perspective-1000 select-none cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          animate={{
            rotateX: rotX,
            rotateY: rotY,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-gradient-to-br from-white/80 via-white/40 to-white/60 dark:from-[#1b2b23]/90 dark:via-[#15231c]/80 dark:to-[#0f1713]/90 border border-white/50 dark:border-[#84a98c]/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Holographic light sweep reflection */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 240px at ${glarePos.x}% ${glarePos.y}%, rgba(132, 169, 140, 0.4), rgba(255,255,255,0.2) 30%, transparent 70%)`,
            }}
          />

          {/* Laser scanning line effect */}
          <motion.div
            animate={{ y: ["-100%", "400%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#84a98c]/60 to-transparent pointer-events-none shadow-[0_0_12px_#84a98c]"
          />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#84a98c] to-[#354f52] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#1a2e1a] flex items-center justify-center text-white font-black text-xl">
                  N
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
                    NIRVAN <span className="text-[#52796f] dark:text-[#84a98c]">'26</span>
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] font-mono tracking-widest text-[#52796f] dark:text-[#84a98c] uppercase">
                  GEHU Campus Pass
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${roleDisplay.badge}`}>
                <Wifi className="w-3 h-3 animate-pulse" />
                NFC SYNCED
              </span>
            </div>
          </div>

          {/* User Profile / Card Body */}
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              {/* Dynamic Avatar with Hologram Glow */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#52796f] to-[#84a98c] p-0.5 shadow-lg shadow-[#52796f]/20">
                  <div className="w-full h-full rounded-[14px] bg-slate-900/90 dark:bg-black flex items-center justify-center overflow-hidden">
                    <UserCheck className="w-8 h-8 text-[#84a98c]" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-white shadow">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
              </div>

              {/* Live Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider">
                  {roleDisplay.tier}
                </p>
                <h3 className="text-xl font-bold text-[#2f3e46] dark:text-white truncate font-mono">
                  {displayName}
                </h3>
                <p className="text-xs text-muted-foreground font-mono tracking-wider">
                  ID: {displayId}
                </p>
              </div>
            </div>

            {/* Role Badge Bar */}
            <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                  Access Classification
                </p>
                <p className="text-xs font-bold text-[#2f3e46] dark:text-[#cad2c5] tracking-wide">
                  {roleDisplay.label}
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#52796f]/10 dark:bg-[#84a98c]/10 text-[#52796f] dark:text-[#84a98c] text-xs font-mono font-medium">
                <Cpu className="w-3.5 h-3.5" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Mini Event Info & QR hologram */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="col-span-2 p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Venue:</span>
                  <span className="font-semibold text-[#2f3e46] dark:text-[#cad2c5]">GEHU Haldwani</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fest Dates:</span>
                  <span className="font-semibold text-[#2f3e46] dark:text-[#cad2c5]">Oct 12-13, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Challenges:</span>
                  <span className="font-semibold text-[#52796f] dark:text-[#84a98c]">Hackathon • CTF</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center">
                <QrCode className="w-10 h-10 text-[#2f3e46] dark:text-[#cad2c5]" />
                <span className="text-[9px] font-mono text-muted-foreground mt-1">SCAN PASS</span>
              </div>
            </div>
          </div>

          {/* Footer Barcode */}
          <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>CRYPTOGRAPHICALLY VERIFIED</span>
            </div>
            <div className="font-mono text-[9px] text-[#52796f] dark:text-[#84a98c]">
              v4.0.26
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Helper Text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-xs text-muted-foreground font-mono flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#52796f] dark:text-[#84a98c]" />
          Interactive 3D Hologram • Updates live with your input
        </p>
      </motion.div>
    </div>
  );
}
