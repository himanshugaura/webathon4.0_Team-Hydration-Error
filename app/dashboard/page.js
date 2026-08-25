"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users, 
  QrCode, 
  UserPlus, 
  Copy, 
  Check, 
  Download, 
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Send,
  Share2
} from "lucide-react";
import { data } from "@/lib/data";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagicCard } from "@/components/ui/magic-card";
import { SparklesText } from "@/components/ui/sparkles-text";

// Mock Logged In Student Profile
const mockStudent = {
  name: "Aryan Raj",
  studentId: "GEHU/2023/1084",
  email: "aryan.raj@gehu.ac.in",
  campus: "GEHU - Haldwani Campus",
  course: "B.Tech Computer Science & Engineering",
  section: "Section A (3rd Year)",
  mobile: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
};

// Mock Participated Events Data
const mockParticipatedEvents = [
  {
    id: "hacksprint-2026",
    slug: "hacksprint",
    name: "HackSprint '26",
    category: "Hackathon",
    date: "Oct 24, 2026",
    time: "10:00 AM",
    venue: "Main Computing Lab, Block A",
    status: "Confirmed",
    role: "Team Leader",
    teamName: "CodeCraft Squad",
    teamSize: "4 Members",
    teamCode: "NIRVAN-HACK-8492",
    prizePool: "₹25,000",
    passToken: "GEHU-HACK-PASS-99321",
    members: [
      { name: "Aryan Raj", role: "Team Leader", email: "aryan.raj@gehu.ac.in" },
      { name: "Sneha Sharma", role: "Frontend Dev", email: "sneha.s@gehu.ac.in" },
      { name: "Rohan Verma", role: "Backend Dev", email: "rohan.v@gehu.ac.in" },
      { name: "Ananya Joshi", role: "UI Designer", email: "ananya.j@gehu.ac.in" }
    ]
  },
  {
    id: "coderush-2026",
    slug: "coderush",
    name: "CodeRush: Algorithmic Duel",
    category: "Competitive Programming",
    date: "Oct 25, 2026",
    time: "02:00 PM",
    venue: "Turing Auditorium, Block B",
    status: "Confirmed",
    role: "Solo Participant",
    teamName: "Solo",
    teamSize: "1 Person",
    teamCode: null,
    prizePool: "₹12,000",
    passToken: "GEHU-CODE-PASS-44120",
    members: [
      { name: "Aryan Raj", role: "Solo Contestant", email: "aryan.raj@gehu.ac.in" }
    ]
  },
  {
    id: "robowar-2026",
    slug: "robowar",
    name: "RoboWar: Clash of Bots",
    category: "Robotics",
    date: "Oct 26, 2026",
    time: "11:00 AM",
    venue: "Open Air Amphitheatre",
    status: "Confirmed",
    role: "Team Member",
    teamName: "Titan Mech",
    teamSize: "3 Members",
    teamCode: "NIRVAN-ROBO-1904",
    prizePool: "₹20,000",
    passToken: "GEHU-ROBO-PASS-78219",
    members: [
      { name: "Vikram Negi", role: "Team Leader", email: "vikram.n@gehu.ac.in" },
      { name: "Aryan Raj", role: "Bot Pilot", email: "aryan.raj@gehu.ac.in" },
      { name: "Karan Bisht", role: "Hardware Eng", email: "karan.b@gehu.ac.in" }
    ]
  }
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPassEvent, setSelectedPassEvent] = useState(null);
  const [selectedInviteEvent, setSelectedInviteEvent] = useState(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitedList, setInvitedList] = useState([]);
  const [copiedCode, setCopiedCode] = useState(false);

  const filteredEvents = mockParticipatedEvents.filter((ev) => {
    if (activeTab === "team") return ev.role.includes("Team");
    if (activeTab === "solo") return ev.role.includes("Solo");
    return true;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInvitedList((prev) => [...prev, inviteEmail.trim()]);
    setInviteEmail("");
  };

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        
        {/* Profile Card */}
        <MagicCard className="rounded-3xl p-6 sm:p-10 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Student Info */}
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#2C5745]/40 shadow-md shrink-0">
                <img
                  src={mockStudent.avatar}
                  alt={mockStudent.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#2C5745] border-2 border-white dark:border-black" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                    {mockStudent.name}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{mockStudent.studentId}</span>
                  <span>•</span>
                  <span>{mockStudent.course} ({mockStudent.section})</span>
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 pt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#2C5745] dark:text-[#EB7D00]" />
                  <span>{mockStudent.campus}</span>
                </p>
              </div>
            </div>

            {/* Quick Action Link to Explore More */}
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/events">
                <ShimmerButton className="px-5 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer">
                  <span>Browse More Events</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </Link>
            </div>
          </div>
        </MagicCard>

        {/* Main Section: My Participated Events */}
        <div className="space-y-6">
          
          {/* Section Header & Tab Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                My <SparklesText className="text-zinc-900 dark:text-white">Registered Events</SparklesText>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                View your schedule, manage team squad members, and access your entry passes.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center p-1 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60 self-start">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white dark:bg-black text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                All (3)
              </button>
              <button
                onClick={() => setActiveTab("team")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "team"
                    ? "bg-white dark:bg-black text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Team Events (2)
              </button>
              <button
                onClick={() => setActiveTab("solo")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "solo"
                    ? "bg-white dark:bg-black text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Solo (1)
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredEvents.map((ev) => {
              const isTeam = ev.role.includes("Team");
              
              return (
                <MagicCard
                  key={ev.id}
                  className="rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-5">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                          {ev.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-[#2C5745]/15 text-[#2C5745] dark:text-[#EB7D00] border border-[#2C5745]/20">
                          {ev.status}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-[#AE2448]/15 text-[#AE2448] border border-[#AE2448]/20">
                          {ev.role}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {ev.name}
                      </h3>
                      
                      {isTeam && (
                        <p className="text-xs font-semibold text-[#2C5745] dark:text-[#EB7D00]">
                          Team: {ev.teamName} ({ev.teamSize})
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {isTeam && (
                        <button
                          onClick={() => setSelectedInviteEvent(ev)}
                          className="px-4 py-2.5 rounded-xl bg-[#2C5745]/15 dark:bg-[#EB7D00]/15 hover:bg-[#2C5745]/25 text-[#2C5745] dark:text-[#EB7D00] font-bold text-xs border border-[#2C5745]/30 dark:border-[#EB7D00]/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Invite Teammates</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedPassEvent(ev)}
                        className="px-4 py-2.5 rounded-xl bg-zinc-200/80 hover:bg-zinc-300/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Entry Pass</span>
                      </button>

                      <Link
                        href={`/events/${ev.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Event Specific Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Date & Time</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{ev.date} · {ev.time}</span>
                    </div>

                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Venue</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{ev.venue}</span>
                    </div>

                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Prize Pool</span>
                      <span className="font-black text-[#2C5745] dark:text-[#EB7D00]">{ev.prizePool}</span>
                    </div>

                    <div>
                      <span className="block text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Pass Token</span>
                      <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{ev.passToken.slice(0, 14)}...</span>
                    </div>
                  </div>

                  {/* Team Members Roster if team event */}
                  {isTeam && (
                    <div className="pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Squad Roster
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ev.members.map((m, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-semibold"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#2C5745] text-white flex items-center justify-center text-[10px] font-bold">
                              {m.name.charAt(0)}
                            </div>
                            <span className="text-zinc-800 dark:text-zinc-200">{m.name}</span>
                            <span className="text-[10px] text-zinc-500">({m.role})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </MagicCard>
              );
            })}
          </div>

        </div>

      </div>

      {/* Entry Pass Modal */}
      {selectedPassEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2C5745] dark:text-[#EB7D00]">
                NIRVAN '26 Entry Pass
              </span>
              <button
                onClick={() => setSelectedPassEvent(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Pass QR Box */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center space-y-3">
              <div className="w-36 h-36 bg-white p-2 rounded-xl border border-zinc-300 shadow-inner flex items-center justify-center">
                <QrCode className="w-32 h-32 text-zinc-950" />
              </div>
              <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {selectedPassEvent.passToken}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-xl text-zinc-900 dark:text-white">
                {selectedPassEvent.name}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                {mockStudent.name} • {mockStudent.studentId}
              </p>
              <p className="text-xs text-zinc-500 pt-1">
                📍 {selectedPassEvent.venue} ({selectedPassEvent.date})
              </p>
            </div>

            <button
              onClick={() => setSelectedPassEvent(null)}
              className="w-full py-3 rounded-xl bg-[#2C5745] hover:bg-[#234537] text-white font-bold text-xs cursor-pointer shadow-md"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}

      {/* Team Invite Modal */}
      {selectedInviteEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-6 sm:p-8 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#2C5745] dark:text-[#EB7D00]" />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Invite to {selectedInviteEvent.teamName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInviteEvent(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Share your squad invite code or send an invite directly to your classmate&apos;s student email.
            </p>

            {/* Team Invite Code */}
            <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 space-y-2">
              <span className="text-[11px] font-bold uppercase text-zinc-500">Squad Invite Code:</span>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 font-mono text-sm font-bold text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700">
                  {selectedInviteEvent.teamCode}
                </div>
                <button
                  onClick={() => handleCopyCode(selectedInviteEvent.teamCode)}
                  className="px-4 py-2.5 rounded-xl bg-[#2C5745] hover:bg-[#234537] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
            </div>

            {/* Email Dispatcher */}
            <form onSubmit={handleSendInvite} className="space-y-2">
              <label className="block text-xs font-bold uppercase text-zinc-500">Invite via Student Email / ID</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="classmate@gehu.ac.in"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-black/50 border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5745]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#2C5745] hover:bg-[#234537] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>

            {invitedList.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-zinc-500">Dispatched Invites:</span>
                <div className="space-y-1">
                  {invitedList.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                      <span>{m}</span>
                      <span className="text-[10px] font-semibold text-[#EB7D00] bg-[#EB7D00]/10 px-2 py-0.5 rounded">Invited</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setSelectedInviteEvent(null)}
              className="w-full py-2.5 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
