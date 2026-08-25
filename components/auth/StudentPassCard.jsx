"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  ShieldCheck,
  Calendar,
  MapPin,
  Sparkles,
  Award,
  Phone,
  User,
  GraduationCap,
  Mail,
  CheckCircle2,
} from "lucide-react";

export function StudentPassCard({
  formData = {
    email: "",
    name: "",
    studentId: "",
    mobile: "",
    college: "",
    selectedEvents: [],
  },
}) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotX(((y - centerY) / centerY) * -10);
    setRotY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  const displayName = formData.name || (formData.email ? formData.email.split("@")[0] : "STUDENT ATTENDEE");
  const displayId = formData.studentId || "GEHU-2026-REG";
  const displayMobile = formData.mobile || "+91 ••••••••••";
  const displayCollege = formData.college || "Graphic Era Hill University";
  const eventsCount = formData.selectedEvents?.length || 0;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div
        className="w-full max-w-md perspective-1000 select-none"
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
          className="relative rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-white/70 dark:bg-[#15231c]/80 border border-white/60 dark:border-[#84a98c]/25 shadow-[0_20px_60px_rgba(47,62,70,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Subtle frosted glass specular highlight */}
          <div className="absolute -right-24 -top-24 w-60 h-60 rounded-full bg-gradient-to-br from-[#84a98c]/20 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-60 h-60 rounded-full bg-gradient-to-tr from-[#52796f]/15 to-transparent blur-2xl pointer-events-none" />

          {/* Card Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#2f3e46]/10 dark:border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#52796f] to-[#354f52] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#1a2e1a] flex items-center justify-center text-white font-bold text-lg">
                  N
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-[#2f3e46] dark:text-[#cad2c5]">
                    NIRVAN <span className="text-[#52796f] dark:text-[#84a98c]">'26</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[10px] font-mono tracking-wider text-[#52796f] dark:text-[#84a98c] uppercase">
                  OFFICIAL STUDENT PASS
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono tracking-wider bg-[#84a98c]/15 text-[#354f52] dark:text-[#cad2c5] border border-[#84a98c]/30">
              <ShieldCheck className="w-3 h-3 text-[#52796f] dark:text-[#84a98c]" />
              VERIFIED
            </span>
          </div>

          {/* Student Profile Overview */}
          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#52796f] to-[#84a98c] p-0.5 shadow-md shrink-0">
                <div className="w-full h-full rounded-[14px] bg-[#1a2e1a] flex items-center justify-center text-[#cad2c5]">
                  <GraduationCap className="w-7 h-7 text-[#84a98c]" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono font-medium text-[#52796f] dark:text-[#84a98c] uppercase tracking-wider">
                  REGISTERED CANDIDATE
                </p>
                <h3 className="text-lg font-bold text-[#2f3e46] dark:text-white truncate font-sans">
                  {displayName}
                </h3>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  ID: <span className="text-[#2f3e46] dark:text-[#cad2c5] font-semibold">{displayId}</span>
                </p>
              </div>
            </div>

            {/* Key Information Badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-0.5">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                  <Phone className="w-3 h-3 text-[#52796f] dark:text-[#84a98c]" />
                  <span>MOBILE</span>
                </div>
                <p className="font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5] truncate">
                  {displayMobile}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-0.5">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                  <Mail className="w-3 h-3 text-[#52796f] dark:text-[#84a98c]" />
                  <span>EMAIL</span>
                </div>
                <p className="font-mono font-medium text-[#2f3e46] dark:text-[#cad2c5] truncate">
                  {formData.email || "student@gehu.ac.in"}
                </p>
              </div>
            </div>

            {/* College info */}
            <div className="p-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-muted-foreground">INSTITUTION</span>
                <span className="font-medium text-[#2f3e46] dark:text-[#cad2c5] truncate max-w-[200px] text-right">
                  {displayCollege}
                </span>
              </div>
            </div>

            {/* Registered Events Summary */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#52796f]/10 to-[#84a98c]/10 border border-[#84a98c]/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-semibold text-[#52796f] dark:text-[#84a98c] uppercase flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  EVENTS ENROLLED ({eventsCount})
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  OCT 12-13
                </span>
              </div>

              {formData.selectedEvents && formData.selectedEvents.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {formData.selectedEvents.map((evt) => (
                    <span
                      key={evt}
                      className="px-2 py-0.5 rounded-lg bg-white/70 dark:bg-black/50 text-[11px] font-medium text-[#2f3e46] dark:text-[#cad2c5] border border-black/5 dark:border-white/10 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                      {evt}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-muted-foreground italic">
                  Select events in Step 3 to add to your pass
                </p>
              )}
            </div>

            {/* QR Code & Venue Bar */}
            <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-3 h-3 text-[#52796f] dark:text-[#84a98c]" />
                  <span>October 12 - 13, 2026</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3 h-3 text-[#52796f] dark:text-[#84a98c]" />
                  <span>GEHU Haldwani Campus</span>
                </div>
              </div>

              <div className="p-1.5 rounded-xl bg-white dark:bg-black/60 border border-black/10 dark:border-white/10">
                <QrCode className="w-10 h-10 text-[#2f3e46] dark:text-[#cad2c5]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="text-xs text-muted-foreground font-mono mt-4 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#52796f] dark:text-[#84a98c]" />
        Live Pass Preview • Updates automatically with your inputs
      </p>
    </div>
  );
}
